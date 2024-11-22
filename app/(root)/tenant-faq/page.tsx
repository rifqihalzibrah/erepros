// pages/TenantFAQ.tsx
'use client';

import Accordion from '@/components/ui/Accordion';

const faqs = [
  {
    question: "What do I need to do to qualify as a tenant with Elite Professional Management?",
    answer: "You must make 2.5x the rental rate unless you are government subsidized under section 8 or other similar associations. You can’t have any evictions in the last 3 years. You can’t have any criminal background within the last 10 years."
  },
  {
    question: "How long does it take to hear back on my application and is there a fee to fill out an application?",
    answer: "There is a $40 fee for anyone over the age of 18 that will be living in the rental. It is non-refundable. Generally, the application process takes 24-48 hours to process."
  },
  {
    question: "Can I get approved if I have bad credit?",
    answer: "We don’t go so much by the actual score as what we find on the report. You must be able to turn utilities on in your own name."
  },
  {
    question: "Does the manager and/or an owner have the right to enter into my unit at anytime?",
    answer: "We will always give 24-hour notice for inspections. However, in the event of an emergency the manager or owner has the right to enter the unit/home to make necessary repairs in order to stop further damage to unit or harm to tenants."
  },
  {
    question: "Can the landlord raise my rent during the term of my lease?",
    answer: "If you are on a month-to-month lease, then our office will give you a 60-day notice if the rent is increasing. If you are on a year lease contract, then the terms will not change during that year’s term period. You must give a written 30-day notice either by email or regular mail. You may also give notice through your tenant portal. We must also receive keys back for the final inspection and to remit return of your security deposit."
  },
  {
    question: "How do I make a maintenance request and how long does it take for someone to come out to fix my issue?",
    answer: "You may use your tenant portal and email in a request or call our office at (810) 715-5486. Per your lease agreement there may be a service call fee in order for us to come out. Certain repairs under $50 may be your responsibility to repair on your own. You may also be charged for the repair if negligence occurred on your part or from that of your family or guests."
  },
  {
    question: "Is there an after hours emergency line and what is deemed as an emergency?",
    answer: "Yes, it is the office line (810) 715-5486 and someone monitors it after hours and on the weekends. An emergency is deemed as a safety or health issue such as furnace repair needed in winter, water line breaks, electrical outage issue anywhere in the home."
  },
  {
    question: "Do you allow Pets and is there an additional fee?",
    answer: "This depends specifically on what the owner accepts. Typically, most owners that allow pets will charge a pet deposit of up to $200 per pet and/or an increase in rent of up to $25 per pet per month. We do allow service animals and emotional support pets."
  },
  {
    question: "Can I get my deposit back if I decide I no longer want to rent the unit or I have changed my mind because I found something else?",
    answer: "No, you are holding a unit with that deposit that we will not be able to rent to anyone else until you move in. It is a loss of rent to an owner if you change your mind and we have to advertise the property again."
  },
];

export default function TenantFAQ() {
  return (
    <div className='container mx-auto p-6 pt-[136px] font-marcellus'>
      <h1 className="text-3xl pt-[48px] font-bold text-gold text-center mb-6">Tenant FAQ</h1>
      <Accordion items={faqs} />
    </div>
  );
}