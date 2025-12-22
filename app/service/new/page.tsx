'use client'

import { CreateServiceAction } from '@/actions/serviceActions'
import { Card } from '@/components/ui/card'
import { service } from '@/db/schema'
import { useCurrentUser } from '@/hook/hook'
import { useRouter } from "next/navigation"
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"


const page = () => {

  const [isError, setIsError] = useState<string | null>(null)

  const { email } = useCurrentUser()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<service>()

  const handleCtreateService: SubmitHandler<service> = async (data: service) => {
    try {
      if (!email) {
        setIsError("Sign up first to add services")
        return
      }
      const newdata = { ...data, email: email || "" }
      await CreateServiceAction(newdata)
      router.push('/service')
    } catch (error) {
      setIsError("Error adding service")
    }
  }

  return (
    <div className="min-h-screen bg-black">

      {/* Header */}
      <section className="py-14 bg-gradient-to-b from-black via-slate-900/30 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(85,140,255,0.12),transparent_55%)]" />
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            Add New Service
          </h1>
          <p className="mt-3 text-lg text-slate-gray max-w-2xl mx-auto">
            Share your expertise and grow your business by listing a new service
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
            <Card className="mt-6 w-192 mx-auto border-slate-800 bg-slate-900/30 backdrop-blur-sm p-6">
              <h3 className="text-white font-semibold mb-3">Before you submit</h3>
              <ul className="space-y-2 text-sm text-slate-gray">
                <li className="flex items-start gap-2">
                  <span className="text-navy mt-0.5">•</span>
                  <span>Ensure all information is accurate and up-to-date</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-navy mt-0.5">•</span>
                  <span>Use high-quality images that represent your service</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-navy mt-0.5">•</span>
                  <span>Write a clear and detailed description of what you offer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-navy mt-0.5">•</span>
                  <span>Set competitive pricing based on market standards</span>
                </li>
              </ul>
            </Card>
          <Card className="max-w-3xl mx-auto border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-8 rounded-2xl shadow-xl mt-10">

            <form onSubmit={handleSubmit(handleCtreateService)} className="space-y-7">

              {/* Service Name */}
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Service Name <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="e.g. Professional House Cleaning"
                  {...register("service_name", { required: true })}
                  className="w-full h-12 rounded-lg bg-slate-800/60 border border-slate-700 px-4 text-white placeholder:text-slate-500 focus:border-navy focus:ring-1 focus:ring-navy transition"
                />
                {errors.service_name && (
                  <p className="text-red-400 text-sm mt-1">This field is required</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("category", { required: true })}
                  className="w-full h-12 rounded-lg bg-slate-800/60 border border-slate-700 px-4 text-white focus:border-navy focus:ring-1 focus:ring-navy transition"
                >
                  <option value="">-- Select a Service --</option>

                  <option value="electrician">Electrician</option>
                  <option value="plumber">Plumber</option>
                  <option value="carpenter">Carpenter</option>
                  <option value="painter">Painter</option>

                  <option value="home-cleaning">Home Cleaning</option>
                  <option value="bathroom-cleaning">Bathroom Cleaning</option>
                  <option value="sofa-cleaning">Sofa & Carpet Cleaning</option>
                  <option value="pest-control">Pest Control</option>

                  <option value="ac-repair">AC Repair & Service</option>
                  <option value="tv-repair">TV Repair</option>
                  <option value="washing-machine">Washing Machine Repair</option>
                  <option value="refrigerator">Refrigerator Repair</option>

                  <option value="maid">Maid Service</option>
                  <option value="cook">Cook Service</option>
                  <option value="babysitter">Babysitter / Nanny</option>
                  <option value="elder-care">Elder Care</option>

                  <option value="bike-repair">Bike Repair</option>
                  <option value="car-wash">Car Wash</option>
                  <option value="car-repair">Car Repair</option>

                  <option value="doctor-home">Doctor at Home</option>
                  <option value="nurse-home">Nurse at Home</option>
                  <option value="physiotherapy">Physiotherapy</option>

                  <option value="packers-movers">Packers & Movers</option>
                  <option value="pet-grooming">Pet Grooming</option>
                  <option value="cctv-installation">CCTV Installation</option>
                </select>
                {errors.category && (
                  <p className="text-red-400 text-sm mt-1">This field is required</p>
                )}
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Service Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="https://example.com/image.jpg"
                  {...register("service_image", { required: true })}
                  className="w-full h-12 rounded-lg bg-slate-800/60 border border-slate-700 px-4 text-white placeholder:text-slate-500 focus:border-navy focus:ring-1 focus:ring-navy transition"
                />
                {errors.service_image && (
                  <p className="text-red-400 text-sm mt-1">This field is required</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Describe your service in detail..."
                  {...register("desc", { required: true })}
                  rows={4}
                  className="w-full rounded-lg bg-slate-800/60 border border-slate-700 px-4 py-3 text-white placeholder:text-slate-500 focus:border-navy focus:ring-1 focus:ring-navy transition"
                />
                {errors.desc && (
                  <p className="text-red-400 text-sm mt-1">This field is required</p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="e.g. 499"
                  {...register("price", { required: true })}
                  className="w-full h-12 rounded-lg bg-slate-800/60 border border-slate-700 px-4 text-white placeholder:text-slate-500 focus:border-navy focus:ring-1 focus:ring-navy transition"
                />
                {errors.price && (
                  <p className="text-red-400 text-sm mt-1">This field is required</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="
                  w-full h-12 rounded-lg
                  bg-navy text-white font-semibold
                  hover:bg-navy/90
                  transition-all duration-300
                  hover:shadow-lg hover:shadow-navy/40
                "
              >
                Create Service
              </button>

              {isError && (
                <p className="text-red-400 text-center mt-2">{isError}</p>
              )}

            </form>
          </Card>
          
        </div>
      </section>

    </div>
  )
}

export default page
