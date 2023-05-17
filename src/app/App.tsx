import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import SideMenu from "../components/SideMenu";
import TodosPage from "../components/TodosPage";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Box, IconButton, PaletteMode, Typography} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [themeColor, setThemeColor] = React.useState<PaletteMode>(prefersDarkMode ? 'dark' : 'light');

  const getColorScheme = (mode: PaletteMode) => ({
    palette: {
      ...(mode === 'light' ?
        {
          text: {
            primary: '#000000',
          },
          icon: {
            default: '#000000',
          }
        } : {
          text: {
            primary: '#ffffff',
          },
          icon: {
            default: '#ffffff',
          },
          background: {
            default: '#000000',
          },
        }),
    },
  });

  const toggleColorMode = () => {
    setThemeColor((prevValue) => (prevValue === 'light' ? 'dark' : 'light'));
  }

  const theme = React.useMemo(() => createTheme(getColorScheme(themeColor)), [themeColor]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <main>
          <div>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                color: 'text.primary',
                borderRadius: 1,
                p: 3,
              }}
            >
              <Typography sx={{color: 'text.primary'}}>{themeColor} themeColor</Typography>
              <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
                {themeColor === 'dark' ? <Brightness7Icon sx={{color: 'icon.default'}} /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          </div>
          <div>
            <Typography sx={{color: 'text.primary'}}>
              color scheme
            </Typography>
            <SideMenu />
          </div>
          <Routes>
            <Route path={'/'} element={<TodosPage/>}/>
          </Routes>
        </main>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App
