'use client';

import Link from 'next/link';
import { Tooltip } from '../UI/ui-Tooltip';
import { ShoppingCart, Info, Cpu } from 'lucide-react';
import useShopStore from '@/store/shopStore';
import Image from 'next/image';

export const Product = (props) => {
    const { id, name, price, images, cpu, ram, discount, originalPrice } = props.data;
    const addToCart = useShopStore(state => state.addToCart);
    const formattedPrice = price.toLocaleString('en-US', { minimumFractionDigits: 2 });

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden group relative animate-fade-in-up hover:-translate-y-1 transition-all duration-300">
            <Link href={`/products/laptopCollection/${id}`}> 
            {images?.length > 0 && (
                <Image 
                    src={images[0]} 
                    alt={name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg transform group-hover:scale-105 transition-transform duration-300"
                />
            )}
            </Link>

            <div className="absolute top-2 right-2">
                {discount > 0 && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                        -{discount}%
                    </span>
                )}
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{name}</h3>
                
                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                        <Cpu className="w-4 h-4 mr-2" />
                        <span>{cpu}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <Info className="w-4 h-4 mr-2" />
                        <span>{ram} RAM</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-blue-600">£ {formattedPrice}</span>
                        {originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                                {originalPrice} 
                            </span>
                        )}
                    </div>
                    <Tooltip content="Add to Cart">
                        <button onClick={() => addToCart(id)} className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                            <ShoppingCart className="w-5 h-5" />
                        </button>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};

