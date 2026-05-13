import React, { useState, useEffect } from 'react';
import Header from "../pages/Header";
import MobileMenu from "../pages/MobileMenu";
import CTASection from "../pages/CTASection";
import FAQSection from "../pages/FAQSection";
import Footer from "./Footer";
import MobileFooterNav from './MobileFooterNav';
import api from '../api/axios';
import robotImg from "../uni-image/robot.png";
import { useNavigate } from 'react-router-dom';
import { createPortal } from "react-dom"; 

const SuggestedUniversity = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [stepData, setStepData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({
    course: null,
    subCourse: null,
    specialization: null,
    workingStatus: null,
    courseFees: null,
    emiOption: null,
    step7: null,
    step8: null,
    step9: null
  });


  const [stepDetails, setStepDetails] = useState([]);
  const [otpPopupOpen, setOtpPopupOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    if (popupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [popupOpen]);


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    gender: 'Male',
  });

  // // Step titles and descriptions

  useEffect(() => {
    const fetchStepTitles = async () => {
      try {
        const res = await api.get('step-details');
        if (Array.isArray(res.data?.data)) {
          setStepDetails(res.data.data);
        }
      } catch (error) {
        console.log("Error fetching step titles", error);
      }
    };

    fetchStepTitles();
  }, []);

  // const stepDetails = [
  //   { step_id: 1, title_name: "Select your degree", title_disc: "" },
  //   { step_id: 2, title_name: "Select your course", title_disc: "" },
  //   { step_id: 3, title_name: "Select your specialization", title_disc: "" },
  //   { step_id: 4, title_name: "Are you currently working?", title_disc: "" },
  //   { step_id: 5, title_name: "Select course fees range", title_disc: "" },
  //   { step_id: 6, title_name: "Would you like to convert to EMI?", title_disc: "" },
  //   { step_id: 7, title_name: "Select your preferred study mode", title_disc: "" },
  //   { step_id: 8, title_name: "Select your preferred university type", title_disc: "" },
  //   { step_id: 9, title_name: "Select your preferred university location", title_disc: "" }
  // ];

  // useEffect(() => {
  //   // Load initial data (courses)
  //   fetchStepData();
  // }, []);

  const extractStepItems = (res) => {
    const body = res?.data;
    if (!body) return [];
    if (Array.isArray(body.data)) return body.data;
    if (Array.isArray(body.data?.data)) return body.data.data;
    if (Array.isArray(body)) return body;
    return [];
  };

  const fetchStepData = async () => {
    setLoading(true);

    try {
      let path = "";
      let params = undefined;

      switch (currentStep) {
        case 1:
          path = "/courses";
          break;
        case 2: {
          const courseId = selectedOptions.course?.value;
          if (courseId == null || courseId === "") {
            console.log("[Suggest Flow] Step 2 skipped — no Step 1 course_id yet", {
              selectedDegree: selectedOptions.course,
            });
            setStepData([]);
            return;
          }
          path = "/course-filter";
          params = { course_id: courseId };
          console.log("[Suggest Flow] Step 2 — loading sub-courses for degree", {
            selectedDegreeFromStep1: {
              label: selectedOptions.course?.label,
              value: selectedOptions.course?.value,
            },
            filterField: "course_id (matches DB course.course_id; label e.g. PG Courses is display only)",
            apiRequest: { path, params },
          });
          break;
        }
        case 3: {
          const subId = selectedOptions.subCourse?.value;
          if (subId == null || subId === "") {
            setStepData([]);
            return;
          }
          path = "/suggest/specializations";
          params = { sub_id: subId };
          console.log("[Suggest Flow] Step 3 request", { path, params });
          break;
        }
        case 4: {
          const sid = selectedOptions.specialization?.value;
          if (sid == null || sid === "") {
            setStepData([]);
            return;
          }
          path = "/suggest/step4-options";
          params = { id: sid };
          break;
        }
        case 5: {
          const id = selectedOptions.workingStatus?.value;
          if (id == null || id === "") {
            setStepData([]);
            return;
          }
          path = "/suggest/step5-options";
          params = { id };
          break;
        }
        case 6: {
          const id = selectedOptions.courseFees?.value;
          if (id == null || id === "") {
            setStepData([]);
            return;
          }
          path = "/suggest/step6-options";
          params = { id };
          break;
        }
        case 7: {
          const id = selectedOptions.emiOption?.value;
          if (id == null || id === "") {
            setStepData([]);
            return;
          }
          path = "/suggest/step7-options";
          params = { id };
          break;
        }
        case 8: {
          const id = selectedOptions.step7?.value;
          if (id == null || id === "") {
            setStepData([]);
            return;
          }
          path = "/suggest/step8-options";
          params = { id };
          break;
        }
        case 9: {
          const id = selectedOptions.step8?.value;
          if (id == null || id === "") {
            setStepData([]);
            return;
          }
          path = "/suggest/step9-options";
          params = { id };
          break;
        }
        default:
          return;
      }

      const res = await api.get(path, params ? { params } : undefined);
      let items = extractStepItems(res);

      if (currentStep === 2 && items.length === 0 && params?.course_id != null) {
        console.warn("[Suggest Flow] Step 2 — /course-filter returned 0 rows; fallback GET /courses/:id");
        const res2 = await api.get(`/courses/${params.course_id}`);
        items = extractStepItems(res2);
      }

      console.log("[Suggest Flow] API response", {
        step: currentStep,
        path,
        params,
        itemCount: items.length,
        sample: items[0] ?? null,
        rawSuccess: res?.data?.success,
        rawMessage: res?.data?.message,
      });

      setStepData(items);
    } catch (err) {
      console.error("[Suggest Flow] fetchStepData error", err?.response?.status, err?.response?.data || err);
      setStepData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStepData();
  }, [currentStep, selectedOptions]);


  const handleOptionSelect = (step, value, label) => {
    const updatedOptions = {
      ...selectedOptions,
      [step]: { value, label }
    };
    setSelectedOptions(updatedOptions);

    if (step === "course") {
      console.log("[Suggest Flow] Step 1 degree selected (stored for Step 2 course_id filter)", {
        label,
        value,
        hint: "value is course_id from /api/courses — Step 2 uses this as course_id, not the label text",
      });
    } else {
      console.log("[Suggest Flow] option selected", { step, value, label });
    }

    // ✅ Agar last step (9) par hain, toh directly popup open karo
    if (currentStep === stepDetails.length) {
      console.log("Last step completed! Opening popup...");
      setPopupOpen(true);
    }
    // ✅ Agar last step nahi hai, toh next step par jao
    else if (currentStep < stepDetails.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentStep < stepDetails.length) {
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === stepDetails.length) {
      // ✅ Last step par next button click par popup open karo
      console.log("Submit button clicked! Opening popup...");
      setPopupOpen(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const calculateProgress = () => {
    const totalSteps = stepDetails.length;
    return Math.round(((currentStep - 1) / totalSteps) * 100);
  };

  const isNextDisabled = () => {
    const disabled = (() => {
      switch (currentStep) {
        case 1: return !selectedOptions.course;
        case 2: return !selectedOptions.subCourse;
        case 3: return !selectedOptions.specialization;
        case 4: return !selectedOptions.workingStatus;
        case 5: return !selectedOptions.courseFees;
        case 6: return !selectedOptions.emiOption;
        case 7: return !selectedOptions.step7;
        case 8: return !selectedOptions.step8;
        case 9: return !selectedOptions.step9;
        default: return true;
      }
    })();

    // ✅ Debugging ke liye
    console.log(`Step ${currentStep} - Button disabled:`, disabled);
    console.log("step9 value:", selectedOptions.step9);
    return disabled;
  };


  const renderStep = () => {
    if (loading) return <div className="text-center py-8">Loading...</div>;

    const currentStepDetail = stepDetails.find(step => step.step_id === currentStep);
    if (!currentStepDetail || !stepData) return <div className="text-center py-8">Invalid step or no data</div>;


    return (
      <div className="step-container">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">{currentStepDetail.title_name}</h2>

        {/* OPTIONS GRID WITH IMAGES */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">

          {stepData.map((item) => {

            let value, label, image;
            switch (currentStep) {
              // case 1:
              //   value = item.course_id;
              //   label = item.course_name;
              //   image = item.image || item.course_image || item.icon || item.thumbnail;
              //   break;
              case 1:
                value = item.course_id || item.id;
                label = item.course_name || item.name;
                image = item.image || item.course_image || item.icon || item.thumbnail;
                break;
              case 2:
                value = item.sub_co_id;
                label = item.sub_name;
                image = item.image;
                break;
              case 3:
                value = item.specialize_id;
                label = item.specialize_name;
                image = item.image;
                break;
              case 4:
                value = item.id;
                label = item.step4_name;
                image = item.image;
                break;
              case 5:
                value = item.id;
                label = item.step5_name;
                image = item.image;
                break;
              case 6:
                value = item.id;
                label = item.step6_name;
                image = item.image;
                break;
              case 7:
                value = item.id;
                label = item.step7_name;
                image = item.image;
                break;
              case 8:
                value = item.id;
                label = item.step8_name;
                image = item.image;
                break;
              case 9:
                value = item.id;
                label = item.step9_name;
                image = item.image;
                break;
              default:
                value = item.id;
                label = item.name;
            }

            const selectedKey =
              currentStep === 1 ? 'course' :
                currentStep === 2 ? 'subCourse' :
                  currentStep === 3 ? 'specialization' :
                    currentStep === 4 ? 'workingStatus' :
                      currentStep === 5 ? 'courseFees' :
                        currentStep === 6 ? 'emiOption' :
                          currentStep === 7 ? 'step7' :
                            currentStep === 8 ? 'step8' : 'step9';

            // ⭐⭐ YAHAN imgUrl define karo — JSX ke bahar
            // const imgUrl = image
            //   ? `https://api.collegedrishti.com/${image.replace(/^\/+/, '')}`
            //   : '/default-course.png';

            // Safe Image Logic - Invisible fallback
            let imgUrl = null;
            if (image && typeof image === "string" && image.trim() !== "") {
              imgUrl = `https://api.collegedrishti.com/${image
                .replace(/^\/+/, "")
                .replace(/^api\/*/, "")}`;
            }




            return (
              <button
                key={value}
                onClick={() => handleOptionSelect(selectedKey, value, label)}
                className={`flex flex-col items-center justify-center gap-2 
                p-4 sm:p-5 
                rounded-xl border-2 shadow-sm transition-all cursor-pointer bg-white
                h-32 sm:h-auto w-full
                ${selectedOptions[selectedKey]?.value === value
                    ? 'border-[#1e60d5] bg-[#e6efff] shadow-md scale-105'
                    : 'border-gray-300 hover:border-blue-500 hover:shadow-lg'
                  }
              `}

              >

                {imgUrl && (
                  <img
                    src={imgUrl}
                    alt={label}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                  />
                )}




                {/* LABEL */}
                <span className="text-center font-semibold text-gray-800 text-sm">
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const mobileDigits = String(formData.phone || "")
      .replace(/\D/g, "")
      .slice(0, 10);

    const payload = {
      student_name: formData.name?.trim() || "",
      email: (formData.email || "").trim() || undefined,
      mobile: mobileDigits,
      dob: formData.dob || undefined,
      gender: formData.gender || undefined,
      step1name: selectedOptions.course?.label || "",
      step2name: selectedOptions.subCourse?.label || "",
      step3name: selectedOptions.specialization?.label || "",
      step4name: selectedOptions.workingStatus?.label || "",
      step5name: selectedOptions.courseFees?.label || "",
      step6name: selectedOptions.emiOption?.label || "",
      step7name: selectedOptions.step7?.label || "",
      step8name: selectedOptions.step8?.label || "",
      step9name: selectedOptions.step9?.label || "",
    };

    if (mobileDigits.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      console.log("[Suggest wizard] submit payload", payload);

      localStorage.setItem("selectedCourseId", String(selectedOptions.course?.value ?? ""));
      localStorage.setItem("selectedCourseName", selectedOptions.course?.label ?? "");

      const response = await api.post("/suggest/addsuggestform", payload);
      console.log("[Suggest wizard] submit response", response.status, response.data);

      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + 7 * 24 * 60 * 60 * 1000);

      document.cookie = `mobile=${encodeURIComponent(mobileDigits)}; expires=${expirationDate.toUTCString()}; path=/`;
      document.cookie = `name=${encodeURIComponent(formData.name)}; expires=${expirationDate.toUTCString()}; path=/`;

      setPopupOpen(false);
      setOtpPopupOpen(true);
    } catch (error) {
      const status = error?.response?.status;
      const data = error?.response?.data;
      const msg =
        data?.message ||
        (data?.errors && typeof data.errors === "object"
          ? Object.values(data.errors).flat().join(" ")
          : null);
      console.error("[Suggest wizard] submit error", status, data);
      alert(msg || "Failed to submit form. Please try again.");
    }
  };

  // UPDATED handleVerifyOtp FUNCTION
// FILE: SuggestedUniversity.jsx

const handleVerifyOtp = async () => {
  const mobileDigits = String(formData.phone || "")
    .replace(/\D/g, "")
    .slice(0, 10);

  try {
    console.log("[Suggest wizard] verify OTP request", {
      mobile: mobileDigits,
      otpLen: otp?.length,
    });

    const verifyResponse = await api.post("/send-verify", {
      mobile: mobileDigits,
      otp,
    });

    console.log(
      "[Suggest wizard] verify OTP response",
      verifyResponse.status,
      verifyResponse.data
    );

    // ✅ wizard data
    const wizard = {
      course_id: localStorage.getItem("selectedCourseId") || "",
      degree_label: selectedOptions.course?.label || "",
      sub_course_label: selectedOptions.subCourse?.label || "",
      specialization: selectedOptions.specialization?.label || "",
      career_goal: selectedOptions.workingStatus?.label || "",
      budget_range: selectedOptions.courseFees?.label || "",
      learning_mode: selectedOptions.step7?.label || "",
      university_type: selectedOptions.step8?.label || "",
      location_preference: selectedOptions.step9?.label || "",

      step1name: selectedOptions.course?.label || "",
      step2name: selectedOptions.subCourse?.label || "",
      step3name: selectedOptions.specialization?.label || "",
      step4name: selectedOptions.workingStatus?.label || "",
      step5name: selectedOptions.courseFees?.label || "",
      step6name: selectedOptions.emiOption?.label || "",
      step7name: selectedOptions.step7?.label || "",
      step8name: selectedOptions.step8?.label || "",
      step9name: selectedOptions.step9?.label || "",
    };

    localStorage.setItem(
      "suggestWizardCriteria",
      JSON.stringify(wizard)
    );

    // ✅ close popup
    setOtpPopupOpen(false);
    setPopupOpen(false);

    // ✅ reset form
    resetFormAndSelections();

    // ✅ refresh
    await fetchStepData();

    // ❌ REMOVE THIS
    // navigate("/recommendations");

    // ✅ DIRECT COMPARISON PAGE
    navigate("/Comparisonpage");

  } catch (error) {
    const data = error?.response?.data;

    const msg =
      data?.message ||
      (data?.errors && typeof data.errors === "object"
        ? Object.values(data.errors).flat().join(" ")
        : null);

    console.error(
      "[Suggest wizard] verify OTP error",
      error?.response?.status,
      data
    );

    setOtpError(msg || "Error verifying OTP. Please try again.");
  }
};

  const handleResendOtp = async () => {
    const mobileDigits = String(formData.phone || "")
      .replace(/\D/g, "")
      .slice(0, 10);

    try {
      console.log("[Suggest wizard] resend OTP", { mobile: mobileDigits });

      await api.get("/send-mobile", {
        params: { mobile: mobileDigits },
      });
      setOtp('');
      setOtpError('');
      setCanResendOtp(false);
      setResendTimer(30);

      // Restart the timer
      const timerInterval = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            setCanResendOtp(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (error) {
      const data = error?.response?.data;
      const msg = data?.message || "Failed to resend OTP. Please try again.";
      console.error("[Suggest wizard] resend OTP error", error?.response?.status, data);
      setOtpError(msg);
    }
  };
  const resetFormAndSelections = () => {
    setCurrentStep(1);
    setSelectedOptions({
      course: null,
      subCourse: null,
      specialization: null,
      workingStatus: null,
      courseFees: null,
      emiOption: null,
      step7: null,
      step8: null,
      step9: null
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      dob: '',
      gender: 'Male',
    });
  };

  const handleCancel = () => {
    setPopupOpen(false);
  };



  // ... (rest of your code remains the same - handleInputChange, handleSave, handleVerifyOtp, etc.)

  return (
    <div className="w-full font-sans overflow-x-hidden pb-16">
      {/* ✅ Desktop Header */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* ✅ Mobile Header */}
      <div className="block md:hidden">
        <MobileMenu />
      </div>
      <div className="w-full flex justify-center px-4 md:px-6 lg:px-8">
        <div className="relative w-full max-w-7xl border-[10px] border-[#d2e5fd] rounded-2xl bg-white shadow-md my-8 px-6 md:px-10 py-10 md:py-12">
          {/* Top Label */}
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 
                  bg-white px-3 py-1 md:px-6 md:py-2 
                  border border-[#d2e5fd] text-[#1e60d5] font-semibold 
                  text-xs md:text-base shadow z-10 text-center whitespace-nowrap overflow-hidden text-ellipsis"
          >
            Your perfect match with just few questions
          </div>
          <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Progress bar with percentage */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">
                  Progress: {calculateProgress()}%
                </span>
                <span className="text-sm font-medium text-gray-700">
                  Step {currentStep} of {stepDetails.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2.5 rounded-full">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Side - 1/3 */}
              <div className="md:w-1/4 border-r pr-6 flex flex-col justify-between">
                <div className="text-[#ff7e00] text-sm font-semibold mb-4">
                  ⚡ Grab it Now!{" "}
                  <span className="text-black font-bold text-sm leading-tight text-[10px] md:text-sm">
                    Get Upto INR <br /> 10,000 Cashback to enroll Now.
                  </span>
                </div>
                <div className="flex justify-center py-6">
                  <img src={robotImg} alt="robot" className="h-28 w-28 object-contain" />
                </div>
                <div className="flex justify-center">
                  <div className="bg-[#1e60d5] text-white text-sm font-semibold px-4 py-1 rounded-md">
                    {currentStep}/{stepDetails.length}
                  </div>
                </div>
              </div>

              {/* Right Side - 2/3 */}
              <div className="md:w-3/4">
                {renderStep()}
                {/* Navigation buttons */}
                <div className="mt-12 flex justify-between pt-4">
                  {currentStep > 1 && (
                    <button
                      onClick={handleBack}
                      className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Back
                    </button>
                  )}
                  {currentStep <= stepDetails.length && (
                    <button
                      onClick={handleNext}
                      disabled={isNextDisabled()}
                      className={`px-6 py-2 rounded-lg transition-colors ml-auto ${isNextDisabled()
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    >
                      {currentStep === stepDetails.length ? 'Submit' : 'Next'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CTASection />
      <FAQSection />
      <Footer />
      <MobileFooterNav />

      {popupOpen && createPortal(
        <div className="fixed inset-0 z-[9999] bg-black/50">

          {/* SCROLL CONTAINER */}
          <div className="w-full h-full overflow-y-auto flex items-start sm:items-center justify-center p-2 sm:p-6">

            {/* MODAL */}
            <div className="bg-white w-full max-w-lg md:max-w-6xl 
        max-h-[95vh] overflow-y-auto 
        rounded-2xl border-[6px] md:border-[10px] border-[#d2e5fd] 
        shadow-xl p-4 md:p-10">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* LEFT */}
                <div>
                  <div className="bg-[#2c4246] text-white font-semibold text-lg md:text-xl px-4 py-3 rounded-lg mb-6">
                    Compare India's biggest universities on a single platform within two minutes.
                  </div>

                  <ul className="space-y-2 text-sm md:text-base">
                    <li>⭐ 150+ Universities</li>
                    <li>⭐ 30X comparison factors</li>
                    <li>⭐ Free expert consultation</li>
                    <li>⭐ Quick Loan facility</li>
                    <li>⭐ Celebrating 1 lac admissions</li>
                    <li>⭐ Post Admission Support</li>
                    <li>⭐ CD Exclusive Community</li>
                    <li>⭐ Job + Internship Portal</li>
                  </ul>
                </div>

                {/* RIGHT */}
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-center mb-4">
                    Top Online MBA universities comparison to placement support everything at one place
                  </h2>

                  <div className="flex flex-wrap justify-center gap-3 mb-4 text-sm text-[#5b2be1] font-medium">
                    <div>✅ No-Cost EMI From <span className="font-bold text-black">₹4,999/-</span></div>
                    <div>✅ Comparison on 30+ Factors</div>
                  </div>

                  {/* Gender */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <button
                      onClick={() => setFormData({ ...formData, gender: 'Male' })}
                      className={`p-2 border rounded ${formData.gender === 'Male' ? 'bg-blue-100 border-blue-500' : ''}`}
                    >
                      Male
                    </button>
                    <button
                      onClick={() => setFormData({ ...formData, gender: 'Female' })}
                      className={`p-2 border rounded ${formData.gender === 'Female' ? 'bg-blue-100 border-blue-500' : ''}`}
                    >
                      Female
                    </button>
                  </div>

                  {/* Inputs */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name*" className="border px-3 py-2 rounded" />

                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email*" className="border px-3 py-2 rounded" />

                    <div>
                      <div className="flex items-center border rounded overflow-hidden">
                        <span className="bg-gray-100 px-2 py-2 text-sm">🇮🇳 +91</span>
                        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Mobile Number*" className="px-2 py-2 w-full outline-none" />
                      </div>
                      <p className="text-xs text-green-500 mt-1 ml-1">We don't spam</p>
                    </div>

                    <div>
                      <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="border px-3 py-2 rounded w-full" />
                      <p className="text-xs text-green-500 mt-1 ml-1">We don't spam</p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-center gap-6 mt-10 mb-4">
                    <button onClick={handleCancel} className="px-6 py-2 bg-[#00bcd4] text-white rounded">
                      ⬅️ Back
                    </button>

                    <button onClick={handleSave} className="px-6 py-2 bg-[#00bcd4] text-white rounded">
                      Submit
                    </button>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>,
        document.body
      )}
      {otpPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center overflow-y-auto px-2 py-6">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md relative overflow-hidden">
            {/* Close button */}
            <button
              onClick={() => setOtpPopupOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content */}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-center mb-2">Verify OTP</h3>
              <p className="text-center text-sm text-gray-600 mb-6">
                We've sent a 4-digit OTP to your mobile number ending with{' '}
                <span className="font-semibold text-gray-800">{formData.phone.slice(-3)}</span>
              </p>

              {/* OTP Input */}
              <div className="mb-4">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, '').slice(0, 4));
                    setOtpError('');
                  }}
                  placeholder="Enter OTP"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={4}
                />
                {otpError && <p className="text-red-500 text-sm mt-1">{otpError}</p>}
              </div>

              {/* Resend Timer or Button */}
              <div className="flex justify-between items-center mb-6">
                {canResendOtp ? (
                  <button
                    onClick={handleResendOtp}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    Resend OTP
                  </button>
                ) : (
                  <span className="text-sm text-gray-500">Resend OTP in {resendTimer}s</span>
                )}
              </div>

              {/* Verify Button */}
              <button
                onClick={handleVerifyOtp}
                disabled={otp.length !== 4}
                className={`w-full py-3 rounded-lg font-medium text-white transition-all duration-200 ${otp.length !== 4
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SuggestedUniversity;
