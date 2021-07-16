import { Module } from '@nestjs/common';
import { shipmentService } from './shipment.service';
import { shipmentController } from './shipment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from './entities/shipment.entity';
import { Parcel } from './entities/parcel.entity';
import { PDFModule } from '@t00nday/nestjs-pdf';
import { PdfConfigService } from 'src/pdf-config.service';
@Module({
  imports: [
    PDFModule.registerAsync({
      useClass: PdfConfigService,
    }),
    TypeOrmModule.forFeature([Shipment, Parcel]),
  ],
  controllers: [shipmentController],
  providers: [shipmentService],
})
export class shipmentModule {}
