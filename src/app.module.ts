import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  HTTP_MAX_REDIRECTS,
  HTTP_TIMEOUT,
  THROTTLE_LIMIT,
  THROTTLE_TTL,
} from '@/common/constants';
import { ThrottlerModule, seconds } from '@nestjs/throttler';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from './common/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from './modules/user/user.module';
import { CompanyModule } from './modules/company/company.module';
import { LeadwayAPIModule } from './modules/insurance-provider/leadway/leadway.module';
import { AllianzAPIModule } from './modules/insurance-provider/allianz/alianz.module';
import { MailModule } from './modules/mail/mail.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true, // cache env in memory
      envFilePath: ['docker.env', '.env'],
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '19000s' },
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: seconds(configService.get(THROTTLE_TTL) || 10), // default is 10 seconds
          limit: configService.get(THROTTLE_LIMIT) || 20, // default is 20 requests
        },
      ],
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get(HTTP_TIMEOUT),
        maxRedirects: configService.get(HTTP_MAX_REDIRECTS),
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    CompanyModule,
    LeadwayAPIModule,
    AllianzAPIModule,
    MailModule,
    CaslModule
  ],
})
export class AppModule {}
