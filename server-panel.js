const STATUS_API = "https://your-cloudflare-api.workers.dev/status"; // 🔁 Replace this

function renderServerStatusUI() {
  const app = document.getElementById("server-status-panel") || document.getElementById("app");
  app.innerHTML = `
    <section id="status-section">
      <h2>🌐 Server Status</h2>
      <div id="status-box">
        <p><strong>Status:</strong> <span id="server-online">Checking...</span></p>
        <p><strong>Players:</strong> <span id="server-players">--</span></p>
        <p><strong>Expires:</strong> <span id="server-expire">--</span></p>
      </div>
    </section>
  `;

  fetchServerStatus();
  setInterval(fetchServerStatus, 15000); // auto refresh every 15 seconds
}

async function fetchServerStatus() {
  try {
    const res = await fetch(STATUS_API);
    const data = await res.json();

    document.getElementById("server-online").innerHTML =
      data.online ? '<span style="color:lime">🟢 Online</span>' : '<span style="color:red">🔴 Offline</span>';

    document.getElementById("server-players").textContent =
      data.online ? `${data.players || 0} / ${data.maxPlayers || "--"}` : "--";

    document.getElementById("server-expire").textContent =
      data.expires ? new Date(data.expires).toLocaleString() : "Unknown";

  } catch (err) {
    console.error("Error fetching server status:", err);
    document.getElementById("server-online").innerHTML = '<span style="color:gray">❓ Unavailable</span>';
    document.getElementById("server-players").textContent = "--";
    document.getElementById("server-expire").textContent = "--";
  }
}
