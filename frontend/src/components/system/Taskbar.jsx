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

  // Shared base styles for all taskbar buttons.
  const buttonClass =
    "flex h-[42px] min-w-[42px] cursor-pointer items-center justify-center rounded-xl border border-transparent bg-transparent px-2.5 text-sm text-[#172033] transition-colors duration-150 hover:bg-white/40";

  // Shared styles for app buttons in Start and Search panels.
  const appButtonClass =
    `${buttonClass} mb-1 w-full justify-start text-left`;

  
  const panelClass =
    "absolute bottom-[88px] left-1/2 z-[10000] max-h-[60vh] w-[min(440px,calc(100vw-32px))] -translate-x-1/2 overflow-y-auto rounded-[18px] border border-white/[0.65] bg-[#ebf3fd]/[0.92] p-5 text-[#172033] shadow-[0_12px_45px_rgba(15,23,42,0.22)] backdrop-blur-[28px]";


  return (
    <>
      {/* Start menu */}
      {startOpen && (
        <div className={panelClass}>
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
                className={appButtonClass}
              >
                📁 {app.label}

                {windows.some((win) => win.appId === app.appId) && (
                  <span className="ml-auto text-xs text-slate-500">
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
        <div className={panelClass}>
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
            className="box-border w-full rounded-[10px] border border-slate-300 bg-white/80 px-[14px] py-3 text-sm outline-none focus:border-blue-400"
          />

          <p style={{ fontSize: "13px", color: "#64748b" }}>
            {search.trim() ? "Search results" : "All applications"}
          </p>

          {filteredApps.map((app) => (
            <button
              key={app._id || app.appId}
              onClick={() => handleOpenApp(app)}
              className={appButtonClass}
            >
              📁 {app.label}

              {windows.some((win) => win.appId === app.appId) && (
                <span className="ml-auto text-xs text-slate-500">
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
          className="fixed bottom-[94px] right-6 z-[10001] w-[220px] rounded-2xl border border-white/65 bg-[#ebf3fd]/[0.92] p-[10px] shadow-[0_12px_45px_rgba(15,23,42,0.22)] backdrop-blur-[28px]"
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
              className={`${buttonClass} mb-[3px] w-full justify-start gap-3`}
            >
              <span className="w-[22px] text-center">
                {item.icon}
              </span>

              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Floating taskbar */}
      <div
        className="fixed bottom-4 left-1/2 z-[9999] grid h-16 w-[min(1050px,calc(100vw-40px))] -translate-x-1/2 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 rounded-[20px] border border-white/75 bg-[#dceafb]/[0.76] px-3.5 shadow-[0_8px_32px_rgba(15,23,42,0.22)] backdrop-blur-[30px] backdrop-saturate-[160%]"
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
          {/* Start button */}
          <button
            title="Start"
            onClick={() => {
              setStartOpen((open) => !open);
              setSearchOpen(false);
            }}
            className={`${buttonClass} text-[22px] text-blue-600 ${
              startOpen ? "bg-white/[0.65]" : "bg-transparent"
            }`}
          >
            ⊞
          </button>

          {/* Search button */}
          <button
            title="Search"
            onClick={() => {
              setSearchOpen((open) => !open);
              setStartOpen(false);
              setSearch("");
            }}
            className={`${buttonClass} gap-[7px]`}
          >
            <span>⌕</span>
            <span className="text-xs">Search</span>
          </button>

          {/* Only windows that have actually been opened */}
          {windows.map((win) => (
            <button
              key={win.id}
              title={win.title}
              aria-label={`${win.title}${win.isMinimized ? " (minimized)" : ""}`}
              onClick={() => handleAppClick(win)}
              className={`${buttonClass} min-w-[42px] px-2 ${
                activeWindowId === win.id && !win.isMinimized
                  ? "bg-white/[0.72] border-b-[3px] border-b-blue-600"
                  : win.isMinimized
                    ? "border-b-[3px] border-b-slate-400"
                    : "border-b-[3px] border-b-transparent"
              }`}
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
          <span title="Network" style={{ fontSize: "14px" }}>
            ◉
          </span>

          <span title="Sound" style={{ fontSize: "14px" }}>
            🔊
          </span>

          {/* Clock and date */}
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

          {/* Power toggle */}
          <button
            title="Power options"
            aria-label="Power options"
            onClick={() => {
              setPowerOpen((open) => !open);
              setStartOpen(false);
              setSearchOpen(false);
            }}
            className={`${buttonClass} h-[38px] w-[38px] min-w-[38px] shrink-0 rounded-[10px] p-0 text-[21px] ${
              powerOpen ? "bg-white/[0.75]" : "bg-transparent"
            }`}
          >
            <RiShutDownLine />
          </button>
        </div>
      </div>
    </>
  );
};

export default Taskbar;