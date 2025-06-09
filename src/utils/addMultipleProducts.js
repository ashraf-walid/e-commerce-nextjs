// import { db } from '../firebaseConfig';
// import { collection, addDoc, setDoc } from 'firebase/firestore';
// import { useEffect } from 'react';

// useEffect(()=>{
//     addMultipleProducts();
// },[])

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
//         // images: [`https://via.placeholder.com/150?text=Laptop+${index + 1}`], 
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

// export default addMultipleProducts;
