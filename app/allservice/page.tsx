'use client';

import { service } from '@/db/schema';
import { useParams, useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'
import { fetchservicesAction } from '@/actions/serviceActions';
import FetchServiceCard from '@/components/ui/FetchServiceCard';

const page = () => {

    const router = useRouter()

    // ⏳Loading state for fetched services
    const [fetchallServices, setFetchallServices] = useState<service[] | null>(null)

    // Id from params
    const { id } = useParams();

    useEffect(() => {
        fetchServices()
    }, [])

    // 🌐 Fetch All Services
    const fetchServices = async () => {
        // 🥡Fetch all services from the action
        const all = await fetchservicesAction() as service[] || null
        // 🚀Set the fetched services to state
        setFetchallServices(all)
    }

    return (
        <div>
            <h1 className='text-2xl'>Explore all services at a single spot</h1>
            {/* Mapped Services */}
            {fetchallServices && fetchallServices?.map((serviceItem) => (
                // Service Card Component
                <a href={`/singleservice/${serviceItem.service_id}`} key={serviceItem.service_id}>
                    <FetchServiceCard
                        key={serviceItem.service_id}
                        serviceItem={serviceItem}
                        service_image={serviceItem.service_image || ""}
                        service_name={serviceItem.service_name}
                        category={serviceItem.category}
                        price={serviceItem.price}
                    />
                </a>
            ))}
        </div>
    )
}

export default page