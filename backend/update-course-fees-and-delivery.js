const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// UNSW 2024 undergraduate course fees (per unit of credit)
const UNSW_FEES = {
  // Commonwealth Supported Place (CSP) - local students
  local_fee: 565, // Per unit of credit - $3,390 per semester for 6 units
  // International student fees - uniform across faculties
  international_fees: {
    'Arts & Social Sciences': 1170,
    'Business School': 1170, 
    'Computer Science & Engineering': 1170,
    'Engineering': 1170,
    'Medicine & Health': 1170,
    'Science': 1170,
    'Law & Justice': 1170,
    'Built Environment': 1170,
    'Programming': 1170,
    'Data Science': 1170,
    'Business': 1170
  }
};

// Course delivery modes based on typical UNSW offerings
const DELIVERY_MODES = {
  'Programming Fundamentals': 'hybrid',          // COMP1511 - Labs + online content
  'Managing Organisations and People': 'in-person',   // MGMT1001 - Interactive workshops
  'Accounting and Financial Management 1A': 'hybrid', // ACCT1501 - Lectures + tutorials
  'Data Structures and Algorithms': 'hybrid',         // COMP2521 - Programming labs
  'Calculus': 'in-person',                            // MATH1131 - Traditional math
  'Introduction to Psychology': 'online',             // PSYC1001 - Large lecture format
  'Web Frontend Programming': 'hybrid',               // COMP6080 - Project-based
  'Computer Science Project': 'in-person'             // COMP3900 - Team collaboration
};

async function updateCourseFeesAndDelivery() {
  try {
    console.log('🚀 Starting course fees and delivery mode updates...\n');

    // Get all courses
    const courses = await prisma.course.findMany({
      include: {
        categories: {
          include: {
            category: true
          }
        }
      }
    });

    console.log(`📚 Found ${courses.length} courses to update\n`);

    for (const course of courses) {
      console.log(`📝 Updating: ${course.title}`);
      
      // Determine faculty from categories
      let faculty = 'Science'; // Default
      if (course.categories && course.categories.length > 0) {
        faculty = course.categories[0].category.name;
      }
      
      // Calculate fees (6 units of credit per course is standard)
      const unitsOfCredit = 6;
      const localFee = UNSW_FEES.local_fee * unitsOfCredit;
      const internationalFee = (UNSW_FEES.international_fees[faculty] || 1170) * unitsOfCredit;
      
      // Determine delivery mode
      let deliveryMode = 'hybrid'; // Default
      for (const [courseKeyword, mode] of Object.entries(DELIVERY_MODES)) {
        if (course.title.toLowerCase().includes(courseKeyword.toLowerCase()) ||
            course.title.toLowerCase().includes(courseKeyword.toLowerCase().replace(/\s+/g, ''))) {
          deliveryMode = mode;
          break;
        }
      }
      
      // Assign based on course type if no specific match
      if (deliveryMode === 'hybrid') {
        if (course.title.toLowerCase().includes('programming') || 
            course.title.toLowerCase().includes('computer') ||
            course.title.toLowerCase().includes('comp')) {
          deliveryMode = 'hybrid';
        } else if (course.title.toLowerCase().includes('management') ||
                   course.title.toLowerCase().includes('psychology') ||
                   course.title.toLowerCase().includes('arts')) {
          deliveryMode = Math.random() > 0.5 ? 'online' : 'in-person';
        } else if (course.title.toLowerCase().includes('math') ||
                   course.title.toLowerCase().includes('calculus') ||
                   course.title.toLowerCase().includes('science')) {
          deliveryMode = 'in-person';
        }
      }
      
      // Update the course with new pricing and delivery info
      const updatedCourse = await prisma.course.update({
        where: { id: course.id },
        data: {
          price: localFee, // Store local fee as main price
          isFree: false,
          // Store delivery mode and international fee in learningOutcomes as JSON
          learningOutcomes: JSON.stringify({
            ...(typeof course.learningOutcomes === 'string' ? 
                JSON.parse(course.learningOutcomes || '{}') : 
                course.learningOutcomes || {}),
            deliveryMode: deliveryMode,
            localFee: localFee,
            internationalFee: internationalFee,
            feesDescription: `Local students (CSP): $${localFee.toLocaleString()}/semester | International students: $${internationalFee.toLocaleString()}/semester`
          })
        }
      });
      
      console.log(`   ✅ Local Fee: $${localFee.toLocaleString()}`);
      console.log(`   🌍 International Fee: $${internationalFee.toLocaleString()}`);
      console.log(`   📡 Delivery Mode: ${deliveryMode}`);
      console.log(`   🏫 Faculty: ${faculty}\n`);
    }
    
    console.log('✨ Course fees and delivery modes updated successfully!');
    
  } catch (error) {
    console.error('❌ Error updating course fees and delivery:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateCourseFeesAndDelivery();
