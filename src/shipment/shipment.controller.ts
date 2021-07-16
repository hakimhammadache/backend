import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  StreamableFile,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth.guard';
import { shipmentService } from './shipment.service';
import { CreateshipmentDto } from './dto/create-shipment.dto';
import { UpdateshipmentDto } from './dto/update-shipment.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Paginate, PaginateQuery } from 'src/decorators/paginate';
import { Paginated } from 'src/helpers/paginate';
import { Shipment } from './entities/shipment.entity';
import { map, mergeMap, mergeMapTo, Observable } from 'rxjs';
@UseGuards(JwtAuthGuard)
@Controller('shipment')
export class shipmentController {
  constructor(private readonly shipmentService: shipmentService) {}

  @Post()
  create(@Body() createshipmentDto: CreateshipmentDto, @Request() req) {
    console.log(createshipmentDto);
    return this.shipmentService.create(createshipmentDto, req);
  }
  @Get()
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Shipment>> {
    console.log(query);
    return this.shipmentService.findAll(query);
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.shipmentService.get(id);
  }

  @Post('search')
  findByTracking(@Body('tracking') tracking: string) {
    return this.shipmentService.findByTracking(tracking);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateshipmentDto: UpdateshipmentDto,
  ) {
    return this.shipmentService.update(+id, updateshipmentDto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.shipmentService.update(+id, updateStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shipmentService.remove(+id);
  }

  @Get(':id/print')
  async generatePDF(@Param() id: number): Promise<Observable<StreamableFile>> {
    return (await this.shipmentService.print(id)).pipe(
      map((data) => {
        return new StreamableFile(data);
      }),
    );
  }
}

/**    return this.shipmentService.print(+id).subscribe(
      (data) => {
        return new StreamableFile(data);
      },
      (error) => {
        console.log('Pdf not generated', error);
      },
    ); */
