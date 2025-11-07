import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

// --- TYPE DEFINITIONS ---
interface Project {
  id: number;
  title: string;
  hook: string;
  description: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  visual: string;
}

interface Certification {
  id: number;
  title: string;
  issuer: string;
  description: string;
  filePath: string; // Path to the PDF/PNG in the public/certs folder
}

interface Experience {
  id: number;
  role: string;
  company: string;
  date: string;
  points: string[];
}

// --- DATA ---
const projects: Project[] = [
  {
    id: 1,
    title: 'ML-Powered Fraud Detector',
    hook: 'An intelligent system for financial institutions to detect and flag fraudulent transactions in real-time.',
    description: 'This project utilizes machine learning algorithms trained on large datasets to identify patterns indicative of fraud. Built entirely from scratch with Python and its powerful libraries, it provides a scalable REST API endpoint that can analyze transaction data and return a risk score. The goal was to create a highly accurate and performant solution for enhancing security in banking platforms and fintech applications.',
    tech: ['Python', 'Scikit-learn', 'Flask', 'PostgreSQL'],
    githubUrl: 'https://github.com/sidharth0dev/transaction-fraud-detection-system',
    liveUrl: 'https://transaction-fraud-detection-system-2.onrender.com/',
    visual: 'https://res.cloudinary.com/dtwzvtmpw/video/upload/v1760975376/fraud-detector-demo_ujxee0.mp4',
  },
  {
    id: 2,
    title: "AI Powered Personalized Budgeting Assistant - FinanceFlow",
    hook: "A production-grade financial command center that guarantees data integrity using atomic transactions.",
    description: "A full-stack, multi-currency budgeting application built on the Next.js App Router and designed for maximum reliability. The system features **atomic transaction processing** with Prisma ($transaction) to ensure the user's balance and budgets update instantly and accurately, preventing data corruption common in financial tools. Key user value is delivered through real-time spending visualization against customizable limits, a secure multi-currency system, and advanced forecasting of recurring income and expenses.",
    tech: [
      "Next.js 15 (App Router)",
      "Prisma (Atomic Transactions)",
      "PostgreSQL / Neon DB",
      "Tailwind CSS / shadcn/ui",
      "Server Actions"
    ],
    githubUrl: "https://github.com/sidharth0dev/nimble-fin-assist",
    liveUrl: "https://nimble-fin-assist.vercel.app/",
    visual: "https://res.cloudinary.com/dtwzvtmpw/video/upload/v1760975363/financeflow-dashboard-demo_gm6ova.mp4"
  },
];

const experiences: Experience[] = [
  {
    id: 1,
    role: 'Software Engineer & Co-Founder',
    company: 'Ravewards Technologies, Dubai, UAE',
    date: 'Sept 2024 - Present',
    points: [
      'Led a cross-functional team of 3 engineers to build and launch a scalable mobile app, managing Agile sprints and stakeholder communications.',
      'Developed RESTful APIs using Python (Flask/Django) to handle user data and authentication with JWT security.',
      'Optimized PostgreSQL performance, cutting query time by 30% through schema tuning, indexing, and query refactoring.',
      'Set up CI/CD pipelines with Docker and GitHub Actions, automating testing and deployment processes.',
      'Managed GCP infrastructure, enabling auto-scaling, load balancing, and stable app performance.'
    ]
  },
  {
    id: 2,
    role: 'AI Internship (Speech Recognition System)',
    company: 'Languify, Remote',
    date: 'June 2023 - July 2023',
    points: [
      'Built an Automatic Speech Recognition (ASR) system to convert audio input into text with high accuracy.',
      'Trained and fine-tuned deep learning models using Python, TensorFlow, and speech datasets for better performance.',
      'Pre-processed and cleaned audio data, improving model efficiency and reducing word error rate.',
      'Collaborated with the AI team to integrate the ASR model into the company\'s language learning platform.'
    ]
  }
];

const certifications: Certification[] = [
  {
    id: 1,
    title: 'Google Cloud Certified: Digital Leader',
    issuer: 'Google Cloud',
    description: 'Validates foundational knowledge of cloud concepts and Google Cloud products.',
    filePath: '/certs/google-digital-leader.pdf',
  },
  {
    id: 2,
    title: 'Build a Computer Vision App with Azure Cognitive Services',
    issuer: 'Microsoft & Coursera',
    description: 'Completed a hands-on project to build and deploy a computer vision application using Azure AI.',
    filePath: '/certs/microsoft-azure-app-dev-sidharthdev.pdf',
  },
  {
    id: 3,
    title: 'Industrial Program on Artificial Intelligence',
    issuer: 'Languify & 1stop.ai',
    description: 'Completed an industrial training program, including a project on Automatic Speech Recognition.',
    filePath: '/certs/languify-ai-program.pdf',
  },
];

const skills = {
    "Programming": ['Python', 'JavaScript (ES6+)', 'TypeScript', 'Java', 'C++', 'SQL', 'Bash'],
    "Web": ['React.js', 'Next.js', 'Node.js', 'Express.js', 'Flask', 'Django', 'RESTful APIs', 'GraphQL', 'HTML5', 'CSS3', 'Tailwind'],
    "Databases": ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'Redis', 'Elasticsearch'],
    "AI/ML": ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'OpenCV', 'Hugging Face', 'LangChain', 'CNN/RNN/LSTM', 'MLOps'],
    "Analytics": ['Pandas', 'NumPy', 'Matplotlib', 'Power BI', 'Tableau'],
    "Cloud/DevOps": ['GCP', 'Azure', 'AWS', 'Docker', 'CI/CD', 'Terraform', 'Linux'],
    "Tools": ['Git', 'Postman', 'JWT/OAuth2']
};


// --- SVG ICONS ---
const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const ExternalLinkIcon = ({ size = 16 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);

const CertificateIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-award"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
);

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
);

const BriefcaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-briefcase"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
);


// --- MAIN APP COMPONENT ---
export default function Portfolio() {
  const [modalData, setModalData] = React.useState<Project | null>(null);
  const [certificateModalData, setCertificateModalData] = React.useState<Certification | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Pre-loader effect
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // Adjusted duration for the new animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#0A0A0A] text-[#E0E0E0] font-sans leading-relaxed antialiased selection:bg-[#8A2BE2] selection:text-white">
      <AnimatePresence>
        {isLoading && <Preloader />}
      </AnimatePresence>
      
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <ScrollProgressBar />
          <StarfieldBackground />
          <div className="relative z-10">
            <Navbar />
            <main className="px-6 md:px-20 lg:px-32">
              <HeroSection />
              <AboutSection />
              <ExperienceSection />
              <ProjectsSection projects={projects} setModalData={setModalData} />
              <CertificationsSection certifications={certifications} setCertificateModalData={setCertificateModalData} />
              <ToolkitSection />
              <ContactSection />
            </main>
            <Footer />
          </div>
          <AnimatePresence>
            {modalData && <ProjectModal key={`project-${modalData.id}`} project={modalData} setModalData={setModalData} />}
            {certificateModalData && <CertificateModal key={`cert-${certificateModalData.id}`} certification={certificateModalData} setCertificateModalData={setCertificateModalData} />}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

// --- SUB-COMPONENTS ---

const ScrollProgressBar = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
    });
  
    return <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#8A2BE2] origin-left z-50" style={{ scaleX }} />;
}

const StarfieldBackground = () => {
    const createStars = (count: number, size: number, speed: number) => {
        return Array.from({ length: count }).map((_, i) => {
            const duration = (Math.random() * 20 + 20) / speed;
            const delay = Math.random() * duration;
            return (
                <motion.div
                    key={`star-${speed}-${i}`}
                    className="absolute rounded-full bg-white"
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        left: `${Math.random() * 100}%`,
                        top: '-5px',
                        boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, 0.8)`,
                        opacity: Math.random() * 0.5 + 0.5,
                    }}
                    animate={{
                        y: '100vh',
                        opacity: [0.8, 1, 0.8, 1, 0.8]
                    }}
                    transition={{
                        duration: duration,
                        delay: delay,
                        repeat: Infinity,
                        repeatType: 'loop',
                        ease: 'linear'
                    }}
                />
            );
        });
    };

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {createStars(50, 1, 1)}
            {createStars(30, 2, 1.5)}
            {createStars(15, 3, 2)}
        </div>
    );
};


const Preloader = () => {
  const [showShockwave, setShowShockwave] = React.useState(false);

  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1 },
  };

  const textVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const shockwaveVariants = {
      hidden: { scale: 0, opacity: 0.7 },
      visible: (i: number) => ({
          scale: 3,
          opacity: 0,
          transition: {
              delay: i * 0.2,
              duration: 1.5,
              ease: "easeOut"
          }
      })
  }

  return (
    <motion.div
      exit={{ y: '-100vh', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A] overflow-hidden"
    >
      <div className="relative w-48 h-48">
        <motion.svg
          width="192"
          height="192"
          viewBox="0 0 192 192"
          className="absolute inset-0"
        >
          <motion.circle
            cx="96"
            cy="96"
            r="80"
            stroke="#8A2BE2"
            strokeWidth="2"
            fill="transparent"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1.2, ease: "circOut", delay: 0.2 }}
          />
           <motion.circle
            cx="96"
            cy="96"
            r="70"
            stroke="white"
            strokeWidth="1"
            fill="transparent"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1.2, ease: "circInOut", delay: 0.5 }}
            onAnimationComplete={() => setShowShockwave(true)}
          />
        </motion.svg>
        
        <AnimatePresence>
        {showShockwave && [...Array(4)].map((_, i) => (
             <motion.div
                key={i}
                custom={i}
                variants={shockwaveVariants}
                initial="hidden"
                animate="visible"
                className="absolute top-0 left-0 rounded-full border-2 border-[#8A2BE2]"
                style={{ width: '192px', height: '192px' }}
             />
        ))}
        </AnimatePresence>

        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 1, type: "spring", stiffness: 100 }}
          className="w-full h-full flex items-center justify-center"
        >
            <span className="text-6xl font-bold text-white font-sans">S</span>
            <span className="text-6xl font-bold text-[#8A2BE2] font-sans">D</span>
        </motion.div>
      </div>
    </motion.div>
  );
};


const Navbar = () => {
    const [scrolled, setScrolled] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = ["About", "Experience", "Projects", "Certifications", "Contact"];

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <motion.nav 
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#141414]/10 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}
            >
                <div className="flex items-center justify-between h-20 px-6 md:px-20 lg:px-32">
                    <a href="#" className="text-xl font-bold font-sans">Sidharth Dev.</a>
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map(link => (
                            <a 
                                key={link} 
                                href={`#${link.toLowerCase()}`} 
                                onClick={(e) => handleLinkClick(e, link.toLowerCase())}
                                className="text-[#E0E0E0] hover:text-[#8A2BE2] transition-colors duration-300 relative group font-sans"
                            >
                                {link}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8A2BE2] transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>
                    <div className="md:hidden">
                        <HamburgerButton isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
                    </div>
                </div>
            </motion.nav>
            <AnimatePresence>
                {isMobileMenuOpen && <MobileMenu navLinks={navLinks} handleLinkClick={handleLinkClick} />}
            </AnimatePresence>
        </>
    );
};

const HamburgerButton = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) => {
    const variant = isOpen ? "opened" : "closed";
    const top = { closed: { rotate: 0, translateY: 0 }, opened: { rotate: 45, translateY: 8 } };
    const center = { closed: { opacity: 1 }, opened: { opacity: 0 } };
    const bottom = { closed: { rotate: 0, translateY: 0 }, opened: { rotate: -45, translateY: -8 } };

    return (
        <motion.button onClick={() => setIsOpen(!isOpen)} className="w-8 h-8 relative z-50">
            <motion.div className="w-full h-0.5 bg-white absolute top-2 left-0" variants={top} animate={variant} transition={{ duration: 0.3 }}></motion.div>
            <motion.div className="w-full h-0.5 bg-white absolute top-1/2 left-0 -translate-y-1/2" variants={center} animate={variant} transition={{ duration: 0.3 }}></motion.div>
            <motion.div className="w-full h-0.5 bg-white absolute bottom-2 left-0" variants={bottom} animate={variant} transition={{ duration: 0.3 }}></motion.div>
        </motion.button>
    );
};

const MobileMenu = ({ navLinks, handleLinkClick }: { navLinks: string[], handleLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void }) => {
    const menuVariants = {
        hidden: { x: '100%' },
        visible: { x: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
    };
    const linkVariants = {
        hidden: { x: 50, opacity: 0 },
        visible: { x: 0, opacity: 1 }
    };
    return (
        <motion.div 
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full bg-[#141414]/80 backdrop-blur-lg z-30 flex items-center justify-center"
        >
            <div className="flex flex-col gap-8 text-center">
                {navLinks.map(link => (
                    <motion.a
                        key={link}
                        variants={linkVariants}
                        href={`#${link.toLowerCase()}`}
                        onClick={(e) => handleLinkClick(e, link.toLowerCase())}
                        className="text-3xl font-bold text-white"
                    >
                        {link}
                    </motion.a>
                ))}
            </div>
        </motion.div>
    );
};

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex flex-col justify-center text-center md:text-left"
    >
      <motion.div variants={itemVariants} className="flex items-center gap-3 justify-center md:justify-start mb-4">
        <motion.div className="w-3 h-3 bg-[#8A2BE2] rounded-full"
            animate={{ scale: [1, 1.2, 1], transition: { duration: 1.5, repeat: Infinity } }}
        ></motion.div>
        <p className="text-sm font-sans">Ready to make an impact.</p>
      </motion.div>
      <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold leading-tight font-sans">
        Sidharth Dev
      </motion.h1>
      <motion.p variants={itemVariants} className="mt-4 text-lg md:text-xl max-w-2xl mx-auto md:mx-0 text-gray-400 font-sans">
        FULL STACK & AI/ML ENGINEER
      </motion.p>
      <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
        <motion.a whileHover={{ scale: 1.05, y: -5 }} transition={{ type: 'spring', stiffness: 300 }} href="#projects" className="w-full sm:w-auto px-6 py-3 bg-[#8A2BE2] text-white font-semibold rounded-lg shadow-lg hover:bg-opacity-80 transition-all duration-300 font-sans text-center">View My Work</motion.a>
        <div className="w-full sm:w-auto flex gap-4">
            <motion.a whileHover={{ scale: 1.05, y: -5 }} transition={{ type: 'spring', stiffness: 300 }} href="https://www.linkedin.com/in/sidharth0dev" target="_blank" className="w-full sm:w-auto px-6 py-3 bg-transparent border border-[#E0E0E0] text-[#E0E0E0] font-semibold rounded-lg hover:bg-[#E0E0E0] hover:text-[#0A0A0A] transition-all duration-300 font-sans text-center">Connect on LinkedIn</motion.a>
            <motion.a whileHover={{ scale: 1.05, y: -5 }} transition={{ type: 'spring', stiffness: 300 }} href="SidharthDevResume.pdf" download className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#8A2BE2] text-white font-semibold rounded-lg shadow-lg hover:bg-opacity-80 transition-all duration-300 font-sans">
                <DownloadIcon /> Resume
            </motion.a>
        </div>
      </motion.div>
    </motion.section>
  );
};


const AboutSection = () => (
    <section id="about" className="py-20">
        <h2 className="text-4xl font-bold text-center mb-16 font-sans">About Me</h2>
        <div className="grid md:grid-cols-5 gap-12 items-center">
            <motion.div 
                initial={{ opacity: 0, x: -50, rotate: -10 }}
                whileInView={{ opacity: 1, x: 0, rotate: -3 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 80, delay: 0.2 }}
                className="md:col-span-2 relative h-80"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-[#8A2BE2] to-[#4c1d95] rounded-2xl transform -rotate-6"></div>
                <div className="absolute inset-0 bg-[#141414] rounded-2xl shadow-2xl p-4 transform hover:rotate-3 transition-transform duration-500">
                    <div className="w-full h-full bg-cover bg-center rounded-lg" style={{backgroundImage: 'url(/IMG_1422.JPG)'}}></div>
                </div>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
                className="md:col-span-3"
            >
                <p className="text-gray-400 leading-relaxed font-sans text-lg font-medium">
                    Results-driven Computer Science Engineer with hands-on experience in full-stack development, AI/ML systems, and data analytics. Skilled in Python, React, TensorFlow, SQL, and Google Cloud Platform, with a strong ability to build scalable applications and deploy ML models for real-world impact. Solid foundation in algorithms, databases, and DevOps practices, eager to apply expertise in roles such as Full Stack Developer or AI/ML Engineer to deliver innovative, data-driven solutions.
                </p>
            </motion.div>
        </div>
    </section>
);

const ExperienceSection = () => (
  <section id="experience" className="py-20">
    <h2 className="text-4xl font-bold text-center mb-16 font-sans">Work Experience</h2>
    <div className="max-w-3xl mx-auto relative">
      {/* Vertical line for the timeline */}
      <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-700" aria-hidden="true"></div>

      {experiences.map((exp, index) => (
        <motion.div
          key={exp.id}
          className="mb-12 flex items-start"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2, type: 'spring', stiffness: 100 }}
        >
          {/* Timeline Dot */}
          <div className="flex-shrink-0">
            <div className="relative z-10 w-8 h-8 bg-[#141414] border-2 border-[#8A2BE2] rounded-full flex items-center justify-center">
              <BriefcaseIcon />
            </div>
          </div>
          
          {/* Content */}
          <div className="ml-8 w-full">
            <h3 className="text-xl font-bold text-white">{exp.role}</h3>
            <p className="text-md font-semibold text-[#8A2BE2]">{exp.company}</p>
            <p className="text-sm text-gray-500 mb-4">{exp.date}</p>
            <ul className="list-disc pl-5 space-y-2">
              {exp.points.map((point, i) => (
                <li key={i} className="text-gray-400 text-sm leading-relaxed">{point}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);


const ToolkitSection = () => {
    return (
        <section id="toolkit" className="py-20">
            <h2 className="text-4xl font-bold text-center mb-12 font-sans">My Toolkit</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(skills).map(([category, list]) => (
                    <motion.div 
                        key={category} 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, type: 'spring' }}
                        whileHover={{ y: -8, scale: 1.03 }}
                        className="bg-[#141414] p-6 rounded-2xl shadow-lg transition-all duration-300 group"
                    >
                        <h3 className="text-xl font-semibold text-[#8A2BE2] mb-4 font-sans">{category}</h3>
                        <div className="flex flex-wrap gap-2">
                            {list.map(skill => (
                                <SkillTag key={skill} skill={skill} />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const SkillTag = ({ skill }: { skill: string }) => {
    return (
      <span className="bg-[#0A0A0A] text-sm text-gray-300 px-3 py-1 rounded-full font-sans relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          variants={{
            hover: {
              backgroundPosition: ["0% 50%", "100% 50%"],
            },
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)',
            backgroundSize: '200% 100%',
          }}
        />
        <span className="relative">{skill}</span>
      </span>
    );
  };

const CertificationsSection = ({ certifications, setCertificateModalData }: { certifications: Certification[], setCertificateModalData: (cert: Certification) => void }) => (
    <section id="certifications" className="py-20">
        <h2 className="text-4xl font-bold text-center mb-12 font-sans">Certifications & Achievements</h2>
        <div className="max-w-3xl mx-auto space-y-6">
            {certifications.map((cert, index) => (
                <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 100 }}
                    className="bg-[#141414] p-6 rounded-2xl shadow-lg flex items-center justify-between group"
                >
                    <div className="flex items-center gap-6">
                        <div className="text-[#8A2BE2]">
                           <CertificateIcon />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">{cert.title}</h3>
                            <p className="text-gray-400 text-sm mt-1">{cert.issuer}</p>
                        </div>
                    </div>
                    <motion.button
                        onClick={() => setCertificateModalData(cert)}
                        className="p-2 rounded-full bg-transparent group-hover:bg-[#8A2BE2]/20 text-gray-400 group-hover:text-white transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <EyeIcon />
                    </motion.button>
                </motion.div>
            ))}
        </div>
    </section>
);

const ProjectsSection = ({ projects, setModalData }: { projects: Project[], setModalData: (project: Project) => void }) => (
    <section id="projects" className="py-20">
        <h2 className="text-4xl font-bold text-center mb-4 font-sans">My Projects</h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto font-sans">These are my key projects that demonstrate my skills in full-stack development and machine learning.</p>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10, scale: 1.03 }}
                    transition={{ duration: 0.7, delay: index * 0.2, type: 'spring', stiffness: 100 }}
                    onClick={() => setModalData(project)}
                    className="bg-[#141414] rounded-2xl overflow-hidden cursor-pointer group shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-[#8A2BE2]/20"
                >
                    <div className="w-full h-64 bg-[#0A0A0A] overflow-hidden">
                        <video
                            src={project.visual}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-[#8A2BE2] transition-colors duration-300 font-sans">{project.title}</h3>
                        <p className="text-gray-400 mb-4 font-sans text-sm">{project.hook}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {project.tech.map(t => (
                                <span key={t} className="text-xs bg-[#0A0A0A] px-2 py-1 rounded-full font-sans">{t}</span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    </section>
);


const ContactSection = () => {
    return (
    <section id="contact" className="py-20 text-center">
        <h2 className="text-4xl font-bold mb-4 font-sans">Get In Touch</h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-8 font-sans">
            I'm currently based in Dubai, UAE, and actively seeking new opportunities.
        </p>
        <motion.a 
            whileHover={{ scale: 1.05 }}
            href="mailto:sidharth0dev@gmail.com" 
            className="inline-block text-xl font-semibold text-[#8A2BE2] hover:text-opacity-80 transition-all duration-300 font-sans"
        >
            sidharth0dev@gmail.com
        </motion.a>
         <p className="text-gray-400 max-w-xl mx-auto mt-4 font-sans">
            +971 056 456 5523
        </p>
        <div className="flex justify-center items-center gap-6 mt-8">
            <motion.a whileHover={{ scale: 1.2, y: -4 }} href="https://github.com/sidharth0dev" target="_blank" className="text-gray-400 hover:text-[#8A2BE2] transition-colors"><GithubIcon size={24} /></motion.a>
            <motion.a whileHover={{ scale: 1.2, y: -4 }} href="https://www.linkedin.com/in/sidharth0dev" target="_blank" className="text-gray-400 hover:text-[#8A2BE2] transition-colors"><LinkedInIcon /></motion.a>
        </div>
    </section>
    );
};

const Footer = () => (
    <footer className="text-center py-8">
        <p className="text-gray-500 text-sm font-sans">
            Designed and built by Sidharth Dev with ❤️. &copy; {new Date().getFullYear()}
        </p>
    </footer>
);

const ProjectModal = ({ project, setModalData }: { project: Project, setModalData: (project: Project | null) => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={() => setModalData(null)}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4"
  >
    <motion.div
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={(e) => e.stopPropagation()}
      className="bg-[#141414] w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-gray-700"
    >
        <div className="p-4 border-b border-gray-700 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <h2 className="text-xl font-bold text-white font-sans w-full sm:w-auto truncate">{project.title}</h2>
            <div className="flex items-center gap-2 flex-shrink-0">
                <motion.a whileHover={{ scale: 1.05 }} href={project.githubUrl} target="_blank" className="flex items-center gap-2 text-xs px-3 py-1.5 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all duration-300">
                    <GithubIcon size={16} /> Code
                </motion.a>
                {project.liveUrl && (
                    <motion.a whileHover={{ scale: 1.05 }} href={project.liveUrl} target="_blank" className="flex items-center gap-2 text-xs px-3 py-1.5 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300">
                    <ExternalLinkIcon size={16} /> Demo
                    </motion.a>
                )}
                <motion.button 
                    onClick={() => setModalData(null)} 
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <span className="text-2xl">&times;</span>
                </motion.button>
            </div>
        </div>
      <div className="w-full h-64 sm:h-72 bg-[#0A0A0A]">
        <video
            src={project.visual}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map(t => (
            <span key={t} className="text-xs bg-[#0A0A0A] px-2 py-1 rounded-full font-sans">{t}</span>
          ))}
        </div>
        <p className="text-gray-400 leading-relaxed font-sans" dangerouslySetInnerHTML={{ __html: project.description.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }}></p>
      </div>
    </motion.div>
  </motion.div>
);

const CertificateModal = ({ certification, setCertificateModalData }: { certification: Certification, setCertificateModalData: (cert: Certification | null) => void }) => {
  const isPdf = certification.filePath.endsWith('.pdf');
  
  return (
    <motion.div
      key={certification.id} // This key ensures the component re-mounts on change
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setCertificateModalData(null)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#141414] w-full max-w-4xl h-5/6 rounded-2xl shadow-2xl overflow-hidden border border-gray-700 flex flex-col"
      >
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h3 className="font-bold text-white">{certification.title}</h3>
          <button onClick={() => setCertificateModalData(null)} className="text-gray-400 hover:text-white">&times;</button>
        </div>
        <div className="flex-grow bg-gray-900/50">
          {isPdf ? (
            <iframe src={certification.filePath} className="w-full h-full" title={certification.title}></iframe>
          ) : (
            <img src={certification.filePath} className="w-full h-full object-contain" alt={certification.title} />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};