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
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface ServiceCardProps {
  service: service;
  isOwner: boolean;
  onDelete: (id: string) => void;
}

const ServiceCard = ({ service, isOwner, onDelete }: ServiceCardProps) => {
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto p-6 border rounded-xl shadow bg-white space-y-4">

      {/* Title */}
      <h1 className="text-2xl font-bold">{service.service_name}</h1>

      {/* Image */}
      {service.service_image && (
        <img
          src={service.service_image}
          alt={service.service_name}
          className="w-full max-h-96 object-cover rounded-lg"
        />
      )}

      {/* Details */}
      <div className="space-y-1 text-gray-700">
        <p><strong>Category:</strong> {service.category}</p>
        <p><strong>Description:</strong> {service.desc}</p>
        <p><strong>Price:</strong> ₹{service.price}</p>
        <p><strong>Contact:</strong> <a href={`mailto:${service.email}`}>{service.email}</a></p>
      </div>

      {/* Owner Actions */}
      {isOwner && (
        <div className="flex gap-4 pt-4">

          {/* Update */}
          <Button
            onClick={() => router.push(`/updateservice/${service.service_id}`)}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 flex gap-2"
          >
            <Edit className="w-4 h-4" />
            Update Service
          </Button>

          {/* Delete */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-red-500 to-pink-500 flex gap-2">
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-red-500">
                  Are you absolutely sure?
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone.
                </DialogDescription>
              </DialogHeader>

              <Button
                onClick={() => onDelete(String(service.service_id))}
                className="bg-red-600 hover:bg-red-700 w-full"
              >
                Confirm Delete
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
