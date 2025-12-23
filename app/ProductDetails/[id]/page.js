"use client";
import Navbar from '@/app/components/Navbar';
import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { ImageZoom } from '@/components/ui/shadcn-io/image-zoom';
import Image from 'next/image';
import FeaturedProduct from '@/app/components/TopSellings';
import Footer from '@/app/components/Footer';
import PromoBanner from '@/app/components/topBar';
import { Star } from "lucide-react";
import TestimonialCard from "../../components/TestiominalCard";
import { motion, AnimatePresence } from "framer-motion";



export default function Page({ params }) {
    const id = params.id;
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("Large");
    const [color, setColor] = useState("olive");
    const [activeTab, setActiveTab] = useState("Product Details");
    const [visibleCount, setVisibleCount] = useState(6);



    async function fetchProduct() {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
    }
    async function fetchTestimonials() {
        const res = await fetch("https://testimonialapi.vercel.app/api");
        if (!res.ok) throw new Error("Failed to fetch testimonials");
        return res.json();
    }


    const { data: product, isLoading, error } = useQuery({
        queryKey: ["product", id],
        queryFn: fetchProduct,
    });

    const { data: testimonials, isLoading: tLoading, error: tError } = useQuery({
        queryKey: ["testimonials"],
        queryFn: fetchTestimonials,
    });





    if (isLoading) {
        return (
            <div className="container flex justify-center items-center p-10">
                <div className="w-12 h-12 border-4 border-purple-500 border-dashed rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return <p className="p-4 text-red-500">Error loading product</p>;
    }

    const rating = Math.round(product.rating.rate);

    return (
        <>
            <PromoBanner />
            <Navbar />

            <div className="container mx-auto p-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                    {/* Left Side - Product Images */}
                    <div className="md:col-span-5 flex flex-col-reverse md:flex-row gap-4">
                        {/* Thumbnails */}
                        <div className="flex flex-row md:flex-col gap-3 justify-center md:justify-start">
                            {[...Array(3)].map((_, idx) => (
                                <Image
                                    key={idx}
                                    src={product.image}
                                    alt="thumbnail"
                                    width={80}
                                    height={80}
                                    className="rounded-lg border cursor-pointer p-2"
                                />
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="flex-1 flex justify-center">
                            <ImageZoom zoomMargin={10}>
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    width={300}
                                    height={300}
                                    className="rounded-xl object-contain"
                                />
                            </ImageZoom>
                        </div>
                    </div>


                    {/* Right Side */}
                    <div className="md:col-span-7 flex flex-col gap-6">
                        <h1 className="text-2xl font-bold">{product.title}</h1>

                        <div className="flex items-center gap-2 text-yellow-500 text-lg">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={16}
                                    className={`${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                                />
                            ))}
                            <span className="ml-2 text-sm text-gray-500">{rating}/5</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <p className="text-3xl font-bold text-gray-900">${(product.price * 0.87).toFixed(0)}</p>
                            <p className="text-gray-500 line-through">${product.price}</p>
                            <span className="text-red-500 font-medium">-40%</span>
                        </div>

                        <p className="text-gray-700 leading-relaxed">{product.description}</p>

                        {/* Colors */}
                        <div>
                            <p className="font-medium mb-2">Select Colors</p>
                            <div className="flex gap-3">
                                {["olive", "green", "navy"].map((c) => (
                                    <button
                                        key={c}
                                        onClick={() => setColor(c)}
                                        className={`w-7 h-7 rounded-full border-2 ${color === c ? "border-black" : "border-gray-300"}`}
                                        style={{ backgroundColor: c }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Sizes */}
                        <div>
                            <p className="font-medium mb-2">Choose Size</p>
                            <div className="flex gap-3">
                                {["Small", "Medium", "Large", "X-Large"].map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setSize(s)}
                                        className={`px-4 py-2 rounded-4xl ${size === s ? "bg-black text-white" : "bg-gray-100"}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity + Add to Cart */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center bg-gray-100 rounded-3xl">
                                <button
                                    className="px-3 py-2"
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                >
                                    -
                                </button>
                                <span className="px-4">{quantity}</span>
                                <button
                                    className="px-3 py-2"
                                    onClick={() => setQuantity((q) => q + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <button className="flex-1 bg-black text-white px-4 py-3 rounded-4xl hover:bg-gray-800">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                {/* ✅ Tabs with React State */}
                <div className="mt-12 border-t border-gray-200">
                    <div className="w-full max-w-[1200px] mx-auto">
                        <ul className="flex bg-white">
                            {["Product Details", "Rating & Reviews", "FAQs"].map((tab) => (
                                <li
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`tab flex-1 text-center text-slate-900 py-2.5 px-5 cursor-pointer 
            transition-all duration-300 ease-in-out transform
            ${activeTab === tab
                                            ? "bg-gray-200 font-semibold rounded-md scale-105 shadow"
                                            : "font-medium hover:scale-105 hover:bg-gray-100"}`
                                    }
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </li>
                            ))}

                        </ul>

                        {/* Tab Contents */}
                        <div className="px-1 py-12">
                            {activeTab === "Product Details" && (
                                <div>
                                    <p className="text-sm text-slate-900 mt-4 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>
                            )}
                            {activeTab === "Rating & Reviews" && (
                                <>
                                    {tLoading && <p>Loading testimonials...</p>}
                                    {tError && <p className="text-red-500">Error loading testimonials</p>}

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                                        <AnimatePresence>
                                            {testimonials?.slice(0, visibleCount).map((item) => (
                                                <motion.div
                                                    key={item.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -20 }}
                                                    transition={{ duration: 0.4 }}
                                                >
                                                    <TestimonialCard
                                                        name={item.name}
                                                        message={item.message}
                                                        rating={item.rating}
                                                    />
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>

                                    {visibleCount < testimonials?.length && (
                                        <div className="flex justify-center mt-6">
                                            <button
                                                onClick={() => setVisibleCount((prev) => prev + 6)}
                                                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                                            >
                                                Load More
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}


                            {activeTab === "FAQs" && (
                                <div>
                                    <h3 className="text-base font-semibold text-slate-900">Frequently Asked Questions (FAQ)</h3>
                                    <p className="text-sm text-slate-900 mt-4 leading-relaxed">

                                        <br />
                                        Q1: What is the product made of?<br />
                                        A: Our product is crafted using high-quality, durable materials designed for long-lasting use.<br /><br />

                                        Q2: How do I use the product?<br />
                                        A: Simply follow the instructions included in the package. For best results, use it as directed.<br /><br />

                                        Q3: Is there a warranty?<br />
                                        A: Yes! This product comes with a 12-month limited warranty covering manufacturing defects.<br /><br />

                                        Q4: Can I return the product if I’m not satisfied?<br />
                                        A: Absolutely. We offer a 30-day return policy for unused and unopened items.<br /><br />

                                        Q5: How long does shipping take?<br />
                                        A: Standard shipping usually takes 5–7 business days. Expedited options are also available at checkout.<br /><br />

                                        Q6: Is this product safe to use?<br />
                                        A: Yes. Our product meets all safety standards and has been thoroughly tested.<br /><br />

                                        Q7: Can I get a replacement if my product arrives damaged?<br />
                                        A: Yes, we’ll replace any damaged items at no extra cost. Please contact our support team immediately.<br /><br />

                                        Q8: Are there any special care instructions?<br />
                                        A: Keep the product away from extreme heat and moisture. Wipe clean with a soft, dry cloth.<br /><br />
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <FeaturedProduct />
            <Footer />
        </>
    );
}
