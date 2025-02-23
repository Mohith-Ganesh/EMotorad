import { GoogleLogin } from 'react-google-login';

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
import ChatBubbleIcon from "@mui/icons-material/ChatBubble"; // Placeholder for Discord

const clientId = "84275206935-63m50ng6pmn0d2q323t1pj31nr8ohcht.apps.googleusercontent.com"

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      alert("Signup successful! You can now log in.");
      window.location.href = "/"; // Redirect to login page
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSuccess (res) => {
console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
}

const onFailure (res) => {
console.log("LOGIN FAILED! res: ", res);
}

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
            <ChatBubbleIcon />
          </IconButton>
        </Box>
      </Grid>

      {/* Right Side - Sign Up Form */}
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
            Sign Up
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Create a new account
          </Typography>

          {/* Sign-up Options */}
            < div id="signInButton">
              <GoogleLogin
              clientId={clientId)
              buttonText="Login"
              onSuccess (onSuccess
              onFailure={onFailure)
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}/>
          </div>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Apple />}
              sx={{ textTransform: "none" }}
            >
              Sign up with Apple
            </Button>
          </Box>

          <Divider sx={{ my: 2 }}>or</Divider>

          {/* Display error message */}
          {error && (
            <Typography color="error" sx={{ textAlign: "center", mb: 2 }}>
              {error}
            </Typography>
          )}

          {/* Sign-Up Form */}
          <form onSubmit={handleSignup}>
            <TextField
              fullWidth
              label="Full Name"
              type="text"
              variant="outlined"
              margin="normal"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
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
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2, py: 1 }}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>

          <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link href="/" sx={{ fontWeight: "bold" }}>
              Sign in here
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Signup;
