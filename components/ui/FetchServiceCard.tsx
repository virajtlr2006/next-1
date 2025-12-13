'use client'

import { service } from '@/db/schema';
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './card';

// Props interface
interface FetchServiceCardProps {
    serviceItem: service;
    service_image: string;
    service_name: string;
    category: string;
    price: number;
}
// FetchServiceCard component
const FetchServiceCard = ({ serviceItem, service_image, service_name, category, price }: FetchServiceCardProps) => {

    return (
        <div>
            {/* Service card */}
            {serviceItem &&
            // Card component to display service details
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
            }
        </div>
    )
}

// Export component
export default FetchServiceCard