import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "../../../src/lib/prisma";
import { renderAdminNotification, renderUserConfirmation, sendEmail } from "../../../src/lib/email";

// Validation schema for contact form submission
const contactSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(1, { message: "Please select a subject" }),
  message: z.string().min(1, { message: "Message is required" }),
  subscribeToNewsletter: z.boolean(),
  agreeToPrivacyPolicy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy",
  }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const formData = validationResult.data;

    // Persist submission
    const submission = await prisma.contactFormSubmission.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        company: formData.company || null,
        subject: formData.subject,
        message: formData.message,
        subscribeToNewsletter: formData.subscribeToNewsletter,
        agreeToPrivacyPolicy: formData.agreeToPrivacyPolicy,
        submittedAt: new Date(),
      },
    });

    // Email notifications
    const adminEmail = process.env.CONTACT_TO_EMAIL || process.env.EMAIL_TO || process.env.NEXT_PUBLIC_CONTACT_EMAIL;
    if (!adminEmail) {
      console.warn("CONTACT_TO_EMAIL not set; skipping admin email notification");
    } else {
      try {
        const adminHtml = await renderAdminNotification({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          subject: formData.subject,
          message: formData.message,
        });
        await sendEmail({ to: adminEmail, subject: `New contact: ${formData.subject}`, html: adminHtml });
      } catch (e) {
        console.error("Failed to send admin notification email", e);
      }
    }

    try {
      const userHtml = await renderUserConfirmation(formData.name);
      await sendEmail({ to: formData.email, subject: "We received your message", html: userHtml });
    } catch (e) {
      console.error("Failed to send user confirmation email", e);
    }

    return NextResponse.json(
      {
        data: {
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
        },
        message: "Contact form submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form submission error:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to process contact form submission",
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
