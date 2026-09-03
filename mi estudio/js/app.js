const STORAGE_KEY = "miEstudio.registros";
const GRADES_STORAGE_KEY = "miEstudio.examenes";
const SETTINGS_STORAGE_KEY = "miEstudio.ajustes";
const SUBJECTS_STORAGE_KEY = "miEstudio.asignaturasPersonalizadas";
const SUBJECT_CONFIG_STORAGE_KEY = "miEstudio.asignaturasConfig";
const GOALS_STORAGE_KEY = "miEstudio.objetivos";
const TRASH_STORAGE_KEY = "miEstudio.papelera";
const AUTHORIZED_STORAGE_KEY = "miEstudio.dispositivoAutorizado";
const CREDENTIAL_HASH_STORAGE_KEY = "miEstudio.credencialHash";
const INITIAL_CREDENTIAL_HASH = "45f3f2e291198f98e99b50bbc6e0b901223e7f207e598f44458af468d220488f";
const TRASH_RETENTION_DAYS = 30;
const APP_VERSION = "1.0.0";
const DEFAULT_SETTINGS = {
  animations: true, homeSubtitle: true, homeMotivation: true, homeCuriosities: true,
  sounds: false, sessionSummary: true, notifications: false, theme: "auto", accent: "violet",
  schoolYear: "", trimestres: {}
};
const TYPES = { ESTUDIO: "Estudio", DEBERES: "Deberes", TRABAJOS: "Trabajos" };
const BASE_SUBJECTS = [
  ["LENGUA", "Lengua"], ["FILOSOFIA", "Filosofía"], ["INGLES", "Inglés"], ["EDUCACION FISICA", "Educación física"],
  ["FRANCES", "Francés"], ["MATEMATICAS", "Matemáticas"], ["BIOLOGIA", "Biología"], ["FISICA Y QUIMICA", "Física y química"]
].map(([value, label]) => ({ value, label }));

const MOTIVATIONAL_PHRASES = [
  "La constancia convierte una tarde normal en un avance real.",
  "Un rato bien aprovechado también construye tu camino.",
  "Estudiar hoy hace más ligero el reto de mañana.",
  "No necesitas hacerlo perfecto; necesitas volver a intentarlo.",
  "Cada página que entiendes se queda contigo.",
  "La organización libera espacio para pensar mejor.",
  "Los objetivos grandes empiezan con una tarea concreta.",
  "Tu ritmo también es un ritmo válido.",
  "Un pequeño avance sigue siendo avance.",
  "La práctica paciente acaba encontrando su recompensa.",
  "Haz sitio para el esfuerzo que te acerca a lo que quieres.",
  "Cuando repites un buen hábito, la confianza crece con él.",
  "Hoy puedes concentrarte en el siguiente paso.",
  "Aprender es acumular pequeñas comprensiones.",
  "La mejor comparación es con la persona que eras ayer.",
  "Una sesión enfocada vale más que muchas intenciones.",
  "El orden de tus apuntes puede ser el comienzo del orden de tus ideas.",
  "Lo difícil se vuelve manejable cuando lo divides.",
  "Tu esfuerzo tiene valor incluso antes del resultado.",
  "La regularidad hace extraordinario lo cotidiano.",
  "Empieza por diez minutos y deja que el hábito haga el resto.",
  "Cada ejercicio corregido te enseña dos veces.",
  "La concentración también se entrena.",
  "Un plan sencillo puede sostener un objetivo ambicioso.",
  "Hoy no tienes que terminarlo todo, solo avanzar con intención.",
  "El progreso suele parecer pequeño mientras está ocurriendo.",
  "Vuelve a lo importante: entender, practicar y continuar.",
  "Tu esfuerzo de esta semana será la tranquilidad de otra.",
  "La disciplina es una forma de cuidar tus metas.",
  "Una duda resuelta abre espacio para la siguiente idea.",
  "Cada sesión deja una huella en tu forma de aprender.",
  "La paciencia también es una herramienta de estudio.",
  "Lo que hoy parece lento mañana puede ser una base sólida.",
  "La mejor manera de ganar claridad es empezar a ordenar.",
  "Un objetivo escrito se vuelve más fácil de visitar.",
  "Aprender no es correr: es no dejar de avanzar.",
  "La repetición con sentido transforma la memoria.",
  "Una tarde constante supera a una semana de prisas.",
  "Cada bloque de atención cuenta para tu futuro yo.",
  "Tu mesa ordenada no hace el trabajo, pero te ayuda a empezarlo.",
  "Da a cada asignatura un poco de tu atención y observa qué cambia.",
  "La mejora llega cuando conviertes los errores en pistas.",
  "El esfuerzo que registras también es esfuerzo que reconoces.",
  "Una pregunta bien formulada ya es parte de la respuesta.",
  "Lo importante no es cuánto falta, sino qué puedes hacer ahora.",
  "La constancia no hace ruido, pero deja resultados.",
  "Cada repaso reduce un poco la distancia con la seguridad.",
  "Si hoy retomas el hábito, ya estás cuidando tu progreso.",
  "La planificación funciona mejor cuando deja espacio para la realidad.",
  "Un concepto comprendido vale más que una página memorizada sin sentido.",
  "No subestimes el poder de una sesión tranquila.",
  "Cada día ofrece una oportunidad concreta de mejorar.",
  "Tus hábitos son decisiones pequeñas con dirección.",
  "Lo que practicas con atención se vuelve más tuyo.",
  "La confianza se construye con pruebas pequeñas y repetidas.",
  "Un calendario útil empieza por una fecha y una decisión.",
  "El descanso planificado también protege tu concentración.",
  "Cada tarea terminada despeja un poco tu mente.",
  "Tu mejor versión académica se entrena en días normales.",
  "No esperes a sentirte preparado para dar el primer paso.",
  "El hábito aparece cuando haces sitio a lo que importa.",
  "Un resumen propio demuestra que has hecho tuyo el contenido.",
  "La atención sostenida se gana minuto a minuto.",
  "Cada sesión puede tener un propósito claro, aunque sea breve.",
  "Aprender algo nuevo es una forma concreta de crecer.",
  "Los repasos oportunos hacen menos pesado el último momento.",
  "Tus avances no necesitan parecerse a los de nadie.",
  "Lo que mantienes con paciencia acaba siendo parte de ti.",
  "Una lista corta y realista puede cambiar una tarde.",
  "La claridad llega después de sentarte con el problema.",
  "Cada intento honesto mejora el siguiente.",
  "Hoy puedes dejar una cosa un poco mejor que ayer.",
  "El esfuerzo sostenido tiene memoria.",
  "Estudiar también es aprender a organizar tu propia atención.",
  "Los resultados duraderos suelen nacer de rutinas sencillas.",
  "Una corrección no señala un límite: señala el siguiente punto de mejora.",
  "La perseverancia se nota en las veces que vuelves.",
  "Pon nombre a tu próximo paso y hazlo visible.",
  "El tiempo que dedicas con intención se convierte en experiencia.",
  "Tu progreso merece ser medido con honestidad y paciencia.",
  "La preparación empieza mucho antes del examen.",
  "Un buen hábito no exige una versión perfecta de ti.",
  "Cada sesión te ayuda a conocerte como estudiante.",
  "No dejes que una dificultad decida el final de la historia.",
  "La organización es una aliada, no una exigencia más.",
  "Tu atención de hoy puede ahorrarte preocupación mañana.",
  "Una idea difícil se vuelve cercana cuando la visitas varias veces.",
  "El progreso personal no necesita público para ser importante.",
  "Cada esfuerzo cuenta más cuando tiene un siguiente paso.",
  "La paciencia hace posible lo que la prisa abandona.",
  "Estudiar con propósito cambia la forma de mirar el tiempo.",
  "Lo que haces de forma regular termina pesando a tu favor.",
  "Un día flojo no borra los días en los que sí estuviste.",
  "Retomar también es una forma de avanzar.",
  "Tu objetivo se acerca cada vez que eliges ocuparte de él.",
  "Una sesión breve puede ser el puente hacia una sesión mejor.",
  "La mejora se encuentra en los detalles que decides revisar.",
  "Cada materia puede enseñarte una forma distinta de pensar.",
  "La concentración se fortalece cuando eliminas un poco de ruido.",
  "Hazlo comprensible, hazlo posible y sigue.",
  "El estudio constante deja más opciones abiertas.",
  "Tus decisiones de hoy también son una inversión en calma.",
  "La voluntad ayuda a empezar; el hábito ayuda a continuar.",
  "Cada registro es una forma de hacer visible tu dedicación.",
  "Los objetivos se alcanzan con pasos que caben en un día.",
  "Tu ritmo mejora cuando puedes verlo con claridad.",
  "La práctica convierte el ‘todavía no’ en ‘ya puedo’.",
  "Aprender es volver sobre las cosas con una mirada más preparada.",
  "La próxima sesión no necesita ser perfecta para ser útil.",
  "La constancia se construye con decisiones que parecen pequeñas.",
  "Cada minuto concentrado es una señal de compromiso contigo.",
  "El esfuerzo organizado se transforma en confianza.",
  "A veces progresar es simplemente no abandonar la pregunta.",
  "Una meta clara ordena mejor tus energías.",
  "Tu historial puede recordarte que sí sabes avanzar.",
  "La mejora empieza cuando observas sin juzgar y ajustas.",
  "Estudiar un poco hoy mantiene vivo el hilo del aprendizaje.",
  "El hábito no llega de golpe: se reconoce mirando atrás.",
  "Cada semana puedes construir una versión más cómoda de tu rutina.",
  "La atención que prestas ahora se convierte en soltura después.",
  "Un esfuerzo medido es un esfuerzo que puedes sostener.",
  "El progreso tiene muchas formas: comprender, recordar y preguntar.",
  "Tu trabajo de hoy merece el mismo respeto que un gran resultado.",
  "Una buena sesión empieza al elegir qué merece tu atención.",
  "La organización te devuelve tiempo para aprender con calma.",
  "No hace falta esperar al lunes para volver a empezar.",
  "Cada sesión importante es un voto por tus propios objetivos.",
  "Tu mejor referencia es lo que ahora puedes hacer y antes no.",
  "La continuidad hace que el siguiente paso resulte más familiar.",
  "Los errores bien revisados se convierten en atajos.",
  "Un poco de orden puede hacer visible una gran cantidad de esfuerzo.",
  "La constancia es avanzar incluso cuando nadie está mirando.",
  "Cada objetivo puede dividirse hasta encontrar un comienzo.",
  "El estudio también se trata de descubrir qué método te funciona.",
  "La mejora no siempre es rápida, pero puede ser real.",
  "Hoy puedes reforzar una base que agradecerás más adelante.",
  "Una tarea clara es más amable que una preocupación difusa.",
  "Tus hábitos merecen ajustes, no reproches.",
  "Cada vuelta al contenido aumenta tu familiaridad con él.",
  "La perseverancia convierte las dudas en territorio conocido.",
  "Lo que registras hoy puede darte perspectiva dentro de un mes."
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const dom = {
  appShell: $("#app-shell"), authGate: $("#auth-gate"), authForm: $("#auth-form"), authCredential: $("#auth-credential"), authMessage: $("#auth-message"),
  home: $("#home-view"), study: $("#study-form-panel"), records: $("#records-view"), statistics: $("#statistics-view"), grades: $("#grades-view"), settings: $("#settings-view"),
  openStudy: $("#open-study-form"), openRecords: $("#open-records"), openGrades: $("#open-grades"), openStatistics: $("#open-statistics"), openSettings: $("#open-settings"),
  backStudy: $("#back-to-home"), backRecords: $("#records-back"), backStatistics: $("#statistics-back"), backGrades: $("#grades-back"), backSettings: $("#settings-back"),
  homeSubtitle: $("#home-subtitle"), homeInsight: $("#home-insight"), motivation: $("#motivation-text"), homeOverview: $("#home-overview"), curiosities: $("#home-curiosities"), curiositiesList: $("#curiosities-list"),
  studyForm: $("#study-form"), studyMessage: $("#form-message"), studySubject: $("#subject"), studyType: $("#study-type"), hours: $("#hours"), minutes: $("#minutes"), studyDate: $("#study-date"), studyGoal: $("#study-goal"), studyImportant: $("#study-important"),
  sessionSummary: $("#session-summary"), sessionSummaryContent: $("#session-summary-content"), closeSessionSummary: $("#close-session-summary"),
  recordsDate: $("#records-date"), recordsList: $("#records-list"), dayTotal: $("#day-total"), recordsCount: $("#records-count"), recordsSummaryLabel: $("#records-summary-label"), previousDay: $("#previous-day"), nextDay: $("#next-day"),
  filterToggle: $("#records-filter-toggle"), filters: $("#records-filters"), filterStatus: $("#records-filter-status"), periodFilter: $("#records-period-filter"), subjectFilter: $("#records-subject-filter"), typeFilter: $("#records-type-filter"), clearFilters: $("#clear-record-filters"),
  statisticsRange: $("#statistics-range"), statisticsContent: $("#statistics-content"),
  gradesForm: $("#grades-form"), gradesMessage: $("#grades-message"), gradeSubject: $("#grade-subject"), gradeDescription: $("#grade-description"), gradeDate: $("#grade-date"), gradeScore: $("#grade-score"), gradeMaximum: $("#grade-maximum"), gradeFormTitle: $("#grade-form-title"), gradeFormHelp: $("#grade-form-help"), gradeSubmit: $("#grade-submit"), gradeOptional: $(".grade-fields .optional"), upcomingExams: $("#upcoming-exams"), pendingExams: $("#pending-exams"), gradesSummary: $("#grades-summary"), gradesSubjects: $("#grades-subject-averages"), gradesEvolution: $("#grades-evolution"), gradesList: $("#grades-list"),
  settingsMessage: $("#settings-message"), animations: $("#setting-animations"), homeSubtitleSetting: $("#setting-home-subtitle"), homeMotivation: $("#setting-home-motivation"), homeCuriosities: $("#setting-home-curiosities"), sounds: $("#setting-sounds"), sessionSummarySetting: $("#setting-session-summary"), notifications: $("#setting-notifications"), theme: $("#setting-theme"), accent: $("#setting-accent"), schoolYear: $("#school-year"), credentialForm: $("#credential-form"), currentCredential: $("#current-credential"), newCredential: $("#new-credential"), confirmCredential: $("#confirm-credential"), credentialMessage: $("#credential-message"), resetCredential: $("#reset-credential"),
  subjectForm: $("#custom-subject-form"), subjectName: $("#custom-subject-name"), subjectEditId: $("#subject-edit-id"), subjectEditKind: $("#subject-edit-kind"), subjectSubmit: $("#subject-submit"), subjectCancel: $("#subject-cancel"), customSubjects: $("#custom-subjects"),
  goalsForm: $("#goals-form"), goalName: $("#goal-name"), goalMinutes: $("#goal-minutes"), goalEditId: $("#goal-edit-id"), goalSubmit: $("#goal-submit"), goalCancel: $("#goal-cancel"), goalsList: $("#goals-list"),
  saveTerms: $("#save-terms"), export: $("#export-data"), import: $("#import-data"), clearHistory: $("#clear-history"), trash: $("#trash-list"), trashCount: $("#trash-count"), reset: $("#reset-settings")
};
const termInputs = ["1", "2", "3"].map((term) => ({ term, start: $("#term-" + term + "-start"), end: $("#term-" + term + "-end") }));
const views = [dom.home, dom.study, dom.records, dom.statistics, dom.grades, dom.settings];
const periodButtons = $$(".period-button");
const statPageButtons = $$(".stat-nav-button");
let editingRecordId = null;
let editingGradeId = null;
let statisticsPeriod = "week";
let statisticsPage = "summary";
let selectedTerm = "1";
let gradeMode = "exam";
let audioContext = null;

function id() { return window.crypto?.randomUUID ? window.crypto.randomUUID() : String(Date.now()) + "-" + Math.random().toString(16).slice(2); }
function hashCredential(value) {
  const constants = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];
  const rotate = (number, amount) => (number >>> amount) | (number << (32 - amount));
  const bytes = new TextEncoder().encode(String(value));
  const paddedLength = Math.ceil((bytes.length + 9) / 64) * 64;
  const padded = new Uint8Array(paddedLength);
  padded.set(bytes); padded[bytes.length] = 0x80;
  const view = new DataView(padded.buffer);
  const bitLength = bytes.length * 8;
  view.setUint32(paddedLength - 8, Math.floor(bitLength / 0x100000000));
  view.setUint32(paddedLength - 4, bitLength >>> 0);
  let hash = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
  for (let offset = 0; offset < paddedLength; offset += 64) {
    const words = new Uint32Array(64);
    for (let index = 0; index < 16; index += 1) words[index] = view.getUint32(offset + index * 4);
    for (let index = 16; index < 64; index += 1) {
      const first = words[index - 15], second = words[index - 2];
      const small0 = rotate(first, 7) ^ rotate(first, 18) ^ (first >>> 3);
      const small1 = rotate(second, 17) ^ rotate(second, 19) ^ (second >>> 10);
      words[index] = (words[index - 16] + small0 + words[index - 7] + small1) >>> 0;
    }
    let [a, b, c, d, e, f, g, h] = hash;
    for (let index = 0; index < 64; index += 1) {
      const big1 = rotate(e, 6) ^ rotate(e, 11) ^ rotate(e, 25);
      const choice = (e & f) ^ (~e & g);
      const temp1 = (h + big1 + choice + constants[index] + words[index]) >>> 0;
      const big0 = rotate(a, 2) ^ rotate(a, 13) ^ rotate(a, 22);
      const majority = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (big0 + majority) >>> 0;
      h = g; g = f; f = e; e = (d + temp1) >>> 0; d = c; c = b; b = a; a = (temp1 + temp2) >>> 0;
    }
    hash = hash.map((value, index) => (value + [a, b, c, d, e, f, g, h][index]) >>> 0);
  }
  return hash.map((value) => value.toString(16).padStart(8, "0")).join("");
}
function today() { const date = new Date(); return dateValue(date); }
function dateFrom(value) { return new Date(String(value || "") + "T12:00:00"); }
function dateValue(date) { return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0"); }
function addDays(date, amount) { const next = new Date(date); next.setDate(next.getDate() + amount); return next; }
function formatDate(value, short = false) { const date = dateFrom(value); return Number.isNaN(date.getTime()) ? "Fecha sin definir" : date.toLocaleDateString("es-ES", short ? { day: "numeric", month: "short" } : { weekday: "long", day: "numeric", month: "long" }); }
function readArray(key) { try { const value = JSON.parse(localStorage.getItem(key) || "[]"); return Array.isArray(value) ? value : []; } catch { return []; } }
function readObject(key) { try { const value = JSON.parse(localStorage.getItem(key) || "{}"); return value && typeof value === "object" && !Array.isArray(value) ? value : {}; } catch { return {}; } }
function boolValue(value) { return value === true || value === 1 || value === "1" || value === "true"; }
function normalizeType(value) { const raw = String(value || "").trim().toUpperCase(); return TYPES[raw] ? raw : raw === "TRABAJO" || raw === "TRABAJOS" ? "TRABAJOS" : raw === "DEBER" || raw === "DEBERES" ? "DEBERES" : "ESTUDIO"; }
function normalizeRecord(item, index = 0) {
  if (!item || typeof item !== "object") return null;
  const hasHours = item.hours != null || item.horas != null;
  const totalMinutes = item.totalMinutes ?? item.minutosTotales;
  const rawTotal = Number(totalMinutes);
  const hours = hasHours ? Number(item.hours ?? item.horas ?? 0) : Number.isFinite(rawTotal) ? Math.floor(rawTotal / 60) : 0;
  const minutes = hasHours ? Number(item.minutes ?? item.minutos ?? 0) : Number.isFinite(rawTotal) ? rawTotal % 60 : 0;
  return { ...item, id: item.id || "legacy-record-" + index, subject: String(item.subject ?? item.asignatura ?? "").trim(), type: normalizeType(item.type ?? item.tipo), hours: Number.isFinite(hours) ? Math.max(0, Math.floor(hours)) : 0, minutes: Number.isFinite(minutes) ? Math.max(0, Math.floor(minutes)) : 0, date: String(item.date ?? item.fecha ?? "").slice(0, 10), goal: String(item.goal ?? item.objetivo ?? "").trim(), important: boolValue(item.important ?? item.importante) };
}
function getRecords() { return readArray(STORAGE_KEY).map(normalizeRecord).filter((item) => item && item.subject && item.date); }
function saveRecords(records) { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); }
function normalizeGrade(item, index = 0) {
  if (!item || typeof item !== "object") return null;
  const rawScore = item.score ?? item.nota;
  const rawMaximum = item.maximum ?? item.maxima ?? item.notaMaxima;
  const score = rawScore === "" || rawScore == null || String(rawScore).toLowerCase() === "pendiente" ? null : Number(rawScore);
  const maximum = rawMaximum === "" || rawMaximum == null || String(rawMaximum).toLowerCase() === "pendiente" ? null : Number(rawMaximum);
  return { ...item, id: item.id || "legacy-grade-" + index, subject: String(item.subject ?? item.asignatura ?? "").trim(), description: String(item.description ?? item.title ?? item.nombre ?? item.titulo ?? "Examen").trim(), date: String(item.date ?? item.fecha ?? "").slice(0, 10), score: Number.isFinite(score) ? score : null, maximum: Number.isFinite(maximum) ? maximum : null };
}
function getGrades() { return readArray(GRADES_STORAGE_KEY).map(normalizeGrade).filter((item) => item && item.subject && item.date); }
function saveGrades(grades) { localStorage.setItem(GRADES_STORAGE_KEY, JSON.stringify(grades)); }
function escapeHtml(value) { return String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]); }
function recordMinutes(record) { const hours = Number(record?.hours) || 0; const minutes = Number(record?.minutes) || 0; return hours * 60 + minutes; }
function duration(minutes) { const safe = Math.max(0, Math.round(Number(minutes) || 0)); return safe >= 60 ? Math.floor(safe / 60) + " h" + (safe % 60 ? " " + safe % 60 + " min" : "") : safe + " min"; }
function subjectCode(name) { return String(name).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^A-Z0-9]+/g, " ").trim() || "ASIGNATURA"; }
function formatGrade(value) { return Number(value).toLocaleString("es-ES", { maximumFractionDigits: 2 }); }

function getSettings() {
  const value = readObject(SETTINGS_STORAGE_KEY);
  if (Object.prototype.hasOwnProperty.call(value, "name")) { delete value.name; saveSettings(value); }
  const trimestres = value.trimestres || value.trimestresConfig || {};
  return { ...DEFAULT_SETTINGS, ...value, trimestres: trimestres && typeof trimestres === "object" ? trimestres : {} };
}
function saveSettings(settings) { const clean = { ...settings }; delete clean.name; localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(clean)); }
function getCustomSubjects() {
  return readArray(SUBJECTS_STORAGE_KEY).map((item, index) => {
    if (typeof item === "string") return { id: "legacy-subject-" + index, value: subjectCode(item), label: item };
    if (!item || typeof item !== "object") return null;
    const label = String(item.label || item.name || item.nombre || item.value || "").trim();
    return label ? { ...item, id: item.id || "legacy-subject-" + index, value: item.value || subjectCode(label), label, kind: "custom" } : null;
  }).filter(Boolean);
}
function saveCustomSubjects(subjects) { localStorage.setItem(SUBJECTS_STORAGE_KEY, JSON.stringify(subjects)); }
function getSubjectConfig() { const raw = readObject(SUBJECT_CONFIG_STORAGE_KEY); return { overrides: raw.overrides && typeof raw.overrides === "object" ? raw.overrides : {}, hidden: Array.isArray(raw.hidden) ? raw.hidden : [], order: Array.isArray(raw.order) ? raw.order : [] }; }
function saveSubjectConfig(config) { localStorage.setItem(SUBJECT_CONFIG_STORAGE_KEY, JSON.stringify(config)); }
function getGoals() {
  return readArray(GOALS_STORAGE_KEY).map((item, index) => {
    const nombre = String(item?.nombre || item?.name || "").trim();
    const objetivoMinutos = Number(item?.objetivoMinutos ?? item?.targetMinutes ?? item?.minutos);
    return nombre && Number.isFinite(objetivoMinutos) && objetivoMinutos > 0 ? { ...item, id: item.id || "legacy-goal-" + index, nombre, objetivoMinutos, activo: item.activo !== false && item.active !== false } : null;
  }).filter(Boolean);
}
function saveGoals(goals) { localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(goals)); }
function getTrash() {
  const limit = Date.now() - TRASH_RETENTION_DAYS * 86400000;
  const items = readArray(TRASH_STORAGE_KEY).filter((item) => item?.item && new Date(item.deletedAt).getTime() >= limit);
  if (items.length !== readArray(TRASH_STORAGE_KEY).length) saveTrash(items);
  return items;
}
function saveTrash(items) { localStorage.setItem(TRASH_STORAGE_KEY, JSON.stringify(items)); }
function sendToTrash(type, item) { const trash = getTrash(); trash.unshift({ id: id(), type, item, deletedAt: new Date().toISOString() }); saveTrash(trash); }

function allSubjects() {
  const config = getSubjectConfig();
  const hidden = new Set(config.hidden);
  const seen = new Set();
  const defaults = BASE_SUBJECTS.filter((item) => !hidden.has(item.value)).map((item) => ({ ...item, label: config.overrides[item.value] || item.label, kind: "default" }));
  const custom = getCustomSubjects();
  return [...defaults, ...custom].filter((item) => item.value && !seen.has(item.value) && seen.add(item.value));
}
function subjectLabel(value) { const current = allSubjects().find((item) => item.value === value); if (current) return current.label; const base = BASE_SUBJECTS.find((item) => item.value === value); return getSubjectConfig().overrides[value] || base?.label || String(value || "Sin asignatura"); }
function typeLabel(value) { return TYPES[value] || String(value || "Actividad"); }
function isGraded(grade) { return grade?.score !== null && grade?.score !== undefined && grade?.score !== "" && grade?.maximum !== null && grade?.maximum !== undefined && grade?.maximum !== "" && Number.isFinite(Number(grade.score)) && Number.isFinite(Number(grade.maximum)) && Number(grade.maximum) > 0 && Number(grade.score) >= 0 && Number(grade.score) <= Number(grade.maximum); }
function gradePercent(grade) { return isGraded(grade) ? Number(grade.score) / Number(grade.maximum) * 100 : 0; }

function showOnly(view) {
  views.forEach((item) => { item.hidden = item !== view; item.classList.remove("view-enter"); });
  dom.openStudy.setAttribute("aria-expanded", String(view === dom.study));
  if (view && getSettings().animations) { requestAnimationFrame(() => view.classList.add("view-enter")); }
}
function home() { editingRecordId = null; editingGradeId = null; showOnly(dom.home); renderHome(); }
function message(element, text, error = false) { element.textContent = text; element.classList.toggle("is-error", error); }
function applySettings() {
  const settings = getSettings();
  document.documentElement.dataset.theme = settings.theme || "auto";
  document.documentElement.dataset.accent = settings.accent || "violet";
  document.body.classList.toggle("animations-disabled", !settings.animations);
  dom.homeSubtitle.hidden = !settings.homeSubtitle;
  dom.homeInsight.hidden = !settings.homeMotivation;
  dom.curiosities.hidden = !settings.homeCuriosities;
}
function syncSettingsForm() {
  const settings = getSettings();
  dom.animations.checked = Boolean(settings.animations); dom.homeSubtitleSetting.checked = Boolean(settings.homeSubtitle); dom.homeMotivation.checked = Boolean(settings.homeMotivation); dom.homeCuriosities.checked = Boolean(settings.homeCuriosities);
  dom.sounds.checked = Boolean(settings.sounds); dom.sessionSummarySetting.checked = Boolean(settings.sessionSummary); dom.notifications.checked = Boolean(settings.notifications); dom.theme.value = settings.theme || "auto"; dom.accent.value = settings.accent || "violet"; dom.schoolYear.value = settings.schoolYear || "";
  termInputs.forEach(({ term, start, end }) => { start.value = settings.trimestres?.[term]?.inicio || ""; end.value = settings.trimestres?.[term]?.fin || ""; });
}
function setOptions(select, options, selected = "") {
  const fragment = document.createDocumentFragment();
  options.forEach(({ value, label, disabled }) => { const option = document.createElement("option"); option.value = value; option.textContent = label; option.disabled = Boolean(disabled); fragment.append(option); });
  select.replaceChildren(fragment); select.value = selected;
}
function refreshSubjectInputs() {
  const update = (select, selected) => { if (!select) return; const subjects = allSubjects(); if (selected && !subjects.some((item) => item.value === selected)) subjects.push({ value: selected, label: subjectLabel(selected) }); setOptions(select, [{ value: "", label: "Elige una asignatura", disabled: true }, ...subjects], selected); };
  update(dom.studySubject, dom.studySubject.value); update(dom.gradeSubject, dom.gradeSubject.value);
  const current = dom.subjectFilter.value; const known = new Set(); const options = [...allSubjects(), ...getRecords().map((record) => ({ value: record.subject, label: subjectLabel(record.subject) })), ...getGrades().map((grade) => ({ value: grade.subject, label: subjectLabel(grade.subject) }))].filter((item) => item?.value && !known.has(item.value) && known.add(item.value));
  setOptions(dom.subjectFilter, [{ value: "", label: "Todas las asignaturas" }, ...options], current);
}

function filterRange() {
  const selected = dateFrom(dom.recordsDate.value || today()); const mode = dom.periodFilter.value;
  if (mode === "all") return null;
  if (mode === "month") return { start: new Date(selected.getFullYear(), selected.getMonth(), 1, 12), end: new Date(selected.getFullYear(), selected.getMonth() + 1, 0, 12) };
  if (mode === "week") { const start = addDays(selected, 1 - (selected.getDay() || 7)); return { start, end: addDays(start, 6) }; }
  return { start: selected, end: selected };
}
function filterLabel() { const mode = dom.periodFilter.value; if (mode === "all") return "Todas las fechas"; if (mode === "month") return "Este mes"; if (mode === "week") return "Esta semana"; return "Día seleccionado"; }
function renderRecords() {
  const range = filterRange(); let records = getRecords();
  if (range) records = records.filter((record) => record.date >= dateValue(range.start) && record.date <= dateValue(range.end));
  if (dom.subjectFilter.value) records = records.filter((record) => record.subject === dom.subjectFilter.value);
  if (dom.typeFilter.value) records = records.filter((record) => record.type === dom.typeFilter.value);
  records.sort((a, b) => (b.date + b.id).localeCompare(a.date + a.id));
  const total = records.reduce((sum, record) => sum + recordMinutes(record), 0);
  dom.filterStatus.textContent = filterLabel() + (dom.subjectFilter.value || dom.typeFilter.value ? " · filtros activos" : "");
  dom.recordsSummaryLabel.textContent = range && dateValue(range.start) === dateValue(range.end) ? "Tiempo total del día" : "Tiempo total del periodo";
  dom.dayTotal.textContent = duration(total); dom.recordsCount.textContent = records.length + (records.length === 1 ? " sesión" : " sesiones");
  dom.recordsList.innerHTML = records.length ? records.map((record) => `<article class="record-item"><div><h3>${record.important ? '<span class="important-marker" title="Sesión importante">★</span> ' : ""}${escapeHtml(subjectLabel(record.subject))}</h3><p>${escapeHtml(typeLabel(record.type))} · ${duration(recordMinutes(record))} · ${formatDate(record.date, true)}</p>${record.goal ? `<p class="record-goal">Objetivo: ${escapeHtml(record.goal)}</p>` : ""}</div><div class="record-actions"><button class="record-action" type="button" data-action="edit" data-id="${escapeHtml(record.id)}">Editar</button><button class="record-action record-action--delete" type="button" data-action="delete" data-id="${escapeHtml(record.id)}">Eliminar</button></div></article>`).join("") : `<div class="empty-state"><strong>No hay registros aquí</strong><span>${range && dateValue(range.start) === dateValue(range.end) ? "Prueba con otro día o registra una sesión." : "Prueba a quitar algún filtro."}</span></div>`;
}

function getTermRange(term = selectedTerm) { const value = getSettings().trimestres?.[term]; return value?.inicio && value?.fin && value.inicio <= value.fin ? { start: dateFrom(value.inicio), end: dateFrom(value.fin), label: formatDate(value.inicio, true) + " — " + formatDate(value.fin, true) } : null; }
function getRange() {
  const now = dateFrom(today());
  if (statisticsPeriod === "week") { const start = addDays(now, 1 - (now.getDay() || 7)); return { start, end: addDays(start, 6), label: "Esta semana" }; }
  if (statisticsPeriod === "month") return { start: new Date(now.getFullYear(), now.getMonth(), 1, 12), end: new Date(now.getFullYear(), now.getMonth() + 1, 0, 12), label: now.toLocaleDateString("es-ES", { month: "long", year: "numeric" }) };
  return getTermRange();
}
function aggregate(range) {
  const records = getRecords().filter((record) => record.date >= dateValue(range.start) && record.date <= dateValue(range.end)); const days = [];
  for (let cursor = new Date(range.start); cursor <= range.end; cursor = addDays(cursor, 1)) { const date = dateValue(cursor); const entries = records.filter((record) => record.date === date); const study = entries.filter((record) => record.type === "ESTUDIO").reduce((sum, record) => sum + recordMinutes(record), 0); const homework = entries.filter((record) => record.type === "DEBERES").reduce((sum, record) => sum + recordMinutes(record), 0); const work = entries.filter((record) => record.type === "TRABAJOS").reduce((sum, record) => sum + recordMinutes(record), 0); days.push({ date, entries, study, homework, work, total: study + homework + work }); }
  return { range, records, days, total: days.reduce((sum, day) => sum + day.total, 0), study: days.reduce((sum, day) => sum + day.study, 0), homework: days.reduce((sum, day) => sum + day.homework, 0), work: days.reduce((sum, day) => sum + day.work, 0) };
}
function metric(label, value, detail = "", highlight = false) { return `<div class="metric${highlight ? " metric--highlight" : ""}"><span>${label}</span><strong>${value}</strong>${detail ? "<small>" + detail + "</small>" : ""}</div>`; }
function emptyStats(text = "Aún no hay datos suficientes para mostrar esta gráfica.") { return `<div class="empty-state empty-state--stats"><strong>Aún no hay datos</strong><span>${text}</span></div>`; }
function chart(days, legend = "Tiempo total diario") { if (!days.some((day) => day.total > 0)) return emptyStats("Registra alguna sesión en este periodo y volverá a aparecer aquí."); const max = Math.max(...days.map((day) => day.total), 1); return `<div class="bar-chart" role="img" aria-label="${escapeHtml(legend)}">${days.map((day) => `<div class="bar-column"><div class="bar" style="height:${Math.max(4, day.total / max * 100)}%" title="${duration(day.total)}"></div><small>${formatDate(day.date, true)}</small></div>`).join("")}</div><div class="bar-legend"><span><i></i>${legend}</span></div>`; }
function subjectsFor(data) { const map = {}; data.records.forEach((record) => { const item = map[record.subject] || { name: subjectLabel(record.subject), total: 0, study: 0, homework: 0, work: 0, sessions: 0 }; const minutes = recordMinutes(record); item.total += minutes; item.sessions += 1; if (record.type === "ESTUDIO") item.study += minutes; if (record.type === "DEBERES") item.homework += minutes; if (record.type === "TRABAJOS") item.work += minutes; map[record.subject] = item; }); return Object.values(map).sort((a, b) => b.total - a.total); }
function activityFor(data) { return [{ label: "Estudio", value: data.study, type: "ESTUDIO" }, { label: "Deberes", value: data.homework, type: "DEBERES" }, { label: "Trabajos", value: data.work, type: "TRABAJOS" }]; }
function bindTermSelect() { $("#term-select")?.addEventListener("change", (event) => { selectedTerm = event.target.value; renderStatistics(); }); }
function renderStatistics() {
  periodButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.period === statisticsPeriod)); statPageButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.statPage === statisticsPage));
  const range = statisticsPage === "terms" ? getTermRange() : getRange();
  if (!range) { dom.statisticsRange.textContent = "Configura las fechas del trimestre en Ajustes"; dom.statisticsContent.innerHTML = `<section class="stats-card"><h3>Selecciona un trimestre</h3><select class="term-select" id="term-select"><option value="1" ${selectedTerm === "1" ? "selected" : ""}>1º trimestre</option><option value="2" ${selectedTerm === "2" ? "selected" : ""}>2º trimestre</option><option value="3" ${selectedTerm === "3" ? "selected" : ""}>3º trimestre</option></select>${emptyStats("Cuando configures sus fechas podrás ver el tiempo real de ese periodo.")}</section>`; bindTermSelect(); return; }
  const data = aggregate(range); dom.statisticsRange.textContent = range.label + " · " + formatDate(dateValue(range.start), true) + " — " + formatDate(dateValue(range.end), true);
  if (statisticsPage === "summary") {
    const studied = data.days.filter((day) => day.total > 0).length; const important = data.records.filter((record) => record.important).length; const avg = data.records.length ? Math.round(data.total / data.records.length) : 0;
    dom.statisticsContent.innerHTML = `<section class="stats-card"><h3>Resumen del periodo</h3><div class="stats-grid">${metric("Tiempo total", duration(data.total), "en el periodo", true)}${metric("Estudio", duration(data.study))}${metric("Deberes", duration(data.homework))}${metric("Trabajos", duration(data.work))}${metric("Sesiones", data.records.length)}${metric("Días estudiados", studied + " de " + data.days.length)}${metric("Media por sesión", duration(avg))}${metric("Sesiones importantes", important)}</div></section>`;
  } else if (statisticsPage === "daily") {
    dom.statisticsContent.innerHTML = data.records.length ? `<section class="stats-card"><h3>Tiempo por día</h3>${chart(data.days)}</section><section class="stats-card"><h3>Detalle diario</h3><div class="stats-list">${data.days.filter((day) => day.total > 0).map((day) => `<div class="stats-row"><span>${formatDate(day.date, true)}</span><strong>${duration(day.total)} · ${day.entries.length} ${day.entries.length === 1 ? "sesión" : "sesiones"}</strong></div>`).join("")}</div></section>` : emptyStats();
  } else if (statisticsPage === "subjects") {
    const subjects = subjectsFor(data); dom.statisticsContent.innerHTML = subjects.length ? `<section class="stats-card"><h3>Tiempo por asignatura</h3>${subjects.map((subject, index) => `<article class="subject-rank"><strong class="rank-number">${index + 1}</strong><div><strong>${escapeHtml(subject.name)}</strong><p>Estudio ${duration(subject.study)} · Deberes ${duration(subject.homework)} · Trabajos ${duration(subject.work)}</p></div><div><strong>${duration(subject.total)}</strong><p>${subject.sessions} sesiones</p></div></article>`).join("")}</section>` : emptyStats();
  } else if (statisticsPage === "activity") {
    const activities = activityFor(data); dom.statisticsContent.innerHTML = data.records.length ? `<section class="stats-card"><h3>Tiempo por tipo de actividad</h3><div class="stats-list">${activities.map((activity) => `<div class="stats-row"><span>${activity.label}<br><small>${data.records.filter((record) => record.type === activity.type).length} sesiones</small></span><strong>${duration(activity.value)}</strong></div>`).join("")}</div></section>` : emptyStats();
  } else if (statisticsPage === "evolution") {
    const length = data.days.length; const previous = aggregate({ start: addDays(range.start, -length), end: addDays(range.start, -1) }); const difference = data.total - previous.total; const changeLabel = difference > 0 ? "+" + duration(difference) : difference < 0 ? "−" + duration(Math.abs(difference)) : "Sin cambio";
    dom.statisticsContent.innerHTML = data.records.length || previous.records.length ? `<section class="stats-card"><h3>Comparación con el periodo anterior</h3><div class="comparison"><div><span>Diferencia de tiempo</span><strong>${changeLabel}</strong></div><div><span>Sesiones</span><strong>${data.records.length - previous.records.length > 0 ? "+" : ""}${data.records.length - previous.records.length}</strong></div><div><span>Media diaria</span><strong>${duration(Math.round(data.total / Math.max(1, length)))}</strong></div></div></section><section class="stats-card"><h3>Evolución del periodo</h3>${chart(data.days)}</section>` : emptyStats("Necesitas datos de al menos un periodo para comparar.");
  } else if (statisticsPage === "terms") {
    const weeks = {}; data.records.forEach((record) => { const date = dateFrom(record.date); const key = dateValue(addDays(date, 1 - (date.getDay() || 7))); weeks[key] = (weeks[key] || 0) + recordMinutes(record); }); const values = Object.entries(weeks).sort(([a], [b]) => a.localeCompare(b)); const max = Math.max(...values.map(([, value]) => value), 1);
    dom.statisticsContent.innerHTML = `<section class="stats-card"><h3>${escapeHtml(getSettings().schoolYear || "Trimestre")}</h3><select class="term-select" id="term-select"><option value="1" ${selectedTerm === "1" ? "selected" : ""}>1º trimestre</option><option value="2" ${selectedTerm === "2" ? "selected" : ""}>2º trimestre</option><option value="3" ${selectedTerm === "3" ? "selected" : ""}>3º trimestre</option></select><div class="stats-grid">${metric("Tiempo total", duration(data.total))}${metric("Semanas con estudio", values.length)}${metric("Días estudiados", data.days.filter((day) => day.total > 0).length)}</div></section><section class="stats-card"><h3>Evolución semanal</h3>${values.length ? `<div class="bar-chart" role="img" aria-label="Evolución semanal">${values.map(([week, value]) => `<div class="bar-column"><div class="bar" style="height:${Math.max(4, value / max * 100)}%" title="${duration(value)}"></div><small>${formatDate(week, true)}</small></div>`).join("")}</div>` : emptyStats()}</section>`; bindTermSelect();
  } else if (statisticsPage === "records") {
    const records = getRecords(); if (!records.length) dom.statisticsContent.innerHTML = emptyStats("Cuando guardes sesiones podrás descubrir tus propios récords."); else { const longest = [...records].sort((a, b) => recordMinutes(b) - recordMinutes(a))[0]; const byDay = {}; records.forEach((record) => { byDay[record.date] = (byDay[record.date] || 0) + recordMinutes(record); }); const best = Object.entries(byDay).sort((a, b) => b[1] - a[1])[0]; const streak = bestStreak(records); dom.statisticsContent.innerHTML = `<section class="stats-card"><h3>Récords personales</h3><div class="stats-list"><div class="stats-row"><span>Sesión más larga</span><strong>${escapeHtml(subjectLabel(longest.subject))} · ${duration(recordMinutes(longest))}</strong></div><div class="stats-row"><span>Día con más estudio</span><strong>${formatDate(best[0], true)} · ${duration(best[1])}</strong></div><div class="stats-row"><span>Mejor racha</span><strong>${streak} ${streak === 1 ? "día" : "días"}</strong></div><div class="stats-row"><span>Tiempo acumulado</span><strong>${duration(records.reduce((sum, record) => sum + recordMinutes(record), 0))}</strong></div></div></section>`; }
  } else if (statisticsPage === "goals") {
    const goals = getGoals().filter((goal) => goal.activo !== false); dom.statisticsContent.innerHTML = goals.length ? `<section class="stats-card"><h3>Progreso de objetivos activos</h3><div class="stats-list">${goals.map((goal) => { const percent = Math.min(100, Math.round(data.total / goal.objetivoMinutos * 100)); return `<div class="goal-progress"><div class="stats-row"><span>${escapeHtml(goal.nombre)}<br><small>${percent}% conseguido${percent >= 100 ? " · objetivo alcanzado" : " · faltan " + duration(goal.objetivoMinutos - data.total)}</small></span><strong>${duration(Math.min(data.total, goal.objetivoMinutos))} / ${duration(goal.objetivoMinutos)}</strong></div><div class="progress-track"><span style="width:${percent}%"></span></div></div>`; }).join("")}</div></section>` : emptyStats("Activa algún objetivo en Ajustes para ver su progreso.");
  }
}

function allTimeSummary() { const records = getRecords(); return { records, total: records.reduce((sum, record) => sum + recordMinutes(record), 0), sessions: records.length, important: records.filter((record) => record.important).length }; }
function bestStreak(records = getRecords()) { const dates = [...new Set(records.map((record) => record.date).filter(Boolean))].sort(); if (!dates.length) return 0; let best = 1, current = 1; for (let index = 1; index < dates.length; index += 1) { if (dateValue(addDays(dateFrom(dates[index - 1]), 1)) === dates[index]) { current += 1; best = Math.max(best, current); } else current = 1; } return best; }
function currentStreak(records = getRecords()) { const dates = new Set(records.map((record) => record.date)); let cursor = dateFrom(today()); let count = 0; while (dates.has(dateValue(cursor))) { count += 1; cursor = addDays(cursor, -1); } return count; }
function motivationText() { const { records, total } = allTimeSummary(); if (!records.length) return "Todo hábito empieza cuando decides hacer visible el primer paso."; const streak = currentStreak(records); if (streak >= 3) return `Llevas una racha de ${streak} días. La constancia que ya estás construyendo merece continuar.`; if (total >= 300) return `Ya has acumulado ${duration(total)} de estudio. Tu dedicación tiene una base real.`; if (records.length === 1) return "Ya has convertido una intención en un registro. Mantén vivo el hábito."; const day = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000); return MOTIVATIONAL_PHRASES[(day + records.length + total) % MOTIVATIONAL_PHRASES.length]; }
function renderHome() {
  const { records, total, sessions, important } = allTimeSummary(); dom.motivation.textContent = motivationText(); const bySubject = subjectsFor({ records }); const streak = currentStreak(records);
  dom.homeOverview.innerHTML = records.length ? `<div class="home-metric"><span>Tiempo acumulado</span><strong>${duration(total)}</strong></div><div class="home-metric"><span>Sesiones</span><strong>${sessions}</strong></div><div class="home-metric"><span>Racha actual</span><strong>${streak} ${streak === 1 ? "día" : "días"}</strong></div>` : `<div class="home-empty">Aún no hay sesiones guardadas. Tu primer registro aparecerá aquí.</div>`;
  if (!records.length) { dom.curiositiesList.innerHTML = `<div class="empty-state"><strong>Tus datos aparecerán aquí</strong><span>Cuando tengas sesiones podremos calcular curiosidades reales sobre tus hábitos.</span></div>`; return; }
  const weekdays = {}; records.forEach((record) => { const label = dateFrom(record.date).toLocaleDateString("es-ES", { weekday: "long" }); weekdays[label] = (weekdays[label] || 0) + recordMinutes(record); }); const bestWeekday = Object.entries(weekdays).sort((a, b) => b[1] - a[1])[0]; const longest = [...records].sort((a, b) => recordMinutes(b) - recordMinutes(a))[0]; const types = {}; records.forEach((record) => { types[record.type] = (types[record.type] || 0) + 1; }); const frequentType = Object.entries(types).sort((a, b) => b[1] - a[1])[0]; const facts = [`<span>Asignatura con más tiempo</span><strong>${escapeHtml(bySubject[0]?.name || "Sin datos")} · ${duration(bySubject[0]?.total || 0)}</strong>`, `<span>Día de la semana más activo</span><strong>${escapeHtml(bestWeekday[0])} · ${duration(bestWeekday[1])}</strong>`, `<span>Tu sesión más larga</span><strong>${escapeHtml(subjectLabel(longest.subject))} · ${duration(recordMinutes(longest))}</strong>`, `<span>Actividad más frecuente</span><strong>${escapeHtml(typeLabel(frequentType[0]))} · ${frequentType[1]} ${frequentType[1] === 1 ? "sesión" : "sesiones"}</strong>`]; const bestStreakValue = bestStreak(records); if (bestStreakValue > 1) facts.push(`<span>Mejor racha</span><strong>${bestStreakValue} días seguidos con estudio</strong>`); dom.curiositiesList.innerHTML = facts.map((fact) => `<div class="curiosity-item">${fact}</div>`).join(""); }

function showSessionSummary(record) { const all = getRecords(); const subjectTotal = all.filter((item) => item.subject === record.subject).reduce((sum, item) => sum + recordMinutes(item), 0); dom.sessionSummaryContent.innerHTML = `<div><span>Tiempo</span><strong>${duration(recordMinutes(record))}</strong></div><div><span>Asignatura</span><strong>${escapeHtml(subjectLabel(record.subject))}</strong></div><div><span>Actividad</span><strong>${escapeHtml(typeLabel(record.type))}</strong></div><div><span>Acumulado en la asignatura</span><strong>${duration(subjectTotal)}</strong></div>${record.goal ? `<div class="summary-wide"><span>Objetivo</span><strong>${escapeHtml(record.goal)}</strong></div>` : ""}`; dom.sessionSummary.hidden = false; }
function hideSessionSummary() { dom.sessionSummary.hidden = true; }

function syncGradeMode() { const note = gradeMode === "note"; $("#grade-mode-exam").classList.toggle("is-active", !note); $("#grade-mode-note").classList.toggle("is-active", note); $("#grade-mode-exam").setAttribute("aria-selected", String(!note)); $("#grade-mode-note").setAttribute("aria-selected", String(note)); dom.gradeFormTitle.textContent = note ? "Añadir nota obtenida" : "Nuevo examen"; dom.gradeFormHelp.textContent = note ? "Las notas guardadas aquí sí entran en tus medias." : "Puede guardarse ahora y añadir la nota después."; dom.gradeSubmit.textContent = note ? "Guardar nota" : "Guardar examen"; dom.gradeScore.required = note; dom.gradeMaximum.required = note; dom.gradeOptional.textContent = note ? "obligatoria" : "opcional en exámenes"; }
function renderGrades() {
  const grades = getGrades().sort((a, b) => b.date.localeCompare(a.date)); const graded = grades.filter(isGraded); const pending = grades.filter((grade) => !isGraded(grade)); const upcoming = pending.filter((grade) => grade.date >= today()).sort((a, b) => a.date.localeCompare(b.date)); const oldPending = pending.filter((grade) => grade.date < today()).sort((a, b) => b.date.localeCompare(a.date));
  const gradeCard = (grade, status) => `<article class="grade-item"><div><h4>${escapeHtml(subjectLabel(grade.subject))} · ${escapeHtml(grade.description)}</h4><p>${formatDate(grade.date, true)}</p></div><div><strong class="grade-score">Nota no asignada aún</strong><p>${escapeHtml(status)}</p><div class="grade-actions"><button class="record-action" type="button" data-grade-action="edit" data-id="${escapeHtml(grade.id)}">Editar</button><button class="record-action record-action--delete" type="button" data-grade-action="delete" data-id="${escapeHtml(grade.id)}">Eliminar</button></div></div></article>`;
  dom.upcomingExams.innerHTML = upcoming.length ? upcoming.map((grade) => gradeCard(grade, "Próximo examen")).join("") : `<div class="empty-state"><strong>No hay próximos exámenes pendientes</strong><span>Los exámenes que aún no tienen nota aparecerán aquí.</span></div>`;
  dom.pendingExams.innerHTML = oldPending.length ? oldPending.map((grade) => gradeCard(grade, "Fecha pasada · nota no asignada aún")).join("") : `<div class="empty-state"><strong>No hay otros exámenes sin nota</strong><span>Los exámenes pendientes no afectan a tus medias.</span></div>`;
  if (!graded.length) { dom.gradesSummary.innerHTML = `<div class="metric"><span>Nota media</span><strong>—</strong><small>${grades.length ? "Aún no hay notas obtenidas" : "Todavía no hay exámenes"}</small></div><div class="metric"><span>Exámenes registrados</span><strong>${grades.length}</strong><small>${pending.length} sin nota</small></div>`; dom.gradesSubjects.innerHTML = emptyStats("Registra una nota obtenida para ver medias por asignatura."); dom.gradesEvolution.innerHTML = emptyStats("La evolución aparecerá cuando tengas al menos una nota."); } else { const average = graded.reduce((sum, grade) => sum + gradePercent(grade), 0) / graded.length; const best = [...graded].sort((a, b) => gradePercent(b) - gradePercent(a))[0]; dom.gradesSummary.innerHTML = `<div class="metric metric--highlight"><span>Nota media general</span><strong>${formatGrade(average / 10)} / 10</strong><small>${formatGrade(average)}% sobre la nota máxima</small></div><div class="metric"><span>Mejor nota</span><strong>${formatGrade(best.score)} / ${formatGrade(best.maximum)}</strong><small>${escapeHtml(subjectLabel(best.subject))}</small></div><div class="metric"><span>Notas obtenidas</span><strong>${graded.length}</strong><small>${pending.length} exámenes sin nota no cuentan</small></div>`; const bySubject = {}; graded.forEach((grade) => { const item = bySubject[grade.subject] || { total: 0, count: 0 }; item.total += gradePercent(grade); item.count += 1; bySubject[grade.subject] = item; }); dom.gradesSubjects.innerHTML = `<div class="stats-list">${Object.entries(bySubject).sort((a, b) => b[1].total / b[1].count - a[1].total / a[1].count).map(([subject, data]) => `<div class="stats-row"><span>${escapeHtml(subjectLabel(subject))}<br><small>${data.count} ${data.count === 1 ? "nota" : "notas"}</small></span><strong>${formatGrade(data.total / data.count / 10)} / 10</strong></div>`).join("")}</div>`; const evolution = [...graded].sort((a, b) => a.date.localeCompare(b.date)); const max = Math.max(...evolution.map(gradePercent), 1); dom.gradesEvolution.innerHTML = `<div class="bar-chart" role="img" aria-label="Evolución de notas">${evolution.map((grade) => `<div class="bar-column"><div class="bar" style="height:${Math.max(4, gradePercent(grade) / max * 100)}%" title="${escapeHtml(grade.description)}: ${formatGrade(gradePercent(grade))}%"></div><small>${formatDate(grade.date, true)}</small></div>`).join("")}</div><div class="bar-legend"><span><i></i>Nota relativa a la máxima</span></div>`; }
  dom.gradesList.innerHTML = graded.length ? graded.map((grade) => `<article class="grade-item"><div><h4>${escapeHtml(subjectLabel(grade.subject))} · ${escapeHtml(grade.description)}</h4><p>${formatDate(grade.date, true)}</p></div><div><strong class="grade-score">${formatGrade(grade.score)} / ${formatGrade(grade.maximum)}</strong><p>${formatGrade(gradePercent(grade))}%</p><div class="grade-actions"><button class="record-action" type="button" data-grade-action="edit" data-id="${escapeHtml(grade.id)}">Editar</button><button class="record-action record-action--delete" type="button" data-grade-action="delete" data-id="${escapeHtml(grade.id)}">Eliminar</button></div></div></article>`).join("") : `<div class="empty-state"><strong>Aún no hay notas obtenidas</strong><span>Cambia a esta pestaña para guardar una calificación.</span></div>`;
}
function editGrade(grade) { editingGradeId = grade.id; gradeMode = isGraded(grade) ? "note" : "exam"; syncGradeMode(); refreshSubjectInputs(); dom.gradeSubject.value = grade.subject; dom.gradeDescription.value = grade.description; dom.gradeDate.value = grade.date; dom.gradeScore.value = isGraded(grade) ? grade.score : ""; dom.gradeMaximum.value = isGraded(grade) ? grade.maximum : ""; message(dom.gradesMessage, "Editando registro."); dom.gradeDescription.focus(); }

function renderSettingsLists() {
  const subjects = allSubjects(); dom.customSubjects.innerHTML = subjects.length ? subjects.map((subject) => `<div class="tag-item"><span><strong>${escapeHtml(subject.label)}</strong><small>${subject.kind === "default" ? "Predeterminada editable" : "Personalizada"}</small></span><div class="item-actions"><button class="record-action" type="button" data-subject-action="edit" data-id="${escapeHtml(subject.value)}" data-kind="${subject.kind}">Editar</button><button class="record-action record-action--delete" type="button" data-subject-action="delete" data-id="${escapeHtml(subject.value)}" data-kind="${subject.kind}">Eliminar</button></div></div>`).join("") : `<p class="empty-trash">No hay asignaturas disponibles.</p>`;
  const goals = getGoals(); dom.goalsList.innerHTML = goals.length ? goals.map((goal) => `<div class="settings-list-item"><span><strong>${escapeHtml(goal.nombre)}</strong><small>${duration(goal.objetivoMinutos)} por periodo · ${goal.activo !== false ? "Activo" : "Inactivo"}</small></span><div class="item-actions"><label class="mini-toggle" title="Activar objetivo"><input type="checkbox" data-goal-action="toggle" data-id="${escapeHtml(goal.id)}" ${goal.activo !== false ? "checked" : ""} /><span>Activo</span></label><button class="record-action" type="button" data-goal-action="edit" data-id="${escapeHtml(goal.id)}">Editar</button><button class="record-action record-action--delete" type="button" data-goal-action="delete" data-id="${escapeHtml(goal.id)}">Eliminar</button></div></div>`).join("") : `<p class="empty-trash">No hay objetivos configurados.</p>`;
  const trash = getTrash().sort((a, b) => new Date(b.deletedAt) - new Date(a.deletedAt)); dom.trashCount.textContent = trash.length ? `(${trash.length})` : ""; dom.trash.innerHTML = trash.length ? trash.map((entry) => { const remaining = Math.max(0, Math.ceil((TRASH_RETENTION_DAYS * 86400000 - (Date.now() - new Date(entry.deletedAt).getTime())) / 86400000)); const item = entry.item; const detail = entry.type === "record" ? subjectLabel(item.subject) + " · " + typeLabel(item.type) + " · " + duration(recordMinutes(item)) : subjectLabel(item.subject) + " · " + (item.description || "Examen"); return `<article class="trash-item"><div><strong>${entry.type === "record" ? "Registro" : "Examen"}</strong><p>${escapeHtml(detail)}<br><small>${remaining} días restantes</small></p></div><div class="trash-item__actions"><button class="record-action" type="button" data-trash-action="restore" data-id="${escapeHtml(entry.id)}">Restaurar</button><button class="record-action record-action--delete" type="button" data-trash-action="delete" data-id="${escapeHtml(entry.id)}">Borrar</button></div></article>`; }).join("") : `<p class="empty-trash">La papelera está vacía.</p>`;
}
function resetSubjectForm() { dom.subjectForm.reset(); dom.subjectEditId.value = ""; dom.subjectEditKind.value = ""; dom.subjectSubmit.textContent = "Añadir"; dom.subjectCancel.hidden = true; }
function resetGoalForm() { dom.goalsForm.reset(); dom.goalEditId.value = ""; dom.goalSubmit.textContent = "Añadir"; dom.goalCancel.hidden = true; }
function refreshViews() { applySettings(); renderHome(); refreshSubjectInputs(); renderSettingsLists(); if (!dom.records.hidden) renderRecords(); if (!dom.statistics.hidden) renderStatistics(); if (!dom.grades.hidden) renderGrades(); }
function playSound() { if (!getSettings().sounds) return; try { audioContext ||= new (window.AudioContext || window.webkitAudioContext)(); const oscillator = audioContext.createOscillator(); const gain = audioContext.createGain(); oscillator.type = "sine"; oscillator.frequency.value = 660; gain.gain.setValueAtTime(0.035, audioContext.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.12); oscillator.connect(gain).connect(audioContext.destination); oscillator.start(); oscillator.stop(audioContext.currentTime + 0.12); } catch {} }
function notify(title, body) { if (!getSettings().notifications || !("Notification" in window)) return; const show = () => { if (Notification.permission === "granted") new Notification(title, { body }); }; if (Notification.permission === "default") Notification.requestPermission().then(show).catch(() => {}); else show(); }

function mergeById(current, incoming, normalizer) { const result = [...current]; const ids = new Set(current.map((item) => item?.id).filter(Boolean)); incoming.filter((item) => item && typeof item === "object").forEach((item, index) => { const candidate = normalizer ? normalizer(item, index) : item; if (!candidate) return; if (current.some((existing) => existing?.id === candidate.id && JSON.stringify(existing) === JSON.stringify(candidate))) return; const next = { ...candidate, id: candidate.id && !ids.has(candidate.id) ? candidate.id : id() }; ids.add(next.id); result.push(next); }); return result; }
function importPayload(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new Error("El archivo no contiene datos válidos.");
  const records = Array.isArray(payload.records) ? payload.records : Array.isArray(payload.registros) ? payload.registros : []; const grades = Array.isArray(payload.grades) ? payload.grades : Array.isArray(payload.examenes) ? payload.examenes : []; const subjects = Array.isArray(payload.customSubjects) ? payload.customSubjects : Array.isArray(payload.asignaturasPersonalizadas) ? payload.asignaturasPersonalizadas : []; const goals = Array.isArray(payload.goals) ? payload.goals : Array.isArray(payload.objetivos) ? payload.objetivos : []; const trash = Array.isArray(payload.trash) ? payload.trash : Array.isArray(payload.papelera) ? payload.papelera : []; const incomingSettings = payload.settings || payload.ajustes;
  if (!records.length && !grades.length && !subjects.length && !goals.length && !trash.length && (!incomingSettings || typeof incomingSettings !== "object")) throw new Error("No se han encontrado datos importables.");
  saveRecords(mergeById(getRecords(), records, normalizeRecord)); saveGrades(mergeById(getGrades(), grades, normalizeGrade));
  const currentSubjects = getCustomSubjects(); const names = new Set(currentSubjects.map((item) => subjectCode(item.label))); subjects.forEach((item, index) => { const label = String(item?.label || item?.name || item?.nombre || item || "").trim(); if (label && !names.has(subjectCode(label))) { names.add(subjectCode(label)); currentSubjects.push({ id: item?.id || id(), value: item?.value || subjectCode(label), label }); } }); saveCustomSubjects(currentSubjects); saveGoals(mergeById(getGoals(), goals)); saveTrash(mergeById(getTrash(), trash));
  if (incomingSettings && typeof incomingSettings === "object" && !Array.isArray(incomingSettings)) { const current = getSettings(); saveSettings({ ...current, ...incomingSettings, trimestres: { ...current.trimestres, ...(incomingSettings.trimestres || incomingSettings.trimestresConfig || {}) } }); }
  if (payload.subjectConfig && typeof payload.subjectConfig === "object") { const current = getSubjectConfig(); saveSubjectConfig({ ...current, ...payload.subjectConfig, overrides: { ...current.overrides, ...(payload.subjectConfig.overrides || {}) }, hidden: [...new Set([...current.hidden, ...(payload.subjectConfig.hidden || [])])] }); }
  applySettings(); syncSettingsForm(); refreshViews(); message(dom.settingsMessage, "Datos importados y combinados con los que ya tenías.");
}

function startApp() {
  dom.studyDate.value = today(); dom.gradeDate.value = today(); dom.recordsDate.value = today(); applySettings(); syncSettingsForm(); refreshSubjectInputs(); syncGradeMode(); refreshViews();

dom.openStudy.addEventListener("click", () => { editingRecordId = null; dom.studyForm.reset(); dom.studyDate.value = today(); hideSessionSummary(); message(dom.studyMessage, ""); refreshSubjectInputs(); showOnly(dom.study); dom.studySubject.focus(); });
dom.backStudy.addEventListener("click", home); dom.closeSessionSummary.addEventListener("click", hideSessionSummary);
dom.openRecords.addEventListener("click", () => { showOnly(dom.records); dom.recordsDate.value = today(); refreshSubjectInputs(); renderRecords(); }); dom.backRecords.addEventListener("click", home);
dom.openStatistics.addEventListener("click", () => { showOnly(dom.statistics); renderStatistics(); }); dom.backStatistics.addEventListener("click", home);
dom.openGrades.addEventListener("click", () => { editingGradeId = null; gradeMode = "exam"; dom.gradesForm.reset(); dom.gradeDate.value = today(); syncGradeMode(); message(dom.gradesMessage, ""); refreshSubjectInputs(); showOnly(dom.grades); renderGrades(); }); dom.backGrades.addEventListener("click", home);
dom.openSettings.addEventListener("click", () => { showOnly(dom.settings); syncSettingsForm(); renderSettingsLists(); message(dom.settingsMessage, ""); }); dom.backSettings.addEventListener("click", home);
periodButtons.forEach((button) => button.addEventListener("click", () => { statisticsPeriod = button.dataset.period; renderStatistics(); })); statPageButtons.forEach((button) => button.addEventListener("click", () => { statisticsPage = button.dataset.statPage; renderStatistics(); }));
dom.recordsDate.addEventListener("change", renderRecords); dom.previousDay.addEventListener("click", () => { dom.recordsDate.value = dateValue(addDays(dateFrom(dom.recordsDate.value || today()), -1)); renderRecords(); }); dom.nextDay.addEventListener("click", () => { dom.recordsDate.value = dateValue(addDays(dateFrom(dom.recordsDate.value || today()), 1)); renderRecords(); }); [dom.periodFilter, dom.subjectFilter, dom.typeFilter].forEach((input) => input.addEventListener("change", renderRecords));
dom.filterToggle.addEventListener("click", () => { const open = dom.filters.hidden; dom.filters.hidden = !open; dom.filterToggle.setAttribute("aria-expanded", String(open)); dom.filterToggle.classList.toggle("is-open", open); }); dom.clearFilters.addEventListener("click", () => { dom.periodFilter.value = "day"; dom.subjectFilter.value = ""; dom.typeFilter.value = ""; dom.recordsDate.value = today(); renderRecords(); });

dom.recordsList.addEventListener("click", (event) => { const button = event.target.closest("button[data-action]"); if (!button) return; const records = getRecords(); const record = records.find((item) => item.id === button.dataset.id); if (!record) return; if (button.dataset.action === "delete") { if (!window.confirm("¿Enviar este registro a la papelera temporal?")) return; sendToTrash("record", record); saveRecords(records.filter((item) => item.id !== record.id)); refreshViews(); return; } editingRecordId = record.id; refreshSubjectInputs(); showOnly(dom.study); dom.studySubject.value = record.subject; dom.studyType.value = record.type; dom.hours.value = record.hours; dom.minutes.value = record.minutes; dom.studyDate.value = record.date; dom.studyGoal.value = record.goal || ""; dom.studyImportant.checked = Boolean(record.important); hideSessionSummary(); message(dom.studyMessage, "Editando registro."); });
dom.studyForm.addEventListener("submit", (event) => { event.preventDefault(); const hours = Number(dom.hours.value), minutes = Number(dom.minutes.value); if (!Number.isInteger(hours) || !Number.isInteger(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || hours === 0 && minutes === 0) return message(dom.studyMessage, "Indica un tiempo válido mayor que cero.", true); if (!dom.studySubject.value || !dom.studyDate.value) return message(dom.studyMessage, "Completa la asignatura y la fecha.", true); const records = getRecords(); const existing = records.find((item) => item.id === editingRecordId); const record = { ...existing, id: editingRecordId || id(), subject: dom.studySubject.value, type: normalizeType(dom.studyType.value), hours, minutes, date: dom.studyDate.value, goal: dom.studyGoal.value.trim(), important: dom.studyImportant.checked }; const index = records.findIndex((item) => item.id === record.id); if (index >= 0) records[index] = record; else records.push(record); saveRecords(records); editingRecordId = null; dom.studyForm.reset(); dom.studyDate.value = today(); const summary = subjectLabel(record.subject) + " · " + typeLabel(record.type) + " · " + duration(recordMinutes(record)); if (getSettings().sessionSummary) { message(dom.studyMessage, "Registro guardado: " + summary + "."); showSessionSummary(record); } else { hideSessionSummary(); message(dom.studyMessage, "Registro guardado correctamente."); } playSound(); notify("Mi Estudio", "Sesión guardada: " + summary); refreshViews(); });

$(".content-tabs").querySelectorAll(".content-tab").forEach((button) => button.addEventListener("click", () => { gradeMode = button.dataset.gradeMode; syncGradeMode(); message(dom.gradesMessage, ""); }));
dom.gradesForm.addEventListener("submit", (event) => { event.preventDefault(); const scoreText = dom.gradeScore.value.trim(), maximumText = dom.gradeMaximum.value.trim(), description = dom.gradeDescription.value.trim(); if (!dom.gradeSubject.value || !description || !dom.gradeDate.value) return message(dom.gradesMessage, "Completa la asignatura, el nombre y la fecha.", true); if ((scoreText === "") !== (maximumText === "")) return message(dom.gradesMessage, "Para guardar una nota, indica la nota obtenida y la máxima.", true); if (gradeMode === "note" && scoreText === "") return message(dom.gradesMessage, "Indica la nota obtenida y la nota máxima.", true); let score = null, maximum = null; if (scoreText !== "") { score = Number(scoreText); maximum = Number(maximumText); if (!Number.isFinite(score) || !Number.isFinite(maximum) || maximum <= 0 || score < 0 || score > maximum) return message(dom.gradesMessage, "Indica una nota válida entre 0 y la nota máxima.", true); } const grades = getGrades(); const existing = grades.find((item) => item.id === editingGradeId); const grade = { ...existing, id: editingGradeId || id(), subject: dom.gradeSubject.value, description, date: dom.gradeDate.value, score, maximum }; const index = grades.findIndex((item) => item.id === grade.id); if (index >= 0) grades[index] = grade; else grades.push(grade); saveGrades(grades); editingGradeId = null; dom.gradesForm.reset(); dom.gradeDate.value = today(); message(dom.gradesMessage, isGraded(grade) ? "Nota guardada correctamente." : "Examen pendiente guardado correctamente."); playSound(); notify("Mi Estudio", isGraded(grade) ? "Nota guardada: " + subjectLabel(grade.subject) : "Examen pendiente: " + grade.description); refreshViews(); });
function handleGradeAction(event) { const button = event.target.closest("button[data-grade-action]"); if (!button) return; const grades = getGrades(); const grade = grades.find((item) => item.id === button.dataset.id); if (!grade) return; if (button.dataset.gradeAction === "delete") { if (!window.confirm("¿Enviar este examen a la papelera temporal?")) return; sendToTrash("grade", grade); saveGrades(grades.filter((item) => item.id !== grade.id)); refreshViews(); return; } editGrade(grade); }
dom.gradesList.addEventListener("click", handleGradeAction); dom.upcomingExams.addEventListener("click", handleGradeAction); dom.pendingExams.addEventListener("click", handleGradeAction);

[[dom.animations, "animations"], [dom.homeSubtitleSetting, "homeSubtitle"], [dom.homeMotivation, "homeMotivation"], [dom.homeCuriosities, "homeCuriosities"], [dom.sounds, "sounds"], [dom.sessionSummarySetting, "sessionSummary"], [dom.notifications, "notifications"]].forEach(([input, key]) => input.addEventListener("change", () => { saveSettings({ ...getSettings(), [key]: input.checked }); applySettings(); renderHome(); message(dom.settingsMessage, "Ajuste guardado."); }));
[[dom.theme, "theme"], [dom.accent, "accent"]].forEach(([input, key]) => input.addEventListener("change", () => { saveSettings({ ...getSettings(), [key]: input.value }); applySettings(); renderHome(); message(dom.settingsMessage, "Apariencia actualizada."); }));
dom.subjectForm.addEventListener("submit", (event) => { event.preventDefault(); const label = dom.subjectName.value.trim(), editId = dom.subjectEditId.value, kind = dom.subjectEditKind.value; if (!label) return message(dom.settingsMessage, "Escribe el nombre de la asignatura.", true); const value = editId || subjectCode(label); if (!editId && allSubjects().some((item) => item.value === value)) return message(dom.settingsMessage, "Esa asignatura ya existe.", true); if (editId) { if (kind === "default") { const config = getSubjectConfig(); config.overrides[editId] = label; config.hidden = config.hidden.filter((item) => item !== editId); saveSubjectConfig(config); } else { const subjects = getCustomSubjects(); const subject = subjects.find((item) => item.value === editId); if (subject) { subject.label = label; saveCustomSubjects(subjects); } } message(dom.settingsMessage, "Asignatura actualizada."); } else { const subjects = getCustomSubjects(); subjects.push({ id: id(), value, label, kind: "custom" }); saveCustomSubjects(subjects); message(dom.settingsMessage, "Asignatura añadida."); } resetSubjectForm(); refreshViews(); });
dom.subjectCancel.addEventListener("click", resetSubjectForm); dom.customSubjects.addEventListener("click", (event) => { const button = event.target.closest("button[data-subject-action]"); if (!button) return; const value = button.dataset.id, kind = button.dataset.kind; if (button.dataset.subjectAction === "edit") { const subject = allSubjects().find((item) => item.value === value); if (!subject) return; dom.subjectName.value = subject.label; dom.subjectEditId.value = value; dom.subjectEditKind.value = kind; dom.subjectSubmit.textContent = "Guardar"; dom.subjectCancel.hidden = false; dom.subjectName.focus(); return; } if (!window.confirm("¿Eliminar " + subjectLabel(value) + " de las opciones? Los registros históricos se conservarán.")) return; if (kind === "default") { const config = getSubjectConfig(); if (!config.hidden.includes(value)) config.hidden.push(value); delete config.overrides[value]; saveSubjectConfig(config); } else saveCustomSubjects(getCustomSubjects().filter((item) => item.value !== value)); resetSubjectForm(); refreshViews(); message(dom.settingsMessage, "Asignatura eliminada de las opciones."); });

dom.goalsForm.addEventListener("submit", (event) => { event.preventDefault(); const nombre = dom.goalName.value.trim(), objetivoMinutos = Number(dom.goalMinutes.value), editId = dom.goalEditId.value; if (!nombre || !Number.isFinite(objetivoMinutos) || objetivoMinutos <= 0) return message(dom.settingsMessage, "Indica un nombre y un número de minutos válido.", true); const goals = getGoals(); const existing = goals.find((goal) => goal.id === editId); const goal = { ...existing, id: editId || id(), nombre, objetivoMinutos, activo: existing?.activo !== false }; const index = goals.findIndex((item) => item.id === goal.id); if (index >= 0) goals[index] = goal; else goals.push(goal); saveGoals(goals); resetGoalForm(); refreshViews(); message(dom.settingsMessage, editId ? "Objetivo actualizado." : "Objetivo guardado."); });
dom.goalCancel.addEventListener("click", resetGoalForm); dom.goalsList.addEventListener("click", (event) => { const button = event.target.closest("button[data-goal-action]"); if (!button) return; const goals = getGoals(), goal = goals.find((item) => item.id === button.dataset.id); if (!goal) return; if (button.dataset.goalAction === "toggle") { goal.activo = button.checked; saveGoals(goals); refreshViews(); return; } if (button.dataset.goalAction === "edit") { dom.goalName.value = goal.nombre; dom.goalMinutes.value = goal.objetivoMinutos; dom.goalEditId.value = goal.id; dom.goalSubmit.textContent = "Guardar"; dom.goalCancel.hidden = false; dom.goalName.focus(); return; } if (!window.confirm("¿Eliminar el objetivo “" + goal.nombre + "”?")) return; saveGoals(goals.filter((item) => item.id !== goal.id)); resetGoalForm(); refreshViews(); message(dom.settingsMessage, "Objetivo eliminado."); });

dom.saveTerms.addEventListener("click", () => { const trimestres = {}; for (const { term, start, end } of termInputs) { if (Boolean(start.value) !== Boolean(end.value)) return message(dom.settingsMessage, "Completa las dos fechas del " + term + "º trimestre.", true); if (start.value && start.value > end.value) return message(dom.settingsMessage, "La fecha inicial debe ser anterior a la final.", true); if (start.value) trimestres[term] = { inicio: start.value, fin: end.value }; } saveSettings({ ...getSettings(), schoolYear: dom.schoolYear.value.trim(), trimestres }); if (!dom.statistics.hidden) renderStatistics(); message(dom.settingsMessage, "Calendario y curso guardados."); });
dom.export.addEventListener("click", () => { const data = { app: "Mi Estudio", version: APP_VERSION, exportedAt: new Date().toISOString(), records: getRecords(), grades: getGrades(), settings: getSettings(), customSubjects: getCustomSubjects(), subjectConfig: getSubjectConfig(), goals: getGoals(), trash: getTrash() }; const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })); const link = document.createElement("a"); link.href = url; link.download = "mi-estudio-" + today() + ".json"; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 0); message(dom.settingsMessage, "Archivo de datos exportado."); });
dom.import.addEventListener("change", () => { const file = dom.import.files?.[0]; dom.import.value = ""; if (!file) return; const reader = new FileReader(); reader.onload = () => { try { importPayload(JSON.parse(String(reader.result || ""))); } catch (error) { message(dom.settingsMessage, error.message || "No se ha podido importar el archivo.", true); } }; reader.onerror = () => message(dom.settingsMessage, "No se ha podido leer el archivo.", true); reader.readAsText(file); });
dom.clearHistory.addEventListener("click", () => { const records = getRecords(), grades = getGrades(); if (!records.length && !grades.length) return message(dom.settingsMessage, "No hay historial que borrar."); if (!window.confirm("¿Enviar todos los registros y exámenes a la papelera temporal? Podrás restaurarlos durante 30 días.")) return; records.forEach((record) => sendToTrash("record", record)); grades.forEach((grade) => sendToTrash("grade", grade)); saveRecords([]); saveGrades([]); refreshViews(); message(dom.settingsMessage, "Historial enviado a la papelera temporal."); });
dom.trash.addEventListener("click", (event) => { const button = event.target.closest("button[data-trash-action]"); if (!button) return; const entries = getTrash(), entry = entries.find((item) => item.id === button.dataset.id); if (!entry) return; if (button.dataset.trashAction === "delete") { if (!window.confirm("¿Borrar este elemento definitivamente? Esta acción no se puede deshacer.")) return; saveTrash(entries.filter((item) => item.id !== entry.id)); renderSettingsLists(); message(dom.settingsMessage, "Elemento eliminado definitivamente."); return; } if (entry.type === "record") { const records = getRecords(), item = normalizeRecord({ ...entry.item }); if (records.some((record) => record.id === item.id)) item.id = id(); records.push(item); saveRecords(records); } else if (entry.type === "grade") { const grades = getGrades(), item = normalizeGrade({ ...entry.item }); if (grades.some((grade) => grade.id === item.id)) item.id = id(); grades.push(item); saveGrades(grades); } saveTrash(entries.filter((item) => item.id !== entry.id)); refreshViews(); message(dom.settingsMessage, "Elemento restaurado."); });
dom.reset.addEventListener("click", () => { if (!window.confirm("¿Restablecer preferencias visuales y de experiencia? Tu historial, asignaturas y objetivos se conservarán.")) return; const current = getSettings(); saveSettings({ ...DEFAULT_SETTINGS, schoolYear: current.schoolYear, trimestres: current.trimestres }); applySettings(); syncSettingsForm(); refreshViews(); message(dom.settingsMessage, "Preferencias restablecidas. Tus datos se han conservado."); });
window.addEventListener("storage", (event) => { if (![STORAGE_KEY, GRADES_STORAGE_KEY, SETTINGS_STORAGE_KEY, SUBJECTS_STORAGE_KEY, SUBJECT_CONFIG_STORAGE_KEY, GOALS_STORAGE_KEY, TRASH_STORAGE_KEY].includes(event.key)) return; applySettings(); syncSettingsForm(); refreshViews(); });
}

function getCredentialHash() { return localStorage.getItem(CREDENTIAL_HASH_STORAGE_KEY) || INITIAL_CREDENTIAL_HASH; }
function registerServiceWorker() { if ("serviceWorker" in navigator) navigator.serviceWorker.register("./service-worker.js").catch(() => {}); }
function initializeAccess() {
  const authorized = localStorage.getItem(AUTHORIZED_STORAGE_KEY) === "true";
  dom.authGate.hidden = authorized; dom.appShell.hidden = !authorized;
  if (authorized) { startApp(); return; }
  requestAnimationFrame(() => dom.authCredential.focus());
}

dom.authForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const candidate = dom.authCredential.value;
  if (!candidate || hashCredential(candidate) !== getCredentialHash()) { dom.authCredential.value = ""; message(dom.authMessage, "La credencial no es correcta.", true); return; }
  localStorage.setItem(AUTHORIZED_STORAGE_KEY, "true"); dom.authCredential.value = ""; dom.authGate.hidden = true; dom.appShell.hidden = false; startApp();
});
dom.credentialForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const current = dom.currentCredential.value, next = dom.newCredential.value, confirmation = dom.confirmCredential.value;
  if (hashCredential(current) !== getCredentialHash()) return message(dom.credentialMessage, "La credencial actual no es correcta.", true);
  if (next.length < 8) return message(dom.credentialMessage, "La nueva credencial debe tener al menos 8 caracteres.", true);
  if (next !== confirmation) return message(dom.credentialMessage, "Las nuevas credenciales no coinciden.", true);
  localStorage.setItem(CREDENTIAL_HASH_STORAGE_KEY, hashCredential(next)); dom.credentialForm.reset(); message(dom.credentialMessage, "Credencial actualizada.");
});
dom.resetCredential.addEventListener("click", () => { if (!window.confirm("¿Restablecer la credencial inicial?")) return; localStorage.removeItem(CREDENTIAL_HASH_STORAGE_KEY); dom.credentialForm.reset(); message(dom.credentialMessage, "Credencial inicial restablecida."); });
registerServiceWorker();
initializeAccess();
