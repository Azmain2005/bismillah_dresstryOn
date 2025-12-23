"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Assuming these components are correctly imported and working
import PromoBanner from '../components/topBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Icons from lucide-react (Requires: npm install lucide-react)
import { 
    User, ShoppingCart, History, Package, MapPin, Mail, Phone, 
    Calendar, LogIn, X, LogOut, PackageCheck 
} from 'lucide-react';

// --- Placeholder Data (Simulated) ---
const userData = {
  name: "Victoria Chen",
  email: "victoria.chen@example.com",
  phone: "+1 (555) 987-6543",
  address: "456 Fashion Blvd, Apt 101, Metropolis, USA",
  joinDate: "June 10, 2024",
  profilePicture: "https://i.pravatar.cc/300?img=47" // Placeholder image
};

const ordersData = [
  { id: '#00105', date: '2025-09-30', status: 'Processing', total: 89.50, items: 1, deliveryDate: 'N/A' },
  { id: '#00104', date: '2025-09-28', status: 'Shipped', total: 249.99, items: 2, deliveryDate: 'Oct 5, 2025' },
  { id: '#00103', date: '2025-09-25', status: 'Delivered', total: 120.00, items: 1, deliveryDate: 'Sep 27, 2025' },
  { id: '#00102', date: '2025-09-20', status: 'Delivered', total: 55.99, items: 3, deliveryDate: 'Sep 23, 2025' },
  { id: '#00101', date: '2025-09-15', status: 'Cancelled', total: 19.99, items: 1, deliveryDate: 'N/A' },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08 // Stagger items quickly
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 150, damping: 20 } }
};

// --- Helper Components for Status Badges ---
const StatusBadge = ({ status }) => {
  let colorClasses;
  switch (status) {
    case 'Delivered': colorClasses = 'bg-green-100 text-green-800 border-green-300'; break;
    case 'Shipped': colorClasses = 'bg-indigo-100 text-indigo-800 border-indigo-300'; break;
    case 'Processing': colorClasses = 'bg-yellow-100 text-yellow-800 border-yellow-300'; break;
    case 'Cancelled': colorClasses = 'bg-red-100 text-red-800 border-red-300'; break;
    default: colorClasses = 'bg-gray-100 text-gray-800 border-gray-300';
  }
  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border ${colorClasses}`}>
      {status}
    </span>
  );
};

// --- Profile Section Components ---

const UserDetailsSection = () => (
  <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
    <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-800 border-b-2 border-indigo-100 pb-3">
      Account Overview
    </motion.h2>

    {/* Profile Card */}
    <motion.div variants={itemVariants} className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl transition hover:shadow-2xl border border-gray-100">
      <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-10">
        <motion.img
          src={userData.profilePicture}
          alt="User Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        />
        <div className="text-center sm:text-left">
          <h3 className="text-3xl font-extrabold text-gray-900">{userData.name}</h3>
          <p className="text-lg text-indigo-600 font-medium">Valued Customer</p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 text-gray-700">
        <motion.div variants={itemVariants} className="flex items-start space-x-4">
          <Mail className="w-5 h-5 text-indigo-500 mt-1 flex-shrink-0" />
          <div>
            <p className="font-semibold text-gray-900">Email Address</p>
            <p>{userData.email}</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-start space-x-4">
          <Phone className="w-5 h-5 text-indigo-500 mt-1 flex-shrink-0" />
          <div>
            <p className="font-semibold text-gray-900">Phone</p>
            <p>{userData.phone}</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-start space-x-4 md:col-span-2">
          <MapPin className="w-5 h-5 text-indigo-500 mt-1 flex-shrink-0" />
          <div>
            <p className="font-semibold text-gray-900">Shipping Address</p>
            <p>{userData.address}</p>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex items-start space-x-4">
          <Calendar className="w-5 h-5 text-indigo-500 mt-1 flex-shrink-0" />
          <div>
            <p className="font-semibold text-gray-900">Member Since</p>
            <p>{userData.joinDate}</p>
          </div>
        </motion.div>
      </div>

      <motion.button 
        variants={itemVariants} 
        className="mt-8 px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.01]"
      >
        Update Details
      </motion.button>
    </motion.div>
  </motion.div>
);

const OrdersSection = () => {
  const currentOrders = ordersData.filter(o => o.status === 'Processing' || o.status === 'Shipped');

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-800 border-b-2 border-indigo-100 pb-3">
        Current Orders ({currentOrders.length})
      </motion.h2>

      <div className="space-y-5">
        {currentOrders.length > 0 ? (
          currentOrders.map((order, index) => (
            <motion.div
              key={order.id}
              variants={itemVariants}
              className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center border-l-4 border-yellow-500"
            >
              <div className="flex-1 space-y-1">
                <p className="text-xl font-bold text-gray-800 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-indigo-500" />
                  Order {order.id}
                </p>
                <p className="text-sm text-gray-500">Placed: {order.date} | {order.items} Items</p>
              </div>
              
              <div className="mt-3 sm:mt-0 text-left sm:text-right space-y-1">
                <StatusBadge status={order.status} />
                <p className="text-2xl font-extrabold text-indigo-600">${order.total.toFixed(2)}</p>
                {order.status === 'Shipped' && (
                  <p className="text-xs text-gray-600 font-medium">Est. Delivery: {order.deliveryDate}</p>
                )}
                <button className="mt-2 text-sm text-indigo-500 hover:text-indigo-700 font-medium transition">
                    Track Order &rarr;
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div variants={itemVariants} className="bg-white p-10 rounded-xl shadow-lg text-center text-gray-500">
            <ShoppingCart className="w-10 h-10 mx-auto mb-4 text-gray-400" />
            <p className="text-lg">You currently have no active orders.</p>
            <button className="mt-4 text-indigo-600 font-semibold hover:text-indigo-800 transition">
                Start Shopping
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const OrderHistorySection = () => {
  const historyOrders = ordersData.filter(o => o.status === 'Delivered' || o.status === 'Cancelled');
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-800 border-b-2 border-indigo-100 pb-3">
        Order History
      </motion.h2>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <motion.thead variants={itemVariants} className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Total</th>
              <th className="px-6 py-4"></th>
            </tr>
          </motion.thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {historyOrders.map((order, index) => (
              <motion.tr
                key={order.id}
                variants={itemVariants}
                className="hover:bg-indigo-50 transition duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-gray-900 text-right">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900 transition">View Details</a>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};


// --- IMPORTANT: Login Modal Component ---
const LoginModal = ({ setIsAuthenticated }) => {
    const [isLogin, setIsLogin] = useState(true);

    // Simulated Login/Signup success
    const handleAuthSuccess = () => {
        // --- REAL WORLD: Call Google Auth / Backend here ---
        localStorage.setItem('userToken', 'simulated_jwt_token_12345');
        setIsAuthenticated(true);
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-center items-center p-4 backdrop-blur-sm"
        >
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full relative"
            >
                {/* Close button - only for demo/testing */}
                <button 
                    onClick={() => setIsAuthenticated(true)} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                >
                    <X className="w-6 h-6" />
                </button>
                
                <h3 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                    {isLogin ? 'Welcome Back!' : 'Start Your Journey'}
                </h3>
                <p className='text-center text-gray-500 mb-6'>{isLogin ? 'Sign in to access your account.' : 'Create your free account today.'}</p>

                {/* Google Sign-In Option */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAuthSuccess} // Simulate Google success
                    className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-300 rounded-xl text-lg font-medium text-gray-700 hover:bg-gray-50 transition duration-200 shadow-md"
                >
                    {/* Google Icon SVG */}
                    <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M44.5 20H24V28H36.4C35.8 32.7 33 36.6 28.5 39.1L28.3 39.3L34.3 43.8C40.6 38.6 44.5 30.6 44.5 20Z" fill="#4285F4"/><path d="M24 44C30.6 44 36 41.7 40.1 37.9L34.3 33.4C31.5 35.5 27.9 36.8 24 36.8C18.4 36.8 13.6 33.2 11.9 28.2L11.7 27.5L5.5 32.3C7.9 38.3 15.3 44 24 44Z" fill="#34A853"/><path d="M11.9 28.2C11.5 27 11.2 25.5 11.2 24C11.2 22.5 11.5 21 11.9 19.8L11.7 19.1L5.5 14.2C4.1 17.5 3.3 20.7 3.3 24C3.3 27.3 4.1 30.5 5.5 33.8L11.9 28.2Z" fill="#FBBC04"/><path d="M24 11.2C27.3 11.2 30.4 12.3 33 14.8L38.4 9.4C34.9 6.2 29.8 4 24 4C15.3 4 7.9 9.7 5.5 15.7L11.7 20.9C13.6 15.8 18.4 11.2 24 11.2Z" fill="#EA4335"/>
                    </svg>
                    <span>Sign {isLogin ? 'in' : 'up'} with Google</span>
                </motion.button>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-500">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Email/Password Form */}
                <form className="space-y-4">
                    <div>
                        <input type="email" placeholder="Email Address" required 
                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"/>
                    </div>
                    <div>
                        <input type="password" placeholder="Password" required 
                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"/>
                    </div>
                    {!isLogin && (
                        <div>
                            <input type="password" placeholder="Confirm Password" required 
                                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"/>
                        </div>
                    )}
                    <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit"
                        onClick={(e) => { e.preventDefault(); handleAuthSuccess(); }}
                        className="w-full flex items-center justify-center space-x-2 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition"
                    >
                        <LogIn className="w-5 h-5" />
                        <span>{isLogin ? 'Login' : 'Sign Up'}</span>
                    </motion.button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button 
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium ml-1 transition"
                    >
                        {isLogin ? 'Sign Up' : 'Log In'}
                    </button>
                </p>
            </motion.div>
        </motion.div>
    );
};


// --- Main Page Component ---
export default function AccountPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  // 1. Check for stored credentials on load
  useEffect(() => {
    // In a real app, you would validate this token with your backend.
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsAuthenticated(true);
    } 
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setIsAuthenticated(false);
    setActiveTab('profile'); // Reset tab
  }

  const navigation = [
    { name: 'My Profile', href: 'profile', icon: User, current: activeTab === 'profile' },
    { name: 'Current Orders', href: 'orders', icon: Package, current: activeTab === 'orders' },
    { name: 'Order History', href: 'history', icon: History, current: activeTab === 'history' },
  ];

  const renderContent = () => {
    // Note: These components must be defined earlier in the file to avoid "is not defined" errors.
    switch (activeTab) {
      case 'profile': return <UserDetailsSection />;
      case 'orders': return <OrdersSection />;
      case 'history': return <OrderHistorySection />;
      default: return <UserDetailsSection />;
    }
  };

  // --- Main Render Logic ---
  return (
    <>
    <PromoBanner />
      <Navbar />
    <div className="min-h-screen flex flex-col bg-gray-50 font-inter">
      

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight border-b border-gray-200 pb-4">
          {isAuthenticated ? `👋 Welcome back, ${userData.name.split(' ')[0]}!` : 'Your Account'}
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Conditional Sidebar */}
          {isAuthenticated ? (
            <motion.nav 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full lg:w-64 flex-shrink-0 bg-white p-4 rounded-2xl shadow-xl h-fit border border-gray-100"
            >
              <div className="space-y-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href="#"
                    onClick={(e) => { e.preventDefault(); setActiveTab(item.href); }}
                    className={`
                      flex items-center px-4 py-3 rounded-xl text-lg font-semibold transition duration-200
                      ${item.current ? 'bg-indigo-600 text-white shadow-lg transform translate-x-0.5' : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'}
                    `}
                  >
                    <item.icon className="h-6 w-6 mr-4" aria-hidden="true" />
                    {item.name}
                  </a>
                ))}
                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 rounded-xl text-lg font-semibold text-red-600 hover:bg-red-50 transition duration-200 mt-4"
                >
                    <LogOut className="h-6 w-6 mr-4" aria-hidden="true" />
                    Sign Out
                </button>
              </div>
            </motion.nav>
          ) : (
            <div className='w-full p-10 bg-white rounded-2xl shadow-xl text-center flex flex-col items-center justify-center space-y-4'>
                <PackageCheck className='w-12 h-12 text-indigo-400'/>
                <p className='text-xl font-semibold text-gray-700'>Log in to view your orders and profile details.</p>
                <button 
                    onClick={() => setIsAuthenticated(false)} // This forces the modal open if it's somehow closed
                    className='px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition'
                >
                    Access Account
                </button>
            </div>
          )}

          {/* Conditional Content Area */}
          {isAuthenticated && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="flex-1 w-full"
            >
              {renderContent()}
            </motion.div>
          )}
        </div>
      </main>

      {/* Conditional Modal */}
      <AnimatePresence>
        {!isAuthenticated && <LoginModal setIsAuthenticated={setIsAuthenticated} />}
      </AnimatePresence>

      <Footer />
    </div>
    </>
  );
}