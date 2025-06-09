'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, updateDoc, onSnapshot, collection, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { AccessoryFields } from '@/constant/constants';
import Image from 'next/image';

const storage = getStorage();

function LaptopAccessoriesManagement() {
    const [accessories, setAccessories] = useState([]);
    const [editAccessory, setEditAccessory] = useState(null);
    const [newData, setNewData] = useState({});
    const [imageFiles, setImageFiles] = useState([null, null, null]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'laptop-accessories'), (snapshot) => {
            const accessoriesList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setAccessories(accessoriesList);
        });
        return () => unsubscribe();
    }, []);

    const handleEditClick = (accessory) => {
        setEditAccessory(accessory);
        setNewData(accessory);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewData({ ...newData, [name]: value });
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

    const handleSaveChanges = async () => {
        if (editAccessory) {
            try {
                const accessoryRef = doc(db, 'laptop-accessories', editAccessory.id);
                let updatedData = { ...newData };
    
                if (imageFiles.some(file => file)) {
                    const imageUrls = await handleImageUpload();
                    updatedData.images = imageUrls;
                }
                await updateDoc(accessoryRef, updatedData);
                setEditAccessory(null);
                alert("Changes have been saved successfully");
                setImageFiles([null, null, null]);
            } catch (error) {
                console.error("Error updating document:", error);
                alert("Changes could not be saved. Please try again.");
            }
        }
    };
    
    const handleDeleteAccessory = async () => {
        if (editAccessory && editAccessory.id) {
            const confirmDelete = window.confirm(`Are you sure you want to delete "${editAccessory.name}"?`);
            if (confirmDelete) {
                try {
                    const accessoryRef = doc(db, "laptop-accessories", editAccessory.id);
                    await deleteDoc(accessoryRef);
                    alert("Accessory has been deleted successfully");
                    setEditAccessory(null);
                } catch (error) {
                    console.error("Error deleting document:", error);
                    alert("An error occurred while deleting the accessory.");
                }
            }
        }
    };
    
    return (
        <div className="max-w-4xl mx-auto p-5">
            <h1 className="text-2xl font-bold mb-5 text-center">Laptop Accessories Management</h1>
            {accessories.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {accessories.map((accessory) => (
                        <li key={accessory.id} className="border rounded-lg shadow-lg p-4 text-right">
                            <Image 
                                src={accessory.images[0]} 
                                alt={accessory.name} 
                                width={400}
                                height={160}
                                className="w-full h-40 object-cover rounded-md mb-3"
                            />
                            <div>
                                <h2 className="text-lg font-semibold">{accessory.name}</h2>
                                <p className="text-gray-600">Price: {accessory.price} EGP</p>
                                <button 
                                    onClick={() => handleEditClick(accessory)} 
                                    className="mt-3 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-600">No accessories available</p>
            )}
    
            {editAccessory && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-5 w-96 h-[600px] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-3">Edit Accessory: {editAccessory.name}</h2>
    
                        {/* Input Fields */}
                        {AccessoryFields.map((field) => (
                            <InputField
                                key={field.name}
                                name={field.name}
                                type={field.type}
                                placeholder={field.placeholder}
                                value={newData[field.name]}
                                onChange={handleInputChange}
                            />
                        ))}
    
                        {/* Image Upload */}
                        <h3 className="mb-2 font-semibold">Upload New Images</h3>
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="mb-4">
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    id={`file-input-${i}`} 
                                    onChange={(e) => {
                                        const newFiles = [...imageFiles];
                                        newFiles[i] = e.target.files[0];
                                        setImageFiles(newFiles);
                                    }} 
                                    className="hidden"
                                />
                                <label htmlFor={`file-input-${i}`} className="cursor-pointer border p-2 rounded w-full flex justify-between items-center">
                                    <span className="text-gray-400">{imageFiles[i]?.name || "No image selected yet"}</span>
                                    <span className="text-blue-600">Choose Image</span>
                                </label>
                            </div>
                        ))}
    
                        {/* Action Buttons */}
                        <div className="flex justify-between mt-4">
                            <button 
                                onClick={handleSaveChanges} 
                                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                            >
                                Save Changes
                            </button>
                            <button 
                                onClick={() => setEditAccessory(null)} 
                                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleDeleteAccessory} 
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );    
}

export default LaptopAccessoriesManagement;

// eslint-disable-next-line react/prop-types
function InputField({ name, type, placeholder, value, onChange }) {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="border border-gray-300 px-4 py-2 rounded w-full mb-2 text-right"
        />
    );
}
