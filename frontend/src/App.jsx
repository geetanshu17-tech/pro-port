import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import BootScreen from "./components/system/BootScreen.jsx";
import LockScreen from "./components/system/LockScreen.jsx";
import Desktop from "./components/system/Desktop.jsx";

const App = () => {
  const [loading, setLoading] = useState(
    !sessionStorage.getItem("booted")
  );

  useEffect(() => {
    if (!sessionStorage.getItem("booted")) {
      const timer = setTimeout(() => {
        sessionStorage.setItem("booted", "true");
        setLoading(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) return <BootScreen />;

  return (
    <Routes>
      <Route path="/" element={<LockScreen />} />
      <Route path="/desktop" element={<Desktop />} />
    </Routes>
  );
};

export default App;