'use client';

import { Product } from '@/components/laptopPage/Product';
import { LaptopFilters } from '@/components/laptopPage/LaptopFilters';
import { LaptopsHeader } from '@/components/laptopPage/LaptopsHeader';
import { useLaptopFilters } from '@/hooks/useLaptopFilters';
import Footer from '@/components/footer/Footer';
import useShopStore from '@/store/shopStore';
import Image from "next/image";

export default function LaptopsPage() {
    const { laptopsList } = useShopStore();
    const {
        filters,
        setFilters,
        filteredLaptops,
        availableOptions,
        priceRange,
        resultsCount,
        totalCount
    } = useLaptopFilters(laptopsList);

    return (
        <div className="min-h-screen bg-gray-50">
            <LaptopsHeader />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <LaptopFilters
                            filters={filters}
                            setFilters={setFilters}
                            availableOptions={availableOptions}
                            priceRange={priceRange}
                            resultsCount={resultsCount}
                            totalCount={totalCount}
                        />
                    </div>

                    {/* Product Grid */}
                    <div className="lg:col-span-3">
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredLaptops.length > 0 ? (
                                filteredLaptops.map((p) => (
                                    <Product key={p.id} data={p}/>
                                ))
                            ) : (
                                <div className="col-span-full flex flex-col items-center justify-center py-12 px-4 text-center">
                                    <Image
                                        src="/images/NoMatchingResultsFound.jpg"
                                        alt="No results"
                                        width={256}
                                        height={256}
                                        className="w-64 h-64 object-cover rounded-lg mb-4 opacity-50"
                                    />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        No matching results found
                                    </h3>
                                    <p className="text-gray-500">
                                        Try adjusting the filters to get different results.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}



// import { useEffect } from 'react';


// import { db } from '../firebaseConfig';
// import { collection, addDoc, setDoc } from 'firebase/firestore';

    // const addMultipleProducts = async () => {
    //     const sampleProducts = Array.from({ length: 10 }, (_, index) => ({
    //         name: `Laptop Model ${index + 1}`,
    //         price: 500 + index * 50,
    //         description: `This is the description for Laptop Model ${index + 1}.`,
    //         cpu: `Intel Core i${index % 7 + 3}`,
    //         ram: `${4 + (index % 4) * 4} GB`,
    //         storage: `${128 + (index % 3) * 128} GB`,
    //         os: 'Windows 11',
    //         screenSize: `${13 + (index % 3)} inches`,
    //         modelNumber: `MOD-${index + 100}`,
    //         brand: index % 2 === 0 ? 'Dell' : 'HP',
    //         processorGeneration: `Gen ${index % 5 + 1}`,
    //         clockSpeed: `${2 + (index % 3) * 0.5} GHz`,
    //         cacheMemory: `${index % 5 + 3} MB`,
    //         maxMemoryExpansion: `${16 + (index % 4) * 16} GB`,
    //         hardDiskNumber: index % 2 + 1,
    //         graphicCard: index % 2 === 0 ? 'NVIDIA GTX' : 'Intel UHD Graphics',
    //         graphicMemory: `${2 + (index % 3) * 2} GB`,
    //         displayResolution: `${1920 + (index % 3) * 160} x 1080`,
    //         batteryCapacity: `${40 + (index % 3) * 10} Wh`,
    //         weight: `${1.5 + (index % 3) * 0.5} kg`,
    //         dimensions: `${30 + index % 3} x ${20 + index % 3} x ${1.5 + index % 3}`,
    //         warranty: `${1 + index % 3} Year(s)`,
    //         color: index % 2 === 0 ? 'Black' : 'Silver',
    //         ports: index % 2 === 0 ? 'USB 3.0, HDMI' : 'USB-C, HDMI',
    //         connectivity: index % 2 === 0 ? 'WiFi, Bluetooth 5.0' : 'WiFi 6, Bluetooth 5.2',
    //         images: [`https://via.placeholder.com/150?text=Laptop+${index + 1}`], 
    //     }));
    
    //     try {
    //         const collectionRef = collection(db, 'laptopCollection');
    //         for (const product of sampleProducts) {
    //             const docRef = await addDoc(collectionRef, product);
    //             await setDoc(docRef, { ...product, id: docRef.id }); 
    //             console.log(`Product added: ${product.name}`);
    //         }
    //         console.log('All products have been added successfully.');
    //     } catch (e) {
    //         console.error("Error adding products: ", e);
    //     }
    // };

    // useEffect(()=>{
    //     addMultipleProducts();
    // },[])
