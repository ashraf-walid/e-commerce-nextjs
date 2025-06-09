'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, updateDoc, onSnapshot, collection, deleteDoc} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { LaptopsFields } from '@/constant/constants';
import Image from 'next/image';

const storage = getStorage();

function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [newData, setNewData] = useState({});
    const [imageFiles, setImageFiles] = useState([null, null, null, null, null]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'laptopCollection'), (snapshot) => {
            const productsList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(productsList);
        });
        return () => unsubscribe();
    }, []);

    const handleEditClick = (product) => {
        setEditProduct(product);
        setNewData(product);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewData({ ...newData, [name]: value });
    };

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

    const handleSaveChanges = async () => {
        if (editProduct) {
            try {
                const productRef = doc(db, 'laptopCollection', editProduct.id);
                let updatedData = { ...newData };

                if (imageFiles.some(file => file)) {
                    const imageUrls = await handleImageUpload();
                    updatedData.images = imageUrls;
                } else {
                    delete updatedData.images;
                }

                await updateDoc(productRef, updatedData);
                setEditProduct(null);
                alert("Changes saved successfully.");
                setImageFiles([null, null, null, null, null]); // Reset image files
            } catch (error) {
                console.error("Error updating document:", error);
                alert("Changes were not saved, try again.");
            }
        }
    };

    const handleDeleteProduct = async () => {
        if (editProduct && editProduct.id) {
            const confirmDelete = window.confirm(`Are you sure you want to delete the product?"${editProduct.name}" finally?`);
            if (confirmDelete) {
                try {
                    const productDoc = doc(db, "laptopCollection", editProduct.id);
                    await deleteDoc(productDoc);
                    alert("The product has been successfully removed.");
                    setEditProduct(null); 
                } catch (error) {
                    console.error("Error deleting product:", error);
                    alert("An error occurred while deleting the product, Try again.");
                }
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-5">
            <h1 className="text-2xl font-bold mb-5 text-center">Product Management</h1>
            {products.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <li key={product.id} className="border rounded-lg shadow-lg p-4 text-right flex flex-col justify-between">
                            <Image 
                                src={product.images[0]} 
                                alt={product.name} 
                                width={400}
                                height={300}
                                className="w-10/12 rounded-md mb-3"
                            />
                            <div className="product-details">
                                <h2 className="text-lg font-semibold">{product.name}</h2>
                                <p className="text-gray-600">price: {product.price} £</p>
                                <button 
                                    onClick={() => handleEditClick(product)} 
                                    className="mt-3 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-600">There are no products currently available.</p>
            )}

            {editProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-5 w-96 h-[600px] overflow-y-auto mt-11">
                        <h2 className="text-xl font-bold mb-3">Product modification: {editProduct.name}</h2>

                        {/* Input Fields for Product */}
                        {LaptopsFields.map((field) => (
                        <InputField
                            key={field.name}
                            name={field.name}
                            type={field.type}
                            placeholder={field.placeholder}
                            value={newData[field.name]}
                            onChange={handleInputChange}
                        />
                        ))}

                        {/* Image Upload Section */}
                        <h3 className="mb-2 font-semibold">Upload new photos</h3>
                        {[...Array(5)].map((_, i) => (
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
                                    className="border border-gray-300 p-2 rounded w-full text-right"
                                    style={{ display: 'none' }} // Hide the input field
                                />
                                <label htmlFor={`file-input-${i}`} className="cursor-pointer border border-gray-300 p-2 rounded w-full text-right flex justify-between items-center">
                                    <span className="text-gray-400 text-sm">{!imageFiles[i] ? 'You haven`t selected an image yet.' : imageFiles[i].name}</span>
                                    <span className="text-gray-400 text-sm">Select an image</span>
                                </label>
                            </div>
                        ))}

                        {/* Action Buttons */}
                        <div className="flex justify-between">
                            <button 
                                onClick={handleSaveChanges} 
                                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                            >
                                Save changes
                            </button>
                            <button 
                                onClick={() => setEditProduct(null)} 
                                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                            >
                                cancel
                            </button>
                            <button 
                                onClick={handleDeleteProduct} 
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
export default ProductManagement;

function InputField({ name, type, placeholder, value, onChange }) {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="border border-gray-300 px-4 py-1 rounded w-full mb-2 text-right"
        />
    );
}


