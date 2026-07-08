/**
 * Kids Landing Page Content
 * Hardcoded content for all sections: projects, concepts, features, testimonials, game
 * Tone: peer-level, no corporate jargon (target: 10-15 year olds)
 */

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  color: 'cyan' | 'pink' | 'purple';
}

export interface Concept {
  id: string;
  title: string;
  explanation: string;
  icon: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  highlight?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

export interface GameQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface KidsLandingContent {
  meta: {
    title: string;
    tagline: string;
    description: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
  };
  projects: Project[];
  concepts: Concept[];
  features: Feature[];
  testimonials: Testimonial[];
  game: {
    title: string;
    description: string;
    questions: GameQuestion[];
  };
  faq: Array<{
    question: string;
    answer: string;
  }>;
  footer: {
    copyright: string;
    links: Array<{
      label: string;
      href: string;
    }>;
  };
}

export const KIDS_LANDING_CONTENT: KidsLandingContent = {
  meta: {
    title: 'Learn to Vibe Code',
    tagline: 'Code like you code. Think like an AI thinks.',
    description: 'A course for teens who want to build real apps with AI and code.',
  },
  hero: {
    headline: 'You can code anything.',
    subheadline: 'Seriously. From a personal website to a full app — if you can imagine it, you can build it with AI by your side.',
    cta: 'Start Learning Free',
  },
  projects: [
    {
      id: 'portfolio',
      title: 'Your First Website',
      tagline: 'Go live in 20 minutes',
      description: 'Build your own portfolio site with React and Tailwind. AI writes half the code; you debug and ship it. By the end, you\'ll have a real URL to show anyone.',
      icon: '🌐',
      color: 'cyan',
    },
    {
      id: 'ai-tools',
      title: 'AI Sidekick Apps',
      tagline: 'Claude does what you tell it',
      description: 'Create tools that use Claude API: a homework helper, a story generator, a code debugger. Learn how AI APIs work and why they\'re not magic—just trained models.',
      icon: '🤖',
      color: 'pink',
    },
    {
      id: 'database',
      title: 'Real Databases',
      tagline: 'Where your data lives',
      description: 'Build an app that stores data: a habit tracker, a journal, a rating app. Use Supabase (PostgreSQL in the cloud). Learn why databases matter when apps go live.',
      icon: '💾',
      color: 'purple',
    },
    {
      id: 'deployment',
      title: 'Deploy Like a Pro',
      tagline: 'Your app. The internet. Connected.',
      description: 'Take everything you built and put it live on Vercel. No scary DevOps—just a git push and you\'re deployed. Learn what "production" actually means.',
      icon: '🚀',
      color: 'cyan',
    },
  ],
  concepts: [
    {
      id: 'ai-collaboration',
      title: 'AI Isn\'t Magic—It\'s a Skill',
      explanation: 'Claude (and other AI) can write code faster than you, but only if you know what to ask and how to debug. This course teaches you to collaborate with AI: what makes a good prompt, how to spot hallucinations, and how to break big problems into steps.',
      icon: '✨',
    },
    {
      id: 'full-stack',
      title: 'Full Stack (Without the Headache)',
      explanation: 'You\'ll code frontend (React), backend (Node.js APIs), and databases (PostgreSQL) in the same course. Not separately. Not in isolation. Real, connected systems. By the end, you\'ll know how data actually moves through an app.',
      icon: '🔗',
    },
    {
      id: 'ship-first',
      title: 'Ship First, Learn Second',
      explanation: 'Every module ends with something live on the internet. A broken site is better than theory. You\'ll ship code in week 1, and each project teaches you why it matters: performance, accessibility, security, user experience.',
      icon: '🎯',
    },
  ],
  features: [
    {
      id: 'step-by-step',
      title: 'Learn at Your Speed',
      description: 'Self-paced. Watch a lesson video, read the code walkthrough, build your own version, quiz yourself. Retake quizzes as many times as you need.',
      icon: '📚',
      highlight: '16 modules, ~90 hours',
    },
    {
      id: 'hands-on',
      title: 'You Actually Build Stuff',
      description: 'No copy-paste tutorials. Every lesson has a deliverable: a real project you build in your editor (Cursor or VS Code), commit to GitHub, and ship to a live URL.',
      icon: '⚙️',
      highlight: '4 capstone options',
    },
    {
      id: 'credential',
      title: 'Get Certified',
      description: 'Pass (80%+ on quizzes and projects) and you get a shareable certificate. Real accreditation body behind it. Employers and colleges recognize it.',
      icon: '🏆',
      highlight: 'Professional credential',
    },
    {
      id: 'community',
      title: 'Learn with Others',
      description: 'Discord server with instructors, TAs, and other learners. Ask questions, show your projects, get feedback. Not isolated. Real community.',
      icon: '👥',
      highlight: '24/7 support',
    },
  ],
  testimonials: [
    {
      id: 'alex',
      quote: 'I had no idea what "deployment" meant. Now I can ship a full-stack app in a weekend. This course actually teaches real skills, not just theory.',
      author: 'Alex',
      role: '14 years old',
    },
    {
      id: 'jordan',
      quote: 'The AI collaboration part blew my mind. I thought I just copy code from Stack Overflow. Learning how to actually talk to Claude changed everything about how I code.',
      author: 'Jordan',
      role: '15 years old',
    },
    {
      id: 'casey',
      quote: 'I built a real portfolio site. Like, people can actually see it. I put the URL in my college apps. This feels like a real skill, not homework.',
      author: 'Casey',
      role: '16 years old',
    },
  ],
  game: {
    title: 'Code Quest: The Quick Trivia',
    description: 'Quick 5-question game to test your coding smarts. No pressure—just for fun. See how many you can get right.',
    questions: [
      {
        id: 'q1',
        question: 'What does "deployment" mean?',
        options: ['Publishing your code to a server so people can use it on the internet', 'Writing comments in your code', 'Asking an AI to fix your code', 'Installing Node.js on your computer'],
        correctIndex: 0,
        explanation: 'When you deploy, your app goes live. People can visit your URL and use it. That\'s the whole point.',
      },
      {
        id: 'q2',
        question: 'Which one is NOT a programming language?',
        options: ['JavaScript', 'Python', 'React', 'TypeScript'],
        correctIndex: 2,
        explanation: 'React is a library (a tool built on top of JavaScript). The others are actual languages you can write code in.',
      },
      {
        id: 'q3',
        question: 'What does a database do?',
        options: ['Stores data so your app can access it later', 'Makes your website look pretty', 'Runs your code in the browser', 'Compiles Python to JavaScript'],
        correctIndex: 0,
        explanation: 'Databases are just organized storage. Without them, your app would forget everything when it restarts.',
      },
      {
        id: 'q4',
        question: 'Why would you use an AI like Claude?',
        options: ['So you never have to think about code again', 'To quickly generate code scaffolds and get unstuck on bugs', 'Because AI will always write better code than humans', 'To replace learning how to code'],
        correctIndex: 1,
        explanation: 'AI is a tool. It speeds you up, but you still need to understand the code, test it, and debug it.',
      },
      {
        id: 'q5',
        question: 'What\'s the first thing you should do after building a feature?',
        options: ['Push it to production immediately', 'Test it to make sure it works, then deploy', 'Show it to an AI and ask if it\'s good', 'Rewrite it three times to make sure it\'s perfect'],
        correctIndex: 1,
        explanation: 'Test early, ship often. You want to catch bugs before real users hit them.',
      },
    ],
  },
  faq: [
    {
      question: 'Do I need to know how to code already?',
      answer: 'Nope. This course starts from zero. We teach you JavaScript, React, databases, APIs—everything. If you can type, you can code.',
    },
    {
      question: 'Is this free?',
      answer: 'The course is free to audit. If you want a certificate and instructor feedback on your projects, there\'s a small one-time fee (~$200). Think of it like a real school.',
    },
    {
      question: 'How long does it take?',
      answer: 'About 16 weeks if you do ~6 hours per week. You can go faster or slower. It\'s self-paced.',
    },
    {
      question: 'Do I need special software?',
      answer: 'Just a text editor (we recommend Cursor—it has built-in AI) and a browser. Everything else is free: Node.js, GitHub, Vercel, Supabase.',
    },
    {
      question: 'What if I get stuck?',
      answer: 'Discord server. Ask, and instructors or other learners will help. Plus, the curriculum teaches you how to debug and ask good questions—that\'s a real skill.',
    },
    {
      question: 'Will this get me a job?',
      answer: 'It teaches you job-level skills. The projects go in your portfolio. The certificate is recognized by employers and colleges. But you still need to apply and interview. This course is the foundation.',
    },
  ],
  footer: {
    copyright: '© 2024 Learn to Vibe Code. Powered by learners.',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Discord', href: 'https://discord.gg/vibeabc' },
      { label: 'Twitter', href: 'https://twitter.com/learntovibecode' },
      { label: 'GitHub', href: 'https://github.com/learntovibecode' },
      { label: 'Terms', href: '/terms' },
      { label: 'Privacy', href: '/privacy' },
    ],
  },
};
