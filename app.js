/**
 * CVAuto Studio - Logique Applicative & Moteur d'Auto-Génération
 */

// État global de l'application
const AppState = {
  mode: 'cv', // 'cv' ou 'letter'
  template: 'modern',
  primaryColor: '#2563eb',
  fontFamily: 'font-jakarta',
  density: 'density-normal',
  showPageLine: true,
  zoom: 100,
  cvData: null,
  letterData: {
    recipient: "Direction des Ressources Humaines\nEntreprise Cible\n75008 Paris",
    subject: "Candidature pour le poste de [Titre du Poste]",
    body: ""
  }
};

// Couleurs prédéfinies
const COLOR_PALETTES = [
  { name: 'Bleu Royal', value: '#2563eb' },
  { name: 'Bleu Marine Nuit', value: '#1e3a8a' },
  { name: 'Émeraude Pro', value: '#059669' },
  { name: 'Gris Ardoise', value: '#334155' },
  { name: 'Bordeaux / Ruby', value: '#991b1b' },
  { name: 'Violet Moderne', value: '#7c3aed' },
  { name: 'Ambre / Cuivre', value: '#d97706' },
  { name: 'Noir Intemporel', value: '#111827' }
];

// Avatars prédéfinis prêts à l'emploi
const DEFAULT_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80"
];

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  loadSavedState();
  initColorPicker();
  renderFormFields();
  renderLetterFields();
  updateThemeColors();
  updateFontAndDensity();
  updatePreview();
  updateAtsScore();
  setupEventListeners();
}

/**
 * Charge les données depuis le localStorage ou initialise par défaut
 */
function loadSavedState() {
  try {
    const saved = localStorage.getItem('cvauto_state_v2');
    if (saved) {
      const parsed = JSON.parse(saved);
      AppState.mode = parsed.mode || 'cv';
      AppState.template = parsed.template || 'modern';
      AppState.primaryColor = parsed.primaryColor || '#2563eb';
      AppState.fontFamily = parsed.fontFamily || 'font-jakarta';
      AppState.density = parsed.density || 'density-normal';
      AppState.showPageLine = parsed.showPageLine !== undefined ? parsed.showPageLine : true;
      AppState.cvData = parsed.cvData || JSON.parse(JSON.stringify(CV_DATA.profiles.dev_fullstack));
      AppState.letterData = parsed.letterData || JSON.parse(JSON.stringify(CV_DATA.coverLetters.candidature_spontanee));
      return;
    }
  } catch (e) {
    console.warn("Erreur chargement localStorage:", e);
  }

  // Initialisation par défaut
  AppState.cvData = JSON.parse(JSON.stringify(CV_DATA.profiles.dev_fullstack));
  AppState.letterData = JSON.parse(JSON.stringify(CV_DATA.coverLetters.candidature_spontanee));
}

function persistState() {
  try {
    localStorage.setItem('cvauto_state_v2', JSON.stringify(AppState));
  } catch (e) {
    console.warn("Erreur sauvegarde localStorage:", e);
  }
}

/**
 * Initialise le sélecteur de couleurs
 */
function initColorPicker() {
  const container = document.getElementById('color-palette-buttons');
  if (!container) return;

  container.innerHTML = '';
  COLOR_PALETTES.forEach(c => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `w-6 h-6 rounded-full transition-transform hover:scale-110 focus:outline-none flex items-center justify-center border-2 ${AppState.primaryColor === c.value ? 'ring-2 ring-white scale-110 border-white' : 'border-transparent'}`;
    btn.style.backgroundColor = c.value;
    btn.title = c.name;
    btn.onclick = () => setPrimaryColor(c.value);
    container.appendChild(btn);
  });

  const customColorInput = document.getElementById('custom-color-picker');
  if (customColorInput) {
    customColorInput.value = AppState.primaryColor;
    customColorInput.oninput = (e) => setPrimaryColor(e.target.value);
  }
}

function setPrimaryColor(color) {
  AppState.primaryColor = color;
  updateThemeColors();
  initColorPicker();
  updatePreview();
  persistState();
}

function updateThemeColors() {
  document.documentElement.style.setProperty('--primary-color', AppState.primaryColor);
  
  const hex = AppState.primaryColor.replace('#', '');
  if (hex.length === 6) {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    document.documentElement.style.setProperty('--primary-light', `rgba(${r}, ${g}, ${b}, 0.15)`);
    document.documentElement.style.setProperty('--primary-dark', `rgb(${Math.max(0, r - 30)}, ${Math.max(0, g - 30)}, ${Math.max(0, b - 30)})`);
  }
}

function updateFontAndDensity() {
  const page = document.getElementById('cv-preview-page');
  if (!page) return;

  page.classList.remove('font-inter', 'font-jakarta', 'font-poppins', 'font-roboto', 'font-merriweather');
  page.classList.add(AppState.fontFamily);

  page.classList.remove('density-compact', 'density-normal', 'density-spacious');
  page.classList.add(AppState.density);

  if (AppState.showPageLine) {
    page.classList.add('show-page-line');
  } else {
    page.classList.remove('show-page-line');
  }

  const fontSelect = document.getElementById('select-font');
  if (fontSelect) fontSelect.value = AppState.fontFamily;

  const densitySelect = document.getElementById('select-density');
  if (densitySelect) densitySelect.value = AppState.density;

  const templateSelect = document.getElementById('select-template');
  if (templateSelect) templateSelect.value = AppState.template;
}

/**
 * Mise à jour de l'aperçu du document (CV ou Lettre de motivation)
 */
function updatePreview() {
  const previewContainer = document.getElementById('cv-preview-page');
  if (!previewContainer) return;

  updateFontAndDensity();

  let htmlContent = '';

  if (AppState.mode === 'letter') {
    htmlContent = CV_TEMPLATES.renderCoverLetter(AppState.cvData, AppState.letterData);
  } else {
    switch (AppState.template) {
      case 'executive':
        htmlContent = CV_TEMPLATES.renderExecutive(AppState.cvData);
        break;
      case 'creative':
        htmlContent = CV_TEMPLATES.renderCreative(AppState.cvData);
        break;
      case 'ats':
        htmlContent = CV_TEMPLATES.renderAts(AppState.cvData);
        break;
      case 'prestige':
        htmlContent = CV_TEMPLATES.renderPrestige(AppState.cvData);
        break;
      case 'modern':
      default:
        htmlContent = CV_TEMPLATES.renderModern(AppState.cvData);
        break;
    }
  }

  // Ajout de la ligne repère de page 1
  htmlContent += `
    <div class="page-limit-line"></div>
    <div class="page-limit-badge">Fin Page 1 (A4)</div>
  `;

  previewContainer.innerHTML = htmlContent;
  updateAtsScore();
}

/**
 * Basculer entre le mode CV et le mode Lettre de Motivation
 */
function switchAppMode(mode) {
  AppState.mode = mode;
  
  const cvTabBtn = document.getElementById('tab-mode-cv');
  const letterTabBtn = document.getElementById('tab-mode-letter');
  const cvEditorSection = document.getElementById('cv-editor-sections');
  const letterEditorSection = document.getElementById('letter-editor-sections');
  const templateSelectorWrapper = document.getElementById('template-selector-wrapper');

  if (mode === 'letter') {
    cvTabBtn.classList.remove('bg-blue-600', 'text-white');
    cvTabBtn.classList.add('text-slate-400');
    letterTabBtn.classList.add('bg-blue-600', 'text-white');
    letterTabBtn.classList.remove('text-slate-400');

    cvEditorSection.classList.add('hidden');
    letterEditorSection.classList.remove('hidden');
    if (templateSelectorWrapper) templateSelectorWrapper.classList.add('opacity-40', 'pointer-events-none');
  } else {
    letterTabBtn.classList.remove('bg-blue-600', 'text-white');
    letterTabBtn.classList.add('text-slate-400');
    cvTabBtn.classList.add('bg-blue-600', 'text-white');
    cvTabBtn.classList.remove('text-slate-400');

    letterEditorSection.classList.add('hidden');
    cvEditorSection.classList.remove('hidden');
    if (templateSelectorWrapper) templateSelectorWrapper.classList.remove('opacity-40', 'pointer-events-none');
  }

  updatePreview();
  persistState();
}

/**
 * Optimisation automatique du CV pour tenir strictement sur 1 page
 */
function autoFitOnePage() {
  AppState.density = 'density-compact';
  AppState.fontFamily = 'font-inter';
  updateFontAndDensity();
  updatePreview();
  persistState();
  if (window.confetti) {
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
  }
  showToast("Format compact activé pour tenir sur 1 page !");
}

/**
 * Basculer l'affichage de la ligne de saut de page
 */
function togglePageLimitLine() {
  AppState.showPageLine = !AppState.showPageLine;
  updateFontAndDensity();
  persistState();
  showToast(AppState.showPageLine ? "Indicateur de page activé" : "Indicateur masqué");
}

/**
 * Remplissage des formulaires
 */
function renderFormFields() {
  const data = AppState.cvData;

  setInputValue('personal-firstname', data.personal.firstName);
  setInputValue('personal-lastname', data.personal.lastName);
  setInputValue('personal-jobtitle', data.personal.jobTitle);
  setInputValue('personal-email', data.personal.email);
  setInputValue('personal-phone', data.personal.phone);
  setInputValue('personal-city', data.personal.city);
  setInputValue('personal-website', data.personal.website);
  setInputValue('personal-linkedin', data.personal.linkedin);
  setInputValue('personal-github', data.personal.github);

  const showPhotoCb = document.getElementById('toggle-show-photo');
  if (showPhotoCb) showPhotoCb.checked = !!data.personal.showPhoto;

  const photoPreview = document.getElementById('photo-preview-img');
  if (photoPreview && data.personal.photo) {
    photoPreview.src = data.personal.photo;
  }

  setInputValue('personal-summary', data.summary || '');

  renderExperiencesList();
  renderEducationList();
  renderSkillsList();
  renderLanguagesList();

  setInputValue('personal-interests', (data.interests || []).join(', '));
}

function renderLetterFields() {
  const l = AppState.letterData;
  setInputValue('letter-recipient', l.recipient || '');
  setInputValue('letter-subject', l.subject || '');
  setInputValue('letter-body', l.body || '');
}

function setInputValue(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val || '';
}

/**
 * Gestion des Expériences
 */
function renderExperiencesList() {
  const container = document.getElementById('experiences-container');
  if (!container) return;

  container.innerHTML = '';
  (AppState.cvData.experiences || []).forEach((exp, idx) => {
    const card = document.createElement('div');
    card.className = 'bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 space-y-3 relative transition-all hover:border-slate-600';
    card.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-blue-400 uppercase tracking-wider">Expérience #${idx + 1}</span>
        <button type="button" onclick="removeExperience(${idx})" class="text-slate-400 hover:text-red-400 p-1 rounded transition-colors text-xs" title="Supprimer">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="block text-[11px] font-medium text-slate-300 mb-1">Poste / Intitulé</label>
          <input type="text" value="${escapeHtml(exp.role || '')}" oninput="updateExperienceField(${idx}, 'role', this.value)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500">
        </div>
        <div>
          <label class="block text-[11px] font-medium text-slate-300 mb-1">Entreprise</label>
          <input type="text" value="${escapeHtml(exp.company || '')}" oninput="updateExperienceField(${idx}, 'company', this.value)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500">
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label class="block text-[11px] font-medium text-slate-300 mb-1">Ville</label>
          <input type="text" value="${escapeHtml(exp.city || '')}" oninput="updateExperienceField(${idx}, 'city', this.value)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500">
        </div>
        <div>
          <label class="block text-[11px] font-medium text-slate-300 mb-1">Date début</label>
          <input type="text" placeholder="Ex: 2022-01 ou 2022" value="${escapeHtml(exp.startDate || '')}" oninput="updateExperienceField(${idx}, 'startDate', this.value)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500">
        </div>
        <div>
          <label class="block text-[11px] font-medium text-slate-300 mb-1">Date fin</label>
          <input type="text" placeholder="Ex: 2024-05" value="${escapeHtml(exp.endDate || '')}" ${exp.current ? 'disabled' : ''} oninput="updateExperienceField(${idx}, 'endDate', this.value)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 ${exp.current ? 'opacity-50' : ''}">
        </div>
      </div>

      <div class="flex items-center gap-2">
        <input type="checkbox" id="exp-current-${idx}" ${exp.current ? 'checked' : ''} onchange="toggleExperienceCurrent(${idx}, this.checked)" class="rounded bg-slate-900 border-slate-700 text-blue-500 focus:ring-0">
        <label for="exp-current-${idx}" class="text-xs text-slate-300 cursor-pointer">En poste actuellement</label>
      </div>

      <div>
        <div class="flex items-center justify-between mb-1">
          <label class="block text-[11px] font-medium text-slate-300">Missions & Réalisations (1 puce par ligne)</label>
          <button type="button" onclick="openBulletModal(${idx})" class="text-[10px] text-blue-400 hover:text-blue-300 flex items-center gap-1">
            <i class="fa-solid fa-wand-magic-sparkles"></i> Idées de puces
          </button>
        </div>
        <textarea rows="3" oninput="updateExperienceField(${idx}, 'description', this.value)" placeholder="• Conduite de projet...\n• Amélioration de 30% des performances..." class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500">${escapeHtml(exp.description || '')}</textarea>
      </div>
    `;
    container.appendChild(card);
  });
}

function addExperience() {
  AppState.cvData.experiences.unshift({
    id: "exp-" + Date.now(),
    role: "Nouveau Poste",
    company: "Nom Entreprise",
    city: "Paris",
    startDate: "2023",
    endDate: "",
    current: true,
    description: "• Description des missions et résultats obtenus..."
  });
  renderExperiencesList();
  updatePreview();
  persistState();
}

function removeExperience(idx) {
  AppState.cvData.experiences.splice(idx, 1);
  renderExperiencesList();
  updatePreview();
  persistState();
}

function updateExperienceField(idx, field, val) {
  AppState.cvData.experiences[idx][field] = val;
  updatePreview();
  persistState();
}

function toggleExperienceCurrent(idx, isCurrent) {
  AppState.cvData.experiences[idx].current = isCurrent;
  if (isCurrent) {
    AppState.cvData.experiences[idx].endDate = "";
  }
  renderExperiencesList();
  updatePreview();
  persistState();
}

/**
 * Gestion des Formations
 */
function renderEducationList() {
  const container = document.getElementById('education-container');
  if (!container) return;

  container.innerHTML = '';
  (AppState.cvData.education || []).forEach((edu, idx) => {
    const card = document.createElement('div');
    card.className = 'bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 space-y-3 relative transition-all hover:border-slate-600';
    card.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider">Formation #${idx + 1}</span>
        <button type="button" onclick="removeEducation(${idx})" class="text-slate-400 hover:text-red-400 p-1 rounded transition-colors text-xs" title="Supprimer">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="block text-[11px] font-medium text-slate-300 mb-1">Diplôme / Filière</label>
          <input type="text" value="${escapeHtml(edu.degree || '')}" oninput="updateEducationField(${idx}, 'degree', this.value)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500">
        </div>
        <div>
          <label class="block text-[11px] font-medium text-slate-300 mb-1">École / Université</label>
          <input type="text" value="${escapeHtml(edu.school || '')}" oninput="updateEducationField(${idx}, 'school', this.value)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500">
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label class="block text-[11px] font-medium text-slate-300 mb-1">Ville</label>
          <input type="text" value="${escapeHtml(edu.city || '')}" oninput="updateEducationField(${idx}, 'city', this.value)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500">
        </div>
        <div>
          <label class="block text-[11px] font-medium text-slate-300 mb-1">Année début</label>
          <input type="text" placeholder="Ex: 2020" value="${escapeHtml(edu.startDate || '')}" oninput="updateEducationField(${idx}, 'startDate', this.value)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500">
        </div>
        <div>
          <label class="block text-[11px] font-medium text-slate-300 mb-1">Année fin</label>
          <input type="text" placeholder="Ex: 2022" value="${escapeHtml(edu.endDate || '')}" oninput="updateEducationField(${idx}, 'endDate', this.value)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500">
        </div>
      </div>

      <div>
        <label class="block text-[11px] font-medium text-slate-300 mb-1">Détails / Mentions / Spécialisation</label>
        <input type="text" value="${escapeHtml(edu.details || '')}" oninput="updateEducationField(${idx}, 'details', this.value)" placeholder="Ex: Mention Bien, Spécialité Systèmes..." class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500">
      </div>
    `;
    container.appendChild(card);
  });
}

function addEducation() {
  AppState.cvData.education.push({
    id: "edu-" + Date.now(),
    degree: "Licence / Master",
    school: "Université ou École",
    city: "Paris",
    startDate: "2020",
    endDate: "2023",
    details: ""
  });
  renderEducationList();
  updatePreview();
  persistState();
}

function removeEducation(idx) {
  AppState.cvData.education.splice(idx, 1);
  renderEducationList();
  updatePreview();
  persistState();
}

function updateEducationField(idx, field, val) {
  AppState.cvData.education[idx][field] = val;
  updatePreview();
  persistState();
}

/**
 * Gestion des Compétences
 */
function renderSkillsList() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  container.innerHTML = '';
  (AppState.cvData.skills || []).forEach((skill, idx) => {
    const row = document.createElement('div');
    row.className = 'flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-700/60';
    row.innerHTML = `
      <input type="text" value="${escapeHtml(skill.name || '')}" oninput="updateSkillName(${idx}, this.value)" placeholder="Compétence" class="flex-1 bg-transparent border-none text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-0">
      <div class="flex items-center gap-2 w-28">
        <input type="range" min="20" max="100" step="5" value="${skill.level || 80}" oninput="updateSkillLevel(${idx}, this.value)" class="w-full accent-blue-500 cursor-pointer">
        <span class="text-[10px] text-slate-400 w-7 text-right">${skill.level || 80}%</span>
      </div>
      <button type="button" onclick="removeSkill(${idx})" class="text-slate-500 hover:text-red-400 px-1" title="Supprimer">
        <i class="fa-solid fa-xmark text-xs"></i>
      </button>
    `;
    container.appendChild(row);
  });
}

function addSkill() {
  AppState.cvData.skills.push({ name: "Nouvelle compétence", level: 80 });
  renderSkillsList();
  updatePreview();
  persistState();
}

function removeSkill(idx) {
  AppState.cvData.skills.splice(idx, 1);
  renderSkillsList();
  updatePreview();
  persistState();
}

function updateSkillName(idx, val) {
  AppState.cvData.skills[idx].name = val;
  updatePreview();
  persistState();
}

function updateSkillLevel(idx, val) {
  AppState.cvData.skills[idx].level = parseInt(val, 10);
  renderSkillsList();
  updatePreview();
  persistState();
}

/**
 * Gestion des Langues
 */
function renderLanguagesList() {
  const container = document.getElementById('languages-container');
  if (!container) return;

  container.innerHTML = '';
  (AppState.cvData.languages || []).forEach((lang, idx) => {
    const row = document.createElement('div');
    row.className = 'flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-700/60';
    row.innerHTML = `
      <input type="text" value="${escapeHtml(lang.name || '')}" oninput="updateLangField(${idx}, 'name', this.value)" placeholder="Langue" class="flex-1 bg-transparent border-none text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-0">
      <input type="text" value="${escapeHtml(lang.level || '')}" oninput="updateLangField(${idx}, 'level', this.value)" placeholder="Niveau" class="w-36 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-white placeholder-slate-500 focus:outline-none">
      <button type="button" onclick="removeLanguage(${idx})" class="text-slate-500 hover:text-red-400 px-1" title="Supprimer">
        <i class="fa-solid fa-xmark text-xs"></i>
      </button>
    `;
    container.appendChild(row);
  });
}

function addLanguage() {
  AppState.cvData.languages.push({ name: "Langue", level: "Intermédiaire (B2)" });
  renderLanguagesList();
  updatePreview();
  persistState();
}

function removeLanguage(idx) {
  AppState.cvData.languages.splice(idx, 1);
  renderLanguagesList();
  updatePreview();
  persistState();
}

function updateLangField(idx, field, val) {
  AppState.cvData.languages[idx][field] = val;
  updatePreview();
  persistState();
}

/**
 * Écouteurs globaux
 */
function setupEventListeners() {
  const bindField = (id, callback) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', (e) => {
        callback(e.target.value);
        updatePreview();
        persistState();
      });
    }
  };

  bindField('personal-firstname', v => AppState.cvData.personal.firstName = v);
  bindField('personal-lastname', v => AppState.cvData.personal.lastName = v);
  bindField('personal-jobtitle', v => AppState.cvData.personal.jobTitle = v);
  bindField('personal-email', v => AppState.cvData.personal.email = v);
  bindField('personal-phone', v => AppState.cvData.personal.phone = v);
  bindField('personal-city', v => AppState.cvData.personal.city = v);
  bindField('personal-website', v => AppState.cvData.personal.website = v);
  bindField('personal-linkedin', v => AppState.cvData.personal.linkedin = v);
  bindField('personal-github', v => AppState.cvData.personal.github = v);
  bindField('personal-summary', v => AppState.cvData.summary = v);
  
  bindField('personal-interests', v => {
    AppState.cvData.interests = v.split(',').map(s => s.trim()).filter(s => s.length > 0);
  });

  // Écouteurs Lettre de motivation
  bindField('letter-recipient', v => AppState.letterData.recipient = v);
  bindField('letter-subject', v => AppState.letterData.subject = v);
  bindField('letter-body', v => AppState.letterData.body = v);

  const togglePhoto = document.getElementById('toggle-show-photo');
  if (togglePhoto) {
    togglePhoto.addEventListener('change', (e) => {
      AppState.cvData.personal.showPhoto = e.target.checked;
      updatePreview();
      persistState();
    });
  }

  const photoInput = document.getElementById('photo-file-input');
  if (photoInput) {
    photoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          AppState.cvData.personal.photo = event.target.result;
          AppState.cvData.personal.showPhoto = true;
          if (togglePhoto) togglePhoto.checked = true;
          const photoImg = document.getElementById('photo-preview-img');
          if (photoImg) photoImg.src = event.target.result;
          updatePreview();
          persistState();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  const selTemplate = document.getElementById('select-template');
  if (selTemplate) {
    selTemplate.addEventListener('change', (e) => {
      AppState.template = e.target.value;
      updatePreview();
      persistState();
    });
  }

  const selFont = document.getElementById('select-font');
  if (selFont) {
    selFont.addEventListener('change', (e) => {
      AppState.fontFamily = e.target.value;
      updateFontAndDensity();
      persistState();
    });
  }

  const selDensity = document.getElementById('select-density');
  if (selDensity) {
    selDensity.addEventListener('change', (e) => {
      AppState.density = e.target.value;
      updateFontAndDensity();
      persistState();
    });
  }
}

function selectPresetAvatar(url) {
  AppState.cvData.personal.photo = url;
  AppState.cvData.personal.showPhoto = true;
  const togglePhoto = document.getElementById('toggle-show-photo');
  if (togglePhoto) togglePhoto.checked = true;
  const photoImg = document.getElementById('photo-preview-img');
  if (photoImg) photoImg.src = url;
  updatePreview();
  persistState();
  showToast("Photo sélectionnée !");
}

/**
 * Calcul du Score ATS
 */
function updateAtsScore() {
  const data = AppState.cvData;
  let score = 0;
  const tips = [];

  if (data.personal.firstName && data.personal.lastName) score += 10;
  else tips.push("Renseignez vos nom et prénom complets");

  if (data.personal.jobTitle) score += 5;
  else tips.push("Ajoutez un intitulé de poste précis");

  let contactScore = 0;
  if (data.personal.email) contactScore += 5;
  if (data.personal.phone) contactScore += 5;
  if (data.personal.city) contactScore += 5;
  score += contactScore;
  if (contactScore < 15) tips.push("Indiquez votre email, numéro et ville");

  if (data.summary && data.summary.trim().length > 50) score += 15;
  else tips.push("Rédigez une accroche professionnelle (min. 50 caractères)");

  if (data.experiences && data.experiences.length >= 2) {
    score += 20;
    const hasBullets = data.experiences.some(e => e.description && e.description.includes('•'));
    if (hasBullets) score += 5;
  } else if (data.experiences && data.experiences.length === 1) {
    score += 12;
    tips.push("Ajoutez au moins 2 expériences ou projets");
  } else {
    tips.push("Ajoutez vos expériences professionnelles");
  }

  if (data.education && data.education.length >= 1) score += 10;
  else tips.push("Ajoutez au moins une formation");

  if (data.skills && data.skills.length >= 4) score += 15;
  else if (data.skills && data.skills.length >= 2) {
    score += 8;
    tips.push("Indiquez au moins 4 compétences clés");
  } else {
    tips.push("Ajoutez vos compétences");
  }

  if (data.languages && data.languages.length >= 1) score += 5;

  score = Math.min(100, Math.max(10, score));

  const scoreValueEl = document.getElementById('ats-score-value');
  const scoreProgressEl = document.getElementById('ats-score-bar');
  const scoreBadgeEl = document.getElementById('ats-score-badge');
  const scoreTipsEl = document.getElementById('ats-tips-container');

  if (scoreValueEl) scoreValueEl.textContent = `${score}%`;
  if (scoreProgressEl) {
    scoreProgressEl.style.width = `${score}%`;
    if (score >= 80) scoreProgressEl.className = 'h-full bg-emerald-500 rounded-full transition-all duration-500';
    else if (score >= 50) scoreProgressEl.className = 'h-full bg-amber-500 rounded-full transition-all duration-500';
    else scoreProgressEl.className = 'h-full bg-red-500 rounded-full transition-all duration-500';
  }

  if (scoreBadgeEl) {
    if (score >= 80) {
      scoreBadgeEl.textContent = 'Excellente visibilité';
      scoreBadgeEl.className = 'text-[11px] px-2 py-0.5 rounded-full font-semibold bg-emerald-900/60 text-emerald-300 border border-emerald-500/30';
    } else if (score >= 50) {
      scoreBadgeEl.textContent = 'Correct';
      scoreBadgeEl.className = 'text-[11px] px-2 py-0.5 rounded-full font-semibold bg-amber-900/60 text-amber-300 border border-amber-500/30';
    } else {
      scoreBadgeEl.textContent = 'À compléter';
      scoreBadgeEl.className = 'text-[11px] px-2 py-0.5 rounded-full font-semibold bg-red-900/60 text-red-300 border border-red-500/30';
    }
  }

  if (scoreTipsEl) {
    if (tips.length === 0) {
      scoreTipsEl.innerHTML = `<li class="text-xs text-emerald-400 flex items-center gap-1.5"><i class="fa-solid fa-circle-check"></i> Votre CV est complet et prêt pour les recruteurs et ATS !</li>`;
    } else {
      scoreTipsEl.innerHTML = tips.map(t => `<li class="text-xs text-slate-300 flex items-start gap-1.5"><i class="fa-solid fa-circle-exclamation text-amber-400 mt-0.5 flex-shrink-0"></i> <span>${t}</span></li>`).join('');
    }
  }
}

/**
 * Profils automatiques en 1 clic
 */
function loadPredefinedProfile(key) {
  if (!CV_DATA.profiles[key]) return;
  AppState.cvData = JSON.parse(JSON.stringify(CV_DATA.profiles[key]));
  renderFormFields();
  updatePreview();
  persistState();
  closeModal('modal-profiles');
  if (window.confetti) {
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
  }
  showToast("Profil complet chargé automatiquement !");
}

/**
 * Chargement d'un modèle de lettre de motivation en 1 clic
 */
function loadLetterPreset(type) {
  if (!CV_DATA.coverLetters[type]) return;
  AppState.letterData = JSON.parse(JSON.stringify(CV_DATA.coverLetters[type]));
  renderLetterFields();
  updatePreview();
  persistState();
  showToast("Modèle de lettre appliqué !");
}

/**
 * Assistant IA Résumé
 */
function openAiSummaryModal() {
  const modal = document.getElementById('modal-ai-summary');
  if (!modal) return;
  modal.classList.remove('hidden');
  renderSummarySuggestions('tech');
}

function renderSummarySuggestions(domain) {
  const container = document.getElementById('ai-summary-suggestions');
  if (!container) return;

  const list = CV_DATA.smartSummaries[domain] || CV_DATA.smartSummaries.tech;
  container.innerHTML = list.map((text) => `
    <div class="p-3.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:border-blue-500/80 transition-all flex flex-col justify-between gap-3 group">
      <p class="text-xs text-slate-200 leading-relaxed">${text}</p>
      <button type="button" onclick="applySummaryText(${JSON.stringify(text)})" class="self-end px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors">
        <i class="fa-solid fa-check"></i> Utiliser cette accroche
      </button>
    </div>
  `).join('');
}

function applySummaryText(text) {
  AppState.cvData.summary = text;
  setInputValue('personal-summary', text);
  updatePreview();
  persistState();
  closeModal('modal-ai-summary');
  showToast("Accroche appliquée !");
}

/**
 * Assistant Puces
 */
let currentTargetExpIndex = 0;

function openBulletModal(expIndex) {
  currentTargetExpIndex = expIndex;
  const modal = document.getElementById('modal-bullets');
  if (!modal) return;
  modal.classList.remove('hidden');
  renderBulletSuggestions('tech');
}

function renderBulletSuggestions(domain) {
  const container = document.getElementById('bullet-suggestions-list');
  if (!container) return;

  const list = CV_DATA.bulletPoints[domain] || CV_DATA.bulletPoints.tech;
  container.innerHTML = list.map((bullet) => `
    <div class="flex items-center justify-between p-3 rounded-lg bg-slate-800 border border-slate-700 hover:border-blue-500/60 transition-colors">
      <span class="text-xs text-slate-200 pr-3">${bullet}</span>
      <button type="button" onclick="insertBullet(${JSON.stringify(bullet)})" class="px-2.5 py-1 bg-slate-700 hover:bg-blue-600 text-white text-[11px] font-medium rounded transition-colors whitespace-nowrap">
        + Insérer
      </button>
    </div>
  `).join('');
}

function insertBullet(bullet) {
  const exp = AppState.cvData.experiences[currentTargetExpIndex];
  if (!exp) return;

  const prefix = bullet.startsWith('•') ? '' : '• ';
  if (exp.description && exp.description.trim().length > 0) {
    exp.description = exp.description.trim() + '\n' + prefix + bullet;
  } else {
    exp.description = prefix + bullet;
  }

  renderExperiencesList();
  updatePreview();
  persistState();
  showToast("Puce ajoutée à l'expérience !");
}

/**
 * Export PDF Impression Système
 */
function exportPdf() {
  if (window.confetti) {
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.8 } });
  }
  showToast("Ouverture de l'outil d'impression / export PDF...");
  setTimeout(() => {
    window.print();
  }, 400);
}

/**
 * Téléchargement direct PDF
 */
function downloadPdfDirect() {
  const element = document.getElementById('cv-preview-page');
  if (!element) return;

  if (window.confetti) {
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.8 } });
  }

  const prefix = AppState.mode === 'letter' ? 'Lettre' : 'CV';
  const fullName = `${AppState.cvData.personal.firstName}_${AppState.cvData.personal.lastName}`.trim() || 'Document';
  const opt = {
    margin: 0,
    filename: `${prefix}_${fullName}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, letterRendering: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  if (window.html2pdf) {
    showToast(`Téléchargement de votre ${prefix} en cours...`);
    window.html2pdf().set(opt).from(element).save().then(() => {
      showToast(`Votre ${prefix} a été téléchargé avec succès !`);
    }).catch(err => {
      console.error(err);
      window.print();
    });
  } else {
    window.print();
  }
}

/**
 * Export JSON
 */
function exportJson() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(AppState, null, 2));
  const downloadAnchor = document.createElement('a');
  const fullName = `${AppState.cvData.personal.firstName}_${AppState.cvData.personal.lastName}`.trim() || 'Mon_CV';
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `CV_${fullName}_data.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("Sauvegarde JSON exportée !");
}

/**
 * Import JSON
 */
function importJson(inputEl) {
  const file = inputEl.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed.cvData) {
        AppState.template = parsed.template || 'modern';
        AppState.primaryColor = parsed.primaryColor || '#2563eb';
        AppState.fontFamily = parsed.fontFamily || 'font-jakarta';
        AppState.density = parsed.density || 'density-normal';
        AppState.cvData = parsed.cvData;
        if (parsed.letterData) AppState.letterData = parsed.letterData;
      } else {
        AppState.cvData = parsed;
      }
      initApp();
      showToast("Données importées avec succès !");
    } catch (err) {
      alert("Le fichier JSON n'est pas valide.");
    }
  };
  reader.readAsText(file);
}

function resetCv() {
  if (confirm("Voulez-vous vraiment réinitialiser tout le document ?")) {
    AppState.cvData = {
      personal: { firstName: "", lastName: "", jobTitle: "", email: "", phone: "", city: "", showPhoto: false },
      summary: "",
      experiences: [],
      education: [],
      skills: [],
      languages: [],
      interests: []
    };
    renderFormFields();
    updatePreview();
    persistState();
    showToast("CV réinitialisé");
  }
}

/**
 * Zoom
 */
function setZoom(val) {
  AppState.zoom = Math.max(50, Math.min(150, val));
  const page = document.getElementById('cv-preview-page');
  const badge = document.getElementById('zoom-level-text');
  if (page) {
    page.style.transform = `scale(${AppState.zoom / 100})`;
  }
  if (badge) {
    badge.textContent = `${AppState.zoom}%`;
  }
}

function zoomIn() { setZoom(AppState.zoom + 10); }
function zoomOut() { setZoom(AppState.zoom - 10); }
function zoomReset() { setZoom(100); }

function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('hidden');
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('hidden');
}

function showToast(msg) {
  const toast = document.getElementById('toast-notification');
  const text = document.getElementById('toast-text');
  if (toast && text) {
    text.textContent = msg;
    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-20', 'opacity-0');
    }, 3200);
  }
}

function escapeHtml(string) {
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
