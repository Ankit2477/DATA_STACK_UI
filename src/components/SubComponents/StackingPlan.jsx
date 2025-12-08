import { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FlagIcon from "@mui/icons-material/Flag";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export function StackingPlan() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  const stackingData = [
    {
      floor: 1000,
      area: "N/A",
      status: "Available",
      details: "Available\n3,000 SF",
      suites: [],
      needsReview: true,
      verified: false,
    },
    {
      floor: 21,
      area: "120,000 SF",
      status: "Unaccounted",
      details: "Unaccounted\n109,774 SF",
      suites: [
        { name: "A-6...", details: "9...\n$3..." },
        { name: "A-9...", details: "9...\n$3..." },
      ],
      needsReview: false,
      verified: false,
    },
    {
      floor: 20,
      area: "111 SF",
      status: "Unaccounted",
      details: "Unaccounted",
      suites: [],
      needsReview: false,
      verified: false,
    },
    {
      floor: 19,
      area: "N/A",
      status: "Unaccounted",
      details: "Unaccounted",
      suites: [],
      needsReview: false,
      verified: false,
    },
    {
      floor: 18,
      area: "N/A",
      status: "Unaccounted",
      details: "Unaccounted",
      suites: [],
      needsReview: false,
      verified: false,
    },
    {
      floor: 17,
      area: "N/A",
      status: "Unaccounted",
      details: "Unaccounted",
      suites: [],
      needsReview: false,
      verified: false,
    },
    {
      floor: 16,
      area: "N/A",
      status: "Unaccounted",
      details: "Unaccounted",
      suites: [],
      needsReview: false,
      verified: false,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "#E8E8E8";
      case "Unaccounted":
        return "#EDE8C5";
      case "Occupied":
        return "#C8D9E8";
      case "Non Rentable":
        return "#D6D6D6";
      case "Unmapped":
        return "#E4D5F0";
      default:
        return "#F3F4F6";
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  return (
    <Box
      sx={{ 
        p:2
      }}
    >
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 600,
          mb: 2,
          color: "#000000",
        }}
      >
        Stacking Plan
      </Typography>

      <Stack direction="row" spacing={1.5} mb={2} flexWrap="wrap" gap={0.5}>
        <Stack
          direction="row"
          spacing={0.75}
          alignItems="center"
          sx={{
            bgcolor: "#F5F5F5",
            px: 1.5,
            py: 0.5,
            borderRadius: "5px",
            border: "1px solid #E0E0E0",
          }}
        >
          <Box
            sx={{
              width: 14,
              height: 14,
              bgcolor: "#C8D9E8",
              borderRadius: "16px",
            }}
          />
          <Typography fontSize={12} color="#000000">
            Occupied
          </Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={0.75}
          alignItems="center"
          sx={{
            bgcolor: "#F5F5F5",
            px: 1.5,
            py: 0.5,
            borderRadius: "5px",
            border: "1px solid #E0E0E0",
          }}
        >
          <Box
            sx={{
              width: 14,
              height: 14,
              bgcolor: "#E8E8E8",
              borderRadius: "50%",
            }}
          />
          <Typography fontSize={12} color="#000000">
            Available
          </Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={0.75}
          alignItems="center"
          sx={{
            bgcolor: "#F5F5F5",
            px: 1.5,
            py: 0.5,
            borderRadius: "5px",
            border: "1px solid #E0E0E0",
          }}
        >
          <Box
            sx={{
              width: 14,
              height: 14,
              bgcolor: "#D6D6D6",
              borderRadius: "50%",
            }}
          />
          <Typography fontSize={12} color="#000000">
            Non Rentable
          </Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={0.75}
          alignItems="center"
          sx={{
            bgcolor: "#F5F5F5",
            px: 1.5,
            py: 0.5,
            borderRadius: "5px",
            border: "1px solid #E0E0E0",
          }}
        >
          <Box
            sx={{
              width: 14,
              height: 14,
              bgcolor: "#EDE8C5",
              borderRadius: "50%",
            }}
          />
          <Typography fontSize={12} color="#000000">
            Unaccounted
          </Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={0.75}
          alignItems="center"
          sx={{
            bgcolor: "#F5F5F5",
            px: 1.5,
            py: 0.5,
            borderRadius: "5px",
            border: "1px solid #E0E0E0",
          }}
        >
          <Box
            sx={{
              width: 14,
              height: 14,
              bgcolor: "#E4D5F0",
              borderRadius: "50%",
            }}
          />
          <Typography fontSize={12} color="#000000">
            Unmapped
          </Typography>
        </Stack>
      </Stack>

      {/* Search Bar */}
        <TextField
        size="small"
        placeholder="Search Company"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
            endAdornment: (
            <InputAdornment position="end">
                <SearchIcon fontSize="small" sx={{ color: "#9CA3AF" }} />
            </InputAdornment>
            ),
        }}
        sx={{
            width: "23rem",
            mb: 2,
            "& .MuiOutlinedInput-root": {
            fontSize: "13px",
            bgcolor: "#FFFFFF",
            "& fieldset": {
                borderColor: "#D1D5DB",
            },
            },
        }}
        />

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        mb={1}
        ml={9}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Stack direction="row" spacing={0.5} alignItems="center">
            <FlagIcon sx={{ color: "#797676ff", fontSize: 14 }} />
            <Typography fontSize={11} color="#000000">
              Need Review
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <CheckCircleIcon sx={{ color: "#10B981", fontSize: 14 }} />
            <Typography fontSize={11} color="#000000">
              Verified
            </Typography>
          </Stack>
        </Stack>
        <Typography
          onClick={handleSelectAll}
          sx={{
            fontSize: 11,
            color: "#3e7555ff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Select All
        </Typography>
      </Stack>

      {/* Stacking Plan Grid */}
    <Stack direction="row">
    <Box sx={{ width: 70 }}>
        {stackingData.map((item, index) => (
        <Box
            key={index}
            sx={{
            minHeight: 56,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            py: 1,
            }}
        >
            <Typography fontSize={13} fontWeight={700} color="#000000">
            {item.floor}
            </Typography>
            <Typography fontSize={10} color="#6B7280">
            {item.area}
            </Typography>
        </Box>
        ))}
    </Box>
    <Box sx={{ flex: 1, border: "1px solid #D1D5DB" }}>
        {stackingData.map((item, index) => (
        <Box
            key={index}
            sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: getStatusColor(item.status),
            borderBottom:
                index < stackingData.length - 1 ? "1px solid #FFFFFF" : "none",
            minHeight: 56,
            px: 1.5,
            py: 1,
            }}
        >
            {item.suites.length > 0 ? (
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {item.suites.map((suite, idx) => (
                <Box
                    key={idx}
                    sx={{
                    bgcolor: "#FFFFFF",
                    px: 1,
                    py: 0.5,
                    borderRadius: "4px",
                    border: "1px solid #E0E0E0",
                    }}
                >
                    <Typography fontSize={11} fontWeight={600} color="#000000">
                    {suite.name}
                    </Typography>
                    <Typography
                    fontSize={10}
                    color="#6B7280"
                    sx={{ whiteSpace: "pre-line" }}
                    >
                    {suite.details}
                    </Typography>
                </Box>
                ))}
            </Stack>
            ) : (
            <Typography
                fontSize={12}
                fontWeight={600}
                color="#000000"
                sx={{ whiteSpace: "pre-line" }}
            >
                {item.details}
            </Typography>
            )}
        </Box>
        ))}
    </Box>
    </Stack>

    </Box>
  );
}

export default StackingPlan;