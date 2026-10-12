
import { useEffect, useState } from "react";
import { RiShutDownLine } from "react-icons/ri";

const Taskbar = ({
  apps = [],
  windows = [],
  activeWindowId,
  focusWindow,
  minimizeWindow,
  restoreWindow,
  openWindow,
  onSleep,
  onSignOut,
  onShutdown,
}) => {
  const [time, setTime] = useState(new Date());
  const [startOpen, setStartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [powerOpen, setPowerOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Click an existing taskbar window.
  const handleAppClick = (win) => {
    if (win.isMinimized) {
      restoreWindow?.(win.id);
    } else if (win.id === activeWindowId) {
      minimizeWindow?.(win.id);
    } else {
      focusWindow?.(win.id);
    }
  };

  // Search all available desktop apps, not just open windows.
  const filteredApps = apps.filter((app) =>
    (app.label || "").toLowerCase().includes(search.trim().toLowerCase())
  );

  // Open an app, or restore/focus it if it is already open.
  const handleOpenApp = (app) => {
    openWindow?.(app);
    setStartOpen(false);
    setSearchOpen(false);
    setSearch("");
  };

  const buttonStyle = {
    height: "42px",
    minWidth: "42px",
    padding: "0 10px",
    border: "1px solid transparent",
    borderRadius: "12px",
    background: "transparent",
    color: "#172033",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 150ms ease",
  };

  const panelStyle = {
    position: "absolute",
    bottom: "88px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "min(440px, calc(100vw - 32px))",
    maxHeight: "60vh",
    overflowY: "auto",
    padding: "20px",
    borderRadius: "18px",
    background: "rgba(235, 243, 253, 0.92)",
    backdropFilter: "blur(28px)",
    WebkitBackdropFilter: "blur(28px)",
    border: "1px solid rgba(255,255,255,0.65)",
    boxShadow: "0 12px 45px rgba(15,23,42,0.22)",
    color: "#172033",
    zIndex: 10000,
  };

  const appButtonStyle = {
    ...buttonStyle,
    width: "100%",
    justifyContent: "flex-start",
    marginBottom: "4px",
    textAlign: "left",
  };

  return (
    <>
      {/* Start menu */}
      {startOpen && (
        <div style={panelStyle}>
          <h3 style={{ margin: "0 0 16px" }}>Your workspace</h3>

          <p style={{ fontSize: "13px", color: "#64748b" }}>
            Applications
          </p>

          {apps.length === 0 ? (
            <p>No applications available.</p>
          ) : (
            apps.map((app) => (
              <button
                key={app._id || app.appId}
                onClick={() => handleOpenApp(app)}
                style={appButtonStyle}
              >
                📁 {app.label}
                {windows.some((win) => win.appId === app.appId) && (
                  <span
                    style={{
                      marginLeft: "auto",
                      color: "#64748b",
                      fontSize: "12px",
                    }}
                  >
                    Open
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      )}

      {/* Search panel */}
      {searchOpen && (
        <div style={panelStyle}>
          <input
            autoFocus
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && filteredApps.length > 0) {
                handleOpenApp(filteredApps[0]);
              }
              if (event.key === "Escape") {
                setSearchOpen(false);
                setSearch("");
              }
            }}
            placeholder="Search apps..."
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px 14px",
              border: "1px solid #cbd5e1",
              borderRadius: "10px",
              outline: "none",
              background: "rgba(255,255,255,0.8)",
              fontSize: "14px",
            }}
          />

          <p style={{ fontSize: "13px", color: "#64748b" }}>
            {search.trim() ? "Search results" : "All applications"}
          </p>

          {filteredApps.map((app) => (
            <button
              key={app._id || app.appId}
              onClick={() => handleOpenApp(app)}
              style={appButtonStyle}
            >
              📁 {app.label}
              {windows.some((win) => win.appId === app.appId) && (
                <span
                  style={{
                    marginLeft: "auto",
                    color: "#64748b",
                    fontSize: "12px",
                  }}
                >
                  Open
                </span>
              )}
            </button>
          ))}

          {filteredApps.length === 0 && (
            <p>No matching applications found.</p>
          )}
        </div>
      )}

      {/* Power menu */}
        {powerOpen && (
          <div
            style={{
              position: "fixed",
              right: "24px",
              bottom: "94px",
              width: "220px",
              padding: "10px",
              borderRadius: "16px",
              background: "rgba(235, 243, 253, 0.92)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(255,255,255,0.65)",
              boxShadow: "0 12px 45px rgba(15,23,42,0.22)",
              zIndex: 10001,
            }}
          >
            {[
              { label: "Sleep", icon: "🌙" },
              { label: "Sign out", icon: "↪" },
              { label: "Shut down", icon: <RiShutDownLine /> },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setPowerOpen(false);
                  if (item.label === "Sleep") onSleep?.();
                  if (item.label === "Sign out") onSignOut?.();
                  if (item.label === "Shut down") onShutdown?.();

                }}
                style={{
                  ...buttonStyle,
                  width: "100%",
                  justifyContent: "flex-start",
                  gap: "12px",
                  marginBottom: "3px",
                }}
              >
                <span style={{ width: "22px", textAlign: "center" }}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </div>
        )}

      {/* Floating taskbar */}
      <div
        style={{
          position: "fixed",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(1050px, calc(100vw - 40px))",
          height: "64px",
          boxSizing: "border-box",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)",
          alignItems: "center",
          padding: "0 14px",
          gap: "12px",
          borderRadius: "20px",
          background: "rgba(220, 234, 251, 0.76)",
          backdropFilter: "blur(30px) saturate(160%)",
          WebkitBackdropFilter: "blur(30px) saturate(160%)",
          border: "1px solid rgba(255,255,255,0.75)",
          boxShadow: "0 8px 32px rgba(15,23,42,0.22)",
          zIndex: 9999,
        }}
      >
        {/* Left information widget */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            minWidth: 0,
            color: "#172033",
          }}
        >
          <span style={{ fontSize: "23px" }}>💻</span>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: "12px", fontWeight: 600 }}>
              Pro-Port
            </div>
            <div style={{ fontSize: "10px", color: "#475569" }}>
              Your workspace
            </div>
          </div>
        </div>

        {/* Center controls and OPEN windows only */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            minWidth: 0,
          }}
        >
          <button
            title="Start"
            onClick={() => {
              setStartOpen((open) => !open);
              setSearchOpen(false);
            }}
            style={{
              ...buttonStyle,
              background: startOpen
                ? "rgba(255,255,255,0.65)"
                : "transparent",
              fontSize: "22px",
              color: "#2563eb",
            }}
          >
            ⊞
          </button>

          <button
            title="Search"
            onClick={() => {
              setSearchOpen((open) => !open);
              setStartOpen(false);
              setSearch("");
            }}
            style={{ ...buttonStyle, gap: "7px" }}
          >
            <span>⌕</span>
            <span style={{ fontSize: "12px" }}>Search</span>
          </button>

          {/* Only windows that have actually been opened */}
          {windows.map((win) => (
            <button
              key={win.id}
              title={win.title}
              aria-label={`${win.title}${win.isMinimized ? " (minimized)" : ""}`}
              onClick={() => handleAppClick(win)}
              style={{
                ...buttonStyle,
                minWidth: "42px",
                padding: "0 8px",
                background:
                  activeWindowId === win.id && !win.isMinimized
                    ? "rgba(255,255,255,0.72)"
                    : "transparent",
                borderBottom:
                  activeWindowId === win.id && !win.isMinimized
                    ? "3px solid #2563eb"
                    : win.isMinimized
                      ? "3px solid #94a3b8"
                      : "3px solid transparent",
              }}
            >
              📁
            </button>
          ))}
        </div>    
        

        {/* Right system tray and clock */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "10px",
            color: "#172033",
            minWidth: 0,
          }}
        >
          <span title="Network" style={{ fontSize: "14px" }}>◉</span>
          <span title="Sound" style={{ fontSize: "14px" }}>🔊</span>

          <div
            title="Current date and time"
            style={{
              minWidth: 0,
              padding: "0 4px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "3px",
              fontSize: "11px",
            }}
          >
            <span>
              {time.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span>
              {time.toLocaleDateString([], {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </div>
          <button
          title="Power options"
          aria-label="Power options"
          onClick={() => {
            setPowerOpen((open) => !open);
            setStartOpen(false);
            setSearchOpen(false);
          }}
          style={{
            ...buttonStyle,
            flexShrink: 0,
            width: "38px",
            minWidth: "38px",
            height: "38px",
            padding: 0,
            fontSize: "21px",
            color: "#172033",
            borderRadius: "10px",
            background: powerOpen
              ? "rgba(255,255,255,0.75)"
              : "transparent",
          }}
        >
          <RiShutDownLine />
        </button>

        </div>        
      </div>
    </>
  );
};

export default Taskbar;
