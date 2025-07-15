import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Clock, 
  Building, 
  Star, 
  Filter,
  Search,
  ExternalLink,
  BookmarkPlus,
  TrendingUp,
  Bot,
  GraduationCap
} from 'lucide-react';

interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Internship' | 'Entry Level' | 'Mid Level' | 'Senior Level';
  duration: string;
  salary: string;
  description: string;
  requirements: string[];
  posted: string;
  deadline: string;
  remote: boolean;
  aiImpactRisk: 'Low' | 'Medium' | 'High';
  growthPotential: 'High' | 'Medium' | 'Low';
  category: 'Accounting' | 'Finance' | 'Banking' | 'Consulting' | 'Insurance' | 'Investment';
  applicationUrl: string;
  companyRating: number;
}

const JobBoard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);

  const jobPostings: JobPosting[] = [
    {
      id: '1',
      title: 'Financial Analyst Intern',
      company: 'Wells Fargo',
      location: 'Los Angeles, CA',
      type: 'Internship',
      duration: '10 weeks (Summer 2024)',
      salary: '$25-30/hour',
      description: 'Join our Corporate Finance team to analyze financial data, create reports, and support investment decisions. Work directly with senior analysts on real projects.',
      requirements: ['Junior/Senior standing', 'Finance or Accounting major', '3.5+ GPA', 'Excel proficiency'],
      posted: '2024-01-15',
      deadline: '2024-03-15',
      remote: false,
      aiImpactRisk: 'Medium',
      growthPotential: 'High',
      category: 'Finance',
      applicationUrl: 'https://careers.wellsfargo.com',
      companyRating: 4.2
    },
    {
      id: '2',
      title: 'Audit Associate',
      company: 'PwC',
      location: 'San Diego, CA',
      type: 'Entry Level',
      duration: 'Full-time',
      salary: '$65,000-$75,000',
      description: 'Start your career in public accounting with one of the Big Four. Perform audit procedures, analyze financial statements, and work with diverse clients.',
      requirements: ['Bachelor\'s in Accounting', 'CPA eligible', 'Strong analytical skills', 'Team player'],
      posted: '2024-01-12',
      deadline: '2024-02-28',
      remote: true,
      aiImpactRisk: 'Low',
      growthPotential: 'High',
      category: 'Accounting',
      applicationUrl: 'https://www.pwc.com/us/careers',
      companyRating: 4.1
    },
    {
      id: '3',
      title: 'Investment Banking Summer Analyst',
      company: 'Goldman Sachs',
      location: 'Los Angeles, CA',
      type: 'Internship',
      duration: '10 weeks (Summer 2024)',
      salary: '$85-95/hour',
      description: 'Intensive program in investment banking. Work on M&A transactions, IPOs, and financial modeling. High-intensity, high-reward opportunity.',
      requirements: ['Top-tier GPA (3.7+)', 'Finance major preferred', 'Financial modeling skills', 'Series 7 a plus'],
      posted: '2024-01-10',
      deadline: '2024-02-15',
      remote: false,
      aiImpactRisk: 'Medium',
      growthPotential: 'High',
      category: 'Investment',
      applicationUrl: 'https://www.goldmansachs.com/careers',
      companyRating: 4.3
    },
    {
      id: '4',
      title: 'Risk Management Trainee',
      company: 'Bank of America',
      location: 'Remote (CA residents)',
      type: 'Entry Level',
      duration: 'Full-time',
      salary: '$70,000-$80,000',
      description: 'Graduate training program in risk management. Learn credit risk, market risk, and operational risk across different business lines.',
      requirements: ['Bachelor\'s degree', 'Strong quantitative skills', 'Knowledge of financial markets', 'Programming a plus'],
      posted: '2024-01-08',
      deadline: '2024-03-01',
      remote: true,
      aiImpactRisk: 'Low',
      growthPotential: 'High',
      category: 'Banking',
      applicationUrl: 'https://careers.bankofamerica.com',
      companyRating: 4.0
    },
    {
      id: '5',
      title: 'Corporate Finance Intern',
      company: 'Disney',
      location: 'Burbank, CA',
      type: 'Internship',
      duration: '12 weeks (Summer 2024)',
      salary: '$30-35/hour',
      description: 'Support corporate finance activities including budgeting, forecasting, and financial analysis for Disney\'s entertainment divisions.',
      requirements: ['Finance/Accounting major', 'Junior standing', 'Advanced Excel', 'PowerPoint skills'],
      posted: '2024-01-06',
      deadline: '2024-02-20',
      remote: false,
      aiImpactRisk: 'Medium',
      growthPotential: 'High',
      category: 'Finance',
      applicationUrl: 'https://jobs.disneycareers.com',
      companyRating: 4.4
    },
    {
      id: '6',
      title: 'Tax Associate',
      company: 'KPMG',
      location: 'Irvine, CA',
      type: 'Entry Level',
      duration: 'Full-time',
      salary: '$62,000-$72,000',
      description: 'Join our tax practice to prepare corporate tax returns, research tax issues, and support tax planning strategies for Fortune 500 clients.',
      requirements: ['Accounting degree', 'CPA track', 'Tax course completion', 'Detail-oriented'],
      posted: '2024-01-05',
      deadline: '2024-03-10',
      remote: true,
      aiImpactRisk: 'Medium',
      growthPotential: 'Medium',
      category: 'Accounting',
      applicationUrl: 'https://home.kpmg/us/careers',
      companyRating: 4.0
    }
  ];

  const filteredJobs = jobPostings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || job.type === selectedType;
    const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All' || job.location.includes(selectedLocation);
    
    return matchesSearch && matchesType && matchesCategory && matchesLocation;
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGrowthColor = (growth: string) => {
    switch (growth) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Internship': return 'bg-blue-100 text-blue-800';
      case 'Entry Level': return 'bg-green-100 text-green-800';
      case 'Mid Level': return 'bg-yellow-100 text-yellow-800';
      case 'Senior Level': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Job & Internship Board</h1>
        <p className="text-xl text-gray-600">Finance & Accounting Opportunities for CSUSB Students</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs, companies, or keywords..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="All">All Types</option>
                <option value="Internship">Internship</option>
                <option value="Entry Level">Entry Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior Level">Senior Level</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="All">All Categories</option>
                <option value="Accounting">Accounting</option>
                <option value="Finance">Finance</option>
                <option value="Banking">Banking</option>
                <option value="Investment">Investment</option>
                <option value="Consulting">Consulting</option>
                <option value="Insurance">Insurance</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="All">All Locations</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="San Diego">San Diego</option>
                <option value="Irvine">Irvine</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredJobs.length} of {jobPostings.length} opportunities
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
              {/* Job Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(job.type)}`}>
                    {job.type}
                  </span>
                  {job.remote && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      Remote
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-4 mb-3 text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Building className="h-4 w-4" />
                    <span className="font-medium">{job.company}</span>
                    <div className="flex items-center space-x-1 ml-2">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-sm">{job.companyRating}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4" />
                    <span>{job.salary}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{job.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.requirements.slice(0, 3).map((req, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {req}
                    </span>
                  ))}
                  {job.requirements.length > 3 && (
                    <span className="text-xs text-gray-500">+{job.requirements.length - 3} more</span>
                  )}
                </div>

                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Posted: {new Date(job.posted).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Job Metrics and Actions */}
              <div className="flex flex-col items-end space-y-3">
                <div className="flex flex-col items-end space-y-2">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4" />
                    <span className="text-sm text-gray-600">AI Risk:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(job.aiImpactRisk)}`}>
                      {job.aiImpactRisk}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm text-gray-600">Growth:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGrowthColor(job.growthPotential)}`}>
                      {job.growthPotential}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <BookmarkPlus className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                  <a
                    href={job.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <span>Apply</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Career Resources */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <GraduationCap className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-900">Career Resources</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Resume Templates</h3>
            <p className="text-sm text-gray-600 mb-3">Finance and accounting-specific resume templates</p>
            <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
              Download Templates →
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Interview Prep</h3>
            <p className="text-sm text-gray-600 mb-3">Common interview questions and practice materials</p>
            <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
              Start Practicing →
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Networking Events</h3>
            <p className="text-sm text-gray-600 mb-3">Upcoming industry events and career fairs</p>
            <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
              View Events →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobBoard; 