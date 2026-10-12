
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { RiShutDownLine } from "react-icons/ri";
import BootScreen from "./components/system/BootScreen.jsx";
import LockScreen from "./components/system/LockScreen.jsx";
import Desktop from "./components/system/Desktop.jsx";
import useWindowManager from "./components/window/useWindowManager";

const App = () => {
  const [loading, setLoading] = useState(
    !sessionStorage.getItem("booted")
  );
  const [isShutdown, setIsShutdown] = useState(false);
  const navigate = useNavigate();

  const {
    windows,
    activeWindowId,
    openWindow,
    focusWindow,
    minimizeWindow,
    restoreWindow,
    closeWindow,
    clearWindows,
  } = useWindowManager();

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

  if (isShutdown) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#05070c",
          color: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "18px",
          fontFamily: "Segoe UI, sans-serif",
        }}
      >
        <div style={{ fontSize: "22px" }}>Pro-Port is shut down</div>
        <button
          onClick={() => {
            setIsShutdown(false);
            navigation("/");
          }}
          style={{
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            borderRadius: "8px",
            border: "1px solid #475569",
            background: "#172033",
            color: "white",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          <RiShutDownLine /> Power on
        </button>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<LockScreen />}
      />
      <Route
        path="/desktop"
        element={
          <Desktop
            windows={windows}
            activeWindowId={activeWindowId}
            openWindow={openWindow}
            focusWindow={focusWindow}
            minimizeWindow={minimizeWindow}
            restoreWindow={restoreWindow}
            closeWindow={closeWindow}
            clearWindows={clearWindows}
            onSleep={() => 
              navigate("/")}
            onSignOut={() => {
              clearWindows();
              navigate("/");
            }}
            onShutdown={() => {
              clearWindows();
              setIsShutdown(true);
            }}
          />
        }
      />
    </Routes>
  );
};

export default App;
