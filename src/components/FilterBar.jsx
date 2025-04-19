// import React, { useMemo } from "react";

// function FilterBar({
//   originalData,
//   selectedMake,
//   setSelectedMake,
//   yearRange,
//   setYearRange,
//   onReset,
// }) {
//   const allMakes = useMemo(() => {
//     if (!originalData) return [];
//     return ["All", ...Array.from(new Set(originalData.map((d) => d.Make)))];
//   }, [originalData]);

//   return (
//     <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-3 gap-6">
      
//       <div className="flex flex-col">
//         <label className="text-sm text-gray-700 dark:text-gray-200 font-medium mb-2">
//           Vehicle Make
//         </label>
//         <select
//           value={selectedMake}
//           onChange={(e) => setSelectedMake(e.target.value)}
//           className="p-3 rounded-lg border-2 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           {allMakes.map((make) => (
//             <option key={make} value={make}>
//               {make}
//             </option>
//           ))}
//         </select>
//       </div>

    
//       <div className="flex flex-col md:flex-row gap-6 md:items-center">
//         <div className="flex flex-col md:flex-row md:items-center gap-4">
//           <div className="flex flex-col">
//             <label className="text-sm text-gray-700 dark:text-gray-200 font-medium mb-2">
//               Model Year From:
//             </label>
//             <input
//               type="number"
//               className="p-3 w-28 rounded-lg border-2 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={yearRange[0]}
//               onChange={(e) => setYearRange([Number(e.target.value), yearRange[1]])}
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="text-sm text-gray-700 dark:text-gray-200 font-medium mb-2">
//               To:
//             </label>
//             <input
//               type="number"
//               className="p-3 w-28 rounded-lg border-2 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={yearRange[1]}
//               onChange={(e) => setYearRange([yearRange[0], Number(e.target.value)])}
//             />
//           </div>
//         </div>
//       </div>

     
//       <div className="mt-3.5 flex h-[70%] justify-center md:justify-end">
//         <button
//           onClick={onReset}
//           className="bg-red-500 hover:bg-red-600 text-amber-900 px-6 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
//         >
//           Reset Filters
//         </button>
//       </div>
//     </div>
//   );
// }

// export default FilterBar;


import React, { useMemo, useState, useEffect } from "react";

function FilterBar({
  originalData,
  selectedMake,
  setSelectedMake,
  yearRange,
  setYearRange,
  onReset,
}) {
  // Local state for temp inputs
  const [tempMake, setTempMake] = useState(selectedMake);
  const [tempYearRange, setTempYearRange] = useState(yearRange);

  // Keep temp state in sync if parent updates (like Reset)
  useEffect(() => {
    setTempMake(selectedMake);
    setTempYearRange(yearRange);
  }, [selectedMake, yearRange]);

  const allMakes = useMemo(() => {
    if (!originalData) return [];
    return ["All", ...Array.from(new Set(originalData.map((d) => d.Make)))];
  }, [originalData]);

  const handleApply = () => {
    setSelectedMake(tempMake);
    setYearRange(tempYearRange);
  };

  const handleReset = () => {
    onReset();
    setTempMake("All");
    setTempYearRange([2010, 2024]); // fallback default if needed
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Vehicle Make Dropdown */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-700 dark:text-gray-200 font-medium mb-2">
          Vehicle Make
        </label>
        <select
          value={tempMake}
          onChange={(e) => setTempMake(e.target.value)}
          className="p-3 rounded-lg border-2 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {allMakes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
      </div>

      {/* Year Range Inputs */}
      <div className="flex flex-col md:flex-row gap-6 md:items-center">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 dark:text-gray-200 font-medium mb-2">
              Model Year From:
            </label>
            <input
              type="number"
              className="p-3 w-28 rounded-lg border-2 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={tempYearRange[0]}
              onChange={(e) =>
                setTempYearRange([Number(e.target.value), tempYearRange[1]])
              }
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 dark:text-gray-200 font-medium mb-2">
              To:
            </label>
            <input
              type="number"
              className="p-3 w-28 rounded-lg border-2 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={tempYearRange[1]}
              onChange={(e) =>
                setTempYearRange([tempYearRange[0], Number(e.target.value)])
              }
            />
          </div>
        </div>
      </div>

      {/* Apply & Reset Buttons */}
      <div className="flex flex-col justify-end items-center gap-3 md:flex-row md:justify-end md:items-end col-span-2">
        <button
          onClick={handleApply}
          className="bg-blue-600 hover:bg-blue-700 text-blue-800 px-6 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Apply Filters
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 hover:bg-red-600 text-red-950 px-6 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default FilterBar;
