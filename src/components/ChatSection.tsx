import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Bot, User, Trash2, ArrowRight, HelpCircle, Loader2 } from "lucide-react";
import { ChatMessage } from "../types";

export default function ChatSection({ isDarkMode }: { isDarkMode: boolean }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-bot",
      sender: "bot",
      text: "¡Hola! Soy el asistente virtual de la Alcaldía de Nobsa. Estoy aquí para resolver tus dudas sobre becas estudiantiles, subsidios de movilidad, proyectos de emprendimiento juvenil, asambleas de participación y eventos culturales en nuestro municipio. ¿En qué puedo colaborar contigo hoy, compadre?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested quick prompts for the youth of Nobsa
  const quickPrompts = [
    { label: "🎓 Becas Universitarias", text: "¿Qué requisitos piden para las becas de educación superior 'Nobsa Educada'?" },
    { label: "💼 Apoyo a Emprendedores", text: "¿Cómo funciona el capital semilla de Nobsa Joven Emprende?" },
    { label: "🚌 Subsidio de Transporte", text: "¿Cómo postulo al descuento del 60% para ir a la universidad?" },
    { label: "👥 ¿Qué es el CMJ?", text: "¿Quién compone el Consejo Municipal de Juventud (CMJ) de Nobsa?" },
    { label: "💻 Curso de React/Código", text: "¿Hasta cuándo hay plazo para inscribirse en el curso de Front-end?" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Send message history to the backend API route
      const tempHistory = [...messages, userMsg];
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: tempHistory.map(m => ({ sender: m.sender, text: m.text })) }),
      });

      if (!response.ok) {
        throw new Error("Respuesta de red no satisfactoria");
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.text || "No obtuve una respuesta adecuada, por favor reintenta.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Error communicating with chat API:", error);
      // Fallback message
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: "bot",
        text: "Estimado ciudadano, se detectó un inconveniente al conectar con nuestros servicios centrales en tiempo real. Por favor comunícate directamente al correo institucional juventudes@nobsa-boyaca.gov.co o intenta recargar el portal.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (window.confirm("¿Seguro que deseas vaciar el historial de conversación?")) {
      setMessages([
        {
          id: "welcome-bot",
          sender: "bot",
          text: "Historial limpiado. Estoy listo para tus nuevas consultas sobre la Alcaldía de Nobsa.",
          timestamp: new Date(),
        }
      ]);
    }
  };

  return (
    <div id="chat-atencion-ciudadana" className="w-full h-full flex flex-col rounded-2xl border transition-colors overflow-hidden duration-300 shadow-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
      {/* Header with institutional colors (Black, Dark Gray, Red accent) */}
      <div className="bg-zinc-950 text-white p-4 flex items-center justify-between border-b-2 border-red-600">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold shadow-md shadow-red-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-zinc-950 rounded-full animate-pulse" title="Asistente En Línea"></span>
          </div>
          <div>
            <h3 className="font-semibold text-sm md:text-base leading-tight tracking-tight">Atención al Ciudadano</h3>
            <p className="text-xs text-zinc-400 flex items-center gap-1">
              <span>Secretaría de Integración de Nobsa</span>
            </p>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="p-1 px-3 rounded-lg text-xs md:text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-red-500 flex items-center gap-1 border border-zinc-700 transition"
          title="Limpiar chat"
          aria-label="Vaciar el historial de conversación"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Limpiar</span>
        </button>
      </div>

      {/* Messages area with micro-animations & layout preservation */}
      <div 
        role="log" 
        aria-live="polite"
        className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4 bg-zinc-50 dark:bg-zinc-900/50 min-h-[350px] max-h-[500px]"
      >
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`flex w-full gap-2.5 max-w-full ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.sender !== "user" && (
                <div className="w-7 h-7 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 self-start mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                  message.sender === "user"
                    ? "bg-red-600 text-white rounded-tr-none shadow-sm shadow-red-500/10 font-medium"
                    : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 rounded-tl-none shadow-sm"
                }`}
              >
                {/* Formatted body */}
                <p className="whitespace-pre-line">{message.text}</p>
                <div className="w-full text-right mt-1.5">
                  <span className={`text-[10px] ${message.sender === "user" ? "text-red-200" : "text-zinc-400"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              {message.sender === "user" && (
                <div className="w-7 h-7 rounded-full bg-zinc-800 dark:bg-zinc-700 text-white flex items-center justify-center shrink-0 self-start mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2.5 items-center text-xs text-zinc-500 dark:text-zinc-400 pl-1"
          >
            <div className="w-7 h-7 rounded-sm flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 animate-pulse">
              <Bot className="w-4 h-4 text-zinc-400 animate-bounce" />
            </div>
            <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800/80 px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-red-600" />
              <span>Secretaría de Nobsa está escribiendo...</span>
            </div>
          </motion.div>
        )}
        <div ref={scrollToBottom} />
      </div>

      {/* Suggested Bubbles Panel */}
      <div className="px-4 py-2.5 bg-zinc-100 dark:bg-zinc-950/40 border-t border-zinc-200 dark:border-zinc-800">
        <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5 flex items-center gap-1 uppercase tracking-wider">
          <HelpCircle className="w-3 h-3 text-red-500" />
          Preguntas sugeridas / Acceso rápido:
        </p>
        <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto pr-1">
          {quickPrompts.map((prompt, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.02, backgroundColor: isDarkMode ? "#27272a" : "#f4f4f5" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSend(prompt.text)}
              className="text-xs px-2.5 py-1.5 rounded-lg border text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-red-600 dark:hover:border-red-500 transition-colors text-left flex items-center gap-1 font-medium cursor-pointer"
            >
              <span>{prompt.label}</span>
              <ArrowRight className="w-2.5 h-2.5 text-zinc-400 group-hover:text-red-500 shrink-0" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Inputs panel */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="p-3 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu pregunta sobre Nobsa (ej: requisitos de becas)..."
          className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 dark:focus:ring-red-500 transition duration-200"
          disabled={isLoading}
          aria-label="Mensaje para el asesor virtual"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-3 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 cursor-pointer disabled:opacity-40 transition-all flex items-center justify-center shadow-lg shadow-red-500/15"
          aria-label="Enviar mensaje"
        >
          <Send className="w-4.5 h-4.5" />
        </motion.button>
      </form>
    </div>
  );
}
