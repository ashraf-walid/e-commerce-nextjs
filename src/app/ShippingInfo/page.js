
const ShippingInfo = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <h1 className="text-4xl font-black text-center text-gray-800 mb-10 border-b-4 border-blue-500 pb-4">
          Shipping Information
        </h1>

        {/* Shipping Methods */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Shipping Methods</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Store Pickup</h3>
              <p className="text-gray-600">
                • Available from our store at Al-Hamd Mall, New Damietta City<br />
                • Free of charge<br />
                • Available during store hours: 10 AM - 10 PM<br />
                • Ready for pickup within 1 hour of purchase
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Local Delivery (Damietta Area)</h3>
              <p className="text-gray-600">
                • Same-day delivery within New Damietta City<br />
                • Next-day delivery to surrounding Damietta areas<br />
                • Delivery fee based on location<br />
                • Available 7 days a week
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Nationwide Shipping</h3>
              <p className="text-gray-600">
                • 2-4 business days delivery time<br />
                • Shipping costs calculated based on destination<br />
                • Tracking number provided via SMS/email<br />
                • Insurance included for all shipments
              </p>
            </div>
          </div>
        </section>

        {/* Shipping Costs */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Shipping Costs</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border p-3 text-left">Region</th>
                  <th className="border p-3 text-left">Estimated Time</th>
                  <th className="border p-3 text-left">Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3">New Damietta City</td>
                  <td className="border p-3">Same Day</td>
                  <td className="border p-3">Free over 5000 EGP</td>
                </tr>
                <tr>
                  <td className="border p-3">Damietta Region</td>
                  <td className="border p-3">1-2 Days</td>
                  <td className="border p-3">50 EGP</td>
                </tr>
                <tr>
                  <td className="border p-3">Major Cities</td>
                  <td className="border p-3">2-3 Days</td>
                  <td className="border p-3">75 EGP</td>
                </tr>
                <tr>
                  <td className="border p-3">Other Regions</td>
                  <td className="border p-3">3-4 Days</td>
                  <td className="border p-3">100 EGP</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Important Information */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Important Information</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              <span className="font-semibold">Order Processing:</span> All orders are processed within 24 hours of payment confirmation.
            </p>
            <p>
              <span className="font-semibold">Tracking:</span> A tracking number will be provided via SMS and email once your order is shipped.
            </p>
            <p>
              <span className="font-semibold">Insurance:</span> All shipments are fully insured against damage or loss during transit.
            </p>
          </div>
        </section>

        {/* Safety Measures */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Product Safety</h2>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-600">
              All laptops and accessories are carefully packaged to ensure safe delivery. We use:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
              <li>Professional-grade packaging materials</li>
              <li>Shock-absorbing padding</li>
              <li>Sealed waterproof bags</li>
              <li>Sturdy outer boxes</li>
            </ul>
          </div>
        </section>

        {/* Contact Support */}
        <section>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Shipping Support</h2>
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <p className="text-gray-600 mb-4">
              For any questions about shipping or to track your order:
            </p>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Contact Support
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShippingInfo;