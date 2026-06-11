import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, 
  Users, 
  Briefcase, 
  Award, 
  GraduationCap, 
  Calendar, 
  FileText, 
  Image as ImageIcon, 
  Mail, 
  MessageSquare, 
  Sun, 
  Moon, 
  ArrowRight, 
  Eye, 
  Phone, 
  Globe, 
  Scale, 
  BookOpen, 
  AlertCircle, 
  FileCheck, 
  CheckCircle, 
  Volume2, 
  VolumeX, 
  Type, 
  Sparkles, 
  MapPin, 
  Search,
  ExternalLink,
  Download,
  Info,
  ChevronDown,
  X,
  Plus
} from "lucide-react";

import { 
  newsData, 
  youthInfo, 
  programsData, 
  convocatoriasData, 
  eventsData, 
  documentsData, 
  galleryData 
} from "./data";
import { ProgramBenefit, Convocatoria, EventActivity, DocumentItem, MediaItem, PQRSForm } from "./types";
import ChatSection from "./components/ChatSection";

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>("inicio");
  
  // Customization & Accessibility States
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(100); // 100% is default (16px)
  const [isTtsActive, setIsTtsActive] = useState<boolean>(false);
  
  // Search state across entire microsite
  const [globalSearch, setGlobalSearch] = useState<string>("");
  
  // Fitler states
  const [programFilter, setProgramFilter] = useState<string>("Todos");
  const [convocatoriaFilter, setConvocatoriaFilter] = useState<string>("Todos");
  const [eventFilter, setEventFilter] = useState<string>("Todos");
  const [docFilter, setDocFilter] = useState<string>("Todos");
  const [galleryFilter, setGalleryFilter] = useState<string>("Todos");

  // Interaction Modals / Expanders
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null);
  
  // PQRS State
  const [pqrsForm, setPqrsForm] = useState<PQRSForm>({
    nombre: "",
    email: "",
    telefono: "",
    tipo: "peticion",
    asunto: "",
    mensaje: "",
    consentimiento: false
  });
  const [pqrsRadicado, setPqrsRadicado] = useState<string | null>(null);
  const [isPqrsSubmitting, setIsPqrsSubmitting] = useState<boolean>(false);

  // Apply dark mode class to root html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Adjust global HTML font-size based on state
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  // Browser Text-To-Speech helper
  const speakText = (text: string) => {
    if (!isTtsActive) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-CO";
    window.speechSynthesis.speak(utterance);
  };

  const handlePqrsSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!pqrsForm.consentimiento) {
      alert("Debe aceptar el consentimiento de tratamiento de datos personales para continuar.");
      return;
    }
    
    setIsPqrsSubmitting(true);
    
    // Simulate radication generation
    setTimeout(() => {
      const year = new Date().getFullYear();
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const radId = `RAD-${year}-${randomNum}-NOB`;
      setPqrsRadicado(radId);
      setIsPqrsSubmitting(false);
      speakText(`Su formulario ha sido radicado con éxito con el número ${radId}. Guarde este código.`);
    }, 1200);
  };

  const resetPqrsForm = () => {
    setPqrsForm({
      nombre: "",
      email: "",
      telefono: "",
      tipo: "peticion",
      asunto: "",
      mensaje: "",
      consentimiento: false
    });
    setPqrsRadicado(null);
  };

  const menuItems = [
    { id: "inicio", label: "Inicio", icon: Building2 },
    { id: "somos", label: "¿Quiénes Somos?", icon: Users },
    { id: "oferta", label: "Oferta Institucional", icon: Award },
    { id: "convocatorias", label: "Convocatorias", icon: GraduationCap },
    { id: "participacion", label: "Participación", icon: Scale },
    { id: "eventos", label: "Eventos", icon: Calendar },
    { id: "documentos", label: "Normatividad", icon: FileText },
    { id: "galeria", label: "Galería", icon: ImageIcon },
    { id: "contacto", label: "Contacto / PQRS", icon: Mail },
    //{ id: "chat", label: "Chat Ciudadano", icon: MessageSquare }
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-300 flex flex-col selection:bg-red-600 selection:text-white">
      
      {/* 1. TOP UTILITY HEADER (ACCESSIBILITY & BRANDING BAR) */}
      <div className="bg-zinc-950 text-xs text-zinc-300 py-2.5 px-4 md:px-8 flex flex-wrap justify-between items-center gap-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
          <span className="font-semibold text-zinc-200">Enlace Oficial Alcaldía de Nobsa:</span>
          <span>Boyacá, Colombia - Nit: 800.098.343-2</span>
        </div>
        
        {/* Real Accessibility Tools Widget */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Font Size Buttons */}
          <div className="flex items-center gap-1 bg-zinc-900 rounded-lg p-1 border border-zinc-800">
            <span className="px-1 text-[10px] uppercase text-zinc-500 font-bold flex items-center">
              <Type className="w-3.5 h-3.5 mr-1" /> Tamaños:
            </span>
            <button 
              onClick={() => { setFontSize(90); speakText("Tamaño de texto reducido"); }}
              className={`px-2 py-0.5 rounded cursor-pointer ${fontSize === 90 ? "bg-red-600 text-white font-bold" : "hover:bg-zinc-800 text-zinc-300"}`}
              title="Disminuir tamaño de fuente (A-)"
              aria-label="Disminuir fuente"
            >
              A-
            </button>
            <button 
              onClick={() => { setFontSize(100); speakText("Tamaño de texto restablecido"); }}
              className={`px-2 py-0.5 rounded cursor-pointer ${fontSize === 100 ? "bg-red-600 text-white font-bold" : "hover:bg-zinc-800 text-zinc-300"}`}
              title="Tamaño de fuente promedio (A)"
              aria-label="Fuente normal"
            >
              A
            </button>
            <button 
              onClick={() => { setFontSize(115); speakText("Tamaño de texto aumentado"); }}
              className={`px-2 py-0.5 rounded cursor-pointer ${fontSize === 115 ? "bg-red-600 text-white font-bold" : "hover:bg-zinc-800 text-zinc-300"}`}
              title="Aumentar tamaño de fuente (A+)"
              aria-label="Aumentar fuente"
            >
              A+
            </button>
          </div>

          {/* Text-To-Speech Toggle */}
          <button 
            onClick={() => {
              const nextState = !isTtsActive;
              setIsTtsActive(nextState);
              if (nextState) {
                setTimeout(() => speakText("Lector automático activado. Ahora haré una lectura hablada al dar click en secciones u opciones principales."), 100);
              } else {
                window.speechSynthesis.cancel();
              }
            }}
            className={`px-3 py-1 rounded-lg border flex items-center gap-1.5 transition font-medium cursor-pointer ${
              isTtsActive 
                ? "bg-red-600 border-red-500 text-white animate-pulse" 
                : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700"
            }`}
            title="Activar narración de textos al dar click (Sistema de accesibilidad)"
            aria-label="Activar lector de accesibilidad"
          >
            {isTtsActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{isTtsActive ? "Lector Activo ✔" : "Lector de Voz"}</span>
          </button>

          {/* Dark Mode Spring Trigger */}
          <button
            onClick={() => {
              const nextMode = !isDarkMode;
              setIsDarkMode(nextMode);
              speakText(nextMode ? "Modo oscuro activado" : "Modo claro activado");
            }}
            className="p-1 px-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-red-500 border border-zinc-800 transition flex items-center gap-1 cursor-pointer"
            title="Alternar modo claro u oscuro"
            aria-label="Alternar tema visual"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Modo Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">Modo Oscuro</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. MAIN COHESIVE BRAND BANNER */}
      <header className="bg-zinc-950 text-white relative py-8 px-4 md:px-8 border-b-4 border-red-600">
        <div className="absolute inset-0 bg-linear-to-r from-red-950/20 to-zinc-950 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4 text-center md:text-left self-center">
            {/* Elegant SVG representations for Nobsa Coat of Arms */}
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-zinc-900 to-black border-2 border-red-600 flex items-center justify-center shrink-0 shadow-lg shadow-red-600/10 hidden sm:flex">
              <svg className="w-10 h-10 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" fill="currentColor" fillOpacity="0.1" />
                <circle cx="12" cy="11" r="2" stroke="white" />
                <path d="M12 13v4" stroke="white" />
                <line x1="9" y1="11" x2="15" y2="11" stroke="white" />
              </svg>
            </div>
            
            <div>
              <div className="flex items-center flex-wrap justify-center md:justify-start gap-1.5 md:gap-2">
                <span className="text-[10px] tracking-widest bg-red-600 text-white font-black px-2 py-0.5 rounded uppercase">
                  Área de Juventudes
                </span>
                <span className="text-[10px] tracking-widest bg-zinc-800 text-zinc-300 font-bold px-2 py-0.5 rounded uppercase">
                  Nobsa • Boyacá
                </span>
              </div>
              <h1 className="text-2xl md:text-3.5xl font-extrabold tracking-tight mt-1 text-white">
                Alcaldía de <span className="text-red-500">Nobsa</span>
              </h1>
              <p className="text-zinc-400 text-xs md:text-sm mt-1 max-w-xl font-medium">
                "Gestión activa para el bienestar de la juventud nobeña, preservando la tradición textil de la ruana y potenciando la tecnología."
              </p>
            </div>
          </div>
          
          {/* Quick Header Contacts info */}
          <div className="flex flex-col sm:flex-row gap-4 items-center shrink-0 w-full md:w-auto justify-center md:justify-end">
            <div className="flex items-center gap-2 bg-zinc-900 p-2 px-4 rounded-xl border border-zinc-800 w-full sm:w-auto">
              <Phone className="w-4 h-4 text-red-500 shrink-0" />
              <div className="text-left">
                <p className="text-[9px] text-zinc-500 leading-none">Línea de Atención</p>
                <p className="text-xs font-semibold text-zinc-200 mt-0.5">+57 608 775 0101</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-zinc-900 p-2 px-4 rounded-xl border border-zinc-800 w-full sm:w-auto">
              <Mail className="w-4 h-4 text-red-500 shrink-0" />
              <div className="text-left">
                <p className="text-[9px] text-zinc-500 leading-none font-bold">Atención Virtual</p>
                <p className="text-xs font-semibold text-zinc-200 mt-0.5">juventudes@nobsa-boyaca.gov.co</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. DYNAMIC SEARCH & SECTORS EXPLORER */}
      <div className="bg-white dark:bg-zinc-900 py-3 shadow-md border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-30 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Search bar widget */}
          <div className="relative w-full lg:max-w-sm shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-zinc-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar becas, cursos, actividades..."
              value={globalSearch}
              onChange={(e) => {
                setGlobalSearch(e.target.value);
                if (e.target.value.length > 2) {
                  speakText(`Buscando con el término ${e.target.value}`);
                }
              }}
              className="block w-full pl-10 pr-4 py-2 border rounded-xl leading-5 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-600 dark:focus:ring-red-500 border-zinc-200 dark:border-zinc-700 sm:text-sm transition duration-200"
            />
            {globalSearch && (
              <button 
                onClick={() => setGlobalSearch("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Navigation Bar matching our custom menuItems with high spring tension "Emil kowalski" type animations */}
          <nav className="w-full overflow-x-auto no-scrollbar py-1">
            <div className="flex space-x-1 min-w-[900px] lg:min-w-0 lg:flex-wrap justify-start lg:justify-end gap-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      speakText(`${item.label} seleccionado`);
                    }}
                    className={`relative px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all cursor-pointer duration-300 flex items-center gap-1.5 shrink-0 ${
                      isActive 
                        ? "text-white" 
                        : "text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                    }`}
                  >
                    {/* Sliding active indicator via Framer Motion layoutId */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute inset-0 bg-red-600 rounded-lg -z-10 shadow-md shadow-red-500/20"
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      />
                    )}
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-zinc-400"}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>

      {/* 4. MAIN LAYOUT AND SECTION CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col gap-6">
        
        {/* If Search is active, render search results with maximum priority */}
        {globalSearch.trim() !== "" ? (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3 mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Search className="w-5 h-5 text-red-600" />
                <span>Resultados de Búsqueda para: "{globalSearch}"</span>
              </h2>
              <button 
                onClick={() => setGlobalSearch("")}
                className="text-xs px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-red-600"
              >
                Limpiar búsqueda
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Filter and display match lists */}
              {/* Programs match */}
              {programsData.filter(p => 
                p.title.toLowerCase().includes(globalSearch.toLowerCase()) || 
                p.description.toLowerCase().includes(globalSearch.toLowerCase())
              ).map(p => (
                <div key={p.id} className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 hover:border-red-600/50 transition">
                  <span className="text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded">Oferta Institucional</span>
                  <h3 className="font-bold text-sm mt-1 text-zinc-800 dark:text-zinc-100">{p.title}</h3>
                  <p className="text-xs text-zinc-500 mt-1">{p.description}</p>
                  <button onClick={() => { setActiveTab("oferta"); setGlobalSearch(""); }} className="text-xs text-red-600 font-bold mt-2 hover:underline inline-flex items-center">
                    Ver programa <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              ))}

              {/* Convocatorias match */}
              {convocatoriasData.filter(c => 
                c.title.toLowerCase().includes(globalSearch.toLowerCase()) || 
                c.description.toLowerCase().includes(globalSearch.toLowerCase())
              ).map(c => (
                <div key={c.id} className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 hover:border-red-600/50 transition bg-red-50/20 dark:bg-red-950/5">
                  <span className="text-[10px] font-bold bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 px-2 py-0.5 rounded">Convocatoria: {c.type}</span>
                  <h3 className="font-bold text-sm mt-1">{c.title}</h3>
                  <p className="text-xs text-zinc-500 mt-1">{c.description}</p>
                  <button onClick={() => { setActiveTab("convocatorias"); setGlobalSearch(""); }} className="text-xs text-red-600 font-bold mt-2 hover:underline inline-flex items-center">
                    Postularse aquí <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              ))}

              {/* Events match */}
              {eventsData.filter(e => 
                e.title.toLowerCase().includes(globalSearch.toLowerCase()) || 
                e.description.toLowerCase().includes(globalSearch.toLowerCase())
              ).map(e => (
                <div key={e.id} className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 hover:border-red-600/50 transition">
                  <span className="text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded">Eventos y Actividades</span>
                  <h3 className="font-bold text-sm mt-1">{e.title}</h3>
                  <p className="text-xs text-zinc-500 mt-1">{e.description}</p>
                  <button onClick={() => { setActiveTab("eventos"); setGlobalSearch(""); }} className="text-xs text-red-600 font-bold mt-2 hover:underline inline-flex items-center">
                    Ver agenda local <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              ))}

              {/* Documentos match */}
              {documentsData.filter(d => 
                d.title.toLowerCase().includes(globalSearch.toLowerCase()) || 
                d.description.toLowerCase().includes(globalSearch.toLowerCase())
              ).map(d => (
                <div key={d.id} className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 hover:border-red-600/50 transition">
                  <span className="text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded">Documento Oficial</span>
                  <h3 className="font-bold text-sm mt-1">{d.title}</h3>
                  <p className="text-xs text-zinc-500 mt-1">{d.description}</p>
                  <button onClick={() => { setActiveTab("documentos"); setGlobalSearch(""); }} className="text-xs text-red-600 font-bold mt-2 hover:underline inline-flex items-center">
                    Descargar en PDF <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              ))}
            </div>

            {/* Empty state search */}
            {programsData.filter(p => p.title.toLowerCase().includes(globalSearch.toLowerCase())).length === 0 &&
             convocatoriasData.filter(c => c.title.toLowerCase().includes(globalSearch.toLowerCase())).length === 0 &&
             eventsData.filter(e => e.title.toLowerCase().includes(globalSearch.toLowerCase())).length === 0 &&
             documentsData.filter(d => d.title.toLowerCase().includes(globalSearch.toLowerCase())).length === 0 && (
              <div className="text-center py-10">
                <AlertCircle className="w-12 h-12 text-zinc-400 mx-auto mb-2" />
                <p className="text-zinc-500 font-medium text-sm">No encontramos ningún programa, convocatoria ni documento con esa coincidencia.</p>
                <p className="text-xs text-zinc-400 mt-1">Prueba utilizando conceptos más amplios como 'beca', 'transporte', 'ruana' o 'react'.</p>
              </div>
            )}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              
              {/* ======================================= */}
              {/* SECTION: INICIO */}
              {/* ======================================= */}
              {activeTab === "inicio" && (
                <div className="space-y-8">
                  {/* Welcome banner */}
                  <div className="bg-zinc-950 text-white rounded-2xl p-6 md:p-8 border-l-8 border-red-600 shadow-lg relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 opacity-10 translate-x-10 translate-y-10 scale-150 select-none pointer-events-none hidden md:block">
                      <Sparkles className="w-60 h-60" />
                    </div>
                    
                    <div className="max-w-3xl relative z-10">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-red-500 animate-spin" />
                        <span className="text-xs uppercase tracking-wider font-extrabold text-red-500">Bienvenida Institucional</span>
                      </div>
                      <h2 className="text-xl md:text-3xl font-extrabold text-white leading-tight">
                        Construyendo el futuro de Nobsa con liderazgo y cultura joven
                      </h2>
                      <p className="mt-3 text-sm md:text-base text-zinc-300 leading-relaxed font-normal">
                        {youthInfo.welcomeMessage}
                      </p>
                      
                      <div className="mt-6 flex flex-wrap gap-3">
                        <button 
                          onClick={() => { setActiveTab("convocatorias"); speakText("Abriendo Convocatorias"); }}
                          className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm font-semibold rounded-xl flex items-center gap-2 cursor-pointer transition shadow-md shadow-red-600/15 group"
                        >
                          <span>Ver Becas y Convocatorias</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                        </button>
                        
                        <button 
                          onClick={() => { setActiveTab("chat"); speakText("Abriendo chat virtual"); }}
                          className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 text-zinc-200 text-xs md:text-sm font-semibold rounded-xl flex items-center gap-2 cursor-pointer transition"
                        >
                          <MessageSquare className="w-4 h-4 text-red-500" />
                          <span>Chat de Atención en Vivo</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Stat grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { num: "🎓 100%", desc: "Beca de Matrícula", details: "Convenios educación sup." },
                      { num: "💼 $5M", desc: "Capital Condonable", details: "Ideas emprendedoras" },
                      { num: "🚌 60%", desc: "Subsidio Transporte", details: "Rutas Universitarias" },
                      { num: "👥 11", desc: "Consejeros CMJ", details: "Liderazgo democrático" },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition">
                        <div>
                          <p className="text-xl md:text-2xl font-black text-red-600 dark:text-red-500">{stat.num}</p>
                          <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-1">{stat.desc}</p>
                        </div>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 border-t border-zinc-100 dark:border-zinc-800 pt-1">{stat.details}</p>
                      </div>
                    ))}
                  </div>

                  {/* Featured News Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
                      <h3 className="text-lg md:text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
                        <span className="block w-3.5 h-3.5 bg-red-600 rounded"></span>
                        Noticias Destacadas y Novedades
                      </h3>
                      <span className="text-xs font-medium text-zinc-500">Actualizado: Junio 2026</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {newsData.map((item) => (
                        <article 
                          key={item.id} 
                          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-red-600/30 transition-all duration-300 flex flex-col group"
                          onClick={() => speakText(`Noticia: ${item.title}`)}
                        >
                          <div className="h-44 overflow-hidden relative bg-zinc-200">
                            <img 
                              src={item.imageUrl} 
                              alt={item.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                            />
                            <span className="absolute top-3 left-3 bg-zinc-950/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase border-l-2 border-red-600">
                              {item.category}
                            </span>
                          </div>
                          
                          <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold">{item.date}</p>
                              <h4 className="font-bold text-sm md:text-base text-zinc-900 dark:text-zinc-100 mt-1 leading-snug">
                                {item.title}
                              </h4>
                              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-3">
                                {item.excerpt}
                              </p>
                            </div>
                            
                            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                              <span className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline inline-flex items-center gap-1 cursor-pointer">
                                Leer artículo completo <ArrowRight className="w-3 h-3" />
                              </span>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ======================================= */}
              {/* SECTION: ¿QUIÉNES SOMOS? */}
              {/* ======================================= */}
              {activeTab === "somos" && (
                <div className="space-y-8">
                  {/* Main core layout and details */}
                  <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <div className="max-w-3xl">
                      <p className="text-xs uppercase font-extrabold text-red-600 dark:text-red-500 tracking-wider">
                        {youthInfo.aboutUs.subTitle}
                      </p>
                      <h2 className="text-xl md:text-2.5xl font-black mt-1 text-zinc-800 dark:text-zinc-100 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                        {youthInfo.aboutUs.title}
                      </h2>
                      <p className="text-sm md:text-base leading-relaxed text-zinc-600 dark:text-zinc-300 mt-4 font-normal">
                        {youthInfo.aboutUs.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                      {/* Objectives list */}
                      <div className="bg-zinc-50 dark:bg-zinc-950/30 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800/60">
                        <h3 className="font-bold text-sm md:text-base text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-3">
                          <CheckCircle className="w-4.5 h-4.5 text-red-600 shrink-0" />
                          Objetivos del Área de Juventudes
                        </h3>
                        <ul className="space-y-3">
                          {youthInfo.aboutUs.objectives.map((obj, index) => (
                            <li key={index} className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2 leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0"></span>
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Functions list */}
                      <div className="bg-zinc-50 dark:bg-zinc-950/30 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800/60">
                        <h3 className="font-bold text-sm md:text-base text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-3">
                          <BookOpen className="w-4.5 h-4.5 text-red-600 shrink-0" />
                          Funciones Principales
                        </h3>
                        <ul className="space-y-3">
                          {youthInfo.aboutUs.functions.map((func, index) => (
                            <li key={index} className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2 leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-1.5 shrink-0"></span>
                              <span>{func}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Industrial & Textile background cards */}
                  <div className="bg-zinc-950 text-white rounded-2xl p-6 md:p-8 border border-zinc-850 shadow-md flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0 select-none">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-bold">Tradición Textil de Nobsa</h3>
                      <p className="text-xs md:text-sm text-zinc-400 mt-1 leading-relaxed">
                        En Nobsa, la lana de oveja procesada a mano no es solo parte de nuestra historia, sino un motor de emprendimiento del que los jóvenes son artífices. Mediante programas de costura tradicional mezclados con venta tecnológica, fomentamos un relevo generacional digno, moderno y exportador.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ======================================= */}
              {/* SECTION: OFERTA INSTITUTIONAL */}
              {/* ======================================= */}
              {activeTab === "oferta" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
                    <div>
                      <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Catálogo de Programas y Servicios</h2>
                      <p className="text-xs text-zinc-500">Programas de formación, subsidios y becas auspiciados directamente por la Alcaldía Municipal.</p>
                    </div>

                    {/* Quick filter pill */}
                    <div className="flex flex-wrap gap-1">
                      {["Todos", "Deporte", "Cultura", "Educación", "Emprendimiento"].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => { setProgramFilter(cat); speakText(`Filtrando programas de ${cat}`); }}
                          className={`text-xs px-3 py-1.5 rounded-lg border font-medium cursor-pointer transition ${
                            programFilter === cat 
                              ? "bg-red-600 text-white border-red-500" 
                              : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {programsData
                      .filter(p => programFilter === "Todos" || p.category === programFilter)
                      .map((p) => {
                        const isExpanded = expandedProgram === p.id;
                        return (
                          <div 
                            key={p.id} 
                            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-red-600/20 transition-all duration-300"
                          >
                            <div className="flex justify-between items-start gap-3">
                              <div>
                                <span className="text-[10px] uppercase font-bold text-red-600 bg-red-100/50 dark:bg-red-950/40 dark:text-red-400 px-2.5 py-0.5 rounded-md">
                                  {p.category}
                                </span>
                                <h3 className="font-extrabold text-base md:text-lg text-zinc-900 dark:text-zinc-100 mt-2 leading-snug">
                                  {p.title}
                                </h3>
                              </div>
                              <span className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 flex items-center justify-center shrink-0">
                                {p.category === "Educación" && <GraduationCap className="w-5 h-5" />}
                                {p.category === "Emprendimiento" && <Briefcase className="w-5 h-5" />}
                                {p.category === "Cultura" && <Sparkles className="w-5 h-5" />}
                                {p.category === "Deporte" && <Award className="w-5 h-5" />}
                              </span>
                            </div>

                            <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed">
                              {p.description}
                            </p>

                            {/* Emil Kowalski spring accordion item */}
                            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                              <button
                                onClick={() => {
                                  const targetId = isExpanded ? null : p.id;
                                  setExpandedProgram(targetId);
                                  speakText(isExpanded ? "Detalles cerrados" : `Mostrando beneficios y requisitos para ${p.title}`);
                                }}
                                className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                <span>{isExpanded ? "Ocultar requisitos y contacto" : "Ver requisitos y beneficios del joven"}</span>
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                              </button>

                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                                    className="overflow-hidden mt-3 text-xs space-y-3.5"
                                  >
                                    {/* Benefits */}
                                    <div className="bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800/80">
                                      <p className="font-bold text-zinc-800 dark:text-zinc-200 mb-1 flex items-center gap-1.5 uppercase tracking-wide">
                                        <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Beneficios para el beneficiario:
                                      </p>
                                      <ul className="space-y-1 list-disc pl-4 text-zinc-600 dark:text-zinc-400">
                                        {p.benefits.map((b, idx) => (
                                          <li key={idx}>
                                            <span>{b}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    {/* Requirements */}
                                    <div className="bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800/80">
                                      <p className="font-bold text-zinc-800 dark:text-zinc-200 mb-1 flex items-center gap-1.5 uppercase tracking-wide">
                                        <Info className="w-3.5 h-3.5 text-blue-500" /> Requisitos de Admisión:
                                      </p>
                                      <ul className="space-y-1 list-disc pl-4 text-zinc-600 dark:text-zinc-400">
                                        {p.requirements.map((r, idx) => (
                                          <li key={idx}>
                                            <span>{r}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    {/* Contact coordinates */}
                                    <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                                      <Mail className="w-3 h-3 text-red-500" />
                                      <span>Canal oficial: <strong>{p.contactPerson}</strong></span>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* ======================================= */}
              {/* SECTION: CONVOCATORIAS */}
              {/* ======================================= */}
              {activeTab === "convocatorias" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
                    <div>
                      <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <GraduationCap className="text-red-600 w-6 h-6" />
                        <span>Convocatorias de Becas y Apoyos Activos</span>
                      </h2>
                      <p className="text-xs text-zinc-500">Postulaciones vigentes para subsidios, becas de estudio superior, y capacitación tecnológica.</p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {["Todos", "Beca", "Curso", "Empleo", "Emprendimiento"].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => { setConvocatoriaFilter(cat); speakText(`Filtrando por ${cat}`); }}
                          className={`text-xs px-3 py-1.5 rounded-lg border font-medium cursor-pointer transition ${
                            convocatoriaFilter === cat 
                              ? "bg-red-600 text-white border-red-500" 
                              : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {convocatoriasData
                      .filter(c => convocatoriaFilter === "Todos" || c.type === convocatoriaFilter)
                      .map((c) => (
                        <div 
                          key={c.id} 
                          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition relative overflow-hidden"
                          onClick={() => speakText(`Convocatoria de ${c.title}. Cierra el ${c.deadline}`)}
                        >
                          {/* Accent status tag top right */}
                          <span className={`absolute top-4 right-4 text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                            c.status === "Abierta" 
                              ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400" 
                              : c.status === "Próximamente" 
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400" 
                              : "bg-zinc-100 text-zinc-500 dark:bg-zinc-850 dark:text-zinc-400"
                          }`}>
                            ● {c.status}
                          </span>

                          <div>
                            <span className="text-[10px] text-red-600 dark:text-red-400 font-extrabold uppercase bg-red-100/40 dark:bg-red-950/20 px-2 py-0.5 rounded">
                              {c.type}
                            </span>
                            <h3 className="font-extrabold text-base md:text-lg text-zinc-900 dark:text-zinc-100 mt-2.5 pr-20 leading-tight">
                              {c.title}
                            </h3>
                            <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                              {c.description}
                            </p>

                            {/* Requirements list */}
                            <div className="mt-4 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800/60">
                              <p className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5 text-zinc-400" /> Requisitos mínimos de postulación:
                              </p>
                              <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1 list-disc pl-4 leading-relaxed">
                                {c.requirements.map((req, i) => (
                                  <li key={i}>
                                    <span>{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between flex-wrap gap-2">
                            <span className="text-xs text-zinc-400">
                              Plazo máximo: <strong className="text-zinc-600 dark:text-zinc-300">{c.deadline}</strong>
                            </span>

                            <button
                              onClick={() => {
                                if (c.status === "Abierta") {
                                  setActiveTab("contacto");
                                  speakText(`Accediendo para diligenciar ${c.title}`);
                                } else {
                                  alert("Esta convocatoria se abrirá próximamente en las fechas señaladas.");
                                }
                              }}
                              className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition ${
                                c.status === "Abierta"
                                  ? "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                                  : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                              }`}
                            >
                              <span>{c.linkText}</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* ======================================= */}
              {/* SECTION: PARTICIPACIÓN JUVENIL */}
              {/* ======================================= */}
              {activeTab === "participacion" && (
                <div className="space-y-8">
                  {/* Municipal Youth Council Presentation */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-sm">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Scale className="text-red-600 w-5 h-5 shrink-0" />
                          <span className="text-xs font-extrabold uppercase text-red-600 tracking-wider">Democracia e Incidencia</span>
                        </div>
                        <h2 className="text-xl md:text-2.5xl font-black text-zinc-900 dark:text-zinc-100">
                          {youthInfo.cmj.title}
                        </h2>
                        <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-300 mt-3 leading-relaxed">
                          {youthInfo.cmj.description}
                        </p>

                        <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 mt-6 space-y-3">
                          <p className="font-bold text-xs uppercase text-zinc-400 tracking-wider">Principales logros del CMJ de Nobsa:</p>
                          <ul className="space-y-1.5 text-xs md:text-sm text-zinc-600 dark:text-zinc-400 pr-5">
                            {youthInfo.cmj.achievements.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                                <span className="bg-red-600 text-white w-4.5 h-4.5 rounded-full shrink-0 flex items-center justify-center text-[10px] font-black mt-0.5">
                                  {idx + 1}
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-xs text-zinc-400">
                        <span>Presidenta actual: <strong>{youthInfo.cmj.currentPresident}</strong></span>
                        <span>Representantes: <strong>{youthInfo.cmj.membersCount} Curules</strong></span>
                      </div>
                    </div>

                    {/* Platform instructions side */}
                    <div className="lg:col-span-5 bg-zinc-950 text-white rounded-2xl p-6 md:p-8 border border-zinc-850 flex flex-col justify-between shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-5 select-none pointer-events-none scale-150">
                        <Users className="w-40 h-40" />
                      </div>
                      
                      <div className="relative z-10">
                        <span className="text-[10px] tracking-widest font-black uppercase bg-zinc-850 text-zinc-300 px-2 py-0.5 rounded">
                          Asociaciones Juveniles
                        </span>
                        <h3 className="text-lg md:text-xl font-bold mt-2 text-white">
                          {youthInfo.plataforma.title}
                        </h3>
                        <p className="text-xs md:text-sm text-zinc-300 mt-2.5 leading-relaxed font-normal">
                          {youthInfo.plataforma.description}
                        </p>
                        
                        <div className="mt-5 p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
                          <p className="font-bold text-red-500 mb-1">¿Cómo hacer parte con mi parche?</p>
                          <p className="text-zinc-400 leading-relaxed font-normal">
                            {youthInfo.plataforma.howToJoin}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => { setActiveTab("documentos"); speakText("Abriendo documentos"); }}
                        className="mt-6 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition text-center cursor-pointer w-full"
                      >
                        Descargar Formulario de Registro Oficial (PDF)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ======================================= */}
              {/* SECTION: EVENTOS Y ACTIVIDADES */}
              {/* ======================================= */}
              {activeTab === "eventos" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
                    <div>
                      <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <Calendar className="text-red-600 w-6 h-6" />
                        <span>Agenda Juvenil, Ferias y Talleres</span>
                      </h2>
                      <p className="text-xs text-zinc-500">Agéndate y participa de los eventos lúdicos y capacitaciones técnicas en el casco urbano y veredas.</p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {["Todos", "Feria", "Taller", "Capacitación", "Agenda"].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => { setEventFilter(cat); speakText(`Ver eventos de tipo ${cat}`); }}
                          className={`text-xs px-3 py-1.5 rounded-lg border font-medium cursor-pointer transition ${
                            eventFilter === cat 
                              ? "bg-red-600 text-white border-red-500" 
                              : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {eventsData
                      .filter(e => eventFilter === "Todos" || e.type === eventFilter)
                      .map((e) => (
                        <div 
                          key={e.id} 
                          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-red-600/20 transition duration-300"
                          onClick={() => speakText(`Evento ${e.title} en ${e.location}`)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[10px] font-bold bg-zinc-150 dark:bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-md">
                                {e.type}
                              </span>
                              <h3 className="font-extrabold text-base md:text-lg text-zinc-900 dark:text-zinc-100 mt-2">
                                {e.title}
                              </h3>
                            </div>
                            
                            <div className="bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 p-2.5 rounded-xl shrink-0 flex flex-col items-center justify-center font-bold text-center border border-red-100 dark:border-red-900/60 w-12 h-12">
                              <span className="text-[10px] uppercase leading-none font-medium">Día</span>
                              <span className="text-sm leading-none mt-1">{e.date.split("-")[2]}</span>
                            </div>
                          </div>

                          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 mt-2.5 leading-relaxed">
                            {e.description}
                          </p>

                          <div className="mt-4 pt-3.5 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-2 gap-3 text-xs text-zinc-500">
                            <div>
                              <span className="text-[10px] text-zinc-400 block">Horario</span>
                              <strong className="text-zinc-700 dark:text-zinc-300 font-semibold">{e.time}</strong>
                            </div>
                            <div>
                              <span className="text-[10px] text-zinc-400 block">Ubicación</span>
                              <strong className="text-zinc-700 dark:text-zinc-300 font-semibold flex items-center gap-0.5">
                                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                                <span className="truncate">{e.location}</span>
                              </strong>
                            </div>
                          </div>

                          {e.capacity && (
                            <div className="mt-3.5 bg-zinc-50 dark:bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800/60 text-xs text-zinc-500 flex justify-between items-center">
                              <span>Aforo de participantes limitado:</span>
                              <strong className="text-red-600 font-bold">{e.capacity} cupos</strong>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* ======================================= */}
              {/* SECTION: DOCUMENTOS Y NORMATIVIDAD */}
              {/* ======================================= */}
              {activeTab === "documentos" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
                    <div>
                      <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <FileText className="text-red-600 w-6 h-6" />
                        <span>Trámites, Leyes y Decretos</span>
                      </h2>
                      <p className="text-xs text-zinc-500">Repositorio del Estatuto de Ciudadanía Juvenil, acuerdos municipales, y formularios oficiales.</p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {["Todos", "Política Pública", "Decreto", "Formulario"].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => { setDocFilter(cat); speakText(`Ver documentos de tipo ${cat}`); }}
                          className={`text-xs px-3 py-1.5 rounded-lg border font-medium cursor-pointer transition ${
                            docFilter === cat 
                              ? "bg-red-600 text-white border-red-500" 
                              : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {documentsData
                      .filter(d => docFilter === "Todos" || d.category === docFilter)
                      .map((d) => (
                        <div 
                          key={d.id} 
                          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 md:p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-red-600/30 transition duration-300 shadow-xs"
                          onClick={() => speakText(`Documento: ${d.title}`)}
                        >
                          <div className="flex items-start gap-3">
                            <span className="p-3 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-xl shrink-0">
                              <FileText className="w-5.5 h-5.5" />
                            </span>
                            <div>
                              <div className="flex flex-wrap gap-1.5 items-center">
                                <span className="text-[9px] uppercase tracking-wide bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 font-bold rounded">
                                  {d.category}
                                </span>
                                <span className="text-[9px] text-zinc-400">Año: {d.year}</span>
                                <span className="text-[9px] text-zinc-400">• Tamaño: {d.fileSize}</span>
                              </div>
                              <h3 className="font-bold text-sm md:text-base text-zinc-800 dark:text-zinc-200 mt-1 leading-snug">
                                {d.title}
                              </h3>
                              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                                {d.description}
                              </p>
                            </div>
                          </div>

                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              alert(`Se ha solicitado la simulación de descarga de: ${d.title} (${d.fileSize}). Iniciando guardado local en formato PDF.`);
                              speakText(`Descargando archivo`);
                            }}
                            className="bg-zinc-900 hover:bg-black text-white text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 shrink-0 transition font-bold border border-zinc-800 w-full md:w-auto justify-center cursor-pointer"
                          >
                            <Download className="w-4 h-4 text-red-500" />
                            <span>Descargar</span>
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* ======================================= */}
              {/* SECTION: GALERÍA MULTIMEDIA */}
              {/* ======================================= */}
              {activeTab === "galeria" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
                    <div>
                      <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <ImageIcon className="text-red-600 w-6 h-6" />
                        <span>Galería con Evidencias de Actividades</span>
                      </h2>
                      <p className="text-xs text-zinc-500">Muestrario fotográfico y evidencias recolectadas en proyectos, asambleas de oratoria, y ferias en Nobsa.</p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {["Todos", "FOTO", "EVIDENCIA"].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => { setGalleryFilter(cat); speakText(`Ver multimedia de tipo ${cat}`); }}
                          className={`text-xs px-3 py-1.5 rounded-lg border font-medium cursor-pointer transition ${
                            galleryFilter === cat 
                              ? "bg-red-600 text-white border-red-500" 
                              : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {galleryData
                      .filter(m => galleryFilter === "Todos" || m.type === galleryFilter)
                      .map((media) => (
                        <div 
                          key={media.id} 
                          onClick={() => { setSelectedMedia(media); speakText(`Ampliando ${media.title}`); }}
                          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm group hover:shadow-md cursor-zoom-in transition duration-300 flex flex-col"
                        >
                          <div className="h-56 relative bg-zinc-200 overflow-hidden shrink-0">
                            <img 
                              src={media.url} 
                              alt={media.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-102 transition duration-500" 
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-zinc-950/80 via-transparent to-transparent opacity-90"></div>
                            
                            <div className="absolute bottom-3 left-3 right-3 text-white">
                              <span className="text-[8px] uppercase tracking-wider font-extrabold bg-red-600 px-2.5 py-0.5 rounded-md">
                                {media.type}
                              </span>
                              <h3 className="font-bold text-sm md:text-base mt-1.5 line-clamp-1">{media.title}</h3>
                            </div>
                          </div>

                          <div className="p-4 flex-1 flex flex-col justify-between bg-zinc-50/50 dark:bg-zinc-900">
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal italic">
                              "{media.caption}"
                            </p>
                            <div className="mt-3 pt-3.5 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                              <span>Semana de Juventudes</span>
                              <span>{media.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Accessible Lightbox Modal */}
                  {selectedMedia && (
                    <div 
                      className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
                      onClick={() => setSelectedMedia(null)}
                      role="dialog"
                      aria-modal="true"
                    >
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="max-w-3xl w-full bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 text-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="relative h-[25rem] sm:h-[30rem] bg-black flex items-center justify-center">
                          <img 
                            src={selectedMedia.url} 
                            alt={selectedMedia.title} 
                            referrerPolicy="no-referrer"
                            className="max-h-full max-w-full object-contain"
                          />
                          <button 
                            onClick={() => setSelectedMedia(null)}
                            className="absolute top-4 right-4 p-2 rounded-full bg-zinc-950/85 hover:bg-red-600 transition text-zinc-200 cursor-pointer"
                            aria-label="Cerrar ampliación"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <div className="p-5 border-t border-zinc-800 bg-zinc-950">
                          <span className="text-[9px] bg-red-600 text-white px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                            {selectedMedia.type}
                          </span>
                          <h3 className="text-lg font-bold mt-2">{selectedMedia.title}</h3>
                          <p className="text-zinc-400 text-xs md:text-sm mt-1 leading-relaxed font-normal">
                            {selectedMedia.caption}
                          </p>
                          <p className="text-[10px] text-zinc-500 mt-3 uppercase tracking-wider font-extrabold">
                            Capturado en Nobsa, Boyacá / Fecha: {selectedMedia.date}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
              )}

              {/* ======================================= */}
              {/* SECTION: CONTACTO / PQRS */}
              {/* ======================================= */}
              {activeTab === "contacto" && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    
                    {/* Information panel */}
                    <div className="lg:col-span-4 bg-zinc-950 text-white rounded-2xl p-6 md:p-8 border border-zinc-850 flex flex-col justify-between shadow-lg">
                      <div>
                        <span className="text-[10px] bg-red-600 text-white font-bold uppercase px-2 py-0.5 rounded-md tracking-widest">
                          Secretaría Municipal
                        </span>
                        <h2 className="text-xl md:text-2.5xl font-black text-white mt-2 pb-3 border-b border-zinc-850">
                          Casa de Apoyo a Juventudes
                        </h2>
                        
                        <p className="text-xs md:text-sm text-zinc-300 mt-4 leading-relaxed font-normal">
                          Acércate directamente a nuestras instalaciones o contáctanos por los canales de radiación oficial de lunes a viernes de 8:00 AM a 12:00 m. y de 2:00 PM a 6:00 PM.
                        </p>

                        <div className="space-y-4.5 mt-8 text-xs text-zinc-300">
                          <div className="flex items-start gap-2.5">
                            <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                            <div>
                              <strong className="block text-white">Dirección Física</strong>
                              <span>Alcaldía Central, Calle 4 No. 4-24, Parque Principal de Nobsa, Boyacá</span>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2.5">
                            <Phone className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                            <div>
                              <strong className="block text-white">Teléfonos de Enlace</strong>
                              <span>+57 608 775 0101 ext. 12 (Área de Juventudes)</span>
                            </div>
                          </div>

                          <div className="flex items-start gap-2.5">
                            <Mail className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                            <div>
                              <strong className="block text-white">Correo institucional</strong>
                              <span>juventudes@nobsa-boyaca.gov.co</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-4 border-t border-zinc-850 text-[10px] text-zinc-500 font-bold flex gap-3.5 uppercase tracking-wider">
                        <a href="#facebook" className="hover:text-red-500 transition">Facebook</a>
                        <a href="#instagram" className="hover:text-red-500 transition">Instagram</a>
                        <a href="#web" className="hover:text-red-500 transition">Portal Web</a>
                      </div>
                    </div>

                    {/* Interactive PQRS Form and dynamic generation of ticket */}
                    <div className="lg:col-span-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-sm">
                      <AnimatePresence mode="wait">
                        {!pqrsRadicado ? (
                          <motion.div
                            key="form-pqrs"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <div className="pb-3 border-b border-zinc-100 dark:border-zinc-800 mb-5">
                              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                <FileCheck className="w-5 h-5 text-red-600" />
                                <span>Radicación de PQRS Ciudadano</span>
                              </h3>
                              <p className="text-xs text-zinc-500">Diligencia este formulario institucional para registrar tus peticiones, quejas, reclamos o sugerencias formales.</p>
                            </div>

                            <form onSubmit={handlePqrsSubmit} className="space-y-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1">Nombre Completo *</label>
                                  <input 
                                    type="text" 
                                    required
                                    value={pqrsForm.nombre}
                                    onChange={(e) => setPqrsForm({ ...pqrsForm, nombre: e.target.value })}
                                    placeholder="Ej: Camilo Andrés Pirajón"
                                    className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-red-600 border border-zinc-200 dark:border-zinc-700 font-normal"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1">Correo Electrónico *</label>
                                  <input 
                                    type="email" 
                                    required
                                    value={pqrsForm.email}
                                    onChange={(e) => setPqrsForm({ ...pqrsForm, email: e.target.value })}
                                    placeholder="correo@ejemplo.com"
                                    className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-red-600 border border-zinc-200 dark:border-zinc-700 font-normal"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1">Teléfono Móvil o Fijo</label>
                                  <input 
                                    type="tel" 
                                    value={pqrsForm.telefono}
                                    onChange={(e) => setPqrsForm({ ...pqrsForm, telefono: e.target.value })}
                                    placeholder="310 333 4455"
                                    className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-red-600 border border-zinc-200 dark:border-zinc-700 font-normal"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1">Tipo de Solicitud *</label>
                                  <select
                                    value={pqrsForm.tipo}
                                    onChange={(e: any) => setPqrsForm({ ...pqrsForm, tipo: e.target.value })}
                                    className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-red-600 border border-zinc-200 dark:border-zinc-700 font-bold"
                                  >
                                    <option value="peticion">Petición</option>
                                    <option value="queja">Queja</option>
                                    <option value="reclamo">Reclamo</option>
                                    <option value="sugerencia">Sugerencia</option>
                                  </select>
                                </div>
                              </div>

                              <div>
                                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1">Asunto de Requerimiento *</label>
                                <input 
                                  type="text" 
                                  required
                                  value={pqrsForm.asunto}
                                  onChange={(e) => setPqrsForm({ ...pqrsForm, asunto: e.target.value })}
                                  placeholder="Ej: Pregunta sobre subsidio de transporte UPTC"
                                  className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-red-600 border border-zinc-200 dark:border-zinc-700 font-normal"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1">Mensaje o Detalle Continuo *</label>
                                <textarea 
                                  required
                                  rows={4}
                                  value={pqrsForm.mensaje}
                                  onChange={(e) => setPqrsForm({ ...pqrsForm, mensaje: e.target.value })}
                                  placeholder="Explica de forma detallada tu requerimiento. Menciona vereda, programa o documento correspondiente si aplica..."
                                  className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-red-600 border border-zinc-200 dark:border-zinc-700 font-normal"
                                />
                              </div>

                              <div className="flex items-start gap-2.5">
                                <input 
                                  type="checkbox" 
                                  id="consent-check"
                                  required
                                  checked={pqrsForm.consentimiento}
                                  onChange={(e) => setPqrsForm({ ...pqrsForm, consentimiento: e.target.checked })}
                                  className="mt-0.5 rounded border-zinc-300 text-red-600 focus:ring-red-600"
                                />
                                <label htmlFor="consent-check" className="text-[10px] text-zinc-500 leading-normal font-medium max-w-lg cursor-pointer">
                                  Acepto el tratamiento de mis datos personales de conformidad con la Ley 1581 de 2012 y la política del Municipio de Nobsa para dar respuesta a mi requerimiento de atención ciudadana.
                                </label>
                              </div>

                              <button
                                type="submit"
                                disabled={isPqrsSubmitting}
                                className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs py-3 rounded-lg flex items-center justify-center gap-1 cursor-pointer transition shadow-md shadow-red-600/15"
                              >
                                {isPqrsSubmitting ? "Procesando radicación oficial..." : "Radicar Formulario de PQRS Online"}
                              </button>
                            </form>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="ticket-pqrs"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center py-6"
                          >
                            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4 border border-green-200">
                              <CheckCircle className="w-8 h-8" />
                            </div>
                            
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">¡PQRS Radicado con Éxito!</h3>
                            <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto">Su petición ha sido registrada en el sistema de gestión del Área de Juventudes de la Alcaldía de Nobsa.</p>
                            
                            <div className="my-6 p-5 bg-zinc-55 dark:bg-zinc-950 rounded-2xl max-w-md mx-auto border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-left">
                              <div className="flex justify-between items-center text-[10px] text-zinc-400 font-bold uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-3">
                                <span>Radicado Único de Seguimiento</span>
                                <span>Ofic. Nobsa</span>
                              </div>
                              
                              <div className="space-y-2 text-xs">
                                <p className="text-zinc-500">Código de Radicado: <strong className="text-red-600 font-black text-sm tracking-wider select-all">{pqrsRadicado}</strong></p>
                                <p className="text-zinc-500">Solicitante: <strong className="text-zinc-800 dark:text-zinc-200 font-bold">{pqrsForm.nombre}</strong></p>
                                <p className="text-zinc-500">Asunto: <span className="text-zinc-800 dark:text-zinc-200 font-medium italic">"{pqrsForm.asunto}"</span></p>
                                <p className="text-zinc-500">Tipo: <strong className="text-zinc-800 dark:text-zinc-200 font-bold uppercase">{pqrsForm.tipo}</strong></p>
                                <p className="text-zinc-500">Fecha de Radiación: <strong className="text-zinc-800 dark:text-zinc-200 font-semibold">{new Date().toLocaleDateString()}</strong></p>
                              </div>
                              
                              <p className="text-[10px] text-zinc-400 leading-normal mt-4 border-t border-zinc-100 dark:border-zinc-800 pt-2 font-normal">
                                Se ha enviado una confirmación oficial de radicación a <strong className="text-zinc-500">{pqrsForm.email}</strong>. De acuerdo al Estatuto de Servicio al Ciudadano, recibirá respuesta formal en un plazo máximo de 15 días hábiles.
                              </p>
                            </div>

                            <div className="flex justify-center gap-3 max-w-md mx-auto">
                              <button 
                                onClick={() => {
                                  alert(`Descargando certificado digital de radicado ${pqrsRadicado} en formato PDF.`);
                                  speakText("Descargando certificado en PDF");
                                }}
                                className="px-4 py-2 border rounded-xl border-zinc-200 dark:border-zinc-700 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 shrink-0 cursor-pointer flex items-center gap-1 text-zinc-700 dark:text-zinc-300"
                              >
                                <Download className="w-3.5 h-3.5 text-zinc-400" />
                                <span>Descargar Ticket (PDF)</span>
                              </button>
                              
                              <button 
                                onClick={resetPqrsForm}
                                className="px-4 py-2 bg-zinc-900 hover:bg-black text-white text-xs font-semibold rounded-xl cursor-pointer"
                              >
                                Radicar otro requerimiento
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              )}

              {/* ======================================= */}
              {/* SECTION: CHAT CIUDADANO (AI REAL-TIME) */}
              {/* ======================================= */}
              {activeTab === "chat" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                      <MessageSquare className="text-red-600 w-6 h-6" />
                      <span>Atención al Ciudadano en Tiempo Real</span>
                    </h2>
                    <p className="text-xs text-zinc-500">Canal inteligente de diálogo y orientación al instante impulsado por la Alcaldía Municipal para resolver tus dudas de inmediato.</p>
                  </div>

                  <div className="max-w-4xl mx-auto">
                    <ChatSection isDarkMode={isDarkMode} />
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {/* 5. COHESIVE INSTITUTIONAL FOOTER */}
      <footer className="bg-zinc-950 text-zinc-400 text-xs py-8 mt-12 border-t-2 border-red-600">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <svg className="w-5 h-5 text-red-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" fill="currentColor" fillOpacity="0.2" />
              </svg>
              <span>Alcaldía de Nobsa</span>
            </div>
            <p className="mt-3 text-zinc-500 leading-relaxed font-normal">
              Oficina de Juventud, perteneciente a la Secretaría de Integración Social de Nobsa, Boyacá. Una administración presente y participativa.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-3.5">Departamentos Hermandades</h4>
            <ul className="space-y-2 text-zinc-500">
              <li><span className="hover:text-red-500 cursor-pointer">Registraduría Municipal de Nobsa</span></li>
              <li><span className="hover:text-red-500 cursor-pointer">Concejo de Nobsa</span></li>
              <li><span className="hover:text-red-500 cursor-pointer">Gobernación de Boyacá</span></li>
              <li><span className="hover:text-red-500 cursor-pointer">Colombia Joven (Gobierno Nacional)</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-3.5">Política de Datos y Enlace</h4>
            <ul className="space-y-2 text-zinc-500">
              <li><span className="hover:text-red-500 cursor-pointer">Tratamiento de Datos Personales</span></li>
              <li><span className="hover:text-red-500 cursor-pointer">Derechos de Autor y Propiedad</span></li>
              <li><span className="hover:text-red-500 cursor-pointer">Mapa del Sitio de Nobsa</span></li>
              <li><span className="hover:text-red-500 cursor-pointer">Código de Integridad Pública</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-3.5">Información de Sistema</h4>
            <p className="text-zinc-500 leading-normal">
              Sistema de Atención Ciudadana 2026. Todos los derechos reservados.
            </p>
            <p className="mt-2 text-[10px] text-zinc-600 font-bold">
              Desarrollado en convenio tecnológico para los parches juveniles nobeños.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 pt-4 border-t border-zinc-900 text-center text-[10px] text-zinc-600">
          <span>© {new Date().getFullYear()} Alcaldía de Nobsa, Boyacá, Colombia. Hecho con orgullo boyacense.</span>
        </div>
      </footer>
    </div>
  );
}
