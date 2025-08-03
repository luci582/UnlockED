export interface Course {
  id: string;
  title: string;
  code: string;
  categories: Array<{
    category: {
      id: string;
      name: string;
      slug: string;
      description?: string;
    };
  }>;
  rating: number;
  reviewCount: number;
  skills: string[];
  mode: "online" | "in-person" | "hybrid";
  effortLevel?: "light" | "moderate" | "heavy" | "very-heavy";
  featured?: boolean;
  isNew?: boolean;
}

export interface CourseDetails extends Course {
  description: string;
  checklist: string[];
  assessments: Array<{
    name: string;
    description: string;
  }>;
  detailedSkills?: string[];
  videoUrl?: string;
  tips?: string[];
}

// Mock course data
export const allCourses: Course[] = [
  {
    id: "comp1511",
    title: "Programming Fundamentals",
    code: "COMP1511",
    faculty: "Engineering",
    rating: 4.5,
    reviewCount: 234,
    skills: ["Programming", "Problem Solving", "Logic", "Algorithms"],
    mode: "hybrid",
    effortLevel: "moderate",
    featured: true,
  },
  {
    id: "mgmt1001", 
    title: "Managing Organisations and People",
    code: "MGMT1001",
    faculty: "Business School",
    rating: 4.2,
    reviewCount: 189,
    skills: ["Leadership", "Teamwork", "Communication", "Management"],
    mode: "in-person",
    effortLevel: "light",
  },
  {
    id: "psyc1001",
    title: "Psychology 1A",
    code: "PSYC1001", 
    faculty: "Science",
    rating: 4.7,
    reviewCount: 312,
    skills: ["Research", "Critical Thinking", "Analysis", "Statistics"],
    mode: "online",
    effortLevel: "heavy",
    featured: true,
  },
  {
    id: "math1131",
    title: "Mathematics 1A",
    code: "MATH1131",
    faculty: "Science", 
    rating: 3.8,
    reviewCount: 156,
    skills: ["Calculus", "Problem Solving", "Logic", "Analysis"],
    mode: "in-person",
    effortLevel: "very-heavy",
  },
  {
    id: "econ1101",
    title: "Microeconomics 1",
    code: "ECON1101",
    faculty: "Business School",
    rating: 4.1,
    reviewCount: 203,
    skills: ["Economics", "Critical Thinking", "Analysis", "Mathematics"],
    mode: "hybrid",
    effortLevel: "moderate",
  },
  {
    id: "arts1000",
    title: "Arts Foundation Course",
    code: "ARTS1000",
    faculty: "Arts & Social Sciences",
    rating: 4.4,
    reviewCount: 98,
    skills: ["Writing", "Research", "Critical Thinking", "Communication"],
    mode: "online",
    effortLevel: "light",
    isNew: true,
  },
  {
    id: "comp1521",
    title: "Computer Systems Fundamentals",
    code: "COMP1521",
    faculty: "Engineering",
    rating: 4.3,
    reviewCount: 178,
    skills: ["Programming", "Systems", "Assembly", "Hardware"],
    mode: "hybrid",
    effortLevel: "heavy",
  },
  {
    id: "fins1613",
    title: "Business Finance",
    code: "FINS1613",
    faculty: "Business School",
    rating: 3.9,
    reviewCount: 145,
    skills: ["Finance", "Excel", "Analysis", "Mathematics"],
    mode: "in-person",
    effortLevel: "moderate",
  },
  {
    id: "comp3511",
    title: "Human Computer Interaction",
    code: "COMP3511",
    faculty: "Engineering",
    rating: 4.6,
    reviewCount: 89,
    skills: ["UX Design", "Research", "Prototyping", "User Testing"],
    mode: "hybrid",
    effortLevel: "moderate",
    isNew: true,
  },
  {
    id: "arts2000",
    title: "Digital Humanities",
    code: "ARTS2000",
    faculty: "Arts & Social Sciences",
    rating: 4.3,
    reviewCount: 67,
    skills: ["Digital Research", "Data Visualization", "Critical Thinking", "Technology"],
    mode: "online",
    effortLevel: "light",
    isNew: true,
  },
];

// Detailed course information for individual course pages
export const courseDetails: Record<string, CourseDetails> = {
  comp1511: {
    ...allCourses.find(c => c.id === "comp1511")!,
    description: "An introduction to programming and software development. Students learn fundamental programming concepts using the C programming language.",
    checklist: [
      "Learn C programming fundamentals",
      "Understand data structures and algorithms",
      "Practice problem-solving techniques",
      "Complete weekly programming exercises",
      "Work on group projects",
      "Develop debugging skills"
    ],
    assessments: [
      {
        name: "Weekly Programming Exercises (20%)",
        description: "Practical coding challenges focusing on C programming fundamentals, data structures, and problem-solving techniques. Submit solutions online with automated testing."
      },
      {
        name: "Midterm Exam (25%)",
        description: "Written examination covering programming concepts, syntax, debugging, and algorithm analysis. Includes both theoretical questions and code reading/writing."
      },
      {
        name: "Group Project (25%)",
        description: "Collaborative software development project where teams build a complete C program. Emphasizes teamwork, code documentation, and project management."
      },
      {
        name: "Final Exam (30%)",
        description: "Comprehensive examination testing all course content including advanced programming concepts, data structures, and practical problem-solving skills."
      }
    ],
    detailedSkills: ["C Programming Language", "Data Structures (Arrays, Linked Lists)", "Algorithm Design", "Problem Decomposition", "Debugging & Testing", "Code Documentation", "Teamwork & Collaboration", "Critical Thinking"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tips: [
      "Start assignments early - they take longer than expected",
      "Practice coding problems daily for better understanding",
      "Don't hesitate to ask for help during lab sessions",
      "Form study groups with classmates for problem-solving"
    ]
  },
  mgmt1001: {
    ...allCourses.find(c => c.id === "mgmt1001")!,
    description: "This course provides an introduction to the fundamentals of managing people and organisations. Students explore leadership theories, team dynamics, and organizational behavior.",
    checklist: [
      "Understand leadership fundamentals",
      "Learn team management techniques",
      "Develop communication skills",
      "Study organizational behavior",
      "Practice conflict resolution",
      "Complete case study analysis"
    ],
    assessments: [
      {
        name: "Case Study Analysis (25%)",
        description: "In-depth analysis of real organizational challenges and management scenarios. Students apply theoretical concepts to practical situations."
      },
      {
        name: "Team Project (30%)",
        description: "Collaborative project focusing on organizational development and team management strategies. Includes presentation and peer evaluation components."
      },
      {
        name: "Leadership Reflection Essay (20%)",
        description: "Personal reflection on leadership experiences and theoretical frameworks. Students connect course concepts to their own leadership development."
      },
      {
        name: "Final Examination (25%)",
        description: "Comprehensive exam covering management theories, organizational behavior, and leadership principles studied throughout the course."
      }
    ],
    detailedSkills: ["Leadership Theory", "Team Management", "Organizational Behavior", "Communication Skills", "Conflict Resolution", "Strategic Thinking", "Decision Making", "Performance Management"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tips: [
      "Engage actively in group discussions and case studies",
      "Reflect on your own leadership experiences regularly",
      "Apply theoretical concepts to real workplace scenarios",
      "Build strong relationships with team members for projects"
    ]
  },
  psyc1001: {
    ...allCourses.find(c => c.id === "psyc1001")!,
    description: "An introduction to the scientific study of human behavior and mental processes. Covers fundamental psychological concepts, research methods, and major theoretical perspectives.",
    checklist: [
      "Learn research methodologies",
      "Understand psychological theories",
      "Practice statistical analysis",
      "Complete lab experiments",
      "Write research reports",
      "Develop critical thinking skills"
    ],
    assessments: [
      {
        name: "Laboratory Reports (30%)",
        description: "Hands-on experiments and data analysis focusing on psychological research methods and statistical interpretation."
      },
      {
        name: "Research Essay (25%)",
        description: "Critical evaluation of psychological research on a chosen topic, demonstrating understanding of theory and methodology."
      },
      {
        name: "Midterm Exam (20%)",
        description: "Examination covering fundamental psychological concepts, research methods, and theoretical frameworks."
      },
      {
        name: "Final Exam (25%)",
        description: "Comprehensive examination testing all course content including advanced psychological concepts and research applications."
      }
    ],
    detailedSkills: ["Research Methods", "Statistical Analysis", "Critical Evaluation", "Scientific Writing", "Data Interpretation", "Psychological Theory", "Experimental Design", "Academic Research"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tips: [
      "Keep up with weekly lab reports - they build on each other",
      "Practice statistical analysis using software tools regularly",
      "Read research papers critically to understand methodology",
      "Join study groups for complex statistical concepts"
    ]
  }
};

// Add basic details for courses that don't have full details yet
allCourses.forEach(course => {
  if (!courseDetails[course.id]) {
    courseDetails[course.id] = {
      ...course,
      description: `Learn about ${course.title.toLowerCase()} and develop essential ${course.skills.join(', ').toLowerCase()} skills.`,
      checklist: [
        `Master ${course.title.toLowerCase()} fundamentals`,
        "Complete coursework and assignments",
        "Participate in class discussions",
        "Apply theoretical concepts",
        "Develop practical skills"
      ],
      assessments: [
        {
          name: "Assignments (40%)",
          description: "Regular coursework and practical exercises to reinforce learning."
        },
        {
          name: "Midterm Exam (30%)",
          description: "Mid-semester examination covering key concepts and theories."
        },
        {
          name: "Final Exam (30%)",
          description: "Comprehensive final examination testing all course material."
        }
      ],
      detailedSkills: course.skills
    };
  }
});
