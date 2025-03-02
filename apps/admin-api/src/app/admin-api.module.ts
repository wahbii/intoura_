import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule, entities } from '@ridy/database';
import { GeoModule } from '@ridy/geo/geo.module';
import { RedisModule } from '@songkeys/nestjs-redis';
import axios from 'axios';
import { existsSync, promises as fs } from 'fs';
import { Context as WSContext } from 'graphql-ws';
import { join } from 'path';
import { LicenseVerifyRemoteResponse } from '../../../../libs/database/src/lib/interfaces/license-verify-remote-response';
import { AccountingModule } from './accounting/accounting.module';
import { AddressModule } from './address/address.module';
import { AdminApiSetupNotFoundController } from './admin-api-setup-not-found.controller';
import { AppController } from './admin-api.controller';
import { AnnouncementModule } from './announcement/announcement.module';
import { AuthModule } from './auth/auth.module';
import { validateToken } from './auth/jwt.strategy';
import { CarModule } from './car/car.module';
import { ComplaintModule } from './complaint/complaint.module';
import { ConfigurationModule } from './config/configuration.module';
import { CouponModule } from './coupon/coupon.module';
import { DriverModule } from './driver/driver.module';
import { FeedbackModule } from './feedback/feedback.module';
import { FleetModule } from './fleet/fleet.module';
import { GiftCardModule } from './gift-card/gift-card.module';
import { OperatorModule } from './operator/operator.module';
import { OrderModule } from './order/order.module';
import { PaymentGatewayModule } from './payment-gateway/payment-gateway.module';
import { PayoutModule } from './payout/payout.module';
import { RegionModule } from './region/region.module';
import { RewardModule } from './reward/reward.module';
import { RiderModule } from './rider/rider.module';
import { ServiceModule } from './service/service.module';
import { SMSProviderModule } from './sms-provider/sms-provider.module';
import { SOSModule } from './sos/sos.module';
import { UploadModule } from './upload/upload.module';
import { UploadService } from './upload/upload.service';

@Module({})
export class AdminAPIModule {
  static async register(): Promise<DynamicModule> {
    const configAddress = `${process.cwd()}/config/config.${
      process.env.NODE_ENV ?? 'production'
    }.json`;
    Logger.log(`Config address: ${configAddress}`);
    if (existsSync(configAddress)) {
      const file = await fs.readFile(configAddress, { encoding: 'utf-8' });
      const config = JSON.parse(file as string);
      const firebaseKeyFileAddress = `${process.cwd()}/config/${
        config.firebaseProjectPrivateKey
      }`;
      if (
        config.firebaseProjectPrivateKey != null &&
        existsSync(firebaseKeyFileAddress)
      ) {
        const verResult = await axios.get<{
          status: 'OK' | 'FAILED';
          message: string;
          token?: string;
          data: LicenseVerifyRemoteResponse;
        }>(
          `http://31.220.15.49:9000/verify?purchaseCode=${
            config.purchaseCode
          }&port=${process.env.ADMIN_API_PORT || 3000}`,
        );
        Logger.log(verResult.data, 'Verification');
        if (verResult.data.status == 'FAILED') {
          Logger.error(verResult.data.message, 'Verification');
          return {
            module: AdminAPIModule,
            imports: [
              HttpModule,
              GraphQLModule.forRoot<ApolloDriverConfig>({
                driver: ApolloDriver,
                autoSchemaFile: true,
                // cors: false,
                //uploads: false,
              }),
              ConfigurationModule,
            ],
            controllers: [AdminApiSetupNotFoundController],
          };
        }
        global.saltKey = verResult.data.token;
        global.license = verResult.data.data;
        return {
          module: AdminAPIModule,
          imports: [
            DatabaseModule,
            GraphQLModule.forRoot<ApolloDriverConfig>({
              driver: ApolloDriver,
              context: ({ req, res, extra }) => {
                return extra && extra.user
                  ? {
                      req: req,
                      res: res,
                      user: extra.user,
                    }
                  : { req: req, res: res };
              },
              subscriptions: {
                'graphql-ws': {
                  //keepAlive: 5000,
                  onConnect: async (context: WSContext) => {
                    const { connectionParams, extra } = context;
                    if (connectionParams.authToken) {
                      Logger.log(
                        `connection established with token ${connectionParams.authToken}`,
                        'GraphQL',
                      );
                      const userObject = await validateToken(
                        connectionParams!.authToken as string,
                      );
                      Logger.log(
                        `userObject: ${JSON.stringify(userObject)}`,
                        'GraphQL',
                      );
                      extra['user'] = userObject;
                      return;
                    }
                    throw new Error('Missing auth token!');
                  },
                  onDisconnect: () => {
                    Logger.log('connection disconnected', 'GraphQL');
                  },
                  onSubscribe: () => {
                    Logger.log(`subscription started`, 'GraphQL');
                  },
                },
              },
              autoSchemaFile: join(process.cwd(), 'admin.schema.gql'),
              // cors: false,
            }),
            TypeOrmModule.forFeature(entities),
            ServiceModule,
            OperatorModule,
            RiderModule,
            DriverModule,
            FleetModule,
            OrderModule,
            AnnouncementModule,
            CouponModule,
            GiftCardModule,
            AccountingModule,
            RegionModule,
            PaymentGatewayModule,
            CarModule,
            FeedbackModule,
            AddressModule,
            AuthModule,
            PayoutModule,
            UploadModule,
            SOSModule,
            RewardModule,
            ComplaintModule,
            GeoModule,
            ConfigurationModule,
            HttpModule,
            SMSProviderModule,
            RedisModule.forRoot({
              closeClient: true,
              commonOptions: { db: 2 },
              config: {
                host: process.env.REDIS_HOST ?? 'localhost',
              },
            }),
          ],
          providers: [UploadService],
          controllers: [AppController],
        };
      }
    }
    return {
      module: AdminAPIModule,
      imports: [
        HttpModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: true,
          // cors: false,
          //uploads: false,
        }),
        ConfigurationModule,
      ],
      controllers: [AdminApiSetupNotFoundController],
    };
  }
}
