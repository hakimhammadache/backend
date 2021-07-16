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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const role_entity_1 = require("../../role/entities/role.entity");
const shipment_entity_1 = require("../../shipment/entities/shipment.entity");
let User = class User {
    async setPassword(password) {
        const salt = 10;
        this.password = await bcrypt.hash(password || this.password, salt);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        name: 'name',
        type: 'varchar',
        length: 50,
        nullable: false,
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typeorm_1.Unique(['email']),
    typeorm_1.Column({
        name: 'email',
        type: 'varchar',
        length: 50,
        nullable: false,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        select: false,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 30,
        nullable: false,
    }),
    __metadata("design:type", String)
], User.prototype, "station", void 0);
__decorate([
    typeorm_1.Unique(['phoneNumber']),
    typeorm_1.Column({
        name: 'phoneNumber',
        type: 'varchar',
        length: 10,
        nullable: false,
    }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.DeleteDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => shipment_entity_1.Shipment, (shipment) => shipment.id),
    __metadata("design:type", Array)
], User.prototype, "shipment", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], User.prototype, "roleId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => role_entity_1.Role),
    __metadata("design:type", role_entity_1.Role)
], User.prototype, "role", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], User.prototype, "setPassword", null);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map