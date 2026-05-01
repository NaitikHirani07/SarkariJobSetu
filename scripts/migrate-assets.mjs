import { categories, educationVacancies, postWiseRecruitment, sarkariResultInfo } from '../src/data/assets.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting Assets Migration ---');

  // 1. Migrate Categories
  console.log('Migrating Categories...');
  await prisma.assetCategory.deleteMany();
  for (const cat of categories) {
    await prisma.assetCategory.create({
      data: {
        id: cat.id,
        name: cat.name,
        icon: cat.icon || null,
        link: cat.link,
        useEmoji: cat.useEmoji || false,
      },
    });
  }

  // 2. Migrate Education Vacancies
  console.log('Migrating Education Vacancies...');
  await prisma.educationVacancy.deleteMany();
  for (const item of educationVacancies) {
    await prisma.educationVacancy.create({
      data: {
        id: item.id,
        name: item.name,
        link: item.link,
      },
    });
  }

  // 3. Migrate Post Wise Recruitment
  console.log('Migrating Post Wise Recruitment...');
  await prisma.postWiseRecruitment.deleteMany();
  for (const item of postWiseRecruitment) {
    await prisma.postWiseRecruitment.create({
      data: {
        id: item.id,
        name: item.name,
        link: item.link,
      },
    });
  }

  // 4. Migrate FAQs
  console.log('Migrating FAQs...');
  await prisma.fAQ.deleteMany();
  for (const faq of sarkariResultInfo.faqs) {
    await prisma.fAQ.create({
      data: {
        question: faq.question,
        answer: faq.answer,
      },
    });
  }

  console.log('--- Assets Migration Completed Successfully! ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
