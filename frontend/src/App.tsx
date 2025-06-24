import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import UserProfile from "./components/userProfile/UserProfile";
import MusicSampler from "./components/MusicSampler/MusicSampler";

const App = () => {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/grid" element={<MusicSampler />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default App