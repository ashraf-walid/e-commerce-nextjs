'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { FormInput } from './FormInput';
import { FormTextArea } from './FormTextArea';
import { SuccessMessage } from './SuccessMessage';
import { validateEmail, validateName, validateMessage, validatePhone } from '@/utils/validation';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return validateName(value) ? '' : 'Name must contain at least 2 letters';
      case 'email':
        return validateEmail(value) ? '' : 'Invalid email';
      case 'phone':
        return value === '' || validatePhone(value) ? '' : 'Invalid phone number (must start with +20)';
      case 'message':
        return validateMessage(value) ? '' : 'Message must contain at least 10 characters.';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const Message = {...formData};
      await addDoc(collection(db, 'Our-Messages'), Message);
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setTouched({});
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          required
          placeholder="Enter your full name"
        />

        <FormInput
          label="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          required
          placeholder="example@domain.com"
          dir="ltr"
        />

        <FormInput
          label="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
          placeholder="+20"
          dir="ltr"
        />

        <FormInput
          label="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Message subject"
        />

        <FormTextArea
          label="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.message}
          required
          placeholder="Write your message here..."
          rows={5}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            flex items-center justify-center w-full px-4 py-2 
            bg-sky-500 text-white rounded-md mt-36
            hover:bg-sky-600 focus:outline-none focus:ring-2 
            focus:ring-offset-2 focus:ring-sky-500
            transition duration-150 ease-in-out
            ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}
          `}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send message
            </>
          )}
        </button>
      </form>

      {showSuccess && (
        <SuccessMessage
          message="Your message has been received successfully. We will reply to you as soon as possible."
          onClose={() => setShowSuccess(false)}
        />
      )}
    </>
  );
}