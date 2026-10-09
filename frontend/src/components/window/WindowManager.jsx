
import Window from "./Window";

const WindowManager = ({
  windows,
  activeWindowId,
  focusWindow,
  minimizeWindow,
  closeWindow,
  renderApp,
}) => {
  return (
    <>
      {windows.map((window) => (
        <Window
          key={window.id}
          window={window}
          isActive={window.id === activeWindowId}
          onFocus={() => focusWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onClose={() => closeWindow(window.id)}
        >
          {renderApp(window)}
        </Window>
      ))}
    </>
  );
};

export default WindowManager;
