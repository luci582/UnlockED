const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function assignSkillsToCourses() {
  try {
    // Find the courses
    const comp6080 = await prisma.course.findFirst({
      where: { title: { contains: 'COMP6080' } }
    });
    
    const comp3900 = await prisma.course.findFirst({
      where: { title: { contains: 'COMP3900' } }
    });
    
    if (!comp6080 || !comp3900) {
      console.log('Courses not found');
      return;
    }
    
    console.log('Found courses:', comp6080.title, comp3900.title);
    
    // Get skills
    const allSkills = await prisma.skill.findMany();
    const skillMap = {};
    allSkills.forEach(skill => {
      skillMap[skill.name] = skill.id;
    });
    
    // COMP6080 - Web Frontend Programming skills
    const comp6080Skills = [
      'React', 'JavaScript', 'HTML/CSS', 'Node.js', 'Express.js',
      'RESTful APIs', 'UI/UX Design', 'Git', 'Testing'
    ];
    
    // COMP3900 - Computer Science Project skills  
    const comp3900Skills = [
      'Software Engineering', 'Project Management', 'Team Collaboration',
      'Agile Development', 'Git', 'Database Design', 'Testing',
      'JavaScript', 'React', 'Node.js'
    ];
    
    // Clear existing skills for these courses
    await prisma.courseSkill.deleteMany({
      where: { courseId: { in: [comp6080.id, comp3900.id] } }
    });
    
    // Add COMP6080 skills
    for (const skillName of comp6080Skills) {
      if (skillMap[skillName]) {
        await prisma.courseSkill.create({
          data: {
            courseId: comp6080.id,
            skillId: skillMap[skillName]
          }
        });
        console.log(`Added ${skillName} to COMP6080`);
      } else {
        console.log(`Skill ${skillName} not found`);
      }
    }
    
    // Add COMP3900 skills
    for (const skillName of comp3900Skills) {
      if (skillMap[skillName]) {
        await prisma.courseSkill.create({
          data: {
            courseId: comp3900.id,
            skillId: skillMap[skillName]
          }
        });
        console.log(`Added ${skillName} to COMP3900`);
      } else {
        console.log(`Skill ${skillName} not found`);
      }
    }
    
    console.log('Skills assigned successfully!');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

assignSkillsToCourses();
