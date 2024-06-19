import { CreateUserDto } from './dto/create-user.dto';
import { UserPresenter } from './user.presenter';
import { UsersService } from './users.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    const user = await this.usersService.create(data);
    return new UserPresenter(user);
  }
}
