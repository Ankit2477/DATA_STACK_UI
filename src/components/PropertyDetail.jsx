import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
//
import PropertyInfo from "./PropertyInfo";
import StackingPlan from "./SubComponents/StackingPlan";
import FloorsInfo from "./SubComponents/Floors";
import Spaces from "./SubComponents/Spaces";
//
const dummyProperty = {
  buildingName: "Metropolitan Square",
  address: "655 15th St NW, Washington, DC 20005",
  propertyId: 8467,
};

export default function PropertyDetailPage() {
    const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("property");

  return (
    <Box sx={{ width: "100%", background: "#F6F8F9" }}>
      <Box
        sx={{
          width: "100%",
          border: "1px solid #E5E7EB",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={4}>
        <Box sx={{borderRight: "1px solid #E5E7EB"}}>
          <IconButton
            sx={{
              color: "#3a5283ff",
              p: "6px",
            }}
            onClick={() => navigate(`/properties`)}
          >
            <ArrowBackIcon fontSize="large" />
          </IconButton>
        </Box>
          
          <Box>
            <Typography fontSize={12} color="#6B7280">
              Building Name
            </Typography>
            <Typography fontSize={16} fontWeight={600}>
              {dummyProperty.buildingName}
            </Typography>
          </Box>
          <Box>
            <Typography fontSize={12} color="#6B7280">
              Address
            </Typography>
            <Typography
              sx={{
                fontSize: 16,
                textDecoration: "underline",
                cursor: "pointer",
                color: "#1E40AF",
              }}
            >
              {dummyProperty.address}
            </Typography>
          </Box>
          <Box>
            <Typography fontSize={12} color="#6B7280">
              Property ID
            </Typography>
            <Typography fontSize={16} fontWeight={600}>
              {dummyProperty.propertyId}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
        </Stack>
      </Box>
        <Box
            sx={{
            border: "1px solid #E5E7EB",
            width: "100%",
            px: 3,
            }}>
            <Stack
                direction="row"
                spacing={4}
                mt={2}
                sx={{ borderBottom: "1px solid #E5E7EB" }}
                >
                {[
                    { id: "property", label: "Property Info" },
                    { id: "floors", label: "Floors Info" },
                    { id: "spaces", label: "Spaces" },
                ].map((tab) => (
                    <Box
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    sx={{
                        pb: 1.2,
                        fontSize: 14,
                        cursor: "pointer",
                        borderBottom:
                        activeTab === tab.id
                            ? "2px solid #1A8D5F"
                            : "2px solid transparent",
                        color: activeTab === tab.id ? "#1A8D5F" : "#6B7280",
                        fontWeight: activeTab === tab.id ? 600 : 500,
                    }}
                    >
                    {tab.label}
                    </Box>
                ))}
                </Stack>
        </Box>
      <Box sx={{ display: "flex",pl: 2,pr:2,background: "#FFFFFF" }}>
        <Box sx={{ width: 400, flexShrink: 0,borderRight: "1px solid #E5E7EB" }}>
          <StackingPlan />
        </Box>
        <Box>
          {activeTab === "property" && <PropertyInfo />}
          {activeTab === "floors" && <FloorsInfo />}
          {activeTab === "spaces" && <Spaces />}
        </Box>
      </Box>
    </Box>
  );
}
