import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { darkTheme, lightTheme } from "./styles/theme";
import { containterStyles } from "./styles/styles";
import { TasksPage } from "./pages/TasksPage/TasksPage";

function App() {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <Box sx={containterStyles}>
        <Header themeMode={themeMode} setThemeMode={setThemeMode} />
        <Routes>
          <Route path="/" element={<TasksPage />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
