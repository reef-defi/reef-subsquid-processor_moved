module.exports = class Data1671041424022 {
    name = 'Data1671041424022'

    async up(db) {
        await db.query(`ALTER TABLE "event" DROP COLUMN "phase"`)
        await db.query(`ALTER TABLE "event" ADD "phase" text NOT NULL`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "event" ADD "phase" jsonb NOT NULL`)
        await db.query(`ALTER TABLE "event" DROP COLUMN "phase"`)
    }
}
