import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LeadwayAPIService } from './leadway.service';

@Module({
  imports: [HttpModule],
  providers: [LeadwayAPIService],
})
export class LeadwayAPIModule {}
