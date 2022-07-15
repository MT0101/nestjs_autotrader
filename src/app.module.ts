import {
  CacheModule,
  Module
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarketModule } from './market/market.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from "typeorm";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from "@nestjs/throttler";
import dbConfiguration from './config/db.config'


@Module({
  imports: [ThrottlerModule.forRoot({
    ttl: 5 * 60 * 1000,
    limit: 100,
  }),
    CacheModule.register({
    ttl: 30,
    max: 1000,
    isGlobal: true,
  }), MarketModule, UserModule, AuthModule, ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfiguration]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({...configService.get('database')})
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource, private configService: ConfigService) {}
}
