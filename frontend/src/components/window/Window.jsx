
import { useState } from "react";

const Window = ({
  window,
  isActive,
  onFocus,
  onMinimize,
  onClose,
  children,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event) => {
    if (event.target.closest("button")) return;

    onFocus();
    setDragging(true);
    setDragOffset({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });
  };

  const handleMouseMove = (event) => {
    if (!dragging) return;

    setPosition({
      x: event.clientX - dragOffset.x,
      y: event.clientY - dragOffset.y,
    });
  };

  const handleMouseUp = () => setDragging(false);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        position: "absolute",
        top: "8%",
        left: "15%",
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: "70%",
        height: "75%",
        zIndex: window.zIndex,
        display: window.isMinimized ? "none" : "block",
        background: "#f8fafc",
        color: "#111827",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: isActive
          ? "0 12px 40px rgba(0,0,0,0.35)"
          : "0 6px 20px rgba(0,0,0,0.2)",
        border: isActive
          ? "1px solid #93c5fd"
          : "1px solid #cbd5e1",
      }}
    >
      <div
        onMouseDown={handleMouseDown}
        style={{
          height: "42px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px",
          background: "#e2e8f0",
          cursor: dragging ? "grabbing" : "grab",
          userSelect: "none",
        }}
      >
        <span>{window.title}</span>

        <div style={{ display: "flex", gap: "4px" }}>
          <button
            onClick={(event) => {
              event.stopPropagation();
              onMinimize();
            }}
            aria-label={`Minimize ${window.title}`}
            title="Minimize"
            style={buttonStyle}
          >
            —
          </button>

          <button
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            aria-label={`Close ${window.title}`}
            title="Close"
            style={buttonStyle}
          >
            ×
          </button>
        </div>
      </div>

      <div
        style={{
          height: "calc(100% - 42px)",
          overflow: "auto",
          padding: "20px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

const buttonStyle = {
  width: "36px",
  height: "32px",
  border: "none",
  borderRadius: "5px",
  background: "transparent",
  cursor: "pointer",
  fontSize: "18px",
};

export default Window;
