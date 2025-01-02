import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppAppBar from './component/AppAppBar';
import MainContent from './component/MainContent';
import Footer from './component/Footer';
import AppTheme from './theme/AppTheme';


export default function MainPage(props) {

  return (
    <>
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <AppAppBar />
        <Container
          maxWidth="lg"
          component="main"
          sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
        >
          <MainContent />
        </Container>
        <Footer />
      </AppTheme>
    </>
  );
}