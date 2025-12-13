"use client";

import { deleteServiceAction, singleServiceAction } from "@/actions/serviceActions";
import ServiceCard from "@/components/ui/ServiceCard";
import { service } from "@/db/schema";
import { useCurrentUser } from "@/hook/hook";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [serviceData, setServiceData] = useState<service | null>(null);
  const [isOwner, setIsOwner] = useState(false);

  const { email } = useCurrentUser();
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (id && email) fetchService(id as string);
  }, [id, email]);

  const fetchService = async (id: string) => {
    const data = await singleServiceAction(id) as service | null;
    if (data) {
      setServiceData(data as service);
      setIsOwner(email === data.email);
    }
  };

  const deleteService = async (id: string) => {
    const res = await deleteServiceAction(id);
    if (res.success) {
      router.push("/allservice");
    }
  };

  if (!serviceData) return <p>Loading service details...</p>;

  return (
    <div className="p-6">
      <a href="/allservice" className="text-blue-500 underline">
        ← Back To All Services
      </a>

      <ServiceCard
        service={serviceData}
        isOwner={isOwner}
        onDelete={deleteService}
      />
    </div>
  );
};

export default Page;
