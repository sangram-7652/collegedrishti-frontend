import React from "react";

const Section = ({ title, children }) => (
  <div className="mb-4">
    <h4 className="font-semibold mb-2 text-sm">{title}</h4>
    {children}
  </div>
);

const Checkbox = ({ label }) => (
  <label className="flex items-center space-x-2 text-sm mb-1">
    <input type="checkbox" className="accent-indigo-500" />
    <span>{label}</span>
  </label>
);

const SidebarFilters = () => {
  return (
    <div className="text-sm">
      <Section title="Mode of Education">
        {["Distance Learning", "Online", "Vocational Learning"].map((label) => (
          <Checkbox key={label} label={label} />
        ))}
      </Section>

      <Section title="Programmes">
        {["UG Courses", "PG Courses", "Diplomas"].map((label) => (
          <Checkbox key={label} label={label} />
        ))}
      </Section>

      <Section title="Courses">
        {["BBA", "MBA", "BCA", "MCA", "B.Com", "M.Com"].map((label) => (
          <Checkbox key={label} label={label} />
        ))}
      </Section>

      <Section title="University">
        {["Amity", "LPU", "UPES", "Manipal", "IGNOU", "Chandigarh"].map(
          (label) => (
            <Checkbox key={label} label={label} />
          ),
        )}
      </Section>

      <Section title="Duration">
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min"
            className="w-14 border px-1 rounded"
          />
          <input
            type="number"
            placeholder="Max"
            className="w-14 border px-1 rounded"
          />
        </div>
      </Section>

      <div className="flex gap-2 mt-2">
        <button className="bg-indigo-500 text-white px-4 py-1 rounded">
          Apply
        </button>
        <button className="border px-4 py-1 rounded">Reset</button>
      </div>

      <div className="mt-10 p-6 bg-[#E8EEFD] rounded-lg w-[250px]">
        <h2 className="font-bold text-lg mb-2">
          Get 50% Off Development Courses!
        </h2>
        <p className="text-sm text-gray-600 mb-4">Hurry! Ends in 10:00 mins</p>
        <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
          Start Today
        </button>
      </div>
    </div>
  );
};

export default SidebarFilters;
