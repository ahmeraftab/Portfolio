export type SkillCategory = {
  category: string;
  items: string[];
};

export const SKILLS: SkillCategory[] = [
  {
    category: "AI & LLM",
    items: [
      "RAG Pipelines",
      "Google Gemini",
      "Vector Embeddings",
      "ChromaDB",
      "MiniLM",
      "Whisper STT",
      "BLIP",
      "Vercel AI SDK",
    ],
  },
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "React Native", "TypeScript", "JavaScript", "Tailwind CSS", "HTML/CSS"],
  },
  {
    category: "Backend",
    items: ["FastAPI", "Node.js", "REST APIs", "Python", "C++"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MongoDB", "MySQL", "SQL Server"],
  },
  {
    category: "Cloud & Data",
    items: ["AWS (Lambda, S3, EC2)", "Azure", "Docker", "Vercel", "Railway", "Render"],
  },
];

export type Project = {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string; // path in /public
  imageKind?: "app" | "diagram"; // "app" gets a browser-chrome frame, "diagram" gets a framed light card
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "automated-domain-expert-chatbot",
    name: "Automated Domain Expert Chatbot",
    description:
      "My final year project: a production-deployed multimodal RAG assistant that answers document, voice, and image queries in one unified AI pipeline.",
    longDescription:
      "Built a multimodal RAG assistant supporting document, voice (Whisper STT), and image (BLIP captioning) queries. Implemented semantic chunking with MiniLM embeddings and ChromaDB vector search, with Google Gemini as the generative backbone for accurate, document-grounded Q&A. Deployed on a Hostinger VPS with per-user data isolation, MySQL persistence, and API-key-based third-party integration serving real production traffic.",
    tech: ["React", "FastAPI", "Google Gemini", "ChromaDB", "MiniLM", "Whisper STT", "BLIP", "MySQL", "Hostinger VPS"],
    // TODO: Add a live demo / GitHub link for this project once available.
    image: "/domain-expert-chatbot-1.jpg",
    imageKind: "app",
    featured: true,
  },
  {
    slug: "quickreply-ai",
    name: "QuickReply AI",
    description:
      "Your Business, Always Online. An AI-powered WhatsApp assistant that answers customer questions 24/7, trained on your business knowledge in minutes.",
    longDescription:
      "Production-ready SaaS demo of an AI WhatsApp assistant, powered by a full RAG pipeline (Gemini embeddings + gemini-2.5-flash generation) for grounded responses. Includes a funded-SaaS-grade landing page with an animated WhatsApp chat mockup, a live browser chat demo requiring no Twilio setup, an admin analytics dashboard with KPI cards and charts, and real two-way messaging via the Twilio WhatsApp API.",
    tech: ["Next.js 14", "TypeScript", "Google Gemini", "Twilio", "Recharts", "Vercel"],
    liveUrl: "https://quickreply-ai-blue.vercel.app",
    githubUrl: "https://github.com/ahmeraftab/quickreply-ai",
    image: "/quickreply-ai-1.png",
    imageKind: "app",
    featured: true,
  },
  {
    slug: "bella-cucina-ai-concierge",
    name: "Bella Cucina: AI Concierge",
    description:
      "A production-ready AI customer support chatbot for an upscale Italian restaurant, with a warm concierge persona and streaming, source-grounded answers.",
    longDescription:
      "Full RAG pipeline over 16 restaurant knowledge chunks, retrieved at runtime via cosine similarity and served with token-by-token streaming through the Vercel AI SDK v6. Sofia, the AI concierge, has a distinct branded voice across a polished multi-page UI: chat, a filterable menu, and a password-gated admin dashboard with KPIs and conversation history. Includes suggested-question chips, hover-to-copy messages, localStorage persistence, and full accessibility support.",
    tech: ["Next.js 16", "TypeScript", "Tailwind CSS", "Google Gemini", "Vercel AI SDK", "Framer Motion"],
    liveUrl: "https://bella-cucina-roan.vercel.app",
    githubUrl: "https://github.com/ahmeraftab/bella-cucina",
    image: "/bella-cucina-2.png",
    imageKind: "app",
    featured: true,
  },
  {
    slug: "ai-resume-reviewer",
    name: "AI Resume Reviewer",
    description:
      "Upload a PDF resume and get a structured AI review: overall score, strengths, weaknesses, ATS feedback, and job-match scoring.",
    longDescription:
      "An AI-powered resume analysis tool with drag-and-drop PDF upload, an animated 0–10 score ring, and a tabbed breakdown (Overview, Strengths, Weaknesses, Suggestions, ATS, and Job Match when a job description is supplied). FastAPI backend parses resumes with pdfplumber and calls Gemini for structured feedback; results are downloadable and copy-to-clipboard ready.",
    tech: ["FastAPI", "Google Gemini", "pdfplumber", "JavaScript", "Vercel"],
    liveUrl: "https://ai-resume-reviewer-gold-theta.vercel.app",
    githubUrl: "https://github.com/ahmeraftab/ai-resume-reviewer",
    image: "/ai-resume-reviewer-2.png",
    imageKind: "app",
    featured: true,
  },
  {
    slug: "spotify-data-pipeline",
    name: "Spotify Data Pipeline",
    description:
      "A serverless ETL pipeline that extracts Spotify playlist data, transforms it on AWS Lambda, and loads it into Snowflake via Snowpipe for real-time analytics.",
    longDescription:
      "Amazon CloudWatch triggers a daily Lambda function that pulls playlist track data from the Spotify API into a raw S3 bucket, which fires a second Lambda on an object-put trigger to clean and enrich the data into a transformed bucket. Snowpipe auto-ingests the transformed data into Snowflake in near real-time, where Power BI connects for dashboarding and analysis, in a fully serverless, event-driven pipeline end to end.",
    tech: ["Python", "AWS Lambda", "Amazon S3", "Amazon CloudWatch", "Snowflake", "Snowpipe", "Power BI"],
    githubUrl: "https://github.com/ahmeraftab/Spotify-AWS",
    image: "/spotify-data-pipeline.jpg",
    imageKind: "diagram",
  },
  {
    slug: "customer-churn-prediction",
    name: "Customer Churn Prediction",
    description:
      "A machine learning app that predicts customer churn from account data, served through an interactive Streamlit interface.",
    longDescription:
      "End-to-end ML workflow: exploratory data analysis and preprocessing in a notebook, feature scaling and model export via scikit-learn, and an interactive Streamlit app that loads the trained model and scaler to serve live churn predictions.",
    tech: ["Python", "scikit-learn", "Streamlit", "Pandas"],
    githubUrl: "https://github.com/ahmeraftab/Customer-Churn-Prediction",
    image: "/customer-churn-prediction.png",
    imageKind: "diagram",
  },
  {
    slug: "weather-data-etl-pipeline",
    name: "Weather Data ETL Pipeline",
    description:
      "A real-time ETL pipeline orchestrated with Apache Airflow, extracting live weather data and auto-loading it into Snowflake via Snowpipe.",
    longDescription:
      "Three coordinated Airflow DAGs: one validates the OpenWeatherMap API is healthy, a second extracts real-time weather data into S3, and a third transforms the raw data and triggers Snowpipe to load it into Snowflake, ready for querying and analysis immediately after ingestion.",
    tech: ["Python", "Apache Airflow", "Amazon S3", "Snowflake", "Snowpipe", "OpenWeatherMap API"],
    githubUrl: "https://github.com/ahmeraftab/RealTime_Weather_ETL_Pipeline",
    image: "/weather-data-etl-pipeline.png",
    imageKind: "diagram",
  },
];

export type ExperienceEntry = {
  role: string;
  company: string;
  companyUrl?: string;
  start: string;
  end: string;
  bullets: string[];
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "Full Stack Developer",
    company: "Evolisyss",
    start: "Sep 2025",
    end: "Mar 2026",
    bullets: [
      "Delivered end-to-end features for a multi-role service marketplace across web and mobile using React, Next.js, and React Native, shipped across multiple production releases.",
      "Designed and integrated RESTful backend APIs with PostgreSQL workflows, improving data consistency and reducing latency across core features.",
      "Collaborated in agile sprints across frontend, backend, and QA to ship high-impact features on schedule.",
    ],
  },
  {
    role: "Web Developer Intern",
    company: "PhantomCave Game Development",
    start: "Jul 2024",
    end: "Sep 2024",
    bullets: [
      "Developed responsive web interfaces using HTML, CSS, and JavaScript; built Node.js backend APIs for game data management and player leaderboard features.",
      "Designed SQL Server schemas for player authentication and game analytics, optimizing read and write performance for high-frequency operations.",
    ],
  },
  {
    role: "Data Engineer Intern",
    company: "Bytewise Limited",
    start: "Jun 2024",
    end: "Sep 2024",
    bullets: [
      "Designed and implemented AWS-based data storage solutions using S3 to optimize data management and retrieval.",
      "Automated data workflows using AWS-based ETL pipelines (Lambda, Airflow on EC2) to move data into S3, reducing manual intervention.",
      "Built and improved Snowflake data warehouses, making queries faster and more scalable.",
    ],
  },
];

export type EducationEntry = {
  degree: string;
  school: string;
  start: string;
  end: string;
};

export const EDUCATION: EducationEntry[] = [
  {
    degree: "Bachelor of Science in Computer Science",
    school: "Bahria University, Karachi",
    start: "Mar 2022",
    end: "Jan 2026",
  },
  {
    degree: "A-Levels, Computer Science",
    school: "The American Foundation School",
    start: "Sep 2019",
    end: "Oct 2021",
  },
];
