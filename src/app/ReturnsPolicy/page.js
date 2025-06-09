import Link from 'next/link';

const ReturnsPolicy = () => {
    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-4xl font-black text-center text-gray-800 mb-10 border-b-4 border-green-500 pb-4">
                    Return Policy
                </h1>

                <div className="space-y-6 text-gray-700">
                    <p className="leading-relaxed">
                        We aim to provide the best shopping experience for our customers, which is why we offer a flexible and easy return policy.
                    </p>

                    <section>
                        <h2 className="text-2xl font-bold text-green-600 mb-4">Conditions for Returns</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>The product must be returned within 14 days from the purchase date.</li>
                            <li>The product must be in its original condition and unused, with all tags attached.</li>
                            <li>A receipt or proof of purchase must be provided along with the product to be returned.</li>
                            <li>Some products are non-returnable, such as custom or personalized items.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-green-600 mb-4">Non-Returnable Items</h2>
                        <p className="leading-relaxed">
                            The following items cannot be returned:
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Products marked as final sale or clearance.</li>
                            <li>Perishable goods, including food and beverages.</li>
                            <li>Opened software, CDs, or DVDs.</li>
                            <li>Gift cards or store credits.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-green-600 mb-4">Refund Process</h2>
                        <p className="leading-relaxed">
                            Once we receive your returned item, we will inspect it and notify you about the status of your refund. If approved, the refund will be processed to your original payment method within 5-7 business days.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-green-600 mb-4">Contact Customer Service</h2>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <p className="font-semibold mb-2">For inquiries and support regarding returns:</p>
                            <p>Email: support@2MTechnology.com</p>
                            <p>Phone: 01000980788</p>
                            <p>
                                Alternatively, visit our <Link href="/Contact" className="text-green-600 underline">Support Page</Link>.
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

export default ReturnsPolicy;