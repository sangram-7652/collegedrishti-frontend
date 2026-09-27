import React, { lazy, Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api from '../api/axios'

import SEO from '@/components/common/SEO'
import { courseMetadata } from '@/data/courseMetaData'

import Header from '../pages/Header'
import MobileMenu from '../pages/MobileMenu'
import CourseHero from '../pages/CourseHero'
import InfoWithPodcast from '../pages/InfoWithPodcast'

const Section3 = lazy(() => import('../pages/Section3'))
const Section4 = lazy(() => import('../pages/Section4'))
const Section5 = lazy(() => import('../pages/Section5'))
const Section6 = lazy(() => import('../pages/Section6'))
const Section7 = lazy(() => import('../pages/Section7'))
const Section8 = lazy(() => import('../pages/Section8'))
const Section9 = lazy(() => import('../pages/Section9'))
const Section10 = lazy(() => import('../pages/Section10'))
const Section11 = lazy(() => import('../pages/Section11'))
const CTASection = lazy(() => import('../pages/CTASection'))
const FAQSection = lazy(() => import('../pages/FAQSection'))

import Footer from './Footer'
import MobileFooterNav from './MobileFooterNav'

const CoursePage = () => {
  const { slug } = useParams()

  /* ================= SEO METADATA ================= */

  const metadata = courseMetadata[slug]

  /* ================= FETCH COURSE ================= */

  const fetchCourse = async () => {
    const response = await api.get(`/course/${slug}`)
    return response.data
  }

  /* ================= QUERY ================= */

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['coursepage', slug],
    queryFn: fetchCourse,
    staleTime: 10 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false
  })

  /* ================= DATA ================= */

  const course = data?.data || null

  const specializations =
    data?.specializations || data?.data?.specializations || []

  const universities = data?.universities || data?.data?.universities || []

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white'>
        <div className='text-center'>
          <div className='w-14 h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4'></div>

          <p className='text-lg font-semibold text-gray-700'>
            Loading Course...
          </p>
        </div>
      </div>
    )
  }

  /* ================= ERROR ================= */

  if (isError) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white'>
        <div className='text-center px-4'>
          <h2 className='text-2xl font-bold text-red-500 mb-2'>
            Failed to Load Course
          </h2>

          <p className='text-gray-500'>
            {error?.message || 'Something went wrong'}
          </p>
        </div>
      </div>
    )
  }

  /* ================= NO COURSE ================= */

  if (!course) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white'>
        <h2 className='text-2xl font-bold text-gray-700'>Course Not Found</h2>
      </div>
    )
  }

  /* ================= PAGE ================= */

  return (
    <main className='bg-white text-gray-900 animate-fadeIn'>
      {/* ================= SEO ================= */}

      {metadata && (
        <SEO
          title={metadata.title}
          description={metadata.description}
          keywords={metadata.title}
          canonical={`https://collegedrishti.com/course/${slug}`}
          image={
            course.image
              ? `https://api.collegedrishti.com/${course.image}`
              : 'https://collegedrishti.com/default-og-image.jpg'
          }
        />
      )}

      {/* ================= HEADER ================= */}

      <div className='hidden md:block'>
        <Header />
      </div>

      <div className='block md:hidden'>
        <MobileMenu />
      </div>

      {/* ================= HERO ================= */}

      <div id='about' className='scroll-mt-24'>
        <CourseHero course={course} />
      </div>

      {/* ================= MAIN CONTENT ================= */}

      <section className='w-full font-sans overflow-x-hidden'>
        {/* INFO */}

        <InfoWithPodcast data={course} />

        {/* COURSES */}

        <div id='courses' className='scroll-mt-24'>
          <Suspense fallback={<div className='h-20 bg-white' />}>
            <Section3 course={course} />
          </Suspense>
        </div>

        {/* FEES */}

        <div id='fees' className='scroll-mt-24'>
          <Suspense fallback={<div className='h-20 bg-white' />}>
            <Section4 courseSlug={slug} />
          </Suspense>
        </div>

        {/* PLACEMENTS */}

        <div id='placements' className='scroll-mt-24'>
          <Suspense fallback={<div className='h-20 bg-white' />}>
            <Section5 universities={universities} />
          </Suspense>
        </div>

        {/* SPECIALIZATIONS */}

        <Suspense fallback={<div className='h-20 bg-white' />}>
          <Section6 course={course} specializations={specializations} />
        </Suspense>

        {/* REVIEWS */}

        <div id='reviews' className='scroll-mt-24'>
          <Suspense fallback={<div className='h-20 bg-white' />}>
            <Section7 course={course} />
          </Suspense>
        </div>

        {/* ADMISSIONS */}

        <div id='admissions' className='scroll-mt-24'>
          <Suspense fallback={<div className='h-20 bg-white' />}>
            <Section8 course={course} />
          </Suspense>
        </div>

        {/* APPROVALS */}

        <div id='approvals' className='scroll-mt-24'>
          <Suspense fallback={<div className='h-20 bg-white' />}>
            <Section9 data={universities} />
          </Suspense>
        </div>

        {/* EXTRA SECTIONS */}

        <Suspense fallback={<div className='h-20 bg-white' />}>
          <Section10 course={course} />
        </Suspense>

        <Suspense fallback={<div className='h-20 bg-white' />}>
          <Section11 course={course} />
        </Suspense>

        {/* CTA */}

        <Suspense fallback={<div className='h-20 bg-white' />}>
          <CTASection course={course} />
        </Suspense>

        {/* FAQ */}

        <Suspense fallback={<div className='h-20 bg-white' />}>
          <FAQSection subCourseId={course?.sub_co_id} />
        </Suspense>
      </section>

      {/* ================= FOOTER ================= */}

      <Footer />
      <MobileFooterNav />
    </main>
  )
}

export default CoursePage
