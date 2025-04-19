// components/LoadingSpinner.jsx
import React from "react";

function LoadingSpinner({ text = "Loading...", overlay = false }) {
  return (
    <div className={`flex flex-col items-center justify-center space-y-2 ${overlay ? "" : "h-40"}`}>
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600" />
      <p className="text-sm text-gray-700 dark:text-gray-300">{text}</p>
    </div>
  );
}

export default LoadingSpinner;
