const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateCourseRating() {
  try {
    // Get the first course and update its rating to be above 4.5
    const course = await prisma.course.findFirst({
      where: {
        NOT: {
          title: {
            contains: "COMP6080"
          }
        }
      }
    });
    
    if (course) {
      await prisma.course.update({
        where: { id: course.id },
        data: { 
          rating: 4.7,
          reviewCount: 89
        }
      });
      
      console.log(`Updated course ${course.title} with rating 4.7`);
    }
    
    // Update PSYC1001 to have a high rating too
    const psycCourse = await prisma.course.findFirst({
      where: {
        title: {
          contains: "PSYC1001"
        }
      }
    });
    
    if (psycCourse) {
      await prisma.course.update({
        where: { id: psycCourse.id },
        data: { 
          rating: 4.6,
          reviewCount: 312
        }
      });
      
      console.log(`Updated PSYC1001 with rating 4.6`);
    }
    
  } catch (error) {
    console.error('Error updating course ratings:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateCourseRating();
