'use client'

import { deleteServiceAction, myServicesAction } from '@/actions/serviceActions'
import { service } from '@/db/schema'
import { useCurrentUser } from '@/hook/hook'
import { numeric } from 'drizzle-orm/pg-core'
import { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

const page = () => {

    //⏳ State to hold services and error message
    const [services, setservices] = useState<service[] | null>(null)

    // Email of current user
    const { email } = useCurrentUser()

    const router = useRouter()

    // 
    useEffect(() => {
        // Fetch my services when email changes
        myServices(email as string)
    }, [email])

    // Function to fetch services by email
    const myServices = async (email: string) => {
        // console.log(email)

        // ⁉️If no email, return early
        if (!email) return
        // 👉Fetched my services from my server action
        const myfetchedServices = await myServicesAction(email) as service[]
        // Set fetched services to state
        setservices(myfetchedServices)
    }

    const deleteService = async (id: string) => {
        // 👉Call delete service action
        const deleteServiceResponse = await deleteServiceAction(id)
        // ‼️If deletion fails, log error
        if ((deleteServiceResponse as { success: boolean }).success === false) {
            console.log((deleteServiceResponse as { message: string }).message)
        } else {
            // 🔄Refresh services list after deletion
            myServices(email as string)
        }
    }

        const UpdateService = async (id: string) => {
        router.push(`/updateservice/${id}`)
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
                                <a href={`/singleservice/${service.service_id}`} className="block hover:bg-gray-100 p-2 rounded group">
                                    <h2 className="text-xl font-semibold">{service.service_name}</h2>
                                    <img src={service.service_image || "Image"} alt={service.service_name} className="w-32 h-32 object-cover my-2" />
                                    <p className="text-gray-700">{service.category}</p>
                                    <p className="text-green-600 font-bold">${service.price}</p>
                                </a>

                                 <Button
                                onClick={() => UpdateService(String(services.at(0)?.service_id))}
                                className="
                      bg-gradient-to-r from-blue-500 to-cyan-500 
                      text-white px-6 py-3 rounded-xl font-semibold 
                      flex items-center gap-2 hover:opacity-90 transition-all
                    "
                            >
                                <Edit className="w-5 h-5" /> Update Property
                            </Button>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button className="
                          w-full py-2 px-4 
                          bg-gradient-to-r from-red-500/20 to-red-600/20
                          border border-red-500/40 
                          text-red-300 rounded-lg font-semibold 
                          hover:bg-red-600/30 hover:border-red-500/60 
                          transition-all duration-300 group-hover:text-red-200
                          flex items-center justify-center gap-2
                        ">
                                            <Trash2 className='w-4 h-4' /> Delete Service
                                        </button>
                                    </DialogTrigger>

                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                                            <DialogDescription>
                                                This action cannot be undone. This will permanently delete your
                                                service and remove your data from our servers.
                                            </DialogDescription>
                                        </DialogHeader>

                                        <Button
                                            onClick={() => deleteService(service.service_id.toString())}
                                            variant="destructive"
                                            className="w-full"
                                        >
                                            Delete Permanently
                                        </Button>
                                    </DialogContent>
                                </Dialog>
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