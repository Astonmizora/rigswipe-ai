const TABS = ["AI Vibe Matcher", "Engineering", "Rig Roast", "Match Mode"];
const PAGE_SIZE = 6;
const USD_TO_INR = 83;

const perfStyles = document.createElement("style");
perfStyles.textContent = `
  /* Premium Apple/iOS Motion Physics */
  @keyframes logoReveal {
    0% { opacity: 0; transform: scale(0.95) translate3d(0, 8px, 0); filter: blur(12px); }
    100% { opacity: 1; transform: scale(1) translate3d(0, 0, 0); filter: blur(0px); }
  }

  @keyframes taglineReveal {
    0% { opacity: 0; transform: translate3d(0, 8px, 0); }
    100% { opacity: 0.6; transform: translate3d(0, 0, 0); }
  }

  @keyframes fadeOutSplash {
    0% { opacity: 1; filter: blur(0px); }
    100% { opacity: 0; filter: blur(8px); visibility: hidden; }
  }

  @keyframes scanningLaser {
    0% { top: -5%; opacity: 0; }
    5% { opacity: 1; }
    95% { opacity: 1; }
    100% { top: 105%; opacity: 0; }
  }

  /* Minimalist Splash */
  .splash-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #030305;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 99999;
    overflow: hidden;
  }

  .splash-screen.fade-out {
    animation: fadeOutSplash 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    pointer-events: none;
  }

  .splash-container {
    text-align: center;
    position: relative;
    z-index: 2;
    pointer-events: none;
  }

  .splash-logo-text {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: 3.5rem;
    letter-spacing: 0.05em;
    color: #ffffff;
    animation: logoReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
    text-transform: uppercase;
  }

  .splash-sub-text {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    color: #a78bfa;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    margin-top: 0.5rem;
    animation: taglineReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
    opacity: 0;
  }

  /* Premium Elevation Physics */
  .card, .tinder-card {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }

  .card:hover {
    transform: translate3d(0, -6px, 0) !important;
    border-color: rgba(139, 92, 246, 0.25) !important;
    box-shadow: 0 12px 30px rgba(139, 92, 246, 0.06), 0 4px 12px rgba(0, 0, 0, 0.5) !important;
  }

  /* Tab Indicator Organic Fluidity */
  .tab {
    transition: color 0.25s ease, background-color 0.25s ease !important;
  }

  .tab:active, .primary-btn:active {
    transform: scale(0.97) translate3d(0, 0, 0) !important;
  }

  /* Holographic Scan Overlay Laser */
  .scan-horizon-laser {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, transparent, #a78bfa, transparent);
    animation: scanningLaser 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  /* GPU Rendering optimizers */
  .card, .tinder-card, .shortlist-drawer, .panel, .results-head, .nav {
    transform: translate3d(0, 0, 0);
    will-change: transform, opacity;
    backface-visibility: hidden;
    perspective: 1000px;
  }

  /* Cybernetic Roast terminal entry style */
  .roast-output {
    margin-top: 1.5rem;
    padding: 1.2rem;
    background: rgba(239, 68, 68, 0.04) !important;
    border: 1px dashed rgba(239, 68, 68, 0.25) !important;
    border-radius: 12px;
    color: #fca5a5 !important;
    font-size: 0.95rem;
    line-height: 1.6;
    animation: logoReveal 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    box-shadow: 0 4px 20px rgba(239, 68, 68, 0.03);
  }

  /* Modular Interface Extensions */
  .tinder-card-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    border-radius: inherit;
  }
  
  .tinder-card.flipped .tinder-card-inner {
    transform: rotateY(180deg);
  }

  .tinder-card-front, .tinder-card-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: inherit;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
  }

  .tinder-card-back {
    transform: rotateY(180deg);
    background: #09090b !important;
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    padding: 1.5rem;
  }

  .xray-header {
    font-family: monospace;
    font-size: 0.8rem;
    color: #a78bfa;
    margin-bottom: 0.5rem;
    letter-spacing: 0.05em;
  }

  .upgrade-path-map {
    margin: 0.75rem 0;
    padding: 0.85rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px dashed rgba(255, 255, 255, 0.12);
    border-radius: 8px;
  }

  .upgrade-badge-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .upgrade-status-pill {
    font-size: 0.7rem;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .upgrade-status-pill.pass-check {
    background: rgba(34, 197, 94, 0.1);
    color: #4ade80;
    border-color: rgba(34, 197, 94, 0.2);
  }

  .upgrade-status-pill.fail-check {
    background: rgba(239, 68, 68, 0.1);
    color: #fca5a5;
    border-color: rgba(239, 68, 68, 0.2);
  }

  .price-matrix-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.25rem;
  }

  .cost-toggle-switch {
    display: flex;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    padding: 2px;
    cursor: pointer;
  }

  .cost-toggle-opt {
    font-size: 0.65rem;
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
    color: #71717a;
    transition: all 0.2s ease;
    font-weight: 600;
  }

  .cost-toggle-opt.selected {
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
  }

  .vibe-chip-group {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.35rem;
    margin-bottom: 0.85rem;
    flex-wrap: wrap;
  }

  .vibe-toggle-chip {
    font-size: 0.75rem;
    padding: 0.4rem 0.75rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #a1a1aa;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .vibe-toggle-chip:hover {
    border-color: rgba(255, 255, 255, 0.15);
    color: #ffffff;
  }

  .vibe-toggle-chip.active {
    background: rgba(167, 139, 250, 0.12);
    border-color: #a78bfa;
    color: #c084fc;
  }

  /* =========================================================
     NEW MODIFICATIONS: DYNAMIC COMPATIBILITY THEMING
     ========================================================= */
  .tinder-card.gta6-compatible {
    border-color: #ff007f !important;
    box-shadow: 0 8px 24px rgba(255, 0, 127, 0.12) !important;
  }
  .tinder-card.gta6-compatible .eyebrow {
    color: #ff007f !important;
  }
  .tinder-card.gta6-compatible .photo-placeholder {
    background: linear-gradient(135deg, rgba(255, 0, 127, 0.1), rgba(0, 240, 255, 0.1)) !important;
    border-color: rgba(255, 0, 127, 0.2) !important;
  }
  .tinder-card.gta6-compatible .photo-placeholder span {
    color: #00f0ff !important;
    text-shadow: 0 0 8px rgba(0, 240, 255, 0.4);
  }

  .tinder-card.extreme-power {
    border-color: #dc2626 !important;
    box-shadow: 0 8px 30px rgba(220, 38, 38, 0.2) !important;
  }
  .tinder-card.extreme-power .eyebrow {
    color: #ef4444 !important;
  }
  .tinder-card.extreme-power .photo-placeholder {
    background: linear-gradient(135deg, rgba(220, 38, 38, 0.15), rgba(0, 0, 0, 0.4)) !important;
    border-color: rgba(220, 38, 38, 0.3) !important;
  }
  .tinder-card.extreme-power .photo-placeholder span {
    color: #fca5a5 !important;
  }
`;
document.head.appendChild(perfStyles);

// COMPLETE FLAWLESS ENGINEERING BRANCH PROFILE CURRICULUM ARCHITECTURE MAP
const branchProfiles = {
  CSE: {
    software: ["VS Code", "Docker", "Git", "IntelliJ", "Kubernetes"],
    hardwareRequirements: ["16GB+ RAM Mandatory", "Multi-Threaded CPU Focus"],
    terms: ["Coding", "Data Science", "Software Engineering", "Linux", "16GB", "32GB"],
    biasType: "computational"
  },
  AI: {
    software: ["TensorFlow", "PyTorch", "Jupyter Labs", "CUDA Toolkit", "Python"],
    hardwareRequirements: ["Nvidia Tensor Cores Highly Recommended", "High VRAM Baseline"],
    terms: ["AI Workloads", "Machine Learning", "Data Science", "Nvidia", "RTX", "CUDA"],
    biasType: "cuda-heavy"
  },
  IT: {
    software: ["Wireshark", "VirtualBox", "AWS CLI", "MySQL", "Ubuntu Server"],
    hardwareRequirements: ["High SSD Speed & Core Density Priority"],
    terms: ["Coding", "Software Engineering", "Cybersecurity", "Data Analysis", "16GB"],
    biasType: "computational"
  },
  ECE: {
    software: ["MATLAB", "Xilinx Vivado", "Logisim", "LTSpice", "Keil uVision"],
    hardwareRequirements: ["High Single-Core Clock Speed Priority"],
    terms: ["Engineering", "Coding", "CAD", "Balanced Thermal limits", "MATLAB"],
    biasType: "math-heavy"
  },
  Electrical: {
    software: ["MATLAB", "Simulink", "LabVIEW", "ETAP", "AutoCAD Electrical"],
    hardwareRequirements: ["Sustained Processing Thermal Scaling Required"],
    terms: ["Engineering", "CAD", "Data Analysis", "Reliable Processing"],
    biasType: "math-heavy"
  },
  Mechanical: {
    software: ["SolidWorks", "ANSYS", "AutoCAD 3D", "Fusion 360", "CATIA"],
    hardwareRequirements: ["Dedicated GPU Mandatory", "Avoid Integrated Graphics"],
    terms: ["CAD", "Engineering", "3D Design", "Workstation", "RTX", "Discrete"],
    biasType: "gpu-mandatory"
  },
  Civil: {
    software: ["AutoCAD 2D/3D", "STAAD Pro", "Revit", "ETABS", "ArcGIS"],
    hardwareRequirements: ["High Resolution VRAM Framebuffer Priority"],
    terms: ["CAD", "Engineering", "3D Design", "Large-screen Rendering"],
    biasType: "gpu-mandatory"
  },
  Architecture: {
    software: ["Rhino 3D", "V-Ray", "Lumion", "SketchUp", "Adobe Creative Suite"],
    hardwareRequirements: ["Maximum VRAM Check & Color-Accurate Display Baseline"],
    terms: ["CAD", "3D Design", "Design", "Creator", "Color", "OLED", "Workstation"],
    biasType: "gpu-mandatory"
  },
  Design: {
    software: ["Figma", "Adobe Illustrator", "After Effects", "Blender", "Premiere Pro"],
    hardwareRequirements: ["Color Certified Panel (OLED/IPS P3) Baseline Required"],
    terms: ["Design", "Digital Art", "Creator", "Photo Editing", "Video Editing"],
    biasType: "creator-heavy"
  },
  Business: {
    software: ["Excel Macro Suite", "Tableau", "PowerBI", "SAP", "Slack"],
    hardwareRequirements: ["Extreme Battery Lifespan Focus Over Power"],
    terms: ["Business", "Travel", "Writing", "Battery", "Lightweight"],
    biasType: "efficiency-focused"
  },
  Cybersecurity: {
    software: ["Kali Linux", "Metasploit", "Burp Suite", "Gidhra", "Hashcat"],
    hardwareRequirements: ["Hardware Virtualization (VT-x/AMD-V) Baseline Mandatory"],
    terms: ["Cybersecurity", "Linux", "Secure Architecture", "Keyboard"],
    biasType: "computational"
  },
  DataScience: {
    software: ["RStudio", "Apache Spark", "Hadoop", "Tableau", "Python Suite"],
    hardwareRequirements: ["High Dual-Channel Bus Memory Throughput Mandatory"],
    terms: ["Data Science", "Machine Learning", "Coding", "Data Analysis"],
    biasType: "computational"
  },
  Chemical: {
    software: ["ASPEN Plus", "CHEMCAD", "MATLAB", "COMSOL Multiphysics"],
    hardwareRequirements: ["Vector Processing Throughput Focus"],
    terms: ["Engineering", "Data Analysis", "Coding", "Balanced System"],
    biasType: "math-heavy"
  },
  Biotechnology: {
    software: ["BLAST", "PyMOL", "SnapGene", "MATLAB", "BioPython Suite"],
    hardwareRequirements: ["Highly Efficient Battery and Silent Acoustics Baseline"],
    terms: ["Data Analysis", "Research", "Efficient Architecture", "Quiet"],
    biasType: "efficiency-focused"
  }
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
  cardFlipped: false,
  showMonthlyCost: false,
  phoneSync: "Mac OS"
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
  if (laptop.price > priceLimit) {
    return -Infinity;
  }

  const blob = normalize(textBlob(laptop));
  const rawQuery = normalize(query);
  let score = 0;

  const expansionMatrix = [
    { keys: ["ml", "ai", "learning", "data", "compile"], targets: ["nvidia", "rtx", "cuda", "16gb", "32gb", "ryzen 9", "core i9"] },
    { keys: ["edit", "design", "render", "creator", "blend"], targets: ["oled", "creators", "rtx", "discrete", "p3", "ips", "pro"] },
    { keys: ["game", "fps", "play", "steam", "refresh"], targets: ["rtx", "144hz", "165hz", "240hz", "graphics", "radeon rx"] },
    { keys: ["travel", "battery", "carry", "lightweight", "slim"], targets: ["thin", "fanless", "efficient", "air", "evo", "snapdragon"] }
  ];

  expansionMatrix.forEach(node => {
    if (node.keys.some(k => rawQuery.includes(k))) {
      node.targets.forEach(t => {
        if (blob.includes(t)) score += 20; 
      });
    }
  });

  const terms = rawQuery.split(/[^a-z0-9+]+/).filter(Boolean);
  terms.forEach((term) => { if (blob.includes(term)) score += 12; });
  weightedTerms.forEach((term) => { if (blob.includes(normalize(term))) score += 18; });

  let powerWeight = 0.14;
  let mobilityWeight = 0.11;
  let efficiencyWeight = 0.12;

  if (["game", "fps", "render", "cad", "heavy", "compile"].some(k => rawQuery.includes(k))) {
    powerWeight = 0.45; mobilityWeight = 0.05; efficiencyWeight = 0.05;
  } else if (["travel", "battery", "carry", "light", "college", "cafe"].some(k => rawQuery.includes(k))) {
    powerWeight = 0.05; mobilityWeight = 0.40; efficiencyWeight = 0.35;
  }

  if (state.activeTab === "Engineering") {
    const targetBranchProfile = branchProfiles[state.branch];
    if (targetBranchProfile) {
      if (targetBranchProfile.biasType === "gpu-mandatory") {
        const hasDiscreteGpu = blob.includes("rtx") || blob.includes("radeon rx") || blob.includes("graphics") || blob.includes("apple pro") || blob.includes("apple max");
        if (!hasDiscreteGpu) return -Infinity; 
        powerWeight = 0.50; mobilityWeight = 0.05; efficiencyWeight = 0.05;
      } else if (targetBranchProfile.biasType === "cuda-heavy") {
        if (!blob.includes("nvidia") && !blob.includes("rtx")) score -= 60; 
        powerWeight = 0.40; efficiencyWeight = 0.20;
      } else if (targetBranchProfile.biasType === "computational") {
        if (blob.includes("16gb") || blob.includes("32gb")) score += 35;
        powerWeight = 0.30; efficiencyWeight = 0.20;
      } else if (targetBranchProfile.biasType === "math-heavy") {
        powerWeight = 0.35; efficiencyWeight = 0.25;
      } else if (targetBranchProfile.biasType === "efficiency-focused") {
        powerWeight = 0.05; mobilityWeight = 0.45; efficiencyWeight = 0.40;
      }
    }
  }

  score += laptop.scores.power * powerWeight + laptop.scores.mobility * mobilityWeight + laptop.scores.efficiency * efficiencyWeight;

  const allocationRatio = laptop.price / priceLimit;
  if (allocationRatio >= 0.85 && allocationRatio <= 1.0) {
    score += 40; 
  } else if (allocationRatio < 0.50) {
    score -= 30; 
  }

  if (state.activeTab === "AI Vibe Matcher") {
    if (state.phoneSync === "Mac OS" && normalize(laptop.brand).includes("apple")) { score += 45; }
    if (state.phoneSync === "Windows" && !normalize(laptop.brand).includes("apple")) { score += 15; }
  }

  return score;
}

function getMatches() {
  const currentBudgetUsd = budgetInUsd();
  
  if (state.activeTab === "Engineering") {
    const profile = branchProfiles[state.branch];
    const terms = [...profile.terms, ...purposeProfiles[state.purpose]];
    
    return state.laptops
      .map((laptop) => ({
        laptop,
        rank: scoreLaptop(laptop, `${state.branch} ${state.purpose}`, currentBudgetUsd, terms),
      }))
      .filter(({ rank }) => rank !== -Infinity)
      .sort((a, b) => b.rank - a.rank)
      .map(({ laptop }) => laptop);
  }

  return state.laptops
    .map((laptop) => ({ laptop, rank: scoreLaptop(laptop, state.query, currentBudgetUsd) }))
    .filter(({ rank }) => rank !== -Infinity)
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
    state.cardFlipped = false;
    render();
  } else {
    if (
      patch.branch !== undefined || 
      patch.purpose !== undefined || 
      patch.roast !== undefined ||
      patch.phoneSync !== undefined
    ) {
      const panel = document.querySelector(".panel");
      if (panel) panel.innerHTML = renderPanel();
    }
    updateResultsOnly();
  }
}

function updateResultsOnly() {
  if (state.activeTab === "Match Mode") {
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
      <div class="splash-container">
        <h1 class="splash-logo-text">RIGSWIPE</h1>
        <p class="splash-sub-text">AI Laptop Matchmaker</p>
      </div>
    </section>
  `;
}

function render() {
  if (state.showSplash) {
    root.innerHTML = renderSplash();

    window.setTimeout(() => {
      const splash = document.getElementById("splash-screen");
      if (splash) {
        splash.classList.add("fade-out");
        window.setTimeout(() => {
          state.showSplash = false;
          render();
        }, 500);
      }
    }, 1200);
    return;
  }

  if (state.activeTab === "Match Mode") {
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
  if (state.activeTab === "Engineering") return renderBranchPanel();
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
                      <button class="mini-detail" data-detail-id="${item.id}">View Details</button>
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
            <p class="eyebrow">Interactive Tinder</p>
            <h2>Match Mode</h2>
            <p style="font-size: 0.9rem; color: #a1a1aa; margin-top: 0.25rem;">
              Swipe through the catalog one laptop at a time. Click the photo box to dynamically rotate the chassis and analyze system feasibility blueprints.
            </p>
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
  const filtered = getMatches();
  if (!filtered.length) return null;
  return filtered[state.matchIndex % filtered.length];
}

function primaryHighlight(laptop) {
  const dedicatedGraphics = laptop.graphics.includes("RTX") || laptop.graphics.includes("Radeon RX") || laptop.graphics.includes("Apple");
  const heroSpec = dedicatedGraphics ? laptop.graphics : laptop.cpu;
  return `${laptop.ram} - ${laptop.storage} - ${heroSpec}`;
}

function renderSwipeCard(laptop) {
  const rawPriceInInr = laptop.price * USD_TO_INR;
  const computedEmiString = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Math.round(rawPriceInInr / 12));
  
  const displayPriceText = state.showMonthlyCost 
    ? `${computedEmiString} / month` 
    : formatPrice(laptop.price);

  const ramLower = normalize(laptop.ram);
  const isSoldered = ramLower.includes("soldered") || ramLower.includes("onboard") || ramLower.includes("lpddr");

  // Determine performance compatibility markers dynamically
  const blob = normalize(textBlob(laptop));
  const hasDiscreteGpu = blob.includes("rtx") || blob.includes("radeon rx") || blob.includes("apple");
  const hasHighRam = blob.includes("16gb") || blob.includes("32gb") || blob.includes("64gb");
  
  const isGta6Compatible = hasDiscreteGpu && hasHighRam;
  const isExtremePower = blob.includes("rtx 40") || blob.includes("rtx 50") || blob.includes("apple max") || blob.includes("apple ultra") || blob.includes("ryzen 9") || blob.includes("core i9");

  let customModifierClass = "";
  if (isExtremePower) {
    customModifierClass = "extreme-power";
  } else if (isGta6Compatible) {
    customModifierClass = "gta6-compatible";
  }

  return `
    <article class="glass tinder-card ${state.cardFlipped ? "flipped" : ""} ${customModifierClass}" id="tinder-card" data-card-id="${laptop.id}">
      <div class="tinder-card-inner">
        
        <!-- FRONT CARD DISPLAY LAYER -->
        <div class="tinder-card-front">
          <div class="photo-placeholder tinder-photo-box" style="cursor: pointer;">
            <div class="laptop-shell">
              <div class="laptop-screen"></div>
              <div class="laptop-base"></div>
            </div>
            <span>${escapeHtml(laptop.brand)}</span>
          </div>
          <div class="tinder-info">
            <div class="card-top">
              <div class="card-headings">
                <p class="eyebrow">${escapeHtml(laptop.brand)}</p>
                <h3>${escapeHtml(laptop.name)}</h3>
              </div>
              <div class="price-matrix-container">
                <div class="price">${displayPriceText}</div>
                <div class="cost-toggle-switch emi-switch-trigger">
                  <span class="cost-toggle-opt ${!state.showMonthlyCost ? "selected" : ""}">Total</span>
                  <span class="cost-toggle-opt ${state.showMonthlyCost ? "selected" : ""}">EMI</span>
                </div>
              </div>
            </div>
            <p class="highlight">${escapeHtml(primaryHighlight(laptop))}</p>
            <div class="chips">${laptop.idealFor.slice(0, 3).map((item) => `<span class="chip">${escapeHtml(item)}</span>`).join("")}</div>
          </div>
        </div>
        
        <!-- BACK CARD DISPLAY LAYER -->
        <div class="tinder-card-back">
          <div class="photo-placeholder tinder-photo-box" style="height: 50px; min-height: 50px; cursor: pointer;">
            <span style="font-size: 0.75rem; letter-spacing:0.02em;">← Return to Image view</span>
          </div>
          
          <div class="upgrade-path-map">
            <div class="xray-header">> CORE SUSTAINABILITY INDEX</div>
            <div class="upgrade-badge-row">
              ${isSoldered 
                ? `<span class="upgrade-status-pill fail-check">RAM: Soldered ❌</span>` 
                : `<span class="upgrade-status-pill pass-check">RAM: Upgradeable to 32GB</span>`}
              <span class="upgrade-status-pill pass-check">Storage: 1x Open M.2 Slot</span>
            </div>
          </div>

          <div class="tinder-info" style="padding-top: 0.25rem;">
            <div class="card-top" style="margin-bottom:0.5rem;">
              <h4>${escapeHtml(laptop.name)} Specifications</h4>
              <div class="price" style="font-size:0.95rem;">${displayPriceText}</div>
            </div>
            <p style="font-size: 0.8rem; margin: 0.2rem 0; color:#a1a1aa;"><b>GPU Architecture:</b> ${escapeHtml(laptop.graphics)}</p>
            <p style="font-size: 0.8rem; margin: 0; color:#a1a1aa;"><b>Panel Core Build:</b> ${escapeHtml(laptop.screen)}</p>
          </div>
        </div>

      </div>
    </article>
  `;
}

function renderSwipeFinished() {
  return `
    <div class="glass tinder-card empty-card">
      <div>
        <p class="eyebrow">Deck complete</p>
        <h3>All matching cards evaluated</h3>
        <p class="hint">Adjust budget configuration sliders if you require additional recommendations.</p>
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
                    <button class="mini-detail" data-detail-id="${laptop.id}">View Details</button>
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
  const ecosystems = ["Mac OS", "Windows"];

  return `
    <form class="form" id="matcher-form">
      ${panelTitle("AI Vibe Matcher", "Describe setup targets, neural weights, and visual space alignment parameters.")}
      
      <label>
        Contextual Directives
        <textarea id="query" rows="3" placeholder="e.g. lightweight machine, metal finish, deep trackpad">${escapeHtml(state.query)}</textarea>
      </label>

      <!-- Updated Platform Controls Header: Operating System -->
      <label>Operating System</label>
      <div class="vibe-chip-group">
        ${ecosystems.map(e => `
          <button type="button" class="vibe-toggle-chip ${state.phoneSync === e ? "active" : ""}" data-vibe-type="phoneSync" data-vibe-value="${escapeHtml(e)}">
            ${escapeHtml(e)}
          </button>
        `).join("")}
      </div>

      ${budgetControl()}
      <button class="primary-btn" style="margin-top:0.5rem;">Neural Scan</button>
    </form>
  `;
}

function renderBranchPanel() {
  const profile = branchProfiles[state.branch];
  return `
    <div class="form">
      ${panelTitle("Engineering", "Align hardware requirements automatically against college curriculums.")}
      <label>
        Branch
        <select id="branch">${Object.keys(branchProfiles).map((item) => `<option value="${item}" ${item === state.branch ? "selected" : ""}>${branchLabels[item]}</option>`).join("")}</select>
      </label>
      <label>
        Purpose
        <select id="purpose">${Object.keys(purposeProfiles).map((item) => `<option ${item === state.purpose ? "selected" : ""}>${item}</option>`).join("")}</select>
      </label>
      ${budgetControl()}
      <div class="note" style="margin-top: 0.5rem; font-family: monospace; font-size: 0.75rem; color: #a78bfa;">
        <b>Target Branch Tools:</b> ${profile.software.join(", ")} <br>
        <b>Validation Guardrails:</b> ${profile.hardwareRequirements.join(" | ")}
      </div>
    </div>
  `;
}

function renderRoastPanel() {
  return `
    <form class="form" id="roast-form">
      ${panelTitle("Rig Roast 🔥", "Drop your old computer specifications to get a brutal upgrade review.")}
      <textarea id="roast-input" rows="7" placeholder="e.g. 8GB RAM, i3, broken trackpad, loud fans">${escapeHtml(state.roastInput)}</textarea>
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
      <span class="budget-row"><span>Budget Ceiling</span><span class="budget-value" id="budget-val-label">${formatBudget(state.budget)}</span></span>
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
      <button class="mini-detail" data-detail-id="${laptop.id}" style="width: 100%; text-align: center; justify-content: center; margin-top: 12px; padding: 10px; border-radius: 8px;">View Full Details</button>
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
    if (event.target.closest(".tinder-photo-box") || event.target.closest(".emi-switch-trigger")) return;
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
    state.cardFlipped = false;
    render();
  }, 350);
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
      <div class="scan-horizon-laser"></div>
      <div class="scan-grid"></div>
      <div class="scan-copy">
        <div>
          <p class="eyebrow">Spectrometer Sweep</p>
          <h2>Scanning Catalog</h2>
          <p class="hint">Parsing optimal spec synergy, weights, and cooling requirements...</p>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  window.setTimeout(() => overlay.remove(), 1200);
}

function buildRoast(input) {
  const text = normalize(input);
  
  const ramRoasts = [
    "That RAM layout is barely holding your active baseline background elements alive.",
    "8GB RAM? Your memory metrics look ready to drop into a system paging file cycle.",
    "An execution sandbox footprint like that is begging for memory leaks."
  ];
  const storageRoasts = [
    "Running a spinning mechanical sector drive in this decade belongs in a legacy museum archive.",
    "A slow storage controller pool means your data lines move like dial-up packets.",
    "Your disk controllers are throttling everything. Get ready for buffer queues."
  ];
  const cpuRoasts = [
    "That processor architecture processes data vectors at the speed of bureaucracy.",
    "Your processing core density is screaming out for a thread scheduler update.",
    "Silicon limits encountered. That logic block can barely calculate code loops."
  ];

  const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const burns = [];

  if (text.includes("4gb") || text.includes("8gb")) burns.push(randomPick(ramRoasts));
  if (text.includes("hdd") || text.includes("256gb")) burns.push(randomPick(storageRoasts));
  if (text.includes("i3") || text.includes("celeron") || text.includes("pentium")) burns.push(randomPick(cpuRoasts));
  if (text.includes("heat") || text.includes("jet") || text.includes("fan")) burns.push("The chassis thermals emulate a turbine block but performance metrics remain stagnant.");
  
  if (!burns.length) burns.push("Chassis density is baseline structural config, but lacking top-tier performance cache pools entirely.");

  return `${burns.join(" ")} Advice: ${recommendUpgrade(text)}.`;
}

function recommendUpgrade(text) {
  if (text.includes("gaming") || text.includes("fps")) return "Aim for an RTX 40/50-series graphics module, 32GB RAM, and 144Hz+ high-refresh display";
  if (text.includes("code") || text.includes("coding")) return "Adopt 16GB dual-channel memory, SSD storage, and balanced thermal limits";
  if (text.includes("design") || text.includes("edit")) return "Choose color-certified hardware (OLED or IPS), high memory headroom, and discrete graphics";
  return "Modernize with 16GB RAM, fast PCIe NVMe storage, and high-efficiency CPU structures";
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
    const target = event.target;
    const tabBtn = target.closest("[data-tab]");
    if (tabBtn) {
      setState({ activeTab: tabBtn.dataset.tab, page: 1 });
      return;
    }

    const pageBtn = target.closest("[data-page]");
    if (pageBtn) {
      const matches = getMatches();
      const totalPages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
      const nextPage = pageBtn.dataset.page === "next" 
        ? Math.min(totalPages, state.page + 1) 
        : Math.max(1, state.page - 1);
      setState({ page: nextPage });
      return;
    }

    const swipeBtn = target.closest("[data-swipe]");
    if (swipeBtn) {
      swipeCurrentLaptop(swipeBtn.dataset.swipe);
      return;
    }

    const drawerToggle = target.closest("#drawer-toggle");
    if (drawerToggle) {
      setState({ drawerOpen: !state.drawerOpen });
      return;
    }

    const detailBtn = target.closest("[data-detail-id]");
    if (detailBtn) {
      const laptop = state.laptops.find((item) => item.id === Number(detailBtn.dataset.detailId));
      if (laptop) showLaptopDetails(laptop);
      return;
    }

    // Capture Interactive Custom Chips
    const vibeChip = target.closest(".vibe-toggle-chip");
    if (vibeChip) {
      const type = vibeChip.dataset.vibeType;
      const value = vibeChip.dataset.vibeValue;
      setState({ [type]: value, page: 1 });
      return;
    }

    if (target.closest(".emi-switch-trigger")) {
      setState({ showMonthlyCost: !state.showMonthlyCost });
      return;
    }

    if (target.closest(".tinder-photo-box")) {
      setState({ cardFlipped: !state.cardFlipped });
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
    shuffle(laptops);
    state.laptops = laptops;
    render();
  })
  .catch((error) => {
    root.innerHTML = `
      <main class="app">
        <div class="error">
          <h1>RigSwipe could not load the catalog.</h1>
          <p>Please launch your local host server or verify configuration settings. Detail: ${escapeHtml(error.message)}</p>
        </div>
      </main>
    `;
  });
  