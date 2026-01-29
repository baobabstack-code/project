import { prisma } from '../../lib/prisma';

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
}

export interface ContactFormSubmission {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  subscribeToNewsletter: boolean;
  agreeToPrivacyPolicy: boolean;
  submittedAt?: string;
}

export const fetchContactInfo = async (): Promise<{ data: ContactInfo }> => {
  try {
    const contactInfo = await prisma.contactInfo.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    if (!contactInfo) {
      throw new Error('Contact info not found');
    }

    return {
      data: {
        email: contactInfo.email,
        phone: contactInfo.phone || undefined,
        address: contactInfo.address || undefined,
      }
    };
  } catch (error) {
    console.error('Error fetching contact info:', error);
    throw new Error('Failed to fetch contact info');
  }
};

export const submitContactForm = async (data: Omit<ContactFormSubmission, 'id' | 'submittedAt'>): Promise<ContactFormSubmission> => {
  try {
    const submission = await prisma.contactFormSubmission.create({
      data: {
        ...data,
        submittedAt: new Date(),
      },
    });

    return {
      id: submission.id,
      name: submission.name,
      email: submission.email,
      phone: submission.phone || undefined,
      company: submission.company || undefined,
      subject: submission.subject,
      message: submission.message,
      subscribeToNewsletter: submission.subscribeToNewsletter,
      agreeToPrivacyPolicy: submission.agreeToPrivacyPolicy,
      submittedAt: submission.submittedAt.toISOString(),
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw new Error('Failed to submit contact form');
  }
};