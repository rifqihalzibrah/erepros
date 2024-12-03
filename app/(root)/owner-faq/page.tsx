// pages/OwnerFAQ.tsx
"use client";

import Accordion from "@/components/ui/Accordion";

const faqs = [
  {
    question: "What Are Your Management Fees?",
    answer:
      "We charge 10% of the monthly collected rent. 50% of any late fees we collect on your behalf. There are discounts available depending on how large your portfolio is with us.",
  },
  {
    question: "Do You charge a leasing fee?",
    answer:
      "Yes, we charge 50-100% of the first month’s rent depending on the rental and leasing option. This fee covers advertising to several online sites, the showings and the leasing agent’s fee.",
  },
  {
    question: "Do you charge a fee if a property is vacant?",
    answer: "No, we only charge fees once the unit is rented.",
  },
  {
    question: "How and when do I receive my rental funds?",
    answer:
      "We do a monthly report for the previous 30 days. You will have an assigned report date each month. You will receive your ACH payment 48 hours from the report date.",
  },
  {
    question:
      "What software do you use and will I have access to my tenant information?",
    answer:
      "We use Propertyware and you will have access to it to view your reports, tenant balances or repair requests and billing among other items.",
  },
  {
    question:
      "Do You assist with buying and selling of properties to increase or decrease my portfolio?",
    answer:
      "Yes, we are a licensed Real Estate Brokerage and we will assist in the sale or purchase of all your current and future investment properties.",
  },
  {
    question:
      "Do you charge a fee for transferring my rentals from another property management company?",
    answer:
      "No, we do not charge any additional fees to make the transfer over to Elite and we work diligently to make the process as seamless as possible.",
  },
  {
    question:
      "How Long have you been doing property management and do you have a license?",
    answer:
      "2024 marked an important year as it is our 20-year anniversary! We are licensed and insured in the State of Michigan.",
  },
  {
    question: "How many staff members work in the office?",
    answer:
      "The main office staffs 10 people in house. We have additional runners and showing agents that work daily in the field. We also have several repair professionals that are local to each area of service.",
  },
  {
    question:
      "Do you handle repairs and turning the unit after tenants move out?",
    answer:
      "Yes, we are a full-service management company which will handle all repairs and turns as needed. You may use our services or your own. We provide quotes for all repairs for approval.",
  },
  {
    question: "How long does it generally take to lease out a vacant unit?",
    answer:
      "As long as the property is in good condition and priced appropriately for the location then a vacant property should rent within one to three weeks on average.",
  },
  {
    question:
      "How long does an eviction take and what is the cost for this through Elite?",
    answer:
      "Depending on the city in which the tenant resides, an eviction generally will take between 2-4 months. Costs can vary depending on when a tenant leaves. 7 day and 30-day notices cost $15-100 depending on the area. Court documents, filing and attorney fees for the first hearing are $350. Additional hearings cost $75. If tenant does not leave after judgement and a writ is filed that is an additional $35. If a sheriff needs to physically remove the tenants and trash out their home than additional fees from the sheriff will range between $300-1000 depending on time and staff to remove the tenants and their personal items/furniture from the property.",
  },
];

export default function OwnerFAQ() {
  return (
    <div className="container mx-auto p-6 pt-[136px] font-marcellus">
      <h1 className="text-3xl pt-[48px] font-bold text-gold text-center mb-6">
        Owner FAQ
      </h1>
      <Accordion items={faqs} />
    </div>
  );
}
