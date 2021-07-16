import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginAuthDto: LoginAuthDto): Promise<any> {
    const { email, password } = loginAuthDto;
    try {
      const user = await this.userService.findOneByEmail(email);
      console.log('user' + user);
      const isMatch = await bcrypt.compare(password, user.password);
      if (user && isMatch) {
        const { password, ...result } = user;
        return result;
      }
    } catch (error) {
      return false;
    }
  }
  async login(user: any) {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      station: user.station,
      role: user.role.role,
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}
