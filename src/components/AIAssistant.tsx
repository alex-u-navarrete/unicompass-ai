import React, { useState } from 'react';
import { MessageCircle, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your UniCompass AI Assistant. I'm here to help you navigate your academic journey at CSUSB. What would you like to know about scholarships, courses, faculty networking, or career planning?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "What scholarships should I apply for?",
    "How do I network with faculty?",
    "Which courses lead to high-paying jobs?",
    "What's the best way to prepare for law school?",
    "How do I find internships?",
    "What's my academic timeline?"
  ];

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response (in real app, this would call ChatGPT API)
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('scholarship')) {
      return "For CSUSB Finance students, I recommend focusing on: 1) CSUSB Presidential Scholarship (deadline March 15), 2) Finance Department Merit Award, 3) National Hispanic Scholarship Fund, and 4) Golden State Minority Foundation. Start with the Presidential Scholarship - it's worth $5,000 and has a 3.5+ GPA requirement. Would you like me to help you track these in your scholarship tracker?";
    }
    
    if (lowerQuestion.includes('network') || lowerQuestion.includes('faculty')) {
      return "Great question! Here's how to network with CSUSB Finance faculty: 1) Attend office hours regularly (Dr. Johnson: Mon/Wed 2-4 PM, Dr. Chen: Tue/Thu 1-3 PM), 2) Ask thoughtful questions about their research, 3) Join the Finance Club (Dr. Chen leads it), 4) Request informational interviews, 5) Follow up with thank you emails. Start with Dr. Johnson - she's interested in student research projects!";
    }
    
    if (lowerQuestion.includes('course') || lowerQuestion.includes('salary') || lowerQuestion.includes('high-paying')) {
      return "The highest-paying courses for Finance majors are: 1) FIN 401 (Portfolio Management) - leads to $75K-$110K roles, 2) FIN 301 (Investment Analysis) - essential for investment banking ($85K-$120K), 3) FIN 302 (Corporate Finance) - great for corporate roles ($65K-$95K). Focus on FIN 301 and 401 if you want maximum salary potential. These courses also prepare you well for law school!";
    }
    
    if (lowerQuestion.includes('law school')) {
      return "For law school prep, focus on: 1) Take courses that develop critical thinking (FIN 301, 302, 401), 2) Maintain a 3.5+ GPA, 3) Build relationships with faculty for strong letters of recommendation, 4) Consider taking LSAT prep courses, 5) Get involved in pre-law organizations. Your Finance background will be valuable for corporate law, securities law, or tax law. Start preparing for the LSAT in your junior year!";
    }
    
    if (lowerQuestion.includes('internship')) {
      return "For Finance internships: 1) Check CSUSB Career Services regularly, 2) Network with faculty (they often have industry connections), 3) Join the Finance Club for networking events, 4) Apply to Big 4 accounting firms, regional banks, and investment firms, 5) Consider summer programs at major banks. Start applying in January for summer internships. Would you like me to help you track internship opportunities?";
    }
    
    if (lowerQuestion.includes('timeline') || lowerQuestion.includes('academic')) {
      return "Here's your ideal academic timeline: Year 1: Focus on core courses (FIN 300), build GPA, join Finance Club. Year 2: Take FIN 301, 302, start networking with faculty, apply for summer internships. Year 3: Take FIN 401, 402, secure internship, prepare for law school if interested. Year 4: Complete remaining courses, apply for jobs/grad school, maintain faculty relationships for recommendations.";
    }
    
    return "I'm here to help with your academic journey! I can assist with scholarships, faculty networking, course planning, career guidance, and law school preparation. What specific area would you like to explore? You can also use the quick questions below to get started.";
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Assistant</h1>
        <p className="text-xl text-gray-600">Your Personal Academic Guide</p>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-96 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' 
                    ? 'bg-indigo-600' 
                    : 'bg-gray-600'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className={`rounded-lg px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-gray-100 rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about your academic journey..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-sm"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* AI Capabilities */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">What I Can Help You With</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <MessageCircle className="h-5 w-5 text-indigo-600" />
            <span className="text-sm">Scholarship guidance</span>
          </div>
          <div className="flex items-center space-x-3">
            <MessageCircle className="h-5 w-5 text-indigo-600" />
            <span className="text-sm">Faculty networking tips</span>
          </div>
          <div className="flex items-center space-x-3">
            <MessageCircle className="h-5 w-5 text-indigo-600" />
            <span className="text-sm">Course planning</span>
          </div>
          <div className="flex items-center space-x-3">
            <MessageCircle className="h-5 w-5 text-indigo-600" />
            <span className="text-sm">Career path advice</span>
          </div>
          <div className="flex items-center space-x-3">
            <MessageCircle className="h-5 w-5 text-indigo-600" />
            <span className="text-sm">Law school preparation</span>
          </div>
          <div className="flex items-center space-x-3">
            <MessageCircle className="h-5 w-5 text-indigo-600" />
            <span className="text-sm">Academic timeline</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant; 