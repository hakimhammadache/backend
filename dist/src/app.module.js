"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AppModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_2 = require("./config/config");
const typeorm_config_1 = require("./config/typeorm.config");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const shipment_module_1 = require("./shipment/shipment.module");
const role_module_1 = require("./role/role.module");
let AppModule = AppModule_1 = class AppModule {
    static register() {
        const imports = [
            shipment_module_1.shipmentModule,
            role_module_1.RoleModule,
            auth_module_1.AuthModule.register(),
            user_module_1.UserModule,
            typeorm_1.TypeOrmModule.forRootAsync({
                useClass: typeorm_config_1.TypeOrmConfig,
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [config_2.default],
            }),
        ];
        const controllers = [app_controller_1.AppController];
        const providers = [app_service_1.AppService];
        return {
            module: AppModule_1,
            imports: imports,
            controllers: controllers,
            providers: providers,
        };
    }
};
AppModule = AppModule_1 = __decorate([
    common_1.Module({})
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map