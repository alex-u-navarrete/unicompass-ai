import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dashboard from '../Dashboard';

// Mock the data service
jest.mock('../../services/dataService', () => ({
  CSUSB_COURSE_CATALOG: [
    {
      id: '1',
      code: 'ACCT 2110',
      name: 'Test Course',
      credits: 3,
      description: 'Test description'
    }
  ],
  AUDITED_CSUSB_FACULTY_DATA: [
    {
      id: '1',
      name: 'Test Professor',
      department: 'Accounting',
      email: 'test@csusb.edu'
    }
  ]
}));

describe('Dashboard Component', () => {
  test('renders main dashboard elements', () => {
    render(<Dashboard />);
    
    // Check for main dashboard components
    expect(screen.getByText('AI Career Prep & Course Analyzer')).toBeInTheDocument();
    expect(screen.getByText('UniCompass')).toBeInTheDocument();
  });

  test('renders navigation buttons with correct text', () => {
    render(<Dashboard />);
    
    // Check for navigation buttons
    expect(screen.getByText('Course Planning')).toBeInTheDocument();
    expect(screen.getByText('Faculty Network')).toBeInTheDocument();
    expect(screen.getByText('AI Assistant')).toBeInTheDocument();
  });

  test('opens appointment modal when schedule appointment button is clicked', async () => {
    const user = userEvent.setup();
    render(<Dashboard />);
    
    const appointmentButton = screen.getByText('Schedule Academic Planning Appointment');
    await user.click(appointmentButton);
    
    await waitFor(() => {
      expect(screen.getByText('Schedule Academic Planning Appointment')).toBeInTheDocument();
    });
  });

  test('opens career preference modal when preference button is clicked', async () => {
    const user = userEvent.setup();
    render(<Dashboard />);
    
    const preferenceButton = screen.getByText('Set Career Preferences');
    await user.click(preferenceButton);
    
    await waitFor(() => {
      expect(screen.getByText('Tell us about your academic and career goals')).toBeInTheDocument();
    });
  });

  test('displays saved career preferences when they exist', () => {
    // Mock localStorage with saved preferences
    const mockPreferences = {
      careerGoals: ['Industry Professional'],
      graduateSchool: 'yes',
      certifications: ['CPA'],
      timeline: '4 years'
    };
    
    Storage.prototype.getItem = jest.fn((key) => {
      if (key === 'careerPreferences') {
        return JSON.stringify(mockPreferences);
      }
      return null;
    });

    render(<Dashboard />);
    
    expect(screen.getByText('Current Preferences:')).toBeInTheDocument();
    expect(screen.getByText('Industry Professional')).toBeInTheDocument();
    expect(screen.getByText('CPA')).toBeInTheDocument();
  });

  test('modal closes when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<Dashboard />);
    
    // Open appointment modal
    const appointmentButton = screen.getByText('Schedule Academic Planning Appointment');
    await user.click(appointmentButton);
    
    // Close modal
    const closeButton = screen.getByLabelText('Close modal');
    await user.click(closeButton);
    
    await waitFor(() => {
      expect(screen.queryByText('Schedule Academic Planning Appointment')).not.toBeInTheDocument();
    });
  });

  test('handles modal backdrop click to close', async () => {
    const user = userEvent.setup();
    render(<Dashboard />);
    
    // Open career preference modal
    const preferenceButton = screen.getByText('Set Career Preferences');
    await user.click(preferenceButton);
    
    // Click backdrop (modal background)
    const modal = screen.getByRole('dialog');
    await user.click(modal);
    
    await waitFor(() => {
      expect(screen.queryByText('Tell us about your academic and career goals')).not.toBeInTheDocument();
    });
  });

  test('clears career preferences when clear button is clicked', async () => {
    const user = userEvent.setup();
    
    // Mock localStorage with existing preferences
    const mockPreferences = {
      careerGoals: ['Industry Professional'],
      graduateSchool: 'yes'
    };
    
    Storage.prototype.getItem = jest.fn((key) => {
      if (key === 'careerPreferences') {
        return JSON.stringify(mockPreferences);
      }
      return null;
    });
    
    Storage.prototype.removeItem = jest.fn();

    render(<Dashboard />);
    
    const clearButton = screen.getByText('Clear Preferences');
    await user.click(clearButton);
    
    expect(Storage.prototype.removeItem).toHaveBeenCalledWith('careerPreferences');
  });

  test('navigation buttons have correct routing behavior', () => {
    render(<Dashboard />);
    
    const coursePlanningButton = screen.getByRole('button', { name: /course planning/i });
    const facultyNetworkButton = screen.getByRole('button', { name: /faculty network/i });
    const aiAssistantButton = screen.getByRole('button', { name: /ai assistant/i });
    
    // Check that buttons exist (routing would be tested in integration tests)
    expect(coursePlanningButton).toBeInTheDocument();
    expect(facultyNetworkButton).toBeInTheDocument();
    expect(aiAssistantButton).toBeInTheDocument();
  });
}); 