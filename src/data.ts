import { NewsItem, ProgramBenefit, Convocatoria, EventActivity, DocumentItem, MediaItem } from "./types";

export const newsData: NewsItem[] = [
  {
    id: "news-1",
    title: "Abierta la Convocatoria de Estímulos para Emprendimientos Juveniles 2026",
    excerpt: "La Alcaldía de Nobsa, a través de la Oficina de Juventud, habilita fondos de cofinanciación para jóvenes tejedores y artesanos de Nobsa.",
    content: "Con el objetivo de preservar la tradición textil de nuestro municipio y potenciar los nuevos saberes tecnológicos, la Alcaldía Municipal ha aprobado una partida presupuestal de estímulos directos para jóvenes de 14 a 28 años. Se dará prioridad a propuestas que integren el diseño de modas contemporáneo con la tejeduría en lana tradicional de la ruana nobeña.",
    date: "10 de Junio, 2026",
    category: "Emprendimiento",
    imageUrl: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "news-2",
    title: "Elecciones del Consejo de Juventud de Nobsa (CMJ): Conoce los candidatos",
    excerpt: "Los jóvenes del municipio se preparan para elegir sus representantes ante la administración local.",
    content: "La Registraduría Municipal en acuerdo con el área de Juventudes de Nobsa, invita a toda la población entre 14 y 28 años a verificar sus puestos de votación para las elecciones del Consejo Municipal de Juventudes. Este espacio define los delegados que incidirán directamente en el Plan de Desarrollo Local de Nobsa.",
    date: "04 de Junio, 2026",
    category: "Participación",
    imageUrl: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "news-3",
    title: "Inicia el Torneo de microfútbol interbarrios 'Juventud Activa' en el Coliseo Municipal",
    excerpt: "Fomentamos la salud mental y física de nuestros jóvenes a través de la sana competencia y deportes autóctonos.",
    content: "Más de 14 delegaciones de veredas y barrios como Nazareth, Chámeza, Las Delicias y el Centro se darán cita para conmemorar el deporte local. El campeonato incluirá también una exhibición de juego de tejo infantil y juvenil para mantener vivas nuestras raíces culturales boyacenses.",
    date: "28 de Mayo, 2026",
    category: "Deporte",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=600"
  }
];

export const youthInfo = {
  welcomeMessage: "¡Te damos la bienvenida al espacio joven de Nobsa, Boyacá! Un canal diseñado para escuchar tu voz, guiar tu formación y potenciar tus talentos en nuestra tierra artesanal e industrial.",
  aboutUs: {
    title: "¿Quiénes Somos?",
    subTitle: "Oficina de Asuntos de Juventud - Alcaldía de Nobsa",
    description: "Somos la entidad encargada de liderar la formulación, ejecución y seguimiento de las políticas públicas dirigidas a la población entre 14 y 28 años en el municipio de Nobsa. Articulamos esfuerzos con el sector privado (metalúrgico e industrial) y los centros artesanales para garantizar oportunidades reales de educación, cultura, empleo y participación ciudadana.",
    objectives: [
      "Garantizar el cumplimiento efectivo del Estatuto de Ciudadanía Juvenil (Leyes de juventud colombiana).",
      "Fomentar la cultura e identidad nobeña, promoviendo el relevo generacional en la costura artesanal y la tejeduría de lana.",
      "Reducir las brechas de desempleo juvenil conectando el talento local con el corredor industrial y turístico de Sogamoso-Nobsa.",
      "Promover la participación informada y el liderazgo constructivo de los jóvenes a través de veedurías y el Consejo de Juventud."
    ],
    functions: [
      "Diseñar y ejecutar programas de capacitación técnica y tecnológica en convenio con el SENA u universidades regionales.",
      "Prestar asesoría técnica y jurídica a las organizaciones, plataformas y mesas de juventud del municipio.",
      "Administrar los incentivos de transporte escolar, alimentación y becas universitarias otorgadas por la Alcaldía.",
      "Diseñar y dinamizar la agenda municipal de eventos, ferias de emprendimiento y actividades lúdicas para la juventud."
    ]
  },
  cmj: {
    title: "Consejo Municipal de Juventud (CMJ)",
    description: "Es un escenario de concertación, vigilancia y control de la gestión pública. Se conforma por jóvenes elegidos de manera democrática mediante voto popular para períodos de 4 años. Son los interlocutores directos ante el Alcalde y el Concejo Municipal.",
    membersCount: 11,
    currentPresident: "Valentina Pirajón Fonseca",
    achievements: [
      "Co-creación de la nueva Política Pública de Juventud de Nobsa (2025-2035).",
      "Concertación de la tarifa diferencial del transporte intermunicipal para estudiantes nobeños.",
      "Presupuesto participativo asignado para la semana de la Juventud de Nobsa."
    ]
  },
  plataforma: {
    title: "Plataforma Juvenil de Nobsa",
    description: "Es un espacio autónomo de participación ciudadana y encuentro de carácter asociativo. Reúne colectivos culturales, deportivos, ambientales, religiosos, estudiantiles, tecnológicos y artesanales del municipio sin distinciones.",
    howToJoin: "Para inscribir tu colectivo o parche juvenil en la Plataforma, solo debes diligenciar el respectivo formulario único de registro oficial en la sección de 'Documentos y Normatividad' de este micrositio y radicarlo en las oficinas de la Secretaría de Integración Social o enviarlo al correo institucional."
  }
};

export const programsData: ProgramBenefit[] = [
  {
    id: "prog-1",
    title: "Nobsa Joven Emprende",
    category: "Emprendimiento",
    description: "Programa emblema de cofinanciación, formación en marketing digital y dotación de maquinaria para iniciativas productivas lideradas por jóvenes nobeños.",
    benefits: [
      "Capital semilla condonable para proyectos aprobados por comité evaluador.",
      "Instalación deStand gratuíto en las Ferias Textil y del Ruana-Fash del municipio.",
      "Mentorías de diseño industrial cortesía de expertos locales de Acerías e industrias de cemento de la región."
    ],
    requirements: [
      "Tener entre 18 y 28 años de edad.",
      "Residir en Nobsa (mínimo 2 años de antigüedad demostrable con certificado del SISBÉN o junta de acción comunal).",
      "Plan de negocio estructurado que fomente la sostenibilidad social u ambiental."
    ],
    contactPerson: "Área de Emprendimiento - juventudes@nobsa-boyaca.gov.co"
  },
  {
    id: "prog-2",
    title: "Ruanas del Futuro: Innovación Textil",
    category: "Cultura",
    description: "Programa de capacitación teórico-práctica para el relevo generacional en la hilandería artesanal, diseño computarizado y comercio electrónico internacional.",
    benefits: [
      "Entrega mensual de lana procesada de oveja de alta calidad para producción didáctica.",
      "Visibilidad en salas de exposición municipales.",
      "Acceso directo a la plataforma de venta online NobsaCraft."
    ],
    requirements: [
      "Tener entre 14 y 28 años.",
      "Disponibilidad horaria de 4 horas semanales para talleres prácticos.",
      "Compromiso de entrega de muestra final para el festival de la ruana."
    ],
    contactPerson: "Coordinadora de Cultura - culturas@nobsa-boyaca.gov.co"
  },
  {
    id: "prog-3",
    title: "Fondo de Subsidio al Transporte Estudiantil (Ruta Universitaria)",
    category: "Educación",
    description: "Auxilio económico directo y rutas de autobús subsidiadas para jóvenes inscritos en educación superior en Sogamoso, Duitama y Tunja.",
    benefits: [
      "Subsidio mensual del 60% de los pasajes de transporte intermunicipal.",
      "Ruta exclusiva Nobsa - UPTC Sogamoso y Nobsa - UNAD en horarios críticos mañana y noche."
    ],
    requirements: [
      "Registro de matrícula vigente en institución universitaria o tecnológica certificada.",
      "Pertenecer a estratos 1, 2 o 3 con Sisbén vigente del municipio de Nobsa.",
      "Mantener un promedio académico superior a 3.8/5.0."
    ],
    contactPerson: "Oficina de Enlace de Educación - educacion@nobsa-boyaca.gov.co"
  },
  {
    id: "prog-4",
    title: "Escuela de Liderazgo y Oratoria Juvenil",
    category: "Educación",
    description: "Espacio formativo los sábados en la Casa de la Cultura de Nobsa para el fortalecimiento de habilidades blandas, argumentación y formulación de proyectos.",
    benefits: [
      "Certificación oficial de diplomado en conjunto con la Escuela de Administración Pública (ESAP).",
      "Oportunidad de debatir en el simposio juvenil regional de Boyacá."
    ],
    requirements: [
      "Tener entre 14 y 28 años.",
      "Inscribirse vía formulario web de este portal en las fechas estipuladas."
    ],
    contactPerson: "Enlace CMJ - cmj@nobsa-boyaca.gov.co"
  }
];

export const convocatoriasData: Convocatoria[] = [
  {
    id: "conv-1",
    title: "Becas de Educación Superior 'Nobsa Educada y Creadora' - Ciclo II-2026",
    type: "Beca",
    description: "Becas del 100% financiadas por el municipio para estudiar carreras técnicas o tecnologías con impacto en servicios turísticos, metalúrgicos y desarrollo de software.",
    status: "Abierta",
    deadline: "2026-07-20",
    requirements: [
      "Haber culminado estudios secundarios en alguna de las instituciones educativas del municipio (I.E. Técnico Industrial de Nobsa, I.E. Nazareth, etc.).",
      "Puntaje ICFES Saber 11 superior a 270 puntos.",
      "Certificación de residencia expedida por la alcaldía de Nobsa."
    ],
    linkText: "Postúlate al formulario de Beca"
  },
  {
    id: "conv-2",
    title: "Curso Certificado: Programación de Interfaces Web Avanzado & React",
    type: "Curso",
    description: "Convenio estratégico Alcaldía de Nobsa y operadoras de internet regionales para capacitar a 40 jóvenes de Nobsa en tecnologías front-end modernas.",
    status: "Abierta",
    deadline: "2026-06-30",
    requirements: [
      "Contar con computador portátil o de escritorio para prácticas.",
      "Tener conocimientos básicos de informática general.",
      "Ser mayor de 15 años."
    ],
    linkText: "Inscríbete hoy en el Curso"
  },
  {
    id: "conv-3",
    title: "Vacantes de Empleo Juvenil sin Experiencia - Enlace Acerías Paz del Río",
    type: "Empleo",
    description: "Conexión de egresados de Nobsa con roles de auxiliares logísticos, técnicos mecánicos y desarrolladores web júnior de forma directa.",
    status: "Próximamente",
    deadline: "2026-08-01",
    requirements: [
      "Ser técnico o tecnólogo graduado de programas relacionados.",
      "Tener libreta militar (para los varones requeridos por la legislación aplicable).",
      "Ser menor de 28 años."
    ],
    linkText: "Ver perfiles habilitados"
  },
  {
    id: "conv-4",
    title: "Subsidios para Ideas de Negocio de Economía Naranja y Turismo",
    type: "Emprendimiento",
    description: "Acompañamiento financiero de hasta 5 millones de pesos colombianos para cafés temáticos, recorridos de senderismo y artesanías no convencionales.",
    status: "Abierta",
    deadline: "2026-07-05",
    requirements: [
      "Presentarse de manera grupal (mínimo 2 jóvenes).",
      "Idea con enfoque innovador de turismo regional o artesanía.",
      "Presentar video de 1 minuto explicando la idea de negocio."
    ],
    linkText: "Subir video y propuesta"
  }
];

export const eventsData: EventActivity[] = [
  {
    id: "ev-1",
    title: "Festival del Emprendimiento Joven de Nobsa: Teñidos de Tradición",
    date: "2026-06-25",
    time: "09:00 AM - 06:00 PM",
    location: "Plaza Principal de Nobsa",
    type: "Feria",
    description: "Un espacio interactivo donde los jóvenes emprendedores turísticos, gastronómicos y textiles exhibirán sus proyectos a marcas del departamento.",
    capacity: 120
  },
  {
    id: "ev-2",
    title: "Taller de Diseño de Interfaces Accesibles & Animaciones de Alta Calidad",
    date: "2026-07-02",
    time: "02:00 PM - 05:00 PM",
    location: "Punto Vive Digital - Parque Principal de Nobsa",
    type: "Taller",
    description: "Taller práctico sobre cómo hacer sitios web inclusivos de alto impacto, enfocado en teoría del color nobeña y transiciones fluidas.",
    capacity: 25
  },
  {
    id: "ev-3",
    title: "Capacitación en Liderazgo y Resolución Alternativa de Conflictos",
    date: "2026-07-15",
    time: "08:30 AM - 12:30 PM",
    location: "Salón de Juntas CMJ (Segundo Piso Alcaldía de Nobsa)",
    type: "Capacitación",
    description: "Sesión estructurada para líderes estudiantiles y comunales. Organizado por conciliadores del Ministerio de Justicia en convenio con el área juvenil.",
    capacity: 50
  },
  {
    id: "ev-4",
    title: "Encuentro Regional de Consejeros de Juventud Boyacá 2026",
    date: "2026-08-05",
    time: "08:00 AM - 05:00 PM",
    location: "Auditorio Municipal de Nobsa",
    type: "Agenda",
    description: "Día de asamblea general y debate intermunicipal de todos los CMJ de la provincia del Sugamuxi para acordar acciones colectivas climáticas.",
    capacity: 150
  }
];

export const documentsData: DocumentItem[] = [
  {
    id: "doc-1",
    title: "Política Pública de Juventud del Municipio de Nobsa 2025-2035",
    category: "Política Pública",
    year: "2025",
    fileSize: "4.2 MB",
    description: "Documento maestro que traza las metas, presupuesto y asignación de programas para la juventud en los próximos 10 años en Nobsa, Boyacá."
  },
  {
    id: "doc-2",
    title: "Acuerdo Municipal No. 012 de 2024 - Institucionalización del Consejo de Juventud",
    category: "Decreto",
    year: "2024",
    fileSize: "1.8 MB",
    description: "Acuerdo por el cual el Concejo Municipal adopta normativas de asignación de rubros operacionales autónomos para el CMJ de Nobsa."
  },
  {
    id: "doc-3",
    title: "Formulario de Inscripción Único al Registro de la Plataforma Municipal de Juventud",
    category: "Formulario",
    year: "2026",
    fileSize: "750 KB",
    description: "Formulario oficial para colectivos, clubes deportivos y organizaciones interesadas en formar parte del órgano consultor juvenil de Nobsa."
  },
  {
    id: "doc-4",
    title: "Formulario Único de Registro para PQRS Juveniles de Nobsa",
    category: "Formulario",
    year: "2026",
    fileSize: "420 KB",
    description: "Formato en PDF alternativo para radicación física de Peticiones, Quejas, Reclamos o Sugerencias."
  }
];

export const galleryData: MediaItem[] = [
  {
    id: "med-1",
    title: "Semana Juvenil de Nobsa - ExpoRuana Creativa",
    type: "FOTO",
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600",
    caption: "Jóvenes nobeños posando orgullosamente con ruanas contemporáneas tejidas a mano.",
    date: "Octubre 2025"
  },
  {
    id: "med-2",
    title: "Inauguración de Cancha Sintética Multifuncional",
    type: "FOTO",
    url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=600",
    caption: "Integración de jóvenes en el sector rural de Chámeza en encuentros de sano esparcimiento.",
    date: "Noviembre 2025"
  },
  {
    id: "med-3",
    title: "Sesión Plenaria del CMJ de Nobsa en la Alcaldía",
    type: "EVIDENCIA",
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600",
    caption: "Discusión parlamentaria liderada por muchachos locales con el gabinete municipal de Nobsa.",
    date: "Enero 2026"
  },
  {
    id: "med-4",
    title: "Taller Práctico de Robótica y Programación",
    type: "FOTO",
    url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=600",
    caption: "Uso de tecnologías de automatización para resolver retos agrícolas y textiles en Nobsa.",
    date: "Febrero 2026"
  }
];
