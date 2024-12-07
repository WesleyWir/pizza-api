import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePizzasTable1733551245381 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableName = 'pizzas';
        queryRunner.createTable(
            new Table({
                name: tableName,
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: 'order_id',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'size_id',
                        type: 'int',
                    },
                    {
                        name: 'flavor_id',
                        type: 'int',
                    },
                    {
                        name: "preparation_time",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "price",
                        type: "float",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            tableName,
            new TableForeignKey({
                columnNames: ['order_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'orders',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            tableName,
            new TableForeignKey({
                columnNames: ['size_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'sizes',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            tableName,
            new TableForeignKey({
                columnNames: ['flavor_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'flavors',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable(`pizzas`);
    }

}
