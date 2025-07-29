const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addWorkloadData() {
  try {
    console.log('📚 Adding workload data to courses...');
    
    // Get all courses
    const courses = await prisma.course.findMany();
    
    const workloadMappings = [
      // Programming courses - typically heavy workload
      { titleContains: 'COMP1511', effortLevel: 'moderate' },
      { titleContains: 'COMP2521', effortLevel: 'heavy' }, 
      { titleContains: 'COMP1521', effortLevel: 'heavy' },
      { titleContains: 'COMP3900', effortLevel: 'very-heavy' },
      { titleContains: 'COMP6080', effortLevel: 'heavy' },
      
      // Math courses - typically heavy
      { titleContains: 'MATH1131', effortLevel: 'very-heavy' },
      { titleContains: 'MATH1081', effortLevel: 'heavy' },
      
      // Psychology - moderate
      { titleContains: 'PSYC1001', effortLevel: 'moderate' },
      
      // Management/Business - light to moderate
      { titleContains: 'MGMT1001', effortLevel: 'light' },
      { titleContains: 'ACCT1501', effortLevel: 'moderate' },
      { titleContains: 'FINS1613', effortLevel: 'moderate' },
      
      // Arts courses - light
      { titleContains: 'ARTS1000', effortLevel: 'light' },
      
      // Economics - moderate
      { titleContains: 'ECON1101', effortLevel: 'moderate' },
    ];
    
    for (const course of courses) {
      let effortLevel = 'moderate'; // default
      
      // Find matching mapping
      const mapping = workloadMappings.find(m => course.title.includes(m.titleContains));
      if (mapping) {
        effortLevel = mapping.effortLevel;
      } else {
        // Assign based on difficulty if no specific mapping
        const diff = course.difficulty?.toLowerCase();
        if (diff === 'beginner') effortLevel = 'light';
        else if (diff === 'intermediate') effortLevel = 'moderate';
        else if (diff === 'advanced') effortLevel = 'heavy';
        else {
          // Random assignment for demonstration
          const options = ['light', 'moderate', 'heavy'];
          effortLevel = options[Math.floor(Math.random() * options.length)];
        }
      }
      
      // Update course with effort level (stored as a custom field)
      let existingOutcomes = {};
      try {
        if (course.learningOutcomes && typeof course.learningOutcomes === 'string') {
          existingOutcomes = JSON.parse(course.learningOutcomes);
        } else if (course.learningOutcomes && typeof course.learningOutcomes === 'object') {
          existingOutcomes = course.learningOutcomes;
        }
      } catch (e) {
        // If parsing fails, start with empty object
        existingOutcomes = {};
      }
      
      await prisma.course.update({
        where: { id: course.id },
        data: { 
          learningOutcomes: JSON.stringify({
            ...existingOutcomes,
            effortLevel: effortLevel
          })
        }
      });
      
      console.log(`✅ Updated ${course.title}: ${effortLevel} workload`);
    }
    
    console.log('\n🎉 Workload data added successfully!');
  } catch (error) {
    console.error('❌ Error adding workload data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addWorkloadData();
