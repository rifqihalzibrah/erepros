// components/tenant-faq/Accordion.tsx
import { useState } from "react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  return (
    <div
      className={`border border-gold mb-4 ${
        isOpen ? "border-gold" : "border-gold"
      }`}
    >
      <div
        className={`p-4 flex justify-between items-center cursor-pointer py-4 transition-all duration-300 ${
          isOpen ? "bg-gold text-white" : "bg-white text-gold"
        }`}
        onClick={onToggle}
      >
        <h2 className="font-marcellus">{question}</h2>
        <span>{isOpen ? "-" : "+"}</span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40" : "max-h-0"
        }`}
      >
        <p className="text-white text-sm font-marcellus px-4 pt-2 pb-4 bg-gold">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default Accordion;
