function renderDashboard() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section id="dashboard">
      <h2>🖥️ Server Dashboard</h2>
      
      <div id="dashboard-status"></div>
      <div id="dashboard-howto"></div>

      <div class="dash-buttons">
        <button onclick="renderPlugins()">🧩 View Plugins</button>
        <button onclick="showPlayerInfo()">🏠 Player Home</button>
        <button onclick="renderHowToPlay()">🎮 How to Join & Play</button>
      </div>
    </section>
  `;

  // Load status + how to play inside dashboard
  showServerInfoInsideDashboard();
  renderHowToJoinInsideDashboard();
}

// Injects server info in dashboard
function showServerInfoInsideDashboard() {
  const panel = document.getElementById("dashboard-status");
  panel.innerHTML = `
    <h3>📡 Server Status & Info</h3>
    <ul>
      <li><strong>Status:</strong> <span id="server-online">Checking...</span></li>
      <li><strong>Players:</strong> <span id="server-players">--</span></li>
      <li><strong>IP:</strong> mc.yourserver.net</li>
      <li><strong>Version:</strong> Java & Bedrock 1.21.4</li>
    </ul>
  `;
  fetchDashboardServerStatus();
}

// Injects how-to inside dashboard
function renderHowToJoinInsideDashboard() {
  const panel = document.getElementById("dashboard-howto");
  panel.innerHTML = `
    <h3>🎮 How to Join</h3>
    <p>Java: Add server → mc.yourserver.net</p>
    <p>Bedrock: Add server → mc.yourserver.net, Port: 19132</p>
  `;
}

// Optional fetch from your status API
function fetchDashboardServerStatus() {
  fetch("https://api.mcstatus.io/v2/status/java/mc.yourserver.net")
    .then(res => res.json())
    .then(data => {
      document.getElementById("server-online").innerHTML = data.online ? '🟢 Online' : '🔴 Offline';
      document.getElementById("server-players").textContent = `${data.players.online} / ${data.players.max}`;
    })
    .catch(() => {
      document.getElementById("server-online").innerHTML = '❓ Unavailable';
    });
}
