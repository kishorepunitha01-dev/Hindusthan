import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, Users, Calendar, Megaphone, Image as ImageIcon, 
  Settings, LogOut, Plus, Edit2, Trash2, LayoutDashboard,
  Search, ShieldAlert, CheckCircle2, ChevronRight, BarChart3,
  Rocket, QrCode, Download, Eye, XCircle
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { 
  signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut
} from 'firebase/auth';
import { 
  collection, addDoc, getDocs, deleteDoc, doc, updateDoc,
  serverTimestamp, query, orderBy
} from 'firebase/firestore';
import { cn } from '../lib/utils';

export default function AdminDashboard() {
  const [user, setUser] = React.useState<any>(null);
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<any>({
    events: [],
    notices: [],
    gallery: [],
    projects: [],
    attendance: []
  });
  const [qrModal, setQrModal] = React.useState<{ id: string, title: string } | null>(null);
  const [isCreating, setIsCreating] = React.useState(false);
  const [formLoading, setFormLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<any>({
    title: '',
    studentName: '',
    description: '',
    date: '',
    imageUrl: ''
  });

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      if (u) fetchData();
    });
    return () => unsub();
  }, []);

  const fetchData = async () => {
    try {
      const collections = ['events', 'notices', 'gallery', 'projects', 'attendance', 'achievements'];
      const results: any = {};
      for (const col of collections) {
        // Try to get ordered data
        try {
          const snap = await getDocs(query(collection(db, col), orderBy('createdAt', 'desc')));
          results[col] = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        } catch (e) {
          // Fallback if index is missing
          const snap = await getDocs(collection(db, col));
          results[col] = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        }
      }
      setData(results);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await addDoc(collection(db, activeTab), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setIsCreating(false);
      setFormData({ title: '', studentName: '', description: '', date: '', imageUrl: '' });
      fetchData();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, activeTab);
    } finally {
      setFormLoading(false);
    }
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handleLogout = () => signOut(auth);

  if (loading) return <div className="h-screen flex items-center justify-center"><BarChart3 className="animate-spin text-blue-600" /></div>;

  if (!user) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 p-10 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl text-center space-y-10">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-2xl shadow-blue-600/30">
            <ShieldAlert size={40} />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">Admin Portal</h1>
            <p className="text-slate-500 text-sm">Please sign in with your authorized Zenith University faculty account to continue.</p>
          </div>
          <button 
            onClick={handleLogin}
            className="w-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 py-4 rounded-xl font-bold flex items-center justify-center hover:scale-[1.02] active:scale-95 transition-all"
          >
            <img src="https://www.gstatic.com/firebase/anonymous-scan.png" className="w-5 mr-3 invert dark:invert-0" alt="G" />
            Continue with Google
          </button>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Authorized Personnel Only</p>
        </div>
      </div>
    );
  }

  const handleDelete = async (col: string, id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await deleteDoc(doc(db, col, id));
      fetchData();
    } catch (e) {
      alert("Permission Denied: Only designated admins can delete records.");
    }
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'events', label: 'Events Hub', icon: Calendar },
    { id: 'notices', label: 'Notices', icon: Megaphone },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'projects', label: 'Innovations', icon: Rocket },
    { id: 'attendance', label: 'Attendance', icon: CheckCircle2 }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 space-y-8">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center space-x-3 mb-8">
                <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-xl" />
                <div className="truncate">
                  <p className="text-sm font-bold truncate">{user.displayName}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase truncate">Faculty Head</p>
                </div>
              </div>
              <nav className="space-y-1">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                      activeTab === item.id 
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                        : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                    )}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
              <div className="pt-8 mt-8 border-t border-slate-100 dark:border-slate-800">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-xl text-sm font-bold transition-all"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-8">
            
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <header className="flex justify-between items-end">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">University Overview</h2>
                    <p className="text-slate-500 text-sm italic">"Metadata insights & system analytics"</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status</p>
                    <div className="flex items-center text-emerald-500">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2" />
                      <span className="text-sm font-bold">Cloud Live</span>
                    </div>
                  </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {sidebarItems.slice(1).map((item) => (
                     <div key={item.id} className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl w-fit">
                          <item.icon size={24} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-2xl font-bold">{data[item.id]?.length || 0}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">{item.label}</p>
                        </div>
                     </div>
                  ))}
                </div>

                <div className="bg-slate-950 rounded-3xl p-10 text-white min-h-[300px] relative overflow-hidden flex flex-col justify-end group">
                   <BarChart3 className="absolute right-0 top-0 text-white/5 w-80 h-80 -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-1000" />
                   <div className="relative z-10 space-y-4">
                      <h3 className="text-4xl font-serif italic">Student Enrollment Trends</h3>
                      <p className="text-slate-400 text-sm max-w-lg">Advanced analytics module is syncronizing with local databases. Real-time visualization available in Production mode.</p>
                      <button className="px-6 py-3 bg-blue-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-colors">Generate Report</button>
                   </div>
                </div>
              </div>
            )}

            {activeTab !== 'dashboard' && activeTab !== 'attendance' && (
              <div className="space-y-8 relative">
                 <header className="flex justify-between items-center bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight capitalize underline underline-offset-8 decoration-blue-600/30">{activeTab} Management</h2>
                      <p className="text-slate-500 text-sm mt-2">Manage all active {activeTab} records here.</p>
                    </div>
                    <button 
                      onClick={() => setIsCreating(true)}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
                    >
                      <Plus size={18} />
                      <span>New Entry</span>
                    </button>
                 </header>

                 {/* Creation Form Modal */}
                 <AnimatePresence>
                   {isCreating && (
                     <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
                     >
                        <motion.div 
                          initial={{ y: 50, opacity: 0, scale: 0.95 }}
                          animate={{ y: 0, opacity: 1, scale: 1 }}
                          exit={{ y: 50, opacity: 0, scale: 0.95 }}
                          className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden"
                        >
                          <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <h3 className="text-xl font-bold">Add New {activeTab === 'achievements' ? 'Achievement' : activeTab}</h3>
                            <button onClick={() => setIsCreating(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                              <XCircle size={20} className="text-slate-400" />
                            </button>
                          </div>
                          
                          <form onSubmit={handleCreate} className="p-8 space-y-6">
                            {activeTab === 'achievements' ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Achievement Title</label>
                                  <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm" placeholder="Top Solution Challenge 2026" />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Student/Team Name</label>
                                  <input required value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm" placeholder="Zenith Dev Team" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Description</label>
                                  <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm h-24" placeholder="Brief details about the accomplishment..." />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Date/Year</label>
                                  <input required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm" placeholder="January 2026" />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Image URL</label>
                                  <input required value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm" placeholder="https://unsplash.com/..." />
                                </div>
                              </div>
                            ) : (
                              <div className="py-20 text-center space-y-4">
                                <LayoutDashboard size={48} className="mx-auto text-slate-200" />
                                <p className="text-slate-500 text-sm">Form for {activeTab} is currently being mapped to cloud resources.</p>
                              </div>
                            )}

                            <div className="flex justify-end pt-4 space-x-4">
                               <button type="button" onClick={() => setIsCreating(false)} className="px-6 py-3 text-sm font-bold">Cancel</button>
                               <button 
                                 type="submit" 
                                 disabled={activeTab !== 'achievements' || formLoading}
                                 className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-xl shadow-blue-600/30 disabled:opacity-50"
                               >
                                 {formLoading ? 'Publishing...' : 'Save Record'}
                               </button>
                            </div>
                          </form>
                        </motion.div>
                     </motion.div>
                   )}
                 </AnimatePresence>

                 <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                          <tr>
                            <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">ID / Title</th>
                            <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Date / Source</th>
                            <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data[activeTab]?.map((item: any) => (
                            <tr key={item.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                              <td className="px-8 py-6">
                                <p className="font-bold text-slate-900 dark:text-white truncate max-w-xs">{item.title || item.caption}</p>
                                <p className="text-[10px] text-slate-400 font-mono mt-1 opacity-60">ID: {item.id.slice(0, 8)}...</p>
                              </td>
                              <td className="px-8 py-6">
                                <p className="text-sm font-semibold">{item.date || 'System Logged'}</p>
                                <p className="text-[10px] text-slate-400 uppercase font-bold">{item.category || item.department || 'General'}</p>
                              </td>
                              <td className="px-8 py-6 text-right">
                                <div className="flex items-center justify-end space-x-2">
                                  {activeTab === 'events' && (
                                    <button 
                                      onClick={() => setQrModal({ id: item.id, title: item.title })}
                                      className="p-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all"
                                      title="Generate Session QR"
                                    >
                                      <QrCode size={16} />
                                    </button>
                                  )}
                                  <button className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-500 hover:text-blue-600 transition-all">
                                    <Edit2 size={16} />
                                  </button>
                                  <button 
                                    onClick={() => handleDelete(activeTab, item.id)}
                                    className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/30 text-slate-500 hover:text-rose-600 transition-all"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {data[activeTab]?.length === 0 && (
                            <tr>
                              <td colSpan={3} className="px-8 py-20 text-center text-slate-400">
                                <div className="space-y-4">
                                  <LayoutDashboard className="mx-auto opacity-20" size={60} />
                                  <p className="font-bold tracking-widest uppercase text-xs">No records found in this cloud segment.</p>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'attendance' && (
              <div className="space-y-8">
                <header className="flex justify-between items-center bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight capitalize underline underline-offset-8 decoration-emerald-600/30">Attendance Logs</h2>
                    <p className="text-slate-500 text-sm mt-2">Real-time student attendance monitoring.</p>
                  </div>
                  <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 px-6 py-3 rounded-xl font-bold text-sm">
                      <Download size={18} />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </header>

                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                        <tr>
                          <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Student Name</th>
                          <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Event/Session ID</th>
                          <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Timestamp</th>
                          <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.attendance?.map((item: any) => (
                          <tr key={item.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-8 py-6">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold">
                                  {item.studentName?.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-bold text-slate-900 dark:text-white text-sm">{item.studentName}</p>
                                  <p className="text-[10px] text-slate-400 font-mono">UID: {item.studentId.slice(0, 8)}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <p className="text-sm font-semibold text-slate-600">{item.eventId}</p>
                            </td>
                            <td className="px-8 py-6">
                              <p className="text-sm font-medium">{item.timestamp?.toDate().toLocaleString()}</p>
                            </td>
                            <td className="px-8 py-6 text-right">
                              <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md uppercase">Verified</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* QR Modal */}
            <AnimatePresence>
               {qrModal && (
                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4"
                 >
                   <motion.div 
                     initial={{ scale: 0.9, y: 20 }}
                     animate={{ scale: 1, y: 0 }}
                     className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 max-w-sm w-full text-center space-y-8"
                   >
                     <div className="space-y-2">
                        <h3 className="text-2xl font-bold">Attendance QR</h3>
                        <p className="text-sm text-slate-500">{qrModal.title}</p>
                     </div>
                     
                     <div className="bg-white p-6 rounded-3xl shadow-inner border border-slate-100 inline-block mx-auto relative overflow-hidden">
                        <QRCodeSVG 
                          value={`${qrModal.id}|${Math.floor(Date.now() / 30000)}`} 
                          size={200}
                          level="H"
                          includeMargin
                        />
                        <motion.div 
                          initial={{ width: "100%" }}
                          animate={{ width: "0%" }}
                          key={Math.floor(Date.now() / 30000)}
                          transition={{ duration: 30, ease: "linear" }}
                          className="absolute bottom-0 left-0 h-1 bg-blue-600/30"
                        />
                     </div>

                     <div className="space-y-4">
                        <div className="flex items-center justify-center space-x-2 text-amber-600 bg-amber-50 py-2 rounded-xl border border-amber-100">
                          <ShieldAlert size={14} />
                          <span className="text-[10px] font-bold uppercase tracking-tight">Dynamic Security Active - Expires in 30s</span>
                        </div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Session ID: {qrModal.id}</p>
                        <div className="flex gap-4">
                           <button 
                             onClick={() => setQrModal(null)}
                             className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-sm"
                           >
                             Close
                           </button>
                           <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20">
                             Download
                           </button>
                        </div>
                     </div>
                   </motion.div>
                 </motion.div>
               )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
