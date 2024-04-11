import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateArtists1721452591041 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
               name: "artists",
               columns: [
                  {
                     name: "id",
                     type: "int",
                     isPrimary: true,
                     isGenerated: true,
                     generationStrategy: "increment",
                  },
                  {
                    name: "user_id",
                    type: "int",     
                    isPrimary: true,              
                 },
                 {
                  name: "username",
                  type: "varchar",
                  length: "1000",                        
               },

               {
                name: "name",
                type: "varchar",
                length: "1000",                        
             },
             {
                name: "surname",
                type: "varchar",
                length: "1000",                        
             },
               {
                  name: "email",
                  type: "varchar",
                  length: "1000",                        
               },
               {
                  name: "password",
                  type: "varchar",
                  length: "1000",                        
               },
                  {
                    name: "genre",
                    type: "varchar",
                    length: "1000",                        
                 },

             
                 {
                    name: "music",
                    type: "varchar",
                    length: "1000",                       
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
                columnNames: ["user_id"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE", // when user is deleted, artist related to this
               },
           
            ],
            }),
            true
         );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("artists");
    }

}

