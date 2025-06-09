import Link from 'next/link';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-black text-center text-gray-800 mb-10 border-b-4 border-blue-500 pb-4">
          Privacy Policy
        </h1>

        <div className="space-y-6 text-gray-700">
          <p className="leading-relaxed">
            We value our customers&apos; privacy and are committed to protecting your personal information. This policy describes how we collect, use, and protect your data.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Information Collection</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Personal information (name, address, phone number, email)</li>
              <li>Payment information (credit card details)</li>
              <li>Purchase and transaction history</li>
              <li>Website browsing data and cookies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Information Usage</h2>
            <p className="leading-relaxed">
              We use your personal information for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Processing orders and completing transactions</li>
              <li>Communicating with you about orders and promotions</li>
              <li>Improving our services and products</li>
              <li>Maintaining the security of our website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Data Protection</h2>
            <p className="leading-relaxed">
              We implement strict security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. We use advanced encryption technologies to safeguard your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Information Sharing</h2>
            <p className="leading-relaxed">
              We do not sell, rent, or share your personal information with third parties except in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>With your consent</li>
              <li>For order processing and payment purposes</li>
              <li>To comply with legal requirements</li>
              <li>To protect our legal rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Contact Us</h2>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-semibold mb-2">For inquiries regarding our privacy policy:</p>
              <p>Email: support@2MTechnology.com</p>
              <p>Phone: 01000980788</p>
              <p>
                You can also visit our <Link href="/contact" className="text-blue-600 underline hover:text-blue-800">Support Page</Link>
              </p>
            </div>
          </section>

          <section className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-bold text-gray-700">
              Last Updated: December 2024
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;