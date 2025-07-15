import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Award, 
  Users, 
  BookOpen, 
  MessageCircle,
  GraduationCap,
  Briefcase,
  Shield
} from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/scholarships', label: 'Scholarships', icon: Award },
    { path: '/faculty', label: 'Faculty Hub', icon: Users },
    { path: '/courses', label: 'Course Analyzer', icon: BookOpen },
    { path: '/jobs', label: 'Job Board', icon: Briefcase },
    { path: '/ai-prep', label: 'AI Career Prep', icon: Shield },
    { path: '/ai-assistant', label: 'AI Assistant', icon: MessageCircle },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-8 w-8 text-indigo-600" />
            <h1 className="text-xl font-bold text-gray-900">UniCompass</h1>
          </div>
          
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 