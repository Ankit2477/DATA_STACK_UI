import { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosClient from "../utils/axiosClient";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post("/auth/login", { email, password });
      const token = res.data.token;
      localStorage.setItem("token", token);
      setMessage("Login successful");
      navigate("/properties");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#f5f5f5" }}>
      <Paper elevation={3} sx={{ p: 4, width: 380 }}>
        <Stack spacing={2}>
          <Typography variant="h5" textAlign="center" fontWeight={600}>Login</Typography>

          <TextField label="Email" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />

          <Button variant="contained" onClick={handleLogin}>Login</Button>

          {message && <Typography variant="body2" color={message.includes("successful") ? "green" : "error"} textAlign="center">{message}</Typography>}
        </Stack>
      </Paper>
    </Box>
  );
};

export default LoginForm;
