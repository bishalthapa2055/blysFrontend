import { useState } from "react";
import { Container, Typography, Box } from "@mui/material";

import MainIndex from "./components/mainindex";
import Login from "./components/login";

function App() {
  return (
    <>
      <Container maxWidth="lg">
        <MainIndex />
      </Container>
    </>
  );
}

export default App;
