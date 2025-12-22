'use client'

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useCurrentUser } from '@/hook/hook'
import { bookServiceAction } from '@/actions/bookServiceAction'
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Mail,
  User,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

type BookingForm = {
  booking_date: string
}

const Book = () => {
  const { id } = useParams<{ id: string }>()
  const { email, fullName } = useCurrentUser()
  const router = useRouter()

  const [bookingSuccess, setBookingSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingForm>()

  const onSubmit: SubmitHandler<BookingForm> = async (formData) => {
    if (!id || !email || !fullName) {
      alert('User not authenticated')
      return
    }

    const bookingData = {
      service_id: Number(id),
      user_email: email,
      user_name: fullName,
      booking_date: formData.booking_date,
    }

    const result = await bookServiceAction(id, bookingData)

    if (result?.success) {
      reset()
      setBookingSuccess(true)
    } else {
      alert('Booking Failed')
    }
  }

  return (
    <div className="min-h-screen bg-black">

      {/* Header */}
      <section className="py-10 bg-gradient-to-b from-black via-slate-900/20 to-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(85,140,255,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 relative">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-slate-gray hover:text-white mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              Book Your Service
            </h1>
            <p className="text-lg text-slate-gray mt-2">
              Complete your booking in just a few clicks
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8">

            {/* LEFT: FORM / SUCCESS */}
            <div className="lg:col-span-3">
              <Card className="border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-8 rounded-2xl shadow-xl">

                {!bookingSuccess ? (
                  <>
                    <h2 className="text-2xl font-semibold text-white mb-6">
                      Booking Details
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                      {/* Email */}
                      <div className="space-y-2">
                        <label className="text-slate-300 flex items-center gap-2">
                          <Mail className="w-4 h-4 text-navy" />
                          Email Address
                        </label>
                        <div className="h-12 flex items-center px-4 rounded-lg bg-slate-800/40 border border-slate-700 text-slate-gray">
                          {email}
                        </div>
                      </div>

                      {/* Name */}
                      <div className="space-y-2">
                        <label className="text-slate-300 flex items-center gap-2">
                          <User className="w-4 h-4 text-navy" />
                          Full Name
                        </label>
                        <div className="h-12 flex items-center px-4 rounded-lg bg-slate-800/40 border border-slate-700 text-slate-gray">
                          {fullName}
                        </div>
                      </div>

                      {/* Date */}
                      <div className="space-y-2">
                        <label className="text-slate-300 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-navy" />
                          Booking Date
                        </label>
                        <input
                          type="date"
                          {...register('booking_date', { required: 'Booking date is required' })}
                          className="w-full h-12 rounded-lg bg-slate-800/60 border border-slate-700 px-4 text-white focus:border-navy"
                        />
                        {errors.booking_date && (
                          <p className="text-red-400 text-sm">
                            {errors.booking_date.message}
                          </p>
                        )}
                      </div>

                      {/* Info */}
                      <div className="bg-navy/10 border border-navy/30 rounded-lg p-4 flex gap-3">
                        <CheckCircle className="w-5 h-5 text-navy mt-0.5" />
                        <p className="text-sm text-slate-300">
                          You’ll receive a confirmation email once the provider confirms your booking.
                        </p>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="
                          w-full h-12 rounded-lg bg-navy text-white font-semibold
                          hover:bg-navy/90 transition
                          hover:shadow-lg hover:shadow-navy/40
                          disabled:opacity-50
                        "
                      >
                        {isSubmitting ? 'Booking...' : 'Book Service'}
                      </button>
                    </form>
                  </>
                ) : (
                  /* ✅ SUCCESS STATE */
                  <div className="text-center py-10 space-y-6">
                    <CheckCircle className="w-16 h-16 text-navy mx-auto" />
                    <h2 className="text-2xl font-bold text-white">
                      Booking Confirmed!
                    </h2>
                    <p className="text-slate-gray max-w-md mx-auto">
                      Your booking has been placed successfully. The service provider
                      will contact you shortly.
                    </p>
                    <Button
                      onClick={() => router.push(`/service/${id}`)}
                      className="bg-navy hover:bg-navy/90"
                    >
                      Back to Service
                    </Button>
                  </div>
                )}
              </Card>
            </div>

            {/* RIGHT: INFO CARD */}
            <div className="lg:col-span-2">
              <Card className="border border-slate-800 bg-slate-900/40 p-6 rounded-2xl h-fit space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  What Happens Next?
                </h3>

                <ul className="space-y-3 text-sm text-slate-gray">
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-navy" />
                    Provider reviews your booking
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-navy" />
                    Confirmation via email or call
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-navy" />
                    Service delivered on selected date
                  </li>
                </ul>
              </Card>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Book
