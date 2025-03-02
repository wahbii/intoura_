import {
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { MessageStatus } from '@ridy/database/enums/message-status.enum';
import { OrderDTO } from '../../order/dto/order.dto';

@ObjectType('OrderMessage')
@Relation('request', () => OrderDTO)
export class OrderMessageDTO {
  @IDField(() => ID)
  id: number;
  sentAt: Date;
  status: MessageStatus;
  content: string;
  sentByDriver: boolean;
  @FilterableField(() => ID)
  requestId: number;
}
