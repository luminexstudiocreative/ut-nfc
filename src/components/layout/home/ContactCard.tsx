"use client";

import React from "react";
import { Phone, MessageCircle, Mail, Instagram, Facebook, Globe } from "lucide-react";
import contactCardData from "@/data/contactCard.json";

const iconMap = {
  Phone,
  MessageCircle,
  Mail,
  Instagram,
  Facebook,
  Globe,
};

const ContactCard = () => {
  const { contactCard } = contactCardData;

  const handleContactClick = (href: string) => {
    window.open(href, "_blank");
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {contactCard.title}
        </h2>
        <p className="text-gray-600 text-lg">
          {contactCard.subtitle}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contactCard.contacts.map((contact) => {
          const IconComponent = iconMap[contact.icon as keyof typeof iconMap];
          
          return (
            <button
              key={contact.id}
              onClick={() => handleContactClick(contact.href)}
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200
                         p-4 rounded-lg shadow-md transition-all duration-300 
                         hover:shadow-lg hover:scale-105 flex items-center 
                         space-x-3 min-h-[70px]"
            >
              <IconComponent className="w-6 h-6 flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-semibold text-sm">{contact.label}</h3>
                <p className="text-xs opacity-90">{contact.value}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ContactCard;
