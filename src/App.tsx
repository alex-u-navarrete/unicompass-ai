import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ScholarshipTracker from './components/ScholarshipTracker';
import FacultyHub from './components/FacultyHub';
import FacultyProfile from './components/FacultyProfile';
import CourseAnalyzer from './components/CourseAnalyzer';
import JobBoard from './components/JobBoard';
import AICareerPrep from './components/AICareerPrep';
import AIAssistant from './components/AIAssistant';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/scholarships" element={<ScholarshipTracker />} />
            <Route path="/faculty" element={<FacultyHub />} />
            <Route path="/faculty/:id" element={<FacultyProfile />} />
            <Route path="/courses" element={<CourseAnalyzer />} />
            <Route path="/jobs" element={<JobBoard />} />
            <Route path="/ai-prep" element={<AICareerPrep />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 