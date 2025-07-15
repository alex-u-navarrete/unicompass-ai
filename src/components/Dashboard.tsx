import React, { useState } from 'react';
import { TrendingUp, Users, Award, MessageCircle, BookOpen, Calendar, AlertCircle, CheckCircle, Clock, Target, Briefcase, Bell, User, Phone, Mail, ExternalLink, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppointmentModal from './AppointmentModal';
import CareerPreferenceModal, { type CareerPreferences } from './CareerPreferenceModal';

const Dashboard = () => {
  const [currentYear, setCurrentYear] = useState<'Freshman' | 'Sophomore' | 'Junior' | 'Senior'>('Junior');
  const [dismissedReminders, setDismissedReminders] = useState<string[]>([]);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showPreferenceModal, setShowPreferenceModal] = useState(false);
  const [careerPreferences, setCareerPreferences] = useState<CareerPreferences | null>(null);

  // Academic Timeline Data for Finance Students
  const getYearlyAdvice = (year: string, preferences?: CareerPreferences | null) => {
    switch (year) {
      case 'Freshman':
        return {
          priorities: [
            'Focus on GPA (aim for 3.5+)',
            'Join Finance Club and accounting organizations',
            'Start networking with faculty',
            'Explore different finance career paths'
          ],
          deadlines: [
            { task: 'Summer internship applications', date: 'January-March', type: 'internship' },
            { task: 'FAFSA renewal', date: 'October 1', type: 'financial' },
            { task: 'Course registration for next year', date: 'November', type: 'academic' }
          ],
          certifications: [
            'Consider Excel certifications',
            'Bloomberg Market Concepts (BMC) - Free',
            'QuickBooks certification for accounting'
          ],
          advice: 'Build a strong foundation. Your freshman year GPA is crucial for internship applications next year.'
        };
      case 'Sophomore':
        return {
          priorities: [
            'Apply for summer internships aggressively',
            'Consider adding a minor (Economics, Math, or Data Analytics)',
            'Start building professional network',
            'Attend career fairs and finance events'
          ],
          deadlines: [
            { task: 'Summer internship applications', date: 'October-February', type: 'internship' },
            { task: 'Study abroad applications', date: 'March', type: 'academic' },
            { task: 'Leadership position applications', date: 'April', type: 'extracurricular' }
          ],
          certifications: [
            'Start CFA Level 1 preparation',
            'Financial modeling courses (Wall Street Prep)',
            'Industry-specific certifications'
          ],
          advice: 'This is your prime internship application year. Apply to 20+ programs and network actively.'
        };
      case 'Junior':
        return {
          priorities: [
            'Secure summer internship (critical for full-time offers)',
            'Start preparing for post-graduation (jobs vs. grad school)',
            'Network with alumni in target companies',
            'Consider leadership roles in student organizations'
          ],
          deadlines: [
            { task: 'Full-time job applications begin', date: 'August-September', type: 'career' },
            { task: 'Graduate school applications', date: 'December-January', type: 'academic' },
            { task: 'LSAT registration (if law school)', date: 'June/October', type: 'exam' },
            { task: 'CFA Level 1 exam', date: 'February/May/August/November', type: 'certification' }
          ],
          certifications: [
            'CFA Level 1 (schedule during junior/senior year)',
            'Series 7 & 66 (if going into financial advisory)',
            'Advanced Excel and financial modeling'
          ],
          advice: 'Critical year for securing your future. Your summer internship performance can lead to full-time offers.'
        };
      case 'Senior':
        return {
          priorities: [
            'Full-time job applications and interviews',
            'Convert internship to full-time offer',
            'Network for backup opportunities',
            'Complete capstone projects and maintain GPA'
          ],
          deadlines: [
            { task: 'Full-time job applications', date: 'August-December', type: 'career' },
            { task: 'CPA exam applications', date: 'After graduation', type: 'certification' },
            { task: 'Graduate school final decisions', date: 'April 30', type: 'academic' },
            { task: 'LSAT for next year law school', date: 'June', type: 'exam' }
          ],
          certifications: [
            'CFA Level 2 (after graduation)',
            'CPA exam (if accounting focus)',
            'Industry-specific licenses'
          ],
          advice: 'Focus on converting opportunities into offers. Have backup plans and continue networking until you sign an offer.'
        };
      default:
        return {
          priorities: [],
          deadlines: [],
          certifications: [],
          advice: ''
        };
    }
  };

  const counselorReminders = [
    {
      id: 'appointment-overdue',
      type: 'urgent',
      message: 'Schedule your academic planning appointment - it\'s been 3 months since your last visit',
      action: 'Schedule Now',
      dismissed: false
    },
    {
      id: 'career-planning',
      type: 'info',
      message: 'Career counselors can help with internship applications and interview prep',
      action: 'Learn More',
      dismissed: false
    },
    {
      id: 'graduation-check',
      type: 'warning',
      message: 'Junior/Senior: Schedule graduation requirements check with academic advisor',
      action: 'Book Appointment',
      dismissed: false
    }
  ];

  const dismissReminder = (id: string) => {
    setDismissedReminders([...dismissedReminders, id]);
  };

  const scheduleAppointment = () => {
    setShowAppointmentModal(true);
  };

  const handleSavePreferences = (preferences: CareerPreferences) => {
    setCareerPreferences(preferences);
    setShowPreferenceModal(false);
  };

  const yearlyAdvice = getYearlyAdvice(currentYear, careerPreferences);



  const topCareers = [
    {
      title: 'Financial Analyst',
      averageSalary: '$65,000 - $95,000',
      growthRate: '+6% (2023-2033)',
      description: 'Analyze financial data and investment opportunities for corporations and investment firms.',
      aiRisk: 'Medium',
      demand: 'High'
    },
    {
      title: 'Investment Banking Analyst',
      averageSalary: '$85,000 - $150,000',
      growthRate: '+10% (2023-2033)',
      description: 'Support investment transactions, conduct financial modeling, and assist with client relationships.',
      aiRisk: 'Low',
      demand: 'High'
    },
    {
      title: 'Corporate Finance Manager',
      averageSalary: '$95,000 - $140,000',
      growthRate: '+8% (2023-2033)',
      description: 'Oversee company financial planning, budgeting, and strategic financial decisions.',
      aiRisk: 'Low',
      demand: 'High'
    },
    {
      title: 'Financial Planner',
      averageSalary: '$60,000 - $120,000',
      growthRate: '+13% (2023-2033)',
      description: 'Help individuals and families achieve their financial goals through comprehensive planning.',
      aiRisk: 'Low',
      demand: 'Very High'
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Very High': return 'bg-green-100 text-green-800';
      case 'High': return 'bg-blue-100 text-blue-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDeadlineColor = (type: string) => {
    switch (type) {
      case 'internship': return 'bg-blue-100 text-blue-800';
      case 'career': return 'bg-green-100 text-green-800';
      case 'exam': return 'bg-purple-100 text-purple-800';
      case 'certification': return 'bg-orange-100 text-orange-800';
      case 'academic': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Finance Student Dashboard</h1>
        <p className="text-xl text-gray-600">Your personalized guide to academic and career success</p>
      </div>

      {/* Counselor Reminders */}
      <div className="space-y-4">
        {counselorReminders
          .filter(reminder => !dismissedReminders.includes(reminder.id))
          .map((reminder) => (
            <div
              key={reminder.id}
              className={`p-4 rounded-lg border-l-4 ${
                reminder.type === 'urgent' ? 'bg-red-50 border-red-400' :
                reminder.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                'bg-blue-50 border-blue-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className={`h-5 w-5 ${
                    reminder.type === 'urgent' ? 'text-red-600' :
                    reminder.type === 'warning' ? 'text-yellow-600' :
                    'text-blue-600'
                  }`} />
                  <p className={`font-medium ${
                    reminder.type === 'urgent' ? 'text-red-800' :
                    reminder.type === 'warning' ? 'text-yellow-800' :
                    'text-blue-800'
                  }`}>
                    {reminder.message}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={scheduleAppointment}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      reminder.type === 'urgent' ? 'bg-red-600 hover:bg-red-700 text-white' :
                      reminder.type === 'warning' ? 'bg-yellow-600 hover:bg-yellow-700 text-white' :
                      'bg-blue-600 hover:bg-blue-700 text-white'
                    } transition-colors`}
                  >
                    {reminder.action}
                  </button>
                  <button
                    onClick={() => dismissReminder(reminder.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Academic Timeline & Year Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-indigo-600" />
            <span>Academic Timeline & Priorities</span>
          </h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowPreferenceModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span>Customize Path</span>
            </button>
            <div className="flex space-x-2">
              {(['Freshman', 'Sophomore', 'Junior', 'Senior'] as const).map((year) => (
                <button
                  key={year}
                  onClick={() => setCurrentYear(year)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentYear === year
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Career Preferences Display */}
        {careerPreferences && (
          <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-2">Your Career Path</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {careerPreferences.careerGoals.slice(0, 3).map((goal, index) => (
                <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">
                  {goal.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              ))}
              {careerPreferences.graduateSchool && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">Graduate School</span>
              )}
            </div>
            <p className="text-purple-700 text-sm">Timeline customized based on your preferences</p>
          </div>
        )}

        {/* Current Year Advice */}
        <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
          <h3 className="font-semibold text-indigo-900 mb-2">{currentYear} Year Focus</h3>
          <p className="text-indigo-800">{yearlyAdvice.advice}</p>
          {!careerPreferences && (
            <div className="mt-3 pt-3 border-t border-indigo-200">
              <p className="text-indigo-700 text-sm mb-2">💡 Get personalized recommendations:</p>
              <button
                onClick={() => setShowPreferenceModal(true)}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium underline"
              >
                Set up your career preferences →
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Priorities */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <span>Key Priorities</span>
            </h3>
            <div className="space-y-2">
              {yearlyAdvice.priorities.map((priority, idx) => (
                <div key={idx} className="flex items-start space-x-2 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-green-800">{priority}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Important Deadlines */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Clock className="h-5 w-5 text-red-600" />
              <span>Important Deadlines</span>
            </h3>
            <div className="space-y-3">
              {yearlyAdvice.deadlines.map((deadline, idx) => (
                <div key={idx} className="p-3 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900 text-sm">{deadline.task}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDeadlineColor(deadline.type)}`}>
                      {deadline.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <AlertCircle className="h-3 w-3 text-red-500" />
                    <span className="text-xs text-red-600 font-medium">{deadline.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Prep */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Award className="h-5 w-5 text-purple-600" />
              <span>Certifications & Prep</span>
            </h3>
            <div className="space-y-2">
              {yearlyAdvice.certifications.map((cert, idx) => (
                <div key={idx} className="p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm text-purple-800">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Academic Advisor Contact */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl shadow-sm border border-indigo-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center space-x-2">
              <User className="h-6 w-6 text-indigo-600" />
              <span>Academic & Career Counseling</span>
            </h2>
            <p className="text-gray-600 mb-4">
              Stay connected with your academic advisors and career counselors for personalized guidance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-indigo-600" />
                <span>Academic Advising: (909) 537-5037</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-indigo-600" />
                <span>advising@csusb.edu</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-purple-600" />
                <span>Career Center: (909) 537-5250</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-purple-600" />
                <span>career@csusb.edu</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <button
              onClick={scheduleAppointment}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Calendar className="h-4 w-4" />
              <span>Schedule Appointment</span>
              <ExternalLink className="h-3 w-3" />
            </button>
            <button
              onClick={() => window.open('https://www.csusb.edu/student-success/academic-advising', '_blank')}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Advising Resources</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-gray-900">Job Growth</h3>
          <p className="text-2xl font-bold text-green-600">+8.5%</p>
          <p className="text-sm text-gray-500">Finance sector (2023-2033)</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-gray-900">Network</h3>
          <p className="text-2xl font-bold text-blue-600">500+</p>
          <p className="text-sm text-gray-500">CSUSB Finance Alumni</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-gray-900">Avg Salary</h3>
          <p className="text-2xl font-bold text-purple-600">$75K</p>
          <p className="text-sm text-gray-500">Starting salary</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <MessageCircle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-gray-900">Support</h3>
          <p className="text-2xl font-bold text-orange-600">24/7</p>
          <p className="text-sm text-gray-500">Academic resources</p>
        </div>
      </div>

      {/* Career Outcomes Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-sm border border-green-200 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Briefcase className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">Top Career Paths for Finance Majors</h2>
          <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            High Earning Potential
          </div>
        </div>
        <p className="text-gray-600 mb-6">
          Based on your Finance major at CSUSB, here are the most promising career opportunities with salary expectations and AI impact analysis:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topCareers.map((career, index) => (
            <div key={index} className="bg-white rounded-lg p-5 border border-green-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{career.title}</h3>
                <div className="flex flex-col items-end space-y-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(career.aiRisk)}`}>
                    AI Risk: {career.aiRisk}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDemandColor(career.demand)}`}>
                    Demand: {career.demand}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Salary: {career.averageSalary}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Growth: {career.growthRate}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600">{career.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <BookOpen className="h-8 w-8 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Course Planning</h3>
          <p className="text-gray-600 mb-4">Plan your academic journey with our course analyzer</p>
          <Link to="/courses" className="block w-full">
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
              Analyze Courses
            </button>
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <Users className="h-8 w-8 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Faculty Network</h3>
          <p className="text-gray-600 mb-4">Connect with professors and build professional relationships</p>
          <Link to="/faculty" className="block w-full">
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
              Explore Faculty
            </button>
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <MessageCircle className="h-8 w-8 text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Assistant</h3>
          <p className="text-gray-600 mb-4">Get personalized advice for your academic journey</p>
          <Link to="/ai-assistant" className="block w-full">
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
              Chat Now
            </button>
          </Link>
        </div>
      </div>

      {/* Modals */}
      <AppointmentModal
        isOpen={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
        currentYear={currentYear}
      />
      
      <CareerPreferenceModal
        isOpen={showPreferenceModal}
        onClose={() => setShowPreferenceModal(false)}
        onSave={handleSavePreferences}
        currentPreferences={careerPreferences || undefined}
      />
    </div>
  );
};

export default Dashboard; 