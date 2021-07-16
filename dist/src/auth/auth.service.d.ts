import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(loginAuthDto: LoginAuthDto): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
