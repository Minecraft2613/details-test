let accountData = {};

async function fetchAccounts() {
  try {
    const res = await fetch(CF_API);
    accountData = await res.json();
  } catch (e) {
    console.error("❌ Failed to fetch accounts:", e);
    alert("Could not load accounts from server.");
  }
}

function renderLoginForm() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section id="login-section">
      <h2>🔐 Login</h2>
      <input type="text" id="login-name" placeholder="Username" />
      <input type="password" id="login-pass" placeholder="Password" />
      <button onclick="handleLogin()">Login</button>
      <p>Don't have an account? <a href="#" onclick="renderCreateForm()">Create one</a></p>
    </section>
  `;
}

async function sha256(str) {
  const msgBuffer = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");
}

async function handleLogin() {
  const username = document.getElementById("login-name").value.trim();
  const password = document.getElementById("login-pass").value.trim();
  if (!username || !password) return alert("Enter both fields.");
  if (!accountData[username]) return alert("❌ Username not found.");
  const storedUser = accountData[username];
  const hashedInput = await sha256(password);
  if (storedUser.pass !== hashedInput) {
    return alert("🔒 Incorrect password.");
  }
  localStorage.setItem("account", JSON.stringify(storedUser));
  sessionStorage.setItem("loggedIn", "true");
  loadMainPanel();
}

function autoLoginIfAvailable() {
  const loggedIn = sessionStorage.getItem("loggedIn") === "true";
  if (loggedIn) {
    loadMainPanel();
  } else {
    renderLoginForm();
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  await fetchAccounts();
  autoLoginIfAvailable();
});
