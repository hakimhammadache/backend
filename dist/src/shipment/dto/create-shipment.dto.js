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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateshipmentDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_parcel_dto_1 = require("./create-parcel.dto");
class CreateshipmentDto {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateshipmentDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.Matches(/^yal-\d{4}\w{2}$|^yal-\d{3}\w{3}$/i),
    __metadata("design:type", String)
], CreateshipmentDto.prototype, "tracking", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => create_parcel_dto_1.CreateParcelDto),
    __metadata("design:type", Array)
], CreateshipmentDto.prototype, "parcels", void 0);
exports.CreateshipmentDto = CreateshipmentDto;
//# sourceMappingURL=create-shipment.dto.js.map