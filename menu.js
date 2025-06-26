function initMenu() {
  const menuHTML = `
    <div id="menu-toggle" onclick="toggleSidebar()">☰</div>
    <div id="sidebar">
      <h3>📋 Menu</h3>
      <ul>
        <li onclick="renderDailyRewards()">🎁 Daily Rewards</li>
        <li onclick="renderDashboard()">📡 Server Panel</li>
        <li onclick="renderContactForm()">📝 Form</li>
        <li>
          💬 Support
          <ul class="sub-menu">
            <li><a href="https://discord.gg/yourdiscord" target="_blank">Discord</a></li>
            <li><a href="https://yourtickets.com" target="_blank">Tickets</a></li>
            <li><a href="https://instagram.com/yourpage" target="_blank">Instagram</a></li>
          </ul>
        </li>
        <li onclick="renderTaxViewer()">📊 View Tax</li>
        <li onclick="renderSettings()">⚙️ Account Settings</li>
      </ul>
    </div>
  `;
  document.body.insertAdjacentHTML("afterbegin", menuHTML);
}

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
}
