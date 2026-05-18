
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
