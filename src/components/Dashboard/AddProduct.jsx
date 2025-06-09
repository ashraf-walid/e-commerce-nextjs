'use client';

import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { db } from '@/lib/firebase';
import { collection, addDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { ImagePlus } from 'lucide-react';
import { LaptopsFields } from '@/constant/constants';

const defaultProduct = LaptopsFields.reduce((acc, field) => {
    acc[field.name] = field.type === 'checkbox' ? false : '';
    return acc;
}, {});

const storage = getStorage();

function AddProduct() {
    const [product, setProduct] = useState(defaultProduct);
    const [imageFiles, setImageFiles] = useState([null, null, null, null, null]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageUpload = async () => {
        const urls = await Promise.all(imageFiles.map(async (file) => {
            if (file) {
                const storageRef = ref(storage, `images/${file.name}`);
                await uploadBytes(storageRef, file);
                return await getDownloadURL(storageRef);
            }
            return null;
        }));
        return urls.filter(url => url !== null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const imageUrls = await handleImageUpload();
            const productWithImages = { ...product, images: imageUrls };

            const docRef = await addDoc(collection(db, 'laptopCollection'), productWithImages);
            await setDoc(docRef, { ...productWithImages, id: docRef.id });
            alert('Product added successfully');
            setProduct(defaultProduct);
            setImageFiles([null, null, null, null, null]);
        } catch (e) {
            console.error("Error adding document: ", e);
            alert('Failed to add product. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-4xl max-sm:w-screen mx-auto overflow-auto">
            <h2 className="text-2xl font-semibold text-center mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-6">
                    {LaptopsFields.map((field) => {
                        if (field.type === 'checkbox') {
                            return (
                                <div key={field.name} className="flex items-center justify-between">
                                    <label className="text-gray-700 font-medium">{field.placeholder}</label>
                                    <Switch
                                        checked={product[field.name]}
                                        onChange={(value) => setProduct({ ...product, [field.name]: value })}
                                        className={`${product[field.name] ? 'bg-blue-600' : 'bg-gray-300'}
                                            relative inline-flex h-6 w-11 items-center rounded-full`}
                                    >
                                        <span
                                            className={`${
                                                product[field.name] ? 'translate-x-6' : 'translate-x-1'
                                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                        />
                                    </Switch>
                                </div>
                            );
                        } else {
                            return (
                                <div key={field.name} className="flex flex-col">
                                    <label htmlFor={field.name} className="text-sm font-medium text-gray-700 mb-2">
                                        {field.placeholder}
                                    </label>
                                    <input
                                        id={field.name}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        value={product[field.name]}
                                        onChange={(e) => setProduct({ ...product, [field.name]: e.target.value })}
                                        className="border border-gray-300 p-2 rounded w-full"
                                    />
                                </div>
                            );
                        }
                    })}
                </div>

                <div className="my-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Upload Images</h3>
                    <div className="flex flex-wrap gap-4">
                        {imageFiles.map((_, index) => (
                            <label key={index} className="cursor-pointer">
                                <div className="w-24 h-24 max-sm:w-16 max-sm:h-16 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center hover:border-blue-500">
                                    {imageFiles[index] ? (
                                        <img
                                            src={URL.createObjectURL(imageFiles[index])}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    ) : (
                                        <ImagePlus className="w-6 h-6" />
                                    )}
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const newFiles = [...imageFiles];
                                        newFiles[index] = e.target.files[0];
                                        setImageFiles(newFiles);
                                    }}
                                />
                            </label>
                        ))}
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center ${
                        isSubmitting 
                            ? 'opacity-70 cursor-not-allowed' 
                            : 'hover:bg-blue-700'
                    }`}
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Adding Product...
                        </>
                    ) : (
                        'Add Product'
                    )}
                </button>
            </form>
        </div>
    );
}

export default AddProduct;
