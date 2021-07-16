import { MigrationInterface, QueryRunner } from 'typeorm';

export class SecondOne1626364182061 implements MigrationInterface {
  name = 'SecondOne1626364182061';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`truncate table parcel`);
    await queryRunner.query(`ALTER TABLE "parcel" DROP COLUMN "length"`);
    await queryRunner.query(
      `ALTER TABLE "parcel" ADD "length" double precision NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "parcel" DROP COLUMN "width"`);
    await queryRunner.query(
      `ALTER TABLE "parcel" ADD "width" double precision NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "parcel" DROP COLUMN "height"`);
    await queryRunner.query(
      `ALTER TABLE "parcel" ADD "height" double precision NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "parcel" DROP COLUMN "weight"`);
    await queryRunner.query(
      `ALTER TABLE "parcel" ADD "weight" double precision NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "parcel" DROP COLUMN "weight"`);
    await queryRunner.query(
      `ALTER TABLE "parcel" ADD "weight" numeric NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "parcel" DROP COLUMN "height"`);
    await queryRunner.query(
      `ALTER TABLE "parcel" ADD "height" numeric NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "parcel" DROP COLUMN "width"`);
    await queryRunner.query(
      `ALTER TABLE "parcel" ADD "width" numeric NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "parcel" DROP COLUMN "length"`);
    await queryRunner.query(
      `ALTER TABLE "parcel" ADD "length" numeric NOT NULL`,
    );
  }
}
