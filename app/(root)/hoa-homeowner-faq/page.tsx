"use client";

import Accordion from "@/components/ui/Accordion";

const faqs = [
  {
    question: "Where can I find the HOA rules and documents?",
    answer:
      "If you are a homeowner in one of our associations, you'll be able to find all of these documents and information in your homeowner portal under Documents → “Building  Documents\" tab.",
  },
  {
    question: "Do you mail monthly statements?",
    answer:
      "No. We only mail statements when an account is delinquent and has a balance owing after the HOA's dues payment grace period has passed.",
  },
  {
    question: "What are my rights and responsibilities as a homeowner? ",
    answer:
      "Owners have a right and obligation to vote on rules and budgets, attend meetings and voice their opinions, and expect fair treatment within the community. They are responsible for financial support (dues), maintaining their property according to established rules, and vote in community elections and other association issues.",
  },
  {
    question: "What do the HOA fees cover?",
    answer:
      "An HOA fee can cover several different items depending on the particular HOA. Please visit your HOA link or contact our office at info@erepros.com.",
  },
  {
    question: "How do I submit a complaint or rule violation?",
    answer:
      "We encourage you to get pictures whenever possible, and email those with your concerns detailed to info@erepros.com.",
  },
  {
    question: "How do I request permission to modify my home?",
    answer:
      "You can submit the details of the modifications you'd like to make to the association's Board for review and approval through your homeowner portal by filling out a Modification Request. Another option would be to fill out a Modification Request form located under Building Documents in your portal, and email that to us at info@erepros.com.",
  },
];

export default function OwnerFAQ() {
  return (
    <div className="container mx-auto p-6 pt-[136px] font-marcellus">
      <h1 className="text-3xl pt-[48px] font-bold text-gold text-center mb-6">
        HOA Homeowner FAQ
      </h1>
      <Accordion items={faqs} />
    </div>
  );
}
