import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQSection = ({ universityId, courseId, subCourseId }) => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    let url = "/faqs";

    if (subCourseId) {
      url = `/faqs/sub-course/${subCourseId}`;
    } else if (courseId) {
      url = `/faqs/course/${courseId}`;
    } else if (universityId) {
      url = `/faqs/university/${universityId}`;
    }

    api
      .get(url)
      .then((res) => {
        if (res?.data?.success) {
          setFaqs(res.data.data || []);
        } else {
          setFaqs([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching FAQs:", err);
        setFaqs([]);
      });
  }, [universityId, courseId, subCourseId]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-2xl font-semibold mb-2 text-blue-500">FAQs</h1>
        <p className="mb-10 text-gray-600">
          We've addressed the key questions to help you make a confident decision.
        </p>

        {faqs.length === 0 ? (
          <p className="text-gray-500">No FAQs available.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {faqs.map((faq, index) => (
              <div
                key={faq.id || index}
                className="rounded-md shadow-md bg-white border border-gray-100 transition hover:shadow-lg"
              >
                <button
                  className="w-full flex justify-between items-center p-5 text-left"
                  onClick={() => toggleFAQ(index)}
                >
                  <h4 className="font-semibold text-gray-800">
                    {faq.title || faq.question}
                  </h4>
                  {openIndex === index ? (
                    <ChevronUp className="text-blue-500" />
                  ) : (
                    <ChevronDown className="text-gray-500" />
                  )}
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-[500px] p-5 pt-0" : "max-h-0"
                  }`}
                >
                  <p className="text-sm text-gray-600">
                    {faq.desc || faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQSection;
