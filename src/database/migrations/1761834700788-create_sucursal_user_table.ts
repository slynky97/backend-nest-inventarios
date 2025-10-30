import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSucursalUserTable1761834700788 implements MigrationInterface {
    name = 'CreateSucursalUserTable1761834700788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sucursales_user" ("id" SERIAL NOT NULL, "userId" uuid, "sucursalId" integer, "roleId" integer, CONSTRAINT "PK_d0d128cea01d84e89ebb07f8f85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sucursales_user" ADD CONSTRAINT "FK_9e5465e2e14ea19a6e0b198aff7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sucursales_user" ADD CONSTRAINT "FK_db5c778657f528e40a641d89c82" FOREIGN KEY ("sucursalId") REFERENCES "sucursales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sucursales_user" ADD CONSTRAINT "FK_df200f824b784c6c08e5566050a" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sucursales_user" DROP CONSTRAINT "FK_df200f824b784c6c08e5566050a"`);
        await queryRunner.query(`ALTER TABLE "sucursales_user" DROP CONSTRAINT "FK_db5c778657f528e40a641d89c82"`);
        await queryRunner.query(`ALTER TABLE "sucursales_user" DROP CONSTRAINT "FK_9e5465e2e14ea19a6e0b198aff7"`);
        await queryRunner.query(`DROP TABLE "sucursales_user"`);
    }

}
