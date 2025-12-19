'use client';

import { service } from '@/db/schema';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { fetchservicesAction } from '@/actions/serviceActions';
import FetchServiceCard from '@/components/ui/FetchServiceCard';
import { Search } from 'lucide-react';

const page = () => {

  const router = useRouter();

  // ⏳Fetched services
  const [fetchallServices, setFetchallServices] = useState<service[] | null>(null);

  // 🔍 Search text
  const [searchservice, setSearchservice] = useState('');

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
    <div className="p-6">

      {/* 🔍 Search Box */}
      <div className="relative mb-6 max-w-md">
        <input
          type="search"
          placeholder="Search Services"
          value={searchservice}
          onChange={(e) => setSearchservice(e.target.value)}
          className="w-full border p-2 pl-10 rounded"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
      </div>

      <h1 className="text-2xl mb-4">
        Explore all services at a single spot
      </h1>

      {/* 🧩 Mapped Services */}
      {filteredServices && filteredServices.length > 0 ? (
        filteredServices.map((serviceItem) => (
          <a
            href={`/singleservice/${serviceItem.service_id}`}
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
        <p className="text-gray-500">No services found</p>
      )}
    </div>
  );
};

export default page;
