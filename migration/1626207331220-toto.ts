import { MigrationInterface, QueryRunner } from 'typeorm';

export class toto1626207331220 implements MigrationInterface {
  name = 'toto1626207331220';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shipment" ALTER COLUMN "cost" SET DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shipment" ALTER COLUMN "cost" DROP DEFAULT`,
    );
  }
}
