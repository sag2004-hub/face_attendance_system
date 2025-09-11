import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, 
  Camera as CameraIcon, 
  User, 
  CreditCard, 
  CheckCircle, 
  X, 
  RefreshCw,
  Lightbulb,
  Eye,
  ShieldCheck,
  Target,
  AlertTriangle,
  Sparkles,
  Zap,
  Globe
} from 'lucide-react';
import CameraComponent from './Camera';
import { registerStudent } from '../utils/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    student_id: ''
  });
  const [capturedImage, setCapturedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initialization loading
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCapture = (imageSrc) => {
    setCapturedImage(imageSrc);
    setMessage({ type: 'success', text: 'Photo captured successfully!' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.student_id.trim()) {
      setMessage({ type: 'error', text: 'Please fill in all fields!' });
      return;
    }
    if (!capturedImage) {
      setMessage({ type: 'error', text: 'Please capture a photo!' });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await registerStudent({
        name: formData.name.trim(),
        student_id: formData.student_id.trim(),
        image: capturedImage
      });

      if (response.data.success) {
        setMessage({ type: 'success', text: response.data.message });
        setFormData({ name: '', student_id: '' });
        setCapturedImage(null);
      } else {
        setMessage({ type: 'error', text: response.data.message });
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setMessage({ type: '', text: '' });
  };

  const handleCloseMessage = () => {
    setMessage({ type: '', text: '' });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const guidelines = [
    { icon: Lightbulb, text: 'Ensure good lighting on your face', color: 'cyan' },
    { icon: Eye, text: 'Look directly at the camera', color: 'emerald' },
    { icon: ShieldCheck, text: 'Remove sunglasses or masks', color: 'indigo' },
    { icon: Target, text: 'Keep a neutral expression', color: 'teal' },
    { icon: Sparkles, text: 'Center your face in the frame', color: 'cyan' }
  ];

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex justify-center items-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin shadow-lg shadow-cyan-400/50"></div>
          <div className="absolute top-2 left-2 w-12 h-12 border-3 border-blue-300 border-t-transparent rounded-full animate-spin animate-reverse"></div>
          <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
          
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="text-cyan-400 font-semibold animate-pulse">
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
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
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-20 pt-16 px-4"
          variants={itemVariants}
        >
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-full mb-8 transform hover:scale-110 hover:rotate-12 transition-all duration-500 shadow-2xl shadow-cyan-500/50 animate-glow"
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
          >
            <UserPlus className="w-12 h-12 text-white animate-pulse" />
          </motion.div>
          
          <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-6 animate-slideDown leading-tight">
            Register New
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Student Profile
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed animate-slideUp">
            Add a new student to our intelligent attendance system with advanced biometric recognition
          </p>
        </motion.div>

        {/* Alert Message */}
        <AnimatePresence>
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              className={`mb-8 mx-auto max-w-4xl transform transition-all duration-500 animate-bounceIn ${
                message.type === 'success'
                  ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm text-emerald-300 border border-emerald-400/30'
                  : 'bg-gradient-to-r from-slate-500/20 to-gray-500/20 backdrop-blur-sm text-slate-300 border border-slate-400/30'
              } rounded-2xl p-6 shadow-2xl`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 backdrop-blur-sm border ${
                      message.type === 'success' ? 'bg-emerald-500/30 border-emerald-400/40' : 'bg-slate-500/30 border-slate-400/40'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {message.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-slate-400" />
                    )}
                  </motion.div>
                  <span className="font-semibold text-lg">{message.text}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCloseMessage}
                  className="text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Form */}
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
          >
            <motion.div 
              className="bg-slate-800/40 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-700/50 transform hover:scale-[1.02] transition-all duration-500 hover:shadow-cyan-500/20 relative overflow-hidden group h-full flex flex-col"
              whileHover={{ y: -5, shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              transition={{ duration: 0.3 }}
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-blue-500/5 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              
              <div className="flex items-center mb-8 relative z-10">
                <motion.div
                  className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-2xl p-3 mr-4 shadow-xl shadow-cyan-500/30"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <User className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Student Information
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10 flex-grow flex flex-col">
                {/* Name Input */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-3">
                    Full Name *
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 pl-14 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-600/50 rounded-xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-400 transition-all duration-200 text-white placeholder-slate-400 hover:border-slate-500"
                      placeholder="Enter student's full name"
                    />
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
                  </div>
                </motion.div>

                {/* Student ID Input */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label htmlFor="student_id" className="block text-sm font-semibold text-slate-300 mb-3">
                    Student ID *
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      id="student_id"
                      name="student_id"
                      value={formData.student_id}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 pl-14 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-600/50 rounded-xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-400 transition-all duration-200 text-white placeholder-slate-400 hover:border-slate-500"
                      placeholder="Enter unique student ID"
                    />
                    <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
                  </div>
                </motion.div>

                {/* Photo Preview */}
                <AnimatePresence>
                  {capturedImage && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="block text-sm font-semibold text-slate-300 mb-3">
                        Captured Photo
                      </label>
                      <motion.div 
                        className="relative w-full max-w-sm mx-auto group"
                        whileHover={{ scale: 1.02 }}
                      >
                        <img
                          src={capturedImage}
                          alt="Captured"
                          className="w-full rounded-2xl shadow-xl border-4 border-slate-600/50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <motion.button
                          type="button"
                          onClick={handleRetake}
                          className="absolute top-3 right-3 bg-slate-600/80 hover:bg-slate-600 backdrop-blur-sm text-white rounded-full p-2 shadow-lg border border-slate-400/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button - Always at bottom */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !capturedImage}
                  className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform mt-auto ${
                    isSubmitting || !capturedImage
                      ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed border border-slate-600/30'
                      : 'bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 border border-cyan-400/30'
                  }`}
                  whileHover={!isSubmitting && capturedImage ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!isSubmitting && capturedImage ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <RefreshCw className="animate-spin -ml-1 mr-3 h-5 w-5" />
                      Registering Student...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Register Student
                    </span>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          {/* Right - Camera */}
          <motion.div 
            className="h-full"
            variants={itemVariants}
          >
            <motion.div
              className="h-full"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <CameraComponent onCapture={handleCapture} isCapturing={isSubmitting} />
            </motion.div>
          </motion.div>
        </div>

        {/* Photo Guidelines Footer - Full Width */}
        <motion.div 
          className="bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 shadow-2xl transform hover:scale-[1.01] transition-all duration-500 hover:shadow-indigo-500/20 relative overflow-hidden group mt-12"
          variants={itemVariants}
          whileHover={{ y: -5, shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
          transition={{ duration: 0.3 }}
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
          
          <div className="text-center mb-8 relative z-10">
            <div className="flex items-center justify-center mb-4">
              <motion.div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-3 mr-4 shadow-xl shadow-indigo-500/30"
                whileHover={{ rotate: -5, scale: 1.1 }}
              >
                <CameraIcon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Photo Guidelines
              </h3>
            </div>
            <p className="text-slate-300 text-lg">Follow these guidelines for the best photo capture results</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
            {guidelines.map((guideline, index) => {
              const IconComponent = guideline.icon;
              const colorClasses = {
                cyan: 'from-cyan-500/20 to-blue-500/20 border-cyan-400/40 text-cyan-400 shadow-cyan-500/20',
                emerald: 'from-emerald-500/20 to-teal-500/20 border-emerald-400/40 text-emerald-400 shadow-emerald-500/20',
                indigo: 'from-indigo-500/20 to-purple-500/20 border-indigo-400/40 text-indigo-400 shadow-indigo-500/20',
                teal: 'from-teal-500/20 to-cyan-500/20 border-teal-400/40 text-teal-400 shadow-teal-500/20'
              };
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`flex flex-col items-center text-center p-6 bg-gradient-to-br ${colorClasses[guideline.color]} backdrop-blur-sm rounded-2xl border transition-all cursor-pointer hover:shadow-lg group/guideline`}
                >
                  <motion.div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-600/30"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <IconComponent className="w-8 h-8 group-hover/guideline:animate-pulse" />
                  </motion.div>
                  <span className="font-semibold text-white text-sm leading-tight">
                    {guideline.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-6 mt-8 max-w-md mx-auto">
          <motion.div
            className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-slate-700/50 text-center transform transition-all duration-300 hover:shadow-cyan-500/20 hover:scale-105 group"
            variants={itemVariants}
            whileHover={{ y: -3, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto mb-3"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Zap className="w-6 h-6 text-white" />
            </motion.div>
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
              99.9%
            </div>
            <div className="text-slate-300 font-medium">Accuracy Rate</div>
          </motion.div>

          <motion.div
            className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-slate-700/50 text-center transform transition-all duration-300 hover:shadow-indigo-500/20 hover:scale-105 group"
            variants={itemVariants}
            whileHover={{ y: -3, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mb-3"
              whileHover={{ rotate: -360 }}
              transition={{ duration: 0.5 }}
            >
              <Globe className="w-6 h-6 text-white" />
            </motion.div>
            <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
              &lt;2s
            </div>
            <div className="text-slate-300 font-medium">Recognition Time</div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from { transform: translateY(-50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
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
          animation: slideDown 1s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 1s ease-out forwards;
          opacity: 0;
        }
        
        .animate-bounceIn {
          animation: bounceIn 1.5s ease-out 0.5s forwards;
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
      `}</style>
    </motion.div>
  );
};

export default Register;