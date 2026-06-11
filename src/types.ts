export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  imageUrl: string;
}

export interface ProgramBenefit {
  id: string;
  title: string;
  category: "Deporte" | "Cultura" | "Educación" | "Emprendimiento" | "Salud";
  description: string;
  benefits: string[];
  requirements: string[];
  contactPerson: string;
}

export interface Convocatoria {
  id: string;
  title: string;
  type: "Beca" | "Curso" | "Empleo" | "Emprendimiento" | "Participación";
  description: string;
  status: "Abierta" | "Próximamente" | "Cerrada";
  deadline: string;
  requirements: string[];
  linkText: string;
}

export interface EventActivity {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: "Feria" | "Taller" | "Capacitación" | "Agenda";
  description: string;
  capacity?: number;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: "Política Pública" | "Decreto" | "Formulario";
  year: string;
  fileSize: string;
  description: string;
}

export interface MediaItem {
  id: string;
  title: string;
  type: "FOTO" | "VIDEO" | "EVIDENCIA";
  url: string;
  caption: string;
  date: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export interface PQRSForm {
  nombre: string;
  email: string;
  telefono: string;
  tipo: "peticion" | "queja" | "reclamo" | "sugerencia";
  asunto: string;
  mensaje: string;
  consentimiento: boolean;
}
