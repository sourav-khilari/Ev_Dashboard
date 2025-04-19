import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import FilterBar from "../components/FilterBar";
import ChartSection from "../components/ChartSection";
import YearlyTrendChart from "../components/charts/YearlyTrendChart";
import TopMakesChart from "../components/charts/TopMakesChart";
import RangeDistributionChart from "../components/charts/RangeDistributionChart";
import VehicleTypeChart from "../components/charts/VehicleTypeChart";
import CafvEligibilityChart from "../components/charts/CafvEligibilityChart";
import TopCitiesChart from "../components/charts/TopCitiesChart";
import TopElectricUtilitiesChart from "../components/charts/TopElectricUtilitiesChart";
import TopLegislativeDistrictsChart from "../components/charts/TopLegislativeDistrictsChart";
import StackedVehicleTypeTrendChart from "../components/charts/StackedVehicleTypeTrendChart";

function Dashboard() {
    const { csvData, loading, error } = useData();

    const [selectedMake, setSelectedMake] = useState("All");
    const [yearRange, setYearRange] = useState([2010, 2024]);

    const resetFilters = () => {
        setSelectedMake("All");
        setYearRange([2010, 2024]);
    };

    const filteredData = csvData?.filter((d) => {
        const makeMatch = selectedMake === "All" || d.Make === selectedMake;
        const year = d["Model Year"];
        const yearMatch = year >= yearRange[0] && year <= yearRange[1];
        return makeMatch && yearMatch;
    }) || [];

    if (loading)
        return <p className="text-center mt-20 text-lg">Loading charts...</p>;
    if (error)
        return <p className="text-red-500 text-center mt-20">{error}</p>;

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10">
          <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white">
            📊 Dashboard Insights
          </h1>
      
          <FilterBar
            originalData={csvData}
            selectedMake={selectedMake}
            setSelectedMake={setSelectedMake}
            yearRange={yearRange}
            setYearRange={setYearRange}
            onReset={resetFilters}
          />
      
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
            <ChartSection title="EVs by Model Year">
              <YearlyTrendChart data={filteredData} />
            </ChartSection>
            <ChartSection title="BEV vs PHEV Over Years">
              <StackedVehicleTypeTrendChart data={filteredData} />
            </ChartSection>
          </div>
      
          {/* 2. Vehicle Type & Makes Breakdown */}
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
            <ChartSection title="Electric Vehicle Types (BEV vs. PHEV)">
              <VehicleTypeChart data={filteredData} />
            </ChartSection>
            <ChartSection title="Top 5 Vehicle Makes">
              <TopMakesChart data={filteredData} />
            </ChartSection>
          </div>
      
          {/* 3. Performance & Eligibility */}
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
            <ChartSection title="Electric Range Distribution">
              <RangeDistributionChart data={filteredData} />
            </ChartSection>
            <ChartSection title="CAFV Eligibility Status">
              <CafvEligibilityChart data={filteredData} />
            </ChartSection>
          </div>
      
          {/* 4. Geographic Distribution */}
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
            <ChartSection title="Top Cities by EV Count">
              <TopCitiesChart data={filteredData} />
            </ChartSection>
            <ChartSection title="Top Electric Utilities by EV Count">
              <TopElectricUtilitiesChart data={filteredData} />
            </ChartSection>
          </div>
      
         
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
            <ChartSection title="EVs by Legislative District">
              <TopLegislativeDistrictsChart data={filteredData} />
            </ChartSection>
          </div>
        </div>
      );
      
}

export default Dashboard;
