"use client";

import React from "react";
import { MapPin, CreditCard } from "lucide-react";
import actionButtonsData from "@/data/actionButtons.json";

const iconMap = {
  MapPin,
  CreditCard,
};

const ActionButtons = () => {
  const { actionButtons, sectionVisible } = actionButtonsData;

  const handleClick = (href: string) => {
    window.open(href, "_blank");
  };

  // Don't render the entire section if sectionVisible is false
  if (!sectionVisible) {
    return null;
  }

  // Filter out hidden buttons
  const visibleButtons = actionButtons.filter(button => button.visible);

  // Don't render if no buttons are visible
  if (visibleButtons.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleButtons.map((button) => {
          const IconComponent = iconMap[button.icon as keyof typeof iconMap];
          
          return (
            <button
              key={button.id}
              onClick={() => handleClick(button.href)}
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200
                         p-6 rounded-xl shadow-lg transition-all duration-300 
                         hover:shadow-xl hover:scale-105 flex items-center 
                         space-x-4 min-h-[80px]"
            >
              <IconComponent className="w-8 h-8 flex-shrink-0" />
              <div className="text-left">
                <h3 className="text-lg font-semibold">{button.label}</h3>
                <p className="text-sm opacity-90">{button.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ActionButtons;
