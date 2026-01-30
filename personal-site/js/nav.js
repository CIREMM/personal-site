(() => {
  const nav = document.querySelector(".nav");
  const pinBtn = document.getElementById("navPin");

  if (!nav || !pinBtn) return;

  const KEY = "sidebarPinned";

  // load state
  const pinned = localStorage.getItem(KEY) === "1";
  nav.classList.toggle("pinned", pinned);
  pinBtn.setAttribute("aria-pressed", pinned ? "true" : "false");

  // toggle state
  pinBtn.addEventListener("click", () => {
    const nowPinned = !nav.classList.contains("pinned");
    nav.classList.toggle("pinned", nowPinned);
    localStorage.setItem(KEY, nowPinned ? "1" : "0");
    pinBtn.setAttribute("aria-pressed", nowPinned ? "true" : "false");
  });
})();
