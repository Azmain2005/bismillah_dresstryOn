"use client";
import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Card from "../components/Card";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import PromoBanner from "../components/topBar";


// fetch function
async function fetchProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");

  const data = await res.json();
  localStorage.setItem("products", JSON.stringify(data));
  return data;
}

export default function Page() {
  const [index, setIndex] = useState(0);
  const [number, setNumber] = useState(7);
  const [storedProducts, setStoredProducts] = useState([]);

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["all-products"],
    queryFn: fetchProducts,
  });

  // Load from localStorage when component mounts
  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) {
      setStoredProducts(JSON.parse(saved));
      setIndex(JSON.parse(saved).length);
    }
  }, []);

  // Update local state when products from API change
  useEffect(() => {
    if (products.length > 0) {
      // Save the original JSON only once
      if (!localStorage.getItem("originalProducts")) {
        localStorage.setItem("originalProducts", JSON.stringify(products));
      }
      setStoredProducts(products);
      setIndex(products.length);
    }
  }, [products]);

  function increaseProduct() {
    setNumber((prev) => {
      const newNumber = prev + 3;
      return newNumber >= index ? index : newNumber;
    });
  }

  if (isLoading) {
    return (
      <div className="container flex justify-center items-center p-10">
        <div className="w-12 h-12 border-4 border-purple-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <p className="p-4 text-red-500">Error loading products</p>;
  }

  return (
    <div className="">
      <PromoBanner />
      <Navbar />
      <div className="flex flex-col border-t border-gray-300 pt-5">
        <div className="container flex flex-1">
          <SidebarProvider>
            <AppSidebar
              storedProducts={storedProducts} // pass the array of products
              onFilter={(filtered) => {
                setStoredProducts(filtered);
                setIndex(filtered.length);
              }}
            />
            <main className="flex-1 p-4">
              <SidebarTrigger />
              <div>
                <div>
                  <p className="text-2xl border-b border-gray-300">All products</p>
                  <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                    {storedProducts.slice(0, number).map((product) => (
                      <Link key={product.id} href={`/ProductDetails/${product.id}`}>
                        <Card
                          image={product.image}
                          title={product.title}
                          reviews={product.rating.count}
                          rating={Math.round(product.rating.rate)}
                          price={product.price}
                        />
                      </Link>
                    ))}
                  </div>

                  {number < index && (
                    <div className="flex items-center justify-center mt-6">
                      <button
                        onClick={increaseProduct}
                        className="bg-black text-white text-[16px] lg:px-20 lg:ml-10 p-4 rounded-4xl mt-10 max-md:w-full"
                      >
                        Show More
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <Pagination className="mt-20">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </main>
          </SidebarProvider>
        </div>
      </div>
      <Footer />
    </div>
  );
}
