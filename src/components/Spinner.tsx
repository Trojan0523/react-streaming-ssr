import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg shadow-sm min-h-[200px]">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      <div className="text-gray-600 text-base font-bold mb-2 animate-pulse">Loading comments... (5 second simulation)</div>
      <div className="text-gray-500 text-sm text-center max-w-[250px]">Watch how Suspense keeps the UI responsive!</div>
    </div>
  );
};

export default Spinner;
