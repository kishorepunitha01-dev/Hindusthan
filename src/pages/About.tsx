import React from 'react';
import { motion } from 'motion/react';
import { Target, Eye, Heart, Award, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-32 pb-20 space-y-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Shaping the <span className="text-blue-600">Global Leaders</span> of Tomorrow
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Established in 1954, Zenith University has grown from a humble technical institute to one of the world's leading research universities. Our mission is to produce graduates who are not just experts in their fields, but compassionate humans who strive for a better world.
            </p>
            <div className="flex items-center space-x-6 text-sm font-bold uppercase tracking-widest text-slate-400">
              <div className="flex items-center">
                <Award className="text-blue-600 mr-2" size={18} />
                Accredited A++
              </div>
              <div className="flex items-center">
                < Award className="text-blue-600 mr-2" size={18} />
                Global Ranking #12
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=2670" 
                alt="Main Campus"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700">
              <p className="text-3xl font-bold text-blue-600">70+</p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">Years of History</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-slate-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Target, title: 'Our Mission', text: 'To provide world-class education that empowers students to lead and innovate in a constantly changing global landscape.' },
              { icon: Eye, title: 'Our Vision', text: 'To be the hallmark of academic excellence, recognized globally for transformative research and holistic student development.' },
              { icon: Heart, title: 'Our Values', text: 'Integrity, Diversity, Sustainability, and Continuous Innovation form the core of everything we do at Zenith.' }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <item.icon className="text-blue-400 mb-6" size={40} />
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Our Journey</h2>
          <p className="text-slate-600 dark:text-slate-400">Following the path of growth and excellence.</p>
        </div>
        <div className="max-w-4xl mx-auto space-y-12">
          {[
            { year: '1954', title: 'The Beginning', desc: 'Zenith Tech Institute was founded with 120 students and 5 faculty members.' },
            { year: '1982', title: 'University Status', desc: 'Granted Full University status by the National Accreditation Board.' },
            { year: '2005', title: 'Global Expansion', desc: 'Opened our first international research facility in Singapore.' },
            { year: '2024', title: 'The Digital Revolution', desc: 'Implemented fully-integrated SMART campus and AI-driven curriculum.' }
          ].map((milestone, i) => (
            <div key={i} className="flex gap-8 group">
              <div className="w-24 shrink-0 text-right">
                <span className="text-2xl font-bold text-blue-600 border-r-2 border-blue-600/30 pr-6 block group-hover:border-blue-600 transition-colors">
                  {milestone.year}
                </span>
              </div>
              <div className="pb-12">
                <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{milestone.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-slate-100 dark:bg-slate-900/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">University Leadership</h2>
            <p className="text-slate-600 dark:text-slate-400">GuidingZenith towards the future.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-slate-200">
                  <img src={`https://i.pravatar.cc/300?u=${i + 10}`} alt="Leader" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h4 className="font-bold text-lg">Dr. Jordan Vance</h4>
                <p className="text-sm text-slate-500">Vice Chancellor</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
