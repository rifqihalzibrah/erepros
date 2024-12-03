// components/ui/IconWithTitle.tsx
import React from 'react';

interface IconWithTitleProps {
  iconSrc: string; // URL for the icon
  title: string; // Title text
}

const IconWithTitle: React.FC<IconWithTitleProps> = ({ iconSrc, title }) => {
  return (
    <div className="flex items-center mb-4">
      <img src={iconSrc} alt={title} className="w-8 h-8 mr-2" />
      <h2 className="text-2xl font-bold text-gold">{title}</h2>
    </div>
  );
};

export default IconWithTitle;
