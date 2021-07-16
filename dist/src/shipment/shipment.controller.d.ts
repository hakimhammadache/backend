import { StreamableFile } from '@nestjs/common';
import { shipmentService } from './shipment.service';
import { CreateshipmentDto } from './dto/create-shipment.dto';
import { UpdateshipmentDto } from './dto/update-shipment.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { PaginateQuery } from 'src/decorators/paginate';
import { Paginated } from 'src/helpers/paginate';
import { Shipment } from './entities/shipment.entity';
import { Observable } from 'rxjs';
export declare class shipmentController {
    private readonly shipmentService;
    constructor(shipmentService: shipmentService);
    create(createshipmentDto: CreateshipmentDto, req: any): Promise<false | Shipment>;
    findAll(query: PaginateQuery): Promise<Paginated<Shipment>>;
    get(id: number): Promise<Shipment>;
    findByTracking(tracking: string): Promise<Shipment>;
    update(id: string, updateshipmentDto: UpdateshipmentDto): Promise<Shipment>;
    updateStatus(id: string, updateStatusDto: UpdateStatusDto): Promise<Shipment>;
    remove(id: string): string;
    generatePDF(id: number): Promise<Observable<StreamableFile>>;
}
