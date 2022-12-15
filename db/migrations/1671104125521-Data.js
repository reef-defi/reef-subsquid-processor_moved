module.exports = class Data1671104125521 {
    name = 'Data1671104125521'

    async up(db) {
        await db.query(`CREATE TABLE "chain_info" ("id" character varying NOT NULL, "count" integer NOT NULL, CONSTRAINT "PK_1b82ce2acbc16bfc7f84bfdc8ff" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "extrinsic" ("id" character varying NOT NULL, "index" integer NOT NULL, "hash" text NOT NULL, "args" jsonb NOT NULL, "docs" text NOT NULL, "method" text NOT NULL, "section" text NOT NULL, "signer" text NOT NULL, "status" character varying(7) NOT NULL, "error_message" text, "type" character varying(8) NOT NULL, "signed_data" jsonb, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "block_id" character varying, CONSTRAINT "PK_80d7db0e4b1e83e30336bc76755" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_a3b99daba1259dab0dd040d4f7" ON "extrinsic" ("block_id") `)
        await db.query(`CREATE INDEX "IDX_1f45de0713a55049009e8e8127" ON "extrinsic" ("hash") `)
        await db.query(`CREATE INDEX "IDX_fee06ac3db4d6eaeab04d0e5eb" ON "extrinsic" ("method") `)
        await db.query(`CREATE INDEX "IDX_f27ce26722a5bff4dad664d4cb" ON "extrinsic" ("section") `)
        await db.query(`CREATE INDEX "IDX_001ddf290faf765f9dfd9154d3" ON "extrinsic" ("signer") `)
        await db.query(`CREATE TABLE "event" ("id" character varying NOT NULL, "index" integer NOT NULL, "phase" text NOT NULL, "section" text NOT NULL, "method" text NOT NULL, "data" jsonb NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "block_id" character varying, "extrinsic_id" character varying NOT NULL, CONSTRAINT "REL_129efedcb305c80256db2d57a5" UNIQUE ("extrinsic_id"), CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_2b0d35d675c4f99751855c4502" ON "event" ("block_id") `)
        await db.query(`CREATE UNIQUE INDEX "IDX_129efedcb305c80256db2d57a5" ON "event" ("extrinsic_id") `)
        await db.query(`CREATE INDEX "IDX_454df5a5a16bb99a92c08f7870" ON "event" ("section") `)
        await db.query(`CREATE INDEX "IDX_f38992d3f393b04d1739fcb271" ON "event" ("method") `)
        await db.query(`CREATE TABLE "contract" ("id" character varying NOT NULL, "bytecode" text NOT NULL, "bytecode_context" text NOT NULL, "bytecode_arguments" text NOT NULL, "gas_limit" integer NOT NULL, "storage_limit" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "extrinsic_id" character varying NOT NULL, "signer_id" character varying, CONSTRAINT "REL_5474bf708e87b70509781ed759" UNIQUE ("extrinsic_id"), CONSTRAINT "PK_17c3a89f58a2997276084e706e8" PRIMARY KEY ("id"))`)
        await db.query(`CREATE UNIQUE INDEX "IDX_5474bf708e87b70509781ed759" ON "contract" ("extrinsic_id") `)
        await db.query(`CREATE INDEX "IDX_c36378dd820dcbc9e74e71fe24" ON "contract" ("signer_id") `)
        await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "evm_address" text, "identity" jsonb, "active" boolean NOT NULL, "free_balance" numeric NOT NULL, "locked_balance" numeric NOT NULL, "available_balance" numeric NOT NULL, "reserved_balance" numeric NOT NULL, "vested_balance" numeric NOT NULL, "voting_balance" numeric NOT NULL, "nonce" integer NOT NULL, "evm_nonce" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "block_id" character varying, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_22bbd4c1019b6727a8c0660b87" ON "account" ("evm_address") `)
        await db.query(`CREATE INDEX "IDX_d9c630ee6c2f1bcc56e46bab5a" ON "account" ("block_id") `)
        await db.query(`CREATE INDEX "IDX_07daaf78eea6db5636f187de32" ON "account" ("active") `)
        await db.query(`CREATE TABLE "block" ("id" character varying NOT NULL, "height" integer NOT NULL, "hash" text NOT NULL, "author" text NOT NULL, "state_root" text NOT NULL, "parent_hash" text NOT NULL, "extrinsic_root" text NOT NULL, "finalized" boolean NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "processor_timestamp" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_d0925763efb591c2e2ffb267572" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_bce676e2b005104ccb768495db" ON "block" ("height") `)
        await db.query(`CREATE INDEX "IDX_f8fba63d7965bfee9f304c487a" ON "block" ("hash") `)
        await db.query(`CREATE INDEX "IDX_97862dcc0742e14c96127c78b1" ON "block" ("finalized") `)
        await db.query(`ALTER TABLE "extrinsic" ADD CONSTRAINT "FK_a3b99daba1259dab0dd040d4f74" FOREIGN KEY ("block_id") REFERENCES "block"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_2b0d35d675c4f99751855c45021" FOREIGN KEY ("block_id") REFERENCES "block"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_129efedcb305c80256db2d57a59" FOREIGN KEY ("extrinsic_id") REFERENCES "extrinsic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_5474bf708e87b70509781ed759b" FOREIGN KEY ("extrinsic_id") REFERENCES "extrinsic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_c36378dd820dcbc9e74e71fe24d" FOREIGN KEY ("signer_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_d9c630ee6c2f1bcc56e46bab5a8" FOREIGN KEY ("block_id") REFERENCES "block"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        // Insert chain info
    await db.query(`
    INSERT INTO chain_info 
      (id, count) 
    VALUES
      ('blocks', 0),
      ('events', 0),
      ('accounts', 0),
      ('contracts', 0),
      ('transfers', 0),
      ('extrinsics', 0);
  `);
  // Insert block
  await db.query(`
    INSERT INTO block
      (id, height, hash, author, state_root, parent_hash, extrinsic_root, finalized, timestamp)
    VALUES
      (-1, -1, '', '', '', '', '', TRUE, '2020-10-01 00:00:00');
  `);
  // Insert extrinsic
  await db.query(`
    INSERT INTO extrinsic
      (id, block_id, index, hash, args, docs, method, section, signer, status, type, timestamp)
    VALUES
      (-1, -1, 0, '', '[]', '', '', '', '0x', 'success', 'unsigned', '2020-10-01 00:00:00');
  `);
    }

    async down(db) {
        await db.query(`DROP TABLE "chain_info"`)
        await db.query(`DROP TABLE "extrinsic"`)
        await db.query(`DROP INDEX "public"."IDX_a3b99daba1259dab0dd040d4f7"`)
        await db.query(`DROP INDEX "public"."IDX_1f45de0713a55049009e8e8127"`)
        await db.query(`DROP INDEX "public"."IDX_fee06ac3db4d6eaeab04d0e5eb"`)
        await db.query(`DROP INDEX "public"."IDX_f27ce26722a5bff4dad664d4cb"`)
        await db.query(`DROP INDEX "public"."IDX_001ddf290faf765f9dfd9154d3"`)
        await db.query(`DROP TABLE "event"`)
        await db.query(`DROP INDEX "public"."IDX_2b0d35d675c4f99751855c4502"`)
        await db.query(`DROP INDEX "public"."IDX_129efedcb305c80256db2d57a5"`)
        await db.query(`DROP INDEX "public"."IDX_454df5a5a16bb99a92c08f7870"`)
        await db.query(`DROP INDEX "public"."IDX_f38992d3f393b04d1739fcb271"`)
        await db.query(`DROP TABLE "contract"`)
        await db.query(`DROP INDEX "public"."IDX_5474bf708e87b70509781ed759"`)
        await db.query(`DROP INDEX "public"."IDX_c36378dd820dcbc9e74e71fe24"`)
        await db.query(`DROP TABLE "account"`)
        await db.query(`DROP INDEX "public"."IDX_22bbd4c1019b6727a8c0660b87"`)
        await db.query(`DROP INDEX "public"."IDX_d9c630ee6c2f1bcc56e46bab5a"`)
        await db.query(`DROP INDEX "public"."IDX_07daaf78eea6db5636f187de32"`)
        await db.query(`DROP TABLE "block"`)
        await db.query(`DROP INDEX "public"."IDX_bce676e2b005104ccb768495db"`)
        await db.query(`DROP INDEX "public"."IDX_f8fba63d7965bfee9f304c487a"`)
        await db.query(`DROP INDEX "public"."IDX_97862dcc0742e14c96127c78b1"`)
        await db.query(`ALTER TABLE "extrinsic" DROP CONSTRAINT "FK_a3b99daba1259dab0dd040d4f74"`)
        await db.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_2b0d35d675c4f99751855c45021"`)
        await db.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_129efedcb305c80256db2d57a59"`)
        await db.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_5474bf708e87b70509781ed759b"`)
        await db.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_c36378dd820dcbc9e74e71fe24d"`)
        await db.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_d9c630ee6c2f1bcc56e46bab5a8"`)
    }
}
