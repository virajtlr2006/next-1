"use client";

import { service } from "@/db/schema";
import { singleServiceAction, updateServiceAction } from "@/actions/serviceActions";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const UpdateServicePage = () => {
  // 📌 Get ID from URL
  const params = useParams();
  const id = params?.id as string;

  // 🚦 Router
  const router = useRouter();

  // ⌛ Loading state
  const [loading, setLoading] = useState(true);

  // 🧾 React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<service>();

  // 🔄 Fetch service & prefill form
  const fetchService = async () => {
    try {
      const data = (await singleServiceAction(id)) as service | null;

      if (!data) {
        alert("Service not found");
        router.push("/allservice");
        return;
      }

      // 🔥 Reset form with existing values
      reset({
        service_name: data.service_name,
        service_image: data.service_image ?? "",
        category: data.category,
        desc: data.desc,
        price: data.price,
      });

      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to load service");
      router.push("/allservice");
    }
  };

  useEffect(() => {
    if (id) fetchService();
  }, [id]);

  // 🚀 Submit updated service
  const onSubmit = async (formData: service) => {
    try {
      const payload = {
        service_name: formData.service_name,
        service_image: formData.service_image,
        category: formData.category,
        desc: formData.desc,
        price: Number(formData.price), // 🔥 Ensure number
      };

      const res = await updateServiceAction(id, payload);

      if (res.success) {
        // alert("Service updated successfully!");
        router.push(`/singleservice/${id}`);
      } else {
        alert(res.message || "Update failed");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Something went wrong");
    }
  };

  // ⏳ Loading UI
  if (loading) {
    return <p className="text-center mt-10">Loading service...</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Update Service</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Service Name */}
        <div>
          <label className="block mb-1">Service Name</label>
          <input
            {...register("service_name", { required: true })}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Service Image */}
        <div>
          <label className="block mb-1">Service Image URL</label>
          <input
            {...register("service_image")}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1">Category</label>
          <input
            {...register("category", { required: true })}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            {...register("desc", { required: true })}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            {...register("price", {
              required: true,
              valueAsNumber: true, // 🔥 KEY FIX
            })}
            className="w-full border p-2 rounded"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Updating..." : "Update Service"}
        </Button>
      </form>
    </div>
  );
};

export default UpdateServicePage;
