import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loading() {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100vh', 
        backgroundColor: 'rgba(0, 0, 0, 0.7)' 
      }}
    >
      <CircularProgress sx={{ color: 'white' }} />
      <span style={{ marginTop: '16px', color: 'white' }}>Please wait for about 50 seconds due to the delay request...</span>
    </Box>
  );
}
