/// <reference types="node" />
import { Repository } from 'typeorm';
import { CreateshipmentDto } from './dto/create-shipment.dto';
import { UpdateshipmentDto } from './dto/update-shipment.dto';
import { Shipment } from './entities/shipment.entity';
import { Parcel } from './entities/parcel.entity';
import { PDFService } from '@t00nday/nestjs-pdf';
import { Readable } from 'stream';
import { Observable } from 'rxjs';
export declare class shipmentService {
    private readonly pdfService;
    private shipmentRepository;
    private parcelRepository;
    constructor(pdfService: PDFService, shipmentRepository: Repository<Shipment>, parcelRepository: Repository<Parcel>);
    create(createshipmentDto: CreateshipmentDto, req: any): Promise<false | Shipment>;
    findAll(query: any): Promise<import("src/helpers/paginate").Paginated<Shipment>>;
    get(id: any): Promise<Shipment>;
    findByTracking(tracking: string): Promise<Shipment>;
    update(id: number, updateshipmentDto: UpdateshipmentDto): Promise<Shipment>;
    remove(id: number): string;
    print(id: any): Promise<Observable<Readable>>;
}
