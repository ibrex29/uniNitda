import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@/common/decorators/param-decorator/User.decorator';
import { SessionUser } from '../auth/types';
import { FetchCompaniesDTO } from './dto/fetch-company.dto';
@ApiTags('Company')
@ApiBearerAuth()
@Controller({ path: 'company', version: '1' })
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async createCompany(
    @Body() createCompanyDto: CreateCompanyDto,
    @User() user: SessionUser
  ) {
    return await this.companyService.createCompany(createCompanyDto,user);
  }

  @Get()
  async getAllCompanies(@Query() query: FetchCompaniesDTO , @User() user: SessionUser) {
    return await this.companyService.getAllCompanies(query,user);
  }

  @Patch(':id')
  async updateCompanyById(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @User() user: SessionUser
  ) {
    return await this.companyService.updateCompany(id, user, updateCompanyDto);
  }

  @Delete(':id')
  async deleteCompanyById(
    @Param('id', ParseUUIDPipe) id: string,
    @User() user: SessionUser
  ) {
    return await this.companyService.deleteCompany(id, user);
  }
}
