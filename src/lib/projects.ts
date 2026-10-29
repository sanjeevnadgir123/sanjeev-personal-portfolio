/**
 * Featured Engineering & AI Projects by Sanjeev Nadgir.
 */
export type ProjectSlug = "redis-java" | "echomind" | "smart-medicine-box" | "intellimind";

export type Project = {
  slug: ProjectSlug;
  index: string;
  title: string;
  category: string;
  summary: string;
  /** One-line poster tagline for the detail page. */
  tagline: string;
  idea: string;
  direction: string;
  motion: string;
  build: string;
  focus: string[];
  stack: string[];
  palette: { name: string; hex: string }[];
};

export const projects: Project[] = [
  {
    slug: "redis-java",
    index: "01",
    title: "Building Redis from Scratch Using Java",
    category: "Systems & Networking",
    summary:
      "Implemented a Redis-inspired server in Java to explore network programming and client-server communication. Tested server startup and client connections on port 6379.",
    tagline: "Low-level networking, high-performance concurrency.",
    idea:
      "Modern backend frameworks abstract away sockets, thread pools, and transport protocols. This project explores foundational systems engineering by building an in-memory key-value data store server from scratch using raw Java network sockets.",
    direction:
      "Engineered a dedicated TCP server listening on port 6379, capable of accepting incoming socket connections, parsing the Redis Serialization Protocol (RESP), and dispatching command handlers with concurrent client support.",
    motion:
      "Interactive status telemetry visualizes socket handshakes, client connect/disconnect lifecycles, and in-memory key-value state mutations with millisecond accuracy.",
    build:
      "Built with Java standard library (java.net.ServerSocket, java.io), multi-threaded client handler architecture, non-blocking I/O concepts, and robust error handling for unexpected socket disconnections.",
    focus: [
      "TCP Client-Server Architecture",
      "Network Socket Programming",
      "Concurrent Connection Handling",
      "In-Memory Data Structures",
    ],
    stack: ["Java", "TCP Networking", "Client-Server Architecture", "Multi-Threading"],
    palette: [
      { name: "Crimson Core", hex: "#D82C20" },
      { name: "Obsidian Terminal", hex: "#121316" },
      { name: "Amber Port", hex: "#F59E0B" },
    ],
  },
  {
    slug: "echomind",
    index: "02",
    title: "EchoMind — AI-Powered Speech Emotion Recognition",
    category: "Deep Learning & Audio AI",
    summary:
      "Developed a speech emotion recognition application that classifies speech into eight emotion categories using a deep-learning model. Achieved approximately 81.02% test accuracy.",
    idea:
      "Human vocal communication carries deep affective nuances often lost in text analysis. EchoMind transforms raw audio signals into emotional intelligence by classifying speech patterns into eight discrete human emotion states.",
    tagline: "Decoding the emotion hidden in the voice.",
    direction:
      "Extracted Mel-frequency cepstral coefficients (MFCCs) and spectral audio features from voice waveforms, feeding them into a multi-layered Convolutional Neural Network (CNN) trained to distinguish nuanced vocal tones.",
    motion:
      "Dynamic waveform visualizer pulses in real-time with incoming audio frequencies, while probabilistic confidence meters animate smoothly across the eight emotion classes.",
    build:
      "Trained with TensorFlow and Keras using CNN architectures; deployed behind a high-throughput FastAPI inference server connected to a modern React & TypeScript client interface.",
    focus: [
      "Convolutional Neural Networks",
      "Audio Feature Extraction (MFCC)",
      "8-Class Emotion Classification",
      "FastAPI Inference Pipeline",
    ],
    stack: ["Python", "TensorFlow", "CNN", "FastAPI", "React", "TypeScript"],
    palette: [
      { name: "Electric Indigo", hex: "#6366F1" },
      { name: "Deep Midnight", hex: "#0B0F19" },
      { name: "Cyan Resonance", hex: "#06B6D4" },
    ],
  },
  {
    slug: "smart-medicine-box",
    index: "03",
    title: "AI Smart Medicine Box",
    category: "Healthcare & Mobile Application",
    summary:
      "Built a mobile application for medicine scheduling and dose management, featuring authentication, a dashboard, medicine CRUD operations, and database access controls using Row Level Security.",
    tagline: "Intelligent scheduling, dependable care.",
    idea:
      "Medication adherence is a critical challenge for chronic patients and caregivers. The AI Smart Medicine Box mobile system bridges hardware tracking and daily adherence routines through scheduled dosing, automated reminders, and secure cloud sync.",
    direction:
      "A calm, accessible mobile interface designed with high clarity and contrast. Medication schedules, dosage logs, and refill counters are organized intuitively for quick glanceability.",
    motion:
      "Fluid card transitions, tactile dose confirmation feedback, and contextual reminder alerts designed with accessibility and clarity in mind.",
    build:
      "Constructed using React Native with Expo, typed with TypeScript, and backed by Supabase and PostgreSQL with strict Row Level Security (RLS) policies protecting patient health records.",
    focus: [
      "Dose Scheduling & Alerts",
      "Row Level Security (RLS)",
      "Medicine CRUD Workflows",
      "Cross-Platform Mobile UI",
    ],
    stack: ["React Native", "Expo", "TypeScript", "Supabase", "PostgreSQL"],
    palette: [
      { name: "Emerald Clinical", hex: "#10B981" },
      { name: "Dark Slate", hex: "#0F172A" },
      { name: "Teal Luminescence", hex: "#2DD4BF" },
    ],
  },
  {
    slug: "intellimind",
    index: "04",
    title: "IntelliMind — RAG-Powered AI Assistant",
    category: "Generative AI & Knowledge Systems",
    summary:
      "Developed a retrieval-augmented AI assistant with document ingestion, contextual document retrieval, and question answering, supported by conversation context.",
    tagline: "Context-aware intelligence over your documents.",
    idea:
      "Generic Large Language Models hallucinate and lack private domain knowledge. IntelliMind solves this by coupling dense semantic vector retrieval with generative reasoning to answer queries accurately from uploaded knowledge bases.",
    direction:
      "A distraction-free, terminal-grade conversational interface with real-time source attribution, chunk similarity score visualization, and multi-turn dialog memory.",
    motion:
      "Streaming markdown text generation with typing cadences, smooth document ingestion progress indicators, and interactive reference source chips.",
    build:
      "Built with Python and FastAPI, PostgreSQL with pgvector for embedding storage, Groq and local Ollama model backends, and a modern responsive React & TypeScript frontend.",
    focus: [
      "Retrieval-Augmented Generation",
      "Vector Similarity & Embeddings",
      "Document Ingestion Pipeline",
      "Multi-Turn Context Management",
    ],
    stack: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Groq", "Ollama"],
    palette: [
      { name: "Ultraviolet Core", hex: "#8B5CF6" },
      { name: "Deep Ink", hex: "#09090B" },
      { name: "Coral Amber", hex: "#F43F5E" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return projects[0];
  return projects[(i + 1) % projects.length];
}
