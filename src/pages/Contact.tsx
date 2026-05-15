import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Contact() {
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 5000);
    }, 2000);
  };

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Connect with <span className="text-blue-600">Zenith</span></h1>
        <p className="text-slate-600 dark:text-slate-400">Have questions? We are here to help. Reach out to our admissions team, faculty, or technical support.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-slate-900 text-white p-10 rounded-3xl space-y-10 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full" />
             <div className="space-y-2">
                <h3 className="text-2xl font-bold">Contact Office</h3>
                <p className="text-sm text-slate-400">Response time: within 24 hours</p>
             </div>
             
             <ul className="space-y-8">
                <li className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Campus Address</p>
                    <p className="text-sm leading-relaxed">123 Zenith Way, Knowledge District, EduCity - 50001</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">General Inquiries</p>
                    <p className="text-sm font-medium">hello@zenith.edu</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Call Admissions</p>
                    <p className="text-sm font-medium">+1 (555) 0123 4567</p>
                  </div>
                </li>
             </ul>

             <div className="pt-10 border-t border-white/5 flex gap-4">
                <div className="w-full p-4 bg-white/5 rounded-2xl flex flex-col items-center">
                   <Clock size={16} className="text-slate-500 mb-2" />
                   <p className="text-[10px] font-bold uppercase text-slate-500">Mon-Fri</p>
                   <p className="text-xs font-bold">9AM - 6PM</p>
                </div>
                <div className="w-full p-4 bg-white/5 rounded-2xl flex flex-col items-center">
                   <MessageCircle size={16} className="text-slate-500 mb-2" />
                   <p className="text-[10px] font-bold uppercase text-slate-500">Sat-Sun</p>
                   <p className="text-xs font-bold">Closed</p>
                </div>
             </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-10 rounded-3xl shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Name</label>
                <input required type="text" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Address</label>
                <input required type="email" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="john@example.com" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Inquiry Type</label>
              <select className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                <option>Admissions & Enrollment</option>
                <option>Technical Support</option>
                <option>Alumni & Giving</option>
                <option>Media & Press</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Your Message</label>
              <textarea 
                required 
                rows={5} 
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none" 
                placeholder="Tell us how we can help..."
              />
            </div>

            <button 
              disabled={status !== 'idle'}
              className={cn(
                "w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase flex items-center justify-center transition-all",
                status === 'idle' ? "bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-600/20" : 
                status === 'sending' ? "bg-slate-100 dark:bg-slate-800 text-slate-400" : "bg-emerald-500 text-white"
              )}
            >
              {status === 'idle' && (
                <>
                  Send Message
                  <Send size={18} className="ml-2" />
                </>
              )}
              {status === 'sending' && "Broadcasting..."}
              {status === 'success' && (
                <>
                  Message Sent
                  <CheckCircle2 size={18} className="ml-2" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="mt-20 w-full h-[400px] bg-slate-200 dark:bg-slate-800 rounded-3xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-slate-300 dark:bg-slate-700 flex items-center justify-center">
            <div className="text-center space-y-4">
               <MapPin className="mx-auto text-slate-400" size={60} />
               <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">Interactive Map Data (Disabled in Preview)</p>
            </div>
        </div>
        <div className="absolute bottom-8 left-8 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-2xl flex items-center space-x-4 border border-slate-100 dark:border-slate-800">
           <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <MapPin className="text-blue-600" size={20} />
           </div>
           <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Main Campus</p>
              <p className="text-sm font-bold">123 Zenith Way, EduCity</p>
           </div>
        </div>
      </div>
    </div>
  );
}
