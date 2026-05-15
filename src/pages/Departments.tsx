import React from 'react';
import { motion } from 'motion/react';
import { Landmark, Code, Heart, FlaskConical, Scale, BookOpen, Music, Users, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const depts = [
  {
    name: "School of Engineering",
    icon: Code,
    color: "bg-blue-600",
    desc: "Innovative computing, sustainable energy, and cutting-edge robotics.",
    programs: ["Computer Science", "Artificial Intelligence", "Robotics", "Software Engineering"]
  },
  {
    name: "School of Business",
    icon: Users,
    color: "bg-emerald-600",
    desc: "Global economics, data-driven management, and entrepreneurship.",
    programs: ["MBA", "Financial Analysis", "Digital Marketing", "International Trade"]
  },
  {
    name: "School of Health Sciences",
    icon: Heart,
    color: "bg-rose-600",
    desc: "Revolutionary biopharma, clinical research, and mental health studies.",
    programs: ["Molecular Biology", "Clinical Nursing", "Pharmacy", "Genomics"]
  },
  {
    name: "School of Natural Sciences",
    icon: FlaskConical,
    color: "bg-amber-600",
    desc: "Climate physics, deep-space chemistry, and theoretical math.",
    programs: ["Astrophysics", "Quantum Chem", "Climate Models", "Pure Math"]
  },
  {
    name: "School of Law",
    icon: Scale,
    color: "bg-slate-700",
    desc: "Cyber litigation, international human rights, and corporate law.",
    programs: ["LLB", "Corporate Law", "Criminal Justice", "Policy Design"]
  },
  {
    name: "Arts & Humanities",
    icon: Music,
    color: "bg-purple-600",
    desc: "Digital media, modern history, and global linguistics.",
    programs: ["Creative Arts", "Modern History", "Digital Philology", "Global Studies"]
  }
];

export default function Departments() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 text-blue-600 font-bold tracking-widest text-xs uppercase">
              <Star size={16} />
              <span>Ranked Top 5 Globally</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Our <span className="text-blue-600">Academic</span> Schools</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              At Zenith, our academic structure is designed to promote interdisciplinary learning. Each school is equipped with state-of-the-art facilities and led by world-class faculty.
            </p>
            <div className="flex space-x-4">
              <div className="text-center p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                <p className="text-3xl font-bold">12</p>
                <p className="text-xs uppercase text-slate-500 font-bold mt-1">Research Centers</p>
              </div>
              <div className="text-center p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                <p className="text-3xl font-bold">850+</p>
                <p className="text-xs uppercase text-slate-500 font-bold mt-1">Faculty Members</p>
              </div>
            </div>
          </div>
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200" alt="Auditorium" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {depts.map((dept, i) => (
            <motion.div
              key={dept.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all group"
            >
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8", dept.color)}>
                <dept.icon size={30} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{dept.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                {dept.desc}
              </p>
              <div className="space-y-3 mb-8">
                {dept.programs.map(p => (
                  <div key={p} className="flex items-center text-xs font-semibold text-slate-500">
                    <div className="w-1 h-1 rounded-full bg-blue-500 mr-2" />
                    {p}
                  </div>
                ))}
              </div>
              <Link to={`/departments/${dept.name.toLowerCase().replace(/\s+/g, '-')}`} className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700">
                View Curriculum <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
