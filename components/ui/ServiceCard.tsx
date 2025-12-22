"use client";

import { service } from "@/db/schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, Edit, Shield, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteServiceAction } from "@/actions/serviceActions";
import { Card } from "./card";
import Link from "next/link";

interface ServiceCardProps {
  service: service;
  isOwner: boolean;
}

const ServiceCard = ({ service, isOwner }: ServiceCardProps) => {
  const router = useRouter();

  const deleteService = async (id: string) => {
    const res = await deleteServiceAction(id);
    if (res.success) {
      router.push("/service");
    }
  };

  return (
    <div>
      <section className="py-8 bg-black">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image */}
            <div className="relative h-96 rounded-xl overflow-hidden border border-slate-800">
              {service.service_image && (
                <img
                  src={service.service_image}
                  alt={service.service_name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              )}
            </div>

            {/* Service Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm text-slate-gray bg-slate-800 px-3 py-1 rounded-full">
                    {service.category}
                  </span>
                  <div className="flex items-center gap-1 text-navy text-sm">
                    <Shield className="w-4 h-4" />
                    <span>Verified Provider</span>
                  </div>
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  {service.service_name}
                </h1>
              </div>

              <p className="text-slate-gray leading-relaxed">
                {service.desc}
              </p>

              {/* Provider */}
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">
                  Service Provider:
                </h3>
                <a
                  href={`mailto:${service.email}`}
                  className="text-navy hover:underline ml-2"
                >
                  {service.email}
                </a>
              </div>

              {/* Price */}
              <Card className="p-6 border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">
                  ${service.price}
                </div>
              </Card>

              {/* Booking */}
              {!isOwner && (
                <Link href={`/service/book/${service.service_id}`}>
                  <Button
                    size="lg"
                    className="w-full bg-navy hover:bg-navy-dark text-white transition-all duration-300 hover:shadow-xl hover:shadow-navy/50"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Now
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= OWNER ACTIONS (CENTERED) ================= */}
      {isOwner && (
        <section className="py-10 bg-black">
          <div className="flex justify-center">
            <Card
              className="
                w-full max-w-xl
                border-slate-800 bg-slate-900/60 backdrop-blur-sm
                p-6
              "
            >
              <h2 className="text-center text-xl font-semibold text-white mb-6">
                Manage Your Service
              </h2>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {/* Update */}
                <Button
                  onClick={() =>
                    router.push(`/service/update/${service.service_id}`)
                  }
                  className="
                    flex items-center gap-2
                    bg-navy hover:bg-navy-dark
                    transition-all duration-300
                    hover:scale-105
                    hover:shadow-xl hover:shadow-navy/40
                  "
                >
                  <Edit className="w-4 h-4" />
                  Update Service
                </Button>

                {/* Delete */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="
                        flex items-center gap-2
                        bg-red-600/90 hover:bg-red-600
                        transition-all duration-300
                        hover:scale-105
                        hover:shadow-xl hover:shadow-red-500/40
                      "
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Service
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="bg-slate-900 border border-slate-800">
                    <DialogHeader>
                      <DialogTitle className="text-red-500 text-xl">
                        Are you absolutely sure?
                      </DialogTitle>
                      <DialogDescription className="text-slate-gray">
                        This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>

                    <Button
                      onClick={() =>
                        deleteService(String(service.service_id))
                      }
                      className="
                        w-full mt-4
                        bg-red-600 hover:bg-red-700
                        transition-all duration-300
                        hover:shadow-lg hover:shadow-red-500/40
                      "
                    >
                      Confirm Delete
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          </div>
        </section>
      )}

      {isOwner && (
        <div className="text-center text-slate-gray text-lg mt-6 mb-10">
          All Bookings
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
