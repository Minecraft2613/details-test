function renderPlugins() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section id="plugin-section">
      <h2>🔌 Server Plugins</h2>
      <input type="text" id="plugin-search" placeholder="Search plugins..." oninput="filterPlugins()" />
      <div id="plugin-list" class="plugin-grid"></div>
    </section>
  `;

  displayPlugins(plugins);
}

function displayPlugins(list) {
  const container = document.getElementById("plugin-list");
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>No plugins found.</p>";
    return;
  }

  list.forEach(plugin => {
    const card = document.createElement("div");
    card.className = "plugin-card";
    card.innerHTML = `
      <h3>${plugin.name}</h3>
      <p>${plugin.desc || "No description available."}</p>
      <a href="${plugin.link}" target="_blank">🔗 Plugin Page</a><br/>
      <strong>🎥 Tutorial:</strong> ${
        plugin.youtube
          ? `<a href="${plugin.youtube}" target="_blank">Watch on YouTube</a>`
          : `<span style="color:gray">Not Available</span>`
      }
    `;
    container.appendChild(card);
  });
}

function filterPlugins() {
  const query = document.getElementById("plugin-search").value.toLowerCase();
  const filtered = plugins.filter(p => p.name.toLowerCase().includes(query));
  displayPlugins(filtered);
}
