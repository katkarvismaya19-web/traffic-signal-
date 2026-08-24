import React from "react";

export function ControlPanel({ toggleNS, toggleEW, signalNS, signalEW, pedSignalNS, pedSignalEW }) {
  return (
    <div style={{
      position: "absolute",
      top: 20,
      left: 20,
      zIndex: 10,
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      backgroundColor: "rgba(0,0,0,0.5)",
      padding: "15px",
      borderRadius: "10px",
    }}>
      <button onClick={toggleNS} style={{ padding: "10px 20px", backgroundColor: "#2e8b57", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>Toggle NS/SN</button>
      <button onClick={toggleEW} style={{ padding: "10px 20px", backgroundColor: "#1e90ff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>Toggle EW/WE</button>
      <div style={{ color: "#fff", marginTop: "10px", fontSize: "14px" }}>
        <div>NS Cars: {signalNS.toUpperCase()}</div>
        <div>EW Cars: {signalEW.toUpperCase()}</div>
        <div>NS Pedestrians: {pedSignalNS.toUpperCase()}</div>
        <div>EW Pedestrians: {pedSignalEW.toUpperCase()}</div>
      </div>
    </div>
  );
}
