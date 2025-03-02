import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisPubSubProvider } from '@ridy/database';
import { DriverTransactionEntity } from '@ridy/database/driver-transaction.entity';
import { DriverWalletEntity } from '@ridy/database/driver-wallet.entity';
import { DriverEntity } from '@ridy/database/driver.entity';
import { RequestEntity } from '@ridy/database/request.entity';
import { ProviderTransactionEntity } from '@ridy/database/provider-transaction.entity';
import { ProviderWalletEntity } from '@ridy/database/provider-wallet.entity';
import { RiderEntity } from '@ridy/database/rider-entity';
import { RiderTransactionEntity } from '@ridy/database/rider-transaction.entity';
import { RiderWalletEntity } from '@ridy/database/rider-wallet.entity';
import { ServiceCategoryEntity } from '@ridy/database/service-category.entity';
import { ServiceEntity } from '@ridy/database/service.entity';
import { PaymentEntity } from '@ridy/database/payment.entity';
import { FirebaseNotificationModule } from '@ridy/order/firebase-notification-service/firebase-notification-service.module';
import { GoogleServicesModule } from '@ridy/order/google-services/google-services.module';
import { SharedOrderService } from '@ridy/order/shared-order.service';
import { SharedProviderService } from '@ridy/order/shared-provider.service';
import { SharedFleetService } from '@ridy/order/shared-fleet.service';
import { RegionModule } from '@ridy/order/region/region.module';
import { SharedRiderService } from '@ridy/order/shared-rider.service';
import { ServiceService } from '@ridy/order/service.service';

import { OrderDTO } from './dto/order.dto';
import { OrderResolver } from './order.resolver';
import { DriverOrderQueryService } from './driver-order.query-service';
import { RedisHelpersModule } from '@ridy/redis/redis-helper.module';
import { CronJobService } from './cron-job.service';
import { DriverModule } from '../driver/driver.module';
import { SharedDriverService } from '@ridy/order/shared-driver.service';
import { OrderService } from './order.service';
import { FleetWalletEntity } from '@ridy/database/fleet-wallet.entity';
import { FleetTransactionEntity } from '@ridy/database/fleet-transaction.entity';
import { OrderSubscriptionService } from './order-subscription.service';
import { RiderDTO } from './dto/rider.dto';
import { RequestActivityEntity } from '@ridy/database/request-activity.entity';
import { FleetEntity } from '@ridy/database/fleet.entity';
import { ServiceOptionEntity } from '@ridy/database/service-option.entity';
import { CommonCouponModule } from '@ridy/coupon';
import { ZonePriceEntity } from '@ridy/database/zone-price.entity';
import { HttpModule } from '@nestjs/axios';
import { OrderCancelReasonEntity } from '@ridy/database/order-cancel-reason.entity';
import { OrderCancelReasonDTO } from './dto/cancel-reason.dto';
import { RiderReviewEntity } from '@ridy/database/rider-review.entity';

@Module({
  imports: [
    RedisHelpersModule,
    DriverModule,
    CommonCouponModule,
    TypeOrmModule.forFeature([
      RequestEntity,
      ServiceCategoryEntity,
      ServiceOptionEntity,
      ServiceEntity,
      RiderEntity,
      RiderWalletEntity,
      RiderTransactionEntity,
      DriverEntity,
      DriverWalletEntity,
      DriverTransactionEntity,
      ProviderWalletEntity,
      ProviderTransactionEntity,
      FleetEntity,
      FleetWalletEntity,
      FleetTransactionEntity,
      ZonePriceEntity,
      PaymentEntity,
      RiderReviewEntity,
    ]),
    RegionModule,
    HttpModule,
    FirebaseNotificationModule.register(),
    GoogleServicesModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          RequestEntity,
          RiderEntity,
          RequestActivityEntity,
          OrderCancelReasonEntity,
        ]),
      ],
      pubSub: RedisPubSubProvider.provider(),
      dtos: [{ DTOClass: OrderDTO }],
      resolvers: [
        {
          DTOClass: RiderDTO,
          EntityClass: RiderEntity,
          read: { disabled: true },
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
        },
        {
          DTOClass: OrderCancelReasonDTO,
          EntityClass: OrderCancelReasonEntity,
          read: { one: { disabled: false } },
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.NONE,
        },
      ],
    }),
  ],
  providers: [
    OrderSubscriptionService,
    SharedOrderService,
    DriverOrderQueryService,
    OrderResolver,
    OrderService,
    ServiceService,
    SharedRiderService,
    SharedDriverService,
    SharedProviderService,
    SharedFleetService,
    RedisPubSubProvider.provider(),
    CronJobService,
  ],
  exports: [DriverOrderQueryService, SharedDriverService],
})
export class OrderModule {}
