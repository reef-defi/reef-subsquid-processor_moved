module.exports = class Data1670493090792 {
    name = 'Data1670493090792'

    async up(db) {
        await db.query(`CREATE TABLE "block" ("id" character varying NOT NULL, "height" integer NOT NULL, "hash" text NOT NULL, "author" text NOT NULL, "state_root" text NOT NULL, "parent_hash" text NOT NULL, "extrinsic_root" text NOT NULL, "finalized" boolean NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "processor_timestamp" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_d0925763efb591c2e2ffb267572" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_bce676e2b005104ccb768495db" ON "block" ("height") `)
        await db.query(`CREATE INDEX "IDX_f8fba63d7965bfee9f304c487a" ON "block" ("hash") `)
        await db.query(`CREATE INDEX "IDX_97862dcc0742e14c96127c78b1" ON "block" ("finalized") `)
        await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "evm_address" text, "block_height" integer NOT NULL, "identity" jsonb, "active" boolean NOT NULL, "free_balance" numeric NOT NULL, "locked_balance" numeric NOT NULL, "available_balance" numeric NOT NULL, "reserved_balance" numeric NOT NULL, "vested_balance" numeric NOT NULL, "voting_balance" numeric NOT NULL, "nonce" integer NOT NULL, "evm_nonce" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_22bbd4c1019b6727a8c0660b87" ON "account" ("evm_address") `)
        await db.query(`CREATE INDEX "IDX_215f3a388a5b3667dbf033d76d" ON "account" ("block_height") `)
        await db.query(`CREATE INDEX "IDX_07daaf78eea6db5636f187de32" ON "account" ("active") `)
        // Insert block
        await db.query(`
            INSERT INTO block
            (id, height, hash, author, state_root, parent_hash, extrinsic_root, finalized, timestamp)
            VALUES
            (-1, -1, '', '', '', '', '', TRUE, '2020-10-01 00:00:00');
        `);
        // Insert accounts
        await db.query(`
            INSERT INTO account 
            (id, evm_address, block_height, active, available_balance, free_balance, locked_balance, reserved_balance, vested_balance, voting_balance, nonce, evm_nonce, timestamp)
            VALUES
            ('0x', '0x', -1, true, 0, 0, 0, 0, 0, 0, 0, 0, '2020-10-01 00:00:00'),
            ('deleted', 'deleted', -1, true, 0, 0, 0, 0, 0, 0, 0, 0, '2020-10-01 00:00:00');
        `);
    }

    async down(db) {
        await db.query(`DROP TABLE "block"`)
        await db.query(`DROP INDEX "public"."IDX_bce676e2b005104ccb768495db"`)
        await db.query(`DROP INDEX "public"."IDX_f8fba63d7965bfee9f304c487a"`)
        await db.query(`DROP INDEX "public"."IDX_97862dcc0742e14c96127c78b1"`)
        await db.query(`DROP TABLE "account"`)
        await db.query(`DROP INDEX "public"."IDX_22bbd4c1019b6727a8c0660b87"`)
        await db.query(`DROP INDEX "public"."IDX_215f3a388a5b3667dbf033d76d"`)
        await db.query(`DROP INDEX "public"."IDX_07daaf78eea6db5636f187de32"`)
    }
}
