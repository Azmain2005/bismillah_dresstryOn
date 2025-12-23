"use client";
import { useState } from "react";
import Link from "next/link";
import { FiX } from "react-icons/fi";

export default function PromoBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w-full bg-black text-white text-sm px-4 py-[19px]">
      <div className="container mx-auto flex items-center justify-center relative">
        {/* Centered Text */}
        <p className="text-center w-full text-[14px]">
          Sign up and get 20% off to your first order.{" "}
          <Link href="/signup" className="underline font-medium">
            Sign Up Now
          </Link>
        </p>

        {/* Close Button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          <FiX className="text-lg" />
        </button>
      </div>
    </div>
  );
}
