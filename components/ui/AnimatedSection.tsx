import React, { useEffect, useRef, useState, ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode; // Accept single or multiple ReactNode(s)
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children }) => {
  const normalizedChildren = React.Children.toArray(children); // Normalize children to an array
  const [visibleSections, setVisibleSections] = useState<boolean[]>(
    Array(normalizedChildren.length).fill(false)
  );
  const sectionRefs = useRef<(HTMLDivElement | null)[]>(
    Array(normalizedChildren.length).fill(null)
  );

  const handleVisibilityChange = (index: number) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisibleSections((prev) => {
          const newVisibleSections = [...prev];
          newVisibleSections[index] = entry.isIntersecting;
          return newVisibleSections;
        });
      },
      { threshold: 0.3 } // Trigger when 30% is visible
    );

    if (sectionRefs.current[index]) {
      observer.observe(sectionRefs.current[index]);
    }

    return () => {
      if (sectionRefs.current[index]) {
        observer.unobserve(sectionRefs.current[index]);
      }
    };
  };

  useEffect(() => {
    const cleanupFunctions = sectionRefs.current.map((_, index) =>
      handleVisibilityChange(index)
    );
    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup && cleanup());
    };
  }, [normalizedChildren]);

  return (
    <div>
      {normalizedChildren.map((child, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) {
              sectionRefs.current[index] = el;
            }
          }}
          className={visibleSections[index] ? "opacity-100 fade-up-1s" : "opacity-0"}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default AnimatedSection;
