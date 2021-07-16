"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalResponseError = exports.GlobalFilterException = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let GlobalFilterException = class GlobalFilterException {
    catch(exception, host) {
        console.log(exception);
        const context = host.switchToHttp();
        const response = context.getResponse();
        const request = context.getRequest();
        let message = exception;
        let code = 'HttpException';
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        switch (true) {
            case exception instanceof common_1.HttpException:
                status = exception.getStatus();
                break;
            case exception instanceof typeorm_1.QueryFailedError:
                status = common_1.HttpStatus.UNPROCESSABLE_ENTITY;
                message = exception.message;
                code = exception.code;
                break;
        }
        response.status(status).json(exports.GlobalResponseError(status, message, code, request));
    }
};
GlobalFilterException = __decorate([
    common_1.Catch()
], GlobalFilterException);
exports.GlobalFilterException = GlobalFilterException;
const GlobalResponseError = (statusCode, message, code, request) => {
    return {
        statusCode, message, code, timestamp: new Date().toISOString(), method: request.method
    };
};
exports.GlobalResponseError = GlobalResponseError;
//# sourceMappingURL=global.filter.js.map