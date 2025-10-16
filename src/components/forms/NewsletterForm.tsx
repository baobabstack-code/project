"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Mail } from "lucide-react";
// Newsletter form now uses direct API route calls
import { useToast } from "../../contexts/ToastContext";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type NewsletterFormData = z.infer<typeof schema>;

const NewsletterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(schema),
  });
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Subscription failed");
      }

      showToast("Subscribed successfully!", "success");
      reset();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Subscription failed. Please try again.";
      showToast(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="flex flex-col items-center gap-6 w-full max-w-md mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
    <Input
  id="newsletter-email"
  type="email"
  placeholder="Enter your email"
  variant="newsletter"
  inputSize="default"
  icon={<Mail />}
  error={errors.email?.message}
  className="w-full"
  aria-label="Email address"
  {...register("email")}
      />
      <Button
        type="submit"
        variant="primary"
        size="default"
        className="w-full sm:w-auto px-8"
        disabled={isSubmitting}
        aria-label="Subscribe to newsletter"
      >
        {isSubmitting ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  );
};

export default NewsletterForm;
