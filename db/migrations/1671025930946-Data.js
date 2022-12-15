module.exports = class Data1671025930946 {
    name = 'Data1671025930946'

    async up(db) {
        await db.query(`CREATE TABLE "event" ("id" character varying NOT NULL, "block_height" integer NOT NULL, "extrinsic_id" text, "index" integer NOT NULL, "phase" jsonb NOT NULL, "section" text NOT NULL, "method" text NOT NULL, "data" jsonb NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_f0ad922cb716d6df1e08f1835c" ON "event" ("block_height") `)
        await db.query(`CREATE INDEX "IDX_129efedcb305c80256db2d57a5" ON "event" ("extrinsic_id") `)
        await db.query(`CREATE INDEX "IDX_454df5a5a16bb99a92c08f7870" ON "event" ("section") `)
        await db.query(`CREATE INDEX "IDX_f38992d3f393b04d1739fcb271" ON "event" ("method") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "event"`)
        await db.query(`DROP INDEX "public"."IDX_f0ad922cb716d6df1e08f1835c"`)
        await db.query(`DROP INDEX "public"."IDX_129efedcb305c80256db2d57a5"`)
        await db.query(`DROP INDEX "public"."IDX_454df5a5a16bb99a92c08f7870"`)
        await db.query(`DROP INDEX "public"."IDX_f38992d3f393b04d1739fcb271"`)
    }
}
