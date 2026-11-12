// AgroControl - Sistema Agropecuario y Gestión de Cultivos
// Basado en los Mockups Oficiales de AgroControl (Omar Dangond, Deyner Herrera, Hervis Castellano, Daniel Vesga)

// Initial Data Seeds
const initialUsers = [
  { id: 'usr-1', nombre: 'Juan Díaz', documento: '1098765432', correo: 'juan.diaz@agrocontrol.io', telefono: '3128901234', rol: 'agronomo', estado: 'activo' },
  { id: 'usr-2', nombre: 'Carlos Mario Restrepo', documento: '1017123456', correo: 'carlos.restrepo@sena.edu.co', telefono: '3001234567', rol: 'administrador', estado: 'activo' },
  { id: 'usr-3', nombre: 'María Fernanda Ruiz', documento: '1035456789', correo: 'maria.ruiz@sena.edu.co', telefono: '3204567890', rol: 'operario', estado: 'activo' },
  { id: 'usr-4', nombre: 'Pedro Nel Gómez', documento: '70112233', correo: 'pedro.gomez@sena.edu.co', telefono: '3157788990', rol: 'operario', estado: 'inactivo' }
];

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
  { id: 'sens-1', codigo: 'SEN-S01', tipo: 'Humedad de Suelo', lote: 'Lote B (Tomate)', valor: '35%', estado: 'Advertencia', bateria: 92, senal: 'Fuerte (-68 dBm)' },
  { id: 'sens-2', codigo: 'SEN-T01', tipo: 'Temperatura Suelo', lote: 'Lote B (Tomate)', valor: '24°C', estado: 'Normal', bateria: 95, senal: 'Fuerte (-65 dBm)' },
  { id: 'sens-3', codigo: 'SEN-R01', tipo: 'Radiación Solar', lote: 'Lote B (Tomate)', valor: '720 W/m²', estado: 'Normal', bateria: 88, senal: 'Excelente (-58 dBm)' },
  { id: 'sens-4', codigo: 'SEN-P01', tipo: 'pH y Conductividad', lote: 'Lote B (Tomate)', valor: '6.2 pH', estado: 'Normal', bateria: 90, senal: 'Fuerte (-70 dBm)' },
  { id: 'sens-5', codigo: 'SEN-S02', tipo: 'Humedad de Suelo', lote: 'Lote A (Café)', valor: '62%', estado: 'Saludable', bateria: 97, senal: 'Excelente (-52 dBm)' },
  { id: 'sens-6', codigo: 'SEN-C01', tipo: 'Estación Meteorológica', lote: 'Central Palmas', valor: '68% Hum / 8 km/h', estado: 'Saludable', bateria: 100, senal: 'Excelente (-48 dBm)' }
];

const initialAlertas = [
  { id: 'alt-1', severidad: 'Advertencia', titulo: 'Baja humedad del suelo en Lote B', detalle: 'Humedad al 35% en cultivo de Tomate. Riego recomendado en las próximas 24 horas.', fecha: 'Hoy 08:30', lote: 'Lote B' },
  { id: 'alt-2', severidad: 'Advertencia', titulo: 'Monitoreo diario sugerido', detalle: 'Variación térmica nocturna superior a 6°C en Lote B.', fecha: 'Ayer 22:15', lote: 'Lote B' },
  { id: 'alt-3', severidad: 'Info', titulo: 'Mantenimiento de Sensores', detalle: 'Calibración trimestral completada en Lote A y Estación Central.', fecha: 'Hace 2 días', lote: 'Central' }
];

const initialActividades = [
  { id: 'act-1', cultivoId: 'cul-tomate', loteId: 'lot-b', tipoActividad: 'Riego aplicado', descripcion: 'Riego por goteo con electrobomba automatizada', fecha: 'Hoy 08:15', responsable: 'Juan Díaz', estado: 'realizada' },
  { id: 'act-2', cultivoId: 'cul-tomate', loteId: 'lot-b', tipoActividad: 'Fertilización', descripcion: 'Fertilización foliar balanceada con micronutrientes', fecha: 'Ayer 14:30', responsable: 'María Ruiz', estado: 'realizada' },
  { id: 'act-3', cultivoId: 'cul-tomate', loteId: 'lot-b', tipoActividad: 'Inspección visual', descripcion: 'Monitoreo de vigor vegetativo y sensores', fecha: '3 días atrás', responsable: 'Juan Díaz', estado: 'realizada' },
  { id: 'act-4', cultivoId: 'cul-cafe', loteId: 'lot-a', tipoActividad: 'Muestreo de Plagas', descripcion: 'Control focalizado de broca y roya', fecha: '4 días atrás', responsable: 'Carlos Restrepo', estado: 'realizada' }
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

    // Default session: Juan Díaz (from mockup page 1 & 7) or saved
    const savedSession = JSON.parse(localStorage.getItem('agro_session'));
    this.currentUser = savedSession || this.users[0];

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
    this.bitacoraAudit = JSON.parse(localStorage.getItem('agro_audit')) || [];

    this.selectedFincaId = localStorage.getItem('agro_selected_finca') || 'ter-1';
    const fincaLotes = this.getLotesForFinca(this.selectedFincaId);
    this.selectedLoteId = (fincaLotes[0] && fincaLotes[0].id) || 'lot-p1';
    this.selectedCultivoId = 'cul-tomate';
    this.activeView = 'dashboard';
    this.searchQuery = '';
    this.fincasViewMode = 'tarjetas'; // 'tarjetas' | 'lista'
    this.lotesViewMode = 'mapa'; // 'mapa' | 'lista'
  }

  get currentRole() {
    return this.currentUser ? this.currentUser.rol : 'agronomo';
  }

  get activeFinca() {
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
    localStorage.setItem('agro_session', JSON.stringify(foundUser));
    this.addAuditLog('Autenticación', 'Inicio de Sesión', `Usuario ${foundUser.nombre} ingresó a AgroControl.`);
    return { success: true, user: foundUser };
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('agro_session');
  }
}

const state = new StateManager();

// Global Window Helpers & Interactions
window.handleFincaChange = function(fincaId) {
  state.selectedFincaId = fincaId;
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
  renderCurrentView();
};

window.switchView = function(viewId, param = null) {
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

window.handleLogout = function() {
  state.logout();
  updateUIState();
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
    fincaSelect.innerHTML = state.fincas.map(f => `
      <option value="${f.id}" ${f.id === state.selectedFincaId ? 'selected' : ''}>
        ${f.nombre}
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
        <button onclick="window.switchView('alertas')" class="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors" title="3 Alertas activas del sistema">
          <i data-lucide="bell" class="w-5 h-5"></i>
          <span class="absolute top-1.5 right-1.5 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none ring-2 ring-white">
            ${state.alertas.length}
          </span>
        </button>

        <!-- User Profile Pill -->
        <div class="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div class="w-8 h-8 rounded-full bg-[#1B794B] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            ${initials}
          </div>
          <div class="hidden sm:block text-left">
            <p class="text-xs font-bold text-slate-900 leading-tight">${state.currentUser.nombre}</p>
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
    { id: 'dashboard', label: 'Dashboard activo', icon: 'layout-dashboard' },
    { id: 'fincas', label: 'Fincas', icon: 'home' },
    { id: 'terrenos', label: 'Terrenos y lotes', icon: 'map' },
    { id: 'cultivos', label: 'Cultivos', icon: 'sprout' },
    { id: 'sensores', label: 'Sensores', icon: 'cpu' },
    { id: 'clima', label: 'Clima', icon: 'cloud-sun' },
    { id: 'alertas', label: 'Alertas', icon: 'bell', badge: state.alertas.length },
    { id: 'actividades', label: 'Actividades', icon: 'calendar-check' },
    { id: 'produccion', label: 'Producción', icon: 'package' },
    { id: 'usuarios', label: 'Usuarios', icon: 'users' },
    { id: 'configuracion', label: 'Configuración', icon: 'settings' }
  ];

  navContainer.innerHTML = navItems.map(item => {
    const isActive = state.activeView === item.id || (state.activeView === 'ficha_cultivo' && item.id === 'cultivos');
    return `
      <button
        onclick="window.switchView('${item.id}')"
        class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
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
              Ver todas (${state.alertas.length})
            </button>
          </div>
          <div class="space-y-2.5">
            ${state.alertas.map(a => `
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
            ${state.actividades.slice(0, 3).map(act => `
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

// ----------------------------------------------------
// SCREEN 2: MIS FINCAS (Mockup Page 3)
// ----------------------------------------------------
function renderFincasView() {
  const isTarjetas = state.fincasViewMode === 'tarjetas';

  return `
    <div class="space-y-5">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-slate-900">Mis Fincas</h1>
          <p class="text-xs text-slate-500 mt-0.5">
            Administra y consulta la información general de tus fincas.
          </p>
        </div>

        <button onclick="window.openNewFincaModal()" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2 self-start sm:self-auto">
          <i data-lucide="plus" class="w-4 h-4"></i>
          <span>Registrar nueva finca</span>
        </button>
      </div>

      <!-- Filters & View Switcher Bar (Page 3) -->
      <div class="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div class="flex flex-wrap items-center gap-2">
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

          <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-xl text-[11px] font-semibold">
            Saludable
          </span>
        </div>

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
          ${state.fincas.map(f => {
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
                    alt="${f.nombre}"
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
                    <h3 class="font-bold text-slate-900 text-sm">${f.nombre}</h3>
                    <p class="text-xs text-slate-500 mt-0.5">${f.ubicacion}</p>
                    <p class="text-xs font-medium text-slate-700 mt-2">Área: <strong>${f.areaTotal} hectáreas</strong></p>
                    <p class="text-[11px] text-slate-500 mt-0.5">${f.cultivosActivos} cultivos activos · ${f.sensoresActivos} sensores</p>
                  </div>

                  <div class="flex items-center justify-between pt-2 border-t border-slate-100">
                    <button onclick="window.handleFincaChange('${f.id}')" class="text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors">
                      ${isSelected ? 'Seleccionada' : 'Seleccionar finca'}
                    </button>
                    <button onclick="window.openFincaDetailModal('${f.id}')" class="text-xs text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 px-2 py-1 rounded-lg font-semibold transition-colors flex items-center gap-1 cursor-pointer" title="Ver información técnica y lotes de ${f.nombre}">
                      <span>Ver detalles</span>
                      <span class="text-slate-400">···</span>
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      ` : `
        <div class="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th class="p-3.5">Finca</th>
                <th class="p-3.5">Ubicación</th>
                <th class="p-3.5">Área Total</th>
                <th class="p-3.5">Cultivos</th>
                <th class="p-3.5">Sensores</th>
                <th class="p-3.5">Estado</th>
                <th class="p-3.5 text-right">Acción</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${state.fincas.map(f => `
                <tr class="hover:bg-slate-50/80 transition-colors">
                  <td class="p-3.5 font-bold text-slate-900">${f.nombre}</td>
                  <td class="p-3.5 text-slate-600">${f.ubicacion}</td>
                  <td class="p-3.5 font-mono">${f.areaTotal} Ha</td>
                  <td class="p-3.5 font-mono">${f.cultivosActivos}</td>
                  <td class="p-3.5 font-mono">${f.sensoresActivos}</td>
                  <td class="p-3.5">
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${f.estado.includes('Saludable') ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}">
                      ${f.estado}
                    </span>
                  </td>
                  <td class="p-3.5 text-right space-x-1">
                    <button onclick="window.openFincaDetailModal('${f.id}')" class="px-2.5 py-1 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg text-xs font-semibold transition-colors">
                      Ver detalles
                    </button>
                    <button onclick="window.handleFincaChange('${f.id}')" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors">
                      ${f.id === state.selectedFincaId ? 'Activa' : 'Seleccionar'}
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
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

  let selectedLote = fincaLotes.find(l => l.id === state.selectedLoteId);
  if (!selectedLote) {
    selectedLote = fincaLotes[0] || state.lotes[0];
    if (selectedLote) {
      state.selectedLoteId = selectedLote.id;
    }
  }

  // Get distinct crop names for this finca's lots
  const lotCrops = Array.from(new Set(fincaLotes.map(l => l.cultivoNombre))).filter(Boolean);

  // Find related cultivo if any for the "Ver en detalle" button
  const relatedCultivo = selectedLote
    ? (state.cultivos.find(c => c.nombre.toLowerCase().includes((selectedLote.cultivoNombre || '').toLowerCase().split(' ')[0])) || state.cultivos[0])
    : state.cultivos[0];

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

        <button onclick="window.openNewLoteModal()" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2 self-start sm:self-auto">
          <i data-lucide="plus" class="w-4 h-4"></i>
          <span>Registrar nuevo lote</span>
        </button>
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
          <select class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none">
            <option>Estado (Todos)</option>
            <option>Saludable</option>
            <option>Advertencia</option>
            <option>Crítico / Alerta</option>
          </select>

          <!-- Dynamic Crop Filter -->
          <select class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none hidden md:inline-block">
            <option>Cultivo (Todos)</option>
            ${lotCrops.map(crop => `
              <option value="${crop}">${crop}</option>
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

      ${state.lotesViewMode === 'lista' ? `
        <!-- Lots Table View -->
        <div class="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th class="p-3.5">Lote / Parcela</th>
                <th class="p-3.5">Cultivo Sembrado</th>
                <th class="p-3.5">Área (Ha)</th>
                <th class="p-3.5">Humedad Suelo</th>
                <th class="p-3.5">Sensores IoT</th>
                <th class="p-3.5">Tipo de Suelo</th>
                <th class="p-3.5">Estado</th>
                <th class="p-3.5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${fincaLotes.map(l => {
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
                      <button onclick="window.selectLote('${l.id}'); window.setLotesViewMode('mapa');" class="px-2.5 py-1 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg text-xs font-semibold transition-colors">
                        Ver en mapa
                      </button>
                      <button onclick="window.openProgramarRiegoModal('${l.identificador}')" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors">
                        Riego
                      </button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
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
                <span class="text-white/80">${fincaLotes.length} lotes mapeados</span>
              </div>
            </div>

            <!-- SVG Interactive Lot Polygons dynamically rendered for active Finca -->
            <svg class="absolute inset-0 w-full h-full cursor-pointer z-10" viewBox="0 0 800 500" preserveAspectRatio="none">
              ${fincaLotes.map(lote => {
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
                ${fincaLotes.map(lote => {
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
              <button onclick="window.switchView('ficha_cultivo', '${relatedCultivo ? relatedCultivo.id : 'cul-tomate'}')" class="w-full py-2.5 bg-[#1B794B] hover:bg-[#166534] text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5">
                <i data-lucide="eye" class="w-4 h-4"></i>
                <span>Ver en detalle</span>
              </button>

              <button onclick="window.openProgramarRiegoModal('${selectedLote ? selectedLote.identificador : ''}')" class="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-1.5">
                <i data-lucide="droplets" class="w-4 h-4 text-emerald-600"></i>
                <span>Programar riego</span>
              </button>
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

        <button onclick="window.openNewCultivoModal()" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2 self-start sm:self-auto">
          <i data-lucide="plus" class="w-4 h-4"></i>
          <span>Registrar cultivo</span>
        </button>
      </div>

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
                ${state.cultivos.map(c => {
                  const estadoBadge = c.estado === 'Saludable'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : c.estado === 'Advertencia'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200';

                  return `
                    <tr class="hover:bg-slate-50/70 transition-colors">
                      <td class="p-3.5 font-bold text-slate-900">
                        <button onclick="window.switchView('ficha_cultivo', '${c.id}')" class="hover:text-emerald-700 hover:underline text-left">
                          ${c.nombre}
                        </button>
                        <span class="block text-[10px] text-slate-400 font-normal">${c.variedad}</span>
                      </td>
                      <td class="p-3.5 text-slate-600">${c.tipoCultivo}</td>
                      <td class="p-3.5 text-slate-600">${c.fincaNombre}</td>
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
                          <button onclick="window.switchView('ficha_cultivo', '${c.id}')" class="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-[11px] font-semibold transition-colors" title="Ver Ficha de Cultivo (Mockup Page 6)">
                            Ficha
                          </button>
                          <button onclick="window.editCultivoModal('${c.id}')" class="p-1 text-slate-400 hover:text-indigo-600 rounded-lg" title="Editar Cultivo (RF-019)">
                            <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
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

          <!-- Mini Bar Chart -->
          <div class="space-y-3 pt-1">
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="font-semibold text-slate-700">Tomate (Lote B)</span>
                <span class="text-amber-600 font-bold font-mono">35% Hum</span>
              </div>
              <div class="w-full bg-slate-100 rounded-full h-2">
                <div class="bg-amber-400 h-2 rounded-full" style="width: 35%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="font-semibold text-slate-700">Café (Lote A)</span>
                <span class="text-emerald-600 font-bold font-mono">62% Hum</span>
              </div>
              <div class="w-full bg-slate-100 rounded-full h-2">
                <div class="bg-emerald-500 h-2 rounded-full" style="width: 62%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="font-semibold text-slate-700">Maíz (Lote C)</span>
                <span class="text-emerald-600 font-bold font-mono">58% Hum</span>
              </div>
              <div class="w-full bg-slate-100 rounded-full h-2">
                <div class="bg-emerald-500 h-2 rounded-full" style="width: 58%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="font-semibold text-slate-700">Cacao (Lote D)</span>
                <span class="text-emerald-600 font-bold font-mono">60% Hum</span>
              </div>
              <div class="w-full bg-slate-100 rounded-full h-2">
                <div class="bg-emerald-500 h-2 rounded-full" style="width: 60%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="font-semibold text-slate-700">Papa (Lote E)</span>
                <span class="text-rose-600 font-bold font-mono">28% Hum</span>
              </div>
              <div class="w-full bg-slate-100 rounded-full h-2">
                <div class="bg-rose-500 h-2 rounded-full" style="width: 28%"></div>
              </div>
            </div>
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
  const c = state.cultivos.find(item => item.id === state.selectedCultivoId) || state.cultivos[0];

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
            ${c.fincaNombre} · ${c.loteNombre} · Variedad: <strong>${c.variedad}</strong>
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <button onclick="window.switchView('cultivos')" class="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5">
            <i data-lucide="arrow-left" class="w-4 h-4"></i>
            <span>Volver a lista</span>
          </button>

          <button onclick="window.editCultivoModal('${c.id}')" class="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5">
            <i data-lucide="edit-3" class="w-4 h-4"></i>
            <span>Editar</span>
          </button>

          <button onclick="window.openNewActividadModal('${c.id}')" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5">
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>Registrar actividad</span>
          </button>
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
            <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span class="font-semibold text-slate-800">· Riego aplicado</span>
              <span class="text-slate-400 font-mono">hoy 08:15</span>
            </div>
            <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span class="font-semibold text-slate-800">· Fertilización</span>
              <span class="text-slate-400 font-mono">ayer 14:30</span>
            </div>
            <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span class="font-semibold text-slate-800">· Inspección visual</span>
              <span class="text-slate-400 font-mono">3 días atrás</span>
            </div>
          </div>
        </div>

        <!-- Alertas Relacionadas -->
        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-3">
          <h4 class="font-bold text-slate-900 text-xs border-b border-slate-100 pb-2 flex items-center gap-2">
            <i data-lucide="bell" class="w-4 h-4 text-amber-500"></i>
            Alertas relacionadas
          </h4>
          <div class="space-y-2 text-xs">
            <div class="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200">
              <p class="font-bold text-amber-900">· Baja humedad del suelo en Lote B</p>
              <p class="text-[11px] text-amber-800 mt-0.5">Riego recomendado en las próximas 24 horas para evitar estrés hídrico.</p>
            </div>
            <div class="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200">
              <p class="font-bold text-amber-900">· Monitoreo diario sugerido</p>
              <p class="text-[11px] text-amber-800 mt-0.5">Estado Advertencia activado preventivamente por oscilación térmica.</p>
            </div>
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
  return `
    <div class="space-y-5">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-slate-900">Red de Sensores IoT</h1>
          <p class="text-xs text-slate-500 mt-0.5">Telemetría en tiempo real y estado de baterías por lote.</p>
        </div>
        <button onclick="window.openNewSensorModal()" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2">
          <i data-lucide="plus" class="w-4 h-4"></i>
          <span>Registrar Sensor</span>
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${state.sensores.map(s => `
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
        `).join('')}
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
  return `
    <div class="space-y-5">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-slate-900">Centro de Alertas</h1>
        <p class="text-xs text-slate-500 mt-0.5">Notificaciones críticas y recomendaciones técnicas generadas por los sensores.</p>
      </div>

      <div class="space-y-3">
        ${state.alertas.map(a => `
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
            <button onclick="window.resolverAlerta('${a.id}')" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl whitespace-nowrap">
              Marcar Atendida
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderActividadesView() {
  return `
    <div class="space-y-5">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-slate-900">Bitácora de Actividades Agrícolas</h1>
          <p class="text-xs text-slate-500 mt-0.5">Registro cronológico de riego, fertilización, podas y labores fitosanitarias.</p>
        </div>
        <button onclick="window.openNewActividadModal()" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2">
          <i data-lucide="plus" class="w-4 h-4"></i>
          <span>Registrar Actividad</span>
        </button>
      </div>

      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <table class="w-full text-left text-xs">
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
            ${state.actividades.map(a => `
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
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderProduccionView() {
  return `
    <div class="space-y-5">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-slate-900">Producción y Cosecha</h1>
          <p class="text-xs text-slate-500 mt-0.5">Control de cosechas, rendimientos por hectárea y compradores de destino.</p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="window.exportCSVAction()" class="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center gap-1.5">
            <i data-lucide="download" class="w-4 h-4"></i>
            <span>Exportar CSV</span>
          </button>
          <button onclick="window.openNewProduccionModal()" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2">
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>Registrar Cosecha</span>
          </button>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
            <tr>
              <th class="p-3.5">Fecha</th>
              <th class="p-3.5">Lote</th>
              <th class="p-3.5">Cantidad</th>
              <th class="p-3.5">Rendimiento</th>
              <th class="p-3.5">Calidad</th>
              <th class="p-3.5">Comprador Destino</th>
              <th class="p-3.5 text-right">Acción (RF-034)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${state.produccion.map(p => `
              <tr class="hover:bg-slate-50/70 transition-colors">
                <td class="p-3.5 font-mono text-slate-500">${p.fechaCosecha}</td>
                <td class="p-3.5 font-bold text-slate-900">${p.loteId}</td>
                <td class="p-3.5 font-mono font-bold text-emerald-700">${p.cantidad} ${p.unidadMedida}</td>
                <td class="p-3.5 font-mono text-slate-700">${p.rendimientoHa ? p.rendimientoHa.toFixed(1) : '—'} Kg/Ha</td>
                <td class="p-3.5 text-slate-600">${p.calidad}</td>
                <td class="p-3.5 text-slate-600">${p.compradorDestino}</td>
                <td class="p-3.5 text-right">
                  <button onclick="window.editProduccionModal('${p.id}')" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-emerald-800 rounded-lg text-[11px] font-semibold inline-flex items-center gap-1">
                    <i data-lucide="edit-3" class="w-3 h-3 text-emerald-600"></i>
                    Actualizar
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
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
          <p class="text-xs text-slate-500 mt-0.5">Control de acceso basado en roles (Agrónomo, Administrador, Técnico, Operario).</p>
        </div>
        <button onclick="window.openNewUserModal()" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2">
          <i data-lucide="plus" class="w-4 h-4"></i>
          <span>Registrar Usuario</span>
        </button>
      </div>

      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
            <tr>
              <th class="p-3.5">Nombre</th>
              <th class="p-3.5">Correo</th>
              <th class="p-3.5">Documento</th>
              <th class="p-3.5">Rol</th>
              <th class="p-3.5">Estado</th>
              <th class="p-3.5 text-right">Sesión Rápida</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${state.users.map(u => `
              <tr class="hover:bg-slate-50/70 transition-colors">
                <td class="p-3.5 font-bold text-slate-900">${u.nombre}</td>
                <td class="p-3.5 text-slate-600 font-mono">${u.correo}</td>
                <td class="p-3.5 font-mono text-slate-500">${u.documento}</td>
                <td class="p-3.5">
                  <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${u.rol === 'agronomo' ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-700'}">
                    ${u.rol}
                  </span>
                </td>
                <td class="p-3.5">
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${u.estado === 'activo' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}">
                    ${u.estado}
                  </span>
                </td>
                <td class="p-3.5 text-right">
                  <button onclick="window.quickLogin('${u.correo}')" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold">
                    Iniciar como
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

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
function renderLoginScreen() {
  const container = document.getElementById('login-container');
  if (!container) return;

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
            <h2 class="text-2xl font-bold tracking-tight text-slate-900">Bienvenido a AgroControl</h2>
            <p class="text-xs text-slate-500 leading-relaxed">
              Gestiona tus cultivos y toma mejores decisiones basadas en datos.
            </p>
          </div>
        </div>

        <form onsubmit="window.handleLoginFormSubmit(event)" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Correo electrónico</label>
            <div class="relative">
              <i data-lucide="mail" class="w-4 h-4 text-slate-400 absolute left-3 top-3"></i>
              <input
                type="text"
                id="login-email"
                value="juan.diaz@agrocontrol.io"
                required
                class="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                placeholder="nombre@agrocontrol.io"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="block text-xs font-semibold text-slate-700">Contraseña</label>
              <button type="button" onclick="alert('Funcionalidad de recuperación de contraseña habilitada. Revise su bandeja.')" class="text-[11px] text-emerald-700 hover:underline">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <div class="relative">
              <i data-lucide="lock" class="w-4 h-4 text-slate-400 absolute left-3 top-3"></i>
              <input
                type="password"
                id="login-pass"
                value="123456"
                required
                class="w-full pl-9 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div class="flex items-center">
            <input type="checkbox" id="recordar-check" checked class="rounded border-slate-300 text-[#1B794B] focus:ring-emerald-500 w-3.5 h-3.5" />
            <label for="recordar-check" class="ml-2 text-xs text-slate-600 select-none">Recordarme</label>
          </div>

          <button type="submit" class="w-full py-2.5 bg-[#1B794B] hover:bg-[#166534] text-white font-bold text-xs rounded-xl shadow-xs transition-all">
            Iniciar sesión
          </button>

          <!-- Quick Presets for Evaluation -->
          <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Acceso rápido:</span>
            <div class="flex gap-1.5">
              <button type="button" onclick="window.quickLogin('juan.diaz@agrocontrol.io')" class="font-bold text-emerald-700 hover:underline">Juan (Agrónomo)</button>
              <span>·</span>
              <button type="button" onclick="window.quickLogin('carlos.restrepo@sena.edu.co')" class="font-bold text-emerald-700 hover:underline">Carlos (Admin)</button>
            </div>
          </div>
        </form>

        <div class="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
          <span>¿Aún no tienes cuenta?</span>
          <button type="button" onclick="alert('Registro abierto para nuevos operarios y agrónomos.')" class="font-bold text-emerald-700 hover:underline ml-1">
            Regístrate aquí.
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

window.handleLoginFormSubmit = function(event) {
  event.preventDefault();
  const emailInput = document.getElementById('login-email');
  if (emailInput) {
    const res = state.login(emailInput.value);
    if (res.success) updateUIState();
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

  const f = state.fincas.find(item => item.id === fincaId) || state.fincas[0];
  if (!f) return;

  const isSelected = f.id === state.selectedFincaId;
  const statusClass = f.estado.includes('Saludable')
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : f.estado.includes('Monitoreo')
      ? 'bg-amber-50 text-amber-700 border-amber-200'
      : 'bg-rose-50 text-rose-700 border-rose-200';

  let fincaLotes = state.lotes.filter(l => l.terrenoId === f.id);
  if (fincaLotes.length === 0) {
    fincaLotes = state.lotes.slice(0, 3);
  }

  const bodyHTML = `
    <div class="space-y-5">
      <!-- Finca Photo Banner -->
      <div class="relative h-48 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-inner">
        <img
          src="${f.imagen}"
          alt="${f.nombre}"
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
          <h2 class="text-xl font-bold tracking-tight text-white">${f.nombre}</h2>
          <p class="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
            <i data-lucide="map-pin" class="w-3.5 h-3.5 text-emerald-400"></i>
            ${f.ubicacion} · Responsable: ${f.responsable}
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
          <p class="text-lg font-black text-slate-900 font-mono mt-0.5">${f.cultivosActivos} Activos</p>
        </div>
        <div class="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sensores IoT</span>
          <p class="text-lg font-black text-slate-900 font-mono mt-0.5">${f.sensoresActivos} Online</p>
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

          <button type="button" onclick="window.selectFincaAndClose('${f.id}')" class="flex-1 sm:flex-none px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5">
            <i data-lucide="check" class="w-3.5 h-3.5"></i>
            <span>${isSelected ? 'Finca ya activa' : 'Seleccionar como Activa'}</span>
          </button>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = renderModalWrapper(`Detalles de ${f.nombre}`, 'home', bodyHTML, 'max-w-2xl');
  if (window.lucide) window.lucide.createIcons();
};

window.selectFincaAndClose = function(fincaId) {
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
  const container = document.getElementById('modal-container');
  if (!container) return;

  const bodyHTML = `
    <form onsubmit="window.saveNewFincaSubmit(event)" class="space-y-4">
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
          <input type="number" step="0.5" id="new-finca-area" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600" placeholder="100" />
        </div>
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Responsable / Administrador *</label>
        <input type="text" id="new-finca-resp" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600" value="${state.currentUser ? state.currentUser.nombre : ''}" />
      </div>
      <div class="flex justify-end gap-2 pt-3 border-t border-slate-100">
        <button type="button" onclick="window.closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl">Cancelar</button>
        <button type="submit" class="px-4 py-2 bg-[#1B794B] hover:bg-[#166534] text-white font-semibold text-xs rounded-xl shadow-xs">Guardar Finca</button>
      </div>
    </form>
  `;

  container.innerHTML = renderModalWrapper('Registrar Nueva Finca', 'home', bodyHTML);
  if (window.lucide) window.lucide.createIcons();
};

window.saveNewFincaSubmit = function(event) {
  event.preventDefault();
  const nombre = document.getElementById('new-finca-nombre').value.trim();
  const ubicacion = document.getElementById('new-finca-ubicacion').value.trim();
  const areaTotal = Number(document.getElementById('new-finca-area').value);
  const responsable = document.getElementById('new-finca-resp').value.trim();

  if (nombre && ubicacion && areaTotal) {
    const newFinca = {
      id: 'ter-' + Date.now(),
      nombre,
      ubicacion,
      areaTotal,
      responsable,
      cultivosActivos: 1,
      sensoresActivos: 4,
      estado: 'Saludable',
      imagen: '/images/finca_palmas.jpg',
      descripcion: 'Predio registrado en AgroControl.'
    };
    state.fincas.push(newFinca);
    state.selectedFincaId = newFinca.id;
    state.addAuditLog('Fincas', 'Registro', `Finca ${nombre} creada exitosamente.`);
    state.save();
    window.closeModal();
    renderHeader();
    renderCurrentView();
  }
};

window.openNewLoteModal = function() {
  const container = document.getElementById('modal-container');
  if (!container) return;

  const bodyHTML = `
    <form onsubmit="window.saveNewLoteSubmit(event)" class="space-y-4">
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
          <input type="number" step="0.1" id="new-lote-area" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600" placeholder="10" />
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
  }
};

window.openProgramarRiegoModal = function(loteNombre) {
  const container = document.getElementById('modal-container');
  if (!container) return;

  const bodyHTML = `
    <form onsubmit="window.saveProgramarRiegoSubmit(event, '${loteNombre}')" class="space-y-4">
      <div class="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-800">
        Programando riego de precisión para <strong>${loteNombre}</strong> mediante electrobomba automatizada.
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Duración (minutos) *</label>
          <input type="number" id="riego-minutos" value="45" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white" />
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
  const minutos = document.getElementById('riego-minutos').value;
  const hora = document.getElementById('riego-hora').value;

  state.actividades.unshift({
    id: 'act-' + Date.now(),
    cultivoId: 'cul-tomate',
    loteId: loteNombre,
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
};

// Update Producción Modal (RF-034 preserved)
window.editProduccionModal = function(prodId) {
  const container = document.getElementById('modal-container');
  if (!container) return;

  const prod = state.produccion.find(p => p.id === prodId);
  if (!prod) return;

  const bodyHTML = `
    <form onsubmit="window.updateProduccionSubmit(event, '${prod.id}')" class="space-y-4">
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Cantidad Cosechada (Kg) *</label>
          <input type="number" step="0.5" id="edit-prod-cant" value="${prod.cantidad}" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white" />
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
};

// Update Cultivo Modal (RF-019 preserved)
window.editCultivoModal = function(cultivoId) {
  const container = document.getElementById('modal-container');
  if (!container) return;

  const c = state.cultivos.find(item => item.id === cultivoId);
  if (!c) return;

  const bodyHTML = `
    <form onsubmit="window.updateCultivoSubmit(event, '${c.id}')" class="space-y-4">
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
          <input type="number" step="0.1" id="edit-cul-area" value="${c.areaSembrada}" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white" />
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
};

window.exportCSVAction = function() {
  let csv = "Fecha,Lote,Cantidad,Unidad,Comprador\n";
  state.produccion.forEach(p => {
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
  state.alertas = state.alertas.filter(a => a.id !== alertaId);
  state.save();
  renderHeader();
  renderCurrentView();
};

// Init Application
document.addEventListener('DOMContentLoaded', () => {
  updateUIState();
});
