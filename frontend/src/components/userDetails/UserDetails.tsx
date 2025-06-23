import React, { useEffect } from "react";
import { Box, Popover, Typography, Avatar, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setUser } from "../../store/features/userSlice";
import { User } from "../../types/user";

interface UserProfilePopupProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}

const UserProfilePopup: React.FC<UserProfilePopupProps> = ({anchorEl, handleClose}) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.users.currentUser);

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("currentUser");
    if (!user && userFromLocalStorage) {
      dispatch(setUser(JSON.parse(userFromLocalStorage) as User));
    }
  }, [user, dispatch]);

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box sx={{ p: 2, width: 250 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar sx={{ mr: 2 }}>{user?.username[0]}</Avatar>
          <Typography variant="h6">{user?.username}</Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body2">דוא"ל: {user?.email}</Typography>
        <Typography variant="body2">
          תפקיד: {user?.isAdmin ? "מנהל" : "משתמש רגיל"}
        </Typography>
        <Divider sx={{ my: 1 }} />
        {/* <Button
          startIcon={<LogoutIcon />}
          color="error"
          fullWidth
          variant="outlined"
        >
          התנתק
        </Button> */}
      </Box>
    </Popover>
  );
};

export default UserProfilePopup;
