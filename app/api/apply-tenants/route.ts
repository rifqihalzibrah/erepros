import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface Other {
    name: string;
    birthday: string;
    ssn_last4: string;
    relationship: string;
}

interface Reference {
    name: string;
    phone: string;
    relationship: string;
}

export async function POST(req: NextRequest) {
    try {
        const applicationData = await req.json();

        // Parse the request body
        const {
            // user_id,
            property_id,
            address,
            bedrooms,
            move_in_date,
            fee,
            transaction_method,
            full_name,
            birthday,
            ssn,
            phone,
            license_id,
            state,
            email,
            current_address,
            date_of_move_in,
            rent_amount,
            reason_for_moving,
            landlord_name,
            landlord_phone,
            others,
            references,
            employer,
            job_title,
            employer_address,
            contact_phone,
            supervisor_name,
            start_date,
            income,
            assistance_received,
            assistance_amount,
            additional_income,
            additional_income_amount,
            eviction,
            refused_rent,
            refused_rent_explanation,
            felony,
            felony_explanation,
            emergency_name,
            emergency_phone,
            emergency_relationship,
            documents,
        } = applicationData;

        // Create the application entry
        const application = await db.application.create({
            data: {
                propertyId: property_id,
                address,
                bedrooms,
                moveInDate: new Date(move_in_date),
                fee,
                transactionMethod: transaction_method,
                fullName: full_name,
                birthday: new Date(birthday),
                ssn,
                phone,
                user: {
                    connectOrCreate: {
                        where: { email }, // Assume email is unique
                        create: {
                            name: full_name, // or any default value if creating a new user
                            email,
                            phone,
                        },
                    },
                },
                licenseId: license_id,
                state,
                email,
                currentAddress: current_address,
                dateOfMoveIn: new Date(date_of_move_in),
                rentAmount: rent_amount,
                reasonForMoving: reason_for_moving,
                landlordName: landlord_name,
                landlordPhone: landlord_phone,
                employer,
                jobTitle: job_title,
                employerAddress: employer_address,
                contactPhone: contact_phone,
                supervisorName: supervisor_name,
                startDate: new Date(start_date),
                income,
                assistanceReceived: assistance_received === "Yes",
                assistanceAmount: assistance_amount,
                additionalIncome: additional_income === "Yes",
                additionalIncomeAmount: additional_income_amount,
                eviction: eviction === "Yes",
                refusedRent: refused_rent === "Yes",
                refusedRentExplanation: refused_rent_explanation,
                felony: felony === "Yes",
                felonyExplanation: felony_explanation,
                emergencyName: emergency_name,
                emergencyPhone: emergency_phone,
                emergencyRelationship: emergency_relationship,
                others: {
                    create: others.map((other: Other) => ({
                        name: other.name,
                        birthday: new Date(other.birthday),
                        ssnLast4: other.ssn_last4,
                        relationship: other.relationship,
                    })),
                },
                references: {
                    create: references.map((reference: Reference) => ({
                        name: reference.name,
                        phone: reference.phone,
                        relationship: reference.relationship,
                    })),
                },
                documents: {
                    create: documents.map((doc: { name: string; url: string }) => ({
                        name: doc.name,
                        url: doc.url,
                    })),
                },
            },
        });

        return NextResponse.json({ message: 'Application submitted successfully', application }, { status: 201 });
    } catch (error: unknown) {
        console.error('Error submitting application:', error);
        return NextResponse.json({ message: 'Failed to submit application', error: (error as Error).message }, { status: 500 });
    }
}
