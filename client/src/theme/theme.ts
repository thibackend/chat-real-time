"use client";

import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
   palette: {
      mode: "light",
      primary: {
         main: "#0969da", // GitHub blue
      },
      secondary: {
         main: "#8250df", // GitHub purple
      },
      background: {
         default: "#ffffff",
         paper: "#f6f8fa", // GitHub light gray
      },
      text: {
         primary: "#24292f", // GitHub dark text
         secondary: "#57606a",
      },
   },
});

export const darkTheme = createTheme({
   palette: {
      mode: "dark",
      primary: {
         main: "#58a6ff", // GitHub blue (dark)
      },
      secondary: {
         main: "#d2a8ff", // GitHub purple
      },
      background: {
         default: "#0d1117", // GitHub dark background
         paper: "#161b22",   // GitHub panel bg
      },
      text: {
         primary: "#c9d1d9",
         secondary: "#8b949e",
      },
   },
});
