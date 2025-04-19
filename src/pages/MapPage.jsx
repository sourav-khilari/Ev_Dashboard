import React, { useState, useMemo, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useData } from "../context/DataContext";
import LoadingSpinner from "../components/LoadingSpinner";
import FilterBar from "../components/FilterBar";

function MapPage() {
  const { csvData, loading, error } = useData();

  const [selectedMake, setSelectedMake] = useState("All");
  const [yearRange, setYearRange] = useState([2010, 2024]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [markersLoading, setMarkersLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const handleReset = () => {
    setMarkersLoading(true);
    setSelectedMake("All");
    setYearRange([2010, 2024]);
  };

  useEffect(() => {
    if (!csvData || csvData.length === 0) return;

    setMarkersLoading(true);

    const timeout = setTimeout(() => {
      const result = csvData.filter((d) => {
        const makeMatch = selectedMake === "All" || d.Make === selectedMake;
        const year = d["Model Year"];
        const yearMatch = year >= yearRange[0] && year <= yearRange[1];
        return (
          makeMatch &&
          yearMatch &&
          d.VehicleLocation?.lat !== undefined &&
          d.VehicleLocation?.lng !== undefined
        );
      });

      setFilteredData(result);
      setMarkersLoading(false);
    }, 100);

    return () => clearTimeout(timeout);
  }, [csvData, selectedMake, yearRange]);

  if (loading) return <LoadingSpinner text="Loading map..." />;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center">🗺️ EV Distribution Map</h1>

      <div className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 p-4 rounded-xl shadow-md text-sm">
        <p>
          This map shows electric vehicle registrations across locations in Washington. Each circle represents one or more EVs.
          <strong> Larger circles = more EVs</strong>. Hover over any circle to see more details.
        </p>
      </div>

      <FilterBar
        originalData={csvData}
        selectedMake={selectedMake}
        setSelectedMake={(val) => {
          setMarkersLoading(true);
          setSelectedMake(val);
        }}
        yearRange={yearRange}
        setYearRange={(range) => {
          setMarkersLoading(true);
          setYearRange(range);
        }}
        onReset={handleReset}
      />

      <div className="relative h-[70vh] rounded-xl overflow-hidden shadow-lg">

        {markersLoading && (
          <div className="absolute inset-0 z-[100] bg-white/60 dark:bg-black/30 flex items-center justify-center pointer-events-none">
            <LoadingSpinner text="Updating map..." />
          </div>
        )}

        <MapContainer
          center={[47.6062, -122.3321]}
          zoom={9}
          scrollWheelZoom={true}
          whenReady={() => setMapLoaded(true)}
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredData.map((vehicle, idx) => (
            <CircleMarker
              key={idx}
              center={[vehicle.VehicleLocation.lat, vehicle.VehicleLocation.lng]}
              radius={3 + Math.min(vehicle.Count || 1, 20)}
              fillOpacity={0.6}
              stroke={false}
              color="#4f46e5"
            >
              <Tooltip direction="top" offset={[0, -6]} opacity={0.9} className="text-sm">
                <span>
                  {vehicle.Make} {vehicle.Model} ({vehicle["Model Year"]})<br />
                  {vehicle.City}, {vehicle.State}
                </span>
              </Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>

        <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 rounded-lg shadow-lg text-xs space-y-2 z-10">
          <p className="font-semibold">Legend: Circle Size</p>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-600" />
            <span>~1 EV</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-blue-600" />
            <span>~10 EVs</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-blue-600" />
            <span>~25+ EVs</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapPage;
