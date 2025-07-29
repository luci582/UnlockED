const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateCoursesAndFaculties() {
  try {
    // First, let's create faculty categories
    const faculties = [
      { 
        name: 'Computer Science & Engineering', 
        slug: 'computer-science-engineering',
        description: 'Computing, software engineering, and IT courses' 
      },
      { 
        name: 'Business School', 
        slug: 'business-school',
        description: 'Business, management, and commerce courses' 
      },
      { 
        name: 'Science', 
        slug: 'science',
        description: 'Mathematics, physics, chemistry, and life sciences' 
      },
      { 
        name: 'Arts, Design & Architecture', 
        slug: 'arts-design-architecture',
        description: 'Creative arts, design, and architectural studies' 
      },
      { 
        name: 'Engineering', 
        slug: 'engineering',
        description: 'Engineering disciplines and applied sciences' 
      },
      { 
        name: 'Medicine & Health', 
        slug: 'medicine-health',
        description: 'Healthcare, medicine, and health sciences' 
      },
      { 
        name: 'Law & Justice', 
        slug: 'law-justice',
        description: 'Legal studies and justice programs' 
      },
      { 
        name: 'Arts & Social Sciences', 
        slug: 'arts-social-sciences',
        description: 'Psychology, social sciences, and humanities' 
      }
    ];

    console.log('Creating faculty categories...');
    for (const faculty of faculties) {
      try {
        await prisma.category.create({
          data: faculty
        });
        console.log(`Created faculty: ${faculty.name}`);
      } catch (error) {
        if (error.code === 'P2002') {
          console.log(`Faculty ${faculty.name} already exists`);
        } else {
          throw error;
        }
      }
    }

    // Get all categories including the new ones
    const allCategories = await prisma.category.findMany();
    console.log('\nAll categories:', allCategories.map(c => c.name));

    // Now update courses with ratings and assign them to faculty categories
    const courseUpdates = [
      {
        title: 'COMP1511 - Programming Fundamentals',
        rating: 4.7,
        faculty: 'Computer Science & Engineering',
        additionalCategories: ['Programming']
      },
      {
        title: 'MGMT1001 - Managing Organisations and People',
        rating: 4.2,
        faculty: 'Business School',
        additionalCategories: ['Business']
      },
      {
        title: 'ACCT1501 - Accounting and Financial Management 1A',
        rating: 4.0,
        faculty: 'Business School',
        additionalCategories: ['Business']
      },
      {
        title: 'COMP2521 - Data Structures and Algorithms',
        rating: 4.4,
        faculty: 'Computer Science & Engineering',
        additionalCategories: ['Programming', 'Data Science']
      },
      {
        title: 'MATH1131 - Calculus',
        rating: 3.8,
        faculty: 'Science',
        additionalCategories: []
      },
      {
        title: 'PSYC1001 - Introduction to Psychology',
        rating: 4.6,
        faculty: 'Arts & Social Sciences',
        additionalCategories: []
      },
      {
        title: 'COMP3900 - Computer Science Project',
        rating: 4.3,
        faculty: 'Computer Science & Engineering',
        additionalCategories: ['Programming']
      },
      {
        title: 'COMP6080 - Web Frontend Programming',
        rating: 4.8,
        faculty: 'Computer Science & Engineering',
        additionalCategories: ['Programming', 'Web Development']
      }
    ];

    console.log('\nUpdating courses...');
    for (const courseUpdate of courseUpdates) {
      const course = await prisma.course.findFirst({
        where: { title: courseUpdate.title }
      });

      if (course) {
        // Update rating
        await prisma.course.update({
          where: { id: course.id },
          data: { 
            rating: courseUpdate.rating,
            reviewCount: Math.floor(Math.random() * 100) + 50 // Random review count between 50-150
          }
        });

        // Find faculty category
        const facultyCategory = allCategories.find(c => c.name === courseUpdate.faculty);
        if (facultyCategory) {
          // Check if already assigned to avoid duplicates
          const existingAssignment = await prisma.courseCategory.findFirst({
            where: {
              courseId: course.id,
              categoryId: facultyCategory.id
            }
          });

          if (!existingAssignment) {
            await prisma.courseCategory.create({
              data: {
                courseId: course.id,
                categoryId: facultyCategory.id
              }
            });
          }
        }

        // Assign additional categories
        for (const categoryName of courseUpdate.additionalCategories) {
          const category = allCategories.find(c => c.name === categoryName);
          if (category) {
            const existingAssignment = await prisma.courseCategory.findFirst({
              where: {
                courseId: course.id,
                categoryId: category.id
              }
            });

            if (!existingAssignment) {
              await prisma.courseCategory.create({
                data: {
                  courseId: course.id,
                  categoryId: category.id
                }
              });
            }
          }
        }

        console.log(`Updated ${courseUpdate.title} - Rating: ${courseUpdate.rating}, Faculty: ${courseUpdate.faculty}`);
      }
    }

    console.log('\nCourse and faculty updates completed!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateCoursesAndFaculties();
