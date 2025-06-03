'use client';

import { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  ExternalLink,
  Code,
  Palette,
  Wrench,
  Star,
  Zap,
  Sparkles,
  Link,
} from "lucide-react";
import Image from "next/image";
// Tech Icons from react-icons
import {
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiGit,
  SiMysql,
  SiHtml5,
  SiReact,
  SiNextdotjs,
  SiVercel,
  SiGithub,
  SiSupabase,
  SiPython,
  SiFigma,
  SiAmazon,
  SiFirebase,
  SiGooglecloud,
  SiApple,
  SiGoogleplay,
  SiDocker,
  SiTailwindcss,
  SiFramer,
  SiStyledcomponents,
  SiMongodb,
  SiPostgresql,
  SiSocketdotio,
  SiStorybook,
  SiEslint,
  SiPrettier,
  SiR,
  SiTiktok,
} from "react-icons/si";
import { FaRobot, FaServer, FaMobile, FaCode, FaLaptopCode, FaCloud } from "react-icons/fa";

// Enhanced projects data with James Schofield's actual projects
const projects = [
  {
    title: "FrenchCreek Canoe Website",
    description: "A business website for French Creek Canoe services, showcasing outdoor adventure offerings with modern web design and user-friendly navigation for booking and information.",
    category: "Business Website",
    status: "Live",
    gradient: "from-green-600 to-blue-600",
    image: "/images/projects/frenchcreek-canoe.png",
    technologies: ["Next.js", "React", "CSS", "Business Website"],
    liveLink: "https://www.frenchcreekcanoe.com/site",
    githubLink: "https://github.com/Jt-schofield1/FrenchCreek-Canoe",
    featured: false,
  },
  {
    title: "Financial Pulse - Stock Market Dashboard",
    description: "A React-based market dashboard for real-time tracking of stocks and cryptocurrencies. Features AI market predictions using Claude AI, options trading insights, and comprehensive financial data visualization.",
    category: "FinTech",
    status: "Completed",
    gradient: "from-blue-600 to-purple-600",
    image: "/images/projects/financial-pulse.png",
    technologies: ["React", "JavaScript", "Claude AI", "Financial APIs", "Chart.js"],
    liveLink: undefined,
    githubLink: "https://github.com/Jt-schofield1/Stock-Market-Dashboard",
    featured: false,
  },
  {
    title: "SmartBooks - Invoice & Tax Assistant PWA",
    description: "A modern, offline-first Progressive Web App built with React + TypeScript for solo-entrepreneurs and small teams to manage invoices, track expenses, and prepare tax summaries with automated calculations.",
    category: "Business App",
    status: "Completed",
    gradient: "from-emerald-600 to-blue-600",
    image: "/images/projects/smartbook.png",
    technologies: ["React", "TypeScript", "PWA", "IndexedDB", "Vite", "Zustand"],
    liveLink: undefined,
    githubLink: "https://github.com/Jt-schofield1/Tax-Smartbook",
    featured: false,
  },
  {
    title: "Financial Advisor Web App",
    description: "A professional web application designed to showcase financial advisory services with appointment booking functionality using FormSpree API integration for seamless client communication.",
    category: "Business App",
    status: "Completed",
    gradient: "from-green-500 to-teal-600",
    image: "/images/projects/financial-advisor.png",
    technologies: ["TypeScript", "FormSpree API", "React", "Professional UI"],
    liveLink: undefined,
    githubLink: "https://github.com/Jt-schofield1/FinancialAdivsorWebApp",
    featured: false,
  },
  {
    title: "Daycare Chatbot",
    description: "An intelligent chatbot solution designed specifically for daycare centers to handle common inquiries, provide information to parents, and streamline communication processes.",
    category: "AI/Automation",
    status: "Completed",
    gradient: "from-purple-600 to-pink-600",
    image: "/images/projects/daycare-chatbot.png",
    technologies: ["Python", "Natural Language Processing", "Chatbot Framework"],
    liveLink: undefined,
    githubLink: "https://github.com/Jt-schofield1/daycare-chatbot",
    featured: false,
  },
  {
    title: "PeerSwipe - Professional Networking App",
    description: "A React Native mobile application revolutionizing professional networking with a refreshed approach to industry connections. Currently in active development with focus on meaningful professional relationships.",
    category: "Mobile App",
    status: "In Progress",
    gradient: "from-orange-500 to-red-500",
    image: "/images/projects/peerswipe.png",
    technologies: ["React Native", "Mobile Development", "Networking APIs", "Real-time Features"],
    liveLink: undefined,
    githubLink: undefined,
    featured: false,
  },
  {
    title: "Advanced Filter Project",
    description: "A JavaScript-based filtering system demonstrating advanced data manipulation and user interface interactions for dynamic content filtering and search functionality.",
    category: "Frontend",
    status: "Completed",
    gradient: "from-yellow-500 to-orange-600",
    image: "/images/projects/filter-project.png",
    technologies: ["JavaScript", "DOM Manipulation", "Filter Algorithms", "UI/UX"],
    liveLink: undefined,
    githubLink: "https://github.com/Jt-schofield1/Filter-Project",
    featured: false,
  },
  {
    title: "React To-Do List Application",
    description: "A dynamic task management application built with React. Features local storage integration, DOM manipulation, and intuitive task organization for productivity enhancement.",
    category: "Web App",
    status: "Completed",
    gradient: "from-indigo-600 to-blue-600",
    image: "/images/projects/react-todo.png",
    technologies: ["React", "CSS", "Local Storage", "Task Management"],
    liveLink: undefined,
    githubLink: "https://github.com/Jt-schofield1/React-To-do-List",
    featured: false,
  },
  {
    title: "Freelance Landing Page",
    description: "A responsive freelance portfolio landing page featuring animated titles that dynamically adapt for smaller screens. Built with modern web technologies and optimized for mobile experiences.",
    category: "Frontend",
    status: "Completed",
    gradient: "from-pink-500 to-rose-500",
    image: "/images/projects/freelance-landing.png",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    liveLink: undefined,
    githubLink: "https://github.com/Jt-schofield1/Freelance-Landing-Page",
    featured: false,
  },
];

// Enhanced skills data with proper categories and icons
const skillCategories = [
  {
    name: "Frontend Development",
    icon: <FaLaptopCode className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "JavaScript", icon: <SiJavascript className="w-8 h-8" />, level: 95, color: "#F7DF1E" },
      { name: "TypeScript", icon: <SiTypescript className="w-8 h-8" />, level: 90, color: "#3178C6" },
      { name: "React.js", icon: <SiReact className="w-8 h-8" />, level: 95, color: "#61DAFB" },
      { name: "Next.js", icon: <SiNextdotjs className="w-8 h-8" />, level: 90, color: "#0070F3" },
      { name: "HTML/CSS", icon: <SiHtml5 className="w-8 h-8" />, level: 95, color: "#E34F26" },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="w-8 h-8" />, level: 90, color: "#06B6D4" },
      { name: "Framer Motion", icon: <SiFramer className="w-8 h-8" />, level: 85, color: "#0055FF" },
      { name: "Styled Components", icon: <SiStyledcomponents className="w-8 h-8" />, level: 80, color: "#DB7093" },
    ]
  },
  {
    name: "Backend & Database",
    icon: <FaServer className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs className="w-8 h-8" />, level: 85, color: "#339933" },
      { name: "Python", icon: <SiPython className="w-8 h-8" />, level: 80, color: "#3776AB" },
      { name: "MySQL", icon: <SiMysql className="w-8 h-8" />, level: 85, color: "#4479A1" },
      { name: "MongoDB", icon: <SiMongodb className="w-8 h-8" />, level: 80, color: "#47A248" },
      { name: "PostgreSQL", icon: <SiPostgresql className="w-8 h-8" />, level: 75, color: "#336791" },
      { name: "Supabase", icon: <SiSupabase className="w-8 h-8" />, level: 85, color: "#3ECF8E" },
      { name: "Firebase", icon: <SiFirebase className="w-8 h-8" />, level: 85, color: "#FFCA28" },
    ]
  },
  {
    name: "Mobile & Cross-Platform",
    icon: <FaMobile className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "React Native", icon: <SiReact className="w-8 h-8" />, level: 85, color: "#61DAFB" },
      { name: "Mobile Design", icon: <FaMobile className="w-8 h-8" />, level: 90, color: "#FF6B6B" },
      { name: "Apple Developer", icon: <SiApple className="w-8 h-8" />, level: 75, color: "#A8DADC" },
      { name: "Google Play Console", icon: <SiGoogleplay className="w-8 h-8" />, level: 75, color: "#414141" },
    ]
  },
  {
    name: "Cloud & DevOps",
    icon: <FaCloud className="w-6 h-6" />,
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "AWS", icon: <SiAmazon className="w-8 h-8" />, level: 80, color: "#FF9900" },
      { name: "Google Cloud", icon: <SiGooglecloud className="w-8 h-8" />, level: 75, color: "#4285F4" },
      { name: "Firebase", icon: <SiFirebase className="w-8 h-8" />, level: 85, color: "#FFCA28" },
      { name: "Vercel", icon: <SiVercel className="w-8 h-8" />, level: 90, color: "#0070F3" },
      { name: "Docker", icon: <SiDocker className="w-8 h-8" />, level: 70, color: "#2496ED" },
      { name: "Git", icon: <SiGit className="w-8 h-8" />, level: 90, color: "#F05032" },
      { name: "GitHub", icon: <SiGithub className="w-8 h-8" />, level: 95, color: "#7C3AED" },
    ]
  },
  {
    name: "AI & Emerging Tech",
    icon: <FaRobot className="w-6 h-6" />,
    color: "from-indigo-500 to-purple-500",
    skills: [
      { name: "AI Integration", icon: <FaRobot className="w-8 h-8" />, level: 85, color: "#FF6B35" },
      { name: "MCP (Model Context Protocol)", icon: <FaCode className="w-8 h-8" />, level: 80, color: "#8B5CF6" },
      { name: "API Implementation", icon: <SiSocketdotio className="w-8 h-8" />, level: 90, color: "#10B981" },
      { name: "R Studio", icon: <SiR className="w-8 h-8" />, level: 70, color: "#276DC3" },
    ]
  },
  {
    name: "Design & Tools",
    icon: <Palette className="w-6 h-6" />,
    color: "from-pink-500 to-rose-500",
    skills: [
      { name: "Figma", icon: <SiFigma className="w-8 h-8" />, level: 90, color: "#F24E1E" },
      { name: "UI/UX Design", icon: <Palette className="w-8 h-8" />, level: 85, color: "#FF69B4" },
      { name: "Storybook", icon: <SiStorybook className="w-8 h-8" />, level: 80, color: "#FF4785" },
      { name: "Cursor", icon: <FaCode className="w-8 h-8" />, level: 90, color: "#00D4AA" },
      { name: "VS Code", icon: <FaCode className="w-8 h-8" />, level: 95, color: "#007ACC" },
      { name: "ESLint", icon: <SiEslint className="w-8 h-8" />, level: 85, color: "#4B32C3" },
      { name: "Prettier", icon: <SiPrettier className="w-8 h-8" />, level: 85, color: "#F7B93E" },
    ]
  },
];

// Services data
const services = [
  {
    icon: <Code className="w-8 h-8" />,
    title: "Full Stack Development",
    description: "Building complete web applications from frontend React interfaces to backend APIs, specializing in modern frameworks like Next.js and secure coding practices."
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "Cybersecurity & Secure Development",
    description: "Implementing security-first development practices with my military cryptologic background, ensuring applications are built with robust security from the ground up."
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "Data-Driven Solutions",
    description: "Creating dynamic dashboards and analytics tools that transform complex data into actionable insights, leveraging my data science foundation for real-time market analysis."
  },
];

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  // Get unique categories for filtering
  const categories = ['All', ...Array.from(new Set(projects.map(project => project.category)))];

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  // Handle smooth scrolling and active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'portfolio', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS configuration - you'll need to replace these with your actual IDs
      const serviceID = 'YOUR_SERVICE_ID';
      const templateID = 'YOUR_TEMPLATE_ID';
      const publicKey = 'YOUR_PUBLIC_KEY';

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'Jamesschofield@peerswipe.online'
      };

      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">JS</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button
                  onClick={() => scrollToSection('about')}
                  className={`px-3 py-2 text-sm font-medium transition-colors hover:text-gray-900 ${
                    activeSection === 'about' ? 'text-gray-900' : 'text-gray-600'
                  }`}
                >
                  About me
                </button>
                <button
                  onClick={() => scrollToSection('skills')}
                  className={`px-3 py-2 text-sm font-medium transition-colors hover:text-gray-900 ${
                    activeSection === 'skills' ? 'text-gray-900' : 'text-gray-600'
                  }`}
                >
                  Skills
                </button>
                <button
                  onClick={() => scrollToSection('portfolio')}
                  className={`px-3 py-2 text-sm font-medium transition-colors hover:text-gray-900 ${
                    activeSection === 'portfolio' ? 'text-gray-900' : 'text-gray-600'
                  }`}
                >
                  Portfolio
                </button>
                <Button
                  onClick={() => scrollToSection('contact')}
                  className="bg-black text-white hover:bg-gray-800 rounded-full"
                >
                  CONTACT ME
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button
                onClick={() => scrollToSection('about')}
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900"
              >
                About me
              </button>
              <button
                onClick={() => scrollToSection('skills')}
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900"
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900"
              >
                Portfolio
              </button>
              <Button
                onClick={() => scrollToSection('contact')}
                className="w-full mt-2 bg-black text-white hover:bg-gray-800 rounded-full"
              >
                CONTACT ME
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center">
        {/* Desktop Layout */}
        <div className="hidden md:block w-full h-screen relative">
          {/* Left side - Light gray background */}
          <div className="absolute inset-0 bg-gray-100 diagonal-split"></div>
          
          {/* Right side - Dark background */}
          <div className="absolute inset-0 bg-black diagonal-split-complement"></div>
          
          {/* Content */}
          <div className="relative z-10 h-full flex">
            {/* Left content */}
            <div className="w-1/2 flex flex-col justify-center px-12 lg:px-20">
              <div className="space-y-6">
                <p className="text-gray-600 text-lg hero-greeting">Hi, I am</p>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight hero-name">
                  JT Schofield
                </h1>
                <p className="text-xl text-gray-600 hero-title">
                  Full Stack Developer | Active DOD TS/SCI Clearance
                </p>
                
                {/* Social Links */}
                <div className="flex space-x-4 pt-8 hero-social">
                  <a href="mailto:Jamesschofield@peerswipe.online" className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                  <a href="https://github.com/Jt-schofield1" className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/james-schofield-49260b293" className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://www.tiktok.com/@jt_schofield?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors" title="TikTok">
                    <SiTiktok className="w-5 h-5" />
                  </a>
                  <a href="https://beacons.ai/jt_schofield" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors" title="Beacons Profile">
                    <Link className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Right content - Photo */}
            <div className="w-1/2 flex items-center justify-center px-12">
              <div className="relative hero-photo">
                <div className="w-[26rem] h-[32rem] overflow-hidden">
                  <Image 
                    src="/images/Headshot.png" 
                    alt="James Schofield Professional Headshot"
                    width={416}
                    height={512}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden w-full min-h-screen pt-16">
          <div className="px-6 py-12 text-center">
            <div className="space-y-6">
              <p className="text-gray-600 text-lg hero-greeting">Hi, I am</p>
              <h1 className="text-4xl font-bold text-gray-900 leading-tight hero-name">
                JT Schofield
              </h1>
              <p className="text-lg text-gray-600 hero-title">
                Full Stack Developer | Active DOD TS/SCI Clearance
              </p>
              
              {/* Mobile Photo */}
              <div className="w-96 h-[28rem] mx-auto flex items-center justify-center my-8 overflow-hidden hero-photo">
                <Image 
                  src="/images/Headshot.png" 
                  alt="James Schofield Professional Headshot"
                  width={384}
                  height={448}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Social Links */}
              <div className="flex justify-center space-x-4 hero-social">
                <a href="mailto:Jamesschofield@peerswipe.online" className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="https://github.com/Jt-schofield1" className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/james-schofield-49260b293" className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://www.tiktok.com/@jt_schofield?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors" title="TikTok">
                  <SiTiktok className="w-5 h-5" />
                </a>
                <a href="https://beacons.ai/jt_schofield" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors" title="Beacons Profile">
                  <Link className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <div className="w-20 h-1 bg-black mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                I&apos;m JT Schofield, an aspiring full stack web developer with a solid foundation in cybersecurity and data science. I graduated from Mercyhurst University with a Bachelor&apos;s degree in Cyber Security and a Minor in Data Science. Currently, I&apos;m expanding my skills through ERA Solutions&apos; full stack development courses, and I thrive on building polished web applications that merge user experience with secure coding practices.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                During my time as a Cryptologic Technician in the Navy, I developed a keen attention to detail, adaptability, and problem-solving mindset—traits I bring to every coding project. From crafting dynamic React dashboards for real-time market insights to designing custom chatbots, I&apos;m passionate about delivering clean, efficient solutions that prioritize both performance and security.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Right now, I&apos;m developing a social networking app focused on meaningful professional connections, reimagining how people in the industry collaborate and engage. I love translating big ideas into intuitive digital experiences, and I&apos;m excited to tackle the next challenge that comes my way!
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="/resume/James-Schofield-Aspiring Full Stack Developer Professional.pdf" 
                  download="James-Schofield-Aspiring Full Stack Developer Professional.pdf"
                  className="inline-flex items-center px-4 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors rounded-full font-medium"
                >
                  Download Resume
                </a>
                <Button onClick={() => scrollToSection('contact')} className="bg-black text-white hover:bg-gray-800 rounded-full">
                  Get In Touch
                </Button>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">What I Do</h3>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 text-black">
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{service.title}</h4>
                      <p className="text-gray-600 text-sm">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Enhanced */}
      <section id="skills" className="py-20 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Subtle gradient orbs only */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-gray-200/10 to-gray-300/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-black/3 to-gray-100/10 rounded-full filter blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-gray-300 mb-4">
              <Zap className="w-4 h-4 mr-2" />
              Technical Expertise
            </div>
            <h2 className="text-5xl font-bold text-white mb-6">Skills & Technologies</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A comprehensive toolkit spanning frontend, backend, mobile, cloud, and emerging technologies
            </p>
          </div>
          
          {/* Skills Categories */}
          <div className="space-y-16">
            {skillCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="group">
                {/* Category Header */}
                <div className="flex items-center justify-center mb-12">
                  <div className={`flex items-center px-8 py-4 bg-gradient-to-r ${category.color} rounded-full shadow-lg transform group-hover:scale-105 transition-all duration-300`}>
                    <div className="text-white mr-3">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {category.name}
                    </h3>
                    <Sparkles className="w-5 h-5 text-white ml-3 group-hover:animate-spin" />
                  </div>
                </div>
                
                {/* Skills Grid */}
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="group/skill relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 will-change-transform"
                      style={{ transform: 'translateZ(0)' }} // Force hardware acceleration
                    >
                      {/* Skill Icon */}
                      <div className="relative mb-4">
                        <div 
                          className="skill-icon w-16 h-16 mx-auto rounded-xl flex items-center justify-center transition-all duration-300 will-change-transform"
                          style={{ 
                            backgroundColor: `${skill.color}20`,
                            transform: 'translateZ(0)' 
                          }}
                        >
                          <div 
                            style={{ color: skill.color }}
                            className="transition-transform duration-300 group-hover/skill:scale-110 no-select"
                          >
                            {skill.icon}
                          </div>
                        </div>
                        
                        {/* Skill Level Badge */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg transition-transform duration-300 group-hover/skill:scale-110 no-select">
                          {skill.level >= 90 ? <Star className="w-4 h-4" /> : 
                           skill.level >= 80 ? '★' : 
                           skill.level >= 70 ? '◆' : '●'}
                        </div>
                      </div>
                      
                      {/* Skill Name */}
                      <h4 className="text-white font-semibold text-center mb-3 group-hover/skill:text-cyan-400 transition-colors duration-300 no-select">
                        {skill.name}
                      </h4>
                      
                      {/* Progress Bar */}
                      <div className="relative">
                        <div className="w-full bg-white/10 rounded-full h-2 mb-2 overflow-hidden">
                          <div 
                            className="h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ 
                              width: `${skill.level}%`,
                              background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`
                            }}
                          ></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-400">Proficiency</span>
                          <span className="text-sm font-bold text-white">{skill.level}%</span>
                        </div>
                      </div>
                      
                      {/* Hover Glow Effect - Positioned absolutely to avoid layout shifts */}
                      <div 
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover/skill:opacity-20 transition-opacity duration-300 pointer-events-none"
                        style={{ 
                          background: `radial-gradient(circle at center, ${skill.color}, transparent 70%)`,
                          zIndex: -1
                        }}
                      ></div>
                      
                      {/* Shine Effect - Positioned absolutely */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/skill:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      </div>
                      
                      {/* Subtle lift effect - using transform instead of translate to avoid layout shifts */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/skill:opacity-100 transition-all duration-300 pointer-events-none"
                           style={{
                             boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                             transform: 'translateY(-2px)',
                             zIndex: -2
                           }}>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Stats Section */}
          <div className="mt-20 grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">6+</div>
              <div className="text-gray-400">Skill Categories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">35+</div>
              <div className="text-gray-400">Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">1+</div>
              <div className="text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">∞</div>
              <div className="text-gray-400">Learning Mode</div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className="text-gray-300 text-lg mb-6">
              Ready to bring these skills to your next project?
            </p>
            <Button 
              onClick={() => scrollToSection('contact')} 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 px-8 py-3 text-lg font-semibold shadow-lg rounded-full"
            >
              <Zap className="w-5 h-5 mr-2" />
              Let&apos;s Build Something Amazing
            </Button>
          </div>
        </div>
      </section>

      {/* Portfolio Section - Enhanced */}
      <section id="portfolio" className="py-20 bg-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Subtle gradient orbs only */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-gray-200/10 to-gray-300/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-black/3 to-gray-100/10 rounded-full filter blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-black/5 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 mb-6 border border-gray-200/50">
              <Sparkles className="w-4 h-4 mr-2 text-black" />
              Portfolio Showcase
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">My Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gray-900 to-gray-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              A showcase of my recent work, featuring full-stack applications, modern web technologies, 
              and innovative solutions that solve real-world problems.
            </p>
          </div>

          {/* Enhanced Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  activeFilter === category
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category}
                <span className="ml-2 text-xs opacity-70">
                  ({category === 'All' ? projects.length : projects.filter(p => p.category === category).length})
                </span>
              </button>
            ))}
          </div>
          
          {/* Enhanced Projects Grid with Stagger Animation */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 border border-gray-100 project-card"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  background: `linear-gradient(135deg, ${
                    project.category === 'Business Website' ? '#f0fdf4, #ecfdf5' :
                    project.category === 'FinTech' ? '#eff6ff, #dbeafe' :
                    project.category === 'Business App' ? '#f0fdfa, #ccfbf1' :
                    project.category === 'AI/Automation' ? '#fdf4ff, #fae8ff' :
                    project.category === 'Mobile App' ? '#f3e8ff, #e9d5ff' :
                    project.category === 'Frontend' ? '#fdf2f8, #fce7f3' :
                    project.category === 'Web App' ? '#f1f5f9, #e2e8f0' :
                    '#ffffff, #f8fafc'
                  })`
                }}
              >
                {/* Enhanced Project Image/Gradient Background */}
                <div className={`relative h-72 overflow-hidden bg-gray-100 project-image-container ${
                  project.title === "PeerSwipe - Professional Networking App" 
                    ? "" 
                    : "flex items-center justify-center"
                }`}>
                  {/* Project Image */}
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    width={400}
                    height={288}
                    className={`w-full h-full transition-transform duration-300 group-hover:scale-105 ${
                      project.title === "PeerSwipe - Professional Networking App" 
                        ? "object-cover" 
                        : "object-contain"
                    }`}
                    priority={index < 3} // Load first 3 images with priority
                    onError={(e) => {
                      // Fallback to gradient background if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.className = `relative h-72 bg-gradient-to-br ${project.gradient} overflow-hidden flex items-center justify-center project-image-container`;
                      }
                    }}
                  />
                  
                  {/* Overlay for better text contrast on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Animated floating elements */}
                  <div className="absolute top-6 left-6 w-3 h-3 bg-white/30 rounded-full animate-ping"></div>
                  <div className="absolute top-8 right-8 w-2 h-2 bg-white/40 rounded-full animate-pulse delay-300"></div>
                  <div className="absolute bottom-12 left-8 w-4 h-4 bg-white/25 rounded-full animate-bounce delay-500"></div>
                  <div className="absolute bottom-8 right-12 w-2 h-2 bg-white/35 rounded-full animate-ping delay-700"></div>
                  
                  {/* Interactive Category Badge */}
                  <div className="absolute top-6 right-3 sm:right-6 px-2 sm:px-4 py-1 sm:py-2 bg-black/80 backdrop-blur-md rounded-full text-white text-xs sm:text-sm font-medium border border-white/40 group-hover:bg-black/90 transition-all duration-300 shadow-lg">
                    <span className="hidden sm:inline">{project.category}</span>
                    <span className="sm:hidden">
                      {project.category === 'Business Website' ? 'Business' :
                       project.category === 'FinTech' ? 'FinTech' :
                       project.category === 'Business App' ? 'App' :
                       project.category === 'AI/Automation' ? 'AI' :
                       project.category === 'Mobile App' ? 'Mobile' :
                       project.category === 'Frontend' ? 'Frontend' :
                       project.category === 'Web App' ? 'Web' :
                       project.category}
                    </span>
                  </div>
                  
                  {/* Enhanced Status Badge */}
                  <div className={`absolute top-6 left-3 sm:left-6 px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium backdrop-blur-md border transition-all duration-300 shadow-lg ${
                    project.status === 'Live' ? 'bg-green-600/90 text-white border-green-400/60 group-hover:bg-green-600' :
                    project.status === 'In Progress' ? 'bg-amber-500/90 text-white border-amber-400/60 group-hover:bg-amber-500' :
                    'bg-blue-600/90 text-white border-blue-400/60 group-hover:bg-blue-600'
                  }`}>
                    <span className="flex items-center">
                      <span className="mr-1">
                        {project.status === 'Live' && '🟢'} 
                        {project.status === 'In Progress' && '🟡'} 
                        {project.status === 'Completed' && '✅'} 
                      </span>
                      <span className="hidden sm:inline">{project.status}</span>
                      <span className="sm:hidden">
                        {project.status === 'In Progress' ? 'Progress' : project.status}
                      </span>
                    </span>
                  </div>
                  
                  {/* Enhanced Hover Overlay with Better Actions */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm z-10">
                    <div className="flex space-x-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      {project.liveLink && (
                        <button 
                          className="p-4 bg-white text-black rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 hover:rotate-3 shadow-lg cursor-pointer z-20"
                          title="View Project"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(project.liveLink, '_blank', 'noopener,noreferrer');
                          }}
                        >
                          <ExternalLink className="w-6 h-6" />
                        </button>
                      )}
                      {project.githubLink && (
                        <button
                          className="p-4 bg-white text-black rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 hover:-rotate-3 shadow-lg cursor-pointer z-20"
                          title="View Code"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(project.githubLink, '_blank', 'noopener,noreferrer');
                          }}
                        >
                          <Github className="w-6 h-6" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                </div>
                
                {/* Enhanced Project Content */}
                <div className="p-8">
                  <h3 className="font-bold text-2xl mb-4 text-gray-900 group-hover:text-black transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm group-hover:text-gray-700 transition-colors">
                    {project.description}
                  </p>
                  
                  {/* Enhanced Technology Stack */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center">
                      <Code className="w-4 h-4 mr-2" />
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex} 
                          className="px-3 py-2 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-xl text-xs font-medium border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-300 transform hover:scale-105"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Enhanced card glow effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-3xl shadow-2xl" style={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                  }}></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Enhanced Call to Action */}
          <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-8 bg-gradient-to-r from-gray-50 to-white rounded-3xl border border-gray-200 shadow-lg">
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to collaborate?</h3>
                <p className="text-gray-600 text-lg">
                  Let&apos;s bring your next project to life together.
                </p>
              </div>
              <Button 
                onClick={() => scrollToSection('contact')} 
                className="bg-black text-white hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl rounded-2xl"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start a Project
              </Button>
            </div>
          </div>
        </div>

        {/* Add CSS animations */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-black mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              I&apos;m always interested in new opportunities and exciting projects. 
              Let&apos;s discuss how we can work together to bring your ideas to life.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Let&apos;s Talk</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-black" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-600">Jamesschofield@peerswipe.online</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Linkedin className="w-6 h-6 text-black" />
                  <div>
                    <p className="font-semibold">LinkedIn</p>
                    <p className="text-gray-600">linkedin.com/in/james-schofield-49260b293</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Github className="w-6 h-6 text-black" />
                  <div>
                    <p className="font-semibold">GitHub</p>
                    <p className="text-gray-600">github.com/Jt-schofield1</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <SiTiktok className="w-6 h-6 text-black" />
                  <div>
                    <p className="font-semibold">TikTok</p>
                    <p className="text-gray-600">@jt_schofield</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="p-6">
              <CardContent className="p-0">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input 
                      placeholder="Your Name" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-black focus:ring-black"
                    />
                  </div>
                  <div>
                    <Input 
                      type="email" 
                      placeholder="Your Email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-black focus:ring-black"
                    />
                  </div>
                  <div>
                    <Input 
                      placeholder="Subject" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-black focus:ring-black"
                    />
                  </div>
                  <div>
                    <Textarea 
                      placeholder="Your Message" 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="border-gray-300 focus:border-black focus:ring-black"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                  
                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="text-green-600 text-center">
                      ✅ Message sent successfully! I&apos;ll get back to you soon.
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="text-red-600 text-center">
                      ❌ Failed to send message. Please try again or contact me directly.
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2024 JT Schofield. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <a href="mailto:Jamesschofield@peerswipe.online" className="text-gray-300 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://github.com/Jt-schofield1" className="text-gray-300 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/james-schofield-49260b293" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@jt_schofield?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors" title="TikTok">
                <SiTiktok className="w-5 h-5" />
              </a>
              <a href="https://beacons.ai/jt_schofield" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors" title="Beacons Profile">
                <Link className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
