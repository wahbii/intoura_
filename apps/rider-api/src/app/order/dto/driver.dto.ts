import {
  IDField,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { MediaDTO } from '../../upload/media.dto';
import { CarColorDTO } from './car-color.dto';
import { CarModelDTO } from './car-model.dto';
import { ServiceDTO } from '../../service/dto/service.dto';

@ObjectType('Driver')
@Relation('car', () => CarModelDTO, {
  nullable: true,
})
@Relation('carColor', () => CarColorDTO, {
  nullable: true,
})
@Relation('media', () => MediaDTO, {
  nullable: true,
})
@UnPagedRelation('enabledServices', () => ServiceDTO)
export class DriverDTO {
  @IDField(() => ID)
  id: number;
  mobileNumber: string;
  firstName?: string;
  carPlate?: string;
  lastName?: string;
  @Field(() => Int)
  rating?: number;
  reviewCount: number;
}
