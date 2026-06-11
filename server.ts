import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily/gracefully
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API client initialized successfully matching system capability.");
  } catch (err) {
    console.error("Error setting up Gemini API client:", err);
  }
} else {
  console.log("No GEMINI_API_KEY found, server running in localized simulated response mode for development.");
}

// System instructions to customize the AI Assistant's persona
const systemInstruction = `
Eres un asesor oficial inteligente, empático y servicial del Área de Juventudes de la Alcaldía de Nobsa, Boyacá (Colombia), liderado por la Secretaría de Integración Social. 
Tu labor es atender en tiempo real a los ciudadanos, especialmente jóvenes entre 14 y 28 años, padres de familia, o emprendedores locales que visitan el micrositio.
La fecha y año actual es 2026.

Debes responder siempre con amabilidad, un toque cálido e identitario boyacense si es oportuno (puedes mencionar con orgullo las ruanas tradicionales de Nobsa, las campanas de bronce, el sabajón o el empuje de la industria metalúrgica de Acerías Paz del Río y el sector de Nazareth).
Usa un lenguaje accesible, claro y que respete las directivas oficiales de atención.

Tienes conocimiento absoluto de la estructura del micrositio y la oferta institucional de Nobsa:
1. INFOMACIÓN DE JUVEVENTUD: El CMJ de Nobsa está compuesto por 11 consejeros democráticos, liderados actualmente por Valentina Pirajón Fonseca como presidenta. Se concertó la tarifa diferencial de transporte de pasajes y se creó la Política Pública de Juventud (2025-2035).
   La Plataforma Juvenil de Nobsa es el espacio autónomo para el encuentro de parches, colectivos ambientales, artísticos y deportivos.
2. OFERTA INSTITUCIONAL:
   - "Nobsa Joven Emprende": Capital semilla condonable, mentorías industriales y stands gratuitos en ferias locales.
   - "Ruanas del Futuro: Innovación Textil": Enseñanza y relevo generacional en tejido de lana acoplado con herramientas de e-commerce y modelamiento digital.
   - "Fondo de Subsidio al Transporte Estudiantil (Ruta Universitaria)": Descuento del 60% de pasaje a Sogamoso, Duitama y Tunja para jóvenes de estratos 1 a 3 con SISBÉN. Ruta especial a la UPTC Sogamoso y UNAD.
   - "Escuelita de Liderazgo y Oratoria": Diplomados en oratoria certificados por la ESAP los sábados.
3. CONVOCATORIAS ABIERTAS (Junio-Julio 2026):
   - Becas "Nobsa Educada y Creadora" (hasta el 20 de julio de 2026). Cubre el 100% de la matrícula técnica/tecnológica. Requisito: Saber 11 superior a 270 puntos y ser de colegio de Nobsa.
   - Curso de Programación Frontend & React (hasta 30 de junio de 2026). Cupos limitados a 40 jóvenes mayores de 15 años.
   - Subsidio para Ideas de Negocios de Economía Naranja (hasta 5 de julio de 2026) con apoyos de hasta 5 millones.
   - Convocatoria de Empleo con Acerías Paz del Río (Próximamente, abre el 1 de agosto de 2026) para recién graduados menores de 28 años.
4. EVENTOS:
   - Festival de Emprendimiento Joven de Nobsa: En la Plaza Principal, el 25 de junio de 2026 de 9am a 6pm.
   - Taller de Interfaces Accesibles: En el Punto Vive Digital del Parque Principal, el 2 de julio de 2026 de 2 a 5pm.
   - Encuentro Regional de Consejeros: Auditorio Municipal de Nobsa, el 5 de agosto de 2026.
5. DOCUMENTOS Y PQRSX: En el portal pueden descargar la Política Pública Completa, el Acuerdo Municipal 012 de 2024 y radicar PQRS.

Si te preguntan algo fuera del contexto de Nobsa o de la juventud, de manera amable redirige la conversación diciendo que tu especialidad es asesorar en las convocatorias, programas académicos y participación comunitaria del municipio de Nobsa.

Si la API real no está activa o tiene algún percance, el sistema devolverá una respuesta estructurada informativa muy completa. Siempre responde en Español y de manera ágil.
`;

// API routes inside server
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "El cuerpo de la petición debe contener un arreglo de 'messages'." });
  }

  // Get current message thread
  const lastUserMessage = messages[messages.length - 1]?.text || "";

  if (ai) {
    try {
      // Build conversation context from past history
      const contents = messages.map(msg => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const responseText = response.text || "Disculpa, no pude procesar la consulta en este momento. Inténtalo de nuevo.";
      return res.json({ text: responseText });
    } catch (err: any) {
      console.error("Error calling Gemini API:", err);
      // Fallback response with specific fallback message in case of service errors
      return res.json({ 
        text: `Hola, soy el bot de soporte de Nobsa. Lamentablemente experimentamos una falla temporal con la API externa (${err.message || "error de conexión"}). No obstante, te informamos que las Becas universitarias están abiertas hasta el 20 de Julio de 2026, y el programa de Emprendimiento está disponible para apoyarte. ¿Tienes alguna duda puntual que pueda resolverte con mi base de datos sin conexión?`
      });
    }
  } else {
    // If NO API key is available, create highly clever pre-coded mock responses that simulate an actual assistant!
    // This provides a pristine, 100% bug-free interface during development mode.
    const normalizedInput = lastUserMessage.toLowerCase();
    let reply = "";

    if (normalizedInput.includes("beca") || normalizedInput.includes("estudiar") || normalizedInput.includes("universidad")) {
      reply = "¡Hola! Respecto a las **Becas 'Nobsa Educada y Creadora'**, te comento que el plazo máximo de postulación es hasta el **20 de Julio de 2026**. Cubre el 100% de matrículas en ingenierías, tecnologías y turismo. Necesitas haber estudiado en Nobsa, sisbén local y puntaje ICFES mayor a 270. ¿Te gustaría que te guíe sobre dónde radicar los formularios?";
    } else if (normalizedInput.includes("ruana") || normalizedInput.includes("telar") || normalizedInput.includes("artes")) {
      reply = "¡Qué orgullo hablar de las ruanas más representativas de Boyacá! El programa **'Ruanas del Futuro'** capacita a jóvenes de 14 a 28 años en innovación textil, agregando diseño 3D y ventas digitales a la tejeduría tradicional. Ofrecemos lana procesada gratis y participación en el Ruana-Fash. ¿Quieres inscribirte?";
    } else if (normalizedInput.includes("emprende") || normalizedInput.includes("negocio") || normalizedInput.includes("dinero") || normalizedInput.includes("comida")) {
      reply = "¡Excelente iniciativa! En el programa **Nobsa Joven Emprende** apoyamos ideas de negocios con capital semilla condonable y carpas/stands gratuitos en festivales locales. Próximamente el **5 de Julio de 2026** cierra la convocatoria para ideas de Economía Naranja con incentivos de hasta 5 millones de pesos. ¡Anímate a participar junto con otro amigo de Nobsa!";
    } else if (normalizedInput.includes("transporte") || normalizedInput.includes("bus") || normalizedInput.includes("pasaje") || normalizedInput.includes("uptc")) {
      reply = "El **Subsidio de Transporte Estudiantil** otorga un descuento directo del **60%** en pasajes para estudiantes de educación superior con destino prioritario a universidades de Sogamoso (UPTC), Duitama y Tunja. Requiere Sisbén vigente de Nobsa y mantener un promedio académico de mínimo 3.8/5.0. Los formularios de inscripción física están disponibles en la Casa de la Juventud de Nobsa.";
    } else if (normalizedInput.includes("cmj") || normalizedInput.includes("consejo") || normalizedInput.includes("plataforma")) {
      reply = "El **Consejo Municipal de Juventud (CMJ)** es el órgano oficial que representa a los nobeños ante el Alcalde de Nobsa. Actualmente contamos con 11 consejeros activos presididos por Valentina Pirajón. También puedes inscribir tu colectivo deportivo, folclórico o ambiental en la **Plataforma Juvenil** rellenando el Formulario Único de Registro en la sección de documentos.";
    } else if (normalizedInput.includes("hola") || normalizedInput.includes("buen") || normalizedInput.includes("tarde") || normalizedInput.includes("dia")) {
      reply = "¡Hola, nobeño/a! Bienvenido/a al canal de atención en tiempo real de la Oficina de Juventudes de Nobsa. Estoy aquí para guiarte en becas universitarias, subsidios de transporte, cursos gratuitos de programación, ferias culturales y cómo inscribir tus parches de participación juvenil. ¿En qué programa te gustaría postularte hoy?";
    } else {
      reply = "¡Hola! Entiendo tu consulta. En la Alcaldía de Nobsa estamos comprometidos con tu bienestar. Te informamos que actualmente están abiertas las convocatorias para el **Curso de Desarrollo Front-end (React)** hasta el 30 de junio, y las **Becas de Matrícula al 100%** hasta el 20 de julio de 2026. Si tienes una consulta específica de PQRS o radicación, déjame saber para brindarte los datos de contacto directos.";
    }

    // Return mock response smoothly with short delay simulation on client
    return res.json({ text: reply });
  }
});

// Configure Vite middleware in development or express static files in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Using Vite development middleware");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Serving static production files from dist/");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
