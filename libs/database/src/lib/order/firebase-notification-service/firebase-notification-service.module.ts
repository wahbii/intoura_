import { DynamicModule, Logger, Module } from '@nestjs/common';
import { existsSync, promises as fs } from 'fs';

import { DriverNotificationService } from './driver-notification.service';
import { RiderNotificationService } from './rider-notification.service';

@Module({})
export class FirebaseNotificationModule {
  static async register(): Promise<DynamicModule> {
    let providers: any[] = [];

    const configAddress = `${process.cwd()}/config/config.${
      process.env.NODE_ENV ?? 'production'
    }.json`;
    Logger.log('configAddress: ' + configAddress, 'FirebaseNotificationModule');
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
        providers = [DriverNotificationService, RiderNotificationService];
      }
    }
    return {
      module: FirebaseNotificationModule,
      imports: [],
      providers: providers,
      exports: providers,
    };
  }
}
