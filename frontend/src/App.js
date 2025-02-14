import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
//import { AuthContext } from "./context/AuthContext";
import PrivateRoute from "./Routes/PrivateRoutes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";

import AddGpu from "./pages/AddGpu";
import EditGPU from "./pages/EditGPU";
import PlaceBid from "./pages/PlaceBid";
import GPUListings from "./pages/GPUListings";
import Dashboard from "./pages/Dashboard";
import "./App.css";

import { createContext } from "react";
import LandingPage from "./pages/LandingPage";

export const AuthContext = createContext();

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />

        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/gpulistings" element={<GPUListings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<PrivateRoute />}>
              <Route path="/addgpu" element={<AddGpu />} />
              <Route path="/editgpu" element={<EditGPU />} />

              <Route path="/placebid" element={<PlaceBid />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

// <Routes>
// <Route path="/" element={<GPUListings />} />
// <Route path="/login" element={<Login />} />
// <Route path="/register" element={<Register />} />

// <Route element={<PrivateRoute />}>
//   <Route path="/addgpu" element={<AddGpu />} />
//   <Route path="/editgpu" element={<EditGPU />} />

//   <Route path="/placebid" element={<PlaceBid />} />
//   <Route path="/dashboard" element={<Dashboard />} />
// </Route>
// </Routes>
