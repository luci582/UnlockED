const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addSkillsToCourses() {
  console.log('🎯 Adding skills to UNSW courses...');
  
  try {
    // Get all skills and courses
    const skills = await prisma.skill.findMany();
    const courses = await prisma.course.findMany();
    
    console.log(`Found ${skills.length} skills and ${courses.length} courses`);
    
    // Define skill mappings for each course
    const courseSkillMappings = [
      {
        courseTitle: "COMP1511 - Programming Fundamentals",
        skills: ["JavaScript", "Python", "Algorithms", "Problem Solving"],
        levels: ["HEAVY", "MEDIUM", "HEAVY", "HEAVY"]
      },
      {
        courseTitle: "MGMT1001 - Managing Organisations and People", 
        skills: ["Leadership", "Management", "Communication", "Teamwork"],
        levels: ["HEAVY", "VERY_HEAVY", "HEAVY", "HEAVY"]
      },
      {
        courseTitle: "ACCT1501 - Accounting and Financial Management 1A",
        skills: ["Accounting", "Finance", "Analysis", "Excel"],
        levels: ["VERY_HEAVY", "HEAVY", "HEAVY", "MEDIUM"]
      },
      {
        courseTitle: "COMP2521 - Data Structures and Algorithms",
        skills: ["Algorithms", "Data Structures", "C Programming", "Problem Solving"],
        levels: ["VERY_HEAVY", "VERY_HEAVY", "HEAVY", "HEAVY"]
      },
      {
        courseTitle: "MATH1131 - Calculus",
        skills: ["Mathematics", "Calculus", "Problem Solving", "Analysis"],
        levels: ["VERY_HEAVY", "VERY_HEAVY", "HEAVY", "HEAVY"]
      },
      {
        courseTitle: "PSYC1001 - Introduction to Psychology",
        skills: ["Psychology", "Research", "Statistics", "Writing"],
        levels: ["VERY_HEAVY", "HEAVY", "MEDIUM", "HEAVY"]
      }
    ];
    
    for (const mapping of courseSkillMappings) {
      const course = courses.find(c => c.title === mapping.courseTitle);
      if (!course) {
        console.log(`⚠️ Course not found: ${mapping.courseTitle}`);
        continue;
      }
      
      console.log(`📚 Adding skills to: ${course.title}`);
      
      for (let i = 0; i < mapping.skills.length; i++) {
        const skillName = mapping.skills[i];
        const level = mapping.levels[i];
        
        // Find or create skill
        let skill = skills.find(s => s.name === skillName);
        if (!skill) {
          skill = await prisma.skill.create({
            data: {
              name: skillName,
              description: `${skillName} skill`,
              category: 'General',
              icon: skillName.toLowerCase().replace(/\s+/g, '-'),
              color: '#3B82F6'
            }
          });
          skills.push(skill);
          console.log(`  ✨ Created new skill: ${skillName}`);
        }
        
        // Add course-skill relationship
        try {
          await prisma.courseSkill.create({
            data: {
              courseId: course.id,
              skillId: skill.id,
              level: level,
              isCore: i < 2, // First 2 skills are core
              percentage: i === 0 ? 90 : i === 1 ? 80 : i === 2 ? 60 : 40
            }
          });
          console.log(`  ✅ Added skill: ${skillName} (${level})`);
        } catch (error) {
          if (error.code === 'P2002') {
            console.log(`  ⚠️ Skill already exists: ${skillName}`);
          } else {
            throw error;
          }
        }
      }
    }
    
    console.log('🎉 Successfully added skills to all courses!');
  } catch (error) {
    console.error('❌ Error adding skills:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addSkillsToCourses();
