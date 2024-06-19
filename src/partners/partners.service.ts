import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';

@Injectable()
export class PartnersService {
  constructor(private prismaService: PrismaService) {}

  async create(createPartnerDto: CreatePartnerDto & { userId: number }) {
    await this.prismaService.$transaction(async (prisma) => {
      const partner = await prisma.partner.create({
        data: { name: createPartnerDto.name },
      });
      await prisma.partnerUser.create({
        data: {
          userId: createPartnerDto.userId,
          partnerId: partner.id,
        },
      });

      return partner;
    });
  }

  findAll() {
    return this.prismaService.partner.findMany();
  }
}
