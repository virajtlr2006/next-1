'use server'
import { bookingTable, newBooking } from "@/db/schema"
import { db } from ".."

export const bookServiceAction = async (
  service_id: string,
  data: newBooking
) => {
  try {
    const result = await db
    .insert(bookingTable).values({
      service_id: Number(service_id),
      user_email: data.user_email,
      user_name: data.user_name,
      booking_date: data.booking_date,
    }).returning()

    return { success: true, data: result }
  } catch (error) {
    console.error('Booking error:', error)
    return { success: false, error: (error as Error).message } // <-- Return error message
  }
}