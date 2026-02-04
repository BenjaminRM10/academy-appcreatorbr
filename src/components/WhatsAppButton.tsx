"use client"

import { MessageCircle, X } from "lucide-react";
import { useState, useEffect } from "react";

interface WhatsAppButtonProps {
  message?: string;
  tooltipText?: string;
  showAutoTooltip?: boolean;
}

export function WhatsAppButton({ 
  message = "Hola, me interesa saber más sobre la Escuela de Ingeniería y Tecnología 4.0",
  tooltipText = "¿Tienes dudas? Escríbenos",
  showAutoTooltip: enableAutoTooltip = true
}: WhatsAppButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showAutoTooltip, setShowAutoTooltip] = useState(false);
  const phoneNumber = "525660081070";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    // Show tooltip automatically after 5 seconds
    const timer = setTimeout(() => {
      setShowAutoTooltip(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseTooltip = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowAutoTooltip(false);
  };

  const showTooltip = isHovered || showAutoTooltip;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Contactar por WhatsApp"
    >
      <div className="relative">
        {/* Tooltip */}
        <div
          className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg transition-all duration-200 ${
            showTooltip ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
          }`}
        >
          <div className="flex items-center gap-2">
            <span>¿Tienes dudas? Escríbenos</span>
            {showAutoTooltip && !isHovered && (
              <button
                onClick={handleCloseTooltip}
                className="hover:bg-white/10 rounded p-0.5 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-8 border-transparent border-l-gray-900" />
        </div>

        {/* Button */}
        <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group-hover:from-green-400 group-hover:to-green-500">
          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20" />
          
          <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white relative z-10" />
        </div>
      </div>
    </a>
  );
}
