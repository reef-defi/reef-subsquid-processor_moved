module.exports = class Data1671092790938 {
    name = 'Data1671092790938'

    async up(db) {
        await db.query(`DROP INDEX "public"."IDX_5474bf708e87b70509781ed759"`)
        await db.query(`ALTER TABLE "contract" DROP COLUMN "extrinsic_id"`)
        await db.query(`ALTER TABLE "contract" ADD "extrinsic_id" text`)
        await db.query(`CREATE INDEX "IDX_5474bf708e87b70509781ed759" ON "contract" ("extrinsic_id") `)
    }

    async down(db) {
        await db.query(`CREATE INDEX "IDX_5474bf708e87b70509781ed759" ON "contract" ("extrinsic_id") `)
        await db.query(`ALTER TABLE "contract" ADD "extrinsic_id" integer`)
        await db.query(`ALTER TABLE "contract" DROP COLUMN "extrinsic_id"`)
        await db.query(`DROP INDEX "public"."IDX_5474bf708e87b70509781ed759"`)
    }
}
