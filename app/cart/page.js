import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import PromoBanner from '../components/topBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// --- CartItem Component (For individual items) ---
const CartItem = ({ item }) => {
  return (
    <div className="flex items-start justify-between border-b border-gray-100 py-6 last:border-b-0">
      <div className="flex items-start space-x-4">
        {/* Product Image */}
        <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
          {/* In a real app, you would use an <img> tag here */}
          <div className="w-full h-full object-cover" style={{ backgroundColor: item.color === 'White' ? '#f0f0f0' : '#4a4a4a' }}>
            {/* Placeholder for image */}
            <img src={item.image} alt={item.name} className="w-full h-full object-cover"/>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col pt-1">
          <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
          <p className="text-sm text-gray-500">Size: <span className="font-semibold">{item.size}</span></p>
          <p className="text-sm text-gray-500">Color: <span className="font-semibold">{item.color}</span></p>
          <p className="text-xl font-bold mt-2 text-gray-900">${item.price}</p>
        </div>
      </div>

      {/* Quantity Selector and Delete Button */}
      <div className="flex flex-col items-end pt-1">
        <button className="text-red-600 hover:text-red-800 p-1 mb-6">
          <Trash2 size={20} />
        </button>

        <div className="flex items-center space-x-1 border border-gray-300 rounded-full px-1 py-1">
          <button className="p-1 hover:bg-gray-100 rounded-full transition duration-150">
            <Minus size={16} />
          </button>
          <span className="px-2 text-sm font-semibold">1</span>
          <button className="p-1 hover:bg-gray-100 rounded-full transition duration-150">
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Mock Data (Based on your image) ---
const cartItems = [
  { id: 1, name: 'Gradient Graphic T-shirt', size: 'Large', color: 'White', price: 145, image: '' },
  { id: 2, name: 'Checkered Shirt', size: 'Medium', color: 'Red', price: 180, image: '' },
  { id: 3, name: 'Skinny Fit Jeans', size: 'Large', color: 'Blue', price: 240, image: '' },
];

const subtotal = 565;
const discountRate = 0.20;
const discount = subtotal * discountRate; // $113
const deliveryFee = 15;
const total = subtotal - discount + deliveryFee; // $467

// --- Main Page Component ---
export default function CartPage() {
  return (
    <>
      <PromoBanner />
      <Navbar />

      <div className="container mx-auto px-4 py-10 md:py-16 border-t border-gray-300">
        <h1 className="text-4xl font-extrabold mb-8 md:mb-12 uppercase">Your Cart</h1>
        
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:w-2/3 bg-white p-6 md:p-8 rounded-4xl shadow-lg border border-gray-100">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:w-1/3 mt-8 lg:mt-0  sticky top-4">
            <div className="bg-white p-6 md:p-8 shadow-lg border border-gray-100 rounded-4xl">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal}</span>
                </div>

                {/* Discount */}
                <div className="flex justify-between text-red-600">
                  <span>Discount ({discountRate * 100}%)</span>
                  <span className="font-semibold">-${discount}</span>
                </div>

                {/* Delivery Fee */}
                <div className="flex justify-between text-gray-700">
                  <span>Delivery Fee</span>
                  <span className="font-semibold">${deliveryFee}</span>
                </div>
                
                {/* Separator */}
                <div className="border-t border-gray-200 pt-4"></div>

                {/* Total */}
                <div className="flex justify-between text-xl font-extrabold text-gray-900">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>
              
              {/* Promo Code Input */}
              <div className="mt-8 flex max-sm:flex-col space-x-2">
                <input 
                  type="text" 
                  placeholder="Add promo code" 
                  className="flex-grow py-3 px-4 rounded-lg bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-black" 
                />
                <button 
                  className="bg-black text-white font-semibold py-3 px-6 hover:bg-gray-800 transition duration-150 rounded-4xl"
                >
                  Apply
                </button>
              </div>

              {/* Checkout Button */}
              <button 
                className="w-full mt-6 bg-black text-white font-bold py-4 text-lg hover:bg-gray-800 transition duration-150 rounded-4xl"
              >
                Go to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}