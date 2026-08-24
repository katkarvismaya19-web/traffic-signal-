// client.js
const xmlrpc = require('xmlrpc');

// Create an XML-RPC client
const client = xmlrpc.createClient({
  host: 'localhost',
  port: 8000,
  path: '/RPC2'
});

// Function to get current state
function getState(callback) {
  client.methodCall('signal.getState', [], (error, value) => {
    if (error) {
      console.error("Error getting state:", error);
      callback(error, null);
    } else {
      callback(null, value);
    }
  });
}

// Function to toggle NS signal
function toggleNS(callback) {
  client.methodCall('signal.toggleNS', [], (error, value) => {
    if (error) {
      console.error("Error toggling NS:", error);
      callback(error, null);
    } else {
      callback(null, value);
    }
  });
}

// Function to toggle EW signal
function toggleEW(callback) {
  client.methodCall('signal.toggleEW', [], (error, value) => {
    if (error) {
      console.error("Error toggling EW:", error);
      callback(error, null);
    } else {
      callback(null, value);
    }
  });
}

// Export the functions for use in App.js
module.exports = { getState, toggleNS, toggleEW };
