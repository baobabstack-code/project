import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

export interface AdminNotificationEmailProps {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
}

export const AdminNotificationEmail = ({
  name,
  email,
  phone,
  company,
  subject,
  message,
}: AdminNotificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New Contact Form Submission: {subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>New Contact Form Submission</Heading>
          <Section style={section}>
            <Text style={labelText}>
              <strong>Subject:</strong> {subject}
            </Text>
            <Text style={labelText}>
              <strong>Name:</strong> {name}
            </Text>
            <Text style={labelText}>
              <strong>Email:</strong> {email}
            </Text>
            {phone && (
              <Text style={labelText}>
                <strong>Phone:</strong> {phone}
              </Text>
            )}
            {company && (
              <Text style={labelText}>
                <strong>Company:</strong> {company}
              </Text>
            )}
          </Section>
          <Hr style={hr} />
          <Section style={section}>
            <Text style={messageText}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
  borderRadius: '5px',
};

const heading = {
  fontSize: '24px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#111',
  padding: '0 48px',
};

const section = {
  padding: '0 48px',
};

const labelText = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#111',
  margin: '8px 0',
};

const messageText = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#111',
  whiteSpace: 'pre-wrap' as const,
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

export default AdminNotificationEmail;
