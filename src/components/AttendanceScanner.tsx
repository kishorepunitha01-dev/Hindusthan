import React from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { QrCode, CheckCircle2, XCircle, Loader2, Camera } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AttendanceScanner() {
  const [scanResult, setScanResult] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<'idle' | 'scanning' | 'processing' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = React.useState<string>('');

  React.useEffect(() => {
    let scanner: Html5QrcodeScanner | null = null;
    let timer: any = null;
    
    if (status === 'scanning') {
      // Small delay to ensure the DOM element is rendered and ready
      timer = setTimeout(() => {
        const element = document.getElementById("qr-reader");
        if (element) {
          scanner = new Html5QrcodeScanner(
            "qr-reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
            /* verbose= */ false
          );
          scanner.render(onScanSuccess, onScanFailure);
        }
      }, 100);
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (scanner) {
        scanner.clear().catch(error => console.error("Failed to clear scanner", error));
      }
    };
  }, [status]);

  async function onScanSuccess(decodedText: string) {
    if (status !== 'scanning') return;
    
    setStatus('processing');
    
    try {
      if (!auth.currentUser) throw new Error("You must be signed in to mark attendance.");

      // Parse dynamic token
      const [eventId, timeToken] = decodedText.split('|');
      if (!eventId || !timeToken) {
        throw new Error("Invalid QR code. Please use the official Zenith University portal.");
      }

      // Verify time window (allow 1 minute window for clock drift/latency)
      const currentToken = Math.floor(Date.now() / 30000);
      const tokenDiff = Math.abs(currentToken - parseInt(timeToken));
      
      if (tokenDiff > 2) { // 60 seconds tolerance
        throw new Error("QR Code expired. Please ask the instructor to refresh the scanner.");
      }

      setScanResult(eventId);

      // Check if already marked for this event/session
      const attendanceRef = collection(db, 'attendance');
      const q = query(
        attendanceRef, 
        where('eventId', '==', eventId), 
        where('studentId', '==', auth.currentUser.uid)
      );
      
      const existing = await getDocs(q);
      if (!existing.empty) {
        throw new Error("Attendance already recorded for this event.");
      }

      // Record attendance
      await addDoc(attendanceRef, {
        eventId: decodedText,
        studentId: auth.currentUser.uid,
        studentName: auth.currentUser.displayName || auth.currentUser.email,
        timestamp: serverTimestamp()
      });

      setStatus('success');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to record attendance.");
      setStatus('error');
    }
  }

  function onScanFailure(error: any) {
    // Soft ignore scanning failures
    // console.warn(`QR scan error: ${error}`);
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden">
      <div className="text-center space-y-4 mb-8">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg shadow-blue-600/30">
          <QrCode size={32} />
        </div>
        <h2 className="text-2xl font-bold">Attendance Scanner</h2>
        <p className="text-sm text-slate-500">Scan the event QR code to mark your attendance instantly.</p>
      </div>

      <div className="relative aspect-square bg-slate-100 dark:bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800">
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.button
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setStatus('scanning')}
              className="flex flex-col items-center space-y-3 group"
            >
              <div className="p-5 bg-white dark:bg-slate-800 rounded-full shadow-md group-hover:scale-110 transition-transform">
                <Camera size={32} className="text-blue-600" />
              </div>
              <span className="text-sm font-bold text-slate-600">Start Camera</span>
            </motion.button>
          )}

          {status === 'scanning' && (
            <motion.div 
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <div id="qr-reader" className="w-full h-full border-none"></div>
            </motion.div>
          )}

          {status === 'processing' && (
            <motion.div 
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center space-y-4"
            >
              <Loader2 className="animate-spin text-blue-600" size={48} />
              <p className="text-sm font-bold text-slate-600">Verifying session...</p>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center space-y-4 text-emerald-500"
            >
              <CheckCircle2 size={64} />
              <div className="text-center">
                <p className="text-lg font-bold">Success!</p>
                <p className="text-xs text-slate-500">Attendance recorded successfully.</p>
              </div>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-4 px-6 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg text-xs font-bold"
              >
                Scan Another
              </button>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div 
              key="error"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center space-y-4 text-rose-500 p-6 text-center"
            >
              <XCircle size={64} />
              <div>
                <p className="text-lg font-bold">Error</p>
                <p className="text-xs text-slate-500 mt-2">{errorMsg}</p>
              </div>
              <button 
                onClick={() => setStatus('scanning')}
                className="mt-4 px-6 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30 flex items-start space-x-3">
        <CheckCircle2 size={16} className="text-blue-600 mt-0.5" />
        <p className="text-[10px] text-blue-800 dark:text-blue-300 leading-relaxed">
          <strong>Privacy Note:</strong> Your student ID and location/timestamp are recorded only when scanning authorized Zenith University QR codes.
        </p>
      </div>
    </div>
  );
}
