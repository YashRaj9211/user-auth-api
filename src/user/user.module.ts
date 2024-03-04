import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthGaurdService } from 'src/auth-gaurd/auth-gaurd.service';
import { JwtModule } from '@nestjs/jwt';
import { Throttle, ThrottlerModule } from '@nestjs/throttler';
import { throttle } from 'rxjs';


@Module({
  providers: [UserService, PrismaService, AuthGaurdService],
  imports: [JwtModule.register({
    global: true,
    secret: "eyJhbGciOiJIUzI1NiJ9.ew0KICAic3ViIjogIjEyMzQ1Njc4OTAiLA0KICAibmFtZSI6ICJBbmlzaCBOYXRoIiwNCiAgImlhdCI6IDE1MTYyMzkwMjINCn0.pE5FC5K0ccVuEamzTe-c3fyMRAyGujmKD2iuFcDP9FM",
    signOptions: { expiresIn: '60s' },
  }),
  ThrottlerModule.forRoot([{
    ttl: 60000,
    limit: 2
  }]),

],
  controllers: [UserController],
})
export class UserModule {}
