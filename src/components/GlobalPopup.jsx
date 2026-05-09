import React from "react";
import { useEffect, useState } from "react";

const GlobalPopup = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        try {

            setTimeout(() => {
                setOpen(true);
            }, 15000);

          
        } catch (e) {
            console.error("Popup error:", e);
            setOpen(true); // fallback
        }
    }, []);

    const handleClose = () => {
        setOpen(false);

        // ✅ production ke liye enable karna
        localStorage.setItem("popupShown", "true");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("✅ Form Submitted Successfully!");
        handleClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">

            <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

                {/* LEFT SIDE */}
                <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Free Career Guidance 🎓
                    </h2>
                    <p className="text-sm opacity-90 mb-6">
                        Get expert advice & choose the best university for your future.
                    </p>

                    <ul className="space-y-2 text-sm">
                        <li>✔️ Top Universities</li>
                        <li>✔️ Online Degrees</li>
                        <li>✔️ Placement Support</li>
                        <li>✔️ Free Counseling</li>
                    </ul>
                </div>

                {/* RIGHT SIDE FORM */}
                <div className="w-full md:w-1/2 p-6 relative">

                    {/* Close */}
                    <button
                        onClick={handleClose}
                        className="absolute top-3 right-4 text-gray-400 hover:text-black text-xl"
                    >
                        ✕
                    </button>

                    <h3 className="text-xl font-semibold mb-4 text-gray-800">
                        Book Free Counseling
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-3">

                        <input
                            type="text"
                            placeholder="Full Name"
                            required
                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                        <input
                            type="tel"
                            placeholder="Phone Number"
                            required
                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                        <select className="w-full border border-gray-300 p-2 rounded-lg">
                            <option>Select Course</option>
                            <option>MBA</option>
                            <option>BCA</option>
                            <option>MCA</option>
                            <option>BBA</option>
                        </select>

                        <select className="w-full border border-gray-300 p-2 rounded-lg">
                            <option>Select State</option>
                            <option>Uttar Pradesh</option>
                            <option>Delhi</option>
                            <option>Maharashtra</option>
                        </select>

                        <select className="w-full border border-gray-300 p-2 rounded-lg">
                            <option>Preferred Mode</option>
                            <option>Online</option>
                            <option>Distance</option>
                        </select>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
                        >
                            Get Free Callback
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default GlobalPopup;