// =====================
// DATA
// priority: 1 = featured (per expertise or across All)
// expertise: "Urban Planning" | "GIS" | "Graphic Design"
// =====================
const projects = [
  // ===== Urban Planning =====
  {
    id: "akiba_2024",
    expertise: "Urban Planning",
    priority: 1,
    title: "Akiba Mashinani Trust — Urban Planning & GIS Support",
    meta: "Nov 2024 – Apr 2025 • Homa Bay & Mukuru Kayaba",
    image: "assets/projects/akiba.jpg",
    background:
      "Supported land use situational analysis for climate-resilient planning across multiple sub-locations and an informal settlement.",
    solution:
      "Cleaned field + GIS data, produced decision-ready reports, and supported community validation for resilience and advocacy planning.",
    highlights:
      "Delivered six situational analysis reports; supported WASH planning in Mukuru Kayaba; ran GIS surveys along Nairobi River; digitized 5,900+ structures in a week (2-person team).",
    skills: ["Land Use Planning", "Climate Resilience", "KoboCollect", "GIS", "Stakeholder Engagement", "Reporting"]
  },
  {
    id: "metropolis_2023",
    expertise: "Urban Planning",
    priority: 3,
    title: "Metropolis Planning & Environment — Assistant Planner Intern",
    meta: "Feb 2023 – Aug 2023",
    image: "assets/projects/metropolis.jpg",
    background:
      "Supported planning work through site surveys, policy review, and development recommendations.",
    solution:
      "Assisted EIA/EA processes and produced planning visuals to support reporting and client communication.",
    highlights:
      "Contributed to site surveys and policy reviews; supported EIA/EA public participation and field data; produced land use, zoning, and suitability mapping outputs.",
    skills: ["EIA/EA Support", "Site Surveys", "Planning Recommendations", "Cartography", "Reporting"]
  },
  {
    id: "geodev_2021",
    expertise: "Urban Planning",
    priority: 4,
    title: "Geodev Kenya Ltd — Assistant Planner (Attachment)",
    meta: "Jul 2021 – Aug 2021 • Mombasa County",
    image: "assets/projects/geodev.jpg",
    background:
      "Supported preparation of the Mombasa County Spatial Plan within a planning + GIS team.",
    solution:
      "Contributed research, mapping, and digitization to strengthen sector analysis and planning outputs.",
    highlights:
      "Supported spatial plan research and mapping; contributed WASH sector analysis; digitized settlements, infrastructure, and buildings across the county.",
    skills: ["Spatial Planning", "Research & Reporting", "GIS Mapping", "Digitization", "WASH Analysis"]
  },

  // ===== GIS =====
  {
    id: "worldbank_2023",
    expertise: "GIS",
    priority: 1,
    title: "World Bank — Transport Intern (GIS/Analytics)",
    meta: "Sep 2023 – Sep 2024 • Dar es Salaam, Tanzania",
    image: "assets/projects/worldbank.jpg",
    background:
      "Supported climate-informed transport analysis for national and urban planning, including CCDR work.",
    solution:
      "Managed geospatial datasets, ran accessibility/beneficiary analysis (GIS + Python), and produced maps for reporting and decision-making.",
    highlights:
      "Contributed to Tanzania CCDR transport component; built GIS/Python analysis outputs for transport investments; produced technical visuals; supported field mission coordination and verification.",
    skills: ["GIS", "Python", "Accessibility Analysis", "Data QA", "Visualization", "Transport Planning"]
  },
  {
    id: "knbs_2019",
    expertise: "GIS",
    priority: 4,
    title: "KNBS — Enumerator (Geocoded Data Collection)",
    meta: "Aug 2019 • National Census",
    image: "assets/projects/knbs.jpg",
    background:
      "Collected geocoded household survey data during the 2019 national census.",
    solution:
      "Captured and submitted high-volume questionnaires and supported coordination to meet field deadlines.",
    highlights:
      "Collected 120+ geocoded household questionnaires; supported team coordination for timely submission.",
    skills: ["Field Data Collection", "Geocoding", "Quality Control", "Team Coordination"]
  },

  // ===== Graphic Design =====
  {
    id: "tcpak_2022",
    expertise: "Graphic Design",
    priority: 1,
    title: "TCPAK — Conference Comms & Reporting",
    meta: "Jul 2022 – Nov 2022 • National Conference (2022)",
    image: "assets/projects/tcpak.jpg",
    background:
      "Supported delivery of a national planning conference through communications and coordination.",
    solution:
      "Designed outreach materials, coordinated stakeholders, and compiled the official post-conference report.",
    highlights:
      "Created posters, programmes, and invitations; liaised with sponsors and presenters; supported schedule coordination; produced post-conference report for knowledge capture.",
    skills: ["Graphic Design", "Event Comms", "Layout", "Stakeholder Liaison", "Reporting"]
  },
  {
    id: "rotaract_2025",
    expertise: "Graphic Design",
    priority: 2,
    title: "Rotaract Club of Syokimau — PR Committee",
    meta: "2025 – Present",
    image: "assets/projects/rotaract.jpg",
    background:
      "Supported club visibility through clean, consistent digital communications.",
    solution:
      "Designed posters and taglines and supported digital outreach for event mobilisation.",
    highlights:
      "Designed promotional posters and taglines; supported online outreach and engagement for club activities.",
    skills: ["Posters", "Taglines", "Digital Outreach", "Design"]
  }
];

// =====================
// ELEMENTS
// =====================
const filterBtns = Array.from(document.querySelectorAll(".filter-btn"));

const projCarousel = document.getElementById("projCarousel");
const projTrack = document.getElementById("projTrack");
const projDots = document.getElementById("projDots");

// Wheel (All Projects)
const track = document.getElementById("track");
const thumbs = document.getElementById("thumbs");
const timeline = document.getElementById("timeline");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

// Details panel
const roleTitle = document.getElementById("roleTitle");
const roleMeta = document.getElementById("roleMeta");
const portfolioText = document.getElementById("portfolioText");
const skillBadges = document.getElementById("skillBadges");

// =====================
// STATE
// =====================
let activeSkill = "All";
let featuredIndex = 0;
let wheelIndex = 0;

// =====================
// HELPERS
// =====================
const normalizePriority = (p) => {
  const n = Number(p.priority);
  return Number.isFinite(n) ? n : 999;
};

const matchesSkill = (p) => activeSkill === "All" || p.expertise === activeSkill;

const filtered = (list) =>
  list
    .filter(matchesSkill)
    .slice()
    .sort((a, b) => normalizePriority(a) - normalizePriority(b));

const featuredList = () => filtered(projects).filter((p) => normalizePriority(p) === 1);
const allList = () => filtered(projects);

function clearDetails() {
  roleTitle.textContent = "No projects found";
  roleMeta.textContent =
    activeSkill === "All"
      ? "There are no projects available yet."
      : `There are no projects under “${activeSkill}” yet.`;
  portfolioText.textContent = "Select another skill, or add projects to this category.";
  skillBadges.innerHTML = "";
}

function setDetails(p) {
  if (!p) {
    clearDetails();
    return;
  }

  roleTitle.textContent = p.title;
  roleMeta.textContent = p.meta;
  portfolioText.textContent = p.highlights;

  skillBadges.innerHTML = "";
  (p.skills || []).forEach((s) => {
    const tag = document.createElement("span");
    tag.className = "pill";
    tag.textContent = s;
    skillBadges.appendChild(tag);
  });
}

// =====================
// FEATURED CAROUSEL
// =====================
function renderFeatured() {
  if (!projTrack || !projDots) return;

  const list = featuredList();

  // Reset UI
  projTrack.innerHTML = "";
  projDots.innerHTML = "";

  if (!list.length) {
    projTrack.innerHTML = `
      <div class="proj-slide">
        <div class="card pad">
          <h3 style="margin:0 0 8px;">No featured projects</h3>
          <p class="p" style="margin:0;">
            ${
              activeSkill === "All"
                ? `Set <code>priority: 1</code> on any projects you want to feature (across all skills).`
                : `Set <code>priority: 1</code> on projects under “${activeSkill}” to feature them here.`
            }
          </p>
        </div>
      </div>
    `;
    return;
  }

  if (featuredIndex >= list.length) featuredIndex = 0;

  // Build slides
  list.forEach((p) => {
    const slide = document.createElement("div");
    slide.className = "proj-slide";
    slide.innerHTML = `
      <div class="card pad">
        <div class="strip" style="margin:0 0 12px;">
          <h2 style="font-size:44px;">${p.title}</h2>
        </div>

        <div class="two-col">
          <div class="steps">
            <div class="step">
              <div class="num">01</div>
              <div>
                <h4>Background</h4>
                <p>${p.background}</p>
              </div>
            </div>
            <div class="step">
              <div class="num">02</div>
              <div>
                <h4>Solution</h4>
                <p>${p.solution}</p>
              </div>
            </div>
          </div>

          <div class="project-media">
            <img src="${p.image}" alt="${p.title}">
          </div>
        </div>
      </div>
    `;
    projTrack.appendChild(slide);
  });

  // Build dots
  list.forEach((_, idx) => {
    const d = document.createElement("button");
    d.type = "button";
    d.className = "proj-dot" + (idx === featuredIndex ? " active" : "");
    d.setAttribute("aria-label", `Go to featured project ${idx + 1}`);
    d.addEventListener("click", () => {
      featuredIndex = idx;
      updateFeatured();
      setDetails(featuredList()[featuredIndex]);
    });
    projDots.appendChild(d);
  });

  updateFeatured();
}

function updateFeatured() {
  const list = featuredList();
  if (!list.length) return;

  projTrack.style.transform = `translateX(-${featuredIndex * 100}%)`;
  Array.from(projDots.children).forEach((d, idx) => {
    d.classList.toggle("active", idx === featuredIndex);
  });
}

function attachFeaturedControls() {
  if (!projCarousel) return;

  // wheel/trackpad horizontal
  projCarousel.addEventListener(
    "wheel",
    (e) => {
      const list = featuredList();
      if (!list.length) return;

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 10) return;

      e.preventDefault();

      if (delta > 0) featuredIndex = Math.min(list.length - 1, featuredIndex + 1);
      else featuredIndex = Math.max(0, featuredIndex - 1);

      updateFeatured();
      setDetails(featuredList()[featuredIndex]);
    },
    { passive: false }
  );

  // touch swipe
  let startX = 0,
    startY = 0,
    touching = false;

  projCarousel.addEventListener(
    "touchstart",
    (e) => {
      touching = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    },
    { passive: true }
  );

  projCarousel.addEventListener("touchend", (e) => {
    if (!touching) return;
    touching = false;

    const list = featuredList();
    if (!list.length) return;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const dx = endX - startX;
    const dy = endY - startY;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) featuredIndex = Math.min(list.length - 1, featuredIndex + 1);
      else featuredIndex = Math.max(0, featuredIndex - 1);

      updateFeatured();
      setDetails(featuredList()[featuredIndex]);
    }
  });
}

// =====================
// WHEEL (ALL PROJECTS)
// =====================
function renderWheel() {
  const list = allList();

  track.innerHTML = "";
  thumbs.innerHTML = "";
  timeline.innerHTML = "";

  if (!list.length) {
    track.innerHTML = `
      <div class="slide">
        <div class="slide-inner" style="padding:18px;">
          <p class="title" style="margin:0 0 6px;">No projects found</p>
          <p class="sub" style="margin:0;">
            ${activeSkill === "All"
              ? "Add projects to your data to populate this section."
              : `Add projects with expertise: "${activeSkill}".`}
          </p>
        </div>
      </div>
    `;
    clearDetails();
    return;
  }

  if (wheelIndex >= list.length) wheelIndex = 0;

  list.forEach((p, i) => {
    // slide
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.innerHTML = `
      <div class="slide-inner">
        <img src="${p.image}" alt="${p.title}">
        <div class="slide-meta">
          <p class="title">${p.title}</p>
          <p class="sub">${p.meta}</p>
        </div>
      </div>
    `;
    track.appendChild(slide);

    // thumb
    const t = document.createElement("div");
    t.className = "thumb" + (i === wheelIndex ? " active" : "");
    t.innerHTML = `<img src="${p.image}" alt="${p.title}">`;
    t.addEventListener("click", () => setWheelActive(i));
    thumbs.appendChild(t);

    // position chip
    const c = document.createElement("div");
    c.className = "chip" + (i === wheelIndex ? " active" : "");
    c.textContent = `${i + 1}`;
    c.title = p.title;
    c.addEventListener("click", () => setWheelActive(i));
    timeline.appendChild(c);
  });

  updateWheelTrack();
  setDetails(allList()[wheelIndex]);
}

function setWheelActive(i) {
  const list = allList();
  if (!list.length) {
    clearDetails();
    return;
  }

  wheelIndex = i;
  updateWheelTrack();
  setDetails(allList()[wheelIndex]);

  [...thumbs.children].forEach((el, idx) => el.classList.toggle("active", idx === wheelIndex));
  [...timeline.children].forEach((el, idx) => el.classList.toggle("active", idx === wheelIndex));
}

function updateWheelTrack() {
  track.style.transform = `translateX(-${wheelIndex * 100}%)`;
}

// arrows
prevBtn?.addEventListener("click", () => {
  const list = allList();
  if (!list.length) return;
  wheelIndex = (wheelIndex - 1 + list.length) % list.length;
  setWheelActive(wheelIndex);
});

nextBtn?.addEventListener("click", () => {
  const list = allList();
  if (!list.length) return;
  wheelIndex = (wheelIndex + 1) % list.length;
  setWheelActive(wheelIndex);
});

// =====================
// FILTER BUTTONS
// =====================
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    activeSkill = btn.dataset.skill;

    filterBtns.forEach((b) => b.classList.toggle("active", b === btn));

    featuredIndex = 0;
    wheelIndex = 0;

    renderFeatured();
    renderWheel();

    // Set details to something sensible after filter:
    // Prefer first featured; otherwise first wheel item; otherwise clear.
    const f = featuredList();
    const a = allList();
    if (f.length) setDetails(f[0]);
    else if (a.length) setDetails(a[0]);
    else clearDetails();
  });
});

// =====================
// INIT
// =====================
attachFeaturedControls();
renderFeatured();
renderWheel();

// set initial details
const initFeatured = featuredList();
const initAll = allList();
if (initFeatured.length) setDetails(initFeatured[0]);
else if (initAll.length) setDetails(initAll[0]);
else clearDetails();
