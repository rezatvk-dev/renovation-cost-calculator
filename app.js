(function () {
  'use strict';

  const STORAGE_KEY = 'reno_calc_config_v1';
  const LEADS_KEY = 'reno_calc_leads_v1';

  const ICONS = {
    kitchen: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/><circle cx="6.5" cy="6" r="1"/><circle cx="10.5" cy="6" r="1"/></svg>',
    bathroom: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1z"/><path d="M6 12V5a2 2 0 0 1 2-2h3v2.25"/><line x1="7" y1="20" x2="6" y2="22"/><line x1="17" y1="20" x2="18" y2="22"/></svg>',
    basement: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M3 9l9-6 9 6v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><line x1="3" y1="14" x2="21" y2="14"/><line x1="9" y1="14" x2="9" y2="22"/></svg>',
    living: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0z"/><line x1="4" y1="18" x2="4" y2="20"/><line x1="20" y1="18" x2="20" y2="20"/></svg>',
    suite: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>',
    wholehome: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5z"/></svg>',
    size: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>',
    cosmetic: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M19 3H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"/><path d="M12 11v10"/><line x1="9" y1="21" x2="15" y2="21"/></svg>',
    partial: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    fullgut: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h.01"/><path d="M17 12h.01"/><path d="M7 12h.01"/></svg>',
    tier1: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    tier2: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    tier3: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M6 3h12l4 6-10 13L2 9z"/><path d="M2 9h20"/></svg>',
    extra: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
    check: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>'
  };

  function getDefaultConfig() {
    return {
      companyName: 'Oakridge Home Remodeling',
      teamEmail: 'estimates@oakridgeremodeling.com',
      currency: '$',
      rangeVariancePct: 10,
      rooms: [
        {
          id: 'kitchen',
          name: 'Kitchen Remodel',
          desc: 'Cabinetry, countertops, island, backsplash, lighting & appliances.',
          icon: 'kitchen',
          baseFixed: 6500,
          ratePerSqft: 115,
          minSqft: 70,
          maxSqft: 400,
          sizes: [
            { id: 'sm', label: 'Compact / Galley', sqft: 100, desc: 'Up to ~110 sq ft' },
            { id: 'md', label: 'Standard Family', sqft: 165, desc: '120 – 200 sq ft', popular: true },
            { id: 'lg', label: 'Large Chef Kitchen', sqft: 250, desc: '210 – 300 sq ft' },
            { id: 'xl', label: 'Open-Concept Estate', sqft: 340, desc: '300+ sq ft' }
          ],
          timeline: '5–8 weeks'
        },
        {
          id: 'bathroom',
          name: 'Bathroom Remodel',
          desc: 'Tilework, vanity, walk-in shower or tub, plumbing fixtures & lighting.',
          icon: 'bathroom',
          baseFixed: 4200,
          ratePerSqft: 135,
          minSqft: 35,
          maxSqft: 220,
          sizes: [
            { id: 'sm', label: 'Powder / Half Bath', sqft: 45, desc: '35 – 55 sq ft' },
            { id: 'md', label: 'Guest / Hall Full Bath', sqft: 80, desc: '60 – 100 sq ft', popular: true },
            { id: 'lg', label: 'Primary En-Suite', sqft: 130, desc: '110 – 160 sq ft' },
            { id: 'xl', label: 'Spa Primary Bath', sqft: 185, desc: '165+ sq ft' }
          ],
          timeline: '3–5 weeks'
        },
        {
          id: 'basement',
          name: 'Basement Finishing',
          desc: 'Framing, insulation, drywall, LVP flooring, egress & entertainment zones.',
          icon: 'basement',
          baseFixed: 7500,
          ratePerSqft: 52,
          minSqft: 300,
          maxSqft: 1600,
          sizes: [
            { id: 'sm', label: 'Partial / Rec Zone', sqft: 450, desc: '300 – 550 sq ft' },
            { id: 'md', label: 'Standard Basement', sqft: 750, desc: '600 – 900 sq ft', popular: true },
            { id: 'lg', label: 'Full Lower Level', sqft: 1100, desc: '950 – 1,250 sq ft' },
            { id: 'xl', label: 'Walkout Multi-Room', sqft: 1450, desc: '1,300+ sq ft' }
          ],
          timeline: '6–9 weeks'
        },
        {
          id: 'living',
          name: 'Living & Open Floorplan',
          desc: 'Flooring, millwork, built-ins, fireplace wall, lighting & wall removal.',
          icon: 'living',
          baseFixed: 3800,
          ratePerSqft: 48,
          minSqft: 180,
          maxSqft: 900,
          sizes: [
            { id: 'sm', label: 'Single Living Room', sqft: 240, desc: '180 – 280 sq ft' },
            { id: 'md', label: 'Living + Dining', sqft: 420, desc: '300 – 500 sq ft', popular: true },
            { id: 'lg', label: 'Great Room Concept', sqft: 620, desc: '520 – 720 sq ft' },
            { id: 'xl', label: 'Full Main Level', sqft: 820, desc: '750+ sq ft' }
          ],
          timeline: '3–6 weeks'
        },
        {
          id: 'suite',
          name: 'Primary Bedroom Suite',
          desc: 'Bedroom refresh, walk-in closet buildout, lighting & acoustic insulation.',
          icon: 'suite',
          baseFixed: 4500,
          ratePerSqft: 65,
          minSqft: 160,
          maxSqft: 650,
          sizes: [
            { id: 'sm', label: 'Standard Bedroom', sqft: 200, desc: '160 – 230 sq ft' },
            { id: 'md', label: 'Bedroom + Walk-In', sqft: 320, desc: '250 – 380 sq ft', popular: true },
            { id: 'lg', label: 'Owner Retreat Suite', sqft: 460, desc: '400 – 520 sq ft' },
            { id: 'xl', label: 'Luxury Wing Expansion', sqft: 600, desc: '550+ sq ft' }
          ],
          timeline: '4–6 weeks'
        },
        {
          id: 'wholehome',
          name: 'Whole-Home Interior',
          desc: 'Comprehensive multi-room renovation with cohesive finishes throughout.',
          icon: 'wholehome',
          baseFixed: 15000,
          ratePerSqft: 68,
          minSqft: 900,
          maxSqft: 4000,
          sizes: [
            { id: 'sm', label: 'Condo / Townhome', sqft: 1150, desc: '900 – 1,400 sq ft' },
            { id: 'md', label: 'Mid-Size Family Home', sqft: 1850, desc: '1,500 – 2,200 sq ft', popular: true },
            { id: 'lg', label: 'Large 4+ Bed Home', sqft: 2650, desc: '2,300 – 3,000 sq ft' },
            { id: 'xl', label: 'Executive Residence', sqft: 3400, desc: '3,100+ sq ft' }
          ],
          timeline: '10–16 weeks'
        }
      ],
      scopes: [
        {
          id: 'cosmetic',
          name: 'Cosmetic Refresh',
          desc: 'Keep existing layout. Paint, surfaces, hardware, lighting & minor updates.',
          multiplier: 0.78,
          icon: 'cosmetic'
        },
        {
          id: 'partial',
          name: 'Pull & Replace Remodel',
          desc: 'New cabinets/fixtures/flooring in existing footprint without moving main plumbing.',
          multiplier: 1.0,
          popular: true,
          icon: 'partial'
        },
        {
          id: 'fullgut',
          name: 'Full Gut & Layout Redesign',
          desc: 'Down to studs, layout reconfiguration, plumbing/electrical relocation & framing.',
          multiplier: 1.42,
          icon: 'fullgut'
        }
      ],
      materials: [
        {
          id: 'standard',
          name: 'Builder Select',
          desc: 'Durable, clean stock cabinetry, LVP/ceramic tile, and trusted name-brand fixtures.',
          multiplier: 0.9,
          icon: 'tier1'
        },
        {
          id: 'midrange',
          name: 'Designer Mid-Range',
          desc: 'Semi-custom shaker cabinets, quartz surfaces, porcelain tile & upgraded brass/matte hardware.',
          multiplier: 1.15,
          popular: true,
          icon: 'tier2'
        },
        {
          id: 'luxury',
          name: 'Architectural Luxury',
          desc: 'Bespoke inset millwork, natural slab stone, designer lighting & commercial-grade fixtures.',
          multiplier: 1.55,
          icon: 'tier3'
        }
      ],
      extras: [
        { id: 'k_island', roomId: 'kitchen', name: 'Waterfall Quartz Island Upgrade', desc: 'Extended seating island with electrical & pendant rough-ins', price: 3800 },
        { id: 'k_lighting', roomId: 'kitchen', name: 'Under-Cabinet & Toe-Kick LED Package', desc: 'Warm dimmable architectural task lighting', price: 1450 },
        { id: 'k_pantry', roomId: 'kitchen', name: 'Custom Walk-In / Pull-Out Pantry', desc: 'Built-in spice, drawer & appliance garage organizers', price: 2600 },
        { id: 'b_heated', roomId: 'bathroom', name: 'Radiant Heated Tile Flooring', desc: 'Programmable smart thermostat electric floor warming', price: 1650 },
        { id: 'b_glass', roomId: 'bathroom', name: 'Frameless Heavy Glass Shower Enclosure', desc: '3/8" tempered custom architectural glass + niche', price: 2200 },
        { id: 'b_tub', roomId: 'bathroom', name: 'Freestanding Soaking Tub + Floor Filler', desc: 'Includes rough-in drain & freestanding faucet', price: 2950 },
        { id: 'bs_bar', roomId: 'basement', name: 'Wet Bar / Kitchenette Addition', desc: 'Sink plumbing, cabinetry, beverage fridge & counter', price: 5400 },
        { id: 'bs_bath', roomId: 'basement', name: 'Add 3-Piece Basement Bathroom', desc: 'Shower, vanity, toilet & rough-in plumbing', price: 8900 },
        { id: 'bs_egress', roomId: 'basement', name: 'Code-Compliant Egress Window', desc: 'Concrete cut, window well & natural daylight upgrade', price: 3600 },
        { id: 'all_wall', roomId: 'all', name: 'Load-Bearing Wall Opening / Beam', desc: 'Structural LVL beam engineering & open-concept framing', price: 4800 },
        { id: 'all_permits', roomId: 'all', name: '3D Design Renderings & Permit Handling', desc: 'Photorealistic 3D views + full municipal permit filing', price: 1600 },
        { id: 'all_smart', roomId: 'all', name: 'Smart Dimmer & Recessed Lighting Pack', desc: 'Lutron smart dimmers + LED gimble recessed cans', price: 1350 }
      ]
    };
  }

  function loadConfig() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return getDefaultConfig();
  }

  function saveConfig(cfg) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  }

  function loadLeads() {
    try {
      const raw = localStorage.getItem(LEADS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return [
      {
        id: 'demo-1',
        date: 'Today, 10:14 AM',
        name: 'Sarah Jenkins',
        email: 'sarah.jenkins@example.com',
        phone: '(555) 234-8910',
        room: 'Kitchen Remodel (165 sq ft)',
        scope: 'Pull & Replace Remodel • Designer Mid-Range',
        range: '$31,200 – $38,100'
      }
    ];
  }

  function saveLeads(leads) {
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  }

  let config = loadConfig();
  let leads = loadLeads();

  const state = {
    step: 1,
    roomId: config.rooms[0].id,
    sizeId: 'md',
    sqft: config.rooms[0].sizes[1].sqft,
    scopeId: 'partial',
    materialId: 'midrange',
    selectedExtras: ['all_permits'],
    adminSubtab: 'rooms',
    lastLeadEmailData: null,
    activeEmailTab: 'customer'
  };

  const STEP_NAMES = [
    'Room Type',
    'Size',
    'Scope',
    'Materials',
    'Extras',
    'Estimate'
  ];

  // Helpers
  function getRoom() {
    return config.rooms.find(r => r.id === state.roomId) || config.rooms[0];
  }

  function getScope() {
    return config.scopes.find(s => s.id === state.scopeId) || config.scopes[0];
  }

  function getMaterial() {
    return config.materials.find(m => m.id === state.materialId) || config.materials[0];
  }

  function getRelevantExtras(roomId) {
    return config.extras.filter(ex => ex.roomId === roomId || ex.roomId === 'all');
  }

  function formatMoney(num) {
    const rounded = Math.round(num / 100) * 100;
    return config.currency + rounded.toLocaleString('en-US');
  }

  function calculateEstimate() {
    const room = getRoom();
    const scope = getScope();
    const material = getMaterial();

    const baseConstruction = room.baseFixed + (state.sqft * room.ratePerSqft);
    const adjustedCore = baseConstruction * scope.multiplier * material.multiplier;

    const validExtras = getRelevantExtras(room.id);
    const chosenExtras = validExtras.filter(e => state.selectedExtras.includes(e.id));
    const extrasTotal = chosenExtras.reduce((sum, e) => sum + Number(e.price || 0), 0);

    const midpoint = adjustedCore + extrasTotal;
    const spread = (Number(config.rangeVariancePct) || 10) / 100;
    const low = midpoint * (1 - spread);
    const high = midpoint * (1 + spread);

    return {
      low,
      high,
      midpoint,
      extrasTotal,
      chosenExtras,
      formattedRange: `${formatMoney(low)} – ${formatMoney(high)}`
    };
  }

  // Render Top Header & Progress
  function renderHeaderAndPrice(pulse = false) {
    document.getElementById('display-company-name').textContent = config.companyName;

    const indicatorsEl = document.getElementById('step-indicators');
    indicatorsEl.innerHTML = STEP_NAMES.map((label, idx) => {
      const sNum = idx + 1;
      const cls = sNum === state.step ? 'active' : (sNum < state.step ? 'completed' : '');
      const badgeContent = sNum < state.step ? ICONS.check : sNum;
      return `
        <button type="button" class="step-dot-btn ${cls}" data-goto-step="${sNum}">
          <span class="num">${badgeContent}</span>
          <span class="step-label-text">${label}</span>
        </button>
      `;
    }).join('');

    indicatorsEl.querySelectorAll('[data-goto-step]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.step = Number(btn.dataset.gotoStep);
        renderCalculator();
      });
    });

    const pct = (state.step / STEP_NAMES.length) * 100;
    document.getElementById('progress-fill').style.width = `${pct}%`;

    const est = calculateEstimate();
    const priceEl = document.getElementById('live-price-range');
    priceEl.textContent = est.formattedRange;
    if (pulse) {
      priceEl.classList.remove('pulse');
      void priceEl.offsetWidth;
      priceEl.classList.add('pulse');
      setTimeout(() => priceEl.classList.remove('pulse'), 240);
    }

    const room = getRoom();
    document.getElementById('live-duration-badge').textContent = `Est. timeline: ${room.timeline} • ${state.sqft} sq ft`;

    // Footer buttons & breadcrumb
    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');
    const footerEl = document.getElementById('step-footer');
    prevBtn.disabled = state.step === 1;

    if (state.step === 6) {
      nextBtn.style.display = 'none';
    } else {
      nextBtn.style.display = 'inline-flex';
      nextBtn.innerHTML = state.step === 5
        ? `Review Full Estimate <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`
        : `Continue <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`;
    }
    footerEl.style.display = 'flex';

    document.getElementById('selection-crumb').textContent =
      `${room.name} • ${state.sqft} sq ft • ${getScope().name}`;
  }

  function renderCalculator(pulsePrice = false) {
    renderHeaderAndPrice(pulsePrice);
    const container = document.getElementById('step-body');
    const room = getRoom();

    if (state.step === 1) {
      container.innerHTML = `
        <div class="step-heading">
          <div class="step-eyebrow">Step 1 of 6 — Space Selection</div>
          <h2>Which area of your home are you renovating?</h2>
          <p>Choose a room type below. Options and add-ons in the following steps automatically tailor to your space.</p>
        </div>
        <div class="options-grid">
          ${config.rooms.map(r => {
            const selected = r.id === state.roomId;
            return `
              <button type="button" class="option-card ${selected ? 'selected' : ''}" data-select-room="${r.id}">
                <div class="option-top">
                  <div class="option-icon">${ICONS[r.icon] || ICONS.wholehome}</div>
                  <div class="option-check">${ICONS.check}</div>
                </div>
                <div class="option-title">${escapeHtml(r.name)}</div>
                <div class="option-desc">${escapeHtml(r.desc)}</div>
                <div class="option-meta">
                  <span>Avg. ${escapeHtml(r.timeline)}</span>
                  <span>From ${config.currency}${r.ratePerSqft}/sq ft</span>
                </div>
              </button>
            `;
          }).join('')}
        </div>
      `;

      container.querySelectorAll('[data-select-room]').forEach(card => {
        card.addEventListener('click', () => {
          const newId = card.dataset.selectRoom;
          if (state.roomId !== newId) {
            state.roomId = newId;
            const newRoom = getRoom();
            const defaultSize = newRoom.sizes[1] || newRoom.sizes[0];
            state.sizeId = defaultSize.id;
            state.sqft = defaultSize.sqft;
            // Keep only valid extras for new room
            const validIds = getRelevantExtras(newId).map(e => e.id);
            state.selectedExtras = state.selectedExtras.filter(id => validIds.includes(id));
          }
          renderCalculator(true);
        });
      });
    }

    else if (state.step === 2) {
      container.innerHTML = `
        <div class="step-heading">
          <div class="step-eyebrow">Step 2 of 6 — Dimensions</div>
          <h2>Approximate size of your ${escapeHtml(room.name.toLowerCase())}?</h2>
          <p>Pick the closest preset size or fine-tune your exact square footage with the slider.</p>
        </div>
        <div class="options-grid cols-4">
          ${room.sizes.map(sz => {
            const selected = sz.id === state.sizeId;
            return `
              <button type="button" class="option-card ${selected ? 'selected' : ''}" data-select-size="${sz.id}">
                <div class="option-top">
                  <div class="option-icon">${ICONS.size}</div>
                  <div class="option-check">${ICONS.check}</div>
                </div>
                ${sz.popular ? '<div><span class="popular-ribbon">Most Common</span></div>' : ''}
                <div class="option-title">${escapeHtml(sz.label)}</div>
                <div class="option-desc">${escapeHtml(sz.desc)}</div>
                <div class="option-meta">
                  <span>~${sz.sqft} sq ft</span>
                </div>
              </button>
            `;
          }).join('')}
        </div>

        <div class="sqft-FineTune-box">
          <div class="sqft-header">
            <span>Fine-tune exact area (optional)</span>
            <span class="sqft-badge" id="sqft-readout">${state.sqft} sq ft</span>
          </div>
          <input type="range" class="sqft-slider" id="sqft-slider"
            min="${room.minSqft}" max="${room.maxSqft}" step="5" value="${state.sqft}" />
        </div>
      `;

      container.querySelectorAll('[data-select-size]').forEach(card => {
        card.addEventListener('click', () => {
          const sz = room.sizes.find(s => s.id === card.dataset.selectSize);
          if (sz) {
            state.sizeId = sz.id;
            state.sqft = sz.sqft;
            renderCalculator(true);
          }
        });
      });

      const slider = document.getElementById('sqft-slider');
      slider.addEventListener('input', () => {
        state.sqft = Number(slider.value);
        document.getElementById('sqft-readout').textContent = `${state.sqft} sq ft`;
        renderHeaderAndPrice(true);
      });
    }

    else if (state.step === 3) {
      container.innerHTML = `
        <div class="step-heading">
          <div class="step-eyebrow">Step 3 of 6 — Renovation Scope</div>
          <h2>How extensive is the renovation?</h2>
          <p>Let us know if we are working within your current layout or reconfiguring walls and mechanicals.</p>
        </div>
        <div class="options-grid">
          ${config.scopes.map(sc => {
            const selected = sc.id === state.scopeId;
            return `
              <button type="button" class="option-card ${selected ? 'selected' : ''}" data-select-scope="${sc.id}">
                <div class="option-top">
                  <div class="option-icon">${ICONS[sc.icon] || ICONS.partial}</div>
                  <div class="option-check">${ICONS.check}</div>
                </div>
                ${sc.popular ? '<div><span class="popular-ribbon">Most Popular</span></div>' : ''}
                <div class="option-title">${escapeHtml(sc.name)}</div>
                <div class="option-desc">${escapeHtml(sc.desc)}</div>
                <div class="option-meta">
                  <span>Scope Factor</span>
                  <span>${sc.multiplier}x</span>
                </div>
              </button>
            `;
          }).join('')}
        </div>
      `;

      container.querySelectorAll('[data-select-scope]').forEach(card => {
        card.addEventListener('click', () => {
          state.scopeId = card.dataset.selectScope;
          renderCalculator(true);
        });
      });
    }

    else if (state.step === 4) {
      container.innerHTML = `
        <div class="step-heading">
          <div class="step-eyebrow">Step 4 of 6 — Finish &amp; Materials Quality</div>
          <h2>What level of finishes &amp; materials do you envision?</h2>
          <p>Your finish tier guides allowances for cabinetry, tile, stone countertops, and plumbing fixtures.</p>
        </div>
        <div class="options-grid">
          ${config.materials.map(mat => {
            const selected = mat.id === state.materialId;
            return `
              <button type="button" class="option-card ${selected ? 'selected' : ''}" data-select-material="${mat.id}">
                <div class="option-top">
                  <div class="option-icon">${ICONS[mat.icon] || ICONS.tier2}</div>
                  <div class="option-check">${ICONS.check}</div>
                </div>
                ${mat.popular ? '<div><span class="popular-ribbon">Recommended</span></div>' : ''}
                <div class="option-title">${escapeHtml(mat.name)}</div>
                <div class="option-desc">${escapeHtml(mat.desc)}</div>
                <div class="option-meta">
                  <span>Material Tier</span>
                  <span>${mat.multiplier}x</span>
                </div>
              </button>
            `;
          }).join('')}
        </div>
      `;

      container.querySelectorAll('[data-select-material]').forEach(card => {
        card.addEventListener('click', () => {
          state.materialId = card.dataset.selectMaterial;
          renderCalculator(true);
        });
      });
    }

    else if (state.step === 5) {
      const relevantExtras = getRelevantExtras(room.id);
      container.innerHTML = `
        <div class="step-heading">
          <div class="step-eyebrow">Step 5 of 6 — Custom Upgrades &amp; Extras</div>
          <h2>Any optional upgrades for your ${escapeHtml(room.name.toLowerCase())}?</h2>
          <p>Select as many add-ons as you'd like (or skip straight to your estimate summary).</p>
        </div>
        <div class="options-grid">
          ${relevantExtras.map(ex => {
            const selected = state.selectedExtras.includes(ex.id);
            return `
              <button type="button" class="option-card ${selected ? 'selected' : ''}" data-toggle-extra="${ex.id}">
                <div class="option-top">
                  <div class="option-icon">${ICONS.extra}</div>
                  <div class="option-check">${ICONS.check}</div>
                </div>
                <div class="option-title">${escapeHtml(ex.name)}</div>
                <div class="option-desc">${escapeHtml(ex.desc)}</div>
                <div class="option-meta">
                  <span>Add-on Allowance</span>
                  <span>+${formatMoney(ex.price)}</span>
                </div>
              </button>
            `;
          }).join('')}
        </div>
      `;

      container.querySelectorAll('[data-toggle-extra]').forEach(card => {
        card.addEventListener('click', () => {
          const id = card.dataset.toggleExtra;
          if (state.selectedExtras.includes(id)) {
            state.selectedExtras = state.selectedExtras.filter(x => x !== id);
          } else {
            state.selectedExtras.push(id);
          }
          renderCalculator(true);
        });
      });
    }

    else if (state.step === 6) {
      const est = calculateEstimate();
      const scope = getScope();
      const material = getMaterial();
      const extrasNames = est.chosenExtras.length
        ? est.chosenExtras.map(e => `${escapeHtml(e.name)} (+${formatMoney(e.price)})`).join('<br>')
        : 'None selected';

      container.innerHTML = `
        <div class="step-heading">
          <div class="step-eyebrow">Final Step — Summary &amp; Itemized Copy</div>
          <h2>Your Renovation Estimate Summary</h2>
          <p>Review your selections below and enter your details to email a copy of this itemized breakdown to yourself.</p>
        </div>

        <div class="summary-layout">
          <div class="summary-box">
            <div class="summary-total-banner">
              <div class="eyebrow">Estimated Project Investment</div>
              <div class="big-range">${est.formattedRange}</div>
              <div class="note">Includes labor, rough materials, finish allowances &amp; ${room.timeline} est. schedule</div>
            </div>

            <div class="summary-list">
              <div class="summary-row">
                <span class="label">Room Type <button type="button" class="edit-step-link" data-jump="1">Edit</button></span>
                <span class="val">${escapeHtml(room.name)}</span>
              </div>
              <div class="summary-row">
                <span class="label">Dimensions <button type="button" class="edit-step-link" data-jump="2">Edit</button></span>
                <span class="val">${state.sqft} sq ft</span>
              </div>
              <div class="summary-row">
                <span class="label">Renovation Scope <button type="button" class="edit-step-link" data-jump="3">Edit</button></span>
                <span class="val">${escapeHtml(scope.name)}</span>
              </div>
              <div class="summary-row">
                <span class="label">Materials Quality <button type="button" class="edit-step-link" data-jump="4">Edit</button></span>
                <span class="val">${escapeHtml(material.name)}</span>
              </div>
              <div class="summary-row">
                <span class="label">Selected Extras <button type="button" class="edit-step-link" data-jump="5">Edit</button></span>
                <span class="val">${extrasNames}</span>
              </div>
            </div>
          </div>

          <form class="lead-form-card" id="lead-capture-form">
            <h3>Email My Detailed Breakdown</h3>
            <p>Get this itemized PDF-ready estimate sent to your inbox, plus schedule a complimentary on-site measurement if you're ready.</p>

            <div class="form-group">
              <label for="lead-name">Full Name *</label>
              <input type="text" id="lead-name" class="form-control" placeholder="e.g. Michael Carter" required />
            </div>

            <div class="form-group">
              <label for="lead-email">Email Address *</label>
              <input type="email" id="lead-email" class="form-control" placeholder="michael@example.com" required />
            </div>

            <div class="form-group">
              <label for="lead-phone">Phone Number *</label>
              <input type="tel" id="lead-phone" class="form-control" placeholder="(555) 890-1234" required />
            </div>

            <div class="form-group">
              <label for="lead-timeline">Target Start Timeframe</label>
              <select id="lead-timeline" class="form-control">
                <option value="Within 1–2 months">Within 1–2 months</option>
                <option value="In 3–6 months">In 3–6 months</option>
                <option value="Planning / Budgeting phase">Just budgeting &amp; researching</option>
              </select>
            </div>

            <button type="submit" class="btn btn-primary btn-full">
              Email My Detailed Estimate
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
            <div class="privacy-note">100% privacy respected. Instant copy sent to you &amp; our estimating team.</div>
          </form>
        </div>
      `;

      container.querySelectorAll('[data-jump]').forEach(btn => {
        btn.addEventListener('click', () => {
          state.step = Number(btn.dataset.jump);
          renderCalculator();
        });
      });

      document.getElementById('lead-capture-form').addEventListener('submit', e => {
        e.preventDefault();
        handleLeadSubmit();
      });
    }
  }

  function handleLeadSubmit() {
    const name = document.getElementById('lead-name').value.trim();
    const email = document.getElementById('lead-email').value.trim();
    const phone = document.getElementById('lead-phone').value.trim();
    const timeframe = document.getElementById('lead-timeline').value;

    const room = getRoom();
    const scope = getScope();
    const material = getMaterial();
    const est = calculateEstimate();

    const record = {
      id: 'lead-' + Date.now(),
      date: 'Just now',
      name,
      email,
      phone,
      timeframe,
      room: `${room.name} (${state.sqft} sq ft)`,
      scope: `${scope.name} • ${material.name}`,
      extras: est.chosenExtras.map(x => `${x.name} (+${formatMoney(x.price)})`),
      range: est.formattedRange,
      timelineEst: room.timeline
    };

    leads.unshift(record);
    saveLeads(leads);
    updateLeadBadges();

    state.lastLeadEmailData = record;
    state.activeEmailTab = 'customer';
    renderEmailModal();
    document.getElementById('email-modal').hidden = false;
  }

  function renderEmailModal() {
    const d = state.lastLeadEmailData;
    if (!d) return;

    document.querySelectorAll('.email-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.emailTab === state.activeEmailTab);
    });

    const body = document.getElementById('email-preview-body');
    const extrasHtml = d.extras.length
      ? `<ul>${d.extras.map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul>`
      : '<em>None selected</em>';

    if (state.activeEmailTab === 'customer') {
      body.innerHTML = `
        <div class="simulated-email">
          <div class="email-headers">
            <div><strong>To:</strong> ${escapeHtml(d.name)} &lt;${escapeHtml(d.email)}&gt;</div>
            <div><strong>From:</strong> ${escapeHtml(config.companyName)} &lt;${escapeHtml(config.teamEmail)}&gt;</div>
            <div><strong>Subject:</strong> Your ${escapeHtml(d.room)} Estimate (${d.range})</div>
          </div>
          <p>Hi ${escapeHtml(d.name)},</p>
          <p>Thank you for using the <strong>${escapeHtml(config.companyName)}</strong> Interactive Cost Estimator! Below is a summary of your preliminary renovation estimate:</p>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;margin:14px 0;">
            <div style="font-size:12px;color:#64748b;text-transform:uppercase;font-weight:700;">Preliminary Estimate Range</div>
            <div style="font-size:22px;font-weight:800;color:#c26d17;margin:4px 0;">${d.range}</div>
            <div style="font-size:13px;color:#475569;">Estimated Build Duration: ${escapeHtml(d.timelineEst)}</div>
          </div>
          <p><strong>Your Selections:</strong></p>
          <ul>
            <li><strong>Space &amp; Size:</strong> ${escapeHtml(d.room)}</li>
            <li><strong>Scope &amp; Finish Tier:</strong> ${escapeHtml(d.scope)}</li>
            <li><strong>Preferred Start:</strong> ${escapeHtml(d.timeframe)}</li>
          </ul>
          <p><strong>Selected Upgrades:</strong></p>
          ${extrasHtml}
          <p style="margin-top:14px;">Ready for an exact fixed-price quote? Reply directly to this email or call us to book a complimentary 20-minute walkthrough.</p>
          <p style="margin-bottom:0;">Warm regards,<br><strong>The ${escapeHtml(config.companyName)} Team</strong></p>
        </div>
      `;
    } else {
      body.innerHTML = `
        <div class="simulated-email">
          <div class="email-headers">
            <div><strong>To:</strong> Estimating Team &lt;${escapeHtml(config.teamEmail)}&gt;</div>
            <div><strong>Reply-To:</strong> ${escapeHtml(d.name)} &lt;${escapeHtml(d.email)}&gt;</div>
            <div><strong>Subject:</strong> [NEW WEBSITE LEAD] ${escapeHtml(d.name)} — ${escapeHtml(d.room)} (${d.range})</div>
          </div>
          <p><strong>New high-intent calculator estimate submitted on WordPress:</strong></p>
          <ul>
            <li><strong>Client Name:</strong> ${escapeHtml(d.name)}</li>
            <li><strong>Phone:</strong> <a href="tel:${escapeHtml(d.phone)}">${escapeHtml(d.phone)}</a></li>
            <li><strong>Email:</strong> ${escapeHtml(d.email)}</li>
            <li><strong>Target Start:</strong> ${escapeHtml(d.timeframe)}</li>
          </ul>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:12px 0;">
          <ul>
            <li><strong>Quoted Range:</strong> <strong>${d.range}</strong></li>
            <li><strong>Room &amp; Area:</strong> ${escapeHtml(d.room)}</li>
            <li><strong>Scope &amp; Materials:</strong> ${escapeHtml(d.scope)}</li>
          </ul>
          <p><strong>Add-Ons Requested:</strong></p>
          ${extrasHtml}
        </div>
      `;
    }
  }

  function updateLeadBadges() {
    const badge = document.getElementById('admin-lead-badge');
    badge.textContent = leads.length;
    badge.hidden = leads.length === 0;
    document.getElementById('subtab-lead-count').textContent = leads.length;
  }

  // WORDPRESS ADMIN RENDERER
  function renderAdmin() {
    document.querySelectorAll('.admin-subtab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.subtab === state.adminSubtab);
    });

    const panel = document.getElementById('admin-panel-content');

    if (state.adminSubtab === 'rooms') {
      panel.innerHTML = `
        <h3 style="margin-bottom:6px;">Room Categories &amp; Square-Foot Base Pricing</h3>
        <p style="margin:0 0 16px;font-size:13.5px;color:#475569;">Formula: <code>(Base Mobilization Fee + Sq Ft × Rate per Sq Ft) × Scope Multiplier × Material Multiplier + Selected Extras</code></p>
        <table class="admin-table">
          <thead>
            <tr>
              <th>Room Name</th>
              <th>Base Fee (${config.currency})</th>
              <th>Rate / Sq Ft (${config.currency})</th>
              <th>Est. Timeline</th>
            </tr>
          </thead>
          <tbody>
            ${config.rooms.map((r, i) => `
              <tr>
                <td><input type="text" class="admin-input-wide" data-room-idx="${i}" data-field="name" value="${escapeAttr(r.name)}" /></td>
                <td><input type="number" class="admin-input-sm" data-room-idx="${i}" data-field="baseFixed" value="${r.baseFixed}" /></td>
                <td><input type="number" class="admin-input-sm" data-room-idx="${i}" data-field="ratePerSqft" value="${r.ratePerSqft}" /></td>
                <td><input type="text" class="admin-input-sm" data-room-idx="${i}" data-field="timeline" value="${escapeAttr(r.timeline)}" /></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;

      panel.querySelectorAll('[data-room-idx]').forEach(inp => {
        inp.addEventListener('input', () => {
          const idx = Number(inp.dataset.roomIdx);
          const f = inp.dataset.field;
          config.rooms[idx][f] = (f === 'baseFixed' || f === 'ratePerSqft') ? Number(inp.value) : inp.value;
          saveConfig(config);
        });
      });
    }

    else if (state.adminSubtab === 'multipliers') {
      panel.innerHTML = `
        <h3 style="margin-bottom:12px;">Renovation Scope Multipliers</h3>
        <table class="admin-table" style="margin-bottom:26px;">
          <thead>
            <tr><th>Scope Level</th><th>Description</th><th>Multiplier (e.g. 1.0 = 100%)</th></tr>
          </thead>
          <tbody>
            ${config.scopes.map((s, i) => `
              <tr>
                <td><input type="text" class="admin-input-wide" data-scope-idx="${i}" data-field="name" value="${escapeAttr(s.name)}" /></td>
                <td><input type="text" class="admin-input-wide" data-scope-idx="${i}" data-field="desc" value="${escapeAttr(s.desc)}" /></td>
                <td><input type="number" step="0.05" class="admin-input-sm" data-scope-idx="${i}" data-field="multiplier" value="${s.multiplier}" /></td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <h3 style="margin-bottom:12px;">Materials Quality Tier Multipliers</h3>
        <table class="admin-table">
          <thead>
            <tr><th>Material Tier</th><th>Description</th><th>Multiplier</th></tr>
          </thead>
          <tbody>
            ${config.materials.map((m, i) => `
              <tr>
                <td><input type="text" class="admin-input-wide" data-mat-idx="${i}" data-field="name" value="${escapeAttr(m.name)}" /></td>
                <td><input type="text" class="admin-input-wide" data-mat-idx="${i}" data-field="desc" value="${escapeAttr(m.desc)}" /></td>
                <td><input type="number" step="0.05" class="admin-input-sm" data-mat-idx="${i}" data-field="multiplier" value="${m.multiplier}" /></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;

      panel.querySelectorAll('[data-scope-idx]').forEach(inp => {
        inp.addEventListener('input', () => {
          const idx = Number(inp.dataset.scopeIdx);
          const f = inp.dataset.field;
          config.scopes[idx][f] = f === 'multiplier' ? Number(inp.value) : inp.value;
          saveConfig(config);
        });
      });

      panel.querySelectorAll('[data-mat-idx]').forEach(inp => {
        inp.addEventListener('input', () => {
          const idx = Number(inp.dataset.matIdx);
          const f = inp.dataset.field;
          config.materials[idx][f] = f === 'multiplier' ? Number(inp.value) : inp.value;
          saveConfig(config);
        });
      });
    }

    else if (state.adminSubtab === 'extras') {
      panel.innerHTML = `
        <h3 style="margin-bottom:6px;">Room-Specific Extras &amp; Add-On Options</h3>
        <p style="margin:0 0 14px;font-size:13.5px;color:#475569;">Edit add-on prices or add a brand-new upgrade option below—zero coding required.</p>
        <table class="admin-table">
          <thead>
            <tr><th>Applies To</th><th>Option Title</th><th>Flat Allowance (${config.currency})</th><th></th></tr>
          </thead>
          <tbody>
            ${config.extras.map((ex, i) => `
              <tr>
                <td>
                  <select class="admin-input-sm" data-ex-idx="${i}" data-field="roomId" style="width:155px;">
                    <option value="all" ${ex.roomId === 'all' ? 'selected' : ''}>All Rooms</option>
                    ${config.rooms.map(r => `<option value="${r.id}" ${ex.roomId === r.id ? 'selected' : ''}>${escapeHtml(r.name)}</option>`).join('')}
                  </select>
                </td>
                <td><input type="text" class="admin-input-wide" data-ex-idx="${i}" data-field="name" value="${escapeAttr(ex.name)}" /></td>
                <td><input type="number" class="admin-input-sm" data-ex-idx="${i}" data-field="price" value="${ex.price}" /></td>
                <td><button type="button" class="btn btn-outline-sm" data-delete-extra="${i}">Remove</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="add-row-box">
          <div>
            <label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;">Room</label>
            <select id="new-ex-room" class="admin-input-sm" style="width:155px;">
              <option value="all">All Rooms</option>
              ${config.rooms.map(r => `<option value="${r.id}">${escapeHtml(r.name)}</option>`).join('')}
            </select>
          </div>
          <div style="flex:1;min-width:200px;">
            <label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;">New Extra Title</label>
            <input type="text" id="new-ex-name" class="admin-input-wide" placeholder="e.g. Custom Skylight Installation" />
          </div>
          <div>
            <label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;">Price (${config.currency})</label>
            <input type="number" id="new-ex-price" class="admin-input-sm" value="2200" />
          </div>
          <button type="button" class="btn btn-primary" id="btn-add-extra">+ Add Option</button>
        </div>
      `;

      panel.querySelectorAll('[data-ex-idx]').forEach(inp => {
        inp.addEventListener('input', () => {
          const idx = Number(inp.dataset.exIdx);
          const f = inp.dataset.field;
          config.extras[idx][f] = f === 'price' ? Number(inp.value) : inp.value;
          saveConfig(config);
        });
      });

      panel.querySelectorAll('[data-delete-extra]').forEach(btn => {
        btn.addEventListener('click', () => {
          config.extras.splice(Number(btn.dataset.deleteExtra), 1);
          saveConfig(config);
          renderAdmin();
        });
      });

      document.getElementById('btn-add-extra').addEventListener('click', () => {
        const name = document.getElementById('new-ex-name').value.trim();
        const price = Number(document.getElementById('new-ex-price').value) || 1000;
        const roomId = document.getElementById('new-ex-room').value;
        if (!name) return;
        config.extras.push({
          id: 'custom_' + Date.now(),
          roomId,
          name,
          desc: 'Custom renovation upgrade allowance',
          price
        });
        saveConfig(config);
        renderAdmin();
      });
    }

    else if (state.adminSubtab === 'emails') {
      panel.innerHTML = `
        <h3 style="margin-bottom:14px;">Branding, Range Spread &amp; Email Routing</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px;max-width:760px;">
          <div class="form-group">
            <label>Contractor Business Name</label>
            <input type="text" class="form-control" id="cfg-company" value="${escapeAttr(config.companyName)}" />
          </div>
          <div class="form-group">
            <label>Team Lead Notification Email</label>
            <input type="email" class="form-control" id="cfg-email" value="${escapeAttr(config.teamEmail)}" />
          </div>
          <div class="form-group">
            <label>Currency Symbol</label>
            <select class="form-control" id="cfg-currency">
              <option value="$" ${config.currency === '$' ? 'selected' : ''}>USD / CAD ($)</option>
              <option value="£" ${config.currency === '£' ? 'selected' : ''}>GBP (£)</option>
              <option value="€" ${config.currency === '€' ? 'selected' : ''}>EUR (€)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Estimate Price Range Buffer (±%)</label>
            <input type="number" min="3" max="30" class="form-control" id="cfg-variance" value="${config.rangeVariancePct}" />
          </div>
        </div>
      `;

      ['cfg-company', 'cfg-email', 'cfg-currency', 'cfg-variance'].forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
          config.companyName = document.getElementById('cfg-company').value;
          config.teamEmail = document.getElementById('cfg-email').value;
          config.currency = document.getElementById('cfg-currency').value;
          config.rangeVariancePct = Number(document.getElementById('cfg-variance').value) || 10;
          saveConfig(config);
        });
      });
    }

    else if (state.adminSubtab === 'leads') {
      panel.innerHTML = `
        <h3 style="margin-bottom:6px;">Captured Homeowner Estimate Leads</h3>
        <p style="margin:0 0 14px;font-size:13.5px;color:#475569;">Every submission emails both the client and your team AND logs inside WordPress (exportable to CSV).</p>
        <table class="admin-table">
          <thead>
            <tr><th>Submitted</th><th>Homeowner</th><th>Contact</th><th>Project &amp; Scope</th><th>Estimated Range</th></tr>
          </thead>
          <tbody>
            ${leads.map(l => `
              <tr>
                <td>${escapeHtml(l.date)}</td>
                <td><strong>${escapeHtml(l.name)}</strong></td>
                <td>${escapeHtml(l.email)}<br><span style="color:#64748b;">${escapeHtml(l.phone)}</span></td>
                <td>${escapeHtml(l.room)}<br><span style="color:#64748b;font-size:12px;">${escapeHtml(l.scope)}</span></td>
                <td><strong style="color:#c26d17;">${escapeHtml(l.range)}</strong></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }
  }

  function escapeHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeAttr(str) {
    return escapeHtml(str);
  }

  // Wire Global Controls
  function switchMainView(view) {
    const isCalc = view === 'calculator';
    document.getElementById('view-calculator').hidden = !isCalc;
    document.getElementById('view-admin').hidden = isCalc;
    document.getElementById('tab-calculator').classList.toggle('active', isCalc);
    document.getElementById('tab-admin').classList.toggle('active', !isCalc);

    if (isCalc) {
      renderCalculator();
    } else {
      renderAdmin();
    }
  }

  document.getElementById('tab-calculator').addEventListener('click', () => switchMainView('calculator'));
  document.getElementById('tab-admin').addEventListener('click', () => switchMainView('admin'));

  document.getElementById('toggle-mobile-preview').addEventListener('click', function () {
    switchMainView('calculator');
    const frame = document.getElementById('device-frame');
    const active = frame.classList.toggle('mobile-preview');
    this.classList.toggle('active', active);
  });

  document.getElementById('btn-prev').addEventListener('click', () => {
    if (state.step > 1) {
      state.step--;
      renderCalculator();
    }
  });

  document.getElementById('btn-next').addEventListener('click', () => {
    if (state.step < 6) {
      state.step++;
      renderCalculator();
    }
  });

  document.querySelectorAll('.admin-subtab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.adminSubtab = btn.dataset.subtab;
      renderAdmin();
    });
  });

  document.getElementById('btn-save-admin').addEventListener('click', () => {
    saveConfig(config);
    const toast = document.getElementById('admin-toast');
    toast.hidden = false;
    setTimeout(() => {
      toast.hidden = true;
      switchMainView('calculator');
    }, 900);
  });

  document.getElementById('btn-reset-defaults').addEventListener('click', () => {
    config = getDefaultConfig();
    saveConfig(config);
    renderAdmin();
  });

  // Modal controls
  document.querySelectorAll('.email-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      state.activeEmailTab = tab.dataset.emailTab;
      renderEmailModal();
    });
  });

  document.getElementById('close-email-modal').addEventListener('click', () => {
    document.getElementById('email-modal').hidden = true;
  });

  document.getElementById('modal-done-btn').addEventListener('click', () => {
    document.getElementById('email-modal').hidden = true;
  });

  document.getElementById('modal-view-in-admin').addEventListener('click', () => {
    document.getElementById('email-modal').hidden = true;
    state.adminSubtab = 'leads';
    switchMainView('admin');
  });

  // Initial Boot
  updateLeadBadges();
  renderCalculator();
})();
