"use client";

import { deleteServiceAction, singleServiceAction } from "@/actions/serviceActions";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ui/ServiceCard";
import { service } from "@/db/schema";
import { useCurrentUser } from "@/hook/hook";
import { ArrowLeft, Heart, MailSearch, Share2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon, InstapaperShareButton, InstapaperIcon, MailruShareButton, TwitterShareButton, TwitterIcon, EmailShareButton, EmailIcon, } from "react-share"

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


  if (!serviceData) return <p>Loading service details...</p>;

  return (
    <div >
      <div className="bg-slate-900/30 border-b border-slate-800">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/service">
              <Button variant="ghost" className="text-slate-gray hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Button>
            </Link>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="border-slate-700 text-slate-gray hover:text-white hover:bg-slate-800 bg-transparent"
              >
                <Heart className="w-4 h-4" />
              </Button>


              <Dialog>
                <DialogTrigger>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-slate-700 text-slate-gray hover:text-white hover:bg-slate-800 bg-transparent">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-sm rounded-2xl border border-slate-800 bg-slate-900/95 backdrop-blur-md">
                  <DialogHeader>
                    <DialogTitle className="text-center text-lg font-semibold text-white">
                      Share this service
                    </DialogTitle>
                    <p className="text-center text-sm text-slate-400 mt-1">
                      Spread the word with your network 🚀
                    </p>
                  </DialogHeader>

                  <div className="flex justify-around mt-6">
                    {/* WhatsApp */}

                    <WhatsappShareButton url={`https://next-1-c7bo.vercel.app/service/${id}`}>
                      <WhatsappIcon size={48} round />
                    </WhatsappShareButton>


                    {/* Facebook */}

                    <FacebookShareButton url={`https://next-1-c7bo.vercel.app/service/${id}`}>
                      <FacebookIcon size={48} round />
                    </FacebookShareButton>


                    {/* Twitter */}
                    <TwitterShareButton url={`https://next-1-c7bo.vercel.app/service/${id}`}>
                      <TwitterIcon size={48} round />
                    </TwitterShareButton>


                    {/* Email */}

                    <EmailShareButton url={`https://next-1-c7bo.vercel.app/service/${id}`}>
                      <EmailIcon size={48} round />
                    </EmailShareButton>

                  </div>
                </DialogContent>

              </Dialog>

            </div>

          </div>
        </div>
      </div>


      <ServiceCard
        service={serviceData}
        isOwner={isOwner}
      />
    </div>
  );
};

export default Page;
