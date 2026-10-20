// ═══════════════════════════════════════════
//  SGTA — Sistema de Gestión de Tutorías
//  Universidad Tecnológica de Pereira
//  script.js
// ═══════════════════════════════════════════

// ══════════════════════════════════════════════
//  DATOS DEL SISTEMA
// ══════════════════════════════════════════════
// cambio de prueba
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

let MATERIAS = ['Cálculo Diferencial', 'Álgebra Lineal', 'Programación I', 'Estadística', 'Física I', 'Base de Datos'];
let MATERIAS_INACTIVAS = [];
const DOCENTES = ['Dr. Andrés López', 'Dra. María Torres', 'Dr. Jorge Reyes'];
const HORAS    = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

let GRUPOS_DISPONIBLES = [
  { id: 'G01', materia: 'Cálculo Diferencial', docente: 'Dr. Andrés López', dia: 'Lunes', horaInicio: '08:00', horaFin: '10:00', horario: 'Lunes 08:00-10:00', cupos: 8, activo: true },
  { id: 'G02', materia: 'Programación I', docente: 'Dra. María Torres', dia: 'Martes', horaInicio: '10:00', horaFin: '12:00', horario: 'Martes 10:00-12:00', cupos: 6, activo: true },
  { id: 'G03', materia: 'Álgebra Lineal', docente: 'Dr. Andrés López', dia: 'Miércoles', horaInicio: '08:00', horaFin: '10:00', horario: 'Miércoles 08:00-10:00', cupos: 10, activo: true },
  { id: 'G04', materia: 'Estadística', docente: 'Dr. Jorge Reyes', dia: 'Jueves', horaInicio: '14:00', horaFin: '16:00', horario: 'Jueves 14:00-16:00', cupos: 4, activo: true }
];
let MATRICULAS = [
  {
    id: 1, estudiante: 'Laura Gómez', asignatura: 'Cálculo Diferencial', grupo: 'G01',
    docente: 'Dr. Andrés López', estado: 'ACTIVA',
    notas: {
      C1: { valor: 4.2, estado: 'CERRADA' },
      C2: { valor: 3.8, estado: 'PUBLICADA' },
      C3: { valor: 4.0, estado: 'PUBLICADA' },
      HAB: { valor: null, estado: 'BORRADOR' }
    }
  },
  {
    id: 2, estudiante: 'Carlos Ruiz', asignatura: 'Programación I', grupo: 'G02',
    docente: 'Dra. María Torres', estado: 'ACTIVA',
    notas: {
      C1: { valor: 2.3, estado: 'PUBLICADA' },
      C2: { valor: 2.5, estado: 'PUBLICADA' },
      C3: { valor: 2.4, estado: 'PUBLICADA' },
      HAB: { valor: null, estado: 'BORRADOR' }
    }
  },
  {
    id: 3, estudiante: 'Ana Martínez', asignatura: 'Álgebra Lineal', grupo: 'G03',
    docente: 'Dr. Andrés López', estado: 'ACTIVA',
    notas: {
      C1: { valor: null, estado: 'BORRADOR' },
      C2: { valor: null, estado: 'BORRADOR' },
      C3: { valor: null, estado: 'BORRADOR' },
      HAB: { valor: null, estado: 'BORRADOR' }
    }
  }
];
let SOLICITUDES = [
  { id: 1, tipo: 'INSCRIPCION', estudiante: 'Pedro Sánchez', materia: 'Estadística', grupo: 'G04', fechaCreacion: '2026-10-11', estado: 'PENDIENTE', fechaHoraProgramada: null, motivoRechazo: '' },
  { id: 2, tipo: 'CANCELACION', estudiante: 'Ana Martínez', materia: 'Álgebra Lineal', grupo: 'G03', fechaCreacion: '2026-10-11', estado: 'PENDIENTE', fechaHoraProgramada: null, motivoRechazo: '', matriculaId: 3 },
  { id: 3, tipo: 'HABILITACION', estudiante: 'Carlos Ruiz', materia: 'Programación I', grupo: 'G02', fechaCreacion: '2026-10-11', estado: 'PENDIENTE', fechaHoraProgramada: null, motivoRechazo: '', matriculaId: 2 }
];
let PERIODO_ACTUAL = {
  nombre: '2026-2',
  pesos: { C1: 0.3, C2: 0.3, C3: 0.4 },
  umbral: 3,
  rangoHabilitacion: { minimo: 2, maximo: 2.99 },
  politicaHabilitacion: 'REEMPLAZA',
  estado: 'ABIERTO'
};
let AUDITORIA = [];
let solicitudFiltro = 'TODAS';
let auditoriaFiltro = { usuario: '', entidad: '' };
const FECHA_LIMITE_CANCELACION = '2026-12-15';

// Rol activo
let currentRole = 'student';

function obtenerMatricula(matriculaId) {
  return MATRICULAS.find(matricula => matricula.id === matriculaId);
}

function existeSolicitudPendiente(tipo, estudiante, materia, grupo) {
  return SOLICITUDES.some(solicitud => solicitud.estado === 'PENDIENTE'
    && solicitud.tipo === tipo
    && solicitud.estudiante === estudiante
    && solicitud.materia === materia
    && solicitud.grupo === grupo);
}

function badgeSolicitud(estado) {
  const estilos = {
    PENDIENTE: ['bs-pending', '⏳ Pendiente'],
    APROBADA: ['bs-accepted', '✅ Aprobada'],
    RECHAZADA: ['bs-rejected', '❌ Rechazada']
  };
  const [clase, texto] = estilos[estado] || ['', estado || '—'];
  return `<span class="badge-status ${clase}">${texto}</span>`;
}

function registrarAuditoria(usuario, entidadAfectada, idEntidad, valorAnterior, valorNuevo, justificacion) {
  AUDITORIA.unshift({
    id: AUDITORIA.length ? Math.max(...AUDITORIA.map(registro => registro.id)) + 1 : 1,
    fechaHora: new Date().toISOString(),
    usuario,
    entidadAfectada,
    idEntidad,
    valorAnterior: valorAnterior === null ? null : JSON.parse(JSON.stringify(valorAnterior)),
    valorNuevo: valorNuevo === null ? null : JSON.parse(JSON.stringify(valorNuevo)),
    justificacion
  });
}

function formatearAuditoria(valor) {
  return valor === null || valor === undefined ? '—' : escapeHtml(JSON.stringify(valor));
}

function escapeHtml(valor) {
  return String(valor).replace(/[&<>"']/g, caracter => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[caracter]);
}

function notaVisible(nota) {
  return nota && (nota.estado === 'PUBLICADA' || nota.estado === 'CERRADA') && nota.valor !== null;
}

function calcularDefinitiva(notas) {
  if (notaVisible(notas.HAB) && PERIODO_ACTUAL.politicaHabilitacion === 'REEMPLAZA') {
    return notas.HAB.valor;
  }

  return Object.keys(PERIODO_ACTUAL.pesos).reduce((total, corte) => {
    if (!notaVisible(notas[corte])) return total;
    return total + notas[corte].valor * PERIODO_ACTUAL.pesos[corte];
  }, 0);
}

function calcularPromedioParcialDocente(notas) {
  const cortesDisponibles = Object.keys(PERIODO_ACTUAL.pesos)
    .filter(corte => notaVisible(notas[corte]));
  const pesoDisponible = cortesDisponibles.reduce((total, corte) => total + PERIODO_ACTUAL.pesos[corte], 0);

  if (!pesoDisponible) return 0;

  const suma = cortesDisponibles.reduce((total, corte) => (
    total + notas[corte].valor * PERIODO_ACTUAL.pesos[corte]
  ), 0);
  return suma / pesoDisponible;
}

function getSemaforoEstudiante(matricula) {
  const promedio = calcularPromedioParcialDocente(matricula.notas);
  const cortesCompletos = Object.keys(PERIODO_ACTUAL.pesos).every(corte => notaVisible(matricula.notas[corte]));
  const definitiva = calcularDefinitiva(matricula.notas);
  const tieneHabilitacionPendiente = cortesCompletos
    && definitiva >= PERIODO_ACTUAL.rangoHabilitacion.minimo
    && definitiva <= PERIODO_ACTUAL.rangoHabilitacion.maximo
    && !notaVisible(matricula.notas.HAB);

  if (tieneHabilitacionPendiente) {
    return { clase: 'amarillo', mensaje: 'Habilitación pendiente', promedio };
  }
  if (promedio < PERIODO_ACTUAL.umbral) {
    return { clase: 'rojo', mensaje: 'Riesgo de reprobación', promedio };
  }
  return { clase: 'verde', mensaje: 'Desempeño satisfactorio', promedio };
}

function badgeNota(estado) {
  const badges = {
    BORRADOR: '<span class="badge-status bs-pending">📝 Borrador</span>',
    PUBLICADA: '<span class="badge-status bs-accepted">✅ Publicada</span>',
    CERRADA: '<span class="badge-status bs-done">🔒 Cerrada</span>'
  };
  return badges[estado] || `<span class="badge-status">${estado || '—'}</span>`;
}

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
    { id: 'st-grades',    icon: '🎓', label: 'Mis Notas' },
    { id: 'st-request-subject', icon: '📖', label: 'Solicitar Materia' },
    { id: 'st-requests-status', icon: '📨', label: 'Mis Trámites' },
  ],
  teacher: [
    { id: 'tc-dashboard', icon: '🏠', label: 'Inicio' },
    { id: 'tc-requests',  icon: '📩', label: 'Solicitudes' },
    { id: 'tc-schedule',  icon: '📆', label: 'Mi Horario' },
    { id: 'tc-history',   icon: '🕒', label: 'Historial' },
    { id: 'tc-grades',    icon: '📊', label: 'Gestionar Notas' },
  ],
  admin: [
    { id: 'ad-dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'ad-users',     icon: '👥', label: 'Usuarios' },
    { id: 'ad-tutorias',  icon: '📚', label: 'Tutorías' },
    { id: 'ad-requests',  icon: '📨', label: 'Gestión de Solicitudes' },
    { id: 'ad-offer',     icon: '📖', label: 'Oferta Académica' },
    { id: 'ad-period',    icon: '🗓️', label: 'Periodo Académico' },
    { id: 'ad-audit',     icon: '📜', label: 'Historial de Auditoría' },
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
  'st-grades':    'Mis Notas',
  'tc-dashboard': 'Dashboard Docente',
  'tc-requests':  'Solicitudes Pendientes',
  'tc-schedule':  'Mi Horario',
  'tc-history':   'Historial de Tutorías',
  'tc-grades':    'Gestionar Notas',
  'ad-dashboard': 'Panel Administrador',
  'ad-users':     'Gestión de Usuarios',
  'ad-tutorias':  'Gestión de Tutorías',
  'ad-requests':  'Gestión de Solicitudes',
  'ad-offer':     'Gestión de la Oferta Académica',
  'ad-period':    'Configuración del Periodo Académico',
  'ad-audit':     'Registro de Auditoría e Historial',
  'st-requests-status': 'Estado de mis trámites',
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
  'st-request': () => {
    const materiasActivas = [...new Set(MATRICULAS
      .filter(matricula => matricula.estudiante === USERS.student.name && matricula.estado === 'ACTIVA')
      .map(matricula => matricula.asignatura))];
    return `
      <div class="card" style="max-width:580px">
        <div class="card-header">
          <span class="card-title">📝 Nueva Solicitud de Tutoría</span>
        </div>
        <div class="card-body" style="padding:24px">
          <div class="form-group">
            <label>Materia</label>
            <select id="r-subject" onchange="actualizarDocentesTutorias()">
              <option value="">-- Seleccionar --</option>
              ${materiasActivas.map(materia => `<option value="${escapeHtml(materia)}">${escapeHtml(materia)}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label>Docente</label>
            <select id="r-teacher" disabled onchange="validarDisponibilidadTutorias()">
              <option value="">-- Selecciona primero una materia --</option>
            </select>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div class="form-group">
              <label>Fecha</label>
              <input type="date" id="r-date" min="${new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10)}" onchange="validarDisponibilidadTutorias()">
            </div>
            <div class="form-group">
              <label>Hora</label>
              <select id="r-hour" onchange="validarDisponibilidadTutorias()">
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
          <div id="r-conflict" role="status" style="margin-bottom:12px;color:var(--text2);font-size:13px">
            Selecciona materia, docente, fecha y hora para validar la disponibilidad.
          </div>
          <button id="r-submit" class="btn btn-primary" style="width:100%;margin-top:8px" onclick="submitRequest()">
            📩 Enviar Solicitud
          </button>
        </div>
      </div>`;
  },

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

  // ─── ESTUDIANTE: MIS NOTAS ─────────────────
  'st-grades': () => {
    const misMatriculas = MATRICULAS.filter(m => m.estudiante === USERS.student.name);
    return `
      <div class="card">
        <div class="card-header">
          <span class="card-title">🎓 Mis Notas — Periodo ${PERIODO_ACTUAL.nombre}</span>
        </div>
        <div class="card-body">
          <table>
            <thead>
              <tr><th>Asignatura</th><th>Grupo</th><th>C1</th><th>C2</th><th>C3</th><th>HAB</th><th>Definitiva</th><th>Acción</th></tr>
            </thead>
            <tbody>
              ${misMatriculas.map(m => {
                const definitiva = calcularDefinitiva(m.notas);
                const cortesCompletos = Object.keys(PERIODO_ACTUAL.pesos)
                  .every(corte => notaVisible(m.notas[corte]));
                const semaforo = getSemaforoEstudiante(m);
                let accionHtml = '<span class="badge-status bs-pending">⏳ En curso</span>';

                if (semaforo.mensaje === 'Habilitación pendiente') {
                  accionHtml = `<button class="btn btn-primary btn-sm" onclick="solicitarHabilitacion(${m.id})">Solicitar Habilitación</button>`;
                } else if (cortesCompletos && definitiva >= PERIODO_ACTUAL.umbral) {
                  accionHtml = '<span class="badge-status bs-accepted">✅ Aprobada</span>';
                } else if (cortesCompletos) {
                  accionHtml = '<span class="badge-status bs-rejected">❌ Reprobada</span>';
                }
                if (m.estado !== 'CANCELADA') {
                  accionHtml += `<br><button class="btn btn-danger btn-sm" onclick="solicitarCancelacionMateria(${m.id})">Solicitar cancelación</button>`;
                }

                return `
                  <tr>
                    <td><strong>${m.asignatura}</strong></td>
                    <td>${m.grupo}</td>
                    <td>${m.notas.C1.valor === null ? '—' : m.notas.C1.valor.toFixed(1)} ${badgeNota(m.notas.C1.estado)}</td>
                    <td>${m.notas.C2.valor === null ? '—' : m.notas.C2.valor.toFixed(1)} ${badgeNota(m.notas.C2.estado)}</td>
                    <td>${m.notas.C3.valor === null ? '—' : m.notas.C3.valor.toFixed(1)} ${badgeNota(m.notas.C3.estado)}</td>
                    <td>${m.notas.HAB.valor === null ? '—' : m.notas.HAB.valor.toFixed(1)} ${badgeNota(m.notas.HAB.estado)}</td>
                    <td><strong>${definitiva ? definitiva.toFixed(2) : '—'}</strong></td>
                    <td>${accionHtml}</td>
                  </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  },

  // ─── ESTUDIANTE: SOLICITAR MATERIA ─────────
  'st-request-subject': () => `
    <div class="card" style="max-width:700px">
      <div class="card-header">
        <span class="card-title">📖 Solicitar inscripción de materia</span>
      </div>
      <div class="card-body" style="padding:24px">
        <div class="form-group">
          <label>Grupo y horario disponible</label>
          <select id="subject-group">
            <option value="">-- Seleccionar grupo --</option>
            ${GRUPOS_DISPONIBLES.filter(g => g.activo && MATERIAS.includes(g.materia)).map(g => `
              <option value="${g.id}" ${g.cupos === 0 ? 'disabled' : ''}>
                ${g.materia} · ${g.id} · ${g.horario} · ${g.cupos} cupo(s)
              </option>`).join('')}
          </select>
        </div>
        ${PERIODO_ACTUAL.estado !== 'ABIERTO'
          ? '<div class="alert alert-info">El periodo académico está cerrado. No se reciben nuevas solicitudes de inscripción.</div>'
          : ''}
        <div class="form-group">
          <label>Motivo (opcional)</label>
          <textarea id="subject-reason" rows="3" placeholder="Indica por qué solicitas la inscripción"></textarea>
        </div>
        <button class="btn btn-primary" onclick="solicitarInscripcionMateria()">
          Enviar solicitud de inscripción
        </button>
      </div>
    </div>`,

  // ─── ESTUDIANTE: ESTADO DE TRÁMITES ────────
  'st-requests-status': () => {
    const misSolicitudes = SOLICITUDES.filter(s => s.estudiante === USERS.student.name);
    return `
      <div class="card">
        <div class="card-header">
          <span class="card-title">📨 Estado de mis trámites</span>
          <button class="btn btn-primary btn-sm" onclick="navigate('st-request-subject')">+ Solicitar materia</button>
        </div>
        <div class="card-body">
          ${misSolicitudes.length ? `
            <table>
              <thead><tr><th>Tipo</th><th>Materia</th><th>Grupo</th><th>Creada</th><th>Estado</th><th>Detalle</th></tr></thead>
              <tbody>
                ${misSolicitudes.map(s => {
                  let detalle = '—';
                  if (s.estado === 'RECHAZADA') {
                    detalle = s.motivoRechazo || 'Sin motivo registrado';
                  } else if (s.fechaHoraProgramada) {
                    detalle = `Prueba: ${s.fechaHoraProgramada.replace('T', ' ')}`;
                  }
                  return `
                    <tr>
                      <td>${s.tipo}</td>
                      <td>${s.materia}</td>
                      <td>${s.grupo}</td>
                      <td>${fmtDate(s.fechaCreacion)}</td>
                      <td>${badgeSolicitud(s.estado)}</td>
                      <td>${detalle}</td>
                    </tr>`;
                }).join('')}
              </tbody>
            </table>` : '<div class="empty-state"><div class="icon">📭</div><p>No tienes trámites registrados.</p></div>'}
        </div>
      </div>`;
  },

  // ─── DOCENTE: DASHBOARD ─────────────────────
  'tc-dashboard': () => {
    const mis = TUTORIAS.filter(t => t.teacher === 'Dr. Andrés López');
    const pen = mis.filter(t => t.status === 'pending').length;
    const acc = mis.filter(t => t.status === 'accepted').length;
    const gruposDocente = [...new Set(MATRICULAS
      .filter(matricula => matricula.docente === USERS.teacher.name && matricula.estado === 'ACTIVA')
      .map(matricula => matricula.grupo))]
      .map(grupoId => {
        const matriculasGrupo = MATRICULAS.filter(matricula => matricula.grupo === grupoId
          && matricula.docente === USERS.teacher.name && matricula.estado === 'ACTIVA');
        return {
          name: `${matriculasGrupo[0].asignatura} — Grupo ${grupoId}`,
          students: matriculasGrupo.map(matricula => ({
            name: matricula.estudiante,
            rendimiento: getSemaforoEstudiante(matricula)
          }))
        };
      });

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
            <p class="performance-caption">Promedio ponderado parcial · Aprobación desde ${PERIODO_ACTUAL.umbral.toFixed(1)}/5,0</p>
          </div>
          <div class="performance-legend" aria-label="Leyenda del semáforo">
            <span class="performance-status status-red"><span class="signal" aria-hidden="true"></span>Por debajo</span>
            <span class="performance-status status-green"><span class="signal" aria-hidden="true"></span>En o sobre el umbral</span>
            <span class="performance-status status-yellow"><span class="signal" aria-hidden="true"></span>Habilitación pendiente</span>
          </div>
        </div>
        <div class="card-body performance-body">
          ${gruposDocente.map(grupo => `
            <section class="performance-group" aria-label="${grupo.name}">
              <h3>${grupo.name}</h3>
              <div class="performance-table-wrap">
                <table>
                  <thead><tr><th>Estudiante</th><th>Promedio ponderado parcial</th><th>Indicador</th></tr></thead>
                  <tbody>
                    ${grupo.students.map(estudiante => {
                      const indicador = {
                        rojo: { clase: 'status-red', etiqueta: 'Por debajo' },
                        amarillo: { clase: 'status-yellow', etiqueta: 'Habilitación pendiente' },
                        verde: { clase: 'status-green', etiqueta: 'En o sobre el umbral' }
                      }[estudiante.rendimiento.clase];
                      return `
                        <tr>
                          <td><strong>${estudiante.name}</strong></td>
                          <td>${estudiante.rendimiento.promedio.toFixed(1)} / 5,0</td>
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
    const his = TUTORIAS.filter(t => t.teacher === USERS.teacher.name);
    return `
      <div class="card">
        <div class="card-header">
          <span class="card-title">🕒 Historial de Tutorías</span>
        </div>
        <div class="card-body">
          <table>
            <thead><tr><th>Estudiante</th><th>Materia</th><th>Fecha</th><th>Hora</th><th>Modalidad</th><th>Estado</th><th>Asistencia</th><th>Observaciones</th><th>Acciones</th></tr></thead>
            <tbody>
              ${his.map(t => `
                <tr>
                  <td>${t.student}</td>
                  <td>${t.subject}</td>
                  <td>${fmtDate(t.date)}</td>
                  <td>${t.hour}</td>
                  <td>${t.mode}</td>
                  <td>${badge(t.status)}</td>
                  <td>${t.asistio === true ? 'Sí' : t.asistio === false ? 'No' : '—'}</td>
                  <td>${escapeHtml(t.observaciones || '—')}</td>
                  <td>${t.status === 'accepted' || t.status === 'done'
                    ? `<button class="btn btn-primary btn-sm" onclick="abrirRegistroAsistencia(${t.id})">${t.status === 'done' ? 'Editar registro' : 'Registrar resultado'}</button>`
                    : '—'}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  },

  // ─── DOCENTE: GESTIONAR NOTAS ──────────────
  'tc-grades': () => {
    const misMatriculas = MATRICULAS.filter(m => m.docente === USERS.teacher.name);
    return `
      <div class="card">
        <div class="card-header">
          <span class="card-title">📊 Gestión de Notas — Periodo ${PERIODO_ACTUAL.nombre}</span>
          <button class="btn btn-ghost btn-sm" onclick="navigate('tc-grades')">↻ Actualizar</button>
        </div>
        <div class="card-body">
          <table>
            <thead>
              <tr><th>Estudiante</th><th>Asignatura</th><th>Grupo</th><th>Semáforo</th><th>C1</th><th>C2</th><th>C3</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              ${misMatriculas.map(m => {
                const semaforo = getSemaforoEstudiante(m);
                const claseSemaforo = {
                  rojo: 'bs-rejected',
                  amarillo: 'bs-pending',
                  verde: 'bs-accepted'
                }[semaforo.clase];
                return `
                  <tr>
                    <td><strong>${m.estudiante}</strong></td>
                    <td>${m.asignatura}</td>
                    <td>${m.grupo}</td>
                    <td><span class="badge-status ${claseSemaforo}">${semaforo.clase} · ${semaforo.promedio.toFixed(2)}<br>${semaforo.mensaje}</span></td>
                    ${['C1', 'C2', 'C3'].map(corte => `
                      <td>
                        <input id="nota-${m.id}-${corte}" type="number" min="0" max="5" step="0.1"
                          value="${m.notas[corte].valor === null ? '' : m.notas[corte].valor}"
                          style="width:70px" ${m.notas[corte].estado === 'CERRADA' || PERIODO_ACTUAL.estado !== 'ABIERTO' ? 'disabled' : ''}>
                        <small>${badgeNota(m.notas[corte].estado)}</small>
                      </td>`).join('')}
                    <td style="display:flex;gap:6px;flex-wrap:wrap">
                      <button class="btn btn-ghost btn-sm" onclick="guardarBorradorNota(${m.id})" ${PERIODO_ACTUAL.estado !== 'ABIERTO' ? 'disabled' : ''}>Guardar borrador</button>
                      <button class="btn btn-success btn-sm" onclick="publicarCorte('${m.grupo}', 'C1')" ${PERIODO_ACTUAL.estado !== 'ABIERTO' ? 'disabled' : ''}>Publicar C1</button>
                      <button class="btn btn-success btn-sm" onclick="publicarCorte('${m.grupo}', 'C2')" ${PERIODO_ACTUAL.estado !== 'ABIERTO' ? 'disabled' : ''}>Publicar C2</button>
                      <button class="btn btn-success btn-sm" onclick="publicarCorte('${m.grupo}', 'C3')" ${PERIODO_ACTUAL.estado !== 'ABIERTO' ? 'disabled' : ''}>Publicar C3</button>
                    </td>
                  </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  },

  // ─── ADMIN: GESTIÓN DE SOLICITUDES ─────────
  'ad-requests': () => {
    const solicitudes = SOLICITUDES.filter(s => solicitudFiltro === 'TODAS' || s.tipo === solicitudFiltro);
    const pendientes = solicitudes.filter(s => s.estado === 'PENDIENTE');
    return `
      <div class="card">
        <div class="card-header">
          <span class="card-title">📨 Gestión de Solicitudes</span>
          <span class="badge-status bs-pending">${pendientes.length} pendiente(s)</span>
        </div>
        <div class="card-body">
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px">
            ${['TODAS', 'INSCRIPCION', 'CANCELACION', 'HABILITACION'].map(tipo => `
              <button class="btn ${solicitudFiltro === tipo ? 'btn-primary' : 'btn-ghost'} btn-sm"
                onclick="filtrarSolicitudes('${tipo}')">${tipo}</button>`).join('')}
          </div>
          ${solicitudes.length ? `
            <table>
              <thead><tr><th>Tipo</th><th>Estudiante</th><th>Materia</th><th>Grupo</th><th>Fecha</th><th>Estado</th><th>Acciones</th></tr></thead>
              <tbody>
                ${solicitudes.map(s => `
                  <tr>
                    <td>${s.tipo}</td>
                    <td><strong>${s.estudiante}</strong></td>
                    <td>${s.materia}</td>
                    <td>${s.grupo}</td>
                    <td>${fmtDate(s.fechaCreacion)}</td>
                    <td>${badgeSolicitud(s.estado)}</td>
                    <td>
                      ${s.estado === 'PENDIENTE'
                        ? `<button class="btn btn-success btn-sm" onclick="resolverSolicitud(${s.id}, 'APROBADA')">Aprobar</button>
                           <button class="btn btn-danger btn-sm" onclick="resolverSolicitud(${s.id}, 'RECHAZADA')">Rechazar</button>`
                        : (s.motivoRechazo || s.fechaHoraProgramada || 'Resuelta')}
                    </td>
                  </tr>`).join('')}
              </tbody>
            </table>` : '<div class="empty-state"><div class="icon">✅</div><p>No hay solicitudes para este filtro.</p></div>'}
        </div>
      </div>`;
  },

  // ─── ADMIN: OFERTA ACADÉMICA ──────────────
  'ad-offer': () => `
    <div class="card">
      <div class="card-header">
        <span class="card-title">📖 Materias</span>
        <button class="btn btn-primary btn-sm" onclick="openSubjectModal()">+ Crear materia</button>
      </div>
      <div class="card-body">
        <table>
          <thead><tr><th>Materia</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            ${MATERIAS.map((materia, index) => `
              <tr>
                <td><strong>${escapeHtml(materia)}</strong></td>
                <td><span class="badge-status bs-accepted">✅ Activa</span></td>
                <td>
                  <button class="btn btn-ghost btn-sm" onclick="openSubjectModal(${index})">Editar</button>
                  <button class="btn btn-danger btn-sm" onclick="toggleMateria(${index}, false)">Dar de baja</button>
                </td>
              </tr>`).join('')}
            ${MATERIAS_INACTIVAS.map((materia, index) => `
              <tr>
                <td><strong>${escapeHtml(materia)}</strong></td>
                <td><span class="badge-status bs-rejected">❌ Inactiva</span></td>
                <td>
                  <button class="btn btn-ghost btn-sm" onclick="toggleMateria(${index}, true)">Reactivar</button>
                  <button class="btn btn-danger btn-sm" onclick="eliminarMateriaInactiva(${index})">Eliminar</button>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
    <div class="card" style="margin-top:18px">
      <div class="card-header">
        <span class="card-title">👥 Grupos, horarios y cupos</span>
        <button class="btn btn-primary btn-sm" onclick="openGroupModal()">+ Crear grupo</button>
      </div>
      <div class="card-body">
        <table>
          <thead><tr><th>Materia</th><th>Grupo</th><th>Docente</th><th>Horario</th><th>Cupos disponibles</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            ${GRUPOS_DISPONIBLES.map(grupo => `
              <tr>
                <td>${escapeHtml(grupo.materia)}</td>
                <td><strong>${grupo.id}</strong></td>
                <td>${escapeHtml(grupo.docente)}</td>
                <td>${escapeHtml(grupo.horario)}</td>
                <td>${grupo.cupos}</td>
                <td><span class="badge-status ${grupo.activo ? 'bs-accepted' : 'bs-rejected'}">${grupo.activo ? '✅ Activo' : '❌ Inactivo'}</span></td>
                <td>
                  <button class="btn btn-ghost btn-sm" onclick="openGroupModal('${grupo.id}')">Editar</button>
                  <button class="btn ${grupo.activo ? 'btn-danger' : 'btn-success'} btn-sm" onclick="toggleGrupo('${grupo.id}')">${grupo.activo ? 'Dar de baja' : 'Reactivar'}</button>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`,

  // ─── ADMIN: PERIODO ACADÉMICO ─────────────
  'ad-period': () => `
    <div class="card" style="max-width:850px">
      <div class="card-header">
        <span class="card-title">🗓️ Periodo ${escapeHtml(PERIODO_ACTUAL.nombre)}</span>
        <span class="badge-status ${PERIODO_ACTUAL.estado === 'ABIERTO' ? 'bs-accepted' : 'bs-rejected'}">${PERIODO_ACTUAL.estado}</span>
      </div>
      <div class="card-body" style="padding:24px">
        <div class="form-group">
          <label>Nombre del periodo</label>
          <input id="period-name" type="text" value="${escapeHtml(PERIODO_ACTUAL.nombre)}">
        </div>
        <h3>Pesos de los cortes (deben sumar 100%)</h3>
        <div style="display:grid;grid-template-columns:repeat(3,minmax(120px,1fr));gap:12px">
          ${Object.entries(PERIODO_ACTUAL.pesos).map(([corte, peso]) => `
            <div class="form-group">
              <label>${corte} (%)</label>
              <input id="period-weight-${corte}" type="number" min="1" max="100" step="1" value="${peso * 100}">
            </div>`).join('')}
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,minmax(120px,1fr));gap:12px">
          <div class="form-group">
            <label>Umbral de aprobación (0–5)</label>
            <input id="period-threshold" type="number" min="0" max="5" step="0.1" value="${PERIODO_ACTUAL.umbral}">
          </div>
          <div class="form-group">
            <label>Habilitación desde (0–5)</label>
            <input id="period-hab-min" type="number" min="0" max="5" step="0.1" value="${PERIODO_ACTUAL.rangoHabilitacion.minimo}">
          </div>
          <div class="form-group">
            <label>Habilitación hasta (0–5)</label>
            <input id="period-hab-max" type="number" min="0" max="5" step="0.1" value="${PERIODO_ACTUAL.rangoHabilitacion.maximo}">
          </div>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn btn-primary" onclick="guardarConfiguracionPeriodo()">Guardar configuración</button>
          <button class="btn ${PERIODO_ACTUAL.estado === 'ABIERTO' ? 'btn-danger' : 'btn-success'}"
            onclick="cambiarEstadoPeriodo()">${PERIODO_ACTUAL.estado === 'ABIERTO' ? 'Cerrar periodo' : 'Abrir periodo'}</button>
        </div>
      </div>
    </div>`,

  // ─── ADMIN: AUDITORÍA ──────────────────────
  'ad-audit': () => {
    const registros = AUDITORIA.filter(registro => {
      const coincideUsuario = !auditoriaFiltro.usuario
        || registro.usuario.toLowerCase().includes(auditoriaFiltro.usuario.toLowerCase());
      const coincideEntidad = !auditoriaFiltro.entidad
        || registro.entidadAfectada === auditoriaFiltro.entidad;
      return coincideUsuario && coincideEntidad;
    });
    const notasCerradas = [];
    MATRICULAS.forEach(matricula => {
      Object.keys(PERIODO_ACTUAL.pesos).forEach(corte => {
        if (matricula.notas[corte].estado === 'CERRADA') {
          notasCerradas.push({ matricula, corte });
        }
      });
    });

    return `
      <div class="card">
        <div class="card-header">
          <span class="card-title">📜 Registro de Auditoría e Historial</span>
          <span class="badge-status bs-done">${registros.length} registro(s)</span>
        </div>
        <div class="card-body">
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px">
            <input id="audit-user-filter" type="search" placeholder="Buscar por usuario"
              value="${auditoriaFiltro.usuario}" oninput="filtrarAuditoria()">
            <select id="audit-entity-filter" onchange="filtrarAuditoria()">
              <option value="">Todas las entidades</option>
              ${['NOTA', 'REAPERTURA_NOTA', 'TUTORIA', 'SOLICITUD', 'OFERTA_ACADEMICA', 'PERIODO'].map(entidad => `
                <option value="${entidad}" ${auditoriaFiltro.entidad === entidad ? 'selected' : ''}>${entidad}</option>
              `).join('')}
            </select>
          </div>
          <table>
            <thead>
              <tr><th>ID</th><th>Fecha y hora</th><th>Usuario</th><th>Entidad</th><th>ID entidad</th><th>Valor anterior</th><th>Valor nuevo</th><th>Justificación</th></tr>
            </thead>
            <tbody>
              ${registros.length ? registros.map(registro => `
                <tr>
                  <td>${registro.id}</td>
                  <td>${new Date(registro.fechaHora).toLocaleString('es-CO')}</td>
                  <td>${registro.usuario}</td>
                  <td>${registro.entidadAfectada}</td>
                  <td>${registro.idEntidad}</td>
                  <td>${formatearAuditoria(registro.valorAnterior)}</td>
                  <td>${formatearAuditoria(registro.valorNuevo)}</td>
                  <td>${registro.justificacion || '—'}</td>
                </tr>`).join('') : `
                <tr><td colspan="8"><div class="empty-state"><div class="icon">📭</div><p>No hay registros con estos filtros.</p></div></td></tr>`}
            </tbody>
          </table>
          <p style="margin-top:16px;color:var(--muted);font-size:12px">
            🔒 Historial inmutable: los registros de auditoría no pueden editarse ni eliminarse.
          </p>
        </div>
      </div>
      <div class="card" style="margin-top:18px">
        <div class="card-header">
          <span class="card-title">🔓 Notas cerradas</span>
        </div>
        <div class="card-body">
          ${notasCerradas.length ? `
            <table>
              <thead><tr><th>Estudiante</th><th>Asignatura</th><th>Corte</th><th>Nota</th><th>Acción</th></tr></thead>
              <tbody>
                ${notasCerradas.map(item => `
                  <tr>
                    <td>${item.matricula.estudiante}</td>
                    <td>${item.matricula.asignatura}</td>
                    <td>${item.corte}</td>
                    <td>${item.matricula.notas[item.corte].valor.toFixed(1)}</td>
                    <td><button class="btn btn-danger btn-sm" onclick="reabrirNotaCerrada(${item.matricula.id}, '${item.corte}')">Reabrir nota</button></td>
                  </tr>`).join('')}
              </tbody>
            </table>` : '<div class="empty-state"><div class="icon">✅</div><p>No hay notas cerradas.</p></div>'}
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
  const description = document.getElementById('r-desc').value.trim();

  if (!subject || !teacher || !date || !hour || !mode) {
    showToast('⚠️ Completa todos los campos');
    return;
  }
  const matriculaActiva = MATRICULAS.some(matricula => matricula.estudiante === USERS.student.name
    && matricula.asignatura === subject && matricula.docente === teacher && matricula.estado === 'ACTIVA');
  if (!matriculaActiva) {
    showToast('⚠️ Solo puedes solicitar tutorías de materias con matrícula activa');
    return;
  }
  if (date < new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10)) {
    showToast('⚠️ La fecha de tutoría no puede estar en el pasado');
    return;
  }
  const conflicto = obtenerConflictoTutoria(USERS.student.name, teacher, date, hour);
  if (conflicto) {
    showToast(`⚠️ No se puede agendar: ${conflicto}`);
    validarDisponibilidadTutorias();
    return;
  }

  const newTutoria = {
    id:      TUTORIAS.reduce((maximo, tutoria) => Math.max(maximo, tutoria.id), 0) + 1,
    student: USERS.student.name,
    teacher, subject, date, hour, mode,
    status:  'pending',
    room:    'Por confirmar',
    descripcion: description
  };

  TUTORIAS.push(newTutoria);
  registrarAuditoria(
    USERS.student.name,
    'TUTORIA',
    newTutoria.id,
    null,
    { estado: newTutoria.status, responsable: newTutoria.teacher },
    ''
  );
  showToast('✅ Solicitud enviada correctamente');
  navigate('st-my');
}

function actualizarDocentesTutorias() {
  const materia = document.getElementById('r-subject').value;
  const docenteSelect = document.getElementById('r-teacher');
  const docentes = [...new Set(MATRICULAS
    .filter(matricula => matricula.estudiante === USERS.student.name
      && matricula.asignatura === materia && matricula.estado === 'ACTIVA')
    .map(matricula => matricula.docente)
    .filter(Boolean))];
  docenteSelect.innerHTML = `<option value="">-- Seleccionar --</option>${docentes
    .map(docente => `<option value="${escapeHtml(docente)}">${escapeHtml(docente)}</option>`).join('')}`;
  docenteSelect.disabled = docentes.length === 0;
  validarDisponibilidadTutorias();
}

function obtenerConflictoTutoria(estudiante, docente, fecha, hora, tutoriaIdExcluir = null) {
  const fechaSeleccionada = new Date(`${fecha}T12:00:00`);
  if (Number.isNaN(fechaSeleccionada.getTime()) || !hora) return null;
  const dia = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][fechaSeleccionada.getDay()];
  const inicio = aMinutos(hora);
  const fin = inicio + 60;
  const seCruza = grupo => grupo.activo && grupo.dia === dia
    && inicio < aMinutos(grupo.horaFin) && fin > aMinutos(grupo.horaInicio);

  const gruposEstudiante = MATRICULAS
    .filter(matricula => matricula.estudiante === estudiante && matricula.estado === 'ACTIVA')
    .map(matricula => GRUPOS_DISPONIBLES.find(grupo => grupo.id === matricula.grupo))
    .filter(Boolean);
  if (gruposEstudiante.some(seCruza)) return 'cruce con el horario de clases del estudiante';
  if (GRUPOS_DISPONIBLES.some(grupo => grupo.docente === docente && seCruza(grupo))) {
    return 'cruce con el horario de clases del docente';
  }

  const hayCruceTutoria = TUTORIAS.some(otra => otra.id !== tutoriaIdExcluir
    && (otra.status === 'pending' || otra.status === 'accepted')
    && otra.date === fecha
    && (otra.student === estudiante || otra.teacher === docente)
    && inicio < aMinutos(otra.hour) + 60
    && fin > aMinutos(otra.hour));
  return hayCruceTutoria ? 'cruce con otra tutoría pendiente o agendada' : null;
}

function validarDisponibilidadTutorias() {
  const materiaSelect = document.getElementById('r-subject');
  const docenteSelect = document.getElementById('r-teacher');
  const fechaInput = document.getElementById('r-date');
  const horaSelect = document.getElementById('r-hour');
  const resultado = document.getElementById('r-conflict');
  const boton = document.getElementById('r-submit');
  if (!materiaSelect || !docenteSelect || !fechaInput || !horaSelect || !resultado || !boton) return;

  const materia = materiaSelect.value;
  const docente = docenteSelect.value;
  const fecha = fechaInput.value;
  const hora = horaSelect.value;
  if (!materia || !docente || !fecha || !hora) {
    resultado.textContent = 'Selecciona materia, docente, fecha y hora para validar la disponibilidad.';
    resultado.style.color = 'var(--text2)';
    boton.disabled = false;
    return;
  }
  const conflicto = obtenerConflictoTutoria(USERS.student.name, docente, fecha, hora);
  const fechaHoy = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  if (fecha < fechaHoy) {
    resultado.textContent = 'La fecha seleccionada ya pasó.';
    resultado.style.color = 'var(--danger, #e05252)';
    boton.disabled = true;
  } else if (conflicto) {
    resultado.textContent = `Horario no disponible: ${conflicto}.`;
    resultado.style.color = 'var(--danger, #e05252)';
    boton.disabled = true;
  } else {
    resultado.textContent = 'Horario disponible.';
    resultado.style.color = 'var(--success, #24a879)';
    boton.disabled = false;
  }
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
  const tutoria = TUTORIAS.find(t => t.id === id);
  if (tutoria) {
    registrarAuditoria(
      USERS.student.name,
      'TUTORIA',
      tutoria.id,
      { estado: tutoria.status, responsable: tutoria.teacher },
      { estado: 'cancelled', responsable: tutoria.teacher },
      ''
    );
  }
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
  if (action === 'accepted') {
    const conflicto = obtenerConflictoTutoria(t.student, t.teacher, t.date, t.hour, t.id);
    if (conflicto) {
      showToast(`⚠️ No se puede aceptar: ${conflicto}`);
      return;
    }
  }
  const estadoAnterior = t.status;
  t.status = action;
  registrarAuditoria(
    USERS.teacher.name,
    'TUTORIA',
    t.id,
    { estado: estadoAnterior, responsable: t.teacher },
    { estado: t.status, responsable: t.teacher },
    ''
  );

  const msg = action === 'accepted'
    ? `✅ Tutoría de ${t.student} aceptada`
    : `❌ Tutoría rechazada`;

  showToast(msg);
  navigate('tc-requests');
}

function abrirRegistroAsistencia(id) {
  const tutoria = TUTORIAS.find(item => item.id === id && item.teacher === USERS.teacher.name);
  if (!tutoria || (tutoria.status !== 'accepted' && tutoria.status !== 'done')) {
    showToast('⚠️ No se puede registrar la asistencia de esta tutoría');
    return;
  }
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h3>📝 Registrar asistencia</h3>
    <p>${escapeHtml(tutoria.student)} · ${escapeHtml(tutoria.subject)} · ${fmtDate(tutoria.date)} ${escapeHtml(tutoria.hour)}</p>
    <div class="form-group">
      <label for="tutoria-asistencia">¿El estudiante asistió?</label>
      <select id="tutoria-asistencia">
        <option value="">-- Seleccionar --</option>
        <option value="si" ${tutoria.asistio === true ? 'selected' : ''}>Sí asistió</option>
        <option value="no" ${tutoria.asistio === false ? 'selected' : ''}>No asistió</option>
      </select>
    </div>
    <div class="form-group">
      <label for="tutoria-observaciones">Comentarios de seguimiento</label>
      <textarea id="tutoria-observaciones" rows="4" maxlength="1000" placeholder="Registra acuerdos, temas pendientes o recomendaciones.">${escapeHtml(tutoria.observaciones || '')}</textarea>
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-primary" onclick="guardarRegistroAsistencia(${tutoria.id})">Guardar registro</button>
    </div>`);
}

function guardarRegistroAsistencia(id) {
  const tutoria = TUTORIAS.find(item => item.id === id && item.teacher === USERS.teacher.name);
  const asistencia = document.getElementById('tutoria-asistencia').value;
  const observaciones = document.getElementById('tutoria-observaciones').value.trim();
  if (!tutoria || (tutoria.status !== 'accepted' && tutoria.status !== 'done')) {
    showToast('⚠️ No se puede actualizar este registro');
    return;
  }
  if (asistencia !== 'si' && asistencia !== 'no') {
    showToast('⚠️ Indica si el estudiante asistió');
    return;
  }
  const anterior = {
    estado: tutoria.status,
    asistio: tutoria.asistio ?? null,
    observaciones: tutoria.observaciones || ''
  };
  tutoria.asistio = asistencia === 'si';
  tutoria.observaciones = observaciones;
  tutoria.status = 'done';
  registrarAuditoria(
    USERS.teacher.name,
    'TUTORIA',
    tutoria.id,
    anterior,
    { estado: tutoria.status, asistio: tutoria.asistio, observaciones: tutoria.observaciones },
    'Registro de asistencia y seguimiento'
  );
  closeModal();
  showToast('✅ Asistencia y observaciones guardadas');
  navigate('tc-history');
}

function reasignarResponsableTutoria(id, nuevoDocente) {
  const tutoria = TUTORIAS.find(t => t.id === id);
  if (!tutoria || !nuevoDocente || tutoria.teacher === nuevoDocente) {
    showToast('⚠️ No se puede reasignar la tutoría');
    return;
  }
  if (tutoria.status === 'pending' || tutoria.status === 'accepted') {
    const conflicto = obtenerConflictoTutoria(tutoria.student, nuevoDocente, tutoria.date, tutoria.hour, tutoria.id);
    if (conflicto) {
      showToast(`⚠️ No se puede reasignar: ${conflicto}`);
      return;
    }
  }
  const docenteAnterior = tutoria.teacher;
  tutoria.teacher = nuevoDocente;
  registrarAuditoria(
    USERS.admin.name,
    'TUTORIA',
    tutoria.id,
    { responsable: docenteAnterior, estado: tutoria.status },
    { responsable: nuevoDocente, estado: tutoria.status },
    'Reatribución de responsable'
  );
  showToast('✅ Tutoría reasignada correctamente');
}

// ══════════════════════════════════════════════
//  ACCIONES — CALIFICACIONES
// ══════════════════════════════════════════════

function guardarBorradorNota(matriculaId) {
  if (PERIODO_ACTUAL.estado !== 'ABIERTO') {
    showToast('⚠️ El periodo académico está cerrado');
    return;
  }
  const matricula = MATRICULAS.find(m => m.id === matriculaId);
  if (!matricula) {
    showToast('⚠️ Matrícula no encontrada');
    return;
  }

  for (const corte of Object.keys(PERIODO_ACTUAL.pesos)) {
    const input = document.getElementById(`nota-${matriculaId}-${corte}`);
    const valor = input.value === '' ? null : Number(input.value);
    if (valor !== null && (Number.isNaN(valor) || valor < 0 || valor > 5)) {
      showToast(`⚠️ La nota ${corte} debe estar entre 0 y 5`);
      return;
    }
    if (matricula.notas[corte].estado !== 'CERRADA') {
      const notaAnterior = { ...matricula.notas[corte] };
      const notaNueva = { valor, estado: 'BORRADOR' };
      matricula.notas[corte] = { valor, estado: 'BORRADOR' };
      if (notaAnterior.valor !== notaNueva.valor || notaAnterior.estado !== notaNueva.estado) {
        registrarAuditoria(
          USERS.teacher.name,
          'NOTA',
          `${matricula.id}-${corte}`,
          notaAnterior,
          notaNueva,
          ''
        );
      }
    }
  }

  showToast('✅ Borrador de notas guardado');
  navigate('tc-grades');
}

function publicarCorte(grupo, corte) {
  if (PERIODO_ACTUAL.estado !== 'ABIERTO') {
    showToast('⚠️ El periodo académico está cerrado');
    return;
  }
  if (!PERIODO_ACTUAL.pesos[corte]) {
    showToast('⚠️ Corte no válido');
    return;
  }

  const grupoMatriculas = MATRICULAS.filter(m => m.grupo === grupo);
  let actualizadas = 0;

  for (const matricula of grupoMatriculas) {
    if (matricula.notas[corte].estado === 'CERRADA') continue;
    const input = document.getElementById(`nota-${matricula.id}-${corte}`);
    const valor = input ? Number(input.value) : matricula.notas[corte].valor;
    if (Number.isNaN(valor) || valor < 0 || valor > 5) {
      showToast(`⚠️ Registra una nota válida para ${matricula.estudiante}`);
      return;
    }
    const notaAnterior = { ...matricula.notas[corte] };
    const notaNueva = { valor, estado: 'PUBLICADA' };
    matricula.notas[corte] = notaNueva;
    if (notaAnterior.valor !== notaNueva.valor || notaAnterior.estado !== notaNueva.estado) {
      registrarAuditoria(
        USERS.teacher.name,
        'NOTA',
        `${matricula.id}-${corte}`,
        notaAnterior,
        notaNueva,
        ''
      );
    }
    actualizadas += 1;
  }

  showToast(`✅ ${corte} publicado para ${actualizadas} estudiante(s)`);
  navigate('tc-grades');
}

function solicitarHabilitacion(matriculaId) {
  const matricula = MATRICULAS.find(m => m.id === matriculaId);
  if (!matricula) {
    showToast('⚠️ Matrícula no encontrada');
    return;
  }
  if (matricula.estado !== 'ACTIVA') {
    showToast('⚠️ Solo se puede solicitar habilitación para una matrícula activa');
    return;
  }
  if (PERIODO_ACTUAL.estado !== 'ABIERTO') {
    showToast('⚠️ El periodo académico está cerrado');
    return;
  }

  const definitiva = calcularDefinitiva(matricula.notas);
  const dentroDelRango = definitiva >= PERIODO_ACTUAL.rangoHabilitacion.minimo
    && definitiva <= PERIODO_ACTUAL.rangoHabilitacion.maximo;
  if (!dentroDelRango) {
    showToast('⚠️ La definitiva no está en el rango de habilitación');
    return;
  }

  if (definitiva >= PERIODO_ACTUAL.umbral) {
    showToast('⚠️ La asignatura ya está aprobada');
    return;
  }
  if (existeSolicitudPendiente('HABILITACION', matricula.estudiante, matricula.asignatura, matricula.grupo)) {
    showToast('⚠️ Ya existe una solicitud de habilitación pendiente');
    return;
  }

  SOLICITUDES.push({
    id: SOLICITUDES.length + 1,
    tipo: 'HABILITACION',
    estudiante: matricula.estudiante,
    materia: matricula.asignatura,
    grupo: matricula.grupo,
    fechaCreacion: new Date().toISOString().split('T')[0],
    estado: 'PENDIENTE',
    fechaHoraProgramada: null,
    motivoRechazo: '',
    matriculaId
  });
  showToast('✅ Solicitud de habilitación enviada');
  navigate('st-requests-status');
}

function reabrirNotaCerrada(matriculaId, corte) {
  const matricula = obtenerMatricula(matriculaId);
  if (!matricula || !matricula.notas[corte] || matricula.notas[corte].estado !== 'CERRADA') {
    showToast('⚠️ La nota no está cerrada o no existe');
    return;
  }

  openModal(`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h3>🔓 Reabrir nota cerrada</h3>
    <p>${matricula.asignatura} — ${corte} — ${matricula.estudiante}</p>
    <div class="form-group">
      <label>Justificación de Reapertura (obligatoria)</label>
      <textarea id="reopen-justification" rows="4" placeholder="Describe la razón de la reapertura"></textarea>
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-danger" onclick="confirmarReaperturaNota(${matriculaId}, '${corte}')">Confirmar reapertura</button>
    </div>`);
}

function confirmarReaperturaNota(matriculaId, corte) {
  const input = document.getElementById('reopen-justification');
  const justificacion = input ? input.value.trim() : '';
  if (!justificacion) {
    showToast('⚠️ La justificación de reapertura es obligatoria');
    return;
  }
  const matricula = obtenerMatricula(matriculaId);
  if (!matricula || !matricula.notas[corte] || matricula.notas[corte].estado !== 'CERRADA') {
    closeModal();
    showToast('⚠️ La nota ya no está cerrada o no existe');
    return;
  }

  const notaAnterior = { ...matricula.notas[corte] };
  const notaNueva = { valor: notaAnterior.valor, estado: 'PUBLICADA' };
  matricula.notas[corte] = notaNueva;
  registrarAuditoria(
    USERS.admin.name,
    'REAPERTURA_NOTA',
    `${matricula.id}-${corte}`,
    notaAnterior,
    notaNueva,
    justificacion
  );
  closeModal();
  showToast('✅ Nota reabierta correctamente');
  navigate('ad-audit');
}

function solicitarInscripcionMateria() {
  if (PERIODO_ACTUAL.estado !== 'ABIERTO') {
    showToast('⚠️ El periodo académico está cerrado');
    return;
  }
  const grupoId = document.getElementById('subject-group').value;
  const grupo = GRUPOS_DISPONIBLES.find(g => g.id === grupoId);
  if (!grupo || !grupo.activo || !MATERIAS.includes(grupo.materia)) {
    showToast('⚠️ Selecciona un grupo disponible');
    return;
  }
  if (grupo.cupos <= 0) {
    showToast('⚠️ El grupo no tiene cupos disponibles');
    return;
  }
  if (MATRICULAS.some(m => m.estudiante === USERS.student.name && m.asignatura === grupo.materia && m.estado !== 'CANCELADA')) {
    showToast('⚠️ Ya estás matriculada en esta materia');
    return;
  }
  if (existeSolicitudPendiente('INSCRIPCION', USERS.student.name, grupo.materia, grupo.id)) {
    showToast('⚠️ Ya existe una solicitud pendiente para este grupo');
    return;
  }

  SOLICITUDES.push({
    id: SOLICITUDES.length + 1,
    tipo: 'INSCRIPCION',
    estudiante: USERS.student.name,
    materia: grupo.materia,
    grupo: grupo.id,
    fechaCreacion: new Date().toISOString().split('T')[0],
    estado: 'PENDIENTE',
    fechaHoraProgramada: null,
    motivoRechazo: ''
  });
  showToast('✅ Solicitud de inscripción enviada');
  navigate('st-requests-status');
}

function solicitarCancelacionMateria(matriculaId) {
  const matricula = obtenerMatricula(matriculaId);
  if (!matricula || matricula.estado === 'CANCELADA') {
    showToast('⚠️ Matrícula no disponible');
    return;
  }
  if (new Date().toISOString().split('T')[0] > FECHA_LIMITE_CANCELACION) {
    showToast('⚠️ La fecha límite de cancelación ya venció');
    return;
  }
  const tieneNotaCerrada = Object.values(matricula.notas).some(nota => nota.estado === 'CERRADA');
  if (tieneNotaCerrada) {
    showToast('⚠️ No puedes cancelar una asignatura con notas cerradas');
    return;
  }

  openModal(`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h3>¿Solicitar cancelación?</h3>
    <p>Se enviará una solicitud para cancelar <strong>${matricula.asignatura}</strong> del grupo ${matricula.grupo}.</p>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">No, volver</button>
      <button class="btn btn-danger" onclick="crearSolicitudCancelacion(${matricula.id})">Sí, solicitar</button>
    </div>`);
}

function crearSolicitudCancelacion(matriculaId) {
  const matricula = obtenerMatricula(matriculaId);
  closeModal();
  if (!matricula || existeSolicitudPendiente('CANCELACION', matricula.estudiante, matricula.asignatura, matricula.grupo)) {
    showToast('⚠️ Ya existe una solicitud de cancelación pendiente');
    return;
  }
  SOLICITUDES.push({
    id: SOLICITUDES.length + 1,
    tipo: 'CANCELACION',
    estudiante: matricula.estudiante,
    materia: matricula.asignatura,
    grupo: matricula.grupo,
    fechaCreacion: new Date().toISOString().split('T')[0],
    estado: 'PENDIENTE',
    fechaHoraProgramada: null,
    motivoRechazo: '',
    matriculaId
  });
  showToast('✅ Solicitud de cancelación enviada');
  navigate('st-requests-status');
}

function filtrarSolicitudes(tipo) {
  solicitudFiltro = tipo;
  navigate('ad-requests');
}

function filtrarAuditoria() {
  const userInput = document.getElementById('audit-user-filter');
  const entityInput = document.getElementById('audit-entity-filter');
  auditoriaFiltro = {
    usuario: userInput ? userInput.value : '',
    entidad: entityInput ? entityInput.value : ''
  };
  navigate('ad-audit');
}

function resolverSolicitud(solicitudId, decision) {
  const solicitud = SOLICITUDES.find(s => s.id === solicitudId);
  if (!solicitud || solicitud.estado !== 'PENDIENTE' || !['APROBADA', 'RECHAZADA'].includes(decision)) {
    showToast('⚠️ Solicitud no disponible');
    return;
  }
  if (decision === 'RECHAZADA') {
    abrirModalRechazo(solicitudId);
    return;
  }
  if (solicitud.tipo === 'HABILITACION') {
    abrirModalFechaHabilitacion(solicitudId);
    return;
  }
  aplicarResolucionSolicitud(solicitud, decision);
}

function aplicarResolucionSolicitud(solicitud, decision, fechaHoraProgramada) {
  if (solicitud.tipo === 'INSCRIPCION' && decision === 'APROBADA') {
    const grupo = GRUPOS_DISPONIBLES.find(g => g.id === solicitud.grupo);
    if (!grupo || !grupo.activo || !MATERIAS.includes(grupo.materia) || grupo.cupos <= 0) {
      showToast('⚠️ No hay cupos disponibles para aprobar la inscripción');
      return false;
    }
    if (MATRICULAS.some(m => m.estudiante === solicitud.estudiante
      && m.asignatura === solicitud.materia && m.estado !== 'CANCELADA')) {
      showToast('⚠️ El estudiante ya tiene una matrícula activa en esta materia');
      return false;
    }
    grupo.cupos -= 1;
    MATRICULAS.push({
      id: MATRICULAS.length + 1,
      estudiante: solicitud.estudiante,
      asignatura: solicitud.materia,
      grupo: solicitud.grupo,
      docente: grupo.docente,
      estado: 'ACTIVA',
      notas: {
        C1: { valor: null, estado: 'BORRADOR' },
        C2: { valor: null, estado: 'BORRADOR' },
        C3: { valor: null, estado: 'BORRADOR' },
        HAB: { valor: null, estado: 'BORRADOR' }
      }
    });
  } else if (solicitud.tipo === 'CANCELACION' && decision === 'APROBADA') {
    const matricula = obtenerMatricula(solicitud.matriculaId) || MATRICULAS.find(m => m.estudiante === solicitud.estudiante
      && m.asignatura === solicitud.materia && m.grupo === solicitud.grupo);
    if (!matricula || matricula.estado !== 'ACTIVA') {
      showToast('⚠️ No se encontró la matrícula para cancelar');
      return false;
    }
    matricula.estado = 'CANCELADA';
    const grupo = GRUPOS_DISPONIBLES.find(g => g.id === matricula.grupo);
    if (grupo) grupo.cupos += 1;
  } else if (solicitud.tipo === 'HABILITACION' && decision === 'APROBADA') {
    const grupo = GRUPOS_DISPONIBLES.find(g => g.id === solicitud.grupo);
    const matricula = obtenerMatricula(solicitud.matriculaId);
    const fecha = new Date(fechaHoraProgramada);
    if (!matricula || matricula.estado !== 'ACTIVA' || matricula.grupo !== solicitud.grupo) {
      showToast('⚠️ No se encontró una matrícula activa para esta habilitación');
      return false;
    }
    if (!fechaHoraProgramada || Number.isNaN(fecha.getTime()) || fecha <= new Date()) {
      showToast('⚠️ La fecha de habilitación debe ser futura y válida');
      return false;
    }
    if (!grupo || hayCruceHorarioHabilitacion(grupo, fechaHoraProgramada, solicitud.id)) {
      showToast('⚠️ La fecha y hora se cruza con una clase o una habilitación ya programada');
      return false;
    }
    solicitud.fechaHoraProgramada = fechaHoraProgramada;
  }

  const estadoAnterior = solicitud.estado;
  registrarAuditoria(
    USERS.admin.name,
    'SOLICITUD',
    solicitud.id,
    { estado: estadoAnterior },
    {
      estado: decision,
      tipo: solicitud.tipo,
      fechaHoraProgramada: fechaHoraProgramada || null
    },
    solicitud.motivoRechazo || ''
  );
  solicitud.estado = decision;
  showToast(`✅ Solicitud ${decision === 'APROBADA' ? 'aprobada' : 'actualizada'}`);
  navigate('ad-requests');
  return true;
}

function hayCruceHorarioHabilitacion(grupo, fechaHoraProgramada, solicitudId) {
  const inicio = new Date(fechaHoraProgramada);
  const fin = new Date(inicio.getTime() + 60 * 60 * 1000);
  const fecha = fechaHoraProgramada.slice(0, 10);
  const [anio, mes, dia] = fecha.split('-').map(Number);
  const diaSemana = new Date(anio, mes - 1, dia)
    .toLocaleDateString('es-CO', { weekday: 'long' }).toLowerCase();
  const minutosInicio = inicio.getHours() * 60 + inicio.getMinutes();
  const minutosFin = minutosInicio + 60;
  const aMinutos = hora => {
    const [horas, minutos] = hora.split(':').map(Number);
    return horas * 60 + minutos;
  };
  const comparteDia = horario => horario.dia.toLowerCase() === diaSemana;
  const seCruzaConClase = GRUPOS_DISPONIBLES.some(otroGrupo => otroGrupo.activo
    && otroGrupo.docente === grupo.docente
    && comparteDia(otroGrupo)
    && minutosInicio < aMinutos(otroGrupo.horaFin)
    && minutosFin > aMinutos(otroGrupo.horaInicio));
  if (seCruzaConClase) return true;

  return SOLICITUDES.some(otraSolicitud => otraSolicitud.id !== solicitudId
    && otraSolicitud.tipo === 'HABILITACION'
    && otraSolicitud.estado === 'APROBADA'
    && otraSolicitud.fechaHoraProgramada
    && otraSolicitud.fechaHoraProgramada.slice(0, 10) === fecha
    && (() => {
      const otroGrupo = GRUPOS_DISPONIBLES.find(item => item.id === otraSolicitud.grupo);
      if (!otroGrupo || (otroGrupo.id !== grupo.id && otroGrupo.docente !== grupo.docente)) return false;
      const otroInicio = new Date(otraSolicitud.fechaHoraProgramada);
      const otroFin = new Date(otroInicio.getTime() + 60 * 60 * 1000);
      return inicio < otroFin && fin > otroInicio;
    })());
}

function abrirModalFechaHabilitacion(solicitudId) {
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h3>📅 Programar prueba de habilitación</h3>
    <p>La fecha y hora son obligatorias para aprobar esta solicitud.</p>
    <div class="form-group">
      <label>Fecha y hora</label>
      <input type="datetime-local" id="habilitacion-date">
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-success" onclick="confirmarFechaHabilitacion(${solicitudId})">Aprobar y programar</button>
    </div>`);
}

function confirmarFechaHabilitacion(solicitudId) {
  const input = document.getElementById('habilitacion-date');
  const fechaHora = input ? input.value : '';
  if (!fechaHora) {
    showToast('⚠️ La fecha y hora son obligatorias');
    return;
  }
  const solicitud = SOLICITUDES.find(s => s.id === solicitudId);
  const fecha = new Date(fechaHora);
  const grupo = solicitud && GRUPOS_DISPONIBLES.find(g => g.id === solicitud.grupo);
  if (!solicitud || solicitud.estado !== 'PENDIENTE') {
    showToast('⚠️ Solicitud no disponible');
    return;
  }
  if (Number.isNaN(fecha.getTime()) || fecha <= new Date()) {
    showToast('⚠️ La fecha de habilitación debe ser futura y válida');
    return;
  }
  if (!grupo || hayCruceHorarioHabilitacion(grupo, fechaHora, solicitudId)) {
    showToast('⚠️ La fecha y hora se cruza con una clase o una habilitación ya programada');
    return;
  }
  closeModal();
  aplicarResolucionSolicitud(solicitud, 'APROBADA', fechaHora);
}

function abrirModalRechazo(solicitudId) {
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h3>❌ Rechazar solicitud</h3>
    <div class="form-group">
      <label>Motivo del rechazo (obligatorio)</label>
      <textarea id="rejection-reason" rows="3"></textarea>
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-danger" onclick="confirmarRechazo(${solicitudId})">Rechazar solicitud</button>
    </div>`);
}

function confirmarRechazo(solicitudId) {
  const motivo = document.getElementById('rejection-reason').value.trim();
  if (!motivo) {
    showToast('⚠️ El motivo de rechazo es obligatorio');
    return;
  }
  const solicitud = SOLICITUDES.find(s => s.id === solicitudId);
  closeModal();
  if (solicitud) {
    solicitud.motivoRechazo = motivo;
    aplicarResolucionSolicitud(solicitud, 'RECHAZADA');
  }
}

function openSubjectModal(index) {
  const materia = Number.isInteger(index) ? MATERIAS[index] : '';
  if (Number.isInteger(index) && !materia) {
    showToast('⚠️ Materia no encontrada');
    return;
  }
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h3>${materia ? '✏️ Editar materia' : '➕ Crear materia'}</h3>
    <div class="form-group">
      <label>Nombre de la materia</label>
      <input id="subject-name" type="text" value="${escapeHtml(materia || '')}" maxlength="100" required>
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-primary" onclick="guardarMateria(${Number.isInteger(index) ? index : 'null'})">Guardar</button>
    </div>`);
}

function guardarMateria(index) {
  const input = document.getElementById('subject-name');
  const nombre = input ? input.value.trim() : '';
  if (!nombre) {
    showToast('⚠️ El nombre de la materia es obligatorio');
    return;
  }
  if ([...MATERIAS, ...MATERIAS_INACTIVAS].some((actual, actualIndex) => (
    actual.toLocaleLowerCase() === nombre.toLocaleLowerCase()
    && !(Number.isInteger(index) && actualIndex === index && MATERIAS[actualIndex] === actual)
  ))) {
    showToast('⚠️ Ya existe una materia con ese nombre');
    return;
  }

  if (Number.isInteger(index)) {
    const anterior = MATERIAS[index];
    if (!anterior) {
      showToast('⚠️ Materia no encontrada');
      return;
    }
    MATERIAS[index] = nombre;
    GRUPOS_DISPONIBLES.filter(grupo => grupo.materia === anterior)
      .forEach(grupo => { grupo.materia = nombre; });
    MATRICULAS.filter(matricula => matricula.asignatura === anterior)
      .forEach(matricula => { matricula.asignatura = nombre; });
    SOLICITUDES.filter(solicitud => solicitud.materia === anterior)
      .forEach(solicitud => { solicitud.materia = nombre; });
    registrarAuditoria(USERS.admin.name, 'OFERTA_ACADEMICA', anterior, { materia: anterior }, { materia: nombre }, 'Edición de materia');
  } else {
    MATERIAS.push(nombre);
    registrarAuditoria(USERS.admin.name, 'OFERTA_ACADEMICA', nombre, null, { materia: nombre, estado: 'ACTIVA' }, 'Creación de materia');
  }
  closeModal();
  showToast('✅ Materia guardada');
  navigate('ad-offer');
}

function toggleMateria(index, activar) {
  const lista = activar ? MATERIAS_INACTIVAS : MATERIAS;
  const materia = lista[index];
  if (!materia) {
    showToast('⚠️ Materia no encontrada');
    return;
  }
  if (!activar) {
    const tieneGruposActivos = GRUPOS_DISPONIBLES.some(grupo => grupo.materia === materia && grupo.activo);
    const tieneTramitesPendientes = SOLICITUDES.some(solicitud => solicitud.materia === materia && solicitud.estado === 'PENDIENTE');
    if (tieneGruposActivos || tieneTramitesPendientes) {
      showToast('⚠️ Desactiva o resuelve primero los grupos y trámites asociados');
      return;
    }
    MATERIAS.splice(index, 1);
    MATERIAS_INACTIVAS.push(materia);
  } else {
    MATERIAS_INACTIVAS.splice(index, 1);
    MATERIAS.push(materia);
  }
  registrarAuditoria(
    USERS.admin.name, 'OFERTA_ACADEMICA', materia,
    { estado: activar ? 'INACTIVA' : 'ACTIVA' },
    { estado: activar ? 'ACTIVA' : 'INACTIVA' },
    activar ? 'Reactivación de materia' : 'Baja de materia'
  );
  showToast(activar ? '✅ Materia reactivada' : '✅ Materia dada de baja');
  navigate('ad-offer');
}

function eliminarMateriaInactiva(index) {
  const materia = MATERIAS_INACTIVAS[index];
  if (!materia) {
    showToast('⚠️ Materia no encontrada');
    return;
  }
  const tieneGrupos = GRUPOS_DISPONIBLES.some(grupo => grupo.materia === materia);
  const tieneSolicitudes = SOLICITUDES.some(solicitud => solicitud.materia === materia && solicitud.estado === 'PENDIENTE');
  if (tieneGrupos || tieneSolicitudes) {
    showToast('⚠️ No se puede eliminar: la materia conserva grupos o trámites asociados');
    return;
  }
  MATERIAS_INACTIVAS.splice(index, 1);
  registrarAuditoria(USERS.admin.name, 'OFERTA_ACADEMICA', materia, { materia, estado: 'INACTIVA' }, null, 'Eliminación de materia');
  showToast('✅ Materia eliminada');
  navigate('ad-offer');
}

function formatearHorarioGrupo(dia, horaInicio, horaFin) {
  return `${dia} ${horaInicio}-${horaFin}`;
}

function aMinutos(hora) {
  const [horas, minutos] = hora.split(':').map(Number);
  return horas * 60 + minutos;
}

function openGroupModal(grupoId) {
  const grupo = grupoId ? GRUPOS_DISPONIBLES.find(item => item.id === grupoId) : null;
  if (grupoId && !grupo) {
    showToast('⚠️ Grupo no encontrado');
    return;
  }
  if (!MATERIAS.length) {
    showToast('⚠️ Debes crear o reactivar una materia primero');
    return;
  }
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h3>${grupo ? `✏️ Editar grupo ${grupo.id}` : '➕ Crear grupo'}</h3>
    <div class="form-group">
      <label>Materia</label>
      <select id="group-subject">${MATERIAS.map(materia => `<option ${grupo && grupo.materia === materia ? 'selected' : ''}>${escapeHtml(materia)}</option>`).join('')}</select>
    </div>
    <div class="form-group">
      <label>Docente</label>
      <select id="group-teacher">${DOCENTES.map(docente => `<option ${grupo && grupo.docente === docente ? 'selected' : ''}>${docente}</option>`).join('')}</select>
    </div>
    <div class="form-group">
      <label>Día</label>
      <select id="group-day">${['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map(dia => `<option ${grupo && grupo.dia === dia ? 'selected' : ''}>${dia}</option>`).join('')}</select>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group"><label>Hora de inicio</label><input id="group-start" type="time" value="${grupo ? grupo.horaInicio : '08:00'}" required></div>
      <div class="form-group"><label>Hora de finalización</label><input id="group-end" type="time" value="${grupo ? grupo.horaFin : '10:00'}" required></div>
    </div>
    <div class="form-group">
      <label>Cupos disponibles</label>
      <input id="group-seats" type="number" min="0" max="500" step="1" value="${grupo ? grupo.cupos : 20}" required>
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-primary" onclick="guardarGrupo(${grupo ? `'${grupo.id}'` : 'null'})">Guardar grupo</button>
    </div>`);
}

function hayCruceHorarioGrupo(grupo, dia, horaInicio, horaFin) {
  return GRUPOS_DISPONIBLES.some(otro => otro.id !== grupo.id && otro.activo
    && otro.docente === grupo.docente
    && otro.dia === dia
    && aMinutos(horaInicio) < aMinutos(otro.horaFin)
    && aMinutos(horaFin) > aMinutos(otro.horaInicio));
}

function guardarGrupo(grupoId) {
  const materia = document.getElementById('group-subject').value;
  const docente = document.getElementById('group-teacher').value;
  const dia = document.getElementById('group-day').value;
  const horaInicio = document.getElementById('group-start').value;
  const horaFin = document.getElementById('group-end').value;
  const cupos = Number(document.getElementById('group-seats').value);
  if (!MATERIAS.includes(materia) || !DOCENTES.includes(docente) || !horaInicio || !horaFin
    || aMinutos(horaInicio) >= aMinutos(horaFin) || !Number.isInteger(cupos) || cupos < 0 || cupos > 500) {
    showToast('⚠️ Verifica materia, docente, horario y cupos');
    return;
  }
  let grupo = grupoId ? GRUPOS_DISPONIBLES.find(item => item.id === grupoId) : null;
  if (grupoId && !grupo) {
    showToast('⚠️ Grupo no encontrado');
    return;
  }
  if (!grupo) {
    const siguiente = GRUPOS_DISPONIBLES.reduce((maximo, item) => (
      Math.max(maximo, Number(item.id.replace(/\D/g, '')) || 0)
    ), 0) + 1;
    grupo = { id: `G${String(siguiente).padStart(2, '0')}`, activo: true };
    GRUPOS_DISPONIBLES.push(grupo);
  }
  const anterior = { ...grupo };
  grupo.materia = materia;
  grupo.docente = docente;
  grupo.dia = dia;
  grupo.horaInicio = horaInicio;
  grupo.horaFin = horaFin;
  grupo.horario = formatearHorarioGrupo(dia, horaInicio, horaFin);
  grupo.cupos = cupos;
  if (grupo.activo && hayCruceHorarioGrupo(grupo, dia, horaInicio, horaFin)) {
    Object.assign(grupo, anterior);
    if (!grupoId) GRUPOS_DISPONIBLES = GRUPOS_DISPONIBLES.filter(item => item !== grupo);
    showToast('⚠️ El docente ya tiene un grupo en ese horario');
    return;
  }
  registrarAuditoria(
    USERS.admin.name, 'OFERTA_ACADEMICA', grupo.id,
    grupoId ? anterior : null, { ...grupo },
    grupoId ? 'Edición de grupo y horario' : 'Creación de grupo'
  );
  closeModal();
  showToast('✅ Grupo guardado');
  navigate('ad-offer');
}

function toggleGrupo(grupoId) {
  const grupo = GRUPOS_DISPONIBLES.find(item => item.id === grupoId);
  if (!grupo) {
    showToast('⚠️ Grupo no encontrado');
    return;
  }
  if (grupo.activo && SOLICITUDES.some(solicitud => solicitud.grupo === grupo.id && solicitud.estado === 'PENDIENTE')) {
    showToast('⚠️ Resuelve primero las solicitudes pendientes del grupo');
    return;
  }
  if (!grupo.activo && hayCruceHorarioGrupo(grupo, grupo.dia, grupo.horaInicio, grupo.horaFin)) {
    showToast('⚠️ El docente ya tiene un grupo en ese horario');
    return;
  }
  const estadoAnterior = grupo.activo ? 'ACTIVO' : 'INACTIVO';
  grupo.activo = !grupo.activo;
  registrarAuditoria(USERS.admin.name, 'OFERTA_ACADEMICA', grupo.id,
    { estado: estadoAnterior }, { estado: grupo.activo ? 'ACTIVO' : 'INACTIVO' },
    grupo.activo ? 'Reactivación de grupo' : 'Baja de grupo');
  showToast(grupo.activo ? '✅ Grupo reactivado' : '✅ Grupo dado de baja');
  navigate('ad-offer');
}

function guardarConfiguracionPeriodo() {
  const nombre = document.getElementById('period-name').value.trim();
  const pesos = {};
  Object.keys(PERIODO_ACTUAL.pesos).forEach(corte => {
    pesos[corte] = Number(document.getElementById(`period-weight-${corte}`).value);
  });
  const umbral = Number(document.getElementById('period-threshold').value);
  const minimo = Number(document.getElementById('period-hab-min').value);
  const maximo = Number(document.getElementById('period-hab-max').value);
  const sumaPesos = Object.values(pesos).reduce((total, peso) => total + peso, 0);
  if (!nombre || Object.values(pesos).some(peso => !Number.isFinite(peso) || peso <= 0 || peso > 100)
    || Math.abs(sumaPesos - 100) > 0.01 || !Number.isFinite(umbral) || umbral < 0 || umbral > 5
    || !Number.isFinite(minimo) || !Number.isFinite(maximo) || minimo < 0 || maximo > 5 || minimo > maximo) {
    showToast('⚠️ Revisa los valores: pesos al 100%, notas de 0 a 5 y rango válido');
    return;
  }
  const anterior = JSON.parse(JSON.stringify(PERIODO_ACTUAL));
  PERIODO_ACTUAL.nombre = nombre;
  PERIODO_ACTUAL.pesos = Object.fromEntries(Object.entries(pesos).map(([corte, peso]) => [corte, peso / 100]));
  PERIODO_ACTUAL.umbral = umbral;
  PERIODO_ACTUAL.rangoHabilitacion = { minimo, maximo };
  registrarAuditoria(USERS.admin.name, 'PERIODO', nombre, anterior, PERIODO_ACTUAL, 'Actualización de parámetros académicos');
  showToast('✅ Configuración del periodo guardada');
  navigate('ad-period');
}

function cambiarEstadoPeriodo() {
  const estadoAnterior = PERIODO_ACTUAL.estado;
  if (estadoAnterior === 'CERRADO') {
    const sumaPesos = Object.values(PERIODO_ACTUAL.pesos).reduce((total, peso) => total + peso, 0);
    const rango = PERIODO_ACTUAL.rangoHabilitacion;
    if (Math.abs(sumaPesos - 1) > 0.0001 || PERIODO_ACTUAL.umbral < 0 || PERIODO_ACTUAL.umbral > 5
      || rango.minimo < 0 || rango.maximo > 5 || rango.minimo > rango.maximo) {
      showToast('⚠️ Corrige la configuración académica antes de abrir el periodo');
      return;
    }
  }
  PERIODO_ACTUAL.estado = estadoAnterior === 'ABIERTO' ? 'CERRADO' : 'ABIERTO';
  registrarAuditoria(USERS.admin.name, 'PERIODO', PERIODO_ACTUAL.nombre,
    { estado: estadoAnterior }, { estado: PERIODO_ACTUAL.estado },
    PERIODO_ACTUAL.estado === 'ABIERTO' ? 'Apertura de periodo' : 'Cierre de periodo');
  showToast(`✅ Periodo ${PERIODO_ACTUAL.estado.toLowerCase()}`);
  navigate('ad-period');
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

//continua edicion 2 entrega