import React, { useState } from "react";
import { Box, Typography, Button, Stack, TextField, MenuItem } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { PropertyTable } from "./PropertyTable";

export default function Spaces() {
  const [spaces, setSpaces] = useState([
    {
      id: 1,
      title: "Floor 8 Suite 1",
      status: "Occupied",
      compStatus: "Active",
      confidentiality: "Level 2",
      edpData: {
        source: "EDP",
        date: "11/13/25",
        floorNumber: "8",
        suiteNumber: "1",
        tenant: "WeWork",
        spaceSize: "64,630",
        directSublease: "Direct",
      },
      sourceData: {
        floorNumber: "8",
        suiteNumber: "1",
        tenant: "WeWork",
        spaceSize: "64,630",
        directSublease: "Direct",
      },
    },
    {
      id: 2,
      title: "Floor 6 Suite -",
      status: "Available",
      compStatus: "Active",
      confidentiality: "Level 2",
      edpData: {
        source: "EDP",
        date: "11/09/2026",
        floorNumber: "6",
        suiteNumber: "-",
        availableSF: "400",
        directSublease: "Direct",
      },
      sourceData: {
        floorNumber: "6",
        suiteNumber: "",
        availableSF: "400",
        directSublease: "Direct",
      },
    },
  ]);

  const tableHeaders = [
    { key: "source", label: "SOURCE" },
    { key: "floorNumber", label: "FLOOR NUMBER", required: true },
    { key: "suiteNumber", label: "SUITE NUMBER", required: true },
    { key: "tenant", label: "TENANT", required: true },
    { key: "spaceSize", label: "SPACE SIZE", required: true },
    { key: "directSublease", label: "DIRECT/SUBLEASE", required: true },
  ];

  const handleSourceChange = (id, newData) => {
    setSpaces((prev) => prev.map((s) => (s.id === id ? { ...s, sourceData: newData } : s)));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ ml: 2, mb: 2, mt: 1, pb: 1 }}>
        <Stack spacing={1} alignItems="left">
          <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 2, ml: 1, color: "#111827" }}>
            Spaces
          </Typography>
          <FilterListIcon sx={{ color: "#065F46" }} fontSize="small" />
          <Typography sx={{ fontSize: 12, color: "#065F46", fontWeight: 550 }}>
            Sources
          </Typography>
        </Stack>
      </Box>

      <Box sx={{ borderBottom: "1px solid #E5E7EB", mb: 2 }}></Box>

      <Box
        sx={{
          height: "calc(100vh - 180px)",
          overflowY: "auto",
          pr: 2,
          ml: 2,
        }}
      >
        {spaces.map((space) => (
          <Box
            key={space.id}
            sx={{ bgcolor: "#fff", border: "1px solid #E5E7EB", mb: 4 }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 2,
                bgcolor: "#F9FAFB",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <Typography fontSize={16} fontWeight={600}>
                {space.title}
              </Typography>

              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: 0,
                    height: 30,
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
                  sx={{
                    borderRadius: 0,
                    height: 30,
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

            <Box
              sx={{
                display: "flex",
                gap: 2,
                px: 2,
                py: 2,
                alignItems: "center",
              }}
            >
              <TextField
                select
                size="small"
                value={space.status}
                sx={{ width: 150 }}
              >
                <MenuItem value="Occupied">Occupied</MenuItem>
                <MenuItem value="Available">Available</MenuItem>
              </TextField>

              <TextField select size="small" value={space.compStatus} sx={{ width: 120 }}>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>

              <TextField select size="small" value={space.confidentiality} sx={{ width: 120 }}>
                <MenuItem value="Level 1">Level 1</MenuItem>
                <MenuItem value="Level 2">Level 2</MenuItem>
              </TextField>
            </Box>

            <PropertyTable
              headers={tableHeaders}
              sourceData={space.sourceData}
              edpData={space.edpData}
              onSourceDataChange={(newData) => handleSourceChange(space.id, newData)}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
