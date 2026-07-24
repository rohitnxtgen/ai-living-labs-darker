(function () {
  "use strict";

  const root = document.getElementById("portal-root");
  const page = document.body.dataset.page || "dashboard";
  const authPages = new Set(["signin", "signup"]);
  const titleMap = {
    dashboard: "Overview",
    tracks: "Four-track pathway",
    track: "Track details",
    usage: "Usage & clusters",
    billing: "Billing",
    profile: "Profile",
    support: "Support"
  };

  if (!root || !window.PortalData || !window.PortalStore) return;

  function escapeHTML(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function icon(name, className) {
    return `<img class="portal-icon ${className || ""}" src="assets/portal-icons/${encodeURIComponent(name)}.svg" alt="" aria-hidden="true" />`;
  }

  function initials(name) {
    return String(name || "Demo Member")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "DM";
  }

  function statusClass(value) {
    return String(value || "").toLowerCase().replace(/\s+/g, "-");
  }

  function sampleNote(message) {
    return `
      <div class="portal-sample-note" role="note">
        ${icon("info", "portal-icon-sm")}
        <span><strong>Sample data:</strong> ${escapeHTML(message)}</span>
      </div>
    `;
  }

  function showToast(message) {
    const toast = document.getElementById("portal-toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timeout);
    showToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 3400);
  }

  function getReturnTo() {
    const params = new URLSearchParams(window.location.search);
    return PortalStore.safeReturnTo(params.get("returnTo"));
  }

  function setFieldError(form, name, message) {
    const field = form.elements[name];
    const error = form.querySelector(`[data-error-for="${name}"]`);
    if (field) field.setAttribute("aria-invalid", message ? "true" : "false");
    if (field && error) {
      if (!error.id) error.id = `${field.id || name}-error`;
      field.setAttribute("aria-describedby", error.id);
      error.setAttribute("aria-live", "polite");
      error.textContent = message || "";
    }
  }

  function validateRequired(form, names) {
    let valid = true;
    names.forEach((name) => {
      const field = form.elements[name];
      if (!field) return;
      const value = typeof field.value === "string" ? field.value.trim() : "";
      const message = value ? "" : "This field is required.";
      setFieldError(form, name, message);
      if (message) valid = false;
    });
    return valid;
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
  }

  function bindPasswordToggles(scope) {
    scope.querySelectorAll("[data-password-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = document.getElementById(button.dataset.passwordToggle);
        if (!target) return;
        const shouldShow = target.type === "password";
        target.type = shouldShow ? "text" : "password";
        button.textContent = shouldShow ? "Hide" : "Show";
        button.setAttribute("aria-label", `${shouldShow ? "Hide" : "Show"} password`);
        button.setAttribute("aria-pressed", String(shouldShow));
      });
    });
  }

  function authAside() {
    return `
      <aside class="portal-auth-aside" aria-label="AI Living Labs portal introduction">
        <a class="portal-auth-brand" href="index.html" aria-label="AI Living Labs Foundation home">
          <img src="assets/logo.png" alt="AI Living Labs Foundation" />
        </a>
        <div class="portal-auth-message">
          <h1>A responsible AI workspace for Andhra Pradesh.</h1>
          <p>Access a guided innovation pathway, shared infrastructure, governed data and programme activity in one consistent workspace.</p>
        </div>
        <ul class="portal-auth-points">
          <li>${icon("security", "portal-icon-sm")} Governed access</li>
          <li>${icon("clusters", "portal-icon-sm")} Shared infrastructure</li>
          <li>${icon("tracks", "portal-icon-sm")} Four-track pathway</li>
        </ul>
      </aside>
    `;
  }

  function renderSignin() {
    if (PortalStore.getSession()) {
      window.location.replace(getReturnTo());
      return;
    }
    root.innerHTML = `
      <a class="portal-skip" href="#auth-main">Skip to sign in</a>
      <div class="portal-auth">
        ${authAside()}
        <main class="portal-auth-main" id="auth-main">
          <section class="portal-auth-panel" aria-labelledby="signin-title">
            <p class="portal-auth-kicker">Member portal</p>
            <h2 id="signin-title">Sign in</h2>
            <p class="portal-auth-intro">Use the demo form to open your AI Living Labs workspace.</p>
            <form class="portal-auth-form" id="signin-form" novalidate>
              <div class="portal-field">
                <label for="signin-email">Email address</label>
                <input class="portal-input" id="signin-email" name="email" type="email" autocomplete="email" placeholder="name@organisation.in" required />
                <p class="portal-field-error" data-error-for="email" aria-live="polite"></p>
              </div>
              <div class="portal-field">
                <label for="signin-password">Password</label>
                <div class="portal-password-wrap">
                  <input class="portal-input" id="signin-password" name="password" type="password" autocomplete="current-password" minlength="8" placeholder="Enter your password" required />
                  <button class="portal-password-toggle" type="button" data-password-toggle="signin-password" aria-label="Show password">Show</button>
                </div>
                <p class="portal-field-error" data-error-for="password" aria-live="polite"></p>
              </div>
              <div class="portal-form-meta">
                <label class="portal-checkbox"><input type="checkbox" name="remember" /> <span>Keep me signed in on this device</span></label>
                <button class="portal-text-link" type="button" id="forgot-password">Forgot password?</button>
              </div>
              <button class="portal-button portal-button-primary portal-button-full" type="submit">Sign in to workspace</button>
            </form>
            <p class="portal-auth-switch">New to AI Living Labs? <a class="portal-text-link" href="signup.html?returnTo=${encodeURIComponent(getReturnTo())}">Create an account</a></p>
            <div class="portal-security-note">
              ${icon("security", "portal-icon-sm")}
              <span>This preview never stores passwords. If selected, “Keep me signed in” stores only the demo name and email on this device.</span>
            </div>
          </section>
        </main>
      </div>
      <div class="portal-toast" id="portal-toast" role="status" aria-live="polite"></div>
    `;

    const form = document.getElementById("signin-form");
    bindPasswordToggles(root);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let valid = validateRequired(form, ["email", "password"]);
      if (form.email.value && !isValidEmail(form.email.value)) {
        setFieldError(form, "email", "Enter a valid email address.");
        valid = false;
      }
      if (form.password.value && form.password.value.length < 8) {
        setFieldError(form, "password", "Use at least 8 characters.");
        valid = false;
      }
      if (!valid) {
        form.querySelector('[aria-invalid="true"]')?.focus();
        return;
      }
      const emailName = form.email.value.split("@")[0].replace(/[._-]+/g, " ").trim();
      PortalStore.startSession({ name: emailName || "Demo Member", email: form.email.value }, form.remember.checked);
      window.location.assign(getReturnTo());
    });
    form.addEventListener("input", (event) => {
      if (event.target.name) setFieldError(form, event.target.name, "");
    });
    document.getElementById("forgot-password").addEventListener("click", () => {
      showToast("Password recovery is not connected in this static preview.");
    });
  }

  function renderSignup() {
    if (PortalStore.getSession()) {
      window.location.replace(getReturnTo());
      return;
    }
    root.innerHTML = `
      <a class="portal-skip" href="#auth-main">Skip to account form</a>
      <div class="portal-auth">
        ${authAside()}
        <main class="portal-auth-main" id="auth-main">
          <section class="portal-auth-panel" aria-labelledby="signup-title">
            <p class="portal-auth-kicker">Create an account</p>
            <h2 id="signup-title">Join the workspace</h2>
            <p class="portal-auth-intro">Complete three short steps to create a temporary preview account.</p>
            <ol class="portal-stepper" aria-label="Signup progress">
              <li class="portal-step active" data-step-indicator="1">Your details</li>
              <li class="portal-step" data-step-indicator="2">Access profile</li>
              <li class="portal-step" data-step-indicator="3">Review</li>
            </ol>
            <form class="portal-auth-form" id="signup-form" novalidate>
              <section class="portal-signup-step" data-signup-step="1" aria-label="Your details">
                <div class="portal-auth-form">
                  <div class="portal-auth-row">
                    <div class="portal-field">
                      <label for="signup-first-name">First name</label>
                      <input class="portal-input" id="signup-first-name" name="firstName" autocomplete="given-name" required />
                      <p class="portal-field-error" data-error-for="firstName" aria-live="polite"></p>
                    </div>
                    <div class="portal-field">
                      <label for="signup-last-name">Last name</label>
                      <input class="portal-input" id="signup-last-name" name="lastName" autocomplete="family-name" required />
                      <p class="portal-field-error" data-error-for="lastName" aria-live="polite"></p>
                    </div>
                  </div>
                  <div class="portal-field">
                    <label for="signup-email">Work or institutional email</label>
                    <input class="portal-input" id="signup-email" name="email" type="email" autocomplete="email" placeholder="name@organisation.in" required />
                    <p class="portal-field-error" data-error-for="email" aria-live="polite"></p>
                  </div>
                  <div class="portal-field">
                    <label for="signup-organization">Organisation or institution</label>
                    <input class="portal-input" id="signup-organization" name="organization" autocomplete="organization" required />
                    <p class="portal-field-error" data-error-for="organization" aria-live="polite"></p>
                  </div>
                  <div class="portal-step-actions">
                    <a class="portal-button portal-button-secondary" href="signin.html?returnTo=${encodeURIComponent(getReturnTo())}">Back to sign in</a>
                    <button class="portal-button portal-button-primary" type="button" data-next-step>Continue</button>
                  </div>
                </div>
              </section>
              <section class="portal-signup-step" data-signup-step="2" aria-label="Access profile" hidden>
                <div class="portal-auth-form">
                  <div class="portal-field">
                    <label for="signup-role">Primary role</label>
                    <select class="portal-select" id="signup-role" name="role" required>
                      <option value="">Select your role</option>
                      <option>Government professional</option>
                      <option>Researcher or faculty</option>
                      <option>Student or learner</option>
                      <option>Startup or industry professional</option>
                      <option>Programme partner</option>
                    </select>
                    <p class="portal-field-error" data-error-for="role" aria-live="polite"></p>
                  </div>
                  <div class="portal-field">
                    <label for="signup-password">Create password</label>
                    <div class="portal-password-wrap">
                      <input class="portal-input" id="signup-password" name="password" type="password" autocomplete="new-password" minlength="8" required />
                      <button class="portal-password-toggle" type="button" data-password-toggle="signup-password" aria-label="Show password">Show</button>
                    </div>
                    <p class="portal-field-hint">Use at least 8 characters. This preview never stores the password.</p>
                    <p class="portal-field-error" data-error-for="password" aria-live="polite"></p>
                  </div>
                  <div class="portal-field">
                    <label for="signup-confirm-password">Confirm password</label>
                    <div class="portal-password-wrap">
                      <input class="portal-input" id="signup-confirm-password" name="confirmPassword" type="password" autocomplete="new-password" required />
                      <button class="portal-password-toggle" type="button" data-password-toggle="signup-confirm-password" aria-label="Show password">Show</button>
                    </div>
                    <p class="portal-field-error" data-error-for="confirmPassword" aria-live="polite"></p>
                  </div>
                  <div class="portal-step-actions">
                    <button class="portal-button portal-button-secondary" type="button" data-previous-step>Back</button>
                    <button class="portal-button portal-button-primary" type="button" data-next-step>Review account</button>
                  </div>
                </div>
              </section>
              <section class="portal-signup-step" data-signup-step="3" aria-label="Review account" hidden>
                <div class="portal-review" id="signup-review"></div>
                <label class="portal-checkbox">
                  <input type="checkbox" name="agreement" required />
                  <span>I confirm that the information is correct and agree to responsible use of the AI Living Labs preview workspace.</span>
                </label>
                <p class="portal-field-error" data-error-for="agreement" aria-live="polite"></p>
                <div class="portal-step-actions">
                  <button class="portal-button portal-button-secondary" type="button" data-previous-step>Back</button>
                  <button class="portal-button portal-button-primary" type="submit">Create account</button>
                </div>
              </section>
            </form>
            <div class="portal-security-note">
              ${icon("security", "portal-icon-sm")}
              <span>Account details are held only in this browser tab for demonstration. No information is sent to a server.</span>
            </div>
          </section>
        </main>
      </div>
      <div class="portal-toast" id="portal-toast" role="status" aria-live="polite"></div>
    `;

    const form = document.getElementById("signup-form");
    let currentStep = 1;

    function updateStep(nextStep) {
      currentStep = nextStep;
      form.querySelectorAll("[data-signup-step]").forEach((section) => {
        section.hidden = Number(section.dataset.signupStep) !== currentStep;
      });
      root.querySelectorAll("[data-step-indicator]").forEach((indicator) => {
        const value = Number(indicator.dataset.stepIndicator);
        indicator.classList.toggle("active", value === currentStep);
        indicator.classList.toggle("complete", value < currentStep);
        indicator.setAttribute("aria-current", value === currentStep ? "step" : "false");
      });
      root.querySelector(`[data-signup-step="${currentStep}"] input, [data-signup-step="${currentStep}"] select`)?.focus();
    }

    function validateStep(step) {
      let valid = true;
      if (step === 1) {
        valid = validateRequired(form, ["firstName", "lastName", "email", "organization"]);
        if (form.email.value && !isValidEmail(form.email.value)) {
          setFieldError(form, "email", "Enter a valid email address.");
          valid = false;
        }
      }
      if (step === 2) {
        valid = validateRequired(form, ["role", "password", "confirmPassword"]);
        if (form.password.value && form.password.value.length < 8) {
          setFieldError(form, "password", "Use at least 8 characters.");
          valid = false;
        }
        if (form.confirmPassword.value && form.password.value !== form.confirmPassword.value) {
          setFieldError(form, "confirmPassword", "Passwords do not match.");
          valid = false;
        }
      }
      if (!valid) form.querySelector(`[data-signup-step="${step}"] [aria-invalid="true"]`)?.focus();
      return valid;
    }

    function updateReview() {
      document.getElementById("signup-review").innerHTML = `
        <div class="portal-review-row"><span>Name</span><strong>${escapeHTML(`${form.firstName.value} ${form.lastName.value}`)}</strong></div>
        <div class="portal-review-row"><span>Email</span><strong>${escapeHTML(form.email.value)}</strong></div>
        <div class="portal-review-row"><span>Organisation</span><strong>${escapeHTML(form.organization.value)}</strong></div>
        <div class="portal-review-row"><span>Role</span><strong>${escapeHTML(form.role.value)}</strong></div>
      `;
    }

    bindPasswordToggles(root);
    form.querySelectorAll("[data-next-step]").forEach((button) => {
      button.addEventListener("click", () => {
        if (!validateStep(currentStep)) return;
        if (currentStep === 2) updateReview();
        updateStep(Math.min(3, currentStep + 1));
      });
    });
    form.querySelectorAll("[data-previous-step]").forEach((button) => {
      button.addEventListener("click", () => updateStep(Math.max(1, currentStep - 1)));
    });
    form.addEventListener("input", (event) => {
      if (event.target.name) setFieldError(form, event.target.name, "");
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.agreement.checked) {
        setFieldError(form, "agreement", "Confirm the responsible-use statement to continue.");
        form.agreement.focus();
        return;
      }
      const name = `${form.firstName.value.trim()} ${form.lastName.value.trim()}`.trim();
      PortalStore.startSession({ name, email: form.email.value });
      PortalStore.saveProfile({
        name,
        email: form.email.value,
        organization: form.organization.value,
        role: form.role.value,
        phone: "",
        city: "Amaravati"
      });
      window.location.assign(getReturnTo());
    });
  }

  function sidebar(session) {
    const activePage = page === "track" ? "tracks" : page;
    return `
      <aside class="portal-sidebar" id="portal-sidebar" aria-label="Workspace navigation">
        <a class="portal-sidebar-brand" href="dashboard.html" aria-label="AI Living Labs portal overview">
          <img src="assets/logo.png" alt="AI Living Labs Foundation" />
        </a>
        <button class="portal-drawer-close" type="button" data-close-drawer data-drawer-close-control aria-label="Close navigation">×</button>
        <nav class="portal-nav">
          ${PortalData.navigation.map((item) => `
            <a class="portal-nav-link ${item.id === activePage ? "active" : ""}" href="${item.href}" ${item.id === activePage ? 'aria-current="page"' : ""}>
              ${icon(item.icon)}
              <span>${escapeHTML(item.label)}</span>
            </a>
          `).join("")}
        </nav>
        <div class="portal-sidebar-footer">
          <div class="portal-sidebar-user">
            <div class="portal-avatar" data-session-avatar aria-hidden="true">${escapeHTML(initials(session.name))}</div>
            <div class="portal-sidebar-user-copy">
              <strong data-session-name>${escapeHTML(session.name)}</strong>
              <span data-session-email>${escapeHTML(session.email)}</span>
            </div>
            <button class="portal-signout-icon" type="button" data-signout>Sign out</button>
          </div>
        </div>
      </aside>
      <button class="portal-drawer-scrim" type="button" data-close-drawer tabindex="-1" aria-hidden="true" aria-label="Close navigation overlay"></button>
    `;
  }

  function topbar() {
    return `
      <header class="portal-topbar">
        <div class="portal-topbar-title">
          <button class="portal-mobile-menu" type="button" data-open-drawer aria-controls="portal-sidebar" aria-expanded="false" aria-label="Open navigation"><span></span></button>
          <strong>${escapeHTML(titleMap[page] || "AI Living Labs Portal")}</strong>
          <span class="portal-environment">Preview workspace</span>
        </div>
        <div class="portal-topbar-actions">
          <a class="portal-button portal-button-secondary" href="index.html">Public website</a>
          <a class="portal-icon-button" href="support.html" aria-label="Open support">${icon("support", "portal-icon-sm")}</a>
        </div>
      </header>
    `;
  }

  function dashboardPage(session) {
    const totalProgress = Math.round(PortalData.tracks.reduce((sum, track) => sum + track.progress, 0) / PortalData.tracks.length);
    return `
      <div class="portal-page">
        <section class="portal-welcome" aria-labelledby="welcome-title">
          <div class="portal-welcome-copy">
            <h1 id="welcome-title">Welcome, ${escapeHTML(session.name.split(" ")[0] || "Member")}</h1>
            <p>Continue your proposed four-track pathway and review the sample infrastructure, usage and account information in your workspace.</p>
          </div>
          <div class="portal-welcome-meta" aria-label="Workspace summary">
            <div class="portal-welcome-stat"><span>Pathway progress · Sample</span><strong>${totalProgress}%</strong></div>
            <div class="portal-welcome-stat"><span>Active clusters · Sample</span><strong>03</strong></div>
          </div>
        </section>
        ${sampleNote("Resource, progress, activity, usage and billing values below are illustrative and are not connected to live infrastructure.")}
        <section class="portal-metric-strip" aria-label="Sample workspace metrics">
          <div class="portal-metric">
            <div class="portal-metric-top"><span class="portal-metric-icon">${icon("compute")}</span><span class="portal-sample-label">Sample</span></div>
            <p class="portal-metric-label">Allocated vCPU</p><strong class="portal-metric-value">406</strong>
          </div>
          <div class="portal-metric">
            <div class="portal-metric-top"><span class="portal-metric-icon">${icon("clusters")}</span><span class="portal-sample-label">Sample</span></div>
            <p class="portal-metric-label">Running clusters</p><strong class="portal-metric-value">03</strong>
          </div>
          <div class="portal-metric">
            <div class="portal-metric-top"><span class="portal-metric-icon">${icon("tracks")}</span><span class="portal-sample-label">Sample</span></div>
            <p class="portal-metric-label">Pathway progress</p><strong class="portal-metric-value">${totalProgress}%</strong>
          </div>
          <div class="portal-metric">
            <div class="portal-metric-top"><span class="portal-metric-icon">${icon("billing")}</span><span class="portal-sample-label">Sample</span></div>
            <p class="portal-metric-label">Projected this month</p><strong class="portal-metric-value">₹12,480</strong>
          </div>
        </section>
        <div class="portal-overview-grid" style="margin-top:20px">
          <section class="portal-panel portal-panel-pad">
            <div class="portal-section-title">
              <div><h2>Proposed four-track pathway</h2><p>Illustrative progress across the programme workflow</p></div>
              <a class="portal-text-link" href="tracks.html">View all tracks</a>
            </div>
            <div class="portal-track-progress">
              ${PortalData.tracks.map((track) => `
                <a class="portal-progress-row" href="track.html?id=${encodeURIComponent(track.id)}">
                  <div>
                    <div class="portal-progress-label"><strong>${escapeHTML(track.title)}</strong><span>${escapeHTML(track.shortTitle)}</span></div>
                    <div class="portal-progress-bar"><span style="--progress:${track.progress}%"></span></div>
                  </div>
                  <span class="portal-progress-value">${track.progress}%</span>
                </a>
              `).join("")}
            </div>
          </section>
          <section class="portal-panel portal-panel-pad">
            <div class="portal-section-title"><div><h2>Recent activity</h2><p>Sample workspace events</p></div><span class="portal-sample-label">Sample</span></div>
            <div class="portal-activity">
              ${PortalData.activity.map((item) => `
                <div class="portal-activity-item">
                  <span class="portal-activity-icon">${icon(item.icon, "portal-icon-sm")}</span>
                  <div class="portal-activity-copy"><strong>${escapeHTML(item.title)}</strong><p>${escapeHTML(item.detail)}</p><time>${escapeHTML(item.time)}</time></div>
                </div>
              `).join("")}
            </div>
          </section>
        </div>
        <section style="margin-top:26px">
          <div class="portal-section-title"><div><h2>Workspace shortcuts</h2><p>Move directly to frequently used areas</p></div></div>
          <div class="portal-action-list">
            <a class="portal-action-card" href="usage.html">${icon("clusters")}<span>Review cluster usage</span></a>
            <a class="portal-action-card" href="tracks.html">${icon("tracks")}<span>Open the proposed pathway</span></a>
            <a class="portal-action-card" href="support.html">${icon("support")}<span>Request support</span></a>
          </div>
        </section>
      </div>
    `;
  }

  function tracksPage() {
    return `
      <div class="portal-page">
        <header class="portal-page-header">
          <div class="portal-page-header-copy">
            <h1>Four-track pathway</h1>
            <p>A proposed demo pathway that connects the current AI Living Labs website capabilities into a clear sequence: Innovate, Build, Compute and Data.</p>
          </div>
        </header>
        ${sampleNote("This four-track grouping and progress are proposed for the portal demonstration and are not an official programme classification.")}
        <div class="portal-track-journey" aria-label="Proposed four-track sequence">
          ${PortalData.tracks.map((track) => `
            <a class="portal-journey-step" href="track.html?id=${encodeURIComponent(track.id)}">
              <span class="portal-journey-number">${escapeHTML(track.number)}</span>
              <span><strong>${escapeHTML(track.title)}</strong><span>${escapeHTML(track.progress)}% sample progress</span></span>
            </a>
          `).join("")}
        </div>
        <div class="portal-track-grid">
          ${PortalData.tracks.map((track) => `
            <article class="portal-track-card">
              <div class="portal-track-card-top"><span class="portal-track-number">TRACK ${escapeHTML(track.number)} · PROPOSED</span><span class="portal-track-icon">${icon(track.icon)}</span></div>
              <h2>${escapeHTML(track.title)}</h2>
              <p>${escapeHTML(track.description)}</p>
              <div class="portal-track-card-footer">
                <div class="portal-track-card-progress">
                  <span>Sample progress · ${track.progress}%</span>
                  <div class="portal-progress-bar"><span style="--progress:${track.progress}%"></span></div>
                </div>
                <a class="portal-button portal-button-quiet" href="track.html?id=${encodeURIComponent(track.id)}">View track</a>
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    `;
  }

  function trackPage() {
    const params = new URLSearchParams(window.location.search);
    const track = PortalData.tracks.find((item) => item.id === params.get("id")) || PortalData.tracks[0];
    return `
      <div class="portal-page">
        <a class="portal-text-link portal-back-link" href="tracks.html">${icon("chevron", "portal-back-icon")} Back to four-track pathway</a>
        <section class="portal-detail-hero" style="margin-top:20px">
          <div>
            <span class="portal-detail-number">PROPOSED TRACK ${escapeHTML(track.number)}</span>
            <h1>${escapeHTML(track.title)}</h1>
            <p>${escapeHTML(track.description)}</p>
          </div>
          <div class="portal-detail-progress">
            <div class="portal-progress-ring" style="--progress:${track.progress}" aria-label="${track.progress} percent sample progress"><span>${track.progress}%</span></div>
            <span class="portal-progress-ring-label">Sample pathway progress</span>
          </div>
        </section>
        ${sampleNote("Track structure, module states and progress are proposed sample content for this portal preview.")}
        <div class="portal-grid portal-grid-two">
          <section class="portal-panel portal-panel-pad">
            <div class="portal-section-title"><div><h2>Track steps</h2><p>A guided sequence based on current platform capabilities</p></div></div>
            <div class="portal-module-list">
              ${track.modules.map((module, index) => `
                <div class="portal-module ${statusClass(module.state)}">
                  <span class="portal-module-state-icon">${module.state === "Completed" ? icon("check", "portal-icon-sm") : `<strong>${index + 1}</strong>`}</span>
                  <div class="portal-module-copy"><strong>${escapeHTML(module.title)}</strong><span>${escapeHTML(module.detail)}</span></div>
                  <span class="portal-status portal-status-${statusClass(module.state)}">${escapeHTML(module.state)}</span>
                </div>
              `).join("")}
            </div>
          </section>
          <div class="portal-stack">
            <section class="portal-panel portal-panel-pad">
              <div class="portal-section-title"><div><h2>Expected outcome</h2></div></div>
              <div class="portal-outcome">${icon("info", "portal-icon-sm")}<div><strong>Proposed outcome</strong>${escapeHTML(track.outcome)}</div></div>
            </section>
            <section class="portal-panel portal-panel-pad">
              <div class="portal-section-title"><div><h2>Related workspace</h2><p>Continue with supporting portal areas</p></div></div>
              <div class="portal-action-list">
                <a class="portal-action-card" href="usage.html">${icon("usage")}<span>Usage</span></a>
                <a class="portal-action-card" href="support.html">${icon("support")}<span>Support</span></a>
                <a class="portal-action-card" href="tracks.html">${icon("tracks")}<span>All tracks</span></a>
              </div>
            </section>
          </div>
        </div>
      </div>
    `;
  }

  function resourceCard(resource) {
    const total = resource.allocated + resource.available;
    const percent = Math.round(resource.allocated / total * 100);
    return `
      <div class="portal-resource">
        <div class="portal-donut" style="--allocated-pct:${percent}%;--donut-color:${resource.color}" role="img" aria-label="${escapeHTML(resource.label)}: ${resource.allocated} allocated and ${resource.available} available">
          <div class="portal-donut-copy"><strong>${escapeHTML(resource.label)}</strong><span>${escapeHTML(resource.unit)}</span></div>
        </div>
        <div class="portal-resource-legend">
          <div class="portal-legend-row"><span class="portal-legend-label"><i class="portal-legend-dot" style="background:${resource.color}"></i>Allocated</span><strong>${resource.allocated}</strong></div>
          <div class="portal-legend-row"><span class="portal-legend-label"><i class="portal-legend-dot available"></i>Available</span><strong>${resource.available}</strong></div>
        </div>
      </div>
    `;
  }

  function clusterRows(clusters) {
    if (!clusters.length) return `<tr><td class="portal-table-empty" colspan="11">No sample clusters match the selected filters.</td></tr>`;
    return clusters.map((cluster) => `
      <tr>
        <td><a class="portal-table-link" href="usage.html#cluster-table">${escapeHTML(cluster.name)}</a></td>
        <td>${escapeHTML(cluster.id)}</td>
        <td>${escapeHTML(cluster.version)}</td>
        <td>${escapeHTML(cluster.location)}</td>
        <td>${escapeHTML(cluster.project)}</td>
        <td><span class="portal-status portal-status-${statusClass(cluster.status)}">${escapeHTML(cluster.status)}</span></td>
        <td>${escapeHTML(cluster.network)}</td>
        <td>${cluster.master}</td>
        <td>${cluster.worker}</td>
        <td>${escapeHTML(cluster.sshKey)}</td>
        <td><button class="portal-row-action" type="button" data-cluster-action="${escapeHTML(cluster.id)}" aria-label="Open actions for ${escapeHTML(cluster.name)}">${icon("more", "portal-icon-sm")}</button></td>
      </tr>
    `).join("");
  }

  function usagePage() {
    const locationOptions = [...new Set(PortalData.clusters.map((cluster) => cluster.location))];
    const statusOptions = [...new Set(PortalData.clusters.map((cluster) => cluster.status))];
    return `
      <div class="portal-page">
        <header class="portal-page-header">
          <div class="portal-page-header-copy">
            <h1>Usage & clusters</h1>
            <p>Review the sample project allocation and cluster list in a clear infrastructure workspace based on the supplied reference flow.</p>
          </div>
          <div class="portal-header-actions">
            <button class="portal-button portal-button-secondary" type="button" id="download-clusters">${icon("download", "portal-icon-sm")} Download sample CSV</button>
          </div>
        </header>
        ${sampleNote("Every resource value, network address, cluster record and allocation shown on this page is illustrative. No live infrastructure is connected.")}
        <section class="portal-resource-layout" aria-label="Sample project resources">
          <div class="portal-panel portal-project-summary">
            <div><h2>Living Labs workspace</h2><p>Shared infrastructure · Sample data</p></div>
            <div class="portal-project-meta">
              <div><span>Project ID</span><strong>AILL-DEMO-AP-2026</strong></div>
              <div><span>Created on</span><strong>20 Jul 2026</strong></div>
            </div>
            <div class="portal-project-counts">
              <div class="portal-project-count"><span>Instances</span><strong>150</strong></div>
              <div class="portal-project-count"><span>Clusters</span><strong>04</strong></div>
              <div class="portal-project-count"><span>Users</span><strong>05</strong></div>
            </div>
          </div>
          <div class="portal-panel portal-resources">
            ${PortalData.resources.map(resourceCard).join("")}
          </div>
        </section>
        <section class="portal-panel" id="cluster-table">
          <div class="portal-section-title" style="padding:20px 18px 0">
            <div><h2>Shared GPU clusters (<span id="cluster-count">${PortalData.clusters.length}</span>)</h2><p>Sample cluster inventory</p></div>
            <span class="portal-sample-label">Sample data</span>
          </div>
          <div class="portal-table-toolbar">
            <div class="portal-filter-group">
              <div class="portal-search">${icon("search", "portal-icon-sm")}<label class="portal-visually-hidden" for="cluster-search">Search clusters</label><input class="portal-input" id="cluster-search" type="search" placeholder="Search clusters" /></div>
              <label class="portal-visually-hidden" for="cluster-location">Filter by location</label>
              <select class="portal-select" id="cluster-location"><option value="">All locations</option>${locationOptions.map((value) => `<option>${escapeHTML(value)}</option>`).join("")}</select>
              <label class="portal-visually-hidden" for="cluster-status">Filter by status</label>
              <select class="portal-select" id="cluster-status"><option value="">All statuses</option>${statusOptions.map((value) => `<option>${escapeHTML(value)}</option>`).join("")}</select>
            </div>
          </div>
          <div class="portal-table-wrap">
            <table class="portal-table">
              <caption class="portal-visually-hidden">Sample AI Living Labs shared GPU cluster usage</caption>
              <thead><tr><th>Name</th><th>Cluster ID</th><th>Version</th><th>Location</th><th>Project</th><th>Status</th><th>Network</th><th>Master nodes</th><th>Worker nodes</th><th>SSH key</th><th aria-label="Actions"></th></tr></thead>
              <tbody id="cluster-rows">${clusterRows(PortalData.clusters)}</tbody>
            </table>
          </div>
        </section>
      </div>
    `;
  }

  function billingPage() {
    return `
      <div class="portal-page">
        <header class="portal-page-header">
          <div class="portal-page-header-copy">
            <h1>Billing</h1>
            <p>View sample plan, projected usage cost and invoice history for the preview workspace.</p>
          </div>
        </header>
        ${sampleNote("All prices, cost breakdowns, payment states and invoices are illustrative. This preview does not process payments.")}
        <section class="portal-billing-summary" aria-label="Sample billing summary">
          <div class="portal-billing-stat"><span>Projected this month · Sample</span><strong>₹12,480</strong><p>Estimated from sample infrastructure usage through 31 Jul 2026</p></div>
          <div class="portal-billing-stat"><span>Current plan · Sample</span><strong>Shared Research</strong><p>Illustrative workspace allocation</p></div>
          <div class="portal-billing-stat"><span>Billing status · Sample</span><strong>Current</strong><p>No live payment method connected</p></div>
        </section>
        <div class="portal-grid portal-grid-two">
          <section class="portal-panel portal-panel-pad">
            <div class="portal-section-title"><div><h2>Cost breakdown</h2><p>Sample projected allocation</p></div><span class="portal-sample-label">Sample</span></div>
            <div class="portal-breakdown">
              <div class="portal-breakdown-row"><span>Compute</span><div class="portal-breakdown-bar"><i style="--value:78%"></i></div><strong>₹7,240</strong></div>
              <div class="portal-breakdown-row"><span>Storage</span><div class="portal-breakdown-bar"><i style="--value:48%"></i></div><strong>₹2,680</strong></div>
              <div class="portal-breakdown-row"><span>Network</span><div class="portal-breakdown-bar"><i style="--value:31%"></i></div><strong>₹1,460</strong></div>
              <div class="portal-breakdown-row"><span>Services</span><div class="portal-breakdown-bar"><i style="--value:24%"></i></div><strong>₹1,100</strong></div>
            </div>
          </section>
          <section class="portal-panel portal-panel-pad">
            <div class="portal-section-title"><div><h2>Billing contact</h2><p>Temporary preview profile</p></div></div>
              <div class="portal-outcome">${icon("billing", "portal-icon-sm")}<div><strong>AI Living Labs Foundation</strong>Programme workspace · Amaravati, Andhra Pradesh<br />Billing contact · Not connected in preview</div></div>
          </section>
        </div>
        <section class="portal-panel" style="margin-top:20px">
          <div class="portal-section-title" style="padding:20px 20px 4px"><div><h2>Invoice history</h2><p>Sample billing documents</p></div><span class="portal-sample-label">Sample data</span></div>
          <div class="portal-table-wrap">
            <table class="portal-table">
              <caption class="portal-visually-hidden">Sample invoice history</caption>
              <thead><tr><th>Invoice</th><th>Period</th><th>Issued</th><th>Amount</th><th>Status</th><th>Receipt</th></tr></thead>
              <tbody>${PortalData.invoices.map((invoice) => `
                <tr><td><strong>${escapeHTML(invoice.id)}</strong></td><td>${escapeHTML(invoice.period)}</td><td>${escapeHTML(invoice.issued)}</td><td>${escapeHTML(invoice.amount)}</td><td><span class="portal-status portal-status-${statusClass(invoice.status)}">${escapeHTML(invoice.status)}</span></td><td><button class="portal-button portal-button-quiet" type="button" data-invoice-download="${escapeHTML(invoice.id)}">${icon("download", "portal-icon-sm")} Sample receipt</button></td></tr>
              `).join("")}</tbody>
            </table>
          </div>
        </section>
      </div>
    `;
  }

  function profilePage() {
    const profile = PortalStore.getProfile();
    return `
      <div class="portal-page">
        <header class="portal-page-header">
          <div class="portal-page-header-copy"><h1>Profile</h1><p>Review the temporary account details used in this browser session.</p></div>
        </header>
        <div class="portal-profile-layout">
          <aside class="portal-panel portal-profile-card">
            <div class="portal-profile-avatar" data-profile-avatar aria-hidden="true">${escapeHTML(initials(profile.name))}</div>
            <h2 data-profile-name>${escapeHTML(profile.name)}</h2>
            <p data-profile-email>${escapeHTML(profile.email)}</p>
            <dl>
              <div><dt>Organisation</dt><dd data-profile-organization>${escapeHTML(profile.organization)}</dd></div>
              <div><dt>Role</dt><dd data-profile-role>${escapeHTML(profile.role)}</dd></div>
              <div><dt>Account type</dt><dd>Temporary preview</dd></div>
            </dl>
          </aside>
          <section class="portal-panel portal-panel-pad">
            <div class="portal-section-title"><div><h2>Personal information</h2><p>Saved only for the current browser tab</p></div></div>
            <form id="profile-form" novalidate>
              <div class="portal-form-grid">
                <div class="portal-field"><label for="profile-name">Full name</label><input class="portal-input" id="profile-name" name="name" value="${escapeHTML(profile.name)}" required /><p class="portal-field-error" data-error-for="name"></p></div>
                <div class="portal-field"><label for="profile-email">Email address</label><input class="portal-input" id="profile-email" name="email" type="email" value="${escapeHTML(profile.email)}" required /><p class="portal-field-error" data-error-for="email"></p></div>
                <div class="portal-field"><label for="profile-organization">Organisation</label><input class="portal-input" id="profile-organization" name="organization" value="${escapeHTML(profile.organization)}" required /><p class="portal-field-error" data-error-for="organization"></p></div>
                <div class="portal-field"><label for="profile-role">Role</label><input class="portal-input" id="profile-role" name="role" value="${escapeHTML(profile.role)}" required /><p class="portal-field-error" data-error-for="role"></p></div>
                <div class="portal-field"><label for="profile-phone">Phone number</label><input class="portal-input" id="profile-phone" name="phone" type="tel" value="${escapeHTML(profile.phone)}" placeholder="+91" /></div>
                <div class="portal-field"><label for="profile-city">City</label><input class="portal-input" id="profile-city" name="city" value="${escapeHTML(profile.city)}" /></div>
              </div>
              <div class="portal-form-actions"><button class="portal-button portal-button-primary" type="submit">Save profile</button></div>
            </form>
          </section>
        </div>
        <section class="portal-panel portal-panel-pad" style="margin-top:20px">
          <div class="portal-section-title"><div><h2>Session controls</h2><p>This static preview stores no permanent account data</p></div></div>
          <button class="portal-button portal-button-danger" type="button" data-signout>Sign out and clear session</button>
        </section>
      </div>
    `;
  }

  function supportPage() {
    return `
      <div class="portal-page">
        <header class="portal-page-header">
          <div class="portal-page-header-copy"><h1>Support</h1><p>Describe an access, track, infrastructure or data question for the AI Living Labs preview team.</p></div>
        </header>
        <div class="portal-support-grid">
          <section class="portal-panel portal-panel-pad">
            <div class="portal-section-title"><div><h2>Submit a request</h2><p>Demo form — no message leaves this browser</p></div></div>
            <form id="support-form" novalidate>
              <div class="portal-form-grid">
                <div class="portal-field"><label for="support-topic">Topic</label><select class="portal-select" id="support-topic" name="topic" required><option value="">Select a topic</option><option>Account access</option><option>Four-track pathway</option><option>Infrastructure and usage</option><option>Governed data</option><option>Billing preview</option></select><p class="portal-field-error" data-error-for="topic"></p></div>
                <div class="portal-field"><label for="support-priority">Priority</label><select class="portal-select" id="support-priority" name="priority" required><option value="">Select priority</option><option>Standard</option><option>Important</option><option>Urgent access issue</option></select><p class="portal-field-error" data-error-for="priority"></p></div>
              </div>
              <div class="portal-field" style="margin-top:17px"><label for="support-subject">Subject</label><input class="portal-input" id="support-subject" name="subject" required /><p class="portal-field-error" data-error-for="subject"></p></div>
              <div class="portal-field" style="margin-top:17px"><label for="support-message">How can we help?</label><textarea class="portal-textarea" id="support-message" name="message" placeholder="Include the page, action and any relevant context." required></textarea><p class="portal-field-error" data-error-for="message"></p></div>
              <div class="portal-form-actions"><button class="portal-button portal-button-primary" type="submit">Submit demo request</button></div>
            </form>
          </section>
          <aside class="portal-support-options">
            <div class="portal-support-option"><span class="portal-support-option-icon">${icon("security")}</span><div><strong>Access and security</strong><p>Sign-in, profile and governed workspace access questions.</p></div></div>
            <div class="portal-support-option"><span class="portal-support-option-icon">${icon("clusters")}</span><div><strong>Infrastructure</strong><p>Shared compute, cluster allocation and usage guidance.</p></div></div>
            <div class="portal-support-option"><span class="portal-support-option-icon">${icon("database")}</span><div><strong>Governed data</strong><p>Dataset access, contribution and responsible-use support.</p></div></div>
            <div class="portal-support-option"><span class="portal-support-option-icon">${icon("tracks")}</span><div><strong>Programme pathway</strong><p>Proposed Innovate, Build, Compute and Data track guidance.</p></div></div>
          </aside>
        </div>
      </div>
    `;
  }

  function renderProtectedPage() {
    const session = PortalStore.getSession();
    if (!session) {
      const current = `${page}.html${page === "track" ? window.location.search : ""}`;
      window.location.replace(`signin.html?returnTo=${encodeURIComponent(PortalStore.safeReturnTo(current))}`);
      return;
    }

    const renderers = {
      dashboard: () => dashboardPage(session),
      tracks: tracksPage,
      track: trackPage,
      usage: usagePage,
      billing: billingPage,
      profile: profilePage,
      support: supportPage
    };

    root.innerHTML = `
      <a class="portal-skip" href="#portal-main">Skip to content</a>
      <div class="portal-shell">
        ${sidebar(session)}
        <div class="portal-workspace">
          ${topbar()}
          <main id="portal-main">${(renderers[page] || renderers.dashboard)()}</main>
        </div>
      </div>
      <div class="portal-toast" id="portal-toast" role="status" aria-live="polite"></div>
    `;
    bindShell();
    bindPageInteractions();
  }

  function bindShell() {
    const openButton = root.querySelector("[data-open-drawer]");
    const closeButtons = [...root.querySelectorAll("[data-close-drawer]")];
    const drawerCloseControl = root.querySelector("[data-drawer-close-control]");
    const sidebarElement = root.querySelector("#portal-sidebar");
    const workspace = root.querySelector(".portal-workspace");

    function setDrawer(open) {
      document.body.classList.toggle("portal-drawer-open", open);
      openButton?.setAttribute("aria-expanded", String(open));
      if (workspace) {
        if (open) workspace.setAttribute("inert", "");
        else workspace.removeAttribute("inert");
      }
      if (open) drawerCloseControl?.focus();
      else openButton?.focus();
    }

    openButton?.addEventListener("click", () => setDrawer(true));
    closeButtons.forEach((button) => button.addEventListener("click", () => setDrawer(false)));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && document.body.classList.contains("portal-drawer-open")) setDrawer(false);
      if (event.key === "Tab" && document.body.classList.contains("portal-drawer-open") && sidebarElement) {
        const focusable = [...sidebarElement.querySelectorAll('a[href], button:not([disabled])')];
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
    root.querySelectorAll("[data-signout]").forEach((button) => {
      button.addEventListener("click", () => {
        PortalStore.endSession();
        window.location.assign("signin.html");
      });
    });
  }

  function bindUsage() {
    const search = document.getElementById("cluster-search");
    const location = document.getElementById("cluster-location");
    const status = document.getElementById("cluster-status");
    const rows = document.getElementById("cluster-rows");

    function filteredClusters() {
      const term = String(search?.value || "").trim().toLowerCase();
      return PortalData.clusters.filter((cluster) => {
        const matchesTerm = !term || Object.values(cluster).join(" ").toLowerCase().includes(term);
        const matchesLocation = !location?.value || cluster.location === location.value;
        const matchesStatus = !status?.value || cluster.status === status.value;
        return matchesTerm && matchesLocation && matchesStatus;
      });
    }

    function updateRows() {
      const filtered = filteredClusters();
      rows.innerHTML = clusterRows(filtered);
      const count = document.getElementById("cluster-count");
      if (count) count.textContent = String(filtered.length);
      bindClusterActions();
    }

    function bindClusterActions() {
      rows.querySelectorAll("[data-cluster-action]").forEach((button) => {
        button.addEventListener("click", () => showToast(`Cluster actions for ${button.dataset.clusterAction} are not connected in this static preview.`));
      });
    }

    search?.addEventListener("input", updateRows);
    location?.addEventListener("change", updateRows);
    status?.addEventListener("change", updateRows);
    bindClusterActions();

    document.getElementById("download-clusters")?.addEventListener("click", () => {
      const headers = ["Name", "Cluster ID", "Version", "Location", "Project", "Status", "Network", "Master nodes", "Worker nodes", "SSH key"];
      const lines = filteredClusters().map((cluster) => [cluster.name, cluster.id, cluster.version, cluster.location, cluster.project, cluster.status, cluster.network, cluster.master, cluster.worker, cluster.sshKey]);
      const csv = [headers, ...lines].map((line) => line.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\n");
      const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = "ai-living-labs-sample-clusters.csv";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      showToast("Sample cluster CSV downloaded.");
    });
  }

  function bindBilling() {
    root.querySelectorAll("[data-invoice-download]").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.dataset.invoiceDownload;
        const invoice = PortalData.invoices.find((item) => item.id === id);
        if (!invoice) return;
        const content = [
          "AI Living Labs Foundation — SAMPLE RECEIPT",
          "This is illustrative data and is not a tax invoice.",
          "",
          `Invoice: ${invoice.id}`,
          `Period: ${invoice.period}`,
          `Issued: ${invoice.issued}`,
          `Amount: ${invoice.amount}`,
          `Status: ${invoice.status}`
        ].join("\n");
        const url = URL.createObjectURL(new Blob([content], { type: "text/plain;charset=utf-8" }));
        const link = document.createElement("a");
        link.href = url;
        link.download = `${invoice.id}-sample.txt`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
        showToast("Sample receipt downloaded.");
      });
    });
  }

  function bindProfile() {
    const form = document.getElementById("profile-form");
    if (!form) return;
    form.addEventListener("input", (event) => {
      if (event.target.name) setFieldError(form, event.target.name, "");
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let valid = validateRequired(form, ["name", "email", "organization", "role"]);
      if (form.email.value && !isValidEmail(form.email.value)) {
        setFieldError(form, "email", "Enter a valid email address.");
        valid = false;
      }
      if (!valid) {
        form.querySelector('[aria-invalid="true"]')?.focus();
        return;
      }
      const saved = PortalStore.saveProfile({
        name: form.elements.name.value,
        email: form.elements.email.value,
        organization: form.elements.organization.value,
        role: form.elements.role.value,
        phone: form.elements.phone.value,
        city: form.elements.city.value
      });
      root.querySelector("[data-profile-avatar]").textContent = initials(saved.name);
      root.querySelector("[data-profile-name]").textContent = saved.name;
      root.querySelector("[data-profile-email]").textContent = saved.email;
      root.querySelector("[data-profile-organization]").textContent = saved.organization;
      root.querySelector("[data-profile-role]").textContent = saved.role;
      root.querySelector("[data-session-avatar]").textContent = initials(saved.name);
      root.querySelector("[data-session-name]").textContent = saved.name;
      root.querySelector("[data-session-email]").textContent = saved.email;
      showToast("Profile saved for this browser session.");
    });
  }

  function bindSupport() {
    const form = document.getElementById("support-form");
    if (!form) return;
    form.addEventListener("input", (event) => {
      if (event.target.name) setFieldError(form, event.target.name, "");
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validateRequired(form, ["topic", "priority", "subject", "message"])) {
        form.querySelector('[aria-invalid="true"]')?.focus();
        return;
      }
      form.reset();
      showToast("Demo form cleared. No message was sent or stored.");
    });
  }

  function bindPageInteractions() {
    if (page === "usage") bindUsage();
    if (page === "billing") bindBilling();
    if (page === "profile") bindProfile();
    if (page === "support") bindSupport();
  }

  if (authPages.has(page)) {
    if (page === "signin") renderSignin();
    else renderSignup();
  } else {
    renderProtectedPage();
  }
})();
