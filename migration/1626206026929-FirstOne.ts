import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstOne1626206026929 implements MigrationInterface {
  name = 'FirstOne1626206026929';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "parcel" ("id" SERIAL NOT NULL, "length" numeric NOT NULL, "width" numeric NOT NULL, "height" numeric NOT NULL, "weight" numeric NOT NULL, "shipmentId" integer NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_c01e9fed31b7433a00942d506b1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "shipment_status_enum" AS ENUM('CREATED', 'VALIDATED', 'CANCELED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "shipment" ("id" SERIAL NOT NULL, "tracking" character varying NOT NULL, "cost" double precision NOT NULL, "status" "shipment_status_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, CONSTRAINT "PK_f51f635db95c534ca206bf7a0a4" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `ALTER TABLE "parcel" ADD CONSTRAINT "FK_fd5bb3eca6818c71d47d893d221" FOREIGN KEY ("shipmentId") REFERENCES "shipment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipment" ADD CONSTRAINT "FK_1674d8fced3f3484c3a6bbdc221" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shipment" DROP CONSTRAINT "FK_1674d8fced3f3484c3a6bbdc221"`,
    );
    await queryRunner.query(
      `ALTER TABLE "parcel" DROP CONSTRAINT "FK_fd5bb3eca6818c71d47d893d221"`,
    );
    await queryRunner.query(`ALTER TABLE "shipment" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "shipment_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "shipment" ADD "status" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "shipment" DROP COLUMN "status"`);
    await queryRunner.query(
      `ALTER TABLE "shipment" ADD "status" "shipment_status_enum" NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "shipment"`);
    await queryRunner.query(`DROP TYPE "shipment_status_enum"`);
    await queryRunner.query(`DROP TABLE "parcel"`);
  }
}
