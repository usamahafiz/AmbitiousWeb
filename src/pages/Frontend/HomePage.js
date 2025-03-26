import React from 'react'
import Hero from '../../components/hero'
import CardSection from '../../components/cardsection'
import Premium from '../../components/premium'
import Testimonials from '../../components/testimonial'
import FormAuth from '../../components/formauth'
import Project from '../../components/ourTrack'

export default function HomePage() {
  return (
    <>
      <Hero />
      <CardSection />
      <Project />
      <Premium />
      <Testimonials />
      <FormAuth />
    </>
  )
}
