import { Module } from '@nestjs/common';
import { AuthGaurdService } from './auth-gaurd.service';

@Module({
  providers: [AuthGaurdService],
  exports: [AuthGaurdService]
})
export class AuthGaurdModule {}
