import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  BookOpen, 
  Star, 
  AlertTriangle, 
  CheckCircle,
  GraduationCap,
  Award,
  Users,
  TrendingUp,
  DollarSign,
  Briefcase,
  Bot,
  Info
} from 'lucide-react';
import { CSUSB_FACULTY_DATA } from '../services/dataService';
import { getFacultyPhotoWithFallback } from '../utils/facultyPhotoVerifier';
import SendEmailModal from './SendEmailModal';

const FacultyProfile = () => {
  const { id } = useParams<{ id: string }>();
  const faculty = CSUSB_FACULTY_DATA.find(f => f.id === id);
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  if (!faculty) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Faculty Member Not Found</h1>
          <p className="text-gray-600 mb-6">The faculty member you're looking for doesn't exist.</p>
          <Link 
            to="/faculty" 
            className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Faculty Hub</span>
          </Link>
        </div>
      </div>
    );
  }

  const getDataIndicator = (source: string) => {
    switch (source) {
      case 'real':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', text: 'Verified Data' };
      case 'estimated':
        return { icon: AlertTriangle, color: 'text-yellow-600', bg: 'bg-yellow-50', text: 'Estimated Data' };
      case 'searching':
        return { icon: AlertTriangle, color: 'text-blue-600', bg: 'bg-blue-50', text: 'Searching Public Records' };
      default:
        return { icon: AlertTriangle, color: 'text-gray-600', bg: 'bg-gray-50', text: 'Unknown Source' };
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            to="/faculty" 
            className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Faculty Hub</span>
          </Link>
        </div>

        {/* Faculty Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Faculty Photo */}
            <div className="flex-shrink-0">
              <img 
                src={getFacultyPhotoWithFallback(faculty.name, () => {
                  // Handle photo load error
                  console.warn(`Failed to load photo for ${faculty.name}`);
                })} 
                alt={faculty.name}
                className="w-48 h-48 rounded-lg object-cover shadow-md"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="w-48 h-48 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center hidden">
                <Users className="h-16 w-16 text-indigo-400" />
              </div>
            </div>

            {/* Faculty Information */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{faculty.name}</h1>
                  <p className="text-xl text-gray-600 mb-1">{faculty.title}</p>
                  <p className="text-lg text-indigo-600">{faculty.department}</p>
                </div>
                {faculty.rating && (
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="text-lg font-semibold">{faculty.rating}</span>
                    <div className={`px-2 py-1 rounded-full text-xs ${getDataIndicator(faculty.dataSource.rating).bg}`}>
                      <span className={getDataIndicator(faculty.dataSource.rating).color}>
                        {getDataIndicator(faculty.dataSource.rating).text}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-indigo-600" />
                  <span className="text-gray-700">{faculty.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-indigo-600" />
                  <span className="text-gray-700">(909) 537-{faculty.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-indigo-600" />
                  <span className="text-gray-700">{faculty.office}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-indigo-600" />
                  <span className="text-gray-700">{faculty.officeHours}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button 
                  onClick={() => setEmailModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  <Mail className="h-4 w-4" />
                  <span>Send Email</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  <Clock className="h-4 w-4" />
                  <span>Schedule Meeting</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Faculty Bio */}
        {faculty.bio && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-5 w-5 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-900">Biography</h2>
              <div className={`px-2 py-1 rounded-full text-xs ${getDataIndicator(faculty.dataSource.bio || 'real').bg}`}>
                <span className={getDataIndicator(faculty.dataSource.bio || 'real').color}>
                  {getDataIndicator(faculty.dataSource.bio || 'real').text}
                </span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">{faculty.bio}</p>
          </div>
        )}

        {/* Research Areas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Award className="h-5 w-5 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-900">Research Areas</h2>
            <div className={`px-2 py-1 rounded-full text-xs ${getDataIndicator(faculty.dataSource.research).bg}`}>
              <span className={getDataIndicator(faculty.dataSource.research).color}>
                {getDataIndicator(faculty.dataSource.research).text}
              </span>
            </div>
          </div>
          <p className="text-gray-700">{faculty.research}</p>
        </div>

        {/* Courses Taught */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-900">Courses Taught</h2>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs ${getDataIndicator(faculty.dataSource.courses).bg}`}>
              <span className={getDataIndicator(faculty.dataSource.courses).color}>
                {getDataIndicator(faculty.dataSource.courses).text}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {faculty.courses.map((course) => (
              <div key={course} className="bg-indigo-50 text-indigo-800 px-3 py-2 rounded-lg text-sm font-medium">
                {course}
              </div>
            ))}
          </div>
        </div>

        {/* Career Outcomes */}
        {faculty.careerOutcomes && faculty.careerOutcomes.length > 0 && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-sm border border-green-200 p-6 mb-8">
            <div className="flex items-center space-x-2 mb-6">
              <Briefcase className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900">Career Outcomes</h2>
              <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                High Earning Potential
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              Students who take {faculty.name.split(' ')[0]}'s courses often pursue these rewarding career paths:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {faculty.careerOutcomes.map((outcome, index) => (
                <div key={index} className="bg-white rounded-lg p-5 border border-green-200 hover:shadow-md transition-shadow">
                  {/* Header with Data Source Indicator */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{outcome.title}</h3>
                    <div className={`px-2 py-1 rounded-full text-xs ${getDataIndicator(outcome.dataSource).bg}`}>
                      <span className={getDataIndicator(outcome.dataSource).color}>
                        {getDataIndicator(outcome.dataSource).text}
                      </span>
                    </div>
                  </div>

                  {/* Salary Information */}
                  <div className="mb-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span className="text-lg font-bold text-green-700">{outcome.averageSalary}</span>
                    </div>
                    <p className="text-xs text-gray-500">Source: {outcome.salarySource}</p>
                  </div>

                  {/* Growth Rate */}
                  <div className="mb-3">
                    <div className="flex items-center space-x-1 text-green-600 mb-1">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-medium">{outcome.growthRate} growth</span>
                      <span className="text-xs text-gray-500">({outcome.growthTimeframe})</span>
                    </div>
                    <p className="text-xs text-gray-500">Source: {outcome.growthSource}</p>
                  </div>

                  {/* AI Impact Risk */}
                  <div className="mb-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Bot className="h-4 w-4" />
                      <span className="text-sm font-medium text-gray-700">AI Impact Risk:</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        outcome.aiImpactRisk === 'Low' ? 'bg-green-100 text-green-800' :
                        outcome.aiImpactRisk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {outcome.aiImpactRisk}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{outcome.aiImpactDescription}</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">{outcome.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-green-100 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-900">Why This Matters</span>
              </div>
              <p className="text-sm text-green-800">
                Taking courses with {faculty.name.split(' ')[0]} can significantly boost your earning potential and open doors to high-growth careers. 
                The skills and knowledge gained are directly applicable to these lucrative positions in today's job market.
              </p>
            </div>

            {/* Data Sources and Methodology */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-3">
                <Info className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">Data Sources & AI Impact Analysis</span>
              </div>
              <div className="space-y-2 text-sm text-blue-800">
                <p><strong>Salary Data:</strong> Bureau of Labor Statistics (BLS), industry surveys, and verified compensation platforms.</p>
                <p><strong>Growth Projections:</strong> BLS 10-year outlook (2022-2032) based on economic modeling and industry trends.</p>
                <p><strong>AI Impact Assessment:</strong> Analysis based on current AI capabilities, task automation potential, and human skill requirements.</p>
                <p className="text-xs text-blue-600 mt-2">
                  Data last updated: January 2024. Career outcomes may vary based on location, experience, and market conditions.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Networking Tips */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Networking Tips</h2>
          <p className="text-gray-700 italic">{faculty.networkingTips}</p>
        </div>

        {/* Salary Information */}
        {faculty.salary && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Salary Information</h2>
              <div className={`px-2 py-1 rounded-full text-xs ${getDataIndicator(faculty.dataSource.salary).bg}`}>
                <span className={getDataIndicator(faculty.dataSource.salary).color}>
                  {getDataIndicator(faculty.dataSource.salary).text}
                </span>
              </div>
            </div>
            <p className="text-2xl font-bold text-green-600 mt-2">{faculty.salary}</p>
          </div>
        )}

        {/* Data Source Legend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Data Source Legend</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-700">Verified Data (from CSUSB website)</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm text-gray-700">Estimated Data (placeholder)</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-gray-700">Searching Public Records</span>
            </div>
          </div>
        </div>
      </div>

      {/* Send Email Modal */}
      {emailModalOpen && faculty && (
        <SendEmailModal
          isOpen={emailModalOpen}
          onClose={() => setEmailModalOpen(false)}
          faculty={faculty}
        />
      )}
    </div>
  );
};

export default FacultyProfile; 