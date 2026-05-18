import React from "react";

const AboutUniversity = ({ data }) => {


  // ✅ UNIVERSITY OBJECT
  const university = data?.university || {};

  // ✅ MAIN HTML CONTENT
  const details = data?.details || "";

  // ✅ EXTRA DETAILS
  const address = university?.address || "";
  const established = university?.established || "";
  const approvals = university?.approvals || "";
  const naac = university?.naac_score || "";
  const nirf = university?.nirf_ranking || "";

  return (
    <section className="w-full py-10 bg-white">

      <div className="max-w-[1200px] mx-auto px-4">

        {/* ================= TOP INFO BOX ================= */}

        <div className="bg-[#f5f5f5] border-l-[8px] border-[#2563eb] rounded-3xl p-8 md:p-10 mb-10">

          {address && (
            <p className="mb-4 text-lg leading-8">
              <strong>Address:</strong> {address}
            </p>
          )}

          {established && (
            <p className="mb-4 text-lg leading-8">
              <strong>Established:</strong> {established}
            </p>
          )}

          {approvals && (
            <p className="mb-4 text-lg leading-8">
              <strong>Approvals:</strong> {approvals}
            </p>
          )}

          {naac && (
            <p className="mb-4 text-lg leading-8">
              <strong>NAAC Score:</strong> {naac}
            </p>
          )}

          {nirf && (
            <p className="text-lg leading-8">
              <strong>NIRF Ranking:</strong> {nirf}
            </p>
          )}

        </div>

        {/* ================= MAIN CONTENT ================= */}

        <div
          className="university-content"
          dangerouslySetInnerHTML={{
            __html: details,
          }}
        />

      </div>

    </section>
  );
};

export default AboutUniversity;