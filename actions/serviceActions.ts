'use server'

import { service, serviceTable } from "@/db/schema"
import { db } from ".."
import { eq } from "drizzle-orm"

//➕ New Service Action to add a new service
export const CreateServiceAction = async (data:service) => {
    try {    
        // console.log(data)
        // 👉Insert new service into database
        const createService = await db.insert(serviceTable).values(data)
        return true
    } catch (error) {
        // ‼️Handle error if insertion fails
         return { success: false, message: "Sign Up first to add Services" }
    }
}

// All Services Action to fetch all services
export const fetchservicesAction = async () => {
    try {
        // 👉Fetch all services from database
        const fetchservices = await db.select().from(serviceTable)
        return fetchservices
    } catch (error) {
        // ‼️Handle error if fetching fails
         return { success: false, message: "Could not fetch services" }
    }
}

// Single Service Action to fetch a single service by ID
export const singleServiceAction = async (id:string) => {
    try {
        // 👉Fetch single service based on id
        const singleService = await db.select().from(serviceTable).where(eq(serviceTable.service_id, parseInt(id)))
        return singleService[0]
    } catch (error) {
        // ‼️Handle error if fetching fails
         return { success: false, message: "Could not fetch the service" }
    }
}

// My Services Action to fetch services by email
export const myServicesAction = async (email:string) => {
    try {
        // 👉Fetch services based on email
        const myServices = await db.select().from(serviceTable).where(eq(serviceTable.email, email))
        return myServices
    } catch (error) {
        // ‼️Handle error if fetching fails
         return { success: false, message: "Could not fetch your services" }
    }
}

// Delete Service Action to delete a service by ID
export const deleteServiceAction = async (id:string) => {
    try {
        // 👉Delete service based on id
        const deleteService = await db.delete(serviceTable).where(eq(serviceTable.service_id, parseInt(id)))
        return { success: true, message: "Service deleted successfully" }
    } catch (error) {
        // ‼️Handle error if deletion fails
         return { success: false, message: "Could not delete the service" }
    }
}