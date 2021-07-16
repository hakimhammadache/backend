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
exports.Parcel = void 0;
const shipment_entity_1 = require("./shipment.entity");
const typeorm_1 = require("typeorm");
let Parcel = class Parcel {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Parcel.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'float',
        nullable: false,
    }),
    __metadata("design:type", Number)
], Parcel.prototype, "length", void 0);
__decorate([
    typeorm_1.Column({
        type: 'float',
        nullable: false,
    }),
    __metadata("design:type", Number)
], Parcel.prototype, "width", void 0);
__decorate([
    typeorm_1.Column({
        type: 'float',
        nullable: false,
    }),
    __metadata("design:type", Number)
], Parcel.prototype, "height", void 0);
__decorate([
    typeorm_1.Column({
        type: 'float',
        nullable: false,
    }),
    __metadata("design:type", Number)
], Parcel.prototype, "weight", void 0);
__decorate([
    typeorm_1.Column({
        type: 'float',
        nullable: false,
    }),
    __metadata("design:type", Number)
], Parcel.prototype, "shipmentId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Parcel.prototype, "quantity", void 0);
__decorate([
    typeorm_1.ManyToOne(() => shipment_entity_1.Shipment, (shipment) => shipment.parcels),
    __metadata("design:type", shipment_entity_1.Shipment)
], Parcel.prototype, "shipment", void 0);
Parcel = __decorate([
    typeorm_1.Entity()
], Parcel);
exports.Parcel = Parcel;
//# sourceMappingURL=parcel.entity.js.map