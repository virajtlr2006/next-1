'use server'
import { bookingTable, newBooking } from "@/db/schema"
import { db } from ".."

export const bookServiceAction = async (
  service_id: string,
  data: newBooking
) => {
  try {
    const result = await db
      .insert(bookingTable)
      .values({
        ...data,
        service_id: Number(service_id),
      })
      .returning()

    return { success: true, data: result }
  } catch (error) {
    console.error('Booking error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
