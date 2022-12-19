module.exports = class Data1671440485553 {
    name = 'Data1671440485553'

    async up(db) {
        await db.query(`CREATE TABLE "token_holder" ("id" character varying NOT NULL, "evm_address" text, "nft_id" numeric, "type" character varying(8) NOT NULL, "balance" numeric NOT NULL, "info" jsonb NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "token_id" character varying, "signer_id" character varying, CONSTRAINT "PK_c5e10d5c2543fac00a5d3086a2c" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_77bdccde4b3585013306c3606f" ON "token_holder" ("signer_id") `)
        await db.query(`CREATE INDEX "IDX_abfdc68704fc31c98bb5fccc9a" ON "token_holder" ("evm_address") `)
        await db.query(`CREATE INDEX "IDX_183817f049e88fb6b9816484b6" ON "token_holder" ("balance") `)
        await db.query(`CREATE UNIQUE INDEX "IDX_c09d54833688f9c5bc2fdb9714" ON "token_holder" ("token_id", "signer_id", "nft_id") `)
        await db.query(`CREATE TABLE "staking" ("id" character varying NOT NULL, "type" character varying(6) NOT NULL, "amount" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "signer_id" character varying, "event_id" character varying, CONSTRAINT "PK_37377c2d716ef7341fd21d76e78" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_6ee1999545992b2cd1ba1f1f65" ON "staking" ("signer_id") `)
        await db.query(`CREATE INDEX "IDX_c4f2c390140b9ff847dae45002" ON "staking" ("event_id") `)
        await db.query(`CREATE INDEX "IDX_e837120901fd17225e43f7d421" ON "staking" ("type") `)
        await db.query(`ALTER TABLE "token_holder" ADD CONSTRAINT "FK_fc70f9ab515920d249fa5e9a8ba" FOREIGN KEY ("token_id") REFERENCES "contract"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "token_holder" ADD CONSTRAINT "FK_77bdccde4b3585013306c3606fc" FOREIGN KEY ("signer_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "staking" ADD CONSTRAINT "FK_6ee1999545992b2cd1ba1f1f657" FOREIGN KEY ("signer_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "staking" ADD CONSTRAINT "FK_c4f2c390140b9ff847dae450025" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "token_holder"`)
        await db.query(`DROP INDEX "public"."IDX_77bdccde4b3585013306c3606f"`)
        await db.query(`DROP INDEX "public"."IDX_abfdc68704fc31c98bb5fccc9a"`)
        await db.query(`DROP INDEX "public"."IDX_183817f049e88fb6b9816484b6"`)
        await db.query(`DROP INDEX "public"."IDX_c09d54833688f9c5bc2fdb9714"`)
        await db.query(`DROP TABLE "staking"`)
        await db.query(`DROP INDEX "public"."IDX_6ee1999545992b2cd1ba1f1f65"`)
        await db.query(`DROP INDEX "public"."IDX_c4f2c390140b9ff847dae45002"`)
        await db.query(`DROP INDEX "public"."IDX_e837120901fd17225e43f7d421"`)
        await db.query(`ALTER TABLE "token_holder" DROP CONSTRAINT "FK_fc70f9ab515920d249fa5e9a8ba"`)
        await db.query(`ALTER TABLE "token_holder" DROP CONSTRAINT "FK_77bdccde4b3585013306c3606fc"`)
        await db.query(`ALTER TABLE "staking" DROP CONSTRAINT "FK_6ee1999545992b2cd1ba1f1f657"`)
        await db.query(`ALTER TABLE "staking" DROP CONSTRAINT "FK_c4f2c390140b9ff847dae450025"`)
    }
}
