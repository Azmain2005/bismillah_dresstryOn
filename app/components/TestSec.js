"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";


async function fetchProducts() {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
}



export default function TestSec() {

    const [data, setData] = useState([]);
    const [index, setIndex] = useState(0);


    const { data: products = [], isLoading, error } = useQuery({
        queryKey: ["all-products"],
        queryFn: fetchProducts,
    });

    // If error
    if (error) {
        return <p className="p-4 text-red-500">Error loading products</p>;
    }

    const prevCard = () => {
        setIndex(index - 1);
        if (index == 0) {
            setIndex(0);
        }
    }

    const nextCard = () => {
        setIndex(index + 1);
        if (products.length - 6 <= index) {
            setIndex(products.length - 6);
        }
    }


    useEffect(() => {
        if (products.length === 0) return;
        const interval = setInterval(() => {
            setIndex(prevIndex => {
                if (prevIndex >= products.length - 6) return 0;
                return prevIndex + 1;
            });
        }, 3000); 

        return () => clearInterval(interval); // cleanup on unmount
    }, [products]); // rerun only when products change




    return (
        <>
            <div className="container rounded-lg overflow-x-hidden ">
                <p className="text-lg sm:text-xl font-bold border-b-2 p-2">Test Section</p>
                <div className="flex justify-between">
                    {/* <p className="bg-red-600 w-[40px] m-5 items-center justify-center" onClick={prevCard}>prev</p> */}
                    {/* <p className="bg-green-600 w-[40px] m-5" onClick={nextCard}>Next</p> */}
                </div>
                <div key={index} className="flex w-[70px] justify-between gap-8 animate-out slide-out-to-left-[200px] duration-3000">
                    {products.slice(index).map((product, index) => (
                        <Card
                            key={product.id}
                            image={product.image}
                            title={product.title}
                            reviews={product.rating.count}
                            rating={Math.round(product.rating.rate)}
                            price={product.price}
                        />
                    )
                    )}

                </div>

            </div>
        </>
    )
}
