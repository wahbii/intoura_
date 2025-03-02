import { QueryService } from '@ptc-org/nestjs-query-core';
import { InjectPubSub } from '@ptc-org/nestjs-query-graphql';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonCouponService } from '@ridy/coupon';
import { OrderStatus } from '@ridy/database/enums/order-status.enum';
import { RequestEntity } from '@ridy/database/request.entity';
import { ForbiddenError } from '@nestjs/apollo';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Repository } from 'typeorm';

import { UpdateOrderInput } from './dto/update-order.input';
import { RiderOrderService } from './rider-order.service';

@QueryService(RequestEntity)
export class RiderOrderQueryService extends TypeOrmQueryService<RequestEntity> {
  constructor(
    @InjectRepository(RequestEntity)
    public orderRepository: Repository<RequestEntity>,
    private orderService: RiderOrderService,
    private commonCouponService: CommonCouponService,
    @InjectPubSub()
    private pubSub: RedisPubSub,
  ) {
    super(orderRepository);
  }

  async updateOne(
    id: number,
    update: UpdateOrderInput,
  ): Promise<RequestEntity> {
    let order = await this.orderRepository.findOne({
      where: { id },
      relations: { service: true, coupon: true },
    });
    if (update.couponCode != null) {
      await this.commonCouponService.applyCoupon(
        update.couponCode,
        id,
        order.riderId,
      );
    }
    delete update['couponCode'];
    order = await this.orderRepository.findOne({
      where: { id },
      relations: { service: true, coupon: true },
    });
    if (update.status != null && update.status != OrderStatus.RiderCanceled) {
      throw new ForbiddenError('Update status to this is not possible');
    }
    let costAfterCoupon = order.costAfterCoupon;
    if (update.waitMinutes != null) {
      costAfterCoupon = this.commonCouponService.applyCouponOnPrice(
        order.coupon,
        order.costBest + order.service.perMinuteWait * update.waitMinutes,
      );
    }
    const result = await super.updateOne(id, { ...update, costAfterCoupon });
    if (update.status != null && update.status == OrderStatus.RiderCanceled) {
      await this.orderService.cancelOrder({
        orderId: id,
      });
    }
    this.pubSub.publish('orderUpdated', { orderUpdated: result });
    return result;
  }
}
