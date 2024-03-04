import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthGaurdModule } from './auth-gaurd/auth-gaurd.module';
import { JwtModule } from '@nestjs/jwt';
import helmet from 'helmet';
import * as cors from 'cors';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthGaurdModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService, PrismaService, JwtModule],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    const corsOptions = {
      origin: 'https://localhost/3000',
      methods: 'GET, HEAD, POST, PUT, DELETE, PATCH',
      credentials: true
    }

    consumer.apply(cors(corsOptions)).forRoutes('*');
    consumer.apply(helmet()).forRoutes('*');

  }
}
