import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

export interface UserConfirmationEmailProps {
  name: string;
}

export const UserConfirmationEmail = ({ name }: UserConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Thanks for contacting Baobab Stack</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Thanks for contacting Baobab Stack</Heading>
          <Section style={section}>
            <Text style={text}>Hi {name},</Text>
            <Text style={text}>
              We received your message and will get back to you shortly.
            </Text>
            <Text style={text}>
              Best regards,
              <br />
              Baobab Stack Team
            </Text>
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

const text = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#111',
  margin: '16px 0',
};

export default UserConfirmationEmail;
