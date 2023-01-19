module.exports = class Data1674117770365 {
    name = 'Data1674117770365'

    async up(db) {
        await db.query(`ALTER TABLE "verified_contract" ADD "license" text`)
        await db.query(`ALTER TABLE "verification_request" ADD "license" text`)
        await db.query(`CREATE INDEX "IDX_da3f402a04a5bf731cc20997a4" ON "event" ("index") `)
        await db.query(`CREATE INDEX "IDX_1035186e9729db5fd8fa9cb330" ON "account" ("free_balance") `)
        await db.query(`CREATE INDEX "IDX_6e232918078798b1fade21dcf8" ON "extrinsic" ("timestamp") `)
        await db.query(`CREATE INDEX "IDX_4773091a54a19285f971950ffa" ON "verified_contract" ("timestamp") `)
        await db.query(`CREATE INDEX "IDX_70ff8b624c3118ac3a4862d22c" ON "transfer" ("timestamp") `)
        await db.query(`UPDATE "verified_contract" SET "license" = 'Apache-2.0' WHERE "id" IN ('0x0000000000000000000000000000000001000000', '0x0000000000000000000000000000000001000001')`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "verified_contract" DROP COLUMN "license"`)
        await db.query(`ALTER TABLE "verification_request" DROP COLUMN "license"`)
        await db.query(`DROP INDEX "public"."IDX_da3f402a04a5bf731cc20997a4"`)
        await db.query(`DROP INDEX "public"."IDX_1035186e9729db5fd8fa9cb330"`)
        await db.query(`DROP INDEX "public"."IDX_6e232918078798b1fade21dcf8"`)
        await db.query(`DROP INDEX "public"."IDX_4773091a54a19285f971950ffa"`)
        await db.query(`DROP INDEX "public"."IDX_70ff8b624c3118ac3a4862d22c"`)
    }
}
