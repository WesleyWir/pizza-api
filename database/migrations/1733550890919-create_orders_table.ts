import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOrdersTable1733550890919 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: "orders",
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: "observation",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "total_preparation_time",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "total_price",
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable(`orders`);
    }

}
