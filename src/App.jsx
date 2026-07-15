const { useEffect, useMemo, useState } = React;

const TABS = ["AI Vibe Matcher", "BTech Branch Finder", "Roast My Current Rig"];
const PAGE_SIZE = 6;

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
};

const purposeProfiles = {
  "Coding + College": ["Coding", "College", "School/Work", "keyboard", "battery"],
  "Gaming After Class": ["Gaming", "Streaming", "Esports", "high-refresh", "rgb"],
  "Creator Projects": ["Creator", "Video Editing", "Design", "oled", "color"],
  "Light Carry Daily": ["Travel", "Business", "Writing", "lightweight", "battery"],
  "Budget Survival": ["Budget", "School/Work", "Web Browsing", "cheap", "value"],
};

function formatPrice(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function normalize(text) {
  return String(text || "").toLowerCase();
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
  score += priceFit / Math.max(priceLimit, 1) * 18;
  score += laptop.scores.power * 0.14 + laptop.scores.mobility * 0.11 + laptop.scores.efficiency * 0.12;

  if (laptop.price > priceLimit) {
    score -= Math.min(45, (laptop.price - priceLimit) / 70);
  }

  return score;
}

function App() {
  const [laptops, setLaptops] = useState([]);
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [query, setQuery] = useState("coding, lightweight, battery, 16GB");
  const [budget, setBudget] = useState(1600);
  const [page, setPage] = useState(1);
  const [scanActive, setScanActive] = useState(false);
  const [branch, setBranch] = useState("CSE");
  const [purpose, setPurpose] = useState("Coding + College");
  const [roastInput, setRoastInput] = useState("8GB RAM, i3, 256GB SSD, cracked hinge, sounds like a jet");
  const [roast, setRoast] = useState("");

  useEffect(() => {
    fetch("./laptopsData.json")
      .then((response) => response.json())
      .then(setLaptops)
      .catch(() => setLaptops([]));
  }, []);

  useEffect(() => {
    setPage(1);
  }, [query, budget, activeTab, branch, purpose]);

  const branchTerms = useMemo(() => {
    const profile = branchProfiles[branch];
    return [...profile.terms, ...profile.vibes, ...purposeProfiles[purpose]];
  }, [branch, purpose]);

  const aiMatches = useMemo(() => {
    return laptops
      .map((laptop) => ({ laptop, rank: scoreLaptop(laptop, query, budget) }))
      .filter(({ laptop, rank }) => rank > 20 || laptop.price <= budget)
      .sort((a, b) => b.rank - a.rank)
      .map(({ laptop }) => laptop);
  }, [laptops, query, budget]);

  const branchMatches = useMemo(() => {
    const profile = branchProfiles[branch];
    return laptops
      .map((laptop) => ({
        laptop,
        rank: scoreLaptop(laptop, `${branch} ${purpose}`, budget, branchTerms) + Math.max(0, laptop.scores.power - profile.power) * 0.2,
      }))
      .filter(({ laptop, rank }) => laptop.price <= budget + 700 && rank > 28)
      .sort((a, b) => b.rank - a.rank)
      .map(({ laptop }) => laptop);
  }, [laptops, branch, purpose, budget, branchTerms]);

  const currentMatches = activeTab === "BTech Branch Finder" ? branchMatches : aiMatches;
  const totalPages = Math.max(1, Math.ceil(currentMatches.length / PAGE_SIZE));
  const visibleMatches = currentMatches.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function runScan(event) {
    event.preventDefault();
    setScanActive(true);
    window.setTimeout(() => setScanActive(false), 1500);
  }

  function roastRig(event) {
    event.preventDefault();
    const text = normalize(roastInput);
    const burns = [];

    if (text.includes("4gb") || text.includes("8gb")) burns.push("That RAM is not multitasking, it is asking for emotional support.");
    if (text.includes("hdd")) burns.push("A hard drive in this decade is less storage and more archaeological exhibit.");
    if (text.includes("i3") || text.includes("celeron") || text.includes("pentium")) burns.push("That CPU opens Chrome like it is negotiating a peace treaty.");
    if (text.includes("heat") || text.includes("jet") || text.includes("fan")) burns.push("The fan curve sounds prepared for takeoff, but the performance stayed at the gate.");
    if (text.includes("crack") || text.includes("hinge")) burns.push("The hinge has seen things no productivity device should have to see.");
    if (!burns.length) burns.push("Honestly, this rig may survive. It still deserves a gentle upgrade and a less dramatic desktop wallpaper.");

    setRoast(`${burns.join(" ")} Upgrade vibe: ${recommendUpgrade(text)}.`);
  }

  function recommendUpgrade(text) {
    if (text.includes("gaming") || text.includes("fps")) return "RTX 4060 or better, 16GB RAM, and a 144Hz+ screen";
    if (text.includes("code") || text.includes("coding")) return "16GB minimum, 512GB SSD, strong keyboard, and efficient CPU";
    if (text.includes("design") || text.includes("edit")) return "OLED or color-accurate display, 32GB RAM, and dedicated graphics";
    return "16GB RAM, 512GB SSD, modern CPU, and battery life that does not cause trust issues";
  }

  return (
    <main className="min-h-screen px-4 py-4 sm:px-6 lg:px-8">
      {scanActive && <ScanningOverlay />}

      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <nav className="glass sticky top-4 z-20 rounded-lg px-4 py-3">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 text-cyan-200 shadow-neon">AI</div>
                <div>
                  <h1 className="text-xl font-extrabold text-white sm:text-2xl">Laptop Matchmaker AI</h1>
                  <div className="mt-1 h-1 w-44 rounded-full neon-line" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                    activeTab === tab
                      ? "bg-cyan-300 text-slate-950 shadow-neon"
                      : "soft-glass text-slate-200 hover:border-pink-300/50 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <section className="grid gap-6 lg:grid-cols-[390px_1fr]">
          <aside className="glass rounded-lg p-5">
            {activeTab === "AI Vibe Matcher" && (
              <MatcherPanel query={query} setQuery={setQuery} budget={budget} setBudget={setBudget} onSubmit={runScan} />
            )}
            {activeTab === "BTech Branch Finder" && (
              <BranchPanel
                branch={branch}
                setBranch={setBranch}
                purpose={purpose}
                setPurpose={setPurpose}
                budget={budget}
                setBudget={setBudget}
              />
            )}
            {activeTab === "Roast My Current Rig" && (
              <RoastPanel roastInput={roastInput} setRoastInput={setRoastInput} roast={roast} onSubmit={roastRig} />
            )}
          </aside>

          <section className="flex flex-col gap-5">
            <ResultsHeader count={currentMatches.length} page={page} totalPages={totalPages} activeTab={activeTab} />
            <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
              {visibleMatches.map((laptop) => (
                <LaptopCard key={laptop.id} laptop={laptop} />
              ))}
            </div>
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          </section>
        </section>
      </div>
    </main>
  );
}

function MatcherPanel({ query, setQuery, budget, setBudget, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <PanelTitle title="AI Vibe Matcher" detail="Tell it the vibe, budget, workload, or deal-breakers." />
      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-cyan-100">Request</span>
        <textarea
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          rows="7"
          className="rounded-lg border border-white/10 bg-black/30 p-4 text-slate-100 outline-none transition focus:border-cyan-300"
        />
      </label>
      <BudgetSlider budget={budget} setBudget={setBudget} />
      <button className="rounded-lg bg-pink-300 px-5 py-3 font-bold text-slate-950 shadow-neon transition hover:bg-cyan-300">
        Neural Scan
      </button>
    </form>
  );
}

function BranchPanel({ branch, setBranch, purpose, setPurpose, budget, setBudget }) {
  return (
    <div className="flex flex-col gap-5">
      <PanelTitle title="BTech Branch Finder" detail="Tune recommendations around branch workload and campus reality." />
      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-cyan-100">Branch</span>
        <select value={branch} onChange={(event) => setBranch(event.target.value)} className="rounded-lg border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-lime-300">
          {Object.keys(branchProfiles).map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-cyan-100">Purpose</span>
        <select value={purpose} onChange={(event) => setPurpose(event.target.value)} className="rounded-lg border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-lime-300">
          {Object.keys(purposeProfiles).map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
      <BudgetSlider budget={budget} setBudget={setBudget} />
      <div className="rounded-lg border border-lime-300/20 bg-lime-300/10 p-4 text-sm text-lime-50">
        Best matches prioritize {branchProfiles[branch].terms.slice(0, 3).join(", ")} and the {purpose.toLowerCase()} use case.
      </div>
    </div>
  );
}

function RoastPanel({ roastInput, setRoastInput, roast, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <PanelTitle title="Roast My Current Rig" detail="Drop the specs. The roast is rude, the upgrade advice is useful." />
      <textarea
        value={roastInput}
        onChange={(event) => setRoastInput(event.target.value)}
        rows="7"
        className="rounded-lg border border-white/10 bg-black/30 p-4 text-slate-100 outline-none transition focus:border-pink-300"
      />
      <button className="rounded-lg bg-lime-300 px-5 py-3 font-bold text-slate-950 shadow-neon transition hover:bg-amber-300">
        Roast It
      </button>
      {roast && <div className="rounded-lg border border-pink-300/25 bg-pink-300/10 p-4 leading-relaxed text-pink-50">{roast}</div>}
    </form>
  );
}

function PanelTitle({ title, detail }) {
  return (
    <div>
      <h2 className="text-2xl font-extrabold text-white">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p>
    </div>
  );
}

function BudgetSlider({ budget, setBudget }) {
  return (
    <label className="flex flex-col gap-3">
      <span className="flex items-center justify-between text-sm font-semibold text-cyan-100">
        <span>Budget</span>
        <span className="text-amber-200">{formatPrice(budget)}</span>
      </span>
      <input
        type="range"
        min="300"
        max="4500"
        step="50"
        value={budget}
        onChange={(event) => setBudget(Number(event.target.value))}
        className="accent-cyan-300"
      />
    </label>
  );
}

function ResultsHeader({ count, page, totalPages, activeTab }) {
  return (
    <header className="glass rounded-lg p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase text-cyan-200">{activeTab}</p>
          <h2 className="mt-1 text-2xl font-extrabold text-white">Matched Shortlist</h2>
        </div>
        <div className="text-sm text-slate-300">
          {count} matches · page {page} of {totalPages}
        </div>
      </div>
    </header>
  );
}

function LaptopCard({ laptop }) {
  return (
    <article className="glass card-hover rounded-lg p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-bold text-cyan-200">{laptop.brand}</p>
          <h3 className="mt-1 truncate-2 text-xl font-extrabold text-white">{laptop.name}</h3>
        </div>
        <div className="rounded-lg bg-amber-300 px-3 py-2 text-sm font-black text-slate-950">{formatPrice(laptop.price)}</div>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-slate-300">
        <Spec label="CPU" value={laptop.cpu} />
        <Spec label="Memory" value={`${laptop.ram} · ${laptop.storage}`} />
        <Spec label="GPU" value={laptop.graphics} />
        <Spec label="Display" value={laptop.screen} />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {laptop.idealFor.slice(0, 3).map((item) => (
          <span key={item} className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">{item}</span>
        ))}
      </div>

      <div className="mt-5 grid gap-3">
        <ScoreBar label="Pure Power" value={laptop.scores.power} color="from-pink-300 to-amber-300" />
        <ScoreBar label="Mobility" value={laptop.scores.mobility} color="from-cyan-300 to-lime-300" />
        <ScoreBar label="Efficiency" value={laptop.scores.efficiency} color="from-lime-300 to-amber-300" />
      </div>
    </article>
  );
}

function Spec({ label, value }) {
  return (
    <div>
      <span className="font-bold text-slate-100">{label}: </span>
      <span>{value}</span>
    </div>
  );
}

function ScoreBar({ label, value, color }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs font-bold text-slate-200">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className={`score-fill h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="flex items-center justify-center gap-3 pb-8">
      <button
        disabled={page === 1}
        onClick={() => setPage((value) => Math.max(1, value - 1))}
        className="rounded-lg border border-white/10 bg-white/10 px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Prev
      </button>
      <span className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100">
        {page} / {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
        className="rounded-lg border border-white/10 bg-white/10 px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}

function ScanningOverlay() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 backdrop-blur-md">
      <div className="relative h-72 w-[min(42rem,88vw)] overflow-hidden rounded-lg border border-cyan-300/30 bg-slate-950/80 shadow-neon">
        <div className="absolute inset-0 scan-grid opacity-70" />
        <div className="scan-line absolute left-0 right-0 top-0 h-20 bg-gradient-to-b from-transparent via-cyan-300/45 to-transparent" />
        <div className="relative z-10 grid h-full place-items-center text-center">
          <div>
            <p className="text-sm font-bold uppercase text-pink-200">Neural scan running</p>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-5xl">Matching Your Vibe</h2>
            <p className="mt-3 text-slate-300">Parsing budget, workload, portability, and chaos tolerance.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
