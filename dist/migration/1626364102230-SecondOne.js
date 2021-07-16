"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecondOne1626364102230 = void 0;
class SecondOne1626364102230 {
    constructor() {
        this.name = 'SecondOne1626364102230';
    }
    async up(queryRunner) {
        await queryRunner.query(`truncate table parcel`);
        await queryRunner.query(`ALTER TABLE "parcel" DROP COLUMN "length"`);
        await queryRunner.query(`ALTER TABLE "parcel" ADD "length" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "parcel" DROP COLUMN "width"`);
        await queryRunner.query(`ALTER TABLE "parcel" ADD "width" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "parcel" DROP COLUMN "height"`);
        await queryRunner.query(`ALTER TABLE "parcel" ADD "height" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "parcel" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "parcel" ADD "weight" integer NOT NULL`);
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
exports.SecondOne1626364102230 = SecondOne1626364102230;
//# sourceMappingURL=1626364102230-SecondOne.js.map