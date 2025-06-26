const CF_API = "https://minecraft-details-acc.1987sakshamsingh.workers.dev/";
let accountData = {};

async function fetchAccounts() {
  try {
    const res = await fetch(CF_API);
    accountData = await res.json();
  } catch (err) {
    console.error("❌ Failed to load accounts:", err);
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
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

async function handleLogin() {
  const username = document.getElementById("login-name").value.trim();
  const password = document.getElementById("login-pass").value.trim();

  if (!username || !password) return alert("Enter both fields.");
  if (!accountData[username]) return alert("❌ Account not found.");

  const user = accountData[username];
  const hash = await sha256(password);

  if (user.pass !== hash) return alert("🔒 Incorrect password.");

  localStorage.setItem("account", JSON.stringify(user));
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
