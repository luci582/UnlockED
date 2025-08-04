const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Enhanced course descriptions - 2-4 sentence detailed paragraphs
const ENHANCED_DESCRIPTIONS = {
  'COMP1511': `This course provides a comprehensive introduction to programming fundamentals using the C programming language. Students will learn essential concepts including variables, control structures, functions, arrays, and basic data structures through hands-on coding exercises. The course emphasizes problem-solving methodologies and logical thinking skills crucial for software development. By the end of the course, students will be able to write well-structured C programs and understand fundamental computing concepts that form the foundation for advanced computer science studies.`,
  
  'MGMT1001': `This course introduces students to the fundamental principles of managing people and organizations in contemporary business environments. Students explore key management theories, leadership styles, organizational behavior, and team dynamics through case studies and practical applications. The course covers essential topics including motivation, communication, conflict resolution, and strategic decision-making in diverse organizational contexts. Students will develop critical management skills and gain insights into effective leadership practices that are essential for success in modern workplaces.`,
  
  'ACCT1501': `This course provides a solid foundation in financial accounting principles and practices essential for business decision-making. Students learn to prepare, analyze, and interpret financial statements including income statements, balance sheets, and cash flow statements. The course covers fundamental accounting concepts such as double-entry bookkeeping, accrual accounting, and the accounting equation through practical examples and real-world applications. Students will gain valuable skills in financial analysis and reporting that are crucial for careers in business, finance, and accounting.`,
  
  'COMP2521': `This course builds upon programming fundamentals to explore advanced data structures and algorithms essential for efficient software development. Students learn to implement and analyze various data structures including linked lists, trees, graphs, and hash tables, along with fundamental algorithms for searching, sorting, and graph traversal. The course emphasizes algorithm complexity analysis and the selection of appropriate data structures for specific programming problems. Through practical programming assignments, students develop problem-solving skills and learn to write efficient, scalable code that forms the backbone of modern software systems.`,
  
  'MATH1131': `This course introduces students to differential and integral calculus of functions of one variable, providing essential mathematical foundations for science and engineering disciplines. Students learn fundamental concepts including limits, derivatives, and integrals, along with their applications to real-world problems in physics, engineering, and other sciences. The course covers techniques for differentiation and integration, optimization problems, and the fundamental theorem of calculus. Through rigorous mathematical analysis and practical problem-solving, students develop analytical thinking skills and mathematical reasoning abilities crucial for advanced studies in STEM fields.`,
  
  'PSYC1001': `This course provides a comprehensive introduction to the scientific study of human behavior and mental processes from multiple psychological perspectives. Students explore fundamental topics including cognitive processes, learning and memory, personality development, social psychology, and research methodologies used in psychological science. The course emphasizes critical thinking and scientific reasoning through examination of psychological theories and empirical research findings. Students will gain insight into human behavior and develop research skills that are valuable for understanding psychological phenomena and conducting scientific investigations.`,
  
  'COMP3900': `This capstone course provides students with hands-on experience in large-scale software development through collaborative team projects that simulate real-world industry environments. Students work in teams to design, implement, and deliver complete software systems using modern development methodologies including Agile practices and project management techniques. The course emphasizes software engineering principles, code quality, testing strategies, and professional communication skills essential for successful software development careers. Through this comprehensive project experience, students integrate knowledge from previous computer science courses while developing practical skills in teamwork, leadership, and professional software development.`,
  
  'COMP6080': `This advanced course focuses on modern web frontend development technologies and practices essential for building sophisticated user interfaces and interactive web applications. Students learn cutting-edge frontend frameworks, responsive design principles, state management, and API integration techniques used in contemporary web development. The course covers advanced JavaScript concepts, modern development tools, and best practices for creating accessible, performant, and maintainable web applications. Through practical projects and assignments, students develop professional-level skills in frontend development that are highly valued in the technology industry.`
};

async function enhanceCourseDescriptions() {
  try {
    console.log('🚀 Starting course description enhancement...\n');

    // Get all courses
    const courses = await prisma.course.findMany();

    console.log(`📚 Found ${courses.length} courses to enhance\n`);

    for (const course of courses) {
      console.log(`📝 Enhancing: ${course.title}`);
      
      // Extract course code from title
      const codeMatch = course.title.match(/^([A-Z]+\d+)/);
      const courseCode = codeMatch ? codeMatch[1] : null;
      
      let enhancedDescription = course.description;
      
      // Use enhanced description if available
      if (courseCode && ENHANCED_DESCRIPTIONS[courseCode]) {
        enhancedDescription = ENHANCED_DESCRIPTIONS[courseCode];
      } else {
        // Generate enhanced description based on current description and course title
        const currentDesc = course.description || '';
        if (currentDesc.length < 200) { // Only enhance if current description is brief
          enhancedDescription = generateEnhancedDescription(course.title, currentDesc);
        }
      }
      
      // Update the course description
      await prisma.course.update({
        where: { id: course.id },
        data: {
          description: enhancedDescription
        }
      });
      
      console.log(`   ✅ Description enhanced (${enhancedDescription.length} characters)`);
      console.log(`   📄 Preview: ${enhancedDescription.substring(0, 100)}...\n`);
    }
    
    console.log('✨ All course descriptions enhanced successfully!');
    
  } catch (error) {
    console.error('❌ Error enhancing course descriptions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

function generateEnhancedDescription(title, currentDescription) {
  // Extract subject area and keywords from title
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('programming') || titleLower.includes('computer')) {
    return `This course introduces students to fundamental concepts in computer programming and software development. Students learn essential programming techniques, problem-solving methodologies, and computational thinking skills through hands-on coding exercises and practical projects. The course emphasizes logical reasoning, algorithm design, and best practices in software development. Students will gain valuable programming skills and develop the analytical thinking abilities necessary for success in computer science and technology-related fields.`;
  } else if (titleLower.includes('management') || titleLower.includes('business')) {
    return `This course provides comprehensive coverage of essential business and management principles in modern organizational environments. Students explore key concepts including strategic planning, leadership development, team management, and decision-making processes through case studies and practical applications. The course emphasizes critical thinking, communication skills, and ethical business practices. Students will develop management competencies and business acumen essential for leadership roles in diverse organizational settings.`;
  } else if (titleLower.includes('psychology') || titleLower.includes('social')) {
    return `This course examines human behavior and psychological processes from scientific and theoretical perspectives. Students explore fundamental concepts in psychology including cognition, development, social influences, and research methodologies through empirical studies and theoretical frameworks. The course emphasizes critical thinking, scientific reasoning, and ethical considerations in psychological research. Students will gain insights into human behavior and develop research skills valuable for understanding psychological phenomena and social interactions.`;
  } else if (titleLower.includes('math') || titleLower.includes('calculus') || titleLower.includes('statistics')) {
    return `This course provides rigorous training in mathematical concepts and analytical techniques essential for scientific and technical disciplines. Students learn fundamental mathematical principles, problem-solving strategies, and quantitative reasoning skills through theoretical exploration and practical applications. The course emphasizes logical thinking, mathematical proof techniques, and the application of mathematical concepts to real-world problems. Students will develop strong analytical abilities and mathematical foundations crucial for advanced studies in science, engineering, and mathematics.`;
  } else if (titleLower.includes('accounting') || titleLower.includes('finance')) {
    return `This course introduces students to fundamental principles of accounting and financial management in business organizations. Students learn essential concepts including financial statement preparation, analysis techniques, and accounting principles through practical examples and real-world case studies. The course emphasizes ethical business practices, regulatory compliance, and decision-making skills using financial information. Students will develop competencies in financial analysis and accounting practices essential for careers in business, finance, and accounting.`;
  } else {
    // Generic enhanced description
    return `${currentDescription || 'This course provides comprehensive coverage of essential concepts and skills in the subject area.'} Students engage with fundamental theories, practical applications, and current developments in the field through interactive learning experiences and hands-on projects. The course emphasizes critical thinking, analytical skills, and professional competencies relevant to the discipline. Students will develop both theoretical understanding and practical abilities that prepare them for advanced study and professional success in related fields.`;
  }
}

enhanceCourseDescriptions();
