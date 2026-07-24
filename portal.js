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
    "cluster-create": "Create OpenShift cluster",
    "cluster-detail": "Cluster details",
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

  function allClusters() {
    return [...PortalStore.getCreatedClusters(), ...PortalData.clusters];
  }

  function findCluster(id) {
    return allClusters().find((cluster) => cluster.id === id) || null;
  }

  function getPreset(id) {
    return PortalData.clusterSetup.presets.find((preset) => preset.id === id) || PortalData.clusterSetup.presets[0];
  }

  function formatINR(value) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(Number(value) || 0);
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
    const activePage = page === "track"
      ? "tracks"
      : (page === "cluster-create" || page === "cluster-detail" ? "usage" : page);
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
    const clusters = allClusters();
    const activeClusters = clusters.filter((cluster) => cluster.status === "Running" || cluster.status === "Provisioning").length;
    return `
      <div class="portal-page">
        <section class="portal-welcome" aria-labelledby="welcome-title">
          <div class="portal-welcome-copy">
            <h1 id="welcome-title">Welcome, ${escapeHTML(session.name.split(" ")[0] || "Member")}</h1>
            <p>Continue your proposed four-track pathway and review the sample infrastructure, usage and account information in your workspace.</p>
          </div>
          <div class="portal-welcome-meta" aria-label="Workspace summary">
            <div class="portal-welcome-stat"><span>Pathway progress · Sample</span><strong>${totalProgress}%</strong></div>
            <div class="portal-welcome-stat"><span>Active clusters · Sample + created</span><strong>${String(activeClusters).padStart(2, "0")}</strong></div>
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
            <p class="portal-metric-label">Active clusters</p><strong class="portal-metric-value">${String(activeClusters).padStart(2, "0")}</strong>
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
            <a class="portal-action-card portal-action-card-primary" href="cluster-create.html">${icon("clusters")}<span>Create OpenShift cluster</span></a>
            <a class="portal-action-card" href="usage.html">${icon("usage")}<span>Review cluster usage</span></a>
            <a class="portal-action-card" href="tracks.html">${icon("tracks")}<span>Open the proposed pathway</span></a>
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
                ${track.id === "compute" ? `<a class="portal-action-card portal-action-card-primary" href="cluster-create.html?track=compute">${icon("clusters")}<span>Create OpenShift cluster</span></a>` : ""}
                <a class="portal-action-card" href="usage.html">${icon("usage")}<span>Usage</span></a>
                <a class="portal-action-card" href="support.html">${icon("support")}<span>Support</span></a>
                ${track.id !== "compute" ? `<a class="portal-action-card" href="tracks.html">${icon("tracks")}<span>All tracks</span></a>` : ""}
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
        <td><a class="portal-table-link" href="cluster-detail.html?id=${encodeURIComponent(cluster.id)}">${escapeHTML(cluster.name)}</a></td>
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
    const clusters = allClusters();
    const locationOptions = [...new Set(clusters.map((cluster) => cluster.location))];
    const statusOptions = [...new Set(clusters.map((cluster) => cluster.status))];
    return `
      <div class="portal-page">
        <header class="portal-page-header">
          <div class="portal-page-header-copy">
            <h1>Usage & clusters</h1>
            <p>Review the sample project allocation and cluster list in a clear infrastructure workspace based on the supplied reference flow.</p>
          </div>
          <div class="portal-header-actions">
            <a class="portal-button portal-button-primary" href="cluster-create.html">${icon("clusters", "portal-icon-sm")} Create cluster</a>
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
              <div class="portal-project-count"><span>Clusters</span><strong>${String(clusters.length).padStart(2, "0")}</strong></div>
              <div class="portal-project-count"><span>Users</span><strong>05</strong></div>
            </div>
          </div>
          <div class="portal-panel portal-resources">
            ${PortalData.resources.map(resourceCard).join("")}
          </div>
        </section>
        <section class="portal-panel" id="cluster-table">
          <div class="portal-section-title" style="padding:20px 18px 0">
            <div><h2>OpenShift clusters (<span id="cluster-count">${clusters.length}</span>)</h2><p>Sample inventory plus clusters created in this preview</p></div>
            <span class="portal-sample-label">Preview data</span>
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
              <tbody id="cluster-rows">${clusterRows(clusters)}</tbody>
            </table>
          </div>
        </section>
      </div>
    `;
  }

  function clusterPresetTable(kind, selectedId) {
    const label = kind === "master" ? "master" : "worker";
    return `
      <fieldset class="portal-fieldset portal-cluster-preset" data-preset-group="${label}">
        <legend>Select preset for ${label} nodes <span aria-hidden="true">*</span></legend>
        <div class="portal-preset-table-wrap">
          <table class="portal-preset-table">
            <thead><tr><th aria-label="Select"></th><th>Preset</th><th>vCPU</th><th>RAM</th><th>Block storage</th></tr></thead>
            <tbody>
              ${PortalData.clusterSetup.presets.map((preset) => `
                <tr class="${preset.id === selectedId ? "selected" : ""}">
                  <td><input type="radio" name="${label}Preset" value="${escapeHTML(preset.id)}" ${preset.id === selectedId ? "checked" : ""} aria-label="${escapeHTML(`${preset.name}: ${preset.vcpu} vCPU, ${preset.ram} GB RAM, ${preset.storage} GB block storage`)}" /></td>
                  <td><strong>${escapeHTML(preset.name)}</strong></td>
                  <td>${preset.vcpu} units</td>
                  <td>${preset.ram} GB</td>
                  <td>${preset.storage} GB</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
        <p class="portal-field-error" data-error-for="${label}Preset" aria-live="polite"></p>
      </fieldset>
    `;
  }

  function clusterChargesMarkup(draft, period) {
    const monthly = draft.managedAddon ? PortalData.clusterSetup.managedMonthly : 0;
    const multiplier = period === "monthly" ? 1 : 12;
    const amount = monthly * multiplier;
    const masterPreset = getPreset(draft.masterPreset);
    const workerPreset = getPreset(draft.workerPreset);
    const masterCount = Math.max(1, Number(draft.masterCount) || 1);
    const workerCount = Math.max(1, Number(draft.workerCount) || 1);
    const required = {
      vcpu: masterPreset.vcpu * masterCount + workerPreset.vcpu * workerCount,
      ram: masterPreset.ram * masterCount + workerPreset.ram * workerCount,
      storage: masterPreset.storage * masterCount + workerPreset.storage * workerCount
    };
    return `
      <div class="portal-charge-switch" role="group" aria-label="Charge period">
        <button type="button" class="${period === "annual" ? "active" : ""}" data-charge-period="annual" aria-pressed="${period === "annual"}">Annual</button>
        <button type="button" class="${period === "monthly" ? "active" : ""}" data-charge-period="monthly" aria-pressed="${period === "monthly"}">Monthly</button>
      </div>
      <div class="portal-charge-table">
        <div class="portal-charge-head"><span>Item</span><span>${period === "monthly" ? "Monthly" : "Annual"} expense</span></div>
        <div><span>Managed cluster add-on</span><strong>${formatINR(amount)}</strong></div>
        <div class="portal-charge-total"><span>Total</span><strong>${formatINR(amount)}</strong></div>
      </div>
      <div class="portal-availability">
        <h3>Available project resources</h3>
        <div><span>vCPU</span><strong>${Math.max(0, PortalData.clusterSetup.available.vcpu - required.vcpu)} <small>of ${PortalData.clusterSetup.available.vcpu} units after creation</small></strong></div>
        <div><span>RAM</span><strong>${Math.max(0, PortalData.clusterSetup.available.ram - required.ram)} <small>of ${PortalData.clusterSetup.available.ram} GB after creation</small></strong></div>
        <div><span>Internet port</span><strong>${Math.max(0, PortalData.clusterSetup.available.internet - Number(draft.apiPort || 0) - Number(draft.ingressPort || 0))} <small>of ${PortalData.clusterSetup.available.internet} Mbps after creation</small></strong></div>
        <div><span>Block storage</span><strong>${Math.max(0, PortalData.clusterSetup.available.storage - required.storage - Number(draft.persistentStorage || 0))} <small>of ${PortalData.clusterSetup.available.storage} GB after creation</small></strong></div>
        <div><span>Public IPv4</span><strong>${Math.max(0, PortalData.clusterSetup.available.publicIPv4 - (draft.publicIPv4 ? 2 : 0))} <small>of ${PortalData.clusterSetup.available.publicIPv4} IPs after creation</small></strong></div>
      </div>
    `;
  }

  function clusterCreatePage() {
    const saved = PortalStore.getClusterDraft();
    const requestedTrack = new URLSearchParams(window.location.search).get("track");
    const selectedTrack = PortalData.tracks.some((track) => track.id === requestedTrack)
      ? requestedTrack
      : (PortalData.tracks.some((track) => track.id === saved.trackId) ? saved.trackId : "compute");
    const draft = {
      trackId: selectedTrack,
      projectName: saved.projectName || "",
      projectContext: saved.projectContext || "",
      location: PortalData.clusterSetup.locations.includes(saved.location) ? saved.location : PortalData.clusterSetup.locations[0],
      clusterName: saved.clusterName || "",
      description: saved.description || "",
      version: PortalData.clusterSetup.versions.includes(saved.version) ? saved.version : "4.15",
      privateNetwork: PortalData.clusterSetup.networks.includes(saved.privateNetwork) ? saved.privateNetwork : PortalData.clusterSetup.networks[0],
      publicIPv4: saved.publicIPv4 !== false,
      internetDataTransfer: Number(saved.internetDataTransfer) || 200,
      apiPort: Number.isFinite(Number(saved.apiPort)) ? Number(saved.apiPort) : 0,
      ingressPort: Number.isFinite(Number(saved.ingressPort)) ? Number(saved.ingressPort) : 0,
      persistentStorage: Number.isFinite(Number(saved.persistentStorage)) ? Number(saved.persistentStorage) : 0,
      sshKey: PortalData.clusterSetup.sshKeys.includes(saved.sshKey) ? saved.sshKey : PortalData.clusterSetup.sshKeys[0],
      managedAddon: saved.managedAddon !== false,
      highAvailability: saved.highAvailability !== false,
      masterCount: Number(saved.masterCount) || 3,
      masterPreset: getPreset(saved.masterPreset).id,
      workerCount: Number(saved.workerCount) || 3,
      workerPreset: getPreset(saved.workerPreset).id
    };

    return `
      <div class="portal-page portal-cluster-create-page">
        <a class="portal-text-link portal-back-link" href="usage.html">${icon("chevron", "portal-back-icon")} Back to usage & clusters</a>
        <header class="portal-page-header portal-cluster-header">
          <div class="portal-page-header-copy">
            <h1>Create OpenShift cluster</h1>
            <p>Follow the four-track context, configure the cluster and review every setting before provisioning begins.</p>
          </div>
          <span class="portal-status portal-status-provisioning">Draft saved in this browser</span>
        </header>
        <div class="portal-step-announcer portal-visually-hidden" id="cluster-step-announcer" aria-live="polite"></div>
        <ol class="portal-cluster-stepper" aria-label="Cluster creation progress">
          <li class="active" data-cluster-step-indicator="1"><span>1</span><strong>Track & project</strong></li>
          <li data-cluster-step-indicator="2"><span>2</span><strong>Setup cluster</strong></li>
          <li data-cluster-step-indicator="3"><span>3</span><strong>Review</strong></li>
          <li data-cluster-step-indicator="4"><span>4</span><strong>Provisioning</strong></li>
        </ol>
        <form id="cluster-create-form" novalidate>
          <section class="portal-cluster-step" data-cluster-step="1" aria-labelledby="cluster-context-title">
            <div class="portal-cluster-main">
              <div class="portal-section-title"><div><h2 id="cluster-context-title">Choose the programme track</h2><p>Every cluster request is connected to one of the four proposed pathway tracks.</p></div></div>
              <fieldset class="portal-fieldset portal-track-choice" aria-describedby="trackId-error">
                <legend class="portal-visually-hidden">Select one of four tracks</legend>
                <div class="portal-track-choice-grid" role="radiogroup" aria-label="Four-track pathway">
                  ${PortalData.tracks.map((track) => `
                    <label class="portal-track-choice-card ${track.id === draft.trackId ? "selected" : ""}">
                      <input type="radio" name="trackId" value="${escapeHTML(track.id)}" ${track.id === draft.trackId ? "checked" : ""} />
                      <span class="portal-track-choice-number">${escapeHTML(track.number)}</span>
                      <span><strong>${escapeHTML(track.title)}</strong><small>${escapeHTML(track.shortTitle)}</small></span>
                      ${icon(track.icon, "portal-icon-lg")}
                    </label>
                  `).join("")}
                </div>
                <p class="portal-field-error" id="trackId-error" data-error-for="trackId" aria-live="polite"></p>
              </fieldset>
              <div class="portal-form-grid portal-cluster-context-fields">
                <div class="portal-field">
                  <label for="cluster-project-name">Project name <span aria-hidden="true">*</span></label>
                  <input class="portal-input" id="cluster-project-name" name="projectName" maxlength="80" value="${escapeHTML(draft.projectName)}" placeholder="e.g. Citizen services assistant" required />
                  <p class="portal-field-error" data-error-for="projectName"></p>
                </div>
                <div class="portal-field">
                  <label for="cluster-location">Location <span aria-hidden="true">*</span></label>
                  <select class="portal-select" id="cluster-location" name="location" required>
                    ${PortalData.clusterSetup.locations.map((location) => `<option ${location === draft.location ? "selected" : ""}>${escapeHTML(location)}</option>`).join("")}
                  </select>
                  <p class="portal-field-error" data-error-for="location"></p>
                </div>
                <div class="portal-field portal-field-span">
                  <label for="cluster-project-context">Project context and intended outcome <span aria-hidden="true">*</span></label>
                  <textarea class="portal-textarea" id="cluster-project-context" name="projectContext" maxlength="500" placeholder="Explain the public-value use case, intended users and expected outcome." required>${escapeHTML(draft.projectContext)}</textarea>
                  <p class="portal-field-hint">Minimum 12 characters. Do not include personal, confidential or production data.</p>
                  <p class="portal-field-error" data-error-for="projectContext"></p>
                </div>
              </div>
            </div>
            <div class="portal-cluster-actions">
              <a class="portal-button portal-button-secondary" href="usage.html">Cancel</a>
              <button class="portal-button portal-button-primary" type="button" data-cluster-next>Continue to setup</button>
            </div>
          </section>

          <section class="portal-cluster-step" data-cluster-step="2" aria-labelledby="cluster-setup-title" hidden>
            <div class="portal-cluster-layout">
              <div class="portal-cluster-main">
                <div class="portal-section-title"><div><h2 id="cluster-setup-title">Setup your OpenShift cluster</h2><p>Fields and review order follow the supplied OpenShift reference flow.</p></div></div>
                <div class="portal-cluster-form-sections">
                  <section class="portal-form-section">
                    <h3>Cluster information</h3>
                    <div class="portal-form-grid">
                      <div class="portal-field">
                        <label for="cluster-name">OpenShift cluster name <span aria-hidden="true">*</span></label>
                        <input class="portal-input" id="cluster-name" name="clusterName" maxlength="32" value="${escapeHTML(draft.clusterName)}" placeholder="SkyForge" required />
                        <p class="portal-field-hint">3–32 characters; letters, numbers and hyphens.</p>
                        <p class="portal-field-error" data-error-for="clusterName"></p>
                      </div>
                      <div class="portal-field">
                        <label for="cluster-version">OpenShift version <span aria-hidden="true">*</span></label>
                        <select class="portal-select" id="cluster-version" name="version" required>${PortalData.clusterSetup.versions.map((value) => `<option ${value === draft.version ? "selected" : ""}>${escapeHTML(value)}</option>`).join("")}</select>
                        <p class="portal-field-error" data-error-for="version"></p>
                      </div>
                      <div class="portal-field portal-field-span">
                        <label for="cluster-description">Description <span class="portal-optional">(optional)</span></label>
                        <textarea class="portal-textarea" id="cluster-description" name="description" maxlength="320" placeholder="Description for your OpenShift cluster">${escapeHTML(draft.description)}</textarea>
                        <p class="portal-field-error" data-error-for="description"></p>
                      </div>
                    </div>
                  </section>
                  <section class="portal-form-section">
                    <h3>Network and storage</h3>
                    <div class="portal-form-grid">
                      <div class="portal-field">
                        <label for="cluster-private-network">Private network <span aria-hidden="true">*</span></label>
                        <select class="portal-select" id="cluster-private-network" name="privateNetwork" required>${PortalData.clusterSetup.networks.map((value) => `<option ${value === draft.privateNetwork ? "selected" : ""}>${escapeHTML(value)}</option>`).join("")}</select>
                        <p class="portal-field-error" data-error-for="privateNetwork"></p>
                      </div>
                      <div class="portal-field">
                        <span class="portal-field-label">Public IP <span aria-hidden="true">*</span></span>
                        <label class="portal-checkbox portal-checkbox-box"><input type="checkbox" name="publicIPv4" ${draft.publicIPv4 ? "checked" : ""} /> <span>Assign IPv4 for ingress and API</span></label>
                        <p class="portal-field-hint">Two public IPv4 addresses will be assigned: one for ingress and one for API.</p>
                        <p class="portal-field-error" data-error-for="publicIPv4"></p>
                      </div>
                      <div class="portal-field">
                        <label for="cluster-internet-data">Internet data transfer <span aria-hidden="true">*</span></label>
                        <div class="portal-unit-input"><input class="portal-input" id="cluster-internet-data" name="internetDataTransfer" type="number" min="1" max="${PortalData.clusterSetup.available.internet}" value="${draft.internetDataTransfer}" required /><span>Mbps</span></div>
                        <p class="portal-field-error" data-error-for="internetDataTransfer"></p>
                      </div>
                      <div class="portal-field">
                        <label for="cluster-api-port">Internet port for API <span aria-hidden="true">*</span></label>
                        <div class="portal-unit-input"><input class="portal-input" id="cluster-api-port" name="apiPort" type="number" min="0" max="1000" value="${draft.apiPort}" required /><span>Mbps</span></div>
                        <p class="portal-field-error" data-error-for="apiPort"></p>
                      </div>
                      <div class="portal-field">
                        <label for="cluster-ingress-port">Internet port for ingress <span aria-hidden="true">*</span></label>
                        <div class="portal-unit-input"><input class="portal-input" id="cluster-ingress-port" name="ingressPort" type="number" min="0" max="1000" value="${draft.ingressPort}" required /><span>Mbps</span></div>
                        <p class="portal-field-error" data-error-for="ingressPort"></p>
                      </div>
                      <div class="portal-field">
                        <label for="cluster-storage">Persistent storage <span aria-hidden="true">*</span></label>
                        <div class="portal-unit-input"><input class="portal-input" id="cluster-storage" name="persistentStorage" type="number" min="0" max="3000" value="${draft.persistentStorage}" required /><span>GB</span></div>
                        <p class="portal-field-error" data-error-for="persistentStorage"></p>
                      </div>
                      <div class="portal-field portal-field-span">
                        <label for="cluster-ssh">Choose SSH key <span aria-hidden="true">*</span></label>
                        <select class="portal-select" id="cluster-ssh" name="sshKey" required>${PortalData.clusterSetup.sshKeys.map((value) => `<option ${value === draft.sshKey ? "selected" : ""}>${escapeHTML(value)}</option>`).join("")}</select>
                        <p class="portal-field-hint">Only the key label is stored in this preview; no private key material is collected.</p>
                        <p class="portal-field-error" data-error-for="sshKey"></p>
                      </div>
                    </div>
                  </section>
                  <section class="portal-form-section">
                    <h3>Select add-on</h3>
                    <label class="portal-addon-card"><input type="checkbox" name="managedAddon" ${draft.managedAddon ? "checked" : ""} /><span>${icon("security")}<span><strong>Managed cluster</strong><small>Platform monitoring and assisted operations · ₹500/month</small></span></span></label>
                  </section>
                  <section class="portal-form-section">
                    <h3>Define cluster configuration</h3>
                    <div class="portal-node-config">
                      <div class="portal-node-header">
                        <div><strong>Number of master nodes <span aria-hidden="true">*</span></strong><small>High availability requires an odd count of 3 or more.</small></div>
                        <div class="portal-counter"><button type="button" data-count-target="masterCount" data-delta="-1" aria-label="Decrease master nodes">−</button><input id="master-count" name="masterCount" type="number" min="1" max="9" value="${draft.masterCount}" aria-label="Number of master nodes" /><button type="button" data-count-target="masterCount" data-delta="1" aria-label="Increase master nodes">+</button></div>
                      </div>
                      <label class="portal-toggle-row"><input type="checkbox" name="highAvailability" ${draft.highAvailability ? "checked" : ""} /><span class="portal-toggle-ui" aria-hidden="true"></span><span><strong>HA enabled</strong><small>Keep master nodes on an odd count for quorum.</small></span></label>
                      <p class="portal-field-error" data-error-for="masterCount"></p>
                      ${clusterPresetTable("master", draft.masterPreset)}
                    </div>
                    <div class="portal-node-config">
                      <div class="portal-node-header">
                        <div><strong>Number of worker nodes <span aria-hidden="true">*</span></strong><small>At least one worker node is required.</small></div>
                        <div class="portal-counter"><button type="button" data-count-target="workerCount" data-delta="-1" aria-label="Decrease worker nodes">−</button><input id="worker-count" name="workerCount" type="number" min="1" max="50" value="${draft.workerCount}" aria-label="Number of worker nodes" /><button type="button" data-count-target="workerCount" data-delta="1" aria-label="Increase worker nodes">+</button></div>
                      </div>
                      <p class="portal-field-error" data-error-for="workerCount"></p>
                      ${clusterPresetTable("worker", draft.workerPreset)}
                    </div>
                  </section>
                </div>
              </div>
              <aside class="portal-cluster-summary" aria-label="Projected charges and resource availability">
                <h2>Projected charges</h2>
                <div id="cluster-live-summary">${clusterChargesMarkup(draft, "annual")}</div>
              </aside>
            </div>
            <div class="portal-cluster-actions">
              <button class="portal-button portal-button-secondary" type="button" data-cluster-back>Back</button>
              <button class="portal-button portal-button-primary" type="button" data-cluster-next>Review cluster</button>
            </div>
          </section>

          <section class="portal-cluster-step" data-cluster-step="3" aria-labelledby="cluster-review-title" hidden>
            <div class="portal-cluster-layout">
              <div class="portal-cluster-main">
                <div class="portal-section-title"><div><h2 id="cluster-review-title">Review OpenShift cluster</h2><p>Confirm the project context and every setup value before starting provisioning.</p></div></div>
                <div id="cluster-review-content"></div>
              </div>
              <aside class="portal-cluster-summary" aria-label="Final projected charges">
                <h2>Projected charges</h2>
                <div id="cluster-review-summary"></div>
              </aside>
            </div>
            <div class="portal-cluster-actions">
              <button class="portal-button portal-button-secondary" type="button" data-cluster-back>Back</button>
              <button class="portal-button portal-button-primary" id="create-cluster-submit" type="submit">${draft.managedAddon ? "Pay & create" : "Create cluster"}</button>
            </div>
          </section>
          <section class="portal-cluster-step" data-cluster-step="4" aria-labelledby="cluster-complete-title" hidden>
            <div class="portal-panel portal-panel-pad portal-provisioning-state">
              ${icon("check", "portal-icon-lg")}
              <h2 id="cluster-complete-title">Provisioning initiated</h2>
              <p>Your cluster request has been saved in this browser and added to Usage & clusters with a Provisioning status.</p>
            </div>
          </section>
        </form>
      </div>
      <div class="portal-success-overlay" id="cluster-success-overlay" hidden>
        <section class="portal-success-dialog" role="dialog" aria-modal="true" aria-labelledby="cluster-success-title" aria-describedby="cluster-success-description">
          <span class="portal-success-icon">${icon("check", "portal-icon-lg")}</span>
          <h2 id="cluster-success-title">OpenShift cluster creation initiated</h2>
          <p id="cluster-success-description">Provisioning has started. The cluster now appears in Usage & clusters, and this preview will keep its status as Provisioning.</p>
          <div class="portal-success-actions">
            <a class="portal-button portal-button-secondary" href="usage.html">Back to usage</a>
            <a class="portal-button portal-button-primary" id="view-created-cluster" href="usage.html">View cluster details</a>
          </div>
        </section>
      </div>
      <div class="portal-success-overlay" id="cluster-payment-overlay" hidden>
        <section class="portal-payment-dialog" role="dialog" aria-modal="true" aria-labelledby="cluster-payment-title" aria-describedby="cluster-payment-description">
          <div class="portal-payment-head">
            <div><span class="portal-detail-number">Sample checkout</span><h2 id="cluster-payment-title">Payment details</h2></div>
            <button type="button" class="portal-dialog-close" data-close-payment aria-label="Close payment details">×</button>
          </div>
          <p id="cluster-payment-description">Choose a renewal cycle for the managed cluster add-on. No real payment is processed in this static preview.</p>
          <fieldset class="portal-fieldset portal-renewal-options">
            <legend>Renewal cycle</legend>
            <label><input type="radio" name="renewalCycle" value="annual" checked /><span><strong>Annually</strong><small>₹6,000 per year</small></span></label>
            <label><input type="radio" name="renewalCycle" value="monthly" /><span><strong>Monthly</strong><small>₹500 per month</small></span></label>
          </fieldset>
          <div class="portal-payment-breakdown" id="cluster-payment-breakdown"></div>
          <div class="portal-payment-actions">
            <button class="portal-button portal-button-secondary" type="button" id="download-proforma">${icon("download", "portal-icon-sm")} Proforma Invoice</button>
            <button class="portal-button portal-button-primary" type="button" id="cluster-pay-now">Pay Now · ₹6,000</button>
          </div>
        </section>
      </div>
    `;
  }

  function reviewGroup(title, rows) {
    return `
      <section class="portal-review-group">
        <h3>${escapeHTML(title)}</h3>
        <dl>${rows.map(([label, value]) => `<div><dt>${escapeHTML(label)}</dt><dd>${escapeHTML(value)}</dd></div>`).join("")}</dl>
      </section>
    `;
  }

  function clusterDetailPage() {
    const clusterId = new URLSearchParams(window.location.search).get("id");
    const cluster = findCluster(clusterId);
    if (!cluster) {
      return `
        <div class="portal-page">
          <a class="portal-text-link portal-back-link" href="usage.html">${icon("chevron", "portal-back-icon")} Back to usage & clusters</a>
          <section class="portal-panel portal-panel-pad portal-empty-state">
            ${icon("clusters", "portal-icon-lg")}
            <h1>Cluster not found</h1>
            <p>The requested cluster is not available in this browser session.</p>
            <a class="portal-button portal-button-primary" href="cluster-create.html">Create a cluster</a>
          </section>
        </div>
      `;
    }
    const track = PortalData.tracks.find((item) => item.id === cluster.trackId);
    const created = cluster.status === "Provisioning";
    const masterPreset = cluster.masterPreset || { name: "Not recorded", vcpu: 0, ram: 0, storage: 0 };
    const workerPreset = cluster.workerPreset || { name: "Not recorded", vcpu: 0, ram: 0, storage: 0 };
    const detailRows = [
      ["Cluster ID", cluster.id],
      ["Project", cluster.project],
      ["Track", track ? `${track.number} · ${track.title}` : (cluster.trackTitle || "Not recorded")],
      ["Location", cluster.location],
      ["Status", cluster.status],
      ["Creation time", cluster.createdAt ? new Date(cluster.createdAt).toLocaleString("en-IN") : "Sample record"],
      ["Description", cluster.description || "Not recorded"],
      ["Project context", cluster.projectContext || "Not recorded"]
    ];
    const setupRows = [
      ["OpenShift version", cluster.version],
      ["Private network", cluster.privateNetwork || cluster.network || "Not recorded"],
      ["Public IP (Ingress)", cluster.publicIPv4 || "Not recorded"],
      ["Public IP (API)", cluster.publicIPv4 || "Not recorded"],
      ["Internet data transfer", cluster.internetDataTransfer ? `${cluster.internetDataTransfer} Mbps` : "Not recorded"],
      ["Internet port for API", cluster.apiPort ? `${cluster.apiPort} Mbps` : "Not recorded"],
      ["Internet port for ingress", cluster.ingressPort ? `${cluster.ingressPort} Mbps` : "Not recorded"],
      ["Persistent storage", cluster.persistentStorage ? `${cluster.persistentStorage} GB` : "Not recorded"],
      ["SSH key", cluster.sshKey || "Not recorded"],
      ["Managed cluster", cluster.managedAddon ? "Yes · ₹500/month" : "No"],
      ["High availability", cluster.highAvailability ? "Enabled" : "Disabled"],
      ["Master nodes", String(cluster.master)],
      ["Worker nodes", String(cluster.worker)]
    ];
    return `
      <div class="portal-page">
        <a class="portal-text-link portal-back-link" href="usage.html">${icon("chevron", "portal-back-icon")} Back to usage & clusters</a>
        <header class="portal-cluster-detail-header">
          <div>
            <span class="portal-detail-number">${escapeHTML(track ? `${track.title} track` : "OpenShift cluster")}</span>
            <h1>${escapeHTML(cluster.name)}</h1>
            <p>${escapeHTML(cluster.id)} · ${escapeHTML(cluster.location)}</p>
          </div>
          <div class="portal-header-actions">
            <span class="portal-status portal-status-${statusClass(cluster.status)}">${escapeHTML(cluster.status)}</span>
            <a class="portal-button portal-button-primary" href="cluster-create.html?track=${encodeURIComponent(cluster.trackId || "compute")}">Create another</a>
          </div>
        </header>
        ${created ? sampleNote("Provisioning is simulated in this static preview. The status will remain Provisioning and no real infrastructure is created.") : sampleNote("This is a seeded sample cluster. Utilization and infrastructure values are illustrative.")}
        <nav class="portal-detail-tabs" aria-label="Cluster detail sections">
          <a class="active" href="#cluster-details">Details</a>
          <a href="#cluster-configuration">Configuration</a>
          <a href="#cluster-utilization">Utilization</a>
        </nav>
        <div class="portal-detail-grid" id="cluster-details">
          <section class="portal-review-group">
            <h3>Basic information</h3>
            <dl>${detailRows.map(([label, value]) => `<div><dt>${escapeHTML(label)}</dt><dd>${escapeHTML(value)}</dd></div>`).join("")}</dl>
          </section>
          <section class="portal-review-group" id="cluster-configuration">
            <h3>Cluster configuration</h3>
            <dl>${setupRows.map(([label, value]) => `<div><dt>${escapeHTML(label)}</dt><dd>${escapeHTML(value)}</dd></div>`).join("")}</dl>
          </section>
          <section class="portal-review-group" id="cluster-utilization">
            <h3>Utilization</h3>
            <div class="portal-utilization-list">
              ${[
                ["vCPU", created ? 0 : 70],
                ["RAM", created ? 0 : 33],
                ["Block storage", created ? 0 : 25],
                ["Internet data transfer", created ? 0 : 0]
              ].map(([label, value]) => `<div><span>${escapeHTML(label)}</span><div class="portal-utilization-bar"><i style="--value:${value}%"></i></div><strong>${value}%</strong></div>`).join("")}
            </div>
            <p class="portal-field-hint">${created ? "Usage metrics become available after provisioning completes." : "Illustrative utilization for preview only."}</p>
          </section>
        </div>
        <div class="portal-detail-grid portal-detail-grid-two" style="margin-top:20px">
          ${reviewGroup("Master node configuration", [
            ["Preset", masterPreset.name],
            ["vCPU per node", `${masterPreset.vcpu} units`],
            ["RAM per node", `${masterPreset.ram} GB`],
            ["Block storage per node", `${masterPreset.storage} GB`]
          ])}
          ${reviewGroup("Worker node configuration", [
            ["Preset", workerPreset.name],
            ["vCPU per node", `${workerPreset.vcpu} units`],
            ["RAM per node", `${workerPreset.ram} GB`],
            ["Block storage per node", `${workerPreset.storage} GB`]
          ])}
        </div>
        ${created ? `<section class="portal-provisioning-section" aria-labelledby="provisioning-title"><div class="portal-section-title"><div><h2 id="provisioning-title">Provisioning progress</h2><p>The reference flow estimates approximately 30 minutes. This static preview does not connect to live infrastructure.</p></div><span class="portal-status portal-status-provisioning">In progress</span></div><div class="portal-provisioning-timeline" aria-label="Provisioning progress"><div class="complete"><span></span><strong>Creating DNS records</strong><small>Completed in 5 minutes</small></div><div class="active"><span></span><strong>Creating network resources</strong></div><div><span></span><strong>Creating instance configuration</strong></div><div><span></span><strong>Creating instances</strong></div><div><span></span><strong>Bootstrapping the cluster</strong></div><div><span></span><strong>Finalizing the deployment</strong></div></div></section>` : ""}
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
      const current = `${page}.html${page === "track" || page === "cluster-detail" ? window.location.search : ""}`;
      window.location.replace(`signin.html?returnTo=${encodeURIComponent(PortalStore.safeReturnTo(current))}`);
      return;
    }

    const renderers = {
      dashboard: () => dashboardPage(session),
      tracks: tracksPage,
      track: trackPage,
      usage: usagePage,
      "cluster-create": clusterCreatePage,
      "cluster-detail": clusterDetailPage,
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
      return allClusters().filter((cluster) => {
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

  function bindClusterCreate() {
    const form = document.getElementById("cluster-create-form");
    if (!form) return;
    const stepNames = ["Track & project", "Setup cluster", "Review", "Provisioning"];
    let currentStep = 1;
    let chargePeriod = "annual";
    let creating = false;
    let createdId = "";

    function radioValue(name) {
      return form.querySelector(`input[name="${name}"]:checked`)?.value || "";
    }

    function collectDraft() {
      return {
        trackId: radioValue("trackId"),
        projectName: form.elements.projectName.value.trim(),
        projectContext: form.elements.projectContext.value.trim(),
        location: form.elements.location.value,
        clusterName: form.elements.clusterName.value.trim(),
        description: form.elements.description.value.trim(),
        version: form.elements.version.value,
        privateNetwork: form.elements.privateNetwork.value,
        publicIPv4: form.elements.publicIPv4.checked,
        internetDataTransfer: Number(form.elements.internetDataTransfer.value) || 0,
        apiPort: Number(form.elements.apiPort.value) || 0,
        ingressPort: Number(form.elements.ingressPort.value) || 0,
        persistentStorage: Number(form.elements.persistentStorage.value) || 0,
        sshKey: form.elements.sshKey.value,
        managedAddon: form.elements.managedAddon.checked,
        highAvailability: form.elements.highAvailability.checked,
        masterCount: Number(form.elements.masterCount.value) || 0,
        masterPreset: radioValue("masterPreset"),
        workerCount: Number(form.elements.workerCount.value) || 0,
        workerPreset: radioValue("workerPreset")
      };
    }

    function setGroupError(name, message) {
      const error = form.querySelector(`[data-error-for="${name}"]`);
      const inputs = [...form.querySelectorAll(`[name="${name}"]`)];
      inputs.forEach((input) => input.setAttribute("aria-invalid", message ? "true" : "false"));
      if (error) error.textContent = message || "";
    }

    function focusFirstInvalid(step) {
      form.querySelector(`[data-cluster-step="${step}"] [aria-invalid="true"]`)?.focus();
    }

    function validateStep(step) {
      let valid = true;
      if (step === 1) {
        const draft = collectDraft();
        if (!draft.trackId) {
          setGroupError("trackId", "Select one of the four programme tracks.");
          valid = false;
        }
        valid = validateRequired(form, ["projectName", "projectContext", "location"]) && valid;
        if (draft.projectName && draft.projectName.length < 3) {
          setFieldError(form, "projectName", "Use at least 3 characters.");
          valid = false;
        }
        if (draft.projectContext && draft.projectContext.length < 12) {
          setFieldError(form, "projectContext", "Add at least 12 characters of project context.");
          valid = false;
        }
      }
      if (step === 2) {
        const draft = collectDraft();
        valid = validateRequired(form, [
          "clusterName", "version", "privateNetwork", "internetDataTransfer",
          "apiPort", "ingressPort", "persistentStorage", "sshKey", "masterCount", "workerCount"
        ]);
        if (draft.clusterName && !/^[A-Za-z0-9][A-Za-z0-9-]{2,31}$/.test(draft.clusterName)) {
          setFieldError(form, "clusterName", "Use 3–32 letters, numbers or hyphens; start with a letter or number.");
          valid = false;
        }
        if (draft.description && draft.description.length < 8) {
          setFieldError(form, "description", "Use at least 8 characters.");
          valid = false;
        }
        if (!draft.publicIPv4) {
          setGroupError("publicIPv4", "IPv4 is required for ingress and API access in this preview.");
          valid = false;
        }
        if (Number(draft.internetDataTransfer) <= 0) {
          setFieldError(form, "internetDataTransfer", "Enter a value greater than zero.");
          valid = false;
        }
        ["apiPort", "ingressPort", "persistentStorage"].forEach((name) => {
          if (Number(draft[name]) < 0) {
            setFieldError(form, name, "Enter zero or a greater value.");
            valid = false;
          }
        });
        if (draft.internetDataTransfer > PortalData.clusterSetup.available.internet) {
          setFieldError(form, "internetDataTransfer", `Maximum available is ${PortalData.clusterSetup.available.internet} Mbps.`);
          valid = false;
        }
        if (draft.apiPort + draft.ingressPort > PortalData.clusterSetup.available.internet) {
          setFieldError(form, "ingressPort", `Combined API and ingress ports cannot exceed ${PortalData.clusterSetup.available.internet} Mbps.`);
          valid = false;
        }
        if (!draft.masterPreset) {
          setGroupError("masterPreset", "Select a master node preset.");
          valid = false;
        }
        if (!draft.workerPreset) {
          setGroupError("workerPreset", "Select a worker node preset.");
          valid = false;
        }
        if (draft.highAvailability && (draft.masterCount < 3 || draft.masterCount % 2 === 0)) {
          setFieldError(form, "masterCount", draft.masterCount < 3
            ? 'Minimum 3 master nodes must be created when "HA enabled" is turned on.'
            : "Master nodes can only be created in odd numbers. Please enter an odd number.");
          valid = false;
        } else if (!draft.highAvailability && draft.masterCount < 1) {
          setFieldError(form, "masterCount", "At least one master node is required.");
          valid = false;
        }
        if (draft.workerCount < 1 || draft.workerCount > 50) {
          setFieldError(form, "workerCount", "Choose between 1 and 50 worker nodes.");
          valid = false;
        }
        const masterPreset = getPreset(draft.masterPreset);
        const workerPreset = getPreset(draft.workerPreset);
        const required = {
          vcpu: masterPreset.vcpu * draft.masterCount + workerPreset.vcpu * draft.workerCount,
          ram: masterPreset.ram * draft.masterCount + workerPreset.ram * draft.workerCount,
          storage: masterPreset.storage * draft.masterCount + workerPreset.storage * draft.workerCount + draft.persistentStorage
        };
        if (required.vcpu > PortalData.clusterSetup.available.vcpu ||
            required.ram > PortalData.clusterSetup.available.ram ||
            required.storage > PortalData.clusterSetup.available.storage) {
          setGroupError("workerPreset", "This node configuration exceeds the sample project resources. Reduce nodes or choose a smaller preset.");
          valid = false;
        }
      }
      if (!valid) focusFirstInvalid(step);
      return valid;
    }

    function setStep(step) {
      currentStep = Math.max(1, Math.min(4, step));
      form.querySelectorAll("[data-cluster-step]").forEach((section) => {
        section.hidden = Number(section.dataset.clusterStep) !== currentStep;
      });
      root.querySelectorAll("[data-cluster-step-indicator]").forEach((indicator) => {
        const value = Number(indicator.dataset.clusterStepIndicator);
        indicator.classList.toggle("active", value === currentStep);
        indicator.classList.toggle("complete", value < currentStep);
        indicator.setAttribute("aria-current", value === currentStep ? "step" : "false");
      });
      const announcement = document.getElementById("cluster-step-announcer");
      if (announcement) announcement.textContent = `Step ${currentStep} of 4: ${stepNames[currentStep - 1]}`;
      const heading = form.querySelector(`[data-cluster-step="${currentStep}"] h2`);
      heading?.setAttribute("tabindex", "-1");
      heading?.focus();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function bindChargePeriodButtons(container) {
      container?.querySelectorAll("[data-charge-period]").forEach((button) => {
        button.addEventListener("click", () => {
          chargePeriod = button.dataset.chargePeriod;
          renderSummaries();
        });
      });
    }

    function renderSummaries() {
      const draft = collectDraft();
      const live = document.getElementById("cluster-live-summary");
      const review = document.getElementById("cluster-review-summary");
      if (live) {
        live.innerHTML = clusterChargesMarkup(draft, chargePeriod);
        bindChargePeriodButtons(live);
      }
      if (review) {
        review.innerHTML = clusterChargesMarkup(draft, chargePeriod);
        bindChargePeriodButtons(review);
      }
      const submit = document.getElementById("create-cluster-submit");
      if (submit && !creating) submit.textContent = draft.managedAddon ? "Pay & create" : "Create cluster";
    }

    function renderReview() {
      const draft = collectDraft();
      const track = PortalData.tracks.find((item) => item.id === draft.trackId);
      const masterPreset = getPreset(draft.masterPreset);
      const workerPreset = getPreset(draft.workerPreset);
      document.getElementById("cluster-review-content").innerHTML = [
        reviewGroup("Track and project", [
          ["Programme track", track ? `${track.number} · ${track.title}` : "Not selected"],
          ["Project name", draft.projectName],
          ["Project context", draft.projectContext],
          ["Location", draft.location]
        ]),
        reviewGroup("OpenShift cluster information", [
          ["OpenShift cluster name", draft.clusterName],
          ["Description", draft.description || "Not provided"],
          ["OpenShift version", draft.version],
          ["Private network", draft.privateNetwork],
          ["Internet data transfer", `${draft.internetDataTransfer} Mbps`],
          ["Public IP (Ingress)", draft.publicIPv4 ? "IPv4" : "No"],
          ["Public IP (API)", draft.publicIPv4 ? "IPv4" : "No"],
          ["Internet port for API", `${draft.apiPort} Mbps`],
          ["Internet port for ingress", `${draft.ingressPort} Mbps`],
          ["Persistent storage", `${draft.persistentStorage} GB`],
          ["SSH key", draft.sshKey],
          ["Master nodes", String(draft.masterCount)],
          ["Worker nodes", String(draft.workerCount)]
        ]),
        reviewGroup("Add-on", [
          ["Managed cluster", draft.managedAddon ? "Yes · ₹500/month" : "No"]
        ]),
        `<div class="portal-review-config-grid">${reviewGroup("Master node configuration · per node", [
          ["High availability", draft.highAvailability ? "Enabled" : "Disabled"],
          ["Preset", masterPreset.name],
          ["vCPU", `${masterPreset.vcpu} units`],
          ["RAM", `${masterPreset.ram} GB`],
          ["Block storage", `${masterPreset.storage} GB`]
        ])}${reviewGroup("Worker node configuration · per node", [
          ["Preset", workerPreset.name],
          ["vCPU", `${workerPreset.vcpu} units`],
          ["RAM", `${workerPreset.ram} GB`],
          ["Block storage", `${workerPreset.storage} GB`]
        ])}</div>`
        ,
        reviewGroup("Cluster summary", [
          ["vCPU", `${masterPreset.vcpu * draft.masterCount + workerPreset.vcpu * draft.workerCount} units`],
          ["RAM", `${masterPreset.ram * draft.masterCount + workerPreset.ram * draft.workerCount} GB`],
          ["Block storage", `${masterPreset.storage * draft.masterCount + workerPreset.storage * draft.workerCount} GB`]
        ])
      ].join("");
      renderSummaries();
    }

    function saveDraft() {
      if (!createdId) PortalStore.saveClusterDraft(collectDraft());
      renderSummaries();
    }

    function openPayment() {
      const overlay = document.getElementById("cluster-payment-overlay");
      if (!overlay) return;
      overlay.hidden = false;
      document.body.classList.add("portal-modal-open");
      updatePayment();
      overlay.querySelector("[data-close-payment]")?.focus();
    }

    function closePayment() {
      const overlay = document.getElementById("cluster-payment-overlay");
      if (!overlay) return;
      overlay.hidden = true;
      document.body.classList.remove("portal-modal-open");
      document.getElementById("create-cluster-submit")?.focus();
    }

    function updatePayment() {
      const cycle = root.querySelector('input[name="renewalCycle"]:checked')?.value || "annual";
      const amount = cycle === "monthly" ? 500 : 6000;
      const breakdown = document.getElementById("cluster-payment-breakdown");
      if (breakdown) breakdown.innerHTML = `<div><span>Managed cluster add-on</span><strong>${formatINR(amount)}</strong></div><div><span>Tax</span><strong>Calculated in production</strong></div><div class="portal-charge-total"><span>Preview total</span><strong>${formatINR(amount)}</strong></div>`;
      const pay = document.getElementById("cluster-pay-now");
      if (pay && !creating) pay.textContent = `Pay Now · ${formatINR(amount)}`;
    }

    function createCluster() {
      if (creating || createdId) return;
      creating = true;
      const submit = document.getElementById("create-cluster-submit");
      const pay = document.getElementById("cluster-pay-now");
      if (submit) {
        submit.disabled = true;
        submit.textContent = "Starting provisioning…";
      }
      if (pay) {
        pay.disabled = true;
        pay.textContent = "Starting provisioning…";
      }
      const draft = collectDraft();
      const track = PortalData.tracks.find((item) => item.id === draft.trackId);
      const masterPreset = getPreset(draft.masterPreset);
      const workerPreset = getPreset(draft.workerPreset);
      const now = new Date();
      createdId = `AILL-AP-${String(now.getTime()).slice(-8)}`;
      const monthlyCharge = draft.managedAddon ? PortalData.clusterSetup.managedMonthly : 0;
      PortalStore.addCreatedCluster({
        name: draft.clusterName,
        id: createdId,
        version: draft.version,
        location: draft.location,
        project: draft.projectName,
        projectContext: draft.projectContext,
        trackId: draft.trackId,
        trackTitle: track ? track.title : "",
        description: draft.description,
        status: "Provisioning",
        network: "--",
        privateNetwork: draft.privateNetwork,
        publicIPv4: draft.publicIPv4 ? "IPv4" : "",
        internetDataTransfer: draft.internetDataTransfer,
        apiPort: draft.apiPort,
        ingressPort: draft.ingressPort,
        persistentStorage: draft.persistentStorage,
        sshKey: draft.sshKey,
        managedAddon: draft.managedAddon,
        highAvailability: draft.highAvailability,
        master: draft.masterCount,
        masterPreset,
        worker: draft.workerCount,
        workerPreset,
        monthlyCharge,
        annualCharge: monthlyCharge * 12,
        createdAt: now.toISOString()
      });
      PortalStore.clearClusterDraft();
      document.getElementById("cluster-payment-overlay").hidden = true;
      setStep(4);
      const viewLink = document.getElementById("view-created-cluster");
      if (viewLink) viewLink.href = `cluster-detail.html?id=${encodeURIComponent(createdId)}`;
      const success = document.getElementById("cluster-success-overlay");
      success.hidden = false;
      document.body.classList.add("portal-modal-open");
      viewLink?.focus();
    }

    root.querySelectorAll("[data-cluster-next]").forEach((button) => {
      button.addEventListener("click", () => {
        if (!validateStep(currentStep)) return;
        saveDraft();
        if (currentStep === 2) renderReview();
        setStep(currentStep + 1);
      });
    });
    root.querySelectorAll("[data-cluster-back]").forEach((button) => {
      button.addEventListener("click", () => setStep(currentStep - 1));
    });
    form.addEventListener("input", (event) => {
      if (event.target.name) {
        if (event.target.type === "radio" || event.target.type === "checkbox") setGroupError(event.target.name, "");
        else setFieldError(form, event.target.name, "");
      }
      root.querySelectorAll(".portal-track-choice-card").forEach((card) => card.classList.toggle("selected", card.querySelector("input").checked));
      root.querySelectorAll(".portal-preset-table tr").forEach((row) => row.classList.toggle("selected", Boolean(row.querySelector("input:checked"))));
      saveDraft();
    });
    form.addEventListener("change", (event) => {
      if (event.target.name === "highAvailability" && event.target.checked) {
        const input = form.elements.masterCount;
        let value = Math.max(3, Number(input.value) || 3);
        if (value % 2 === 0) value += 1;
        input.value = String(Math.min(9, value));
      }
      saveDraft();
    });
    root.querySelectorAll("[data-count-target]").forEach((button) => {
      button.addEventListener("click", () => {
        const input = form.elements[button.dataset.countTarget];
        const isMaster = button.dataset.countTarget === "masterCount";
        const ha = isMaster && form.elements.highAvailability.checked;
        const delta = Number(button.dataset.delta) * (ha ? 2 : 1);
        const min = ha ? 3 : Number(input.min);
        const max = Number(input.max);
        let value = Math.min(max, Math.max(min, (Number(input.value) || min) + delta));
        if (ha && value % 2 === 0) value += delta >= 0 ? 1 : -1;
        input.value = String(Math.min(max, Math.max(min, value)));
        input.dispatchEvent(new Event("input", { bubbles: true }));
      });
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validateStep(2)) {
        setStep(2);
        return;
      }
      if (collectDraft().managedAddon) openPayment();
      else createCluster();
    });
    root.querySelectorAll('input[name="renewalCycle"]').forEach((radio) => radio.addEventListener("change", updatePayment));
    root.querySelector("[data-close-payment]")?.addEventListener("click", closePayment);
    document.getElementById("cluster-pay-now")?.addEventListener("click", createCluster);
    document.getElementById("download-proforma")?.addEventListener("click", () => {
      const draft = collectDraft();
      const cycle = root.querySelector('input[name="renewalCycle"]:checked')?.value || "annual";
      const amount = cycle === "monthly" ? 500 : 6000;
      const content = [
        "AI Living Labs Foundation — SAMPLE PROFORMA INVOICE",
        "Preview only. This is not a tax invoice and no payment is processed.",
        "",
        `Project: ${draft.projectName}`,
        `Cluster: ${draft.clusterName}`,
        "Item: Managed cluster add-on",
        `Renewal: ${cycle}`,
        `Preview total: ${formatINR(amount)}`
      ].join("\n");
      const url = URL.createObjectURL(new Blob([content], { type: "text/plain;charset=utf-8" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = "aill-sample-proforma-invoice.txt";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      showToast("Sample proforma invoice downloaded.");
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !document.getElementById("cluster-payment-overlay").hidden && !creating) closePayment();
    });
    bindChargePeriodButtons(document.getElementById("cluster-live-summary"));
    saveDraft();
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
    if (page === "cluster-create") bindClusterCreate();
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
