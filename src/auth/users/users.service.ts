import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRoles } from './user-roles';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  create(data: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        ...data,
        roles: [UserRoles.USER],
      },
    });
  }
}
