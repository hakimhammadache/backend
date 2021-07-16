import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config/config';
import { TypeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { shipmentModule } from './shipment/shipment.module';
import { RoleModule } from './role/role.module';
import { PDFModule } from '@t00nday/nestjs-pdf';
import { PdfConfigService } from './pdf-config.service';
@Module({})
export class AppModule {
  static register(): DynamicModule {
    const imports = [
      shipmentModule,
      RoleModule,
      AuthModule.register(),
      UserModule,
      TypeOrmModule.forRootAsync({
        useClass: TypeOrmConfig,
      }),
      ConfigModule.forRoot({
        isGlobal: true,
        load: [config],
      }),
    ];
    const controllers = [AppController];
    const providers = [AppService];
    return {
      module: AppModule,
      imports: imports,
      controllers: controllers,
      providers: providers,
    };
  }
}
