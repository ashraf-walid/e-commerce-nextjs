import Image from 'next/image';

const AboutUs = () => {
    const teamMembers = [
      {
        name: "Team Member 1",
        role: "Founder & Sales Manager",
        image: "/images/member1.png"
      },
      {
        name: "Team Member 2",
        role: "Technical Support Specialist",
        image: "/images/member2.png"
      }
    ];
  
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-50">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative w-full h-80">
            <Image
              src="/images/AboutUs.avif"
              alt="Our Store"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-blue-900 bg-opacity-60 flex items-center justify-center">
              <h1 className="text-4xl md:text-5xl font-black text-white text-center px-4">
                Welcome to Our Tech Store
              </h1>
            </div>
          </div>
        </div>
  
        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            To provide our customers with the best imported laptops at the most competitive prices in the market, ensuring every customer finds their perfect device without compromising on quality or budget.
          </p>
        </div>
  
        {/* Story Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Established in 2022, we began our journey with a clear vision: to make quality laptops accessible to everyone. In just two years, we&apos;ve built a reputation for offering an extensive range of imported laptops at competitive prices in New Damietta.
              </p>
              <p>
                What sets us apart is our commitment to transparency, rapid service, and comprehensive customer support. We don&apos;t limit ourselves to specific brands or models – instead, we source the perfect device for each customer&apos;s unique needs and budget.
              </p>
            </div>
          </div>
        </div>
  
        {/* Values Section */}
        <div className="max-w-6xl mx-auto mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Transparency</h3>
            <p className="text-gray-600">
              We believe in complete honesty about our products and pricing, ensuring you make informed decisions.
            </p>
          </div>
  
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Best Prices</h3>
            <p className="text-gray-600">
              We source our laptops directly from international markets to offer you the most competitive prices.
            </p>
          </div>
  
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Quick Service</h3>
            <p className="text-gray-600">
              Fast, efficient service with comprehensive support before and after your purchase.
            </p>
          </div>
        </div>
  
        {/* Team Section */}
        <div className="max-w-4xl mx-auto mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Team</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
  
        {/* Wide Selection Section */}
        <div className="max-w-4xl mx-auto mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Selection</h2>
          <p className="text-gray-600 text-center">
            We offer a comprehensive range of laptops from various brands and manufacturers. Our flexibility in sourcing allows us to meet any specific requirement, ensuring you get exactly what you need at the best possible price.
          </p>
        </div>
  
        {/* Contact Section */}
        <div className="max-w-4xl mx-auto mt-16 bg-blue-50 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Visit Our Store</h2>
          <div className="text-center space-y-4">
            <p className="text-gray-600 font-semibold">Al-Hamd Mall</p>
            <p className="text-gray-600">New Damietta City</p>
            <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default AboutUs;