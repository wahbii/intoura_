import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DriverEntity } from './driver.entity';
import { PaymentGatewayEntity } from './payment-gateway.entity';
import { PayoutMethodEntity } from './payout-method.entity';
import { SavedPaymentMethodType } from './enums/saved-payment-method-type';
import { DriverTransactionEntity } from './driver-transaction.entity';

@Entity('payout_account')
export class PayoutAccountEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => DriverEntity, (driver) => driver.payoutAccounts)
  driver!: DriverEntity;

  @Column()
  driverId!: number;

  // Deprecated: THESE TWO FIELDS ARE NOT NEEDED in favor of the new payout method table connection. Here to not to break the frontend API calls but should be removed soon.
  @ManyToOne(() => PaymentGatewayEntity, (gateway) => gateway.payoutAccounts)
  paymentGateway?: PaymentGatewayEntity;

  @Column({
    nullable: true,
  })
  paymentGatewayId?: number;

  @Column('enum', {
    enum: SavedPaymentMethodType,
  })
  type!: SavedPaymentMethodType;

  @Column()
  last4!: string;

  @Column()
  currency!: string;

  @ManyToOne(
    () => PayoutMethodEntity,
    (payoutMethod) => payoutMethod.payoutAccounts,
  )
  payoutMethod?: PayoutMethodEntity;

  @Column()
  payoutMethodId!: number;

  @Column({
    nullable: true,
  })
  token?: string;

  @Column({
    nullable: true,
  })
  accountNumber?: string;

  @Column({
    nullable: true,
  })
  routingNumber?: string;

  @Column({
    nullable: true,
  })
  accountHolderName?: string;

  @Column({
    nullable: true,
  })
  bankName?: string;

  @Column({
    nullable: true,
  })
  branchName?: string;

  @Column({
    nullable: true,
  })
  accountHolderAddress?: string;

  @Column({
    nullable: true,
  })
  accountHolderCity?: string;

  @Column({
    nullable: true,
  })
  accountHolderState?: string;

  @Column({
    nullable: true,
  })
  accountHolderZip?: string;

  @Column({
    nullable: true,
  })
  accountHolderCountry?: string;

  @Column({
    nullable: true,
  })
  accountHolderPhone?: string;

  @Column({
    nullable: true,
  })
  accountHolderDateOfBirth?: Date;

  @Column({
    default: false,
  })
  isVerified!: boolean;

  @Column({
    default: false,
  })
  isDefault!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(
    () => DriverTransactionEntity,
    (driverTransaction) => driverTransaction.payoutAccount,
  )
  driverTransactions?: DriverTransactionEntity[];
}
