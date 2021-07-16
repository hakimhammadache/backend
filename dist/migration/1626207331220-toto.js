"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toto1626207331220 = void 0;
class toto1626207331220 {
    constructor() {
        this.name = 'toto1626207331220';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "shipment" ALTER COLUMN "cost" SET DEFAULT '0'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "shipment" ALTER COLUMN "cost" DROP DEFAULT`);
    }
}
exports.toto1626207331220 = toto1626207331220;
//# sourceMappingURL=1626207331220-toto.js.map