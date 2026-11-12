// AgroControl SENA - Admin Module (JavaScript ES Module)

const initialUsers = [
  { id: 'usr-1', nombre: 'Carlos Mario Restrepo', documento: '1017123456', correo: 'carlos.restrepo@sena.edu.co', telefono: '3001234567', rol: 'administrador', estado: 'activo' },
  { id: 'usr-2', nombre: 'Juan Pérez Velásquez', documento: '71987654', correo: 'juan.perez@sena.edu.co', telefono: '3109876543', rol: 'tecnico', estado: 'activo' },
  { id: 'usr-3', nombre: 'María Fernanda Ruiz', documento: '1035456789', correo: 'maria.ruiz@sena.edu.co', telefono: '3204567890', rol: 'operario', estado: 'activo' },
  { id: 'usr-4', nombre: 'Pedro Nel Gómez', documento: '70112233', correo: 'pedro.gomez@sena.edu.co', telefono: '3157788990', rol: 'operario', estado: 'inactivo' }
];

function getUsers() {
  return JSON.parse(localStorage.getItem('sena_users')) || initialUsers;
}

function saveUsers(users) {
  localStorage.setItem('sena_users', JSON.stringify(users));
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
  const tbody = document.getElementById('user-table-body');
  if (!tbody) return;

  tbody.innerHTML = users.map(u => `
    <tr class="hover:bg-slate-50 transition-colors">
      <td class="px-4 py-3 font-bold text-slate-900">${u.nombre}</td>
      <td class="px-4 py-3 font-mono">${u.documento}</td>
      <td class="px-4 py-3">${u.correo}<br /><span class="text-slate-400">${u.telefono}</span></td>
      <td class="px-4 py-3">
        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
          u.rol === 'administrador' ? 'bg-purple-100 text-purple-800' :
          u.rol === 'tecnico' ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-700'
        }">${u.rol}</span>
      </td>
      <td class="px-4 py-3">
        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${
          u.estado === 'activo' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
        }">${u.estado}</span>
      </td>
      <td class="px-4 py-3 text-right space-x-2">
        <button onclick="window.toggleUserStatusAction('${u.id}')" class="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 text-[11px] font-semibold">
          Cambiar Estado
        </button>
      </td>
    </tr>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

window.openNewUserModal = function() {
  const nombre = prompt("Nombre completo del nuevo usuario:");
  const documento = prompt("Documento de identidad:");
  const correo = prompt("Correo electrónico:");
  const telefono = prompt("Teléfono de contacto:");
  const rol = prompt("Rol (administrador, tecnico, operario):", "operario");

  if (nombre && documento && correo) {
    const users = getUsers();
    users.push({
      id: 'usr-' + Date.now(),
      nombre,
      documento,
      correo,
      telefono: telefono || '3000000000',
      rol: ['administrador', 'tecnico', 'operario'].includes(rol) ? rol : 'operario',
      estado: 'activo'
    });
    saveUsers(users);
    renderUsers();
  }
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
