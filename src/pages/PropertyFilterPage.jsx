import { Box, Grid, Container, Typography } from "@mui/material";
import PropertyTable from "../components/Table";
import { useDataStore } from "../store/useDataStore";

const PropertyFilterPage = () => {
  const { originalData, filteredData } = useDataStore();

  const rows = filteredData.length > 0 ? filteredData : originalData;

  return (
    <Box>
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Box
          sx={{
            height: 400,
            bgcolor: "#fff",
            borderRadius: 1,
            border: "1px solid #e0e0e0",
            p: 2,
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Typography sx={{ mb: 1, fontSize: "12px", fontWeight: "bold" }}>
              PROPERTY LIST {rows.length}
            </Typography>

            <Typography
              sx={{
                mb: 1,
                ml: -1,
                fontSize: "12px",
                fontWeight: "bold",
                color: "#6b6f6f",
              }}
            >
              Results
            </Typography>
          </Grid>

          <PropertyTable rows={rows} />
        </Box>
      </Container>
    </Box>
  );
};

export default PropertyFilterPage;