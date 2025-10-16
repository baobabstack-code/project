import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';
import { Calendar, Clock, User, Mail, Phone } from 'lucide-react';

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  message: string;
}

const CalendarBooking: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // This would be replaced with an actual API call
      console.log('Booking submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        message: ''
      });
    } catch (error) {
      setSubmitError('There was an error submitting your booking. Please try again.');
      console.error('Booking submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate time slots from 9 AM to 5 PM
  const timeSlots = [];
  for (let hour = 9; hour <= 17; hour++) {
    const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
    const amPm = hour < 12 ? 'AM' : 'PM';
    timeSlots.push({ value: `${hourFormatted}:00 ${amPm}`, label: `${hourFormatted}:00 ${amPm}` });
    timeSlots.push({ value: `${hourFormatted}:30 ${amPm}`, label: `${hourFormatted}:30 ${amPm}` });
  }

  // Get today's date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split('T')[0];

  if (submitSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/5 border border-white/10 rounded-lg p-8 text-center"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
          <Calendar className="h-6 w-6 text-green-600" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-4">Booking Confirmed!</h3>
        <p className="text-gray-300 mb-6">
          Your consultation has been scheduled. We'll send you a confirmation email with all the details.
        </p>
        <Button 
          variant="primary" 
          onClick={() => setSubmitSuccess(false)}
          className="mx-auto"
        >
          Book Another Consultation
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="form-container glass-card">
      <div className="grid-responsive-2 min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="min-w-0 w-full"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="name"
              name="name"
              label="Your Name"
              placeholder="John Doe"
              required
              icon={<User />}
              value={formData.name}
              onChange={handleChange}
            />

            <Input
              id="email"
              name="email"
              type="email"
              label="Email Address"
              placeholder="john@example.com"
              required
              icon={<Mail />}
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              id="phone"
              name="phone"
              type="tel"
              label="Phone Number"
              placeholder="(555) 123-4567"
              required
              icon={<Phone />}
              value={formData.phone}
              onChange={handleChange}
            />

            <div className="form-grid">
              <Input
                id="date"
                name="date"
                type="date"
                label="Date"
                required
                min={today}
                value={formData.date}
                onChange={handleChange}
              />
              <Select
                id="time"
                name="time"
                label="Time"
                placeholder="Select a time"
                required
                options={timeSlots}
                value={formData.time}
                onChange={handleChange}
              />
            </div>

            <Textarea
              id="message"
              name="message"
              label="Message"
              placeholder="Let us know any details or questions..."
              rows={3}
              value={formData.message}
              onChange={handleChange}
            />

            {submitError && (
              <div className="text-red-500 text-sm p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                {submitError}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isSubmitting}
              aria-label="Book Consultation"
            >
              {isSubmitting ? 'Booking...' : 'Book Consultation'}
            </Button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:pl-6 min-w-0 w-full"
        >
          <div className="glass-card p-6 h-fit">
            <h3 className="text-xl font-semibold text-white mb-4">Book a Consultation</h3>
            <p className="text-gray-400 mb-6 text-responsive">
              Schedule a free 30-minute consultation with our experts to discuss your project needs and how we can help you achieve your business goals.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium mb-1">What to Expect</h4>
                  <p className="text-gray-400 text-sm text-responsive">
                    A 30-minute video call with one of our specialists to discuss your needs, answer questions, and explore potential solutions.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium mb-1">Availability</h4>
                  <p className="text-gray-400 text-sm text-responsive">
                    Monday to Friday, 9:00 AM - 5:00 PM EST. Select your preferred date and time, and we'll confirm via email.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h4 className="text-lg font-medium text-white mb-3">Why Book a Consultation?</h4>
              <ul className="space-y-3 text-gray-300 text-responsive">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                  <span>Get personalized advice for your specific business needs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                  <span>Learn about our services and how they can benefit you</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                  <span>Discuss project timelines, budgets, and expectations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                  <span>No obligation or pressure to commit</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CalendarBooking;