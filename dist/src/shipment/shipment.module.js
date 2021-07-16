"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shipmentModule = void 0;
const common_1 = require("@nestjs/common");
const shipment_service_1 = require("./shipment.service");
const shipment_controller_1 = require("./shipment.controller");
const typeorm_1 = require("@nestjs/typeorm");
const shipment_entity_1 = require("./entities/shipment.entity");
const parcel_entity_1 = require("./entities/parcel.entity");
const nestjs_pdf_1 = require("@t00nday/nestjs-pdf");
const pdf_config_service_1 = require("../pdf-config.service");
let shipmentModule = class shipmentModule {
};
shipmentModule = __decorate([
    common_1.Module({
        imports: [
            nestjs_pdf_1.PDFModule.registerAsync({
                useClass: pdf_config_service_1.PdfConfigService,
            }),
            typeorm_1.TypeOrmModule.forFeature([shipment_entity_1.Shipment, parcel_entity_1.Parcel]),
        ],
        controllers: [shipment_controller_1.shipmentController],
        providers: [shipment_service_1.shipmentService],
    })
], shipmentModule);
exports.shipmentModule = shipmentModule;
//# sourceMappingURL=shipment.module.js.map