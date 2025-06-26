function renderHowToPlay() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section id="how-to-play">
      <h2>🎮 How to Join the Server</h2>
      <div class="join-guide">
        <h3>Java Edition</h3>
        <ol>
          <li>Open Minecraft Java Edition</li>
          <li>Click on <strong>Multiplayer</strong></li>
          <li>Click <strong>Add Server</strong></li>
          <li>Set Server Name: <code>MyServer</code></li>
          <li>Set Server Address: <code>mc.yourserver.net</code></li>
          <li>Click <strong>Done</strong> → Select server → <strong>Join</strong></li>
        </ol>

        <h3>Bedrock Edition (Mobile, Console, Windows 10)</h3>
        <ol>
          <li>Go to <strong>Play</strong> → <strong>Servers</strong></li>
          <li>Scroll down and click <strong>Add Server</strong></li>
          <li>Server Name: <code>MyServer</code></li>
          <li>Server Address: <code>mc.yourserver.net</code></li>
          <li>Port: <code>19132</code></li>
          <li>Click <strong>Save</strong> then <strong>Join Server</strong></li>
        </ol>
      </div>

      <h2>🕹️ How to Play</h2>
      <ul>
        <li>Complete jobs and earn money</li>
        <li>Use <code>/shop</code> to buy/sell items</li>
        <li>Join events and win daily rewards</li>
        <li>Use <code>/sethome</code> and <code>/home</code> to save your base</li>
        <li>Join a clan or create your own team</li>
        <li>Check your progress using <code>/stats</code></li>
        <li>Be respectful and follow server rules</li>
      </ul>
    </section>
  `;
}
