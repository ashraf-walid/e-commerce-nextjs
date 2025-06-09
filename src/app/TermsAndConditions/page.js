const TermsAndConditions = () => {
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-black text-center text-gray-800 mb-10 border-b-4 border-blue-500 pb-4">
            Terms and Conditions
          </h1>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">1. Introduction</h2>
              <p className="leading-relaxed">
                Welcome to our website. These Terms and Conditions govern your use of the website and outline your rights and responsibilities. By accessing or using our website, you agree to abide by these terms in full.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">2. Acceptable Use Policy</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>The website is for personal and lawful use only.</li>
                <li>Prohibited activities include abusive or defamatory behavior.</li>
                <li>We reserve the right to restrict access if terms are violated.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">3. Intellectual Property Rights</h2>
              <p className="leading-relaxed">
                All website content, including texts, images, graphics, and logos, is protected under copyright laws. Unauthorized use, reproduction, or distribution of this content is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">4. Privacy and Data Security</h2>
              <p className="leading-relaxed">
                We are committed to protecting your personal information in accordance with our Privacy Policy. Your data will not be shared with third parties without your explicit consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">5. Limitation of Liability</h2>
              <p className="leading-relaxed">
                We shall not be liable for any direct, indirect, or consequential damages arising from your use of the website. Liability is limited to the maximum extent permitted by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">6. User Responsibilities</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Users must provide accurate and up-to-date information when requested.</li>
                <li>Account security is the user’s responsibility; do not share login details.</li>
                <li>Any misuse of the website may result in termination of access.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">7. Amendments to Terms</h2>
              <p className="leading-relaxed">
                We reserve the right to update these Terms and Conditions at any time. Continued use of the website indicates acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">8. Contact Us</h2>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">For inquiries and support:</p>
                <p>Email: support@ourcompany.com</p>
                <p>Phone: +966-555-123-456</p>
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

  export default TermsAndConditions;