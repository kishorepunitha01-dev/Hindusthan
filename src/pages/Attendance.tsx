import React from 'react';
import AttendanceScanner from '../components/AttendanceScanner';
import { motion } from 'motion/react';
import { ShieldCheck, History } from 'lucide-react';
import { auth, db } from '../firebase';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

export default function Attendance() {
  const [recentRecords, setRecentRecords] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchRecentAttendance();
  }, []);

  async function fetchRecentAttendance() {
    if (!auth.currentUser) {
      setLoading(false);
      return;
    }

    try {
      const q = query(
        collection(db, 'attendance'),
        where('studentId', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc'),
        limit(5)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecentRecords(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50 dark:bg-slate-950 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Scanner Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-12 bg-blue-600 rounded-full" />
              <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tighter">ZENITH<span className="text-blue-600">ID</span></h1>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span>Attendance Gateway 2.1</span>
              </div>
            </div>

            <AttendanceScanner />

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center space-x-3">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Status</p>
                  <p className="text-xs font-bold">Encrypted</p>
                </div>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center space-x-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <History size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Precision</p>
                  <p className="text-xs font-bold">Server-Time</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* History Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden self-stretch"
          >
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <History className="text-blue-600" size={24} />
                <h3 className="font-bold text-lg">My Recent Scans</h3>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Last 5 Sessions</span>
            </div>

            <div className="p-4 sm:p-8">
              {!auth.currentUser ? (
                <div className="text-center py-12">
                  <p className="text-sm text-slate-500">Sign in to view your attendance history.</p>
                </div>
              ) : loading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl"></div>
                  ))}
                </div>
              ) : recentRecords.length === 0 ? (
                <div className="text-center py-12 opacity-50">
                  <p className="text-sm">No attendance records found yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentRecords.map((record) => (
                    <motion.div
                      key={record.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-between group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-bold text-xs">
                          {new Date(record.timestamp?.toDate()).getDate()}
                        </div>
                        <div>
                          <p className="font-bold text-sm truncate max-w-[150px]">{record.eventId}</p>
                          <p className="text-[10px] text-slate-500">
                            {record.timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[8px] font-bold rounded-md uppercase">Present</span>
                        <span className="text-[8px] text-slate-400 mt-1">{new Date(record.timestamp?.toDate()).toLocaleDateString()}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-6">
              <p className="text-[10px] text-center text-slate-500">
                Attendance records are verified against event session windows. 
                Discrepancies should be reported to the registrar office within 24 hours.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
