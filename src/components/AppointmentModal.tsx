import React, { useState, useEffect } from 'react';
import { X, Calendar, Mail, User, Clock, MessageSquare, ExternalLink } from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentYear?: string;
}

interface EmailComposer {
  to: string;
  subject: string;
  body: string;
}

const ANIMATION_DURATION = 200; // ms

const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose, currentYear = 'Junior' }) => {
  const [selectedService, setSelectedService] = useState<'academic' | 'career'>('academic');
  const [appointmentType, setAppointmentType] = useState<'general' | 'graduation' | 'internship' | 'career-change'>('general');
  const [availabilityPreference, setAvailabilityPreference] = useState<'morning' | 'afternoon' | 'flexible'>('flexible');
  const [customMessage, setCustomMessage] = useState('');
  const [show, setShow] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [emailComposer, setEmailComposer] = useState<EmailComposer | null>(null);

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

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose();
      // Reset form
      setSelectedService('academic');
      setAppointmentType('general');
      setAvailabilityPreference('flexible');
      setCustomMessage('');
      setEmailComposer(null);
    }, ANIMATION_DURATION);
  };

  const getServiceInfo = (service: 'academic' | 'career') => {
    return service === 'academic' 
      ? {
          name: 'Academic Advising',
          email: 'advising@csusb.edu',
          phone: '(909) 537-5037',
          description: 'Course planning, graduation requirements, academic policies'
        }
      : {
          name: 'Career Center',
          email: 'career@csusb.edu', 
          phone: '(909) 537-5250',
          description: 'Internships, job search, career guidance, resume reviews'
        };
  };

  const getAppointmentTypeDescription = (type: string) => {
    switch (type) {
      case 'general':
        return 'General academic planning and course selection';
      case 'graduation':
        return 'Graduation requirement check and planning';
      case 'internship':
        return 'Internship search guidance and application support';
      case 'career-change':
        return 'Career path exploration and alternative options';
      default:
        return 'General appointment';
    }
  };

  const generateEmailContent = (): EmailComposer => {
    const serviceInfo = getServiceInfo(selectedService);
    const typeDescription = getAppointmentTypeDescription(appointmentType);
    
    const subject = `Academic Planning Appointment Request - ${currentYear} Finance Student`;
    
    const body = `Hello,

I would like to schedule an appointment for ${typeDescription.toLowerCase()}.

Student Information:
- Year: ${currentYear}
- Major: Finance
- Service Needed: ${serviceInfo.name}
- Appointment Type: ${typeDescription}
- Availability Preference: ${availabilityPreference === 'flexible' ? 'Flexible schedule' : `${availabilityPreference.charAt(0).toUpperCase()}${availabilityPreference.slice(1)} hours preferred`}

${customMessage ? `Additional Information:\n${customMessage}\n\n` : ''}Please let me know your available time slots, and I will confirm my attendance.

Thank you for your time and assistance.

Best regards,
[Your Name]
[Your Student ID]
[Your Phone Number]`;

    return {
      to: serviceInfo.email,
      subject,
      body
    };
  };

  const handleSendEmail = () => {
    const emailContent = generateEmailContent();
    setEmailComposer(emailContent);
    
    const mailtoUrl = `mailto:${emailContent.to}?subject=${encodeURIComponent(emailContent.subject)}&body=${encodeURIComponent(emailContent.body)}`;
    window.open(mailtoUrl, '_blank');
  };

  const copyToClipboard = async () => {
    if (!emailComposer) return;
    
    const fullEmail = `To: ${emailComposer.to}\nSubject: ${emailComposer.subject}\n\n${emailComposer.body}`;
    
    try {
      await navigator.clipboard.writeText(fullEmail);
      alert('Email content copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  if (!shouldRender) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-${ANIMATION_DURATION} ${show ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className={`relative bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-${ANIMATION_DURATION} ${show ? 'scale-100' : 'scale-95'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Calendar className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900">Schedule Academic Appointment</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Service Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Choose Service</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(['academic', 'career'] as const).map((service) => {
                const info = getServiceInfo(service);
                return (
                  <button
                    key={service}
                    onClick={() => setSelectedService(service)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedService === service
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      {service === 'academic' ? 
                        <User className="h-5 w-5 text-indigo-600" /> : 
                        <MessageSquare className="h-5 w-5 text-green-600" />
                      }
                      <span className="font-semibold">{info.name}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{info.description}</p>
                    <div className="text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-3 w-3" />
                        <span>{info.email}</span>
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        <Clock className="h-3 w-3" />
                        <span>{info.phone}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Appointment Type */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Appointment Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { value: 'general', label: 'General Planning', description: 'Course selection and academic planning' },
                { value: 'graduation', label: 'Graduation Check', description: 'Review requirements and timeline' },
                { value: 'internship', label: 'Internship Guidance', description: 'Search and application support' },
                { value: 'career-change', label: 'Career Exploration', description: 'Alternative career paths and options' }
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() => setAppointmentType(type.value as any)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    appointmentType === type.value
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-sm">{type.label}</div>
                  <div className="text-xs text-gray-600 mt-1">{type.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Availability Preference */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Availability Preference</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { value: 'morning', label: 'Morning (8 AM - 12 PM)' },
                { value: 'afternoon', label: 'Afternoon (12 PM - 5 PM)' },
                { value: 'flexible', label: 'Flexible Schedule' }
              ].map((pref) => (
                <button
                  key={pref.value}
                  onClick={() => setAvailabilityPreference(pref.value as any)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    availabilityPreference === pref.value
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {pref.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Message */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Information (Optional)</h3>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Add any specific questions or topics you'd like to discuss..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              rows={4}
            />
          </div>

          {/* Email Preview */}
          {emailComposer && (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Email Preview</h4>
              <div className="text-sm space-y-2">
                <div><strong>To:</strong> {emailComposer.to}</div>
                <div><strong>Subject:</strong> {emailComposer.subject}</div>
                <div className="bg-white p-3 rounded border max-h-40 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-xs">{emailComposer.body}</pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <div className="flex items-center space-x-3">
            {emailComposer && (
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Copy Email</span>
              </button>
            )}
            <button
              onClick={handleSendEmail}
              className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>Send Email</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal; 