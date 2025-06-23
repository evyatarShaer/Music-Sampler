import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  InputAdornment,
  ButtonBase,
} from "@mui/material";
import {
  AccountCircle,
  Email,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { User } from "../../types/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { addUser } from "../../store/features/userSlice";

const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { error, status } = useSelector((state: RootState) => state.users);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormData({ ...formData, email });

    if (!isValidEmail(email)) {
      setEmailHelperText("האימייל אינו חוקי");
    } else {
      setEmailHelperText("");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: Partial<User> = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };
    if (!isValidEmail(formData.email)) { 
      alert("נא להכניס מייל חוקי");
      return;
    }
    dispatch(addUser(newUser));
    if (status === "succeeded") {
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    }
    navigate("/");
  };

  if (error) {
    return (
      <Typography variant="h5" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <Container maxWidth="xs" dir="rtl">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Typography variant="h5" component="h1">
          הרשמה
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            name="username"
            label="שם משתמש"
            fullWidth
            margin="normal"
            value={formData.username}
            onChange={handleChange}
            required
            slotProps={{
              input: {
                placeholder: "הכנס שם משתמש",
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            name="email"
            label="מייל"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleEmailChange}
            required
            helperText={emailHelperText}
            slotProps={{
              input: {
                placeholder: "הכנס כתובת מייל",
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            name="password"
            label="סיסמה"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
            type={showPassword ? "text" : "password"}
            slotProps={{
              input: {
                placeholder: "צור סיסמה",
                startAdornment: (
                  <InputAdornment position="start">
                    <ButtonBase
                      onClick={handleClickShowPassword}
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </ButtonBase>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            הירשם
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
