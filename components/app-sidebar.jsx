"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Slider } from "@/components/ui/slider"
import { RefreshCw } from "lucide-react"


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "T-shirts",
    url: "#",
  },
  {
    title: "Shorts",
    url: "#",

  },
  {
    title: "Shirts",
    url: "#",
  },
  {
    title: "Hoodie",
    url: "#",
  },
  {
    title: "Jeans",
    url: "#",
  },
]

export function AppSidebar({ onFilter, storedProducts = [] }) {
  const [priceRange, setPriceRange] = useState([0, 80]);

  // ✅ Add this useEffect here
  useEffect(() => {
    if (storedProducts.length) {
      const maxPrice = Math.ceil(Math.max(...storedProducts.map(p => p.price)));
      setPriceRange([0, maxPrice]); // set slider range from 0 to max product price
    }
  }, [storedProducts]);

  // Compute max price dynamically
  const maxProductPrice = storedProducts.length
    ? Math.ceil(Math.max(...storedProducts.map(p => p.price)))
    : 200; // fallback

  // Apply filter
  const handleApplyFilter = () => {
    const originalProducts = JSON.parse(localStorage.getItem("originalProducts") || "[]");
    const [minPrice, maxPrice] = priceRange;

    const filteredProducts = originalProducts.filter(
      product => product.price >= minPrice && product.price <= maxPrice
    );

    localStorage.setItem("products", JSON.stringify(filteredProducts));

    if (onFilter) onFilter(filteredProducts);
  };

  // Reset filter
  const handleResetFilter = () => {
    const originalProducts = JSON.parse(localStorage.getItem("originalProducts") || "[]");
    setPriceRange([0, maxProductPrice]);
    localStorage.setItem("products", JSON.stringify(originalProducts));
    if (onFilter) onFilter(originalProducts);
  };


  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between text-2xl text-black p-5 border-b border-gray-300">
            <div>Filters</div>
            <div>
              <button onClick={handleResetFilter} className=" rounded-4xl">
                <RefreshCw size={15} />
              </button>
            </div>
          </SidebarGroupLabel>

          <SidebarGroupContent className="flex flex-col border-b border-gray-200">
            {items.map((item) => (
              <div key={item.title} className="">
                <Link
                  key={item.title}
                  href={item.url}
                  className="flex justify-between p-2 text-sm  text-gray-700 hover:bg-gray-100 rounded"
                >
                  {item.title}
                  <p>&gt;</p>
                </Link>
              </div>


            ))}
          </SidebarGroupContent>
          <SidebarGroupContent className="flex flex-col border-b border-gray-200 ">
            <p className="text-2xl text-black p-5 border-b border-gray-300">Price Range</p>
            <Slider
              value={priceRange}
              min={0}
              max={maxProductPrice}              // maximum price
              step={1}
              className="mt-2"
              onValueChange={(value) => setPriceRange(value)}
            />

          </SidebarGroupContent>


        </SidebarGroup>
      </SidebarContent>

      <button
        onClick={handleApplyFilter}
        className="bg-black text-white text-[16px] px-2 mx-4 mb-2 p-4 rounded-4xl mt-2 w-7/8"
      >
        Apply Filter
      </button>
    </Sidebar>



  )
}