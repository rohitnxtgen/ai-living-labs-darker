(function () {
  "use strict";

  const tracks = [
    {
      id: "innovate",
      number: "01",
      title: "Innovate",
      shortTitle: "Innovation arenas",
      description: "Move from a public-value challenge to a clear solution direction through the Innovation Arena and Hackathon Arena.",
      outcome: "A challenge-aligned concept with a defined user, outcome and validation approach.",
      progress: 68,
      icon: "tracks",
      modules: [
        { title: "Explore the Innovation Arena", detail: "Review challenge-led opportunities and programme context", state: "Completed" },
        { title: "Select a challenge", detail: "Connect an idea to a defined real-world need", state: "Completed" },
        { title: "Join a Hackathon Arena", detail: "Shape the concept with teams and mentors", state: "In progress" },
        { title: "Document the concept", detail: "Capture the proposed outcome and validation plan", state: "Not started" }
      ]
    },
    {
      id: "build",
      number: "02",
      title: "Build",
      shortTitle: "Dev Studio",
      description: "Turn the selected concept into a working prototype through Dev Studio tools, guided workflows and integrations.",
      outcome: "A testable prototype with a clear build record and integration requirements.",
      progress: 42,
      icon: "ai-instance",
      modules: [
        { title: "Open Dev Studio", detail: "Prepare a structured workspace for the selected use case", state: "Completed" },
        { title: "Configure integrations", detail: "Connect the services and tools needed for the prototype", state: "In progress" },
        { title: "Build the prototype", detail: "Develop and test the core solution workflow", state: "Not started" },
        { title: "Review the build", detail: "Record behaviour, limitations and next actions", state: "Not started" }
      ]
    },
    {
      id: "compute",
      number: "03",
      title: "Compute",
      shortTitle: "Shared GPU",
      description: "Request and monitor shared GPU clusters and infrastructure allocation for approved development and experimentation.",
      outcome: "An appropriately sized shared infrastructure allocation with visible usage.",
      progress: 20,
      icon: "clusters",
      modules: [
        { title: "Define requirements", detail: "Estimate compute, memory, storage and network needs", state: "Completed" },
        { title: "Request allocation", detail: "Map the approved project to available shared infrastructure", state: "In progress" },
        { title: "Use the cluster", detail: "Run approved experiments in the assigned environment", state: "Not started" },
        { title: "Review usage", detail: "Monitor allocation and return unused capacity", state: "Not started" }
      ]
    },
    {
      id: "data",
      number: "04",
      title: "Data",
      shortTitle: "Governed sandbox",
      description: "Discover, request and contribute datasets through a governed sandbox with clear access and responsible-use controls.",
      outcome: "Approved dataset access or a documented contribution prepared for governance review.",
      progress: 8,
      icon: "database",
      modules: [
        { title: "Discover datasets", detail: "Review governed data relevant to the approved use case", state: "In progress" },
        { title: "Request access", detail: "Submit the intended use and responsible-use context", state: "Not started" },
        { title: "Use the sandbox", detail: "Work with approved data in the governed environment", state: "Not started" },
        { title: "Contribute data", detail: "Prepare a dataset contribution for governance review", state: "Not started" }
      ]
    }
  ];

  const clusters = [
    {
      name: "AILL-Amaravati-01",
      id: "AILL-AP-2401",
      version: "1.28.4",
      location: "Amaravati, AP",
      project: "Living Labs",
      status: "Running",
      network: "10.24.18.12",
      master: 3,
      worker: 24,
      sshKey: "aill_demo_key"
    },
    {
      name: "AILL-Visakhapatnam-02",
      id: "AILL-AP-2402",
      version: "1.28.4",
      location: "Visakhapatnam, AP",
      project: "Innovation",
      status: "Running",
      network: "10.24.24.18",
      master: 3,
      worker: 18,
      sshKey: "aill_demo_key"
    },
    {
      name: "AILL-Tirupati-03",
      id: "AILL-AP-2403",
      version: "1.28.4",
      location: "Tirupati, AP",
      project: "Research",
      status: "Running",
      network: "10.24.31.22",
      master: 3,
      worker: 12,
      sshKey: "aill_demo_key"
    },
    {
      name: "AILL-Anantapur-04",
      id: "AILL-AP-2404",
      version: "1.28.4",
      location: "Anantapur, AP",
      project: "Skilling",
      status: "Maintenance",
      network: "10.24.42.16",
      master: 3,
      worker: 8,
      sshKey: "aill_demo_key"
    }
  ];

  window.PortalData = Object.freeze({
    tracks,
    clusters,
    resources: [
      { label: "vCPU", unit: "Units", allocated: 406, available: 197, color: "#1e56f5" },
      { label: "RAM", unit: "GB", allocated: 768, available: 384, color: "#5635ef" },
      { label: "Block storage", unit: "GB", allocated: 2400, available: 960, color: "#176cf3" },
      { label: "Internet egress", unit: "Mbps", allocated: 850, available: 350, color: "#11bdc8" }
    ],
    activity: [
      { title: "Innovation step completed", detail: "Challenge selected · Innovate", time: "24 Jul 2026, 10:24 AM", icon: "check" },
      { title: "Cluster workspace accessed", detail: "AILL-Amaravati-01 · Compute", time: "23 Jul 2026, 4:10 PM", icon: "clusters" },
      { title: "Dataset added to workspace", detail: "Governed mobility dataset", time: "22 Jul 2026, 2:40 PM", icon: "database" },
      { title: "Track milestone updated", detail: "Use case definition completed", time: "21 Jul 2026, 11:18 AM", icon: "tracks" }
    ],
    invoices: [
      { id: "AILL-INV-0726", period: "July 2026", issued: "01 Aug 2026", amount: "₹12,480", status: "Projected" },
      { id: "AILL-INV-0626", period: "June 2026", issued: "01 Jul 2026", amount: "₹10,240", status: "Paid" },
      { id: "AILL-INV-0526", period: "May 2026", issued: "01 Jun 2026", amount: "₹9,860", status: "Paid" },
      { id: "AILL-INV-0426", period: "April 2026", issued: "01 May 2026", amount: "₹8,920", status: "Paid" }
    ],
    navigation: [
      { id: "dashboard", label: "Overview", href: "dashboard.html", icon: "home" },
      { id: "tracks", label: "Four-track pathway", href: "tracks.html", icon: "tracks" },
      { id: "usage", label: "Usage & clusters", href: "usage.html", icon: "usage" },
      { id: "billing", label: "Billing", href: "billing.html", icon: "billing" },
      { id: "profile", label: "Profile", href: "profile.html", icon: "profile" },
      { id: "support", label: "Support", href: "support.html", icon: "support" }
    ]
  });
})();
