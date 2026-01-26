import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingWidget from "@/components/BookingWidget";
import { FEATURES, VEHICLE_TYPES } from "@/lib/constants";
import * as LucideIcons from "lucide-react";
import { clsx } from "clsx";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                    {/* Animated Glow Orbs */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-400/20 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[100px]"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Hero Content */}
                        <div className="text-center lg:text-left space-y-8 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-50 text-sm font-medium">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                Top Rated Drop Taxi Service
                            </div>

                            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                                Pay Only For <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-emerald-400">
                                    One Way Drop
                                </span>
                            </h1>

                            <p className="text-lg lg:text-xl text-teal-100/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                Premium outstation taxi service across South India.
                                Why pay for return charges when you travel only one way?
                                Save up to 40% on your travel.
                            </p>

                            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-white/80 text-sm font-medium">
                                {["Chennai", "Bangalore", "Coimbatore", "Madurai"].map(city => (
                                    <span key={city} className="bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                                        {city}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Booking Widget Container */}
                        <div className="relative z-10 w-full">
                            <BookingWidget />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose OneWayTaxi.ai?</h2>
                        <p className="text-lg text-gray-600">Experience the difference with our premium service standards</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {FEATURES.map((feature, idx) => {
                            // Dynamically access Lucide icons
                            // @ts-ignore
                            const Icon = LucideIcons[feature.icon] || LucideIcons.Check;

                            return (
                                <div key={idx} className="group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100">
                                    <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-600 transition-colors duration-300">
                                        <Icon className="h-7 w-7 text-teal-700 group-hover:text-white transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Fleet Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Premium Fleet</h2>
                        <p className="text-lg text-gray-600">Clean, well-maintained vehicles for every travel need</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {VEHICLE_TYPES.map((vehicle) => {
                            // @ts-ignore
                            const Icon = LucideIcons[vehicle.icon] || LucideIcons.Car;

                            return (
                                <div key={vehicle.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all border border-gray-100">
                                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-48 flex items-center justify-center">
                                        <Icon className="h-24 w-24 text-gray-400" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{vehicle.name}</h3>
                                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                                            <div className="flex items-center gap-1">
                                                <LucideIcons.Users className="h-4 w-4" />
                                                <span>{vehicle.seat} Seats</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <LucideIcons.Snowflake className="h-4 w-4" />
                                                <span>AC</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Starts From</span>
                                                <div className="text-2xl font-bold text-teal-700">₹{vehicle.price}<span className="text-sm font-normal text-gray-500">/km</span></div>
                                            </div>
                                            <button className="bg-teal-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-800 transition-colors">
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
