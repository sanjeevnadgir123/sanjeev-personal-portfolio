/**
 * Site-wide configuration for Sanjeev Nadgir's professional portfolio.
 */
export const site = {
  name: "Sanjeev Nadgir",
  fullName: "Sanjeevkumar Anil Nadgir",
  shortName: "Sanjeev",
  fullTitle: "Sanjeev Nadgir — Software Developer & AI/ML Enthusiast",
  roles: [
    "Software Developer",
    "AI/ML Enthusiast",
    "Full-Stack Developer",
    "Building Practical AI Solutions",
    "Co-Founder & CEO at Geminal Studio",
  ],
  tagline: "Building software, AI-powered applications, and practical technology solutions.",
  supporting: "Final-year Electronics and Communication Engineering student, software developer, and technology startup co-founder.",
  heroHeading: "Hi, I'm Sanjeev Nadgir.",
  heroIntro: "Final-year Electronics and Communication Engineering student building software, AI-powered applications, and practical technology solutions.",
  description:
    "Sanjeev Nadgir is a final-year Electronics and Communication Engineering student, software developer, AI/ML enthusiast, and Co-Founder & CEO at Geminal Studio based in Mundgod, Karnataka, India.",
  email: "sanjeevnadgir2005@gmail.com",
  phone: "+91 9611103853",
  phoneTel: "+919611103853",
  location: "Mundgod, Karnataka, India",
  college: "AGM Rural College of Engineering and Technology, Hubballi",
  university: "Visvesvaraya Technological University (VTU)",
  degree: "Bachelor of Engineering — Electronics and Communication Engineering",
  graduationYears: "2023–2027",
  cgpa: "7.4",
  year: 2026,
  startup: {
    company: "Geminal Studio",
    role: "Co-Founder & CEO",
    description:
      "Geminal Studio is a service- and product-based technology company focused on designing and developing products and delivering technology services to organizations.",
    profileUrl: "https://share.google/YDM0y5Zo8wIHFUNd0",
  },
  education: [
    {
      degree: "Bachelor of Engineering — Electronics and Communication Engineering",
      institution: "AGM Rural College of Engineering and Technology, Hubballi",
      university: "Visvesvaraya Technological University (VTU)",
      duration: "2023–2027",
      score: "CGPA: 7.4",
      highlight: "Final-year engineering student focused on software engineering and AI systems.",
    },
    {
      degree: "Pre-University Course — PCMB",
      institution: "Government Independent PU College, Tadas, Shiggaon",
      duration: "Completed",
      score: "78%",
      highlight: "Physics, Chemistry, Mathematics, and Biology foundation.",
    },
    {
      degree: "SSLC",
      institution: "Government High School, Mundgod",
      duration: "Completed",
      score: "76%",
      highlight: "Secondary School Leaving Certificate.",
    },
  ],
  achievements: [
    {
      rank: "Top 4 Finish",
      event: "Code Bharat 2K26 Hackathon",
      organization: "IIIT Dharwad",
      year: "2026",
      details: "Ranked among the Top 4 teams out of 154 competing teams.",
    },
    {
      rank: "Winner",
      event: "App Idea in One Hour Competition — Agratha 2K26",
      organization: "Agratha 2K26",
      year: "2026",
      details: "Secured 1st Place for conceptualizing and designing a practical application under a 1-hour constraint.",
    },
    {
      rank: "Second Place",
      event: "Robo Race",
      organization: "Robotics Challenge",
      year: "2025",
      details: "Designed and navigated a high-speed robotics system through competitive obstacle tracks.",
    },
  ],
  leadership: [
    {
      role: "Lead Developer & Main Coordinator",
      event: "HackFusion 2.0",
      year: "2025",
      description: "Spearheaded technical development and overall event coordination for the hackathon.",
    },
    {
      role: "Frontend Developer & Registration Coordinator",
      event: "Agratha 2K26",
      year: "2026",
      description: "Developed frontend registration workflows and managed participant coordination across events.",
    },
    {
      role: "Former Co-Lead",
      event: "OS Code Student Community",
      year: "2023–2026",
      description: "Co-led technical initiatives, peer learning sessions, and open-source development activities.",
    },
  ],
  socials: [
    { label: "Company Profile", href: "https://share.google/YDM0y5Zo8wIHFUNd0" },
    { label: "Email", href: "mailto:sanjeevnadgir2005@gmail.com" },
    { label: "Phone", href: "tel:+919611103853" },
  ],
  nav: [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Startup", href: "/#startup" },
    { label: "Education", href: "/#education" },
    { label: "Skills", href: "/#skills" },
    { label: "Contact", href: "/#contact" },
  ],
} as const;

/** The single walking film used throughout the site. Preserved local assets. */
export const film = {
  sources: [
    { src: "/media/siri-walk.webm", type: "video/webm" },
    { src: "/media/siri-walk.mp4", type: "video/mp4" },
  ],
  poster: "/media/siri-poster.jpg",
  finalFrame: "/media/siri-final.jpg",
  duration: 8,
  width: 1280,
  height: 720,
} as const;
