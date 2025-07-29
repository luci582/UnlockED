const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const unswCourses = [
  {
    title: "Programming Fundamentals",
    description: "An introduction to programming and problem solving using the C programming language. This course covers basic programming concepts, data structures, and algorithms.",
    instructor: "Dr. Marc Chee",
    institution: "UNSW Sydney",
    difficulty: "BEGINNER",
    courseUrl: "https://www.handbook.unsw.edu.au/undergraduate/courses/2024/COMP1511",
    duration: "One semester",
    isFree: false,
    price: 0,
    language: "English",
    reviewCount: 0,
    enrollmentCount: 0,
    status: "PUBLISHED",
    isActive: true,
    prerequisites: "None",
    learningOutcomes: "Basic programming skills, problem-solving techniques, understanding of data structures"
  },
  {
    title: "Managing Organisations and People",
    description: "Introduction to the theory and practice of management. Topics include organizational behaviour, leadership, motivation, and team dynamics.",
    instructor: "Prof. Sarah Williams",
    institution: "UNSW Sydney", 
    difficulty: "BEGINNER",
    courseUrl: "https://www.handbook.unsw.edu.au/undergraduate/courses/2024/MGMT1001",
    duration: "One semester",
    isFree: false,
    price: 0,
    language: "English",
    reviewCount: 0,
    enrollmentCount: 0,
    status: "PUBLISHED",
    isActive: true,
    prerequisites: "None",
    learningOutcomes: "Understanding of management principles, leadership skills, team collaboration"
  },
  {
    title: "Accounting and Financial Management 1A",
    description: "Introduction to financial accounting principles, including the accounting equation, financial statements, and basic accounting procedures.",
    instructor: "Dr. Jennifer Chen",
    institution: "UNSW Sydney",
    difficulty: "BEGINNER", 
    courseUrl: "https://www.handbook.unsw.edu.au/undergraduate/courses/2024/ACCT1501",
    duration: "One semester",
    isFree: false,
    price: 0,
    language: "English",
    reviewCount: 0,
    enrollmentCount: 0,
    status: "PUBLISHED",
    isActive: true,
    prerequisites: "None",
    learningOutcomes: "Financial accounting fundamentals, financial statement preparation and analysis"
  },
  {
    title: "Data Structures and Algorithms",
    description: "Advanced programming concepts including abstract data types, recursion, searching and sorting algorithms, and algorithm analysis.",
    instructor: "Dr. Alan Blair",
    institution: "UNSW Sydney",
    difficulty: "INTERMEDIATE",
    courseUrl: "https://www.handbook.unsw.edu.au/undergraduate/courses/2024/COMP2521",
    duration: "One semester", 
    isFree: false,
    price: 0,
    language: "English",
    reviewCount: 0,
    enrollmentCount: 0,
    status: "PUBLISHED",
    isActive: true,
    prerequisites: "COMP1511 Programming Fundamentals",
    learningOutcomes: "Advanced programming skills, algorithm design and analysis, data structure implementation"
  },
  {
    title: "Calculus",
    description: "Differential and integral calculus of functions of one variable. Applications to physics, engineering, and other sciences.",
    instructor: "Prof. David Angell",
    institution: "UNSW Sydney",
    difficulty: "INTERMEDIATE",
    courseUrl: "https://www.handbook.unsw.edu.au/undergraduate/courses/2024/MATH1131",
    duration: "One semester",
    isFree: false,
    price: 0,
    language: "English", 
    reviewCount: 0,
    enrollmentCount: 0,
    status: "PUBLISHED",
    isActive: true,
    prerequisites: "HSC Mathematics Extension 1 or equivalent",
    learningOutcomes: "Differential calculus, integral calculus, applications to real-world problems"
  },
  {
    title: "Introduction to Psychology",
    description: "An overview of psychology as a scientific discipline, covering topics such as learning, memory, perception, personality, and social psychology.",
    instructor: "Dr. Lisa Williams",
    institution: "UNSW Sydney",
    difficulty: "BEGINNER",
    courseUrl: "https://www.handbook.unsw.edu.au/undergraduate/courses/2024/PSYC1001",
    duration: "One semester",
    isFree: false,
    price: 0,
    language: "English",
    reviewCount: 0,
    enrollmentCount: 0,
    status: "PUBLISHED", 
    isActive: true,
    prerequisites: "None",
    learningOutcomes: "Understanding of psychological principles, research methods, human behavior analysis"
  }
];

async function addUnswCourses() {
  console.log('🎓 Adding UNSW courses to database...');
  
  try {
    // Get a user to be the creator (using the admin user)
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });
    
    if (!adminUser) {
      throw new Error('No admin user found');
    }

    for (const courseData of unswCourses) {
      const course = await prisma.course.create({
        data: {
          ...courseData,
          createdById: adminUser.id
        }
      });
      console.log(`✅ Added: ${course.title}`);
    }
    
    console.log('🎉 Successfully added all UNSW courses!');
  } catch (error) {
    console.error('❌ Error adding courses:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addUnswCourses();
