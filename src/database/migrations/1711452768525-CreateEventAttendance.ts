import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateEventAttendance1711452768525 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
        new Table({
           name: "event_attendance",
           columns: [
              {
                 name: "id",
                 type: "int",
                 isPrimary: true,
                 isGenerated: true,
                 generationStrategy: "increment",
              },
              {
                name: "event_id",
                type: "int",
                isPrimary: true,
               
             },
             {
                name: "user_id",
                type: "int",
                isPrimary: true,
         
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
            onDelete: "CASCADE",
           },
           {
            columnNames: ["event_id"],
            referencedTableName: "events",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
           },
        ],
        }),
        true
     );
}

public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("event_attendance");
}

}
