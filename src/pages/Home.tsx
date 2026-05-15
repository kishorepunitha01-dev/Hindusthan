import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, GraduationCap, Users, Calendar, Trophy, Image as ImageIcon, BookOpen, Send, CheckCircle2, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Home() {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=2670" 
            alt="University Campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl space-y-8"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-blue-400 text-xs font-semibold tracking-wider uppercase">Admissions Open 2026-27</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              Empowering Minds, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Inspiring Futures.
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
              Join a world-class academic community at Zenith University. We nurture innovation, leadership, and excellence across disciplines.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/about" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold flex items-center group transition-all hover:bg-blue-700 shadow-xl shadow-blue-600/30">
                Explore Zenith
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-bold backdrop-blur-md hover:bg-white/20 transition-all">
                Contact Admissions
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/10 max-w-2xl">
              <div>
                <p className="text-3xl font-bold text-white">45k+</p>
                <p className="text-slate-400 text-sm mt-1">Alumni Worldwide</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">120+</p>
                <p className="text-slate-400 text-sm mt-1">Global Programs</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">#12</p>
                <p className="text-slate-400 text-sm mt-1">National Ranking</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Welcome & Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
              A Legacy of Excellence in <span className="text-blue-600 underline underline-offset-8 decoration-blue-600/30">Innovation & Research</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Founded on the principles of holistic education, Zenith University has consistently pushed the boundaries of academic achievement. Our campus is a vibrant tapestry of cultures, ideas, and groundbreaking research.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Modern SMART Classrooms",
                "Advanced Research Labs",
                "Digital Library with 2M+ Resources",
                "Sports & Recreation Center",
                "Innovation & Startup Incubation",
                "Global Faculty Exchange"
              ].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <CheckCircle2 size={18} className="text-blue-500" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1523050335392-9ae86eb17449?auto=format&fit=crop&q=80&w=2670" 
                alt="Students studying"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-blue-600 p-8 rounded-2xl shadow-2xl text-white hidden sm:block">
              <p className="text-4xl font-bold lowercase tracking-tighter">70+</p>
              <p className="text-sm font-medium opacity-80 uppercase tracking-widest mt-1">Research Patents</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links / Departments Cards */}
      <section className="bg-slate-100 dark:bg-slate-900/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Our Academic Departments</h2>
            <p className="text-slate-600 dark:text-slate-400">Discover your passion across our diverse and globally recognized departments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Engineering & Tech', icon: GraduationCap, color: 'bg-blue-500' },
              { title: 'Business School', icon: Users, color: 'bg-emerald-500' },
              { title: 'Medical Sciences', icon: BookOpen, color: 'bg-rose-500' },
              { title: 'Arts & Humanities', icon: Trophy, color: 'bg-amber-500' }
            ].map((dept, i) => (
              <motion.div 
                key={dept.title}
                whileHover={{ y: -10 }}
                className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6", dept.color)}>
                  <dept.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{dept.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  Leading the frontier of knowledge in {dept.title.toLowerCase()} through hands-on learning.
                </p>
                <Link to="/departments" className="text-blue-600 text-sm font-bold flex items-center group">
                  Learn More <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events & Gallery Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="max-w-xl space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Life at Zenith</h2>
            <p className="text-slate-600 dark:text-slate-400">From annual fests to tech symposiums, there is never a dull moment on campus.</p>
          </div>
          <Link to="/gallery" className="px-6 py-3 border-2 border-slate-200 dark:border-slate-800 rounded-full font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center">
            View All Gallery <ImageIcon size={18} className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 aspect-video bg-slate-200 rounded-3xl overflow-hidden relative group">
            <img 
              src="https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=2670" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              alt="Main Event"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Upcoming Event</p>
              <h3 className="text-3xl font-bold">Horizon Tech Fest '26</h3>
              <p className="opacity-80 mt-2">March 24-26, 2026 • Main Campus Auditorium</p>
            </div>
          </div>
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="aspect-square bg-slate-200 rounded-3xl overflow-hidden relative group">
                <img 
                  src={`https://images.unsplash.com/photo-${i === 1 ? '1492684223066-81342ee5ff30' : '1501281668745-f7f57925c3b4'}?auto=format&fit=crop&q=80&w=2670`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  alt="Campus Life"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events List */}
      <section className="bg-blue-600 py-24 text-white overflow-hidden relative">
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none">
          <Landmark size={400} className="-mr-40" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold font-serif italic uppercase tracking-tighter">Upcoming Notices</h2>
            <Link to="/notices" className="text-white/80 hover:text-white flex items-center group font-medium">
              See All <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              "Semester Examination Schedule - Spring 2026",
              "International Conference on AI & Ethics (ICAE '26)",
              "Alumni Meet 2026 Registration Open",
              "New Research Grant Opportunity for Doctoral Students"
            ].map((notice, i) => (
              <div key={i} className="bg-blue-700/50 backdrop-blur-xl p-8 rounded-3xl border border-blue-400/20 hover:border-blue-400/50 transition-all cursor-pointer group">
                <p className="text-xs font-bold text-blue-200 mb-2">FEB {20 + i}, 2026</p>
                <h3 className="text-xl font-bold group-hover:text-blue-200 transition-colors">{notice}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-12">
        <div className="max-w-3xl mx-auto space-y-12">
          <GraduationCap className="mx-auto text-blue-600 mb-8" size={60} />
          <h2 className="text-3xl md:text-5xl font-bold italic font-serif">"Zenith didn't just give me a degree; it gave me the lens to view the world differently."</h2>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-slate-300 mb-4 overflow-hidden">
               <img src="https://i.pravatar.cc/150?u=1" alt="Student" />
            </div>
            <p className="font-bold text-lg">Dr. Elena Rodriguez</p>
            <p className="text-slate-500 text-sm">Class of 2012, Senior AI Architect, Google</p>
          </div>
        </div>
      </section>
    </div>
  );
}
