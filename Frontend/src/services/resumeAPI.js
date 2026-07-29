// Mock Resume Intelligence API Service

export const resumeAPI = {
  analyzeResume: async (file) => {
    // Simulate AI model latency
    await new Promise(resolve => setTimeout(resolve, 2500));

    return {
      fileName: file ? file.name : 'Senior_Fullstack_Architect.pdf',
      parsedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      overallScore: 89,
      atsScore: {
        score: 92,
        grade: 'A+',
        status: 'Highly Optimized',
        keywordsFound: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS Cloud', 'Docker', 'CI/CD', 'Microservices', 'Distributed Systems'],
        keywordsMissing: ['Kubernetes Native', 'Golang', 'OpenTelemetry', 'gRPC']
      },
      breakdown: {
        impact: 94, // Quantifiable achievements
        formatting: 90, // ATS readable structure
        relevance: 86, // Target role alignment
        brevity: 88 // Concise action verbs
      },
      detectedSkills: [
        'React 18 / Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js Express',
        'PostgreSQL / Prisma', 'Redis Caching', 'Docker / Containerization',
        'AWS S3 / Lambda', 'RESTful & GraphQL APIs', 'Jest / Cypress E2E'
      ],
      skillGaps: [
        { skill: 'Kubernetes Cluster Ops', priority: 'High', demand: '88% of Staff Engineer postings' },
        { skill: 'Golang / System Programming', priority: 'Medium', demand: '64% of High Scale postings' },
        { skill: 'OpenTelemetry & Tracing', priority: 'Medium', demand: '52% of Observability postings' }
      ],
      tips: [
        {
          id: 1,
          category: 'Impact Metrics',
          type: 'critical',
          text: 'Quantify your latency reduction metric in the Meta contract role. Instead of "Improved page load times", write "Architected Redis caching layer that reduced P99 latency by 42% for 2.4M daily active users".'
        },
        {
          id: 2,
          category: 'Action Verbs',
          type: 'warning',
          text: 'Replace passive verbs like "Responsible for managing CI/CD" with active verbs like "Spearheaded zero-downtime GitHub Actions pipeline".'
        },
        {
          id: 3,
          category: 'ATS Parsing',
          type: 'suggestion',
          text: 'Your current multi-column table format in Experience section is 92% readable by Lever, but modern Greenhouse ATS prefers single-column layout.'
        }
      ]
    };
  }
};
