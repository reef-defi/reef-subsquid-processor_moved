module.exports = class Data1671127773883 {
    name = 'Data1671127773883'

    async up(db) {
        await db.query(`DROP INDEX "public"."IDX_129efedcb305c80256db2d57a5"`)
        await db.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_129efedcb305c80256db2d57a59"`)
        await db.query(`ALTER TABLE "event" ALTER COLUMN "extrinsic_id" DROP NOT NULL`)
        await db.query(`ALTER TABLE "event" DROP CONSTRAINT "REL_129efedcb305c80256db2d57a5"`)
        await db.query(`CREATE INDEX "IDX_129efedcb305c80256db2d57a5" ON "event" ("extrinsic_id") `)
        await db.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_129efedcb305c80256db2d57a59" FOREIGN KEY ("extrinsic_id") REFERENCES "extrinsic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`CREATE UNIQUE INDEX "IDX_129efedcb305c80256db2d57a5" ON "event" ("extrinsic_id") `)
        await db.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_129efedcb305c80256db2d57a59" FOREIGN KEY ("extrinsic_id") REFERENCES "extrinsic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "event" ALTER COLUMN "extrinsic_id" SET NOT NULL`)
        await db.query(`ALTER TABLE "event" ADD CONSTRAINT "REL_129efedcb305c80256db2d57a5" UNIQUE ("extrinsic_id")`)
        await db.query(`DROP INDEX "public"."IDX_129efedcb305c80256db2d57a5"`)
        await db.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_129efedcb305c80256db2d57a59"`)
    }
}
