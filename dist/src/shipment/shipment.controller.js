"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shipmentController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guard/jwt.auth.guard");
const shipment_service_1 = require("./shipment.service");
const create_shipment_dto_1 = require("./dto/create-shipment.dto");
const update_shipment_dto_1 = require("./dto/update-shipment.dto");
const update_status_dto_1 = require("./dto/update-status.dto");
const paginate_1 = require("../decorators/paginate");
const paginate_2 = require("../helpers/paginate");
const rxjs_1 = require("rxjs");
let shipmentController = class shipmentController {
    constructor(shipmentService) {
        this.shipmentService = shipmentService;
    }
    create(createshipmentDto, req) {
        console.log(createshipmentDto);
        return this.shipmentService.create(createshipmentDto, req);
    }
    findAll(query) {
        console.log(query);
        return this.shipmentService.findAll(query);
    }
    get(id) {
        return this.shipmentService.get(id);
    }
    findByTracking(tracking) {
        return this.shipmentService.findByTracking(tracking);
    }
    update(id, updateshipmentDto) {
        return this.shipmentService.update(+id, updateshipmentDto);
    }
    updateStatus(id, updateStatusDto) {
        return this.shipmentService.update(+id, updateStatusDto);
    }
    remove(id) {
        return this.shipmentService.remove(+id);
    }
    async generatePDF(id) {
        return (await this.shipmentService.print(id)).pipe(rxjs_1.map((data) => {
            return new common_1.StreamableFile(data);
        }));
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_shipment_dto_1.CreateshipmentDto, Object]),
    __metadata("design:returntype", void 0)
], shipmentController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __param(0, paginate_1.Paginate()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], shipmentController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], shipmentController.prototype, "get", null);
__decorate([
    common_1.Post('search'),
    __param(0, common_1.Body('tracking')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], shipmentController.prototype, "findByTracking", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_shipment_dto_1.UpdateshipmentDto]),
    __metadata("design:returntype", void 0)
], shipmentController.prototype, "update", null);
__decorate([
    common_1.Patch(':id/status'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_status_dto_1.UpdateStatusDto]),
    __metadata("design:returntype", void 0)
], shipmentController.prototype, "updateStatus", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], shipmentController.prototype, "remove", null);
__decorate([
    common_1.Get(':id/print'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], shipmentController.prototype, "generatePDF", null);
shipmentController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('shipment'),
    __metadata("design:paramtypes", [shipment_service_1.shipmentService])
], shipmentController);
exports.shipmentController = shipmentController;
//# sourceMappingURL=shipment.controller.js.map