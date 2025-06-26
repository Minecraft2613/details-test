const CF_API = "https://minecraft-details-acc.1987sakshamsingh.workers.dev/";
const API_TOKEN = "123456server"; // match the token used in your worker

function renderSettings() {
  const user = JSON.parse(localStorage.getItem("account"));
  const app = document.getElementById("app");

  app.innerHTML = `
    <section id="settings-panel">
      <h2>⚙️ Account Settings</h2>

      <label>Username</label>
      <input type="text" value="${user.username}" disabled />

      <label>Discord ID</label>
      <input type="text" id="set-discord" value="${user.discord || ''}" />

      <label>Instagram</label>
      <input type="text" id="set-instagram" value="${user.instagram || ''}" />

      <label>Profile Picture URL</label>
      <input type="text" id="set-pic" value="${user.profilePic || ''}" />

      <label>New Password</label>
      <input type="password" id="set-pass" placeholder="Leave blank to keep current" />

      <button onclick="saveSettings()">💾 Save Changes</button>
      <button onclick="loadMainPanel()">🔙 Back</button>
    </section>
  `;
}

async function sha256(str) {
  const msgBuffer = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

async function saveSettings() {
  const stored = JSON.parse(localStorage.getItem("account"));

  const updated = {
    ...stored,
    discord: document.getElementById("set-discord").value.trim(),
    instagram: document.getElementById("set-instagram").value.trim(),
    profilePic: document.getElementById("set-pic").value.trim()
  };

  const newPass = document.getElementById("set-pass").value.trim();
  if (newPass) {
    updated.pass = await sha256(newPass);
  }

  try {
    const res = await fetch(CF_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-token": API_TOKEN
      },
      body: JSON.stringify(updated)
    });

    if (res.ok) {
      alert("✅ Settings updated!");
      localStorage.setItem("account", JSON.stringify(updated));
      loadMainPanel();
    } else {
      const data = await res.json();
      alert("❌ Error: " + (data.error || "Failed to save settings"));
    }
  } catch (err) {
    console.error("❌ Save error:", err);
    alert("⚠️ Failed to reach Cloudflare API.");
  }
}
