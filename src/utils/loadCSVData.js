import Papa from "papaparse";
import  parseLatLong  from "./parseLatLong.js";
const loadCSVData = async (url) => {
  const response = await fetch(url);
  const text = await response.text();

  return new Promise((resolve) => {
    Papa.parse(text, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (result) => {
        const cleaned = result.data.map((row) => ({
          ...row,
          VehicleLocation: parseLatLong(row["Vehicle Location"]),
        }));
        resolve(cleaned);
      },
    });
  });
};

export default loadCSVData
