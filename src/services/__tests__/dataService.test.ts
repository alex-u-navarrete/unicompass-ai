import { DataService, auditFacultyData, auditCareerOutcome, CSUSB_COURSE_DATA, AUDITED_CSUSB_FACULTY_DATA, CourseData } from '../dataService';

// Mock fetch for API calls
global.fetch = jest.fn();

describe('DataService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchFacultySalaries', () => {
    test('returns API data when fetch succeeds', async () => {
      const mockSalaryData = {
        'Taewon Yang': '$125,000',
        'Mohammad Bazaz': '$120,000'
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSalaryData
      });

      const result = await DataService.fetchFacultySalaries();
      expect(result).toEqual(mockSalaryData);
    });

    test('returns fallback data when fetch fails', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

      const result = await DataService.fetchFacultySalaries();
      
      // Should return fallback data
      expect(result['Taewon Yang']).toBeDefined();
      expect(result['Mohammad Bazaz']).toBeDefined();
    });

    test('returns fallback data when API returns non-ok response', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      const result = await DataService.fetchFacultySalaries();
      
      // Should return fallback data
      expect(result['Taewon Yang']).toBeDefined();
      expect(result['Mohammad Bazaz']).toBeDefined();
    });
  });

  describe('fetchCourseAssignments', () => {
    test('returns API data when fetch succeeds', async () => {
      const mockCourseData = {
        'Taewon Yang': ['FIN 300', 'FIN 401'],
        'Mohammad Bazaz': ['FIN 302', 'FIN 402']
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCourseData
      });

      const result = await DataService.fetchCourseAssignments();
      expect(result).toEqual(mockCourseData);
    });

    test('returns fallback data when fetch fails', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

      const result = await DataService.fetchCourseAssignments();
      
      // Should return fallback data
      expect(result['Taewon Yang']).toBeDefined();
      expect(Array.isArray(result['Taewon Yang'])).toBe(true);
    });
  });

  describe('fetchStudentRatings', () => {
    test('returns API data when fetch succeeds', async () => {
      const mockRatingData = {
        'Taewon Yang': 4.9,
        'Mohammad Bazaz': 4.8
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockRatingData
      });

      const result = await DataService.fetchStudentRatings();
      expect(result).toEqual(mockRatingData);
    });

    test('returns fallback data when fetch fails', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

      const result = await DataService.fetchStudentRatings();
      
      // Should return fallback data
      expect(result['Taewon Yang']).toBeDefined();
      expect(typeof result['Taewon Yang']).toBe('number');
    });
  });

  describe('updateFacultyData', () => {
    test('merges API data with faculty data correctly', async () => {
      const mockSalaries = { 'Taewon Yang': '$130,000' };
      const mockCourses = { 'Taewon Yang': ['FIN 500'] };
      const mockRatings = { 'Taewon Yang': 5.0 };

      (fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockSalaries
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockCourses
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockRatings
        });

      const result = await DataService.updateFacultyData();
      
      const taewonData = result.find(faculty => faculty.name === 'Taewon Yang');
      expect(taewonData?.salary).toBe('$130,000');
      expect(taewonData?.courses).toEqual(['FIN 500']);
      expect(taewonData?.rating).toBe(5.0);
      expect(taewonData?.dataSource.salary).toBe('real');
      expect(taewonData?.dataSource.courses).toBe('real');
      expect(taewonData?.dataSource.rating).toBe('real');
    });
  });
});

describe('auditFacultyData', () => {
  const mockFaculty = {
    id: '1',
    name: 'Test Faculty',
    title: 'Professor',
    department: 'Accounting',
    research: '',
    officeHours: '',
    office: 'Test Office',
    email: 'test@csusb.edu',
    phone: '123-456-7890',
    courses: [],
    networkingTips: '',
    dataSource: {
      name: 'real',
      email: 'real',
      phone: 'real',
      office: 'real',
      officeHours: 'not_available',
      courses: 'not_available',
      rating: 'not_available',
      salary: 'estimated',
      research: 'not_available'
    }
  };

  test('fills in missing bio with default message', () => {
    const result = auditFacultyData(mockFaculty);
    expect(result.bio).toBe('Not listed on CSUSB profile');
    expect(result.dataSource?.bio).toBe('not_available');
  });

  test('fills in missing research with default message', () => {
    const result = auditFacultyData(mockFaculty);
    expect(result.research).toBe('Not listed on CSUSB profile');
    expect(result.dataSource?.research).toBe('not_available');
  });

  test('fills in missing officeHours with default message', () => {
    const result = auditFacultyData(mockFaculty);
    expect(result.officeHours).toBe('Not listed on CSUSB profile');
    expect(result.dataSource?.officeHours).toBe('not_available');
  });

  test('fills in empty courses array with default message', () => {
    const result = auditFacultyData(mockFaculty);
    expect(result.courses).toEqual(['Not listed on CSUSB profile']);
    expect(result.dataSource?.courses).toBe('not_available');
  });

  test('converts estimated data source to not_available', () => {
    const result = auditFacultyData(mockFaculty);
    expect(result.dataSource?.salary).toBe('not_available');
  });

  test('preserves existing valid data', () => {
    const facultyWithData = {
      ...mockFaculty,
      bio: 'Valid bio',
      research: 'Valid research',
      courses: ['ACCT 101'],
      rating: 4.5
    };

    const result = auditFacultyData(facultyWithData);
    expect(result.bio).toBe('Valid bio');
    expect(result.research).toBe('Valid research');
    expect(result.courses).toEqual(['ACCT 101']);
    expect(result.rating).toBe(4.5);
  });
});

describe('auditCareerOutcome', () => {
  const mockCareerOutcome = {
    title: 'Test Career',
    averageSalary: '$50,000',
    salarySource: '',
    growthRate: '5%',
    growthTimeframe: '',
    growthSource: '',
    description: 'Test description',
    aiImpactRisk: 'Low' as const,
    aiImpactDescription: '',
    dataSource: 'real' as const,
    lastUpdated: '2023-01-01'
  };

  test('sets default values for missing salary source', () => {
    const result = auditCareerOutcome(mockCareerOutcome);
    expect(result.salarySource).toBe('Source not verified');
    expect(result.dataSource).toBe('not_available');
  });

  test('sets default values for missing growth source', () => {
    const result = auditCareerOutcome(mockCareerOutcome);
    expect(result.growthSource).toBe('Source not verified');
    expect(result.dataSource).toBe('not_available');
  });

  test('sets default values for missing growth timeframe', () => {
    const result = auditCareerOutcome(mockCareerOutcome);
    expect(result.growthTimeframe).toBe('Timeframe not specified');
    expect(result.dataSource).toBe('not_available');
  });

  test('sets default values for missing AI impact description', () => {
    const result = auditCareerOutcome(mockCareerOutcome);
    expect(result.aiImpactDescription).toBe('AI impact analysis not available');
    expect(result.dataSource).toBe('not_available');
  });

  test('marks old data as estimated', () => {
    const oldCareerOutcome = {
      ...mockCareerOutcome,
      salarySource: 'Valid source',
      growthSource: 'Valid source',
      growthTimeframe: 'Valid timeframe',
      aiImpactDescription: 'Valid description',
      lastUpdated: '2022-01-01' // Over a year ago
    };

    const result = auditCareerOutcome(oldCareerOutcome);
    expect(result.dataSource).toBe('estimated');
  });

  test('preserves valid recent data', () => {
    const validCareerOutcome = {
      ...mockCareerOutcome,
      salarySource: 'Bureau of Labor Statistics',
      growthSource: 'BLS Projections',
      growthTimeframe: '2023-2033',
      aiImpactDescription: 'Low automation risk',
      lastUpdated: new Date().toISOString() // Recent
    };

    const result = auditCareerOutcome(validCareerOutcome);
    expect(result.salarySource).toBe('Bureau of Labor Statistics');
    expect(result.growthSource).toBe('BLS Projections');
    expect(result.dataSource).toBe('real');
  });
});

describe('Course Catalog Data', () => {
  test('has valid course structure', () => {
    expect(CSUSB_COURSE_DATA).toBeDefined();
    expect(Array.isArray(CSUSB_COURSE_DATA)).toBe(true);
    expect(CSUSB_COURSE_DATA.length).toBeGreaterThan(0);

    // Test first course has required fields
    const firstCourse = CSUSB_COURSE_DATA[0];
    expect(firstCourse.id).toBeDefined();
    expect(firstCourse.code).toBeDefined();
    expect(firstCourse.name).toBeDefined();
    expect(firstCourse.credits).toBeDefined();
    expect(firstCourse.description).toBeDefined();
  });

  test('all courses have unique IDs', () => {
    const ids = CSUSB_COURSE_DATA.map((course: CourseData) => course.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  test('all courses have valid credit values', () => {
    CSUSB_COURSE_DATA.forEach((course: CourseData) => {
      expect(course.credits).toBeGreaterThan(0);
      expect(course.credits).toBeLessThanOrEqual(6);
    });
  });
});

describe('Faculty Data', () => {
  test('has audited faculty data', () => {
    expect(AUDITED_CSUSB_FACULTY_DATA).toBeDefined();
    expect(Array.isArray(AUDITED_CSUSB_FACULTY_DATA)).toBe(true);
    expect(AUDITED_CSUSB_FACULTY_DATA.length).toBeGreaterThan(0);
  });

  test('all faculty have required fields', () => {
    AUDITED_CSUSB_FACULTY_DATA.forEach(faculty => {
      expect(faculty.id).toBeDefined();
      expect(faculty.name).toBeDefined();
      expect(faculty.department).toBeDefined();
      expect(faculty.email).toBeDefined();
      expect(faculty.dataSource).toBeDefined();
    });
  });

  test('all faculty have unique IDs', () => {
    const ids = AUDITED_CSUSB_FACULTY_DATA.map(faculty => faculty.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
}); 