import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Star, Award, Medal, CheckCircle2, TrendingUp, Users, Search } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function Achievements() {
  const [achievements, setAchievements] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    async function fetchAchievements() {
      try {
        const snapshot = await getDocs(collection(db, 'achievements'));
        setAchievements(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        setAchievements([
          { title: "NIRF Ranking - Top 10", studentName: "Zenith University", description: "Consistently ranked among the top 10 multidisciplinary universities in the country.", imageUrl: "https://images.unsplash.com/photo-1523240715639-997b53028ee1" },
          { title: "Google Solution Challenge Winner", studentName: "Alex Rivera", description: "Secured Global 1st place for EcoSense AI project.", imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846" },
          { title: "NASA Space Apps Finalist", studentName: "Team Galaxy", description: "Shortlisted for top global innovators in Earth Observation.", imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa" }
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchAchievements();
  }, []);

  const filteredAchievements = achievements.filter(item => 
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.studentName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <Trophy className="mx-auto text-amber-500 mb-6" size={48} />
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight uppercase">Hall of <span className="text-blue-600">Excellence</span></h1>
          <p className="text-slate-600 dark:text-slate-400">Celebrating the milestones and triumphs of the Zenith family across the globe.</p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search achievements or students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all"
            />
          </div>
        </div>

        {/* Stats Grid */}
        {!searchQuery && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
            {[
              { label: 'Academic Awards', val: '450+', icon: Award },
              { label: 'Global Patents', val: '72', icon: Star },
              { label: 'Research Grants', val: '$1.2M', icon: TrendingUp },
              { label: 'Top Recruitments', val: '98%', icon: Users }
            ].map((stat, i) => (
              <div key={i} className="text-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <stat.icon className="mx-auto text-blue-600 mb-4" size={24} />
                <p className="text-3xl font-bold text-slate-950 dark:text-white leading-tight">{stat.val}</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Achievement Feed */}
        <div className="space-y-12">
          {filteredAchievements.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
              <Search className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-slate-500 font-bold">No achievements found matching your search.</p>
            </div>
          ) : (
            filteredAchievements.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
              >
                <div className="w-full md:w-1/2 aspect-video rounded-3xl overflow-hidden bg-slate-200 shadow-xl">
                  <img src={`${item.imageUrl}?auto=format&fit=crop&q=80&w=1200`} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="w-full md:w-1/2 space-y-6">
                  <div className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest">
                    Featured Achievement
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold font-serif italic">{item.title}</h2>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
                      {item.studentName?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{item.studentName}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">Zenith University</p>
                    </div>
                  </div>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed italic">
                    "{item.description}"
                  </p>
                  <div className="flex items-center text-blue-600 font-bold space-x-2 cursor-pointer hover:translate-x-2 transition-transform">
                    <span>Read full story</span>
                    <CheckCircle2 size={18} />
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
