import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Search, Filter, ArrowUpRight, Megaphone, Calendar, FileText } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { cn } from '../lib/utils';

export default function Notices() {
  const [notices, setNotices] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState('all');

  React.useEffect(() => {
    async function fetchNotices() {
      try {
        const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        setNotices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        setNotices([
          { id: '1', title: 'End Semester Exam Schedule', content: 'The examination schedule for Spring 2026 has been released. Exams begin from May 5th.', priority: 'high', createdAt: '2026-04-15' },
          { id: '2', title: 'Scholarship Application Open', content: 'Applications for the Global Excellence Scholarship are now open for second and third-year students.', priority: 'normal', createdAt: '2026-04-12' },
          { id: '3', title: 'Zenith Hackathon 2026', content: 'Register for the upcoming university-wide hackathon focusing on Sustainable Energy solutions.', priority: 'normal', createdAt: '2026-04-10' },
          { id: '4', title: 'Campus Wi-Fi Maintenance', content: 'Brief downtime expected for campus Wi-Fi between 2 AM and 4 AM on Sunday.', priority: 'low', createdAt: '2026-04-08' }
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchNotices();
  }, []);

  const filteredNotices = filter === 'all' ? notices : notices.filter(n => n.priority === filter);

  return (
    <div className="pt-32 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12 border-b border-slate-200 dark:border-slate-800 pb-12">
        <div className="space-y-4">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6">
            <Bell size={24} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Notices & <span className="text-blue-600">News</span></h1>
          <p className="text-slate-600 dark:text-slate-400">Regular updates regarding academics, events, and campus life.</p>
        </div>
        <div className="flex gap-2">
          {['all', 'high', 'normal', 'low'].map(p => (
            <button 
              key={p} 
              onClick={() => setFilter(p)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all border",
                filter === p ? "bg-slate-950 dark:bg-white text-white dark:text-slate-950 border-slate-950 dark:border-white" : "border-slate-200 dark:border-slate-800 hover:border-blue-500"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1,2,3,4].map(i => <div key={i} className="h-24 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl" />)}
        </div>
      ) : (
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredNotices.map((notice) => (
              <motion.div
                key={notice.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group flex gap-6 p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="hidden sm:flex flex-col items-center justify-start pt-1 shrink-0 w-16">
                  <span className="text-2xl font-bold text-slate-400 group-hover:text-blue-600 transition-colors uppercase italic font-serif">
                    {new Date(notice.createdAt).getDate()}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {new Date(notice.createdAt).toLocaleDateString(undefined, { month: 'short' })}
                  </span>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest",
                      notice.priority === 'high' ? "bg-rose-100 text-rose-600" : 
                      notice.priority === 'normal' ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-600"
                    )}>
                      {notice.priority}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center">
                      <Calendar size={12} className="mr-1" />
                      {new Date(notice.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">{notice.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed truncate">
                    {notice.content}
                  </p>
                  <div className="flex items-center group-hover:translate-x-2 transition-transform text-xs font-bold text-blue-600">
                    View Details <ArrowUpRight size={14} className="ml-1" />
                  </div>
                </div>
                <div className="shrink-0 flex items-center justify-center p-4">
                  <FileText className="text-slate-200 dark:text-slate-800" size={40} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Subscription Card */}
      <div className="mt-20 p-12 bg-slate-950 rounded-3xl text-white relative overflow-hidden text-center space-y-8">
        <Megaphone className="mx-auto text-blue-500 opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" size={200} />
        <h3 className="text-3xl font-bold relative z-10">Never miss an update.</h3>
        <p className="text-slate-400 text-sm max-w-sm mx-auto relative z-10">Enable browser notifications to receive urgent announcements directly. No spam, just core academic updates.</p>
        <button className="bg-white text-slate-950 px-8 py-4 rounded-xl font-bold relative z-10 hover:bg-blue-100 transition-all active:scale-95 shadow-xl">
          Get Instant Desktop Alerts
        </button>
      </div>
    </div>
  );
}
