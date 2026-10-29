/**
 * Moteurs de rendu des modèles de CV (Templates) et Lettre de motivation
 */
const CV_TEMPLATES = {
  /**
   * Helper pour formater les dates (YYYY-MM -> Mois AAAA ou AAAA)
   */
  formatDate(dateStr) {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length === 2) {
      const months = ["Janv.", "Févr.", "Mars", "Avr.", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."];
      const monthIdx = parseInt(parts[1], 10) - 1;
      return `${months[monthIdx] || parts[1]} ${parts[0]}`;
    }
    return dateStr;
  },

  /**
   * Convertit un texte avec sauts de ligne ou puces en liste HTML propre
   */
  renderBullets(text) {
    if (!text) return "";
    const lines = text.split("\n").filter(l => l.trim().length > 0);
    const htmlLines = lines.map(line => {
      const cleanLine = line.replace(/^[•\-\*]\s*/, "");
      return `<li class="flex items-start gap-2 mb-1">
        <span class="inline-block w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style="background-color: var(--primary-color);"></span>
        <span>${cleanLine}</span>
      </li>`;
    });
    return `<ul class="list-none space-y-1">${htmlLines.join("")}</ul>`;
  },

  // =========================================================================
  // 1. MODÈLE MODERNE MINIMALISTE (Modern Chic)
  // =========================================================================
  renderModern(data) {
    const { personal, summary, experiences, education, skills, languages, interests } = data;

    return `
      <div class="p-8 sm:p-10 text-gray-800 h-full flex flex-col justify-between">
        <!-- En-tête -->
        <header class="border-b-2 pb-6 mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-6" style="border-color: var(--primary-light);">
          ${personal.showPhoto && personal.photo ? `
            <div class="relative flex-shrink-0">
              <img src="${personal.photo}" alt="${personal.firstName} ${personal.lastName}" class="w-28 h-28 rounded-2xl object-cover shadow-md border-2" style="border-color: var(--primary-color);">
            </div>
          ` : ''}

          <div class="flex-1 text-center sm:text-left">
            <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 leading-tight">
              ${personal.firstName} <span style="color: var(--primary-color);">${personal.lastName}</span>
            </h1>
            <p class="text-lg font-semibold tracking-wide text-gray-700 mt-1 uppercase" style="letter-spacing: 1px;">
              ${personal.jobTitle || ''}
            </p>

            <!-- Coordonnées en ligne -->
            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 text-xs text-gray-600 mt-3">
              ${personal.email ? `<span class="flex items-center gap-1.5"><i class="fa-solid fa-envelope" style="color: var(--primary-color);"></i> ${personal.email}</span>` : ''}
              ${personal.phone ? `<span class="flex items-center gap-1.5"><i class="fa-solid fa-phone" style="color: var(--primary-color);"></i> ${personal.phone}</span>` : ''}
              ${personal.city ? `<span class="flex items-center gap-1.5"><i class="fa-solid fa-location-dot" style="color: var(--primary-color);"></i> ${personal.city}</span>` : ''}
              ${personal.linkedin ? `<span class="flex items-center gap-1.5"><i class="fa-brands fa-linkedin" style="color: var(--primary-color);"></i> ${personal.linkedin}</span>` : ''}
              ${personal.github ? `<span class="flex items-center gap-1.5"><i class="fa-brands fa-github" style="color: var(--primary-color);"></i> ${personal.github}</span>` : ''}
              ${personal.website ? `<span class="flex items-center gap-1.5"><i class="fa-solid fa-globe" style="color: var(--primary-color);"></i> ${personal.website}</span>` : ''}
            </div>
          </div>
        </header>

        <!-- Corps 2 colonnes -->
        <div class="grid grid-cols-12 gap-8 flex-1">
          <!-- Colonne Gauche (35%) -->
          <aside class="col-span-4 space-y-6 border-r pr-6 border-gray-100">
            <!-- Compétences -->
            ${skills && skills.length > 0 ? `
              <section class="cv-section">
                <h3 class="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3 pb-1 border-b" style="border-color: var(--primary-color);">
                  <i class="fa-solid fa-bolt mr-1" style="color: var(--primary-color);"></i> Compétences
                </h3>
                <div class="space-y-2.5">
                  ${skills.map(s => `
                    <div>
                      <div class="flex justify-between text-xs font-medium text-gray-700 mb-1">
                        <span>${s.name}</span>
                        <span class="text-gray-400 text-[10px]">${s.level}%</span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div class="skill-bar-fill h-1.5 rounded-full" style="width: ${s.level}%;"></div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </section>
            ` : ''}

            <!-- Formations -->
            ${education && education.length > 0 ? `
              <section class="cv-section">
                <h3 class="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3 pb-1 border-b" style="border-color: var(--primary-color);">
                  <i class="fa-solid fa-graduation-cap mr-1" style="color: var(--primary-color);"></i> Formation
                </h3>
                <div class="space-y-3">
                  ${education.map(edu => `
                    <div class="cv-item">
                      <div class="text-xs font-bold text-gray-800 leading-snug">${edu.degree}</div>
                      <div class="text-xs font-medium" style="color: var(--primary-color);">${edu.school}</div>
                      <div class="text-[11px] text-gray-500">${edu.startDate || ''} - ${edu.endDate || 'En cours'} ${edu.city ? `• ${edu.city}` : ''}</div>
                      ${edu.details ? `<p class="text-[11px] text-gray-600 mt-0.5 leading-relaxed">${edu.details}</p>` : ''}
                    </div>
                  `).join('')}
                </div>
              </section>
            ` : ''}

            <!-- Langues -->
            ${languages && languages.length > 0 ? `
              <section class="cv-section">
                <h3 class="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3 pb-1 border-b" style="border-color: var(--primary-color);">
                  <i class="fa-solid fa-language mr-1" style="color: var(--primary-color);"></i> Langues
                </h3>
                <div class="space-y-1.5">
                  ${languages.map(l => `
                    <div class="flex justify-between items-center text-xs">
                      <span class="font-medium text-gray-800">${l.name}</span>
                      <span class="text-[11px] text-gray-500">${l.level}</span>
                    </div>
                  `).join('')}
                </div>
              </section>
            ` : ''}

            <!-- Centres d'intérêt -->
            ${interests && interests.length > 0 ? `
              <section class="cv-section">
                <h3 class="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2 pb-1 border-b" style="border-color: var(--primary-color);">
                  <i class="fa-solid fa-heart mr-1" style="color: var(--primary-color);"></i> Centres d'intérêt
                </h3>
                <div class="flex flex-wrap gap-1.5">
                  ${interests.map(int => `
                    <span class="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-medium">
                      ${int}
                    </span>
                  `).join('')}
                </div>
              </section>
            ` : ''}
          </aside>

          <!-- Colonne Droite (65%) -->
          <main class="col-span-8 space-y-6">
            <!-- Résumé / Profil -->
            ${summary ? `
              <section class="cv-section">
                <h3 class="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2 pb-1 border-b" style="border-color: var(--primary-color);">
                  <i class="fa-solid fa-user mr-1" style="color: var(--primary-color);"></i> Profil Professionnel
                </h3>
                <p class="text-xs sm:text-sm text-gray-700 leading-relaxed text-justify">
                  ${summary}
                </p>
              </section>
            ` : ''}

            <!-- Expériences professionnelles -->
            ${experiences && experiences.length > 0 ? `
              <section class="cv-section">
                <h3 class="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4 pb-1 border-b" style="border-color: var(--primary-color);">
                  <i class="fa-solid fa-briefcase mr-1" style="color: var(--primary-color);"></i> Expériences Professionnelles
                </h3>
                <div class="space-y-4">
                  ${experiences.map(exp => `
                    <div class="cv-item relative pl-4 border-l-2" style="border-color: var(--primary-light);">
                      <div class="absolute -left-[5px] top-1 w-2 h-2 rounded-full" style="background-color: var(--primary-color);"></div>
                      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                        <h4 class="text-sm font-bold text-gray-900">${exp.role}</h4>
                        <span class="text-[11px] font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600 mt-0.5 sm:mt-0 self-start sm:self-auto">
                          ${CV_TEMPLATES.formatDate(exp.startDate)} - ${exp.current ? "Aujourd'hui" : CV_TEMPLATES.formatDate(exp.endDate)}
                        </span>
                      </div>
                      <div class="text-xs font-semibold mb-2" style="color: var(--primary-color);">
                        ${exp.company} ${exp.city ? `<span class="text-gray-400 font-normal">• ${exp.city}</span>` : ''}
                      </div>
                      <div class="text-xs text-gray-600 leading-relaxed">
                        ${CV_TEMPLATES.renderBullets(exp.description)}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </section>
            ` : ''}
          </main>
        </div>
      </div>
    `;
  },

  // =========================================================================
  // 2. MODÈLE EXÉCUTIF (Executive Dual-Tone)
  // =========================================================================
  renderExecutive(data) {
    const { personal, summary, experiences, education, skills, languages, interests } = data;

    return `
      <div class="h-full flex flex-row min-h-[297mm]">
        <!-- Barre Latérale Gauche Teintée -->
        <aside class="w-[36%] text-white p-7 flex flex-col justify-between" style="background-color: var(--primary-color);">
          <div class="space-y-6">
            <div class="text-center">
              ${personal.showPhoto && personal.photo ? `
                <img src="${personal.photo}" alt="${personal.firstName} ${personal.lastName}" class="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-white/30 shadow-lg">
              ` : ''}
              <h1 class="text-2xl font-black uppercase tracking-wider text-white">
                ${personal.firstName}<br>${personal.lastName}
              </h1>
              <p class="text-xs font-semibold tracking-widest text-white/90 uppercase mt-1">
                ${personal.jobTitle || ''}
              </p>
            </div>

            <hr class="border-white/20">

            <section class="space-y-2.5 text-xs text-white/90">
              <h3 class="text-[11px] font-bold tracking-widest uppercase text-white/70 mb-2">Contact</h3>
              ${personal.email ? `<div class="flex items-start gap-2.5 break-all"><i class="fa-solid fa-envelope mt-0.5 text-white/80"></i> <span>${personal.email}</span></div>` : ''}
              ${personal.phone ? `<div class="flex items-center gap-2.5"><i class="fa-solid fa-phone text-white/80"></i> <span>${personal.phone}</span></div>` : ''}
              ${personal.city ? `<div class="flex items-center gap-2.5"><i class="fa-solid fa-location-dot text-white/80"></i> <span>${personal.city}</span></div>` : ''}
              ${personal.linkedin ? `<div class="flex items-center gap-2.5 break-all"><i class="fa-brands fa-linkedin text-white/80"></i> <span>${personal.linkedin}</span></div>` : ''}
              ${personal.github ? `<div class="flex items-center gap-2.5 break-all"><i class="fa-brands fa-github text-white/80"></i> <span>${personal.github}</span></div>` : ''}
              ${personal.website ? `<div class="flex items-center gap-2.5 break-all"><i class="fa-solid fa-globe text-white/80"></i> <span>${personal.website}</span></div>` : ''}
            </section>

            ${skills && skills.length > 0 ? `
              <section class="space-y-2">
                <h3 class="text-[11px] font-bold tracking-widest uppercase text-white/70 mb-2">Compétences Clés</h3>
                <div class="space-y-2">
                  ${skills.map(s => `
                    <div>
                      <div class="flex justify-between text-xs text-white/95 mb-1 font-medium">
                        <span>${s.name}</span>
                        <span class="text-[10px] text-white/70">${s.level}%</span>
                      </div>
                      <div class="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                        <div class="bg-white h-1.5 rounded-full" style="width: ${s.level}%;"></div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </section>
            ` : ''}

            ${languages && languages.length > 0 ? `
              <section>
                <h3 class="text-[11px] font-bold tracking-widest uppercase text-white/70 mb-2">Langues</h3>
                <div class="space-y-1.5 text-xs text-white/90">
                  ${languages.map(l => `
                    <div class="flex justify-between">
                      <span class="font-medium">${l.name}</span>
                      <span class="text-white/75 text-[11px]">${l.level}</span>
                    </div>
                  `).join('')}
                </div>
              </section>
            ` : ''}
          </div>

          ${interests && interests.length > 0 ? `
            <div class="pt-4 border-t border-white/20">
              <h3 class="text-[11px] font-bold tracking-widest uppercase text-white/70 mb-2">Intérêts</h3>
              <p class="text-xs text-white/85 leading-relaxed">${interests.join(" • ")}</p>
            </div>
          ` : ''}
        </aside>

        <!-- Zone Principale Droite Blanche -->
        <main class="w-[64%] p-8 sm:p-9 space-y-6 bg-white text-gray-800">
          ${summary ? `
            <section class="cv-section">
              <h2 class="text-xs font-extrabold uppercase tracking-widest pb-1 border-b-2 mb-3" style="color: var(--primary-color); border-color: var(--primary-light);">
                Profil & Objectifs
              </h2>
              <p class="text-xs sm:text-sm text-gray-700 leading-relaxed text-justify font-normal">
                ${summary}
              </p>
            </section>
          ` : ''}

          ${experiences && experiences.length > 0 ? `
            <section class="cv-section">
              <h2 class="text-xs font-extrabold uppercase tracking-widest pb-1 border-b-2 mb-4" style="color: var(--primary-color); border-color: var(--primary-light);">
                Parcours Professionnel
              </h2>
              <div class="space-y-5">
                ${experiences.map(exp => `
                  <div class="cv-item">
                    <div class="flex justify-between items-baseline mb-0.5">
                      <h3 class="text-sm font-bold text-gray-900">${exp.role}</h3>
                      <span class="text-[11px] font-medium text-gray-500 whitespace-nowrap ml-2">
                        ${CV_TEMPLATES.formatDate(exp.startDate)} — ${exp.current ? "Présent" : CV_TEMPLATES.formatDate(exp.endDate)}
                      </span>
                    </div>
                    <div class="text-xs font-semibold mb-2" style="color: var(--primary-color);">
                      ${exp.company} ${exp.city ? `| ${exp.city}` : ''}
                    </div>
                    <div class="text-xs text-gray-600 leading-relaxed">
                      ${CV_TEMPLATES.renderBullets(exp.description)}
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}

          ${education && education.length > 0 ? `
            <section class="cv-section">
              <h2 class="text-xs font-extrabold uppercase tracking-widest pb-1 border-b-2 mb-3" style="color: var(--primary-color); border-color: var(--primary-light);">
                Formation & Diplômes
              </h2>
              <div class="space-y-3">
                ${education.map(edu => `
                  <div class="cv-item">
                    <div class="flex justify-between items-baseline">
                      <h3 class="text-xs font-bold text-gray-900">${edu.degree}</h3>
                      <span class="text-[11px] font-medium text-gray-500">${edu.startDate || ''} - ${edu.endDate || ''}</span>
                    </div>
                    <div class="text-xs font-medium" style="color: var(--primary-color);">${edu.school} ${edu.city ? `(${edu.city})` : ''}</div>
                    ${edu.details ? `<p class="text-[11px] text-gray-600 mt-0.5 leading-snug">${edu.details}</p>` : ''}
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}
        </main>
      </div>
    `;
  },

  // =========================================================================
  // 3. MODÈLE CRÉATIF & TECH (Dynamic Cards)
  // =========================================================================
  renderCreative(data) {
    const { personal, summary, experiences, education, skills, languages, interests } = data;

    return `
      <div class="p-8 sm:p-10 text-gray-800 h-full flex flex-col justify-between">
        <header class="rounded-2xl p-6 mb-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden" style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);">
          <div class="text-center sm:text-left z-10">
            <h1 class="text-3xl font-black tracking-tight">
              ${personal.firstName} ${personal.lastName}
            </h1>
            <p class="text-sm font-semibold tracking-wider text-white/90 uppercase mt-1">
              ${personal.jobTitle || ''}
            </p>
            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-white/80 mt-3">
              ${personal.email ? `<span><i class="fa-solid fa-envelope mr-1"></i> ${personal.email}</span>` : ''}
              ${personal.phone ? `<span><i class="fa-solid fa-phone mr-1"></i> ${personal.phone}</span>` : ''}
              ${personal.city ? `<span><i class="fa-solid fa-location-dot mr-1"></i> ${personal.city}</span>` : ''}
              ${personal.linkedin ? `<span><i class="fa-brands fa-linkedin mr-1"></i> ${personal.linkedin}</span>` : ''}
            </div>
          </div>

          ${personal.showPhoto && personal.photo ? `
            <img src="${personal.photo}" alt="${personal.firstName} ${personal.lastName}" class="w-24 h-24 rounded-full object-cover border-4 border-white/40 shadow-lg flex-shrink-0 z-10">
          ` : ''}
        </header>

        ${summary ? `
          <div class="mb-6 p-4 rounded-xl border border-gray-100 bg-gray-50/80 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <div class="font-bold text-xs uppercase tracking-wider mb-1" style="color: var(--primary-color);">À propos de moi</div>
            ${summary}
          </div>
        ` : ''}

        <div class="grid grid-cols-12 gap-6 flex-1">
          <main class="col-span-7 space-y-5">
            ${experiences && experiences.length > 0 ? `
              <section class="cv-section">
                <h3 class="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3 flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full" style="background-color: var(--primary-color);"></span>
                  Expériences Clés
                </h3>
                <div class="space-y-4">
                  ${experiences.map(exp => `
                    <div class="cv-item p-3.5 rounded-xl border border-gray-100 hover:border-gray-200 bg-white shadow-sm">
                      <div class="flex justify-between items-start mb-1">
                        <div>
                          <h4 class="text-xs font-bold text-gray-900">${exp.role}</h4>
                          <span class="text-xs font-semibold" style="color: var(--primary-color);">${exp.company}</span>
                        </div>
                        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full" style="background-color: var(--primary-light); color: var(--primary-dark);">
                          ${CV_TEMPLATES.formatDate(exp.startDate)} - ${exp.current ? "En cours" : CV_TEMPLATES.formatDate(exp.endDate)}
                        </span>
                      </div>
                      <div class="text-xs text-gray-600 mt-2">
                        ${CV_TEMPLATES.renderBullets(exp.description)}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </section>
            ` : ''}
          </main>

          <aside class="col-span-5 space-y-5">
            ${skills && skills.length > 0 ? `
              <section class="cv-section p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                <h3 class="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3 flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full" style="background-color: var(--primary-color);"></span>
                  Compétences & Stack
                </h3>
                <div class="flex flex-wrap gap-1.5">
                  ${skills.map(s => `
                    <span class="text-xs font-medium px-2.5 py-1 rounded-lg border flex items-center gap-1.5" style="border-color: var(--primary-light); background-color: #f8fafc;">
                      <span class="w-1.5 h-1.5 rounded-full" style="background-color: var(--primary-color);"></span>
                      <span>${s.name}</span>
                    </span>
                  `).join('')}
                </div>
              </section>
            ` : ''}

            ${education && education.length > 0 ? `
              <section class="cv-section p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                <h3 class="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3 flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full" style="background-color: var(--primary-color);"></span>
                  Formation
                </h3>
                <div class="space-y-3">
                  ${education.map(edu => `
                    <div class="cv-item border-l-2 pl-3" style="border-color: var(--primary-color);">
                      <div class="text-xs font-bold text-gray-900">${edu.degree}</div>
                      <div class="text-xs font-medium text-gray-600">${edu.school}</div>
                      <div class="text-[10px] text-gray-400">${edu.startDate || ''} - ${edu.endDate || ''}</div>
                    </div>
                  `).join('')}
                </div>
              </section>
            ` : ''}

            <section class="cv-section p-4 rounded-xl border border-gray-100 bg-white shadow-sm space-y-3">
              ${languages && languages.length > 0 ? `
                <div>
                  <h3 class="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">Langues</h3>
                  <div class="space-y-1 text-xs">
                    ${languages.map(l => `
                      <div class="flex justify-between">
                        <span class="font-medium text-gray-700">${l.name}</span>
                        <span class="text-gray-500 text-[11px]">${l.level}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              ${interests && interests.length > 0 ? `
                <div class="pt-2 border-t border-gray-100">
                  <h3 class="text-xs font-bold uppercase tracking-wider text-gray-900 mb-1">Centres d'intérêt</h3>
                  <p class="text-xs text-gray-600">${interests.join(", ")}</p>
                </div>
              ` : ''}
            </section>
          </aside>
        </div>
      </div>
    `;
  },

  // =========================================================================
  // 4. MODÈLE ATS CLASSIQUE (100% Robot-Friendly & Épuré)
  // =========================================================================
  renderAts(data) {
    const { personal, summary, experiences, education, skills, languages, interests } = data;

    return `
      <div class="p-10 text-gray-900 h-full flex flex-col justify-between">
        <header class="text-center pb-4 mb-5 border-b border-gray-400">
          <h1 class="text-2xl font-bold uppercase tracking-wider text-black">
            ${personal.firstName} ${personal.lastName}
          </h1>
          <p class="text-sm font-semibold uppercase tracking-wider text-gray-800 mt-1">
            ${personal.jobTitle || ''}
          </p>
          <div class="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-xs text-gray-700 mt-2 font-medium">
            ${personal.city ? `<span>${personal.city}</span>` : ''}
            ${personal.phone ? `<span>• ${personal.phone}</span>` : ''}
            ${personal.email ? `<span>• ${personal.email}</span>` : ''}
            ${personal.linkedin ? `<span>• ${personal.linkedin}</span>` : ''}
            ${personal.website ? `<span>• ${personal.website}</span>` : ''}
          </div>
        </header>

        <div class="space-y-4 flex-1">
          ${summary ? `
            <section class="cv-section">
              <h2 class="text-xs font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-0.5 mb-2">
                Résumé Professionnel
              </h2>
              <p class="text-xs text-gray-800 leading-relaxed text-justify">
                ${summary}
              </p>
            </section>
          ` : ''}

          ${experiences && experiences.length > 0 ? `
            <section class="cv-section">
              <h2 class="text-xs font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-0.5 mb-2.5">
                Expérience Professionnelle
              </h2>
              <div class="space-y-3.5">
                ${experiences.map(exp => `
                  <div class="cv-item">
                    <div class="flex justify-between items-baseline font-bold text-xs text-black">
                      <span>${exp.role} — ${exp.company}</span>
                      <span class="font-medium text-gray-600 text-[11px]">
                        ${CV_TEMPLATES.formatDate(exp.startDate)} - ${exp.current ? "Présent" : CV_TEMPLATES.formatDate(exp.endDate)} ${exp.city ? `| ${exp.city}` : ''}
                      </span>
                    </div>
                    <div class="text-xs text-gray-700 mt-1 pl-1">
                      ${CV_TEMPLATES.renderBullets(exp.description)}
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}

          ${education && education.length > 0 ? `
            <section class="cv-section">
              <h2 class="text-xs font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-0.5 mb-2">
                Formation
              </h2>
              <div class="space-y-2">
                ${education.map(edu => `
                  <div class="cv-item flex justify-between items-baseline text-xs">
                    <div>
                      <span class="font-bold text-black">${edu.degree}</span>, <span class="italic text-gray-700">${edu.school}</span> ${edu.city ? `(${edu.city})` : ''}
                      ${edu.details ? `<div class="text-[11px] text-gray-600">${edu.details}</div>` : ''}
                    </div>
                    <span class="font-medium text-gray-600 text-[11px] whitespace-nowrap ml-2">${edu.startDate || ''} - ${edu.endDate || ''}</span>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}

          ${skills && skills.length > 0 ? `
            <section class="cv-section">
              <h2 class="text-xs font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-0.5 mb-1.5">
                Compétences Techniques & Outils
              </h2>
              <p class="text-xs text-gray-800 leading-relaxed">
                ${skills.map(s => `<strong>${s.name}</strong>`).join(" • ")}
              </p>
            </section>
          ` : ''}

          ${(languages && languages.length > 0) || (interests && interests.length > 0) ? `
            <section class="cv-section">
              <h2 class="text-xs font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-0.5 mb-1.5">
                Langues & Informations Complémentaires
              </h2>
              <div class="text-xs text-gray-800 space-y-1">
                ${languages && languages.length > 0 ? `
                  <p><strong>Langues :</strong> ${languages.map(l => `${l.name} (${l.level})`).join(", ")}</p>
                ` : ''}
                ${interests && interests.length > 0 ? `
                  <p><strong>Centres d'intérêt :</strong> ${interests.join(", ")}</p>
                ` : ''}
              </div>
            </section>
          ` : ''}
        </div>
      </div>
    `;
  },

  // =========================================================================
  // 5. MODÈLE PRESTIGE & MINIMALISTE SUISSE (Clean Swiss Editorial)
  // =========================================================================
  renderPrestige(data) {
    const { personal, summary, experiences, education, skills, languages, interests } = data;

    return `
      <div class="p-10 text-gray-900 h-full flex flex-col justify-between border-t-8" style="border-color: var(--primary-color);">
        <!-- En-tête éditorial chic -->
        <header class="flex justify-between items-start pb-6 mb-6 border-b border-gray-200">
          <div>
            <span class="text-xs font-extrabold uppercase tracking-widest" style="color: var(--primary-color);">Curriculum Vitae</span>
            <h1 class="text-3xl font-black tracking-tight text-gray-900 mt-1">
              ${personal.firstName} ${personal.lastName}
            </h1>
            <p class="text-sm font-semibold tracking-wide text-gray-600 uppercase mt-0.5">
              ${personal.jobTitle || ''}
            </p>
          </div>

          <div class="flex items-start gap-4">
            <div class="text-right text-xs text-gray-600 space-y-1">
              ${personal.email ? `<div><a href="mailto:${personal.email}" class="hover:underline">${personal.email}</a> <i class="fa-solid fa-envelope ml-1 text-gray-400"></i></div>` : ''}
              ${personal.phone ? `<div>${personal.phone} <i class="fa-solid fa-phone ml-1 text-gray-400"></i></div>` : ''}
              ${personal.city ? `<div>${personal.city} <i class="fa-solid fa-location-dot ml-1 text-gray-400"></i></div>` : ''}
              ${personal.linkedin ? `<div>${personal.linkedin} <i class="fa-brands fa-linkedin ml-1 text-gray-400"></i></div>` : ''}
            </div>
            ${personal.showPhoto && personal.photo ? `
              <img src="${personal.photo}" alt="${personal.firstName}" class="w-20 h-20 rounded-xl object-cover border shadow-sm">
            ` : ''}
          </div>
        </header>

        <div class="grid grid-cols-12 gap-8 flex-1">
          <!-- Colonne Principale (8 cols) -->
          <main class="col-span-8 space-y-6">
            ${summary ? `
              <section class="cv-section">
                <h3 class="text-xs font-black uppercase tracking-widest text-gray-900 mb-2">Introduction</h3>
                <p class="text-xs sm:text-sm text-gray-700 leading-relaxed font-light text-justify">
                  ${summary}
                </p>
              </section>
            ` : ''}

            ${experiences && experiences.length > 0 ? `
              <section class="cv-section">
                <h3 class="text-xs font-black uppercase tracking-widest text-gray-900 mb-4 pb-1 border-b" style="border-color: var(--primary-light);">
                  Expérience Professionnelle
                </h3>
                <div class="space-y-5">
                  ${experiences.map(exp => `
                    <div class="cv-item">
                      <div class="flex justify-between items-baseline mb-0.5">
                        <span class="text-sm font-bold text-gray-900">${exp.role}</span>
                        <span class="text-xs font-semibold" style="color: var(--primary-color);">
                          ${CV_TEMPLATES.formatDate(exp.startDate)} - ${exp.current ? "Aujourd'hui" : CV_TEMPLATES.formatDate(exp.endDate)}
                        </span>
                      </div>
                      <div class="text-xs font-medium text-gray-500 mb-2">
                        ${exp.company} ${exp.city ? `• ${exp.city}` : ''}
                      </div>
                      <div class="text-xs text-gray-700 leading-relaxed">
                        ${CV_TEMPLATES.renderBullets(exp.description)}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </section>
            ` : ''}
          </main>

          <!-- Colonne Latérale (4 cols) -->
          <aside class="col-span-4 space-y-6 border-l pl-6 border-gray-100">
            ${education && education.length > 0 ? `
              <section class="cv-section">
                <h3 class="text-xs font-black uppercase tracking-widest text-gray-900 mb-3 pb-1 border-b" style="border-color: var(--primary-light);">
                  Formation
                </h3>
                <div class="space-y-3">
                  ${education.map(edu => `
                    <div class="cv-item">
                      <div class="text-xs font-bold text-gray-900">${edu.degree}</div>
                      <div class="text-xs text-gray-600">${edu.school}</div>
                      <div class="text-[10px] text-gray-400 font-medium">${edu.startDate || ''} - ${edu.endDate || ''}</div>
                    </div>
                  `).join('')}
                </div>
              </section>
            ` : ''}

            ${skills && skills.length > 0 ? `
              <section class="cv-section">
                <h3 class="text-xs font-black uppercase tracking-widest text-gray-900 mb-3 pb-1 border-b" style="border-color: var(--primary-light);">
                  Expertise
                </h3>
                <div class="space-y-2">
                  ${skills.map(s => `
                    <div>
                      <div class="text-xs font-medium text-gray-800">${s.name}</div>
                      <div class="w-full bg-gray-200 h-1 rounded-full mt-1 overflow-hidden">
                        <div class="h-1 rounded-full" style="width: ${s.level}%; background-color: var(--primary-color);"></div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </section>
            ` : ''}

            ${languages && languages.length > 0 ? `
              <section class="cv-section">
                <h3 class="text-xs font-black uppercase tracking-widest text-gray-900 mb-2">Langues</h3>
                <div class="space-y-1 text-xs text-gray-700">
                  ${languages.map(l => `<div><strong>${l.name}</strong> : ${l.level}</div>`).join('')}
                </div>
              </section>
            ` : ''}

            ${interests && interests.length > 0 ? `
              <section class="cv-section">
                <h3 class="text-xs font-black uppercase tracking-widest text-gray-900 mb-2">Loisirs</h3>
                <p class="text-xs text-gray-600 leading-snug">${interests.join(", ")}</p>
              </section>
            ` : ''}
          </aside>
        </div>
      </div>
    `;
  },

  // =========================================================================
  // 6. MOTEUR DE RENDU : LETTRE DE MOTIVATION ASSORTIE
  // =========================================================================
  renderCoverLetter(cvData, letterData) {
    const { personal } = cvData;
    const today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

    // Remplacer les placeholders dynamiques comme [Titre du Poste]
    let cleanBody = letterData.body || "";
    if (personal.jobTitle) {
      cleanBody = cleanBody.replace(/\[Titre du Poste\]/g, personal.jobTitle);
    }
    const paragraphs = cleanBody.split("\n\n").filter(p => p.trim().length > 0);

    return `
      <div class="p-12 sm:p-14 text-gray-900 h-full flex flex-col justify-between min-h-[297mm] bg-white">
        <!-- En-tête de lettre assorti -->
        <header class="border-b-2 pb-6 mb-8 flex justify-between items-start" style="border-color: var(--primary-color);">
          <div>
            <h1 class="text-2xl font-black uppercase tracking-tight text-gray-900">
              ${personal.firstName} <span style="color: var(--primary-color);">${personal.lastName}</span>
            </h1>
            <p class="text-xs font-bold text-gray-600 uppercase tracking-widest mt-0.5">
              ${personal.jobTitle || ''}
            </p>
            <div class="text-xs text-gray-600 mt-3 space-y-0.5">
              ${personal.email ? `<div><i class="fa-solid fa-envelope w-4" style="color: var(--primary-color);"></i> ${personal.email}</div>` : ''}
              ${personal.phone ? `<div><i class="fa-solid fa-phone w-4" style="color: var(--primary-color);"></i> ${personal.phone}</div>` : ''}
              ${personal.city ? `<div><i class="fa-solid fa-location-dot w-4" style="color: var(--primary-color);"></i> ${personal.city}</div>` : ''}
            </div>
          </div>

          <!-- Bloc Destinataire -->
          <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl text-xs text-gray-800 min-w-[200px] shadow-sm">
            <div class="font-bold text-gray-900 mb-1" style="color: var(--primary-color);">À l'attention de :</div>
            <div class="whitespace-pre-line leading-relaxed font-medium">
              ${letterData.recipient || "Direction des Ressources Humaines\nEntreprise Cible\nFrance"}
            </div>
          </div>
        </header>

        <!-- Date & Lieu -->
        <div class="text-right text-xs text-gray-600 mb-6 font-medium">
          Fait à ${personal.city ? personal.city.split(',')[0] : 'Paris'}, le ${today}
        </div>

        <!-- Objet de la lettre -->
        <div class="mb-6 p-3 rounded-lg border-l-4 font-bold text-xs sm:text-sm text-gray-900 bg-gray-50" style="border-color: var(--primary-color);">
          <span class="text-gray-500 uppercase tracking-wider text-[11px] block font-semibold mb-0.5">Objet :</span>
          ${letterData.subject.replace(/\[Titre du Poste\]/g, personal.jobTitle || 'Candidature')}
        </div>

        <!-- Corps de la lettre -->
        <div class="flex-1 space-y-4 text-xs sm:text-sm text-gray-800 leading-relaxed text-justify">
          ${paragraphs.map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('')}
        </div>

        <!-- Signature -->
        <div class="pt-8 border-t border-gray-200 flex justify-end">
          <div class="text-right">
            <div class="text-xs text-gray-500 uppercase tracking-wider">Cordialement,</div>
            <div class="text-base font-bold text-gray-900 mt-1">${personal.firstName} ${personal.lastName}</div>
          </div>
        </div>
      </div>
    `;
  }
};
