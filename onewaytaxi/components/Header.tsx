"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Menu, X, Car } from "lucide-react";
import { clsx } from "clsx";
import { APP_NAME, SUPPORT_PHONE } from "@/lib/constants";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-teal-900 p-2 rounded-lg group-hover:bg-teal-800 transition-colors">
                            <Car className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-900 to-teal-600">
                            {APP_NAME}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {["Home", "Tariff", "Services", "Contact"].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-gray-600 hover:text-teal-900 font-medium transition-colors"
                            >
                                {item}
                            </Link>
                        ))}
                        <a
                            href={`tel:${SUPPORT_PHONE.replace(/\s/g, "")}`}
                            className="flex items-center gap-2 bg-teal-900 text-white px-5 py-2.5 rounded-full hover:bg-teal-800 transition-all shadow-md hover:shadow-lg font-medium"
                        >
                            <Phone className="h-4 w-4" />
                            <span>{SUPPORT_PHONE}</span>
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-gray-600 hover:text-teal-900 transition-colors"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div
                className={clsx(
                    "md:hidden absolute top-20 left-0 right-0 bg-white border-b border-gray-100 shadow-lg transition-all duration-300 ease-in-out origin-top",
                    isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
                )}
            >
                <div className="px-4 pt-2 pb-6 space-y-2">
                    {["Home", "Tariff", "Services", "Contact"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="block px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-900 rounded-xl font-medium transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {item}
                        </Link>
                    ))}
                    <a
                        href={`tel:${SUPPORT_PHONE.replace(/\s/g, "")}`}
                        className="flex items-center justify-center gap-2 w-full bg-teal-900 text-white px-4 py-3 rounded-xl mt-4 font-bold active:scale-95 transition-transform"
                    >
                        <Phone className="h-5 w-5" />
                        Call {SUPPORT_PHONE}
                    </a>
                </div>
            </div>
        </header>
    );
}
