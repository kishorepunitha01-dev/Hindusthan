import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Clock, Search, Filter, ArrowRight, ExternalLink } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { cn } from '../lib/utils';

export default function Events() {
  const [filter, setFilter] = React.useState('all');
  const [events, setEvents] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchEvents() {
      try {
        const q = query(collection(db, 'events'), orderBy('date', 'asc'));
        const snapshot = await getDocs(q);
        setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        // Fallback for demo if firebase is empty or rules fail
        console.warn("Event fetching error, using mock data for demo.");
        setEvents([
          {
            id: '1',
            title: "Zenith Tech Fest 2026",
            description: "A 3-day marathon of coding, robotics, and innovation showcasing student projects from across the country.",
            date: "2026-03-24T10:00:00",
            venue: "Main Campus Auditorium",
            category: "academic",
            imageUrl: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=800"
          },
          {
            id: '2',
            title: "Global Alumni Meet",
            description: "Reunite with your batchmates and share your professional journeys with the current generation of students.",
            date: "2026-04-12T18:00:00",
            venue: "University Gardens",
            category: "cultural",
            imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800"
          },
          {
            id: '3',
            title: "Intra-University Cricket League",
            description: "The biggest sports event of the semester. 16 teams, 1 trophy. Witness the adrenaline-packed matches.",
            date: "2026-05-02T08:00:00",
            venue: "Zenith Sports Ground",
            category: "sports",
            imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800"
          }
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const filteredEvents = filter === 'all' ? events : events.filter(e => e.category === filter);

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">University <span className="text-blue-600">Events</span></h1>
          <p className="text-slate-600 dark:text-slate-400">Discover the vibrant events happening around the Zenith campus. Join us in celebrating innovation, culture, and sports.</p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {['all', 'academic', 'cultural', 'sports'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-semibold capitalize transition-all border",
                filter === cat 
                  ? "bg-blue-600 text-white border-blue-600" 
                  : "bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 hover:border-blue-300"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1,2,3].map(i => <div key={i} className="h-[450px] bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img 
                    src={event.imageUrl} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center space-x-1">
                    <Clock size={14} className="text-blue-600" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700 dark:text-slate-200">
                      {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-2">{event.category}</span>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{event.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-1 line-clamp-3 leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center text-xs text-slate-500">
                      <Calendar size={14} className="mr-2 text-slate-400" />
                      {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="flex items-center text-xs text-slate-500">
                      <MapPin size={14} className="mr-2 text-slate-400" />
                      {event.venue}
                    </div>
                  </div>
                  
                  <button className="mt-8 w-full py-4 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center group/btn active:scale-95 transition-all">
                    Register Now
                    <ExternalLink size={16} className="ml-2 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
