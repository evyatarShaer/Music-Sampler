import { Card, CardContent, Typography, CardMedia, Grid2 } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  });

  return (
    <div>
      <Grid2 container  
      justifyContent="center" 
      alignItems="center" spacing={3}>
        <Card>
          <CardMedia
            component="img"
            alt="Beautiful Landscape"
            height="140"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQswirdQ21qks2yvS5gFwg9Soib_hhbpZ-YVw&s"
          />
          <CardContent>
            <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
              מרתון ירושלים
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
              מרתון ירושלים
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardMedia
            component="img"
            alt="Beautiful Landscape"
            height="140"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQswirdQ21qks2yvS5gFwg9Soib_hhbpZ-YVw&s"
          />
          <CardContent>
            <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
              מרתון ירושלים
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
              מרתון ירושלים
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardMedia
            component="img"
            alt="Beautiful Landscape"
            height="140"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQswirdQ21qks2yvS5gFwg9Soib_hhbpZ-YVw&s"
          />
          <CardContent>
            <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
              מרתון ירושלים
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
              מרתון ירושלים
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
    </div>
  );
};

export default Home;
