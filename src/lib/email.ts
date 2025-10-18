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

export function renderAdminNotification(params: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    subject: string;
    message: string;
}): string {
    const { name, email, phone, company, subject, message } = params;
    return `
        <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #111">
            <h2>New Contact Form Submission</h2>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            <hr />
            <p style="white-space: pre-wrap">${message}</p>
        </div>
    `;
}

export function renderUserConfirmation(name: string): string {
    return `
        <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #111">
            <h2>Thanks for contacting Baobab Stack</h2>
            <p>Hi ${name},</p>
            <p>We received your message and will get back to you shortly.</p>
            <p>Best regards,<br/>Baobab Stack Team</p>
        </div>
    `;
}


