"use client";

import MenuIcon from "@mui/icons-material/Menu";
import {
   AppBar,
   Box,
   Button,
   Divider,
   Drawer,
   IconButton,
   List,
   ListItem,
   ListItemText,
   Paper,
   TextField,
   Toolbar,
   Typography,
   useTheme,
} from "@mui/material";
import { useState } from "react";

const drawerWidth = 280;

export default function ChatLayout(
   { children }: Readonly<{ children: React.ReactNode }>
) {
   const [mobileOpen, setMobileOpen] = useState(false);
   const [messages, setMessages] = useState<string[]>([]);
   const [input, setInput] = useState("");

   const theme = useTheme(); // 👈 hook to access active theme

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
   };

   const handleSend = () => {
      if (input.trim() !== "") {
         setMessages([...messages, input]);
         setInput("");
      }
   };

   // Sidebar (conversation list)
   const drawer = (
      <div>
         <Toolbar>
            <Typography variant="h6" color="text.primary">
               Chats
            </Typography>
         </Toolbar>
         <Divider />
         <List>
            {["Alice", "Bob", "Charlie"].map((text) => (
               <ListItem key={text}>
                  <ListItemText primary={text} primaryTypographyProps={{ color: "text.primary" }} />
               </ListItem>
            ))}
         </List>
      </div>
   );

   return (
      <Box sx={{ display: "flex", bgcolor: "background.default", color: "text.primary" }}>
         {/* AppBar */}
         <AppBar
            position="fixed"
            sx={{
               zIndex: (t) => t.zIndex.drawer + 1,
               bgcolor: "background.paper",
               color: "text.primary",
               boxShadow: "none",
               borderBottom: `1px solid ${theme.palette.divider}`,
            }}
         >
            <Toolbar>
               <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: "none" } }}
               >
                  <MenuIcon />
               </IconButton>
               <Typography variant="h6" noWrap component="div">
                  Chat App
               </Typography>
            </Toolbar>
         </AppBar>

         {/* Sidebar Drawer */}
         <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
            <Drawer
               variant="temporary"
               open={mobileOpen}
               onClose={handleDrawerToggle}
               ModalProps={{ keepMounted: true }}
               sx={{
                  display: { xs: "block", sm: "none" },
                  "& .MuiDrawer-paper": {
                     boxSizing: "border-box",
                     width: drawerWidth,
                     bgcolor: "background.paper",
                     color: "text.primary",
                  },
               }}
            >
               {drawer}
            </Drawer>
            <Drawer
               variant="permanent"
               sx={{
                  display: { xs: "none", sm: "block" },
                  "& .MuiDrawer-paper": {
                     boxSizing: "border-box",
                     width: drawerWidth,
                     bgcolor: "background.paper",
                     color: "text.primary",
                  },
               }}
               open
            >
               {drawer}
            </Drawer>
         </Box>

         {/* Main Chat Area */}
         <Box
            component="main"
            sx={{
               flexGrow: 1,
               p: 3,
               width: { sm: `calc(100% - ${drawerWidth}px)` },
               display: "flex",
               flexDirection: "column",
               height: "100vh",
               mt: 8,
               bgcolor: "background.default",
               color: "text.primary",
            }}
         >
            {/* Messages */}
            <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
               {messages.map((msg, idx) => (
                  <Paper
                     key={idx}
                     sx={{
                        p: 1,
                        mb: 1,
                        maxWidth: "60%",
                        bgcolor: "background.paper",
                        color: "text.primary",
                     }}
                  >
                     <Typography variant="body1">{msg}</Typography>
                  </Paper>
               ))}
            </Box>

            {/* Input */}
            <Box sx={{ display: "flex", gap: 1 }}>
               <TextField
                  fullWidth
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  sx={{
                     "& .MuiInputBase-root": {
                        bgcolor: "background.paper",
                        color: "text.primary",
                     },
                  }}
               />
               <Button variant="contained" onClick={handleSend} color="primary">
                  Send
               </Button>
            </Box>
         </Box>
      </Box>
   );
}
