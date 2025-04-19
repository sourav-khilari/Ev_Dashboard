import React from "react";
import { useData } from "../context/DataContext";
import InfoCard from "../components/InfoCard";

const Home = () => {
  const { csvData, loading, error } = useData();

  if (loading) return <p className="text-center text-lg">Loading EV data...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  const totalVehicles = csvData.length;

  const makeCount = csvData.reduce((acc, curr) => {
    acc[curr.Make] = (acc[curr.Make] || 0) + 1;
    return acc;
  }, {});
  const mostCommonMake = Object.entries(makeCount).sort((a, b) => b[1] - a[1])[0]?.[0];

  const vehicleTypes = csvData.reduce((acc, curr) => {
    acc[curr["Electric Vehicle Type"]] = (acc[curr["Electric Vehicle Type"]] || 0) + 1;
    return acc;
  }, {});
  const popularVehicleType = Object.entries(vehicleTypes).sort((a, b) => b[1] - a[1])[0]?.[0];

  const cities = csvData.reduce((acc, curr) => {
    acc[curr.City] = (acc[curr.City] || 0) + 1;
    return acc;
  }, {});
  const popularCity = Object.entries(cities).sort((a, b) => b[1] - a[1])[0]?.[0];

  const uniqueMakes = new Set(csvData.map((v) => v.Make));
  const averageRange = Math.round(
    csvData.reduce((acc, curr) => acc + (curr["Electric Range"] || 0), 0) / totalVehicles
  );

  const years = csvData.map((v) => v["Model Year"]).filter(Boolean);
  const earliestYear = Math.min(...years);
  const latestYear = Math.max(...years);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          ⚡ Electric Vehicle Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <InfoCard label="Total EVs" value={totalVehicles} />
          <InfoCard label="Unique Makes" value={uniqueMakes.size} />
          <InfoCard label="Most Common Make" value={mostCommonMake} />
          <InfoCard label="Popular EV Type" value={popularVehicleType} />
          <InfoCard label="Top City" value={popularCity} />
          <InfoCard label="Avg Electric Range" value={`${averageRange} miles`} />
          <InfoCard label="Model Year Range" value={`${earliestYear} - ${latestYear}`} />
        </div>
      </div>
    </div>
  );
};

export default Home;
