// AgroControl SENA - Admin Module (JavaScript ES Module)

const initialUsers = [
  { id: 'usr-1', nombre: 'Carlos Mario Restrepo', documento: '1017123456', correo: 'carlos.restrepo@sena.edu.co', telefono: '3001234567', rol: 'administrador', estado: 'activo' },
  { id: 'usr-2', nombre: 'Juan Pérez Velásquez', documento: '71987654', correo: 'juan.perez@sena.edu.co', telefono: '3109876543', rol: 'tecnico', estado: 'activo' },
  { id: 'usr-3', nombre: 'María Fernanda Ruiz', documento: '1035456789', correo: 'maria.ruiz@sena.edu.co', telefono: '3204567890', rol: 'operario', estado: 'activo' },
  { id: 'usr-4', nombre: 'Pedro Nel Gómez', documento: '70112233', correo: 'pedro.gomez@sena.edu.co', telefono: '3157788990', rol: 'operario', estado: 'inactivo' }
];

function escapeHtml(value) {
  const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(value ?? '').replace(/[&<>"']/g, character => entities[character]);
}

function getUsers() {
  const adminUsers = JSON.parse(localStorage.getItem('sena_users')) || initialUsers;
  const appUsers = JSON.parse(localStorage.getItem('agro_users')) || [];
  return Array.from(new Map([...adminUsers, ...appUsers].map(user => [user.id, user])).values());
}

function saveUsers(users) {
  localStorage.setItem('sena_users', JSON.stringify(users));
  localStorage.setItem('agro_users', JSON.stringify(users));
}

function getFincas() {
  return JSON.parse(localStorage.getItem('agro_fincas')) || [
    { id: 'ter-1', nombre: 'Finca Las Palmas' },
    { id: 'ter-2', nombre: 'Finca El Paraíso' },
    { id: 'ter-3', nombre: 'Finca La Esperanza' },
    { id: 'ter-4', nombre: 'Finca San José' },
    { id: 'ter-5', nombre: 'Finca Los Naranjos' }
  ];
}

function checkAdminAuth() {
  const session = JSON.parse(localStorage.getItem('sena_session'));
  const mainContent = document.getElementById('admin-main-content');
  const restrictedContent = document.getElementById('admin-restricted');

  if (!session) {
    if (mainContent) mainContent.classList.add('hidden');
    if (restrictedContent) {
      restrictedContent.classList.remove('hidden');
      restrictedContent.querySelector('#restricted-reason').innerText = 
        'Debe iniciar sesión en el sistema para ingresar al módulo administrativo.';
    }
    return false;
  }

  if (session.rol !== 'administrador') {
    if (mainContent) mainContent.classList.add('hidden');
    if (restrictedContent) {
      restrictedContent.classList.remove('hidden');
      restrictedContent.querySelector('#restricted-reason').innerText = 
        `El usuario actual (${session.nombre} - ${session.rol.toUpperCase()}) no posee privilegios de Administrador.`;
    }
    return false;
  }

  if (mainContent) mainContent.classList.remove('hidden');
  if (restrictedContent) restrictedContent.classList.add('hidden');
  return true;
}

function renderUsers() {
  if (!checkAdminAuth()) return;

  const users = getUsers();
  const fincas = getFincas();
  const tbody = document.getElementById('user-table-body');
  if (!tbody) return;

  tbody.innerHTML = users.map(u => `
    <tr class="hover:bg-slate-50 transition-colors">
      <td class="px-4 py-3 font-bold text-slate-900">${escapeHtml(u.nombre)}</td>
      <td class="px-4 py-3 font-mono">${escapeHtml(u.documento)}</td>
      <td class="px-4 py-3">${escapeHtml(u.correo)}<br /><span class="text-slate-400">${escapeHtml(u.telefono)}</span></td>
      <td class="px-4 py-3">
        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
          u.rol === 'administrador' ? 'bg-purple-100 text-purple-800' :
          u.rol === 'tecnico' ? 'bg-indigo-100 text-indigo-800' :
          u.rol === 'cliente' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
        }">${u.rol}</span>
      </td>
      <td class="px-4 py-3">${fincas.find(finca => finca.id === u.fincaId)?.nombre || '—'}</td>
      <td class="px-4 py-3">
        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${
          u.estado === 'activo' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
        }">${u.estado}</span>
      </td>
      <td class="px-4 py-3 text-right space-x-2">
        <button type="button" onclick="window.toggleUserStatusAction('${escapeHtml(u.id)}')" class="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors" title="${u.estado === 'activo' ? 'Desactivar usuario' : 'Activar usuario'}" aria-label="${u.estado === 'activo' ? 'Desactivar' : 'Activar'} a ${escapeHtml(u.nombre)}">
          <i data-lucide="power" class="w-4 h-4"></i>
        </button>
      </td>
    </tr>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

window.openNewUserModal = function() {
  const container = document.getElementById('admin-modal-container');
  if (!container) return;

  container.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60" onclick="if (event.target === this) window.closeNewUserModal()">
      <section role="dialog" aria-modal="true" aria-labelledby="new-user-title" class="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div class="flex items-center justify-between p-5 border-b border-slate-100">
          <h2 id="new-user-title" class="font-bold text-slate-900">Registrar nuevo usuario</h2>
          <button type="button" onclick="window.closeNewUserModal()" class="p-2 rounded-lg text-slate-400 hover:bg-slate-100" aria-label="Cerrar">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>
        <form novalidate onsubmit="window.saveNewUser(event)" class="p-5 space-y-4">
          <div>
            <label for="new-user-name" class="block text-xs font-semibold text-slate-700 mb-1">Nombre completo *</label>
            <input id="new-user-name" name="nombre" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label for="new-user-document" class="block text-xs font-semibold text-slate-700 mb-1">Documento *</label>
              <input id="new-user-document" name="documento" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
            </div>
            <div>
              <label for="new-user-email" class="block text-xs font-semibold text-slate-700 mb-1">Correo electrónico *</label>
              <input id="new-user-email" name="correo" type="email" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label for="new-user-phone" class="block text-xs font-semibold text-slate-700 mb-1">Teléfono</label>
              <input id="new-user-phone" name="telefono" type="tel" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
            </div>
            <div>
              <label for="new-user-role" class="block text-xs font-semibold text-slate-700 mb-1">Rol</label>
              <select id="new-user-role" name="rol" onchange="document.getElementById('new-user-farm-field').classList.toggle('hidden', this.value !== 'cliente'); document.getElementById('new-user-farm').required = this.value === 'cliente'" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <option value="operario">Operario</option>
                <option value="agronomo">Ingeniero agrónomo</option>
                <option value="tecnico">Técnico</option>
                <option value="cliente">Cliente</option>
                <option value="administrador">Administrador</option>
              </select>
            </div>
          </div>
          <div id="new-user-farm-field" class="hidden">
            <label for="new-user-farm" class="block text-xs font-semibold text-slate-700 mb-1">Finca asignada *</label>
            <select id="new-user-farm" name="fincaId" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">
              <option value="">Selecciona una finca</option>
              ${getFincas().map(finca => `<option value="${finca.id}">${finca.nombre}</option>`).join('')}
            </select>
          </div>
          <div class="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button type="button" onclick="window.closeNewUserModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl">Cancelar</button>
            <button type="submit" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl">Guardar usuario</button>
          </div>
        </form>
      </section>
    </div>
  `;
  if (window.lucide) window.lucide.createIcons();
};

window.closeNewUserModal = function() {
  const container = document.getElementById('admin-modal-container');
  if (container) container.innerHTML = '';
};

window.saveNewUser = function(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const invalidField = Array.from(form.elements).find(field =>
    field.willValidate && (
      !field.validity.valid ||
      (field.required && typeof field.value === 'string' && !field.value.trim())
    )
  );
  let feedback = form.querySelector('[data-form-feedback]');

  if (invalidField) {
    if (!feedback) {
      feedback = document.createElement('p');
      feedback.dataset.formFeedback = '';
      feedback.className = 'text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2';
      feedback.setAttribute('role', 'alert');
      form.prepend(feedback);
    }
    const label = invalidField.labels?.[0]?.textContent.trim().replace(/\s*\*$/, '');
    feedback.textContent = label ? `Revisa el campo "${label}".` : 'Revisa los campos obligatorios.';
    invalidField.focus();
    return;
  }

  const nombre = form.elements.nombre.value.trim();
  const documento = form.elements.documento.value.trim();
  const correo = form.elements.correo.value.trim();
  const telefono = form.elements.telefono.value.trim();
  const rol = form.elements.rol.value;
  const users = getUsers();
  if (users.some(user => user.documento === documento || user.correo?.toLowerCase() === correo.toLowerCase())) {
    if (!feedback) {
      feedback = document.createElement('p');
      feedback.dataset.formFeedback = '';
      feedback.className = 'text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2';
      feedback.setAttribute('role', 'alert');
      form.prepend(feedback);
    }
    feedback.textContent = 'Ya existe un usuario con ese documento o correo.';
    return;
  }
  users.push({
    id: 'usr-' + Date.now(),
    nombre,
    documento,
    correo,
    telefono: telefono || '3000000000',
    rol,
    ...(rol === 'cliente' ? { fincaId: form.elements.fincaId.value } : {}),
    estado: 'activo'
  });
  saveUsers(users);
  window.closeNewUserModal();
  renderUsers();
  window.showAdminToast('Registro exitoso. El usuario quedó creado correctamente.');
};

window.showAdminToast = function(message) {
  let toast = document.getElementById('admin-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'admin-toast';
    toast.className = 'fixed bottom-4 right-4 z-[60] max-w-sm rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-medium text-emerald-800 shadow-lg';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.append(toast);
  }
  toast.textContent = message;
  window.clearTimeout(toast.dismissTimer);
  toast.dismissTimer = window.setTimeout(() => toast.remove(), 3500);
};

window.toggleUserStatusAction = function(userId) {
  const users = getUsers();
  const user = users.find(u => u.id === userId);
  if (user) {
    user.estado = user.estado === 'activo' ? 'inactivo' : 'activo';
    saveUsers(users);
    renderUsers();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  renderUsers();
});
