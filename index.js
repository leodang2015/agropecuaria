// AgroControl - Sistema Agropecuario y Gestión de Cultivos
// Basado en los Mockups Oficiales de AgroControl (Omar Dangond, Deyner Herrera, Hervis Castellano, Daniel Vesga)
import {
  getAuthErrorMessage,
  isFirebaseConfigured,
  loginWithGoogle,
  loginLocally,
  loginWithPassword,
  logoutFromFirebase,
  registerLocally,
  registerWithPassword,
  watchAuthState
} from './auth.js';

// Initial Data Seeds
const initialUsers = [
  { id: 'usr-1', nombre: 'Juan Díaz', documento: '1098765432', correo: 'juan.diaz@agrocontrol.io', telefono: '3128901234', rol: 'agronomo', estado: 'activo' },
  { id: 'usr-2', nombre: 'Carlos Mario Restrepo', documento: '1017123456', correo: 'carlos.restrepo@sena.edu.co', telefono: '3001234567', rol: 'administrador', estado: 'activo' },
  { id: 'usr-3', nombre: 'María Fernanda Ruiz', documento: '1035456789', correo: 'maria.ruiz@sena.edu.co', telefono: '3204567890', rol: 'operario', estado: 'activo' },
  { id: 'usr-4', nombre: 'Pedro Nel Gómez', documento: '70112233', correo: 'pedro.gomez@sena.edu.co', telefono: '3157788990', rol: 'operario', estado: 'inactivo' },
  { id: 'usr-tecnico-1', nombre: 'Juan Pérez Velásquez', documento: '71987654', correo: 'juan.perez@agrocontrol.io', telefono: '3109876543', rol: 'tecnico', estado: 'activo' },
  { id: 'usr-cliente-1', nombre: 'Cliente El Paraíso', documento: '9000000001', correo: 'cliente.paraiso@finca.com', telefono: '3204567890', rol: 'cliente', fincaId: 'ter-2', estado: 'activo' },
  { id: 'usr-cliente-2', nombre: 'Cliente San José', documento: '9000000002', correo: 'cliente.sanjose@finca.com', telefono: '3157788990', rol: 'cliente', fincaId: 'ter-4', estado: 'activo' }
];

function getClientFincaIds(user) {
  if (!user || user.rol !== 'cliente') return [];
  const fincaIds = Array.isArray(user.fincaIds) ? user.fincaIds : [];
  return [...new Set([...fincaIds, user.fincaId].filter(Boolean))];
}

const initialFincas = [
  {
    id: 'ter-1',
    nombre: 'Finca Las Palmas',
    ubicacion: 'Valle del Cauca, Colombia',
    areaTotal: 120,
    responsable: 'Ing. Juan Díaz',
    cultivosActivos: 12,
    sensoresActivos: 24,
    estado: 'Saludable',
    imagen: '/images/finca_palmas.jpg',
    descripcion: 'Finca insignia tecnificada con sistema de riego automatizado y telemetría IoT en tiempo real.'
  },
  {
    id: 'ter-2',
    nombre: 'Finca El Paraíso',
    ubicacion: 'Santander, Colombia',
    areaTotal: 85,
    responsable: 'Ing. Carlos Mario Restrepo',
    cultivosActivos: 6,
    sensoresActivos: 18,
    estado: 'Saludable',
    imagen: '/images/finca_paraiso.jpg',
    descripcion: 'Predio hortícola con módulos de invernadero tecnificado para tomate chonto y frutales.'
  },
  {
    id: 'ter-3',
    nombre: 'Finca La Esperanza',
    ubicacion: 'Antioquia, Colombia',
    areaTotal: 150,
    responsable: 'Dra. Elena Gómez Duque',
    cultivosActivos: 8,
    sensoresActivos: 32,
    estado: 'Monitoreo',
    imagen: '/images/finca_aerial_map.jpg',
    descripcion: 'Plantación cafetera tradicional en proceso de certificación de agricultura regenerativa.'
  },
  {
    id: 'ter-4',
    nombre: 'Finca San José',
    ubicacion: 'Tolima, Colombia',
    areaTotal: 62,
    responsable: 'Pedro Nel Gómez',
    cultivosActivos: 4,
    sensoresActivos: 14,
    estado: 'Estado: Alerta',
    imagen: '/images/finca_palmas.jpg',
    descripcion: 'Área agroforestal de cacao fino y plátano con déficit hídrico estacional bajo monitoreo.'
  },
  {
    id: 'ter-5',
    nombre: 'Finca Los Naranjos',
    ubicacion: 'Caldas, Colombia',
    areaTotal: 95,
    responsable: 'María Fernanda Ruiz',
    cultivosActivos: 5,
    sensoresActivos: 20,
    estado: 'Saludable',
    imagen: '/images/finca_paraiso.jpg',
    descripcion: 'Predio citricola y aguacate Hass con sistema de fertirriego por microaspersión.'
  }
];


const initialLotes = [
  // Finca Las Palmas (ter-1)
  {
    id: 'lot-p1',
    terrenoId: 'ter-1',
    identificador: 'Lote P1 - Cafetal Alto',
    cultivoNombre: 'Café Geisha',
    area: 35.0,
    estado: 'Saludable',
    humedadSuelo: 64,
    sensoresCount: 6,
    ultimaActualizacion: 'hoy 11:15',
    tipoSuelo: 'Franco-Arcilloso',
    color: '#22c55e',
    notas: 'Café especial de altura con microclima óptimo.',
    polygon: '130,220 290,190 330,280 170,320',
    labelPos: 'top-[44%] left-[24%]'
  },
  {
    id: 'lot-p2',
    terrenoId: 'ter-1',
    identificador: 'Lote P2 - Cítricos Valle',
    cultivoNombre: 'Naranja Valencia',
    area: 30.0,
    estado: 'Saludable',
    humedadSuelo: 59,
    sensoresCount: 5,
    ultimaActualizacion: 'hoy 10:50',
    tipoSuelo: 'Franco',
    color: '#22c55e',
    notas: 'Cítricos tecnificados con fertirriego por microaspersión.',
    polygon: '350,170 550,150 590,260 380,290',
    labelPos: 'top-[26%] left-[46%]'
  },
  {
    id: 'lot-p3',
    terrenoId: 'ter-1',
    identificador: 'Lote P3 - Platanera Sur',
    cultivoNombre: 'Plátano Hartón',
    area: 25.0,
    estado: 'Saludable',
    humedadSuelo: 68,
    sensoresCount: 5,
    ultimaActualizacion: 'hoy 09:40',
    tipoSuelo: 'Aluvial',
    color: '#22c55e',
    notas: 'Alta materia orgánica y drenaje natural.',
    polygon: '180,330 380,300 430,410 230,440',
    labelPos: 'top-[68%] left-[32%]'
  },
  {
    id: 'lot-p4',
    terrenoId: 'ter-1',
    identificador: 'Lote P4 - Aguacate Hass',
    cultivoNombre: 'Aguacate Hass',
    area: 30.0,
    estado: 'Monitoreo',
    humedadSuelo: 47,
    sensoresCount: 8,
    ultimaActualizacion: 'hoy 08:20',
    tipoSuelo: 'Franco-Arenoso',
    color: '#eab308',
    notas: 'Monitoreo de humedad radicular preventivo en ladera.',
    polygon: '560,150 720,140 760,260 610,280',
    labelPos: 'top-[22%] left-[68%]'
  },

  // Finca El Paraíso (ter-2 - Mockup Page 4)
  {
    id: 'lot-a',
    terrenoId: 'ter-2',
    identificador: 'Lote A',
    cultivoNombre: 'Café',
    area: 12.0,
    estado: 'Saludable',
    humedadSuelo: 62,
    sensoresCount: 6,
    ultimaActualizacion: 'hoy 10:45',
    tipoSuelo: 'Franco-Arcilloso',
    color: '#22c55e',
    notas: 'Excelente retención de humedad, microclima óptimo.',
    polygon: '140,240 280,210 320,290 180,330',
    labelPos: 'top-[48%] left-[24%]'
  },
  {
    id: 'lot-b',
    terrenoId: 'ter-2',
    identificador: 'Lote B',
    cultivoNombre: 'Tomate',
    area: 8.0,
    estado: 'Advertencia',
    humedadSuelo: 35,
    sensoresCount: 4,
    ultimaActualizacion: 'hoy 10:30',
    tipoSuelo: 'Franco',
    color: '#eab308',
    notas: 'Humedad por debajo del umbral mínimo del 40%. Se recomienda riego en 24h.',
    polygon: '340,180 540,160 590,270 370,300',
    labelPos: 'top-[28%] left-[45%]'
  },
  {
    id: 'lot-c',
    terrenoId: 'ter-2',
    identificador: 'Lote C',
    cultivoNombre: 'Maíz',
    area: 15.0,
    estado: 'Saludable',
    humedadSuelo: 58,
    sensoresCount: 5,
    ultimaActualizacion: 'hoy 09:15',
    tipoSuelo: 'Franco-Arenoso',
    color: '#22c55e',
    notas: 'Etapa vegetativa normal, sin estrés biótico detectado.',
    polygon: '190,340 370,310 420,410 240,440',
    labelPos: 'top-[68%] left-[34%]'
  },
  {
    id: 'lot-d',
    terrenoId: 'ter-2',
    identificador: 'Lote D',
    cultivoNombre: 'Cacao',
    area: 10.0,
    estado: 'Saludable',
    humedadSuelo: 60,
    sensoresCount: 4,
    ultimaActualizacion: 'hoy 08:30',
    tipoSuelo: 'Franco',
    color: '#22c55e',
    notas: 'Sombra semidensa eficiente y drenaje balanceado.',
    polygon: '550,150 710,140 750,260 600,280',
    labelPos: 'top-[22%] left-[66%]'
  },

  // Finca Los Naranjos (ter-5 - Caldas · Cítricos y Aguacate)
  {
    id: 'lot-n1',
    terrenoId: 'ter-5',
    identificador: 'Lote N1 - Cítricos Norte',
    cultivoNombre: 'Mandarina Oneco',
    area: 25.0,
    estado: 'Saludable',
    humedadSuelo: 61,
    sensoresCount: 6,
    ultimaActualizacion: 'hoy 10:20',
    tipoSuelo: 'Volcánico Franco',
    color: '#22c55e',
    notas: 'Cítricos de ladera con alta retención de nutrientes y buen drenaje.',
    polygon: '140,210 320,180 360,280 180,310',
    labelPos: 'top-[36%] left-[26%]'
  },
  {
    id: 'lot-n2',
    terrenoId: 'ter-5',
    identificador: 'Lote N2 - Naranja Valencia',
    cultivoNombre: 'Naranja Valencia',
    area: 30.0,
    estado: 'Saludable',
    humedadSuelo: 58,
    sensoresCount: 5,
    ultimaActualizacion: 'hoy 09:30',
    tipoSuelo: 'Franco',
    color: '#22c55e',
    notas: 'Riego por aspersión tecnificado funcionando en horario nocturno.',
    polygon: '350,160 560,150 600,260 380,280',
    labelPos: 'top-[25%] left-[47%]'
  },
  {
    id: 'lot-n3',
    terrenoId: 'ter-5',
    identificador: 'Lote N3 - Limón Tahití',
    cultivoNombre: 'Limón Tahití',
    area: 20.0,
    estado: 'Saludable',
    humedadSuelo: 64,
    sensoresCount: 4,
    ultimaActualizacion: 'hoy 08:50',
    tipoSuelo: 'Franco-Arcilloso',
    color: '#22c55e',
    notas: 'Lote certificado para exportación a mercado europeo.',
    polygon: '190,320 390,290 440,400 240,430',
    labelPos: 'top-[66%] left-[33%]'
  },
  {
    id: 'lot-n4',
    terrenoId: 'ter-5',
    identificador: 'Lote N4 - Aguacate Caldas',
    cultivoNombre: 'Aguacate Hass',
    area: 20.0,
    estado: 'Monitoreo',
    humedadSuelo: 52,
    sensoresCount: 5,
    ultimaActualizacion: 'hoy 08:15',
    tipoSuelo: 'Andisol Franco',
    color: '#eab308',
    notas: 'Control fitosanitario preventivo para trips y ácaros.',
    polygon: '570,160 740,150 770,270 610,290',
    labelPos: 'top-[25%] left-[70%]'
  },

  // Finca La Esperanza (ter-3 - Antioquia)
  {
    id: 'lot-e1',
    terrenoId: 'ter-3',
    identificador: 'Lote E1 - Cafetal Tradicional',
    cultivoNombre: 'Café Castillo',
    area: 60.0,
    estado: 'Monitoreo',
    humedadSuelo: 49,
    sensoresCount: 12,
    ultimaActualizacion: 'hoy 10:10',
    tipoSuelo: 'Franco-Arcilloso',
    color: '#eab308',
    notas: 'Pendiente pronunciada con sombrío regulado de guamo.',
    polygon: '140,200 340,170 380,290 190,320',
    labelPos: 'top-[36%] left-[27%]'
  },
  {
    id: 'lot-e2',
    terrenoId: 'ter-3',
    identificador: 'Lote E2 - Reserva Forestal',
    cultivoNombre: 'Bosque Protector',
    area: 45.0,
    estado: 'Saludable',
    humedadSuelo: 75,
    sensoresCount: 8,
    ultimaActualizacion: 'hoy 09:20',
    tipoSuelo: 'Orgánico',
    color: '#22c55e',
    notas: 'Zona de amortiguamiento y protección de fuentes hídricas.',
    polygon: '360,160 560,140 600,250 390,280',
    labelPos: 'top-[24%] left-[48%]'
  },
  {
    id: 'lot-e3',
    terrenoId: 'ter-3',
    identificador: 'Lote E3 - Maíz Ladera',
    cultivoNombre: 'Maíz Híbrido',
    area: 45.0,
    estado: 'Saludable',
    humedadSuelo: 56,
    sensoresCount: 12,
    ultimaActualizacion: 'hoy 08:40',
    tipoSuelo: 'Franco',
    color: '#22c55e',
    notas: 'Cultivo establecido en curvas a nivel para control de erosión.',
    polygon: '210,330 410,290 460,420 260,450',
    labelPos: 'top-[67%] left-[35%]'
  },

  // Finca San José (ter-4 - Tolima)
  {
    id: 'lot-s1',
    terrenoId: 'ter-4',
    identificador: 'Lote S1 - Cacaotal Bajo',
    cultivoNombre: 'Cacao Fino',
    area: 22.0,
    estado: 'Estado: Alerta',
    humedadSuelo: 29,
    sensoresCount: 5,
    ultimaActualizacion: 'hoy 10:05',
    tipoSuelo: 'Franco-Arenoso',
    color: '#ef4444',
    notas: 'Alerta por déficit hídrico prolongado y temperatura elevada.',
    polygon: '150,210 340,180 390,290 200,320',
    labelPos: 'top-[38%] left-[28%]'
  },
  {
    id: 'lot-s2',
    terrenoId: 'ter-4',
    identificador: 'Lote S2 - Platanal San José',
    cultivoNombre: 'Plátano Dominico',
    area: 20.0,
    estado: 'Advertencia',
    humedadSuelo: 38,
    sensoresCount: 4,
    ultimaActualizacion: 'hoy 09:10',
    tipoSuelo: 'Franco',
    color: '#eab308',
    notas: 'Riego de auxilio programado para las próximas 12 horas.',
    polygon: '360,170 560,150 610,260 400,280',
    labelPos: 'top-[26%] left-[49%]'
  },
  {
    id: 'lot-s3',
    terrenoId: 'ter-4',
    identificador: 'Lote S3 - Frutales de Secano',
    cultivoNombre: 'Mango Tommy',
    area: 20.0,
    estado: 'Saludable',
    humedadSuelo: 55,
    sensoresCount: 5,
    ultimaActualizacion: 'hoy 08:30',
    tipoSuelo: 'Franco',
    color: '#22c55e',
    notas: 'Excelente cuajado de floración y resistencia al calor.',
    polygon: '220,330 420,300 470,420 270,450',
    labelPos: 'top-[68%] left-[36%]'
  }
];


const initialCultivos = [
  {
    id: 'cul-tomate',
    terrenoId: 'ter-2',
    fincaNombre: 'Finca El Paraíso',
    loteId: 'lot-b',
    loteNombre: 'Lote B',
    nombre: 'Tomate',
    tipoCultivo: 'Hortaliza',
    variedad: 'Chonto Santa Cruz',
    fechaSiembra: '2024-08-02',
    fechaCosechaEstimada: '2024-10-25',
    areaSembrada: 8.0,
    densidadPlantas: 24000,
    etapaCrecimiento: 'Desarrollo',
    estado: 'Advertencia',
    humedad: 35,
    temperatura: '28°C / 24°C',
    radiacion: '720 W/m²',
    ph: 6.2,
    notas: 'Monitoreo de riego prioritario por sensor en 35%.'
  },
  {
    id: 'cul-cafe',
    terrenoId: 'ter-1',
    fincaNombre: 'Finca Las Palmas',
    loteId: 'lot-a',
    loteNombre: 'Lote A',
    nombre: 'Café',
    tipoCultivo: 'Perenne',
    variedad: 'Castillo Tambo',
    fechaSiembra: '2024-05-15',
    fechaCosechaEstimada: '2024-10-10',
    areaSembrada: 12.0,
    densidadPlantas: 54000,
    etapaCrecimiento: 'Producción',
    estado: 'Saludable',
    humedad: 62,
    temperatura: '24°C / 20°C',
    radiacion: '610 W/m²',
    ph: 5.9,
    notas: 'Grano en maduración homogénea con alta carga.'
  },
  {
    id: 'cul-maiz',
    terrenoId: 'ter-3',
    fincaNombre: 'Finca La Esperanza',
    loteId: 'lot-c',
    loteNombre: 'Lote C',
    nombre: 'Maíz',
    tipoCultivo: 'Cereal',
    variedad: 'Pioneer Híbrido 30F35',
    fechaSiembra: '2024-07-20',
    fechaCosechaEstimada: '2024-12-25',
    areaSembrada: 15.0,
    densidadPlantas: 75000,
    etapaCrecimiento: 'Desarrollo',
    estado: 'Saludable',
    humedad: 58,
    temperatura: '26°C / 22°C',
    radiacion: '680 W/m²',
    ph: 6.4,
    notas: 'Floración proyectada en dos semanas.'
  },
  {
    id: 'cul-cacao',
    terrenoId: 'ter-1',
    fincaNombre: 'Finca Las Palmas',
    loteId: 'lot-d',
    loteNombre: 'Lote D',
    nombre: 'Cacao',
    tipoCultivo: 'Perenne',
    variedad: 'CCN-51 / TSH 565',
    fechaSiembra: '2024-07-10',
    fechaCosechaEstimada: '2024-12-20',
    areaSembrada: 10.0,
    densidadPlantas: 11000,
    etapaCrecimiento: 'Mantenimiento',
    estado: 'Saludable',
    humedad: 60,
    temperatura: '27°C / 23°C',
    radiacion: '590 W/m²',
    ph: 6.0,
    notas: 'Poda fitosanitaria completada exitosamente.'
  },
  {
    id: 'cul-papa',
    terrenoId: 'ter-2',
    fincaNombre: 'Finca El Paraíso',
    loteId: 'lot-e',
    loteNombre: 'Lote E',
    nombre: 'Papa',
    tipoCultivo: 'Tubérculo',
    variedad: 'Criolla Colombia',
    fechaSiembra: '2024-09-01',
    fechaCosechaEstimada: '2024-11-30',
    areaSembrada: 6.0,
    densidadPlantas: 22000,
    etapaCrecimiento: 'Vegetativa',
    estado: 'Crítico',
    humedad: 28,
    temperatura: '19°C / 14°C',
    radiacion: '740 W/m²',
    ph: 5.4,
    notas: 'Alerta de déficit hídrico agudo en suelo arenoso.'
  }
];

const initialSensores = [
  { id: 'sens-1', codigo: 'SEN-S01', tipo: 'Humedad de Suelo', lote: 'Lote B (Tomate)', loteId: 'lot-b', terrenoId: 'ter-2', valor: '35%', estado: 'Advertencia', bateria: 92, senal: 'Fuerte (-68 dBm)' },
  { id: 'sens-2', codigo: 'SEN-T01', tipo: 'Temperatura Suelo', lote: 'Lote B (Tomate)', loteId: 'lot-b', terrenoId: 'ter-2', valor: '24°C', estado: 'Normal', bateria: 95, senal: 'Fuerte (-65 dBm)' },
  { id: 'sens-3', codigo: 'SEN-R01', tipo: 'Radiación Solar', lote: 'Lote B (Tomate)', loteId: 'lot-b', terrenoId: 'ter-2', valor: '720 W/m²', estado: 'Normal', bateria: 88, senal: 'Excelente (-58 dBm)' },
  { id: 'sens-4', codigo: 'SEN-P01', tipo: 'pH y Conductividad', lote: 'Lote B (Tomate)', loteId: 'lot-b', terrenoId: 'ter-2', valor: '6.2 pH', estado: 'Normal', bateria: 90, senal: 'Fuerte (-70 dBm)' },
  { id: 'sens-5', codigo: 'SEN-S02', tipo: 'Humedad de Suelo', lote: 'Lote A (Café)', loteId: 'lot-a', terrenoId: 'ter-1', valor: '62%', estado: 'Saludable', bateria: 97, senal: 'Excelente (-52 dBm)' },
  { id: 'sens-6', codigo: 'SEN-C01', tipo: 'Estación Meteorológica', lote: 'Central Palmas', terrenoId: 'ter-1', valor: '68% Hum / 8 km/h', estado: 'Saludable', bateria: 100, senal: 'Excelente (-48 dBm)' }
];

const initialAlertas = [
  { id: 'alt-1', severidad: 'Advertencia', titulo: 'Baja humedad del suelo en Lote B', detalle: 'Humedad al 35% en cultivo de Tomate. Riego recomendado en las próximas 24 horas.', fecha: 'Hoy 08:30', lote: 'Lote B', loteId: 'lot-b', terrenoId: 'ter-2' },
  { id: 'alt-2', severidad: 'Advertencia', titulo: 'Monitoreo diario sugerido', detalle: 'Variación térmica nocturna superior a 6°C en Lote B.', fecha: 'Ayer 22:15', lote: 'Lote B', loteId: 'lot-b', terrenoId: 'ter-2' },
  { id: 'alt-3', severidad: 'Info', titulo: 'Mantenimiento de Sensores', detalle: 'Calibración trimestral completada en Lote A y Estación Central.', fecha: 'Hace 2 días', lote: 'Central', loteId: 'lot-a', terrenoId: 'ter-1' }
];

const initialActividades = [
  { id: 'act-1', cultivoId: 'cul-tomate', loteId: 'lot-b', terrenoId: 'ter-2', tipoActividad: 'Riego aplicado', descripcion: 'Riego por goteo con electrobomba automatizada', fecha: 'Hoy 08:15', responsable: 'Juan Díaz', estado: 'realizada' },
  { id: 'act-2', cultivoId: 'cul-tomate', loteId: 'lot-b', terrenoId: 'ter-2', tipoActividad: 'Fertilización', descripcion: 'Fertilización foliar balanceada con micronutrientes', fecha: 'Ayer 14:30', responsable: 'María Ruiz', estado: 'realizada' },
  { id: 'act-3', cultivoId: 'cul-tomate', loteId: 'lot-b', terrenoId: 'ter-2', tipoActividad: 'Inspección visual', descripcion: 'Monitoreo de vigor vegetativo y sensores', fecha: '3 días atrás', responsable: 'Juan Díaz', estado: 'realizada' },
  { id: 'act-4', cultivoId: 'cul-cafe', loteId: 'lot-a', terrenoId: 'ter-1', tipoActividad: 'Muestreo de Plagas', descripcion: 'Control focalizado de broca y roya', fecha: '4 días atrás', responsable: 'Carlos Restrepo', estado: 'realizada' }
];

const initialQuejas = [
  { id: 'queja-1', clienteId: 'usr-cliente-1', cliente: 'María Fernanda Ruiz', fincaId: 'ter-2', asunto: 'Baja presión en el sistema de riego', descripcion: 'El riego por goteo del Lote B tiene poca presión desde esta mañana.', fecha: 'Hoy 09:20', estado: 'Pendiente' },
  { id: 'queja-2', clienteId: 'usr-cliente-2', cliente: 'Pedro Nel Gómez', fincaId: 'ter-4', asunto: 'Revisión de sensor de humedad', descripcion: 'El sensor del lote de cacao muestra la misma lectura desde ayer.', fecha: 'Ayer 16:40', estado: 'En revisión' }
];

const initialProduccion = [
  { id: 'prod-1', cultivoId: 'cul-cafe', loteId: 'lot-a', terrenoId: 'ter-1', cantidad: 3400, unidadMedida: 'Kg', fechaCosecha: '2024-05-02', calidad: 'Alta (Primera / Exportación)', compradorDestino: 'Cooperativa de Caficultores', rendimientoHa: 283.3 },
  { id: 'prod-2', cultivoId: 'cul-tomate', loteId: 'lot-b', terrenoId: 'ter-2', cantidad: 12000, unidadMedida: 'Kg', fechaCosecha: '2024-05-18', calidad: 'Alta (Primera / Exportación)', compradorDestino: 'Cadena de Supermercados Nacional', rendimientoHa: 1500.0 }
];

// App State Manager
class StateManager {
  constructor() {
    let savedUsers = [];
    try {
      savedUsers = JSON.parse(localStorage.getItem('agro_users')) || [];
    } catch (e) {
      savedUsers = [];
    }

    if (!Array.isArray(savedUsers) || savedUsers.length === 0) {
      savedUsers = [...initialUsers];
    } else {
      initialUsers.forEach(initU => {
        if (!savedUsers.some(u => u.documento === initU.documento || (u.correo && u.correo.toLowerCase() === initU.correo.toLowerCase()))) {
          savedUsers.push(initU);
        }
      });
    }
    localStorage.setItem('agro_users', JSON.stringify(savedUsers));
    this.users = savedUsers;

    this.currentUser = null;
    this.firebaseUserUid = null;
    localStorage.removeItem('agro_session');

    let savedFincas = [];
    try {
      savedFincas = JSON.parse(localStorage.getItem('agro_fincas')) || [];
    } catch (e) {
      savedFincas = [];
    }

    if (!Array.isArray(savedFincas) || savedFincas.length === 0) {
      this.fincas = [...initialFincas];
    } else {
      // Auto-migrate any old paths stored in browser localStorage
      this.fincas = savedFincas.map(f => {
        if (!f.imagen || f.imagen.includes('/src/assets/images/')) {
          if (f.id === 'ter-1' || f.id === 'ter-4') f.imagen = '/images/finca_palmas.jpg';
          else if (f.id === 'ter-2' || f.id === 'ter-5') f.imagen = '/images/finca_paraiso.jpg';
          else f.imagen = '/images/finca_aerial_map.jpg';
        }
        return f;
      });
    }
    this.terrenos = this.fincas; // Backwards compatible alias

    // Merge saved lotes with initialLotes to ensure lotes for all fincas (ter-1 through ter-5) are populated
    const savedLotes = JSON.parse(localStorage.getItem('agro_lotes')) || [];
    const lotesMap = new Map();
    initialLotes.forEach(l => lotesMap.set(l.id, l));
    savedLotes.forEach(l => {
      const existing = lotesMap.get(l.id) || {};
      lotesMap.set(l.id, { ...existing, ...l });
    });
    this.lotes = Array.from(lotesMap.values());

    this.cultivos = JSON.parse(localStorage.getItem('agro_cultivos')) || initialCultivos;
    this.sensores = JSON.parse(localStorage.getItem('agro_sensores')) || initialSensores;
    this.alertas = JSON.parse(localStorage.getItem('agro_alertas')) || initialAlertas;
    this.actividades = JSON.parse(localStorage.getItem('agro_actividades')) || initialActividades;
    this.produccion = JSON.parse(localStorage.getItem('agro_produccion')) || initialProduccion;
    this.quejas = JSON.parse(localStorage.getItem('agro_quejas')) || initialQuejas;
    this.bitacoraAudit = JSON.parse(localStorage.getItem('agro_audit')) || [];

    const savedSelectedFincaId = localStorage.getItem('agro_selected_finca');
    const clientFincaIds = getClientFincaIds(this.currentUser);
    this.selectedFincaId = this.currentRole === 'cliente'
      ? (clientFincaIds.includes(savedSelectedFincaId) ? savedSelectedFincaId : clientFincaIds[0])
      : savedSelectedFincaId || 'ter-1';
    const fincaLotes = this.getLotesForFinca(this.selectedFincaId);
    this.selectedLoteId = (fincaLotes[0] && fincaLotes[0].id) || 'lot-p1';
    this.selectedCultivoId = 'cul-tomate';
    this.activeView = 'dashboard';
    this.searchQuery = '';
    this.fincasViewMode = 'tarjetas'; // 'tarjetas' | 'lista'
    this.lotesViewMode = 'mapa'; // 'mapa' | 'lista'
    this.loteEstadoFilter = '';
    this.loteCultivoFilter = '';
  }

  get currentRole() {
    return this.currentUser ? this.currentUser.rol : 'agronomo';
  }

  get activeFinca() {
    if (this.currentRole === 'cliente') {
      const fincaIds = getClientFincaIds(this.currentUser);
      return this.fincas.find(f => f.id === this.selectedFincaId && fincaIds.includes(f.id))
        || this.fincas.find(f => fincaIds.includes(f.id));
    }
    return this.fincas.find(f => f.id === this.selectedFincaId) || this.fincas[0];
  }

  getLotesForFinca(fincaId) {
    const targetId = fincaId || this.selectedFincaId;
    const filtered = this.lotes.filter(l => l.terrenoId === targetId);
    return filtered.length > 0 ? filtered : initialLotes.filter(l => l.terrenoId === targetId);
  }

  addAuditLog(modulo, accion, detalle) {
    const newLog = {
      id: 'audit-' + Date.now(),
      fecha: new Date().toISOString().replace('T', ' ').substring(0, 19),
      usuario: this.currentUser ? this.currentUser.nombre : 'Sistema',
      modulo,
      accion,
      detalle
    };
    this.bitacoraAudit.unshift(newLog);
    if (this.bitacoraAudit.length > 100) this.bitacoraAudit.pop();
    localStorage.setItem('agro_audit', JSON.stringify(this.bitacoraAudit));
  }

  save() {
    localStorage.setItem('agro_fincas', JSON.stringify(this.fincas));
    localStorage.setItem('agro_lotes', JSON.stringify(this.lotes));
    localStorage.setItem('agro_cultivos', JSON.stringify(this.cultivos));
    localStorage.setItem('agro_sensores', JSON.stringify(this.sensores));
    localStorage.setItem('agro_alertas', JSON.stringify(this.alertas));
    localStorage.setItem('agro_actividades', JSON.stringify(this.actividades));
    localStorage.setItem('agro_produccion', JSON.stringify(this.produccion));
    localStorage.setItem('agro_quejas', JSON.stringify(this.quejas));
    localStorage.setItem('agro_users', JSON.stringify(this.users));
    localStorage.setItem('agro_selected_finca', this.selectedFincaId);
  }

  login(identifier) {
    const cleanId = (identifier || '').toString().trim().toLowerCase();
    let foundUser = this.users.find(u =>
      (u.correo && u.correo.toLowerCase() === cleanId) ||
      (u.documento && u.documento.toString().toLowerCase() === cleanId) ||
      (u.nombre && u.nombre.toLowerCase().includes(cleanId))
    );

    if (!foundUser && cleanId.length === 0) {
      foundUser = this.users[0]; // Juan Díaz default
    }

    if (!foundUser) {
      return { success: false, message: 'Usuario no registrado. Use juan.diaz@agrocontrol.io o carlos.restrepo@sena.edu.co' };
    }

    this.currentUser = foundUser;
    this.activeView = 'dashboard';
    this.loteEstadoFilter = '';
    this.loteCultivoFilter = '';
    if (foundUser.rol === 'cliente') {
      const fincaIds = getClientFincaIds(foundUser);
      if (!fincaIds.includes(this.selectedFincaId)) this.selectedFincaId = fincaIds[0];
      const fincaLotes = this.getLotesForFinca(this.selectedFincaId);
      this.selectedLoteId = fincaLotes[0]?.id || '';
    }
    localStorage.setItem('agro_session', JSON.stringify(foundUser));
    this.save();
    this.addAuditLog('Autenticación', 'Inicio de Sesión', `Usuario ${foundUser.nombre} ingresó a AgroControl.`);
    return { success: true, user: foundUser };
  }

  setAuthenticatedUser(authUser, provider) {
    const email = (authUser.email || '').trim().toLowerCase();
    let user = this.users.find(existing => existing.authUid === authUser.uid);

    if (!user) {
      user = {
        id: authUser.uid,
        authUid: authUser.uid,
        authProvider: provider,
        nombre: authUser.displayName || email.split('@')[0],
        documento: '',
        correo: email,
        telefono: '',
        rol: 'cliente',
        estado: 'activo'
      };
      this.users.push(user);
    }

    user.authProvider = provider;
    user.nombre = authUser.displayName || user.nombre || email.split('@')[0];
    user.correo = email;
    this.currentUser = user;
    this.firebaseUserUid = provider === 'firebase' ? authUser.uid : null;
    this.activeView = 'dashboard';
    if (user.rol === 'cliente') {
      const fincaIds = getClientFincaIds(user);
      if (!fincaIds.includes(this.selectedFincaId)) this.selectedFincaId = fincaIds[0] || '';
      this.selectedLoteId = this.getLotesForFinca(this.selectedFincaId)[0]?.id || '';
    }
    localStorage.setItem('agro_session', JSON.stringify(user));
    this.save();
    return user;
  }

  logout() {
    this.currentUser = null;
    this.firebaseUserUid = null;
    localStorage.removeItem('agro_session');
  }
}

const state = new StateManager();

function getRecordFincaId(record) {
  const lotReferences = [record.loteId, record.lote, record.loteNombre].filter(Boolean);
  for (const lotReference of lotReferences) {
    const normalizedReference = String(lotReference).toLowerCase();
    const lot = state.lotes.find(item =>
      item.id === lotReference ||
      normalizedReference === item.identificador.toLowerCase() ||
      normalizedReference.startsWith(`${item.identificador.toLowerCase()} (`)
    );
    if (lot) return lot.terrenoId;
  }
  return record.terrenoId || record.fincaId || '';
}

function getVisibleRecords(records) {
  if (state.currentRole !== 'cliente') return records;
  return getRecordsForFinca(records, canClientAccessFinca(state.selectedFincaId) ? state.selectedFincaId : '');
}

function getRecordsForFinca(records, fincaId) {
  if (!fincaId) return [];
  return records.filter(record => getRecordFincaId(record) === fincaId);
}

function getFarmCropNames(fincaId) {
  return [...new Set(getRecordsForFinca(state.cultivos, fincaId)
    .map(cultivo => String(cultivo.nombre || '').trim())
    .filter(Boolean))];
}

function getFarmMainProduct(finca) {
  const cropNames = getFarmCropNames(finca.id);
  return cropNames.includes(finca.productoPrincipal) ? finca.productoPrincipal : '';
}

function canClientAccessFinca(fincaId) {
  return state.currentRole !== 'cliente' || getClientFincaIds(state.currentUser).includes(fincaId);
}

function getVisibleFincas() {
  return state.currentRole === 'cliente'
    ? state.fincas.filter(finca => getClientFincaIds(state.currentUser).includes(finca.id))
    : state.fincas;
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function validateForm(event) {
  const form = event.currentTarget;
  const invalidField = Array.from(form.elements).find(field =>
    field.willValidate && (
      !field.validity.valid ||
      (field.required && typeof field.value === 'string' && !field.value.trim())
    )
  );
  let feedback = form.querySelector('[data-form-feedback]');

  if (!feedback) {
    feedback = document.createElement('p');
    feedback.dataset.formFeedback = '';
    feedback.className = 'text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2';
    feedback.setAttribute('role', 'alert');
    form.prepend(feedback);
  }

  if (invalidField) {
    const label = invalidField.labels?.[0]?.textContent.trim().replace(/\s*\*$/, '');
    feedback.textContent = label ? `Revisa el campo "${label}".` : 'Revisa los campos obligatorios.';
    invalidField.focus();
    return false;
  }

  feedback.remove();
  return true;
}

// Global Window Helpers & Interactions
window.handleFincaChange = function(fincaId) {
  if (!canClientAccessFinca(fincaId)) return;
  state.selectedFincaId = fincaId;
  state.loteEstadoFilter = '';
  state.loteCultivoFilter = '';
  const fincaLotes = state.getLotesForFinca(fincaId);
  if (fincaLotes.length > 0) {
    state.selectedLoteId = fincaLotes[0].id;
  }
  state.save();
  renderHeader();
  renderCurrentView();
};

window.handleGlobalSearch = function(query) {
  state.searchQuery = (query || '').toLowerCase().trim();
  renderGlobalSearchResults();
};

window.openGlobalSearchResult = function(type, id) {
  const searchInput = document.getElementById('topbar-search-input');
  if (searchInput) searchInput.value = '';
  state.searchQuery = '';
  const results = document.getElementById('global-search-results');
  if (results) results.innerHTML = '';

  if (type === 'finca') {
    window.handleFincaChange(id);
    window.switchView('fincas');
  } else if (type === 'lote') {
    const lote = state.lotes.find(item => item.id === id);
    if (!lote || !canClientAccessFinca(lote.terrenoId)) return;
    state.selectedFincaId = lote.terrenoId;
    state.selectedLoteId = lote.id;
    state.save();
    renderHeader();
    window.switchView('terrenos');
  } else if (type === 'cultivo') {
    window.switchView('ficha_cultivo', id);
  } else if (type === 'sensor') {
    window.switchView('sensores');
  }
};

function renderGlobalSearchResults() {
  const container = document.getElementById('global-search-results');
  if (!container) return;
  const query = state.searchQuery;
  if (!query) {
    container.innerHTML = '';
    return;
  }

  const searchableItems = [
    ...getVisibleFincas()
      .map(item => ({ type: 'finca', id: item.id, label: item.nombre, detail: item.ubicacion, icon: 'home' })),
    ...getVisibleRecords(state.lotes)
      .map(item => ({ type: 'lote', id: item.id, label: item.identificador, detail: item.cultivoNombre, icon: 'map' })),
    ...getVisibleRecords(state.cultivos)
      .map(item => ({ type: 'cultivo', id: item.id, label: item.nombre, detail: item.tipoCultivo, icon: 'sprout' })),
    ...getVisibleRecords(state.sensores).map(item => ({ type: 'sensor', id: item.id, label: item.codigo, detail: `${item.tipo} · ${item.lote}`, icon: 'cpu' }))
  ];
  const matches = searchableItems.filter(item =>
    `${item.label} ${item.detail}`.toLowerCase().includes(query)
  ).slice(0, 6);

  container.innerHTML = matches.length
    ? matches.map(item => `
      <button type="button" onclick="window.openGlobalSearchResult('${item.type}', '${item.id}')" class="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-emerald-50">
        <i data-lucide="${item.icon}" class="w-4 h-4 text-emerald-700 shrink-0"></i>
        <span class="min-w-0">
          <span class="block text-xs font-semibold text-slate-800 truncate">${escapeHtml(item.label)}</span>
          <span class="block text-[10px] text-slate-500 truncate">${escapeHtml(item.detail)}</span>
        </span>
      </button>
    `).join('')
    : '<p class="px-3 py-3 text-xs text-slate-500" role="status">No se encontraron resultados para esta búsqueda.</p>';
  if (window.lucide) window.lucide.createIcons();
}

window.showToast = function(message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'fixed bottom-4 right-4 z-[60] max-w-sm rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-medium text-emerald-800 shadow-lg';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.append(toast);
  }
  toast.textContent = message;
  toast.classList.remove('hidden');
  window.clearTimeout(toast.dismissTimer);
  toast.dismissTimer = window.setTimeout(() => toast.classList.add('hidden'), 3500);
};

window.switchView = function(viewId, param = null) {
  const clientViews = ['dashboard', 'fincas', 'terrenos', 'cultivos', 'ficha_cultivo', 'sensores', 'clima', 'alertas', 'actividades', 'produccion', 'quejas'];
  if (state.currentRole === 'cliente' && !clientViews.includes(viewId)) return;
  if (state.currentRole === 'cliente' && viewId === 'ficha_cultivo' && param &&
      !getVisibleRecords(state.cultivos).some(cultivo => cultivo.id === param)) return;
  state.activeView = viewId;
  if (viewId === 'ficha_cultivo' && param) {
    state.selectedCultivoId = param;
  }
  initNavigation();
  renderCurrentView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.selectLote = function(loteId) {
  state.selectedLoteId = loteId;
  renderCurrentView();
};

window.setFincasViewMode = function(mode) {
  state.fincasViewMode = mode;
  renderCurrentView();
};

window.setLotesViewMode = function(mode) {
  state.lotesViewMode = mode;
  renderCurrentView();
};

window.setLoteFilters = function(status, crop) {
  state.loteEstadoFilter = status;
  state.loteCultivoFilter = crop;
  renderCurrentView();
};

window.openComplaintModal = function() {
  if (state.currentRole !== 'cliente') return;
  const container = document.getElementById('modal-container');
  if (!container) return;
  const bodyHTML = `
    <form novalidate onsubmit="window.submitComplaint(event)" class="space-y-4">
      ${renderFarmNameField('complaint-finca')}
      <div>
        <label for="complaint-subject" class="block text-xs font-semibold text-slate-700 mb-1">Asunto *</label>
        <input id="complaint-subject" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" placeholder="Describe brevemente el problema" />
      </div>
      <div>
        <label for="complaint-description" class="block text-xs font-semibold text-slate-700 mb-1">Detalle *</label>
        <textarea id="complaint-description" required minlength="10" rows="4" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" placeholder="Cuéntanos qué sucede en tu finca"></textarea>
      </div>
      <div class="flex justify-end gap-2 pt-3 border-t border-slate-100">
        <button type="button" onclick="window.closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl">Cancelar</button>
        <button type="submit" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white font-semibold text-xs rounded-xl">Enviar solicitud</button>
      </div>
    </form>
  `;
  container.innerHTML = renderModalWrapper('Nueva solicitud de soporte', 'message-square', bodyHTML);
  if (window.lucide) window.lucide.createIcons();
};

window.openClientProductModal = function() {
  if (state.currentRole !== 'cliente') return;
  const finca = state.activeFinca;
  if (!finca) {
    window.showToast('No se encontró la finca asociada a tu cuenta.');
    return;
  }
  const cropNames = getFarmCropNames(finca.id);
  const currentProduct = getFarmMainProduct(finca);
  const bodyHTML = `
    <form novalidate onsubmit="window.saveClientProductSubmit(event)" class="space-y-4">
      ${renderFarmNameField('client-product-finca', finca.nombre)}
      <div>
        <label for="client-product-name" class="block text-xs font-semibold text-slate-700 mb-1">Producto principal *</label>
        <select id="client-product-name" name="producto" required ${cropNames.length ? '' : 'disabled'} class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">
          <option value="">${cropNames.length ? 'Selecciona un cultivo' : 'No hay cultivos registrados en esta finca'}</option>
          ${cropNames.map(cropName => `<option value="${escapeHtml(cropName)}" ${cropName === currentProduct ? 'selected' : ''}>${escapeHtml(cropName)}</option>`).join('')}
        </select>
        ${cropNames.length ? '' : '<p class="text-[11px] text-amber-700 mt-1" role="status">Primero deben registrar cultivos en esta finca.</p>'}
      </div>
      <div class="flex justify-end gap-2 pt-3 border-t border-slate-100">
        <button type="button" onclick="window.closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl">Cancelar</button>
        <button type="submit" ${cropNames.length ? '' : 'disabled'} class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white font-semibold text-xs rounded-xl disabled:opacity-50 disabled:cursor-not-allowed">Guardar producto</button>
      </div>
    </form>
  `;
  openRegistrationModal('Producto principal de mi finca', 'sprout', bodyHTML);
};

window.saveClientProductSubmit = function(event) {
  event.preventDefault();
  if (state.currentRole !== 'cliente') return;
  const finca = state.fincas.find(item => item.id === state.selectedFincaId && canClientAccessFinca(item.id));
  if (!finca) {
    window.showToast('No se encontró la finca asociada a tu cuenta.');
    return;
  }
  const product = event.currentTarget.elements.producto.value;
  if (!getFarmCropNames(finca.id).includes(product)) {
    window.showToast('Selecciona un cultivo registrado en esta finca.');
    return;
  }
  if (!validateForm(event)) return;
  finca.productoPrincipal = product;
  state.save();
  window.closeModal();
  renderCurrentView();
  window.showToast('Producto principal actualizado correctamente.');
};

window.submitComplaint = function(event) {
  event.preventDefault();
  if (state.currentRole !== 'cliente') return;
  if (!validateForm(event)) return;
  const finca = state.activeFinca;
  if (!finca || !state.currentUser) return;
  state.quejas.unshift({
    id: 'queja-' + Date.now(),
    clienteId: state.currentUser.id,
    cliente: state.currentUser.nombre,
    fincaId: finca.id,
    fincaNombre: finca.nombre,
    asunto: document.getElementById('complaint-subject').value.trim(),
    descripcion: document.getElementById('complaint-description').value.trim(),
    fecha: new Date().toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' }),
    estado: 'Pendiente'
  });
  state.save();
  window.closeModal();
  renderCurrentView();
  initNavigation();
  window.showToast('Solicitud enviada correctamente.');
};

window.updateComplaintStatus = function(complaintId, status) {
  if (state.currentRole === 'cliente') return;
  const complaint = state.quejas.find(item => item.id === complaintId);
  if (!complaint) return;
  complaint.estado = status;
  state.save();
  renderCurrentView();
  initNavigation();
  window.showToast(status === 'Resuelta' ? 'Queja marcada como resuelta.' : 'Queja tomada para revisión.');
};

window.handleLogout = async function() {
  try {
    if (state.firebaseUserUid) await logoutFromFirebase();
    state.logout();
    updateUIState();
  } catch (error) {
    window.showToast(getAuthErrorMessage(error));
  }
};

window.quickLogin = function(email) {
  const res = state.login(email);
  if (res.success) updateUIState();
};

window.closeModal = function() {
  const container = document.getElementById('modal-container');
  if (container) container.innerHTML = '';
};

// Update Topbar and Layout
function renderHeader() {
  const container = document.getElementById('header-user-controls');
  const fincaSelect = document.getElementById('topbar-finca-select');

  if (fincaSelect) {
    const availableFincas = state.currentRole === 'cliente'
      ? getVisibleFincas()
      : state.fincas;
    fincaSelect.innerHTML = availableFincas.map(f => `
      <option value="${f.id}" ${f.id === state.selectedFincaId ? 'selected' : ''}>
        ${escapeHtml(f.nombre)}
      </option>
    `).join('');
    fincaSelect.value = state.selectedFincaId;
  }

  if (!container) return;

  if (state.currentUser) {
    const initials = state.currentUser.nombre
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    container.innerHTML = `
      <div class="flex items-center gap-3">
        <!-- Notification Bell with Active Badge -->
        <button onclick="window.switchView('alertas')" class="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors" title="${getVisibleRecords(state.alertas).length} alertas activas">
          <i data-lucide="bell" class="w-5 h-5"></i>
          <span class="absolute top-1.5 right-1.5 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none ring-2 ring-white">
            ${getVisibleRecords(state.alertas).length}
          </span>
        </button>

        <!-- User Profile Pill -->
        <div class="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div class="w-8 h-8 rounded-full bg-[#1B794B] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            ${escapeHtml(initials)}
          </div>
          <div class="hidden sm:block text-left">
            <p class="text-xs font-bold text-slate-900 leading-tight">${escapeHtml(state.currentUser.nombre)}</p>
            <p class="text-[10px] text-slate-500 capitalize">${state.currentUser.rol}</p>
          </div>
          <button onclick="window.handleLogout()" title="Cerrar Sesión" class="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors ml-1">
            <i data-lucide="log-out" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <button onclick="window.quickLogin('juan.diaz@agrocontrol.io')" class="px-3 py-1.5 bg-[#1B794B] hover:bg-[#166534] text-white text-xs font-semibold rounded-xl shadow-xs transition-all">
        Ingresar a AgroControl
      </button>
    `;
  }

  if (window.lucide) window.lucide.createIcons();
}

// Navigation Bar
function initNavigation() {
  const navContainer = document.getElementById('sidebar-nav');
  if (!navContainer) return;

  const navItems = [
    { id: 'dashboard', label: state.currentRole === 'agronomo' ? 'Panel de ingeniería' : state.currentRole === 'cliente' ? 'Resumen' : state.currentRole === 'tecnico' ? 'Panel técnico' : 'Dashboard activo', icon: 'layout-dashboard' },
    ...(state.currentRole === 'cliente'
      ? [
        { id: 'fincas', label: 'Mi finca', icon: 'home' },
        { id: 'terrenos', label: 'Lotes', icon: 'map' },
        { id: 'cultivos', label: 'Cultivos', icon: 'sprout' },
        { id: 'sensores', label: 'Sensores', icon: 'cpu' },
        { id: 'clima', label: 'Clima', icon: 'cloud-sun' },
        { id: 'alertas', label: 'Alertas', icon: 'bell', badge: getVisibleRecords(state.alertas).length },
        { id: 'actividades', label: 'Actividades', icon: 'calendar-check' },
        { id: 'produccion', label: 'Producción', icon: 'package' },
        { id: 'quejas', label: 'Mis solicitudes', icon: 'message-square' }
      ]
      : state.currentRole === 'tecnico'
        ? [{ id: 'quejas', label: 'Quejas de clientes', icon: 'message-square', badge: state.quejas.filter(q => q.estado !== 'Resuelta').length }, { id: 'sensores', label: 'Sensores', icon: 'cpu' }, { id: 'alertas', label: 'Alertas', icon: 'bell', badge: state.alertas.length }]
        : [
          { id: 'fincas', label: 'Fincas', icon: 'home' },
          { id: 'terrenos', label: 'Terrenos y lotes', icon: 'map' },
          { id: 'cultivos', label: 'Cultivos', icon: 'sprout' },
          { id: 'sensores', label: 'Sensores', icon: 'cpu' },
          { id: 'clima', label: 'Clima', icon: 'cloud-sun' },
          { id: 'alertas', label: 'Alertas', icon: 'bell', badge: state.alertas.length },
          { id: 'actividades', label: 'Actividades', icon: 'calendar-check' },
          { id: 'produccion', label: 'Producción', icon: 'package' },
          ...(state.currentRole === 'administrador' ? [{ id: 'usuarios', label: 'Usuarios', icon: 'users' }, { id: 'configuracion', label: 'Configuración', icon: 'settings' }] : [])
        ])
  ];

  navContainer.innerHTML = navItems.map(item => {
    const isActive = state.activeView === item.id || (state.activeView === 'ficha_cultivo' && item.id === 'cultivos');
    return `
      <button
        onclick="window.switchView('${item.id}')"
        class="w-max md:w-full shrink-0 flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
          isActive
            ? 'bg-[#1B794B] text-white shadow-xs font-bold'
            : 'text-emerald-100/75 hover:text-white hover:bg-white/10'
        }"
      >
        <div class="flex items-center gap-3">
          <i data-lucide="${item.icon}" class="w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-300/80'}"></i>
          <span>${item.label}</span>
        </div>
        ${item.badge ? `
          <span class="text-[10px] font-bold px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white text-[#1B794B]' : 'bg-amber-500 text-white'}">
            ${item.badge}
          </span>
        ` : ''}
      </button>
    `;
  }).join('');

  if (window.lucide) window.lucide.createIcons();
}

function updateUIState() {
  const appLayout = document.getElementById('app-layout');
  const loginContainer = document.getElementById('login-container');

  renderHeader();

  if (state.currentUser) {
    if (loginContainer) loginContainer.classList.add('hidden');
    if (appLayout) appLayout.classList.remove('hidden');
    initNavigation();
    renderCurrentView();
  } else {
    if (appLayout) appLayout.classList.add('hidden');
    if (loginContainer) loginContainer.classList.remove('hidden');
    renderLoginScreen();
  }
}

// Main View Router
function renderCurrentView() {
  const main = document.getElementById('main-content');
  if (!main) return;

  const clientViews = ['dashboard', 'fincas', 'terrenos', 'cultivos', 'ficha_cultivo', 'sensores', 'clima', 'alertas', 'actividades', 'produccion', 'quejas'];
  if (state.currentRole === 'cliente' && !clientViews.includes(state.activeView)) {
    state.activeView = 'dashboard';
  }
  if (state.currentRole === 'tecnico' && !['dashboard', 'quejas', 'sensores', 'alertas'].includes(state.activeView)) {
    state.activeView = 'dashboard';
  }

  switch (state.activeView) {
    case 'dashboard':
      main.innerHTML = renderDashboardView();
      break;
    case 'fincas':
      main.innerHTML = renderFincasView();
      break;
    case 'terrenos':
      main.innerHTML = renderTerrenosView();
      break;
    case 'cultivos':
      main.innerHTML = renderCultivosView();
      break;
    case 'ficha_cultivo':
      main.innerHTML = renderFichaCultivoView();
      break;
    case 'sensores':
      main.innerHTML = renderSensoresView();
      break;
    case 'clima':
      main.innerHTML = renderClimaView();
      break;
    case 'alertas':
      main.innerHTML = renderAlertasView();
      break;
    case 'quejas':
      main.innerHTML = renderQuejasView();
      break;
    case 'actividades':
      main.innerHTML = renderActividadesView();
      break;
    case 'produccion':
      main.innerHTML = renderProduccionView();
      break;
    case 'usuarios':
      main.innerHTML = renderUsuariosView();
      break;
    case 'configuracion':
      main.innerHTML = renderConfiguracionView();
      break;
    default:
      main.innerHTML = renderDashboardView();
  }

  if (window.lucide) window.lucide.createIcons();
}

// ----------------------------------------------------
// SCREEN 1: DASHBOARD GENERAL (Mockup Page 7)
// ----------------------------------------------------
function renderDashboardView() {
  if (state.currentRole === 'agronomo') return renderEngineerDashboardView();
  if (state.currentRole === 'cliente') return renderClientDashboardView();
  if (state.currentRole === 'tecnico') return renderTechnicianDashboardView();
  return `
    <div class="space-y-6">
      <!-- 4 Top KPI Cards (Page 7) -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
          <p class="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">12</p>
          <p class="text-xs font-semibold text-slate-500 mt-1">Cultivos activos</p>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
          <p class="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">8</p>
          <p class="text-xs font-semibold text-slate-500 mt-1">Lotes registrados</p>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
          <p class="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">24</p>
          <p class="text-xs font-semibold text-slate-500 mt-1">Sensores activos</p>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
          <p class="text-3xl font-extrabold text-amber-600 tracking-tight font-mono">3</p>
          <p class="text-xs font-semibold text-slate-500 mt-1">Alertas activas</p>
        </div>
      </div>

      <!-- Main Section: Big Chart (Left) + Climate & Real-Time Sensors (Right) -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Chart: Humedad del suelo durante los últimos 7 días -->
        <div class="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
              <i data-lucide="droplet" class="w-4 h-4 text-emerald-600"></i>
              Humedad del suelo durante los últimos 7 días
            </h3>
            <span class="text-xs text-slate-400 font-mono">Promedio: 58.4%</span>
          </div>

          <!-- High-Fidelity SVG Curved Area Graph -->
          <div class="relative w-full h-64">
            <svg class="w-full h-full overflow-visible" viewBox="0 0 600 220" preserveAspectRatio="none">
              <defs>
                <linearGradient id="moistureGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#22c55e" stop-opacity="0.35" />
                  <stop offset="70%" stop-color="#22c55e" stop-opacity="0.08" />
                  <stop offset="100%" stop-color="#22c55e" stop-opacity="0.0" />
                </linearGradient>
              </defs>

              <!-- Gridlines -->
              <line x1="0" y1="40" x2="600" y2="40" stroke="#f1f5f9" stroke-width="1" />
              <line x1="0" y1="90" x2="600" y2="90" stroke="#f1f5f9" stroke-width="1" />
              <line x1="0" y1="140" x2="600" y2="140" stroke="#f1f5f9" stroke-width="1" />
              <line x1="0" y1="190" x2="600" y2="190" stroke="#f1f5f9" stroke-width="1" />

              <!-- Smooth Area -->
              <path
                d="M 0,160 Q 75,170 150,140 T 300,120 T 450,50 T 540,110 T 600,125 L 600,210 L 0,210 Z"
                fill="url(#moistureGrad)"
              />

              <!-- Smooth Line Curve -->
              <path
                d="M 0,160 Q 75,170 150,140 T 300,120 T 450,50 T 540,110 T 600,125"
                fill="none"
                stroke="#16a34a"
                stroke-width="3"
                stroke-linecap="round"
              />

              <!-- Highlight Peak Point (at 450, 50) -->
              <circle cx="450" cy="50" r="5" fill="#16a34a" stroke="#ffffff" stroke-width="2.5" />
              <circle cx="300" cy="120" r="4" fill="#16a34a" />
              <circle cx="150" cy="140" r="4" fill="#16a34a" />
            </svg>
          </div>

          <!-- Chart Time Labels -->
          <div class="flex justify-between text-[11px] font-mono text-slate-400 pt-3 border-t border-slate-100">
            <span>2:00</span>
            <span>5:00</span>
            <span>9:00</span>
            <span>13:00</span>
            <span>17:00</span>
            <span>21:00</span>
          </div>
        </div>

        <!-- Right Side: Climate and Real-Time Sensors -->
        <div class="space-y-4">
          <!-- Condiciones Climáticas Actuales (Page 7) -->
          <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-3">
            <div class="flex items-center justify-between">
              <h4 class="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
                Condiciones climáticas actuales
              </h4>
              <i data-lucide="cloud-sun" class="w-4 h-4 text-amber-500"></i>
            </div>
            <div class="grid grid-cols-2 gap-3 pt-1">
              <div class="p-3 bg-slate-50 rounded-xl">
                <span class="text-2xl font-black text-slate-900 font-mono">24°C</span>
                <p class="text-[11px] text-slate-500">Temperatura</p>
              </div>
              <div class="p-3 bg-slate-50 rounded-xl">
                <span class="text-2xl font-black text-slate-900 font-mono">68%</span>
                <p class="text-[11px] text-slate-500">Humedad (12 mm)</p>
              </div>
              <div class="p-3 bg-slate-50 rounded-xl">
                <span class="text-lg font-bold text-slate-900 font-mono">120 W/m²</span>
                <p class="text-[11px] text-slate-500">Radiación solar</p>
              </div>
              <div class="p-3 bg-slate-50 rounded-xl">
                <span class="text-lg font-bold text-slate-900 font-mono">8 km/h</span>
                <p class="text-[11px] text-slate-500">Viento NW</p>
              </div>
            </div>
          </div>

          <!-- Sensores en Tiempo Real (Page 7) -->
          <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-3">
            <div class="flex items-center justify-between">
              <h4 class="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
                Sensores en tiempo real
              </h4>
              <i data-lucide="activity" class="w-4 h-4 text-emerald-600"></i>
            </div>
            <div class="grid grid-cols-2 gap-3 pt-1">
              <div class="border border-slate-100 p-2.5 rounded-xl">
                <p class="text-xs text-slate-500">Humedad suelo</p>
                <p class="text-xl font-bold text-emerald-700 font-mono">58%</p>
              </div>
              <div class="border border-slate-100 p-2.5 rounded-xl">
                <p class="text-xs text-slate-500">Temp ambiente</p>
                <p class="text-xl font-bold text-slate-900 font-mono">24°C</p>
              </div>
              <div class="border border-slate-100 p-2.5 rounded-xl">
                <p class="text-xs text-slate-500">Radiación</p>
                <p class="text-base font-bold text-slate-900 font-mono">620 W/m²</p>
              </div>
              <div class="border border-slate-100 p-2.5 rounded-xl">
                <p class="text-xs text-slate-500">Suelo pH</p>
                <p class="text-base font-bold text-slate-900 font-mono">6.5</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Row: Alertas Recientes & Actividades Recientes (Page 7) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Alertas Recientes -->
        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-3">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <h4 class="font-bold text-slate-900 text-xs flex items-center gap-2">
              <i data-lucide="bell-ring" class="w-4 h-4 text-amber-500"></i>
              Alertas recientes
            </h4>
            <button onclick="window.switchView('alertas')" class="text-xs text-emerald-700 font-semibold hover:underline">
              Ver todas (${getVisibleRecords(state.alertas).length})
            </button>
          </div>
          <div class="space-y-2.5">
            ${getVisibleRecords(state.alertas).map(a => `
              <div class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                <span class="w-2.5 h-2.5 rounded-full mt-1.5 ${a.severidad === 'Advertencia' ? 'bg-amber-500' : 'bg-emerald-500'}"></span>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-bold text-slate-800 leading-snug">${a.titulo}</p>
                  <p class="text-[11px] text-slate-500 line-clamp-1">${a.detalle}</p>
                </div>
                <span class="text-[10px] text-slate-400 whitespace-nowrap">${a.fecha}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Actividades Recientes -->
        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-3">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <h4 class="font-bold text-slate-900 text-xs flex items-center gap-2">
              <i data-lucide="calendar" class="w-4 h-4 text-emerald-600"></i>
              Actividades recientes
            </h4>
            <button onclick="window.switchView('actividades')" class="text-xs text-emerald-700 font-semibold hover:underline">
              Ver bitácora
            </button>
          </div>
          <div class="space-y-2.5">
            ${getVisibleRecords(state.actividades).slice(0, 3).map(act => `
              <div class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                <div class="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg">
                  <i data-lucide="check" class="w-3.5 h-3.5"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-bold text-slate-800 leading-snug">${act.tipoActividad}</p>
                  <p class="text-[11px] text-slate-500 line-clamp-1">${act.descripcion} · ${act.responsable}</p>
                </div>
                <span class="text-[10px] text-slate-400 whitespace-nowrap">${act.fecha}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderEngineerDashboardView() {
  const finca = state.activeFinca;
  const lots = state.getLotesForFinca(finca.id);
  const warnings = state.alertas.filter(alert => alert.severidad === 'Advertencia').length;
  const openComplaints = state.quejas.filter(complaint => complaint.estado !== 'Resuelta').length;
  return `
    <div class="space-y-5">
      <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wider text-emerald-700">Panel de Ingeniería Agronómica</p>
          <h1 class="text-2xl font-bold tracking-tight text-slate-900">Resumen de campo</h1>
          <p class="text-xs text-slate-500 mt-1">${finca.nombre} · ${finca.ubicacion}</p>
        </div>
        <button onclick="window.switchView('terrenos')" class="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white text-xs font-semibold rounded-xl">
          <i data-lucide="map" class="w-4 h-4"></i> Abrir mapa de lotes
        </button>
      </header>
      <div class="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        ${[
          ['Lotes bajo seguimiento', lots.length, 'map'],
          ['Sensores activos', finca.sensoresActivos, 'cpu'],
          ['Alertas por revisar', warnings, 'triangle-alert'],
          ['Solicitudes de clientes', openComplaints, 'message-square']
        ].map(([label, value, icon]) => `
          <article class="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
            <i data-lucide="${icon}" class="w-4 h-4 text-emerald-700"></i>
            <p class="mt-3 text-2xl font-bold text-slate-900">${value}</p>
            <p class="text-[11px] sm:text-xs text-slate-500">${label}</p>
          </article>
        `).join('')}
      </div>
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <section class="xl:col-span-2 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
          <div class="flex items-center justify-between gap-3 mb-4">
            <div>
              <h2 class="font-bold text-slate-900 text-sm">Condición de los lotes</h2>
              <p class="text-xs text-slate-500">Lecturas y estado actual de la finca activa</p>
            </div>
            <button onclick="window.switchView('terrenos')" class="text-xs font-semibold text-emerald-700">Ver todos</button>
          </div>
          <div class="space-y-3">
            ${lots.slice(0, 4).map(lot => `
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-slate-50">
                <div class="min-w-0">
                  <p class="text-xs font-semibold text-slate-800 truncate">${lot.identificador}</p>
                  <p class="text-[11px] text-slate-500">${lot.cultivoNombre} · ${lot.area} Ha</p>
                </div>
                <div class="flex items-center gap-3 text-xs">
                  <span class="font-mono font-semibold ${lot.humedadSuelo < 40 ? 'text-amber-700' : 'text-emerald-700'}">${lot.humedadSuelo}% humedad</span>
                  <span class="rounded-full px-2 py-1 text-[10px] font-bold ${lot.estado === 'Saludable' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">${lot.estado}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
        <section class="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
          <h2 class="font-bold text-slate-900 text-sm">Agenda técnica</h2>
          <p class="text-xs text-slate-500 mt-1 mb-4">Actividades recientes para dar seguimiento</p>
          <div class="space-y-3">
            ${state.actividades.slice(0, 4).map(activity => `
              <div class="border-l-2 border-emerald-500 pl-3">
                <p class="text-xs font-semibold text-slate-800">${activity.tipoActividad}</p>
                <p class="text-[11px] text-slate-500">${activity.descripcion}</p>
                <p class="text-[10px] text-slate-400 mt-1">${activity.fecha} · ${activity.responsable}</p>
              </div>
            `).join('')}
          </div>
          <button onclick="window.switchView('alertas')" class="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-emerald-700">
            Revisar alertas <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
        </section>
      </div>
    </div>
  `;
}

function renderClientDashboardView() {
  const finca = state.activeFinca;
  if (!finca) {
    return `
      <section class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <p class="text-xs font-semibold uppercase tracking-wider text-emerald-700">Portal del cliente</p>
        <h1 class="text-2xl font-bold text-slate-900 mt-1">Hola, ${escapeHtml(state.currentUser.nombre)}</h1>
        <p class="text-sm text-slate-600 mt-2">Aún no tienes fincas asociadas. Ve a “Mi finca” en el menú lateral para agregar una.</p>
      </section>
    `;
  }
  const lots = state.getLotesForFinca(finca.id);
  const cultivoCount = getRecordsForFinca(state.cultivos, finca.id).length;
  const myComplaints = state.quejas.filter(complaint => complaint.clienteId === state.currentUser.id);
  return `
    <div class="space-y-5">
      <header class="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-sm">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wider text-emerald-700">Portal del cliente</p>
          <h1 class="text-2xl font-bold text-slate-900 mt-1">Hola, ${escapeHtml(state.currentUser.nombre)}</h1>
          <p class="text-sm text-slate-600 mt-1">${escapeHtml(finca.nombre)} · ${escapeHtml(finca.ubicacion)}</p>
        </div>
      </header>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        ${[
          ['Área de la finca', `${finca.areaTotal} Ha`, 'land-plot'],
          ['Lotes', lots.length, 'map'],
          ['Cultivos activos', cultivoCount, 'sprout'],
          ['Solicitudes abiertas', myComplaints.filter(item => item.estado !== 'Resuelta').length, 'messages-square']
        ].map(([label, value, icon]) => `
          <article class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
            <i data-lucide="${icon}" class="w-4 h-4 text-emerald-700"></i>
            <p class="mt-3 text-xl font-bold text-slate-900">${value}</p>
            <p class="text-[11px] text-slate-500">${label}</p>
          </article>
        `).join('')}
      </div>
      <section class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p class="text-xs font-semibold text-slate-500">Producto principal de la finca</p>
          <p class="text-lg font-bold text-slate-900 mt-1">${escapeHtml(getFarmMainProduct(finca) || 'Aún no indicado')}</p>
        </div>
        <button onclick="window.openClientProductModal()" class="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-xl">
          <i data-lucide="sprout" class="w-4 h-4"></i> Indicar producto
        </button>
      </section>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <h2 class="font-bold text-slate-900 text-sm">Resumen de mi finca</h2>
          <div class="mt-4 space-y-3">
            ${lots.map(lot => `
              <div class="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div class="min-w-0">
                  <p class="text-xs font-semibold text-slate-800 truncate">${lot.identificador}</p>
                  <p class="text-[11px] text-slate-500">${lot.cultivoNombre} · ${lot.area} Ha</p>
                </div>
                <span class="text-xs font-semibold ${lot.humedadSuelo < 40 ? 'text-amber-700' : 'text-emerald-700'}">${lot.humedadSuelo}% humedad</span>
              </div>
            `).join('')}
          </div>
        </section>
        <section class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div class="flex justify-between items-center gap-3">
            <div>
              <h2 class="font-bold text-slate-900 text-sm">Mis solicitudes</h2>
              <p class="text-xs text-slate-500 mt-1">Consulta el avance de tus reportes al equipo técnico.</p>
            </div>
            <button onclick="window.switchView('quejas')" class="text-xs font-semibold text-emerald-700">Ver todas</button>
          </div>
          ${myComplaints.length ? myComplaints.slice(0, 3).map(complaint => `
            <div class="mt-4 border-t border-slate-100 pt-3">
              <div class="flex justify-between gap-2">
                <p class="text-xs font-semibold text-slate-800">${complaint.asunto}</p>
                <span class="shrink-0 text-[10px] font-bold text-emerald-800">${complaint.estado}</span>
              </div>
              <p class="text-[11px] text-slate-500 mt-1">${complaint.fecha}</p>
            </div>
          `).join('') : '<p class="text-xs text-slate-500 mt-4">Aún no tienes solicitudes. Si necesitas ayuda, crea una nueva.</p>'}
        </section>
      </div>
    </div>
  `;
}

function renderTechnicianDashboardView() {
  const openCount = state.quejas.filter(complaint => complaint.estado !== 'Resuelta').length;
  return `
    <div class="space-y-5">
      <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wider text-indigo-700">Atención de clientes</p>
          <h1 class="text-2xl font-bold text-slate-900">Panel técnico</h1>
          <p class="text-xs text-slate-500 mt-1">Revisa y gestiona las quejas recibidas de las fincas.</p>
        </div>
        <button onclick="window.switchView('quejas')" class="inline-flex justify-center items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl">
          <i data-lucide="inbox" class="w-4 h-4"></i> Abrir bandeja
        </button>
      </header>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <article class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm"><p class="text-xs text-slate-500">Quejas pendientes</p><p class="text-3xl font-bold text-amber-600 mt-2">${state.quejas.filter(item => item.estado === 'Pendiente').length}</p></article>
        <article class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm"><p class="text-xs text-slate-500">En revisión</p><p class="text-3xl font-bold text-indigo-700 mt-2">${state.quejas.filter(item => item.estado === 'En revisión').length}</p></article>
        <article class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm"><p class="text-xs text-slate-500">Solicitudes abiertas</p><p class="text-3xl font-bold text-slate-900 mt-2">${openCount}</p></article>
      </div>
      <section class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h2 class="font-bold text-slate-900 text-sm mb-3">Últimas quejas</h2>
        ${state.quejas.length ? state.quejas.slice(0, 3).map(complaint => `
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-t border-slate-100">
            <div>
              <p class="text-xs font-semibold text-slate-900">${complaint.asunto}</p>
              <p class="text-[11px] text-slate-500">${escapeHtml(complaint.cliente)} · ${complaint.fincaNombre || state.fincas.find(f => f.id === complaint.fincaId)?.nombre || 'Finca'}</p>
            </div>
            <span class="text-[10px] font-bold text-slate-600">${complaint.estado}</span>
          </div>
        `).join('') : '<p class="text-xs text-slate-500">No hay quejas registradas.</p>'}
      </section>
    </div>
  `;
}

function renderQuejasView() {
  const isClient = state.currentRole === 'cliente';
  const complaints = isClient
    ? state.quejas.filter(complaint => complaint.clienteId === state.currentUser.id)
    : state.quejas;
  return `
    <div class="space-y-5">
      <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">${isClient ? 'Mis solicitudes de soporte' : 'Quejas de clientes'}</h1>
          <p class="text-xs text-slate-500 mt-1">${isClient ? 'Consulta el estado de tus solicitudes.' : 'Atiende y actualiza las solicitudes recibidas desde las fincas.'}</p>
        </div>
        ${isClient ? `<button onclick="window.openComplaintModal()" class="inline-flex justify-center items-center gap-2 px-4 py-2 bg-[#1B794B] text-white text-xs font-semibold rounded-xl"><i data-lucide="plus" class="w-4 h-4"></i>Nueva solicitud</button>` : ''}
      </header>
      <div class="space-y-3">
        ${complaints.length ? complaints.map(complaint => `
          <article class="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5">
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div class="min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                  <h2 class="font-bold text-sm text-slate-900">${complaint.asunto}</h2>
                  <span class="rounded-full px-2 py-1 text-[10px] font-bold ${complaint.estado === 'Resuelta' ? 'bg-emerald-100 text-emerald-800' : complaint.estado === 'En revisión' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-800'}">${complaint.estado}</span>
                </div>
                <p class="text-xs text-slate-600 mt-2">${complaint.descripcion}</p>
                <p class="text-[11px] text-slate-500 mt-3">${escapeHtml(complaint.cliente)} · ${state.fincas.find(f => f.id === complaint.fincaId)?.nombre || 'Finca'} · ${complaint.fecha}</p>
              </div>
              ${!isClient && complaint.estado !== 'Resuelta' ? `
                <div class="flex gap-2 shrink-0">
                  ${complaint.estado === 'Pendiente' ? `<button onclick="window.updateComplaintStatus('${complaint.id}', 'En revisión')" class="px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 text-[11px] font-semibold">Tomar caso</button>` : ''}
                  <button onclick="window.updateComplaintStatus('${complaint.id}', 'Resuelta')" class="px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] font-semibold">Resolver</button>
                </div>
              ` : ''}
            </div>
          </article>
        `).join('') : `<div class="bg-white rounded-2xl border border-slate-200 p-8 text-center"><i data-lucide="inbox" class="w-8 h-8 text-slate-300 mx-auto"></i><p class="text-sm font-semibold text-slate-700 mt-3">${isClient ? 'Aún no tienes solicitudes' : 'No hay quejas pendientes'}</p><p class="text-xs text-slate-500 mt-1">${isClient ? 'Crea una solicitud si necesitas ayuda con tu finca.' : 'Cuando un cliente reporte un problema, aparecerá aquí.'}</p></div>`}
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// SCREEN 2: MIS FINCAS (Mockup Page 3)
// ----------------------------------------------------
function renderFincasView() {
  const isTarjetas = state.fincasViewMode === 'tarjetas';
  const fincas = getVisibleFincas();
  const isClient = state.currentRole === 'cliente';

  return `
    <div class="space-y-5">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-slate-900">Mis Fincas</h1>
          <p class="text-xs text-slate-500 mt-0.5">
            ${isClient ? 'Consulta y administra la información de tus fincas.' : 'Administra y consulta la información general de tus fincas.'}
          </p>
        </div>

        ${state.currentRole === 'cliente' ? `<button onclick="window.openNewFincaModal()" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2 self-start sm:self-auto">
          <i data-lucide="house-plus" class="w-4 h-4"></i>
          <span>Agregar finca</span>
        </button>` : `<button onclick="window.openNewFincaModal()" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2 self-start sm:self-auto">
          <i data-lucide="plus" class="w-4 h-4"></i>
          <span>Registrar nueva finca</span>
        </button>`}
      </div>

      <!-- Filters & View Switcher Bar (Page 3) -->
      <div class="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        ${isClient ? `<span class="text-xs font-semibold text-emerald-700">${fincas.length} ${fincas.length === 1 ? 'finca registrada' : 'fincas registradas'}</span>` : `<div class="flex flex-wrap items-center gap-2">
          <select class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none">
            <option>Ubicación (Todas)</option>
            <option>Valle del Cauca</option>
            <option>Santander</option>
            <option>Antioquia</option>
            <option>Tolima</option>
          </select>

          <select class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none">
            <option>Estado (Todos)</option>
            <option>Saludable</option>
            <option>Monitoreo</option>
            <option>Alerta</option>
          </select>

          <select class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none hidden md:inline-block">
            <option>Número de cultivos</option>
          </select>

          <select class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none hidden md:inline-block">
            <option>24 sensores</option>
          </select>

          <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-xl text-[11px] font-semibold">Saludable</span>
        </div>`}

        <!-- View Switcher Toggle -->
        <div class="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button onclick="window.setFincasViewMode('tarjetas')" class="px-3 py-1 rounded-lg text-xs font-semibold transition-all ${isTarjetas ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'}">
            Tarjetas
          </button>
          <button onclick="window.setFincasViewMode('lista')" class="px-3 py-1 rounded-lg text-xs font-semibold transition-all ${!isTarjetas ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'}">
            Lista
          </button>
        </div>
      </div>

      <!-- Content: Grid of Farm Cards or Table -->
      ${isTarjetas ? `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          ${fincas.map(f => {
            const isSelected = f.id === state.selectedFincaId;
            const statusClass = f.estado.includes('Saludable')
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : f.estado.includes('Monitoreo')
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-rose-50 text-rose-700 border-rose-200';

            return `
              <div class="bg-white rounded-2xl border ${isSelected ? 'border-emerald-600 ring-2 ring-emerald-600/20' : 'border-slate-200/80'} overflow-hidden shadow-2xs flex flex-col justify-between transition-all hover:shadow-md">
                <!-- Farm Photo / Landscape -->
                <div class="relative h-40 bg-gradient-to-br from-[#123625] via-[#1a4a34] to-[#0d2a1c] overflow-hidden">
                  <img
                    src="${f.imagen}"
                    alt="${escapeHtml(f.nombre)}"
                    loading="lazy"
                    class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onerror="this.onerror=null; this.src='/images/finca_palmas.jpg';"
                  />
                  <span class="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusClass}">
                    ${f.estado}
                  </span>
                  ${isSelected ? `
                    <span class="absolute bottom-2 left-2 bg-[#1B794B] text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm">
                      Finca Activa
                    </span>
                  ` : ''}
                </div>

                <!-- Farm Details -->
                <div class="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 class="font-bold text-slate-900 text-sm">${escapeHtml(f.nombre)}</h3>
                    <p class="text-xs text-slate-500 mt-0.5">${escapeHtml(f.ubicacion)}</p>
                    <p class="text-xs font-medium text-slate-700 mt-2">Área: <strong>${f.areaTotal} hectáreas</strong></p>
                    <p class="text-[11px] text-slate-500 mt-0.5">${isClient ? getRecordsForFinca(state.cultivos, f.id).length : f.cultivosActivos} cultivos activos · ${isClient ? getRecordsForFinca(state.sensores, f.id).length : f.sensoresActivos} sensores</p>
                    <p class="text-[11px] text-slate-500 mt-1">Producto principal: <strong class="text-slate-700">${escapeHtml(getFarmMainProduct(f) || 'No indicado')}</strong></p>
                  </div>

                  <div class="flex items-center justify-between pt-2 border-t border-slate-100">
                    ${state.currentRole === 'cliente' ? `<span class="text-xs font-semibold text-emerald-700">Finca asignada</span>` : `<button onclick="window.handleFincaChange('${f.id}')" class="text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors">
                      ${isSelected ? 'Seleccionada' : 'Seleccionar finca'}
                    </button>`}
                    <button onclick="window.openFincaDetailModal('${f.id}')" class="p-2 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer" title="Ver información técnica y lotes de ${escapeHtml(f.nombre)}" aria-label="Ver detalles de ${escapeHtml(f.nombre)}">
                      <i data-lucide="eye" class="w-4 h-4"></i>
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      ` : `
        <div class="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
        <div class="overflow-x-auto">
        <table class="w-full min-w-[760px] text-left text-xs">
            <thead class="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th class="p-3.5">Finca</th>
                <th class="p-3.5">Ubicación</th>
                <th class="p-3.5">Área Total</th>
                <th class="p-3.5">Cultivos</th>
                ${isClient ? '<th class="p-3.5">Producto principal</th>' : ''}
                <th class="p-3.5">Sensores</th>
                <th class="p-3.5">Estado</th>
                <th class="p-3.5 text-right">Acción</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${fincas.map(f => `
                <tr class="hover:bg-slate-50/80 transition-colors">
                  <td class="p-3.5 font-bold text-slate-900">${escapeHtml(f.nombre)}</td>
                  <td class="p-3.5 text-slate-600">${escapeHtml(f.ubicacion)}</td>
                  <td class="p-3.5 font-mono">${f.areaTotal} Ha</td>
                  <td class="p-3.5 font-mono">${isClient ? getRecordsForFinca(state.cultivos, f.id).length : f.cultivosActivos}</td>
                  ${isClient ? `<td class="p-3.5">${escapeHtml(getFarmMainProduct(f) || 'No indicado')}</td>` : ''}
                  <td class="p-3.5 font-mono">${isClient ? getRecordsForFinca(state.sensores, f.id).length : f.sensoresActivos}</td>
                  <td class="p-3.5">
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${f.estado.includes('Saludable') ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}">
                      ${f.estado}
                    </span>
                  </td>
                  <td class="p-3.5 text-right space-x-1">
                    <button onclick="window.openFincaDetailModal('${f.id}')" class="p-2 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors" title="Ver detalles" aria-label="Ver detalles de ${escapeHtml(f.nombre)}">
                      <i data-lucide="eye" class="w-4 h-4"></i>
                    </button>
                    ${state.currentRole === 'cliente' ? '' : `<button onclick="window.handleFincaChange('${f.id}')" class="p-2 ${f.id === state.selectedFincaId ? 'text-emerald-700 bg-emerald-50' : 'text-slate-600 bg-slate-100 hover:bg-slate-200'} rounded-lg transition-colors" title="${f.id === state.selectedFincaId ? 'Finca activa' : 'Seleccionar finca'}" aria-label="${f.id === state.selectedFincaId ? 'Finca activa' : `Seleccionar ${f.nombre}`}">
                      <i data-lucide="${f.id === state.selectedFincaId ? 'check' : 'check-circle'}" class="w-4 h-4"></i>
                    </button>`}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          </div>
        </div>
      `}

    </div>
  `;
}

// ----------------------------------------------------
// SCREEN 3: TERRENOS Y LOTES (Mockup Page 4)
// ----------------------------------------------------
function renderTerrenosView() {
  const currentFinca = state.activeFinca;
  const fincaLotes = state.getLotesForFinca(currentFinca.id);
  const visibleLotes = fincaLotes.filter(l =>
    (!state.loteEstadoFilter ||
      (state.loteEstadoFilter === 'critico' ? l.estado.includes('Alerta') || l.estado === 'Crítico' : l.estado === state.loteEstadoFilter)) &&
    (!state.loteCultivoFilter || l.cultivoNombre === state.loteCultivoFilter)
  );

  let selectedLote = visibleLotes.find(l => l.id === state.selectedLoteId);
  if (!selectedLote) {
    selectedLote = visibleLotes[0] || null;
    if (selectedLote) {
      state.selectedLoteId = selectedLote.id;
    }
  }

  // Get distinct crop names for this finca's lots
  const lotCrops = Array.from(new Set(fincaLotes.map(l => l.cultivoNombre))).filter(Boolean);

  // Find related cultivo if any for the "Ver en detalle" button
  const visibleCultivos = getVisibleRecords(state.cultivos);
  const relatedCultivo = selectedLote
    ? (visibleCultivos.find(c => c.loteId === selectedLote.id) || visibleCultivos[0])
    : visibleCultivos[0];

  return `
    <div class="space-y-5">
      <!-- Header with Active Farm details -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold tracking-tight text-slate-900">Terrenos y Lotes</h1>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              ${currentFinca.nombre}
            </span>
          </div>
          <p class="text-xs text-slate-500 mt-0.5">
            Visualiza y administra la delimitación satelital de lotes para <strong class="text-slate-700">${currentFinca.nombre}</strong> (${currentFinca.ubicacion} · ${currentFinca.areaTotal} Ha · ${fincaLotes.length} lotes).
          </p>
        </div>

        ${state.currentRole === 'cliente' ? '' : `<button onclick="window.openNewLoteModal()" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2 self-start sm:self-auto">
          <i data-lucide="plus" class="w-4 h-4"></i>
          <span>Registrar nuevo lote</span>
        </button>`}
      </div>

      <!-- Filters & View Switcher Bar (Page 4) -->
      <div class="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div class="flex flex-wrap items-center gap-2">
          <!-- Dynamic Lot Selector -->
          <select onchange="if(this.value) window.selectLote(this.value)" class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none">
            <option value="">Lotes (${fincaLotes.length} en ${currentFinca.nombre})</option>
            ${fincaLotes.map(l => `
              <option value="${l.id}" ${l.id === selectedLote?.id ? 'selected' : ''}>
                ${l.identificador} · ${l.cultivoNombre}
              </option>
            `).join('')}
          </select>

          <!-- Status Filter -->
          <select id="lote-estado-filter" onchange="window.setLoteFilters(this.value, document.getElementById('lote-cultivo-filter').value)" class="w-full sm:w-auto px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none">
            <option value="" ${!state.loteEstadoFilter ? 'selected' : ''}>Estado (Todos)</option>
            <option value="Saludable" ${state.loteEstadoFilter === 'Saludable' ? 'selected' : ''}>Saludable</option>
            <option value="Advertencia" ${state.loteEstadoFilter === 'Advertencia' ? 'selected' : ''}>Advertencia</option>
            <option value="critico" ${state.loteEstadoFilter === 'critico' ? 'selected' : ''}>Crítico / Alerta</option>
          </select>

          <!-- Dynamic Crop Filter -->
          <select id="lote-cultivo-filter" onchange="window.setLoteFilters(document.getElementById('lote-estado-filter').value, this.value)" class="w-full sm:w-auto px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none">
            <option value="" ${!state.loteCultivoFilter ? 'selected' : ''}>Cultivo (Todos)</option>
            ${lotCrops.map(crop => `
              <option value="${crop}" ${state.loteCultivoFilter === crop ? 'selected' : ''}>${crop}</option>
            `).join('')}
          </select>

          <!-- Farm indicator badge -->
          <div class="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200/70 font-semibold text-[11px]">
            <i data-lucide="map-pin" class="w-3.5 h-3.5 text-emerald-600"></i>
            <span>${currentFinca.nombre}</span>
          </div>
        </div>

        <div class="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button onclick="window.setLotesViewMode('mapa')" class="px-3 py-1 rounded-lg text-xs font-semibold ${state.lotesViewMode === 'mapa' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'}">
            Mapa
          </button>
          <button onclick="window.setLotesViewMode('lista')" class="px-3 py-1 rounded-lg text-xs font-semibold ${state.lotesViewMode === 'lista' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'}">
            Lista
          </button>
        </div>
      </div>

      ${visibleLotes.length === 0 ? '<p class="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800" role="status">No se encontraron lotes con los filtros seleccionados.</p>' : ''}

      ${state.lotesViewMode === 'lista' ? `
        <!-- Lots Table View -->
        <div class="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
          <div class="overflow-x-auto">
          <table class="w-full min-w-[760px] text-left text-xs">
            <thead class="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th class="p-3.5">Lote / Parcela</th>
                <th class="p-3.5">Cultivo Sembrado</th>
                <th class="p-3.5">Área (Ha)</th>
                <th class="p-3.5">Humedad Suelo</th>
                <th class="p-3.5">Sensores IoT</th>
                <th class="p-3.5">Tipo de Suelo</th>
                <th class="p-3.5">Estado</th>
                <th class="p-3.5 text-right">${state.currentRole === 'cliente' ? 'Detalle' : 'Acciones'}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${visibleLotes.map(l => {
                const isSel = l.id === selectedLote?.id;
                return `
                  <tr class="hover:bg-slate-50/80 transition-colors ${isSel ? 'bg-emerald-50/40' : ''}">
                    <td class="p-3.5">
                      <div class="font-bold text-slate-900">${l.identificador}</div>
                      <div class="text-[10px] text-slate-400">Actualizado: ${l.ultimaActualizacion}</div>
                    </td>
                    <td class="p-3.5 font-medium text-slate-700">${l.cultivoNombre}</td>
                    <td class="p-3.5 font-mono">${l.area} Ha</td>
                    <td class="p-3.5">
                      <span class="font-mono font-bold ${l.humedadSuelo < 40 ? 'text-amber-600' : 'text-emerald-600'}">
                        ${l.humedadSuelo}%
                      </span>
                    </td>
                    <td class="p-3.5 font-mono">${l.sensoresCount} activos</td>
                    <td class="p-3.5 text-slate-600">${l.tipoSuelo}</td>
                    <td class="p-3.5">
                      <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        l.estado === 'Saludable'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : l.estado.includes('Alerta') || l.estado === 'Crítico'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }">
                        ${l.estado}
                      </span>
                    </td>
                    <td class="p-3.5 text-right space-x-1">
                      <button onclick="window.selectLote('${l.id}'); window.setLotesViewMode('mapa');" class="p-2 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors" title="Ver en mapa" aria-label="Ver ${l.identificador} en el mapa">
                        <i data-lucide="map" class="w-4 h-4"></i>
                      </button>
                      ${state.currentRole === 'cliente' ? '' : `<button onclick="window.openProgramarRiegoModal('${l.identificador}')" class="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors" title="Programar riego" aria-label="Programar riego para ${l.identificador}">
                        <i data-lucide="droplets" class="w-4 h-4"></i>
                      </button>`}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
          </div>
        </div>
      ` : `
        <!-- Main Layout: Map Canvas (Left) + Selected Lot Drawer (Right) -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Interactive Satellite Drone Map Canvas (Page 4) -->
          <div class="lg:col-span-2 bg-[#0D2E20] rounded-2xl overflow-hidden relative shadow-md min-h-[460px] flex flex-col justify-between border border-[#184832]">
            <!-- Satellite Aerial Background Image of Active Finca with fallback -->
            <div class="absolute inset-0 bg-gradient-to-br from-[#0e2c1c] via-[#143e29] to-[#0a1e14]">
              <img
                src="${currentFinca.imagen || '/images/finca_aerial_map.jpg'}"
                alt="Mapa satelital de lotes de ${currentFinca.nombre}"
                class="w-full h-full object-cover opacity-85 transition-opacity duration-300"
                onerror="this.onerror=null; this.src='/images/finca_aerial_map.jpg';"
              />
            </div>

            <!-- Top Overlay Badge identifying active Finca on the map -->
            <div class="relative z-20 p-4 flex items-center justify-between pointer-events-none">
              <div class="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-white flex items-center gap-2 text-xs shadow-md">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span class="font-bold">${currentFinca.nombre}</span>
                <span class="text-white/60">·</span>
                <span class="text-white/80">${visibleLotes.length} lotes mapeados</span>
              </div>
            </div>

            <!-- SVG Interactive Lot Polygons dynamically rendered for active Finca -->
            <svg class="absolute inset-0 w-full h-full cursor-pointer z-10" viewBox="0 0 800 500" preserveAspectRatio="none">
              ${visibleLotes.map(lote => {
                const isSel = lote.id === selectedLote?.id;
                let strokeColor = '#16a34a';
                let fillColor = 'rgba(34, 197, 94, 0.45)';

                if (lote.estado === 'Advertencia' || lote.estado === 'Monitoreo') {
                  strokeColor = '#ca8a04';
                  fillColor = 'rgba(234, 179, 8, 0.55)';
                } else if (lote.estado.includes('Alerta') || lote.estado === 'Crítico') {
                  strokeColor = '#e11d48';
                  fillColor = 'rgba(244, 63, 94, 0.55)';
                }

                if (isSel) {
                  strokeColor = '#ffffff';
                }

                return `
                  <polygon
                    points="${lote.polygon || '150,200 350,180 390,280 190,300'}"
                    fill="${fillColor}"
                    stroke="${strokeColor}"
                    stroke-width="${isSel ? '4' : '2'}"
                    onclick="window.selectLote('${lote.id}')"
                    class="hover:opacity-95 transition-all"
                  >
                    <title>${lote.identificador} - ${lote.cultivoNombre} (${lote.estado})</title>
                  </polygon>
                `;
              }).join('')}
            </svg>

            <!-- Lot Overlay Floating Chips (Matching Page 4 labels dynamically) -->
            <div class="relative z-20 p-4 flex flex-col justify-between h-full pointer-events-none">
              <!-- Interactive Floating Tags -->
              <div class="space-y-2 pointer-events-auto">
                ${visibleLotes.map(lote => {
                  const isSel = lote.id === selectedLote?.id;
                  let borderClass = 'border-emerald-300';
                  let dotColor = 'bg-emerald-500';

                  if (lote.estado === 'Advertencia' || lote.estado === 'Monitoreo') {
                    borderClass = 'border-amber-400';
                    dotColor = 'bg-amber-500';
                  } else if (lote.estado.includes('Alerta') || lote.estado === 'Crítico') {
                    borderClass = 'border-rose-400';
                    dotColor = 'bg-rose-500';
                  }

                  return `
                    <div
                      onclick="window.selectLote('${lote.id}')"
                      class="absolute ${lote.labelPos || 'top-[40%] left-[40%]'} -translate-x-1/2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border ${borderClass} shadow-md text-xs cursor-pointer hover:scale-105 transition-all ${
                        isSel ? 'ring-2 ring-emerald-500 scale-105 shadow-lg' : ''
                      }"
                    >
                      <span class="font-bold text-slate-900 block leading-tight flex items-center gap-1.5">
                        <span class="w-2 h-2 rounded-full ${dotColor}"></span>
                        ${lote.identificador}
                      </span>
                      <span class="text-[10px] text-slate-600 block mt-0.5">
                        ${lote.cultivoNombre} · ${lote.area} ha · ${lote.estado} · Humedad ${lote.humedadSuelo}%
                      </span>
                    </div>
                  `;
                }).join('')}
              </div>

              <!-- Map Legend (Page 4 bottom left) -->
              <div class="mt-auto bg-slate-900/85 backdrop-blur-md p-3 rounded-xl border border-slate-700/80 w-max text-xs space-y-1.5 pointer-events-auto">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span class="text-slate-200 text-[11px]">Saludable</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span class="text-slate-200 text-[11px]">Advertencia / Monitoreo</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <span class="text-slate-200 text-[11px]">Crítico / Alerta</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Side Drawer / Lot Detail Panel (Page 4) -->
          <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-5 flex flex-col justify-between">
            <div class="space-y-4">
              <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Detalle del Lote</span>
                  <h3 class="text-xl font-bold text-slate-900">${selectedLote ? selectedLote.identificador : 'Sin lote'}</h3>
                </div>
                ${selectedLote ? `
                  <span class="text-xs font-bold px-2.5 py-1 rounded-full ${
                    selectedLote.estado === 'Saludable'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : selectedLote.estado.includes('Alerta') || selectedLote.estado === 'Crítico'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }">
                    ${selectedLote.estado}
                  </span>
                ` : ''}
              </div>

              ${selectedLote ? `
                <div class="space-y-2.5 text-xs">
                  <div class="flex justify-between py-1.5 border-b border-slate-100">
                    <span class="text-slate-500">Finca:</span>
                    <span class="font-bold text-slate-900">${currentFinca.nombre}</span>
                  </div>

                  <div class="flex justify-between py-1.5 border-b border-slate-100">
                    <span class="text-slate-500">Cultivo:</span>
                    <span class="font-bold text-slate-900">${selectedLote.cultivoNombre}</span>
                  </div>

                  <div class="flex justify-between py-1.5 border-b border-slate-100">
                    <span class="text-slate-500">Área:</span>
                    <span class="font-bold text-slate-900 font-mono">${selectedLote.area} hectáreas</span>
                  </div>

                  <div class="flex justify-between py-1.5 border-b border-slate-100">
                    <span class="text-slate-500">Estado:</span>
                    <span class="font-bold ${
                      selectedLote.estado === 'Saludable'
                        ? 'text-emerald-700'
                        : selectedLote.estado.includes('Alerta') || selectedLote.estado === 'Crítico'
                          ? 'text-rose-700'
                          : 'text-amber-700'
                    }">${selectedLote.estado}</span>
                  </div>

                  <div class="flex justify-between py-1.5 border-b border-slate-100">
                    <span class="text-slate-500">Humedad del suelo:</span>
                    <span class="font-bold font-mono ${selectedLote.humedadSuelo < 40 ? 'text-amber-600' : 'text-emerald-600'}">${selectedLote.humedadSuelo}%</span>
                  </div>

                  <div class="flex justify-between py-1.5 border-b border-slate-100">
                    <span class="text-slate-500">Sensores conectados:</span>
                    <span class="font-bold text-slate-900 font-mono">${selectedLote.sensoresCount}</span>
                  </div>

                  <div class="flex justify-between py-1.5 border-b border-slate-100">
                    <span class="text-slate-500">Tipo de suelo:</span>
                    <span class="font-bold text-slate-900">${selectedLote.tipoSuelo}</span>
                  </div>

                  <div class="flex justify-between py-1.5 text-slate-400 text-[11px]">
                    <span>Última actualización:</span>
                    <span>${selectedLote.ultimaActualizacion}</span>
                  </div>

                  ${selectedLote.notas ? `
                    <div class="p-2.5 bg-slate-50 rounded-xl border border-slate-200/70 text-[11px] text-slate-600">
                      <strong>Observaciones:</strong> ${selectedLote.notas}
                    </div>
                  ` : ''}
                </div>
              ` : `
                <p class="text-xs text-slate-500 py-4">Selecciona un lote en el mapa satelital para ver sus métricas detalladas.</p>
              `}
            </div>

            <!-- Action Buttons (Page 4: Ver en detalle & Programar riego) -->
            <div class="space-y-2 pt-4 border-t border-slate-100">
              ${relatedCultivo ? `<button onclick="window.switchView('ficha_cultivo', '${relatedCultivo.id}')" class="w-full py-2.5 bg-[#1B794B] hover:bg-[#166534] text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5">
                <i data-lucide="eye" class="w-4 h-4"></i>
                <span>Ver en detalle</span>
              </button>` : ''}

              ${state.currentRole === 'cliente' ? '' : `<button onclick="window.openProgramarRiegoModal('${selectedLote ? selectedLote.identificador : ''}')" class="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-1.5">
                <i data-lucide="droplets" class="w-4 h-4 text-emerald-600"></i>
                <span>Programar riego</span>
              </button>`}
            </div>
          </div>
        </div>
      `}
    </div>
  `;
}

// ----------------------------------------------------
// SCREEN 4: CULTIVOS (Mockup Page 5)
// ----------------------------------------------------
function renderCultivosView() {
  const cultivos = getVisibleRecords(state.cultivos);
  const isClient = state.currentRole === 'cliente';
  return `
    <div class="space-y-5">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-slate-900">Cultivos</h1>
          <p class="text-xs text-slate-500 mt-0.5">
            Administra y supervisa el estado de tus cultivos.
          </p>
        </div>

        ${isClient ? '' : `<button onclick="window.openNewCultivoModal()" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2 self-start sm:self-auto">
          <i data-lucide="plus" class="w-4 h-4"></i>
          <span>Registrar cultivo</span>
        </button>`}
      </div>

      ${isClient ? '' : `
      <!-- Filters Toolbar (Page 5) -->
      <div class="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div class="flex flex-wrap items-center gap-2">
          <select class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none">
            <option>Buscar cultivo (Todos)</option>
            <option>Tomate</option>
            <option>Café</option>
            <option>Maíz</option>
            <option>Cacao</option>
            <option>Papa</option>
          </select>

          <select class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none">
            <option>Buscar lote (Todos)</option>
            <option>Lote A</option>
            <option>Lote B</option>
            <option>Lote C</option>
            <option>Lote D</option>
          </select>

          <select class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none hidden md:inline-block">
            <option>Tipos de cultivo</option>
            <option>Perenne</option>
            <option>Hortaliza</option>
            <option>Cereal</option>
            <option>Tubérculo</option>
          </select>

          <select class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none hidden md:inline-block">
            <option>En producción</option>
            <option>Desarrollo</option>
            <option>Vegetativa</option>
          </select>
        </div>

        <div class="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button class="px-3 py-1 rounded-lg text-xs font-semibold bg-white text-slate-900 shadow-2xs">
            Lista
          </button>
          <button onclick="window.switchView('terrenos')" class="px-3 py-1 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800">
            Mapa
          </button>
        </div>
      </div>
      `}

      <!-- Main Layout: Table (Left) + Comparative Bar Graphic (Right - Page 5) -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Cultivos Table (Page 5) -->
        <div class="lg:col-span-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50/80 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th class="p-3.5">Cultivo</th>
                  <th class="p-3.5">Tipo</th>
                  <th class="p-3.5">Finca</th>
                  <th class="p-3.5">Lote</th>
                  <th class="p-3.5">Fecha Siembra</th>
                  <th class="p-3.5">Estado</th>
                  <th class="p-3.5">Cosecha Est.</th>
                  <th class="p-3.5 text-right">Acción</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${cultivos.length ? cultivos.map(c => {
                  const estadoBadge = c.estado === 'Saludable'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : c.estado === 'Advertencia'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200';
                  const lote = state.lotes.find(item => item.id === c.loteId);
                  const fincaNombre = getFincaNombreForLote(lote) || c.fincaNombre;

                  return `
                    <tr class="hover:bg-slate-50/70 transition-colors">
                      <td class="p-3.5 font-bold text-slate-900">
                        <button onclick="window.switchView('ficha_cultivo', '${c.id}')" class="hover:text-emerald-700 hover:underline text-left">
                          ${c.nombre}
                        </button>
                        <span class="block text-[10px] text-slate-400 font-normal">${c.variedad}</span>
                      </td>
                      <td class="p-3.5 text-slate-600">${c.tipoCultivo}</td>
                      <td class="p-3.5 text-slate-600">${fincaNombre}</td>
                      <td class="p-3.5 font-mono text-slate-700">${c.loteNombre}</td>
                      <td class="p-3.5 font-mono text-slate-500">${c.fechaSiembra}</td>
                      <td class="p-3.5">
                        <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${estadoBadge}">
                          ${c.estado}
                        </span>
                      </td>
                      <td class="p-3.5 font-mono text-slate-600">${c.fechaCosechaEstimada}</td>
                      <td class="p-3.5 text-right">
                        <div class="flex items-center justify-end gap-1.5">
                          <button onclick="window.switchView('ficha_cultivo', '${c.id}')" class="p-1 text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors" title="Ver ficha de cultivo" aria-label="Ver ficha de ${c.nombre}">
                            <i data-lucide="eye" class="w-4 h-4"></i>
                          </button>
                          ${isClient ? '' : `<button onclick="window.editCultivoModal('${c.id}')" class="p-1 text-slate-400 hover:text-indigo-600 rounded-lg" title="Editar Cultivo (RF-019)">
                            <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
                          </button>`}
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('') : '<tr><td colspan="8" class="p-5 text-center text-slate-500">No hay cultivos registrados para esta finca.</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Comparative Chart Widget (Right side of Page 5) -->
        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-4">
          <div class="border-b border-slate-100 pb-2">
            <h4 class="font-bold text-slate-900 text-xs">Comparativa de Cultivos</h4>
            <p class="text-[11px] text-slate-400 mt-0.5">Vigor y distribución por lote</p>
          </div>

          <div class="space-y-3 pt-1">
            ${cultivos.length ? cultivos.slice(0, 5).map(cultivo => {
              const lote = state.lotes.find(item => item.id === cultivo.loteId);
              const humedad = Number(cultivo.humedad ?? lote?.humedadSuelo ?? 0);
              const color = humedad < 40 ? 'bg-amber-400' : 'bg-emerald-500';
              return `
                <div>
                  <div class="flex justify-between text-xs mb-1">
                    <span class="font-semibold text-slate-700">${cultivo.nombre} (${cultivo.loteNombre})</span>
                    <span class="text-slate-600 font-bold font-mono">${humedad}% Hum</span>
                  </div>
                  <div class="w-full bg-slate-100 rounded-full h-2">
                    <div class="${color} h-2 rounded-full" style="width: ${Math.max(0, Math.min(100, humedad))}%"></div>
                  </div>
                </div>
              `;
            }).join('') : '<p class="text-xs text-slate-500">No hay cultivos registrados para esta finca.</p>'}
          </div>
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// SCREEN 5: FICHA DE CULTIVO (Mockup Page 6)
// ----------------------------------------------------
function renderFichaCultivoView() {
  const cultivos = getVisibleRecords(state.cultivos);
  const c = cultivos.find(item => item.id === state.selectedCultivoId) || cultivos[0];
  if (!c) {
    return '<div class="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">No hay cultivos registrados para esta finca.</div>';
  }
  const cultivoLote = state.lotes.find(item => item.id === c.loteId);
  const fincaNombre = getFincaNombreForLote(cultivoLote) || c.fincaNombre;
  const isClient = state.currentRole === 'cliente';
  const actividades = getVisibleRecords(state.actividades).filter(item =>
    item.cultivoId === c.id || item.loteId === c.loteId || item.loteId === c.loteNombre
  );
  const alertas = getVisibleRecords(state.alertas).filter(alerta => {
    const referenciaLote = alerta.loteId || alerta.lote;
    return referenciaLote === c.loteId ||
      referenciaLote === c.loteNombre ||
      String(referenciaLote || '').startsWith(`${c.loteNombre} (`);
  });

  return `
    <div class="space-y-6">
      <!-- Title & Actions Bar (Page 6) -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div class="space-y-1">
          <div class="flex items-center gap-3">
            <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">${c.nombre}</h1>
            <span class="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1.5">
              <i data-lucide="alert-triangle" class="w-3.5 h-3.5"></i>
              Estado actual: ${c.estado}
            </span>
          </div>
          <p class="text-xs text-slate-500">
            ${fincaNombre} · ${c.loteNombre} · Variedad: <strong>${c.variedad}</strong>
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <button onclick="window.switchView('cultivos')" class="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5">
            <i data-lucide="arrow-left" class="w-4 h-4"></i>
            <span>Volver a lista</span>
          </button>

          ${isClient ? '' : `<button onclick="window.editCultivoModal('${c.id}')" class="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5">
            <i data-lucide="edit-3" class="w-4 h-4"></i>
            <span>Editar</span>
          </button>`}

          ${isClient ? '' : `<button onclick="window.openNewActividadModal('${c.id}')" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5">
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>Registrar actividad</span>
          </button>`}
        </div>
      </div>

      <!-- 4 Metric Chips (Page 6) -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p class="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Fecha de siembra</p>
          <p class="text-base font-bold text-slate-900 font-mono mt-1">${c.fechaSiembra}</p>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p class="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Área cultivada</p>
          <p class="text-base font-bold text-slate-900 font-mono mt-1">${c.areaSembrada} hectáreas</p>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p class="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Etapa de crecimiento</p>
          <p class="text-base font-bold text-slate-900 font-mono mt-1">plantas: ${c.densidadPlantas.toLocaleString()}</p>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p class="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Etapa estimada / Cosecha</p>
          <p class="text-base font-bold text-emerald-700 font-mono mt-1">${c.etapaCrecimiento} (${c.fechaCosechaEstimada})</p>
        </div>
      </div>

      <!-- Section: Condiciones Actuales (Page 6) -->
      <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
        <h3 class="font-bold text-slate-900 text-sm">Condiciones actuales del cultivo</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="p-3 bg-amber-50/60 border border-amber-200 rounded-xl">
            <span class="text-xs text-amber-800 font-semibold">Humedad del suelo</span>
            <p class="text-2xl font-black text-amber-700 font-mono mt-1">⚠️ ${c.humedad}%</p>
            <span class="text-[10px] text-amber-600">Bajo umbral (mín 40%)</span>
          </div>

          <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span class="text-xs text-slate-500 font-semibold">Temperatura</span>
            <p class="text-2xl font-black text-slate-800 font-mono mt-1">${c.temperatura}</p>
            <span class="text-[10px] text-slate-400">Rango diurno / nocturno</span>
          </div>

          <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span class="text-xs text-slate-500 font-semibold">Radiación solar</span>
            <p class="text-2xl font-black text-slate-800 font-mono mt-1">${c.radiacion}</p>
            <span class="text-[10px] text-slate-400">Piranómetro activo</span>
          </div>

          <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span class="text-xs text-slate-500 font-semibold">pH del suelo</span>
            <p class="text-2xl font-black text-slate-800 font-mono mt-1">pH ${c.ph}</p>
            <span class="text-[10px] text-emerald-600">Rango óptimo para tomate</span>
          </div>
        </div>

        <!-- Trend Graph (Page 6) -->
        <div class="pt-4 border-t border-slate-100">
          <div class="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Tendencia histórica de humedad y radiación solar</span>
            <span class="font-mono">Últimos 14 días</span>
          </div>
          <div class="h-32 w-full">
            <svg class="w-full h-full overflow-visible" viewBox="0 0 600 120" preserveAspectRatio="none">
              <!-- Grid -->
              <line x1="0" y1="30" x2="600" y2="30" stroke="#f1f5f9" stroke-width="1" />
              <line x1="0" y1="70" x2="600" y2="70" stroke="#f1f5f9" stroke-width="1" />
              <line x1="0" y1="110" x2="600" y2="110" stroke="#f1f5f9" stroke-width="1" />

              <!-- Humidity curve in amber -->
              <path
                d="M 0,50 Q 100,40 200,60 T 350,90 T 500,105 T 600,100"
                fill="none"
                stroke="#ca8a04"
                stroke-width="2.5"
              />

              <!-- Optimal baseline line -->
              <line x1="0" y1="65" x2="600" y2="65" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,4" />
            </svg>
          </div>
          <div class="flex items-center gap-4 text-[11px] text-slate-400 mt-1">
            <div class="flex items-center gap-1.5"><span class="w-3 h-0.5 bg-amber-500"></span> Humedad real (descendiente)</div>
            <div class="flex items-center gap-1.5"><span class="w-3 h-0.5 bg-emerald-500 border-dashed"></span> Umbral deseado (45%-60%)</div>
          </div>
        </div>
      </div>

      <!-- Two Side-by-Side Cards: Actividades Recientes & Alertas Relacionadas (Page 6) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Actividades Recientes -->
        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-3">
          <h4 class="font-bold text-slate-900 text-xs border-b border-slate-100 pb-2 flex items-center gap-2">
            <i data-lucide="calendar" class="w-4 h-4 text-emerald-600"></i>
            Actividades recientes
          </h4>
          <div class="space-y-2 text-xs">
            ${actividades.length ? actividades.slice(0, 5).map(activity => `
              <div class="flex items-center justify-between gap-3 p-2 rounded-lg bg-slate-50">
                <span class="font-semibold text-slate-800">${activity.tipoActividad} · ${activity.descripcion}</span>
                <span class="shrink-0 text-slate-400 font-mono">${activity.fecha}</span>
              </div>
            `).join('') : '<p class="text-slate-500">No hay actividades registradas para este cultivo.</p>'}
          </div>
        </div>

        <!-- Alertas Relacionadas -->
        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-3">
          <h4 class="font-bold text-slate-900 text-xs border-b border-slate-100 pb-2 flex items-center gap-2">
            <i data-lucide="bell" class="w-4 h-4 text-amber-500"></i>
            Alertas relacionadas
          </h4>
          <div class="space-y-2 text-xs">
            ${alertas.length ? alertas.slice(0, 5).map(alerta => `
              <div class="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200">
                <p class="font-bold text-amber-900">${alerta.titulo}</p>
                <p class="text-[11px] text-amber-800 mt-0.5">${alerta.detalle}</p>
              </div>
            `).join('') : '<p class="text-slate-500">No hay alertas para esta finca.</p>'}
          </div>
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// OTHER MODULE VIEWS: SENSORES, CLIMA, ALERTAS, ETC.
// ----------------------------------------------------
function renderSensoresView() {
  const sensores = getVisibleRecords(state.sensores);
  const isClient = state.currentRole === 'cliente';
  return `
    <div class="space-y-5">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-slate-900">Red de Sensores IoT</h1>
          <p class="text-xs text-slate-500 mt-0.5">Telemetría en tiempo real y estado de baterías por lote.</p>
        </div>
        ${isClient ? '' : `<button onclick="window.openNewSensorModal()" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2">
          <i data-lucide="plus" class="w-4 h-4"></i>
          <span>Registrar Sensor</span>
        </button>`}
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${sensores.length ? sensores.map(s => `
          <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-bold text-slate-400">${s.codigo}</span>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${s.estado === 'Saludable' || s.estado === 'Normal' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}">
                ${s.estado}
              </span>
            </div>
            <div>
              <h3 class="font-bold text-slate-900 text-sm">${s.tipo}</h3>
              <p class="text-xs text-slate-500">${s.lote}</p>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
              <span class="text-xs text-slate-500">Lectura actual:</span>
              <span class="text-xl font-bold font-mono text-slate-900">${s.valor}</span>
            </div>
            <div class="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
              <span>Batería: <strong>${s.bateria}%</strong></span>
              <span>${s.senal}</span>
            </div>
          </div>
        `).join('') : '<p class="col-span-full rounded-xl border border-slate-200 bg-white p-5 text-xs text-slate-500">No hay sensores registrados para esta finca.</p>'}
      </div>
    </div>
  `;
}

function renderClimaView() {
  return `
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-slate-900">Estación Agroclimática</h1>
        <p class="text-xs text-slate-500 mt-0.5">Monitoreo meteorológico para programación de riego y labores de campo.</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p class="text-xs text-slate-400">Temperatura</p>
          <p class="text-3xl font-extrabold text-slate-900 font-mono mt-1">24°C</p>
          <p class="text-[11px] text-slate-500 mt-1">Mín 18°C / Máx 28°C</p>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p class="text-xs text-slate-400">Humedad Relativa</p>
          <p class="text-3xl font-extrabold text-slate-900 font-mono mt-1">68%</p>
          <p class="text-[11px] text-slate-500 mt-1">Rocío matutino normal</p>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p class="text-xs text-slate-400">Precipitación 24h</p>
          <p class="text-3xl font-extrabold text-emerald-700 font-mono mt-1">12 mm</p>
          <p class="text-[11px] text-slate-500 mt-1">Lluvia ligera registrada</p>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p class="text-xs text-slate-400">Radiación Solar</p>
          <p class="text-3xl font-extrabold text-amber-600 font-mono mt-1">120 W/m²</p>
          <p class="text-[11px] text-slate-500 mt-1">Nubosidad variable</p>
        </div>
      </div>
    </div>
  `;
}

function renderAlertasView() {
  const alertas = getVisibleRecords(state.alertas);
  const isClient = state.currentRole === 'cliente';
  return `
    <div class="space-y-5">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-slate-900">Centro de Alertas</h1>
        <p class="text-xs text-slate-500 mt-0.5">Notificaciones críticas y recomendaciones técnicas generadas por los sensores.</p>
      </div>

      <div class="space-y-3">
        ${alertas.length ? alertas.map(a => `
          <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex items-start justify-between gap-4">
            <div class="flex items-start gap-3">
              <span class="w-3 h-3 rounded-full mt-1.5 ${a.severidad === 'Advertencia' ? 'bg-amber-500' : 'bg-emerald-500'}"></span>
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="font-bold text-slate-900 text-sm">${a.titulo}</h3>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${a.severidad === 'Advertencia' ? 'bg-amber-50 text-amber-800' : 'bg-emerald-50 text-emerald-800'}">
                    ${a.severidad}
                  </span>
                </div>
                <p class="text-xs text-slate-600 mt-1">${a.detalle}</p>
                <p class="text-[11px] text-slate-400 mt-2 font-mono">Ubicación: ${a.lote} · Registrado: ${a.fecha}</p>
              </div>
            </div>
            ${isClient ? '' : `<button onclick="window.resolverAlerta('${a.id}')" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl whitespace-nowrap">
              Marcar Atendida
            </button>`}
          </div>
        `).join('') : '<p class="rounded-xl border border-slate-200 bg-white p-5 text-xs text-slate-500">No hay alertas para esta finca.</p>'}
      </div>
    </div>
  `;
}

function renderActividadesView() {
  const actividades = getVisibleRecords(state.actividades);
  const isClient = state.currentRole === 'cliente';
  return `
    <div class="space-y-5">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-slate-900">Bitácora de Actividades Agrícolas</h1>
          <p class="text-xs text-slate-500 mt-0.5">Registro cronológico de riego, fertilización, podas y labores fitosanitarias.</p>
        </div>
        ${isClient ? '' : `<button onclick="window.openNewActividadModal()" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2">
          <i data-lucide="plus" class="w-4 h-4"></i>
          <span>Registrar Actividad</span>
        </button>`}
      </div>

      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div class="overflow-x-auto">
        <table class="w-full min-w-[720px] text-left text-xs">
          <thead class="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
            <tr>
              <th class="p-3.5">Labor</th>
              <th class="p-3.5">Cultivo / Lote</th>
              <th class="p-3.5">Descripción</th>
              <th class="p-3.5">Responsable</th>
              <th class="p-3.5">Fecha</th>
              <th class="p-3.5">Estado</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${actividades.length ? actividades.map(a => `
              <tr class="hover:bg-slate-50/70 transition-colors">
                <td class="p-3.5 font-bold text-slate-900">${a.tipoActividad}</td>
                <td class="p-3.5 text-slate-600">${a.loteId}</td>
                <td class="p-3.5 text-slate-600">${a.descripcion}</td>
                <td class="p-3.5 text-slate-700">${a.responsable}</td>
                <td class="p-3.5 font-mono text-slate-500">${a.fecha}</td>
                <td class="p-3.5">
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                    ${a.estado}
                  </span>
                </td>
              </tr>
            `).join('') : '<tr><td colspan="6" class="p-5 text-center text-slate-500">No hay actividades registradas para esta finca.</td></tr>'}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  `;
}

function renderProduccionView() {
  const produccion = getVisibleRecords(state.produccion);
  const isClient = state.currentRole === 'cliente';
  return `
    <div class="space-y-5">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-slate-900">Producción y Cosecha</h1>
          <p class="text-xs text-slate-500 mt-0.5">Control de cosechas, rendimientos por hectárea y compradores de destino.</p>
        </div>
        <div class="flex items-center gap-2">
          ${isClient ? '' : `<button onclick="window.exportCSVAction()" class="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center gap-1.5">
            <i data-lucide="download" class="w-4 h-4"></i>
            <span>Exportar CSV</span>
          </button>`}
          ${isClient ? '' : `<button onclick="window.openNewProduccionModal()" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2">
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>Registrar Cosecha</span>
          </button>`}
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div class="overflow-x-auto">
        <table class="w-full min-w-[760px] text-left text-xs">
          <thead class="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
            <tr>
              <th class="p-3.5">Fecha</th>
              <th class="p-3.5">Lote</th>
              <th class="p-3.5">Cantidad</th>
              <th class="p-3.5">Rendimiento</th>
              <th class="p-3.5">Calidad</th>
              <th class="p-3.5">Comprador Destino</th>
              ${isClient ? '' : '<th class="p-3.5 text-right">Acción (RF-034)</th>'}
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${produccion.length ? produccion.map(p => `
              <tr class="hover:bg-slate-50/70 transition-colors">
                <td class="p-3.5 font-mono text-slate-500">${p.fechaCosecha}</td>
                <td class="p-3.5 font-bold text-slate-900">${p.loteId}</td>
                <td class="p-3.5 font-mono font-bold text-emerald-700">${p.cantidad} ${p.unidadMedida}</td>
                <td class="p-3.5 font-mono text-slate-700">${p.rendimientoHa ? p.rendimientoHa.toFixed(1) : '—'} Kg/Ha</td>
                <td class="p-3.5 text-slate-600">${p.calidad}</td>
                <td class="p-3.5 text-slate-600">${p.compradorDestino}</td>
                ${isClient ? '' : `<td class="p-3.5 text-right">
                  <button onclick="window.editProduccionModal('${p.id}')" class="p-2 bg-slate-100 hover:bg-slate-200 text-emerald-800 rounded-lg transition-colors" title="Actualizar producción" aria-label="Actualizar producción de ${p.loteId}">
                    <i data-lucide="edit-3" class="w-4 h-4 text-emerald-600"></i>
                  </button>
                </td>`}
              </tr>
            `).join('') : `<tr><td colspan="${isClient ? 6 : 7}" class="p-5 text-center text-slate-500">No hay cosechas registradas para esta finca.</td></tr>`}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  `;
}

function renderUsuariosView() {
  return `
    <div class="space-y-5">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-slate-900">Usuarios y Permisos</h1>
          <p class="text-xs text-slate-500 mt-0.5">Control de acceso por perfil: ingeniería, cliente, técnico, operario y administración.</p>
        </div>
        <button onclick="window.openNewUserModal()" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2">
          <i data-lucide="plus" class="w-4 h-4"></i>
          <span>Registrar Usuario</span>
        </button>
      </div>

      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div class="overflow-x-auto">
        <table class="w-full min-w-[720px] text-left text-xs">
          <thead class="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
            <tr>
              <th class="p-3.5">Nombre</th>
              <th class="p-3.5">Correo</th>
              <th class="p-3.5">Documento</th>
              <th class="p-3.5">Rol</th>
              <th class="p-3.5">Finca</th>
              <th class="p-3.5">Estado</th>
              <th class="p-3.5 text-right">Sesión Rápida</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${state.users.map(u => `
              <tr class="hover:bg-slate-50/70 transition-colors">
                <td class="p-3.5 font-bold text-slate-900">${escapeHtml(u.nombre)}</td>
                <td class="p-3.5 text-slate-600 font-mono">${escapeHtml(u.correo)}</td>
                <td class="p-3.5 font-mono text-slate-500">${escapeHtml(u.documento)}</td>
                <td class="p-3.5">
                  <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${u.rol === 'agronomo' ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-700'}">
                    ${u.rol}
                  </span>
                </td>
                <td class="p-3.5 text-slate-600">${state.fincas.find(finca => finca.id === u.fincaId)?.nombre || '—'}</td>
                <td class="p-3.5">
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${u.estado === 'activo' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}">
                    ${u.estado}
                  </span>
                </td>
                <td class="p-3.5 text-right">
                  <button onclick="window.quickLogin(this.dataset.email)" data-email="${escapeHtml(u.correo)}" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold">
                    Iniciar como
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  `;
}

window.openNewUserModal = function() {
  const container = document.getElementById('modal-container');
  if (!container) return;
  const farmOptions = state.fincas.map(finca => `<option value="${finca.id}">${finca.nombre}</option>`).join('');
  const bodyHTML = `
    <form novalidate onsubmit="window.saveNewAppUser(event)" class="space-y-4">
      <div>
        <label for="app-user-name" class="block text-xs font-semibold text-slate-700 mb-1">Nombre completo *</label>
        <input id="app-user-name" name="nombre" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label for="app-user-document" class="block text-xs font-semibold text-slate-700 mb-1">Documento *</label>
          <input id="app-user-document" name="documento" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
        </div>
        <div>
          <label for="app-user-email" class="block text-xs font-semibold text-slate-700 mb-1">Correo electrónico *</label>
          <input id="app-user-email" name="correo" type="email" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label for="app-user-role" class="block text-xs font-semibold text-slate-700 mb-1">Rol *</label>
          <select id="app-user-role" name="rol" required onchange="document.getElementById('app-user-farm-field').classList.toggle('hidden', this.value !== 'cliente'); document.getElementById('app-user-farm').required = this.value === 'cliente'" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">
            <option value="cliente">Cliente (finca)</option>
            <option value="tecnico">Técnico (quejas)</option>
            <option value="agronomo">Ingeniero agrónomo</option>
            <option value="operario">Operario</option>
            <option value="administrador">Administrador</option>
          </select>
        </div>
        <div id="app-user-farm-field">
          <label for="app-user-farm" class="block text-xs font-semibold text-slate-700 mb-1">Finca asignada *</label>
          <select id="app-user-farm" name="fincaId" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">
            <option value="">Selecciona una finca</option>
            ${farmOptions}
          </select>
        </div>
      </div>
      <div class="flex justify-end gap-2 pt-3 border-t border-slate-100">
        <button type="button" onclick="window.closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl">Cancelar</button>
        <button type="submit" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white font-semibold text-xs rounded-xl">Registrar usuario</button>
      </div>
    </form>
  `;
  container.innerHTML = renderModalWrapper('Registrar Usuario', 'user-plus', bodyHTML);
  if (window.lucide) window.lucide.createIcons();
};

window.saveNewAppUser = function(event) {
  event.preventDefault();
  if (!validateForm(event)) return;
  const form = event.currentTarget;
  const nombre = form.elements.nombre.value.trim();
  const documento = form.elements.documento.value.trim();
  const correo = form.elements.correo.value.trim().toLowerCase();
  const duplicate = state.users.some(user =>
    user.documento === documento || user.correo?.toLowerCase() === correo
  );
  if (duplicate) {
    let feedback = form.querySelector('[data-form-feedback]');
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
  const role = form.elements.rol.value;
  state.users.push({
    id: 'usr-' + Date.now(),
    nombre,
    documento,
    correo,
    telefono: '',
    rol: role,
    ...(role === 'cliente' ? { fincaId: form.elements.fincaId.value } : {}),
    estado: 'activo'
  });
  state.save();
  window.closeModal();
  renderCurrentView();
  window.showToast('Registro exitoso. El usuario quedó creado correctamente.');
};

function renderConfiguracionView() {
  return `
    <div class="space-y-6 max-w-4xl">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-slate-900">Configuración del Sistema</h1>
        <p class="text-xs text-slate-500 mt-0.5">Parámetros de telemetría, frecuencias de muestreo y umbrales de alerta.</p>
      </div>

      <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
        <h3 class="font-bold text-slate-900 text-sm">Créditos y Autores de AgroControl</h3>
        <p class="text-xs text-slate-600 leading-relaxed">
          Sistema agropecuario desarrollado bajo los lineamientos y especificaciones técnicas oficiales por:
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 font-medium text-slate-800">
            🌱 <strong>Omar Leonardo Dangond Rueda</strong>
          </div>
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 font-medium text-slate-800">
            🌱 <strong>Deyner Styck Herrera Correa</strong>
          </div>
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 font-medium text-slate-800">
            🌱 <strong>Hervis Augusto Castellano Pedraza</strong>
          </div>
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 font-medium text-slate-800">
            🌱 <strong>Daniel Mauricio Vesga Tibaduiza</strong>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// LOGIN SCREEN (Mockup Page 2)
// ----------------------------------------------------
function renderLoginScreen(mode = 'login') {
  const container = document.getElementById('login-container');
  if (!container) return;
  const isRegistration = mode === 'register';

  container.innerHTML = `
    <div class="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[520px]">
      <!-- Left Column: Form -->
      <div class="p-8 sm:p-10 flex flex-col justify-between space-y-6">
        <div>
          <!-- Logo Header -->
          <div class="flex items-center gap-2 mb-6">
            <div class="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-600">
              <i data-lucide="sprout" class="w-5 h-5"></i>
            </div>
            <span class="font-bold text-lg text-slate-900 tracking-tight">AgroControl</span>
          </div>

          <div class="space-y-1">
            <h2 class="text-2xl font-bold tracking-tight text-slate-900">${isRegistration ? 'Crea tu cuenta' : 'Bienvenido a AgroControl'}</h2>
            <p class="text-xs text-slate-500 leading-relaxed">
                ${isRegistration ? 'No necesitas Gmail: usa cualquier correo válido y crea una contraseña.' : 'Accede con cualquier correo registrado y tu contraseña, o continúa con Google.'}
            </p>
          </div>
        </div>

        <form novalidate onsubmit="window.${isRegistration ? 'handleRegistrationFormSubmit' : 'handleLoginFormSubmit'}(event)" class="space-y-4">
          ${isRegistration ? `
          <div>
            <label for="register-name" class="block text-xs font-semibold text-slate-700 mb-1">Nombre completo</label>
            <div class="relative">
              <i data-lucide="user-round" class="w-4 h-4 text-slate-400 absolute left-3 top-3"></i>
              <input type="text" id="register-name" autocomplete="name" required class="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all" placeholder="Tu nombre" />
            </div>
          </div>
          ` : ''}
          <div>
            <label for="${isRegistration ? 'register-email' : 'login-email'}" class="block text-xs font-semibold text-slate-700 mb-1">Correo electrónico${isRegistration ? ' (no necesitas Gmail)' : ''}</label>
            <div class="relative">
              <i data-lucide="mail" class="w-4 h-4 text-slate-400 absolute left-3 top-3"></i>
              <input
                type="email"
                id="${isRegistration ? 'register-email' : 'login-email'}"
                autocomplete="email"
                required
                class="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                placeholder="nombre@correo.com"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-1">
              <label for="${isRegistration ? 'register-password' : 'login-pass'}" class="block text-xs font-semibold text-slate-700">Contraseña</label>
              ${isRegistration ? '' : `<button type="button" onclick="window.showLoginMessage('La recuperación de contraseña estará disponible próximamente.')" class="text-[11px] text-emerald-700 hover:underline">
                ¿Olvidaste tu contraseña?
              </button>`}
            </div>
            <div class="relative">
              <i data-lucide="lock" class="w-4 h-4 text-slate-400 absolute left-3 top-3"></i>
              <input
                type="password"
                id="${isRegistration ? 'register-password' : 'login-pass'}"
                autocomplete="${isRegistration ? 'new-password' : 'current-password'}"
                minlength="6"
                required
                class="w-full pl-9 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
          </div>

          <button type="submit" class="w-full py-2.5 bg-[#1B794B] hover:bg-[#166534] text-white font-bold text-xs rounded-xl shadow-xs transition-all">
            ${isRegistration ? 'Crear cuenta' : 'Iniciar sesión'}
          </button>
          <p id="login-feedback" class="hidden text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2" role="status" aria-live="polite"></p>

          <div class="relative flex items-center py-1">
            <div class="grow border-t border-slate-200"></div>
            <span class="px-3 text-[11px] text-slate-400">o</span>
            <div class="grow border-t border-slate-200"></div>
          </div>
          <button type="button" onclick="window.handleGoogleSignIn()" class="w-full py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl border border-slate-300 transition-all flex items-center justify-center gap-2">
            <svg aria-hidden="true" viewBox="0 0 48 48" class="w-4 h-4"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.75 7.18l7.7 5.98c4.5-4.16 7.09-10.3 7.09-17.63z"/><path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.82l-7.7-5.98c-2.14 1.44-4.89 2.3-8.2 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
            Continuar con Google
          </button>

          ${isFirebaseConfigured ? '' : `
          <div class="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
            <span>Cuenta local en este navegador:</span>
            <div class="flex flex-wrap gap-x-1.5 gap-y-1">
              <button type="button" onclick="window.quickLogin('juan.diaz@agrocontrol.io')" class="font-bold text-emerald-700 hover:underline">Juan</button>
              <span>·</span>
              <button type="button" onclick="window.quickLogin('carlos.restrepo@sena.edu.co')" class="font-bold text-emerald-700 hover:underline">Carlos</button>
              <span>·</span>
              <button type="button" onclick="window.quickLogin('juan.perez@agrocontrol.io')" class="font-bold text-indigo-700 hover:underline">Técnico</button>
              <span>·</span>
              <button type="button" onclick="window.quickLogin('cliente.paraiso@finca.com')" class="font-bold text-amber-700 hover:underline">Cliente</button>
            </div>
            <span class="w-full">Google requiere Firebase; no hace falta Gmail para registrarse con contraseña.</span>
          </div>
          `}
        </form>

        <div class="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
          <span>${isRegistration ? '¿Ya tienes cuenta?' : '¿Aún no tienes cuenta?'}</span>
          <button type="button" onclick="window.${isRegistration ? 'showLoginForm' : 'showRegistrationForm'}()" class="font-bold text-emerald-700 hover:underline ml-1">
            ${isRegistration ? 'Inicia sesión.' : 'Regístrate aquí.'}
          </button>
        </div>
      </div>

      <!-- Right Column: Precision Agriculture Illustration (Page 2) -->
      <div class="relative bg-slate-900 hidden md:block overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-[#0e2c1c] via-[#184833] to-[#0a1e14]">
          <img
            src="/images/login_precision_agri.jpg"
            alt="Agricultura de precisión e IoT"
            class="w-full h-full object-cover opacity-90"
            onerror="this.onerror=null; this.src='/images/finca_paraiso.jpg';"
          />
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white space-y-2">
          <span class="inline-block text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30 w-max">
            Agricultura de Precisión
          </span>
          <h3 class="text-lg font-bold">Monitoreo Satelital & Sensores IoT</h3>
          <p class="text-xs text-slate-300 leading-relaxed">
            Optimiza el rendimiento de tus lotes y controla el uso eficiente del agua con datos en tiempo real.
          </p>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}

window.showRegistrationForm = function() {
  renderLoginScreen('register');
};

window.showLoginForm = function() {
  renderLoginScreen('login');
};

window.handleLoginFormSubmit = function(event) {
  return window.handleAccountFormSubmit(event);
};

window.handleAccountFormSubmit = async function(event) {
  event.preventDefault();
  if (!validateForm(event)) return;

  const isRegistration = event.currentTarget.querySelector('#register-email') !== null;
  const email = document.getElementById(isRegistration ? 'register-email' : 'login-email')?.value.trim();
  const password = document.getElementById(isRegistration ? 'register-password' : 'login-pass')?.value;
  const name = document.getElementById('register-name')?.value.trim();
  const submitButton = event.currentTarget.querySelector('button[type="submit"]');
  if (!email || !password || (isRegistration && !name)) return;

  submitButton.disabled = true;
  try {
    const authenticatedUser = isFirebaseConfigured
      ? isRegistration
        ? await registerWithPassword(name, email, password)
        : await loginWithPassword(email, password)
      : isRegistration
        ? await registerLocally(name, email, password)
        : await loginLocally(email, password);
    state.setAuthenticatedUser(authenticatedUser, isFirebaseConfigured ? 'firebase' : 'local');
    updateUIState();
  } catch (error) {
    window.showLoginMessage(getAuthErrorMessage(error));
  } finally {
    submitButton.disabled = false;
  }
};

window.handleGoogleSignIn = async function() {
  try {
    const firebaseUser = await loginWithGoogle();
    state.setAuthenticatedUser(firebaseUser, 'firebase');
    updateUIState();
  } catch (error) {
    window.showLoginMessage(getAuthErrorMessage(error));
  }
};

window.handleRegistrationFormSubmit = function(event) {
  return window.handleAccountFormSubmit(event);
};

window.showLoginMessage = function(message, isError = true) {
  const feedback = document.getElementById('login-feedback');
  if (feedback) {
    feedback.textContent = message;
    feedback.className = isError
      ? 'text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2'
      : 'text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2';
    feedback.classList.remove('hidden');
  }
};

// ----------------------------------------------------
// MODALS & ACTIONS (Cultivo Edit, Producción Edit, etc.)
// ----------------------------------------------------
function renderModalWrapper(title, iconName, bodyHTML, maxWidthClass = 'max-w-lg') {
  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div class="bg-white rounded-3xl shadow-2xl border border-slate-200/80 w-full ${maxWidthClass} overflow-hidden flex flex-col max-h-[92vh]">
        <div class="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div class="flex items-center gap-2.5">
            <div class="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
              <i data-lucide="${iconName}" class="w-4 h-4"></i>
            </div>
            <h3 class="text-sm font-bold text-slate-900">${title}</h3>
          </div>
          <button onclick="window.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>
        <div class="p-4 sm:p-6 overflow-y-auto flex-1">
          ${bodyHTML}
        </div>
      </div>
    </div>
  `;
}

window.openFincaDetailModal = function(fincaId) {
  const container = document.getElementById('modal-container');
  if (!container) return;

  if (!canClientAccessFinca(fincaId)) return;
  const f = state.fincas.find(item => item.id === fincaId);
  if (!f) return;
  const isClient = state.currentRole === 'cliente';
  const cultivoCount = getRecordsForFinca(state.cultivos, f.id).length;
  const sensorCount = getRecordsForFinca(state.sensores, f.id).length;

  const isSelected = f.id === state.selectedFincaId;
  const statusClass = f.estado.includes('Saludable')
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : f.estado.includes('Monitoreo')
      ? 'bg-amber-50 text-amber-700 border-amber-200'
      : 'bg-rose-50 text-rose-700 border-rose-200';

  const fincaLotes = state.getLotesForFinca(f.id);

  const bodyHTML = `
    <div class="space-y-5">
      <!-- Finca Photo Banner -->
      <div class="relative h-48 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-inner">
        <img
          src="${f.imagen}"
          alt="${escapeHtml(f.nombre)}"
          class="w-full h-full object-cover"
          onerror="this.onerror=null; this.src='/images/finca_palmas.jpg';"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
          <div class="flex items-center justify-between gap-2 mb-1">
            <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${statusClass}">
              ${f.estado}
            </span>
            ${isSelected ? `
              <span class="bg-[#1B794B] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
                Finca Activa
              </span>
            ` : ''}
          </div>
          <h2 class="text-xl font-bold tracking-tight text-white">${escapeHtml(f.nombre)}</h2>
          <p class="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
            <i data-lucide="map-pin" class="w-3.5 h-3.5 text-emerald-400"></i>
            ${escapeHtml(f.ubicacion)} · Responsable: ${escapeHtml(f.responsable)}
          </p>
        </div>
      </div>

      <!-- 4 Quick Stats -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div class="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Área Total</span>
          <p class="text-lg font-black text-slate-900 font-mono mt-0.5">${f.areaTotal} Ha</p>
        </div>
        <div class="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cultivos</span>
          <p class="text-lg font-black text-slate-900 font-mono mt-0.5">${isClient ? cultivoCount : f.cultivosActivos} Activos</p>
        </div>
        <div class="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sensores IoT</span>
          <p class="text-lg font-black text-slate-900 font-mono mt-0.5">${isClient ? sensorCount : f.sensoresActivos} Online</p>
        </div>
        <div class="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Salud Finca</span>
          <p class="text-xs font-bold text-emerald-700 mt-1">${f.estado}</p>
        </div>
      </div>

      <!-- Technical Description -->
      <div class="p-3.5 bg-emerald-50/50 border border-emerald-100 rounded-2xl text-xs text-slate-700 space-y-1">
        <span class="font-bold text-emerald-900 flex items-center gap-1.5 text-xs">
          <i data-lucide="info" class="w-3.5 h-3.5 text-emerald-700"></i>
          Resumen Técnico del Predio
        </span>
        <p class="text-slate-600 text-[11px] leading-relaxed">
          ${f.descripcion || 'Predio tecnificado registrado en la plataforma AgroControl con telemetría continua.'}
        </p>
        <p class="text-slate-600 text-[11px]"><strong>Producto principal:</strong> ${escapeHtml(getFarmMainProduct(f) || 'No indicado')}</p>
      </div>

      <!-- Lotes en esta Finca -->
      <div class="space-y-2.5">
        <div class="flex items-center justify-between border-b border-slate-100 pb-1.5">
          <h4 class="font-bold text-slate-900 text-xs flex items-center gap-1.5">
            <i data-lucide="layers" class="w-3.5 h-3.5 text-emerald-700"></i>
            Lotes y Parcelas Asociadas (${fincaLotes.length})
          </h4>
          <span class="text-[10px] text-slate-400">Monitoreo activo</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          ${fincaLotes.map(l => `
            <div class="p-3 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 transition-colors flex items-center justify-between">
              <div>
                <span class="font-bold text-xs text-slate-900 block">${l.identificador}</span>
                <span class="text-[11px] text-slate-500">${l.cultivoNombre} · ${l.area} Ha</span>
              </div>
              <div class="text-right">
                <span class="text-xs font-mono font-bold ${l.humedadSuelo < 40 ? 'text-amber-600' : 'text-emerald-600'}">
                  ${l.humedadSuelo}% Hum
                </span>
                <span class="block text-[9px] uppercase font-bold text-slate-400">${l.estado}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 border-t border-slate-100">
        <button type="button" onclick="window.closeModal()" class="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors">
          Cerrar
        </button>

        <div class="flex items-center gap-2 w-full sm:w-auto">
          <button type="button" onclick="window.selectFincaAndGoToTerrenos('${f.id}')" class="flex-1 sm:flex-none px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5">
            <i data-lucide="map" class="w-3.5 h-3.5 text-emerald-700"></i>
            <span>Ver en Terrenos y Lotes</span>
          </button>

          ${state.currentRole === 'cliente' ? '' : `<button type="button" onclick="window.selectFincaAndClose('${f.id}')" class="flex-1 sm:flex-none px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5">
            <i data-lucide="check" class="w-3.5 h-3.5"></i>
            <span>${isSelected ? 'Finca ya activa' : 'Seleccionar como Activa'}</span>
          </button>`}
        </div>
      </div>
    </div>
  `;

  container.innerHTML = renderModalWrapper(`Detalles de ${escapeHtml(f.nombre)}`, 'home', bodyHTML, 'max-w-2xl');
  if (window.lucide) window.lucide.createIcons();
};

window.selectFincaAndClose = function(fincaId) {
  if (!canClientAccessFinca(fincaId)) return;
  state.selectedFincaId = fincaId;
  const fincaLotes = state.getLotesForFinca(fincaId);
  if (fincaLotes.length > 0) {
    state.selectedLoteId = fincaLotes[0].id;
  }
  state.save();
  window.closeModal();
  renderHeader();
  renderCurrentView();
};

window.selectFincaAndGoToTerrenos = function(fincaId) {
  if (!canClientAccessFinca(fincaId)) return;
  state.selectedFincaId = fincaId;
  const fincaLotes = state.getLotesForFinca(fincaId);
  if (fincaLotes.length > 0) {
    state.selectedLoteId = fincaLotes[0].id;
  }
  state.save();
  window.closeModal();
  renderHeader();
  window.switchView('terrenos');
};


window.openNewFincaModal = function() {
  const isClient = state.currentRole === 'cliente';
  const container = document.getElementById('modal-container');
  if (!container) return;

  const bodyHTML = `
    <form novalidate onsubmit="window.saveNewFincaSubmit(event)" class="space-y-4">
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Nombre de la Finca *</label>
        <input type="text" id="new-finca-nombre" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600" placeholder="ej. Finca Santa Bárbara" />
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Ubicación / Departamento *</label>
          <input type="text" id="new-finca-ubicacion" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600" placeholder="ej. Santander, Colombia" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Área Total (Ha) *</label>
          <input type="number" min="0.5" step="0.5" id="new-finca-area" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600" placeholder="100" />
        </div>
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Responsable / Administrador *</label>
        <input type="text" id="new-finca-resp" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600" value="${escapeHtml(state.currentUser ? state.currentUser.nombre : '')}" />
      </div>
      <div class="flex justify-end gap-2 pt-3 border-t border-slate-100">
        <button type="button" onclick="window.closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl">Cancelar</button>
        <button type="submit" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white font-semibold text-xs rounded-xl shadow-xs">${isClient ? 'Agregar finca' : 'Guardar Finca'}</button>
      </div>
    </form>
  `;

  container.innerHTML = renderModalWrapper(isClient ? 'Agregar otra finca' : 'Registrar Nueva Finca', 'home', bodyHTML);
  if (window.lucide) window.lucide.createIcons();
};

window.saveNewFincaSubmit = function(event) {
  event.preventDefault();
  const isClient = state.currentRole === 'cliente';
  if (!state.currentUser || !validateForm(event)) return;
  const nombre = document.getElementById('new-finca-nombre').value.trim();
  const ubicacion = document.getElementById('new-finca-ubicacion').value.trim();
  const areaTotal = Number(document.getElementById('new-finca-area').value);
  const responsable = document.getElementById('new-finca-resp').value.trim();

  if (nombre && ubicacion && areaTotal) {
    const newFinca = {
      id: 'ter-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
      nombre,
      ubicacion,
      areaTotal,
      responsable,
      cultivosActivos: isClient ? 0 : 1,
      sensoresActivos: isClient ? 0 : 4,
      estado: 'Saludable',
      imagen: '/images/finca_palmas.jpg',
      descripcion: 'Predio registrado en AgroControl.'
    };
    state.fincas.push(newFinca);
    if (isClient) {
      state.currentUser.fincaIds = [...getClientFincaIds(state.currentUser), newFinca.id];
    }
    state.selectedFincaId = newFinca.id;
    state.selectedLoteId = state.getLotesForFinca(newFinca.id)[0]?.id || '';
    state.addAuditLog('Fincas', 'Registro', `Finca ${nombre} creada exitosamente.`);
    state.save();
    window.closeModal();
    renderHeader();
    renderCurrentView();
    window.showToast(isClient ? 'Finca agregada correctamente a tu cuenta.' : 'Registro exitoso: finca creada correctamente.');
  }
};

window.openNewLoteModal = function() {
  if (state.currentRole === 'cliente') return;
  const container = document.getElementById('modal-container');
  if (!container) return;

  const bodyHTML = `
    <form novalidate onsubmit="window.saveNewLoteSubmit(event)" class="space-y-4">
      ${renderFarmNameField('new-lote-finca')}
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Identificador del Lote *</label>
        <input type="text" id="new-lote-id" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600" placeholder="ej. Lote E - Cafetal Sur" />
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Cultivo Asignado *</label>
          <input type="text" id="new-lote-cultivo" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600" placeholder="ej. Café" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Área (Ha) *</label>
          <input type="number" min="0.1" step="0.1" id="new-lote-area" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600" placeholder="10" />
        </div>
      </div>
      <div class="flex justify-end gap-2 pt-3 border-t border-slate-100">
        <button type="button" onclick="window.closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl">Cancelar</button>
        <button type="submit" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white font-semibold text-xs rounded-xl shadow-xs">Guardar Lote</button>
      </div>
    </form>
  `;

  container.innerHTML = renderModalWrapper('Registrar Nuevo Lote', 'map', bodyHTML);
  if (window.lucide) window.lucide.createIcons();
};

window.saveNewLoteSubmit = function(event) {
  event.preventDefault();
  if (state.currentRole === 'cliente') return;
  if (!validateForm(event)) return;
  const identificador = document.getElementById('new-lote-id').value.trim();
  const cultivoNombre = document.getElementById('new-lote-cultivo').value.trim();
  const area = Number(document.getElementById('new-lote-area').value);

  if (identificador && cultivoNombre && area) {
    const newLote = {
      id: 'lot-' + Date.now(),
      terrenoId: state.selectedFincaId,
      identificador,
      cultivoNombre,
      area,
      estado: 'Saludable',
      humedadSuelo: 60,
      sensoresCount: 2,
      ultimaActualizacion: 'ahora',
      tipoSuelo: 'Franco',
      color: '#22c55e',
      notas: 'Lote creado recientemente.'
    };
    state.lotes.push(newLote);
    state.selectedLoteId = newLote.id;
    state.addAuditLog('Lotes', 'Registro', `Lote ${identificador} agregado a finca.`);
    state.save();
    window.closeModal();
    renderCurrentView();
    window.showToast('Registro exitoso: lote creado correctamente.');
  }
};

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

function renderFarmNameField(id, fincaNombre = state.activeFinca?.nombre || '') {
  return `
    <div>
      <label for="${id}" class="block text-xs font-semibold text-slate-700 mb-1">Nombre de la finca</label>
      <input id="${id}" name="fincaNombre" value="${escapeHtml(fincaNombre)}" readonly aria-readonly="true" class="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-600 cursor-not-allowed" />
    </div>
  `;
}

function getFincaNombreForLote(lote) {
  return state.fincas.find(item => item.id === lote?.terrenoId)?.nombre || state.activeFinca?.nombre || '';
}

function getLoteOptions(selectedId = '') {
  return state.getLotesForFinca(state.selectedFincaId).map(lote => `
    <option value="${lote.id}" ${lote.id === selectedId ? 'selected' : ''}>
      ${lote.identificador} · ${lote.cultivoNombre}
    </option>
  `).join('');
}

function openRegistrationModal(title, icon, formHTML) {
  const container = document.getElementById('modal-container');
  if (!container) return;
  container.innerHTML = renderModalWrapper(title, icon, formHTML);
  if (window.lucide) window.lucide.createIcons();
}

window.openNewCultivoModal = function() {
  if (state.currentRole === 'cliente') return;
  const lotes = state.getLotesForFinca(state.selectedFincaId);
  const today = getTodayDate();
  const bodyHTML = `
    <form novalidate onsubmit="window.saveNewCultivoSubmit(event)" class="space-y-4">
      ${renderFarmNameField('new-cul-finca')}
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label for="new-cul-nombre" class="block text-xs font-semibold text-slate-700 mb-1">Nombre del cultivo *</label>
          <input id="new-cul-nombre" name="nombre" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" placeholder="ej. Café" />
        </div>
        <div>
          <label for="new-cul-variedad" class="block text-xs font-semibold text-slate-700 mb-1">Variedad *</label>
          <input id="new-cul-variedad" name="variedad" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" placeholder="ej. Castillo" />
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label for="new-cul-tipo" class="block text-xs font-semibold text-slate-700 mb-1">Tipo de cultivo *</label>
          <select id="new-cul-tipo" name="tipoCultivo" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">
            <option value="Hortaliza">Hortaliza</option>
            <option value="Perenne">Perenne</option>
            <option value="Cereal">Cereal</option>
            <option value="Tubérculo">Tubérculo</option>
            <option value="Frutal">Frutal</option>
          </select>
        </div>
        <div>
          <label for="new-cul-lote" class="block text-xs font-semibold text-slate-700 mb-1">Lote asignado *</label>
          <select id="new-cul-lote" name="loteId" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">
            ${lotes.map(lote => `<option value="${lote.id}">${lote.identificador}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label for="new-cul-area" class="block text-xs font-semibold text-slate-700 mb-1">Área sembrada (Ha) *</label>
          <input id="new-cul-area" name="area" type="number" min="0.1" step="0.1" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
        </div>
        <div>
          <label for="new-cul-density" class="block text-xs font-semibold text-slate-700 mb-1">Densidad de plantas</label>
          <input id="new-cul-density" name="densidad" type="number" min="0" step="1" value="0" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label for="new-cul-siembra" class="block text-xs font-semibold text-slate-700 mb-1">Fecha de siembra *</label>
          <input id="new-cul-siembra" name="fechaSiembra" type="date" value="${today}" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
        </div>
        <div>
          <label for="new-cul-cosecha" class="block text-xs font-semibold text-slate-700 mb-1">Cosecha estimada *</label>
          <input id="new-cul-cosecha" name="fechaCosecha" type="date" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
        </div>
      </div>
      <div>
        <label for="new-cul-notas" class="block text-xs font-semibold text-slate-700 mb-1">Observaciones</label>
        <textarea id="new-cul-notas" name="notas" rows="2" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"></textarea>
      </div>
      <div class="flex justify-end gap-2 pt-3 border-t border-slate-100">
        <button type="button" onclick="window.closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl">Cancelar</button>
        <button type="submit" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white font-semibold text-xs rounded-xl">Guardar cultivo</button>
      </div>
    </form>
  `;
  openRegistrationModal('Registrar Cultivo', 'sprout', bodyHTML);
};

window.saveNewCultivoSubmit = function(event) {
  event.preventDefault();
  if (state.currentRole === 'cliente') return;
  if (!validateForm(event)) return;
  const form = event.currentTarget;
  const lote = state.getLotesForFinca(state.selectedFincaId).find(item => item.id === form.elements.loteId.value);
  if (!lote) {
    window.showToast('Selecciona un lote válido para el cultivo.');
    return;
  }
  const nombre = form.elements.nombre.value.trim();
  const cultivo = {
    id: 'cul-' + Date.now(),
    terrenoId: lote.terrenoId,
    fincaNombre: getFincaNombreForLote(lote),
    loteId: lote.id,
    loteNombre: lote.identificador,
    nombre,
    tipoCultivo: form.elements.tipoCultivo.value,
    variedad: form.elements.variedad.value.trim(),
    fechaSiembra: form.elements.fechaSiembra.value,
    fechaCosechaEstimada: form.elements.fechaCosecha.value,
    areaSembrada: Number(form.elements.area.value),
    densidadPlantas: Number(form.elements.densidad.value) || 0,
    etapaCrecimiento: 'Desarrollo',
    estado: 'Saludable',
    humedad: lote.humedadSuelo,
    temperatura: '—',
    radiacion: '—',
    ph: 6.0,
    notas: form.elements.notas.value.trim() || 'Cultivo registrado recientemente.'
  };
  state.cultivos.unshift(cultivo);
  lote.cultivoNombre = nombre;
  state.addAuditLog('Cultivos', 'Registro', `Cultivo ${nombre} agregado a ${lote.identificador}.`);
  state.save();
  window.closeModal();
  renderCurrentView();
  window.showToast('Registro exitoso: cultivo creado correctamente.');
};

window.openNewActividadModal = function(cultivoId = '') {
  if (state.currentRole === 'cliente') return;
  const cultivo = state.cultivos.find(item => item.id === cultivoId);
  const loteInicial = cultivo?.loteId || state.selectedLoteId;
  const bodyHTML = `
    <form novalidate onsubmit="window.saveNewActividadSubmit(event)" class="space-y-4">
      ${renderFarmNameField('new-act-finca')}
      <div>
        <label for="new-act-tipo" class="block text-xs font-semibold text-slate-700 mb-1">Tipo de actividad *</label>
        <select id="new-act-tipo" name="tipo" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">
          <option value="Riego">Riego</option>
          <option value="Fertilización">Fertilización</option>
          <option value="Inspección">Inspección</option>
          <option value="Poda">Poda</option>
          <option value="Control fitosanitario">Control fitosanitario</option>
          <option value="Otra labor">Otra labor</option>
        </select>
      </div>
      <div>
        <label for="new-act-lote" class="block text-xs font-semibold text-slate-700 mb-1">Lote *</label>
        <select id="new-act-lote" name="loteId" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">${getLoteOptions(loteInicial)}</select>
      </div>
      <div>
        <label for="new-act-description" class="block text-xs font-semibold text-slate-700 mb-1">Descripción *</label>
        <textarea id="new-act-description" name="descripcion" required minlength="3" rows="3" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" placeholder="Describe la labor realizada"></textarea>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label for="new-act-date" class="block text-xs font-semibold text-slate-700 mb-1">Fecha *</label>
          <input id="new-act-date" name="fecha" type="date" value="${getTodayDate()}" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
        </div>
        <div>
          <label for="new-act-owner" class="block text-xs font-semibold text-slate-700 mb-1">Responsable *</label>
          <input id="new-act-owner" name="responsable" value="${state.currentUser?.nombre || ''}" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
        </div>
      </div>
      <div class="flex justify-end gap-2 pt-3 border-t border-slate-100">
        <button type="button" onclick="window.closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl">Cancelar</button>
        <button type="submit" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white font-semibold text-xs rounded-xl">Guardar actividad</button>
      </div>
    </form>
  `;
  openRegistrationModal('Registrar Actividad', 'calendar-check', bodyHTML);
};

window.saveNewActividadSubmit = function(event) {
  event.preventDefault();
  if (state.currentRole === 'cliente') return;
  if (!validateForm(event)) return;
  const form = event.currentTarget;
  const lote = state.lotes.find(item => item.id === form.elements.loteId.value) ||
    initialLotes.find(item => item.id === form.elements.loteId.value);
  if (!lote) {
    window.showToast('Selecciona un lote válido para la actividad.');
    return;
  }
  const cultivo = state.cultivos.find(item => item.loteId === lote.id);
  const actividad = {
    id: 'act-' + Date.now(),
    cultivoId: cultivo?.id || '',
    loteId: lote.identificador,
    terrenoId: lote.terrenoId,
    fincaNombre: getFincaNombreForLote(lote),
    tipoActividad: form.elements.tipo.value,
    descripcion: form.elements.descripcion.value.trim(),
    fecha: form.elements.fecha.value,
    responsable: form.elements.responsable.value.trim(),
    estado: 'realizada'
  };
  state.actividades.unshift(actividad);
  state.addAuditLog('Actividades', 'Registro', `${actividad.tipoActividad} registrada en ${lote.identificador}.`);
  state.save();
  window.closeModal();
  renderCurrentView();
  window.showToast('Registro exitoso: actividad guardada correctamente.');
};

window.openNewSensorModal = function() {
  if (state.currentRole === 'cliente') return;
  const bodyHTML = `
    <form novalidate onsubmit="window.saveNewSensorSubmit(event)" class="space-y-4">
      ${renderFarmNameField('new-sensor-finca')}
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label for="new-sensor-code" class="block text-xs font-semibold text-slate-700 mb-1">Código del sensor *</label>
          <input id="new-sensor-code" name="codigo" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" placeholder="ej. SEN-H01" />
        </div>
        <div>
          <label for="new-sensor-type" class="block text-xs font-semibold text-slate-700 mb-1">Tipo de sensor *</label>
          <select id="new-sensor-type" name="tipo" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">
            <option>Humedad de Suelo</option>
            <option>Temperatura Suelo</option>
            <option>Radiación Solar</option>
            <option>pH y Conductividad</option>
            <option>Estación Meteorológica</option>
          </select>
        </div>
      </div>
      <div>
        <label for="new-sensor-lote" class="block text-xs font-semibold text-slate-700 mb-1">Lote *</label>
        <select id="new-sensor-lote" name="loteId" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">${getLoteOptions()}</select>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label for="new-sensor-value" class="block text-xs font-semibold text-slate-700 mb-1">Lectura actual *</label>
          <input id="new-sensor-value" name="valor" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" placeholder="ej. 58%" />
        </div>
        <div>
          <label for="new-sensor-battery" class="block text-xs font-semibold text-slate-700 mb-1">Batería (%) *</label>
          <input id="new-sensor-battery" name="bateria" type="number" min="0" max="100" value="100" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
        </div>
      </div>
      <div class="flex justify-end gap-2 pt-3 border-t border-slate-100">
        <button type="button" onclick="window.closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl">Cancelar</button>
        <button type="submit" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white font-semibold text-xs rounded-xl">Guardar sensor</button>
      </div>
    </form>
  `;
  openRegistrationModal('Registrar Sensor', 'cpu', bodyHTML);
};

window.saveNewSensorSubmit = function(event) {
  event.preventDefault();
  if (state.currentRole === 'cliente') return;
  if (!validateForm(event)) return;
  const form = event.currentTarget;
  const codigo = form.elements.codigo.value.trim();
  if (state.sensores.some(sensor => sensor.codigo.toLowerCase() === codigo.toLowerCase())) {
    window.showToast('Ya existe un sensor con ese código.');
    form.elements.codigo.focus();
    return;
  }
  const lote = state.getLotesForFinca(state.selectedFincaId).find(item => item.id === form.elements.loteId.value);
  if (!lote) {
    window.showToast('Selecciona un lote válido para el sensor.');
    return;
  }
  state.sensores.unshift({
    id: 'sens-' + Date.now(),
    codigo,
    tipo: form.elements.tipo.value,
    lote: `${lote.identificador} (${lote.cultivoNombre})`,
    loteId: lote.id,
    terrenoId: lote.terrenoId,
    fincaNombre: getFincaNombreForLote(lote),
    valor: form.elements.valor.value.trim(),
    estado: 'Normal',
    bateria: Number(form.elements.bateria.value),
    senal: 'Fuerte (-65 dBm)'
  });
  lote.sensoresCount = Number(lote.sensoresCount || 0) + 1;
  const finca = state.fincas.find(item => item.id === lote.terrenoId);
  if (finca) finca.sensoresActivos = Number(finca.sensoresActivos || 0) + 1;
  state.addAuditLog('Sensores', 'Registro', `Sensor ${codigo} asociado a ${lote.identificador}.`);
  state.save();
  window.closeModal();
  renderCurrentView();
  window.showToast('Registro exitoso: sensor agregado correctamente.');
};

window.openNewProduccionModal = function() {
  if (state.currentRole === 'cliente') return;
  const bodyHTML = `
    <form novalidate onsubmit="window.saveNewProduccionSubmit(event)" class="space-y-4">
      ${renderFarmNameField('new-prod-finca')}
      <div>
        <label for="new-prod-lote" class="block text-xs font-semibold text-slate-700 mb-1">Lote cosechado *</label>
        <select id="new-prod-lote" name="loteId" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">${getLoteOptions()}</select>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label for="new-prod-quantity" class="block text-xs font-semibold text-slate-700 mb-1">Cantidad (Kg) *</label>
          <input id="new-prod-quantity" name="cantidad" type="number" min="0.1" step="0.1" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
        </div>
        <div>
          <label for="new-prod-date" class="block text-xs font-semibold text-slate-700 mb-1">Fecha de cosecha *</label>
          <input id="new-prod-date" name="fecha" type="date" value="${getTodayDate()}" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
        </div>
      </div>
      <div>
        <label for="new-prod-quality" class="block text-xs font-semibold text-slate-700 mb-1">Calidad *</label>
        <select id="new-prod-quality" name="calidad" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">
          <option>Alta (Primera / Exportación)</option>
          <option>Media (Segunda / Nacional)</option>
          <option>Estándar / Procesamiento</option>
        </select>
      </div>
      <div>
        <label for="new-prod-destination" class="block text-xs font-semibold text-slate-700 mb-1">Comprador o destino *</label>
        <input id="new-prod-destination" name="destino" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
      </div>
      <div class="flex justify-end gap-2 pt-3 border-t border-slate-100">
        <button type="button" onclick="window.closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl">Cancelar</button>
        <button type="submit" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white font-semibold text-xs rounded-xl">Guardar cosecha</button>
      </div>
    </form>
  `;
  openRegistrationModal('Registrar Cosecha', 'package', bodyHTML);
};

window.saveNewProduccionSubmit = function(event) {
  event.preventDefault();
  if (state.currentRole === 'cliente') return;
  if (!validateForm(event)) return;
  const form = event.currentTarget;
  const lote = state.getLotesForFinca(state.selectedFincaId).find(item => item.id === form.elements.loteId.value);
  if (!lote) {
    window.showToast('Selecciona un lote válido para la cosecha.');
    return;
  }
  const cantidad = Number(form.elements.cantidad.value);
  const cultivo = state.cultivos.find(item => item.loteId === lote.id);
  const finca = state.fincas.find(item => item.id === lote.terrenoId);
  state.produccion.unshift({
    id: 'prod-' + Date.now(),
    cultivoId: cultivo?.id || '',
    loteId: lote.identificador,
    terrenoId: lote.terrenoId,
    fincaNombre: finca?.nombre || getFincaNombreForLote(lote),
    cantidad,
    unidadMedida: 'Kg',
    fechaCosecha: form.elements.fecha.value,
    calidad: form.elements.calidad.value,
    compradorDestino: form.elements.destino.value.trim(),
    rendimientoHa: lote.area > 0 ? Number((cantidad / lote.area).toFixed(1)) : 0
  });
  state.addAuditLog('Producción', 'Registro', `Cosecha de ${cantidad} Kg registrada en ${lote.identificador}.`);
  state.save();
  window.closeModal();
  renderCurrentView();
  window.showToast('Registro exitoso: cosecha agregada correctamente.');
};

window.openProgramarRiegoModal = function(loteNombre) {
  if (state.currentRole === 'cliente') return;
  const container = document.getElementById('modal-container');
  if (!container) return;

  const bodyHTML = `
    <form novalidate onsubmit="window.saveProgramarRiegoSubmit(event, '${loteNombre}')" class="space-y-4">
      ${renderFarmNameField('riego-finca')}
      <div class="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-800">
        Programando riego de precisión para <strong>${loteNombre}</strong> mediante electrobomba automatizada.
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Duración (minutos) *</label>
          <input type="number" min="1" id="riego-minutos" value="45" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Hora Programada *</label>
          <input type="time" id="riego-hora" value="18:00" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white" />
        </div>
      </div>
      <div class="flex justify-end gap-2 pt-3 border-t border-slate-100">
        <button type="button" onclick="window.closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl">Cancelar</button>
        <button type="submit" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white font-semibold text-xs rounded-xl shadow-xs">Iniciar / Programar Riego</button>
      </div>
    </form>
  `;

  container.innerHTML = renderModalWrapper(`Programar Riego en ${loteNombre}`, 'droplets', bodyHTML);
  if (window.lucide) window.lucide.createIcons();
};

window.saveProgramarRiegoSubmit = function(event, loteNombre) {
  event.preventDefault();
  if (state.currentRole === 'cliente') return;
  if (!validateForm(event)) return;
  const lote = state.getLotesForFinca(state.selectedFincaId).find(item => item.identificador === loteNombre);
  if (!lote) {
    window.showToast('No se encontró el lote para programar el riego.');
    return;
  }
  const minutos = document.getElementById('riego-minutos').value;
  const hora = document.getElementById('riego-hora').value;

  state.actividades.unshift({
    id: 'act-' + Date.now(),
    cultivoId: state.cultivos.find(item => item.loteId === lote.id)?.id || '',
    loteId: loteNombre,
    terrenoId: lote.terrenoId,
    fincaNombre: getFincaNombreForLote(lote),
    tipoActividad: 'Riego Programado',
    descripcion: `Riego por goteo (${minutos} min a las ${hora})`,
    fecha: 'Hoy ' + hora,
    responsable: state.currentUser ? state.currentUser.nombre : 'Operador',
    estado: 'programada'
  });

  state.addAuditLog('Riego', 'Programación', `Riego programado en ${loteNombre} (${minutos} min)`);
  state.save();
  window.closeModal();
  renderCurrentView();
  window.showToast('Riego programado correctamente.');
};

// Update Producción Modal (RF-034 preserved)
window.editProduccionModal = function(prodId) {
  if (state.currentRole === 'cliente') return;
  const container = document.getElementById('modal-container');
  if (!container) return;

  const prod = state.produccion.find(p => p.id === prodId);
  if (!prod) return;
  const fincaNombre = prod.fincaNombre ||
    state.fincas.find(item => item.id === prod.terrenoId)?.nombre ||
    state.activeFinca?.nombre ||
    '';

  const bodyHTML = `
    <form novalidate onsubmit="window.updateProduccionSubmit(event, '${prod.id}')" class="space-y-4">
      ${renderFarmNameField('edit-prod-finca', fincaNombre)}
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Cantidad Cosechada (Kg) *</label>
          <input type="number" min="0.5" step="0.5" id="edit-prod-cant" value="${prod.cantidad}" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Calidad *</label>
          <select id="edit-prod-calidad" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white">
            <option value="Alta (Primera / Exportación)" ${prod.calidad.includes('Alta') ? 'selected' : ''}>Alta (Primera / Exportación)</option>
            <option value="Media (Segunda / Nacional)" ${prod.calidad.includes('Media') ? 'selected' : ''}>Media (Segunda / Nacional)</option>
            <option value="Estándar / Procesamiento" ${prod.calidad.includes('Estándar') ? 'selected' : ''}>Estándar / Procesamiento</option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Fecha Cosecha *</label>
          <input type="date" id="edit-prod-fecha" value="${prod.fechaCosecha}" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Comprador Destino *</label>
          <input type="text" id="edit-prod-destino" value="${prod.compradorDestino}" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white" />
        </div>
      </div>
      <div class="flex justify-end gap-2 pt-3 border-t border-slate-100">
        <button type="button" onclick="window.closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl">Cancelar</button>
        <button type="submit" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white font-semibold text-xs rounded-xl shadow-xs">Actualizar Producción (RF-034)</button>
      </div>
    </form>
  `;

  container.innerHTML = renderModalWrapper('Actualizar Datos de Producción (RF-034)', 'package', bodyHTML);
  if (window.lucide) window.lucide.createIcons();
};

window.updateProduccionSubmit = function(event, prodId) {
  event.preventDefault();
  if (state.currentRole === 'cliente') return;
  if (!validateForm(event)) return;
  const prod = state.produccion.find(p => p.id === prodId);
  if (!prod) return;

  prod.cantidad = Number(document.getElementById('edit-prod-cant').value);
  prod.calidad = document.getElementById('edit-prod-calidad').value;
  prod.fechaCosecha = document.getElementById('edit-prod-fecha').value;
  prod.compradorDestino = document.getElementById('edit-prod-destino').value.trim();

  state.addAuditLog('Producción', 'Actualización', `Cosecha #${prod.id} actualizada: ${prod.cantidad} Kg a ${prod.compradorDestino} (RF-034)`);
  state.save();
  window.closeModal();
  renderCurrentView();
  window.showToast('Producción actualizada correctamente.');
};

// Update Cultivo Modal (RF-019 preserved)
window.editCultivoModal = function(cultivoId) {
  if (state.currentRole === 'cliente') return;
  const container = document.getElementById('modal-container');
  if (!container) return;

  const c = state.cultivos.find(item => item.id === cultivoId);
  if (!c) return;
  const fincaNombre = c.fincaNombre ||
    state.fincas.find(item => item.id === c.terrenoId)?.nombre ||
    state.activeFinca?.nombre ||
    '';

  const bodyHTML = `
    <form novalidate onsubmit="window.updateCultivoSubmit(event, '${c.id}')" class="space-y-4">
      ${renderFarmNameField('edit-cul-finca', fincaNombre)}
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Nombre del Cultivo *</label>
        <input type="text" id="edit-cul-nombre" value="${c.nombre}" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white" />
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Variedad *</label>
          <input type="text" id="edit-cul-variedad" value="${c.variedad}" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Área Sembrada (Ha) *</label>
          <input type="number" min="0.1" step="0.1" id="edit-cul-area" value="${c.areaSembrada}" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white" />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Fecha Siembra *</label>
          <input type="date" id="edit-cul-siembra" value="${c.fechaSiembra}" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Cosecha Estimada *</label>
          <input type="date" id="edit-cul-cosecha" value="${c.fechaCosechaEstimada}" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white" />
        </div>
      </div>
      <div class="flex justify-end gap-2 pt-3 border-t border-slate-100">
        <button type="button" onclick="window.closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl">Cancelar</button>
        <button type="submit" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white font-semibold text-xs rounded-xl shadow-xs">Actualizar Cultivo (RF-019)</button>
      </div>
    </form>
  `;

  container.innerHTML = renderModalWrapper('Actualizar Datos de Cultivo (RF-019)', 'sprout', bodyHTML);
  if (window.lucide) window.lucide.createIcons();
};

window.updateCultivoSubmit = function(event, cultivoId) {
  event.preventDefault();
  if (state.currentRole === 'cliente') return;
  if (!validateForm(event)) return;
  const c = state.cultivos.find(item => item.id === cultivoId);
  if (!c) return;

  c.nombre = document.getElementById('edit-cul-nombre').value.trim();
  c.variedad = document.getElementById('edit-cul-variedad').value.trim();
  c.areaSembrada = Number(document.getElementById('edit-cul-area').value);
  c.fechaSiembra = document.getElementById('edit-cul-siembra').value;
  c.fechaCosechaEstimada = document.getElementById('edit-cul-cosecha').value;

  state.addAuditLog('Cultivos', 'Actualización', `Cultivo ${c.nombre} actualizado (RF-019).`);
  state.save();
  window.closeModal();
  renderCurrentView();
  window.showToast('Cultivo actualizado correctamente.');
};

window.exportCSVAction = function() {
  let csv = "Fecha,Lote,Cantidad,Unidad,Comprador\n";
  getVisibleRecords(state.produccion).forEach(p => {
    csv += `${p.fechaCosecha},${p.loteId},${p.cantidad},${p.unidadMedida},${p.compradorDestino}\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', `Reporte_Produccion_AgroControl_${Date.now()}.csv`);
  a.click();
};

window.resolverAlerta = function(alertaId) {
  if (state.currentRole === 'cliente') return;
  state.alertas = state.alertas.filter(a => a.id !== alertaId);
  state.save();
  renderHeader();
  renderCurrentView();
};

// Init Application
document.addEventListener('DOMContentLoaded', () => {
  updateUIState();
  if (!isFirebaseConfigured) return;

  try {
    watchAuthState(firebaseUser => {
      if (firebaseUser) {
        state.setAuthenticatedUser(firebaseUser, 'firebase');
        updateUIState();
      } else if (state.firebaseUserUid) {
        state.logout();
        updateUIState();
      }
    }, error => {
      console.error('Firebase authentication state error:', error);
      window.showLoginMessage(getAuthErrorMessage(error));
    });
  } catch (error) {
    console.error('Firebase authentication initialization error:', error);
    window.showLoginMessage(getAuthErrorMessage(error));
  }
});
