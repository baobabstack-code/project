import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Textarea from "../ui/Textarea";
import { Phone, Mail, ArrowRight, ArrowLeft, User, Building } from "lucide-react";
// Contact form now uses direct API route calls
import { useToast } from "../../contexts/ToastContext";

const schema = z.object({
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

type ContactFormData = z.infer<typeof schema>;

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  });
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    ["name", "email", "phone", "company"], // Step 1 fields
    ["subject", "message", "subscribeToNewsletter", "agreeToPrivacyPolicy"], // Step 2 fields
  ];

  const handleNext = async () => {
    const isValid = await trigger(
      steps[currentStep] as (keyof ContactFormData)[]
    );
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send message");
      }

      showToast("Message sent successfully!", "success");
      reset();
      setCurrentStep(0);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "There was an error submitting your form. Please try again.";
      showToast(errorMessage, "error");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const subjectOptions = [
    { value: "General Inquiry", label: "General Inquiry" },
    { value: "Service Request", label: "Service Request" },
    { value: "Partnership Opportunity", label: "Partnership Opportunity" },
    { value: "Technical Support", label: "Technical Support" },
    { value: "Other", label: "Other" },
  ];

  return (
    <div className="grid-responsive-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {currentStep === 0 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <Input
                id="name"
                label="Your Name"
                placeholder="John Doe"
                required
                icon={<User />}
                error={errors.name?.message}
                {...register("name")}
              />

              <Input
                id="email"
                type="email"
                label="Email Address"
                placeholder="john@example.com"
                required
                icon={<Mail />}
                error={errors.email?.message}
                {...register("email")}
              />

              <div className="form-grid">
                <Input
                  id="phone"
                  type="tel"
                  label="Phone Number"
                  placeholder="+1 (555) 123-4567"
                  icon={<Phone />}
                  error={errors.phone?.message}
                  {...register("phone")}
                />
                <Input
                  id="company"
                  label="Company"
                  placeholder="Your Company"
                  icon={<Building />}
                  error={errors.company?.message}
                  {...register("company")}
                />
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <Select
                id="subject"
                label="Subject"
                placeholder="Select a subject"
                required
                options={subjectOptions}
                error={errors.subject?.message}
                {...register("subject")}
              />

              <Textarea
                id="message"
                label="Message"
                placeholder="Tell us about your project or questions..."
                rows={4}
                required
                error={errors.message?.message}
                {...register("message")}
              />

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <input
                    id="subscribeToNewsletter"
                    type="checkbox"
                    {...register("subscribeToNewsletter")}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 bg-white/5 border-white/10"
                    aria-label="Subscribe to newsletter"
                  />
                  <label
                    htmlFor="subscribeToNewsletter"
                    className="text-sm text-gray-300 leading-5"
                  >
                    Subscribe to our newsletter for updates
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    id="agreeToPrivacyPolicy"
                    type="checkbox"
                    {...register("agreeToPrivacyPolicy")}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 bg-white/5 border-white/10"
                    aria-label="Agree to privacy policy"
                  />
                  <div className="text-sm">
                    <label
                      htmlFor="agreeToPrivacyPolicy"
                      className="text-gray-300 leading-5"
                    >
                      I agree to the{" "}
                      <a
                        href="/privacy-policy"
                        className="text-purple-400 hover:text-purple-300 underline"
                      >
                        privacy policy
                      </a>{" "}
                      <span className="text-red-400">*</span>
                    </label>
                    {errors.agreeToPrivacyPolicy && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.agreeToPrivacyPolicy.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
            {currentStep > 0 && (
              <Button
                type="button"
                variant="secondary"
                onClick={handlePrevious}
                className="w-full sm:w-auto"
                aria-label="Previous Step"
              >
                <ArrowLeft size={20} className="mr-2" aria-hidden="true" />
                Previous
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button
                type="button"
                variant="primary"
                onClick={handleNext}
                className="w-full sm:w-auto sm:ml-auto"
                aria-label="Next Step"
              >
                Next
                <ArrowRight size={20} className="ml-2" aria-hidden="true" />
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isSubmitting}
                aria-label="Submit Contact Form"
              >
                {isSubmitting ? "Sending..." : "Schedule Consultation"}
              </Button>
            )}
          </div>
        </form>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="lg:pl-6"
      >
        <div className="glass-card p-6 sm:p-8 h-fit">
          <h3 className="text-xl font-semibold text-white mb-4">
            Get in Touch
          </h3>
          <p className="text-gray-400 mb-6 text-responsive">
            Have questions about our services? Need a custom solution for your
            business? Fill out the form or contact us directly using the
            information below.
          </p>

          <div className="space-y-4 mb-6">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
              <span className="text-gray-300 text-responsive">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
              <span className="text-gray-300 text-responsive">info@baobabstack.com</span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h4 className="text-lg font-medium text-white mb-3">
              Business Hours
            </h4>
            <ul className="space-y-2 text-gray-300 text-responsive">
              <li>Monday - Friday: 9:00 AM - 6:00 PM EST</li>
              <li>Saturday: 10:00 AM - 2:00 PM EST</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactForm;
