'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useCurrentUser } from '@/hook/hook'
import { bookServiceAction } from '@/actions/bookServiceAction'

type BookingForm = {
  booking_date: string
}

const Book = () => {

  // Get service ID from route
  const { id } = useParams<{ id: string }>()

  // Logged-in user
  const { email, fullName } = useCurrentUser()
  const router = useRouter()

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingForm>()

  // Submit handler
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

    //Booking data send to backend
    const result = await bookServiceAction(id, bookingData)

    //If result is true service booked successfully
    if (result?.success) {
            reset()
      router.push(`/service/${id}`)
    }
    //If booking failed
    else {
      alert('Booking Failed')
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Book Service</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* User Email */}
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <p className="font-medium">{email}</p>
        </div>

        {/* User Name */}
        <div>
          <label className="text-sm text-gray-600">Name</label>
          <p className="font-medium">{fullName}</p>
        </div>

        {/* Booking Date */}
        <div>
          <input
            type="date"
            {...register('booking_date', {
              required: 'Booking date is required',
            })}
            className="w-full border p-2 rounded"
          />
          {errors.booking_date && (
            <p className="text-red-500 text-sm">
              {errors.booking_date.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-2 rounded disabled:opacity-60"
        >
          {isSubmitting ? 'Booking...' : 'Book Service'}
        </button>

      </form>
    </div>
  )
}

export default Book
