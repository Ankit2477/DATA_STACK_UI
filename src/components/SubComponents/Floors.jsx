import { useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { PropertyTable } from "./PropertyTable";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function FloorInfo() {
  const [floors, setFloors] = useState([
    {
      id: 21,
      edpData: {
        source: "EDP",
        date: "11/20/25",
        floorNumber: "21",
        floorName: "21st Floor",
        floorSize: "120,000",
        slabHeight: "150.00",
      },
      sourceData: {
        floorNumber: "21",
        floorName: "Floor 21",
        floorSize: "120,000",
        slabHeight: "150.00",
      },
    },
    {
      id: 1000,
      edpData: {
        source: "EDP",
        date: "11/20/25",
        floorNumber: "1000",
        floorName: "",
        floorSize: "",
        slabHeight: "",
      },
      sourceData: {
        floorNumber: "1000",
        floorName: "Test 1000",
        floorSize: "",
        slabHeight: "",
      },
    },
  ]);

  const tableHeaders = [
    { key: "source", label: "SOURCE", required: false },
    { key: "floorNumber", label: "FLOOR NUMBER", required: true },
    { key: "floorName", label: "FLOOR NAME", required: true },
    { key: "floorSize", label: "FLOOR SIZE", required: true },
    { key: "slabHeight", label: "SLAB HEIGHT", required: true },
  ];

  const handleSourceChange = (id, newData) => {
    setFloors((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, sourceData: newData } : f
      )
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
    <Box sx={{ml: 2, mb: 2,mt:1,pb: 1}}>
        <Stack spacing={1} alignItems="left">
        <Typography
            sx={{
            fontSize: 14,
            fontWeight: 600,
            mb: 2,
            ml: 1,
            color: "#111827",
            }}
        >
            Floor Info
        </Typography>
        <FilterListIcon sx={{ color: "#065F46" }} fontSize="small" />
        <Typography
            sx={{
            fontSize: 12,
            color: "#065F46",
            fontWeight: 550,
            }}
        >
            Sources
        </Typography>
        </Stack>
    </Box>
    <Box sx={{borderBottom: "1px solid #E5E7EB", mb: 2}}>
    </Box>

      <Box
        sx={{
          height: "calc(100vh - 180px)",
          overflowY: "auto",
          pr: 2,
          ml:2
        }}
      >
        {floors.map((floor) => (
          <Box
            key={floor.id}
            sx={{
              bgcolor: "#fff",
              border: "1px solid #E5E7EB",
              mb: 4,
            }}
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
                Floor {floor.id}
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
                justifyContent: "space-between",
                px: 2,
                py: 1.5,
                alignItems: "center",
              }}
            >
            </Box>

            <PropertyTable
              headers={tableHeaders}
              sourceData={floor.sourceData}
              edpData={floor.edpData}
              onSourceDataChange={(newData) =>
                handleSourceChange(floor.id, newData)
              }
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
