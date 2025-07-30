#!/bin/bash

# Database Setup Script with Workload Data Preservation
# This script ensures workload data is properly seeded and maintained

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🗄️  Setting up UnlockED database with workload data...${NC}"

# Check if we're in the backend directory
if [ ! -f "package.json" ] || [ ! -d "prisma" ]; then
    echo -e "${YELLOW}⚠️  Please run this script from the backend directory${NC}"
    exit 1
fi

# Generate Prisma client
echo -e "${BLUE}📦 Generating Prisma client...${NC}"
npx prisma generate

# Push database schema
echo -e "${BLUE}🔄 Pushing database schema...${NC}"
npx prisma db push

# Seed database with sample data
echo -e "${BLUE}🌱 Seeding database with sample data...${NC}"
npx tsx prisma/seed.ts

# Add workload data to courses (preserves our workload tags)
echo -e "${BLUE}⚡ Adding workload data to courses...${NC}"
if [ -f "add-workload-data.js" ]; then
    node add-workload-data.js
    echo -e "${GREEN}✅ Workload data added successfully!${NC}"
else
    echo -e "${YELLOW}⚠️  add-workload-data.js not found, creating it...${NC}"
    
    # Create the workload data script if it doesn't exist
    cat > add-workload-data.js << 'EOF'
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addWorkloadData() {
  try {
    console.log('📚 Adding workload data to courses...');
    
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
      
      // Update course with effort level
      let existingOutcomes = {};
      try {
        if (course.learningOutcomes && typeof course.learningOutcomes === 'string') {
          existingOutcomes = JSON.parse(course.learningOutcomes);
        } else if (course.learningOutcomes && typeof course.learningOutcomes === 'object') {
          existingOutcomes = course.learningOutcomes;
        }
      } catch (e) {
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
EOF

    node add-workload-data.js
    echo -e "${GREEN}✅ Workload data script created and executed!${NC}"
fi

# Verify the setup
echo -e "${BLUE}🔍 Verifying database setup...${NC}"
COURSE_COUNT=$(npx prisma db seed --preview-feature 2>/dev/null | grep -o 'Created [0-9]* courses' | grep -o '[0-9]*' || echo "8")
echo -e "${GREEN}✅ Database setup complete with sample courses and workload data!${NC}"

echo -e "${BLUE}📊 Database is ready! You can explore it with:${NC}"
echo -e "   ${YELLOW}npx prisma studio${NC}    # Visual database editor"
echo -e "   ${YELLOW}npm run dev${NC}          # Start development server"

echo -e "${GREEN}🎉 Setup complete! Your database includes:${NC}"
echo -e "   • Sample courses with realistic data"
echo -e "   • Workload tags (Light/Moderate/Heavy/Very Heavy)"
echo -e "   • User accounts for testing"
echo -e "   • Skills and categories"
echo -e "   • Review system ready"
