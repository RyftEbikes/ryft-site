// src/components/HoverCard.tsx

import React from 'react';

interface HoverCardProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  details?: string;
}

const HoverCard: React.FC<HoverCardProps> = ({ icon, label, value, details }) => (
  <div className="bg-[#181818] p-6 rounded-lg shadow-md hover:shadow-xl transition group text-left">
    <div className="flex items-center mb-3 space-x-3">
      <span>{icon}</span>
      <span className="text-xl font-semibold">{label}</span>
    </div>
    {value && <div className="text-gray-400 mb-2">{value}</div>}
    {details && (
      <div className="text-gray-400 text-sm opacity-80 group-hover:opacity-100 transition">
        {details}
      </div>
    )}
  </div>
);

export default HoverCard;
// src/app/z/page.tsx