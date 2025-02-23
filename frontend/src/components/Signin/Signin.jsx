import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Divider,
  IconButton,
} from "@mui/material";
import { Google, Apple, GitHub, Twitter, LinkedIn } from "@mui/icons-material";
import DiscordIcon from "@mui/icons-material/Chat"; // Placeholder for Discord icon

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token in localStorage
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      window.location.href = "/dashboard"; // Redirect to dashboard (modify as needed)
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Left Side - Branding */}
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          backgroundColor: "#5A54F4",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          padding: 3,
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          BASE
        </Typography>
        <Box sx={{ mt: 5, display: "flex", gap: 2 }}>
          <IconButton sx={{ color: "white" }}>
            <GitHub />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <Twitter />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <LinkedIn />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <DiscordIcon />
          </IconButton>
        </Box>
      </Grid>

      {/* Right Side - Sign In Form */}
      <Grid
        item
        xs={12}
        md={7}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
          <Typography variant="h4" fontWeight="bold">
            Sign In
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Sign in to your account
          </Typography>

          {/* Sign-in Options */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              sx={{ textTransform: "none" }}
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Apple />}
              sx={{ textTransform: "none" }}
            >
              Sign in with Apple
            </Button>
          </Box>

          <Divider sx={{ my: 2 }}>or</Divider>

          {/* Display error message */}
          {error && (
            <Typography color="error" sx={{ textAlign: "center", mb: 2 }}>
              {error}
            </Typography>
          )}

          {/* Email and Password Fields */}
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email address"
              type="email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Link href="#" sx={{ display: "block", my: 1, textAlign: "right" }}>
              Forgot password?
            </Link>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2, py: 1 }}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link href="/signup" sx={{ fontWeight: "bold" }}>
              Register here
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Signin;
