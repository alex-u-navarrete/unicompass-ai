import React, { useState } from 'react';
import { TrendingUp, Users, Target, CheckCircle, AlertTriangle, Book, Globe, Award, Lightbulb, ExternalLink, Search, Calendar, Clock, Bell, User } from 'lucide-react';
import { CSUSB_COURSE_DATA, type CourseData } from '../services/dataService';
import AppointmentModal from './AppointmentModal';

const CourseAnalyzer = () => {
  const [selectedCareer, setSelectedCareer] = useState<string>('all');
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [courses] = useState<CourseData[]>(CSUSB_COURSE_DATA);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  // Academic reminders for Finance students
  const academicReminders = [
    {
      id: 'cfa-deadline',
      title: 'CFA Level 1 Registration',
      description: 'Register for CFA Level 1 exam - Early bird pricing ends soon',
      deadline: 'Next deadline: November window',
      type: 'certification',
      urgency: 'medium',
      action: 'Register Now'
    },
    {
      id: 'internship-apps',
      title: 'Summer Internship Applications',
      description: 'Major finance firms start accepting applications',
      deadline: 'Applications open: October-February',
      type: 'career',
      urgency: 'high',
      action: 'Start Applying'
    },
    {
      id: 'lsat-prep',
      title: 'LSAT Preparation',
      description: 'If considering law school, start LSAT prep 3-6 months early',
      deadline: 'Next test: June & October',
      type: 'exam',
      urgency: 'low',
      action: 'Learn More'
    },
    {
      id: 'academic-advisor',
      title: 'Academic Planning Meeting',
      description: 'Schedule semester planning with your academic advisor',
      deadline: 'Recommended: Every semester',
      type: 'advising',
      urgency: 'medium',
      action: 'Schedule'
    }
  ];

  const certificationTimeline = [
    {
      career: 'Investment Banking',
      certifications: ['CFA Level 1 (Junior Year)', 'Financial Modeling (Summer)', 'Series 7 (Post-Graduation)'],
      timeline: 'Start CFA prep junior year, complete Level 1 before graduation'
    },
    {
      career: 'Public Accounting',
      certifications: ['CPA (Post-Graduation)', 'QuickBooks (Sophomore)', 'Excel Advanced (Junior)'],
      timeline: 'Plan CPA exam timeline - need 150 credit hours'
    },
    {
      career: 'Financial Planning',
      certifications: ['CFP (Post-Graduation)', 'Series 7 & 66 (Senior Year)', 'Insurance License'],
      timeline: 'Get Series licenses during senior year for immediate employment'
    },
    {
      career: 'Corporate Finance',
      certifications: ['CFA (Optional)', 'Financial Modeling', 'Excel Expert'],
      timeline: 'Focus on technical skills and networking over certifications'
    }
  ];

  const getDataIndicator = (source: string) => {
    switch (source) {
      case 'real':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', text: 'Verified CSUSB Data' };
      case 'estimated':
        return { icon: AlertTriangle, color: 'text-yellow-600', bg: 'bg-yellow-50', text: 'Estimated Data' };
      default:
        return { icon: AlertTriangle, color: 'text-gray-600', bg: 'bg-gray-50', text: 'Unknown Source' };
    }
  };

  const careerPaths = [
    'Public Accounting', 'Corporate Finance', 'Investment Banking', 'Portfolio Management', 
    'Asset Management', 'Financial Planning', 'Risk Management', 'Banking', 'Real Estate Finance', 
    'Tax Accounting', 'Management Accounting', 'Auditing', 'Financial Analysis'
  ];

  // Enhanced filtering logic that includes search functionality
  const filteredCourses = courses.filter(course => {
    // Career path filter
    const matchesCareer = selectedCareer === 'all' || course.careerPaths.includes(selectedCareer);
    
    // Search filter
    const matchesSearch = searchQuery === '' || 
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.careerPaths.some(path => path.toLowerCase().includes(searchQuery.toLowerCase())) ||
      course.whyStudyThis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.careerPreparation.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCareer && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReminderColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-50 border-red-200 text-red-800';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'low': return 'bg-blue-50 border-blue-200 text-blue-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const openResource = (url: string) => {
    window.open(url, '_blank');
  };

  const clearFilters = () => {
    setSelectedCareer('all');
    setSearchQuery('');
    setSelectedCourse(null);
  };

  const scheduleAppointment = () => {
    setShowAppointmentModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Analyzer</h1>
        <p className="text-xl text-gray-600">CSUSB Accounting & Finance Curriculum Guide</p>
        <p className="text-sm text-gray-500 mt-2">Real course data from CSUSB catalog with career preparation insights</p>
      </div>

      {/* Academic Reminders & Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <Bell className="h-6 w-6 text-indigo-600" />
          <span>Academic Timeline & Important Deadlines</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Academic Reminders */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Upcoming Deadlines & Actions</h3>
            <div className="space-y-3">
              {academicReminders.map((reminder) => (
                <div key={reminder.id} className={`p-3 rounded-lg border ${getReminderColor(reminder.urgency)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{reminder.title}</h4>
                      <p className="text-xs mt-1">{reminder.description}</p>
                      <div className="flex items-center space-x-1 mt-2">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs font-medium">{reminder.deadline}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (reminder.id === 'academic-advisor') scheduleAppointment();
                        else if (reminder.id === 'cfa-deadline') openResource('https://www.cfainstitute.org/en/programs/cfa/exam');
                        else if (reminder.id === 'lsat-prep') openResource('https://www.lsac.org/lsat');
                        else openResource('https://www.csusb.edu/career-center');
                      }}
                      className="px-3 py-1 bg-white border border-gray-300 rounded text-xs hover:bg-gray-50 transition-colors"
                    >
                      {reminder.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certification Timeline by Career */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Certification Timeline by Career Path</h3>
            <div className="space-y-3">
              {certificationTimeline.map((item, idx) => (
                <div key={idx} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-900 text-sm mb-2">{item.career}</h4>
                  <div className="space-y-1 mb-2">
                    {item.certifications.map((cert, certIdx) => (
                      <span key={certIdx} className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded mr-1 mb-1">
                        {cert}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-purple-700">{item.timeline}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Contact Academic Advisor */}
        <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-indigo-600" />
              <div>
                <h3 className="font-medium text-indigo-900">Need Academic Planning Help?</h3>
                <p className="text-sm text-indigo-700">Schedule a meeting with your academic advisor to discuss course sequencing and certification timelines.</p>
              </div>
            </div>
            <button
              onClick={scheduleAppointment}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Calendar className="h-4 w-4" />
              <span>Schedule Meeting</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses by code, name, keywords, or career path..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {(searchQuery || selectedCareer !== 'all') && (
            <button
              onClick={clearFilters}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
        
        {/* Search Results Summary */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {searchQuery && (
              <span>
                Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} 
                {searchQuery && ` matching "${searchQuery}"`}
                {selectedCareer !== 'all' && ` in ${selectedCareer}`}
              </span>
            )}
            {!searchQuery && selectedCareer === 'all' && (
              <span>Showing all {filteredCourses.length} courses</span>
            )}
            {!searchQuery && selectedCareer !== 'all' && (
              <span>Showing {filteredCourses.length} courses in {selectedCareer}</span>
            )}
          </div>
          
          {/* Quick Search Suggestions */}
          {!searchQuery && (
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Quick search:</span>
              {['FIN', 'ACCT', 'CPA', 'Investment', 'Tax'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setSearchQuery(suggestion)}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Career Path Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Filter by Career Path</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCareer('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCareer === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Courses ({courses.length})
          </button>
          {careerPaths.map((career) => {
            const count = courses.filter(course => course.careerPaths.includes(career)).length;
            return (
              <button
                key={career}
                onClick={() => setSelectedCareer(career)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCareer === career
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {career} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* No Results Message */}
      {filteredCourses.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600 mb-4">
            No courses match your current search criteria. Try adjusting your search terms or filters.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Courses Grid */}
      {filteredCourses.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCourses.map((course) => {
            const dataIndicator = getDataIndicator(course.dataSource);
            const DataIcon = dataIndicator.icon;
            
            return (
              <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xl font-bold text-indigo-600">{course.code}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                        {course.difficulty}
                      </span>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${dataIndicator.bg}`}>
                        <DataIcon className={`h-3 w-3 ${dataIndicator.color}`} />
                        <span className={dataIndicator.color}>{dataIndicator.text}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{course.credits} Credits</div>
                    <div className="text-sm font-semibold text-green-600">{course.salaryImpact}</div>
                  </div>
                </div>

                {/* Why Study This */}
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-900">Why Study This?</span>
                  </div>
                  <p className="text-sm text-blue-800">{course.whyStudyThis}</p>
                </div>

                {/* Course Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Prerequisites:</h4>
                    <div className="space-y-1">
                      {course.prerequisites.length > 0 ? (
                        course.prerequisites.map((prereq, idx) => (
                          <span key={idx} className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded mr-1 mb-1">
                            {prereq}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">None</span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Career Paths:</h4>
                    <div className="space-y-1">
                      {course.careerPaths.map((path, idx) => (
                        <span key={idx} className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded mr-1 mb-1">
                          {path}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => setSelectedCourse(selectedCourse?.id === course.id ? null : course)}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {selectedCourse?.id === course.id ? 'Hide Details' : 'View Career Preparation Guide'}
                </button>

                {/* Expanded Details */}
                {selectedCourse?.id === course.id && (
                  <div className="mt-4 space-y-4 border-t border-gray-200 pt-4">
                    {/* Career Preparation */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                        <Target className="h-4 w-4 text-green-600" />
                        <span>Career Preparation</span>
                      </h4>
                      <p className="text-sm text-gray-700">{course.careerPreparation}</p>
                    </div>

                    {/* Real World Applications */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-blue-600" />
                        <span>Real-World Applications</span>
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {course.realWorldApplications.map((app, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>{app}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recommended Resources */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Books */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                          <Book className="h-4 w-4 text-purple-600" />
                          <span>Recommended Books</span>
                        </h4>
                        <div className="space-y-2">
                          {course.recommendedResources.books.map((book, idx) => (
                            <button
                              key={idx}
                              onClick={() => openResource(`https://www.amazon.com/s?k=${encodeURIComponent(book)}`)}
                              className="block w-full text-left p-2 bg-purple-50 hover:bg-purple-100 rounded text-xs text-purple-800 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <span>{book}</span>
                                <ExternalLink className="h-3 w-3" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Websites */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                          <Globe className="h-4 w-4 text-green-600" />
                          <span>Learning Websites</span>
                        </h4>
                        <div className="space-y-2">
                          {course.recommendedResources.websites.map((website, idx) => (
                            <button
                              key={idx}
                              onClick={() => openResource(`https://www.google.com/search?q=${encodeURIComponent(website)}`)}
                              className="block w-full text-left p-2 bg-green-50 hover:bg-green-100 rounded text-xs text-green-800 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <span>{website}</span>
                                <ExternalLink className="h-3 w-3" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Certifications */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                          <Award className="h-4 w-4 text-orange-600" />
                          <span>Relevant Certifications</span>
                        </h4>
                        <div className="space-y-2">
                          {course.recommendedResources.certifications.map((cert, idx) => (
                            <button
                              key={idx}
                              onClick={() => openResource(`https://www.google.com/search?q=${encodeURIComponent(cert + ' certification requirements')}`)}
                              className="block w-full text-left p-2 bg-orange-50 hover:bg-orange-100 rounded text-xs text-orange-800 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <span>{cert}</span>
                                <ExternalLink className="h-3 w-3" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Summary Statistics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Curriculum Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Total Courses</h3>
            <p className="text-2xl font-bold text-blue-600">{courses.length}</p>
            <p className="text-xs text-gray-500 mt-1">Accounting & Finance</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Real CSUSB Data</h3>
            <p className="text-2xl font-bold text-green-600">{courses.filter(c => c.dataSource === 'real').length}</p>
            <p className="text-xs text-gray-500 mt-1">Verified courses</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Career Paths</h3>
            <p className="text-2xl font-bold text-purple-600">{careerPaths.length}</p>
            <p className="text-xs text-gray-500 mt-1">Different specializations</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
            <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Filtered Results</h3>
            <p className="text-2xl font-bold text-orange-600">{filteredCourses.length}</p>
            <p className="text-xs text-gray-500 mt-1">Currently showing</p>
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
      />
    </div>
  );
};

export default CourseAnalyzer; 