import React, { useState, useEffect } from 'react';
import { X, Target, GraduationCap, Briefcase, TrendingUp, CheckCircle } from 'lucide-react';

interface CareerPreferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (preferences: CareerPreferences) => void;
  currentPreferences?: CareerPreferences;
}

export interface CareerPreferences {
  careerGoals: string[];
  graduateSchool: boolean;
  certifications: string[];
  timeframe: '2-years' | '4-years' | '5-plus-years';
  priorities: string[];
}

const ANIMATION_DURATION = 200;

const CareerPreferenceModal: React.FC<CareerPreferenceModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave,
  currentPreferences 
}) => {
  const [careerGoals, setCareerGoals] = useState<string[]>([]);
  const [graduateSchool, setGraduateSchool] = useState(false);
  const [certifications, setCertifications] = useState<string[]>([]);
  const [timeframe, setTimeframe] = useState<'2-years' | '4-years' | '5-plus-years'>('4-years');
  const [priorities, setPriorities] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);

  // Initialize with current preferences if provided
  useEffect(() => {
    if (currentPreferences) {
      setCareerGoals(currentPreferences.careerGoals);
      setGraduateSchool(currentPreferences.graduateSchool);
      setCertifications(currentPreferences.certifications);
      setTimeframe(currentPreferences.timeframe);
      setPriorities(currentPreferences.priorities);
    }
  }, [currentPreferences]);

  // Handle mounting/unmounting for animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
      setTimeout(() => setShouldRender(false), ANIMATION_DURATION);
    }
  }, [isOpen]);

  const careerGoalOptions = [
    { id: 'finance-traditional', label: 'Traditional Finance Roles', description: 'Financial analyst, banking, corporate finance' },
    { id: 'investment-banking', label: 'Investment Banking', description: 'Wall Street, high-pressure, high-reward environment' },
    { id: 'wealth-management', label: 'Wealth Management', description: 'Financial planning, client relationships' },
    { id: 'corporate-finance', label: 'Corporate Finance', description: 'Work within companies on financial strategy' },
    { id: 'accounting', label: 'Public Accounting', description: 'CPA track, auditing, tax preparation' },
    { id: 'law-school', label: 'Law School Preparation', description: 'Financial law, corporate law' },
    { id: 'entrepreneurship', label: 'Entrepreneurship', description: 'Start your own business or consulting' },
    { id: 'government', label: 'Government/Non-Profit', description: 'Public sector financial roles' }
  ];

  const certificationOptions = [
    { id: 'cfa', label: 'CFA (Chartered Financial Analyst)', description: 'Investment analysis and portfolio management' },
    { id: 'cpa', label: 'CPA (Certified Public Accountant)', description: 'Accounting and auditing certification' },
    { id: 'frm', label: 'FRM (Financial Risk Manager)', description: 'Risk management specialization' },
    { id: 'cfp', label: 'CFP (Certified Financial Planner)', description: 'Financial planning certification' },
    { id: 'series-7', label: 'Series 7 & 66', description: 'Securities licensing for brokers' },
    { id: 'pmp', label: 'PMP (Project Management)', description: 'Project management certification' },
    { id: 'none', label: 'No Certifications Planned', description: 'Focus on experience and networking' }
  ];

  const priorityOptions = [
    { id: 'high-salary', label: 'High Starting Salary', description: 'Maximize earning potential immediately' },
    { id: 'work-life-balance', label: 'Work-Life Balance', description: 'Reasonable hours and flexibility' },
    { id: 'career-growth', label: 'Rapid Career Growth', description: 'Quick advancement opportunities' },
    { id: 'job-security', label: 'Job Security', description: 'Stable, recession-proof careers' },
    { id: 'location-flexibility', label: 'Location Flexibility', description: 'Remote work or multiple location options' },
    { id: 'meaningful-work', label: 'Meaningful Impact', description: 'Work that makes a difference' },
    { id: 'learning-development', label: 'Continuous Learning', description: 'Ongoing skill development and training' },
    { id: 'networking', label: 'Professional Networking', description: 'Building valuable industry connections' }
  ];

  const handleToggleSelection = (
    value: string, 
    currentArray: string[], 
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (currentArray.includes(value)) {
      setter(currentArray.filter(item => item !== value));
    } else {
      setter([...currentArray, value]);
    }
  };

  const handleSave = () => {
    const preferences: CareerPreferences = {
      careerGoals,
      graduateSchool,
      certifications,
      timeframe,
      priorities
    };
    onSave(preferences);
    handleClose();
  };

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose();
    }, ANIMATION_DURATION);
  };

  const isComplete = careerGoals.length > 0 && priorities.length > 0;

  if (!shouldRender) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-${ANIMATION_DURATION} ${show ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className={`relative bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-${ANIMATION_DURATION} ${show ? 'scale-100' : 'scale-95'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Target className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900">Customize Your Academic Path</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Career Goals */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              <span>What are your career interests? (Select all that apply)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {careerGoalOptions.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => handleToggleSelection(goal.id, careerGoals, setCareerGoals)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    careerGoals.includes(goal.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{goal.label}</span>
                    {careerGoals.includes(goal.id) && (
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{goal.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Graduate School */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-purple-600" />
              <span>Graduate School Plans</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setGraduateSchool(false)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  !graduateSchool
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Enter Workforce After Bachelor's</span>
                  {!graduateSchool && <CheckCircle className="h-5 w-5 text-green-600" />}
                </div>
                <p className="text-sm text-gray-600">Start your career immediately with a 4-year degree</p>
              </button>
              <button
                onClick={() => setGraduateSchool(true)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  graduateSchool
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Pursue Graduate School</span>
                  {graduateSchool && <CheckCircle className="h-5 w-5 text-purple-600" />}
                </div>
                <p className="text-sm text-gray-600">MBA, Master's, Law School, or other advanced degrees</p>
              </button>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <span>Professional Certifications of Interest</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {certificationOptions.map((cert) => (
                <button
                  key={cert.id}
                  onClick={() => handleToggleSelection(cert.id, certifications, setCertifications)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    certifications.includes(cert.id)
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{cert.label}</span>
                    {certifications.includes(cert.id) && (
                      <CheckCircle className="h-4 w-4 text-orange-600" />
                    )}
                  </div>
                  <p className="text-xs text-gray-600">{cert.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Career Timeline</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: '2-years', label: 'Fast Track (2 years)', description: 'Quick entry into workforce' },
                { value: '4-years', label: 'Traditional (4 years)', description: 'Standard bachelor\'s degree path' },
                { value: '5-plus-years', label: 'Extended (5+ years)', description: 'Include graduate school or gap years' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTimeframe(option.value as any)}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    timeframe === option.value
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-center mb-2">
                    <span className="font-medium">{option.label}</span>
                    {timeframe === option.value && (
                      <CheckCircle className="h-5 w-5 text-indigo-600 ml-2" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Priorities */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">What matters most to you? (Select top 3-4)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {priorityOptions.map((priority) => (
                <button
                  key={priority.id}
                  onClick={() => handleToggleSelection(priority.id, priorities, setPriorities)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    priorities.includes(priority.id)
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{priority.label}</span>
                    {priorities.includes(priority.id) && (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  <p className="text-xs text-gray-600">{priority.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {isComplete ? '✓ Ready to customize your timeline' : 'Please select career goals and priorities'}
            </span>
            <button
              onClick={handleSave}
              disabled={!isComplete}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isComplete
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPreferenceModal; 