import { UsersService } from './users/users.service';
import { Injectable } from '@nestjs/common';
import { LoginDto } from './users/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.usersService.findOne(data.email);

    if (!user || !bcrypt.compareSync(data.password, user.password)) {
      //compare sync serve para testar a senha criptografada
      throw new Error('Senha ou email inválido.');
    }

    // o usuário existe!

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return {
      access_token: this.jwtService.sign(result),
    };
  }
}
