import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    findOne(req: any): Promise<{
        access_token: string;
    }>;
}