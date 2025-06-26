function renderCreateForm() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section id="create-section">
      <h2>?? Create Account</h2>
      <input type="text" id="create-username" placeholder="Username" />
      <input type="password" id="create-pass" placeholder="Password" />
      <input type="text" id="create-discord" placeholder="Discord ID (optional)" />
      <input type="text" id="create-instagram" placeholder="Instagram (optional)" />
      <input type="text" id="create-pic" placeholder="Profile Picture URL (optional)" />
      <button onclick="handleCreate()">Create</button>
      <p>Have an account? <a href="#" onclick="renderLoginForm()">Login</a></p>
    </section>
  `;
}

async function handleCreate() {
  const username = document.getElementById("create-username").value.trim();
  const pass = document.getElementById("create-pass").value.trim();
  const discord = document.getElementById("create-discord").value.trim();
  const instagram = document.getElementById("create-instagram").value.trim();
  const profilePic = document.getElementById("create-pic").value.trim();
  if (!username || !pass) return alert("Username and password required.");

  const newUser = {
    username, pass, discord, instagram, profilePic, id: crypto.randomUUID()
  };

  try {
    const res = await fetch(CF_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-token": API_TOKEN
      },
      body: JSON.stringify(newUser)
    });
    if (res.ok) {
      alert("? Account created!");
      localStorage.setItem("account", JSON.stringify(newUser));
      sessionStorage.setItem("loggedIn", "true");
      loadMainPanel();
    } else {
      const data = await res.json();
      alert("? " + (data.error || "Failed to create account."));
    }
  } catch (err) {
    alert("?? Connection error.");
  }
}
