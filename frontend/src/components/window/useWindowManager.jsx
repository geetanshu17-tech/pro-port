import { useState } from "react";

const useWindowManager = () => {
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [nextZIndex, setNextZIndex] = useState(10);

  const openWindow = (app) => {
    const existing = windows.find(
      (win) => win.appId === app.appId
    );

    if (existing) {
      restoreWindow(existing.id);
      return;
    }

    const id = `${app.appId}-${Date.now()}`;

    setWindows((current) => [
      ...current,
      {
        id,
        appId: app.appId,
        title: app.label,
        route: app.route,
        zIndex: nextZIndex,
        isMinimized: false,
      },
    ]);

    setActiveWindowId(id);
    setNextZIndex((z) => z + 1);
  };

  const focusWindow = (id) => {
    setActiveWindowId(id);

    setWindows((current) =>
      current.map((win) =>
        win.id === id
          ? { ...win, zIndex: nextZIndex }
          : win
      )
    );

    setNextZIndex((z) => z + 1);
  };

  const minimizeWindow = (id) => {
    setWindows((current) =>
      current.map((win) =>
        win.id === id
          ? { ...win, isMinimized: true }
          : win
      )
    );

    if (activeWindowId === id) {
      const remaining = windows
        .filter((win) => win.id !== id && !win.isMinimized)
        .sort((a, b) => b.zIndex - a.zIndex);

      setActiveWindowId(
        remaining.length ? remaining[0].id : null
      );
    }
  };

  const restoreWindow = (id) => {
    setWindows((current) =>
      current.map((win) =>
        win.id === id
          ? {
              ...win,
              isMinimized: false,
              zIndex: nextZIndex,
            }
          : win
      )
    );

    setActiveWindowId(id);
    setNextZIndex((z) => z + 1);
  };

  const closeWindow = (id) => {
    const remaining = windows.filter((win) => win.id !== id);

    setWindows(remaining);

    if (activeWindowId === id) {
      const visibleWindows = remaining
        .filter((win) => !win.isMinimized)
        .sort((a, b) => b.zIndex - a.zIndex);

      setActiveWindowId(
        visibleWindows.length ? visibleWindows[0].id : null
      );
    }
  };
  
  const clearWindows = () => {
    setWindows([]);
    setActiveWindowId(null);
  };


  return {
    windows,
    activeWindowId,
    openWindow,
    focusWindow,
    minimizeWindow,
    restoreWindow,
    closeWindow,
    clearWindows,
  };
};

export default useWindowManager;

