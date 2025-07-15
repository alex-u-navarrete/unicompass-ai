import { type FacultyData } from './dataService';

export interface EmailDraft {
  subject: string;
  body: string;
}

export interface AIEmailRequest {
  reason: string;
  faculty: FacultyData;
  studentName?: string;
  studentEmail?: string;
}

export class AIService {
  /**
   * Generate an AI-powered email draft based on the reason and faculty data
   * This is currently a mock implementation that can be replaced with real AI API calls
   */
  static async generateEmailDraft(request: AIEmailRequest): Promise<EmailDraft> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const { reason, faculty, studentName = 'Student' } = request;
    const lowerReason = reason.toLowerCase();
    const professorLastName = faculty.name.split(' ')[1] || faculty.name.split(' ')[0];

    // AI logic for different types of requests
    if (lowerReason.includes('office hour') || lowerReason.includes('meeting')) {
      return {
        subject: `Office Hours Request - ${studentName}`,
        body: `Dear Professor ${professorLastName},

I hope this email finds you well. I am a student in the Accounting and Finance program at CSUSB and would like to schedule a meeting during your office hours.

${reason}

I would appreciate the opportunity to discuss this with you. Please let me know what times work best for you.

Thank you for your time.

Best regards,
${studentName}`
      };
    }

    if (lowerReason.includes('research') || lowerReason.includes('project')) {
      return {
        subject: `Research Interest - ${studentName}`,
        body: `Dear Professor ${professorLastName},

I hope this email finds you well. I am a student in the Accounting and Finance program at CSUSB and I am very interested in your research areas, particularly ${faculty.research}.

${reason}

I would love to learn more about your current research projects and discuss potential opportunities for collaboration or mentorship.

Thank you for your time.

Best regards,
${studentName}`
      };
    }

    if (lowerReason.includes('course') || lowerReason.includes('class')) {
      return {
        subject: `Course Inquiry - ${studentName}`,
        body: `Dear Professor ${professorLastName},

I hope this email finds you well. I am a student in the Accounting and Finance program at CSUSB and I have some questions about your courses.

${reason}

I would appreciate any guidance you could provide.

Thank you for your time.

Best regards,
${studentName}`
      };
    }

    if (lowerReason.includes('career') || lowerReason.includes('advice')) {
      return {
        subject: `Career Advice Request - ${studentName}`,
        body: `Dear Professor ${professorLastName},

I hope this email finds you well. I am a student in the Accounting and Finance program at CSUSB and I am seeking career guidance.

${reason}

Given your expertise in ${faculty.research}, I would greatly value your insights and advice.

Thank you for your time.

Best regards,
${studentName}`
      };
    }

    // Default case
    return {
      subject: `General Inquiry - ${studentName}`,
      body: `Dear Professor ${professorLastName},

I hope this email finds you well. I am a student in the Accounting and Finance program at CSUSB.

${reason}

I would appreciate your guidance on this matter.

Thank you for your time.

Best regards,
${studentName}`
    };
  }

  /**
   * Future: Integrate with OpenAI API or other AI services
   * Example implementation:
   */
  /*
  static async generateEmailDraftWithOpenAI(request: AIEmailRequest): Promise<EmailDraft> {
    const response = await fetch('/api/generate-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Failed to generate email draft');
    }

    return response.json();
  }
  */
} 