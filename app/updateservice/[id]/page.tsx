"use client";

import { service } from "@/db/schema";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { singleServiceAction, updateServiceAction } from "@/actions/serviceActions";
import { Button } from "@/components/ui/button";

const Page = () => {

  // Get service ID from URL params
  const { id } = useParams();

  // 🛬Router for navigation
  const router = useRouter();

  // ⌛State to hold service data
  const [services, setServices] = useState<service | null>(null);

  // 🧾React Hook Form setup
  const { register, handleSubmit, reset } = useForm<service>();

  // 👉 Fetch service & pre-fill form
  const fetchService = async () => {
    // Fetch Old Data from server action 
    const single = await singleServiceAction(id as string) as service | null;

    if (single) {
      // Set service data to state
      setServices(single);
      // Pre-fill form with fetched data
      reset(single); 
    }
  };

  useEffect(() => {
    fetchService();
  }, [id]);

  // 👉 Submit updated values
  const onSubmit = async (data: Partial<service>) => {
    // Update service using server action
    const result = await updateServiceAction(id as string, data);

    console.log(result)
    // Handle response
    if (result.success) {
      // Success feedback & redirect
      alert("Service updated!");
      router.push("/allservice");
    } else {
      // Failure feedback
      alert("Failed to update");
    }
  };

  // Loading state
  if (!services) return <p>Loading...</p>;

  return (
    <div>
      <h1 >Update Service</h1>

{/* Form fields */}
      <form onSubmit={handleSubmit(onSubmit)} >

        {/* Service Name */}
        <div>
          <label>Service Name</label>
          <input
            {...register("service_name")}
            defaultValue={services.service_name}
          />
        </div>

        {/* Service Image */}
        <div>
          <label >Service Image URL</label>
          <input
            {...register("service_image")}
            defaultValue={services.service_image || ""}
          />
        </div>

        {/* Category */}
        <div>
          <label >Category</label>
          <input
            {...register("category")}
            defaultValue={services.category}
          />
        </div>

        {/* Description */}
        <div>
          <label >Description</label>
          <textarea
            {...register("desc")}
            defaultValue={services.desc}
          ></textarea>
        </div>

        {/* Price */}
        <div>
          <label>Price</label>
          <input
            type="number"
            {...register("price")}
            defaultValue={services.price}
          />
        </div>

        <Button
          type="submit"
        >
          Update Service
        </Button>
      </form>
    </div>
  );
};

export default Page;
