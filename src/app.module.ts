import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PedalModule } from './modules/pedal/pedal.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtVerifyGuard } from './modules/auth/guards/jwt-verify.guard';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtVerifyGuard,
    },
  ],
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'bike',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    AuthModule,
    PedalModule,
  ],
})
export class AppModule {}
