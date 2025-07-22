import {
  ConflictException,
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from '@/common/prisma/prisma.service';
import { UserType } from '../user/types';
import { SessionUser } from '../auth/types';
import { FetchCompaniesDTO } from './dto/fetch-company.dto';
import { Company, Prisma } from '@prisma/client';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async createCompany(createCompanyDto: CreateCompanyDto, user: SessionUser) {
    const { email, employeeId } = createCompanyDto;

    if (user.role === UserType.ADMIN) {
      if (!employeeId) {
        throw new BadRequestException(
          'Employee ID must be provided for admin users',
        );
      }

      const employeeUser = await this.prisma.user.findUnique({
        where: { id: employeeId },
      });
      if (!employeeUser) {
        throw new NotFoundException('Employee user not found');
      }
    }

    const existingCompany = await this.prisma.company.findUnique({
      where: { email },
    });
    if (existingCompany) {
      throw new ConflictException('Company with this email already exists');
    }

    const newCompany = await this.prisma.company.create({
      data: {
        name: createCompanyDto.name,
        email: createCompanyDto.email,
        phoneNumber: createCompanyDto.phoneNumber,
        address: createCompanyDto.address,
        state: createCompanyDto.state,
        country: createCompanyDto.country,
        createdByUserId: user.userId,
      },
    });

    const employeeData = {
      companyId: newCompany.id,
      createdByUserId: user.userId,
      userId: user.role === UserType.ADMIN ? employeeId! : user.userId,
    };

    await this.prisma.employee.create({ data: employeeData });

    return {
      success: true,
      data: newCompany,
      message: 'Company created successfully',
    };
  }

  async getAllCompanies(query: FetchCompaniesDTO, user: SessionUser) {
    const { sortField, sortOrder, search } = query;
    const isAdmin = user.role === UserType.ADMIN;

    const where: Prisma.CompanyWhereInput = {
      deletedAt: null,
    };
    if (!isAdmin) {
      where.employees = {
        some: {
          createdByUserId: user.userId,
        },
      };
    }

    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      };
    }

    let orderBy: Prisma.CompanyOrderByWithRelationInput = {
      id: 'asc',
    };
    if (sortField) {
      orderBy = { [sortField]: sortOrder };
    }

    const option = {
      where,
      query,
      include: {
        createdBy: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        employees: true,
      },
      orderBy,
    };

    const companies = await this.prisma.paginate<Company>('Company', option);

    return {
      success: true,
      data: companies,
      message: 'Companies retrieved successfully',
    };
  }

  private async checkCompanyPermissions(companyId: string, user: SessionUser) {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company || company.deletedAt) {
      throw new NotFoundException('Company not found or already deleted');
    }

    if (
      company.createdByUserId !== user.userId &&
      user.role !== UserType.ADMIN
    ) {
      throw new ForbiddenException(
        'You do not have permission to perform this action',
      );
    }

    return company;
  }

  async updateCompany(
    id: string,
    user: SessionUser,
    updateCompanyDto: UpdateCompanyDto,
  ) {
    await this.checkCompanyPermissions(id, user);

    const updatedCompany = await this.prisma.company.update({
      where: { id },
      data: {
        name: updateCompanyDto.name,
        email: updateCompanyDto.email,
        phoneNumber: updateCompanyDto.phoneNumber,
        address: updateCompanyDto.address,
        state: updateCompanyDto.state,
        country: updateCompanyDto.country,
        updatedByUserId: user.userId,
      },
    });

    return {
      success: true,
      data: updatedCompany,
      message: 'Company updated successfully',
    };
  }

  async deleteCompany(id: string, user: SessionUser) {
    await this.checkCompanyPermissions(id, user);

    await this.prisma.company.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        updatedByUserId: user.userId,
      },
    });

    return {
      success: true,
      message: 'Company deleted successfully',
    };
  }
}
