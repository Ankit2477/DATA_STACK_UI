import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline } from "@mui/material";
import { DataProvider } from "./store/DataProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <CssBaseline />
    <DataProvider>
      <App />
    </DataProvider>
  </>
);
