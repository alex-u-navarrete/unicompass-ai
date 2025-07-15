import React, { useState, useEffect } from 'react';
import { X, Mail, Copy, ExternalLink, Loader2, Sparkles } from 'lucide-react';
import { type FacultyData } from '../services/dataService';
import { AIService, type EmailDraft } from '../services/aiService';

interface SendEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  faculty: FacultyData;
}

const ANIMATION_DURATION = 200; // ms

const SendEmailModal: React.FC<SendEmailModalProps> = ({ isOpen, onClose, faculty }) => {
  const [reason, setReason] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [draft, setDraft] = useState<EmailDraft | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [show, setShow] = useState(false); // for animation
  const [shouldRender, setShouldRender] = useState(isOpen);

  // Handle mounting/unmounting for animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setShow(true), 10); // allow render before animating in
    } else {
      setShow(false);
      setTimeout(() => setShouldRender(false), ANIMATION_DURATION);
    }
  }, [isOpen]);

  const generateEmailDraft = async () => {
    if (!reason.trim()) {
      setError('Please provide a reason for contacting the professor.');
      return;
    }
    setIsGenerating(true);
    setError(null);
    try {
      const generatedDraft = await AIService.generateEmailDraft({
        reason,
        faculty,
        studentName: 'Student' // In production, get from user profile
      });
      setDraft(generatedDraft);
    } catch (err) {
      setError('Failed to generate email draft. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    if (!draft) return;
    const emailContent = `Subject: ${draft.subject}\n\n${draft.body}`;
    try {
      await navigator.clipboard.writeText(emailContent);
      const mailtoLink = `mailto:${faculty.email}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`;
      window.open(mailtoLink);
      handleClose();
    } catch (err) {
      setError('Failed to copy to clipboard. Please try again.');
    }
  };

  const skipToEmail = () => {
    const mailtoLink = `mailto:${faculty.email}`;
    window.open(mailtoLink);
    handleClose();
  };

  const handleClose = () => {
    setReason('');
    setDraft(null);
    setError(null);
    setShow(false);
    setTimeout(() => {
      onClose();
    }, ANIMATION_DURATION);
  };

  if (!shouldRender) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity duration-200 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div
        className={`bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-200 ${show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        style={{ transitionProperty: 'opacity, transform' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Mail className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-900">Send Email to {faculty.name}</h2>
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
          {/* Networking Tips Suggestion */}
          {faculty.networkingTips && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Sparkles className="h-5 w-5 text-indigo-600 mt-0.5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-indigo-900 mb-1">💡 Networking Tip</h3>
                  <p className="text-sm text-indigo-700 italic mb-3">{faculty.networkingTips}</p>
                  <button
                    onClick={() => setReason(faculty.networkingTips)}
                    className="text-xs px-3 py-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                  >
                    Use as reason
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Reason Input */}
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
              What's the reason for contacting Professor {faculty.name.split(' ')[1]}?
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g., I'd like to discuss office hours for your FIN 201 course, or I'm interested in your research on corporate finance..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              rows={3}
              disabled={isGenerating}
            />
          </div>

          {/* Generate Button */}
          <div className="flex justify-center">
            <button
              onClick={generateEmailDraft}
              disabled={isGenerating || !reason.trim()}
              className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Sparkles className="h-5 w-5" />
              )}
              <span>{isGenerating ? 'Generating...' : 'Generate AI Draft'}</span>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Generated Draft */}
          {draft && (
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Generated Email Draft</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject:</label>
                    <input
                      type="text"
                      value={draft.subject}
                      onChange={(e) => setDraft({ ...draft, subject: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Body:</label>
                    <textarea
                      value={draft.body}
                      onChange={(e) => setDraft({ ...draft, body: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                      rows={8}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  <Copy className="h-4 w-4" />
                  <span>Copy & Open Email</span>
                </button>
                <button
                  onClick={skipToEmail}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Skip to Blank Email</span>
                </button>
              </div>
            </div>
          )}

          {/* Skip Option (when no draft) */}
          {!draft && !isGenerating && (
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">Or</p>
              <button
                onClick={skipToEmail}
                className="flex items-center space-x-2 px-4 py-2 text-indigo-600 hover:text-indigo-700"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Open blank email to {faculty.email}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendEmailModal; 