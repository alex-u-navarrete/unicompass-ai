import React, { useState } from 'react';
import { 
  Target, 
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  DollarSign,
  TrendingUp,
  GraduationCap,
  BarChart3,
  ExternalLink,
  Mail,
  Search
} from 'lucide-react';

interface StudentYear {
  year: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior';
  timeRemaining: string;
  opportunities: string[];
}

interface CareerPathway {
  type: 'Stay in Finance' | 'Career Pivot' | 'Post-Bacc Program' | 'Additional Degree';
  title: string;
  timeToComplete: string;
  successRate: string;
  avgSalary: string;
  description: string;
  requirements: string[];
  pros: string[];
  cons: string[];
  realWorldOutcome: string;
}

interface FinanceCareer {
  title: string;
  aiRisk: 'Low' | 'Medium' | 'High';
  avgSalary: string;
  growthRate: string;
  description: string;
  riskDescription: string;
  employmentRate: string;
  demandLevel: 'Low' | 'Medium' | 'High';
}

const AICareerPrep = () => {
  const [selectedYear, setSelectedYear] = useState<StudentYear | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<FinanceCareer | null>(null);

  const studentYears: StudentYear[] = [
    {
      year: 'Freshman',
      timeRemaining: '3-4 years',
      opportunities: ['Explore multiple majors', 'Add minors/double majors', 'Change majors entirely', 'Start building skills early']
    },
    {
      year: 'Sophomore', 
      timeRemaining: '2-3 years',
      opportunities: ['Add complementary minor', 'Pursue internships', 'Build relevant skills', 'Consider post-bacc programs']
    },
    {
      year: 'Junior',
      timeRemaining: '1-2 years',
      opportunities: ['Focus on internships', 'Build portfolio', 'Network intensively', 'Plan post-graduation pathway']
    },
    {
      year: 'Senior',
      timeRemaining: '0-1 year',
      opportunities: ['Job applications', 'Post-bacc programs', 'Gap year planning', 'Graduate school applications']
    }
  ];

  // Year-specific career recommendations
  const getCareerOptions = (year: StudentYear): FinanceCareer[] => {
    const allCareers: FinanceCareer[] = [
      {
        title: 'Financial Analyst',
        aiRisk: 'High',
        avgSalary: '$60K-$90K',
        growthRate: '+6%',
        employmentRate: '73%',
        demandLevel: 'Medium',
        description: 'Analyze financial data and investment opportunities',
        riskDescription: 'High risk due to AI automation of data analysis and basic financial modeling tasks'
      },
      {
        title: 'Corporate Finance Manager',
        aiRisk: 'Medium',
        avgSalary: '$95K-$140K',
        growthRate: '+8.5%',
        employmentRate: '81%',
        demandLevel: 'High',
        description: 'Oversee company financial planning and strategy',
        riskDescription: 'Medium risk - strategic oversight remains human-centric while analysis becomes AI-assisted'
      },
      {
        title: 'Investment Banking Analyst',
        aiRisk: 'Medium',
        avgSalary: '$85K-$150K',
        growthRate: '+12%',
        employmentRate: '67%',
        demandLevel: 'Medium',
        description: 'Support investment transactions and client relationships',
        riskDescription: 'Medium risk - client relations and deal strategy remain crucial, but financial modeling increasingly automated'
      },
      {
        title: 'Risk Manager',
        aiRisk: 'Medium',
        avgSalary: '$85K-$130K',
        growthRate: '+7%',
        employmentRate: '79%',
        demandLevel: 'High',
        description: 'Identify and mitigate organizational financial risks',
        riskDescription: 'Medium risk - AI enhances risk detection, but human judgment essential for complex risk decisions'
      }
    ];

    // Add different emphasis based on year
    if (year.year === 'Freshman' || year.year === 'Sophomore') {
      // Early students - show exploratory careers
      return allCareers.map(career => ({
        ...career,
        description: `Future career: ${career.description} (You have time to prepare!)`
      }));
    } else {
      // Junior/Senior - show immediate preparation
      return allCareers.map(career => ({
        ...career,
        description: `Near-term career: ${career.description} (Preparation needed now!)`
      }));
    }
  };

  const getYearSpecificMessage = (year: StudentYear): string => {
    switch (year.year) {
      case 'Freshman':
        return 'You have the most flexibility! Consider all options including changing majors, adding minors, or preparing for alternative career paths.';
      case 'Sophomore':
        return 'Good timing to add complementary skills or consider double majors. You still have time for major pivots.';
      case 'Junior':
        return 'Focus on building experience and skills for your target career. Time to get serious about networking and internships.';
      case 'Senior':
        return 'Immediate planning needed! Focus on job applications while considering post-graduation options like gap years or post-bacc programs.';
      default:
        return '';
    }
  };

  const getCareerPathways = (career: FinanceCareer, year: StudentYear): CareerPathway[] => {
    const pathways: CareerPathway[] = [
      // Stay in Finance pathway
      {
        type: 'Stay in Finance',
        title: `AI-Enhanced ${career.title}`,
        timeToComplete: year.timeRemaining,
        successRate: career.employmentRate,
        avgSalary: career.avgSalary,
        description: `Become an AI-savvy ${career.title.toLowerCase()} who leverages technology`,
        requirements: ['Learn Python/R', 'AI/ML fundamentals', 'Advanced Excel', 'Data visualization'],
        pros: ['Use existing degree', 'Build on current knowledge', 'Relatively quick transition'],
        cons: [`Still ${career.aiRisk.toLowerCase()} AI risk`, 'May require constant upskilling', 'Competition with AI tools'],
        realWorldOutcome: `${career.employmentRate} of recent graduates find jobs, but roles increasingly require tech skills`
      },
      
      // Career Pivot pathways
      {
        type: 'Career Pivot',
        title: 'Technology Sales/Business Development',
        timeToComplete: '6-12 months',
        successRate: '85%',
        avgSalary: '$70K-$120K',
        description: 'Sell tech products to businesses - finance background provides credibility',
        requirements: ['Sales skills', 'Industry knowledge', 'Networking', 'Communication skills'],
        pros: ['High demand', 'Finance background valued', 'Good earning potential', 'AI-resistant'],
        cons: ['Commission-based income', 'High pressure', 'Travel requirements'],
        realWorldOutcome: 'Finance majors often excel in fintech/financial software sales roles'
      },
      
      {
        type: 'Career Pivot',
        title: 'Digital Marketing/Analytics',
        timeToComplete: '8-15 months',
        successRate: '78%',
        avgSalary: '$55K-$85K',
        description: 'Apply analytical skills to marketing data and campaign optimization',
        requirements: ['Google Analytics', 'Facebook Ads', 'SEO/SEM', 'Data analysis'],
        pros: ['Growing field', 'Remote-friendly', 'Creative + analytical', 'Startup opportunities'],
        cons: ['Lower starting salary', 'Fast-changing field', 'High competition'],
        realWorldOutcome: 'Many finance students successfully transition through bootcamps and certifications'
      },

      // Post-Bacc Programs
      {
        type: 'Post-Bacc Program',
        title: 'Computer Science Post-Bacc',
        timeToComplete: '18-24 months',
        successRate: '89%',
        avgSalary: '$85K-$130K',
        description: 'Complete CS fundamentals for career change to software development',
        requirements: ['Math background', 'Programming aptitude', 'Full-time commitment', '$15K-$40K cost'],
        pros: ['High job security', 'Excellent pay', 'AI-creator rather than user', 'Remote work'],
        cons: ['Expensive', 'Time-intensive', 'Competitive admissions', 'Different skillset'],
        realWorldOutcome: 'Post-bacc CS programs report 85-95% job placement rates in tech'
      },

      {
        type: 'Post-Bacc Program',
        title: 'Nursing Accelerated BSN',
        timeToComplete: '12-18 months',
        successRate: '95%',
        avgSalary: '$65K-$95K',
        description: 'Healthcare is AI-resistant and always in demand',
        requirements: ['Science prerequisites', 'Clinical rotations', '$25K-$60K cost', 'Strong work ethic'],
        pros: ['Job security', 'Meaningful work', 'AI-resistant', 'Flexible schedules'],
        cons: ['Physically demanding', 'Expensive', 'High stress', 'Prerequisite courses needed'],
        realWorldOutcome: 'Nursing shortage means 98%+ job placement, often with signing bonuses'
      },

      // Additional Degree options
      {
        type: 'Additional Degree',
        title: 'Master of Data Science',
        timeToComplete: '18-24 months',
        successRate: '91%',
        avgSalary: '$95K-$140K',
        description: 'Become a data scientist - high demand, AI-complementary role',
        requirements: ['GRE scores', 'Programming basics', 'Statistics background', '$40K-$80K cost'],
        pros: ['Very high demand', 'Excellent salary', 'Work with AI', 'Flexible industries'],
        cons: ['Expensive', 'Competitive', 'Technical', 'May require math catch-up'],
        realWorldOutcome: 'Data science masters have 90%+ placement rates with top salaries'
      },

      {
        type: 'Additional Degree',
        title: 'JD (Law Degree)',
        timeToComplete: '3 years',
        successRate: '73%',
        avgSalary: '$70K-$180K',
        description: 'Legal field values finance background, especially for corporate law',
        requirements: ['LSAT score', 'Strong writing', '$100K-$200K cost', 'Law school admission'],
        pros: ['High earning potential', 'Prestige', 'Finance background valued', 'AI-resistant'],
        cons: ['Very expensive', 'Long commitment', 'Stressful', 'Competitive job market'],
        realWorldOutcome: 'Finance + Law combination strong for corporate law, but law market is competitive'
      }
    ];

    // Filter based on student year - more realistic recommendations
    if (year.year === 'Freshman') {
      // Freshmen can consider everything, prioritize exploration
      return pathways.map(p => ({
        ...p,
        description: p.type === 'Stay in Finance' ? 
          `${p.description} - You have plenty of time to build these skills gradually.` :
          p.description
      }));
    } else if (year.year === 'Sophomore') {
      // Sophomores should start focusing but still have options
      return pathways.map(p => ({
        ...p,
        description: p.type === 'Additional Degree' ? 
          `${p.description} - Good timing to start planning and prerequisites.` :
          p.description
      }));
    } else if (year.year === 'Junior') {
      // Juniors need to focus on immediate skills and remove long-term degrees
      return pathways.filter(p => p.type !== 'Additional Degree' || p.timeToComplete.includes('18-24'))
        .map(p => ({
          ...p,
          description: p.type === 'Career Pivot' ? 
            `${p.description} - Perfect timing to start building these skills.` :
            p.description
        }));
    } else { // Senior
      // Seniors need immediate action - focus on quick pivots and post-bacc
      return pathways.filter(p => 
        p.type === 'Stay in Finance' || 
        p.type === 'Career Pivot' || 
        (p.type === 'Post-Bacc Program' && !p.timeToComplete.includes('24')) ||
        (p.type === 'Additional Degree' && p.timeToComplete.includes('18-24'))
      ).map(p => ({
        ...p,
        description: p.type === 'Stay in Finance' ? 
          `${p.description} - Start immediately to be competitive.` :
          p.description
      }));
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSuccessColor = (rate: string) => {
    const numRate = parseInt(rate);
    if (numRate >= 85) return 'text-green-600 bg-green-50';
    if (numRate >= 75) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getDemandColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // Helper function to generate job search URLs
  const getJobSearchUrl = (pathway: CareerPathway): string => {
    const baseUrl = 'https://www.indeed.com/jobs?q=';
    let searchTerms = '';
    
    switch (pathway.type) {
      case 'Stay in Finance':
        searchTerms = encodeURIComponent(`${selectedCareer?.title || 'Financial Analyst'} entry level`);
        break;
      case 'Career Pivot':
        if (pathway.title.includes('Technology Sales')) {
          searchTerms = encodeURIComponent('technology sales business development entry level');
        } else if (pathway.title.includes('Digital Marketing')) {
          searchTerms = encodeURIComponent('digital marketing analyst entry level');
        } else {
          searchTerms = encodeURIComponent('career change finance background');
        }
        break;
      case 'Post-Bacc Program':
        if (pathway.title.includes('Computer Science')) {
          searchTerms = encodeURIComponent('computer science post bacc programs california');
        } else if (pathway.title.includes('Nursing')) {
          searchTerms = encodeURIComponent('accelerated nursing programs california');
        } else {
          searchTerms = encodeURIComponent('post baccalaureate programs');
        }
        break;
      case 'Additional Degree':
        if (pathway.title.includes('Data Science')) {
          searchTerms = encodeURIComponent('data science masters programs california');
        } else if (pathway.title.includes('Law')) {
          searchTerms = encodeURIComponent('law school programs california LSAT prep');
        } else {
          searchTerms = encodeURIComponent('graduate programs finance background');
        }
        break;
      default:
        searchTerms = encodeURIComponent('entry level jobs finance degree');
    }
    
    return `${baseUrl}${searchTerms}&l=California`;
  };

  // Helper function to generate counselor contact info
  const getCounselorEmailContent = (pathway: CareerPathway): { subject: string; body: string } => {
    const subject = encodeURIComponent(`Career Guidance Needed: ${pathway.title} Pathway`);
    
    let body = `Dear CSUSB Career Services Team,

I am a ${selectedYear?.year || 'current'} Finance student at CSUSB seeking guidance about pursuing a career path in ${pathway.title}.

Current Situation:
- Year in school: ${selectedYear?.year || 'Not specified'}
- Major: Finance
- Interested career path: ${pathway.title} (${pathway.type})
- Expected timeline: ${pathway.timeToComplete}

Specific Questions:
- What steps should I take to prepare for this career path?
- Are there any CSUSB alumni in this field I could connect with?
- What internships or experiences would you recommend?
- How can I build the required skills: ${pathway.requirements.slice(0, 3).join(', ')}?

I would appreciate any guidance you can provide or a meeting to discuss this pathway in more detail.

Thank you for your time and support.

Best regards,
[Your Name]
[Your Student ID]
[Your Email]
[Your Phone Number]`;

    return {
      subject,
      body: encodeURIComponent(body)
    };
  };

  // Helper function to open counselor email
  const openCounselorEmail = (pathway: CareerPathway) => {
    const { subject, body } = getCounselorEmailContent(pathway);
    const mailtoUrl = `mailto:careers@csusb.edu?subject=${subject}&body=${body}`;
    window.open(mailtoUrl, '_blank');
  };

  // Helper function to open job search
  const openJobSearch = (pathway: CareerPathway) => {
    const url = getJobSearchUrl(pathway);
    window.open(url, '_blank');
  };

  // Helper function to open learning resources
  const openLearningResources = (pathway: CareerPathway) => {
    let searchQuery = '';
    
    switch (pathway.type) {
      case 'Stay in Finance':
        searchQuery = `AI tools for ${selectedCareer?.title || 'finance'} career preparation guide`;
        break;
      case 'Career Pivot':
        if (pathway.title.includes('Technology Sales')) {
          searchQuery = 'how to transition from finance to technology sales career guide';
        } else if (pathway.title.includes('Digital Marketing')) {
          searchQuery = 'finance to digital marketing career transition guide';
        } else {
          searchQuery = `${pathway.title} career transition guide`;
        }
        break;
      case 'Post-Bacc Program':
        searchQuery = `${pathway.title} career preparation requirements application process`;
        break;
      case 'Additional Degree':
        searchQuery = `${pathway.title} application requirements career outcomes`;
        break;
      default:
        searchQuery = 'career transition preparation guide';
    }
    
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    window.open(googleUrl, '_blank');
  };


  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Career Preparation</h1>
        <p className="text-xl text-gray-600">Realistic pathways for Finance students in an AI world</p>
      </div>

      {/* Student Year Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">What year are you in?</h2>
        <p className="text-gray-600 mb-6">Your timeline determines which career preparation options make the most sense.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {studentYears.map((year) => (
            <button
              key={year.year}
              onClick={() => setSelectedYear(year)}
              className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                selectedYear?.year === year.year 
                  ? 'border-indigo-500 bg-indigo-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-left">
                <div className="flex items-center space-x-2 mb-2">
                  <GraduationCap className="h-5 w-5 text-indigo-600" />
                  <span className="font-semibold">{year.year}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Time remaining: {year.timeRemaining}</p>
                <div className="space-y-1">
                  {year.opportunities.slice(0, 2).map((opp, idx) => (
                    <p key={idx} className="text-xs text-gray-500">• {opp}</p>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Career Selection */}
      {selectedYear && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Select a Finance Career to Analyze</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 font-medium">{selectedYear.year} Student Advice:</p>
            <p className="text-blue-700 text-sm mt-1">{getYearSpecificMessage(selectedYear)}</p>
          </div>
          <p className="text-gray-600 mb-6">See realistic employment rates and AI impact for different finance roles based on your timeline.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getCareerOptions(selectedYear).map((career) => (
              <button
                key={career.title}
                onClick={() => setSelectedCareer(career)}
                className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                  selectedCareer?.title === career.title 
                    ? 'border-indigo-500 bg-indigo-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold">{career.title}</span>
                    <div className="flex space-x-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(career.aiRisk)}`}>
                        {career.aiRisk} AI Risk
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-2 text-sm">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span>{career.avgSalary}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span>{career.growthRate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BarChart3 className="h-4 w-4 text-purple-600" />
                      <span className={`text-xs px-1 py-0.5 rounded ${getSuccessColor(career.employmentRate)}`}>
                        {career.employmentRate} hired
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="h-4 w-4 text-orange-600" />
                      <span className={`text-xs px-1 py-0.5 rounded ${getDemandColor(career.demandLevel)}`}>
                        {career.demandLevel} demand
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{career.description}</p>
                  <p className="text-xs text-gray-500 italic">{career.riskDescription}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Career Pathways */}
      {selectedYear && selectedCareer && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Your Pathway Options</h2>
          <p className="text-gray-600 mb-6">
            Based on your {selectedYear.year} status and interest in {selectedCareer.title}, here are your realistic options:
          </p>
          
          <div className="space-y-6">
            {getCareerPathways(selectedCareer, selectedYear).map((pathway, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        pathway.type === 'Stay in Finance' ? 'bg-blue-100 text-blue-800' :
                        pathway.type === 'Career Pivot' ? 'bg-green-100 text-green-800' :
                        pathway.type === 'Post-Bacc Program' ? 'bg-purple-100 text-purple-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {pathway.type}
                      </span>
                      <span className={`px-2 py-1 rounded text-sm font-medium ${getSuccessColor(pathway.successRate)}`}>
                        {pathway.successRate} success rate
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{pathway.title}</h3>
                    <p className="text-gray-600 mb-2">{pathway.description}</p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div>{pathway.timeToComplete}</div>
                    <div className="font-semibold text-green-600">{pathway.avgSalary}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {pathway.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-indigo-600 mt-1">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-green-700 mb-2">Pros:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {pathway.pros.map((pro, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-red-700 mb-2">Cons:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {pathway.cons.map((con, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <AlertTriangle className="h-3 w-3 text-red-600 mt-1 flex-shrink-0" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <h4 className="font-medium text-gray-900 mb-1">Real-World Outcome:</h4>
                  <p className="text-sm text-gray-700">{pathway.realWorldOutcome}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => openJobSearch(pathway)}
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Search className="h-4 w-4" />
                    <span>Find Jobs</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                  
                  <button
                    onClick={() => openCounselorEmail(pathway)}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Contact Counselor</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                  
                  <button
                    onClick={() => openLearningResources(pathway)}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Lightbulb className="h-4 w-4" />
                    <span>Learn More</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reality Check */}
      {selectedYear && selectedCareer && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <Lightbulb className="h-6 w-6 text-yellow-600 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-2">Reality Check</h3>
              <div className="space-y-2 text-sm text-yellow-800">
                <p>• <strong>No pathway guarantees success</strong> - these are statistical averages, not promises</p>
                <p>• <strong>AI impact varies by company</strong> - some embrace it faster than others</p>
                <p>• <strong>Skills matter more than degrees</strong> - what you can do trumps what you studied</p>
                <p>• <strong>Networking is crucial</strong> - most jobs come through connections, not applications</p>
                <p>• <strong>Consider multiple options</strong> - pursue 2-3 pathways simultaneously when possible</p>
                <p>• <strong>Use the action buttons above</strong> - they'll help you take immediate next steps</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AICareerPrep; 