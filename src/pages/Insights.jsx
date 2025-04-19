// File: src/pages/Insights.jsx
import React from "react";
import { useData } from "../context/DataContext";
import SummaryStats from "../components/insights/SummaryStats";
import InsightsGrid from "../components/insights/InsightsGrid";
import InsightCard from "../components/insights/InsightCard";
import {
  Star,
  Leaf,
  Calendar,
  MapPin,
  Bolt,
  BatteryCharging,
  ShieldCheck,
} from "lucide-react";

export default function Insights() {
  const { csvData, loading, error } = useData();

  if (loading) {
    return <p className="text-center mt-10">Loading insights...</p>;
  }
  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  // Helper to get the top key and its count for any field
  const getTopEntry = (field) => {
    const counts = csvData.reduce((acc, row) => {
      const key = row[field];
      if (key) {
        acc[key] = (acc[key] || 0) + 1;
      }
      return acc;
    }, {});
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)[0] || ["N/A", 0];
  };

  const [topMake] = getTopEntry("Make");
  const [topCity, topCityCount] = getTopEntry("City");
  const [topUtility] = getTopEntry("Electric Utility");
  const [topCafvStatus] = getTopEntry(
    "CAFV Clean Alternative Fuel Vehicle (CAFV) Eligibility"
  );
  const [topDistrict] = getTopEntry("Legislative District");

  const highestRangeEV =
    csvData.reduce(
      (max, curr) =>
        (curr["Electric Range"] || 0) > (max["Electric Range"] || 0)
          ? curr
          : max,
      {}
    ) || {};
  const highestRangeValue = highestRangeEV["Electric Range"] || 0;

  const recentYear = Math.max(
    ...csvData.map((d) => d["Model Year"] || 0)
  );

  const evTypeCounts = csvData.reduce(
    (acc, row) => {
      const type = row["Electric Vehicle Type"];
      if (type === "Battery Electric Vehicle (BEV)") {
        acc.bev += 1;
      } else if (
        type === "Plug-in Hybrid Electric Vehicle (PHEV)"
      ) {
        acc.phev += 1;
      }
      return acc;
    },
    { bev: 0, phev: 0 }
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
        🔍 Data Insights
      </h1>

      <SummaryStats data={csvData} />

      <InsightsGrid>
        <InsightCard
          title="Most Popular Make"
          description={`The most common EV make is ${topMake}.`}
          icon={<Star />}
        />

        <InsightCard
          title="Highest Electric Range"
          description={`The top range is ${highestRangeValue} miles (${highestRangeEV.Make} ${highestRangeEV.Model}).`}
          icon={<Leaf />}
        />

        <InsightCard
          title="Most Recent Model Year"
          description={`The newest model year recorded is ${recentYear}.`}
          icon={<Calendar />}
        />

        <InsightCard
          title="Top EV City"
          description={`${topCity} leads with ${topCityCount.toLocaleString()} registrations.`}
          icon={<MapPin />}
        />

        <InsightCard
          title="Leading Utility"
          description={`Most EVs are serviced by ${topUtility}.`}
          icon={<Bolt />}
        />

        <InsightCard
          title="BEV vs PHEV"
          description={`BEVs: ${evTypeCounts.bev.toLocaleString()}, PHEVs: ${evTypeCounts.phev.toLocaleString()}.`}
          icon={<BatteryCharging />}
        />

        <InsightCard
          title="CAFV Eligibility"
          description={`Most vehicles are "${topCafvStatus}".`}
          icon={<ShieldCheck />}
        />

        <InsightCard
          title="Top Legislative District"
          description={`District ${topDistrict} has the highest EV count.`}
          icon={<MapPin />}
        />
      </InsightsGrid>
    </div>
  );
}
