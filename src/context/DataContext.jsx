import { createContext, useContext, useEffect, useState } from "react";
import loadCSVData from "../utils/loadCSVData.js";

const DataContext = createContext();

const useData = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const data = await loadCSVData("/Electric_Vehicle_Population_Data.csv");
        setCsvData(data);
      } catch (err) {
        console.error("CSV Load Error:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCSV();
  }, []);

  return (
    <DataContext.Provider value={{ csvData, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};
export { DataProvider, useData };