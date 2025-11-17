import React from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

// ===================== Utilities =====================
const AnimatedGradientText: React.FC<{ className?: string }>= ({ className = "", children }) => (
  <motion.span
    initial={{ backgroundPositionX: 0 }}
    animate={{ backgroundPositionX: [0, 200, 0] }}
    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    className={`bg-[linear-gradient(90deg,#9b5cff,#7c3aed,#22d3ee,#9b5cff)] bg-[length:200%_100%] text-transparent bg-clip-text ${className}`}
  >{children}</motion.span>
);

// Orbit ring with a glowing dot (no overlap with name)
const Orbit: React.FC<{ size?: number; dot?: number; duration?: number }>= ({ size = 92, dot = 10, duration = 12 }) => (
  <div className="relative" style={{ width: size, height: size }}>
    <motion.div className="absolute inset-0 rounded-full border border-[#8A2BE2]/40" animate={{ rotate: 360 }} transition={{ duration, repeat: Infinity, ease: "linear" }}>
      <div className="absolute top-1/2 left-1/2 rounded-full" style={{ width: dot, height: dot, marginLeft: size/2 - dot/2, marginTop: -dot/2, background: "#8A2BE2", boxShadow: "0 0 12px #8A2BE2" }} />
    </motion.div>
  </div>
);

// ===================== Types & Data =====================
interface Project { id: number; title: string; hook: string; description: string; tech: string[]; githubUrl: string; liveUrl?: string; visual: string; }
interface Certification { id: number; title: string; issuer: string; description: string; filePath: string; }
interface Experience { id: number; role: string; company: string; date: string; points: string[]; }

const projects: Project[] = [
  { id: 1, title: "ML-Powered Transaction Fraud Detector", hook: "An intelligent system for financial institutions to detect and flag fraudulent transactions in real-time.", description: "This project utilizes machine learning algorithms trained on large datasets to identify patterns indicative of fraud. Built entirely from scratch with Python and its powerful libraries, it provides a scalable REST API endpoint that can analyze transaction data and return a risk score. The goal was to create a highly accurate and performant solution for enhancing security in banking platforms and fintech applications.", tech: ["Python","Scikit-learn","Flask","PostgreSQL"], githubUrl: "https://github.com/sidharth0dev/transaction-fraud-detection-system", liveUrl: "https://nimble-fin-assist.vercel.app/", visual: "https://res.cloudinary.com/dtwzvtmpw/video/upload/v1760975376/fraud-detector-demo_ujxee0.mp4" },
  { id: 2, title: "AI-Powered Personalized Budgeting Assistant", hook: "A production-grade financial command center that guarantees data integrity using atomic transactions.", description: "A full-stack, multi-currency budgeting application built on the Next.js App Router and designed for maximum reliability. The system features **atomic transaction processing** with Prisma ($transaction) to ensure the user's balance and budgets update instantly and accurately, preventing data corruption common in financial tools. Key user value is delivered through real-time spending visualization against customizable limits, a secure multi-currency system, and advanced forecasting of recurring income and expenses.", tech: ["Next.js 15 (App Router)","Prisma (Atomic Transactions)","PostgreSQL / Neon DB","Tailwind CSS / shadcn/ui","Server Actions"], githubUrl: "https://github.com/sidharth0dev/nimble-fin-assist", liveUrl: "https://nimble-fin-assist.vercel.app/", visual: "https://res.cloudinary.com/dtwzvtmpw/video/upload/v1760975363/financeflow-dashboard-demo_gm6ova.mp4" }
];

const experiences: Experience[] = [
  { id: 1, role: "Software Engineer (Early-Stage Startup)", company: "Ravewards Technologies, Dubai, UAE", date: "Sept 2024 - Present", points: ["Collaborated with a small cross-functional team of 3 engineers on core app modules, assisting with sprint tasks and team coordination.",
"Built early RESTful API modules using Python (Flask/Django) to support user data flows and JWT-based authentication testing.",
"Enhanced PostgreSQL performance by refining schema design, tuning queries, and adding indexes to improve API response times during testing.",
"Created basic CI/CD workflows using Docker and GitHub Actions to automate tests and reduce manual steps during development.",
"Handled GCP test environments by configuring VMs, managing resources, and supporting basic scaling checks for ongoing development."
]},
  { id: 2, role: "AI Internship (Speech Recognition System)", company: "Languify, Remote", date: "June 2023 - July 2023", points: ["Built an Automatic Speech Recognition (ASR) system to convert audio input into text with high accuracy.","Trained and fine-tuned deep learning models using Python, TensorFlow, and speech datasets for better performance.","Pre-processed and cleaned audio data, improving model efficiency and reducing word error rate.","Collaborated with the AI team to integrate the ASR model into the company's language learning platform."]}
];

const certifications: Certification[] = [
  { id: 1, title: "Google Cloud Certified: Digital Leader", issuer: "Google Cloud", description: "Validates foundational knowledge of cloud concepts and Google Cloud products.", filePath: "/certs/google-digital-leader.pdf"},
  { id: 2, title: "Build a Computer Vision App with Azure Cognitive Services", issuer: "Microsoft & Coursera", description: "Completed a hands-on project to build and deploy a computer vision application using Azure AI.", filePath: "/certs/microsoft-azure-app-dev-sidharthdev.pdf"},
  { id: 3, title: "Industrial Program on Artificial Intelligence", issuer: "Languify & 1stop.ai", description: "Completed an industrial training program, including a project on Automatic Speech Recognition.", filePath: "/certs/languify-ai-program.pdf"}
];

const skills = {
  Programming: ["Python","JavaScript (ES6+)","TypeScript","Java","C++","SQL","Bash"],
  Web: ["React.js","Next.js","Node.js","Express.js","Flask","Django","RESTful APIs","GraphQL","HTML5","CSS3","Tailwind"],
  Databases: ["PostgreSQL","MySQL","MongoDB","Firebase","Redis","Elasticsearch"],
  "AI/ML": ["TensorFlow","PyTorch","Scikit-learn","Keras","OpenCV","Hugging Face","LangChain","CNN/RNN/LSTM","MLOps"],
  Analytics: ["Pandas","NumPy","Matplotlib","Power BI","Tableau"],
  "Cloud/DevOps": ["GCP","Azure","AWS","Docker","CI/CD","Terraform"],
  Tools: ["Git","Postman","JWT/OAuth2"],
} as const;

// ===================== Icons (inline) =====================
const GithubIcon = ({ size = 24 }: { size?: number }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>);
const LinkedInIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);
const ExternalLinkIcon = ({ size = 16 }: { size?: number }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>);
const CertificateIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>);
const EyeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>);
const DownloadIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>);
const BriefcaseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>);

// --- NEW TOOLKIT ICONS ---
const CodeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>);
const GlobeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>);
const DatabaseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>);
const BrainIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.87 1.84A9 9 0 0 0 3 8.67V14a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V8.67a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4V14a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V8.67a9 9 0 0 0-6.87-6.83A5 5 0 0 0 12 0a5 5 0 0 0-2.13.42Z"></path><path d="M12 14a4 4 0 0 1 4 4v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2a4 4 0 0 1 4-4Z"></path><path d="M3 14v-2a2.94 2.94 0 0 1 2.6-2.95"></path><path d="M21 14v-2a2.94 2.94 0 0 0-2.6-2.95"></path></svg>);
const BarChartIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>);
const CloudIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>);
const SettingsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33A1.65 1.65 0 0 0 9 4.6V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82A1.65 1.65 0 0 0 19.4 15v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82A1.65 1.65 0 0 0 15 4.6V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51z"></path></svg>);

// Icon Map for Toolkit
const categoryIcons: { [key in keyof typeof skills]: React.ReactNode } = {
  "Programming": <CodeIcon />,
  "Web": <GlobeIcon />,
  "Databases": <DatabaseIcon />,
  "AI/ML": <BrainIcon />,
  "Analytics": <BarChartIcon />,
  "Cloud/DevOps": <CloudIcon />,
  "Tools": <SettingsIcon />,
};

// ===================== Tech Icons Row =====================
const techIcons: { name: string; src: string; needsInvert?: boolean }[] = [
  { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", needsInvert: true },
  { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", needsInvert: true },
  { name: "Flask", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", needsInvert: true },
  { name: "Django", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "TensorFlow", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "PyTorch", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
  { name: "Git", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
];
const iconVariants = { hidden: { opacity: 0, y: 12, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1 } } as const;
const rowVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } } as const;
const TechIcon: React.FC<{ name: string; src: string; needsInvert?: boolean }> = ({ name, src, needsInvert }) => (
  <motion.div className="flex flex-col items-center gap-2" variants={iconVariants} whileHover={{ scale: 1.15, y: -2 }} whileTap={{ scale: 0.98 }} title={name}>
    <motion.img src={src} alt={name} className="h-8 w-8 sm:h-10 sm:w-10 object-contain" loading="eager" decoding="sync" fetchpriority="high" referrerPolicy="no-referrer" style={needsInvert ? { filter: 'invert(1) contrast(1.2)' } : undefined} onError={(e)=>{ const img=e.currentTarget; img.style.filter='invert(1) contrast(1.2)'; }} animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
    <motion.span className="text-[11px] text-gray-400" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}>{name}</motion.span>
  </motion.div>
);
const TechIconsRow: React.FC = () => (
  <motion.div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6" variants={rowVariants} initial="hidden" animate="visible">
    {techIcons.map((t) => (<TechIcon key={t.name} name={t.name} src={t.src} needsInvert={t.needsInvert} />))}
  </motion.div>
);

// ===================== Main =====================
export default function Portfolio() {
  const [modalData, setModalData] = React.useState<Project | null>(null);
  const [certModal, setCertModal] = React.useState<Certification | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => { const t = setTimeout(() => setIsLoading(false), 1600); const link = document.createElement('link'); link.rel = 'preconnect'; link.href = 'https://cdn.jsdelivr.net'; link.crossOrigin = ''; document.head.appendChild(link); return () => { clearTimeout(t); document.head.removeChild(link); }; }, []);
  return (
    <div className="bg-[#0A0A0A] text-[#E0E0E0] font-sans leading-relaxed antialiased selection:bg-[#8A2BE2] selection:text-white">
      <AnimatePresence>{isLoading && <Preloader />}</AnimatePresence>
      {!isLoading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="relative">
          <ScrollProgressBar />
          <StarfieldBackground />
          <div className="relative z-10">
            <Navbar />
            <main className="px-6 md:px-20 lg:px-32">
              <HeroSection />
              <AboutSection />
              <ExperienceSection />
              <ProjectsSection projects={projects} setModalData={setModalData} />
              <CertificationsSection certifications={certifications} setCertModal={setCertModal} />
              <ToolkitSection />
              <ContactSection />
            </main>
            <Footer />
          </div>
          <AnimatePresence>
            {modalData && <ProjectModal key={`p-${modalData.id}`} project={modalData} setModalData={setModalData} />}
            {certModal && <CertificateModal key={`c-${certModal.id}`} certification={certModal} setCertModal={setCertModal} />}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

// ===================== Sub-components =====================
const ScrollProgressBar = () => { const { scrollYProgress } = useScroll(); const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 }); return <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#8A2BE2] origin-left z-50" style={{ scaleX }} />; };

const StarfieldBackground = () => {
  const StarBatch = (count: number, size: number, speed: number) => Array.from({ length: count }).map((_, i) => {
    const duration = (Math.random() * 20 + 20) / speed; const delay = Math.random() * duration;
    return (
      <motion.div key={`star-${speed}-${i}`} className="absolute rounded-full bg-white" style={{ width: size, height: size, left: `${Math.random()*100}%`, top: -5, boxShadow: `0 0 ${size*2}px rgba(255,255,255,0.8)`, opacity: Math.random()*0.5+0.5 }} animate={{ y: "100vh", opacity: [0.8,1,0.8,1,0.8] }} transition={{ duration, delay, repeat: Infinity, ease: "linear" }} />
    );
  });
  return <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">{StarBatch(50,1,1)}{StarBatch(30,2,1.5)}{StarBatch(15,3,2)}</div>;
};

const Preloader = () => {
  const [go, setGo] = React.useState(false);
  const path = { hidden: { pathLength: 0 }, visible: { pathLength: 1 } };
  return (
    <motion.div exit={{ y: "-100vh", transition: { duration: 0.6, ease: [0.76,0,0.24,1] } }} className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]">
      <div className="relative w-40 h-40">
        <motion.svg width="160" height="160" viewBox="0 0 192 192" className="absolute inset-0">
          <motion.circle cx="96" cy="96" r="70" stroke="#8A2BE2" strokeWidth="2" fill="transparent" variants={path} initial="hidden" animate="visible" transition={{ duration: 1, ease: "circOut", delay: 0.2 }} onAnimationComplete={() => setGo(true)} />
        </motion.svg>
        {go && <motion.div initial={{ scale: 0 }} animate={{ scale: [1,2.2], opacity: [0.5,0] }} transition={{ duration: 0.9, ease: "easeOut" }} className="absolute inset-0 rounded-full border-2 border-[#8A2BE2]" />}
        <div className="w-full h-full flex items-center justify-center"><AnimatedGradientText className="text-5xl font-bold">SD</AnimatedGradientText></div>
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = React.useState(false); const [open, setOpen] = React.useState(false);
  React.useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 20); window.addEventListener("scroll", onScroll); return () => window.removeEventListener("scroll", onScroll); }, []);
  const links = ["About","Experience","Projects","Certifications","Contact"];
  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => { e.preventDefault(); setOpen(false); const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth" }); };
  return (
    <>
      <motion.nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled?"bg-[#141414]/10 backdrop-blur-lg shadow-lg":"bg-transparent"}`}>
        <div className="flex items-center justify-between h-20 px-6 md:px-20 lg:px-32">
          <a href="#" onClick={(e)=>{e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" });}} className="text-xl font-bold font-sans">Sidharth Dev.</a>
          <div className="hidden md:flex items-center gap-8">
            {links.map((l)=> (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={(e)=>go(e,l.toLowerCase())} className="text-[#E0E0E0] hover:text-[#8A2BE2] transition-colors duration-300 relative group font-sans">
                {l}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8A2BE2] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
          <button className="md:hidden" onClick={()=>setOpen(!open)} aria-label="Toggle Menu">
            <span className="block w-6 h-0.5 bg-white mb-1"/><span className="block w-6 h-0.5 bg-white mb-1"/><span className="block w-6 h-0.5 bg-white"/>
          </button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.3 }} className="fixed top-0 right-0 bottom-0 w-full bg-[#141414]/80 backdrop-blur-lg z-30 flex items-center justify-center">
            <div className="flex flex-col gap-8 text-center">
              {links.map((l)=> (
                <a key={l} href={`#${l.toLowerCase()}`} onClick={(e)=>go(e,l.toLowerCase())} className="text-3xl font-bold text-white">{l}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const HeroSection = () => (
  <section className="min-h-screen flex flex-col justify-center text-center md:text-left">
    <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
      <motion.div className="w-3 h-3 bg-[#8A2BE2] rounded-full" animate={{ scale: [1,1.2,1] }} transition={{ duration: 1.5, repeat: Infinity }} />
      <p className="text-sm font-sans">Ready to make an impact.</p>
    </div>
    <h1 className="text-5xl md:text-7xl font-bold leading-tight font-sans">
      <div className="flex items-center justify-center md:justify-start gap-6">
        <AnimatedGradientText>Sidharth Dev</AnimatedGradientText>
        <div className="hidden sm:block"><Orbit /></div>
      </div>
    </h1>
    <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto md:mx-0 text-gray-400 font-sans">FULL STACK & AI/ML ENGINEER</p>
    <TechIconsRow />
    <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
      <a href="#projects" className="w-full sm:w-auto px-6 py-3 bg-[#8A2BE2] text-white font-semibold rounded-lg shadow-lg hover:bg-opacity-80 transition-all duration-300 font-sans text-center">View My Work</a>
      <div className="w-full sm:w-auto flex gap-4">
        <a href="https://www.linkedin.com/in/sidharth0dev" target="_blank" className="w-full sm:w-auto px-6 py-3 bg-transparent border border-[#E0E0E0] text-[#E0E0E0] font-semibold rounded-lg hover:bg-[#E0E0E0] hover:text-[#0A0A0A] transition-all duration-300 font-sans text-center">Connect on LinkedIn</a>
        <a href="SIDHARTH-DEV-Resume-copy.pdf" download className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#8A2BE2] text-white font-semibold rounded-lg shadow-lg hover:bg-opacity-80 transition-all duration-300 font-sans"><DownloadIcon /> Resume</a>
      </div>
    </div>
  </section>
);

const AboutSection = () => (
  <section id="about" className="py-20">
    <h2 className="text-4xl font-bold text-center mb-16 font-sans">About Me</h2>
    <div className="grid md:grid-cols-5 gap-12 items-center">
      <motion.div initial={{ opacity: 0, x: -50, rotate: -10 }} whileInView={{ opacity: 1, x: 0, rotate: -3 }} viewport={{ once: true }} transition={{ duration: 0.8, type: "spring", stiffness: 80, delay: 0.2 }} className="md:col-span-2 relative h-80">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8A2BE2] to-[#4c1d95] rounded-2xl transform -rotate-6" />
        <motion.div whileHover={{ rotate: 0 }} className="absolute inset-0 bg-[#141414] rounded-2xl shadow-2xl p-4 transform hover:rotate-3 transition-transform duration-500">
          <div className="w-full h-full bg-cover bg-center rounded-lg" style={{ backgroundImage: 'url(/IMG_1422.JPG)' }} />
        </motion.div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, type: "spring", stiffness: 80 }} className="md:col-span-3">
        <p className="text-gray-400 leading-relaxed font-sans text-lg font-medium">I’m an entry-level Software Engineer with hands-on experience in full-stack development, early-stage startup projects, and foundational AI/ML work. I enjoy building simple, functional features while learning modern technologies like Python, React, TensorFlow, SQL, and cloud tools. I’m focused on improving my fundamentals and contributing to real-world projects while growing into a full-stack or AI/ML engineering role.</p>
      </motion.div>
    </div>
  </section>
);

const ExperienceSection = () => (
  <section id="experience" className="py-20">
    <h2 className="text-4xl font-bold text-center mb-16 font-sans">Work Experience</h2>
    <div className="max-w-3xl mx-auto relative">
      <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-700" aria-hidden={true} />
      {experiences.map((exp, index) => (
        <motion.div key={exp.id} className="mb-12 flex items-start" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.15, type: "spring", stiffness: 100 }}>
          <div className="flex-shrink-0"><div className="relative z-10 w-8 h-8 bg-[#141414] border-2 border-[#8A2BE2] rounded-full flex items-center justify-center"><BriefcaseIcon /></div></div>
          <div className="ml-8 w-full">
            <h3 className="text-xl font-bold text-white">{exp.role}</h3>
            <p className="text-md font-semibold text-[#8A2BE2]">{exp.company}</p>
            <p className="text-sm text-gray-500 mb-4">{exp.date}</p>
            <ul className="list-disc pl-5 space-y-2">
              {exp.points.map((p, i) => (
                <motion.li key={i} className="text-gray-400 text-sm leading-relaxed" initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}>{p}</motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const ProjectsSection = ({ projects, setModalData }: { projects: Project[]; setModalData: (p: Project) => void }) => (
  <section id="projects" className="py-20">
    <h2 className="text-4xl font-bold text-center mb-4 font-sans">My Projects</h2>
    <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto font-sans">These are my key projects that demonstrate my skills in full-stack development and machine learning.</p>
    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
      {projects.map((project, index) => (
        <motion.div key={project.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -10, scale: 1.03 }} transition={{ duration: 0.5, delay: index * 0.15, type: "spring", stiffness: 100 }} onClick={() => setModalData(project)} className="bg-[#141414] rounded-2xl overflow-hidden cursor-pointer group shadow-lg transition-all duration-300">
          <div className="w-full h-64 bg-[#0A0A0A] overflow-hidden"><video src={project.visual} autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/></div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 group-hover:text-[#8A2BE2] transition-colors duration-300 font-sans">{project.title}</h3>
            <p className="text-gray-400 mb-4 font-sans text-sm">{project.hook}</p>
            <div className="flex flex-wrap gap-2 mt-4">{project.tech.map((t)=> (<span key={t} className="text-xs bg-[#0A0A0A] px-2 py-1 rounded-full font-sans">{t}</span>))}</div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const CertificationsSection = ({ certifications, setCertModal }: { certifications: Certification[]; setCertModal: (c: Certification) => void }) => (
  <section id="certifications" className="py-20">
    <h2 className="text-4xl font-bold text-center mb-12 font-sans">Certifications & Achievements</h2>
    <div className="max-w-3xl mx-auto space-y-6">
      {certifications.map((cert, i) => (
        <motion.div key={cert.id} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="bg-[#141414] p-6 rounded-2xl shadow-lg flex items-center justify-between group">
          <div className="flex items-center gap-6"><div className="text-[#8A2BE2]"><CertificateIcon /></div><div><h3 className="text-lg font-bold text-white">{cert.title}</h3><p className="text-gray-400 text-sm mt-1">{cert.issuer}</p></div></div>
          <button onClick={() => setCertModal(cert)} className="p-2 rounded-full bg-transparent group-hover:bg-[#8A2BE2]/20 text-gray-400 group-hover:text-white transition-all duration-300" aria-label="View"><EyeIcon /></button>
        </motion.div>
      ))}
    </div>
  </section>
);

const ToolkitSection = () => (
  <section id="toolkit" className="py-20">
    <h2 className="text-4xl font-bold text-center mb-12 font-sans">My Toolkit</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Object.entries(skills).map(([category, list]) => (
        <motion.div key={category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} whileHover={{ y: -8, scale: 1.03 }} className="bg-[#141414] p-6 rounded-2xl shadow-lg transition-all duration-300">
          <h3 className="text-xl font-semibold text-[#8A2BE2] mb-4 font-sans flex items-center gap-3">
            {categoryIcons[category as keyof typeof skills]}
            <span>{category}</span>
          </h3>
          <div className="flex flex-wrap gap-2">{list.map((skill) => (<span key={skill} className="bg-[#0A0A0A] text-sm text-gray-300 px-3 py-1 rounded-full font-sans">{skill}</span>))}</div>
        </motion.div>
      ))}
    </div>
  </section>
);

const ContactSection = () => (
  <section id="contact" className="py-20 text-center">
    <h2 className="text-4xl font-bold mb-4 font-sans">Get In Touch</h2>
    <p className="text-gray-400 max-w-xl mx-auto mb-8 font-sans">I'm currently based in Dubai, UAE, and actively seeking new opportunities.</p>
    <a href="mailto:sidharth0dev@gmail.com" className="inline-block text-xl font-semibold text-[#8A2BE2] hover:text-opacity-80 transition-all duration-300 font-sans">sidharth0dev@gmail.com</a>
    <p className="text-gray-400 max-w-xl mx-auto mt-4 font-sans">+971 056 456 5523</p>
    <div className="flex justify-center items-center gap-6 mt-8">
      <a href="https://github.com/sidharth0dev" target="_blank" className="text-gray-400 hover:text-[#8A2BE2] transition-colors" aria-label="GitHub"><GithubIcon size={24} /></a>
      <a href="https://www.linkedin.com/in/sidharth0dev" target="_blank" className="text-gray-400 hover:text-[#8A2BE2] transition-colors" aria-label="LinkedIn"><LinkedInIcon /></a>
    </div>
  </section>
);

const Footer = () => (<footer className="text-center py-8"><p className="text-gray-500 text-sm font-sans">Designed and built by Sidharth Dev with ❤️. &copy; {new Date().getFullYear()}</p></footer>);

// ===================== Modals =====================
const ProjectModal = ({ project, setModalData }: { project: Project; setModalData: (p: Project | null) => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalData(null)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
    <motion.div initial={{ scale: 0.92, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 16 }} transition={{ duration: 0.25 }} onClick={(e) => e.stopPropagation()} className="bg-[#141414] w-full max-w-3xl rounded-2xl overflow-hidden border border-gray-700">
      <div className="p-4 border-b border-gray-700 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <h2 className="text-xl font-bold text-white font-sans truncate">{project.title}</h2>
        <div className="flex items-center gap-2">
          <a href={project.githubUrl} target="_blank" className="text-xs px-3 py-1.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"><GithubIcon size={16}/>Code</a>
          {project.liveUrl && (<a href={project.liveUrl} target="_blank" className="text-xs px-3 py-1.5 bg-white text-black rounded-lg hover:bg-gray-200 flex items-center gap-2"><ExternalLinkIcon size={16}/>Demo</a>)}
          <button onClick={() => setModalData(null)} aria-label="Close" className="p-2 rounded-full hover:bg-white/10"><span className="text-2xl">&times;</span></button>
        </div>
      </div>
      <div className="w-full h-64 sm:h-72 bg-[#0A0A0A]"><video src={project.visual} autoPlay loop muted playsInline className="w-full h-full object-cover"/></div>
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap gap-2 mb-4">{project.tech.map((t)=> (<span key={t} className="text-xs bg-[#0A0A0A] px-2 py-1 rounded-full">{t}</span>))}</div>
        <p className="text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: project.description.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
      </div>
    </motion.div>
  </motion.div>
);

const CertificateModal = ({ certification, setCertModal }: { certification: Certification; setCertModal: (c: Certification | null) => void }) => {
  const isPdf = certification.filePath.toLowerCase().endsWith(".pdf");
  return (
    <motion.div key={certification.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCertModal(null)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }} transition={{ duration: 0.25 }} onClick={(e) => e.stopPropagation()} className="bg-[#141414] w-full max-w-4xl h-5/6 rounded-2xl overflow-hidden border border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center"><h3 className="font-bold text-white">{certification.title}</h3><button onClick={() => setCertModal(null)} aria-label="Close" className="text-gray-400 hover:text-white">&times;</button></div>
        <div className="flex-grow bg-gray-900/50">{isPdf ? (<iframe src={certification.filePath} className="w-full h-full" title={certification.title} />) : (<img src={certification.filePath} className="w-full h-full object-contain" alt={certification.title} />)}</div>
      </motion.div>
    </motion.div>
  );
};