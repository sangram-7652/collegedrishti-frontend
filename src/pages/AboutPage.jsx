// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function AboutPage() {
//   const { id } = useParams();
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetch(`http://127.0.0.1:8000/api/university/${id}/about`)
//       .then((res) => res.json())
//       .then((res) => {
//         setData(res.data || res); // Laravel response me `data` hota hai
//       })
//       .catch((err) => console.error("Error:", err));
//   }, [id]);

//   if (!data) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">About University</h1>
//       <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function AboutPage() {
  const { id } = useParams();
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    api.get(`/university/${id}/about`)
      .then(res => res.data)
      .then(data => setAboutData(data.data || data));
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">About University</h1>
      {aboutData ? (
        <pre>{JSON.stringify(aboutData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
