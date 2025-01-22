const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class SchemaUpdate1737520461661 {
    name = 'SchemaUpdate1737520461661'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "profiles" ("uri" character varying NOT NULL, "did" character varying NOT NULL, "displayName" character varying, "description" text, "avatar" json, "banner" json, "labels" json, "joinedViaStarterPack" json, "pinnedPost" json, "createdAt" TIMESTAMP, "additionalProperties" json, CONSTRAINT "PK_fde944192f213c314ffe6181b32" PRIMARY KEY ("uri"))`);
        await queryRunner.query(`CREATE TABLE "auth_sessions" ("key" character varying NOT NULL, "session" json NOT NULL, CONSTRAINT "PK_63b23a68fe57189f2d81dcc4496" PRIMARY KEY ("key"))`);
        await queryRunner.query(`CREATE TABLE "auth_states" ("key" character varying NOT NULL, "state" json NOT NULL, CONSTRAINT "PK_66f98ef4b10365c3ee1ab5d0e5a" PRIMARY KEY ("key"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "auth_states"`);
        await queryRunner.query(`DROP TABLE "auth_sessions"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
    }
}
