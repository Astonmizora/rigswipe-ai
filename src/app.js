const TABS = ["AI Vibe Matcher", "BTech Branch Finder", "Rig Roast", "Rig Tinder"];
const PAGE_SIZE = 6;
const USD_TO_INR = 83;

const perfStyles = document.createElement("style");
perfStyles.textContent = `
  /* High-Fidelity Apple cursive write-in animations */
  @keyframes writeStroke {
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes popElasticDot {
    0% { transform: scale(0); opacity: 0; }
    70% { transform: scale(1.3); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }

  @keyframes ambientShift {
    0%, 100% { transform: translate3d(-10%, -10%, 0) scale(1); opacity: 0.15; }
    50% { transform: translate3d(10%, 10%, 0) scale(1.15); opacity: 0.25; }
  }

  @keyframes scaleAndFadeOut {
    0% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(1.05); visibility: hidden; }
  }

  /* Velvet Matte Splash Screen Structure */
  .splash-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #08080a; /* Premium matte carbon black */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 99999;
    overflow: hidden;
  }

  .splash-screen.fade-out {
    animation: scaleAndFadeOut 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    pointer-events: none;
  }

  /* Soft Background Fluid Aura */
  .splash-aura {
    position: absolute;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, transparent 70%);
    top: 20%;
    left: 20%;
    z-index: 1;
    pointer-events: none;
    animation: ambientShift 7s ease-in-out infinite;
  }

  .splash-container {
    text-align: center;
    width: 100%;
    max-width: 460px;
    z-index: 2;
    position: relative;
    transform: translate3d(0, 0, 0);
  }

  /* Cursive SVG Signature Structure */
  .hello-svg {
    width: 320px;
    height: 120px;
    margin-bottom: 2rem;
    overflow: visible;
  }

  .hello-path {
    stroke: #ffffff;
    stroke-width: 4.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
    stroke-dasharray: 120;
    stroke-dashoffset: 120;
    animation: writeStroke 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards;
  }

  .hello-dot, .hello-dot-i, .hello-dot-i2 {
    fill: #a78bfa; /* Warm glowing accent purple dots */
    opacity: 0;
    transform: scale(0);
    transform-origin: center;
    animation: popElasticDot 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  /* Staggered Stroke handwriting timings */
  .p-r { animation-delay: 0.1s; animation-duration: 0.35s; }
  .p-i { animation-delay: 0.4s; animation-duration: 0.25s; }
  .p-g { animation-delay: 0.6s; animation-duration: 0.45s; }
  .p-s { animation-delay: 1.0s; animation-duration: 0.35s; }
  .p-w { animation-delay: 1.25s; animation-duration: 0.45s; }
  .p-i2 { animation-delay: 1.6s; animation-duration: 0.25s; }
  .p-p { animation-delay: 1.75s; animation-duration: 0.45s; }
  .p-e { animation-delay: 2.1s; animation-duration: 0.35s; }
  
  .hello-dot { animation-delay: 2.35s; }
  .hello-dot-i { animation-delay: 2.35s; }
  .hello-dot-i2 { animation-delay: 2.35s; }

  /* iOS Smooth white timeline progress track */
  .splash-progress-track {
    width: 150px;
    height: 2.5px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 99px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
  }

  .splash-progress-fill {
    height: 100%;
    width: 0%;
    background: #ffffff;
    border-radius: 99px;
    transition: width 2.4s linear;
  }

  /* Static Scroll containment */
  .grid {
    contain: layout paint;
  }
`;
document.head.appendChild(perfStyles);

const branchProfiles = {
  CSE: {
    terms: ["Coding", "Data Science", "AI Workloads", "Software Engineering", "Machine Learning", "Linux"],
    vibes: ["fast", "keyboard", "battery", "portable", "ai", "linux"],
    power: 74,
  },
  ECE: {
    terms: ["Engineering", "Coding", "CAD", "School/Work"],
    vibes: ["balanced", "portable", "reliable", "battery"],
    power: 70,
  },
  Mechanical: {
    terms: ["CAD", "Engineering", "3D Design", "Workstation"],
    vibes: ["workstation", "powerful", "certified", "cooling"],
    power: 84,
  },
  Design: {
    terms: ["Design", "Digital Art", "Creator", "Photo Editing", "Video Editing", "Animation"],
    vibes: ["oled", "color", "creator", "premium"],
    power: 78,
  },
  Business: {
    terms: ["Business", "School/Work", "Travel", "Writing"],
    vibes: ["battery", "lightweight", "secure", "keyboard", "quiet"],
    power: 58,
  },
  IT: {
    terms: ["Coding", "Software Engineering", "Cybersecurity", "Business", "Data Analysis"],
    vibes: ["fast", "keyboard", "battery", "secure", "portable"],
    power: 72,
  },
  AI: {
    terms: ["AI Workloads", "Machine Learning", "Data Science", "Coding", "Engineering"],
    vibes: ["ai", "fast", "powerful", "efficient", "premium"],
    power: 82,
  },
  DataScience: {
    terms: ["Data Science", "Machine Learning", "Coding", "Data Analysis", "AI Workloads"],
    vibes: ["fast", "battery", "keyboard", "efficient"],
    power: 78,
  },
  Cybersecurity: {
    terms: ["Cybersecurity", "Coding", "Linux", "Business", "School/Work"],
    vibes: ["secure", "linux", "keyboard", "battery", "durable"],
    power: 70,
  },
  Electrical: {
    terms: ["Engineering", "CAD", "Coding", "School/Work", "Data Analysis"],
    vibes: ["balanced", "reliable", "durable", "portable"],
    power: 72,
  },
  Civil: {
    terms: ["CAD", "Engineering", "School/Work", "3D Design", "Business"],
    vibes: ["durable", "large-screen", "value", "reliable"],
    power: 76,
  },
  Chemical: {
    terms: ["Engineering", "Data Analysis", "School/Work", "Coding", "Business"],
    vibes: ["balanced", "battery", "reliable", "portable"],
    power: 68,
  },
  Biotechnology: {
    terms: ["Data Analysis", "School/Work", "Coding", "Research", "Business"],
    vibes: ["battery", "portable", "efficient", "quiet"],
    power: 66,
  },
  Architecture: {
    terms: ["CAD", "3D Design", "Design", "Creator", "Digital Art"],
    vibes: ["color", "oled", "workstation", "large-screen", "creator"],
    power: 86,
  },
};

const purposeProfiles = {
  "Coding + College": ["Coding", "College", "School/Work", "keyboard", "battery"],
  "Gaming After Class": ["Gaming", "Streaming", "Esports", "high-refresh", "rgb"],
  "Creator Projects": ["Creator", "Video Editing", "Design", "oled", "color"],
  "Light Carry Daily": ["Travel", "Business", "Writing", "lightweight", "battery"],
  "Budget Survival": ["Budget", "School/Work", "Web Browsing", "cheap", "value"],
};

const branchLabels = {
  CSE: "CSE - Computer Science",
  ECE: "ECE - Electronics",
  Mechanical: "Mechanical Engineering",
  Design: "Design / UX / Creative Tech",
  Business: "Business / Management",
  IT: "IT - Information Technology",
  AI: "AI and Machine Learning",
  DataScience: "Data Science",
  Cybersecurity: "Cybersecurity",
  Electrical: "Electrical Engineering",
  Civil: "Civil Engineering",
  Chemical: "Chemical Engineering",
  Biotechnology: "Biotechnology",
  Architecture: "Architecture / Planning",
};

const state = {
  laptops: [],
  activeTab: TABS[0],
  query: "coding, lightweight, battery, 16GB",
  budget: 130000,
  page: 1,
  branch: "CSE",
  purpose: "Coding + College",
  roastInput: "8GB RAM, i3, 256GB SSD, cracked hinge, sounds like a jet",
  roast: "",
  matchIndex: 0,
  savedMatches: [],
  drawerOpen: true,
  showSplash: true,
};

const root = document.getElementById("root");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function formatPrice(value) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value * USD_TO_INR);
}

function formatBudget(value) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

function budgetInUsd() {
  return state.budget / USD_TO_INR;
}

function normalize(text) {
  return String(text || "").toLowerCase();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function textBlob(laptop) {
  return [
    laptop.name,
    laptop.brand,
    laptop.cpu,
    laptop.ram,
    laptop.storage,
    laptop.graphics,
    laptop.screen,
    ...laptop.idealFor,
    ...laptop.vibeKeywords,
  ].join(" ");
}

function scoreLaptop(laptop, query, priceLimit, weightedTerms = []) {
  const blob = normalize(textBlob(laptop));
  const terms = normalize(query).split(/[^a-z0-9+]+/).filter(Boolean);
  let score = 0;

  terms.forEach((term) => {
    if (blob.includes(term)) score += 12;
  });

  weightedTerms.forEach((term) => {
    if (blob.includes(normalize(term))) score += 18;
  });

  const priceFit = Math.max(0, priceLimit - laptop.price);
  score += (priceFit / Math.max(priceLimit, 1)) * 18;
  score += laptop.scores.power * 0.14 + laptop.scores.mobility * 0.11 + laptop.scores.efficiency * 0.12;

  if (laptop.price > priceLimit) score -= Math.min(45, (laptop.price - priceLimit) / 70);
  return score;
}

function getMatches() {
  const currentBudgetUsd = budgetInUsd();
  
  if (state.activeTab === "BTech Branch Finder") {
    const profile = branchProfiles[state.branch];
    const terms = [...profile.terms, ...profile.vibes, ...purposeProfiles[state.purpose]];
    const maxBudgetFilter = currentBudgetUsd + 700;
    
    return state.laptops
      .filter((laptop) => laptop.price <= maxBudgetFilter)
      .map((laptop) => ({
        laptop,
        rank: scoreLaptop(laptop, `${state.branch} ${state.purpose}`, currentBudgetUsd, terms) + Math.max(0, laptop.scores.power - profile.power) * 0.2,
      }))
      .filter(({ rank }) => rank > 28)
      .sort((a, b) => b.rank - a.rank)
      .map(({ laptop }) => laptop);
  }

  return state.laptops
    .filter((laptop) => laptop.price <= currentBudgetUsd + 500)
    .map((laptop) => ({ laptop, rank: scoreLaptop(laptop, state.query, currentBudgetUsd) }))
    .filter(({ laptop, rank }) => rank > 20 || laptop.price <= currentBudgetUsd)
    .sort((a, b) => b.rank - a.rank)
    .map(({ laptop }) => laptop);
}

function setState(patch) {
  const oldTab = state.activeTab;
  Object.assign(state, patch);

  if (state.showSplash) {
    render();
    return;
  }

  if (patch.activeTab !== undefined && patch.activeTab !== oldTab) {
    render();
  } else {
    if (patch.branch !== undefined || patch.purpose !== undefined) {
      const panel = document.querySelector(".panel");
      if (panel) panel.innerHTML = renderPanel();
    }
    updateResultsOnly();
  }
}

function updateResultsOnly() {
  if (state.activeTab === "Rig Tinder") {
    render();
    return;
  }

  const matches = getMatches();
  const totalPages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  if (state.page > totalPages) state.page = totalPages;
  const visible = matches.slice((state.page - 1) * PAGE_SIZE, state.page * PAGE_SIZE);

  const resultsHead = document.querySelector(".results-head");
  if (resultsHead) {
    resultsHead.innerHTML = `
      <div class="results-row">
        <div>
          <p class="eyebrow">${escapeHtml(state.activeTab)}</p>
          <h2>Matched Shortlist</h2>
        </div>
        <p class="result-meta">${matches.length} matches - page ${state.page} of ${totalPages}</p>
      </div>
    `;
  }

  const grid = document.querySelector(".grid");
  if (grid) {
    grid.innerHTML = visible.map(renderCard).join("");
  }

  const pagination = document.querySelector(".pagination");
  if (pagination) {
    pagination.innerHTML = `
      <button class="page-btn" data-page="prev" ${state.page === 1 ? "disabled" : ""}>Prev</button>
      <button class="page-btn" disabled>${state.page} / ${totalPages}</button>
      <button class="page-btn" data-page="next" ${state.page === totalPages ? "disabled" : ""}>Next</button>
    `;
  }
}

function renderNav() {
  return `
    <nav class="glass nav">
      <div class="brand">
        <div class="brand-mark">RS</div>
        <div>
          <h1>RigSwipe</h1>
          <div class="accent-line"></div>
        </div>
      </div>
      <div class="tabs">
        ${TABS.map((tab) => `<button class="tab ${state.activeTab === tab ? "active" : ""}" data-tab="${escapeHtml(tab)}">${escapeHtml(tab)}</button>`).join("")}
      </div>
    </nav>
  `;
}

function renderSplash() {
  return `
    <section class="splash-screen" id="splash-screen">
      <div class="splash-aura"></div>
      <div class="splash-container">
        <!-- iOS Signature Cursive "hello" Style write-in path -->
        <svg class="hello-svg" viewBox="0 0 450 160">
          <!-- r -->
          <path class="hello-path p-r" d="M 50,110 C 50,110 52,65 65,65 C 75,65 80,72 85,75 C 90,78 95,110 95,110" />
          <!-- i -->
          <path class="hello-path p-i" d="M 95,110 C 105,95 110,80 115,80 C 120,80 120,110 120,110" />
          <!-- g -->
          <path class="hello-path p-g" d="M 120,110 C 120,95 135,95 140,95 C 145,95 145,110 140,110 C 135,110 135,95 135,95 M 140,110 C 140,125 130,145 115,145 C 105,145 105,135 115,125 C 125,115 145,110 155,110" />
          <!-- s -->
          <path class="hello-path p-s" d="M 155,110 C 165,95 175,70 180,70 C 185,70 170,110 185,110" />
          <!-- w -->
          <path class="hello-path p-w" d="M 185,110 C 190,90 195,90 200,110 C 205,110 210,90 215,90 C 220,90 220,110 225,110" />
          <!-- i -->
          <path class="hello-path p-i2" d="M 225,110 C 230,95 235,80 240,80 C 245,80 245,110 245,110" />
          <!-- p -->
          <path class="hello-path p-p" d="M 245,110 C 250,90 255,80 260,80 C 265,80 255,140 255,140 M 255,110 C 265,95 275,95 275,110" />
          <!-- e -->
          <path class="hello-path p-e" d="M 275,110 C 285,100 290,90 295,90 C 300,90 285,110 310,110 C 330,110 350,95 365,95" />
          <!-- Elastic Accent period -->
          <circle class="hello-dot" cx="375" cy="110" r="4.5" />
          <!-- Dots for letter "i" and "i2" -->
          <circle class="hello-dot-i" cx="115" cy="65" r="3" />
          <circle class="hello-dot-i2" cx="240" cy="65" r="3" />
        </svg>
        <div class="splash-progress-track">
          <div class="splash-progress-fill" id="splash-progress"></div>
        </div>
      </div>
    </section>
  `;
}

function render() {
  if (state.showSplash) {
    root.innerHTML = renderSplash();
    
    // Fill progress bar relative to pen write timings
    window.setTimeout(() => {
      const progress = document.getElementById("splash-progress");
      if (progress) progress.style.width = "100%";
    }, 100);

    // Zoom-fade transition out of curtain once signature completes
    window.setTimeout(() => {
      const splash = document.getElementById("splash-screen");
      if (splash) {
        splash.classList.add("fade-out");
        window.setTimeout(() => {
          state.showSplash = false;
          render();
        }, 750);
      }
    }, 2800); 
    return;
  }

  if (state.activeTab === "Rig Tinder") {
    renderMatchMode();
    return;
  }

  const matches = getMatches();
  const totalPages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  if (state.page > totalPages) state.page = totalPages;
  const visible = matches.slice((state.page - 1) * PAGE_SIZE, state.page * PAGE_SIZE);

  root.innerHTML = `
    <main class="app">
      ${renderNav()}

      <section class="layout">
        <aside class="glass panel">${renderPanel()}</aside>
        <section class="results">
          <header class="glass results-head">
            <div class="results-row">
              <div>
                <p class="eyebrow">${escapeHtml(state.activeTab)}</p>
                <h2>Matched Shortlist</h2>
              </div>
              <p class="result-meta">${matches.length} matches - page ${state.page} of ${totalPages}</p>
            </div>
          </header>
          <div class="grid">${visible.map(renderCard).join("")}</div>
          <div class="pagination">
            <button class="page-btn" data-page="prev" ${state.page === 1 ? "disabled" : ""}>Prev</button>
            <button class="page-btn" disabled>${state.page} / ${totalPages}</button>
            <button class="page-btn" data-page="next" ${state.page === totalPages ? "disabled" : ""}>Next</button>
          </div>
        </section>
      </section>
    </main>
  `;
}

function renderPanel() {
  if (state.activeTab === "BTech Branch Finder") return renderBranchPanel();
  if (state.activeTab === "Rig Roast") return renderRoastPanel();
  return renderMatcherPanel();
}

function renderMatchMode() {
  const laptop = getCurrentSwipeLaptop();
  const matchStage = document.querySelector(".match-stage");

  if (matchStage) {
    document.querySelectorAll(".tabs .tab").forEach(button => {
      button.classList.toggle("active", button.dataset.tab === state.activeTab);
    });

    const swipeZone = document.querySelector(".swipe-zone");
    if (swipeZone) {
      swipeZone.innerHTML = `
        ${laptop ? renderSwipeCard(laptop) : renderSwipeFinished()}
        <div class="swipe-actions">
          <button class="swipe-btn pass-btn" data-swipe="pass" aria-label="Pass this laptop">✕</button>
          <button class="swipe-btn like-btn" data-swipe="match" aria-label="Match this laptop">♥</button>
        </div>
      `;
    }

    const shortlistDrawer = document.querySelector(".shortlist-drawer");
    if (shortlistDrawer) {
      const count = state.savedMatches.length;
      shortlistDrawer.className = `glass shortlist-drawer ${state.drawerOpen ? "open" : "closed"}`;
      shortlistDrawer.innerHTML = `
        <button class="drawer-toggle" id="drawer-toggle">Your Shortlist (${count} Laptops liked)</button>
        ${state.drawerOpen ? `
          <div class="shortlist-body">${
            count
              ? state.savedMatches
                  .map((item) => `
                    <article class="mini-card">
                      <div>
                        <p class="eyebrow">${escapeHtml(item.brand)}</p>
                        <h4>${escapeHtml(item.name)}</h4>
                        <span>${formatPrice(item.price)}</span>
                      </div>
                      <button class="mini-detail" data-detail-id="${item.id}">View Full Details</button>
                    </article>
                  `).join("")
              : `<p class="empty-shortlist">Your liked laptops will appear here.</p>`
          }</div>` : ""}
      `;
    }
  } else {
    root.innerHTML = `
      <main class="app">
        ${renderNav()}
        <section class="match-stage">
          <div class="match-copy">
            <p class="eyebrow">Laptop Tinder</p>
            <h2>Rig Tinder</h2>
            <p>Swipe through the catalog one laptop at a time. Match what feels right, pass what does not.</p>
          </div>
          <div class="match-workspace">
            <div class="swipe-zone">
              ${laptop ? renderSwipeCard(laptop) : renderSwipeFinished()}
              <div class="swipe-actions">
                <button class="swipe-btn pass-btn" data-swipe="pass" aria-label="Pass this laptop">✕</button>
                <button class="swipe-btn like-btn" data-swipe="match" aria-label="Match this laptop">♥</button>
              </div>
            </div>
            ${renderShortlistDrawer()}
          </div>
        </section>
      </main>
    `;
  }
  attachDragSwipe();
}

function getCurrentSwipeLaptop() {
  if (!state.laptops.length) return null;
  return state.laptops[state.matchIndex % state.laptops.length];
}

function primaryHighlight(laptop) {
  const dedicatedGraphics = laptop.graphics.includes("RTX") || laptop.graphics.includes("Radeon RX") || laptop.graphics.includes("Apple");
  const heroSpec = dedicatedGraphics ? laptop.graphics : laptop.cpu;
  return `${laptop.ram} - ${laptop.storage} - ${heroSpec}`;
}

function renderSwipeCard(laptop) {
  return `
    <article class="glass tinder-card" id="tinder-card" data-card-id="${laptop.id}">
      <div class="photo-placeholder">
        <div class="laptop-shell">
          <div class="laptop-screen"></div>
          <div class="laptop-base"></div>
        </div>
        <span>${escapeHtml(laptop.brand)}</span>
      </div>
      <div class="tinder-info">
        <div class="card-top">
          <div>
            <p class="eyebrow">${escapeHtml(laptop.brand)}</p>
            <h3>${escapeHtml(laptop.name)}</h3>
          </div>
          <div class="price">${formatPrice(laptop.price)}</div>
        </div>
        <p class="highlight">${escapeHtml(primaryHighlight(laptop))}</p>
        <div class="chips">${laptop.idealFor.slice(0, 3).map((item) => `<span class="chip">${escapeHtml(item)}</span>`).join("")}</div>
      </div>
    </article>
  `;
}

function renderSwipeFinished() {
  return `
    <div class="glass tinder-card empty-card">
      <div>
        <p class="eyebrow">Deck unavailable</p>
        <h3>No laptops loaded</h3>
        <p class="hint">Refresh after the local server is running.</p>
      </div>
    </div>
  `;
}

function renderShortlistDrawer() {
  const count = state.savedMatches.length;
  const body = state.drawerOpen
    ? `<div class="shortlist-body">${
        count
          ? state.savedMatches
              .map(
                (laptop) => `
                  <article class="mini-card">
                    <div>
                      <p class="eyebrow">${escapeHtml(laptop.brand)}</p>
                      <h4>${escapeHtml(laptop.name)}</h4>
                      <span>${formatPrice(laptop.price)}</span>
                    </div>
                    <button class="mini-detail" data-detail-id="${laptop.id}">View Full Details</button>
                  </article>
                `
              )
              .join("")
          : `<p class="empty-shortlist">Your liked laptops will appear here.</p>`
      }</div>`
    : "";

  return `
    <aside class="glass shortlist-drawer ${state.drawerOpen ? "open" : "closed"}">
      <button class="drawer-toggle" id="drawer-toggle">Your Shortlist (${count} Laptops liked)</button>
      ${body}
    </aside>
  `;
}

function renderMatcherPanel() {
  return `
    <form class="form" id="matcher-form">
      ${panelTitle("AI Vibe Matcher", "Tell it the vibe, budget, workload, or deal-breakers.")}
      <label>
        Request
        <textarea id="query" rows="7">${escapeHtml(state.query)}</textarea>
      </label>
      ${budgetControl()}
      <button class="primary-btn">Neural Scan</button>
    </form>
  `;
}

function renderBranchPanel() {
  const profile = branchProfiles[state.branch];
  return `
    <div class="form">
      ${panelTitle("BTech Branch Finder", "Tune recommendations around branch workload and campus reality.")}
      <label>
        Branch
        <select id="branch">${Object.keys(branchProfiles).map((item) => `<option value="${item}" ${item === state.branch ? "selected" : ""}>${branchLabels[item]}</option>`).join("")}</select>
      </label>
      <label>
        Purpose
        <select id="purpose">${Object.keys(purposeProfiles).map((item) => `<option ${item === state.purpose ? "selected" : ""}>${item}</option>`).join("")}</select>
      </label>
      ${budgetControl()}
      <div class="note">Best matches prioritize ${profile.terms.slice(0, 3).join(", ")} and the ${state.purpose.toLowerCase()} use case.</div>
    </div>
  `;
}

function renderRoastPanel() {
  return `
    <form class="form" id="roast-form">
      ${panelTitle("Rig Roast 🔥", "Drop the specs. The roast is rude, the upgrade advice is useful.")}
      <textarea id="roast-input" rows="7">${escapeHtml(state.roastInput)}</textarea>
      <button class="primary-btn">Roast It</button>
      ${state.roast ? `<div class="roast-output">${escapeHtml(state.roast)}</div>` : ""}
    </form>
  `;
}

function panelTitle(title, detail) {
  return `
    <div class="panel-title">
      <h2>${escapeHtml(title)}</h2>
      <p>${escapeHtml(detail)}</p>
    </div>
  `;
}

function budgetControl() {
  return `
    <label>
      <span class="budget-row"><span>Budget</span><span class="budget-value" id="budget-val-label">${formatBudget(state.budget)}</span></span>
      <input id="budget" type="range" min="25000" max="375000" step="5000" value="${state.budget}" />
    </label>
  `;
}

function renderCard(laptop) {
  return `
    <article class="glass card">
      <div class="card-top">
        <div>
          <p class="eyebrow">${escapeHtml(laptop.brand)}</p>
          <h3>${escapeHtml(laptop.name)}</h3>
        </div>
        <div class="price">${formatPrice(laptop.price)}</div>
      </div>
      <div class="specs">
        ${spec("CPU", laptop.cpu)}
        ${spec("Memory", `${laptop.ram} - ${laptop.storage}`)}
        ${spec("GPU", laptop.graphics)}
        ${spec("Display", laptop.screen)}
      </div>
      <div class="chips">${laptop.idealFor.slice(0, 3).map((item) => `<span class="chip">${escapeHtml(item)}</span>`).join("")}</div>
      <div class="scores">
        ${scoreBar("Pure Power", laptop.scores.power, "power")}
        ${scoreBar("Mobility", laptop.scores.mobility, "mobility")}
        ${scoreBar("Efficiency", laptop.scores.efficiency, "efficiency")}
      </div>
    </article>
  `;
}

function spec(label, value) {
  return `<div class="spec"><b>${escapeHtml(label)}:</b> ${escapeHtml(value)}</div>`;
}

function scoreBar(label, value, type) {
  return `
    <div>
      <div class="score-label"><span>${label}</span><span>${value}</span></div>
      <div class="track"><div class="fill ${type}" style="width:${value}%"></div></div>
    </div>
  `;
}

function attachDragSwipe() {
  const card = document.getElementById("tinder-card");
  if (!card) return;

  let startX = 0;
  let currentX = 0;
  let dragging = false;
  let rafId = null;

  card.addEventListener("pointerdown", (event) => {
    dragging = true;
    startX = event.clientX;
    currentX = 0;
    card.setPointerCapture(event.pointerId);
    card.classList.add("dragging");
  });

  card.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    currentX = event.clientX - startX;
    
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      if (!dragging) return;
      const rotate = Math.max(-10, Math.min(10, currentX / 18));
      card.style.transform = `translate3d(${currentX}px, 0, 0) rotate(${rotate}deg)`;
    });
  });

  card.addEventListener("pointerup", () => finishDrag());
  card.addEventListener("pointercancel", () => finishDrag());

  function finishDrag() {
    if (!dragging) return;
    dragging = false;
    if (rafId) cancelAnimationFrame(rafId);
    card.classList.remove("dragging");

    if (currentX > 110) {
      swipeCurrentLaptop("match");
      return;
    }

    if (currentX < -110) {
      swipeCurrentLaptop("pass");
      return;
    }

    card.style.transform = "";
  }
}

function swipeCurrentLaptop(action) {
  const laptop = getCurrentSwipeLaptop();
  const card = document.getElementById("tinder-card");
  if (!laptop || !card || card.classList.contains("exiting")) return;

  if (action === "match" && !state.savedMatches.some((item) => item.id === laptop.id)) {
    state.savedMatches.push(laptop);
  }

  card.classList.add("exiting", action === "match" ? "exit-right" : "exit-left");

  window.setTimeout(() => {
    state.matchIndex += 1;
    render();
  }, 420);
}

function showLaptopDetails(laptop) {
  const overlay = document.createElement("div");
  overlay.className = "detail-overlay";
  overlay.innerHTML = `
    <article class="glass detail-modal">
      <button class="detail-close" aria-label="Close details">×</button>
      <p class="eyebrow">${escapeHtml(laptop.brand)}</p>
      <h2>${escapeHtml(laptop.name)}</h2>
      <div class="price detail-price">${formatPrice(laptop.price)}</div>
      <div class="specs">
        ${spec("CPU", laptop.cpu)}
        ${spec("Memory", `${laptop.ram} - ${laptop.storage}`)}
        ${spec("GPU", laptop.graphics)}
        ${spec("Display", laptop.screen)}
      </div>
      <div class="chips">${laptop.idealFor.map((item) => `<span class="chip">${escapeHtml(item)}</span>`).join("")}</div>
      <div class="scores">
        ${scoreBar("Pure Power", laptop.scores.power, "power")}
        ${scoreBar("Mobility", laptop.scores.mobility, "mobility")}
        ${scoreBar("Efficiency", laptop.scores.efficiency, "efficiency")}
      </div>
    </article>
  `;

  document.body.appendChild(overlay);
  overlay.querySelector(".detail-close").addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) overlay.remove();
  });
}

function showScan() {
  const overlay = document.createElement("div");
  overlay.className = "scan-overlay";
  overlay.innerHTML = `
    <div class="scan-box">
      <div class="scan-grid"></div>
      <div class="scan-line"></div>
      <div class="scan-copy">
        <div>
          <p class="eyebrow">Neural scan running</p>
          <h2>Matching Your Vibe</h2>
          <p class="hint">Parsing budget, workload, portability, and chaos tolerance.</p>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  window.setTimeout(() => overlay.remove(), 1500);
}

function buildRoast(input) {
  const text = normalize(input);
  const burns = [];

  if (text.includes("4gb") || text.includes("8gb")) burns.push("That RAM is not multitasking, it is asking for emotional support.");
  if (text.includes("hdd")) burns.push("A hard drive in this decade is less storage and more archaeological exhibit.");
  if (text.includes("i3") || text.includes("celeron") || text.includes("pentium")) burns.push("That CPU opens Chrome like it is negotiating a peace treaty.");
  if (text.includes("heat") || text.includes("jet") || text.includes("fan")) burns.push("The fan curve sounds prepared for takeoff, but the performance stayed at the gate.");
  if (text.includes("crack") || text.includes("hinge")) burns.push("The hinge has seen things no productivity device should have to see.");
  if (!burns.length) burns.push("Honestly, this rig may survive. It still deserves a gentle upgrade and a less dramatic desktop wallpaper.");

  return `${burns.join(" ")} Upgrade advice: ${recommendUpgrade(text)}.`;
}

function recommendUpgrade(text) {
  if (text.includes("gaming") || text.includes("fps")) return "RTX 4060 or better, 16GB RAM, and a 144Hz+ screen";
  if (text.includes("code") || text.includes("coding")) return "16GB minimum, 512GB SSD, strong keyboard, and efficient CPU";
  if (text.includes("design") || text.includes("edit")) return "OLED or color-accurate display, 32GB RAM, and dedicated graphics";
  return "16GB RAM, 512GB SSD, modern CPU, and battery life that does not cause trust issues";
}

let debounceTimer;
function debounceRender() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    setState({ page: 1 });
  }, 200);
}

function initGlobalEvents() {
  document.addEventListener("click", (event) => {
    const tabBtn = event.target.closest("[data-tab]");
    if (tabBtn) {
      setState({ activeTab: tabBtn.dataset.tab, page: 1 });
      return;
    }

    const pageBtn = event.target.closest("[data-page]");
    if (pageBtn) {
      const matches = getMatches();
      const totalPages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
      const nextPage = pageBtn.dataset.page === "next" 
        ? Math.min(totalPages, state.page + 1) 
        : Math.max(1, state.page - 1);
      setState({ page: nextPage });
      return;
    }

    const swipeBtn = event.target.closest("[data-swipe]");
    if (swipeBtn) {
      swipeCurrentLaptop(swipeBtn.dataset.swipe);
      return;
    }

    const drawerToggle = event.target.closest("#drawer-toggle");
    if (drawerToggle) {
      setState({ drawerOpen: !state.drawerOpen });
      return;
    }

    const detailBtn = event.target.closest("[data-detail-id]");
    if (detailBtn) {
      const laptop = state.laptops.find((item) => item.id === Number(detailBtn.dataset.detailId));
      if (laptop) showLaptopDetails(laptop);
      return;
    }
  });

  document.addEventListener("input", (event) => {
    const target = event.target;
    if (target.id === "budget") {
      state.budget = Number(target.value);
      const labels = document.querySelectorAll(".budget-value");
      labels.forEach(el => el.textContent = formatBudget(state.budget));
    } else if (target.id === "query") {
      state.query = target.value;
      debounceRender();
    } else if (target.id === "roast-input") {
      state.roastInput = target.value;
    }
  });

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (target.id === "budget") {
      setState({ page: 1 });
    } else if (target.id === "branch") {
      setState({ branch: target.value, page: 1 });
    } else if (target.id === "purpose") {
      setState({ purpose: target.value, page: 1 });
    }
  });

  document.addEventListener("submit", (event) => {
    const target = event.target;
    if (target.id === "matcher-form") {
      event.preventDefault();
      const queryEl = document.getElementById("query");
      if (queryEl) state.query = queryEl.value;
      render();
      showScan();
    } else if (target.id === "roast-form") {
      event.preventDefault();
      const inputEl = document.getElementById("roast-input");
      if (inputEl) state.roastInput = inputEl.value;
      setState({ roast: buildRoast(state.roastInput) });
    }
  });
}

if (!window.__eventsInitialized) {
  initGlobalEvents();
  window.__eventsInitialized = true;
}

fetch("./laptopsData.json")
  .then((response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then((laptops) => {
    shuffle(laptops); // Randomize current deck on startup
    state.laptops = laptops;
    render();
  })
  .catch((error) => {
    const renderError = () => {
      root.innerHTML = `
        <main class="app">
          <div class="error">
            <h1>RigSwipe could not load the catalog.</h1>
            <p>Please launch your local host server or verify Vercel configuration. Error detail: ${escapeHtml(error.message)}</p>
          </div>
        </main>
      `;
    };

    if (state.showSplash) {
      window.setTimeout(renderError, 2800);
    } else {
      renderError();
    }
  });
  