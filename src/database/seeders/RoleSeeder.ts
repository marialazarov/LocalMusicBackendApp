import { Role } from "../../models/Roles";
import { AppDataSource } from "../../data-source";


export const roleSeeder = async () => {
   try {
      await AppDataSource.initialize();

      const roleRepository = AppDataSource.getRepository(Role);

      const userRole = new Role()
      userRole.name = "client";

      const adminRole = new Role()
      adminRole.name = "admin";

      const superadminRole = new Role()
      superadminRole.name = "super_admin";

      await roleRepository.save([userRole, adminRole, superadminRole]);

      console.log("Seeding roles completed successfully");

   } catch (error) {
      console.error("Error seeding the database", error);
   } finally {
      await AppDataSource.destroy();
   }
};
