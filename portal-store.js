(function () {
  "use strict";

  const SESSION_KEY = "aill.portal.session.v1";
  const PROFILE_KEY = "aill.portal.profile.v1";
  const allowedTrackIds = new Set(["innovate", "build", "compute", "data"]);
  const allowedPages = new Set([
    "dashboard.html",
    "tracks.html",
    "track.html",
    "usage.html",
    "billing.html",
    "profile.html",
    "support.html"
  ]);

  function safeParse(value) {
    try {
      return JSON.parse(value);
    } catch (_error) {
      return null;
    }
  }

  function getSession() {
    const value = safeParse(sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY));
    if (!value || typeof value.email !== "string" || typeof value.name !== "string") return null;
    return value;
  }

  function activeStorage() {
    return sessionStorage.getItem(SESSION_KEY) ? sessionStorage : localStorage;
  }

  function startSession(user, persistent) {
    const session = {
      name: String(user.name || "Demo Member").trim(),
      email: String(user.email || "").trim().toLowerCase(),
      startedAt: new Date().toISOString()
    };
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
    (persistent ? localStorage : sessionStorage).setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  }

  function endSession() {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(PROFILE_KEY);
  }

  function getProfile() {
    const session = getSession();
    const saved = safeParse(activeStorage().getItem(PROFILE_KEY));
    return {
      name: saved && saved.name ? saved.name : (session ? session.name : "Demo Member"),
      email: saved && saved.email ? saved.email : (session ? session.email : ""),
      organization: saved && saved.organization ? saved.organization : "AI Living Labs Foundation",
      role: saved && saved.role ? saved.role : "Programme participant",
      phone: saved && saved.phone ? saved.phone : "",
      city: saved && saved.city ? saved.city : "Amaravati"
    };
  }

  function saveProfile(profile) {
    const clean = {
      name: String(profile.name || "").trim(),
      email: String(profile.email || "").trim().toLowerCase(),
      organization: String(profile.organization || "").trim(),
      role: String(profile.role || "").trim(),
      phone: String(profile.phone || "").trim(),
      city: String(profile.city || "").trim()
    };
    const storage = activeStorage();
    storage.setItem(PROFILE_KEY, JSON.stringify(clean));
    const current = getSession();
    if (current) {
      storage.setItem(SESSION_KEY, JSON.stringify({
        ...current,
        name: clean.name,
        email: clean.email
      }));
    }
    return clean;
  }

  function safeReturnTo(raw) {
    if (!raw) return "dashboard.html";
    let target;
    try {
      target = new URL(String(raw).trim(), window.location.href);
    } catch (_error) {
      return "dashboard.html";
    }
    const candidate = target.pathname.split("/").pop() || "";
    if (!allowedPages.has(candidate)) return "dashboard.html";
    if (candidate === "track.html") {
      const trackId = target.searchParams.get("id");
      return allowedTrackIds.has(trackId) ? `track.html?id=${encodeURIComponent(trackId)}` : "tracks.html";
    }
    return candidate;
  }

  window.PortalStore = Object.freeze({
    getSession,
    startSession,
    endSession,
    getProfile,
    saveProfile,
    safeReturnTo
  });
})();
