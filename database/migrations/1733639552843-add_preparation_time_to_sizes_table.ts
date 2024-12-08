import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPreparationTimeToSizesTable1733639552843 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE sizes 
            ADD COLUMN preparation_time int NOT NULL DEFAULT 60 
            AFTER price;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("sizes", "preparation_time")
    }

}
