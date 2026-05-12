import React from "react";

const Aboutuniversity_details = ({ data }) => {

  // ✅ DIRECT DATA
  const university_details = data || {};

  return (

    <div className="max-w-6xl mx-auto px-4 py-10 font-sans">

      {/* ================= TOP BOX ================= */}

      <div className="mt-10">

        <div className="bg-gray-100 rounded-[20px] p-8 border-l-8 border-r-8 border-blue-600">

          <div className="flex flex-col md:flex-row gap-6">

            <div>

              <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">

                {university_details?.name}

              </h1>

              {university_details?.address && (

                <p className="text-gray-700 mb-2">

                  <span className="font-semibold text-black">
                    Address:
                  </span>{" "}

                  <span className="text-gray-600">

                    {university_details.address}

                  </span>

                </p>
              )}

              {university_details?.est_year && (

                <p className="text-gray-700 mb-2">

                  <span className="font-semibold text-black">
                    Established:
                  </span>{" "}

                  <span className="text-gray-600">

                    {university_details.est_year}

                  </span>

                </p>
              )}

              {university_details?.approvals && (

                <p className="text-gray-700 mb-2">

                  <span className="font-semibold text-black">
                    Approvals:
                  </span>{" "}

                  <span className="text-gray-600">

                    {university_details.approvals}

                  </span>

                </p>
              )}

              {university_details?.naac_score && (

                <p className="text-gray-700 mb-2">

                  <span className="font-semibold text-black">
                    NAAC Score:
                  </span>{" "}

                  <span className="text-gray-600">

                    {university_details.naac_score}

                  </span>

                </p>
              )}

              {university_details?.nirf_ranking && (

                <p className="text-gray-700 mb-2">

                  <span className="font-semibold text-black">
                    NIRF Ranking:
                  </span>{" "}

                  <span className="text-gray-600">

                    {university_details.nirf_ranking}

                  </span>

                </p>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* ================= HTML CONTENT ================= */}

      {university_details?.details && (

       <div className="mt-10">
  <div
    className="course-content"
    dangerouslySetInnerHTML={{
      __html: university_details.details
        ?.replace(
          /<table/g,
          '<div class="table-wrapper"><table'
        )
        ?.replace(
          /<\/table>/g,
          "</table></div>"
        ),
    }}
  />
</div>
      )}

      {/* ================= QUICK FACTS ================= */}

      <div className="mt-10">

        <div className="relative bg-gray-100 rounded-[20px] p-8 border-l-8 border-r-8 border-blue-600">

          <div className="grid md:grid-cols-2 gap-y-4 gap-x-16 text-sm md:text-base">

            {[
              {
                label: "Education Mode",
                value: university_details?.edu_mode,
              },
              {
                label: "Exam Mode",
                value: university_details?.exam_mode,
              },
              {
                label: "E-Learning Facility",
                value: university_details?.e_learn_f,
              },
              {
                label: "Online Classes",
                value: university_details?.onln_class,
              },
              {
                label: "Placement Assistance",
                value: university_details?.place_assit,
              },
              {
                label: "Industry Relevant Curriculum",
                value: university_details?.insd_r_curriculum,
              },
              {
                label: "Student Rating",
                value: university_details?.stu_rating,
              },
              {
                label: "Satisfied Students",
                value: university_details?.statisfied_stu,
              },
              {
                label: "Students Choice",
                value: university_details?.stu_choice,
              },
              {
                label: "WES Approved",
                value: university_details?.wes_app,
              },
              {
                label: "EMI Option",
                value: university_details?.emi,
              },
            ].map(
              (item, index) =>

                item.value && (

                  <p
                    key={index}
                    className="text-gray-700 leading-relaxed"
                  >

                    <span className="font-semibold text-black">

                      {item.label}:

                    </span>{" "}

                    <span className="text-gray-600">

                      {item.value}

                    </span>

                  </p>
                )
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Aboutuniversity_details;