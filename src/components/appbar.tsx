import { BottomNavigation, BottomNavigationAction, Button, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { route } from 'preact-router';
import { useEffect, useState } from 'preact/hooks';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import MediaQuery from 'react-responsive';

interface AppBarProps {
  onThemeChange: () => void;
}

export default function ButtonAppBar(props: AppBarProps) {
  const pages = ['UUID', 'TBD'];
  const [currentPage, setCurrentPage] = useState('');
  const theme = useTheme();
  const [themeMode, setThemeMode] = useState(theme.palette.mode);
  const [value, setValue] = useState(0);

  useEffect(() => {
    setThemeMode(theme.palette.mode);
    const currentPath = window.location.pathname;
    const page = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    setValue(pages.indexOf(page) + 1);
    setCurrentPage(page);
  }, [theme.palette.mode]);

  const MobileAppBar = (
    <Box sx={{
      position: "fixed",
      bottom: 0,
      width: "100vw"
    }}>
      <BottomNavigation
        sx={{
          backgroundColor: theme.palette.mode === 'light' ? '#f3f6fc' : '#272727'
        }}
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" sx={{ color: currentPage === '' ? "##90caf9" : theme.palette.text.primary }} icon={<AppsOutlinedIcon sx={{ color: currentPage === '' ? "##90caf9" : theme.palette.text.primary }} />} onClick={() => {
          route(`/helpful-pages/`);
          setCurrentPage('');
        }} />
        {pages.map((page) => (
          <BottomNavigationAction
            icon={<BuildCircleOutlinedIcon />}
            label={page}
            onClick={() => {
              route(`/helpful-pages/${page}`);
              setCurrentPage(page);
            }}
            sx={{
              color: theme.palette.text.primary,
              //color: currentPage === page ? 'red' : '',
              // my: 2,
              // display: 'block',
              // mx: 1,
              //fontWeight: 'bold',
              //borderRadius: '100px',
              // backgroundColor: currentPage === page ? '#84acf154' : '',
              // '& .MuiBottomNavigationAction-label': {
              //   fontSize: currentPage === page ? "0.875rem" : "0.75rem",
              //   color: currentPage === page ? "#8199df" : "#d1d1d1",
              // },
            }}
          >
            {page}
          </BottomNavigationAction>
        ))}
      </BottomNavigation>
    </Box>
  );

  const MainAppBar = (
    <AppBar sx={{ boxShadow: 'none', backgroundColor: theme.palette.mode === 'light' ? '#f3f6fc' : '', position: 'static' }}>
      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton sx={{ margin: "auto 8px auto 1em;", height: "fit-content" }} onClick={() => {
            route(`/helpful-pages/`);
            setCurrentPage('');
          }}>
            <AppsOutlinedIcon />
          </IconButton>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={() => {
                route(`/helpful-pages/${page}`);
                setCurrentPage(page);
              }}
              sx={{
                color: theme.palette.text.primary,
                my: 2,
                display: 'block',
                mx: 1,
                fontWeight: 'bold',
                borderRadius: '100px',
                backgroundColor: currentPage === page ? '#84acf154' : '',
              }}
            >
              {page}
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 0, marginRight: "1em" }}>
          {themeMode === 'light' ? (
            <IconButton onClick={() => props.onThemeChange()}>
              {theme.palette.mode === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
            </IconButton>
          ) : (
            <IconButton onClick={() => props.onThemeChange()}>
              {theme.palette.mode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );

  return (
    <>
      <MediaQuery minWidth={600}>
        {MainAppBar}
      </MediaQuery>
      <MediaQuery maxWidth={600}>
        {MobileAppBar}
      </MediaQuery>
    </>
  );
}
