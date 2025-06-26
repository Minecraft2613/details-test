const CF_API = "https://minecraft-details-acc.1987sakshamsingh.workers.dev/";
const API_TOKEN = "123456server"; // 🔒 Set this same as your Cloudflare secret token

function renderCreateForm() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section id="create-section">
      <h2>🆕 Create Account</h2>
      <input type="text" id="create-username" placeholder="Username" />
      <input type="password" id="create-pass" placeholder="Password" />
      <input type="text" id="create-discord" placeholder="Discord ID (optional)" />
      <input type="text" id="create-instagram" placeholder="Instagram (optional)" />
      <input type="text" id="create-pic" placeholder="Profile Picture URL (optional)" />
      <button onclick="handleCreate()">Create Account</button>
      <p>Already have an account? <a href="#" onclick="renderLoginForm()">Login</a></p>
    </section>
  `;
}

async function handleCreate() {
  const username = document.getElementById("create-username").value.trim();
  const pass = document.getElementById("create-pass").value.trim();
  const discord = document.getElementById("create-discord").value.trim();
  const instagram = document.getElementById("create-instagram").value.trim();
  const profilePic = document.getElementById("create-pic").value.trim();

  if (!username || !pass) {
    alert("Username and password required.");
    return;
  }

  const accountObj = {
    username,
    pass,
    discord,
    instagram,
    profilePic,
    id: crypto.randomUUID()
  };

  try {
    const res = await fetch(CF_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-token": API_TOKEN
      },
      body: JSON.stringify(accountObj)
    });

    if (res.ok) {
      alert("✅ Account created!");
      localStorage.setItem("account", JSON.stringify(accountObj));
      sessionStorage.setItem("loggedIn", "true");
      loadMainPanel(); // This should render the actual site panel
    } else {
      const data = await res.json();
      alert("❌ Error: " + (data.error || "Failed to create"));
    }
  } catch (err) {
    console.error("Account creation failed:", err);
    alert("⚠️ Network error.");
  }
}
