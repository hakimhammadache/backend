"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecondOne1626364182061 = void 0;
class SecondOne1626364182061 {
    constructor() {
        this.name = 'SecondOne1626364182061';
    }
    async up(queryRunner) {
        await queryRunner.query(`truncate table parcel`);
        await queryRunner.query(`ALTER TABLE "parcel" DROP COLUMN "length"`);
        await queryRunner.query(`ALTER TABLE "parcel" ADD "length" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "parcel" DROP COLUMN "width"`);
        await queryRunner.query(`ALTER TABLE "parcel" ADD "width" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "parcel" DROP COLUMN "height"`);
        await queryRunner.query(`ALTER TABLE "parcel" ADD "height" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "parcel" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "parcel" ADD "weight" double precision NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "parcel" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "parcel" ADD "weight" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "parcel" DROP COLUMN "height"`);
        await queryRunner.query(`ALTER TABLE "parcel" ADD "height" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "parcel" DROP COLUMN "width"`);
        await queryRunner.query(`ALTER TABLE "parcel" ADD "width" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "parcel" DROP COLUMN "length"`);
        await queryRunner.query(`ALTER TABLE "parcel" ADD "length" numeric NOT NULL`);
    }
}
exports.SecondOne1626364182061 = SecondOne1626364182061;
//# sourceMappingURL=1626364182061-SecondOne.js.map