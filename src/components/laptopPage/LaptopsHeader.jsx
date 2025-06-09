import { Laptop2, Cpu, Battery, Wifi } from 'lucide-react';

export function LaptopsHeader() {
    const features = [
        { icon: Laptop2, text: 'Latest Models' },
        { icon: Cpu, text: 'Outstanding Performance' },
        { icon: Battery, text: 'Long Battery Life' },
        { icon: Wifi, text: 'High-Speed Connectivity' }
    ];

    return (
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Discover the Latest Laptops</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-12">
                        A diverse collection of laptops to suit all needs and budgets.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center p-4 bg-white/10 rounded-lg backdrop-blur-sm 
                                     transition-transform duration-300 hover:scale-105 animate-fade-in-up"
                            style={{ animationDelay: `${index * 300}ms` }}
                        >
                            <feature.icon className="w-8 h-8 mb-3" />
                            <span className="text-sm font-medium text-center">{feature.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
