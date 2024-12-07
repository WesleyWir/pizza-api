import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePizzaAdditionalsTable1733552082362 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableName = 'pizza_additionals';
        await queryRunner.createTable(
            new Table({
                name: tableName,
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: 'pizza_id',
                        type: 'int',
                    },
                    {
                        name: 'additional_id',
                        type: 'int',
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            tableName,
            new TableForeignKey({
                columnNames: ['pizza_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'pizzas',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            tableName,
            new TableForeignKey({
                columnNames: ['additional_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'additionals',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable(`pizza_additionals`);
    }

}
