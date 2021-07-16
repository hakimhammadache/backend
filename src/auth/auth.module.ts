import { Controller, DynamicModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../config/jwt.config';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({})
export class AuthModule {
  static register(): DynamicModule {
    const imports = [
      UserModule,
      JwtModule.registerAsync({
        useClass: config,
      }),
    ];
    const controllers = [AuthController];
    const providers = [AuthService, JwtStrategy, LocalStrategy];
    return {
      module: AuthModule,
      imports: imports,
      controllers: controllers,
      providers: providers,
    };
  }
}
