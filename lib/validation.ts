import { z } from "zod";

export const rentalApplicationSchema = z.object({
    propertyId: z.string().nonempty("Property ID is required"),
    address: z.string().nonempty("Address is required"),
    bedrooms: z.string().nonempty("Bedrooms are required"),
    moveInDate: z.string().nonempty("Move-In Date is required"),
    fee: z.number().min(0, "Fee is required"),
    transactionMethod: z.string().nonempty("Transaction method is required"),
    fullName: z.string().nonempty("Full Name is required"),
    birthday: z.string().nonempty("Birthday is required"),
    phone: z.string().nonempty("Phone is required"),
    email: z.string().email("Email is invalid"),
    // Other fields for further steps
});
