const { PrismaClient } = require('@prisma/client');

const prismadb = new PrismaClient(); // Instantiate PrismaClient

const predefinedFacilities = [
  "security", "internet", "electricity24_7", "mattressAvailable", "cleanWater", "geyser", 
  "iron", "library", "balcony", "terrace", "meals3Times", "laundry", "playground", "roomCleaning", 
  "smokingZone", "airConditioning", "freeWiFi", "breakfastIncluded", "linenIncluded", "towelsIncluded", 
  "freeCityMaps", "hotShowers", "security24Hours", "keyCardAccess", "luggageStorage", "lockers", 
  "commonRoom", "swimmingPool", "bar", "poolTable", "kitchen", "cooker", "vendingMachines", "washingMachine", 
  "readingLight"
];

async function seed() {
  try {
    // Step 1: Insert predefined facilities into the Facility table
    for (const facilityName of predefinedFacilities) {
      await prismadb.facility.upsert({
        where: { name: facilityName },
        update: {}, // If it already exists, do nothing
        create: { 
          name: facilityName, 
          isDefault: true 
        },
      });
    }
    
    console.log("Predefined facilities inserted.");

    // Step 2: Now, for each hostel, we associate these predefined facilities
    const hostels = await prismadb.hostel.findMany(); // Assuming hostel data exists

    for (const hostel of hostels) {
      const facilityPromises = predefinedFacilities.map(async (facilityName) => {
        const facility = await prismadb.facility.findUnique({
          where: { name: facilityName },
        });

        if (facility) {
          await prismadb.hostelFacilities.upsert({
            where: {
              hostelId_facilityId: {
                hostelId: hostel.id,
                facilityId: facility.id,
              },
            },
            update: {
              isAvailable: true, // Assuming all facilities are available by default
            },
            create: {
              hostelId: hostel.id,
              facilityId: facility.id,
              isAvailable: true,
            },
          });
        }
      });

      // Wait for all facility associations to complete for this hostel
      await Promise.all(facilityPromises);
    }

    console.log("Hostel facilities associated with hostels.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prismadb.$disconnect(); // Ensure the database connection is closed after seeding
  }
}

// Run the seeder
seed();
