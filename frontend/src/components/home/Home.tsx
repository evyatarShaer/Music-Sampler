import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MusicSampler from "../MusicSampler/MusicSampler";

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
      <MusicSampler />
    </div>
  );
};

export default Home;
