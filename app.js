const ROUTES = [
  'home',
  'innovation-arena',
  'hackathon-arena',
  'dev-studio',
  'data-collection',
  'government-data',
  'learn',
  'community',
  'impact'
];

const COMING_SOON_ROUTES = new Set(['learn', 'community', 'impact']);

const ROUTE_TITLES = {
  home: 'Home',
  'innovation-arena': 'Innovation Arena',
  'hackathon-arena': 'Hackathon Arena',
  'dev-studio': 'Dev Studio',
  'data-collection': 'Data Collection Ecosystem',
  'government-data': 'Government Data Sandbox',
  learn: 'Learn',
  community: 'Community',
  impact: 'Impact'
};

const ROUTE_FILES = {
  home: 'index.html',
  'innovation-arena': 'innovation-arena.html',
  'hackathon-arena': 'hackathon-arena.html',
  'dev-studio': 'dev-studio.html',
  'data-collection': 'data-collection.html',
  'government-data': 'government-data.html',
  learn: 'learn.html',
  community: 'community.html',
  impact: 'impact.html'
};

const innovationStages = [
  {
    title: 'Idea Registration',
    summary: 'Submit idea & select resources',
    intro: 'Submit your innovative idea with required data sources and infrastructure needs',
    details: [
      ['Idea Submission', 'Describe your project, problem statement, and expected impact on governance'],
      ['Data Source Selection', 'Choose from DataLake, Lens, AWARE, and other AP government data platforms'],
      ['Infra Requirements', 'Specify CPU, GPU, SSD, and compute resources needed for your project'],
      ['Model Selection', 'Pick from open models (LLaMA, Mistral) or closed models (GPT-4, Gemini)']
    ]
  },
  { title: 'Technical Review', summary: 'Expert committee evaluation' },
  { title: 'POC Stage', summary: 'Real data, feedback & demo' },
  { title: 'Funding Decision', summary: 'Sponsorship or self-funded' },
  { title: 'State-Level Dev', summary: 'Statewide scaling' },
  { title: 'UAT', summary: 'Security Audit & Ethical Compliance' },
  { title: 'Marketplace & Impact', summary: 'Brief' }
];

const coreFeatures = [
  {
    key: 'compute',
    title: 'Distributed AI Infrastructure',
    points: ['Provide shared GPU compute', 'Enable innovation through cloud environments', 'Ensure scalable ecosystem access'],
    route: 'dev-studio'
  },
  {
    key: 'skills',
    title: 'Skilling & Certification Hub',
    points: ['Deliver AI certification pathways', 'Integrate AI into education', 'Empower students and professionals'],
    route: 'learn'
  },
  {
    key: 'data',
    title: 'Government Data Sandbox',
    points: ['Provide secure government datasets', 'Enable innovation across sectors', 'Ensure federated access'],
    route: 'government-data'
  },
  {
    key: 'hackathon',
    title: 'Hackathon Arena',
    points: ['Organize government challenge hackathons', 'Solve real citizen problems', 'Reward impactful solutions'],
    route: 'hackathon-arena'
  },
  {
    key: 'marketplace',
    title: 'Public Marketplace',
    points: ['Enable public AI procurement', 'Create transparent deployment', 'Encourage sustainable scaling'],
    route: 'impact'
  },
  {
    key: 'research',
    title: 'Applied Research & Ethics',
    points: ['Advance AI research and innovation', 'Ensure bias detection and ethics', 'Promote responsible AI governance'],
    route: 'community'
  },
  {
    key: 'funding',
    title: 'Sources of Funding',
    points: [
      'Mobilize funding through government departments, CSR contributions, and global institutions like the World Bank and UN',
      'Enable sustainable financing via AI Living Labs Foundation on a revenue-sharing model',
      'Attract investment from angel investors, NGOs, and ecosystem partners'
    ],
    route: 'impact'
  },
  {
    key: 'collection',
    title: 'Data Collection Ecosystem',
    points: ['Request the data you need.', 'Contribute the data you have.', 'Earn rewards for fuelling Swarna Andhra’s AI'],
    route: 'data-collection'
  },
  {
    key: 'forum',
    title: 'Public Discussion Forum',
    points: [
      'Enable a public discussion forum to submit and discover real-world problems',
      'Facilitate community-driven discussion, refinement, and upvoting of ideas',
      'Empower government, startups, and individuals to adopt and convert ideas into projects'
    ],
    route: 'community'
  }
];

const atlasLayers = {
  compute: {
    index: '01',
    title: 'Shared GPU Infrastructure',
    text: 'Provide shared GPU compute. Enable innovation through cloud environments.',
    image: 'assets/ai-build.jpg',
    imageAlt: 'Three-dimensional modular AI compute and prototyping environment',
    position: ['25%', '21%']
  },
  data: {
    index: '02',
    title: 'Governed Data Sandbox',
    text: 'Provide secure government datasets. Enable innovation across sectors.',
    image: 'assets/ai-data.jpg',
    imageAlt: 'Three-dimensional governed AI data system',
    position: ['68%', '28%']
  },
  skills: {
    index: '03',
    title: 'Skilling & Certifications',
    text: 'Deliver AI certification pathways. Empower students and professionals.',
    image: 'assets/ai-learning.jpg',
    imageAlt: 'Three-dimensional AI learning and certification ecosystem',
    position: ['39%', '52%']
  },
  hackathon: {
    index: '04',
    title: 'Hackathons & Innovation Challenges',
    text: 'Organize government challenge hackathons. Solve real citizen problems.',
    image: 'assets/ai-deploy.jpg',
    imageAlt: 'Three-dimensional AI deployment network for innovation challenges',
    position: ['72%', '58%']
  },
  marketplace: {
    index: '05',
    title: 'AI Solutions Marketplace',
    text: 'Enable public AI procurement. Create transparent deployment.',
    image: 'assets/ai-hero.jpg',
    imageAlt: 'Luminous AI ecosystem for the public solutions marketplace',
    position: ['31%', '78%']
  },
  research: {
    index: '06',
    title: 'Mentorship and Research Journals',
    text: 'Advance AI research and innovation. Promote responsible AI governance.',
    image: 'assets/public-value.jpg',
    imageAlt: 'People collaborating on AI research for public value',
    position: ['63%', '84%']
  }
};

const publicValue = [
  {
    title: 'Real Public Problems',
    text: 'Every use case originates from an actual government challenge not a hypothetical or a hackathon prompt.'
  },
  {
    title: 'Responsible AI Adoption',
    text: 'All solutions are built under a governance framework that ensures fairness, transparency, and accountability.'
  },
  {
    title: 'Faster Innovation-to-Implementation',
    text: 'Structured pathways compress the journey from an idea to live deployment within months, not years.'
  },
  {
    title: 'Measurable Citizen Impact',
    text: 'Success is measured by citizen outcomes — better services, faster responses, and improved quality of life.'
  }
];

const statistics = [
  {
    value: 'One',
    title: 'One AI-Trained Individual Per Family',
    text: 'Empower every family with one AI-trained individual who can drive learning and digital confidence.'
  },
  {
    value: '$2.4T',
    title: '$2.4 Trillion GSDP Goal by 2047',
    text: 'Drive innovation and inclusive growth to support Andhra Pradesh’s long-term economic vision.'
  },
  {
    value: '',
    title: 'Government Backed. Future Ready.',
    text: 'Supported by government vision and built to drive future-ready innovation and growth.'
  }
];

const challenges = [
  {
    department: 'RTGS AGRICULTURE',
    difficulty: 'Intermediate',
    title: 'AI for Smart Agriculture',
    text: 'Build AI solutions for crop disease detection, yield prediction, and irrigation optimization using AP agricultural data.',
    prize: 1000000,
    prizeLabel: '10,00,000',
    teams: 45,
    deadline: '30 May 2026',
    date: '2026-05-30'
  },
  {
    department: 'RTGS - HEALTH',
    difficulty: 'Advanced',
    title: 'Healthcare Access in Rural AP',
    text: 'Create AI-powered telemedicine and diagnostic tools for rural health centers leveraging Sanjeevani data.',
    prize: 1500000,
    prizeLabel: '15,00,000',
    teams: 38,
    deadline: '20 May 2026',
    date: '2026-05-20'
  }
];

const studioModes = [
  {
    title: 'Conversational Studio',
    text: 'Build AI solutions using natural language prompts, guided workflows, and collaborative ideation tools designed for innovators, startups, and public sector problem-solvers.'
  },
  {
    title: 'Unsloth Studio',
    text: 'Accelerate AI experimentation with optimized model training, lightweight fine-tuning, and rapid deployment pipelines built for scalable innovation.'
  },
  {
    title: 'Code Editor',
    text: 'Develop, test, and deploy AI applications with integrated coding environments, APIs, datasets, and real-time debugging support for developers.'
  },
  {
    title: 'Train & Fine-tune',
    text: 'Pre-train, SFT, LoRA fine-tune, and RLHF your models with visual pipeline configurator and real-time monitoring.'
  },
  {
    title: 'No/Low Code',
    text: 'Create AI-powered workflows and applications visually using drag-and-drop tools, automation builders, and prebuilt government-ready AI components.'
  }
];

const integrations = [
  ['WhatsApp', 'Chatbot Integration'],
  ['IVR', 'Voice response systems'],
  ['SSO / Aadhaar', 'Secure authentication'],
  ['SMS / OTP', 'Messaging services'],
  ['N8N', 'Workflow automation'],
  ['VS Code', 'IDE extension'],
  ['Databases', 'PostgreSQL, MongoDB'],
  ['Analytics', 'Usage dashboards']
];

const contributionAudience = [
  ['College Students', 'Earn credits & certificates through university partnerships'],
  ['School Students', 'Supervised programs for young innovators'],
  ['Individuals', 'Freelance contributors — earn per task'],
  ['Organizations', 'Bulk data partnerships with institutions']
];

const contributionProjects = [
  {
    title: 'Telugu Speech Dataset',
    text: 'Record Telugu conversational speech samples for ASR model training. 5-10 second clips of natural speech',
    type: 'Speech', status: 'Active', completed: 67, tasks: '8,340 / 12,500 tasks', contributors: '1240 contributors', reward: '2/clip'
  },
  {
    title: 'Agricultural Crop Images',
    text: 'Photograph crop diseases, pest damage, and healthy crops across paddy, groundnut, and cotton fields.',
    type: 'Image', status: 'Active', completed: 65, tasks: '5,200 / 8,500 tasks', contributors: '680 contributors', reward: '5/clip'
  },
  {
    title: 'Govt Document Digitization',
    text: 'Transcribe and annotate scanned government documents in Telugu and English for NLP training.',
    type: 'Document', status: 'Active', completed: 74, tasks: '14,800 / 20,000 tasks', contributors: '920 contributors', reward: '3/page'
  },
  {
    title: 'Traffic Pattern Videos',
    text: 'Capture 30-second traffic footage at intersections for vehicle detection and flow analysis models.',
    type: 'Video', status: 'Active', completed: 37, tasks: '1,100 / 3,000 tasks', contributors: '340 contributors', reward: '10/clip'
  },
  {
    title: 'Medical Symptom Descriptions',
    text: 'Write symptom descriptions in Telugu for healthcare chatbot training. Voluntary contribution.',
    type: 'Text', status: 'Completed', completed: 100, tasks: '5,000 / 5,000 tasks', contributors: '680 contributors', reward: 'Voluntary'
  },
  {
    title: 'Satellite Image Annotation',
    text: 'Label land-use types (urban, agricultural, water body, forest) in satellite imagery tiles.',
    type: 'Satellite', status: 'Active', completed: 30, tasks: '1,800 / 6,000 tasks', contributors: '920 contributors', reward: '3/page'
  }
];

const governmentDatasets = [
  {
    department: 'Agriculture',
    type: 'CSV',
    title: 'Agricultural Data',
    source: 'DataLake',
    text: 'Comprehensive agricultural dataset covering 13 districts with crop patterns, soil analysis, and real-time market data.',
    records: '24.5M', fields: '180+', updated: 'Daily', tags: ['Crop Yield', 'Soil Health', 'Weather', 'Market Prices'], access: 'Open Access'
  },
  {
    department: 'Health',
    type: 'HL7',
    title: 'Health Records',
    source: 'Sanjeevani / AWARE',
    text: 'Anonymized health records from primary health centers, district hospitals, and ASHA worker surveys across AP.',
    records: '18.2M', fields: '240+', updated: 'Real-time', tags: ['Patient Records', 'Hospital Data', 'Diagnostics', 'Immunization'], access: 'Approval Required'
  },
  {
    department: 'Education',
    type: 'JSON',
    title: 'Educational Data',
    source: 'DataLake',
    text: 'Comprehensive education dataset with enrollment, attendance, performance analytics, and infrastructure information.',
    records: '8.7M', fields: '120+', updated: 'Weekly', tags: ['Enrollment', 'Attendance', 'Performance', 'Infrastructure'], access: 'Open Access'
  }
];

const partners = [
  { key: 'nvidia', name: 'NVIDIA', logo: 'assets/partner-nvidia.png', width: 715, height: 136 },
  { key: 'nxtgen', name: 'NxtGen', logo: 'assets/partner-nxtgen.png', width: 587, height: 135 },
  { key: 'ibm-cloud', name: 'IBM Cloud', logo: 'assets/partner-ibm-cloud.png', width: 700, height: 500 },
  { key: 'corover-bharatgpt', name: 'CoRover.ai and BharatGPT', logo: 'assets/partner-corover-bharatgpt.png', width: 698, height: 78 },
  { key: 'calibo', name: 'Calibo', logo: 'assets/partner-calibo.png', width: 937, height: 254 }
];

let state = {
  route: getRoute(),
  menuOpen: false,
  atlasLayer: 'compute',
  innovationStage: 0,
  studioTab: 'modes'
};

let modalReturnFocus = null;
let menuReturnFocus = null;
let homeHeroPlayed = false;

function getRoute() {
  const declaredRoute = document.body.dataset.route;
  if (ROUTES.includes(declaredRoute)) return declaredRoute;
  const fileName = window.location.pathname.split('/').pop() || 'index.html';
  return Object.entries(ROUTE_FILES).find(([, file]) => file === fileName)?.[0] || 'home';
}

function routeLink(route, label, className = '') {
  const comingSoon = COMING_SOON_ROUTES.has(route);
  const current = state?.route === route ? ' aria-current="page"' : '';
  const classes = [className, comingSoon ? 'coming-soon-link' : ''].filter(Boolean).join(' ');
  const availability = comingSoon ? ' data-coming-soon="Coming Soon"' : '';
  const accessibleStatus = comingSoon ? '<span class="visually-hidden"> - Coming Soon</span>' : '';
  return `<a href="${ROUTE_FILES[route] || ROUTE_FILES.home}" data-route="${route}" class="${classes}"${current}${availability}>${label}${accessibleStatus}</a>`;
}

function icon(name) {
  const paths = {
    spark: '<path d="M12 2l1.7 5.1L19 9l-5.3 1.9L12 16l-1.7-5.1L5 9l5.3-1.9L12 2Z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/>',
    chevron: '<path d="m8 10 4 4 4-4"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    arrow: '<path d="M5 12h14M14 7l5 5-5 5"/>',
    compute: '<rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 9h6v6H9zM9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
    data: '<ellipse cx="9" cy="5" rx="5.5" ry="2.5"/><path d="M3.5 5v5c0 1.4 2.5 2.5 5.5 2.5 1.1 0 2.2-.2 3-.5M3.5 10v5c0 1.4 2.5 2.5 5.5 2.5h1.5"/><path d="M16.5 11.5 21 13v3.5c0 2.4-1.8 4.4-4.5 5.5-2.7-1.1-4.5-3.1-4.5-5.5V13l4.5-1.5Z"/>',
    skills: '<path d="m3 9 9-5 9 5-9 5-9-5Z"/><path d="M7 11.5V16c2.8 2.2 7.2 2.2 10 0v-4.5M21 9v6"/><circle cx="21" cy="17" r="1"/>',
    hackathon: '<path d="M9 18h6M10 22h4M8.2 14.5A6 6 0 1 1 15.8 14.5c-.9.7-1.3 1.5-1.3 2.5h-5c0-1-.4-1.8-1.3-2.5Z"/><path d="M12 2V0M4.2 4.2 2.8 2.8M19.8 4.2l1.4-1.4M3 11H1M23 11h-2"/>',
    marketplace: '<path d="M5 8h14l1 13H4L5 8Z"/><path d="M8 9V6a4 4 0 0 1 8 0v3M8 14h3l2 3 3-5"/>',
    research: '<path d="M3.5 5.5c3.5-1.1 6.3-.4 8.5 1.7v12c-2.2-2.1-5-2.8-8.5-1.7v-12ZM20.5 5.5c-3.5-1.1-6.3-.4-8.5 1.7v12c2.2-2.1 5-2.8 8.5-1.7v-12Z"/>',
    vision: '<path d="M2.5 12s3.4-5.5 9.5-5.5 9.5 5.5 9.5 5.5-3.4 5.5-9.5 5.5S2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.8"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>',
    mission: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="m12 12 7-7M16 5h3v3"/>'
  };
  return `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.spark}</svg>`;
}

function header() {
  const innovateActive = ['innovation-arena', 'hackathon-arena', 'dev-studio'].includes(state.route);
  const dataActive = ['data-collection', 'government-data'].includes(state.route);
  const primary = `
    ${routeLink('home', 'Home', state.route === 'home' ? 'active' : '')}
    <details class="nav-dropdown" ${innovateActive ? 'data-current="true"' : ''}>
      <summary class="${innovateActive ? 'active' : ''}">Innovate ${icon('chevron')}</summary>
      <div class="nav-dropdown-menu">
        ${routeLink('innovation-arena', 'Innovation Arena')}
        ${routeLink('hackathon-arena', 'Hackathon Arena')}
        ${routeLink('dev-studio', 'Dev Studio')}
      </div>
    </details>
    <details class="nav-dropdown" ${dataActive ? 'data-current="true"' : ''}>
      <summary class="${dataActive ? 'active' : ''}">Data ${icon('chevron')}</summary>
      <div class="nav-dropdown-menu">
        ${routeLink('data-collection', 'Data Collection Ecosystem')}
        ${routeLink('government-data', 'Government Data Sandbox')}
      </div>
    </details>
    ${routeLink('learn', 'Learn', state.route === 'learn' ? 'active' : '')}
    ${routeLink('community', 'Community', state.route === 'community' ? 'active' : '')}
    ${routeLink('impact', 'Impact', state.route === 'impact' ? 'active' : '')}`;

  return `
    <header class="site-header" data-site-header>
      <div class="shell nav-shell">
        ${routeLink('home', '<span class="brand"><img src="assets/logo.png" width="1163" height="257" alt="AI Living Labs Foundation" /></span>', 'brand-link')}
        <nav class="desktop-nav" aria-label="Primary navigation">${primary}</nav>
        <button class="button button-primary signin-button" type="button" data-static-action aria-disabled="true">Sign In / Register</button>
        <button class="menu-button" type="button" data-action="menu" aria-expanded="${state.menuOpen}" aria-controls="mobile-navigation">
          <span class="visually-hidden">${state.menuOpen ? 'Close' : 'Open'} navigation</span>${icon(state.menuOpen ? 'close' : 'menu')}
        </button>
      </div>
      <nav id="mobile-navigation" class="mobile-nav ${state.menuOpen ? 'open' : ''}" aria-label="Mobile navigation" aria-hidden="${!state.menuOpen}" ${state.menuOpen ? '' : 'inert'}>
        <div class="mobile-nav-inner">${primary}<button class="button button-primary" type="button" data-static-action aria-disabled="true">Sign In / Register</button></div>
      </nav>
    </header>
    <button class="menu-backdrop mobile-nav-backdrop ${state.menuOpen ? 'open' : ''}" type="button" data-action="menu-close" tabindex="-1" aria-hidden="true" aria-label="Close navigation"></button>`;
}

function homePage() {
  return `
    <main id="main-content">
      <section class="hero ppt-hero" aria-labelledby="home-title">
        <div class="shell hero-grid">
          <div class="hero-copy">
            <p class="hero-kicker hero-copy-reveal" style="--enter-delay: 20ms">India’s First Governed AI Co-Creation Ecosystem</p>
            <h1 id="home-title" class="hero-title">
              <span class="hero-line" style="--line-delay: 40ms"><span class="hero-line-inner">Building India’s First</span></span>
              <span class="hero-line gradient-text" style="--line-delay: 105ms"><span class="hero-line-inner">State Wide AI</span></span>
              <span class="hero-line gradient-text" style="--line-delay: 170ms"><span class="hero-line-inner">Co-Creation Ecosystem</span></span>
            </h1>
            <p class="hero-text hero-copy-reveal" style="--enter-delay: 260ms">A State wide AI ecosystem that democratize access to infrastructure, data, and skills empowering every family and transforming real-world challenges into scalable innovations.</p>
            <div class="button-row hero-copy-reveal" style="--enter-delay: 320ms">
              ${routeLink('innovation-arena', `Enter Innovation Arena ${icon('arrow')}`, 'button button-primary')}
            </div>
            <ul class="hero-signal-grid hero-copy-reveal" style="--enter-delay: 390ms" aria-label="AI Living Labs foundations">
              <li class="hero-signal-card"><span class="hero-signal-icon">${icon('compute')}</span><span>Shared AI Compute</span></li>
              <li class="hero-signal-card"><span class="hero-signal-icon">${icon('data')}</span><span>Governed Data</span></li>
              <li class="hero-signal-card"><span class="hero-signal-icon">${icon('skills')}</span><span>Future-Ready Skills</span></li>
            </ul>
          </div>
          ${heroAtlasMarkup()}
        </div>
      </section>
      ${leadershipSection()}
      ${foundationSection()}
      ${ecosystemLayersSection()}
      ${statsSection()}
      ${publicValueSection()}
      ${coreFeaturesSection()}
      ${innovationPipelineSection(true)}
      ${partnersSection()}
    </main>`;
}

function heroAtlasMarkup() {
  return `
    <figure class="atlas-stage hero-atlas-stage">
      <div class="atlas-object">
        <img src="assets/ap-map-gradient-feathered.png" width="1370" height="1148" alt="Andhra Pradesh innovation map with a softly feathered AI Living Labs gradient outline" fetchpriority="high" decoding="async" />
      </div>
    </figure>`;
}

function ecosystemLayersSection() {
  const active = atlasLayers[state.atlasLayer];
  return `
    <section class="section ecosystem-layers-section" aria-labelledby="ecosystem-layers-title">
      <div class="shell">
        <div class="ecosystem-heading">
          <h2 id="ecosystem-layers-title">India’s First Governed AI <span>Co-Creation Ecosystem</span></h2>
          <p>Shared infrastructure, governed data access, and collaborative platforms.</p>
        </div>
        <div class="ecosystem-layout">
          <div class="ecosystem-tabs" role="tablist" aria-label="AI ecosystem layers">
            ${Object.entries(atlasLayers).map(([key, item]) => `<button id="atlas-tab-${key}" type="button" role="tab" tabindex="${key === state.atlasLayer ? '0' : '-1'}" aria-selected="${key === state.atlasLayer}" aria-controls="atlas-panel" class="ecosystem-tab ${key === state.atlasLayer ? 'selected' : ''}" data-atlas-tab="${key}"><span class="ecosystem-tab-icon">${icon(key)}</span><span class="ecosystem-tab-label"><small>${item.index}</small><strong>${item.title}</strong></span><span class="ecosystem-tab-arrow">${icon('arrow')}</span></button>`).join('')}
          </div>
          <article id="atlas-panel" class="ecosystem-panel" role="tabpanel" aria-labelledby="atlas-tab-${state.atlasLayer}" tabindex="0">
            <div class="ecosystem-media">
              <img id="atlas-context-image" class="atlas-context-image" src="${active.image}" width="1400" height="895" alt="${active.imageAlt}" loading="lazy" decoding="async" />
              <span class="ecosystem-media-scan" aria-hidden="true"></span>
            </div>
            <div class="ecosystem-copy">
              <span id="atlas-index">${active.index}</span>
              <div><h3 id="atlas-title">${active.title}</h3><p id="atlas-copy">${active.text}</p></div>
            </div>
          </article>
        </div>
      </div>
    </section>`;
}

function leadershipSection() {
  const leaders = [
    {
      image: 'assets/chandrababu-naidu.png',
      alt: 'Sri Nara Chandra Babu Naidu',
      quote: 'Democratizing AI through shared infrastructure, empowering every family with future-ready skills, and transforming real-world challenges into scalable solutions.',
      name: 'Sri Nara Chandra Babu Naidu',
      title: 'Hon’ble Chief Minister of Andhra Pradesh'
    },
    {
      image: 'assets/nara-lokesh.png',
      alt: 'Sri Nara Lokesh',
      quote: 'AI Living Labs will be the launchpad for innovators, startups and researchers to build fast and deploy solutions that create real impact for our people.',
      name: 'Sri Nara Lokesh',
      title: 'Hon’ble Minister for IT, AP'
    }
  ];
  return `<section class="section leadership-section" aria-labelledby="leadership-title"><div class="shell"><div class="section-head compact"><div><p class="section-number">Government of Andhra Pradesh</p><h2 id="leadership-title">Leadership</h2></div></div><div class="leadership-grid">${leaders.map((leader, index) => `<article class="leader-card"><div class="leader-portrait"><img src="${leader.image}" width="249" height="278" alt="${leader.alt}" loading="lazy" decoding="async" /></div><div class="leader-copy"><blockquote>${leader.quote}</blockquote><div class="leader-identity"><h3>${leader.name}</h3><p>${leader.title}</p></div></div><span class="leader-index" aria-hidden="true">0${index + 1}</span></article>`).join('')}</div></div></section>`;
}

function foundationSection() {
  const mission = [
    'Establishing AI Living Labs across Andhra Pradesh with shared GPU compute infrastructure.',
    'Providing shared GPU compute, AI tools, curated datasets, and secure sandbox access.',
    'Enabling skilling, certifications, curriculum integration, and industry training.',
    'Promoting applied research, inclusive AI models and governance.',
    'Building sustainable deployment ecosystems and innovation models.'
  ];
  return `<section class="section foundation-section" aria-labelledby="foundation-title"><div class="shell"><p class="section-number">What this platform is</p><h2 id="foundation-title" class="display-title gradient-text">AI Living Labs Foundation</h2><p class="foundation-intro">A state-led, not-for-profit (Section 8) initiative by the Government of Andhra Pradesh to build a future-ready AI ecosystem. The foundation enables applied innovation, workforce skilling, and real-world AI deployment by providing shared infrastructure, governed data access, and collaborative platforms. Operating under a hub-and-spoke model, it connects citizens, students, startups, researchers, and government departments to co-create and scale solutions that drive inclusive digital growth across sectors like agriculture, healthcare, education, and governance.</p><div class="vision-mission-grid"><article class="vision-story"><div class="vision-mission-body"><div class="vision-mission-label"><span>${icon('vision')}</span><p class="card-label">The Vision</p></div><h3>Swarna Andhra @2047 — India’s first governed AI Co-Creation Ecosystem.</h3><p>Empowering every family with future-ready skills and positioning Andhra Pradesh as a global leader in applied AI and innovation.</p></div><figure class="vision-mission-media"><img src="assets/public-value.jpg" width="1672" height="941" alt="Researcher and farmer using AI insights alongside an Andhra Pradesh innovation lab" loading="lazy" decoding="async" /></figure></article><article class="mission-story"><figure class="vision-mission-media"><img src="assets/ai-learning.jpg" width="1400" height="895" alt="Open book connected to a network of digital learning hubs" loading="lazy" decoding="async" /></figure><div class="vision-mission-body"><div class="vision-mission-label"><span>${icon('mission')}</span><p class="card-label">The Mission</p></div><ol class="mission-list">${mission.map((item, index) => `<li><span>${String(index + 1).padStart(2, '0')}</span><p>${item}</p></li>`).join('')}</ol></div></article></div></div></section>`;
}

function statsSection() {
  return `<section class="section stats-section" aria-label="Andhra Pradesh AI goals"><div class="shell stats-grid">${statistics.map((item, index) => `<article><span class="stat-index">0${index + 1}</span>${item.value ? `<strong>${item.value}</strong>` : ''}<h3>${item.title}</h3><p>${item.text}</p></article>`).join('')}</div></section>`;
}

function publicValueSection() {
  return `<section class="section public-value-section" aria-labelledby="public-value-title"><div class="shell"><div class="section-head"><div><p class="section-number">Why it matters</p><h2 id="public-value-title">Built for Real-World <span class="gradient-text">Public Value</span></h2></div><p>Designed to turn innovation into measurable outcomes that improve public services, strengthen governance, and create meaningful impact for communities</p></div><div class="public-value-grid">${publicValue.map((item, index) => `<article><span>0${index + 1}</span><h3>${item.title}</h3><p>${item.text}</p></article>`).join('')}</div></div></section>`;
}

function coreFeaturesSection() {
  return `<section class="section core-features-section" aria-labelledby="core-features-title"><div class="shell"><div class="section-head inverse"><div><p class="section-number">Core Features</p><h2 id="core-features-title">Powering Innovation. Solving <span>Real-World Problems.</span></h2></div><p>AI solutions in development and deployment across critical areas of public life in Andhra Pradesh.</p></div><div class="core-feature-grid">${coreFeatures.map((feature, index) => {
    return `<article class="core-feature-card" data-feature="${feature.key}"><span class="feature-number">${String(index + 1).padStart(2, '0')}</span><h3>${feature.title}</h3><ul>${feature.points.map((point) => `<li>${icon('spark')}<span>${point}</span></li>`).join('')}</ul>${routeLink(feature.route, `Explore ${icon('arrow')}`, 'feature-link')}</article>`;
  }).join('')}</div></div></section>`;
}

function innovationPipelineSection(compact = false, showHeading = true) {
  const heading = showHeading ? '<div class="pipeline-heading"><p class="section-number">Innovation Pipeline</p><h2 id="pipeline-title" class="gradient-text">Innovation Pipeline</h2><p>A transparent journey from idea to marketplace — with full infrastructure, mentoring, and governance support at every step. Click a stage to learn more.</p></div>' : '';
  if (compact) {
    const preview = `<div class="journey-track pipeline-preview" aria-label="Innovation Pipeline overview">${innovationStages.map((stage, index) => `<div class="journey-step"><span>${index + 1}</span><strong>${stage.title}</strong><small>${stage.summary}</small></div>`).join('')}</div><div class="pipeline-preview-action">${routeLink('innovation-arena', `Explore the full Innovation Pipeline ${icon('arrow')}`, 'button button-primary')}</div>`;
    return `<section class="section innovation-pipeline-section pipeline-home pipeline-home-compact" aria-labelledby="pipeline-title"><div class="shell">${heading}${preview}</div></section>`;
  }
  return `<section class="section innovation-pipeline-section" ${showHeading ? 'aria-labelledby="pipeline-title"' : 'aria-label="Innovation Pipeline stages"'}><div class="shell">${heading}${pipelineTabs()}${pipelineDetail()}</div></section>`;
}

function pipelineTabs() {
  return `<div class="journey-track pipeline-stage-navigation pipeline-nav" role="tablist" aria-label="Innovation pipeline stages">${innovationStages.map((stage, index) => `<button id="pipeline-tab-${index}" class="journey-step ${index === state.innovationStage ? 'selected' : ''}" type="button" role="tab" tabindex="${index === state.innovationStage ? '0' : '-1'}" aria-selected="${index === state.innovationStage}" aria-controls="pipeline-detail" aria-disabled="true" data-static-action><span>${index + 1}</span><strong>${stage.title}</strong><small>${stage.summary}</small></button>`).join('')}</div>`;
}

function pipelineDetail() {
  const stage = innovationStages[state.innovationStage];
  const previous = state.innovationStage - 1;
  const next = state.innovationStage + 1;
  return `<article id="pipeline-detail" class="pipeline-detail" role="tabpanel" aria-labelledby="pipeline-tab-${state.innovationStage}" tabindex="0"><div class="pipeline-detail-head"><span>Stage ${state.innovationStage + 1}</span><h3>${stage.title}</h3><p>${stage.intro || stage.summary}</p></div>${stage.details ? `<div class="pipeline-detail-grid">${stage.details.map((item) => `<div><h4>${item[0]}</h4><p>${item[1]}</p></div>`).join('')}</div>` : `<div class="pipeline-focus"><p>${stage.summary}</p></div>`}<div class="pipeline-pager"><button class="button button-secondary pipeline-nav-previous" type="button" data-static-action aria-disabled="true" ${previous < 0 ? 'disabled' : ''}>Previous stage</button><span aria-live="polite">${state.innovationStage + 1} / ${innovationStages.length}</span><button class="button button-primary pipeline-nav-next" type="button" data-static-action aria-disabled="true" ${next >= innovationStages.length ? 'disabled' : ''}>Next stage ${icon('arrow')}</button></div></article>`;
}

function partnersSection() {
  return `<section class="section partners-section" aria-labelledby="partners-title"><div class="shell"><h2 id="partners-title">Collaborating with diverse ecosystem partners to enable the development of responsible and impactful <span class="gradient-text">AI Solutions</span></h2><div class="partner-grid" aria-label="AI Living Labs ecosystem partners">${partners.map((partner) => `<div class="partner-item" data-partner="${partner.key}"><img src="${partner.logo}" width="${partner.width}" height="${partner.height}" alt="${partner.name}" loading="lazy" decoding="async" /></div>`).join('')}</div></div></section>`;
}

function pageHero(eyebrow, title, body, image, alt, action = null) {
  return `<section class="page-hero ppt-page-hero"><div class="shell page-hero-grid"><div class="page-hero-copy"><p class="route-label">${eyebrow}</p><h1>${title}</h1><p>${body}</p>${action ? `<div class="button-row"><button class="button button-primary" type="button" data-static-action aria-disabled="true">${action.label} ${icon('arrow')}</button></div>` : ''}</div><div class="page-hero-art"><img src="${image}" alt="${alt}" /></div></div></section>`;
}

function innovationArenaPage() {
  return `<main id="main-content">${pageHero('Innovate · Innovation Arena', 'Innovation Pipeline', 'A transparent journey from idea to marketplace — with full infrastructure, mentoring, and governance support at every step. Click a stage to learn more.', 'assets/ai-build.jpg', 'AI innovation development environment')}${innovationPipelineSection(false, false)}${partnersSection()}</main>`;
}

function hackathonArenaPage() {
  return `<main id="main-content">${pageHero('Innovate · Hackathon Arena', 'Solve Real Citizen & Government Challenges', 'Citizens propose problems via the discussion forum. Departments curate and add them to Hackathons. Participants get access to: CPUs, GPUs, API keys, Datasets, SSDs, Public IP, CoRoverAI no-code agent, Claude/Gemini/Copilot IDEs, SMS, WhatsApp, SSO, & Payment Gateways to build POCs.', 'assets/ai-deploy.jpg', 'AI deployment network for public challenges')}<section class="section listing-section"><div class="shell">${listingControls('challenge')}<p class="result-count" data-result-count="challenge" aria-live="polite">${challenges.length} challenges shown</p><div class="challenge-grid" data-card-grid="challenge">${challenges.map(challengeCard).join('')}</div></div></section></main>`;
}

function challengeCard(item, index) {
  return `<article class="challenge-card" data-card="challenge" data-search="${item.department} ${item.title} ${item.text}" data-department="${item.department}" data-difficulty="${item.difficulty}" data-prize="${item.prize}" data-date="${item.date}" data-order="${index}"><div class="card-pills"><span>active</span><span>${item.difficulty.toLowerCase()}</span></div><p class="card-label">${item.department}</p><h2>${item.title}</h2><p>${item.text}</p><dl class="challenge-meta"><div><dt>Prize Pool</dt><dd>${item.prizeLabel}</dd></div><div><dt>Teams</dt><dd>${item.teams}</dd></div><div><dt>Deadline</dt><dd>${item.deadline}</dd></div></dl><button class="button button-primary" type="button" data-static-action disabled>Register Team</button></article>`;
}

function devStudioPage() {
  const content = state.studioTab === 'modes'
    ? `<div class="studio-grid">${studioModes.map((item, index) => `<article><span>0${index + 1}</span><h2>${item.title}</h2><p>${item.text}</p></article>`).join('')}</div>`
    : `<div class="integration-grid">${integrations.map((item, index) => `<article><span>0${index + 1}</span><h2>${item[0]}</h2><p>${item[1]}</p></article>`).join('')}</div>`;
  return `<main id="main-content">${pageHero('Innovate · Dev Studio', 'Build With Powerful Modes', 'Choose your development style — from natural language to full training pipelines. Powered by NeMo, BharatGPT, and industry-leading AI.', 'assets/ai-build.jpg', 'AI development tools and modular studio environment', { label: 'Explore Now', target: 'studio-content' })}<section id="studio-content" class="section studio-section"><div class="shell"><div class="filter-bar studio-tabs" role="tablist" aria-label="Dev Studio sections"><button id="studio-tab-modes" type="button" role="tab" data-studio-tab="modes" aria-controls="studio-panel" aria-selected="${state.studioTab === 'modes'}" aria-disabled="true" tabindex="${state.studioTab === 'modes' ? '0' : '-1'}" class="filter-button ${state.studioTab === 'modes' ? 'selected' : ''}" data-static-action>Build modes</button><button id="studio-tab-integrations" type="button" role="tab" data-studio-tab="integrations" aria-controls="studio-panel" aria-selected="${state.studioTab === 'integrations'}" aria-disabled="true" tabindex="${state.studioTab === 'integrations' ? '0' : '-1'}" class="filter-button ${state.studioTab === 'integrations' ? 'selected' : ''}" data-static-action>Integrations & Services</button></div><div id="studio-panel" role="tabpanel" aria-labelledby="studio-tab-${state.studioTab}" tabindex="0" class="studio-panel">${content}</div></div></section></main>`;
}

function dataCollectionPage() {
  return `<main id="main-content">${pageHero('Data · Data Collection Ecosystem', 'Contribute Datasets & Get Paid', 'Upload multimodal datasets for AI projects. Users are paid based on the amount of quality datasets accepted, following rigorous standards defined by the AI Living Labs Foundation.', 'assets/ai-data.jpg', 'Governed data contribution ecosystem')}<section class="section audience-section"><div class="shell audience-grid">${contributionAudience.map((item, index) => `<article><span>0${index + 1}</span><h2>${item[0]}</h2><p>${item[1]}</p></article>`).join('')}</div></section><section class="section listing-section contribution-listing"><div class="shell">${listingControls('contribution')}<p class="result-count" data-result-count="contribution" aria-live="polite">${contributionProjects.length} opportunities shown</p><div class="contribution-grid" data-card-grid="contribution">${contributionProjects.map(contributionCard).join('')}</div></div></section></main>`;
}

function contributionCard(item, index) {
  return `<article class="contribution-card" data-card="contribution" data-search="${item.title} ${item.text} ${item.type}" data-type="${item.type}" data-status="${item.status}" data-completed="${item.completed}" data-order="${index}"><p class="card-label">${item.type}</p><h2>${item.title}</h2><p>${item.text}</p><div class="progress-track" aria-label="${item.completed}% complete"><span style="width:${item.completed}%"></span></div><div class="progress-meta"><strong>${item.tasks}</strong><strong>${item.completed}%</strong></div><div class="contribution-meta"><span>${item.contributors}</span><strong>${item.reward}</strong></div><div class="card-actions"><span class="status-pill">${item.status.toLowerCase()}</span><button class="button button-primary" type="button" data-static-action disabled>${item.status === 'Completed' ? 'Completed' : 'Contribute now'}</button></div></article>`;
}

function governmentDataPage() {
  return `<main id="main-content">${pageHero('Data · Government Data Sandbox', 'Government Data At Your Fingertips', 'Explore curated datasets from AP’s DataLake, Lens, and AWARE platforms spanning agriculture, health, education, revenue, and more.', 'assets/ai-data.jpg', 'Secure government data sandbox')}<section class="section listing-section government-data-listing"><div class="shell">${listingControls('government')}<p class="result-count" data-result-count="government" aria-live="polite">${governmentDatasets.length} datasets shown</p><div class="government-data-table" role="region" aria-label="Government dataset catalogue" tabindex="0"><div class="data-column-header government-data-columns" aria-hidden="true"><span>Dataset</span><span>Summary</span><span>Metrics</span><span>Domains</span><span>Access</span></div><div class="government-data-grid" data-card-grid="government">${governmentDatasets.map(governmentDataCard).join('')}</div></div></div></section></main>`;
}

function governmentDataCard(item, index) {
  return `<article class="government-data-card" data-card="government" data-search="${item.title} ${item.source} ${item.text} ${item.tags.join(' ')}" data-department="${item.department}" data-type="${item.type}" data-records="${parseFloat(item.records)}" data-order="${index}"><header><span class="data-icon" aria-hidden="true"></span><div><h2>${item.title}</h2><p>Source: ${item.source}</p></div></header><p>${item.text}</p><dl class="dataset-metrics"><div><dt>Records</dt><dd>${item.records}</dd></div><div><dt>Fields</dt><dd>${item.fields}</dd></div><div><dt>Updated</dt><dd>${item.updated}</dd></div><div><dt>Format</dt><dd>${item.type}</dd></div></dl><div class="tag-list">${item.tags.map((tag) => `<span>${tag}</span>`).join('')}</div><footer><strong class="${item.access === 'Open Access' ? 'open' : 'approval'}">${item.access}</strong><button class="button button-secondary" type="button" data-static-action disabled>${item.access === 'Open Access' ? 'Access Dataset' : 'Request Access'}</button></footer></article>`;
}

function comingSoonPage(eyebrow, title, body, image, alt) {
  return `<main id="main-content" class="coming-soon-page"><section class="coming-soon-hero" aria-labelledby="coming-soon-title"><div class="shell coming-soon-shell"><div class="coming-soon-copy"><p class="route-label">${eyebrow}</p><p class="coming-soon-status">${icon('spark')}<span>Coming Soon</span></p><h1 id="coming-soon-title">${title}</h1><p>${body}</p></div><div class="coming-soon-art"><img src="${image}" alt="${alt}" /><span class="coming-soon-orbit orbit-one" aria-hidden="true"></span><span class="coming-soon-orbit orbit-two" aria-hidden="true"></span><span class="coming-soon-core" aria-hidden="true"></span></div></div></section></main>`;
}

function learnPage() {
  return comingSoonPage('Learn', 'Skilling & Certification Hub', 'The learning experience is being prepared. Approved programme and access details will appear here when they are ready.', 'assets/ai-learning.jpg', 'AI learning and certification ecosystem');
}

function communityPage() {
  return comingSoonPage('Community', 'Public Discussion Forum', 'The community experience is being prepared. Approved participation details will appear here when they are ready.', 'assets/public-value.jpg', 'Community collaboration focused on public value');
}

function impactPage() {
  return comingSoonPage('Impact', 'Public Value & Outcomes', 'The impact experience is being prepared. Verified public-value outcomes and updates will appear here when they are ready.', 'assets/public-value.jpg', 'AI collaboration focused on public value');
}

function listingControls(kind) {
  return '';
}

function footer() {
  return `<footer><section class="footer-partners"><div class="shell"><p>Collaborating with diverse ecosystem partners to enable the development of responsible and impactful AI Solutions</p></div></section><div class="shell footer-grid"><div><img src="assets/logo.png" width="1163" height="257" alt="AI Living Labs Foundation" /><p>Block 1, Secretariat, Velagapudi,<br />Amaravathi, Andhra Pradesh, India.</p><form class="newsletter" data-form="newsletter"><label><span>Subscribe to our newsletter</span><span class="newsletter-row"><input required type="email" name="email" placeholder="Enter your Email Address..." /><button type="submit" data-static-action aria-disabled="true" aria-label="Subscribe">${icon('arrow')}</button></span></label></form></div><div><h2>Explore</h2>${routeLink('home', 'Home')}${routeLink('innovation-arena', 'Innovation Arena')}${routeLink('community', 'Community')}${routeLink('impact', 'Impact')}</div><div><h2>Core Features</h2>${routeLink('dev-studio', 'Distributed AI Infrastructure')}${routeLink('learn', 'Skilling & Certification Hub')}${routeLink('government-data', 'Governed Data Sandbox')}${routeLink('hackathon-arena', 'Hackathon Arena')}${routeLink('impact', 'Public Marketplace')}${routeLink('community', 'Applied Research & Ethics')}</div></div></footer>`;
}

function render({ routeChanged = false } = {}) {
  const pages = {
    home: homePage,
    'innovation-arena': innovationArenaPage,
    'hackathon-arena': hackathonArenaPage,
    'dev-studio': devStudioPage,
    'data-collection': dataCollectionPage,
    'government-data': governmentDataPage,
    learn: learnPage,
    community: communityPage,
    impact: impactPage
  };
  document.title = `${ROUTE_TITLES[state.route]} — AI Living Labs Foundation`;
  document.querySelector('#app').innerHTML = `${header()}${pages[state.route]()}${footer()}`;
  document.body.classList.toggle('menu-open', state.menuOpen);
  applyMobileMenuState();
  bindEvents();
  startHeroMotion();
  bindSectionReveals();
  if (routeChanged) postRouteTransition();
}

function applyMobileMenuState() {
  document.querySelectorAll('#main-content, #app > footer').forEach((region) => {
    if (state.menuOpen) {
      region.setAttribute('inert', '');
      region.setAttribute('aria-hidden', 'true');
    } else {
      region.removeAttribute('inert');
      region.removeAttribute('aria-hidden');
    }
  });
}

function postRouteTransition() {
  window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
    const root = document.documentElement;
    const body = document.body;
    const previousRootScroll = root.style.scrollBehavior;
    const previousBodyScroll = body.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    body.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    const heading = document.querySelector('#main-content h1');
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
    const status = document.querySelector('#route-status');
    if (status) status.textContent = `${ROUTE_TITLES[state.route]} page loaded`;
    root.style.scrollBehavior = previousRootScroll;
    body.style.scrollBehavior = previousBodyScroll;
  }));
}

function bindSectionReveals() {
  const sections = [...document.querySelectorAll('#main-content > section:not(.hero), #main-content .section, .footer-partners')];
  const uniqueSections = [...new Set(sections)];
  window.__aiLabsRevealObserver?.disconnect?.();
  uniqueSections.forEach((section) => section.classList.add('reveal-section'));
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    uniqueSections.forEach((section) => section.classList.add('is-revealed'));
    return;
  }
  window.__aiLabsRevealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  uniqueSections.forEach((section) => window.__aiLabsRevealObserver.observe(section));
}

function startHeroMotion() {
  const hero = document.querySelector('.hero');
  if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('motion-ready');
  if (homeHeroPlayed) {
    hero.classList.add('is-ready', 'hero-motion-complete');
    return;
  }
  homeHeroPlayed = true;
  window.requestAnimationFrame(() => window.requestAnimationFrame(() => hero.classList.add('is-ready')));
}

function bindEvents() {
  document.querySelectorAll('a[data-route]').forEach((link) => link.addEventListener('click', (event) => {
    const closesCurrentMobileRoute = state.menuOpen && link.dataset.route === state.route;
    if (closesCurrentMobileRoute) {
      event.preventDefault();
      closeMobileMenu();
      return;
    }
    state.menuOpen = false;
    document.body.classList.remove('menu-open');
    document.querySelector('.mobile-nav')?.classList.remove('open');
    document.querySelector('[data-action="menu"]')?.setAttribute('aria-expanded', 'false');
  }));
  document.querySelectorAll('.nav-dropdown').forEach((details) => details.addEventListener('toggle', () => {
    if (!details.open) return;
    document.querySelectorAll('.nav-dropdown[open]').forEach((other) => { if (other !== details) other.removeAttribute('open'); });
  }));
  document.querySelectorAll('[data-action]').forEach((button) => button.addEventListener('click', () => handleAction(button.dataset.action, button)));
  if (state.route === 'home') {
    document.querySelectorAll('[data-atlas-tab]').forEach((button) => {
      button.addEventListener('click', () => selectAtlasLayer(button.dataset.atlasTab));
    });
    bindRovingTabs();
  }
  document.querySelectorAll('[data-form="newsletter"]').forEach((form) => form.addEventListener('submit', (event) => event.preventDefault()));
  bindHeaderScroll();
}

function handleAction(action, opener) {
  if (action === 'menu') return state.menuOpen ? closeMobileMenu() : openMobileMenu(opener);
  if (action === 'menu-close') return closeMobileMenu();
  if (action === 'signin') {
    if (state.menuOpen) {
      state.menuOpen = false;
      menuReturnFocus = null;
      render();
      openSignInModal(document.querySelector('.signin-button'));
      return;
    }
    openSignInModal(opener);
  }
}

function openMobileMenu(opener) {
  menuReturnFocus = opener || document.activeElement;
  state.menuOpen = true;
  render();
  window.requestAnimationFrame(() => document.querySelector('#mobile-navigation a, #mobile-navigation summary, #mobile-navigation button')?.focus());
}

function closeMobileMenu(restoreFocus = true) {
  if (!state.menuOpen && !document.body.classList.contains('menu-open')) return;
  state.menuOpen = false;
  render();
  if (restoreFocus) {
    window.requestAnimationFrame(() => {
      const target = menuReturnFocus?.isConnected ? menuReturnFocus : document.querySelector('[data-action="menu"]');
      target?.focus();
      menuReturnFocus = null;
    });
  } else {
    menuReturnFocus = null;
  }
}

function selectAtlasLayer(key) {
  const layer = atlasLayers[key];
  if (!layer) return;
  state.atlasLayer = key;
  document.querySelectorAll('[data-atlas-tab]').forEach((button) => {
    const selected = button.dataset.atlasTab === key;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  document.querySelectorAll('[data-atlas-hotspot]').forEach((hotspot) => hotspot.classList.toggle('selected', hotspot.dataset.atlasHotspot === key));
  const index = document.querySelector('#atlas-index');
  const title = document.querySelector('#atlas-title');
  const copy = document.querySelector('#atlas-copy');
  if (index) index.textContent = layer.index;
  if (title) title.textContent = layer.title;
  if (copy) copy.textContent = layer.text;
  const contextImage = document.querySelector('#atlas-context-image');
  if (contextImage) {
    contextImage.src = layer.image;
    contextImage.alt = layer.imageAlt;
    contextImage.classList.remove('is-switching');
    void contextImage.offsetWidth;
    contextImage.classList.add('is-switching');
  }
  const stage = document.querySelector('[data-atlas-stage]');
  if (stage) stage.dataset.layer = key;
  const panel = document.querySelector('#atlas-panel');
  if (panel) panel.setAttribute('aria-labelledby', `atlas-tab-${key}`);
}

function selectInnovationStage(index) {
  if (!Number.isInteger(index) || index < 0 || index >= innovationStages.length) return;
  state.innovationStage = index;
  document.querySelectorAll('[data-stage]').forEach((button) => {
    const selected = Number(button.dataset.stage) === index;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  const current = document.querySelector('#pipeline-detail');
  if (current) current.outerHTML = pipelineDetail();
  bindPipelinePager();
}

function bindPipelinePager() {
  document.querySelectorAll('[data-stage-nav]').forEach((button) => button.addEventListener('click', () => {
    selectInnovationStage(Number(button.dataset.stageNav));
    document.querySelector('#pipeline-detail')?.focus({ preventScroll: true });
  }));
}

function bindRovingTabs() {
  document.querySelectorAll('[role="tablist"]').forEach((tablist) => {
    tablist.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
      const tabs = [...tablist.querySelectorAll('[role="tab"]')];
      if (!tabs.length) return;
      event.preventDefault();
      const current = tabs.indexOf(document.activeElement);
      let next = current;
      if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else next = (current + (['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1) + tabs.length) % tabs.length;
      tabs[next].focus();
      tabs[next].click();
    });
  });
}

function bindAtlasMotion() {
  const stage = document.querySelector('[data-atlas-stage]');
  const object = document.querySelector('[data-atlas-object]');
  if (!stage || !object || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  stage.addEventListener('pointermove', (event) => {
    const rect = stage.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    object.style.setProperty('--atlas-rotate-y', `${(x - .5) * 6}deg`);
    object.style.setProperty('--atlas-rotate-x', `${(.5 - y) * 4}deg`);
    object.style.setProperty('--atlas-shift-x', `${(x - .5) * 12}px`);
    object.style.setProperty('--atlas-shift-y', `${(y - .5) * 9}px`);
    stage.style.setProperty('--cursor-x', `${x * 100}%`);
    stage.style.setProperty('--cursor-y', `${y * 100}%`);
  });
  stage.addEventListener('pointerleave', () => {
    object.style.setProperty('--atlas-rotate-y', '0deg');
    object.style.setProperty('--atlas-rotate-x', '0deg');
    object.style.setProperty('--atlas-shift-x', '0px');
    object.style.setProperty('--atlas-shift-y', '0px');
    stage.style.setProperty('--cursor-x', '50%');
    stage.style.setProperty('--cursor-y', '45%');
  });
}

function bindHeaderScroll() {
  const header = document.querySelector('[data-site-header]');
  if (!header) return;
  const update = () => header.classList.toggle('compact', window.scrollY > 32);
  update();
  window.removeEventListener('scroll', window.__aiLabsHeaderScroll);
  window.__aiLabsHeaderScroll = update;
  window.addEventListener('scroll', update, { passive: true });
}

function bindListingControls(kind) {
  const controls = document.querySelector(`[data-controls="${kind}"]`);
  if (!controls) return;
  controls.querySelectorAll('input, select').forEach((control) => control.addEventListener(control.matches('input') ? 'input' : 'change', () => updateListing(kind)));
  controls.querySelector('[data-clear-filters]')?.addEventListener('click', () => {
    controls.querySelectorAll('select').forEach((select) => { select.selectedIndex = 0; });
    const search = controls.querySelector('[data-search-input]');
    if (search) search.value = '';
    updateListing(kind);
    search?.focus();
  });
  updateListing(kind);
}

function updateListing(kind) {
  const controls = document.querySelector(`[data-controls="${kind}"]`);
  const grid = document.querySelector(`[data-card-grid="${kind}"]`);
  if (!controls || !grid) return;
  const query = controls.querySelector('[data-search-input]')?.value.trim().toLowerCase() || '';
  const filters = [...controls.querySelectorAll('[data-filter]')].reduce((values, select) => ({ ...values, [select.dataset.filter]: select.value }), {});
  const sort = controls.querySelector('[data-sort]')?.value || 'default';
  const defaultSort = kind === 'challenge' ? 'latest' : 'default';
  const filtersActive = Object.values(filters).some((value) => value !== 'All');
  const clearButton = controls.querySelector('[data-clear-filters]');
  if (clearButton) {
    const active = Boolean(query) || filtersActive || sort !== defaultSort;
    clearButton.hidden = !active;
    clearButton.setAttribute('aria-hidden', String(!active));
  }
  const cards = [...grid.querySelectorAll(`[data-card="${kind}"]`)];

  cards.forEach((card) => {
    const matchesSearch = !query || card.dataset.search.toLowerCase().includes(query);
    const matchesFilters = Object.entries(filters).every(([filter, value]) => value === 'All' || card.dataset[filter] === value);
    card.hidden = !(matchesSearch && matchesFilters);
  });

  cards.sort((a, b) => {
    if (sort === 'latest') return b.dataset.date.localeCompare(a.dataset.date);
    if (sort === 'oldest') return a.dataset.date.localeCompare(b.dataset.date);
    if (sort === 'prize') return Number(b.dataset.prize) - Number(a.dataset.prize);
    if (sort === 'progress') return Number(b.dataset.completed) - Number(a.dataset.completed);
    if (sort === 'records') return Number(b.dataset.records) - Number(a.dataset.records);
    return Number(a.dataset.order) - Number(b.dataset.order);
  }).forEach((card) => grid.appendChild(card));

  const visible = cards.filter((card) => !card.hidden).length;
  const noun = kind === 'challenge'
    ? (visible === 1 ? 'challenge' : 'challenges')
    : kind === 'contribution'
      ? (visible === 1 ? 'opportunity' : 'opportunities')
      : (visible === 1 ? 'dataset' : 'datasets');
  document.querySelector(`[data-result-count="${kind}"]`).textContent = `${visible} ${noun} shown`;
}

function openSignInModal(opener) {
  openModal('Sign In / Register', `<p class="modal-intro">Sign In / Register</p><form class="contact-form" data-modal-form="signin"><label><span>Your role</span><select required name="role"><option value="" selected disabled></option></select></label><label><span>Email address</span><input required type="email" name="email" autocomplete="email" /></label><button class="button button-primary" type="submit">Continue</button></form>`, opener);
}

function openContributionModal(title, opener) {
  openModal(title, `<p class="modal-intro">Contribute Datasets & Get Paid</p><form class="contact-form" data-modal-form="contribution"><label><span>Full name</span><input required name="name" autocomplete="name" /></label><label><span>Email address</span><input required type="email" name="email" autocomplete="email" /></label><label><span>Contributor type</span><select required name="type"><option value="" selected disabled></option></select></label><button class="button button-primary" type="submit">Contribute now</button></form>`, opener);
}

function openDatasetModal(title, access, opener) {
  const action = access === 'Open Access' ? 'Access Dataset' : 'Request Access';
  openModal(title, `<p class="modal-intro">${access}</p><form class="contact-form" data-modal-form="dataset"><label><span>Full name</span><input required name="name" autocomplete="name" /></label><label><span>Organization</span><input required name="organization" /></label><label><span>Email address</span><input required type="email" name="email" autocomplete="email" /></label><button class="button button-primary" type="submit">${action}</button></form>`, opener);
}

function openModal(title, content, opener) {
  modalReturnFocus = opener || document.activeElement;
  const root = document.querySelector('#modal-root');
  root.innerHTML = `<div class="modal-backdrop" data-modal-backdrop><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="modal-close" type="button" data-close-modal aria-label="Close dialog">${icon('close')}</button><h2 id="modal-title">${title}</h2>${content}</section></div>`;
  document.body.classList.add('modal-open');
  document.querySelector('#app')?.setAttribute('inert', '');
  document.querySelector('#app')?.setAttribute('aria-hidden', 'true');
  root.querySelector('[data-close-modal]').addEventListener('click', closeModal);
  root.querySelector('[data-modal-backdrop]').addEventListener('click', (event) => { if (event.target === event.currentTarget) closeModal(); });
  root.querySelector('[data-modal-form]')?.addEventListener('submit', submitModalForm);
  root.querySelector('[data-close-modal]').focus();
}

function closeModal() {
  const root = document.querySelector('#modal-root');
  if (!root?.children.length) return;
  root.innerHTML = '';
  document.body.classList.remove('modal-open');
  document.querySelector('#app')?.removeAttribute('inert');
  document.querySelector('#app')?.removeAttribute('aria-hidden');
  modalReturnFocus?.focus?.();
  modalReturnFocus = null;
}

function submitModalForm(event) {
  event.preventDefault();
  closeModal();
  showToast('Your request has been recorded.');
}

function submitNewsletter(event) {
  event.preventDefault();
  event.currentTarget.reset();
  showToast('Subscription recorded.');
}

function showToast(message) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(window.__aiLabsToastTimer);
  window.__aiLabsToastTimer = window.setTimeout(() => toast.classList.remove('show'), 3200);
}

function trapModalFocus(event) {
  const modal = document.querySelector('.modal');
  if (!modal || event.key !== 'Tab') return;
  const focusable = [...modal.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]')];
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
}

function trapMobileMenuFocus(event) {
  if (!state.menuOpen || event.key !== 'Tab' || document.querySelector('.modal')) return;
  const candidates = [
    document.querySelector('[data-action="menu"]'),
    ...document.querySelectorAll('#mobile-navigation a[href], #mobile-navigation summary, #mobile-navigation button:not([disabled]), #mobile-navigation input:not([disabled]), #mobile-navigation select:not([disabled])')
  ].filter((element) => element && element.getClientRects().length);
  if (!candidates.length) return;
  const first = candidates[0];
  const last = candidates[candidates.length - 1];
  if (!candidates.includes(document.activeElement)) {
    event.preventDefault();
    (event.shiftKey ? last : first).focus();
    return;
  }
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (document.querySelector('.modal')) closeModal();
    else if (state.menuOpen) closeMobileMenu();
    else document.querySelectorAll('.nav-dropdown[open]').forEach((details) => details.removeAttribute('open'));
  }
  trapModalFocus(event);
  trapMobileMenuFocus(event);
});

document.addEventListener('click', (event) => {
  if (event.target.closest('.nav-dropdown')) return;
  document.querySelectorAll('.nav-dropdown[open]').forEach((dropdown) => dropdown.removeAttribute('open'));
});

function prefetchAtlasImages() {
  [...new Set(Object.values(atlasLayers).map((layer) => layer.image))].forEach((src) => {
    const image = new Image();
    image.decoding = 'async';
    image.src = src;
  });
}

if ('requestIdleCallback' in window) window.requestIdleCallback(prefetchAtlasImages, { timeout: 1800 });
else window.setTimeout(prefetchAtlasImages, 900);

render();
