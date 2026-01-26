import Link from "next/link";
import { Car, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { APP_NAME, SUPPORT_PHONE } from "@/lib/constants";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-teal-500 p-2 rounded-lg">
                                <Car className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white">{APP_NAME}</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Premium one-way drop taxi service across South India.
                            We make outstation travel affordable, safe, and comfortable.
                        </p>
                        <div className="flex gap-4 pt-4">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="bg-gray-800 p-2 rounded-full hover:bg-teal-600 hover:text-white transition-colors">
                                    <Icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            {["Home", "About Us", "Tariff", "Services", "Contact"].map((item) => (
                                <li key={item}>
                                    <Link href={`#${item.toLowerCase()}`} className="hover:text-teal-400 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6">Our Services</h3>
                        <ul className="space-y-3">
                            {["One Way Drop", "Round Trip", "Airport Transfer", "Tour Packages", "Corporate Travel"].map((item) => (
                                <li key={item} className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500"></span>
                                    <span className="hover:text-teal-400 transition-colors cursor-default">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-teal-500 mt-1 shrink-0" />
                                <span>123, Anna Nagar, Chennai - 600040, Tamil Nadu</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-teal-500 shrink-0" />
                                <a href={`tel:${SUPPORT_PHONE.replace(/\s/g, "")}`} className="hover:text-teal-400 transition-colors">
                                    {SUPPORT_PHONE}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-teal-500 shrink-0" />
                                <a href="mailto:booking@onewaytaxi.ai" className="hover:text-teal-400 transition-colors">
                                    booking@onewaytaxi.ai
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
