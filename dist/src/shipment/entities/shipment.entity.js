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
exports.Shipment = exports.ShipmentStatus = void 0;
const parcel_entity_1 = require("./parcel.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
var ShipmentStatus;
(function (ShipmentStatus) {
    ShipmentStatus["Created"] = "CREATED";
    ShipmentStatus["Validated"] = "VALIDATED";
    ShipmentStatus["Canceled"] = "CANCELED";
})(ShipmentStatus = exports.ShipmentStatus || (exports.ShipmentStatus = {}));
let Shipment = class Shipment {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Shipment.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: false,
    }),
    __metadata("design:type", String)
], Shipment.prototype, "tracking", void 0);
__decorate([
    typeorm_1.Column({
        type: 'float',
        nullable: false,
        default: 0,
    }),
    __metadata("design:type", Number)
], Shipment.prototype, "cost", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: ShipmentStatus,
        nullable: false,
    }),
    __metadata("design:type", String)
], Shipment.prototype, "status", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Shipment.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Shipment.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Shipment.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(() => parcel_entity_1.Parcel, (parcel) => parcel.shipment),
    __metadata("design:type", Array)
], Shipment.prototype, "parcels", void 0);
Shipment = __decorate([
    typeorm_1.Entity()
], Shipment);
exports.Shipment = Shipment;
//# sourceMappingURL=shipment.entity.js.map