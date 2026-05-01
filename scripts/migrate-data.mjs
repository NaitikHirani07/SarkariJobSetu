import { govtJobsList } from '../src/data/jobsData.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning up existing data...');
  await prisma.job.deleteMany();
  await prisma.category.deleteMany();
  
  console.log('Starting migration...');

  for (const jobData of govtJobsList) {
    const { details, ...coreData } = jobData;

    console.log(`Migrating job: ${coreData.organization}`);

    // Create the job and its related records
    await prisma.job.create({
      data: {
        id: coreData.id,
        organization: coreData.organization,
        postName: coreData.postName,
        qualification: coreData.qualification,
        vacancy: coreData.vacancy,
        lastDate: coreData.lastDate,
        title: details.title,
        postDescription: details.postDescription,
        salary: details.postDetails.salary,
        ageLimit: details.postDetails.ageLimit,
        startDate: details.importantDates.startDate,
        examDate: details.importantDates.examDate,
        
        // Categories
        categories: {
          create: coreData.category.map(catName => ({
            category: {
              connectOrCreate: {
                where: { name: catName },
                create: { name: catName }
              }
            }
          }))
        },

        // Notifications
        notifications: {
          create: details.notifications.map(n => ({
            label: n.label,
            value: n.value
          }))
        },

        // Links
        links: {
          create: details.importantLinks.map(l => ({
            label: l.label,
            url: l.url
          }))
        },

        // Selection Process
        selectionProcess: {
          create: details.selectionProcess.map(step => ({
            step: step
          }))
        },

        // Age Relaxation
        ageRelaxations: {
          create: details.ageRelaxation.map(rule => ({
            rule: rule
          }))
        },

        // Application Fees
        applicationFees: {
          create: details.applicationFee.map(fee => ({
            fee: fee
          }))
        }
      }
    });
  }

  console.log('Migration completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
