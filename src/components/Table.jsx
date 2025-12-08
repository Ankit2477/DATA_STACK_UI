// PropertyTable.jsx
import { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import FlagIcon from "@mui/icons-material/Flag";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

/* ---------- SORT ICON COMPONENT ---------- */
function SortIcon({ col, orderBy, order }) {
  if (orderBy === col) {
    return order === "asc" ? (
      <ArrowUpwardIcon fontSize="inherit" />
    ) : (
      <ArrowDownwardIcon fontSize="inherit" />
    );
  }
  return <span style={{ opacity: 0.3 }}>⇅</span>;
}

const navButtonSx = (disabled) => ({
  width: 36,
  height: 32,
  minWidth: 36,
  borderRadius: 2,
  border: "1px solid #e9e9ee",
  backgroundColor: "#fff",
  color: disabled ? "#cfcfd3" : "#9aa0a6",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: disabled ? "#fff" : "#f6f7f8",
    borderColor: disabled ? "#e9e9ee" : "#e0e0e6",
  },
});

function PaginationBar({ count, page, rowsPerPage, onPageChange, onRowsPerPageChange }) {
  const start = count === 0 ? 0 : page * rowsPerPage + 1;
  const end = Math.min((page + 1) * rowsPerPage, count);
  const total = count;

  const isFirstDisabled = page <= 0;
  const isPrevDisabled = page <= 0;
  const isNextDisabled = end >= total;
  const isLastDisabled = end >= total;

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 1.25,
        backgroundColor: "#fafafa",
        borderTop: "1px solid #efefef",
      }}
    >
      {/* Left: Items per page */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box sx={{ fontSize: 13, color: "#6b6f6f" }}>Items per page:</Box>

        <FormControl size="small" sx={{ minWidth: 80 }}>
          <Select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            sx={{
              height: 34,
              fontSize: 13,
              borderRadius: 1,
              "& .MuiSelect-select": { py: 0.5 },
            }}
            MenuProps={{ PaperProps: { sx: { fontSize: 13 } } }}
          >
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={200}>200</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Center: range text */}
      <Box sx={{ fontSize: 13, color: "#6b6f6f" }}>
        {start} – {end} of {total}
      </Box>

      {/* Right: nav buttons */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <IconButton
          aria-label="first page"
          onClick={() => onPageChange(0)}
          disabled={isFirstDisabled}
          sx={navButtonSx(isFirstDisabled)}
        >
          <FirstPageIcon fontSize="small" />
        </IconButton>

        <IconButton
          aria-label="previous page"
          onClick={() => onPageChange(Math.max(0, page - 1))}
          disabled={isPrevDisabled}
          sx={navButtonSx(isPrevDisabled)}
        >
          <NavigateBeforeIcon fontSize="small" />
        </IconButton>

        <IconButton
          aria-label="next page"
          onClick={() => onPageChange(page + 1)}
          disabled={isNextDisabled}
          sx={navButtonSx(isNextDisabled)}
        >
          <NavigateNextIcon fontSize="small" />
        </IconButton>

        <IconButton
          aria-label="last page"
          onClick={() => onPageChange(Math.max(0, Math.ceil(total / rowsPerPage) - 1))}
          disabled={isLastDisabled}
          sx={navButtonSx(isLastDisabled)}
        >
          <LastPageIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}

/* ---------- MAIN TABLE COMPONENT ---------- */
export default function PropertyTable({ rows }) {
  const navigate = useNavigate();

  const [orderBy, setOrderBy] = useState("propertyAddress");
  const [order, setOrder] = useState("asc");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const [selectedRows, setSelectedRows] = useState({});
  const [flaggedRows, setFlaggedRows] = useState({});

  const handleSort = (col) => {
    const isAsc = orderBy === col && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(col);
  };

  const sortedRows = [...rows].sort((a, b) => {
    const valA = a[orderBy] ?? "";
    const valB = b[orderBy] ?? "";

    if (typeof valA === "number") {
      return order === "asc" ? valA - valB : valB - valA;
    }
    return order === "asc"
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const paginatedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const toggleCheckbox = (id) => {
    setSelectedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFlag = (id) => {
    setFlaggedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        border: "1px solid #e0e0e0",
        overflow: "hidden",
      }}
    >
      <TableContainer sx={{ maxHeight: "65vh" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ background: "#ebe7d5" }}>
              <TableCell sx={headerCell}><SortIcon col="propertyName" orderBy={orderBy} order={order} /></TableCell>

              <TableCell onClick={() => handleSort("propertyAddress")} sx={headerCell}>
                Property Address <SortIcon col="propertyAddress" orderBy={orderBy} order={order} />
              </TableCell>

              <TableCell onClick={() => handleSort("propertyName")} sx={headerCell}>
                Property Name <SortIcon col="propertyName" orderBy={orderBy} order={order} />
              </TableCell>

              <TableCell onClick={() => handleSort("market")} sx={headerCell}>
                Market <SortIcon col="market" orderBy={orderBy} order={order} />
              </TableCell>

              <TableCell onClick={() => handleSort("occupancy")} sx={headerCell}>
                Occupancy Coverage <SortIcon col="occupancy" orderBy={orderBy} order={order} />
              </TableCell>

              <TableCell onClick={() => handleSort("dataStack")} sx={headerCell}>
                Data Stack Coverage <SortIcon col="dataStack" orderBy={orderBy} order={order} />
              </TableCell>

              <TableCell onClick={() => handleSort("assignedTo")} sx={headerCell}>
                Assigned To <SortIcon col="assignedTo" orderBy={orderBy} order={order} />
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedRows.map((row, index) => {
              const isFlagged = flaggedRows[row._id];
              console.log("Rendering row:", row._id, "Flagged:", isFlagged);
              return (
                <TableRow
                  key={row._id + "-" + index}
                  hover
                  sx={{
                    cursor: "pointer",
                    backgroundColor: isFlagged ? "#fff8e1" : "inherit",
                  }}
                  onClick={() => navigate(`/properties/detail/${row._id}`)}
                >
                  <TableCell
                    sx={{ ...bodyCell, width: 70 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                      <Checkbox
                        size="small"
                        checked={!!selectedRows[row._id]}
                        onChange={() => toggleCheckbox(row._id)}
                      />

                      <IconButton size="small" onClick={() => toggleFlag(row._id)}>
                        {isFlagged ? (
                          <FlagIcon sx={{ color: "#172781", fontSize: 18 }} />
                        ) : (
                          <OutlinedFlagIcon sx={{ color: "#cfd1dd", fontSize: 18 }} />
                        )}
                      </IconButton>
                    </Box>
                  </TableCell>

                  <TableCell sx={bodyCell}>{row.propertyAddress}</TableCell>
                  <TableCell sx={bodyCell}>{row.propertyName}</TableCell>
                  <TableCell sx={bodyCell}>{row.market}</TableCell>

                  <TableCell sx={bodyCell}>{row.occupancy}%</TableCell>

                  <TableCell sx={bodyCell}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <span
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background:
                            row.dataStack > 50
                              ? "#4caf50"
                              : row.dataStack > 0
                              ? "#ff9800"
                              : "#f44336",
                        }}
                      />
                      {row.dataStack}%
                    </Box>
                  </TableCell>

                  <TableCell sx={bodyCell}>{row.assignedTo}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <PaginationBar
        count={rows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(p) => setPage(p)}
        onRowsPerPageChange={(n) => {
          setRowsPerPage(n);
          setPage(0);
        }}
      />
    </Paper>
  );
}

const headerCell = {
  fontWeight: 600,
  fontSize: "14px",
  color: "#333",
  backgroundColor: "#ebe7d5",
  cursor: "pointer",
  userSelect: "none",
};

const bodyCell = {
  fontSize: "14px",
  color: "#333",
  padding: "14px 16px",
};
