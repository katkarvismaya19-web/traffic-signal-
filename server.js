// server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let trafficState = {
  signalNS: "green",
  signalEW: "red",
  pedSignalNS: "red",
  pedSignalEW: "green",
};

// Queue for toggle requests to prevent conflicts
const toggleQueue = [];
let isSwitching = false;

// Function to process toggle queue
function processQueue() {
  if (isSwitching || toggleQueue.length === 0) return;
  const next = toggleQueue.shift();
  console.log("🚦 Processing next toggle request in queue...");
  isSwitching = true;

  next(() => {
    isSwitching = false;
    console.log("✅ Toggle request completed. Processing next in queue if any...");
    processQueue(); // Process next request
  });
}

// Auto-cycle traffic lights every 10 seconds
setInterval(() => {
  if (isSwitching) return;
  const { signalNS, signalEW } = trafficState;

  console.log("⏱ Auto-cycle traffic lights. Current state:", trafficState);

  if (signalNS === "green") {
    trafficState = { signalNS: "yellow", signalEW, pedSignalNS: "red", pedSignalEW: trafficState.pedSignalEW };
    console.log("🟡 NS turning yellow");
    setTimeout(() => {
      trafficState = { signalNS: "red", signalEW: "green", pedSignalNS: "green", pedSignalEW: "red" };
      console.log("🟥 NS red, 🟢 EW green");
    }, 3000);
  } else if (signalNS === "yellow") {
    trafficState = { signalNS: "red", signalEW: "green", pedSignalNS: "green", pedSignalEW: "red" };
    console.log("🟥 NS red, 🟢 EW green");
  } else if (signalEW === "green") {
    trafficState = { signalNS: "red", signalEW: "yellow", pedSignalNS: "green", pedSignalEW: "red" };
    console.log("🟡 EW turning yellow");
    setTimeout(() => {
      trafficState = { signalNS: "green", signalEW: "red", pedSignalNS: "red", pedSignalEW: "green" };
      console.log("🟢 NS green, 🟥 EW red");
    }, 9000);
  }
}, 10000);

// RPC endpoint to get traffic state
app.get("/getTrafficState", (req, res) => {
  console.log("📡 Traffic state requested");
  res.json(trafficState);
});

// Helper function to enqueue toggle
function enqueueToggle(toggleFn) {
  return new Promise((resolve) => {
    toggleQueue.push((done) => {
      console.log("📥 Toggle request added to queue");
      toggleFn().finally(() => {
        resolve();
        done();
      });
    });
    processQueue();
  });
}

// RPC toggle NS/SN
app.post("/toggleNS", async (req, res) => {
  console.log("🔘 Manual toggle NS requested");
  await enqueueToggle(() => new Promise((resolve) => {
    const { signalNS, signalEW } = trafficState;

    if (signalNS === "green" || signalNS === "yellow") {
      trafficState = { signalNS: "yellow", signalEW, pedSignalNS: "red", pedSignalEW: trafficState.pedSignalEW };
      console.log("🟡 NS turning yellow manually");
      setTimeout(() => {
        trafficState = { signalNS: "red", signalEW: "green", pedSignalNS: "green", pedSignalEW: "red" };
        console.log("🟥 NS red, 🟢 EW green (manual)");
        resolve();
      }, 3000);
    } else if (signalNS === "red") {
      trafficState = { signalNS: "yellow", signalEW: "red", pedSignalNS: "red", pedSignalEW: "green" };
      console.log("🟡 NS turning yellow manually");
      setTimeout(() => {
        trafficState = { signalNS: "green", signalEW: "red", pedSignalNS: "red", pedSignalEW: "green" };
        console.log("🟢 NS green, 🟥 EW red (manual)");
        resolve();
      }, 3000);
    }
  }));
  res.send("NS Toggle triggered");
});

// RPC toggle EW/WE
app.post("/toggleEW", async (req, res) => {
  console.log("🔘 Manual toggle EW requested");
  await enqueueToggle(() => new Promise((resolve) => {
    const { signalNS, signalEW } = trafficState;

    if (signalEW === "green" || signalEW === "yellow") {
      trafficState = { signalEW: "yellow", signalNS, pedSignalEW: "red", pedSignalNS: trafficState.pedSignalNS };
      console.log("🟡 EW turning yellow manually");
      setTimeout(() => {
        trafficState = { signalEW: "red", signalNS: "green", pedSignalEW: "green", pedSignalNS: "red" };
        console.log("🟥 EW red, 🟢 NS green (manual)");
        resolve();
      }, 9000);
    } else if (signalEW === "red") {
      trafficState = { signalEW: "yellow", signalNS: "red", pedSignalEW: "red", pedSignalNS: "green" };
      console.log("🟡 EW turning yellow manually");
      setTimeout(() => {
        trafficState = { signalEW: "green", signalNS: "red", pedSignalEW: "red", pedSignalNS: "green" };
        console.log("🟢 EW green, 🟥 NS red (manual)");
        resolve();
      }, 9000);
    }
  }));
  res.send("EW Toggle triggered");
});

// Start server
app.listen(3001, () => console.log("🚦 RPC Traffic Server running at http://localhost:3001"));
