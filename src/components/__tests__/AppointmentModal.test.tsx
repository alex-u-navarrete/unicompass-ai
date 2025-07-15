import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppointmentModal from '../AppointmentModal';

describe('AppointmentModal Component', () => {
  const mockOnClose = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders modal when isOpen is true', () => {
    render(<AppointmentModal isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('Schedule Academic Appointment')).toBeInTheDocument();
    expect(screen.getByText('Choose Service')).toBeInTheDocument();
  });

  test('does not render modal when isOpen is false', () => {
    render(<AppointmentModal isOpen={false} onClose={mockOnClose} />);
    
    expect(screen.queryByText('Schedule Academic Appointment')).not.toBeInTheDocument();
  });

  test('renders Academic Advising and Career Center options', () => {
    render(<AppointmentModal isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('Academic Advising')).toBeInTheDocument();
    expect(screen.getByText('Career Development Center')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<AppointmentModal isOpen={true} onClose={mockOnClose} />);
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);
    
    // Wait for animation and then check if onClose was called
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }, { timeout: 300 });
  });

  test('can select Academic Advising service', async () => {
    const user = userEvent.setup();
    render(<AppointmentModal isOpen={true} onClose={mockOnClose} />);
    
    const academicButton = screen.getByText('Academic Advising').closest('button');
    expect(academicButton).toBeInTheDocument();
    
    if (academicButton) {
      await user.click(academicButton);
      expect(academicButton).toHaveClass('border-indigo-500');
    }
  });

  test('can select Career Development Center', async () => {
    const user = userEvent.setup();
    render(<AppointmentModal isOpen={true} onClose={mockOnClose} />);
    
    const careerButton = screen.getByText('Career Development Center').closest('button');
    expect(careerButton).toBeInTheDocument();
    
    if (careerButton) {
      await user.click(careerButton);
      // Should have selected state styling
      expect(careerButton).toHaveClass('border-indigo-500');
    }
  });

  test('displays email preview section', () => {
    render(<AppointmentModal isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('Email Preview')).toBeInTheDocument();
  });

  test('displays appointment type options', () => {
    render(<AppointmentModal isOpen={true} onClose={mockOnClose} />);
    
    // Should show appointment type selection
    expect(screen.getByText('Appointment Type')).toBeInTheDocument();
  });

  test('can update custom message', async () => {
    const user = userEvent.setup();
    render(<AppointmentModal isOpen={true} onClose={mockOnClose} />);
    
    const textarea = screen.getByPlaceholderText(/additional details/i);
    await user.type(textarea, 'Test message');
    
    expect(textarea).toHaveValue('Test message');
  });

  test('shows copy email button', () => {
    render(<AppointmentModal isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('Copy Email')).toBeInTheDocument();
  });

  test('shows send email button', () => {
    render(<AppointmentModal isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('Send Email')).toBeInTheDocument();
  });

  test('copies email when copy button is clicked', async () => {
    const user = userEvent.setup();
    render(<AppointmentModal isOpen={true} onClose={mockOnClose} />);
    
    const copyButton = screen.getByText('Copy Email');
    await user.click(copyButton);
    
    // Verify clipboard was called
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  test('opens email client when send button is clicked', async () => {
    const user = userEvent.setup();
    
    // Mock window.open
    const mockOpen = jest.fn();
    Object.defineProperty(window, 'open', {
      value: mockOpen,
      writable: true
    });
    
    render(<AppointmentModal isOpen={true} onClose={mockOnClose} />);
    
    const sendButton = screen.getByText('Send Email');
    await user.click(sendButton);
    
    expect(mockOpen).toHaveBeenCalledWith(expect.stringContaining('mailto:'), '_blank');
  });

  test('handles escape key to close modal', async () => {
    const user = userEvent.setup();
    render(<AppointmentModal isOpen={true} onClose={mockOnClose} />);
    
    await user.keyboard('{Escape}');
    
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }, { timeout: 300 });
  });
}); 