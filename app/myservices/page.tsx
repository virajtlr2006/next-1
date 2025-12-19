'use client'

import { deleteServiceAction, myServicesAction } from '@/actions/serviceActions'
import { service } from '@/db/schema'
import { useCurrentUser } from '@/hook/hook'
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
import { Edit, Trash2, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import FetchServiceCard from '@/components/ui/FetchServiceCard'

const page = () => {

  // ⏳ State to hold services
  const [services, setServices] = useState<service[] | null>(null)

  // 🔍 Search state
  const [searchService, setSearchService] = useState('')

  // Email of current user
  const { email } = useCurrentUser()

  const router = useRouter()

  // 📥 Fetch services when email is available
  useEffect(() => {
    if (email) {
      fetchMyServices(email)
    }
  }, [email])

  // 🌐 Fetch services by email
  const fetchMyServices = async (email: string) => {
    const myFetchedServices = await myServicesAction(email) as service[]
    setServices(myFetchedServices)
  }

  // ❌ Delete service
  const deleteService = async (id: string) => {
    const response = await deleteServiceAction(id)
    if ((response as { success: boolean }).success) {
      fetchMyServices(email as string)
    }
  }

  // ✏️ Update service
  const updateService = (id: string) => {
    router.push(`/updateservice/${id}`)
  }

  // 🔍 Filtered services logic
  const filteredServices = services?.filter((serviceItem) =>
    serviceItem.service_name
      .toLowerCase()
      .includes(searchService.toLowerCase())
  )

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">My Services</h1>

      {/* 🔍 Search Box */}
      <div className="relative mb-6 max-w-md">
        <input
          type="search"
          placeholder="Search My Services"
          value={searchService}
          onChange={(e) => setSearchService(e.target.value)}
          className="w-full border p-2 pl-10 rounded"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
      </div>

      {/* 🧩 Services List */}
      {filteredServices && filteredServices.length > 0 ? (
        <ul>
          {filteredServices.map((service) => (
            <li key={service.service_id} className="border p-4 mb-4 rounded">

              <a href={`/singleservice/${service.service_id}`}>
                <FetchServiceCard
                  serviceItem={service}
                  service_image={service.service_image || ""}
                  service_name={service.service_name}
                  category={service.category}
                  price={service.price}
                />
              </a>

              {/* ✏️ Update Button */}
              <Button
                onClick={() => updateService(service.service_id.toString())}
                className="mt-3 flex gap-2"
              >
                <Edit className="w-4 h-4" /> Update Service
              </Button>

              {/* ❌ Delete Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="mt-2 flex gap-2">
                    <Trash2 className="w-4 h-4" /> Delete Service
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete your service.
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
      ) : (
        <p className="text-gray-500">No services found.</p>
      )}

    </div>
  )
}

export default page
