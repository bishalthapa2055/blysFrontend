import {
  Box,
  Container,
  Stack,
  Typography,
  styled,
  TextField,
  Button,
} from "@mui/material";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { api } from "../http/api";
import { useSnackbar } from "notistack";
import Login from "./login";

const StyledBox = styled(Box)({
  position: "absolute",
  width: "500px",
  height: "300px",
  top: "200px",
  left: "450px",
  //   border: "1px solid red",
});
const StyledTypo = styled(Typography)({
  fontFamily: "Arimo",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "36px",
  lineHeight: "48px",

  textAlign: "center",
  // color: "#ffffff",
  textTransform: "uppercase",
});
const StyledButton = styled(Button)({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
  padding: "14px 50px",
  gap: "10px",

  position: "relative",
  width: "165px",
  height: "48px",
  left: "150px",
  top: "90px",
  //   backgroundColor: "#024E82",
});

const ButtonTypo = styled(Typography)({
  width: "120px",
  height: "22px",

  fontFamily: "Lato",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "25px",
  lineHeight: "30px",
  letterSpacing: "5px",
  /* identical to box height, or 138% */

  display: "flex",
  alignItems: "center",
  textAlign: "center",
  textTransform: "uppercase",

  color: "#FFFFFF",
});

const StyledTextField = styled(TextField)({
  "& input": {
    textAlign: "center",
    fontSize: "20px",
    fontFamily: "Arial",
    fontWeight: 600,
    // color: "#ffffff",
  },
});
const MainIndex = () => {
  const [isValid, setIsValid] = useState(true);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [islogin, setIsLogin] = useState(false);
  const [dbcode, setDbCode] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const codeRefs = useRef([]);

  useEffect(() => {
    const isInputValid = code.every((code) => {
      return code !== "" && !isNaN(code);
    });

    setIsValid(isInputValid);
  }, [code]);

  const handleInputChange = (index, value) => {
    if (isNaN(value)) {
      enqueueSnackbar("Do Insert Number", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      return false;
    }
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value !== "" && index < 5) {
      codeRefs.current[index + 1].focus();
    }
  };
  const focusNextInput = (currentIndex) => {
    if (currentIndex < code.length - 1) {
      inputRefs.current[currentIndex + 1].focus();
    }
  };
  const handlePaste = (event) => {
    event.preventDefault();
    const clipboardData = event.clipboardData.getData("Text");

    if (isNaN(clipboardData)) {
      enqueueSnackbar("Unable to paste Alphanumberic letters", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      return false;
    }
    const newCode = [...code];
    let startIndex = 0;

    for (let i = 0; i < newCode.length; i++) {
      if (startIndex >= clipboardData.length) {
        break;
      }
      if (newCode[i] === "") {
        newCode[i] = clipboardData.charAt(startIndex);
        startIndex++;
      }
    }

    setCode(newCode);
  };
  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && index > 0 && code[index] === "") {
      codeRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await api.post("/login", code);
      console.log(res.data.code);
      setDbCode(res.data.code);
      if (res) {
        enqueueSnackbar("LogIn Sucessfully", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        setCode([...code.map((v) => "")]);
        setIsLogin(true);
      }
    } catch (e) {
      setCode([...code.map((v) => "")]);
      let errorr = e.response.data.message;
      enqueueSnackbar(errorr, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };
  return (
    <>
      {islogin ? (
        <Login code={dbcode} status={islogin} />
      ) : (
        <>
          <StyledBox>
            <StyledTypo>verification code :</StyledTypo>
            <Stack
              direction="row"
              spacing={4}
              sx={{ position: "relative", top: "40px" }}
            >
              {code?.map((data, index) => (
                <StyledTextField
                  key={index}
                  variant="outlined"
                  inputProps={{ maxLength: 1 }}
                  value={data}
                  inputRef={(el) => (codeRefs.current[index] = el)}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  error={!isValid || code[index] === "" || isNaN(code[index])}
                  onPaste={handlePaste}
                />
              ))}
            </Stack>
            <StyledButton
              variant="contained"
              disabled={!isValid}
              onClick={handleSubmit}
            >
              <ButtonTypo>Submit</ButtonTypo>
            </StyledButton>
          </StyledBox>
        </>
      )}
    </>
  );
};

export default MainIndex;
