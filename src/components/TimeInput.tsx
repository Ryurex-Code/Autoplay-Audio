"use client";

import { useState, useEffect, useRef } from "react";

interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  label: string;
}

export default function TimeInput({
  value,
  onChange,
  disabled,
  label,
}: TimeInputProps) {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Parse value when it changes
  useEffect(() => {
    const [h, m] = value.split(":");
    setHours(h || "00");
    setMinutes(m || "00");
  }, [value]);

  const incrementHours = () => {
    if (!disabled) {
      const newHours = (parseInt(hours) + 1) % 24;
      const newValue = `${String(newHours).padStart(2, "0")}:${minutes}`;
      onChange(newValue);
    }
  };

  const decrementHours = () => {
    if (!disabled) {
      const newHours = parseInt(hours) - 1 < 0 ? 23 : parseInt(hours) - 1;
      const newValue = `${String(newHours).padStart(2, "0")}:${minutes}`;
      onChange(newValue);
    }
  };

  const incrementMinutes = () => {
    if (!disabled) {
      const newMinutes = (parseInt(minutes) + 1) % 60;
      const newValue = `${hours}:${String(newMinutes).padStart(2, "0")}`;
      onChange(newValue);
    }
  };

  const decrementMinutes = () => {
    if (!disabled) {
      const newMinutes = parseInt(minutes) - 1 < 0 ? 59 : parseInt(minutes) - 1;
      const newValue = `${hours}:${String(newMinutes).padStart(2, "0")}`;
      onChange(newValue);
    }
  };

  // Handle long press - start repeating after delay
  const handleMouseDown = (callback: () => void) => {
    if (disabled) return;
    
    // Execute once immediately
    callback();
    
    // Start repeating after 500ms delay
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        callback();
      }, 100); // Repeat every 100ms
    }, 500);
  };

  const handleMouseUp = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
        {label}
      </label>

      {/* Time Display with Arrow Controls */}
      <div className="flex items-center gap-4">
        {/* Hours Control */}
        <div className="flex flex-col items-center">
          <button
            onMouseDown={() => handleMouseDown(incrementHours)}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={() => handleMouseDown(incrementHours)}
            onTouchEnd={handleMouseUp}
            disabled={disabled}
            className={`p-2 rounded-xl transition-all duration-200 ${
              disabled
                ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                : "bg-gradient-to-br from-primary to-primary/80 text-white hover:shadow-lg hover:scale-110 active:scale-95"
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
            </svg>
          </button>

          <div
            className={`my-3 text-5xl font-bold font-mono min-w-[100px] text-center ${
              disabled ? "text-gray-400" : "text-primary"
            }`}
          >
            {hours}
          </div>

          <button
            onMouseDown={() => handleMouseDown(decrementHours)}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={() => handleMouseDown(decrementHours)}
            onTouchEnd={handleMouseUp}
            disabled={disabled}
            className={`p-2 rounded-xl transition-all duration-200 ${
              disabled
                ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                : "bg-gradient-to-br from-primary to-primary/80 text-white hover:shadow-lg hover:scale-110 active:scale-95"
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Separator */}
        <div className={`text-5xl font-bold font-mono ${disabled ? "text-gray-400" : "text-primary"}`}>
          :
        </div>

        {/* Minutes Control */}
        <div className="flex flex-col items-center">
          <button
            onMouseDown={() => handleMouseDown(incrementMinutes)}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={() => handleMouseDown(incrementMinutes)}
            onTouchEnd={handleMouseUp}
            disabled={disabled}
            className={`p-2 rounded-xl transition-all duration-200 ${
              disabled
                ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                : "bg-gradient-to-br from-secondary to-secondary/80 text-white hover:shadow-lg hover:scale-110 active:scale-95"
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
            </svg>
          </button>

          <div
            className={`my-3 text-5xl font-bold font-mono min-w-[100px] text-center ${
              disabled ? "text-gray-400" : "text-secondary"
            }`}
          >
            {minutes}
          </div>

          <button
            onMouseDown={() => handleMouseDown(decrementMinutes)}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={() => handleMouseDown(decrementMinutes)}
            onTouchEnd={handleMouseUp}
            disabled={disabled}
            className={`p-2 rounded-xl transition-all duration-200 ${
              disabled
                ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                : "bg-gradient-to-br from-secondary to-secondary/80 text-white hover:shadow-lg hover:scale-110 active:scale-95"
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
