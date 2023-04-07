import React from "react";
import { Box, styled, Container, Typography, Button } from "@mui/material";

const StyledBox = styled(Box)({
  position: "absolute",
  width: "500px",
  height: "300px",
  left: "450px",
  top: "200px",
  //   border: "1px solid red",
});
const Login = ({ code, status }) => {
  console.log(code, status);
  return (
    <>
      <StyledBox>
        <Typography variant="h1" gutterBottom color="green">
          Welcome
        </Typography>
        <Typography variant="h4" gutterBottom>
          Entered Code : {code}
        </Typography>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Go Back
        </Button>
      </StyledBox>
    </>
  );
};

export default Login;
