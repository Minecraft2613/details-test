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

function fetchDashboardServerStatus() {
  const serverIP = "mc1524209.fmcs.cloud";

  fetch(`https://api.mcsrvstat.us/2/${serverIP}`)
    .then(res => res.json())
    .then(data => {
      const statusEl = document.getElementById("server-online");
      const playersEl = document.getElementById("server-players");

      if (!statusEl || !playersEl) return;

      if (data.online) {
        statusEl.innerHTML = '<span style="color:lime">🟢 Online</span>';
        playersEl.textContent = `${data.players.online} / ${data.players.max}`;
      } else {
        statusEl.innerHTML = '<span style="color:red">🔴 Offline</span>';
        playersEl.textContent = '--';
      }
    })
    .catch(() => {
      const statusEl = document.getElementById("server-online");
      const playersEl = document.getElementById("server-players");
      if (statusEl) statusEl.innerHTML = '❓ Unavailable';
      if (playersEl) playersEl.textContent = '--';
    });
}

