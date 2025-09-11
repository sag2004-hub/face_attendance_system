import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserPlus, 
  Camera, 
  BarChart3, 
  Eye, 
  Zap, 
  Shield, 
  Smartphone,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Users,
  TrendingUp,
  Globe
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [systemStatus, setSystemStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate health check
    setTimeout(() => {
      setSystemStatus({ status: 'healthy' });
      setLoading(false);
    }, 1500);
  }, []);

  const cards = [
    {
      title: 'Register Student',
      description: 'Add new students to the system with their biometric profiles',
      link: '/register',
      icon: UserPlus,
      gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
      glowColor: 'shadow-cyan-500/30',
      stats: '2,500+ Students'
    },
    {
      title: 'Mark Attendance',
      description: 'Real-time facial recognition for instant attendance tracking',
      link: '/attendance',
      icon: Camera,
      gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
      glowColor: 'shadow-emerald-500/30',
      stats: '99.8% Accuracy'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Comprehensive reports and intelligent insights',
      link: '/analytics',
      icon: BarChart3,
      gradient: 'from-indigo-400 via-purple-500 to-blue-600',
      glowColor: 'shadow-indigo-500/30',
      stats: 'Real-time Data'
    }
  ];

  const features = [
    {
      icon: Eye,
      title: 'AI Vision',
      description: 'Advanced computer vision with 99.9% accuracy',
      color: 'cyan',
      metric: '< 0.1s'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Sub-second processing with edge computing',
      color: 'emerald',
      metric: '10K/min'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Military-grade encryption and privacy protection',
      color: 'indigo',
      metric: 'ISO 27001'
    },
    {
      icon: Globe,
      title: 'Global Scale',
      description: 'Cloud infrastructure supporting millions of users',
      color: 'teal',
      metric: '99.99% SLA'
    }
  ];

  // Navigation handler
  const handleNavigation = (path) => {
    navigate(path);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex justify-center items-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin shadow-lg shadow-cyan-400/50"></div>
          <div className="absolute top-2 left-2 w-12 h-12 border-3 border-blue-300 border-t-transparent rounded-full animate-spin animate-reverse"></div>
          <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
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
        {/* Hero Section */}
        <div className="text-center mb-20 pt-16 px-4">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-full mb-8 transform hover:scale-110 hover:rotate-12 transition-all duration-500 shadow-2xl shadow-cyan-500/50 animate-glow">
            <Sparkles className="w-12 h-12 text-white animate-pulse" />
          </div>
          
          <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-6 animate-slideDown leading-tight">
            Next-Gen Face
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Recognition System
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed animate-slideUp">
            Revolutionary AI-powered attendance tracking with military-grade security, 
            real-time analytics, and enterprise scalability
          </p>
          
          {/* System Status */}
          <div className="inline-flex items-center animate-bounceIn">
            {systemStatus?.status === 'healthy' ? (
              <div className="flex items-center bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm text-emerald-300 px-8 py-4 rounded-full border border-emerald-400/30 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-500/20">
                <CheckCircle className="w-6 h-6 mr-3 animate-pulse text-emerald-400" />
                <span className="font-semibold text-lg">System Operational</span>
                <div className="ml-4 px-3 py-1 bg-emerald-400/20 rounded-full text-sm font-medium">
                  99.9% Uptime
                </div>
              </div>
            ) : (
              <div className="flex items-center bg-gradient-to-r from-slate-500/20 to-gray-500/20 backdrop-blur-sm text-slate-300 px-8 py-4 rounded-full border border-slate-400/30 transform hover:scale-105 transition-all duration-300">
                <AlertCircle className="w-6 h-6 mr-3" />
                <span className="font-semibold text-lg">System Maintenance</span>
              </div>
            )}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          {cards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={index}
                className="group cursor-pointer animate-slideUp"
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => handleNavigation(card.link)}
              >
                <div className={`bg-slate-800/40 backdrop-blur-xl rounded-3xl shadow-2xl ${card.glowColor} hover:shadow-2xl transition-all duration-700 p-8 text-center h-full border border-slate-700/50 transform hover:scale-105 hover:-translate-y-3 group-hover:bg-slate-800/60 relative overflow-hidden`}>
                  {/* Card Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                  
                  <div className={`w-20 h-20 bg-gradient-to-r ${card.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl ${card.glowColor} relative z-10`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300 relative z-10">
                    {card.title}
                  </h3>
                  
                  <p className="text-slate-300 mb-6 leading-relaxed group-hover:text-slate-200 transition-colors duration-300 relative z-10">
                    {card.description}
                  </p>

                  <div className="mb-6 relative z-10">
                    <div className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-1">Performance</div>
                    <div className="text-white font-bold text-lg">{card.stats}</div>
                  </div>
                  
                  <div className={`inline-block px-8 py-4 bg-gradient-to-r ${card.gradient} text-white font-semibold rounded-2xl transition-all duration-300 transform group-hover:scale-105 shadow-xl ${card.glowColor} relative z-10 hover:shadow-2xl`}>
                    Launch Dashboard
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Overview */}
        <div className="bg-slate-800/30 backdrop-blur-2xl rounded-3xl shadow-2xl p-12 border border-slate-700/50 transform hover:scale-[1.01] transition-all duration-500 animate-slideUp relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-indigo-500/5 rounded-3xl"></div>
          
          <div className="text-center mb-16 relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-full mb-6 transform hover:scale-110 hover:rotate-12 transition-all duration-500 shadow-2xl shadow-blue-500/50 animate-glow">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4">
              Enterprise-Grade Technology
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Powered by cutting-edge AI and built for mission-critical applications
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              const colorClasses = {
                cyan: 'from-cyan-500/20 to-blue-500/20 border-cyan-400/40 text-cyan-400 shadow-cyan-500/20',
                emerald: 'from-emerald-500/20 to-teal-500/20 border-emerald-400/40 text-emerald-400 shadow-emerald-500/20',
                indigo: 'from-indigo-500/20 to-purple-500/20 border-indigo-400/40 text-indigo-400 shadow-indigo-500/20',
                teal: 'from-teal-500/20 to-cyan-500/20 border-teal-400/40 text-teal-400 shadow-teal-500/20'
              };
              
              return (
                <div 
                  key={index}
                  className="text-center group cursor-pointer animate-fadeIn relative"
                  style={{ animationDelay: `${index * 0.15 + 1}s` }}
                >
                  <div className={`w-20 h-20 bg-gradient-to-r ${colorClasses[feature.color]} rounded-2xl flex items-center justify-center mx-auto mb-6 border transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl backdrop-blur-sm`}>
                    <IconComponent className="w-10 h-10 group-hover:animate-pulse" />
                  </div>
                  
                  <h3 className="font-bold text-white mb-2 text-lg group-hover:text-cyan-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300 mb-3 text-sm">
                    {feature.description}
                  </p>

                  <div className={`inline-block px-3 py-1 bg-gradient-to-r ${colorClasses[feature.color]} backdrop-blur-sm rounded-full text-xs font-semibold border`}>
                    {feature.metric}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-20 pb-12">
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 backdrop-blur-sm rounded-full border border-cyan-400/30 text-cyan-300 font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105">
            <Users className="w-5 h-5 mr-2" />
            Trusted by 10,000+ Organizations Worldwide
          </div>
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
          animation: bounceIn 1.5s ease-out 1.2s forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }

        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
};

export default Home;