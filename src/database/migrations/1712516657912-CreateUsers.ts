import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsers1711452057287 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
               name: "users",
               columns: [
                  {
                     name: "id",
                     type: "int",
                     isPrimary: true,
                     isGenerated: true,
                     generationStrategy: "increment",
                  },
                 
                  {
                     name: "name",
                     type: "varchar",
                     length: "40",
                     isNullable: false,
         
    
                  },
                  {
                     name: "surname",
                     type: "varchar",
                     length: "255",
                  
    
                  },
              
                  {
                     name: "username",
                     type: "varchar",
                     length: "255",
                     isUnique: true,
                     isNullable: false,
    
                  },
                  {
                     name: "password",
                     type: "varchar",
                     length: "255",
                  },
                  {
                     name: "email",
                     type: "varchar",
                     length: "255",
                     isUnique: true,
                     isNullable: false,
                  },
    
               ],
            
            }),
            true
         );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }


}

