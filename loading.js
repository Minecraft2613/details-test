window.addEventListener("DOMContentLoaded", () => {
  const loading = document.getElementById("loading-screen");
  const app = document.getElementById("app");
  setTimeout(() => {
    loading.style.display = "none";
    app.style.display = "block";
  }, 1500);
});