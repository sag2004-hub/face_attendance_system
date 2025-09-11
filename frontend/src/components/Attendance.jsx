import React, { useState, useEffect } from 'react';
import { 
  Camera as CameraIcon, 
  CheckCircle, 
  AlertTriangle, 
  X, 
  RefreshCw,
  Eye,
  Zap,
  Target,
  Clock,
  User,
  CreditCard,
  Activity,
  TrendingUp,
  Sparkles,
  Shield
} from 'lucide-react';
import CameraComponent from './Camera';
import { markAttendance } from '../utils/api';

const Attendance = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [lastAttendance, setLastAttendance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initialization loading
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleCapture = async (imageSrc) => {
    setIsProcessing(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await markAttendance(imageSrc);
      
      if (response.data.success) {
        setMessage({ type: 'success', text: response.data.message });
        setLastAttendance({
          ...response.data.student,
          timestamp: new Date().toLocaleString()
        });
      } else {
        setMessage({ type: 'error', text: response.data.message });
        setLastAttendance(null);
      }
    } catch (error) {
      console.error('Attendance marking error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to mark attendance. Please try again.';
      setMessage({ type: 'error', text: errorMessage });
      setLastAttendance(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloseMessage = () => {
    setMessage({ type: '', text: '' });
  };

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex justify-center items-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin shadow-2xl shadow-cyan-400/50"></div>
          <div className="absolute top-2 left-2 w-16 h-16 border-4 border-blue-300 border-t-transparent rounded-full animate-spin animate-reverse"></div>
          <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
          
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="text-cyan-400 font-semibold animate-pulse">
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-teal-400/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-float" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-60 right-20 w-1 h-1 bg-teal-400 rounded-full animate-float" style={{animationDelay: '5s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 animate-fadeIn">
        {/* Reduced Hero Section */}
        <div className="text-center mb-12 pt-8 px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-full mb-6 transform hover:scale-110 hover:rotate-12 transition-all duration-500 shadow-2xl shadow-cyan-500/50 animate-glow">
            <CameraIcon className="w-8 h-8 text-white animate-pulse" />
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4 animate-slideDown leading-tight">
            Mark Your
            <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Attendance
            </span>
          </h1>
          
          <p className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto leading-relaxed animate-slideUp">
            Position your face in front of the camera for instant attendance marking
          </p>
        </div>

        {/* Alert Message */}
        {message.text && (
          <div className={`mb-8 mx-auto max-w-4xl transform transition-all duration-500 animate-bounceIn ${
            message.type === 'success' 
              ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm text-emerald-300 border border-emerald-400/30' 
              : 'bg-gradient-to-r from-slate-500/20 to-gray-500/20 backdrop-blur-sm text-slate-300 border border-slate-400/30'
          } rounded-2xl p-6 shadow-2xl`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm border ${
                  message.type === 'success' ? 'bg-emerald-500/30 border-emerald-400/40' : 'bg-slate-500/30 border-slate-400/40'
                }`}>
                  {message.type === 'success' ? (
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-slate-400" />
                  )}
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-lg">{message.text}</p>
                </div>
              </div>
              <button
                onClick={handleCloseMessage}
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Last Attendance Success Card */}
        {lastAttendance && (
          <div className="mb-8 mx-auto max-w-4xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-xl border border-emerald-400/30 rounded-3xl p-8 shadow-2xl animate-bounceIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">
                  Attendance Marked Successfully
                </h3>
                <div className="grid grid-cols-2 gap-4 text-emerald-300">
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    <span className="font-medium">{lastAttendance.name}</span>
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    <span className="font-medium">{lastAttendance.student_id}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    <span className="font-medium">{lastAttendance.timestamp}</span>
                  </div>
                  <div className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    <span className="font-medium">{(lastAttendance.confidence * 100).toFixed(1)}% Match</span>
                  </div>
                </div>
              </div>
              <div className="text-6xl animate-pulse">
                <Sparkles className="w-16 h-16 text-emerald-400" />
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Camera Section */}
          <div className="lg:col-span-2 animate-slideUp">
            <div className="transform transition-all duration-300 hover:scale-[1.02] h-full">
              <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 shadow-2xl h-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-2xl p-3 mr-4 shadow-xl shadow-cyan-500/30">
                      <CameraIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Face Recognition Camera</h3>
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-center">
                    <CameraComponent onCapture={handleCapture} isCapturing={isProcessing} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Equal Height Cards */}
          <div className="flex flex-col space-y-6 animate-slideUp h-full" style={{animationDelay: '0.2s'}}>
            {/* Instructions */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-6 shadow-2xl transform hover:scale-[1.02] transition-all duration-500 hover:shadow-cyan-500/20 relative overflow-hidden group flex-1">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              
              <div className="flex items-center mb-4 relative z-10">
                <div className="bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-xl p-2 mr-3 shadow-xl shadow-cyan-500/30">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Instructions</h3>
              </div>
              
              <div className="space-y-3 relative z-10">
                {[
                  { step: '1', text: 'Position face in camera center', icon: Target },
                  { step: '2', text: 'Ensure good lighting', icon: Eye },
                  { step: '3', text: 'Click "Capture Photo"', icon: CameraIcon },
                  { step: '4', text: 'Wait for confirmation', icon: RefreshCw }
                ].map((instruction, index) => {
                  const IconComponent = instruction.icon;
                  return (
                    <div key={index} className="flex items-start group/instruction animate-fadeIn" style={{ animationDelay: `${index * 0.1 + 0.5}s` }}>
                      <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-400/40 rounded-full flex items-center justify-center mr-3 text-cyan-400 font-bold text-sm">
                        {instruction.step}
                      </div>
                      <div className="flex items-center flex-1">
                        <IconComponent className="w-4 h-4 mr-2 text-slate-400 group-hover/instruction:text-cyan-400 transition-colors" />
                        <p className="text-slate-300 group-hover/instruction:text-slate-200 transition-colors font-medium text-sm">
                          {instruction.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-6 shadow-2xl transform hover:scale-[1.02] transition-all duration-500 hover:shadow-emerald-500/20 relative overflow-hidden group flex-1">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              
              <div className="flex items-center mb-4 relative z-10">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-2 mr-3 shadow-xl shadow-emerald-500/30">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">System Status</h3>
              </div>
              
              <div className="space-y-3 relative z-10">
                {[
                  { label: 'Camera', status: 'Ready', color: 'emerald' },
                  { label: 'Recognition', status: 'Active', color: 'teal' },
                  { label: 'Processing', status: isProcessing ? 'Processing...' : 'Idle', color: isProcessing ? 'yellow' : 'slate' }
                ].map((item, index) => {
                  const colors = {
                    emerald: 'text-emerald-400 bg-emerald-500',
                    teal: 'text-teal-400 bg-teal-500',
                    yellow: 'text-yellow-400 bg-yellow-500',
                    slate: 'text-slate-400 bg-slate-500'
                  };
                  
                  return (
                    <div key={index} className="flex items-center justify-between animate-fadeIn" style={{ animationDelay: `${index * 0.1 + 0.7}s` }}>
                      <span className="text-slate-300 font-medium text-sm">{item.label}</span>
                      <div className={`flex items-center ${colors[item.color].split(' ')[0]}`}>
                        <div className={`w-2 h-2 ${colors[item.color].split(' ')[1]} rounded-full mr-2 ${isProcessing && item.label === 'Processing' ? 'animate-pulse' : ''}`}></div>
                        <span className="font-semibold text-sm">{item.status}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-6 shadow-2xl transform hover:scale-[1.02] transition-all duration-500 hover:shadow-indigo-500/20 relative overflow-hidden group flex-1">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              
              <div className="flex items-center mb-4 relative z-10">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-2 mr-3 shadow-xl shadow-indigo-500/30">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Today's Summary</h3>
              </div>
              
              <div className="text-center relative z-10">
                <div className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  {lastAttendance ? '1' : '0'}
                </div>
                <div className="text-slate-300 font-medium text-sm">Attendance Marked</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from { transform: translateY(-30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.4); }
          50% { box-shadow: 0 0 40px rgba(34, 211, 238, 0.8), 0 0 60px rgba(59, 130, 246, 0.3); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slideDown {
          animation: slideDown 0.8s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-bounceIn {
          animation: bounceIn 1.2s ease-out 0.3s forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }

        .animate-reverse {
          animation-direction: reverse;
        }

        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
};

export default Attendance;