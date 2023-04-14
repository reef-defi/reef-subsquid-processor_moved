module.exports = class Data1681487133476 {
    name = 'Data1681487133476'

    async up(db) {
        await db.query(`ALTER TABLE "transfer" ADD "event_id" character varying`)
        await db.query(`CREATE INDEX "IDX_2a4e1dce9f72514cd28f554ee2" ON "transfer" ("event_id") `)
        await db.query(`CREATE UNIQUE INDEX "IDX_98251c475f0ed0856e566186b6" ON "transfer" ("id", "event_id") `)
        await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_2a4e1dce9f72514cd28f554ee2d" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "transfer" DROP COLUMN "event_id"`)
        await db.query(`DROP INDEX "public"."IDX_2a4e1dce9f72514cd28f554ee2"`)
        await db.query(`DROP INDEX "public"."IDX_98251c475f0ed0856e566186b6"`)
        await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_2a4e1dce9f72514cd28f554ee2d"`)
    }
}
