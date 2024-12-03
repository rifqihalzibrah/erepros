'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'; // Adjust path as needed

const ApplicationDetail = () => {
    const router = useRouter();
    const params = useParams();
    const { id } = params; // Get the application ID from the URL
    const [application, setApplication] = useState(null);

    useEffect(() => {
        if (id) {
            // Fetch application details
            fetch(`/api/erepros-management-control/applications/${id}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Failed to fetch application details');
                    }
                    return res.json();
                })
                .then((data) => setApplication(data.data)) // Assuming API returns { data: application }
                .catch((error) => console.error('Error fetching application:', error));
        }
    }, [id]);

    const renderField = (label, value) => (
        <div>
            <p className="text-gray-600 font-medium">{label}</p>
            <p>{value || 'N/A'}</p>
        </div>
    );

    return (
        <>
            {/* Header */}
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Application Detail</h1>
            </div>
            {/* Breadcrumb */}
            <div className="flex items-center">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/erepros-management-control">Dashboard</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/erepros-management-control/applications">Applications</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Application Detail</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            {/* Dashed Border Container */}
            <div className="flex flex-1 justify-center rounded-lg border border-dashed shadow-sm">
                <div className="flex flex-col gap-1 w-full p-4 text-sm">
                    {application ? (
                        <div className="space-y-8 w-full">
                            {/* Rental Application */}
                            <div className="bg-white shadow rounded-lg p-6">
                                <h2 className="text-xl font-semibold mb-4">Rental Application</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {renderField('Property ID', application.propertyId)}
                                    {renderField('Address', application.address)}
                                    {renderField('Bedrooms', application.bedrooms)}
                                    {renderField('Move-In Date', format(new Date(application.moveInDate), 'dd MMM yyyy'))}
                                    {renderField('Fee', `$${application.fee}`)}
                                    {renderField('Transaction Method', application.transactionMethod)}
                                </div>
                            </div>

                            {/* Personal Information */}
                            <div className="bg-white shadow rounded-lg p-6">
                                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {renderField('Full Name', application.fullName)}
                                    {renderField('Birthday', format(new Date(application.birthday), 'dd MMM yyyy'))}
                                    {renderField('SSN', application.ssn)}
                                    {renderField('Phone', application.phone)}
                                    {renderField('License ID', application.licenseId)}
                                    {renderField('State', application.state)}
                                    {renderField('Email', application.email)}
                                    {renderField('Current Address', application.currentAddress)}
                                    {renderField('Date of Move-In', format(new Date(application.dateOfMoveIn), 'dd MMM yyyy'))}
                                    {renderField('Rent Amount', `$${application.rentAmount}`)}
                                    {renderField('Reason for Moving', application.reasonForMoving)}
                                    {renderField('Landlord Name', application.landlordName)}
                                    {renderField('Landlord Phone', application.landlordPhone)}
                                </div>
                            </div>

                            {/* Others Living in the Unit */}
                            {application.others && application.others.length > 0 && (
                                <div className="bg-white shadow rounded-lg p-6">
                                    <h2 className="text-xl font-semibold mb-4">Others Living in the Unit</h2>
                                    <ul className="list-disc pl-6 space-y-2">
                                        {application.others.map((other) => (
                                            <li key={other.id}>
                                                <span className="font-medium">{other.name}</span> - {other.relationship}, Birthday:{' '}
                                                {format(new Date(other.birthday), 'dd MMM yyyy')}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Pet Information */}
                            {application.pets && application.pets.length > 0 && (
                                <div className="bg-white shadow rounded-lg p-6">
                                    <h2 className="text-xl font-semibold mb-4">Pet Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {renderField('Number of Pets', application.how_many_pets || '0')}
                                        <div>
                                            <p className="text-gray-600 font-medium">Pets</p>
                                            <ul className="list-disc pl-6 space-y-1">
                                                {application.pets.map((pet, index) => (
                                                    <li key={index}>{pet}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Financial Information */}
                            <div className="bg-white shadow rounded-lg p-6">
                                <h2 className="text-xl font-semibold mb-4">Financial Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {renderField('Employer', application.employer)}
                                    {renderField('Job Title', application.jobTitle)}
                                    {renderField('Employer Address', application.employerAddress)}
                                    {renderField('Contact Phone', application.contactPhone)}
                                    {renderField('Supervisor Name', application.supervisorName)}
                                    {renderField('Start Date', format(new Date(application.startDate), 'dd MMM yyyy'))}
                                    {renderField('Income', `$${application.income}`)}
                                    {renderField('Assistance Received', application.assistanceReceived)}
                                    {renderField('Assistance Amount', `$${application.assistanceAmount || 0}`)}
                                    {renderField('Additional Income', application.additionalIncome)}
                                    {renderField('Additional Income Amount', `$${application.additionalIncomeAmount || 0}`)}
                                </div>
                            </div>

                            {/* Personal References */}
                            {application.references && application.references.length > 0 && (
                                <div className="bg-white shadow rounded-lg p-6">
                                    <h2 className="text-xl font-semibold mb-4">Personal References</h2>
                                    <ul className="list-disc pl-6 space-y-2">
                                        {application.references.map((ref) => (
                                            <li key={ref.id}>
                                                <span className="font-medium">{ref.name}</span> - {ref.relationship} ({ref.phone})
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Emergency Contact */}
                            <div className="bg-white shadow rounded-lg p-6">
                                <h2 className="text-xl font-semibold mb-4">Emergency Contact</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {renderField('Emergency Name', application.emergencyName)}
                                    {renderField('Emergency Phone', application.emergencyPhone)}
                                    {renderField('Emergency Relationship', application.emergencyRelationship)}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-64">
                            <p className="text-gray-500">Loading...</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ApplicationDetail;
