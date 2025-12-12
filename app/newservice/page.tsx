'use client'

import { newServiceAction } from '@/actions/serviceActions'
import { service } from '@/db/schema'
import { useCurrentUser } from '@/hook/hook'
import { is } from 'drizzle-orm'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"

const page = () => {

    // Error stores in isError Variable
    const [isError, setIsError] = useState<string | null>(null)

    // Get Current User Email
    const { email } = useCurrentUser()
    // console.log(email)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<service>()

    // New Service Function
    const newService: SubmitHandler<service> = async (data: service) => {
        // console.log(data)
        try {
            // If no email then show error
            if (!email) {
                setIsError("SignUp first to add Services")
                return
            }
            // Add email to data
            const newdata = { ...data, email: email || "" }
            // Call New Service Action to add service
            await newServiceAction(newdata)
        } catch (error) {
            // Set Error Message to isError Variable
            setIsError("Error adding service")
        }
    }

    return (
        <div>
            {/* Form for adding a new service */}
            <form onSubmit={handleSubmit(newService)}>

                <input placeholder='Service Name' {...register("service_name", { required: true })} />
                {errors.service_name && <span>This field is required</span>}

                <input placeholder='Category' {...register("category", { required: true })} />
                {errors.category && <span>This field is required</span>}

                <input placeholder='Service Image' {...register("service_image", { required: true })} />
                {errors.service_image && <span>This field is required</span>}

                <input placeholder='Description' {...register("desc", { required: true })} />
                {errors.desc && <span>This field is required</span>}

                <input placeholder='Price' {...register("price", { required: true })} />
                {errors.price && <span>This field is required</span>}

                {/* Submit button to add a new service */}
                <input type="submit" />

                {/* Show error message in frontend if any  */}
                {isError && <p>{isError}</p>}
            </form>
        </div>
    )
}

export default page