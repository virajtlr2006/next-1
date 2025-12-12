'use client';

import { service } from '@/db/schema';
import { useParams, useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { fetchservicesAction } from '@/actions/serviceActions';

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
        const all = await fetchservicesAction() as service[]
        // 🚀Set the fetched services to state
        setFetchallServices(all)
    }

    return (
        <div>
            <h1 className='text-2xl'>Explore all services at a single spot</h1>
            {/* Mapped Services */}
            {fetchallServices?.map((serviceItem) => (
                <a key={serviceItem.service_id} href={`singleservice/${serviceItem.service_id}`} className='flex gap-10'>
                    <Card key={serviceItem.service_id}>
                        <CardHeader>
                            <CardTitle>{serviceItem.service_name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <img className='h-50 w-50' src={serviceItem.service_image || ""} alt={serviceItem.service_name} />
                        </CardContent>
                        <CardFooter>
                            <p>{serviceItem.category}</p>
                            <p>Price: ${serviceItem.price}</p>
                        </CardFooter>
                    </Card>
                </a>
            ))}
        </div>
    )
}

export default page