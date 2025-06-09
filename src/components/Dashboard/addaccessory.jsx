'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { ImagePlus } from 'lucide-react';
import { AccessoryFields } from '@/constant/constants';
import { categories, brands } from '@/constant/constants';
import { Switch } from '@headlessui/react';

// Initialize default product fields
const defaultAccessory = AccessoryFields.reduce((acc, field) => {
    acc[field.name] = field.type === 'checkbox' ? false : '';
    return acc;
}, {});

const storage = getStorage();

function AddAccessory() {
    const [accessory, setAccessory] = useState(defaultAccessory);
    const [imageFiles, setImageFiles] = useState([null, null, null, null, null]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAccessory(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (index, file) => {
        const updatedFiles = [...imageFiles];
        updatedFiles[index] = file;
        setImageFiles(updatedFiles);
    };

    const handleImageUpload = async () => {
        const urls = await Promise.all(imageFiles.map(async (file) => {
            if (file) {
                const storageRef = ref(storage, `accessories/${file.name}`);
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
            const accessoryWithImages = { ...accessory, images: imageUrls };

            const docRef = await addDoc(collection(db, 'laptop-accessories'), accessoryWithImages);
            await setDoc(docRef, { ...accessoryWithImages, id: docRef.id });
            alert('Accessory added successfully');
            setAccessory(defaultAccessory);
            setImageFiles([null, null, null, null, null]);
        } catch (e) {
            console.error("Error adding document: ", e);
            alert('Failed to add accessory. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="AddAccessory bg-gray-100 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-6">Add Laptop Accessory</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {AccessoryFields.map((field) => {
                        if (field.name === "category") {
                            return (
                                <div key={field.name} className="flex flex-col">
                                    <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-2">
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={accessory.category}
                                        onChange={handleInputChange}
                                        className="p-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="" disabled>Select a category</option>
                                        {categories.map(category => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            );}

                            if (field.type === 'checkbox') {
                                return (
                                    <div key={field.name} className="flex items-center justify-between">
                                        <label className="text-gray-700 font-medium">{field.placeholder}</label>
                                        <Switch
                                            checked={accessory[field.name]}
                                            onChange={(value) => setAccessory({ ...accessory, [field.name]: value })}
                                            className={`${accessory[field.name] ? 'bg-blue-600' : 'bg-gray-300'}
                                                relative inline-flex h-6 w-11 items-center rounded-full`}
                                        >
                                            <span
                                                className={`${
                                                    accessory[field.name] ? 'translate-x-6' : 'translate-x-1'
                                                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                            />
                                        </Switch>
                                    </div>
                                );
                            }

                        if (field.name === "brand") {
                            return (
                                <div key={field.name} className="flex flex-col">
                                    <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-2">
                                        Brand
                                    </label>
                                    <select
                                        id="brand"
                                        name="brand"
                                        value={accessory.brand}
                                        onChange={handleInputChange}
                                        className="p-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="" disabled>Select a brand</option>
                                        {brands.map(brand => (
                                            <option key={brand} value={brand}>
                                                {brand}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            );}
                        else {
                            return (
                                <div key={field.name} className="flex flex-col">
                                    <label htmlFor={field.name} className="text-sm font-medium text-gray-700 mb-2">
                                        {field.placeholder}
                                    </label>
                                    <input
                                        id={field.name}
                                        name={field.name}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        value={accessory[field.name]}
                                        onChange={handleInputChange}
                                        className="p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            );
                        }
                    })}
                </div>

                {/* Image Upload Section */}
                <div className="my-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Upload Images</h3>
                    <div className="flex gap-4 flex-wrap">
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
                                    onChange={(e) => handleImageChange(index, e.target.files[0])}
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
                            Adding Accessory...
                        </>
                    ) : (
                        'Add Accessory'
                    )}
                </button>
            </form>
        </div>

    );
}

export default AddAccessory;
