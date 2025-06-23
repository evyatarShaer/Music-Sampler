import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  InputAdornment,
  ButtonBase,
} from "@mui/material";
import { Email, Visibility, VisibilityOff } from "@mui/icons-material";
import { User } from "../../types/user";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { loginUser } from "../../store/features/userSlice";
import "../../laoder.css";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { error, status } = useSelector((state: RootState) => state.users);
  const [formData, setFormData] = useState({
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
    const User: Partial<User> = {
      email: formData.email,
      password: formData.password,
    };
    dispatch(loginUser(User));
  };

  useEffect(() => {
    if (status === "succeeded" && localStorage.getItem("token")) {
      setFormData({
        email: "",
        password: "",
      });
      navigate("/home");
    }
  }, [status, navigate]);

  useEffect(() => {
    if (error) {
      alert(`הפעולה נכשלה אנא בדוק את הפרטים שהזנת`);
      setFormData({
        email: "",
        password: "",
      });
      console.log(error);
    }
  }, [error]);

  return (
    <Container maxWidth="sm" dir="rtl">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, width: "100%", maxWidth: "350px" }}
        >
          {status === "loading" ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "100vh",
                paddingTop: "10vh",
              }}
            >
              <div className="loader"></div>
            </Box>
          ) : (
            <Box>
              <Typography component="h1" variant="h5">
                כניסה
              </Typography>
              <TextField
                name="email"
                label="מייל"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleEmailChange}
                required
                helperText={emailHelperText}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
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
                InputProps={{
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
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                היכנס
              </Button>
            </Box>
          )}
        </Box>
        <Box dir="rtl" className="register-link" sx={{ textAlign: "center" }}>
      <Typography>אין לך עדיין חשבון?</Typography>
      <Link
        to="/register"
        className="register-button"
      >
        הירשם
      </Link>
    </Box>
      </Box>
    </Container>
  );
};

export default Login;
