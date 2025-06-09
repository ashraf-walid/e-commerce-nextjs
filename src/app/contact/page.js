import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { MapPin } from 'lucide-react';

export default function Contact() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
        {/* Hero Section */}
        <div className="relative bg-sky-900 text-white py-20 overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596524430615-b46475ddff6e')] bg-cover bg-center opacity-20" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact us</h1>
            <p className="text-xl md:text-2xl text-sky-100 max-w-2xl mx-auto">
                We are here to answer your questions and help you with everything you need.
            </p>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-12 text-sky-50 fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
            </svg>
            </div>
        </div>

        {/* Quick Contact Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Location Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform hover:-translate-y-1 transition duration-300">
                <div className="flex items-center justify-center w-12 h-12 bg-sky-100 text-sky-600 rounded-full mb-4">
                <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Our location</h3>
                <p className="text-gray-600">ELHAMED Mall, New Damietta</p>
            </div>
            
            {/* Phone Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform hover:-translate-y-1 transition duration-300">
                <div className="flex items-center justify-center w-12 h-12 bg-sky-100 text-sky-600 rounded-full mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Contact us</h3>
                <p className="text-gray-600 dir-ltr">01000980788</p>
            </div>
            
            {/* Email Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform hover:-translate-y-1 transition duration-300">
                <div className="flex items-center justify-center w-12 h-12 bg-sky-100 text-sky-600 rounded-full mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Contact us</h3>
                <p className="text-gray-600">support@2MTechnology.com</p>
            </div>
            </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:shadow-2xl transition duration-300">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h2>
                    <p className="text-gray-600">We are pleased to receive your message and answer your inquiries.</p>
                </div>
                <ContactForm />
            </div>
            
            {/* Contact Info Section */}
            <div 
                className="bg-gradient-to-br from-sky-50 to-white rounded-2xl shadow-xl p-8 transform hover:shadow-2xl transition duration-300">
                <ContactInfo />
            </div>
            </div>
        </div>

        {/* Map Section */}
        <div className="h-96 w-full relative overflow-hidden">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.1763705123985!2d31.677960985087886!3d31.43681112127319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f9e3b69e039643%3A0x34ea58e7681faca4!2z2YXZiNmEINin2YTYrdmF2K8!5e0!3m2!1sar!2seg!4v1736160604660!5m2!1sar!2seg"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
            />
        </div>
        </div>
    );
}

