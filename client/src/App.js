import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppAppBar from './component/AppAppBar';
import MainContent from './component/MainContent';
import Latest from './component/Latest';
import Footer from './component/Footer';


export default function Blog(props) {

  return (
    <>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <MainContent />
        <Latest />
      </Container>
      <Footer />
    </>
  );
}