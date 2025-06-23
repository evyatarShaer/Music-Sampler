import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  Typography,
  IconButton,
  useTheme,
  styled,
} from "@mui/material";
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Dashboard as DashboardIcon,
  ContactSupport as ContactSupportIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: 280,
    backgroundColor: theme.palette.background.default,
    borderRight: "none",
    boxShadow: theme.shadows[4],
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(0.5, 1),
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.action.selected,
  },
}));

interface MenuItemType {
  text: string;
  icon: React.ReactNode;
  path: string;
}

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const menuItems: MenuItemType[] = [
    { text: "דף הבית", icon: <HomeIcon />, path: "/home" },
    { text: "לוח בקרה", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "פרופיל משתמש", icon: <PersonIcon />, path: "/UserProfile" },
    { text: "הגדרות", icon: <SettingsIcon />, path: "/settings" },
    { text: "צור קשר", icon: <ContactSupportIcon />, path: "/contact" },
  ];

  const handleListItemClick = (index: number, path: string) => {
    setSelectedIndex(index);
    navigate(path);
    onClose();
  };

  return (
    <StyledDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      variant="temporary"
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Box
        sx={{
          width: 280,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: theme.spacing(2),
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            תפריט ראשי
          </Typography>
          <IconButton onClick={onClose}>
            <ChevronRightIcon />
          </IconButton>
        </Box>

        <Divider />

        <List sx={{ flexGrow: 1, py: 1 }}>
          {menuItems.map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <StyledListItemButton
                selected={selectedIndex === index}
                onClick={() => handleListItemClick(index, item.path)}
              >
                <ListItemIcon sx={{ minWidth: 46 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    variant: "body1",
                    sx: {
                      textAlign: "right",
                      fontWeight: selectedIndex === index ? "bold" : "normal",
                    },
                  }}
                />
              </StyledListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            © 2024 כל הזכויות שמורות
          </Typography>
        </Box>
      </Box>
    </StyledDrawer>
  );
};

export default SideMenu;
