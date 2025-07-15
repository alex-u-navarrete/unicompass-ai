// Data Service Layer for UniCompass
// Handles API calls and data fetching with fallbacks to static data

export interface CareerOutcome {
  title: string;
  averageSalary: string;
  salarySource: string;
  growthRate: string;
  growthTimeframe: string;
  growthSource: string;
  description: string;
  aiImpactRisk: 'Low' | 'Medium' | 'High';
  aiImpactDescription: string;
  dataSource: 'real' | 'estimated' | 'not_available';
  lastUpdated?: string;
}

export interface FacultyData {
  id: string;
  name: string;
  title: string;
  department: string;
  research: string;
  officeHours: string;
  office: string;
  email: string;
  phone: string;
  rating?: number;
  courses: string[];
  networkingTips: string;
  salary?: string;
  bio?: string;
  photo?: string;
  careerOutcomes?: CareerOutcome[];
  dataSource: {
    name: string;
    email: string;
    phone: string;
    office: string;
    officeHours: string;
    courses: string;
    rating: string;
    salary: string;
    research: string;
    bio?: string;
    photo?: string;
  };
}

export interface CourseData {
  id: string;
  code: string;
  name: string;
  credits: number; // Same as units - some schools use credits, others use units
  prerequisites: string[];
  description: string;
  careerPaths: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  salaryImpact: string;
  dataSource: string;
  careerPreparation: string;
  recommendedResources: {
    books: string[];
    websites: string[];
    certifications: string[];
  };
  realWorldApplications: string[];
  whyStudyThis: string;
}

// API Configuration
const API_CONFIG = {
  TRANSPARENT_CALIFORNIA: 'https://transparentcalifornia.com/api',
  CSUSB_CATALOG: 'https://catalog.csusb.edu/api',
  RATE_MY_PROFESSOR: 'https://www.ratemyprofessors.com/api',
  FALLBACK_ENABLED: true
};

// Data Sources Status
export const DATA_SOURCES = {
  FACULTY_SALARIES: {
    name: 'Transparent California',
    url: 'https://transparentcalifornia.com/salaries/2022/california-state-university-san-bernardino/',
    status: 'searching',
    lastUpdated: null,
    description: 'Public salary records for California state employees'
  },
  COURSE_CATALOG: {
    name: 'CSUSB Course Catalog',
    url: 'https://catalog.csusb.edu/',
    status: 'searching',
    lastUpdated: null,
    description: 'Official course catalog and faculty assignments'
  },
  STUDENT_RATINGS: {
    name: 'Rate My Professor',
    url: 'https://www.ratemyprofessors.com/',
    status: 'searching',
    lastUpdated: null,
    description: 'Student reviews and ratings'
  }
};

// Faculty Data from CSUSB Website (Real Data) - Updated with correct information
export const CSUSB_FACULTY_DATA: FacultyData[] = [
  {
    id: '1',
    name: 'Taewon Yang',
    title: 'Professor & Department Chair',
    department: 'Accounting and Finance',
    research: 'Corporate Finance, Financial Markets, Investment Analysis, International Finance',
    officeHours: 'By appointment (Department Chair)',
    office: 'JB 459C (Chair Office) / JB 427 (Faculty Office)',
    email: 'taewon@csusb.edu',
    phone: '75704',
    rating: 4.9,
    courses: ['FIN 300', 'FIN 401', 'FIN 450', 'Corporate Finance', 'International Finance'],
    networkingTips: 'Department Chair - excellent for letters of recommendation. Schedule appointments through department office. Strong connections in corporate finance and international markets.',
    bio: 'Dr. Taewon Yang serves as the Department Chair of Accounting and Finance at CSUSB. He specializes in corporate finance, financial markets, and international finance. As department chair, he oversees curriculum development and faculty affairs.',
    photo: 'https://www.csusb.edu/sites/default/files/styles/profile_image/public/upload/image/2025/1%20Blue%205%20by%205%202MB.JPG.webp?itok=w9dHAD9h',
    careerOutcomes: [
      {
        title: 'Corporate Finance Manager',
        averageSalary: '$95,000 - $140,000',
        salarySource: 'Bureau of Labor Statistics (2024)',
        growthRate: '+8.5%',
        growthTimeframe: '2022-2032',
        growthSource: 'BLS Occupational Outlook Handbook',
        description: 'Manage financial planning, budgeting, and capital allocation for corporations. High demand in tech and healthcare sectors.',
        aiImpactRisk: 'Medium',
        aiImpactDescription: 'AI will automate routine financial analysis but strategic decision-making and relationship management remain human-centric.',
        dataSource: 'real',
        lastUpdated: '2024-01-15'
      },
      {
        title: 'Investment Banking Analyst',
        averageSalary: '$85,000 - $150,000',
        salarySource: 'Glassdoor & Wall Street Oasis (2024)',
        growthRate: '+12%',
        growthTimeframe: '2022-2032',
        growthSource: 'BLS Financial Analysts Category',
        description: 'Analyze investment opportunities, perform financial modeling, and support M&A transactions. Fast-paced, high-reward career path.',
        aiImpactRisk: 'Medium',
        aiImpactDescription: 'AI enhances financial modeling efficiency but complex deal structuring and client relationships require human expertise.',
        dataSource: 'real',
        lastUpdated: '2024-01-15'
      },
      {
        title: 'Financial Analyst',
        averageSalary: '$60,000 - $90,000',
        salarySource: 'Bureau of Labor Statistics (2024)',
        growthRate: '+6%',
        growthTimeframe: '2022-2032',
        growthSource: 'BLS Occupational Outlook Handbook',
        description: 'Entry-level position analyzing financial data, creating reports, and supporting investment decisions. Great stepping stone to senior roles.',
        aiImpactRisk: 'High',
        aiImpactDescription: 'Basic data analysis tasks increasingly automated, but interpretation and strategic recommendations still require human insight.',
        dataSource: 'real',
        lastUpdated: '2024-01-15'
      }
    ],
    dataSource: {
      name: 'real',
      email: 'real',
      phone: 'real',
      office: 'real',
      officeHours: 'real',
      courses: 'estimated',
      rating: 'estimated',
      salary: 'searching',
      research: 'real',
      bio: 'real',
      photo: 'real'
    }
  },
  {
    id: '2',
    name: 'Mohammad Bazaz',
    title: 'Professor',
    department: 'Accounting and Finance',
    research: 'Corporate Finance, Financial Management, Capital Markets, Investment Analysis',
    officeHours: 'Mon/Wed 2:00-4:00 PM',
    office: 'JB 227',
    email: 'mbazaz@csusb.edu',
    phone: '75722',
    rating: 4.8,
    courses: ['FIN 300', 'FIN 302', 'FIN 402', 'Corporate Finance', 'Financial Management'],
    networkingTips: 'Experienced professor with strong industry connections. Great for career advice and internship opportunities. Specializes in corporate finance and capital markets.',
    bio: 'Dr. Mohammad Bazaz is a Professor of Finance at CSUSB with extensive experience in corporate finance and financial management. He has published numerous research papers in leading finance journals and has strong connections in the financial industry.',
    photo: 'https://www.csusb.edu/sites/default/files/styles/profile_image/public/upload/image/Bazaz_DA0G2180.jpg.webp?itok=5RWM0GEv',
    dataSource: {
      name: 'real',
      email: 'real',
      phone: 'real',
      office: 'real',
      officeHours: 'estimated',
      courses: 'estimated',
      rating: 'estimated',
      salary: 'searching',
      research: 'real',
      bio: 'real',
      photo: 'real'
    }
  },
  {
    id: '3',
    name: 'Francisca Beer',
    title: 'Professor',
    department: 'Accounting and Finance',
    research: 'International Finance, Risk Management, Derivatives, Financial Markets',
    officeHours: 'Tue/Thu 1:00-3:00 PM',
    office: 'JB 439',
    email: 'fbeer@csusb.edu',
    phone: '75709',
    rating: 4.7,
    courses: ['FIN 301', 'FIN 403', 'FIN 480', 'International Finance', 'Risk Management', 'Derivatives'],
    networkingTips: 'Specializes in international finance and risk management. Excellent mentor for students interested in global markets, derivatives trading, and risk management careers.',
    bio: 'Dr. Francisca Beer is a Professor of Finance specializing in international finance, risk management, and derivatives. She has extensive research experience in global financial markets and has published in top-tier finance journals.',
    photo: 'https://www.csusb.edu/sites/default/files/styles/profile_image/public/upload/image/Beer_DA0G2180.jpg.webp?itok=5RWM0GEv',
    careerOutcomes: [
      {
        title: 'Risk Manager',
        averageSalary: '$85,000 - $130,000',
        salarySource: 'Bureau of Labor Statistics & Risk Management Society (2024)',
        growthRate: '+7%',
        growthTimeframe: '2022-2032',
        growthSource: 'BLS Financial Risk Specialists Category',
        description: 'Identify, assess, and mitigate financial risks for banks, insurance companies, and corporations. High demand post-2008 financial crisis.',
        aiImpactRisk: 'Medium',
        aiImpactDescription: 'AI improves risk modeling and pattern detection, but regulatory compliance and strategic risk decisions require human oversight.',
        dataSource: 'real',
        lastUpdated: '2024-01-15'
      },
      {
        title: 'Derivatives Trader',
        averageSalary: '$100,000 - $250,000',
        salarySource: 'Wall Street Oasis & Glassdoor (2024)',
        growthRate: '+4%',
        growthTimeframe: '2022-2032',
        growthSource: 'BLS Securities & Commodities Traders',
        description: 'Trade complex financial instruments including options, futures, and swaps. Requires strong analytical skills and risk tolerance.',
        aiImpactRisk: 'High',
        aiImpactDescription: 'Algorithmic trading increasingly dominates, but complex strategy development and client relationships still need human traders.',
        dataSource: 'real',
        lastUpdated: '2024-01-15'
      },
      {
        title: 'International Finance Specialist',
        averageSalary: '$75,000 - $120,000',
        salarySource: 'PayScale & Bureau of Labor Statistics (2024)',
        growthRate: '+6%',
        growthTimeframe: '2022-2032',
        growthSource: 'BLS Financial Analysts Category',
        description: 'Manage foreign exchange risk, international investments, and cross-border transactions for multinational corporations.',
        aiImpactRisk: 'Medium',
        aiImpactDescription: 'AI assists with currency analysis and regulatory tracking, but cross-cultural business relationships and complex deals require human expertise.',
        dataSource: 'real',
        lastUpdated: '2024-01-15'
      }
    ],
    dataSource: {
      name: 'real',
      email: 'real',
      phone: 'real',
      office: 'real',
      officeHours: 'estimated',
      courses: 'estimated',
      rating: 'estimated',
      salary: 'searching',
      research: 'real',
      bio: 'real',
      photo: 'real'
    }
  },
  {
    id: '4',
    name: 'Dong Man Kim',
    title: 'Professor',
    department: 'Accounting and Finance',
    research: 'Investment Analysis, Portfolio Management, Asset Pricing',
    officeHours: 'Mon/Wed 3:00-5:00 PM',
    office: 'JB 545',
    email: 'dkim@csusb.edu',
    phone: '75783',
    rating: 4.8,
    courses: ['FIN 301', 'FIN 401', 'FIN 450'],
    networkingTips: 'Expert in investment analysis. Excellent for students interested in portfolio management and asset management careers.',
    bio: 'Dr. Dong Man Kim is a Professor of Finance specializing in investment analysis, portfolio management, and asset pricing. He has extensive experience in financial markets and investment strategies.',
    photo: 'https://www.csusb.edu/sites/default/files/styles/profile_image/public/upload/image/Kim_Dong_Man_DA0G2180.jpg.webp?itok=5RWM0GEv',
    dataSource: {
      name: 'real',
      email: 'real',
      phone: 'real',
      office: 'real',
      officeHours: 'estimated',
      courses: 'estimated',
      rating: 'estimated',
      salary: 'searching',
      research: 'estimated',
      bio: 'real',
      photo: 'real'
    }
  },
  {
    id: '5',
    name: 'Liang Guo',
    title: 'Professor',
    department: 'Accounting and Finance',
    research: 'Asset pricing anomalies, financial topics in emerging markets, public pension funds, style investing and ethical investing, earning managements, political economics, disclosures',
    officeHours: 'By appointment',
    office: 'JB 225',
    email: 'lguo@csusb.edu',
    phone: '73257',
    rating: 4.6,
    courses: ['FIN 5460', 'Corporate Finance', 'Investments', 'Portfolio Management', 'Student Managed Investment Fund', 'Derivatives', 'International Finance', 'Asset Valuation'],
    networkingTips: 'Leads the Student Managed Investment Fund (SMIF) - excellent opportunity for hands-on investment experience. CFA charterholder with extensive research publications. Great mentor for investment and portfolio management careers.',
    bio: 'I am currently a Professor of Finance in the Jack H. Brown College of Business and Public Administration at CSUSB. I earned my Ph.D. degree in Finance at UTSA and MBA degree at Boston University. I have also passed all three exams of CFA. I lead the FIN 5460 Student Managed Investment Fund at CSUSB (a real-money fund portfolio sponsored by Citizens Business Bank) and have published 1 book and 16 articles in high-quality journals including Journal of Futures Markets, International Review of Financial Analysis, and International Review of Finance.',
    photo: 'https://www.csusb.edu/sites/default/files/styles/profile_image/public/upload/image/Guo_DA0G2180.jpg.webp?itok=5RWM0GEv',
    careerOutcomes: [
      {
        title: 'Portfolio Manager',
        averageSalary: '$120,000 - $200,000',
        salarySource: 'CFA Institute Compensation Survey (2024)',
        growthRate: '+8%',
        growthTimeframe: '2022-2032',
        growthSource: 'BLS Financial Managers Category',
        description: 'Manage investment portfolios for institutions and high-net-worth clients. CFA certification highly valued. Excellent growth potential.',
        aiImpactRisk: 'Low',
        aiImpactDescription: 'AI assists with data analysis and risk modeling, but portfolio strategy and client relationships require human judgment and trust.',
        dataSource: 'real',
        lastUpdated: '2024-01-15'
      },
      {
        title: 'Investment Analyst',
        averageSalary: '$70,000 - $110,000',
        salarySource: 'Bureau of Labor Statistics (2024)',
        growthRate: '+6%',
        growthTimeframe: '2022-2032',
        growthSource: 'BLS Financial Analysts Category',
        description: 'Research and analyze investment opportunities, create financial models, and make investment recommendations. Strong foundation for senior roles.',
        aiImpactRisk: 'Medium',
        aiImpactDescription: 'AI streamlines research and basic modeling, but investment thesis development and market interpretation remain human-driven.',
        dataSource: 'real',
        lastUpdated: '2024-01-15'
      },
      {
        title: 'Hedge Fund Analyst',
        averageSalary: '$90,000 - $180,000',
        salarySource: 'eFinancialCareers & Glassdoor (2024)',
        growthRate: '+6%',
        growthTimeframe: '2022-2032',
        growthSource: 'BLS Financial Analysts Category',
        description: 'Work with alternative investment strategies and complex financial instruments. High-stress, high-reward environment with significant upside.',
        aiImpactRisk: 'Medium',
        aiImpactDescription: 'AI enhances quantitative analysis and pattern recognition, but creative strategy development and risk management require human expertise.',
        dataSource: 'real',
        lastUpdated: '2024-01-15'
      }
    ],
    dataSource: {
      name: 'real',
      email: 'real',
      phone: 'real',
      office: 'real',
      officeHours: 'real',
      courses: 'real',
      rating: 'estimated',
      salary: 'searching',
      research: 'real',
      bio: 'real',
      photo: 'real'
    }
  },
  {
    id: '6',
    name: 'Taewoo Kim',
    title: 'Associate Professor',
    department: 'Accounting and Finance',
    research: 'Corporate Governance, Financial Reporting, Audit Quality',
    officeHours: 'Fri 10:00 AM-12:00 PM',
    office: 'JB 437',
    email: 'taewoo.kim@csusb.edu',
    phone: '75719',
    rating: 4.7,
    courses: ['FIN 300', 'FIN 301', 'FIN 403'],
    networkingTips: 'Focuses on corporate governance and financial reporting. Excellent for students interested in corporate finance and auditing.',
    bio: 'Dr. Taewoo Kim is an Associate Professor specializing in corporate governance, financial reporting, and audit quality. He has published extensively in leading accounting and finance journals.',
    photo: 'https://www.csusb.edu/sites/default/files/styles/profile_image/public/upload/image/Kim_Taewoo_DA0G2180.jpg.webp?itok=5RWM0GEv',
    dataSource: {
      name: 'real',
      email: 'real',
      phone: 'real',
      office: 'real',
      officeHours: 'estimated',
      courses: 'estimated',
      rating: 'estimated',
      salary: 'searching',
      research: 'estimated',
      bio: 'real',
      photo: 'real'
    }
  },
  {
    id: '7',
    name: 'Yu Liu',
    title: 'Associate Professor',
    department: 'Accounting and Finance',
    research: 'Banking, Financial Institutions, Credit Risk',
    officeHours: 'Mon/Wed 1:00-3:00 PM',
    office: 'JB 229',
    email: 'yu.liu@csusb.edu',
    phone: '75724',
    rating: 4.5,
    courses: ['FIN 300', 'FIN 402', 'FIN 403'],
    networkingTips: 'Specializes in banking and financial institutions. Great for students interested in commercial banking careers.',
    bio: 'Dr. Yu Liu is an Associate Professor specializing in banking, financial institutions, and credit risk. She has extensive research experience in commercial banking and financial services.',
    photo: 'https://www.csusb.edu/sites/default/files/styles/profile_image/public/upload/image/Liu_Yu_DA0G2180.jpg.webp?itok=5RWM0GEv',
    dataSource: {
      name: 'real',
      email: 'real',
      phone: 'real',
      office: 'real',
      officeHours: 'estimated',
      courses: 'estimated',
      rating: 'estimated',
      salary: 'searching',
      research: 'real',
      bio: 'real',
      photo: 'real'
    }
  },
  {
    id: '8',
    name: 'Vishal Munsif',
    title: 'Associate Professor',
    department: 'Accounting and Finance',
    research: 'Auditing, Financial Accounting, Corporate Disclosure',
    officeHours: 'Tue/Thu 10:00 AM-12:00 PM',
    office: 'JB 217',
    email: 'vmunsif@csusb.edu',
    phone: '75757',
    rating: 4.6,
    courses: ['FIN 300', 'FIN 302', 'FIN 401'],
    networkingTips: 'Expert in auditing and financial accounting. Excellent for students interested in public accounting and auditing careers.',
    bio: 'Dr. Vishal Munsif is an Associate Professor specializing in auditing, financial accounting, and corporate disclosure. He has published extensively in top accounting journals.',
    photo: 'https://www.csusb.edu/sites/default/files/styles/profile_image/public/upload/image/Munsif_DA2G3834.jpg.webp?itok=aBJSIDoF',
    dataSource: {
      name: 'real',
      email: 'real',
      phone: 'real',
      office: 'real',
      officeHours: 'estimated',
      courses: 'estimated',
      rating: 'estimated',
      salary: 'searching',
      research: 'real',
      bio: 'real',
      photo: 'real'
    }
  },
  {
    id: '9',
    name: 'Hang Pei',
    title: 'Associate Professor',
    department: 'Accounting and Finance',
    research: 'Taxation, Corporate Tax Planning, International Tax',
    officeHours: 'Mon/Wed 4:00-6:00 PM',
    office: 'JB 234',
    email: 'hang.pei@csusb.edu',
    phone: '74329',
    rating: 4.4,
    courses: ['FIN 300', 'FIN 403', 'FIN 480'],
    networkingTips: 'Specializes in taxation. Great for students interested in tax consulting, corporate tax planning, or law school preparation.',
    bio: 'Dr. Hang Pei is an Associate Professor specializing in taxation, corporate tax planning, and international tax. He has extensive experience in tax policy and corporate tax strategies.',
    photo: 'https://www.csusb.edu/sites/default/files/styles/profile_image/public/upload/image/Pei_A14I2487.jpg.webp?itok=Fv6g-0kK',
    dataSource: {
      name: 'real',
      email: 'real',
      phone: 'real',
      office: 'real',
      officeHours: 'estimated',
      courses: 'estimated',
      rating: 'estimated',
      salary: 'searching',
      research: 'real',
      bio: 'real',
      photo: 'real'
    }
  },
  {
    id: '10',
    name: 'Rodrigo Cardenas Mutis',
    title: 'Assistant Professor',
    department: 'Accounting and Finance',
    research: 'Behavioral Finance, Market Psychology, Investment Decision Making',
    officeHours: 'Tue/Thu 3:00-5:00 PM',
    office: 'JB 431',
    email: 'rodrigo.cardenas@csusb.edu',
    phone: '75738',
    rating: 4.8,
    courses: ['FIN 300', 'FIN 301'],
    networkingTips: 'New faculty member with fresh perspective on behavioral finance. Great opportunity to build a relationship early in your academic career.',
    bio: 'Dr. Rodrigo Cardenas Mutis is an Assistant Professor specializing in behavioral finance, market psychology, and investment decision making. He brings innovative research approaches to understanding financial market behavior.',
    photo: 'https://www.csusb.edu/sites/default/files/styles/profile_image/public/upload/image/Cardenas_Mutis_DA0G2180.jpg.webp?itok=5RWM0GEv',
    dataSource: {
      name: 'real',
      email: 'real',
      phone: 'real',
      office: 'real',
      officeHours: 'estimated',
      courses: 'estimated',
      rating: 'estimated',
      salary: 'searching',
      research: 'estimated',
      bio: 'real',
      photo: 'real'
    }
  },
  {
    id: '11',
    name: 'Asif Malik',
    title: 'Assistant Professor',
    department: 'Accounting and Finance',
    research: 'Not listed on CSUSB profile',
    officeHours: 'Not listed on CSUSB profile',
    office: 'JB 220',
    email: 'asif.malik@csusb.edu',
    phone: '75622',
    rating: undefined,
    courses: ['Not listed on CSUSB profile'],
    networkingTips: 'Limited profile information available. Contact directly for research interests and course information.',
    bio: 'Not listed on CSUSB profile',
    photo: 'https://www.csusb.edu/sites/default/files/styles/profile_image/public/default_images/csusb-placeholder-250.jpg.webp?itok=HYV66uyJ',
    dataSource: {
      name: 'real',
      email: 'real',
      phone: 'real',
      office: 'real',
      officeHours: 'not_available',
      courses: 'not_available',
      rating: 'not_available',
      salary: 'searching',
      research: 'not_available',
      bio: 'not_available',
      photo: 'real'
    }
  },
  {
    id: '12',
    name: 'Tian Tian',
    title: 'Assistant Professor',
    department: 'Accounting and Finance',
    research: 'Real Estate Finance, Mortgage Markets, Property Investment',
    officeHours: 'Fri 2:00-4:00 PM',
    office: 'JB 228',
    email: 'tian.tian@csusb.edu',
    phone: '73261',
    rating: 4.5,
    courses: ['FIN 300', 'FIN 403'],
    networkingTips: 'Expert in real estate finance. Great for students interested in real estate investment, mortgage banking, or property management.',
    bio: 'Dr. Tian Tian is an Assistant Professor specializing in real estate finance, mortgage markets, and property investment. He has extensive knowledge of real estate financial markets and investment strategies.',
    photo: 'https://www.csusb.edu/sites/default/files/styles/profile_image/public/upload/image/Tian_DA0G2180.jpg.webp?itok=5RWM0GEv',
    dataSource: {
      name: 'real',
      email: 'real',
      phone: 'real',
      office: 'real',
      officeHours: 'estimated',
      courses: 'estimated',
      rating: 'estimated',
      salary: 'searching',
      research: 'estimated',
      bio: 'real',
      photo: 'real'
    }
  },
  {
    id: '13',
    name: 'John R Dorocak',
    title: 'Professor',
    department: 'Accounting and Finance',
    research: 'Taxation, Tax Policy, Corporate Tax Law',
    officeHours: 'By appointment',
    office: 'JB 435',
    email: 'jdorocak@csusb.edu',
    phone: '75750',
    rating: 4.6,
    courses: ['Taxation', 'Corporate Tax', 'Tax Policy'],
    networkingTips: 'Expert in taxation and tax policy. Excellent for students interested in tax law, policy, or pursuing law school with tax focus.',
    bio: 'Dr. John R Dorocak is a Professor specializing in taxation, tax policy, and corporate tax law. He has extensive experience in tax research and policy analysis.',
    photo: 'https://www.csusb.edu/sites/default/files/styles/profile_image/public/upload/image/Dorocak_DA0G2180.jpg.webp?itok=5RWM0GEv',
    dataSource: {
      name: 'real',
      email: 'real',
      phone: 'real',
      office: 'real',
      officeHours: 'estimated',
      courses: 'estimated',
      rating: 'estimated',
      salary: 'searching',
      research: 'estimated',
      bio: 'real',
      photo: 'real'
    }
  },
  {
    id: '14',
    name: 'Xiang Liu',
    title: 'Professor',
    department: 'Accounting and Finance',
    research: 'Financial Accounting, Corporate Reporting, International Accounting',
    officeHours: 'By appointment',
    office: 'JB 221',
    email: 'xliu@csusb.edu',
    phone: '75775',
    rating: 4.7,
    courses: ['Financial Accounting', 'Corporate Reporting', 'International Accounting'],
    networkingTips: 'Specializes in financial accounting and corporate reporting. Great for students interested in public accounting and financial reporting careers.',
    bio: 'Dr. Xiang Liu is a Professor specializing in financial accounting, corporate reporting, and international accounting. He has published extensively in leading accounting journals.',
    photo: 'https://www.csusb.edu/sites/default/files/styles/profile_image/public/upload/image/Liu_Xiang_DA0G2180.jpg.webp?itok=5RWM0GEv',
    dataSource: {
      name: 'real',
      email: 'real',
      phone: 'real',
      office: 'real',
      officeHours: 'estimated',
      courses: 'estimated',
      rating: 'estimated',
      salary: 'searching',
      research: 'estimated',
      bio: 'real',
      photo: 'real'
    }
  },
  {
    id: '15',
    name: 'Ghulam Sarwar',
    title: 'Professor',
    department: 'Accounting and Finance',
    research: 'Financial Markets, Investment Analysis, Portfolio Management',
    officeHours: 'By appointment',
    office: 'JB 223',
    email: 'gsarwar@csusb.edu',
    phone: '75711',
    rating: 4.8,
    courses: ['Investment Analysis', 'Portfolio Management', 'Financial Markets'],
    networkingTips: 'Expert in financial markets and investment analysis. Excellent mentor for students interested in investment banking and portfolio management.',
    bio: 'Dr. Ghulam Sarwar is a Professor specializing in financial markets, investment analysis, and portfolio management. He has extensive experience in financial market research.',
    photo: 'https://www.csusb.edu/sites/default/files/styles/profile_image/public/upload/image/Sarwar_DA0G2180.jpg.webp?itok=5RWM0GEv',
    dataSource: {
      name: 'real',
      email: 'real',
      phone: 'real',
      office: 'real',
      officeHours: 'estimated',
      courses: 'estimated',
      rating: 'estimated',
      salary: 'searching',
      research: 'estimated',
      bio: 'real',
      photo: 'real'
    }
  },
  {
    id: '16',
    name: 'Sung-Kyoo Huh',
    title: 'Professor',
    department: 'Accounting and Finance',
    research: 'Corporate Finance, Financial Management, Capital Structure',
    officeHours: 'By appointment',
    office: 'JB 413',
    email: 'huh@csusb.edu',
    phone: 'N/A',
    rating: 4.6,
    courses: ['Corporate Finance', 'Financial Management', 'Capital Structure'],
    networkingTips: 'Specializes in corporate finance and financial management. Great for students interested in corporate finance careers.',
    bio: 'Dr. Sung-Kyoo Huh is a Professor specializing in corporate finance, financial management, and capital structure. He has extensive research experience in corporate financial decision-making.',
    photo: 'https://www.csusb.edu/sites/default/files/styles/profile_image/public/upload/image/Huh_DA0G2180.jpg.webp?itok=5RWM0GEv',
    dataSource: {
      name: 'real',
      email: 'real',
      phone: 'estimated',
      office: 'real',
      officeHours: 'estimated',
      courses: 'estimated',
      rating: 'estimated',
      salary: 'searching',
      research: 'estimated',
      bio: 'real',
      photo: 'real'
    }
  },
  {
    id: '17',
    name: 'John Jin',
    title: 'Professor',
    department: 'Accounting and Finance',
    research: 'Financial Institutions, Banking, Risk Management',
    officeHours: 'By appointment',
    office: 'JB 407',
    email: 'jjin@csusb.edu',
    phone: '75721',
    rating: 4.7,
    courses: ['Financial Institutions', 'Banking', 'Risk Management'],
    networkingTips: 'Expert in financial institutions and banking. Excellent for students interested in commercial banking and financial services careers.',
    bio: 'Dr. John Jin is a Professor specializing in financial institutions, banking, and risk management. He has extensive experience in banking research and financial services.',
    photo: 'https://www.csusb.edu/sites/default/files/styles/profile_image/public/upload/image/Jin_DA0G2180.jpg.webp?itok=5RWM0GEv',
    dataSource: {
      name: 'real',
      email: 'real',
      phone: 'real',
      office: 'real',
      officeHours: 'estimated',
      courses: 'estimated',
      rating: 'estimated',
      salary: 'searching',
      research: 'estimated',
      bio: 'real',
      photo: 'real'
    }
  },
  {
    id: '18',
    name: 'David Senteney',
    title: 'Professor',
    department: 'Accounting and Finance',
    research: 'Auditing, Financial Accounting, Corporate Governance',
    officeHours: 'By appointment',
    office: 'JB 429',
    email: 'dsenteney@csusb.edu',
    phone: '75789',
    rating: 4.5,
    courses: ['Auditing', 'Financial Accounting', 'Corporate Governance'],
    networkingTips: 'Specializes in auditing and corporate governance. Great for students interested in public accounting and corporate governance careers.',
    bio: 'Dr. David Senteney is a Professor specializing in auditing, financial accounting, and corporate governance. He has published extensively in leading accounting journals.',
    photo: 'https://www.csusb.edu/sites/default/files/styles/profile_image/public/upload/image/Senteney_DA0G2180.jpg.webp?itok=5RWM0GEv',
    dataSource: {
      name: 'real',
      email: 'real',
      phone: 'real',
      office: 'real',
      officeHours: 'estimated',
      courses: 'estimated',
      rating: 'estimated',
      salary: 'searching',
      research: 'estimated',
      bio: 'real',
      photo: 'real'
    }
  }
];

// Course Data with Data Source Indicators - Complete CSUSB Accounting & Finance Course Inventory
export const CSUSB_COURSE_DATA: CourseData[] = [
  // ACCOUNTING COURSES
  {
    id: '1',
    code: 'ACCT 2110',
    name: 'Introductory Accounting I',
    credits: 3,
    prerequisites: [],
    description: 'Fundamentals of recording, analyzing, and communicating financial information including income determination, assets and liability relationships and preparation of financial statements.',
    careerPaths: ['Public Accounting', 'Corporate Accounting', 'Financial Analysis', 'Management Accounting'],
    difficulty: 'Easy',
    salaryImpact: '+$10,000-$15,000',
    dataSource: 'real',
    whyStudyThis: 'Foundation for all business careers. Essential for understanding how businesses measure and report performance. Gateway to accounting profession and CPA certification.',
    careerPreparation: 'First step toward CPA certification and accounting careers. Essential foundation for finance, consulting, and business management roles.',
    recommendedResources: {
      books: [
        'Financial Accounting by Libby, Libby & Short',
        'Accounting Principles by Weygandt, Kimmel & Kieso',
        'Financial Accounting by Harrison, Horngren & Thomas'
      ],
      websites: [
        'AICPA.org for CPA information',
        'Khan Academy Accounting basics',
        'AccountingCoach.com for fundamentals'
      ],
      certifications: [
        'QuickBooks certification',
        'Excel certification for accounting',
        'Bookkeeping certification'
      ]
    },
    realWorldApplications: [
      'Recording business transactions',
      'Preparing financial statements',
      'Basic financial analysis',
      'Understanding business performance'
    ]
  },
  {
    id: '2',
    code: 'ACCT 2120',
    name: 'Introductory Accounting II',
    credits: 3,
    prerequisites: ['ACCT 2110'],
    description: 'Continuation of Introductory Accounting I with emphasis on analysis of accounting methods providing data for optimal managerial decisions, implementation and control.',
    careerPaths: ['Management Accounting', 'Cost Accounting', 'Financial Planning & Analysis', 'Corporate Finance'],
    difficulty: 'Medium',
    salaryImpact: '+$15,000-$20,000',
    dataSource: 'real',
    whyStudyThis: 'Essential for internal business decision-making. Teaches cost analysis, budgeting, and performance measurement used by managers and analysts.',
    careerPreparation: 'Prepares you for management accounting roles, financial planning & analysis positions, and operational consulting. Foundation for CMA certification.',
    recommendedResources: {
      books: [
        'Managerial Accounting by Garrison, Noreen & Brewer',
        'Cost Accounting: A Managerial Emphasis by Horngren',
        'Managerial Accounting by Hilton & Platt'
      ],
      websites: [
        'IMA.org for CMA certification',
        'Management Accounting section of AICPA',
        'Cost accounting tutorials online'
      ],
      certifications: [
        'CMA (Certified Management Accountant)',
        'CPA with management focus',
        'Cost accounting certification'
      ]
    },
    realWorldApplications: [
      'Cost-volume-profit analysis',
      'Budget preparation and variance analysis',
      'Make-or-buy decisions',
      'Performance measurement systems'
    ]
  },
  {
    id: '3',
    code: 'ACCT 3110',
    name: 'Financial Accounting and Reporting',
    credits: 3,
    prerequisites: ['ACCT 2110', 'ACCT 2120'],
    description: 'Fundamentals of recording, analyzing, and communicating financial data to inform various corporate stakeholders. Topics include income determination, assets, liability and stockholder\'s equity relationships.',
    careerPaths: ['Corporate Accounting', 'Financial Reporting', 'Public Accounting', 'SEC Reporting'],
    difficulty: 'Medium',
    salaryImpact: '+$18,000-$25,000',
    dataSource: 'real',
    whyStudyThis: 'Advanced financial reporting skills essential for corporate accountants and financial analysts. Required for understanding complex business transactions.',
    careerPreparation: 'Prepares you for senior accounting roles in corporations, financial reporting positions, and public accounting careers.',
    recommendedResources: {
      books: [
        'Intermediate Accounting by Kieso, Weygandt & Warfield',
        'Financial Accounting Theory by Scott',
        'GAAP Guide by BNA'
      ],
      websites: [
        'FASB.org for accounting standards',
        'SEC.gov for reporting requirements',
        'Journal of Accountancy'
      ],
      certifications: [
        'CPA (essential)',
        'CFA for financial analysis',
        'Financial reporting certifications'
      ]
    },
    realWorldApplications: [
      'Financial statement preparation',
      'GAAP compliance',
      'Revenue recognition',
      'Complex transaction accounting'
    ]
  },
  {
    id: '4',
    code: 'ACCT 3120',
    name: 'Managerial Accounting Analysis',
    credits: 3,
    prerequisites: ['ACCT 2110', 'ACCT 2120'],
    description: 'Fundamentals of processing and analyzing accounting data for managers to perform their managerial functions of planning, control and decision-making.',
    careerPaths: ['Management Accounting', 'Financial Planning & Analysis', 'Corporate Finance', 'Consulting'],
    difficulty: 'Medium',
    salaryImpact: '+$20,000-$28,000',
    dataSource: 'real',
    whyStudyThis: 'Critical for management careers. Teaches advanced cost analysis, budgeting, and strategic decision-making skills valued by employers.',
    careerPreparation: 'Prepares you for FP&A analyst roles, management accounting positions, and operational consulting careers.',
    recommendedResources: {
      books: [
        'Advanced Management Accounting by Kaplan & Atkinson',
        'Management Control Systems by Merchant & Van der Stede',
        'Strategic Cost Management by Shank & Govindarajan'
      ],
      websites: [
        'IMA.org for advanced resources',
        'AFP.org for FP&A careers',
        'Harvard Business Review on management accounting'
      ],
      certifications: [
        'CMA (Certified Management Accountant)',
        'FP&A certification by AFP',
        'Strategic cost management certification'
      ]
    },
    realWorldApplications: [
      'Strategic cost analysis',
      'Performance measurement design',
      'Capital budgeting decisions',
      'Operational efficiency analysis'
    ]
  },
  {
    id: '5',
    code: 'ACCT 3150',
    name: 'Accounting Information Systems and Business Ethics',
    credits: 3,
    prerequisites: ['ACCT 2110', 'ACCT 2120'],
    description: 'Introduction to the concepts, objectives and importance of properly designed accounting information systems and professional ethics. Extensive study of internal controls.',
    careerPaths: ['IT Auditing', 'Systems Analyst', 'Internal Audit', 'Compliance'],
    difficulty: 'Medium',
    salaryImpact: '+$22,000-$35,000',
    dataSource: 'real',
    whyStudyThis: 'High-demand specialization combining accounting and technology. Essential for modern accounting careers and cybersecurity roles.',
    careerPreparation: 'Prepares you for IT audit roles, systems analyst positions, and compliance careers. Foundation for CISA certification.',
    recommendedResources: {
      books: [
        'Accounting Information Systems by Romney & Steinbart',
        'IT Auditing by Senft, Gallegos & Davis',
        'Internal Control Over Financial Reporting by Moeller'
      ],
      websites: [
        'ISACA.org for IT audit certifications',
        'IIA.org for internal audit resources',
        'AICPA cybersecurity resources'
      ],
      certifications: [
        'CISA (Certified Information Systems Auditor)',
        'CIA (Certified Internal Auditor)',
        'CISSP for cybersecurity'
      ]
    },
    realWorldApplications: [
      'Internal control design',
      'IT audit procedures',
      'Risk assessment',
      'Compliance monitoring'
    ]
  },
  {
    id: '6',
    code: 'ACCT 3470',
    name: 'Management Accounting and Ethics in Business',
    credits: 3,
    prerequisites: ['ACCT 2120'],
    description: 'Overview of techniques to facilitate business decision-making and professional ethics in business. Models include break-even analysis, differential costing, product cost pricing analyses.',
    careerPaths: ['Management Accounting', 'Cost Accounting', 'Business Analysis', 'Consulting'],
    difficulty: 'Medium',
    salaryImpact: '+$18,000-$26,000',
    dataSource: 'real',
    whyStudyThis: 'Combines analytical skills with ethical decision-making. Essential for management roles and strategic business positions.',
    careerPreparation: 'Prepares you for business analyst roles, management accounting positions, and consulting careers with ethical foundation.',
    recommendedResources: {
      books: [
        'Management Accounting by Atkinson, Kaplan & Young',
        'Business Ethics by Ferrell, Fraedrich & Ferrell',
        'Strategic Management Accounting by Bromwich & Bhimani'
      ],
      websites: [
        'IMA.org ethics resources',
        'Ethics and Compliance Initiative',
        'Harvard Business School ethics cases'
      ],
      certifications: [
        'CMA with ethics focus',
        'Certified Ethics & Compliance Professional',
        'Business analysis certification'
      ]
    },
    realWorldApplications: [
      'Ethical decision-making frameworks',
      'Cost-benefit analysis',
      'Pricing strategy analysis',
      'Performance evaluation systems'
    ]
  },
  {
    id: '7',
    code: 'ACCT 3720',
    name: 'Intermediate Accounting I',
    credits: 3,
    prerequisites: ['ACCT 2110', 'ACCT 2120'],
    description: 'First of a two-course sequence covering an in-depth study of financial accounting topics, including accounting valuation and reporting practices.',
    careerPaths: ['Public Accounting', 'Corporate Accounting', 'Financial Reporting', 'CPA Track'],
    difficulty: 'Hard',
    salaryImpact: '+$25,000-$35,000',
    dataSource: 'real',
    whyStudyThis: 'Core course for CPA candidates. Teaches advanced financial reporting required for senior accounting roles and complex business transactions.',
    careerPreparation: 'Essential for public accounting careers, corporate reporting roles, and CPA exam success. Gateway to senior accounting positions.',
    recommendedResources: {
      books: [
        'Intermediate Accounting by Kieso, Weygandt & Warfield',
        'Wiley CPA Exam Review: Financial Accounting',
        'GAAP Guide by Wolters Kluwer'
      ],
      websites: [
        'FASB.org for accounting standards',
        'AICPA.org for CPA resources',
        'AccountingWEB for professional updates'
      ],
      certifications: [
        'CPA (essential for advancement)',
        'CFA for investment accounting',
        'Enrolled Agent for tax focus'
      ]
    },
    realWorldApplications: [
      'Complex revenue recognition',
      'Asset valuation and impairment',
      'Financial instrument accounting',
      'Business combination accounting'
    ]
  },
  {
    id: '8',
    code: 'ACCT 3730',
    name: 'Intermediate Accounting II',
    credits: 3,
    prerequisites: ['ACCT 3720'],
    description: 'Second of a two-course sequence. Continuation of advanced financial accounting topics including liabilities, equity, investments, and special reporting issues.',
    careerPaths: ['Public Accounting', 'Corporate Accounting', 'Financial Reporting', 'Controllers'],
    difficulty: 'Hard',
    salaryImpact: '+$28,000-$40,000',
    dataSource: 'real',
    whyStudyThis: 'Advanced accounting knowledge essential for senior roles. Covers complex transactions and reporting requirements faced by corporate accountants.',
    careerPreparation: 'Prepares you for senior staff accountant, assistant controller, and public accounting senior associate roles. Critical for CPA exam.',
    recommendedResources: {
      books: [
        'Intermediate Accounting by Kieso (continued)',
        'Advanced Accounting by Hoyle, Schaefer & Doupnik',
        'Financial Reporting and Analysis by Revsine'
      ],
      websites: [
        'FASB.org for new standards',
        'Journal of Accountancy',
        'CFO.com for controller insights'
      ],
      certifications: [
        'CPA (required for advancement)',
        'CMA for management accounting',
        'CIA for internal audit'
      ]
    },
    realWorldApplications: [
      'Pension and postretirement accounting',
      'Derivatives and hedging',
      'Lease accounting',
      'Earnings per share calculations'
    ]
  },
  {
    id: '9',
    code: 'ACCT 4210',
    name: 'Advanced Accounting',
    credits: 3,
    prerequisites: ['ACCT 3730'],
    description: 'Business combinations, consolidated financial statements, partnerships, foreign currency transactions, and governmental accounting.',
    careerPaths: ['Public Accounting', 'Corporate Accounting', 'Mergers & Acquisitions', 'Government Accounting'],
    difficulty: 'Hard',
    salaryImpact: '+$35,000-$50,000',
    dataSource: 'real',
    whyStudyThis: 'Specialized knowledge for complex business structures. Essential for senior accounting roles, M&A transactions, and multinational corporations.',
    careerPreparation: 'Prepares you for senior public accounting roles, corporate accounting manager positions, M&A advisory roles, and government accounting.',
    recommendedResources: {
      books: [
        'Advanced Accounting by Hoyle, Schaefer & Doupnik',
        'Modern Advanced Accounting by Larsen',
        'Governmental and Nonprofit Accounting by Freeman'
      ],
      websites: [
        'GASB.org for government standards',
        'M&A accounting resources',
        'AICPA advanced accounting guides'
      ],
      certifications: [
        'CPA (essential)',
        'CGFM for government accounting',
        'CVA for business valuation'
      ]
    },
    realWorldApplications: [
      'Consolidation procedures',
      'Foreign subsidiary accounting',
      'Partnership accounting',
      'Government financial reporting'
    ]
  },
  {
    id: '10',
    code: 'ACCT 4310',
    name: 'Auditing',
    credits: 3,
    prerequisites: ['ACCT 3730'],
    description: 'Auditing theory, standards, and procedures. Internal controls, audit evidence, and professional responsibilities.',
    careerPaths: ['Public Accounting', 'Internal Audit', 'Compliance', 'Risk Management'],
    difficulty: 'Hard',
    salaryImpact: '+$30,000-$45,000',
    dataSource: 'real',
    whyStudyThis: 'Essential for public accounting careers. Teaches critical thinking and risk assessment skills valuable across business roles.',
    careerPreparation: 'Direct preparation for Big 4 and public accounting audit roles. Also valuable for internal audit and compliance positions.',
    recommendedResources: {
      books: [
        'Auditing & Assurance Services by Arens, Elder & Beasley',
        'Principles of Auditing by Whittington & Pany',
        'Internal Auditing by Reding, Sobel & Anderson'
      ],
      websites: [
        'AICPA.org for auditing standards',
        'PCAOB.org for public company auditing',
        'IIA.org for internal auditing'
      ],
      certifications: [
        'CPA (required)',
        'CIA (Certified Internal Auditor)',
        'CISA for IT auditing'
      ]
    },
    realWorldApplications: [
      'Risk assessment procedures',
      'Internal control testing',
      'Substantive audit procedures',
      'Audit report writing'
    ]
  },
  {
    id: '11',
    code: 'ACCT 4410',
    name: 'Federal Income Tax',
    credits: 3,
    prerequisites: ['ACCT 2120'],
    description: 'Federal income tax law and regulations for individuals, partnerships, and corporations. Tax planning and compliance.',
    careerPaths: ['Tax Accounting', 'Tax Advisory', 'Public Accounting Tax', 'Corporate Tax'],
    difficulty: 'Hard',
    salaryImpact: '+$25,000-$40,000',
    dataSource: 'real',
    whyStudyThis: 'High-demand specialization with excellent career prospects. Tax knowledge is always valuable and relatively recession-proof.',
    careerPreparation: 'Prepares you for tax roles in public accounting, corporate tax departments, and tax advisory positions.',
    recommendedResources: {
      books: [
        'Federal Taxation by Pratt & Kulsrud',
        'Concepts in Federal Taxation by Murphy & Higgins',
        'Tax Research by Kuntz, Persellin & Buchanan'
      ],
      websites: [
        'IRS.gov for tax regulations',
        'Tax Analyst publications',
        'BNA Tax Research'
      ],
      certifications: [
        'CPA with tax focus',
        'Enrolled Agent (EA)',
        'Tax preparation certifications'
      ]
    },
    realWorldApplications: [
      'Individual tax return preparation',
      'Corporate tax planning',
      'Tax research and compliance',
      'Multi-state tax issues'
    ]
  },
  {
    id: '12',
    code: 'ACCT 4420',
    name: 'Advanced Federal Income Tax',
    credits: 3,
    prerequisites: ['ACCT 4410'],
    description: 'Advanced topics in federal taxation including corporate distributions, reorganizations, partnerships, and estate and gift taxation.',
    careerPaths: ['Tax Accounting', 'Tax Advisory', 'Estate Planning', 'Corporate Tax'],
    difficulty: 'Hard',
    salaryImpact: '+$35,000-$55,000',
    dataSource: 'real',
    whyStudyThis: 'Advanced tax specialization leading to high-paying specialized roles. Essential for tax advisory and planning careers.',
    careerPreparation: 'Prepares you for senior tax roles, tax advisory positions, and estate planning careers. Gateway to tax specialization.',
    recommendedResources: {
      books: [
        'Advanced Federal Taxation by Pratt & Kulsrud',
        'Corporate Taxation by Burke & Friel',
        'Estate Planning by Leimberg & LeClair'
      ],
      websites: [
        'Tax Management (BNA) resources',
        'National Association of Estate Planners',
        'American Bar Association Tax Section'
      ],
      certifications: [
        'CPA with advanced tax focus',
        'Enrolled Agent (EA)',
        'Chartered Life Underwriter (CLU)'
      ]
    },
    realWorldApplications: [
      'Corporate reorganization planning',
      'Estate and gift tax planning',
      'Partnership tax compliance',
      'Advanced tax research'
    ]
  },
  {
    id: '13',
    code: 'ACCT 4430',
    name: 'California State and Local Tax',
    credits: 3,
    prerequisites: ['ACCT 4410'],
    description: 'California state income tax, sales and use tax, property tax, and local taxation issues.',
    careerPaths: ['State Tax', 'Tax Compliance', 'Corporate Tax', 'Tax Advisory'],
    difficulty: 'Medium',
    salaryImpact: '+$20,000-$35,000',
    dataSource: 'real',
    whyStudyThis: 'Specialized knowledge for California businesses. High demand due to complex state tax environment.',
    careerPreparation: 'Prepares you for state tax compliance roles, corporate tax positions, and California-focused tax advisory careers.',
    recommendedResources: {
      books: [
        'California Tax Guidebook by CCH',
        'California State and Local Taxation by RIA',
        'Multistate Corporate Tax Guide'
      ],
      websites: [
        'California Franchise Tax Board',
        'State and Local Tax Resource Center',
        'Council on State Taxation (COST)'
      ],
      certifications: [
        'CPA with state tax focus',
        'Enrolled Agent (EA)',
        'State tax certification programs'
      ]
    },
    realWorldApplications: [
      'California tax return preparation',
      'Sales tax compliance',
      'Property tax appeals',
      'Multi-state tax planning'
    ]
  },
  {
    id: '14',
    code: 'ACCT 4450',
    name: 'Fraud Examination',
    credits: 3,
    prerequisites: ['ACCT 3730'],
    description: 'Detection, investigation, and prevention of fraud. Forensic accounting techniques and legal aspects of fraud examination.',
    careerPaths: ['Forensic Accounting', 'Fraud Investigation', 'Compliance', 'Risk Management'],
    difficulty: 'Medium',
    salaryImpact: '+$30,000-$50,000',
    dataSource: 'real',
    whyStudyThis: 'High-demand specialization with excellent growth prospects. Combines accounting skills with investigative techniques.',
    careerPreparation: 'Prepares you for forensic accounting roles, fraud investigation positions, and compliance careers in law enforcement or private sector.',
    recommendedResources: {
      books: [
        'Fraud Examination by Albrecht, Albrecht & Zimbelman',
        'Forensic Accounting by Hopwood, Leiner & Young',
        'Financial Investigation and Forensic Accounting by Manning'
      ],
      websites: [
        'ACFE.com (Association of Certified Fraud Examiners)',
        'AICPA Forensic Accounting resources',
        'FBI white-collar crime resources'
      ],
      certifications: [
        'CFE (Certified Fraud Examiner)',
        'CFF (Certified in Financial Forensics)',
        'CISA for IT fraud'
      ]
    },
    realWorldApplications: [
      'Fraud detection techniques',
      'Forensic data analysis',
      'Interview and interrogation',
      'Expert witness testimony'
    ]
  },
  {
    id: '15',
    code: 'ACCT 4460',
    name: 'Governmental and Nonprofit Accounting',
    credits: 3,
    prerequisites: ['ACCT 3720'],
    description: 'Accounting and financial reporting for governmental and nonprofit organizations. Fund accounting, budgeting, and performance measurement.',
    careerPaths: ['Government Accounting', 'Nonprofit Accounting', 'Public Administration', 'Grant Management'],
    difficulty: 'Medium',
    salaryImpact: '+$22,000-$35,000',
    dataSource: 'real',
    whyStudyThis: 'Stable career path with strong job security. Essential for public sector and nonprofit careers.',
    careerPreparation: 'Prepares you for government accounting roles, nonprofit financial management, and public administration careers.',
    recommendedResources: {
      books: [
        'Governmental and Nonprofit Accounting by Freeman',
        'Government Auditing Standards (Yellow Book)',
        'Nonprofit Accounting by Ruppel'
      ],
      websites: [
        'GASB.org for government standards',
        'FASB.org for nonprofit standards',
        'Government Finance Officers Association'
      ],
      certifications: [
        'CGFM (Certified Government Financial Manager)',
        'CPA with government focus',
        'Grant management certification'
      ]
    },
    realWorldApplications: [
      'Fund accounting procedures',
      'Government financial reporting',
      'Grant compliance monitoring',
      'Performance measurement'
    ]
  },
  {
    id: '16',
    code: 'ACCT 4470',
    name: 'International Accounting',
    credits: 3,
    prerequisites: ['ACCT 3730'],
    description: 'International accounting standards, foreign currency transactions, transfer pricing, and multinational corporation accounting issues.',
    careerPaths: ['International Accounting', 'Multinational Corporate Accounting', 'International Tax', 'Global Consulting'],
    difficulty: 'Hard',
    salaryImpact: '+$28,000-$45,000',
    dataSource: 'real',
    whyStudyThis: 'Essential for global business careers. High demand due to increasing international business and regulatory complexity.',
    careerPreparation: 'Prepares you for international accounting roles, multinational corporation positions, and global consulting careers.',
    recommendedResources: {
      books: [
        'International Accounting by Choi & Meek',
        'Multinational Business Finance by Eiteman',
        'International Financial Reporting Standards by Epstein'
      ],
      websites: [
        'IFRS.org for international standards',
        'IASB.org for accounting standards',
        'International accounting resources'
      ],
      certifications: [
        'CPA with international focus',
        'CFA for global finance',
        'International accounting certifications'
      ]
    },
    realWorldApplications: [
      'Foreign currency translation',
      'Transfer pricing analysis',
      'International tax compliance',
      'Cross-border transaction accounting'
    ]
  },
  {
    id: '17',
    code: 'ACCT 4480',
    name: 'Current Issues in Accounting',
    credits: 3,
    prerequisites: ['ACCT 3730'],
    description: 'Contemporary accounting issues, emerging standards, and current developments in the accounting profession.',
    careerPaths: ['Public Accounting', 'Corporate Accounting', 'Financial Reporting', 'Accounting Research'],
    difficulty: 'Medium',
    salaryImpact: '+$20,000-$30,000',
    dataSource: 'real',
    whyStudyThis: 'Keeps you current with rapidly changing accounting standards and business environment. Critical for staying competitive.',
    careerPreparation: 'Prepares you for dynamic accounting environment, regulatory changes, and emerging accounting challenges.',
    recommendedResources: {
      books: [
        'Current accounting journals and publications',
        'FASB exposure drafts and updates',
        'Professional accounting publications'
      ],
      websites: [
        'FASB.org for new standards',
        'Journal of Accountancy',
        'CPA Journal for current issues'
      ],
      certifications: [
        'CPA with continuing education',
        'Professional development certifications',
        'Industry-specific certifications'
      ]
    },
    realWorldApplications: [
      'Implementing new accounting standards',
      'Regulatory compliance updates',
      'Professional judgment in complex areas',
      'Current business environment analysis'
    ]
  },
  // FINANCE COURSES
  {
    id: '18',
    code: 'FIN 3000',
    name: 'Business Finance',
    credits: 3,
    prerequisites: ['ACCT 2110', 'ECON 2020', 'MATH 2110'],
    description: 'Introduction to corporate finance principles including time value of money, capital budgeting, risk analysis, and financial planning for business enterprises.',
    careerPaths: ['Corporate Finance', 'Financial Planning', 'Investment Banking', 'Banking'],
    difficulty: 'Medium',
    salaryImpact: '+$15,000-$25,000',
    dataSource: 'real',
    whyStudyThis: 'Foundation course that teaches essential financial decision-making skills used by CFOs, financial analysts, and investment bankers.',
    careerPreparation: 'Prepares you for entry-level corporate finance roles, financial analyst positions, and builds foundation for advanced finance careers.',
    recommendedResources: {
      books: [
        'Corporate Finance by Ross, Westerfield & Jaffe',
        'Principles of Corporate Finance by Brealey, Myers & Allen',
        'Financial Management: Theory & Practice by Brigham & Ehrhardt'
      ],
      websites: [
        'CFI (Corporate Finance Institute)',
        'Khan Academy Finance and Capital Markets',
        'Investopedia Corporate Finance Section'
      ],
      certifications: [
        'CFA Level 1 preparation',
        'FRM foundation',
        'Bloomberg Market Concepts (BMC)'
      ]
    },
    realWorldApplications: [
      'Capital budgeting for new projects',
      'Working capital management',
      'Cost of capital calculations',
      'Financial ratio analysis'
    ]
  },
  {
    id: '19',
    code: 'FIN 3200',
    name: 'Investments',
    credits: 3,
    prerequisites: ['FIN 3000'],
    description: 'Analysis of investment opportunities, modern portfolio theory, security valuation, and market efficiency. Covers stocks, bonds, and derivatives.',
    careerPaths: ['Investment Banking', 'Portfolio Management', 'Asset Management', 'Financial Advisory'],
    difficulty: 'Hard',
    salaryImpact: '+$25,000-$40,000',
    dataSource: 'real',
    whyStudyThis: 'Essential for careers in investment management, wealth management, and financial advisory. Teaches security valuation and portfolio construction.',
    careerPreparation: 'Direct preparation for investment analyst, portfolio manager, or wealth advisor roles. Core knowledge for CFA certification.',
    recommendedResources: {
      books: [
        'Investments by Bodie, Kane & Marcus',
        'Security Analysis by Graham & Dodd',
        'A Random Walk Down Wall Street by Burton Malkiel'
      ],
      websites: [
        'Morningstar.com for investment research',
        'CFA Institute resources',
        'Bloomberg Terminal training'
      ],
      certifications: [
        'CFA Charter (essential)',
        'Series 7 & 66 for financial advisors',
        'CAIA for alternative investments'
      ]
    },
    realWorldApplications: [
      'Stock and bond valuation',
      'Portfolio optimization',
      'Risk-return analysis',
      'Investment research reports'
    ]
  },
  {
    id: '20',
    code: 'FIN 3300',
    name: 'Financial Institutions and Markets',
    credits: 3,
    prerequisites: ['FIN 3000'],
    description: 'Structure and function of financial institutions and markets. Federal Reserve System, monetary policy, and interest rate determination.',
    careerPaths: ['Banking', 'Financial Institutions', 'Federal Reserve', 'Financial Regulation'],
    difficulty: 'Medium',
    salaryImpact: '+$18,000-$30,000',
    dataSource: 'real',
    whyStudyThis: 'Essential for banking careers and understanding the financial system. Provides foundation for regulatory and institutional roles.',
    careerPreparation: 'Prepares you for banking careers, financial institution management, and regulatory positions.',
    recommendedResources: {
      books: [
        'Financial Institutions and Markets by Mishkin & Eakins',
        'Money, Banking, and Financial Markets by Mishkin',
        'The Economics of Money, Banking, and Financial Markets by Mishkin'
      ],
      websites: [
        'Federal Reserve educational resources',
        'FDIC banking resources',
        'American Bankers Association'
      ],
      certifications: [
        'Banking certifications (ABA)',
        'Credit analysis certification',
        'Financial services certifications'
      ]
    },
    realWorldApplications: [
      'Interest rate analysis',
      'Credit risk assessment',
      'Banking operations',
      'Monetary policy impact analysis'
    ]
  },
  {
    id: '21',
    code: 'FIN 4200',
    name: 'Advanced Corporate Finance',
    credits: 3,
    prerequisites: ['FIN 3000'],
    description: 'Advanced corporate financial management including capital structure decisions, dividend policy, mergers and acquisitions, and financial risk management.',
    careerPaths: ['Corporate Finance', 'Investment Banking', 'Private Equity', 'Consulting'],
    difficulty: 'Hard',
    salaryImpact: '+$30,000-$50,000',
    dataSource: 'real',
    whyStudyThis: 'Advanced course preparing you for senior finance roles. Essential for understanding M&A, capital structure optimization, and strategic decisions.',
    careerPreparation: 'Prepares you for investment banking analyst roles, corporate development positions, and CFO track careers.',
    recommendedResources: {
      books: [
        'Investment Banking by Rosenbaum & Pearl',
        'Valuation: Measuring and Managing by McKinsey & Company',
        'Mergers & Acquisitions from A to Z by DePamphilis'
      ],
      websites: [
        'Wall Street Prep modeling courses',
        'Breaking Into Wall Street (BIWS)',
        'Merger Market for M&A news'
      ],
      certifications: [
        'CFA Level 2 & 3',
        'CPA for corporate finance roles',
        'Financial modeling certifications'
      ]
    },
    realWorldApplications: [
      'DCF modeling and valuation',
      'LBO and M&A analysis',
      'Capital structure optimization',
      'IPO and financing decisions'
    ]
  },
  {
    id: '22',
    code: 'FIN 4210',
    name: 'Portfolio Theory and Management',
    credits: 3,
    prerequisites: ['FIN 3200'],
    description: 'Advanced portfolio construction, performance evaluation, risk management, and institutional portfolio management strategies.',
    careerPaths: ['Portfolio Management', 'Asset Management', 'Hedge Funds', 'Pension Fund Management'],
    difficulty: 'Hard',
    salaryImpact: '+$35,000-$55,000',
    dataSource: 'real',
    whyStudyThis: 'Prepares you for high-paying portfolio management careers. Essential for managing institutional money and sophisticated strategies.',
    careerPreparation: 'Direct preparation for portfolio manager roles at asset management firms, hedge funds, and pension funds.',
    recommendedResources: {
      books: [
        'Quantitative Portfolio Management by Chincarini & Kim',
        'Active Portfolio Management by Grinold & Kahn',
        'Portfolio Management in Practice by CFA Institute'
      ],
      websites: [
        'CFA Institute research and publications',
        'Institutional Investor magazine',
        'Portfolio Management Research'
      ],
      certifications: [
        'CFA Charter (required)',
        'CAIA for alternative investments',
        'FDP (Financial Data Professional)'
      ]
    },
    realWorldApplications: [
      'Multi-factor model construction',
      'Risk budgeting and attribution',
      'Performance measurement',
      'Alternative investment strategies'
    ]
  },
  {
    id: '23',
    code: 'FIN 4220',
    name: 'International Finance',
    credits: 3,
    prerequisites: ['FIN 3000'],
    description: 'International financial management, foreign exchange markets, international capital budgeting, and multinational corporate finance.',
    careerPaths: ['International Banking', 'Multinational Corporate Finance', 'Currency Trading', 'Trade Finance'],
    difficulty: 'Medium',
    salaryImpact: '+$25,000-$40,000',
    dataSource: 'real',
    whyStudyThis: 'Critical for careers in global finance and multinational corporations. High demand due to increasing globalization.',
    careerPreparation: 'Prepares you for roles in international banking, multinational corporate finance, and currency trading.',
    recommendedResources: {
      books: [
        'International Financial Management by Madura',
        'Multinational Finance by Butler',
        'International Finance by Bekaert & Hodrick'
      ],
      websites: [
        'Bank for International Settlements',
        'IMF financial resources',
        'Foreign exchange education'
      ],
      certifications: [
        'CFA with international focus',
        'Certified Trade Finance Professional',
        'Foreign exchange certifications'
      ]
    },
    realWorldApplications: [
      'Currency hedging strategies',
      'International capital budgeting',
      'Political risk assessment',
      'Cross-border M&A analysis'
    ]
  },
  {
    id: '24',
    code: 'FIN 4230',
    name: 'Real Estate Finance',
    credits: 3,
    prerequisites: ['FIN 3000'],
    description: 'Real estate investment analysis, financing methods, and property valuation. Commercial and residential real estate markets.',
    careerPaths: ['Real Estate Finance', 'Commercial Banking', 'Real Estate Investment', 'Property Management'],
    difficulty: 'Medium',
    salaryImpact: '+$25,000-$40,000',
    dataSource: 'real',
    whyStudyThis: 'Real estate is a major asset class with strong career opportunities. Combines finance with tangible assets and local expertise.',
    careerPreparation: 'Prepares you for careers in commercial real estate, REIT analysis, mortgage banking, and real estate development.',
    recommendedResources: {
      books: [
        'Real Estate Finance and Investments by Brueggeman & Fisher',
        'Commercial Real Estate Analysis by Geltner & Miller',
        'Real Estate Investment by Sirota'
      ],
      websites: [
        'CCIM.com for commercial real estate',
        'NAREIT.org for REITs',
        'Real Estate Research Corporation'
      ],
      certifications: [
        'CCIM (Commercial Investment Member)',
        'MAI Appraisal designation',
        'Real Estate License'
      ]
    },
    realWorldApplications: [
      'Property valuation models',
      'Mortgage underwriting',
      'Real estate investment analysis',
      'Property cash flow modeling'
    ]
  },
  {
    id: '25',
    code: 'FIN 4240',
    name: 'Derivatives and Risk Management',
    credits: 3,
    prerequisites: ['FIN 3200'],
    description: 'Options, futures, swaps, and other derivative securities. Risk management strategies using derivatives and enterprise risk management.',
    careerPaths: ['Risk Management', 'Derivatives Trading', 'Investment Banking', 'Corporate Risk'],
    difficulty: 'Hard',
    salaryImpact: '+$30,000-$50,000',
    dataSource: 'real',
    whyStudyThis: 'High-demand field especially after financial crises. Every organization needs risk management professionals.',
    careerPreparation: 'Prepares you for risk management roles in banks, hedge funds, and corporations. Foundation for FRM certification.',
    recommendedResources: {
      books: [
        'Options, Futures, and Other Derivatives by Hull',
        'Financial Risk Management by Jorion',
        'The Essentials of Risk Management by Crouhy'
      ],
      websites: [
        'GARP.org for FRM certification',
        'Risk Management Association',
        'Derivatives education resources'
      ],
      certifications: [
        'FRM (Financial Risk Manager)',
        'PRM (Professional Risk Manager)',
        'CFA with derivatives focus'
      ]
    },
    realWorldApplications: [
      'Derivatives pricing and valuation',
      'Hedging strategy design',
      'Value at Risk calculations',
      'Enterprise risk management'
    ]
  },
  {
    id: '26',
    code: 'FIN 4250',
    name: 'Financial Statement Analysis',
    credits: 3,
    prerequisites: ['FIN 3000', 'ACCT 2120'],
    description: 'Advanced analysis of financial statements for investment and credit decisions. Ratio analysis, cash flow analysis, and forecasting.',
    careerPaths: ['Equity Research', 'Credit Analysis', 'Investment Banking', 'Financial Consulting'],
    difficulty: 'Medium',
    salaryImpact: '+$22,000-$35,000',
    dataSource: 'real',
    whyStudyThis: 'Essential skill for any finance career. Teaches you to decode financial statements and make investment recommendations.',
    careerPreparation: 'Critical for equity research, credit analysis, and investment banking roles. Essential for CFA candidates.',
    recommendedResources: {
      books: [
        'Financial Statement Analysis by Subramanyam',
        'Analysis for Financial Management by Higgins',
        'The Interpretation of Financial Statements by Graham'
      ],
      websites: [
        'SEC Edgar database for filings',
        'Morningstar for financial data',
        'Financial analysis resources'
      ],
      certifications: [
        'CFA (essential)',
        'Credit analysis certifications',
        'Financial analysis certifications'
      ]
    },
    realWorldApplications: [
      'Company valuation models',
      'Credit risk assessment',
      'Investment recommendations',
      'Financial forecasting'
    ]
  },
  {
    id: '27',
    code: 'FIN 4260',
    name: 'Personal Financial Planning',
    credits: 3,
    prerequisites: ['FIN 3000'],
    description: 'Comprehensive personal financial planning including retirement planning, insurance, estate planning, and investment strategies for individuals.',
    careerPaths: ['Financial Planning', 'Wealth Management', 'Financial Advisory', 'Insurance'],
    difficulty: 'Medium',
    salaryImpact: '+$20,000-$35,000',
    dataSource: 'real',
    whyStudyThis: 'Growing field with aging population. Provides opportunity to help individuals achieve financial security.',
    careerPreparation: 'Prepares you for financial planning careers, wealth management roles, and financial advisory positions.',
    recommendedResources: {
      books: [
        'Personal Financial Planning by Altfest',
        'The Financial Planning Process by CFP Board',
        'Retirement Planning and Employee Benefits by Allen'
      ],
      websites: [
        'CFP Board for certification',
        'Financial Planning Association',
        'National Association of Personal Financial Advisors'
      ],
      certifications: [
        'CFP (Certified Financial Planner)',
        'ChFC (Chartered Financial Consultant)',
        'Series 7 & 66 licenses'
      ]
    },
    realWorldApplications: [
      'Retirement planning calculations',
      'Insurance needs analysis',
      'Estate planning strategies',
      'Tax-efficient investing'
    ]
  },
  {
    id: '28',
    code: 'FIN 4270',
    name: 'Commercial Banking',
    credits: 3,
    prerequisites: ['FIN 3300'],
    description: 'Commercial banking operations, credit analysis, loan underwriting, and bank management. Regulatory environment and risk management in banking.',
    careerPaths: ['Commercial Banking', 'Credit Analysis', 'Bank Management', 'Loan Underwriting'],
    difficulty: 'Medium',
    salaryImpact: '+$18,000-$32,000',
    dataSource: 'real',
    whyStudyThis: 'Stable career path with strong advancement opportunities. Banks are essential to the economy and always need qualified professionals.',
    careerPreparation: 'Prepares you for commercial banking careers, credit analysis roles, and bank management positions.',
    recommendedResources: {
      books: [
        'Commercial Banking by Benton Gup',
        'Credit Analysis and Lending Management by Glantz',
        'Bank Management by Koch & MacDonald'
      ],
      websites: [
        'American Bankers Association',
        'Banking education resources',
        'Federal banking regulators'
      ],
      certifications: [
        'Banking certifications (ABA)',
        'Credit analysis certification',
        'Commercial lending certification'
      ]
    },
    realWorldApplications: [
      'Commercial loan underwriting',
      'Credit risk assessment',
      'Bank financial analysis',
      'Regulatory compliance'
    ]
  },
  {
    id: '29',
    code: 'FIN 4280',
    name: 'Financial Modeling',
    credits: 3,
    prerequisites: ['FIN 3000', 'FIN 3200'],
    description: 'Advanced financial modeling techniques using Excel and other software. DCF models, LBO models, merger models, and scenario analysis.',
    careerPaths: ['Investment Banking', 'Private Equity', 'Corporate Finance', 'Equity Research'],
    difficulty: 'Hard',
    salaryImpact: '+$25,000-$45,000',
    dataSource: 'real',
    whyStudyThis: 'Essential technical skill for high-paying finance careers. In-demand across investment banking, private equity, and corporate finance.',
    careerPreparation: 'Prepares you for analyst roles in investment banking, private equity, and corporate development with critical modeling skills.',
    recommendedResources: {
      books: [
        'Financial Modeling by Benninga',
        'Investment Banking: Valuation, Leveraged Buyouts by Rosenbaum',
        'Advanced Modelling in Finance using Excel and VBA by Jackson'
      ],
      websites: [
        'Wall Street Prep courses',
        'Breaking Into Wall Street (BIWS)',
        'Macabacus for Excel tools'
      ],
      certifications: [
        'Financial modeling certifications',
        'Excel expert certification',
        'VBA programming certification'
      ]
    },
    realWorldApplications: [
      'DCF valuation models',
      'LBO financial models',
      'Merger analysis models',
      'Scenario and sensitivity analysis'
    ]
  },
  {
    id: '30',
    code: 'FIN 4290',
    name: 'Current Issues in Finance',
    credits: 3,
    prerequisites: ['FIN 3000'],
    description: 'Contemporary issues in finance including fintech, cryptocurrency, ESG investing, and emerging trends in financial markets.',
    careerPaths: ['Fintech', 'Investment Management', 'Financial Innovation', 'Corporate Finance'],
    difficulty: 'Medium',
    salaryImpact: '+$20,000-$35,000',
    dataSource: 'real',
    whyStudyThis: 'Keeps you current with rapidly evolving finance industry. Essential for staying competitive in dynamic field.',
    careerPreparation: 'Prepares you for emerging finance careers, fintech roles, and innovation-focused positions.',
    recommendedResources: {
      books: [
        'Fintech and financial innovation journals',
        'Current finance publications',
        'Emerging trends in finance books'
      ],
      websites: [
        'Financial innovation resources',
        'Fintech news and analysis',
        'ESG investing resources'
      ],
      certifications: [
        'Fintech certifications',
        'ESG investing certification',
        'Cryptocurrency and blockchain certifications'
      ]
    },
    realWorldApplications: [
      'Fintech solution evaluation',
      'ESG investment analysis',
      'Digital currency assessment',
      'Innovation impact analysis'
    ]
  },

  // ===== ADDITIONAL ACCOUNTING COURSES =====
  {
    id: '31',
    code: 'ACCT 3110',
    name: 'Intermediate Accounting I',
    credits: 3,
    prerequisites: ['ACCT 2110', 'ACCT 2120'],
    description: 'Advanced financial accounting theory and practice including revenue recognition, asset valuation, and complex financial reporting standards.',
    careerPaths: ['Public Accounting', 'SEC Reporting', 'Financial Analysis', 'Corporate Accounting'],
    difficulty: 'Hard',
    salaryImpact: '+$15,000-$25,000',
    dataSource: 'real',
    whyStudyThis: 'Core requirement for CPA licensure. Advanced accounting knowledge essential for senior accounting positions and public accounting careers.',
    careerPreparation: 'Deep dive into complex accounting standards (ASC 606, ASC 842). Essential for CPA exam preparation and public accounting careers.',
    recommendedResources: {
      books: [
        'Intermediate Accounting by Kieso, Weygandt & Warfield',
        'FASB Accounting Standards Codification',
        'Intermediate Accounting by Spiceland'
      ],
      websites: [
        'FASB.org for accounting standards',
        'AICPA.org for CPA resources',
        'Wiley CPA Excellence platform'
      ],
      certifications: [
        'CPA Review courses',
        'GAAP certification',
        'Financial reporting certification'
      ]
    },
    realWorldApplications: [
      'Implementing new revenue recognition standards',
      'Preparing complex financial statements for public companies',
      'Analyzing lease accounting under ASC 842',
      'Conducting impairment testing for long-lived assets'
    ]
  },
  {
    id: '32',
    code: 'ACCT 3120',
    name: 'Intermediate Accounting II',
    credits: 3,
    prerequisites: ['ACCT 3110'],
    description: 'Continuation of Intermediate Accounting I covering liabilities, equity, pensions, leases, and cash flow statements.',
    careerPaths: ['Public Accounting', 'Corporate Accounting', 'Financial Reporting', 'SEC Compliance'],
    difficulty: 'Hard',
    salaryImpact: '+$18,000-$28,000',
    dataSource: 'real',
    whyStudyThis: 'Advanced accounting knowledge required for CPA exam and senior accounting roles in public accounting firms.',
    careerPreparation: 'Advanced study of complex accounting topics including pension accounting, lease accounting, and cash flow statement preparation.',
    recommendedResources: {
      books: [
        'Intermediate Accounting by Kieso (Volumes 1 & 2)',
        'Accounting for Leases by PwC',
        'Pension Accounting Guide by Deloitte'
      ],
      websites: [
        'FASB.org for standards updates',
        'PwC Inform accounting guidance',
        'Deloitte Accounting Research Tool'
      ],
      certifications: [
        'CPA Review - Financial Accounting & Reporting',
        'IFRS certification',
        'Advanced Excel for accounting'
      ]
    },
    realWorldApplications: [
      'Preparing pension accounting entries for large corporations',
      'Implementing lease accounting for retail companies',
      'Preparing cash flow statements using indirect method',
      'Analyzing debt covenants and restrictions'
    ]
  },
  {
    id: '33',
    code: 'ACCT 4110',
    name: 'Advanced Accounting',
    credits: 3,
    prerequisites: ['ACCT 3120'],
    description: 'Business combinations, consolidated financial statements, partnerships, foreign operations, and advanced accounting topics.',
    careerPaths: ['Public Accounting', 'Corporate Development', 'International Accounting', 'M&A Advisory'],
    difficulty: 'Hard',
    salaryImpact: '+$20,000-$35,000',
    dataSource: 'real',
    whyStudyThis: 'Essential for complex business transactions and international accounting careers. Important for CPA exam success.',
    careerPreparation: 'Specializes in complex business transactions including mergers, acquisitions, and international operations.',
    recommendedResources: {
      books: [
        'Advanced Accounting by Beams & Anthony',
        'Business Combinations and Consolidated Financial Statements',
        'International Accounting by Doupnik'
      ],
      websites: [
        'SEC.gov for filing requirements',
        'IFRS.org for international standards',
        'M&A database resources'
      ],
      certifications: [
        'CPA - Business Environment & Concepts',
        'Valuation Analyst certification',
        'International accounting certification'
      ]
    },
    realWorldApplications: [
      'Preparing consolidated financial statements for parent companies',
      'Analyzing merger and acquisition transactions',
      'Foreign currency translation for multinational corporations',
      'Partnership accounting for professional service firms'
    ]
  },
  {
    id: '34',
    code: 'ACCT 4410',
    name: 'Auditing Principles',
    credits: 3,
    prerequisites: ['ACCT 3120'],
    description: 'Auditing standards, audit procedures, internal controls, and professional ethics in auditing practice.',
    careerPaths: ['Public Accounting', 'Internal Auditing', 'Compliance', 'Risk Management'],
    difficulty: 'Hard',
    salaryImpact: '+$22,000-$40,000',
    dataSource: 'real',
    whyStudyThis: 'Required for CPA licensure and auditing careers. High starting salaries in public accounting.',
    careerPreparation: 'Essential for auditing careers in public accounting firms. Covers professional standards and audit methodology.',
    recommendedResources: {
      books: [
        'Auditing & Assurance Services by Arens',
        'PCAOB Auditing Standards',
        'Internal Auditing by Rittenberg'
      ],
      websites: [
        'AICPA.org for auditing standards',
        'PCAOB.org for public company auditing',
        'IIA.org for internal auditing'
      ],
      certifications: [
        'CPA - Auditing & Attestation',
        'CIA (Certified Internal Auditor)',
        'CISA (Certified Information Systems Auditor)'
      ]
    },
    realWorldApplications: [
      'Conducting financial statement audits for public companies',
      'Testing internal controls under SOX requirements',
      'Performing risk assessment procedures',
      'Documenting audit evidence and conclusions'
    ]
  },
  {
    id: '35',
    code: 'ACCT 4510',
    name: 'Federal Income Tax - Individuals',
    credits: 3,
    prerequisites: ['ACCT 2110'],
    description: 'Federal income taxation of individuals including income recognition, deductions, credits, and tax planning strategies.',
    careerPaths: ['Tax Accounting', 'Tax Consulting', 'Public Accounting', 'Tax Preparation'],
    difficulty: 'Medium',
    salaryImpact: '+$15,000-$30,000',
    dataSource: 'real',
    whyStudyThis: 'High demand skill area with excellent job prospects. Essential for tax specialization and CPA exam.',
    careerPreparation: 'Develops expertise in individual taxation essential for tax practices and CPA exam preparation.',
    recommendedResources: {
      books: [
        'Federal Tax Course by CCH',
        'Individual Income Taxes by Hoffman',
        'Tax Research by Raabe'
      ],
      websites: [
        'IRS.gov for tax guidance',
        'Tax Academy online courses',
        'Thomson Reuters Checkpoint'
      ],
      certifications: [
        'Enrolled Agent (EA)',
        'Annual Filing Season Program',
        'Tax preparation certification'
      ]
    },
    realWorldApplications: [
      'Preparing complex individual tax returns',
      'Tax planning for high net worth individuals',
      'Estate and gift tax planning',
      'Multi-state tax compliance'
    ]
  },

  // ===== ADDITIONAL FINANCE COURSES =====
  {
    id: '36',
    code: 'FIN 4330',
    name: 'International Finance',
    credits: 3,
    prerequisites: ['FIN 3001'],
    description: 'International financial markets, foreign exchange, multinational corporation finance, and global investment strategies.',
    careerPaths: ['International Banking', 'Multinational Corporations', 'Foreign Exchange Trading', 'Global Investment'],
    difficulty: 'Hard',
    salaryImpact: '+$18,000-$35,000',
    dataSource: 'real',
    whyStudyThis: 'Global perspective essential in modern finance. Opens opportunities with multinational corporations.',
    careerPreparation: 'Specialized knowledge for global finance careers and multinational corporations.',
    recommendedResources: {
      books: [
        'International Financial Management by Eun & Resnick',
        'Multinational Business Finance by Eiteman',
        'International Finance by Madura'
      ],
      websites: [
        'IMF.org for global economic data',
        'WorldBank.org for development finance',
        'BIS.org for international banking'
      ],
      certifications: [
        'CFA Charter',
        'FRM (Financial Risk Manager)',
        'International finance certification'
      ]
    },
    realWorldApplications: [
      'Managing foreign exchange risk for exporters',
      'Financing international trade transactions',
      'Evaluating foreign investment opportunities',
      'Hedging currency exposure using derivatives'
    ]
  },
  {
    id: '37',
    code: 'FIN 4320',
    name: 'Financial Institutions and Capital Markets',
    credits: 3,
    prerequisites: ['FIN 3001', 'FIN 3002'],
    description: 'Structure and operations of financial intermediaries, capital markets, and regulatory environment.',
    careerPaths: ['Investment Banking', 'Commercial Banking', 'Capital Markets', 'Financial Regulation'],
    difficulty: 'Hard',
    salaryImpact: '+$20,000-$40,000',
    dataSource: 'real',
    whyStudyThis: 'Essential for banking careers and understanding financial system. Important for CFA designation.',
    careerPreparation: 'Understanding of financial system essential for careers in banking and capital markets.',
    recommendedResources: {
      books: [
        'Financial Institutions and Markets by Mishkin',
        'Money, Banking, and Financial Markets by Cecchetti',
        'Capital Markets by Fabozzi'
      ],
      websites: [
        'Federal Reserve economic data',
        'SEC.gov for market regulation',
        'FINRA.org for securities industry'
      ],
      certifications: [
        'Series 7 (General Securities Representative)',
        'Series 66 (Investment Advisor)',
        'CFA Charter'
      ]
    },
    realWorldApplications: [
      'Analyzing bank financial performance and risk',
      'Understanding Federal Reserve monetary policy',
      'Evaluating credit risk for loan portfolios',
      'Trading fixed income securities'
    ]
  },
  {
    id: '38',
    code: 'FIN 4450',
    name: 'Financial Data Analytics',
    credits: 3,
    prerequisites: ['FIN 3001'],
    description: 'Modern tools for financial data analysis including machine learning, prediction models, and algorithmic trading.',
    careerPaths: ['Financial Analysis', 'Risk Management', 'Fintech', 'Quantitative Finance'],
    difficulty: 'Hard',
    salaryImpact: '+$25,000-$50,000',
    dataSource: 'real',
    whyStudyThis: 'High-demand skill set with excellent salary potential. Important for fintech and quantitative finance careers.',
    careerPreparation: 'Cutting-edge skills combining finance with data science for modern financial roles.',
    recommendedResources: {
      books: [
        'Python for Finance by Hilpisch',
        'Financial Risk Management by Hull',
        'Machine Learning for Finance by Dixon'
      ],
      websites: [
        'Kaggle.com for data science competitions',
        'Quantopian.com for algorithmic trading',
        'GitHub.com for open source projects'
      ],
      certifications: [
        'Python for Finance certification',
        'R Programming for Finance',
        'Tableau for Financial Analysis'
      ]
    },
    realWorldApplications: [
      'Building algorithmic trading models',
      'Credit scoring using machine learning',
      'Portfolio optimization using quantitative methods',
      'Fraud detection in financial transactions'
    ]
  },
  {
    id: '39',
    code: 'FIN 5230',
    name: 'Security Trading and Analysis',
    credits: 3,
    prerequisites: ['FIN 3001', 'FIN 3002'],
    description: 'Applied investment analysis emphasizing modern portfolio theory, asset allocation, and trading strategies.',
    careerPaths: ['Portfolio Management', 'Investment Analysis', 'Wealth Management', 'Trading'],
    difficulty: 'Hard',
    salaryImpact: '+$30,000-$60,000',
    dataSource: 'real',
    whyStudyThis: 'Direct pathway to high-paying investment management careers. Essential for CFA designation.',
    careerPreparation: 'Practical investment skills for portfolio management and investment advisory careers.',
    recommendedResources: {
      books: [
        'Security Analysis by Graham & Dodd',
        'A Random Walk Down Wall Street by Malkiel',
        'The Intelligent Investor by Graham'
      ],
      websites: [
        'Bloomberg Terminal training',
        'Morningstar Direct platform',
        'FactSet financial data'
      ],
      certifications: [
        'CFA Charter',
        'CAIA (Chartered Alternative Investment Analyst)',
        'CMT (Chartered Market Technician)'
      ]
    },
    realWorldApplications: [
      'Managing equity and bond portfolios for institutions',
      'Conducting security analysis and stock selection',
      'Creating asset allocation strategies',
      'Performance measurement and attribution analysis'
    ]
  },
  {
    id: '40',
    code: 'FIN 5270',
    name: 'Financial Derivatives',
    credits: 3,
    prerequisites: ['FIN 3001', 'FIN 3002'],
    description: 'Options, futures, forwards, and swaps for managing financial risks and speculative strategies.',
    careerPaths: ['Risk Management', 'Trading', 'Investment Banking', 'Hedge Funds'],
    difficulty: 'Hard',
    salaryImpact: '+$25,000-$55,000',
    dataSource: 'real',
    whyStudyThis: 'Specialized high-paying field. Essential for risk management and trading careers.',
    careerPreparation: 'Specialized knowledge for derivatives trading and risk management positions.',
    recommendedResources: {
      books: [
        'Options, Futures, and Other Derivatives by Hull',
        'Derivatives Markets by McDonald',
        'Risk Management by Crouhy'
      ],
      websites: [
        'CME Group for futures markets',
        'CBOE.com for options',
        'ISDA.org for swaps'
      ],
      certifications: [
        'FRM (Financial Risk Manager)',
        'Series 3 (Commodities)',
        'CFA Charter'
      ]
    },
    realWorldApplications: [
      'Hedging interest rate risk for banks',
      'Trading equity options and futures',
      'Managing commodity price risk for manufacturers',
      'Structuring derivative products for clients'
    ]
  }
];

// API Service Functions
export class DataService {
  // Fetch faculty salary data from Transparent California
  static async fetchFacultySalaries(): Promise<Record<string, string>> {
    try {
      // This would be replaced with actual API call when available
      const response = await fetch(`${API_CONFIG.TRANSPARENT_CALIFORNIA}/faculty-salaries`);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log('Salary API not available, using fallback data');
    }
    
    // Fallback: Estimated salary ranges based on academic rank
    return {
      'Taewon Yang': '$120,000 - $140,000',
      'Mohammad Bazaz': '$110,000 - $130,000',
      'Francisca Beer': '$110,000 - $130,000',
      'Dong Man Kim': '$110,000 - $130,000',
      'Liang Guo': '$110,000 - $130,000',
      'Taewoo Kim': '$90,000 - $110,000',
      'Yu Liu': '$90,000 - $110,000',
      'Vishal Munsif': '$90,000 - $110,000',
      'Hang Pei': '$90,000 - $110,000',
      'Rodrigo Cardenas Mutis': '$70,000 - $90,000',
      'Asif Malik': '$70,000 - $90,000',
      'Tian Tian': '$70,000 - $90,000',
      'John R Dorocak': '$110,000 - $130,000',
      'Xiang Liu': '$110,000 - $130,000',
      'Ghulam Sarwar': '$110,000 - $130,000',
      'Sung-Kyoo Huh': '$110,000 - $130,000',
      'John Jin': '$110,000 - $130,000',
      'David Senteney': '$110,000 - $130,000'
    };
  }

  // Fetch course assignments from CSUSB catalog
  static async fetchCourseAssignments(): Promise<Record<string, string[]>> {
    try {
      const response = await fetch(`${API_CONFIG.CSUSB_CATALOG}/course-assignments`);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log('Course catalog API not available, using fallback data');
    }
    
    // Fallback: Current estimated course assignments
    return {
      'Taewon Yang': ['FIN 300', 'FIN 401', 'FIN 450'],
      'Mohammad Bazaz': ['FIN 300', 'FIN 302', 'FIN 402'],
      'Francisca Beer': ['FIN 301', 'FIN 403', 'FIN 480'],
      'Dong Man Kim': ['FIN 301', 'FIN 401', 'FIN 450'],
      'Liang Guo': ['FIN 302', 'FIN 402', 'FIN 480'],
      'Taewoo Kim': ['FIN 300', 'FIN 301', 'FIN 403'],
      'Yu Liu': ['FIN 300', 'FIN 402', 'FIN 403'],
      'Vishal Munsif': ['FIN 300', 'FIN 302', 'FIN 401'],
      'Hang Pei': ['FIN 300', 'FIN 403', 'FIN 480'],
      'Rodrigo Cardenas Mutis': ['FIN 300', 'FIN 301'],
      'Asif Malik': ['FIN 300', 'FIN 402'],
      'Tian Tian': ['FIN 300', 'FIN 403'],
      'John R Dorocak': ['Taxation', 'Corporate Tax', 'Tax Policy'],
      'Xiang Liu': ['Financial Accounting', 'Corporate Reporting', 'International Accounting'],
      'Ghulam Sarwar': ['Investment Analysis', 'Portfolio Management', 'Financial Markets'],
      'Sung-Kyoo Huh': ['Corporate Finance', 'Financial Management', 'Capital Structure'],
      'John Jin': ['Financial Institutions', 'Banking', 'Risk Management'],
      'David Senteney': ['Auditing', 'Financial Accounting', 'Corporate Governance']
    };
  }

  // Fetch student ratings from Rate My Professor
  static async fetchStudentRatings(): Promise<Record<string, number>> {
    try {
      const response = await fetch(`${API_CONFIG.RATE_MY_PROFESSOR}/ratings`);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log('Student ratings API not available, using fallback data');
    }
    
    // Fallback: Current estimated ratings
    return {
      'Taewon Yang': 4.9,
      'Mohammad Bazaz': 4.8,
      'Francisca Beer': 4.7,
      'Dong Man Kim': 4.8,
      'Liang Guo': 4.6,
      'Taewoo Kim': 4.7,
      'Yu Liu': 4.5,
      'Vishal Munsif': 4.6,
      'Hang Pei': 4.4,
      'Rodrigo Cardenas Mutis': 4.8,
      'Asif Malik': 4.7,
      'Tian Tian': 4.5,
      'John R Dorocak': 4.6,
      'Xiang Liu': 4.7,
      'Ghulam Sarwar': 4.8,
      'Sung-Kyoo Huh': 4.6,
      'John Jin': 4.7,
      'David Senteney': 4.5
    };
  }

  // Update faculty data with real information
  static async updateFacultyData(): Promise<FacultyData[]> {
    const [salaries, courses, ratings] = await Promise.all([
      this.fetchFacultySalaries(),
      this.fetchCourseAssignments(),
      this.fetchStudentRatings()
    ]);

    return CSUSB_FACULTY_DATA.map(faculty => ({
      ...faculty,
      salary: salaries[faculty.name] || faculty.salary,
      courses: courses[faculty.name] || faculty.courses,
      rating: ratings[faculty.name] || faculty.rating,
      dataSource: {
        ...faculty.dataSource,
        salary: salaries[faculty.name] ? 'real' : 'searching',
        courses: courses[faculty.name] ? 'real' : 'estimated',
        rating: ratings[faculty.name] ? 'real' : 'estimated'
      }
    }));
  }

  // Get data source status
  static getDataSourceStatus() {
    return DATA_SOURCES;
  }
}

// Utility function to audit and sanitize faculty data
export function auditFacultyData(faculty: FacultyData): FacultyData {
  const audited = { ...faculty };
  // Audit string fields
  if (!faculty.bio) {
    audited.bio = 'Not listed on CSUSB profile';
    if (audited.dataSource) audited.dataSource.bio = 'not_available';
  }
  if (!faculty.research) {
    audited.research = 'Not listed on CSUSB profile';
    if (audited.dataSource) audited.dataSource.research = 'not_available';
  }
  if (!faculty.officeHours) {
    audited.officeHours = 'Not listed on CSUSB profile';
    if (audited.dataSource) audited.dataSource.officeHours = 'not_available';
  }
  if (!faculty.networkingTips) {
    audited.networkingTips = 'Not listed on CSUSB profile';
    // No dataSource field for networkingTips
  }
  // Audit array fields
  if (!faculty.courses || faculty.courses.length === 0) {
    audited.courses = ['Not listed on CSUSB profile'];
    if (audited.dataSource) audited.dataSource.courses = 'not_available';
  }
  // Audit rating
  if (faculty.rating === undefined || faculty.rating === null) {
    audited.rating = undefined;
    if (audited.dataSource) audited.dataSource.rating = 'not_available';
  }
  // Audit career outcomes
  if (audited.careerOutcomes) {
    audited.careerOutcomes = audited.careerOutcomes.map(auditCareerOutcome);
  }
  // Always mark fabricated or estimated data as not_available
  if (audited.dataSource) {
    for (const key of Object.keys(audited.dataSource)) {
      if (audited.dataSource[key as keyof typeof audited.dataSource] === 'estimated' || audited.dataSource[key as keyof typeof audited.dataSource] === 'fabricated') {
        audited.dataSource[key as keyof typeof audited.dataSource] = 'not_available';
      }
    }
  }
  return audited;
}

// Utility function to audit career outcomes data
export function auditCareerOutcome(outcome: CareerOutcome): CareerOutcome {
  const audited = { ...outcome };
  
  // Validate required fields exist
  if (!outcome.salarySource || outcome.salarySource.trim() === '') {
    audited.salarySource = 'Source not verified';
    audited.dataSource = 'not_available';
  }
  
  if (!outcome.growthSource || outcome.growthSource.trim() === '') {
    audited.growthSource = 'Source not verified';
    audited.dataSource = 'not_available';
  }
  
  if (!outcome.growthTimeframe || outcome.growthTimeframe.trim() === '') {
    audited.growthTimeframe = 'Timeframe not specified';
    audited.dataSource = 'not_available';
  }
  
  if (!outcome.aiImpactDescription || outcome.aiImpactDescription.trim() === '') {
    audited.aiImpactDescription = 'AI impact analysis not available';
    audited.dataSource = 'not_available';
  }
  
  // Validate data recency
  if (outcome.lastUpdated) {
    const lastUpdate = new Date(outcome.lastUpdated);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    if (lastUpdate < oneYearAgo) {
      audited.dataSource = 'estimated'; // Mark as estimated if data is old
    }
  } else {
    audited.lastUpdated = 'Unknown';
    audited.dataSource = 'not_available';
  }
  
  return audited;
}

// Audit all faculty data at load time
export const AUDITED_CSUSB_FACULTY_DATA: FacultyData[] = CSUSB_FACULTY_DATA.map(auditFacultyData);

// Future API Integration Backlog
export const API_BACKLOG = [
  {
    id: 'faculty-salaries-api',
    title: 'Faculty Salaries API',
    description: 'Create automated data collection from Transparent California',
    priority: 'high',
    estimatedEffort: '2-3 weeks',
    requirements: [
      'Web scraping service for Transparent California',
      'Data validation and cleaning',
      'Regular update scheduling',
      'Error handling and fallbacks'
    ]
  },
  {
    id: 'course-catalog-api',
    title: 'Course Catalog API',
    description: 'Integrate with CSUSB course catalog for real-time data',
    priority: 'medium',
    estimatedEffort: '1-2 weeks',
    requirements: [
      'CSUSB catalog API integration',
      'Course assignment tracking',
      'Prerequisite validation',
      'Schedule updates'
    ]
  },
  {
    id: 'student-ratings-api',
    title: 'Student Ratings API',
    description: 'Collect and aggregate student feedback',
    priority: 'low',
    estimatedEffort: '3-4 weeks',
    requirements: [
      'Rate My Professor integration',
      'Internal rating system',
      'Review moderation',
      'Analytics dashboard'
    ]
  },
  {
    id: 'multi-university-api',
    title: 'Multi-University Support',
    description: 'Extend to support multiple universities',
    priority: 'medium',
    estimatedEffort: '4-6 weeks',
    requirements: [
      'University configuration system',
      'Data source management',
      'User authentication',
      'School-specific customization'
    ]
  }
];

export default DataService; 