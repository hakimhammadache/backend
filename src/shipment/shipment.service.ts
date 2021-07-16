import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateshipmentDto } from './dto/create-shipment.dto';
import { UpdateshipmentDto } from './dto/update-shipment.dto';
import { Shipment, ShipmentStatus } from './entities/shipment.entity';
import { Parcel } from './entities/parcel.entity';
import { PDFService, PDFOptions } from '@t00nday/nestjs-pdf';
import { paginate } from 'src/helpers/paginate';
import { createReadStream } from 'fs';
import { Readable } from 'stream';
import { Observable } from 'rxjs';

@Injectable()
export class shipmentService {
  constructor(
    private readonly pdfService: PDFService,
    @InjectRepository(Shipment)
    private shipmentRepository: Repository<Shipment>,
    @InjectRepository(Parcel)
    private parcelRepository: Repository<Parcel>,
  ) {}

  async create(createshipmentDto: CreateshipmentDto, req) {
    let shipment = await this.shipmentRepository.findOne({
      tracking: createshipmentDto.tracking,
    });

    if (shipment) {
      if (shipment.status === ShipmentStatus.Canceled) {
        shipment.status = ShipmentStatus.Created;
      } else {
        throw new UnprocessableEntityException({ message: 'Status Invalid' });
      }
      if (shipment.id !== createshipmentDto.id) {
        throw new UnprocessableEntityException({ message: 'Id Invalid' });
      }
    } else {
      shipment = this.shipmentRepository.create(createshipmentDto);
      shipment.status = ShipmentStatus.Created;
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
        } else {
          shipment.cost += costVolume;
        }

        parcel.shipmentId = shipment.id;
        this.parcelRepository.save(parcel);
      } else {
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

    return paginate(query, queryBuilder, {
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

  findByTracking(tracking: string) {
    return this.shipmentRepository
      .createQueryBuilder('shipment')
      .leftJoinAndSelect('shipment.user', 'user')
      .select(['shipment.tracking', 'user.name', 'user.station'])
      .where('shipment.tracking=:tracking', { tracking: tracking })
      .getOne();
  }

  async update(id: number, updateshipmentDto: UpdateshipmentDto) {
    const shipment = await this.get(id);

    if (updateshipmentDto.status) {
      if (
        (shipment.status === ShipmentStatus.Canceled &&
          updateshipmentDto.status === ShipmentStatus.Validated) ||
        (shipment.status === ShipmentStatus.Validated &&
          updateshipmentDto.status === ShipmentStatus.Canceled)
      ) {
        throw new UnprocessableEntityException({ message: 'Status Invalid' });
      }
    }

    await this.shipmentRepository.update(id, updateshipmentDto);
    return this.get(id);
  }

  remove(id: number) {
    return `This action removes a #${id} shipment`;
  }

  async print(id): Promise<Observable<Readable>> {
    const shipment = await this.shipmentRepository.findOneOrFail(id);
    const options: PDFOptions = {
      locals: {
        tracking: shipment.tracking,
        cost: shipment.cost,
      },
    };
    return this.pdfService.toStream('template_overweight', options); // returns Observable<Readable>;
  }
}
