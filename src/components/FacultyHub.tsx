import React, { useState, useEffect } from 'react';
import { Star, AlertTriangle, CheckCircle, RefreshCw, Users, ExternalLink, Search, X, Mail, TrendingUp, DollarSign, Bot } from 'lucide-react';
import { DataService, AUDITED_CSUSB_FACULTY_DATA, DATA_SOURCES, type FacultyData } from '../services/dataService';
import { getFacultyPhotoWithFallback } from '../utils/facultyPhotoVerifier';
import { Link } from 'react-router-dom';
import SendEmailModal from './SendEmailModal';

const FacultyHub = () => {
  const [faculty, setFaculty] = useState<FacultyData[]>(AUDITED_CSUSB_FACULTY_DATA);
  const [filteredFaculty, setFilteredFaculty] = useState<FacultyData[]>(AUDITED_CSUSB_FACULTY_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dataSources, setDataSources] = useState(DATA_SOURCES);
  const [fetchStatus, setFetchStatus] = useState<'idle' | 'success' | 'error' | 'fetching'>('success');
  const [showTooltip, setShowTooltip] = useState(false);
  const [emailModal, setEmailModal] = useState<{ isOpen: boolean; faculty: FacultyData | null }>({
    isOpen: false,
    faculty: null
  });

  useEffect(() => {
    updateFacultyData();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredFaculty(faculty);
      return;
    }
    const query = searchQuery.toLowerCase();
    const filtered = faculty.filter(professor => {
      if (professor.name.toLowerCase().includes(query)) return true;
      if (professor.title.toLowerCase().includes(query)) return true;
      if (professor.research && professor.research.toLowerCase().includes(query)) return true;
      if (professor.courses.some(course => course.toLowerCase().includes(query))) return true;
      if (professor.department.toLowerCase().includes(query)) return true;
      return false;
    });
    setFilteredFaculty(filtered);
  }, [searchQuery, faculty]);

  const updateFacultyData = async () => {
    setIsLoading(true);
    setFetchStatus('fetching');
    try {
      const updatedFaculty = await DataService.updateFacultyData();
      setFaculty(updatedFaculty);
      setFetchStatus('success');
      setTimeout(() => setFetchStatus('idle'), 2000); // Show checkmark for 2s
      setDataSources(prev => ({
        ...prev,
        FACULTY_SALARIES: { ...prev.FACULTY_SALARIES, status: 'available' },
        COURSE_CATALOG: { ...prev.COURSE_CATALOG, status: 'available' },
        STUDENT_RATINGS: { ...prev.STUDENT_RATINGS, status: 'available' }
      }));
    } catch (error) {
      setFetchStatus('error');
      setTimeout(() => setFetchStatus('idle'), 2000); // Show red X for 2s
      console.log('Using fallback data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const openEmailModal = (faculty: FacultyData) => {
    setEmailModal({ isOpen: true, faculty });
  };

  const closeEmailModal = () => {
    setEmailModal({ isOpen: false, faculty: null });
  };

  const getDataIndicator = (source: string) => {
    switch (source) {
      case 'real':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', text: 'Verified Data' };
      case 'estimated':
        return { icon: AlertTriangle, color: 'text-yellow-600', bg: 'bg-yellow-50', text: 'Estimated Data' };
      case 'searching':
        return { icon: AlertTriangle, color: 'text-blue-600', bg: 'bg-blue-50', text: 'Searching Public Records' };
      case 'not_available':
        return { icon: AlertTriangle, color: 'text-gray-600', bg: 'bg-gray-50', text: 'Not Available' };
      default:
        return { icon: AlertTriangle, color: 'text-gray-600', bg: 'bg-gray-50', text: 'Unknown Source' };
    }
  };

  const renderDataField = (label: string, value: string, source: string) => {
    const indicator = getDataIndicator(source);
    const Icon = indicator.icon;
    return (
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-sm text-gray-600">{value}</p>
        </div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${indicator.bg}`}>
          <Icon className={`h-3 w-3 ${indicator.color}`} />
          <span className={indicator.color}>{indicator.text}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Faculty Hub</h1>
        <p className="text-xl text-gray-600">Connect with CSUSB Accounting & Finance Faculty</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Search Faculty</h2>
          <div className="relative group" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
            <button
              onClick={updateFacultyData}
              disabled={isLoading}
              className="flex items-center space-x-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : fetchStatus === 'success' ? (
                <CheckCircle className="h-4 w-4 text-green-400" />
              ) : fetchStatus === 'error' ? (
                <X className="h-4 w-4 text-red-500" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              <span>{isLoading ? 'Updating...' : 'Refresh Data'}</span>
            </button>
            {showTooltip && (
              <div className="absolute z-10 left-1/2 -translate-x-1/2 mt-2 w-72 bg-white border border-gray-200 shadow-lg rounded-lg p-3 text-sm text-gray-800 animate-fade-in">
                <div className="font-semibold mb-1">Refresh Data</div>
                <div>
                  Fetches the latest faculty data from public sources and updates the list below.<br />
                  Use this if you think something is out of date or want to check for new information.
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-green-700">Up to date</span>
                  <X className="h-4 w-4 text-red-500 ml-3" />
                  <span className="text-xs text-red-700">Last update failed</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search faculty by name, title, research areas, or courses..."
            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        {searchQuery && (
          <div className="mt-3 text-sm text-gray-600">
            Found {filteredFaculty.length} faculty member{filteredFaculty.length !== 1 ? 's' : ''}
            {filteredFaculty.length === 0 && (
              <span className="text-red-600"> - No matches found</span>
            )}
          </div>
        )}
      </div>

      {/* Department Contact Information */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Department Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {renderDataField('Department', 'Accounting and Finance', 'real')}
          {renderDataField('Email', 'acf@csusb.edu', 'real')}
          {renderDataField('Phone', '(909) 537-5704', 'real')}
          {renderDataField('Location', 'JB-459B', 'real')}
        </div>
        <div className="mt-4 p-4 bg-white rounded-lg">
          {renderDataField('Office Hours', 'Monday - Friday: 8:00 am-5:00 pm', 'real')}
        </div>
      </div>

      {/* Faculty Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredFaculty.map((professor) => (
          <div key={professor.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover">
            {/* Faculty Photo and Header */}
            <div className="flex items-start space-x-4 mb-4">
              <div className="flex-shrink-0">
                <img 
                  src={getFacultyPhotoWithFallback(professor.name, () => {
                    // Handle photo load error
                    console.warn(`Failed to load photo for ${professor.name}`);
                  })} 
                  alt={professor.name}
                  className="w-16 h-16 rounded-lg object-cover shadow-sm"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center hidden">
                  <Users className="h-6 w-6 text-indigo-400" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{professor.name}</h3>
                    <p className="text-gray-600">{professor.title}</p>
                    <p className="text-sm text-indigo-600">{professor.department}</p>
                  </div>
                  {professor.rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{professor.rating}</span>
                      <div className={`ml-2 px-2 py-1 rounded-full text-xs ${getDataIndicator(professor.dataSource.rating).bg}`}>
                        <span className={getDataIndicator(professor.dataSource.rating).color}>
                          {getDataIndicator(professor.dataSource.rating).text}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              {renderDataField('Research Areas', professor.research, professor.dataSource.research)}
              {renderDataField('Office Hours', professor.officeHours, professor.dataSource.officeHours)}
              {renderDataField('Office', professor.office, professor.dataSource.office)}
              {renderDataField('Email', professor.email, professor.dataSource.email)}
              {renderDataField('Phone', `(909) 537-${professor.phone}`, professor.dataSource.phone)}
              {professor.salary && renderDataField('Salary', professor.salary, professor.dataSource.salary)}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-900">Courses Taught</p>
                <div className={`px-2 py-1 rounded-full text-xs ${getDataIndicator(professor.dataSource.courses).bg}`}>
                  <span className={getDataIndicator(professor.dataSource.courses).color}>
                    {getDataIndicator(professor.dataSource.courses).text}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {professor.courses.map((course) => (
                  <span key={course} className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                    {course}
                  </span>
                ))}
              </div>
            </div>

            {/* Career Outcomes Preview */}
            {professor.careerOutcomes && professor.careerOutcomes.length > 0 && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <p className="text-sm font-medium text-gray-900">Top Career Outcome</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-green-900">
                      {professor.careerOutcomes[0].title}
                    </span>
                    <span className="text-xs text-green-600 font-medium">
                      {professor.careerOutcomes[0].growthRate} ({professor.careerOutcomes[0].growthTimeframe})
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 mb-2">
                    <DollarSign className="h-3 w-3 text-green-600" />
                    <span className="text-sm font-bold text-green-700">
                      {professor.careerOutcomes[0].averageSalary}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Bot className="h-3 w-3" />
                    <span className="text-xs font-medium">AI Risk:</span>
                    <span className={`text-xs px-1 py-0.5 rounded font-medium ${
                      professor.careerOutcomes[0].aiImpactRisk === 'Low' ? 'bg-green-100 text-green-800' :
                      professor.careerOutcomes[0].aiImpactRisk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {professor.careerOutcomes[0].aiImpactRisk}
                    </span>
                  </div>
                  <p className="text-xs text-green-700">
                    {professor.careerOutcomes[0].description.substring(0, 80)}...
                  </p>
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 pt-4 mt-4">
              <p className="text-sm font-medium text-gray-900 mb-2">Networking Tips</p>
              <p className="text-sm text-gray-600 italic">{professor.networkingTips}</p>
            </div>

            <div className="flex space-x-2 mt-4">
              <Link 
                to={`/faculty/${professor.id}`}
                className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-indigo-700 flex items-center justify-center space-x-2"
              >
                <ExternalLink className="h-4 w-4" />
                <span>View Profile</span>
              </Link>
              <button 
                onClick={() => openEmailModal(professor)}
                className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 flex items-center justify-center space-x-2"
              >
                <Mail className="h-4 w-4" />
                <span>Send Email</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Data Collection Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Data Collection Status</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium text-gray-900">Faculty Names & Contact Info</span>
            </div>
            <span className="text-sm text-green-600">Complete - From CSUSB Website</span>
          </div>
          <div className={`flex items-center justify-between p-4 rounded-lg ${
            dataSources.FACULTY_SALARIES.status === 'available' ? 'bg-green-50' : 'bg-blue-50'
          }`}>
            <div className="flex items-center space-x-3">
              {dataSources.FACULTY_SALARIES.status === 'available' ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-blue-600" />
              )}
              <span className="font-medium text-gray-900">Faculty Salaries</span>
            </div>
            <span className={`text-sm ${
              dataSources.FACULTY_SALARIES.status === 'available' ? 'text-green-600' : 'text-blue-600'
            }`}>
              {dataSources.FACULTY_SALARIES.status === 'available' ? 'Available - Public Records' : 'Searching Public Records'}
            </span>
          </div>
          <div className={`flex items-center justify-between p-4 rounded-lg ${
            dataSources.COURSE_CATALOG.status === 'available' ? 'bg-green-50' : 'bg-yellow-50'
          }`}>
            <div className="flex items-center space-x-3">
              {dataSources.COURSE_CATALOG.status === 'available' ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              )}
              <span className="font-medium text-gray-900">Course Assignments</span>
            </div>
            <span className={`text-sm ${
              dataSources.COURSE_CATALOG.status === 'available' ? 'text-green-600' : 'text-yellow-600'
            }`}>
              {dataSources.COURSE_CATALOG.status === 'available' ? 'Available - Course Catalog' : 'Estimated - Need Course Catalog'}
            </span>
          </div>
          <div className={`flex items-center justify-between p-4 rounded-lg ${
            dataSources.STUDENT_RATINGS.status === 'available' ? 'bg-green-50' : 'bg-yellow-50'
          }`}>
            <div className="flex items-center space-x-3">
              {dataSources.STUDENT_RATINGS.status === 'available' ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              )}
              <span className="font-medium text-gray-900">Student Ratings</span>
            </div>
            <span className={`text-sm ${
              dataSources.STUDENT_RATINGS.status === 'available' ? 'text-green-600' : 'text-yellow-600'
            }`}>
              {dataSources.STUDENT_RATINGS.status === 'available' ? 'Available - Public Ratings' : 'Estimated - Need Public Ratings'}
            </span>
          </div>
        </div>
        
        {/* API Backlog Information */}
        <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Future API Integration</h3>
          <p className="text-sm text-gray-600 mb-3">
            We're working on integrating real-time APIs for more accurate data. Current priorities:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• <strong>Transparent California API:</strong> Real faculty salary data</li>
            <li>• <strong>CSUSB Course Catalog API:</strong> Live course assignments</li>
            <li>• <strong>Student Ratings API:</strong> Aggregated feedback system</li>
            <li>• <strong>Multi-University Support:</strong> Extend to other schools</li>
          </ul>
        </div>
      </div>

      {/* Send Email Modal */}
      {emailModal.isOpen && emailModal.faculty && (
        <SendEmailModal
          isOpen={emailModal.isOpen}
          onClose={closeEmailModal}
          faculty={emailModal.faculty}
        />
      )}
    </div>
  );
};

export default FacultyHub; 