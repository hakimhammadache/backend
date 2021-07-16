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
exports.shipmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const shipment_entity_1 = require("./entities/shipment.entity");
const parcel_entity_1 = require("./entities/parcel.entity");
const nestjs_pdf_1 = require("@t00nday/nestjs-pdf");
const paginate_1 = require("../helpers/paginate");
let shipmentService = class shipmentService {
    constructor(pdfService, shipmentRepository, parcelRepository) {
        this.pdfService = pdfService;
        this.shipmentRepository = shipmentRepository;
        this.parcelRepository = parcelRepository;
    }
    async create(createshipmentDto, req) {
        let shipment = await this.shipmentRepository.findOne({
            tracking: createshipmentDto.tracking,
        });
        if (shipment) {
            if (shipment.status === shipment_entity_1.ShipmentStatus.Canceled) {
                shipment.status = shipment_entity_1.ShipmentStatus.Created;
            }
            else {
                throw new common_1.UnprocessableEntityException({ message: 'Status Invalid' });
            }
            if (shipment.id !== createshipmentDto.id) {
                throw new common_1.UnprocessableEntityException({ message: 'Id Invalid' });
            }
        }
        else {
            shipment = this.shipmentRepository.create(createshipmentDto);
            shipment.status = shipment_entity_1.ShipmentStatus.Created;
        }
        shipment.cost = 0;
        shipment.userId = 3;
        let costVolume = 0;
        let costWeight = 0;
        await this.shipmentRepository.save(shipment);
        for (const parcelDto of createshipmentDto.parcels) {
            const parcel = this.parcelRepository.create(parcelDto);
            parcel.quantity = parcel.quantity < 1 ? 1 : parcel.quantity;
            costVolume =
                parcel.length *
                    parcel.height *
                    parcel.width *
                    200 *
                    parcel.quantity *
                    50 -
                    50 * 5;
            costWeight = parcel.weight * 50 * parcel.quantity - 50 * 5;
            if (costWeight > 0 || costVolume > 0) {
                if (costWeight > costVolume) {
                    shipment.cost += costWeight;
                }
                else {
                    shipment.cost += costVolume;
                }
                parcel.shipmentId = shipment.id;
                this.parcelRepository.save(parcel);
            }
            else {
                return false;
            }
        }
        return this.shipmentRepository.save(shipment);
    }
    findAll(query) {
        const queryBuilder = this.shipmentRepository
            .createQueryBuilder('shipment')
            .leftJoinAndSelect('shipment.user', 'user')
            .select(['shipment', 'user.name', 'user.station']);
        return paginate_1.paginate(query, queryBuilder, {
            sortableColumns: ['id', 'createdAt'],
            defaultSortBy: [['createdAt', 'DESC']],
        });
    }
    get(id) {
        return this.shipmentRepository.findOneOrFail({
            relations: ['parcels'],
            where: { id: id },
        });
    }
    findByTracking(tracking) {
        return this.shipmentRepository
            .createQueryBuilder('shipment')
            .leftJoinAndSelect('shipment.user', 'user')
            .select(['shipment.tracking', 'user.name', 'user.station'])
            .where('shipment.tracking=:tracking', { tracking: tracking })
            .getOne();
    }
    async update(id, updateshipmentDto) {
        const shipment = await this.get(id);
        if (updateshipmentDto.status) {
            if ((shipment.status === shipment_entity_1.ShipmentStatus.Canceled &&
                updateshipmentDto.status === shipment_entity_1.ShipmentStatus.Validated) ||
                (shipment.status === shipment_entity_1.ShipmentStatus.Validated &&
                    updateshipmentDto.status === shipment_entity_1.ShipmentStatus.Canceled)) {
                throw new common_1.UnprocessableEntityException({ message: 'Status Invalid' });
            }
        }
        await this.shipmentRepository.update(id, updateshipmentDto);
        return this.get(id);
    }
    remove(id) {
        return `This action removes a #${id} shipment`;
    }
    async print(id) {
        const shipment = await this.shipmentRepository.findOneOrFail(id);
        const options = {
            locals: {
                tracking: shipment.tracking,
                cost: shipment.cost,
            },
        };
        return this.pdfService.toStream('template_overweight', options);
    }
};
shipmentService = __decorate([
    common_1.Injectable(),
    __param(1, typeorm_1.InjectRepository(shipment_entity_1.Shipment)),
    __param(2, typeorm_1.InjectRepository(parcel_entity_1.Parcel)),
    __metadata("design:paramtypes", [nestjs_pdf_1.PDFService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], shipmentService);
exports.shipmentService = shipmentService;
//# sourceMappingURL=shipment.service.js.map