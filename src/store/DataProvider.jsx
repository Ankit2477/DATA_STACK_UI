import { useState, useMemo } from "react";
import { DataContext } from "./DataContext";

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const value = useMemo(
    () => ({
      data,
      setData,
      filteredData,
      setFilteredData,
      originalData,
      setOriginalData,
      searchTerm,
      setSearchTerm,
    }),
    [data, filteredData, originalData, searchTerm]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
