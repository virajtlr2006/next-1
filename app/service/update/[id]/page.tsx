"use client";

import { service } from "@/db/schema";
import {
  singleServiceAction,
  updateServiceAction,
} from "@/actions/serviceActions";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

const UpdateServicePage = () => {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<service>();

  // 👀 Watch fields for preview card
  const watchedValues = watch();

  // 🔄 Fetch existing service
  const fetchService = async () => {
    try {
      const data = (await singleServiceAction(id)) as service | null;

      if (!data) {
        alert("Service not found");
        router.push("/service/my");
        return;
      }

      reset({
        service_name: data.service_name,
        service_image: data.service_image ?? "",
        category: data.category,
        desc: data.desc,
        price: data.price,
      });

      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Failed to load service");
      router.push("/service/my");
    }
  };

  useEffect(() => {
    if (id) fetchService();
  }, [id]);

  // 🚀 Submit
  const onSubmit = async (formData: service) => {
    try {
      const payload = {
        service_name: formData.service_name,
        service_image: formData.service_image,
        category: formData.category,
        desc: formData.desc,
        price: Number(formData.price),
      };

      const res = await updateServiceAction(id, payload);

      if (res.success) {
        router.push(`/single/${id}`);
      } else {
        alert(res.message || "Update failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  // ⏳ Loading UI
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-slate-400">Loading service data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">

      {/* 🔹 Header */}
      <section className="py-14 bg-gradient-to-b from-black via-slate-900/30 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(85,140,255,0.12),transparent_55%)]" />
        <div className="relative container mx-auto px-4">
          <Link href="/service/my">
            <Button
              variant="ghost"
              className="text-slate-400 hover:text-white mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to My Services
            </Button>
          </Link>

          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              Update Service
            </h1>
            <p className="mt-3 text-lg text-slate-400">
              Edit your service details and keep your listing updated
            </p>
          </div>
        </div>
      </section>

      {/* 🔹 Form + Info Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

            {/* 📝 UPDATE FORM CARD */}
            <Card className="border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
              <h2 className="text-xl font-semibold text-white mb-6">
                Edit Service Details
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Service Name
                  </label>
                  <input
                    {...register("service_name", { required: true })}
                    className="w-full h-12 rounded-lg bg-slate-800/60 border border-slate-700 px-4 text-white focus:border-navy focus:ring-1 focus:ring-navy"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Service Image URL
                  </label>
                  <input
                    {...register("service_image")}
                    className="w-full h-12 rounded-lg bg-slate-800/60 border border-slate-700 px-4 text-white focus:border-navy focus:ring-1 focus:ring-navy"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Category
                  </label>
                  <input
                    {...register("category", { required: true })}
                    className="w-full h-12 rounded-lg bg-slate-800/60 border border-slate-700 px-4 text-white focus:border-navy focus:ring-1 focus:ring-navy"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    {...register("desc", { required: true })}
                    className="w-full rounded-lg bg-slate-800/60 border border-slate-700 px-4 py-3 text-white focus:border-navy focus:ring-1 focus:ring-navy"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Price
                  </label>
                  <input
                    type="number"
                    {...register("price", {
                      required: true,
                      valueAsNumber: true,
                    })}
                    className="w-full h-12 rounded-lg bg-slate-800/60 border border-slate-700 px-4 text-white focus:border-navy focus:ring-1 focus:ring-navy"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    w-full h-12 rounded-lg
                    bg-navy text-white font-semibold
                    hover:bg-navy/90
                    transition-all duration-300
                    hover:shadow-lg hover:shadow-navy/40
                  "
                >
                  {isSubmitting ? "Updating..." : "Update Service"}
                </Button>
              </form>
            </Card>

            {/* 👁️ INFO / PREVIEW CARD */}
            <Card className="border border-slate-800 bg-slate-900/40 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
              <h2 className="text-xl font-semibold text-white mb-6">
                Service Preview
              </h2>

              <div className="space-y-5 text-slate-300">

                <div className="w-full h-48 rounded-xl overflow-hidden border border-slate-800">
                  <img
                    src={watchedValues.service_image || "/placeholder.jpg"}
                    alt="Service"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <p className="text-sm text-slate-400">Service Name</p>
                  <p className="text-white font-medium">
                    {watchedValues.service_name || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-400">Category</p>
                  <p className="text-white">
                    {watchedValues.category || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-400">Price</p>
                  <p className="text-white font-semibold">
                    $ {watchedValues.price || 0}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-400">Description</p>
                  <p className="text-sm leading-relaxed">
                    {watchedValues.desc || "—"}
                  </p>
                </div>

              </div>
            </Card>

          </div>
        </div>
      </section>
    </div>
  );
};

export default UpdateServicePage;
