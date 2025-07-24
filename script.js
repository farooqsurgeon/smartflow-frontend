// script.js

const API_BASE = "https://smartflow-api-ccyd.onrender.com";

document.getElementById("predictForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const location = document.getElementById("location").value;
  const time     = document.getElementById("time").value;
  const date     = document.getElementById("date").value;
  const weather  = document.getElementById("weather").value;

  const resultBox = document.getElementById("resultBox");
  resultBox.innerText = "🔄 Predicting...";

  try {
    const response = await fetch(`${API_BASE}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ location, time, date, weather })
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const data = await response.json();
    resultBox.innerText = `🚦 Predicted Congestion: ${data.congestion || "Unknown"}`;
  } catch (error) {
    console.error("Fetch error:", error);
    resultBox.innerText = "❌ Error contacting server.";
  }
});
