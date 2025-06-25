import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { User } from "../../types/user";
import { editUser, setUser } from "../../store/features/userSlice";

const UserProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector((state: RootState) => state.users.currentUser);
  const [newUser, setNewUser] = useState<Partial<User>>({
    _id: user?._id,
    username: user?.username,
    email: user?.email,
  });
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false); 
  const [severity, setSeverity] = useState<boolean>(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    const resultAction = await dispatch(editUser(newUser));
  
    if (editUser.fulfilled.match(resultAction)) {
      setSeverity(true);
      setOpenSnackbar(true);
    } else {
      setSeverity(false);
      setOpenSnackbar(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

    useEffect(() => {
      const userFromLocalStorage = localStorage.getItem("currentUser");
      if (!user && userFromLocalStorage) {
        dispatch(setUser(JSON.parse(userFromLocalStorage) as User));
      }
    }, [user, dispatch]);
  
    useEffect(() => {
      if (user) {
        setNewUser({
          _id: user._id,
          username: user.username,
          email: user.email,
        });
      }
    }, [user]);

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, margin: "auto" }}>
      <Typography variant="h5" sx={{ mb: 2, display: "flex", justifyContent: "center"}}>
        פרטי משתמש
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="שם משתמש"
          name="username"
          value={newUser.username || ""}
          onChange={handleInputChange}
          disabled={!isEditing}
          fullWidth
        />

        <TextField
          label="אימייל"
          name="email"
          value={newUser.email || ""}
          onChange={handleInputChange}
          disabled={!isEditing}
          fullWidth
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          {isEditing ? (
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveClick}
            >
              שמור
            </Button>
          ) : (
            <IconButton onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
          )}
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={severity ? 3000 : 5000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
      >
        <Alert onClose={handleCloseSnackbar} severity={severity? 'success' : 'error'}>
          {severity? '!המשתמש עודכן בהצלחה': '!תקלה בעדכון המשתמש'}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default UserProfile;
