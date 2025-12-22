'use client'

import { service } from '@/db/schema'
import React from 'react'
import { Card } from './card'

// Props interface
interface FetchServiceCardProps {
  serviceItem: service
  service_image: string
  service_name: string
  category: string
  price: number
}

const FetchServiceCard = ({
  serviceItem,
  service_image,
  service_name,
  category,
  price,
}: FetchServiceCardProps) => {
  if (!serviceItem) return null

  return (
    // 🧩 Main Service Card
    <Card
      key={serviceItem.service_id}
      className="border-slate-800 bg-slate-900/50 w-115 backdrop-blur-sm
                 hover:border-navy transition-all duration-300 mx-auto
                 hover:shadow-2xl hover:shadow-navy/30 hover:scale-[1.03]
                 cursor-pointer group"
    >
      {/* 🖼️ Image Card (inside main card) */}
      <div className="p-3">
        <div className="relative h-44 rounded-xl overflow-hidden bg-slate-800 border border-slate-700">
          <img
            src={service_image || ''}
            alt={service_name}
            className="w-full h-full object-cover
                       transition-transform duration-700 ease-out
                       group-hover:scale-110"
          />

          {/* 💰 Price badge */}
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg">
            <span className="text-white font-semibold text-sm">
              ${price}
            </span>
          </div>
        </div>
      </div>

      {/* 📄 Content Section */}
      <div className="px-5 pb-5 space-y-3">
        {/* 🏷️ Category */}
        <span className="inline-block text-xs text-slate-gray bg-slate-800 px-2.5 py-1 rounded-md">
          {category}
        </span>

        {/* 📝 Service Name */}
        <h3 className="text-lg font-semibold text-white leading-snug
                       group-hover:text-navy transition-colors">
          {service_name}
        </h3>
      </div>
    </Card>
  )
}

export default FetchServiceCard
