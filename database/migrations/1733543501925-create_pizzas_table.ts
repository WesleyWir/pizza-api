import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePizzasTable1733543501925 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: "pizzas",
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
                        isNullable: true
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
                        name: "price",
                        type: "float",
                        isNullable: false,
                        default: 0
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
        queryRunner.dropTable(`pizzas`);
    }

}
