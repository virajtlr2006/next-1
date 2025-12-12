'use server'

import { service, serviceTable } from "@/db/schema"
import { db } from ".."

//➕ New Service Action to add a new service
export const newServiceAction = async (data:service) => {
    try {    
        // console.log(data)
        // 👉Insert new service into database
        const newService = await db.insert(serviceTable).values(data)
        return true
    } catch (error) {
        // ‼️Handle error if insertion fails
         return { success: false, message: "Sign Up first to add Services" }
    }
}

// All Services Action to fetch all services
export const allServicesAction = async () => {
    try {
        // 👉Fetch all services from database
        const allservices = await db.select().from(serviceTable)
        return allservices
    } catch (error) {
        // ‼️Handle error if fetching fails
         return { success: false, message: "Could not fetch services" }
    }
}