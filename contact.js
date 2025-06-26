function renderContactForm() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section id="contact-form">
      <h2>📬 Contact Us</h2>
      <input type="text" id="contact-username" placeholder="Your Minecraft Username" />
      <input type="text" id="contact-method" placeholder="Your Discord or Instagram ID" />
      <textarea id="contact-message" placeholder="Enter your message here..."></textarea>
      <button onclick="submitContact()">Send</button>
    </section>
  `;
}

function submitContact() {
  const name = document.getElementById("contact-username").value.trim();
  const method = document.getElementById("contact-method").value.trim();
  const message = document.getElementById("contact-message").value.trim();

  if (!name || !method || !message) {
    alert("⚠️ Please fill in all fields.");
    return;
  }

  alert("✅ Message saved locally. (This can be connected to a webhook later)");
  console.log("Contact submitted:", { name, method, message });
}
