import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@/common/prisma/prisma.service';
import { UserNotFoundException } from '@/modules/user/exceptions/UserNotFound.exception';
import { CreateUserDto } from './dtos/sign-up.dto';
import { CompanyService } from '../company/company.service';
import { SessionUser } from '../auth/types';
import { UserType } from './types';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly companyService: CompanyService,
  ) {}
  
    async createUser(dto: CreateUserDto) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
  
      if (existingUser) {
        throw new ConflictException(`User with email: ${dto.email} already exists.`);
      }
  
      let createdUser = null;
      let createdCompany = null;
  
      try {
        createdUser = await this.prisma.user.create({
          data: {
            phoneNumber: dto.phoneNumber,
            email: dto.email,
            password: dto.password,
            firstName: dto.firstName,
            lastName: dto.lastName,
            otherNames: dto.otherNames,
            gender: dto.gender,
            dob: dto.dob,
            address: dto.address,
            state: dto.state,
            country: dto.country || 'nigeria',
            role: dto.role || UserType.USER,
            isActive: true,
          },
        });
  
        if (dto.company) {
          const sessionUser: SessionUser = {
            userId: createdUser.id,
            phoneNumber: createdUser.phoneNumber,
            email: createdUser.email,
            role: createdUser.role,
          };
  
          createdCompany = await this.companyService.createCompany(dto.company, sessionUser);
        }
  
        delete createdUser.password;
        return createdUser;
      } catch (error) {
        // Rollback in case of error
        if (createdCompany) {
          await this.prisma.company.delete({
            where: { id: createdCompany.id },
          });
        }
        if (createdUser) {
          await this.prisma.user.delete({
            where: { id: createdUser.id },
          });
        }
  
        throw new InternalServerErrorException(`Error creating user: ${error.message}`);
      }
    }
  
  async findUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        phoneNumber: true,
        email: true,
        password: true,
        isActive: true,
        role: true,
        firstName:true,
        lastName:true
      },
    });
  }

  async findUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async deleteUser(userId: string): Promise<User> {
    await this.validateUserExists(userId);

    return this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }

  async validateUserExists(userId: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new UserNotFoundException();
    }
  }

  async validateUserEmailExists(email: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      throw new UserNotFoundException();
    }
  }

  async activateUser(userId: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        isActive: true,
      },
    });
  }

  async deactivateUser(userId: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        isActive: false,
      },
    });
  }
}
