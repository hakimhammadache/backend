import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";
@Injectable()
export class config implements JwtOptionsFactory {
    constructor(private configService: ConfigService){
    }
    createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
        const jwt = this.configService.get('jwt');
        return {
            secret: jwt.secret,
            signOptions: {
            expiresIn:jwt.signOptions.expiresIn
            }
        };
    }
}