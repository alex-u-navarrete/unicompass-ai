# UniCompass API Integration Plan

## Overview
This document outlines the strategy for integrating real-time data sources and building custom APIs for UniCompass to provide accurate, up-to-date information for students.

## Current Data Sources

### ✅ Verified Data (Real)
- **Faculty Names & Contact Info**: Extracted from CSUSB website
- **Department Information**: Office locations, phone numbers, emails
- **Basic Course Information**: Course codes, names, descriptions

### 🔄 Searching/Estimated Data
- **Faculty Salaries**: Currently estimated, searching public records
- **Course Assignments**: Currently estimated, need course catalog integration
- **Student Ratings**: Currently estimated, need rating system integration
- **Office Hours**: Currently estimated, need real-time updates

## Phase 1: Public Data Integration (Immediate)

### 1.1 Transparent California Salary Data
**Priority**: High
**Timeline**: 1-2 weeks
**Data Source**: https://transparentcalifornia.com/salaries/2022/california-state-university-san-bernardino/

**Implementation Strategy**:
```javascript
// Web scraping service for salary data
const scrapeSalaryData = async () => {
  const response = await fetch('https://transparentcalifornia.com/salaries/2022/california-state-university-san-bernardino/');
  // Parse HTML to extract faculty salary information
  // Match faculty names with salary data
  // Update database with real salary information
};
```

**Expected Data**:
- Faculty names and titles
- Annual salary amounts
- Year of data
- Employment status

### 1.2 CSUSB Course Catalog Integration
**Priority**: High
**Timeline**: 1-2 weeks
**Data Source**: https://catalog.csusb.edu/

**Implementation Strategy**:
```javascript
// Course catalog API integration
const fetchCourseAssignments = async () => {
  const response = await fetch('https://catalog.csusb.edu/api/courses');
  // Extract course assignments by faculty
  // Update course teaching assignments
  // Sync with current semester data
};
```

**Expected Data**:
- Current course assignments by faculty
- Course schedules and availability
- Prerequisites and course descriptions
- Enrollment information

### 1.3 Rate My Professor Integration
**Priority**: Medium
**Timeline**: 2-3 weeks
**Data Source**: https://www.ratemyprofessors.com/

**Implementation Strategy**:
```javascript
// Student ratings aggregation
const fetchStudentRatings = async () => {
  const response = await fetch('https://www.ratemyprofessors.com/api/professors');
  // Aggregate ratings and reviews
  // Calculate average ratings
  // Extract key feedback themes
};
```

**Expected Data**:
- Student ratings (1-5 scale)
- Review comments and feedback
- Difficulty ratings
- Would-take-again percentages

## Phase 2: Custom API Development (Short-term)

### 2.1 UniCompass Faculty API
**Priority**: High
**Timeline**: 3-4 weeks
**Purpose**: Centralized faculty data management

**API Endpoints**:
```javascript
// Faculty data endpoints
GET /api/faculty - Get all faculty members
GET /api/faculty/:id - Get specific faculty member
GET /api/faculty/:id/salary - Get salary information
GET /api/faculty/:id/courses - Get course assignments
GET /api/faculty/:id/ratings - Get student ratings
PUT /api/faculty/:id - Update faculty information
```

**Database Schema**:
```sql
CREATE TABLE faculty (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255),
  department VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  office VARCHAR(100),
  office_hours TEXT,
  research_areas TEXT,
  salary_min DECIMAL(10,2),
  salary_max DECIMAL(10,2),
  salary_year INTEGER,
  rating DECIMAL(3,2),
  rating_count INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 2.2 UniCompass Course API
**Priority**: High
**Timeline**: 3-4 weeks
**Purpose**: Course and curriculum management

**API Endpoints**:
```javascript
// Course data endpoints
GET /api/courses - Get all courses
GET /api/courses/:code - Get specific course
GET /api/courses/:code/faculty - Get course instructors
GET /api/courses/:code/ratings - Get course ratings
GET /api/career-paths - Get career path information
```

**Database Schema**:
```sql
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  code VARCHAR(20) NOT NULL,
  name VARCHAR(255) NOT NULL,
  credits INTEGER,
  description TEXT,
  prerequisites TEXT[],
  career_paths TEXT[],
  difficulty VARCHAR(20),
  salary_impact VARCHAR(50),
  data_source VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 2.3 Data Synchronization Service
**Priority**: Medium
**Timeline**: 2-3 weeks
**Purpose**: Automated data updates

**Implementation**:
```javascript
// Automated data sync service
class DataSyncService {
  async syncFacultySalaries() {
    // Daily sync with Transparent California
  }
  
  async syncCourseAssignments() {
    // Weekly sync with CSUSB catalog
  }
  
  async syncStudentRatings() {
    // Daily sync with Rate My Professor
  }
  
  async updateDataSources() {
    // Update data source status
  }
}
```

## Phase 3: Advanced Features (Medium-term)

### 3.1 Multi-University Support
**Priority**: Medium
**Timeline**: 6-8 weeks
**Purpose**: Extend to other universities

**Implementation Strategy**:
- University configuration system
- School-specific data sources
- Customizable data schemas
- Multi-tenant architecture

### 3.2 Real-time Notifications
**Priority**: Low
**Timeline**: 4-5 weeks
**Purpose**: Keep students informed

**Features**:
- Faculty office hour changes
- New course offerings
- Salary updates
- Rating changes

### 3.3 Analytics Dashboard
**Priority**: Low
**Timeline**: 4-5 weeks
**Purpose**: Data insights and trends

**Features**:
- Salary trends by department
- Course popularity metrics
- Faculty rating trends
- Career path analytics

## Technical Implementation

### Backend Technology Stack
- **Framework**: Node.js with Express
- **Database**: PostgreSQL
- **Caching**: Redis
- **Queue System**: Bull for background jobs
- **API Documentation**: Swagger/OpenAPI

### Data Collection Strategy
1. **Web Scraping**: Puppeteer for dynamic content
2. **API Integration**: RESTful APIs where available
3. **Manual Updates**: Admin interface for corrections
4. **User Contributions**: Student feedback system

### Security Considerations
- Rate limiting for external APIs
- Data validation and sanitization
- CORS configuration
- API authentication
- Data privacy compliance

### Performance Optimization
- Database indexing
- Caching strategies
- CDN for static content
- Background job processing
- API response optimization

## Implementation Timeline

### Week 1-2: Foundation
- Set up backend infrastructure
- Create database schemas
- Implement basic API endpoints
- Set up data collection services

### Week 3-4: Data Integration
- Integrate Transparent California data
- Implement CSUSB course catalog scraping
- Set up Rate My Professor integration
- Create data validation systems

### Week 5-6: API Development
- Complete faculty API
- Complete course API
- Implement data synchronization
- Add error handling and logging

### Week 7-8: Testing & Deployment
- Comprehensive testing
- Performance optimization
- Security audit
- Production deployment

## Success Metrics

### Data Accuracy
- 95%+ faculty information accuracy
- Real-time salary data updates
- Current course assignments
- Verified student ratings

### Performance
- API response time < 200ms
- 99.9% uptime
- Handle 1000+ concurrent users
- Real-time data updates

### User Experience
- Seamless data source indicators
- Clear distinction between real/estimated data
- Easy data refresh functionality
- Intuitive interface updates

## Future Enhancements

### AI-Powered Features
- Predictive salary trends
- Course recommendation engine
- Faculty matching algorithm
- Career path optimization

### Mobile Application
- Native iOS/Android apps
- Offline data access
- Push notifications
- Location-based features

### Community Features
- Student reviews and ratings
- Faculty Q&A system
- Study group formation
- Mentorship matching

## Conclusion

This API integration plan provides a roadmap for transforming UniCompass from a static application to a dynamic, data-driven platform. By implementing these phases systematically, we can provide students with the most accurate and up-to-date information to support their academic and career success.

The key to success is maintaining transparency about data sources while continuously improving data accuracy and user experience. This approach will establish UniCompass as the go-to platform for university information and student success. 