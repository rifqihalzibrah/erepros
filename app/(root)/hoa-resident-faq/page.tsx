"use client";

import Accordion from "@/components/ui/Accordion";

const faqs = [
  {
    question: "What Are Your Management Fees?",
    answer:
      "HOA management fees vary and are bid by project. Please reach out to us with an email to jennifero@erepros.com for more information.",
  },
  {
    question: "How can I pay my dues?",
    answer:
      "Dues can be paid online, by check, credit card, or ACH (checking account automatic deduction). Cash payments are not accepted.",
  },
  {
    question: "How can I get a copy of my Condo/HOA dues account statement?",
    answer:
      "Account statements are available thru the Condo/HOA portal or requested by phone or email.",
  },
  {
    question: "What is included with my dues?",
    answer:
      "Dues pay for general maintenance of the common areas, capital expenditures, landscape maintenance for common areas, management fees, annual tax preparation, street and outside building utilities, garbage collection, Association's insurance policy, and may include other services depending on your association; please refer to your Association's budget for specific information.",
  },
  {
    question: "What are the main duties of the Board of Directors?",
    answer:
      "The Board members are responsible for the protection, maintenance, and enhancing property values in the association.",
  },
  {
    question: "What do I do if I have an issue with my neighbor?",
    answer:
      "Communicate any issues to the Board of Directors through the management company via email or online. The property management will assure that the concern is added to the following monthly meeting’s agenda and will be addressed by the Board of Directors.",
  },
  {
    question: "What is your management contract term?",
    answer:
      "Like most of our competitors, we require a one-year contract term; but, we do provide other options to fit your needs.",
  },
  {
    question: "Who handles collection accounts?",
    answer:
      "We have an amazing accounting team that works hand-in-hand with our HOA attorneys to effectively handle all of our collection accounts. We also actively work with accounts and homeowners prior to sending them to collections in effort to avoid any unnecessary hassle.",
  },
  {
    question: "What are some of the services provided to the HOA?",
    answer:
      "Monthly financial statements, quarterly board meetings, an Annual Meeting for Members, record keeping and yearly taxes, bid collection, maintenance scheduling and overview, monthly property inspections, and rule violation follow-ups.",
  },
  {
    question:
      "Why use a property management company for your HOA rather than Board management?",
    answer:
      "Hassle free! We take care of the property maintenance, vendor scheduling and estimates. All financials are reconciled, paid and collected by us and then distributed to the Board to review in the monthly statement.",
  },
  {
    question: "If there is an emergency after hours, who do I call?",
    answer:
      "Emergency Number: (810)715-5486, then Press 1. The emergency line should only be used after hours. Definition of Emergency: An issue that is dangerous, hazardous, or that if not addressed immediately could cause damage to the property or your personal well-being. **For FIRE, GAS or Natural Disasters, call 911 FIRST**",
  },
  {
    question: "Do I need permission to make changes to my home or yard?",
    answer:
      "Yes, all changes must get the Board’s approval. Fill out a modification request form and submit it to the property manager. Board of Directors approval is required prior to starting work. Modification forms may be obtained by emailing or calling the property manager or online (Association's portal).",
  },
  {
    question: "How can I help build a sense of community?",
    answer:
      "Building a sense of community starts with being involved in your community. Take an active role in the Association’s business by attending meetings and voting, reach out to your fellow members, treat each other with respect, organize or participate in neighborhood activities for example, barbeques, neighborhood block parties, charitable fundraisers, educational seminars, run-walk programs, etc.",
  },
];

export default function HoaResidentFAQ() {
  return (
    <div className="container mx-auto p-6 pt-[136px] font-marcellus">
      <h1 className="text-3xl pt-[48px] font-bold text-gold text-center mb-6">
        HOA Resident FAQ
      </h1>
      <Accordion items={faqs} />
    </div>
  );
}
