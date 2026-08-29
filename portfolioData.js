import { CUSTOM_PROJECTS } from './customProjects';
import defaultPortrait from '../assets/images/default_portrait_photo_1787920692046.jpg';
import videoEditingImg from '../assets/images/video_editing_showreel_1787913525100.jpg';
import brandingImg from '../assets/images/branding_concept_1787913547055.jpg';
import webConceptImg from '../assets/images/web_concept_mockup_1787913607279.jpg';
import writingImg from '../assets/images/writing_collection_1787913622171.jpg';
import socialMediaImg from '../assets/images/social_media_series_1787913634938.jpg';

export const PERSONAL_INFO = {
  name: "JHON CARLO SAN JUAN ABLING",
  shortName: "Jhon Carlo",
  initials: "JC",
  roleHeadline: "BSIT Student | Video Editor | Graphic Designer | Writer | Aspiring Web Developer",
  quote: "A creative BSIT student transforming ideas into visual experiences through video, design, writing, and technology.",
  email: "jcarlabling@gmail.com",
  workRole: "Freelance Video Editor & Independent Creative",
  socials: {
    facebook: "https://www.facebook.com/share/19L5aF2rTA/",
    instagram: "https://www.instagram.com/cupcake.elf?igsi=aDhxYXU2ZWYxeThr",
    email: "mailto:jcarlabling@gmail.com"
  },
  portrait: defaultPortrait
};

export const QUICK_STATS = [
  {
    value: "01",
    label: "Creative Fields",
    description: "Bridging video, design, writing & technology",
    accent: "blue"
  },
  {
    value: "04",
    label: "Core Skills",
    description: "Video Editing, Graphic Design, Writing & Web Dev",
    accent: "cyan"
  },
  {
    value: "∞",
    label: "Ideas to Create",
    description: "Continuous passion for storytelling & visual craft",
    accent: "violet"
  },
  {
    value: "01",
    label: "BSIT Journey",
    description: "1st Year student building a strong tech foundation",
    accent: "electric"
  }
];

export const SKILLS_DATA = [
  {
    id: "video",
    title: "VIDEO EDITING",
    subtitle: "Pacing, timing & visual storytelling",
    iconName: "Film",
    accentColor: "from-blue-500 to-cyan-400",
    skills: [
      { name: "Video Editing", level: "Core Strength" },
      { name: "Visual Storytelling", level: "Advanced Focus" },
      { name: "Video Composition", level: "Experienced" },
      { name: "Transitions & Pacing", level: "Refined" },
      { name: "Timing & Audio Sync", level: "High Precision" },
      { name: "Basic Motion Graphics", level: "Developing" }
    ]
  },
  {
    id: "design",
    title: "GRAPHIC DESIGN",
    subtitle: "Layouts, composition & visual identity",
    iconName: "Palette",
    accentColor: "from-cyan-400 to-teal-400",
    skills: [
      { name: "Layout Design", level: "Experienced" },
      { name: "Typography", level: "Aesthetic Focus" },
      { name: "Visual Composition", level: "Structured" },
      { name: "Social Media Graphics", level: "Practical Application" },
      { name: "Branding Concepts", level: "Concept Exploration" }
    ]
  },
  {
    id: "writing",
    title: "WRITING",
    subtitle: "Narrative, script craft & messaging",
    iconName: "PenTool",
    accentColor: "from-violet-500 to-indigo-400",
    skills: [
      { name: "Creative Writing", level: "Core Craft" },
      { name: "Script Writing", level: "Video Pre-production" },
      { name: "Content Writing", level: "Digital Media" },
      { name: "Storytelling", level: "Narrative Architecture" }
    ]
  },
  {
    id: "web",
    title: "WEB DEVELOPMENT",
    subtitle: "Modern interfaces & code architecture",
    iconName: "Code2",
    accentColor: "from-sky-400 to-blue-600",
    isAspiring: true,
    skills: [
      { name: "HTML5", level: "Foundational" },
      { name: "CSS3 & Modern Styling", level: "Foundational / Modern" },
      { name: "JavaScript", level: "Actively Learning" },
      { name: "Responsive Design", level: "Practicing" },
      { name: "UI Frameworks", level: "Currently developing these skills" }
    ]
  }
];

export const PROJECTS_DATA = [
  {
    id: "project-06",
    title: "MY EDITING SHOWREEL",
    category: "video",
    categoryLabel: "Video Editing",
    typeLabel: "FEATURED SHOWCASE",
    featured: true,
    description: "A curated presentation of my approach to video editing, visual storytelling, pacing, transitions, and creative direction.",
    fullDetails: "This featured showreel highlights an editorial philosophy centered on emotional rhythm, precise cut timing, dynamic sound design, and clean color treatment. Built for creators and brands looking to elevate their digital media presence.",
    image: videoEditingImg,
    tools: ["Premiere Pro", "DaVinci Resolve", "CapCut Pro", "Audition"],
    highlights: [
      "Dynamic beat-matched cutting and audio-visual synchronicity",
      "Mood-driven color grading and cinematic atmosphere",
      "Seamless invisible transitions and kinetic speed ramps",
      "Engaging narrative pacing designed for high retention"
    ],
    status: "Curated Showcase"
  },
  {
    id: "project-01",
    title: "CREATIVE VIDEO EDITING",
    category: "video",
    categoryLabel: "Video Editing",
    typeLabel: "FREELANCE / CREATIVE WORK",
    description: "A showcase of video editing work focused on pacing, transitions, storytelling, music synchronization, and visual presentation.",
    fullDetails: "Independent client and freelance editing commissions created for online content creators, vloggers, and digital projects. Each edit is tailored to the client's tone while maintaining crisp audio-visual harmony and sharp visual flow.",
    image: videoEditingImg,
    tools: ["Video Editing Suite", "Audio Mix Tools", "Motion Keyframing"],
    highlights: [
      "Client-focused revisions and tailored delivery formats",
      "Multi-cam timeline synchronization and dialogue cleanup",
      "Custom subtitle typography and aesthetic lower-thirds"
    ],
    status: "Freelance Portfolio"
  },
  {
    id: "project-02",
    title: "PERSONAL BRANDING CONCEPT",
    category: "design",
    categoryLabel: "Graphic Design",
    typeLabel: "CONCEPT PROJECT",
    description: "A conceptual branding project exploring modern typography, visual identity, color systems, and digital presentation.",
    fullDetails: "An in-depth conceptual study of personal identity design for modern digital creators. The project establishes a distinct geometric logo system, high-contrast dark palette, custom typographic rules, and modular social media templates.",
    image: brandingImg,
    tools: ["Photoshop", "Illustrator", "Figma", "Canva Pro"],
    highlights: [
      "Obsidian & Electric Blue visual design system",
      "Responsive logo lockups for multi-platform headers and avatars",
      "Comprehensive typography hierarchy and layout grid guidelines"
    ],
    status: "Concept Exploration"
  },
  {
    id: "project-03",
    title: "FUTURISTIC PORTFOLIO CONCEPT",
    category: "web",
    categoryLabel: "Web Development",
    typeLabel: "PERSONAL PROJECT",
    description: "A personal web design concept exploring responsive layouts, interactive interfaces, animation, and futuristic visual design.",
    fullDetails: "Developed as part of the BSIT self-directed learning journey, this project merges modern frontend technologies with futuristic UI concepts like dark-mode aesthetics, particle canvases, micro-interactions, and accessible responsive structures.",
    image: webConceptImg,
    tools: ["React", "JavaScript", "Tailwind CSS", "HTML5/CSS3", "Vite"],
    highlights: [
      "Zero-latency reactive dark & light theme architecture",
      "Custom interactive canvas particle system",
      "Fluid responsive breakpoints matching mobile to ultra-wide screens"
    ],
    status: "BSIT Personal Project"
  },
  {
    id: "project-04",
    title: "CREATIVE WRITING COLLECTION",
    category: "writing",
    categoryLabel: "Writing",
    typeLabel: "FREELANCE / CREATIVE WORK",
    description: "A collection of selected creative writing, scripts, concepts, and written pieces demonstrating storytelling and communication skills.",
    fullDetails: "A curated collection of video scripts, narrative treatments, short creative prose, and digital content concepts. Demonstrates the ability to craft compelling hooks, structure emotional story arcs, and communicate complex ideas with clarity.",
    image: writingImg,
    tools: ["Notion", "Google Docs", "Markdown", "Screenwriting Formats"],
    highlights: [
      "Narrative video treatments with pre-visualized pacing notes",
      "Engaging hooks and story arcs for digital audience engagement",
      "Precise tone modulation across dramatic, instructional, and tech contexts"
    ],
    status: "Creative Archive"
  },
  {
    id: "project-05",
    title: "SOCIAL MEDIA DESIGN SERIES",
    category: "design",
    categoryLabel: "Graphic Design",
    typeLabel: "PRACTICE / PERSONAL WORK",
    description: "A collection of social media graphics exploring typography, composition, branding, and visual storytelling.",
    fullDetails: "A series of graphic design experiments designed to test typographic scale, negative space utilization, color harmony, and visual hierarchy across Instagram carousel, poster, and banner formats.",
    image: socialMediaImg,
    tools: ["Adobe Photoshop", "Canva", "Figma", "Digital Illustration"],
    highlights: [
      "Experimental typographic posters with cybernetic tech themes",
      "High-converting visual post layouts and carousel templates",
      "Balanced composition balancing negative space with bold accents"
    ],
    status: "Practice Series"
  }
];

// Custom projects are synchronized by the secure owner server and generated at build time.
export const ALL_PROJECTS_DATA = [...PROJECTS_DATA, ...CUSTOM_PROJECTS];

export const SERVICES_DATA = [
  {
    id: "service-video",
    title: "VIDEO EDITING",
    description: "I create engaging video content with attention to pacing, transitions, storytelling, music synchronization, and visual presentation.",
    icon: "Film",
    deliverables: [
      "Pacing & Story Flow",
      "Music & Audio Synchronization",
      "Kinetic Transitions & Color Grading",
      "Social Media & Long-form Content"
    ]
  },
  {
    id: "service-design",
    title: "GRAPHIC DESIGN",
    description: "I create clean and creative visual designs for digital content, social media, branding concepts, and presentations.",
    icon: "Layout",
    deliverables: [
      "Social Media Graphic Packages",
      "Brand Identity & Logo Concepts",
      "Digital Posters & Typography Layouts",
      "Slide & Presentation Decks"
    ]
  },
  {
    id: "service-writing",
    title: "CREATIVE CONTENT",
    description: "I use writing and storytelling to develop scripts, concepts, captions, and creative digital content.",
    icon: "PenTool",
    deliverables: [
      "Video Scripts & Scene Outlines",
      "Creative Concepts & Treatments",
      "Digital Captions & Copywriting",
      "Narrative Storyboarding"
    ]
  },
  {
    id: "service-web",
    title: "WEB DEVELOPMENT",
    description: "Currently developing my web development skills through my BSIT journey, with an interest in creating modern and responsive websites.",
    icon: "Code",
    isLearning: true,
    deliverables: [
      "Semantic HTML5 & Modern CSS",
      "Responsive Mobile-First Layouts",
      "Interactive JavaScript Basics",
      "Modern Web UI Design Concepts"
    ]
  }
];

export const CURRENTLY_LEARNING = [
  { name: "Web Development", progress: "Active Focus", icon: "Globe", desc: "HTML5, CSS3, JavaScript, Responsive Design" },
  { name: "Programming", progress: "BSIT Curriculum", icon: "Code", desc: "Logic formulation, algorithmic thinking, OOP fundamentals" },
  { name: "UI/UX Design", progress: "Self-Study", icon: "Sparkles", desc: "User flows, typography systems, component hierarchy" },
  { name: "Advanced Video Editing", progress: "Ongoing Practice", icon: "Video", desc: "Advanced color grading, multi-track audio mastering, kinetic flow" },
  { name: "Graphic Design", progress: "Creative Growth", icon: "Palette", desc: "Vector systems, brand guidelines, editorial compositions" },
  { name: "Digital Technology", progress: "BSIT Degree", icon: "Cpu", desc: "System architecture, networking basics, modern digital workflows" }
];

export const MILESTONES = [
  {
    title: "BSIT JOURNEY",
    subtitle: "Beginning my journey in Information Technology",
    description: "Building a rigorous technical foundation in software, systems, computing logic, and digital development.",
    badge: "Current Milestone",
    year: "2026"
  },
  {
    title: "FREELANCE CREATIVE WORK",
    subtitle: "Developing experience through freelance video editing",
    description: "Providing independent editing services, collaborating with creators, and sharpening real-world turnaround workflows and visual pacing.",
    badge: "Active Practice",
    year: "Ongoing"
  },
  {
    title: "CREATIVE DEVELOPMENT",
    subtitle: "Continuously improving video editing, graphic design, and writing",
    description: "Deepening artistic versatility by blending scriptwriting, graphic composition, and cinematic post-production into cohesive digital narratives.",
    badge: "Continuous Skill Growth",
    year: "Ongoing"
  },
  {
    title: "WEB DEVELOPMENT JOURNEY",
    subtitle: "Building skills toward becoming an aspiring web developer",
    description: "Actively studying modern web architecture, interactive design patterns, and responsive front-end techniques through self-guided coding projects.",
    badge: "Aspiring Target",
    year: "In Progress"
  }
];

export const STORAGE_KEYS = {
  PROFILE: 'jc_owner_profile'
};
