import { render } from '@react-email/components';
import { AdminNotificationEmail, AdminNotificationEmailProps } from '../emails/AdminNotificationEmail';
import { UserConfirmationEmail } from '../emails/UserConfirmationEmail';

export interface SendEmailParams {
    to: string | string[];
    subject: string;
    html: string;
    from?: string;
}

function getResendApiKey(): string {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        throw new Error('Missing RESEND_API_KEY environment variable');
    }
    return apiKey;
}

function getDefaultFromAddress(): string {
    return process.env.EMAIL_FROM || 'Baobab Stack <no-reply@baobabstack.com>';
}

export async function sendEmail({ to, subject, html, from }: SendEmailParams): Promise<void> {
    const apiKey = getResendApiKey();
    const payload = {
        from: from || getDefaultFromAddress(),
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
    };

    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to send email: ${response.status} ${text}`);
    }
}

export async function renderAdminNotification(params: AdminNotificationEmailProps): Promise<string> {
    return await render(AdminNotificationEmail(params));
}

export async function renderUserConfirmation(name: string): Promise<string> {
    return await render(UserConfirmationEmail({ name }));
}


