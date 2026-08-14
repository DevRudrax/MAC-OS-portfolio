import { Project, SystemUser } from '../types/macOS';

export const SYSTEM_USER: SystemUser = {
  name: "Rudra Pratap Singh",
  username: "@DevRudrax",
  avatar: "https://avatars.githubusercontent.com/u/189653600?v=4",
  githubUrl: "https://github.com/DevRudrax",
  linkedinUrl: "https://www.linkedin.com/in/rudra-pratap-singh-bb6b79324/",
  bio: "Full Stack Engineer & AI Systems Specialist passionate about building intelligent agent workflows, web applications, and interactive UI experiences.",
  location: "India"
};

export const SKILLS_DATA = {
  languages: ["Python", "TypeScript", "JavaScript", "C++", "SQL", "HTML5/CSS3"],
  frameworks: ["React.js", "Next.js", "Vite", "Node.js", "FastAPI", "Tailwind CSS", "Framer Motion"],
  ai_ml: ["Gemini API", "PyTorch", "OpenAI API", "LangChain", "Vector DBs", "RAG Systems"],
  tools_databases: ["Git / GitHub", "Docker", "PostgreSQL", "MongoDB", "Vercel", "Postman", "Linux"]
};

// Original, non-forked GitHub repositories for DevRudrax (https://github.com/DevRudrax)
export const REAL_PROJECTS: Project[] = [
  {
    id: "vaultly-ai-receipt-manager",
    name: "Vaultly AI Receipt Manager",
    repoName: "vaultly-ai-receipt-manager",
    description: "Vaultly - Full-stack AI Receipt, Purchase & Warranty Management Application powered by vision and structured extraction.",
    stars: 18,
    forks: 4,
    language: "TypeScript",
    tags: ["TypeScript", "React", "AI", "Tailwind CSS", "Node.js"],
    url: "https://github.com/DevRudrax/vaultly-ai-receipt-manager",
    readme: `# Vaultly — AI Receipt & Warranty Manager 🧾⚡

## Overview
A comprehensive full-stack solution created by **Rudra Pratap Singh** for organizing receipts, tracking product warranties, and visualizing spending insights automatically.

### 🔑 Features
- **AI Receipt Scanning**: Automatic OCR and field extraction (merchant, date, total amount, warranty period).
- **Warranty Expiry Alerts**: Real-time notifications before product warranties expire.
- **Expense Analytics**: Charts and spending analytics.

---
[View on GitHub](https://github.com/DevRudrax/vaultly-ai-receipt-manager)`
  },
  {
    id: "talk-to-your-notes",
    name: "Talk To Your Notes",
    repoName: "Talk-to-your-notes-",
    description: "An AI-powered application enabling conversational Q&A and semantic intelligence over personal study notes.",
    stars: 12,
    forks: 3,
    language: "Python",
    tags: ["Python", "AI", "LangChain", "Gemini API", "FastAPI"],
    url: "https://github.com/DevRudrax/Talk-to-your-notes-",
    readme: `# Talk To Your Notes 📝🤖

## Overview
An intelligent AI application developed by **Rudra Pratap Singh** that lets users query, summarize, and interact with their study notes using state-of-the-art LLMs and vector embeddings.

### 🌟 Key Features
- **Semantic Note Querying**: Ask natural language questions about your uploaded documents.
- **RAG Architecture**: Uses vector stores for fast document chunk retrieval.
- **FastAPI & React**: Seamless real-time full-stack experience.
- **Live Demo**: [talk-to-your-notes-cxee.vercel.app](https://talk-to-your-notes-cxee.vercel.app)

---
[View on GitHub](https://github.com/DevRudrax/Talk-to-your-notes-)`
  },
  {
    id: "velora-luxury-platform",
    name: "Velora Luxury Platform",
    repoName: "velora-quiet-luxury-platform",
    description: "VELORA - Premium Quiet Luxury E-Commerce Platform Application with elegant micro-interactions.",
    stars: 15,
    forks: 2,
    language: "JavaScript",
    tags: ["JavaScript", "E-Commerce", "React", "Tailwind CSS"],
    url: "https://github.com/DevRudrax/velora-quiet-luxury-platform",
    readme: `# VELORA — Quiet Luxury Platform 💎🛍️

## Overview
A high-end e-commerce web platform engineered by **Rudra Pratap Singh** delivering quiet luxury aesthetics, fluid animations, and frictionless checkout.

---
[View on GitHub](https://github.com/DevRudrax/velora-quiet-luxury-platform)`
  },
  {
    id: "mac-os-portfolio",
    name: "macOS Tahoe Portfolio",
    repoName: "MAC-OS-portfolio",
    description: "An authentic, pixel-perfect macOS Sequoia & Tahoe replica portfolio application built with React, Framer Motion, and Gemini AI Siri.",
    stars: 24,
    forks: 5,
    language: "TypeScript",
    tags: ["React", "TypeScript", "Framer Motion", "Tailwind CSS", "Gemini API"],
    url: "https://github.com/DevRudrax/MAC-OS-portfolio",
    readme: `# macOS Tahoe Portfolio Replica 🍏✨

## Overview
A hyper-realistic, interactive **macOS Desktop** web portfolio created by **Rudra Pratap Singh**.

---
[View on GitHub](https://github.com/DevRudrax/MAC-OS-portfolio)`
  },
  {
    id: "prs-fitness",
    name: "PRS Fitness Platform",
    repoName: "DevRudrax-prs-fitness",
    description: "Personalized fitness and workout tracking system built with Python.",
    stars: 9,
    forks: 1,
    language: "Python",
    tags: ["Python", "Fitness", "Health Tech"],
    url: "https://github.com/DevRudrax/DevRudrax-prs-fitness",
    readme: `# PRS Fitness Platform 🏋️‍♂️

## Overview
A workout analytics and fitness tracking platform engineered by **Rudra Pratap Singh**.

---
[View on GitHub](https://github.com/DevRudrax/DevRudrax-prs-fitness)`
  },
  {
    id: "bmi-calculator",
    name: "Python BMI Calculator",
    repoName: "bmi-calculator",
    description: "Modern BMI Calculator built with Python CustomTkinter featuring a sleek dark UI and health analytics visualization.",
    stars: 8,
    forks: 2,
    language: "Python",
    tags: ["Python", "CustomTkinter", "GUI", "Health Tech"],
    url: "https://github.com/DevRudrax/bmi-calculator",
    readme: `# Modern Python BMI Calculator ⚖️📊

## Overview
A sleek, desktop GUI application created by **Rudra Pratap Singh** using Python CustomTkinter for body mass index calculation.

---
[View on GitHub](https://github.com/DevRudrax/bmi-calculator)`
  }
];

export const PROJECTS: Project[] = REAL_PROJECTS;

export const RESUME_DETAILS = {
  fileName: "Rudra_Pratap_Singh_Resume.pdf",
  aboutFileName: "About_Rudra_Pratap_Singh.pdf",
  summary: "Full Stack Engineer & AI Systems Specialist",
  experience: [
    {
      role: "Full Stack AI Engineer",
      company: "DevRudrax Projects",
      period: "2024 - Present",
      description: "Architected Vaultly AI Receipt Manager, Talk To Your Notes, Velora Luxury, and macOS Portfolio applications."
    },
    {
      role: "Software Developer",
      company: "Independent Developer",
      period: "2023 - 2024",
      description: "Built Python, React, and TypeScript developer tools and machine learning utilities."
    }
  ]
};
