"use client";

import React from "react";
import { Phone, Mail, MessageCircle, Instagram } from "lucide-react";
import socialButtonsData from "@/data/socialButtons.json";

const iconMap = {
  Phone,
  Mail,
  MessageCircle,
  Instagram,
};

const SocialButtons = () => {
  const { socialButtons, sectionVisible } = socialButtonsData;

  const handleClick = (href: string) => {
    window.open(href, "_blank");
  };

  // Don't render the entire section if sectionVisible is false
  if (!sectionVisible) {
    return null;
  }

  // Filter out hidden buttons
  const visibleButtons = socialButtons.filter(button => button.visible);

  // Don't render if no buttons are visible
  if (visibleButtons.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {visibleButtons.map((button) => {
          const IconComponent = iconMap[button.icon as keyof typeof iconMap];
          
          return (
            <button
              key={button.id}
              onClick={() => handleClick(button.href)}
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200
                         p-4 rounded-xl shadow-lg transition-all duration-300 
                         hover:shadow-xl hover:scale-105 flex flex-col items-center 
                         space-y-2 min-h-[100px] justify-center"
            >
              <IconComponent className="w-6 h-6 md:w-8 md:h-8" />
              <span className="text-sm md:text-base font-medium">
                {button.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SocialButtons;
