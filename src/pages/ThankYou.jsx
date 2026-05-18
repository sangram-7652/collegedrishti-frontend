import React, { useEffect } from "react";
import Header from "../pages/Header";
import MobileMenu from "../pages/MobileMenu";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
    const navigate = useNavigate();

    // ✅ optional auto redirect (5 sec)
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="w-full min-h-screen bg-gray-50">

            {/* ✅ Header */}
            <div className="hidden md:block">
                <Header />
            </div>

            <div className="block md:hidden">
                <MobileMenu />
            </div>

            {/* ✅ Main Content */}
            <div className="flex items-center justify-center px-4 py-16">
                <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl p-8 text-center relative">

                    {/* 🎉 Success Icon */}
                    <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100">
                        <span className="text-4xl">✅</span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-3">
                        Thank You!
                    </h1>

                    {/* Sub text */}
                    <p className="text-gray-600 mb-6">
                        Your request has been submitted successfully. <br />
                        Our expert counsellor will contact you shortly.
                    </p>

                    {/* Divider */}
                    <div className="h-[1px] bg-gray-200 mb-6" />

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">

                        <button
                            onClick={() => navigate("/")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                        >
                            Go to Home
                        </button>

                        <a
                            href="tel:+918172824389"
                            className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
                        >
                            Call Now
                        </a>

                    </div>

                    {/* Footer note */}
                    <p className="text-xs text-gray-400 mt-6">
                        Redirecting to home in 5 seconds...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ThankYou;