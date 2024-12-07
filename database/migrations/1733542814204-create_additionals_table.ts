import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAdditionalsTable1733542814204 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: "additionals",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "additional_time",
                        type: "int",
                        isNullable: false,
                        default: 0
                    },
                    {
                        name: "additional_price",
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
        queryRunner.dropTable(`additionals`);
    }

}
