interface PRDSection {
  emoji: string;
  title: string;
  content: string;
  color: string;
}

interface GeneratedPRD {
  productName: string;
  sections: PRDSection[];
}

// This generates a sample PRD based on the idea
// In production, this would call an AI service
export const generatePRD = (idea: string): Promise<GeneratedPRD> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const productName = extractProductName(idea);
      
      const sections: PRDSection[] = [
        {
          emoji: "🟥",
          title: "Problem Statement",
          content: `Users currently face significant challenges in ${idea.toLowerCase().includes('app') ? 'accessing' : 'finding'} efficient solutions for their needs. The market lacks a comprehensive tool that addresses the core pain points:\n\n• Fragmented solutions that don't integrate well\n• Time-consuming manual processes\n• Lack of intelligent automation\n• Poor user experience in existing alternatives`,
          color: "red"
        },
        {
          emoji: "🟩",
          title: "Solution Summary",
          content: `${productName} is a modern, intelligent platform that transforms how users approach this problem. By leveraging smart technology and user-centered design, we provide:\n\n• Seamless, integrated experience\n• Automated workflows that save hours\n• Intuitive interface requiring minimal learning curve\n• Real-time insights and actionable recommendations`,
          color: "green"
        },
        {
          emoji: "🟨",
          title: "User Personas",
          content: `Primary Persona: "The Busy Professional"\n- Age: 28-45\n- Tech-savvy but time-constrained\n- Values efficiency and reliability\n- Willing to pay for solutions that save time\n\nSecondary Persona: "The Growing Team Lead"\n- Manages 5-15 people\n- Needs scalable solutions\n- Focuses on team productivity\n- Budget-conscious but quality-focused`,
          color: "yellow"
        },
        {
          emoji: "🟪",
          title: "Core Features",
          content: `1. Smart Dashboard\n   - Real-time overview of all activities\n   - Customizable widgets and layouts\n   - Quick action buttons for common tasks\n\n2. Intelligent Automation\n   - Rule-based workflows\n   - Smart suggestions and recommendations\n   - Scheduled tasks and reminders\n\n3. Collaboration Hub\n   - Team sharing and permissions\n   - Real-time updates and notifications\n   - Comment and feedback system\n\n4. Analytics & Insights\n   - Performance metrics and trends\n   - Exportable reports\n   - Goal tracking and progress visualization`,
          color: "purple"
        },
        {
          emoji: "🟧",
          title: "User Journey / Flow",
          content: `1. Onboarding (2-3 minutes)\n   → Sign up with email/social\n   → Quick preference setup\n   → Interactive tutorial\n\n2. First Use Experience\n   → Guided walkthrough of key features\n   → Sample data to explore\n   → Achievement unlocked: "First Steps"\n\n3. Daily Active Use\n   → Dashboard overview\n   → Quick actions and shortcuts\n   → Notifications and reminders\n\n4. Advanced Usage\n   → Custom workflows\n   → Team collaboration\n   → Advanced analytics`,
          color: "orange"
        },
        {
          emoji: "🔷",
          title: "System Architecture",
          content: `Frontend Layer:\n• React/Next.js for responsive UI\n• Real-time updates via WebSocket\n• Progressive Web App capabilities\n\nBackend Layer:\n• RESTful API with GraphQL option\n• Microservices architecture\n• Event-driven processing\n\nData Layer:\n• PostgreSQL for structured data\n• Redis for caching and sessions\n• S3-compatible storage for files\n\nInfrastructure:\n• Cloud-native deployment (AWS/GCP)\n• Auto-scaling capabilities\n• 99.9% uptime SLA target`,
          color: "blue"
        },
        {
          emoji: "🟫",
          title: "Tech Stack",
          content: `Frontend:\n• React 18 with TypeScript\n• Tailwind CSS for styling\n• TanStack Query for data fetching\n• Zustand for state management\n\nBackend:\n• Node.js with Express/Fastify\n• PostgreSQL + Prisma ORM\n• Redis for caching\n• JWT authentication\n\nDevOps:\n• Docker containerization\n• GitHub Actions CI/CD\n• Terraform for infrastructure\n• Datadog for monitoring`,
          color: "brown"
        },
        {
          emoji: "🟩",
          title: "Future Enhancements",
          content: `Phase 2 (Q2):\n• Mobile native apps (iOS/Android)\n• Advanced AI-powered features\n• Third-party integrations (Slack, Teams)\n\nPhase 3 (Q3):\n• Enterprise features (SSO, audit logs)\n• API marketplace\n• White-label options\n\nPhase 4 (Q4):\n• International expansion\n• Advanced analytics with ML\n• Community features`,
          color: "green"
        },
        {
          emoji: "🟥",
          title: "Risks & Mitigation",
          content: `Technical Risks:\n• Scalability challenges → Implement auto-scaling from day 1\n• Security vulnerabilities → Regular audits, bug bounty program\n• Data loss → Multi-region backups, disaster recovery plan\n\nBusiness Risks:\n• Market competition → Focus on unique value proposition\n• User adoption → Freemium model, referral program\n• Revenue sustainability → Multiple pricing tiers, annual plans\n\nOperational Risks:\n• Team burnout → Sustainable sprint cycles, hiring plan\n• Knowledge silos → Documentation, cross-training`,
          color: "red"
        },
        {
          emoji: "📊",
          title: "Success Metrics",
          content: `Acquisition:\n• 10,000 sign-ups in first 3 months\n• CAC < $30 per user\n• 40% organic acquisition\n\nActivation:\n• 70% complete onboarding\n• 50% create first project within 24h\n\nRetention:\n• D7 retention: 40%\n• D30 retention: 25%\n• Monthly active users: 60%\n\nRevenue:\n• 5% free-to-paid conversion\n• $50 average revenue per user\n• Net revenue retention: 110%`,
          color: "blue"
        },
        {
          emoji: "🟦",
          title: "Final Summary",
          content: `${productName} addresses a clear market need with a well-designed, scalable solution. By focusing on user experience, intelligent automation, and seamless collaboration, we're positioned to capture significant market share.\n\nKey differentiators:\n• Superior user experience\n• AI-powered intelligence\n• Flexible, scalable architecture\n• Strong focus on security and reliability\n\nNext steps:\n1. Finalize MVP scope and timeline\n2. Begin development sprint 1\n3. Set up user research and feedback loops\n4. Prepare go-to-market strategy`,
          color: "blue"
        }
      ];
      
      resolve({ productName, sections });
    }, 2000);
  });
};

const extractProductName = (idea: string): string => {
  // Simple extraction - in production, AI would generate this
  const words = idea.split(' ').slice(0, 5);
  if (idea.toLowerCase().includes('app')) {
    return words.slice(0, 3).join(' ') + ' App';
  }
  if (idea.toLowerCase().includes('platform')) {
    return words.slice(0, 3).join(' ') + ' Platform';
  }
  if (idea.toLowerCase().includes('tool')) {
    return words.slice(0, 3).join(' ') + ' Tool';
  }
  return words.join(' ') + ' Solution';
};
