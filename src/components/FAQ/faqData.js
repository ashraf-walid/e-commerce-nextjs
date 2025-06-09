import { ShoppingCart, Truck, CreditCard, Package, RefreshCw, HeadphonesIcon } from 'lucide-react';

export const faqCategories = [
  {
    id: 'ordering',
    title: 'Ordering',
    icon: ShoppingCart,
    questions: [
      {
        question: 'How do I place an order?',
        answer: 'You can place an order by selecting your desired products, adding them to your cart, and proceeding to checkout. Follow the simple steps to provide shipping and payment information.'
      },
      {
        question: 'Can I modify or cancel my order?',
        answer: 'You can modify or cancel your order within 1 hour of placing it. Please contact our customer support team for assistance.'
      }
    ]
  },
  {
    id: 'shipping',
    title: 'Shipping & Delivery',
    icon: Truck,
    questions: [
      {
        question: 'What are the shipping options?',
        answer: 'We offer standard delivery (3-5 business days) and express delivery (1-2 business days). Standard shipping is free for orders over £100.'
      },
      {
        question: 'How can I track my order?',
        answer: 'Once your order ships, you\'ll receive a tracking number via email. You can use this to track your package on our website.'
      }
    ]
  },
  {
    id: 'payment',
    title: 'Payment',
    icon: CreditCard,
    questions: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, PayPal, and offer cash on delivery for certain locations.'
      },
      {
        question: 'Is my payment information secure?',
        answer: 'Yes, we use industry-standard SSL encryption to protect your payment information.'
      }
    ]
  },
  {
    id: 'returns',
    title: 'Returns & Refunds',
    icon: RefreshCw,
    questions: [
      {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy for most items. Products must be unused and in their original packaging.'
      },
      {
        question: 'How do I initiate a return?',
        answer: 'Log into your account, go to your orders, and select "Return Item". Follow the instructions to print your return label.'
      }
    ]
  },
  {
    id: 'products',
    title: 'Products',
    icon: Package,
    questions: [
      {
        question: 'Are your products genuine?',
        answer: 'Yes, all our products are 100% genuine and sourced directly from authorized distributors.'
      },
      {
        question: 'Do you offer warranty?',
        answer: 'Yes, all our products come with manufacturer warranty. Duration varies by product.'
      }
    ]
  },
  {
    id: 'support',
    title: 'Customer Support',
    icon: HeadphonesIcon,
    questions: [
      {
        question: 'How can I contact customer support?',
        answer: 'You can reach us via email, phone, or live chat. Our support team is available 24/7.'
      },
      {
        question: 'What are your business hours?',
        answer: 'Our customer service team is available Monday to Friday, 9 AM to 6 PM.'
      }
    ]
  }
];