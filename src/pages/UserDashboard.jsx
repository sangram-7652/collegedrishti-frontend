import React, { useEffect, useState } from "react";
import {
  User,
  Phone,
  Mail,
  LogOut,
  Settings,
  Activity,
  Home,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Check Login
  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored || stored === "undefined") {
      navigate("/login");
    } else {
      setUser(JSON.parse(stored));
    }
  }, [navigate]);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ✅ Prevent Crash
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] text-white overflow-hidden">

      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6">

        {/* ================= HEADER ================= */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

            {/* Left Profile */}
            <div className="flex items-center gap-5">

              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[3px] shadow-xl">
                  <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center text-3xl font-bold">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                </div>

                <div className="absolute -bottom-1 -right-1 bg-green-500 border-4 border-[#0f172a] w-6 h-6 rounded-full"></div>
              </div>

              {/* User Info */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-3xl font-bold">
                    {user?.name || "User"}
                  </h1>

                  <Sparkles size={18} className="text-yellow-400" />
                </div>

                <p className="text-gray-300">
                  {user?.email || "user@email.com"}
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  Mobile: {user?.mobile || "Not Added"}
                </p>
              </div>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-wrap items-center gap-3">

              {/* Home */}
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-3 rounded-2xl transition-all duration-300 hover:scale-105"
              >
                <Home size={18} />
                Home
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-400/20 text-red-300 px-5 py-3 rounded-2xl transition-all duration-300 hover:scale-105"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {[
            {
              title: "Courses",
              value: "12",
              icon: "📚",
            },
            {
              title: "Completed",
              value: "8",
              icon: "✅",
            },
            {
              title: "Pending",
              value: "4",
              icon: "⏳",
            },
            {
              title: "Certificates",
              value: "5",
              icon: "🏆",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 hover:scale-[1.03] transition-all duration-300 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{item.title}</p>

                  <h2 className="text-3xl font-bold mt-2">
                    {item.value}
                  </h2>
                </div>

                <div className="text-4xl">
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">

            {/* Account Info */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-xl">

              <h2 className="text-xl font-semibold mb-6">
                Account Information
              </h2>

              <div className="space-y-5">

                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
                  <div className="bg-indigo-500/20 p-3 rounded-xl">
                    <User size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">
                      Full Name
                    </p>

                    <h4 className="font-medium">
                      {user?.name || "User"}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
                  <div className="bg-green-500/20 p-3 rounded-xl">
                    <Phone size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">
                      Mobile Number
                    </p>

                    <h4 className="font-medium">
                      {user?.mobile || "-"}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
                  <div className="bg-pink-500/20 p-3 rounded-xl">
                    <Mail size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">
                      Email Address
                    </p>

                    <h4 className="font-medium">
                      {user?.email || "-"}
                    </h4>
                  </div>
                </div>

              </div>
            </div>

            {/* Activity */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-xl">

              <h2 className="text-xl font-semibold mb-6">
                Recent Activity
              </h2>

              <div className="space-y-4">

                {[
                  "Logged in successfully",
                  "Updated profile information",
                  "Enrolled in React Course",
                  "Completed JavaScript Quiz",
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl"
                  >
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>

                    <p className="text-gray-300">
                      {activity}
                    </p>
                  </div>
                ))}

              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">

            {/* Quick Actions */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-xl">

              <h2 className="text-xl font-semibold mb-6">
                Quick Actions
              </h2>

              <div className="space-y-4">

                <button className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:scale-105 transition-all duration-300 px-5 py-4 rounded-2xl shadow-lg">
                  <Settings size={20} />
                  Settings
                </button>

                <button className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-all duration-300 px-5 py-4 rounded-2xl shadow-lg">
                  <Activity size={20} />
                  Activity
                </button>

              </div>
            </div>

            {/* Profile Completion */}
            <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-xl">

              <h2 className="text-xl font-semibold mb-4">
                Profile Status
              </h2>

              <div className="mb-3 flex justify-between text-sm">
                <span>Profile Completion</span>
                <span>85%</span>
              </div>

              <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-400 to-pink-400 h-full w-[85%] rounded-full"></div>
              </div>

              <p className="text-sm text-gray-300 mt-4">
                Complete your profile to unlock all features.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;