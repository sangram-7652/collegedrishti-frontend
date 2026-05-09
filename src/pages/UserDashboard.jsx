// import React, { useEffect, useState } from "react";

// const UserDashboard = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>You are not logged in. Please login first.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-xl mx-auto bg-white shadow rounded p-6">
//         <h2 className="text-2xl font-bold mb-4">My Profile</h2>

//         <p className="mb-2"><b>Name:</b> {user.name || "-"}</p>
//         <p className="mb-2"><b>Mobile:</b> {user.mobile || "-"}</p>
//         <p className="mb-2"><b>Email:</b> {user.email || "-"}</p>
//         <p className="mb-2"><b>DOB:</b> {user.dob || "-"}</p>
//         <p className="mb-2"><b>Gender:</b> {user.gender || "-"}</p>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;





import React, { useEffect, useState } from "react";
import { User, Phone, Mail, LogOut, Settings, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored || stored === "undefined") {
      navigate("/login");
    } else {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };


  // const handleLogout = () => {
  //   localStorage.removeItem("user");
  //   navigate("/login");
  // };

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored || stored === "undefined") {
      navigate("/login"); // 🔥 redirect
    } else {
      setUser(JSON.parse(stored));
    }
  }, []);

  // 🔥 VERY IMPORTANT (fix crash)
  if (!user) return null;


  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-8">

      <div className="max-w-6xl mx-auto space-y-6">

        {/* 🔷 Header / Profile */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-lg">

          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center text-3xl font-bold shadow-lg">
            {user.name?.charAt(0) || "U"}
          </div>

          {/* Info */}

          <div className="flex-1">
            <h2 className="text-2xl font-bold">{user?.name || "User"}</h2>
            <p className="opacity-90">{user?.email || "user@email.com"}</p>
            <p className="opacity-80 text-sm">{user?.mobile || "-"}</p>
          </div>


          {/* Logout */}
          <button
            onClick={handleLogout}
            className="bg-black/30 hover:bg-black/50 px-4 py-2 rounded-full flex items-center gap-2 transition"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* 🔷 Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Courses", value: "12" },
            { title: "Completed", value: "8" },
            { title: "Pending", value: "4" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-2xl shadow hover:scale-105 transition"
            >
              <h4 className="text-sm opacity-70">{item.title}</h4>
              <p className="text-2xl font-bold mt-1">{item.value}</p>
            </div>
          ))}
        </div>

        {/* 🔷 Main Grid */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Left - User Info */}
          <div className="md:col-span-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-semibold">Account Information</h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <User size={18} />
                <span>{user?.name || "User"}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>{user?.mobile}</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>{user?.email || "-"}</span>
              </div>
            </div>
          </div>

          {/* Right - Quick Actions */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-semibold">Quick Actions</h3>

            <button className="w-full flex items-center gap-3 bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-xl transition">
              <Settings size={18} /> Settings
            </button>

            <button className="w-full flex items-center gap-3 bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-xl transition">
              <Activity size={18} /> Activity
            </button>
          </div>
        </div>

        {/* 🔷 Activity Section */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>

          <ul className="space-y-3 text-sm opacity-80">
            <li>✔ Logged in successfully</li>
            <li>✔ Updated profile</li>
            <li>✔ Enrolled in React Course</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;


// import React, { useEffect, useState } from "react";

// const UserDashboard = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     try {
//       const stored = localStorage.getItem("user");
//       if (stored && stored !== "undefined") {
//         setUser(JSON.parse(stored));
//       }
//     } catch {
//       localStorage.removeItem("user");
//     }
//   }, []);

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>You are not logged in. Please login first.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-xl mx-auto bg-white shadow rounded p-6">
//         <h2 className="text-2xl font-bold mb-4">My Profile</h2>

//         <p><b>Name:</b> {user.name}</p>
//         <p><b>Mobile:</b> {user.mobile}</p>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;
