function showLoadingScreen() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section id="loading">
      <h1 class="glow">🌀 Loading Server Panel...</h1>
    </section>
  `;
  setTimeout(() => {
    autoLoginIfAvailable(); // Call login.js function after 2s
  }, 2000);
}
