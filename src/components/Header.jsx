import { AppBar, Toolbar, Typography, Stack, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import FilterBar from "./FilterBar";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const showFilters = location.pathname === "/properties";

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: "1px solid #e0e0e0" }}>
        <Toolbar sx={{ borderRadius: "0 !important",backgroundColor: "#ecedeeff", minHeight: "45px !important", p: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Data Stack
          </Typography>

          <Stack direction="row" spacing={2} sx={{ ml: "auto" }}>
            <Button color="inherit" onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}>Logout</Button>
          </Stack>
        </Toolbar>
      </AppBar>
      {showFilters && <FilterBar />}
    </>
  );
};

export default Header;
