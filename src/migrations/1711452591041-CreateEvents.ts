import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateEvents1711452591041 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
        new Table({
           name: "appointments",
           columns: [
              {
                 name: "id",
                 type: "int",
                 isPrimary: true,
                 isGenerated: true,
                 generationStrategy: "increment",
              },
           
             {
                name: "artist_id",
                type: "int",
                isPrimary: true,
                isNullable: true
             },
              {
                 name: "date",
                 type: "varchar",
                 length: "255",
                 isNullable: true                    
              },
              {
                name: "location",
                type: "varchar",
                length: "255",
                isNullable: true
                
             },
             {
              name: "created_at",
              type: "timestamp",
              default: "CURRENT_TIMESTAMP"
          },
          {
              name: "updated_at",
              type: "timestamp",
              default: "CURRENT_TIMESTAMP",
              onUpdate: "CURRENT_TIMESTAMP"
          },

           ],
           foreignKeys: [
        
           {
            columnNames: ["artist_id"],
            referencedTableName: "artists",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
           },
        ],
        }),
        true
     );
}

public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("events");
}

}
