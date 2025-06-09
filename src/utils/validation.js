// Utility functions for form validation
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePhone = (phone) => {
    const phoneRegex = /^(?:\+|00)?20(10|11|12|15)[0-9]{8}$|^01(0|1|2|5)[0-9]{8}$/;
    return phoneRegex.test(phone);
};

export const validateName = (name) => {
    return name.trim().length >= 2;
};

export const validateMessage = (message) => {
    return message.trim().length >= 10;
};


export function validateForm(formData) {
    const errors = {};
    // Required fields
    const requiredFields = ['firstName', 'lastName', 'phone', 'address', 'city', 'state'];
    requiredFields.forEach(field => {
      if (!formData[field]?.trim()) {
        errors[field] = 'This field is required';
      }
    });
  
    // Email validation
    if (formData.email && !validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
  
    // Phone validation
    if (formData.phone && !validatePhone(formData.phone)) {
      errors.phone = 'Invalid phone number. Must be at least 10 digits.';
    }
  
    return errors;
}


export function validateDirectCheckoutForm(formData) {
    const errors = {};
  
    // Required fields validation
    const requiredFields = {
      firstName: 'First name is required',
      lastName: 'Last name is required',
      phone: 'Phone number is required',
      address: 'Address is required',
      city: 'City is required',
      state: 'State is required'
    };
  
    Object.entries(requiredFields).forEach(([field, message]) => {
      if (!formData[field]?.trim()) {
        errors[field] = message;
      }
    });
  
    // Phone validation
    if (formData.phone && !validatePhone(formData.phone)) {
      errors.phone = 'Please enter a valid 11-digit phone number';
    }
  
    // Address validation
    if (formData.address && formData.address.length < 10) {
      errors.address = 'Please enter a complete delivery address';
    }
  
    return errors;
}

