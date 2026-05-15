import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Image as ImageIcon, X, ZoomIn, Filter } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import { cn } from '../lib/utils';

export default function Gallery() {
  const [images, setImages] = React.useState<any[]>([]);
  const [filter, setFilter] = React.useState('all');
  const [selectedImage, setSelectedImage] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchGallery() {
      try {
        const snapshot = await getDocs(collection(db, 'gallery'));
        setImages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        // Mock data
        setImages([
          { id: '1', url: 'https://images.unsplash.com/photo-1523050335392-9ae86eb17449', category: 'campus', caption: 'Sunrise over Main Building' },
          { id: '2', url: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3', category: 'campus', caption: 'Student Hub Library' },
          { id: '3', url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4', category: 'events', caption: 'Annual Cultural Fest' },
          { id: '4', url: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a', category: 'events', caption: 'Tech Symposium Keynote' },
          { id: '5', url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da', category: 'sports', caption: 'Basketball Tournament' },
          { id: '6', url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622', category: 'events', caption: 'Graduation Ceremony 2025' },
          { id: '7', url: 'https://images.unsplash.com/photo-1562774053-701939374585', category: 'academic', caption: 'Physics Lab Session' },
          { id: '8', url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846', category: 'campus', caption: 'Campus Courtyard' },
          { id: '9', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', category: 'events', caption: 'Stage Performance' },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  const categories = ['all', 'campus', 'academic', 'events', 'sports'];
  const filteredImages = filter === 'all' ? images : images.filter(img => img.category === filter);

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Photo <span className="text-blue-600">Gallery</span></h1>
          <p className="text-slate-600 dark:text-slate-400">Capturing the moments that define life at Zenith University. From scholarly breakthroughs to cultural celebrations.</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border",
                filter === cat 
                  ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-950" 
                  : "bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 hover:border-blue-300"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="aspect-square bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl" />)}
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(img)}
              >
                <img src={`${img.url}?auto=format&fit=crop&q=80&w=800`} alt={img.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn className="text-white" size={32} />
                </div>
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  <p className="text-xs font-bold text-white uppercase tracking-wider truncate">{img.caption}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-white hover:rotate-90 transition-transform">
              <X size={40} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-5xl w-full max-h-full flex flex-col items-center"
              onClick={e => e.stopPropagation()}
            >
              <img 
                src={`${selectedImage.url}?auto=format&fit=crop&q=90&w=1600`} 
                alt={selectedImage.caption} 
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl shadow-blue-500/10"
              />
              <div className="mt-8 text-center space-y-2">
                <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.3em]">{selectedImage.category}</p>
                <h3 className="text-white text-2xl font-bold tracking-tight">{selectedImage.caption}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
