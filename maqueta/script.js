// ═══════════════════════════════════════════
//  SGTA — Sistema de Gestión de Tutorías
//  Universidad Tecnológica de Pereira
//  script.js
// ═══════════════════════════════════════════

// ══════════════════════════════════════════════
//  DATOS DEL SISTEMA
// ══════════════════════════════════════════════

const USERS = {
  student: {
    name: 'Laura Gómez',
    role: 'Estudiante',
    avatar: 'LG',
    tag: 'tag-student',
    email: 'estudiante@utp.edu.co'
  },
  teacher: {
    name: 'Dr. Andrés López',
    role: 'Docente',
    avatar: 'AL',
    tag: 'tag-teacher',
    email: 'docente@utp.edu.co'
  },
  admin: {
    name: 'Admin Sistema',
    role: 'Administrador',
    avatar: 'AS',
    tag: 'tag-admin',
    email: 'admin@utp.edu.co'
  }
};

// Lista de tutorías del sistema
let TUTORIAS = [
  { id: 1, student: 'Laura Gómez',   teacher: 'Dr. Andrés López',  subject: 'Cálculo Diferencial', date: '2026-05-05', hour: '10:00', mode: 'Presencial', status: 'pending',  room: 'Aula 301' },
  { id: 2, student: 'Carlos Ruiz',   teacher: 'Dra. María Torres', subject: 'Programación I',      date: '2026-05-06', hour: '14:00', mode: 'Virtual',    status: 'accepted', room: 'Meet' },
  { id: 3, student: 'Ana Martínez',  teacher: 'Dr. Andrés López',  subject: 'Álgebra Lineal',      date: '2026-05-07', hour: '09:00', mode: 'Presencial', status: 'pending',  room: 'Sala C' },
  { id: 4, student: 'Laura Gómez',   teacher: 'Dra. María Torres', subject: 'Estadística',         date: '2026-04-30', hour: '11:00', mode: 'Virtual',    status: 'done',     room: 'Teams' },
  { id: 5, student: 'Pedro Sánchez', teacher: 'Dr. Andrés López',  subject: 'Cálculo Diferencial', date: '2026-05-08', hour: '16:00', mode: 'Presencial', status: 'rejected', room: 'Aula 301' },
  { id: 6, student: 'Laura Gómez',   teacher: 'Dr. Andrés López',  subject: 'Cálculo Diferencial', date: '2026-05-10', hour: '10:00', mode: 'Presencial', status: 'accepted', room: 'Aula 301' },
];

// Lista de usuarios
const USERS_LIST = [
  { id: 1, name: 'Laura Gómez',      role: 'Estudiante', program: 'Ingeniería de Sistemas', status: 'active' },
  { id: 2, name: 'Carlos Ruiz',      role: 'Estudiante', program: 'Ingeniería Industrial',  status: 'active' },
  { id: 3, name: 'Ana Martínez',     role: 'Estudiante', program: 'Ingeniería de Sistemas', status: 'active' },
  { id: 4, name: 'Pedro Sánchez',    role: 'Estudiante', program: 'Administración',         status: 'inactive' },
  { id: 5, name: 'Dr. Andrés López', role: 'Docente',    program: 'Matemáticas',            status: 'active' },
  { id: 6, name: 'Dra. María Torres',role: 'Docente',    program: 'Ingeniería de Sistemas', status: 'active' },
];

const MATERIAS = ['Cálculo Diferencial', 'Álgebra Lineal', 'Programación I', 'Estadística', 'Física I', 'Base de Datos'];
const DOCENTES = ['Dr. Andrés López', 'Dra. María Torres', 'Dr. Jorge Reyes'];
const HORAS    = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

const UMBRAL_APROBACION = 3.0;
const GRUPOS_DOCENTE = [
  {
    name: 'Cálculo Diferencial · Grupo 01',
    students: [
      { name: 'Laura Gómez', partialAverage: 3.7, habilitationPending: false },
      { name: 'Pedro Sánchez', partialAverage: 2.6, habilitationPending: true }
    ]
  },
  {
    name: 'Álgebra Lineal · Grupo 02',
    students: [
      { name: 'Ana Martínez', partialAverage: 2.8, habilitationPending: false }
    ]
  }
];

// Rol activo
let currentRole = 'student';

// ══════════════════════════════════════════════
//  FECHA ACTUAL
// ══════════════════════════════════════════════

function initDate() {
  const d = new Date();
  document.getElementById('today-date').textContent =
    d.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

// ══════════════════════════════════════════════
//  LOGIN
// ══════════════════════════════════════════════

function selectRole(btn) {
  document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  currentRole = btn.dataset.role;

  const emails = {
    student: 'estudiante@utp.edu.co',
    teacher: 'docente@utp.edu.co',
    admin:   'admin@utp.edu.co'
  };
  document.getElementById('login-email').value = emails[currentRole];
}

function doLogin() {
  const u = USERS[currentRole];

  // Llenar datos del sidebar
  document.getElementById('s-avatar').textContent = u.avatar;
  document.getElementById('s-name').textContent   = u.name;

  const rt = document.getElementById('s-role-tag');
  rt.textContent = u.role;
  rt.className   = 'role-tag ' + u.tag;

  // Construir menú lateral
  buildSidebar(currentRole);

  // Cambiar pantalla
  showScreen('screen-login', false);
  showScreen('app-layout', true);

  // Navegar al dashboard del rol
  const dashboards = {
    student: 'st-dashboard',
    teacher: 'tc-dashboard',
    admin:   'ad-dashboard'
  };
  navigate(dashboards[currentRole]);

  initDate();
}

function doLogout() {
  // Volver a login
  showScreen('app-layout', false);
  showScreen('screen-login', true);

  // Resetear selección
  currentRole = 'student';
  document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('selected'));
  document.querySelector('.role-btn[data-role="student"]').classList.add('selected');
  document.getElementById('login-email').value = 'estudiante@utp.edu.co';
}

function showScreen(id, show) {
  const el = document.getElementById(id);
  if (show) {
    el.style.display = 'flex';
    el.classList.add('active');
  } else {
    el.style.display = 'none';
    el.classList.remove('active');
  }
}

// ══════════════════════════════════════════════
//  SIDEBAR — MENÚ DE NAVEGACIÓN
// ══════════════════════════════════════════════

const NAVS = {
  student: [
    { id: 'st-dashboard', icon: '🏠', label: 'Inicio' },
    { id: 'st-request',   icon: '📝', label: 'Solicitar Tutoría' },
    { id: 'st-my',        icon: '📅', label: 'Mis Tutorías' },
    { id: 'st-history',   icon: '🕒', label: 'Historial' },
  ],
  teacher: [
    { id: 'tc-dashboard', icon: '🏠', label: 'Inicio' },
    { id: 'tc-requests',  icon: '📩', label: 'Solicitudes' },
    { id: 'tc-schedule',  icon: '📆', label: 'Mi Horario' },
    { id: 'tc-history',   icon: '🕒', label: 'Historial' },
  ],
  admin: [
    { id: 'ad-dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'ad-users',     icon: '👥', label: 'Usuarios' },
    { id: 'ad-tutorias',  icon: '📚', label: 'Tutorías' },
  ],
};

function buildSidebar(role) {
  const nav   = document.getElementById('sidebar-nav');
  const items = NAVS[role];

  nav.innerHTML = `<div class="nav-section">Menú</div>` +
    items.map(i => `
      <button class="nav-item" data-view="${i.id}" onclick="navigate('${i.id}')">
        <span class="ni">${i.icon}</span> ${i.label}
      </button>
    `).join('');
}

// ══════════════════════════════════════════════
//  NAVEGACIÓN ENTRE VISTAS
// ══════════════════════════════════════════════

const PAGE_TITLES = {
  'st-dashboard': 'Inicio',
  'st-request':   'Solicitar Tutoría',
  'st-my':        'Mis Tutorías',
  'st-history':   'Historial',
  'tc-dashboard': 'Dashboard Docente',
  'tc-requests':  'Solicitudes Pendientes',
  'tc-schedule':  'Mi Horario',
  'tc-history':   'Historial de Tutorías',
  'ad-dashboard': 'Panel Administrador',
  'ad-users':     'Gestión de Usuarios',
  'ad-tutorias':  'Gestión de Tutorías',
};

function navigate(viewId) {
  // Marcar item activo en el menú
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.toggle('active', n.dataset.view === viewId);
  });

  // Actualizar título del topbar
  document.getElementById('topbar-title').textContent = PAGE_TITLES[viewId] || 'SGTA';

  // Renderizar la vista
  document.getElementById('page-body').innerHTML = VIEWS[viewId]();
}

// ══════════════════════════════════════════════
//  HELPER: BADGE DE ESTADO
// ══════════════════════════════════════════════

function badge(s) {
  const labels = {
    pending:  '⏳ Pendiente',
    accepted: '✅ Aceptada',
    rejected: '❌ Rechazada',
    done:     '🏁 Realizada'
  };
  const classes = {
    pending:  'bs-pending',
    accepted: 'bs-accepted',
    rejected: 'bs-rejected',
    done:     'bs-done'
  };
  return `<span class="badge-status ${classes[s] || ''}">${labels[s] || s}</span>`;
}

// ══════════════════════════════════════════════
//  HELPER: FORMATO DE FECHA
// ══════════════════════════════════════════════

function fmtDate(d) {
  if (!d) return '—';
  const [y, m, day] = d.split('-');
  const months = ['', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return `${day} ${months[parseInt(m)]} ${y}`;
}

function indicadorRendimiento(estudiante) {
  if (estudiante.habilitationPending) {
    return { clase: 'status-yellow', etiqueta: 'Habilitación pendiente' };
  }

  return estudiante.partialAverage < UMBRAL_APROBACION
    ? { clase: 'status-red', etiqueta: 'Por debajo del umbral' }
    : { clase: 'status-green', etiqueta: 'En el umbral o por encima' };
}

// ══════════════════════════════════════════════
//  VISTAS — HTML de cada pantalla
// ══════════════════════════════════════════════

const VIEWS = {

  // ─── ESTUDIANTE: DASHBOARD ─────────────────
  'st-dashboard': () => {
    const mis = TUTORIAS.filter(t => t.student === 'Laura Gómez');
    const pen = mis.filter(t => t.status === 'pending').length;
    const acc = mis.filter(t => t.status === 'accepted').length;
    const don = mis.filter(t => t.status === 'done').length;
    const prox = mis.filter(t => t.status === 'accepted').slice(0, 3);

    return `
      <div class="alert alert-info">🎓 Bienvenida, <strong>Laura Gómez</strong> — Ingeniería de Sistemas</div>
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-icon si-blue">📚</div><div class="stat-info"><div class="value">${mis.length}</div><div class="label">Total solicitudes</div></div></div>
        <div class="stat-card"><div class="stat-icon si-yellow">⏳</div><div class="stat-info"><div class="value">${pen}</div><div class="label">Pendientes</div></div></div>
        <div class="stat-card"><div class="stat-icon si-green">✅</div><div class="stat-info"><div class="value">${acc}</div><div class="label">Aceptadas</div></div></div>
        <div class="stat-card"><div class="stat-icon si-purple">🏁</div><div class="stat-info"><div class="value">${don}</div><div class="label">Realizadas</div></div></div>
      </div>
      <div class="card">
        <div class="card-header">
          <span class="card-title">📅 Próximas Tutorías</span>
          <button class="btn btn-primary btn-sm" onclick="navigate('st-request')">+ Nueva Solicitud</button>
        </div>
        <div class="card-body">
          ${prox.length
            ? `<table>
                <thead><tr><th>Materia</th><th>Docente</th><th>Fecha</th><th>Hora</th><th>Modalidad</th><th>Estado</th></tr></thead>
                <tbody>
                  ${prox.map(t => `
                    <tr>
                      <td><strong>${t.subject}</strong></td>
                      <td>${t.teacher}</td>
                      <td>${fmtDate(t.date)}</td>
                      <td>${t.hour}</td>
                      <td>${t.mode}</td>
                      <td>${badge(t.status)}</td>
                    </tr>`).join('')}
                </tbody>
              </table>`
            : `<div class="empty-state"><div class="icon">📭</div><p>No tienes tutorías aceptadas aún.</p></div>`}
        </div>
      </div>
    `;
  },

  // ─── ESTUDIANTE: SOLICITAR TUTORÍA ─────────
  'st-request': () => `
    <div class="card" style="max-width:580px">
      <div class="card-header">
        <span class="card-title">📝 Nueva Solicitud de Tutoría</span>
      </div>
      <div class="card-body" style="padding:24px">
        <div class="form-group">
          <label>Materia</label>
          <select id="r-subject">
            <option value="">-- Seleccionar --</option>
            ${MATERIAS.map(m => `<option>${m}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>Docente</label>
          <select id="r-teacher">
            <option value="">-- Seleccionar --</option>
            ${DOCENTES.map(d => `<option>${d}</option>`).join('')}
          </select>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div class="form-group">
            <label>Fecha</label>
            <input type="date" id="r-date" min="${new Date().toISOString().split('T')[0]}">
          </div>
          <div class="form-group">
            <label>Hora</label>
            <select id="r-hour">
              <option value="">-- Hora --</option>
              ${HORAS.map(h => `<option>${h}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-group">
          <label>Modalidad</label>
          <select id="r-mode">
            <option value="">-- Seleccionar --</option>
            <option>Presencial</option>
            <option>Virtual</option>
          </select>
        </div>
        <div class="form-group">
          <label>Tema o descripción</label>
          <input type="text" id="r-desc" placeholder="Ej: Dudas sobre integrales del capítulo 3">
        </div>
        <button class="btn btn-primary" style="width:100%;margin-top:8px" onclick="submitRequest()">
          📩 Enviar Solicitud
        </button>
      </div>
    </div>`,

  // ─── ESTUDIANTE: MIS TUTORÍAS ───────────────
  'st-my': () => {
    const mis = TUTORIAS.filter(t => t.student === 'Laura Gómez' && t.status !== 'done');
    return `
      <div class="card">
        <div class="card-header">
          <span class="card-title">📅 Mis Tutorías Activas</span>
        </div>
        <div class="card-body">
          ${mis.length
            ? `<table>
                <thead><tr><th>Materia</th><th>Docente</th><th>Fecha</th><th>Hora</th><th>Modalidad</th><th>Estado</th><th>Acción</th></tr></thead>
                <tbody>
                  ${mis.map(t => `
                    <tr>
                      <td><strong>${t.subject}</strong></td>
                      <td>${t.teacher}</td>
                      <td>${fmtDate(t.date)}</td>
                      <td>${t.hour}</td>
                      <td>${t.mode}</td>
                      <td>${badge(t.status)}</td>
                      <td>
                        ${t.status === 'pending'
                          ? `<button class="btn btn-danger btn-sm" onclick="cancelTutoria(${t.id})">✖ Cancelar</button>`
                          : t.status === 'accepted'
                          ? `<button class="btn btn-ghost btn-sm" onclick="showDetails(${t.id})">👁 Ver</button>`
                          : '—'}
                      </td>
                    </tr>`).join('')}
                </tbody>
              </table>`
            : `<div class="empty-state"><div class="icon">🎉</div><p>No tienes tutorías activas en este momento.</p></div>`}
        </div>
      </div>`;
  },

  // ─── ESTUDIANTE: HISTORIAL ──────────────────
  'st-history': () => {
    const his = TUTORIAS.filter(t => t.student === 'Laura Gómez' && t.status === 'done');
    return `
      <div class="card">
        <div class="card-header">
          <span class="card-title">🕒 Historial de Tutorías</span>
        </div>
        <div class="card-body">
          ${his.length
            ? `<table>
                <thead><tr><th>Materia</th><th>Docente</th><th>Fecha</th><th>Hora</th><th>Modalidad</th><th>Estado</th></tr></thead>
                <tbody>
                  ${his.map(t => `
                    <tr>
                      <td><strong>${t.subject}</strong></td>
                      <td>${t.teacher}</td>
                      <td>${fmtDate(t.date)}</td>
                      <td>${t.hour}</td>
                      <td>${t.mode}</td>
                      <td>${badge(t.status)}</td>
                    </tr>`).join('')}
                </tbody>
              </table>`
            : `<div class="empty-state"><div class="icon">📂</div><p>Aún no tienes tutorías realizadas.</p></div>`}
        </div>
      </div>`;
  },

  // ─── DOCENTE: DASHBOARD ─────────────────────
  'tc-dashboard': () => {
    const mis = TUTORIAS.filter(t => t.teacher === 'Dr. Andrés López');
    const pen = mis.filter(t => t.status === 'pending').length;
    const acc = mis.filter(t => t.status === 'accepted').length;

    return `
      <div class="alert alert-success">👨‍🏫 Bienvenido, <strong>Dr. Andrés López</strong> — Departamento de Matemáticas</div>
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-icon si-blue">📚</div><div class="stat-info"><div class="value">${mis.length}</div><div class="label">Total solicitudes</div></div></div>
        <div class="stat-card"><div class="stat-icon si-yellow">⏳</div><div class="stat-info"><div class="value">${pen}</div><div class="label">Pendientes</div></div></div>
        <div class="stat-card"><div class="stat-icon si-green">✅</div><div class="stat-info"><div class="value">${acc}</div><div class="label">Aceptadas</div></div></div>
      </div>
      ${pen > 0
        ? `<div class="alert alert-info">🔔 Tienes <strong>${pen} solicitud(es) pendiente(s)</strong> por revisar.
            <button class="btn btn-ghost btn-sm" onclick="navigate('tc-requests')">Ver ahora →</button>
           </div>`
        : ''}
      <div class="card">
        <div class="card-header">
          <span class="card-title">📅 Próximas Tutorías Confirmadas</span>
        </div>
        <div class="card-body">
          ${mis.filter(t => t.status === 'accepted').length
            ? `<table>
                <thead><tr><th>Estudiante</th><th>Materia</th><th>Fecha</th><th>Hora</th><th>Modalidad</th></tr></thead>
                <tbody>
                  ${mis.filter(t => t.status === 'accepted').map(t => `
                    <tr>
                      <td>${t.student}</td>
                      <td>${t.subject}</td>
                      <td>${fmtDate(t.date)}</td>
                      <td>${t.hour}</td>
                      <td>${t.mode}</td>
                    </tr>`).join('')}
                </tbody>
              </table>`
            : `<div class="empty-state"><div class="icon">📭</div><p>Sin tutorías confirmadas aún.</p></div>`}
        </div>
      </div>
      <div class="card performance-card">
        <div class="card-header performance-header">
          <div>
            <span class="card-title">🚦 Rendimiento académico por grupo</span>
            <p class="performance-caption">Promedio ponderado parcial · Aprobación desde ${UMBRAL_APROBACION.toFixed(1)}/5,0</p>
          </div>
          <div class="performance-legend" aria-label="Leyenda del semáforo">
            <span class="performance-status status-red"><span class="signal" aria-hidden="true"></span>Por debajo</span>
            <span class="performance-status status-green"><span class="signal" aria-hidden="true"></span>En o sobre el umbral</span>
            <span class="performance-status status-yellow"><span class="signal" aria-hidden="true"></span>Habilitación pendiente</span>
          </div>
        </div>
        <div class="card-body performance-body">
          ${GRUPOS_DOCENTE.map(grupo => `
            <section class="performance-group" aria-label="${grupo.name}">
              <h3>${grupo.name}</h3>
              <div class="performance-table-wrap">
                <table>
                  <thead><tr><th>Estudiante</th><th>Promedio ponderado parcial</th><th>Indicador</th></tr></thead>
                  <tbody>
                    ${grupo.students.map(estudiante => {
                      const indicador = indicadorRendimiento(estudiante);
                      return `
                        <tr>
                          <td><strong>${estudiante.name}</strong></td>
                          <td>${estudiante.partialAverage.toFixed(1)} / 5,0</td>
                          <td>
                            <span class="performance-status ${indicador.clase}">
                              <span class="signal" aria-hidden="true"></span>${indicador.etiqueta}
                            </span>
                          </td>
                        </tr>`;
                    }).join('')}
                  </tbody>
                </table>
              </div>
            </section>
          `).join('')}
        </div>
      </div>`;
  },

  // ─── DOCENTE: SOLICITUDES ───────────────────
  'tc-requests': () => {
    const pen = TUTORIAS.filter(t => t.teacher === 'Dr. Andrés López' && t.status === 'pending');
    return `
      <div class="card">
        <div class="card-header">
          <span class="card-title">📩 Solicitudes Pendientes</span>
          <span class="badge-status bs-pending">${pen.length} pendiente(s)</span>
        </div>
        <div class="card-body">
          ${pen.length
            ? `<table>
                <thead><tr><th>Estudiante</th><th>Materia</th><th>Fecha solicitada</th><th>Hora</th><th>Modalidad</th><th>Acciones</th></tr></thead>
                <tbody>
                  ${pen.map(t => `
                    <tr>
                      <td><strong>${t.student}</strong></td>
                      <td>${t.subject}</td>
                      <td>${fmtDate(t.date)}</td>
                      <td>${t.hour}</td>
                      <td>${t.mode}</td>
                      <td style="display:flex;gap:6px;padding:14px 20px">
                        <button class="btn btn-success btn-sm" onclick="respondTutoria(${t.id}, 'accepted')">✔ Aceptar</button>
                        <button class="btn btn-danger btn-sm"  onclick="respondTutoria(${t.id}, 'rejected')">✖ Rechazar</button>
                      </td>
                    </tr>`).join('')}
                </tbody>
              </table>`
            : `<div class="empty-state"><div class="icon">✅</div><p>No tienes solicitudes pendientes. ¡Todo al día!</p></div>`}
        </div>
      </div>`;
  },

  // ─── DOCENTE: HORARIO ───────────────────────
  'tc-schedule': () => {
    const days  = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const horas = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

    // Slots ocupados y disponibles (datos de demo)
    const busy  = {
      'Lunes-10:00':    'Cálculo / Aula 301',
      'Miércoles-14:00':'Álgebra / Sala C',
      'Viernes-09:00':  'Cálculo / Aula 301'
    };
    const avail = {
      'Martes-10:00':  true,
      'Jueves-15:00':  true,
      'Viernes-11:00': true
    };

    return `
      <div class="card">
        <div class="card-header">
          <span class="card-title">📆 Mi Horario Semanal</span>
          <div style="display:flex;gap:8px;align-items:center;font-size:12px">
            <span style="background:var(--light);color:var(--accent);padding:3px 8px;border-radius:6px">🔵 Tutoría agendada</span>
            <span style="background:var(--green-l);color:var(--green);padding:3px 8px;border-radius:6px">🟢 Disponible</span>
          </div>
        </div>
        <div class="card-body" style="padding:16px;overflow-x:auto">
          <div class="schedule-grid">
            <div class="sch-cell sch-header">Hora</div>
            ${days.map(d => `<div class="sch-cell sch-header">${d}</div>`).join('')}
            ${horas.map(h => `
              <div class="sch-cell sch-time">${h}</div>
              ${days.map(d => {
                const key = `${d}-${h}`;
                if (busy[key])  return `<div class="sch-cell"><div class="sch-busy">${busy[key]}</div></div>`;
                if (avail[key]) return `<div class="sch-cell"><div class="sch-slot">✓ Libre</div></div>`;
                return `<div class="sch-cell"></div>`;
              }).join('')}
            `).join('')}
          </div>
        </div>
      </div>`;
  },

  // ─── DOCENTE: HISTORIAL ─────────────────────
  'tc-history': () => {
    const his = TUTORIAS.filter(t => t.teacher === 'Dr. Andrés López');
    return `
      <div class="card">
        <div class="card-header">
          <span class="card-title">🕒 Historial de Tutorías</span>
        </div>
        <div class="card-body">
          <table>
            <thead><tr><th>Estudiante</th><th>Materia</th><th>Fecha</th><th>Hora</th><th>Modalidad</th><th>Estado</th></tr></thead>
            <tbody>
              ${his.map(t => `
                <tr>
                  <td>${t.student}</td>
                  <td>${t.subject}</td>
                  <td>${fmtDate(t.date)}</td>
                  <td>${t.hour}</td>
                  <td>${t.mode}</td>
                  <td>${badge(t.status)}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  },

  // ─── ADMIN: DASHBOARD ──────────────────────
  'ad-dashboard': () => {
    const tots = TUTORIAS.length;
    const pen  = TUTORIAS.filter(t => t.status === 'pending').length;
    const acc  = TUTORIAS.filter(t => t.status === 'accepted').length;
    const est  = USERS_LIST.filter(u => u.role === 'Estudiante').length;
    const doc  = USERS_LIST.filter(u => u.role === 'Docente').length;

    return `
      <div class="alert alert-info">🛡️ Panel de Administración — <strong>Admin Sistema</strong></div>
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-icon si-blue">📚</div><div class="stat-info"><div class="value">${tots}</div><div class="label">Total tutorías</div></div></div>
        <div class="stat-card"><div class="stat-icon si-yellow">⏳</div><div class="stat-info"><div class="value">${pen}</div><div class="label">Pendientes</div></div></div>
        <div class="stat-card"><div class="stat-icon si-green">✅</div><div class="stat-info"><div class="value">${acc}</div><div class="label">Aceptadas</div></div></div>
        <div class="stat-card"><div class="stat-icon si-purple">👩‍🎓</div><div class="stat-info"><div class="value">${est}</div><div class="label">Estudiantes</div></div></div>
        <div class="stat-card"><div class="stat-icon si-red">👨‍🏫</div><div class="stat-info"><div class="value">${doc}</div><div class="label">Docentes</div></div></div>
      </div>
      <div class="card">
        <div class="card-header">
          <span class="card-title">📊 Actividad Reciente</span>
          <button class="btn btn-ghost btn-sm" onclick="navigate('ad-tutorias')">Ver todas →</button>
        </div>
        <div class="card-body">
          <table>
            <thead><tr><th>Estudiante</th><th>Docente</th><th>Materia</th><th>Fecha</th><th>Estado</th></tr></thead>
            <tbody>
              ${TUTORIAS.slice(0, 5).map(t => `
                <tr>
                  <td>${t.student}</td>
                  <td>${t.teacher}</td>
                  <td>${t.subject}</td>
                  <td>${fmtDate(t.date)}</td>
                  <td>${badge(t.status)}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  },

  // ─── ADMIN: USUARIOS ───────────────────────
  'ad-users': () => `
    <div class="card">
      <div class="card-header">
        <span class="card-title">👥 Gestión de Usuarios</span>
        <button class="btn btn-primary btn-sm" onclick="openAddUser()">+ Agregar Usuario</button>
      </div>
      <div class="card-body">
        <table>
          <thead><tr><th>#</th><th>Nombre</th><th>Rol</th><th>Programa</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            ${USERS_LIST.map((u, i) => `
              <tr>
                <td>${i + 1}</td>
                <td><strong>${u.name}</strong></td>
                <td><span class="badge-status ${u.role === 'Docente' ? 'bs-accepted' : 'bs-done'}">${u.role}</span></td>
                <td>${u.program}</td>
                <td><span class="badge-status ${u.status === 'active' ? 'bs-accepted' : 'bs-rejected'}">${u.status === 'active' ? '✅ Activo' : '❌ Inactivo'}</span></td>
                <td style="display:flex;gap:6px;padding:14px 20px">
                  <button class="btn btn-ghost btn-sm" onclick="showUserInfo(${u.id})">👁 Ver</button>
                  <button class="btn btn-danger btn-sm" onclick="showToast('Usuario actualizado')">✏️ Editar</button>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`,

  // ─── ADMIN: TUTORÍAS ────────────────────────
  'ad-tutorias': () => `
    <div class="card">
      <div class="card-header">
        <span class="card-title">📚 Todas las Tutorías del Sistema</span>
      </div>
      <div class="card-body">
        <table>
          <thead><tr><th>#</th><th>Estudiante</th><th>Docente</th><th>Materia</th><th>Fecha</th><th>Hora</th><th>Modalidad</th><th>Estado</th></tr></thead>
          <tbody>
            ${TUTORIAS.map((t, i) => `
              <tr>
                <td>${i + 1}</td>
                <td>${t.student}</td>
                <td>${t.teacher}</td>
                <td>${t.subject}</td>
                <td>${fmtDate(t.date)}</td>
                <td>${t.hour}</td>
                <td>${t.mode}</td>
                <td>${badge(t.status)}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`,
};

// ══════════════════════════════════════════════
//  ACCIONES — ESTUDIANTE
// ══════════════════════════════════════════════

function submitRequest() {
  const subject = document.getElementById('r-subject').value;
  const teacher = document.getElementById('r-teacher').value;
  const date    = document.getElementById('r-date').value;
  const hour    = document.getElementById('r-hour').value;
  const mode    = document.getElementById('r-mode').value;

  if (!subject || !teacher || !date || !hour || !mode) {
    showToast('⚠️ Completa todos los campos');
    return;
  }

  const newTutoria = {
    id:      TUTORIAS.length + 1,
    student: 'Laura Gómez',
    teacher, subject, date, hour, mode,
    status:  'pending',
    room:    'Por confirmar'
  };

  TUTORIAS.push(newTutoria);
  showToast('✅ Solicitud enviada correctamente');
  navigate('st-my');
}

function cancelTutoria(id) {
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h3>¿Cancelar Tutoría?</h3>
    <p>Esta acción eliminará tu solicitud. ¿Estás segura de que deseas cancelarla?</p>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">No, volver</button>
      <button class="btn btn-danger" onclick="confirmCancel(${id})">Sí, cancelar</button>
    </div>`);
}

function confirmCancel(id) {
  TUTORIAS = TUTORIAS.filter(t => t.id !== id);
  closeModal();
  showToast('Solicitud cancelada');
  navigate('st-my');
}

function showDetails(id) {
  const t = TUTORIAS.find(t => t.id === id);
  if (!t) return;
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h3>📅 Detalles de Tutoría</h3>
    <p>Información completa de la sesión confirmada</p>
    <div style="background:var(--light);border-radius:10px;padding:16px;font-size:14px;line-height:2.2">
      <div>📚 <strong>Materia:</strong> ${t.subject}</div>
      <div>👨‍🏫 <strong>Docente:</strong> ${t.teacher}</div>
      <div>📅 <strong>Fecha:</strong> ${fmtDate(t.date)}</div>
      <div>🕐 <strong>Hora:</strong> ${t.hour}</div>
      <div>📍 <strong>Modalidad:</strong> ${t.mode}</div>
      <div>🚪 <strong>Lugar:</strong> ${t.room}</div>
      <div>📋 <strong>Estado:</strong> ${badge(t.status)}</div>
    </div>
    <div class="modal-actions">
      <button class="btn btn-primary" onclick="closeModal()">Cerrar</button>
    </div>`);
}

// ══════════════════════════════════════════════
//  ACCIONES — DOCENTE
// ══════════════════════════════════════════════

function respondTutoria(id, action) {
  const t = TUTORIAS.find(t => t.id === id);
  if (!t) return;
  t.status = action;

  const msg = action === 'accepted'
    ? `✅ Tutoría de ${t.student} aceptada`
    : `❌ Tutoría rechazada`;

  showToast(msg);
  navigate('tc-requests');
}

// ══════════════════════════════════════════════
//  ACCIONES — ADMIN
// ══════════════════════════════════════════════

function showUserInfo(id) {
  const u = USERS_LIST.find(u => u.id === id);
  if (!u) return;
  // fix: usar u en lugar de t
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h3>👤 ${u.name}</h3>
    <p>Información del usuario registrado en el sistema</p>
    <div style="background:var(--light);border-radius:10px;padding:16px;font-size:14px;line-height:2.2">
      <div>🎓 <strong>Rol:</strong> ${u.role}</div>
      <div>📘 <strong>Programa:</strong> ${u.program}</div>
      <div>📋 <strong>Estado:</strong> ${u.status === 'active' ? '✅ Activo' : '❌ Inactivo'}</div>
    </div>
    <div class="modal-actions">
      <button class="btn btn-primary" onclick="closeModal()">Cerrar</button>
    </div>`);
}

function openAddUser() {
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h3>➕ Agregar Usuario</h3>
    <p>Registrar nuevo usuario en el sistema SGTA</p>
    <div class="form-group">
      <label>Nombre completo</label>
      <input type="text" placeholder="Ej: María García López">
    </div>
    <div class="form-group">
      <label>Correo institucional</label>
      <input type="email" placeholder="correo@utp.edu.co">
    </div>
    <div class="form-group">
      <label>Rol</label>
      <select><option>Estudiante</option><option>Docente</option></select>
    </div>
    <div class="form-group">
      <label>Programa académico</label>
      <input type="text" placeholder="Ej: Ingeniería de Sistemas">
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-primary" onclick="closeModal(); showToast('✅ Usuario registrado exitosamente')">Registrar</button>
    </div>`);
}

// ══════════════════════════════════════════════
//  MODAL
// ══════════════════════════════════════════════

function openModal(html) {
  document.getElementById('modal-content').innerHTML = html;
  document.getElementById('modal').classList.add('open');
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
}

// Cerrar modal al clic fuera
document.getElementById('modal').addEventListener('click', function(e) {
  if (e.target.id === 'modal') closeModal();
});

// ══════════════════════════════════════════════
//  TOAST NOTIFICATION
// ══════════════════════════════════════════════

function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
