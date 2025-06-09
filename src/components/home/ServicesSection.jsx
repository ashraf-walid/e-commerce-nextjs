import { Truck, Shield, Clock, CreditCard, Package, HeadphonesIcon } from 'lucide-react';

const services = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free shipping on orders over $100'
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% secure payment processing'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock customer service'
  },
  {
    icon: CreditCard,
    title: 'Easy Returns',
    description: '30-day money-back guarantee'
  },
  {
    icon: Package,
    title: 'Quality Products',
    description: 'Carefully selected premium items'
  },
  {
    icon: HeadphonesIcon,
    title: 'Expert Support',
    description: 'Technical assistance available'
  }
];

export default function ServicesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Why Choose Us
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="flex items-start p-6 bg-gray-50 rounded-xl"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}