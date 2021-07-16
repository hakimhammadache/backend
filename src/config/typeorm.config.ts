import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const db = this.configService.get('typeorm');
    return {
      type: db.type,
      host: db.host,
      port: db.port,
      username: db.username,
      password: db.password,
      database: db.database,
      entities: db.entities,
      synchronize: db.synchronize,
    };
  }
}
