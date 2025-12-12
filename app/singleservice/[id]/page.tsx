'use client';

import { deleteServiceAction, singleServiceAction } from '@/actions/serviceActions';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { service } from '@/db/schema';
import { useCurrentUser } from '@/hook/hook';
import { Trash2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {

    // ℹ️State to hold the service details
    const [services, setservices] = useState<service | null>(null)
    const [isOwner, setIsOwner] = useState(false)
    const [errorMessage, seterrorMessage] = useState<string | null>(null)

    const router = useRouter()

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
            if (email && single) {
                setIsOwner(email === single.email)
            }
            // ☑️Update state with fetched service
            setservices(single);

        } catch (error) {
            // Handle error if fetching fails
            console.error("Could not fetch the service", error);
        }
    }

    // Delete service function
    const deleteService = async (id: string) => {
        // 👉Call delete service action
        const deleteServiceResponse = await deleteServiceAction(id)
        // ‼️If deletion fails, log error
        if ((deleteServiceResponse as { success: boolean }).success === false) {
            console.log((deleteServiceResponse as { message: string }).message)
        } else {
            // 🔄Refresh services list after deletion
            router.push('/allservice')
        }
    }

    return (
        <div>
            {/* Back to all services link */}
            <a href='/allservice'>Back To All Services</a>
            {/* Service Details */}
            {services ? (
                //🖥️ Display service details
                <a className='ml-10'>
                    <h1 className='text-2xl'>{services.service_name}</h1>
                    <img className='h-100 w-100' src={services.service_image || ""} alt={services.service_name} />
                    <p>Category: {services.category}</p>
                    <p>Description: {services.desc}</p>
                    <p>Price: ${services.price}</p>
                    <p>Contact: {services.email}</p>

                    {/* ➖ Delete button for owner */}
                    {isOwner &&
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    className="
                          bg-gradient-to-r from-red-500 to-pink-500 
                          text-white px-6 py-3 rounded-xl font-semibold 
                          flex items-center gap-2 hover:opacity-90 transition-all
                        ">
                                    <Trash2 className="w-5 h-5" /> Delete
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="bg-[#0e1a2a] border border-white/20 text-white">
                                <DialogHeader>
                                    <DialogTitle className="text-red-400">Are you absolutely sure?</DialogTitle>
                                    <DialogDescription className="text-slate-400">
                                        This action is permanent and cannot be undone.
                                    </DialogDescription>
                                </DialogHeader>

                                <Button
                                    // Delete service on click
                                    onClick={() => deleteService(String(services.service_id))}
                                    className="bg-red-600 hover:bg-red-700 text-white w-full mt-4"
                                >
                                    Confirm Delete
                                </Button>

                            </DialogContent>
                        </Dialog>
                    }
                </a>

            ) : (
                // Loading state
                <p>Loading service details...</p>
            )}
        </div>
    )
}

export default page