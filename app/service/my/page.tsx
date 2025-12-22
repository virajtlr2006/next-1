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

  const [services, setServices] = useState<service[] | null>(null)
  const [searchService, setSearchService] = useState('')
  const { email } = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    if (email) fetchMyServices(email)
  }, [email])

  const fetchMyServices = async (email: string) => {
    const myFetchedServices = await myServicesAction(email) as service[]
    setServices(myFetchedServices)
  }

  const deleteService = async (id: string) => {
    const response = await deleteServiceAction(id)
    if ((response as { success: boolean }).success) {
      fetchMyServices(email as string)
    }
  }

  const updateService = (id: string) => {
    router.push(`/updateservice/${id}`)
  }

  const filteredServices = services?.filter((serviceItem) =>
    serviceItem.service_name.toLowerCase().includes(searchService.toLowerCase())
  )

  return (
    <div className="p-6">

      {/* Header */}
      <section className="py-12 bg-gradient-to-b from-black via-slate-900/20 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(85,140,255,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            My Services
          </h1>
          <p className="text-slate-gray">
            Manage your bookings, track history, and view subscriptions
          </p>
        </div>
      </section>

      {/* Search */}
      <div className="relative max-w-2xl mx-auto mt-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-gray" />
        <input
          type="search"
          placeholder="Search for services..."
          value={searchService}
          onChange={(e) => setSearchService(e.target.value)}
          className="w-full border bg-slate-900/50 border-slate-800 text-white pl-12 pr-4 py-5 placeholder:text-slate-gray focus:border-navy rounded-lg text-base"
        />
      </div>

      {/* Grid */}
      {filteredServices && filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filteredServices.map((service) => (
            <div key={service.service_id} className="flex flex-col">

              <a href={`/singleservice/${service.service_id}`}>
                <FetchServiceCard
                  serviceItem={service}
                  service_image={service.service_image || ""}
                  service_name={service.service_name}
                  category={service.category}
                  price={service.price}
                />
              </a>

              {/* Buttons */}
              <div className="flex gap-3 mt-3">

                {/* Update */}
                <Button
                  onClick={() => updateService(service.service_id.toString())}
                  size="sm"
                  className="
                    flex-1
                    bg-slate-800
                    text-slate-200
                    hover:bg-navy
                    hover:text-white
                    border border-slate-700
                    transition-all duration-300
                    hover:shadow-md hover:shadow-navy/40
                  "
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Update
                </Button>

                {/* Delete */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="
                        flex-1
                        bg-slate-900
                        text-red-400
                        border border-slate-800
                        hover:bg-red-500/10
                        hover:text-red-500
                        transition-all duration-300
                        hover:shadow-md hover:shadow-red-500/30
                      "
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="bg-slate-900 border border-slate-800 rounded-xl">
                    <DialogHeader className="text-center">
                      <DialogTitle className="text-xl font-bold text-red-500">
                        ⚠️ Confirm Delete
                      </DialogTitle>
                      <DialogDescription className="text-slate-gray">
                        This action cannot be undone. Your service will be permanently removed.
                      </DialogDescription>
                    </DialogHeader>

                    <Button
                      onClick={() => deleteService(service.service_id.toString())}
                      size="sm"
                      className="
                        w-full
                        mt-4
                        bg-red-600/90
                        hover:bg-red-600
                        text-white
                        transition-all duration-300
                        hover:shadow-lg hover:shadow-red-500/40
                      "
                    >
                      Delete Permanently
                    </Button>
                  </DialogContent>
                </Dialog>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-gray mt-10 text-center">
          No services found.
        </p>
      )}
    </div>
  )
}

export default page
