import React from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const PricingPage = () => {
  return (
    <div className="pt-[136px] bg-white">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-3xl font-semibold text-gold font-marcellus uppercase mb-8">
          Property Management Pricing & Services
        </h1>

        {/* Table Header */}
        <div className="grid grid-cols-4 bg-[#9A7648] text-white font-semibold">
          <div></div>
          <div className="p-4 border-l border-[#9A7648]">Standard Fee</div>
          <div className="p-4 border-l border-[#9A7648]">Flat Fee</div>
          <div className="p-4 border-l border-[#9A7648]">Placement Only</div>
        </div>

        {/* Table Rows */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Monthly Management Fee
          </div>
          <div className="p-4 bg-white border-l border-t border-[#9A7648]">
            10% Management Fee
          </div>
          <div className="p-4 bg-white border-l border-t border-[#9A7648]">
            $100 Management Fee
          </div>
          <div className="p-4 bg-white border-l border-t border-r border-[#9A7648]">
            N/A
          </div>
        </div>

        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Tenant Placement Fee
          </div>
          <div className="p-4 bg-white border-l border-t border-[#9A7648]">
            50% of 1st Month's Rent
          </div>
          <div className="p-4 bg-white border-l border-t border-[#9A7648]">
            75% of 1st Month's Rent
          </div>
          <div className="p-4 bg-white border-l border-t border-r border-[#9A7648]">
            100% of 1st Month's Rent
          </div>
        </div>

        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Lease Renewal Fee
          </div>
          <div className="p-4 bg-white border-l border-t border-[#9A7648]">
            FREE
          </div>
          <div className="p-4 bg-white border-l border-t border-[#9A7648]">
            FREE
          </div>
          <div className="p-4 bg-white border-l border-t border-r border-[#9A7648]">
            N/A
          </div>
        </div>

        {/* Row with Checkmarks */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Rent Assessment
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
        </div>
        {/* Row for "Rent Assessment" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Rent Assessment
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
        </div>

        {/* Row for "Marketing the Property" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Marketing the Property
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
        </div>

        {/* Row for "Finding Tenants" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Finding Tenants
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
        </div>

        {/* Row for "Tenant Screening" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Tenant Screening
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
        </div>

        {/* Row for "Pet Screening" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Pet Screening
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
        </div>

        {/* Row for "Full Legal Compliance" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Full Legal Compliance
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
        </div>
        {/* Row for "Property Maintenance" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Property Maintenance
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
        </div>

        {/* Row for "Rent Payment and Collections" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Rent Payment and Collections
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
        </div>

        {/* Row for "Eviction Process Handling" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Eviction Process Handling
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
        </div>

        {/* Row for "Property Accounting and Reporting" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Property Accounting and Reporting
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
        </div>
        {/* Row for "Owner and Tenant Portals" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Owner and Tenant Portals
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
        </div>

        {/* Row for "Filter Replacement Program" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Filter Replacement Program
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
        </div>

        {/* Row for "Pet Guarantee" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Pet Guarantee
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
        </div>

        {/* Row for "Maintenance Guarantee" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Maintenance Guarantee
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
        </div>

        {/* Row for "Leasing Guarantee" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Leasing Guarantee
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
        </div>
        {/* Row for "Property Inspections" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Property Inspections
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
        </div>

        {/* Row for "Lease Renewal Included" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Lease Renewal Included
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
        </div>

        {/* Row for "Bill Pay - Utilities" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Bill Pay - Utilities
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
        </div>

        {/* Row for "Bill Pay - Taxes" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-b border-[#9A7648]">
            Bill Pay - Taxes
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-b border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-b border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-b border-r border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
        </div>

        {/* Add more rows as needed */}
      </div>

      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Property Management Quote Request</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] h-[80vh]">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold">
                PROPERTY MANAGEMENT QUOTE REQUEST
              </DialogTitle>
              <DialogDescription className="text-center text-sm text-gray-600">
                Your Rental Property Information
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 p-4 overflow-y-auto max-h-[60vh]">
              <div className="grid gap-4">
                <Label htmlFor="name" className="text-sm font-medium">
                  Name (First & Last)
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  className="border border-gray-300 rounded-md px-4 py-2"
                />
              </div>
              <div className="grid gap-4">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="border border-gray-300 rounded-md px-4 py-2"
                />
              </div>
              <div className="grid gap-4">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="border border-gray-300 rounded-md px-4 py-2"
                />
              </div>
              <div className="grid gap-4">
                <Label htmlFor="hear-about" className="text-sm font-medium">
                  Where did you hear about us?
                </Label>
                <select
                  id="hear-about"
                  defaultValue=""
                  className="border border-gray-300 rounded-md px-4 py-2"
                >
                  <option value="" disabled>
                    -- Please select --
                  </option>
                  <option value="google">Google</option>
                  <option value="social">Social Media</option>
                  <option value="friend">Friend</option>
                </select>
              </div>
              {/* Property Type */}
              <div className="grid gap-2">
                <Label htmlFor="property-type" className="text-sm font-medium">
                  Property Type
                </Label>
                <select
                  id="property-type"
                  defaultValue=""
                  className="border border-gray-300 rounded-md px-4 py-2"
                >
                  <option value="" disabled>
                    -- Please select --
                  </option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                </select>
              </div>
              {/* Property Address */}
              <div className="grid gap-2">
                <Label htmlFor="property-address" className="text-sm font-medium">
                  Property Address
                </Label>
                <Input
                  id="property-address"
                  placeholder="Enter property address"
                  className="border border-gray-300 rounded-md px-4 py-2"
                />
              </div>
              {/* Occupancy Status */}
              <div className="grid gap-2">
                <Label htmlFor="occupancy-status" className="text-sm font-medium">
                  Occupancy Status
                </Label>
                <select
                  id="occupancy-status"
                  defaultValue=""
                  className="border border-gray-300 rounded-md px-4 py-2"
                >
                  <option value="" disabled>
                    -- Please select --
                  </option>
                  <option value="occupied">Occupied</option>
                  <option value="vacant">Vacant</option>
                </select>
              </div>
              {/* Number of Units */}
              <div className="grid gap-2">
                <Label htmlFor="number-units" className="text-sm font-medium">
                  Number of Units
                </Label>
                <Input
                  id="number-units"
                  type="number"
                  placeholder="Enter number of units"
                  className="border border-gray-300 rounded-md px-4 py-2"
                />
              </div>
              {/* Unit Mix/Types */}
              <div className="grid gap-2">
                <Label htmlFor="unit-mix" className="text-sm font-medium">
                  Unit Mix/Types
                </Label>
                <Input
                  id="unit-mix"
                  placeholder="Enter unit mix/types"
                  className="border border-gray-300 rounded-md px-4 py-2"
                />
              </div>
              {/* Gross Monthly Income */}
              <div className="grid gap-2">
                <Label htmlFor="gross-income" className="text-sm font-medium">
                  Gross Monthly Income
                </Label>
                <Input
                  id="gross-income"
                  type="number"
                  placeholder="Enter gross monthly income"
                  className="border border-gray-300 rounded-md px-4 py-2"
                />
              </div>
              {/* Desired Services */}
              <div className="grid gap-2">
                <Label htmlFor="desired-services" className="text-sm font-medium">
                  Desired Services
                </Label>
                <select
                  id="desired-services"
                  defaultValue=""
                  className="border border-gray-300 rounded-md px-4 py-2"
                >
                  <option value="" disabled>
                    -- Please select --
                  </option>
                  <option value="full-service">Full Service</option>
                  <option value="leasing">Leasing Only</option>
                  <option value="maintenance">Maintenance Only</option>
                </select>
              </div>
              {/* Desired Start Date */}
              <div className="grid gap-2">
                <Label htmlFor="start-date" className="text-sm font-medium">
                  Desired Start Date
                </Label>
                <div className="relative">
                  <Input
                    id="start-date"
                    type="date"
                    className="border border-gray-300 rounded-md px-4 py-2"
                  />
                  <span className="absolute right-3 top-2/4 transform -translate-y-2/4 text-gray-400">
                    📅
                  </span>
                </div>
              </div>
              {/* Additional Information */}
              <div className="grid gap-2">
                <Label htmlFor="additional-info" className="text-sm font-medium">
                  Additional Information
                </Label>
                <textarea
                  id="additional-info"
                  placeholder="Enter any additional information here"
                  rows="4"
                  className="border border-gray-300 rounded-md px-4 py-2"
                ></textarea>
              </div>
            </div>
            <DialogFooter>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="px-6 py-2 bg-[#9A7648] text-white hover:bg-[#7b5c36]"
                >
                  Submit Request
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

    </div>
  );
};

export default PricingPage;
