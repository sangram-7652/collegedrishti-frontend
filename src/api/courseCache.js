import api from "./axios";

const CACHE_KEY = "coursesWithSubCoursesCache:v2";
const CACHE_TTL = 60 * 60 * 1000;

let inFlightRequest = null;

const normalizeSubCourse = (sub, idx) => {
  const rawName = sub?.slug || sub?.sub_name || sub?.name || "";
  const generatedSlug = rawName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  return {
    ...sub,
    id: sub.id || sub.sub_co_id || idx,
    sub_name: sub.sub_name || sub.name || `Sub ${idx + 1}`,
    slug: sub.slug || generatedSlug || `sub-${idx}`,
    duration: sub.duration || "2 Years",
  };
};

const normalizeCourse = (course, idx) => {
  const rawSubs = course.sub_courses || course.subCourses || [];

  return {
    ...course,
    course_id: course.course_id || course.id || idx,
    course_name: course.course_name || course.name,
    sub_courses: rawSubs.map(normalizeSubCourse),
  };
};

const readCache = () => {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }
  } catch {
    localStorage.removeItem(CACHE_KEY);
  }

  return null;
};

export const getCoursesWithSubCourses = async () => {
  const cached = readCache();
  if (cached) return cached;

  if (!inFlightRequest) {
    inFlightRequest = api
      .get("/courses")
      .then((res) => {
        const courseArray = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
            ? res.data.data
            : [];
        const normalized = courseArray.map(normalizeCourse);

        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ timestamp: Date.now(), data: normalized })
        );

        return normalized;
      })
      .finally(() => {
        inFlightRequest = null;
      });
  }

  return inFlightRequest;
};
