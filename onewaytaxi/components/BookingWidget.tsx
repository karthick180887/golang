"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import { clsx } from "clsx";
import { POPULAR_CITIES } from "@/lib/constants";

export default function BookingWidget() {
    const [tripType, setTripType] = useState<"oneway" | "round">("oneway");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // Simulate API call
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-lg mx-auto bg-white/90 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-6 md:p-8"
        >
            <div className="flex bg-gray-100/50 p-1 rounded-xl mb-6">
                <button
                    onClick={() => setTripType("oneway")}
                    className={clsx(
                        "flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                        tripType === "oneway" ? "bg-teal-900 text-white shadow-md" : "text-gray-600 hover:text-teal-900"
                    )}
                >
                    One Way Drop
                </button>
                <button
                    onClick={() => setTripType("round")}
                    className={clsx(
                        "flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                        tripType === "round" ? "bg-teal-900 text-white shadow-md" : "text-gray-600 hover:text-teal-900"
                    )}
                >
                    Round Trip
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                    <div className="relative group">
                        <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-teal-700 group-focus-within:text-teal-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Pickup City (e.g., Chennai)"
                            list="cities"
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-gray-800 font-medium"
                            required
                        />
                    </div>

                    <div className="relative group">
                        <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-teal-700 group-focus-within:text-teal-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Drop City (e.g., Bangalore)"
                            list="cities"
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-gray-800 font-medium"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative group">
                            <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-teal-700" />
                            <input
                                type="date"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-gray-800 font-medium"
                                required
                            />
                        </div>
                        <div className="relative group">
                            <Clock className="absolute left-3 top-3.5 h-5 w-5 text-teal-700" />
                            <input
                                type="time"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-gray-800 font-medium"
                                required
                            />
                        </div>
                    </div>

                    <div className="relative group">
                        <Phone className="absolute left-3 top-3.5 h-5 w-5 text-teal-700" />
                        <input
                            type="tel"
                            placeholder="Enter Mobile Number"
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-gray-800 font-medium"
                            pattern="[0-9]{10}"
                            title="10 digit mobile number"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={submitted}
                    className="w-full bg-gradient-to-r from-teal-800 to-teal-600 hover:from-teal-900 hover:to-teal-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group transform active:scale-[0.98]"
                >
                    {submitted ? (
                        <>
                            <CheckCircle2 className="h-5 w-5 animate-bounce" />
                            Request Sent!
                        </>
                    ) : (
                        <>
                            Get Fare Estimate
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>

                <p className="text-center text-xs text-gray-500 mt-4">
                    By booking, you agree to our Terms & Conditions.
                </p>
            </form>

            <datalist id="cities">
                {POPULAR_CITIES.map((city) => (
                    <option key={city} value={city} />
                ))}
            </datalist>
        </motion.div>
    );
}
