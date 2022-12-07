module.exports = class Data1670228355742 {
    name = 'Data1670228355742'

    async up(db) {
        await db.query(`DROP INDEX "public"."IDX_2699bb80b8c7c68d263fab954b"`)
        await db.query(`ALTER TABLE "transfer" DROP COLUMN "block_id"`)
        await db.query(`ALTER TABLE "token_holder" ADD "token_contract_id" character varying`)
        await db.query(`ALTER TABLE "transfer" ADD "block_id_id" character varying`)
        await db.query(`ALTER TABLE "transfer" ADD "token_contract_id" character varying`)
        await db.query(`ALTER TABLE "account" ADD "block_id_id" character varying`)
        await db.query(`CREATE INDEX "IDX_83f05831536518335b095395bc" ON "token_holder" ("token_contract_id") `)
        await db.query(`CREATE INDEX "IDX_1e3ff475fd6efb0558d2982935" ON "transfer" ("block_id_id") `)
        await db.query(`CREATE INDEX "IDX_12251bf02a651c0cc26e8fe7e2" ON "transfer" ("token_contract_id") `)
        await db.query(`CREATE INDEX "IDX_02d9e28db0492fce346828f47d" ON "account" ("block_id_id") `)
        await db.query(`ALTER TABLE "token_holder" ADD CONSTRAINT "FK_83f05831536518335b095395bc8" FOREIGN KEY ("token_contract_id") REFERENCES "contract"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_1e3ff475fd6efb0558d29829352" FOREIGN KEY ("block_id_id") REFERENCES "block"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_12251bf02a651c0cc26e8fe7e26" FOREIGN KEY ("token_contract_id") REFERENCES "contract"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_02d9e28db0492fce346828f47de" FOREIGN KEY ("block_id_id") REFERENCES "block"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`CREATE INDEX "IDX_2699bb80b8c7c68d263fab954b" ON "transfer" ("block_id") `)
        await db.query(`ALTER TABLE "transfer" ADD "block_id" integer NOT NULL`)
        await db.query(`ALTER TABLE "token_holder" DROP COLUMN "token_contract_id"`)
        await db.query(`ALTER TABLE "transfer" DROP COLUMN "block_id_id"`)
        await db.query(`ALTER TABLE "transfer" DROP COLUMN "token_contract_id"`)
        await db.query(`ALTER TABLE "account" DROP COLUMN "block_id_id"`)
        await db.query(`DROP INDEX "public"."IDX_83f05831536518335b095395bc"`)
        await db.query(`DROP INDEX "public"."IDX_1e3ff475fd6efb0558d2982935"`)
        await db.query(`DROP INDEX "public"."IDX_12251bf02a651c0cc26e8fe7e2"`)
        await db.query(`DROP INDEX "public"."IDX_02d9e28db0492fce346828f47d"`)
        await db.query(`ALTER TABLE "token_holder" DROP CONSTRAINT "FK_83f05831536518335b095395bc8"`)
        await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_1e3ff475fd6efb0558d29829352"`)
        await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_12251bf02a651c0cc26e8fe7e26"`)
        await db.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_02d9e28db0492fce346828f47de"`)
    }
}
