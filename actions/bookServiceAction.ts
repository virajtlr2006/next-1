'use server'

import { db } from '..'
import { bookingTable, newBooking } from '@/db/schema'

// Book Service Action
export const bookServiceAction = async (
    // Service id
  service_id: string,
  data: newBooking
) => {
  try {
    // Insert data in database
    const result = await db.insert(bookingTable).values({
      ...data,
      service_id: Number(service_id), // ✅ FIX
    }).returning()

    return { success: true, data: result }
  } catch (error) {
    // Shows error if any
    console.error('Booking error:', error)
    return { success: false }
  }
}
