"use client";

import React from "react";
import Image from "next/image";
import logo from "../../public/header-logo.svg";
import Link from "next/link";


export default function Footer() {
  return (
    <div className="">

    {/* Newsletter Section */}
      <section className="bg-black text-white px-6 max-sm:mx-4  md:mx-20 rounded-4xl py-12 relative top-20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-4xl font-extrabold text-center md:text-left leading-snug">
            STAY UPTO DATE ABOUT <br className="hidden sm:block" /> OUR LATEST OFFERS
          </p>
          <div className=" flex flex-col sm:flex-col items-center gap-4 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-4 py-3 rounded-full w-full sm:w-72 bg-white text-black outline-none"
            />
            <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition w-full">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </section>


    <footer className="tracking-wide bg-[#F0F0F0] px-8 sm:px-12 pt-30 pb-6">
      <div className="grid min-[1200px]:grid-cols-3 gap-12 xl:gap-16">
        <div className="min-[1200px]:max-w-sm max-w-lg w-full">
          <Link
            href="/"
            className="lg:text-[52px] max-sm:text-[30px] font-extrabold tracking-tight mx-auto md:mx-0"
          >
            SHOP.CO
          </Link>
          <div className="mt-6">
            <p className="text-slate-600 leading-relaxed text-sm">We have clothes that suits your style and which you’re proud to wear. From women to men.</p>
          </div>
          <ul className="mt-6 flex space-x-5">
            <li>
              <Link href='/'>
                <svg xmlns="http://www.w3.org/2000/svg" className="fill-blue-600 w-8 h-8" viewBox="0 0 49.652 49.652">
                  <path d="M24.826 0C11.137 0 0 11.137 0 24.826c0 13.688 11.137 24.826 24.826 24.826 13.688 0 24.826-11.138 24.826-24.826C49.652 11.137 38.516 0 24.826 0zM31 25.7h-4.039v14.396h-5.985V25.7h-2.845v-5.088h2.845v-3.291c0-2.357 1.12-6.04 6.04-6.04l4.435.017v4.939h-3.219c-.524 0-1.269.262-1.269 1.386v2.99h4.56z" data-original="#000000" />
                </svg>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 112.196 112.196">
                  <circle cx="56.098" cy="56.097" r="56.098" fill="#007ab9" data-original="#007ab9" />
                  <path fill="#fff" d="M89.616 60.611v23.128H76.207V62.161c0-5.418-1.936-9.118-6.791-9.118-3.705 0-5.906 2.491-6.878 4.903-.353.862-.444 2.059-.444 3.268v22.524h-13.41s.18-36.546 0-40.329h13.411v5.715c-.027.045-.065.089-.089.132h.089v-.132c1.782-2.742 4.96-6.662 12.085-6.662 8.822 0 15.436 5.764 15.436 18.149zm-54.96-36.642c-4.587 0-7.588 3.011-7.588 6.967 0 3.872 2.914 6.97 7.412 6.97h.087c4.677 0 7.585-3.098 7.585-6.97-.089-3.956-2.908-6.967-7.496-6.967zm-6.791 59.77H41.27v-40.33H27.865v40.33z" data-original="#f1f2f2" />
                </svg>
              </Link>
            </li>
            <li>
              <Link href=''>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 152 152">
                  <linearGradient id="a" x1="22.26" x2="129.74" y1="22.26" y2="129.74" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#fae100" />
                    <stop offset=".15" stopColor="#fcb720" />
                    <stop offset=".3" stopColor="#ff7950" />
                    <stop offset=".5" stopColor="#ff1c74" />
                    <stop offset="1" stopColor="#6c1cd1" />
                  </linearGradient>
                  <g data-name="Layer 2">
                    <g data-name="03.Instagram">
                      <rect width="152" height="152" fill="url(#a)" data-original="url(#a)" rx="76" />
                      <g fill="#fff">
                        <path fill="#ffffff10" d="M133.2 26c-11.08 20.34-26.75 41.32-46.33 60.9S46.31 122.12 26 133.2q-1.91-1.66-3.71-3.46A76 76 0 1 1 129.74 22.26q1.8 1.8 3.46 3.74z" data-original="#ffffff10" />
                        <path d="M94 36H58a22 22 0 0 0-22 22v36a22 22 0 0 0 22 22h36a22 22 0 0 0 22-22V58a22 22 0 0 0-22-22zm15 54.84A18.16 18.16 0 0 1 90.84 109H61.16A18.16 18.16 0 0 1 43 90.84V61.16A18.16 18.16 0 0 1 61.16 43h29.68A18.16 18.16 0 0 1 109 61.16z" data-original="#ffffff" />
                        <path d="m90.59 61.56-.19-.19-.16-.16A20.16 20.16 0 0 0 76 55.33 20.52 20.52 0 0 0 55.62 76a20.75 20.75 0 0 0 6 14.61 20.19 20.19 0 0 0 14.42 6 20.73 20.73 0 0 0 14.55-35.05zM76 89.56A13.56 13.56 0 1 1 89.37 76 13.46 13.46 0 0 1 76 89.56zm26.43-35.18a4.88 4.88 0 0 1-4.85 4.92 4.81 4.81 0 0 1-3.42-1.43 4.93 4.93 0 0 1 3.43-8.39 4.82 4.82 0 0 1 3.09 1.12l.1.1a3.05 3.05 0 0 1 .44.44l.11.12a4.92 4.92 0 0 1 1.1 3.12z" data-original="#ffffff" />
                      </g>
                    </g>
                  </g>
                </svg>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 1227 1227">
                  <path d="M613.5 0C274.685 0 0 274.685 0 613.5S274.685 1227 613.5 1227 1227 952.315 1227 613.5 952.315 0 613.5 0z" data-original="#000000" />
                  <path fill="#fff" d="m680.617 557.98 262.632-305.288h-62.235L652.97 517.77 470.833 252.692H260.759l275.427 400.844-275.427 320.142h62.239l240.82-279.931 192.35 279.931h210.074L680.601 557.98zM345.423 299.545h95.595l440.024 629.411h-95.595z" data-original="#ffffff" />
                </svg>
              </Link>
            </li>
          </ul>
        </div>

        <div className="min-[1200px]:col-span-2 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="max-lg:min-w-[140px]">
            <h4 className="text-slate-900 font-semibold text-base relative">COMPANY</h4>

            <ul className="mt-6 space-y-4">
              <li>
                <Link href='/' className="hover:text-slate-900 text-slate-600 text-sm font-normal">About</Link>
              </li>
              <li>
                <Link href='/' className="hover:text-slate-900 text-slate-600 text-sm font-normal">Features</Link>
              </li>
              <li>
                <Link href='/' className="hover:text-slate-900 text-slate-600 text-sm font-normal">Works</Link>
              </li>
              <li>
                <Link href='/' className="hover:text-slate-900 text-slate-600 text-sm font-normal">Career</Link>
              </li>

            </ul>
          </div>

          <div className="max-lg:min-w-[140px]">
            <h4 className="text-slate-900 font-semibold text-base relative">HELP</h4>
            <ul className="space-y-4 mt-6">
              <li>
                <Link href='/' className="hover:text-slate-900 text-slate-600 text-sm font-normal">Customer Support</Link>
              </li>
              <li>
                <Link href='/' className="hover:text-slate-900 text-slate-600 text-sm font-normal">Delivery Details</Link>
              </li>
              <li>
                <Link href='/' className="hover:text-slate-900 text-slate-600 text-sm font-normal">Terms & Conditions</Link>
              </li>
              <li>
                <Link href='/' className="hover:text-slate-900 text-slate-600 text-sm font-normal">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          <div className="max-lg:min-w-[140px]">
            <h4 className="text-slate-900 font-semibold text-base relative">FAQ</h4>

            <ul className="space-y-4 mt-6">
              <li>
                <Link href='/' className="hover:text-slate-900 text-slate-600 text-sm font-normal">Account</Link>
              </li>
              <li>
                <Link href='/' className="hover:text-slate-900 text-slate-600 text-sm font-normal">Manage Deliveries</Link>
              </li>
              <li>
                <Link href='/' className="hover:text-slate-900 text-slate-600 text-sm font-normal">Orders</Link>
              </li>
              <li>
                <Link href='/' className="hover:text-slate-900 text-slate-600 text-sm font-normal">Payments</Link>
              </li>
            </ul>
          </div>

          <div className="max-lg:min-w-[140px]">
            <h4 className="text-slate-900 font-semibold text-base relative">RESOURCES</h4>

            <ul className="space-y-4 mt-6">
              <li>
                <Link href='/' className="hover:text-slate-900 text-slate-600 text-sm font-normal">Free eBooks</Link>
              </li>
              <li>
                <Link href='/' className="hover:text-slate-900 text-slate-600 text-sm font-normal">Development Tutorial</Link>
              </li>
              <li>
                <Link href='/' className="hover:text-slate-900 text-slate-600 text-sm font-normal">How to - Blog</Link>
              </li>
              <li>
                <Link href='/' className="hover:text-slate-900 text-slate-600 text-sm font-normal">Youtube Playlist</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="mt-10 mb-6 border-gray-300" />

      <div className="flex flex-wrap max-md:flex-col gap-4">
        <div>
          Shop.co © 2000-2023, All Rights Reserved
        </div>

        <p className="text-slate-600 text-sm md:ml-auto">Shop.co © 2000-2023, All Rights Reserved</p>
      </div>
    </footer>
    </div>
  );
}
