'use client'

import { myServicesAction } from '@/actions/serviceActions'
import { service } from '@/db/schema'
import { useCurrentUser } from '@/hook/hook'
import { useEffect, useState } from 'react'

const page = () => {

    //⏳ State to hold services and error message
    const [services, setservices] = useState<service[] | null >(null)
    
    // Email of current user
    const {email} = useCurrentUser()

    // 
    useEffect(() => {
        // Fetch my services when email changes
        myServices(email as string)
    }, [email])
    
        // Function to fetch services by email
    const myServices = async (email:string) => {
        // console.log(email)

        // ⁉️If no email, return early
        if(!email) return
        // 👉Fetched my services from my server action
        const myfetchedServices = await myServicesAction(email) as service[]
        // Set fetched services to state
        setservices(myfetchedServices)
    }
  return (
    <div>
        {/* Services list */}
        {services && services.length > 0 ? (
            <div>
                <h1 className='text-2xl font-bold mb-4'>My Services</h1>
                <ul>
                    {/* Service items */}
                    {services.map((service) => (
                        <li key={service.service_id} className="border p-4 mb-4 rounded">
                            <h2 className="text-xl font-semibold">{service.service_name}</h2>
                            <img src={service.service_image || "Image"} alt={service.service_name} className="w-32 h-32 object-cover my-2"/>
                            <p className="text-gray-700">{service.category}</p>
                            <p className="text-green-600 font-bold">${service.price}</p>
                        </li>
                    ))}
                </ul>
            </div>
        ) : (
            //❗ Message if no services found
            <p>No services found.</p>
        )}
    </div>
  )
}

export default page