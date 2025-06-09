export const categories = [
  "Keyboards",
  "Mice",
  "Headsets",
  "External Storage",
  "Laptop Stands",
  "Bags & Cases",
  "Chargers",
  "Docking Stations",
  "Cables & Adapters",
  "Cooling Pads",
  'Monitors',
  'Speakers',
  'Microphones',
];

export const brands = [
  "Razer",
  "Logitech",
  "Corsair",
  "SteelSeries",
  "HP",
  "Dell",
  "Asus",
  "Apple",
  "Microsoft",
  "Lenovo",
];

export const sharedFields = [
  { name: "name", type: "text", placeholder: "Product Name", required: true },
  { name: "price", type: "number", placeholder: "Price", required: true },
  { name: "originalPrice",type: "number",placeholder: "Original Price (Before Discount)",required: false,},
  { name: "discount",type: "number",placeholder: "Discount (%)",required: false,},
  { name: "description",type: "textarea",placeholder: "Description",required: true,},
  { name: "category",type: "text",placeholder: "Category (Laptop / Accessory)",required: true,},
  { name: "brand", type: "text", placeholder: "Brand", required: true },
  { name: "stock",type: "number",placeholder: "Available Stock",required: true,}, 
  { name: "isFeatured",type: "checkbox",placeholder: "Mark as Featured?",required: false,},
  { name: "isTrending", type: "checkbox", placeholder: "Mark as Trending?", required: false },
];

export const laptopSpecificFields = [
  { name: "cpu", type: "text", placeholder: "CPU", required: true },
  { name: "ram", type: "text", placeholder: "RAM", required: true },
  { name: "storage", type: "text", placeholder: "Storage", required: true },
  { name: "os", type: "text", placeholder: "Operating System", required: true },
  { name: "screenSize",type: "text",placeholder: "Screen Size",required: true,},
  { name: "graphicCard",type: "text",placeholder: "Graphic Card",required: false,},
  { name: "graphicMemory",type: "text",placeholder: "Graphic Memory",required: false,},
  { name: "batteryCapacity",type: "text",placeholder: "Battery Capacity",required: false,},
  { name: "weight", type: "text", placeholder: "Weight", required: false },
  { name: "ports",type: "text",placeholder: "Ports (USB, HDMI, ...)",required: false,},
  { name: "connectivity",type: "text",placeholder: "Connectivity (WiFi, Bluetooth, ...)",required: false,},
];

export const accessorySpecificFields = [
  { name: "compatibility",type: "text",placeholder: "Compatible Devices",required: true },
  { name: "features",type: "textarea",placeholder: "Special Features",required: true }, 
  { name: "color", type: "text", placeholder: "Color", required: true },
];

export const LaptopsFields = [...sharedFields, ...laptopSpecificFields];
export const AccessoryFields = [...sharedFields, ...accessorySpecificFields];

import { CreditCard,Truck,Package,Clock} from 'lucide-react';

export const generateOrderNumber = () => {
    const now = new Date(); 
    const year = now.getFullYear(); 
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const day = String(now.getDate()).padStart(2, '0'); 
    const randomPart = Math.floor(Math.random() * 10000); 
    return `ORD-${day}${month}${year}-${randomPart}`;
  }

  export const shippingOptions = [
    { id: 'standard', name: 'Standard Delivery', price: 0, time: '3-5 business days', icon: Truck },
    { id: 'express', name: 'Express Delivery', price: 50, time: '1-2 business days', icon: Clock },
  ];
  
  export const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'cod', name: 'Cash on Delivery', icon: Package },
  ];
