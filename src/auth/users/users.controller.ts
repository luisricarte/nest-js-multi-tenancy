import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }
}
