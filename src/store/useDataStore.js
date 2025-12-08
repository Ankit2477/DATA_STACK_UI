import { useContext } from "react";
import { DataContext } from "./DataContext";

export const useDataStore = () => useContext(DataContext);
