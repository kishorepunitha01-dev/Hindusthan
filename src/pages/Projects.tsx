import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Search, Code, Cpu, FlaskConical, Rocket, Github, Download, ExternalLink, Lightbulb, ArrowRight } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import { cn } from '../lib/utils';

export default function Projects() {
  const [projects, setProjects] = React.useState<any[]>([]);
  const [filter, setFilter] = React.useState('all');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchProjects() {
      try {
        const snapshot = await getDocs(collection(db, 'projects'));
        setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        // Mock data
        setProjects([
          { 
            id: '1', 
            title: 'AI Pulse - Health Optimizer', 
            authors: 'Aravind S., Priya K.', 
            department: 'Computer Science', 
            description: 'A deep learning model that predicts potential cardiac anomalies using standard wearable data with 98% accuracy.',
            tags: ['AI', 'HealthTech', 'Python'],
            imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
            pdfUrl: '#'
          },
          { 
            id: '2', 
            title: 'SolarFlow - Efficient Grid', 
            authors: 'Liam Wilson', 
            department: 'Electrical Engineering', 
            description: 'Innovative solar panel orientation system that increases energy yield by 35% using low-cost sensors.',
            tags: ['Energy', 'Hardware', 'IoT'],
            imageUrl: 'https://images.unsplash.com/photo-1509391366360-fe514b1dea2c',
            pdfUrl: '#'
          },
          { 
            id: '3', 
            title: 'EcoConcrete - Sustainable Build', 
            authors: 'Sarah Chen, Mark T.', 
            department: 'Civil Engineering', 
            description: 'Developing high-strength concrete using 40% recycled ocean plastics as aggregate.',
            tags: ['Sustainability', 'Materials'],
            imageUrl: 'https://images.unsplash.com/photo-1518709766631-a2ec8930811e',
            pdfUrl: '#'
          },
          { 
            id: '4', 
            title: 'BioSenser 3.0', 
            authors: 'Zenith Bio Team', 
            department: 'Biotechnology', 
            description: 'Non-invasive glucose monitoring device for diabetic patients using saliva-based biosensors.',
            tags: ['BioTech', 'Innovation'],
            imageUrl: 'https://images.unsplash.com/photo-1532187875605-18848600507a',
            pdfUrl: '#'
          }
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const departments = ['all', 'Computer Science', 'Electrical Engineering', 'Civil Engineering', 'Biotechnology'];
  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.department === filter);

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
        <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full mb-4">
          <Rocket size={18} />
          <span className="text-xs font-bold uppercase tracking-widest">Innovation Hub</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Student <span className="text-blue-600">Innovation</span> Projects</h1>
        <p className="text-slate-600 dark:text-slate-400">Zenith University takes pride in fostering a culture of research and entrepreneurial spirit. Explore the groundbreaking work of our students.</p>
      </div>

      {/* Filter & Stats */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setFilter(dept)}
              className={cn(
                "px-5 py-2 rounded-xl text-xs font-bold transition-all",
                filter === dept 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
              )}
            >
              {dept}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-6 text-sm text-slate-500">
          <div className="flex flex-col items-center px-4 border-r border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-white">150+</span>
            <span className="text-[10px] uppercase">Active Projects</span>
          </div>
          <div className="flex flex-col items-center px-4">
            <span className="font-bold text-slate-900 dark:text-white">12</span>
            <span className="text-[10px] uppercase">Startup Hubs</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1,2,3,4].map(i => <div key={i} className="h-64 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-2xl transition-all"
              >
                <div className="md:w-2/5 relative overflow-hidden">
                  <img 
                    src={`${project.imageUrl}?auto=format&fit=crop&q=80&w=600`} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md p-2 rounded-lg">
                    <Lightbulb size={20} className="text-amber-500" />
                  </div>
                </div>
                <div className="md:w-3/5 p-8 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <Link 
                        to={`/departments/${project.department.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-1 hover:underline cursor-pointer"
                      >
                        {project.department}
                      </Link>
                      <h3 className="text-xl font-bold tracking-tight">{project.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-1 italic">
                    "{project.description}"
                  </p>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags?.map((tag: string) => (
                        <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-slate-400">Lead Researchers</span>
                        <span className="text-xs font-bold">{project.authors}</span>
                      </div>
                      <div className="flex space-x-2 items-center">
                        <button title="View Code" className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                          <Github size={18} className="text-slate-600 dark:text-slate-400" />
                        </button>
                        {project.pdfUrl && (
                          <a 
                            href={project.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl text-[10px] font-bold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all border border-blue-100 dark:border-blue-900/30 whitespace-nowrap"
                          >
                            <Download size={14} />
                            <span>Download Report</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Innovation CTA */}
      <section className="mt-24 bg-blue-600 rounded-3xl p-12 text-center text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Have a Startup Idea?</h2>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg leading-relaxed">
            The Zenith Innovation Lab provides funding, mentorship, and workspace for student-led startups. Transform your research into a reality.
          </p>
          <div className="pt-6">
            <button className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold flex items-center mx-auto hover:bg-blue-50 transition-all shadow-xl shadow-blue-900/40 active:scale-95">
              Pitch Your Idea <ArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
