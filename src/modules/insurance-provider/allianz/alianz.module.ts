import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AllianzAPIService } from './allianz.service';

@Module({
  imports: [HttpModule],
  providers: [AllianzAPIService],
})
export class AllianzAPIModule {}
