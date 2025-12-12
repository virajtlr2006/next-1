'use client';

import { singleServiceAction } from '@/actions/serviceActions';
import { service } from '@/db/schema';
import { useCurrentUser } from '@/hook/hook';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {

    // ℹ️State to hold the service details
    const [service, setservice] = useState<service | null>(null)

    // Email of the current user
    const { email } = useCurrentUser()

    // Get the service ID from the URL parameters
    const { id } = useParams();
    // console.log(id);

    useEffect(() => {
        // ℹ️Fetch service details when id/email changes.
        if (id && email) fetchserviceByID(id as string);
    }, [id, email])


    const fetchserviceByID = async (id: string) => {

        try {
            // ℹ️Fetch single service based on id
            const single = await singleServiceAction(id) as service | null;
            // console.log(single);

            // ☑️Update state with fetched service
            setservice(single);
        } catch (error) {
            // Handle error if fetching fails
            console.error("Could not fetch the service", error);
        }
    }
    return (
        <div>
            <a href='/allservice'>Back To All Services</a>
            {/* Service Details */}
            {service ? (
                <div className='ml-10'>
                    <h1 className='text-2xl'>{service.service_name}</h1>
                    <img className='h-100 w-100' src={service.service_image || ""} alt={service.service_name} />
                    <p>Category: {service.category}</p>
                    <p>Description: {service.desc}</p>
                    <p>Price: ${service.price}</p>
                    <p>Contact: {service.email}</p>
                </div>
            ) : (
                // Loading state
                <p>Loading service details...</p>
            )}
        </div>
    )
}

export default page