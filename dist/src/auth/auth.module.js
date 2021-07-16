"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AuthModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("../config/jwt.config");
const user_module_1 = require("../user/user.module");
const jwt_strategy_1 = require("./jwt.strategy");
const local_strategy_1 = require("./local.strategy");
let AuthModule = AuthModule_1 = class AuthModule {
    static register() {
        const imports = [
            user_module_1.UserModule,
            jwt_1.JwtModule.registerAsync({
                useClass: jwt_config_1.config,
            }),
        ];
        const controllers = [auth_controller_1.AuthController];
        const providers = [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, local_strategy_1.LocalStrategy];
        return {
            module: AuthModule_1,
            imports: imports,
            controllers: controllers,
            providers: providers,
        };
    }
};
AuthModule = AuthModule_1 = __decorate([
    common_1.Module({})
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map