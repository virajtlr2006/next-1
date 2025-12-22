'use client';

import { service } from '@/db/schema';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { fetchservicesAction } from '@/actions/serviceActions';
import FetchServiceCard from '@/components/ui/FetchServiceCard';
import { ArrowRight, Headphones, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const page = () => {

  const router = useRouter();

  // ⏳Fetched services
  const [fetchallServices, setFetchallServices] = useState<service[] | null>(null);

  // 🔍 Search text
  const [searchservice, setSearchservice] = useState<string>('');

  useEffect(() => {
    fetchServices();
  }, []);

  // 🌐 Fetch All Services
  const fetchServices = async () => {
    const all = await fetchservicesAction() as service[] || null;
    setFetchallServices(all);
  };

  // 🔍 Search Logic (Filtered Services)
  const filteredServices = fetchallServices?.filter((serviceItem) =>
    serviceItem.service_name
      .toLowerCase()
      .includes(searchservice.toLowerCase())
  );


  return (
    <div >
      <div className="min-h-screen bg-black">
        <section className="py-16 lg:py-20 bg-gradient-to-b from-black via-slate-900/20 to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(85,140,255,0.1),transparent_50%)]" />
          <div className="container mx-auto px-4 lg:px-8 relative">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight text-balance">
                Explore Our Services
              </h1>
              <p className="text-lg text-slate-gray leading-relaxed text-pretty">
                Browse through our comprehensive catalog of trusted services to find exactly what you need
              </p>

              {/* 🔍 Search Box */}
              <div className="relative max-w-2xl mx-auto mt-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-gray" />
                <input
                  type="search"
                  placeholder="Search for services..."
                  value={searchservice}
                  onChange={(e) => setSearchservice(e.target.value)}
                  className="w-full border bg-slate-900/50 border-slate-800 text-white pl-12 pr-4 py-6 placeholder:text-slate-gray focus:border-navy rounded-lg text-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Service Grid */}
        <section className="py-2 bg-black">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <p
                className="
    text-center
    text-2xl lg:text-3xl
    font-semibold
    text-slate-300
    max-w-3xl
    mx-auto
    mt-6 mb-10
    transition-all duration-300
    hover:text-navy
    hover:scale-105
    cursor-default
  "
              >
                Find the perfect service for your needs
              </p>
            </div>
          </div>

          {/* 🧩 Mapped Services */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-around">
            {filteredServices && filteredServices.length > 0 ? (
              filteredServices.map((serviceItem) => (
                <a
                  href={`/service/${serviceItem.service_id}`}
                  key={serviceItem.service_id}
                >
                  <FetchServiceCard
                    serviceItem={serviceItem}
                    service_image={serviceItem.service_image || ''}
                    service_name={serviceItem.service_name}
                    category={serviceItem.category}
                    price={serviceItem.price}
                  />
                </a>
              ))
            ) : (
              <section className="py-16 bg-gradient-to-br from-navy via-navy-dark to-black text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
                <div className="container mx-auto px-4 lg:px-8 text-center relative">
                  <div className="max-w-2xl mx-auto space-y-4">
                    <h2 className="text-3xl lg:text-4xl font-bold text-balance">Can't Find What You're Looking For?</h2>
                    <p className="text-lg text-slate-300 leading-relaxed text-pretty">
                      Contact our support team and we'll help you find the perfect service provider
                    </p>
                    <Button
                      size="lg"
                      className="bg-white hover:bg-slate-100 text-navy transition-all duration-300 hover:shadow-2xl hover:shadow-white/30 mt-6 hover:scale-110"
                    >
                      Contact Support
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </section>
            )}
          </div>
        </section>
      </div>

      <footer className="py-16 mt-10 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-navy to-navy-dark rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">SS</span>
                </div>
                <span className="font-semibold text-white">ServiceStack</span>
              </div>
              <p className="text-sm text-slate-gray leading-relaxed">
                Your trusted platform for all everyday services, connecting you with verified professionals.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Categories</h3>
              <ul className="space-y-2">
                {["Home Services", "Health & Wellness", "Education", "Professional Services"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-slate-gray hover:text-navy transition-all duration-200 hover:translate-x-1 inline-block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                {["About Us", "How It Works", "Contact", "Careers"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-slate-gray hover:text-navy transition-all duration-200 hover:translate-x-1 inline-block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                {["Help Center", "Terms of Service", "Privacy Policy", "Trust & Safety"].map((item) => (
                  <li key={item}>
                    <Link
                      href=""
                      className="text-sm text-slate-gray hover:text-navy transition-all duration-200 hover:translate-x-1 inline-block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-gray">© 2025 ServiceStack. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Headphones className="w-4 h-4 text-slate-gray" />
              <span className="text-sm text-slate-gray">24/7 Customer Support: 1-800-SERVICE</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default page;
