import { useEffect, useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { PropertyTable } from "./PropertyTable";
import FilterListIcon from "@mui/icons-material/FilterList";
import axiosClient from "../../utils/axiosClient";
import { useParams } from "react-router-dom";

export default function FloorInfo() {
  const { id } = useParams();

  const [floors, setFloors] = useState([]);

  const [sources] = useState([
    {
      id: "edp", source: "EDP", date: "11/20/25",
      floorNumber: "21",
      floorName: "21st Floor",
      floorSize: "120,000",
      slabHeight: "150.00",
    },
    {
      id: "legacy", source: "LEGACY", date: "01/03/2025",
      floorNumber: "44",
      floorName: "44th Floor",
      floorSize: "140,000",
      slabHeight: "180.00",
    }
  ]);

  const tableHeaders = [
    { key: "source", label: "SOURCE", required: false },
    { key: "floorNumber", label: "FLOOR NUMBER", required: true },
    { key: "floorName", label: "FLOOR NAME", required: true },
    { key: "floorSize", label: "FLOOR SIZE", required: true },
    { key: "slabHeight", label: "SLAB HEIGHT", required: true },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosClient.get("/propDetails/getFloorsById/" + id);
        const records = res.data.data || [];

        const mapped = records.map(f => ({
          id: f.floorNumber,
          floorId: f._id,         
          sourceData: {
            floorNumber: f.floorNumber,
            floorName: f.floorName,
            floorSize: f.floorSize,
            slabHeight: f.slabHeight,
            nra: f.nra || ""     
          }
        }));

        setFloors(mapped);

      } catch (error) {
        console.log("API ERROR:", error);
      }
    };

    fetchData();
  }, [id]);


  const handleSourceDataChange = (floorId, newData) => {
    setFloors(prev =>
      prev.map(f =>
        f.id === floorId
          ? { ...f, sourceData: { ...f.sourceData, ...newData } }
          : f
      )
    );
  };

  const handleSendToEDP = async (floor) => {
    try {
      const payload = {
        floorId: floor.floorId,
        floorName: floor.sourceData.floorName,
        floorSize: floor.sourceData.floorSize,
        slabHeight: floor.sourceData.slabHeight
      };
      await axiosClient.put("/propDetails/updateFloor/" + id, payload);

      alert("Sent to EDP successfully");
      
    } catch (err) {
      console.error("Send to EDP Error", err);
      alert("Something went wrong");
    }
};



  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ ml: 2, mb: 2, mt: 1, pb: 1 }}>
        <Stack spacing={1}>
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
          ml: 2
        }}
      >
        {floors.map((floor) => (
          <Box key={floor.id} sx={{ bgcolor: "#fff", border: "1px solid #E5E7EB", mb: 4 }}>

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
                  onClick={() => handleSendToEDP(floor)}
                >
                  SEND TO EDP
                </Button>
              </Stack>
            </Box>

            <PropertyTable
              headers={tableHeaders}
              sourceData={floor.sourceData}
              sources={sources}
              onSourceDataChange={(newData) =>
                handleSourceDataChange(floor.id, newData)
              }
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
