import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Checkbox,
  MenuItem,
  Typography,
  Stack,
  Button,
  InputAdornment,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axiosClient from "../utils/axiosClient";
import { useDataStore } from "../store/useDataStore";

const FilterBar = () => {
  const { originalData, setOriginalData, setFilteredData } =
    useDataStore();

  const [market, setMarket] = useState([]);
  const [subMarket, setSubmarket] = useState([]);
  const [assignee, setAssignee] = useState("");
  const [search, setSearch] = useState("");
  const [view, setView] = useState("table");

  const [marketOptions, setMarketOptions] = useState([]);
  const [subMarketOptions, setSubmarketOptions] = useState([]);
  const [assigneeOptions, setAssigneeOptions] = useState([]);

  // ---------------------------------------
  // FETCH PROPERTIES + SET DROPDOWNS
  // ---------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosClient.get("/props/getProperties");
        const records = res.data?.payload || [];

        setOriginalData(records);
        setFilteredData(records);

        // Extract unique dropdown data
        setMarketOptions([...new Set(records.map((x) => x.market))]);
        setSubmarketOptions([...new Set(records.map((x) => x.subMarket))]);
        setAssigneeOptions([
          ...new Set(records.map((x) => x.assignedTo)),
        ]);
      } catch (error) {
        console.log("API ERROR:", error);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let result = [...originalData];

    if (market.length > 0) {
      result = result.filter((item) => market.includes(item.market));
    }

    if (subMarket.length > 0) {
      result = result.filter((item) => subMarket.includes(item.subMarket));
    }

    if (assignee) {
      result = result.filter((item) => item.assignedTo === assignee);
    }

    if (search.trim() !== "") {
      const query = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.propertyName.toLowerCase().includes(query) ||
          item.propertyAddress.toLowerCase().includes(query) ||
          item.market.toLowerCase().includes(query)
      );
    }

    setFilteredData(result);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [market, subMarket, assignee, search, originalData]);

  const resetFilters = () => {
    setMarket([]);
    setSubmarket([]);
    setAssignee("");
    setSearch("");
    setFilteredData(originalData);
  };

  return (
    <Box sx={{ bgcolor: "#f3f7f6", borderTop: "1px solid rgba(0,0,0,0.04)" }}>
      <Box sx={{ maxWidth: 1400, mx: "auto", px: 3, py: 3 }}>
        <Grid container spacing={8} alignItems="center" mb={3}>
          <Grid item md={4}>
            <Typography variant="caption" sx={{ color: "#6b6f6f", display: "block" }}>
              Market
            </Typography>
            <TextField
              select
              fullWidth
              label="Select Market"
              size="small"
              SelectProps={{ multiple: true }}
              value={market}
              onChange={(e) => setMarket(e.target.value)}
           sx={{
                width: "250px",
                bgcolor: "#fff",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0,0,0,0.12)",
                },
              }}
            >
              {marketOptions.map((m, index) => (
                <MenuItem key={index} value={m}>
                  <Checkbox checked={market.includes(m)} />
                  {m}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* SUBMARKET FILTER */}
          <Grid item md={4}>
            <Typography variant="caption" sx={{ color: "#6b6f6f", display: "block" }}>
              Submarket
            </Typography>
            <TextField
              select
              fullWidth
              label="Select Submarket"
              size="small"
              SelectProps={{ multiple: true }}
              value={subMarket}
              onChange={(e) => setSubmarket(e.target.value)}
              sx={{
                width: "250px",
                bgcolor: "#fff",
              }}
            >
              {subMarketOptions.map((s, i) => (
                <MenuItem key={i} value={s}>
                  <Checkbox checked={subMarket.includes(s)} />
                  {s}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* ASSIGNEE FILTER */}
          <Grid item md={4}>
            <Typography variant="caption" sx={{ color: "#6b6f6f", display: "block" }}>
              Assignee
            </Typography>
            <TextField
              select
              fullWidth
              label="Select Assignee"
              size="small"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              sx={{
                width: "250px",
                bgcolor: "#fff",
              }}
            >
              {assigneeOptions.map((a, i) => (
                <MenuItem key={i} value={a}>{a}</MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
<Grid>
            <Grid item xs={12}>
            <Stack direction="row" spacing={4}>
              <Button sx={{ color: "#0b5f46", fontWeight: 600 }}>Hide Filters</Button>
              <Button sx={{ color: "#0b5f46", fontWeight: 600 }} onClick={resetFilters}>
                Reset Filters
              </Button>
            </Stack>
          </Grid>
</Grid>
        {/* ACTIONS + SEARCH */}
        <Grid container spacing={3} justifyContent="space-between" alignItems="center">
          {/* SEARCH BAR */}
          <Grid item xs={12}>
            <TextField
              placeholder="Search"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                width: "40rem",
                bgcolor: "#fff",
              }}
            />
          </Grid>

          <Grid item xs={12} md={3} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <ToggleButtonGroup
              exclusive
              value={view}
              onChange={(e, val) => val && setView(val)}
              size="small"
            >
              <ToggleButton value="table" sx={{ p: 1}} style={{background: "#0b5f46", color: "#fff"}}>Table</ToggleButton>
              <ToggleButton value="both" sx={{ p: 1}}>Both</ToggleButton>
              <ToggleButton value="map" sx={{ p: 1}}>Map</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default FilterBar;
