import React, { useState, useEffect } from "react";
import { PropertyTable } from "./SubComponents/PropertyTable";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Stack, Box, Typography, Button, Grid, Divider } from "@mui/material";
import AntSwitch from "./SubComponents/Buttons/AntSwitch";
import axiosClient from "../utils/axiosClient";

export default function PropertyInfo() {
  const [edpData] = useState({
    source: "EDP",
    date: "11/20/25",
    propertyName: "Metropolitan Square",
    grossArea: "525,000",
    nra: "525,105",
    officeNra: "525,101",
    floors: "21",
  });

  const [sourceData, setSourceData] = useState({
    propertyName: "Metropolitan Square",
    grossArea: "525,000",
    nra: "525,105",
    officeNra: "525,101",
    floors: "21",
  });
  const [sources] = useState(
    [
      { id: "edp", source: "EDP", date: "01/01/2025",     propertyName: "Metropolitan Square",
    grossArea: "525",
    nra: "525,105",
    officeNra: "525,10",
    floors: "21" 
     },
    { id: "legacy", source: "LEGACY", date: "01/03/2025",     propertyName: "Time Square",
    grossArea: "725,0",
    nra: "525",
    officeNra: "825,101",
    floors: "22" 
  }]);

  const tableHeaders = [
    { key: "source", label: "SOURCE", required: false },
    { key: "propertyName", label: "PROPERTY NAME", required: true },
    { key: "grossArea", label: "GROSS AREA", required: true },
    { key: "nra", label: "NRA", required: true },
    { key: "officeNra", label: "OFFICE NRA", required: true },
    { key: "floors", label: "FLOOR COUNT", required: true },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosClient.get("/propDetails/getDetails");
        const records = res.data?.payload || [];

        if (records.length > 0) {
          const api = records[records.length - 1];
          setSourceData(prev => ({
            ...prev,
            propertyName: api.propertyName || prev.propertyName,
            grossArea: api.grossArea || prev.grossArea,
            nra: api.nra || prev.nra,
            officeNra: api.officeNra || prev.officeNra,
            floors: api.floorCount ? String(api.floorCount) : prev.floors,
          }));
        }

      } catch (error) {
        console.log("API ERROR:", error);
      }
    };

    fetchData();
  }, []);

  console.log("Rendering PropertyInfo...", sourceData);

  useEffect(() => console.log("Fetching Source data..."), []);

  const handleSendToEDP = async () => {
    const dataToSend = sourceData;
    const missing = tableHeaders.some(
      (h) => h.required && !dataToSend[h.key]
    );

    if (missing) {
      alert("Please fill in all required fields");
      return;
    }
    const payload = {
      propertyName: dataToSend.propertyName,
      grossArea: dataToSend.grossArea,
      nra: dataToSend.nra,
      officeNra: dataToSend.officeNra,
      floorCount: dataToSend.floors, 
    };
    try {
      const res = await axiosClient.post(
        "/propDetails/details",
        payload
      );
      alert("Data sent to EDP successfully!");
      console.log("EDP Response:", res.data);
    } catch (error) {
      console.error("EDP API Error:", error);
      alert("Failed to send data to EDP.");
    }
  };



  return (
    <Box sx={{ minHeight: "100vh", p: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* ---------------- PROPERTY INFORMATION PANEL ---------------- */}
        <Box sx={{ width: "100%" }}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              mb: 2,
              color: "#111827",
            }}
          >
            Property Information
          </Typography>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              bgcolor: "#F8FAF8",
              overflow: "hidden",
              minHeight: "230px",
            }}
          >
            {/* LEFT IMAGE PANEL */}
            <Box sx={{ width: "260px", position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400"
                alt="Property"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            {/* DETAILS WRAPPER */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                px: 4,
                py: 3,
                alignItems: "flex-start",
                gap: 6,
              }}
            >
              {/* LEFT COLUMN */}
              <Box mr={4}>
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ fontSize: "11px", color: "#9CA3AF" }}>
                    NRA
                  </Typography>
                  <Typography sx={{ fontSize: "13px", color: "#065F46", fontWeight: 600 }}>
                    525,105 SF
                  </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ fontSize: "11px", color: "#9CA3AF" }}>
                    Class
                  </Typography>
                  <Typography sx={{ fontSize: "13px", color: "#065F46" }}>
                    Class A
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "11px", color: "#9CA3AF"}}>
                    Year Built
                  </Typography>
                  <Typography sx={{ fontSize: "13px", color: "#065F46" }}>
                    1977
                  </Typography>
                </Box>
              </Box>

              {/* MIDDLE COLUMN */}
              <Box mr={4}>
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ fontSize: "11px", color: "#065F46" }}>
                    Office NRA
                  </Typography>
                  <Typography sx={{ fontSize: "13px", color: "#065F46", fontWeight: 600 }}>
                    525,101 SF
                  </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ fontSize: "11px", color: "#065F46" }}>
                    Floors
                  </Typography>
                  <Typography sx={{ fontSize: "13px", color: "#065F46" }}>
                    21
                  </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ fontSize: "11px", color: "#9CA3AF"}}>
                    Last Renovated
                  </Typography>
                  <Typography sx={{ fontSize: "13px", color: "#065F46" }}>
                    –
                  </Typography>
                </Box>
              </Box>

              {/* GREEN DIVIDER */}
              <Box
                sx={{
                  width: "2px",
                  bgcolor: "#a8ebd4ff",
                  height: "100%",
                  opacity: 0.7,
                }}
              />

              {/* RIGHT COLUMN */}
              <Box>
                <Typography sx={{ fontSize: "11px", color: "#065F46", mb: 1 }}>
                  Listing Brokers
                </Typography>

                <Typography
                  sx={{
                    fontSize: "13px",
                    color: "#065F46",
                    fontWeight: 600,
                    mb: 0.5,
                  }}
                >
                  CBRE
                </Typography>

                <Typography sx={{ fontSize: "13px", color: "#111827", mb: 0.5 }}>
                  DJ Callahan
                </Typography>

                <Typography sx={{ fontSize: "11px", color: "#6B7280" }}>
                  daniel.callahan@cbre.com
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>


        {/* ---------------- PROPERTY DETAILS PANEL ---------------- */}
        <Box
          sx={{
            bgcolor: "#FFFFFF",
            border: "1px solid #E5E7EB",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <Typography fontSize={18} fontWeight={600}>
              Property Details
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: 0,
                  height: 32,
                  fontSize: 11,
                  fontWeight: 550,
                  borderColor: "#065F46",
                  color: "#065F46",
                  textTransform: "none",
                }}
              >
                REVIEWED
              </Button>

              <Button
                variant="outlined"
                onClick={handleSendToEDP}
                sx={{
                  borderRadius: 0,
                  height: 32,
                  fontSize: 11,
                  fontWeight: 550,
                  borderColor: "#065F46",
                  color: "#065F46",
                  textTransform: "none",
                }}
              >
                SEND TO EDP
              </Button>
            </Stack>
          </Box>

          {/* FILTER ROW */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              pl: 2,
              pr: 2,
              pb: 2,
              alignItems: "center",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <FilterListIcon sx={{ color: "#065F46" }} fontSize="small" />
              <Typography sx={{fontSize: 11, color: "#065F46", fontWeight: 550 }}>Sources</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <AntSwitch defaultunchecked="true" />
              <Typography fontSize={12} color="#0b0b0c">
                Select High-Confidence Ellis AI Matches
              </Typography>
            </Stack>
          </Box>

          {/* TABLE */}
          <PropertyTable
            headers={tableHeaders}
            sourceData={sourceData}
            edpData={edpData}
            sources={sources}
            onSourceDataChange={setSourceData}
          />
        </Box>
      </Box>
    </Box>
  );
}
  
