import { useEffect } from "react";
import { Box } from "@mui/material";
import Swal from "sweetalert2";

export default function Loading() {
  useEffect(() => {
    Swal.fire({
      title: "Loading...",
      text: "Please wait for about 50 seconds due to the delay request...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    return () => {
      Swal.close(); // Ensure the alert is closed when the component unmounts
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
    />
  );
}