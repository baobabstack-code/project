import React from 'react';
import { render } from '@testing-library/react';
import { AdminNotificationEmail } from '../../emails/AdminNotificationEmail';
import { UserConfirmationEmail } from '../../emails/UserConfirmationEmail';

describe('Email Templates', () => {
  describe('AdminNotificationEmail', () => {
    it('should render admin notification email with all fields', () => {
      const params = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        company: 'Acme Corp',
        subject: 'Inquiry',
        message: 'Hello, I have a question.',
      };

      const { container } = render(<AdminNotificationEmail {...params} />);
      const html = container.innerHTML;

      expect(html).toContain('New Contact Form Submission');
      expect(html).toContain('John Doe');
      expect(html).toContain('john@example.com');
      expect(html).toContain('+1234567890');
      expect(html).toContain('Acme Corp');
      expect(html).toContain('Inquiry');
      expect(html).toContain('Hello, I have a question.');
    });

    it('should render admin notification email without optional fields', () => {
      const params = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        subject: 'General',
        message: 'Just reaching out.',
      };

      const { container } = render(<AdminNotificationEmail {...params} />);
      const html = container.innerHTML;

      expect(html).toContain('Jane Smith');
      expect(html).toContain('jane@example.com');
      expect(html).toContain('General');
      expect(html).toContain('Just reaching out.');
      // Should NOT contain optional fields
      expect(html).not.toContain('Phone:');
      expect(html).not.toContain('Company:');
    });
  });

  describe('UserConfirmationEmail', () => {
    it('should render user confirmation email with name', () => {
      const { container } = render(<UserConfirmationEmail name="Alice" />);
      const html = container.innerHTML;

      expect(html).toContain('Thanks for contacting Baobab Stack');
      expect(html).toContain('Hi Alice');
      expect(html).toContain('We received your message');
      expect(html).toContain('Baobab Stack Team');
    });
  });
});
