/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Search, 
  ShoppingCart, 
  ShieldCheck, 
  ArrowRight, 
  Filter, 
  ChevronDown, 
  Cpu, 
  Layers, 
  Plus, 
  Headset, 
  Globe, 
  Mail, 
  Share2, 
  Code2, 
  Router, 
  Laptop, 
  Grid, 
  CloudCheck, 
  Network, 
  CheckCircle2, 
  Star, 
  Briefcase,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

type Page = 'home' | 'services' | 'laptops' | 'microsoft';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
  badgeColor?: string;
  specs: {
    ram: string;
    cpu: string;
  };
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// --- Data ---

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Surface Laptop 5",
    description: "Microsoft Certified Professional Edition",
    price: "$1,299.99",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgSZCY7rrQ53sYrhEw9DGfu5CY9mtAL6ex8oHvJY4bsS8_zW3DqbalPcrGByHmx79xeevJeMcMxof3XR-k0mhIXAAEeoPGGA2tpEX5YJI6xnewtKvPr-yz30FZaF0be9GldxH_NkVetsh5lvyEcXhGe-nkWIg7dPi_ZHaUCVu2UfgLHFPyocZHZsoZMHukrIwVNX8gCbMfUAc28OaTMiBnzppTXkwzq_Sga0oDPxxPOqxb3SuRw_-Ef5TDZF-AHXC5DTWcYsTDqLk",
    badge: "Top Rated",
    badgeColor: "bg-slate-900/80",
    specs: { ram: "16GB RAM", cpu: "Intel i7 12th" }
  },
  {
    id: 2,
    name: "Dell XPS 15",
    description: "Infinite Display Workstation",
    price: "$2,100.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMvAOqNw4iVe1rJtuZ2tqGtUiyuaTwJDKM1ftpsjJMSbKu84M7pLWuAs8-J6TqzRI3mNa9QNM6O81DKidxqf-k4USmqxEEa2QmnPtSrxgXY9_VimmKuHxTRYSb2nbYV2bJj_7ywt7pkCRT0iG-yYhd-6P5-YZLE1dG660m3ZC43b-JCjpNwWwrz-5jtQlZ0kkP5bOeWeRwMFGvi8MZrQuaJcep9GO8aRshK9NDFi_B2M706fA61Vo9wVuwrrqKjrU7HYKtgmCLMCs",
    badge: "Performance King",
    badgeColor: "bg-primary",
    specs: { ram: "32GB DDR5", cpu: "Intel i9-13k" }
  },
  {
    id: 3,
    name: "HP Spectre x360",
    description: "2-in-1 Executive Convertible",
    price: "$1,450.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARB2QizQKMqOK6FIws-IA7dxsKsQkW4R4iNPrd5ClAH0_i7-d10OkQzLqYyKnYAD_lwqSvOMhRmZmlQmpf8pHCWiJzeJwuY-6yh_aa2Tb5PxvfwBy1IeZy4xSLHQGzO5D9qgGYdqcDbeltw079UYSVzk_vc2VykBaMefAe_D1kNKhSuJYWxbmj7TgSWuy1bzuQB3nkzifZyEILxvUtnphztESclOVBpJz3uFTjbOB3Rh4uz4FzsxLLsxD7InMUFeMlKrAcy9EwAJk",
    specs: { ram: "16GB RAM", cpu: "Intel i7-12U" }
  },
  {
    id: 4,
    name: "ThinkPad X1 Carbon",
    description: "Ultralight Business Standard",
    price: "$1,700.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtiqgmVT8EiUbR853mSIU2RyafoXm4351YUOwSW0WwhL5xQM8aMqTGVytlFZ4cWpjz4JYsZtcqCwu8F8eCjoETiaLdZ5Bng9_H2jv1f8y1Q1IJeDgq1OILQ_CyPh7GodWqBbtdJPEc_anfOcdOq9WIR92depcRG_XmjXrySgUOaLB9ZerAucVKf4iEgDQY1oGUtzbpZKRsQAd5LVaFP3R2s_Q6ZyEeJf3d6ViKLzGPIvWas_NOewEwmWcLmzvD9S_BzpF1lE5BYXY",
    badge: "In Stock",
    badgeColor: "bg-emerald-500",
    specs: { ram: "16GB RAM", cpu: "Intel i7-Gen11" }
  }
];

const SERVICES: Service[] = [
  {
    id: 1,
    title: "Web Development",
    description: "Building responsive, high-performance websites and custom web applications tailored to your specific business logic.",
    icon: <Code2 className="size-8" />
  },
  {
    id: 2,
    title: "Network Installation",
    description: "Enterprise-grade secure home and office network configurations. Reliable Wi-Fi mesh and wired infrastructure.",
    icon: <Router className="size-8" />
  },
  {
    id: 3,
    title: "Laptop Sales",
    description: "Premium hardware procurement featuring the latest professional laptops. Warranty-backed sales with tech support.",
    icon: <Laptop className="size-8" />
  },
  {
    id: 4,
    title: "Microsoft Solutions",
    description: "Authorized partner services for Azure, Office 365, and enterprise productivity software deployment and management.",
    icon: <Grid className="size-8" />
  }
];

// --- Components ---

const Navbar = ({ currentPage, setPage }: { currentPage: Page, setPage: (p: Page) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string, id: Page }[] = [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'Laptops', id: 'laptops' },
    { label: 'Microsoft Partner', id: 'microsoft' },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
      isScrolled 
        ? 'bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-slate-200 dark:border-slate-800 py-3' 
        : 'bg-background-light dark:bg-background-dark border-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-10 flex items-center justify-between gap-8">
        <div className="flex items-center gap-10">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setPage('home')}
          >
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <Terminal className="size-6" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              TechPro <span className="text-primary">Services</span>
            </h2>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`text-sm font-semibold transition-all relative py-1 ${
                  currentPage === item.id 
                    ? 'text-primary' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-primary'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4 lg:gap-6">
          <div className="hidden sm:flex relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search solutions..." 
              className="w-48 lg:w-64 bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
          
          <button className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
            <ShoppingCart className="size-6" />
            <span className="absolute top-0 right-0 size-4 bg-primary text-[10px] flex items-center justify-center text-white rounded-full font-bold">3</span>
          </button>

          <button className="hidden md:flex items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
            Get a Quote
          </button>

          <button 
            className="lg:hidden p-2 text-slate-600 dark:text-slate-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setPage(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left text-lg font-bold py-2 ${
                    currentPage === item.id ? 'text-primary' : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button className="w-full mt-4 bg-primary text-white py-3 rounded-xl font-bold">
                Get a Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = () => (
  <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-16 px-4 lg:px-20">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-8 rounded bg-primary text-white">
              <Terminal className="size-5" />
            </div>
            <span className="font-bold text-xl dark:text-white">TechPro Services</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Comprehensive technology solutions for modern enterprises. Your official Microsoft partner for digital transformation.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 dark:text-white">Services</h4>
          <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
            <li><a href="#" className="hover:text-primary transition-colors">Web Development</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Network Infrastructure</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Microsoft Cloud</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Managed IT Support</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 dark:text-white">Company</h4>
          <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
            <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Our Portfolio</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Partner Status</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 dark:text-white">Connect</h4>
          <div className="flex gap-4 mb-6">
            <a href="#" className="size-10 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all">
              <Globe className="size-5" />
            </a>
            <a href="#" className="size-10 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all">
              <Mail className="size-5" />
            </a>
            <a href="#" className="size-10 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all">
              <Share2 className="size-5" />
            </a>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">info@techpro-services.com</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">+1 (555) 987-6543</p>
        </div>
      </div>
      
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© 2024 TechPro Professional Services. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Page Components ---

const HomePage = ({ setPage }: { setPage: (p: Page) => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-24"
  >
    {/* Hero */}
    <section className="relative overflow-hidden pt-10 pb-20">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-primary rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-primary rounded-full blur-[120px]"></div>
      </div>
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="size-4" />
            Certified Microsoft Solutions Partner
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white">
            Your All-in-One <br/>
            <span className="text-primary">Tech Solutions</span> Partner
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
            Professional Web Development, Networking, Enterprise Laptop Sales, and Certified Microsoft Partnership Services tailored for your business growth.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setPage('services')}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-xl shadow-primary/30 flex items-center gap-2"
            >
              Explore Services
              <ArrowRight className="size-5" />
            </button>
            <button className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-8 py-4 rounded-xl text-lg font-bold transition-all">
              Get a Quote
            </button>
          </div>
          <div className="flex items-center gap-8 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">500+</p>
              <p className="text-sm text-slate-500">Clients Served</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">15+</p>
              <p className="text-sm text-slate-500">Years Experience</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">24/7</p>
              <p className="text-sm text-slate-500">Expert Support</p>
            </div>
          </div>
        </div>
        
        <div className="relative group">
          <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-900">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCUFU1BwrEZzBafYuJ3kKvNJTg2r3eHyZPWEMdiBLotHtRZ_BTo43KziLJKd7DIYPt61Fmj9u-CR_IXjexOR-yptYli9mF1LaduINTMZ7e_Y8eSNrVKgYyLFTnUO8EHnAGwaNTEU488yfnsevP2x_XqyHDzhypvbUdI0Fqy_gmp1DOPVmSAguDEO_2oCLvcDsmDUQaIe1MHR-HvfPkwaUZrgfL0igEzHC9VWsw2E9Mbur6avld-1WZ4UNP-qnmI6l4dKLw4msPR4E" 
              alt="Modern Workspace"
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 max-w-[240px]">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-primary/20 p-2 rounded-lg text-primary">
                <Layers className="size-5" />
              </div>
              <span className="font-bold text-sm dark:text-white">Latest Tech</span>
            </div>
            <p className="text-xs text-slate-500 leading-normal">Optimizing your workflow with cutting-edge hardware and custom software solutions.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Expertise */}
    <section>
      <div className="flex flex-col gap-4 mb-16">
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Our Core Expertise
        </h2>
        <div className="h-1.5 w-20 bg-primary rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES.map((service) => (
          <div 
            key={service.id}
            className="group p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary dark:hover:border-primary transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 dark:text-white">{service.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  </motion.div>
);

const ServicesPage = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="space-y-16"
  >
    <div className="flex flex-col gap-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
        Our Expertise
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
        Services Overview
      </h1>
      <p className="text-slate-600 dark:text-slate-400 text-lg max-w-[700px] leading-relaxed">
        Tailored technology solutions designed to empower your digital infrastructure. From custom software to enterprise-grade networking and hardware.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {SERVICES.map((service) => (
        <div 
          key={service.id}
          className="group flex flex-col gap-6 p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300"
        >
          <div className="flex items-center justify-center size-14 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
            {service.icon}
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold dark:text-white">{service.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
          <div className="mt-auto">
            <a href="#" className="inline-flex items-center gap-2 text-primary text-sm font-bold group/link">
              Learn More 
              <ArrowRight className="size-4 group-hover/link:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      ))}
    </div>

    <div className="p-8 md:p-12 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex flex-col gap-2 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Ready to start your project?</h2>
        <p className="text-slate-600 dark:text-slate-400">Contact us today for a free consultation on any of our tech services.</p>
      </div>
      <div className="flex gap-4">
        <button className="px-8 py-3 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/30 hover:scale-105 transition-transform">
          Contact Us
        </button>
        <button className="px-8 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          View Portfolio
        </button>
      </div>
    </div>
  </motion.div>
);

const LaptopsPage = () => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-10"
  >
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="size-4" />
          Authorized Reseller
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight dark:text-white">Featured Laptops</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl text-lg">High-performance workstations and certified Microsoft hardware for digital professionals and enterprises.</p>
      </div>
      <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl font-bold transition-all dark:text-white">
        View All Inventory
        <ArrowRight className="size-5" />
      </button>
    </div>

    <div className="flex flex-wrap gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold text-sm">
        <Filter className="size-4" />
        All Laptops
      </button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-sm transition-colors dark:text-white">
        Microsoft Certified
        <ChevronDown className="size-4" />
      </button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-sm transition-colors dark:text-white">
        Workstations
        <ChevronDown className="size-4" />
      </button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-sm transition-colors dark:text-white">
        Price Range
        <ChevronDown className="size-4" />
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {PRODUCTS.map((product) => (
        <div 
          key={product.id}
          className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-slate-50 dark:bg-slate-800">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            {product.badge && (
              <div className={`absolute top-3 left-3 px-2 py-1 rounded ${product.badgeColor} text-white text-[10px] font-bold uppercase backdrop-blur-sm`}>
                {product.badge}
              </div>
            )}
          </div>
          <div className="p-5 flex flex-col flex-1">
            <div className="mb-4">
              <h3 className="text-lg font-bold group-hover:text-primary transition-colors dark:text-white">{product.name}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{product.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-6">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Cpu className="size-4 text-primary" />
                {product.specs.ram}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Layers className="size-4 text-primary" />
                {product.specs.cpu}
              </div>
            </div>
            <div className="mt-auto flex items-center justify-between gap-4">
              <span className="text-xl font-extrabold dark:text-white">{product.price}</span>
              <button className="flex items-center justify-center size-10 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
                <Plus className="size-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-20 p-8 rounded-2xl bg-gradient-to-br from-primary to-blue-700 text-white flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="space-y-4 max-w-2xl text-center md:text-left">
        <h2 className="text-3xl font-bold">Need Custom Fleet Solutions?</h2>
        <p className="text-white/80 text-lg">As a certified Microsoft Gold Partner, we offer specialized bulk pricing and enterprise-grade networking services for your entire team.</p>
        <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm text-sm">
            <Headset className="size-4" />
            24/7 Support
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm text-sm">
            <ShieldCheck className="size-4" />
            Extended Warranty
          </div>
        </div>
      </div>
      <button className="shrink-0 px-8 py-4 bg-white text-primary font-extrabold rounded-xl hover:bg-slate-100 transition-colors shadow-xl">
        Contact Sales Expert
      </button>
    </div>
  </motion.div>
);

const MicrosoftPage = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="space-y-24"
  >
    {/* Hero */}
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="flex flex-col gap-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20 w-fit">
          Official Microsoft Solutions Partner
        </div>
        <h1 className="text-slate-900 dark:text-white text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
          Empowering Your Business with <span className="text-primary">Cloud Innovation</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg lg:text-xl leading-relaxed max-w-xl">
          Unlock the full potential of your enterprise with certified Microsoft 365 setup, Azure cloud migrations, and genuine software licensing. Secure, scalable, and official.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-lg h-14 px-8 bg-primary text-white text-base font-bold hover:shadow-lg hover:shadow-primary/20 transition-all">
            Start Your Migration
          </button>
          <button className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-lg h-14 px-8 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-base font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            View Services
          </button>
        </div>
      </div>
      <div className="relative group">
        <div className="absolute -inset-4 bg-primary/20 rounded-xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl bg-slate-800">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAK9g8qUzLjO7TSDXaaGVc0nUjG_tPP6pmHcgSAX9BDizV8dZ3il1Wx12GDxpcXLrw15dfn-6QUTYulyh3XFSCAdVqKflUJYBjJ8jj8zqpG3qBRY8FoYCRhq18KHv6uPhiGFkdl_JibZO78z9Bu-aiAGIxNp0DmNQunD0BAk_LHYHuLhuQpCgKt6f6XaY297GsKb5-xLOd7Qx5rsTw8MFfeSMNxRrOKWMRzHbHFIk2S18KemKEmnRdPCkcb4rRZSj3UEGSI81WOlHI" 
            alt="Cloud Innovation"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col items-center gap-2">
          <div className="w-32 h-auto flex items-center justify-center">
            <div className="grid grid-cols-2 gap-1 w-10 h-10">
              <div className="bg-[#F25022]"></div>
              <div className="bg-[#7FBA00]"></div>
              <div className="bg-[#00A4EF]"></div>
              <div className="bg-[#FFB900]"></div>
            </div>
          </div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Solutions Partner</span>
        </div>
      </div>
    </section>

    {/* Benefits */}
    <section className="bg-slate-50 dark:bg-slate-900/50 -mx-4 lg:-mx-10 px-4 lg:px-10 py-24 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-slate-900 dark:text-white text-3xl lg:text-4xl font-bold mb-4">Certified Microsoft Solutions</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">As an authorized partner, we provide direct access to Microsoft's powerful ecosystem with expert implementation.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary transition-colors group">
            <div className="w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
              <CloudCheck className="size-8" />
            </div>
            <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-3">Office 365 Deployment</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Modernize your workplace with professional O365 setup, security policies, and seamless data migration for teams of any size.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary transition-colors group">
            <div className="w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
              <Network className="size-8" />
            </div>
            <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-3">Azure Cloud Services</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Leverage the power of Azure for scalable computing, secure hosting, and modern application infrastructure tailored to your growth.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary transition-colors group">
            <div className="w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
              <ShieldCheck className="size-8" />
            </div>
            <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-3">Official Licensing</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Stay compliant with genuine licenses for Windows Server, SQL Server, and Microsoft 365 at competitive corporate rates.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Testimonial */}
    <section className="bg-primary rounded-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M0 100 L100 0 L100 100 Z" fill="white"></path>
        </svg>
      </div>
      <div className="relative px-8 py-12 lg:p-16 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1">
          <div className="flex gap-1 text-yellow-400 mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} className="size-5 fill-current" />)}
          </div>
          <blockquote className="text-white text-2xl lg:text-3xl font-medium italic leading-snug mb-8">
            "TechPro Services streamlined our entire transition to Azure. Their status as a Microsoft Partner gave us the confidence we needed for our critical infrastructure."
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-full border-2 border-white/20 overflow-hidden">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlmDNiKz7TNyiWsyNr_kQlv2eXAh_WqHasN0ECw6Z1EvAF6n2BJRiaW5sFYsT5rZREX-Ksj9JMjJoGt0GrGU9kW-afzFRyfUdNM4a5Q_SLOWtRcJ0QzguR2G83vnIHmnHwsog9vJkePDCZwSie6kQb2_av68T8Mor308bu0MnC54wGu9iVMN7swW6EpxgbxbVXHl4F0fZpXJ8ta29nvM3y2jeDhVBwbPq3uj4N9BPLdqdwgTDJyiiI2SdF8U5Y94XGrKbvoywLKfE" 
                alt="David Chen"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <p className="text-white font-bold">David Chen</p>
              <p className="text-white/70 text-sm">CTO, Global Logistics Group</p>
            </div>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 text-center flex flex-col items-center gap-4 min-w-[300px]">
          <p className="text-white text-sm font-bold uppercase tracking-widest">Certified Expertise</p>
          <div className="text-white text-5xl font-black">500+</div>
          <p className="text-white/80 text-base">Cloud Migrations Completed Successfully</p>
          <hr className="w-full border-white/10 my-2"/>
          <button className="text-white font-bold underline underline-offset-4 hover:text-white/80 transition-colors">Case Studies</button>
        </div>
      </div>
    </section>

    {/* FAQ Detail */}
    <section className="max-w-4xl mx-auto text-center pb-10">
      <h3 className="text-slate-900 dark:text-white text-2xl font-bold mb-8">Why trust a Microsoft Solutions Partner?</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-left">
        <div className="flex gap-4">
          <CheckCircle2 className="size-6 text-primary shrink-0" />
          <p className="text-slate-600 dark:text-slate-400"><span className="font-bold text-slate-900 dark:text-white">Priority Support:</span> Access to direct Microsoft engineer escalations for complex issues.</p>
        </div>
        <div className="flex gap-4">
          <CheckCircle2 className="size-6 text-primary shrink-0" />
          <p className="text-slate-600 dark:text-slate-400"><span className="font-bold text-slate-900 dark:text-white">Validated Skills:</span> Our team passes rigorous annual exams to maintain partner status.</p>
        </div>
        <div className="flex gap-4">
          <CheckCircle2 className="size-6 text-primary shrink-0" />
          <p className="text-slate-600 dark:text-slate-400"><span className="font-bold text-slate-900 dark:text-white">Security First:</span> Implementation follows Microsoft's best-practice security frameworks.</p>
        </div>
        <div className="flex gap-4">
          <CheckCircle2 className="size-6 text-primary shrink-0" />
          <p className="text-slate-600 dark:text-slate-400"><span className="font-bold text-slate-900 dark:text-white">Early Access:</span> We pilot new features and technologies before public release.</p>
        </div>
      </div>
    </section>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [page, setPage] = useState<Page>('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar currentPage={page} setPage={setPage} />
      
      <main className="max-w-7xl mx-auto px-4 lg:px-10 py-10">
        <AnimatePresence mode="wait">
          {page === 'home' && <HomePage setPage={setPage} />}
          {page === 'services' && <ServicesPage />}
          {page === 'laptops' && <LaptopsPage />}
          {page === 'microsoft' && <MicrosoftPage />}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
