import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  Switch,
  Stack,
} from "@mui/material";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import { PropertyTable } from "./PropertyTable";
import axiosClient from "../../utils/axiosClient";
import { useParams } from "react-router-dom";

export default function Spaces() {
  const { id } = useParams();
  const [spaces, setSpaces] = useState([
    {
      id: 1,
      title: "Floor 8",
      subtitle: "Suite 1",
      statusLabel: "Comp Status",
      status: "Occupied",
      compStatus: "Active",
      confidentiality: "Level 2",
      edpData: {
        source: "EDP",
        date: "11/13/25",
        floorNumber: "8",
        suiteNumber: "-",
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
      headers: [
        { key: "source", label: "SOURCE" },
        { key: "floorNumber", label: "FLOOR NUMBER", required: true },
        { key: "suiteNumber", label: "SUITE NUMBER" },
        { key: "tenant", label: "TENANT", required: true },
        { key: "spaceSize", label: "SPACE SIZE", required: true },
        { key: "directSublease", label: "DIRECT/SUBLEASE" },
      ],
    },
    {
      id: 2,
      title: "Floor 6",
      subtitle: "Suite -",
      statusLabel: "Availability Status",
      status: "Available",
      compStatus: "Active",
      confidentiality: "Level 2",
      sourceData: {
        floorNumber: "6",
        suiteNumber: "",
        availableSF: "400",
        directSublease: "Direct",
        dateOnMarket: "12/09/2016",
      },
      headers: [
        { key: "source", label: "SOURCE" },
        { key: "floorNumber", label: "FLOOR NUMBER", required: true },
        { key: "suiteNumber", label: "SUITE NUMBER" },
        { key: "availableSF", label: "AVAILABLE SF", required: true },
        { key: "directSublease", label: "DIRECT/SUBLEASE" },
        { key: "dateOnMarket", label: "DATE ON MARKET" },
      ],
    },
  ]);

    const [sources] = useState([
      {
        id: "edp", source: "EDP", date: "11/20/25",
        floorNumber: "8",
        suiteNumber: "1",
        tenant: "WeWork",
        spaceSize: "64,630",
        availableSF: "400",
        dateOnMarket: "12/09/2016",
        directSublease: "Direct",
      },
    ]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axiosClient.get("/propDetails/getSpacesById/" + id);
      const records = res.data.data || [];
      console.log("Fetched Spaces Data:", records);

      const mapped = records.map((f, index) => ({
        id: index + 1,
        spaceId: f._id,
        title: `Floor ${f.floorNumber}`,
        subtitle: `Suite ${f.suiteNumber || "-"}`,
        
        statusLabel: "Availability Status",
        status: f.tenant ? "Occupied" : "Available",
        compStatus: "Active",
        confidentiality: "Level 2",

        sourceData: {
          floorNumber: f.floorNumber,
          suiteNumber: f.suiteNumber,
          tenant: f.tenant || "",
          spaceSize: f.spaceSize || "",
          directSublease: f.directSublease || "",
          dateOnMarket: f.dateOnMarket,
        },

        headers: [
          { key: "source", label: "SOURCE" },
          { key: "floorNumber", label: "FLOOR NUMBER", required: true },
          { key: "suiteNumber", label: "SUITE NUMBER" },
          { key: "tenant", label: "TENANT", required: true },
          { key: "spaceSize", label: "SPACE SIZE", required: true },
          { key: "directSublease", label: "DIRECT/SUBLEASE" },
          { key: "dateOnMarket", label: "DATE ON MARKET" },
        ],
      }));

      setSpaces(mapped);

    } catch (error) {
      console.log("API ERROR:", error);
    }
  };

  fetchData();
}, [id]);


  const handleSourceChange = (id, newData) => {
    setSpaces((prev) =>
      prev.map((s) => (s.id === id ? { ...s, sourceData: newData } : s))
    );
  };

  const handleSendToEDP = async (space) => {
    try {
      const payload = {
        spaceId: space.spaceId,
        suiteNumber: space.sourceData.suiteNumber,
        tenant: space.sourceData.tenant,
        spaceSize: space.sourceData.spaceSize,
        directSublease: space.sourceData.directSublease,
        dateOnMarket: space.sourceData.dateOnMarket,
      };
      await axiosClient.put("/propDetails/updateSpace/" + id, payload);

      alert("Sent to EDP successfully");
      
    } catch (err) {
      console.error("Send to EDP Error", err);
      alert("Something went wrong");
    }
};


  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#fff" }}>
      <Box sx={{ flex: 1, overflow: "auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
            p:1
          }}
        >
          <Typography sx={{ fontSize: 20, fontWeight: 600, color: "#111827" }}>
            Spaces
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
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
            NEW SPACE
          </Button>
        </Box>

        <Box 
          sx={{ display: "flex", alignItems: "center", 
                gap: 1.5, mb: 1.5,pb: 1.5, 
                borderBottom: "1px solid #E5E7EB"
              }}>
          <Stack direction="column">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 1.5,
                py: 0.5,
              }}
            >
              <FilterListIcon sx={{ fontSize: 16, color: "#065F46" }} />
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#065F46" }}>
                Sources
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                ml:4.5
              }}
            >
              <Typography sx={{ fontSize: 10, fontWeight: 600, color: "#a5a3a2ff" }}>
                22 / 41 Spaces
              </Typography>
              <Box
                sx={{
                  width: 13,
                  height: 13,
                  borderRadius: "50%",
                  bgcolor: "#e99607ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 700,
                }}
              >
                i
              </Box>
            </Box>
          </Stack>

          <Box sx={{ flex: 1 }} />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              component="label"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <Switch
                size="small"
                disabled
                sx={{
                  "& .MuiSwitch-switchBase": {
                    "&.Mui-checked": {
                      color: "#10B981",
                      "& + .MuiSwitch-track": {
                        bgcolor: "#10B981",
                      },
                    },
                  },
                }}
              />
              <Typography sx={{ fontSize: 13, color: "#6B7280" }}>
                Select High-Confidence Ellis AI Matches
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{p:1}}>
          {spaces.map((space) => (
            <Box
              key={space.id}
              sx={{
                bgcolor: "#fff",
                border: "1px solid #E5E7EB",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 2,
                  py: 1.5,
                  bgcolor: "#F9FAFB",
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box>
                    <FlagOutlinedIcon sx={{ fontSize: 18, color: "#9CA3AF" }} />
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>
                      {space.title} {space.subtitle}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 10,
                        color: "#6B7280",
                        fontWeight: 500,
                        mb: 0.3,
                      }}
                    >
                      Status
                    </Typography>
                  <Select
                    value={space.status}
                    size="small"
                    sx={{
                      fontSize: 12,
                      borderRadius: 0,
                      height: 30,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#D1D5DB",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#9CA3AF",
                      },
                      minWidth: 120,
                    }}
                  >
                    <MenuItem value="Occupied">Occupied</MenuItem>
                    <MenuItem value="Available">Available</MenuItem>
                  </Select>
                  </Box>

                  {/* Comp Status */}
                  <Box sx={{ minWidth: 100 }}>
                    <Typography
                      sx={{
                        fontSize: 10,
                        color: "#6B7280",
                        fontWeight: 500,
                        mb: 0.3,
                      }}
                    >
                      Comp Status
                    </Typography>
                    <Select
                      value={space.compStatus}
                      size="small"
                      sx={{
                        fontSize: 12,
                        borderRadius: 0,
                        height: 30,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#D1D5DB",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#9CA3AF",
                        },
                        width: "100%",
                      }}
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                  </Box>
                  <Box sx={{ minWidth: 100 }}>
                    <Typography
                      sx={{
                        fontSize: 10,
                        color: "#6B7280",
                        fontWeight: 500,
                        mb: 0.3,
                      }}
                    >
                      Confidentiality
                    </Typography>
                    <Select
                      value={space.confidentiality}
                      size="small"
                      sx={{
                        fontSize: 12,
                        borderRadius: 0,
                        height: 30,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#D1D5DB",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#9CA3AF",
                        },
                        width: "100%",
                      }}
                    >
                      <MenuItem value="Level 1">Level 1</MenuItem>
                      <MenuItem value="Level 2">Level 2</MenuItem>
                    </Select>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
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
                    onClick={()=> handleSendToEDP(space)}
                  >
                    SEND TO EDP
                  </Button>
                </Box>
              </Box>
              <PropertyTable
                headers={space.headers}
                sourceData={space.sourceData}
                sources={sources}
                onSourceDataChange={(newData) => handleSourceChange(space.id, newData)}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}