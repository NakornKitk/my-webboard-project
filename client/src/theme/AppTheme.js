import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

function AppTheme(props) {
  const { children, disableCustomTheme, themeComponents } = props;
  const [mode, setMode] = useState('light'); // State for light/dark mode

  const theme = useMemo(() => {
    return disableCustomTheme
      ? {}
      : createTheme({
          cssVariables: {
            colorSchemeSelector: 'data-mui-color-scheme',
            cssVarPrefix: 'template',
          },
          palette: {
            mode, // Light or dark mode
          },
          components: {
            ...themeComponents,
          },
        });
  }, [disableCustomTheme, themeComponents, mode]);

  const handleToggleTheme = (event, newMode) => {
    if (newMode) {
      setMode(newMode);
    }
  };

  if (disableCustomTheme) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={handleToggleTheme}
        sx={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          zIndex: 1300,
        }}
      >
        <ToggleButton value="light" aria-label="light mode">
          <LightModeIcon />
        </ToggleButton>
        <ToggleButton value="dark" aria-label="dark mode">
          <DarkModeIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      {children}
    </ThemeProvider>
  );
}

AppTheme.propTypes = {
  children: PropTypes.node,
  disableCustomTheme: PropTypes.bool,
  themeComponents: PropTypes.object,
};

export default AppTheme;
