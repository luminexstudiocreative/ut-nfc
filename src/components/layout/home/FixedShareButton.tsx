"use client";

import React, { useState } from "react";
import { Share2, X } from "lucide-react";
import shareButtonData from "@/data/shareButton.json";

const FixedShareButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { shareButton, sectionVisible } = shareButtonData;

  // Don't render if section is not visible
  if (!sectionVisible || !shareButton.visible) {
    return null;
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareButton.title,
          text: shareButton.shareText,
          url: shareButton.shareUrl,
        });
      } catch (error) {
        console.log("Error sharing:", error);
        setIsModalOpen(true);
      }
    } else {
      setIsModalOpen(true);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareButton.shareUrl);
      alert("Link copied to clipboard!");
      setIsModalOpen(false);
    } catch (error) {
      console.log("Error copying to clipboard:", error);
    }
  };

  const shareViaWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      `${shareButton.shareText} ${shareButton.shareUrl}`
    )}`;
    window.open(whatsappUrl, "_blank");
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Fixed Share Button */}
      <button
        onClick={handleShare}
        className={`fixed bottom-6 right-6 ${shareButton.bgColor} ${shareButton.hoverColor} 
                   ${shareButton.textColor} p-4 rounded-full shadow-lg 
                   transition-all duration-300 hover:shadow-xl hover:scale-110 z-50`}
      >
        <Share2 className="w-6 h-6" />
      </button>

      {/* Share Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {shareButton.title}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6 text-sm">
              {shareButton.description}
            </p>

            <div className="space-y-3">
              <button
                onClick={copyToClipboard}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Copy Link
              </button>
              
              <button
                onClick={shareViaWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Share via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FixedShareButton;
