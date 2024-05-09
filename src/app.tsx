import { CssBaseline, PaletteMode, ThemeProvider, createTheme, useMediaQuery } from '@mui/material'
import Router, { Route } from 'preact-router'
import './app.css'
import UuidPage from './pages/uuid';
import AppBar from './components/appbar';
import HelloPage from './pages/hello';
import { useMemo, useState } from 'preact/hooks';

export function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<PaletteMode>(prefersDarkMode ? 'dark' : 'light');

  const handleThemeChange = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode
        },
      }),
    [mode],
  );


  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar onThemeChange={handleThemeChange} />
        <div style={{ margin: "1em 2em" }}>
          <Router>
            <Route path="/" default component={HelloPage} />
            <Route path="/helpful-pages/UUID" component={UuidPage} />
            {/* <Route path="/helpful-pages/TBD" component={} /> */}
          </Router>
        </div>
      </ThemeProvider>
    </>
  )
}
