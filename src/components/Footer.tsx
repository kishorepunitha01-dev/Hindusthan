import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2 text-white">
              <Landmark className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold tracking-tight">ZENITH UNIVERSITY</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Pioneering excellence in higher education since 1954. Zenith University is dedicated to fostering innovation, research, and holistic development.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 hover:bg-blue-600 hover:text-white transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold text-lg">Links useful</h3>
            <ul className="space-y-3">
              {['Academic Calendar', 'Student Portal', 'Alumni Network', 'Research Hub', 'Careers', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm hover:text-blue-400 transition-colors flex items-center group">
                    <ArrowUpRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold text-lg">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="text-blue-500 mt-1 shrink-0" size={18} />
                <span className="text-sm">123 Zenith Way, Knowledge District, EduCity - 50001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-blue-500 shrink-0" size={18} />
                <span className="text-sm">+1 (555) 0123 4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-blue-500 shrink-0" size={18} />
                <span className="text-sm">admissions@zenith.edu</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold text-lg">Stay Updated</h3>
            <p className="text-sm text-slate-400">Subscribe to our newsletter for latest updates and announcements.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Email address"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-10 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {currentYear} Zenith University. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
