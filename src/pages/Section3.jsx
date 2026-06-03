import { FaCheckCircle } from "react-icons/fa";
import LeadForm from "../components/LeadForm";
import SEO from "../components/SEO";

// ✅ HTML decode function
function decodeHtml(html) {
  if (!html) return "";

  const txt = document.createElement("textarea");

  txt.innerHTML = html;

  return txt.value;
}

export default function Section3({ course }) {
  if (!course) return null;


  return (

    
    <section className="w-full px-4 sm:px-8 lg:px-16 py-10">


      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT CONTENT */}
          <div className="w-full lg:w-2/3">

            {/* Title */}
            <div>

              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                About {course.sub_name || "Course"} Course
              </h2>

              {/* Long Description */}
              <div
                className="course-content text-sm sm:text-base text-gray-700 mb-4 leading-7"
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(course.long_desc)
                    .replace(
                      /<table/g,
                      '<div class="table-wrapper"><table'
                    )
                    .replace(
                      /<\/table>/g,
                      "</table></div>"
                    ),
                }}
              />

            </div>

            {/* How does it Helps */}
            {course?.how_help && (

              <div className="mt-8">

                <h3 className="text-lg sm:text-xl font-semibold mb-3">
                  How does it Helps?
                </h3>

                <div
                  className="course-content text-sm text-gray-800 leading-7"
                  dangerouslySetInnerHTML={{
                    __html: course.how_help,
                  }}
                />

              </div>

            )}

          </div>

          {/* DESKTOP SIDEBAR */}
          <div className="hidden lg:block lg:w-1/3">

            <div className="sticky top-24">

              <LeadForm />

            </div>

          </div>

        </div>

        {/* MOBILE LEAD FORM */}
        <div className="block lg:hidden mt-8 mb-24">

          <LeadForm />

        </div>

      </div>

    </section>
  );
}