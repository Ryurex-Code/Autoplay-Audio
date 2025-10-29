"use client";

import { useState } from "react";

interface ToggleButtonProps {
  onChange: (isCustomTime: boolean) => void;
}

export default function ToggleButton({ onChange }: ToggleButtonProps) {
  const [isCustomTime, setIsCustomTime] = useState(false);

  const handleToggle = () => {
    const newValue = !isCustomTime;
    setIsCustomTime(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={handleToggle}
        className="relative w-72 h-14 bg-gray-200 rounded-full p-1 transition-all duration-300 shadow-md hover:shadow-lg"
        aria-label="Toggle time mode"
      >
        {/* Sliding background */}
        <div
          className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-primary rounded-full transition-all duration-300 ease-in-out shadow-md ${
            isCustomTime ? "left-[calc(50%+2px)]" : "left-1"
          }`}
        />
        
        {/* Text labels */}
        <div className="relative flex h-full">
          <div
            className={`flex-1 flex items-center justify-center transition-colors duration-300 ${
              !isCustomTime ? "text-white font-semibold" : "text-gray-600"
            }`}
          >
            Default
          </div>
          <div
            className={`flex-1 flex items-center justify-center transition-colors duration-300 ${
              isCustomTime ? "text-white font-semibold" : "text-gray-600"
            }`}
          >
            Custom Time
          </div>
        </div>
      </button>
    </div>
  );
}
