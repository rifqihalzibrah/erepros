import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode[]; // Accept an array of ReactNode as children
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children }) => {
  // Define state for section visibility
  const [visibleSections, setVisibleSections] = useState<boolean[]>(Array(children.length).fill(false));
  const sectionRefs = useRef<(HTMLDivElement | null)[]>(Array(children.length).fill(null));

  // Function to handle visibility change for each section
  const handleVisibilityChange = (index: number) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisibleSections((prev) => {
          const newVisibleSections = [...prev];
          newVisibleSections[index] = entry.isIntersecting;
          return newVisibleSections;
        });
      },
      { threshold: 0.3 } // 30% of the section must be visible to trigger
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
    const cleanupFunctions = sectionRefs.current.map((_, index) => handleVisibilityChange(index));
    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup && cleanup());
    };
  }, [children]);

  return (
    <div>
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          ref={(el) => (sectionRefs.current[index] = el)}
          className={visibleSections[index] ? "opacity-100 fade-up-1s" : "opacity-0"}
        >
          {child} {/* Render the child directly */}
        </div>
      ))}
    </div>
  );
};

export default AnimatedSection;