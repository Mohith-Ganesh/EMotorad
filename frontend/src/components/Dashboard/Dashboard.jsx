import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import {
  Dashboard,
  ShoppingCart,
  Schedule,
  People,
  Settings,
  Help,
  ContactMail,
  Search,
  Notifications,
} from "@mui/icons-material";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import AddIcon from "@mui/icons-material/Add";

const sidebarItems = [
  { icon: <Dashboard />, label: "Dashboard" },
  { icon: <ShoppingCart />, label: "Transactions" },
  { icon: <Schedule />, label: "Schedules" },
  { icon: <People />, label: "Users" },
  { icon: <Settings />, label: "Settings" },
];

const data = [
  { name: "Basic Tees", value: 55, color: "#8884d8" },
  { name: "Custom Pants", value: 31, color: "#82ca9d" },
  { name: "Super Hoodies", value: 14, color: "#FF8042" },
];

const barData = [
  { name: "Week 1", Guest: 400, User: 300 },
  { name: "Week 2", Guest: 300, User: 500 },
  { name: "Week 3", Guest: 200, User: 400 },
  { name: "Week 4", Guest: 400, User: 300 },
];

const DashboardPage = () => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleTabChange = (_, newValue) => setTab(newValue);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Submit (Send Data to Backend)
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Profile added successfully!");
        handleClose(); // Close modal after successful submission
      } else {
        alert(data.message || "Error adding profile");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };


  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Sidebar */}
      <Grid
        item
        xs={12}
        md={2.5}
        sx={{
          backgroundColor: "#5A54F4",
          color: "white",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          Board.
        </Typography>
        <List sx={{ mt: 3 }}>
          {sidebarItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} sx={{ color: "white" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.3)" }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: "white" }}>
                <Help />
              </ListItemIcon>
              <ListItemText primary="Help" sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: "white" }}>
                <ContactMail />
              </ListItemIcon>
              <ListItemText primary="Contact Us" sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>

      {/* Main Content */}
      <Grid
        item
        xs={12}
        md={9.5}
        sx={{ backgroundColor: "#F8F9FD", padding: 3, minHeight: "100vh" }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h4" fontWeight="bold">
            Dashboard
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Search sx={{ color: "gray" }} />
            <Notifications sx={{ color: "gray" }} />
            <Box sx={{ width: 30, height: 30, bgcolor: "gray", borderRadius: "50%" }} />
          </Box>
        </Box>

        {/* Metrics */}
        <Grid container spacing={2}>
          {["Total Revenue", "Total Transactions", "Total Likes", "Total Users"].map(
            (title, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper sx={{ padding: 2, textAlign: "center" }}>
                  <Typography variant="body1">{title}</Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {title === "Total Revenue" ? "$2,129,430" : "9,721"}
                  </Typography>
                </Paper>
              </Grid>
            )
          )}
        </Grid>

        {/* Charts */}
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                Activities
              </Typography>
              <BarChart width={500} height={300} data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Guest" fill="#8884d8" />
                <Bar dataKey="User" fill="#82ca9d" />
              </BarChart>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 2, textAlign: "center" }}>
              <Typography variant="h6" fontWeight="bold">
                Top Products
              </Typography>
              <PieChart width={200} height={200}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                padding: 3,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border: "2px dashed gray",
              }}
              onClick={handleOpen}
            >
              <AddIcon sx={{ fontSize: 40, color: "gray" }} />
              <Typography>Add Profile</Typography>
            </Paper>
          </Grid>
        </Grid>
        {/* Modal (Dialog) */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Add New Profile</DialogTitle>
          <DialogContent>
            {/* Tabs for Basic & Contact */}
            <Tabs value={tab} onChange={handleTabChange} centered>
              <Tab label="Basic" />
              <Tab label="Social" />
            </Tabs>

            {/* Form Fields */}
            {tab === 0 && (
              <Box sx={{ mt: 2 }}>
                <TextField label="Enter Name" name="name" fullWidth margin="normal" value={formData.name} onChange={handleChange} />
                <TextField label="Enter Email" name="email" fullWidth margin="normal" value={formData.email} onChange={handleChange} />
                <TextField label="Enter Phone" name="phone" fullWidth margin="normal" value={formData.phone} onChange={handleChange} />
                <Box sx={{ textAlign: "right", mt: 2 }}>
                  <Button variant="contained" onClick={() => setTab(1)}>Next</Button>
                </Box>
              </Box>
            )}

            {tab === 1 && (
              <Box sx={{ mt: 2 }}>
                <TextField label="Instagram Link (Optional)" name="instagram" fullWidth margin="normal" placeholder="Eg. instagram.com/username" value={formData.instagram} onChange={handleChange} />
                <TextField label="YouTube Link (Optional)" name="youtube" fullWidth margin="normal" placeholder="Eg. youtube.com/username" value={formData.youtube} onChange={handleChange} />
                <Box sx={{ textAlign: "right", mt: 2 }}>
                  <Button onClick={() => setTab(0)}>Back</Button>
                  <Button variant="contained" sx={{ ml: 2 }} onClick={handleSubmit}>Done</Button>
                </Box>
              </Box>
            )}
          </DialogContent>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
