import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  UserPlus, 
  Camera, 
  BarChart3, 
  Menu, 
  X, 
  Sparkles,
  Zap
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Get current route from React Router
  
  const navigation = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
      gradient: 'from-cyan-400 to-blue-500'
    },
    {
      name: 'Register',
      href: '/register',
      icon: UserPlus,
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      name: 'Attendance',
      href: '/attendance',
      icon: Camera,
      gradient: 'from-emerald-400 to-teal-500'
    },
    {
      name: 'Reports',
      href: '/reports',
      icon: BarChart3,
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  const isActive = (path) => location.pathname === path;

  const handleMobileMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-2xl border-b border-slate-700/50 shadow-2xl shadow-black/20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-indigo-400/10 to-purple-500/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center cursor-pointer group">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-2xl mr-3 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50">
                <Sparkles className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:via-blue-300 group-hover:to-indigo-300 transition-all duration-300">
                  FaceSync Pro
                </h1>
                <p className="text-xs text-slate-400 font-medium">AI Attendance System</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navigation.map((item) => {
                const IconComponent = item.icon;
                const active = isActive(item.href);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`relative flex items-center px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 group ${
                      active
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-${item.gradient.split('-')[1]}-500/30`
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50 backdrop-blur-sm'
                    }`}
                  >
                    {/* Active indicator glow */}
                    {active && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-2xl blur opacity-30 animate-pulse`}></div>
                    )}
                    
                    <div className="relative z-10 flex items-center">
                      <IconComponent className={`w-4 h-4 mr-2 ${active ? 'animate-pulse' : 'group-hover:animate-pulse'}`} />
                      {item.name}
                    </div>

                    {/* Hover effect */}
                    {!active && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    )}
                  </Link>
                );
              })}

              {/* Status Indicator */}
              <div className="flex items-center ml-6 px-4 py-2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-full">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse mr-2"></div>
                <span className="text-emerald-300 text-xs font-semibold">Online</span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 bg-slate-800/50 backdrop-blur-sm text-slate-300 rounded-xl hover:bg-slate-700/50 hover:text-white transition-all duration-300 border border-slate-600/50"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          ></div>

          {/* Menu Panel */}
          <div className="fixed top-20 right-4 left-4 bg-slate-900/95 backdrop-blur-2xl border border-slate-700/50 rounded-3xl shadow-2xl shadow-black/50 p-6 animate-slideDown">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-indigo-500/5 rounded-3xl"></div>
            
            <div className="relative z-10 space-y-3">
              {navigation.map((item) => {
                const IconComponent = item.icon;
                const active = isActive(item.href);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={handleMobileMenuClose}
                    className={`w-full flex items-center px-6 py-4 rounded-2xl text-left font-semibold transition-all duration-300 group ${
                      active
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-10 h-10 rounded-xl mr-4 ${
                      active 
                        ? 'bg-white/20' 
                        : `bg-gradient-to-r ${item.gradient} opacity-80 group-hover:opacity-100`
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    
                    <div>
                      <div className="text-base">{item.name}</div>
                      <div className="text-xs opacity-70">
                        {item.name === 'Home' && 'Dashboard & Overview'}
                        {item.name === 'Register' && 'Add New Students'}
                        {item.name === 'Attendance' && 'Mark Attendance'}
                        {item.name === 'Reports' && 'Analytics & Reports'}
                      </div>
                    </div>

                    {active && (
                      <div className="ml-auto">
                        <Zap className="w-4 h-4 animate-pulse" />
                      </div>
                    )}
                  </Link>
                );
              })}

              {/* Mobile Status */}
              <div className="pt-4 border-t border-slate-700/50">
                <div className="flex items-center justify-between px-6 py-3 bg-emerald-500/10 backdrop-blur-sm border border-emerald-400/20 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse mr-3"></div>
                    <span className="text-emerald-300 font-semibold">System Status</span>
                  </div>
                  <span className="text-emerald-400 text-sm font-bold">Operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-20"></div>

      <style jsx>{`
        @keyframes slideDown {
          from { 
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Header;