// UI chrome, plus the content inside each station panel (profile, experience,
// skills, projects, contact form). Only the station MARKERS/labels on the
// world map (game/layout.js) and the LinkedIn recommendations stay fixed —
// those are excluded from translation on purpose.
export const translations = {
  en: {
    title: {
      start: "PRESS START",
      hint: "WASD / ARROWS · TAP TO EXPLORE",
      invite: "I invite you to walk through my journey: collect the skill fragments I picked up along the way and reach the end of the path to unlock my resume.",
      badgeEngineering: "YRS ENGINEERING",
      badgeMl: "YRS ML",
      badgeMasters: "M.S. DATA SCIENCE · UTEC '26",
    },
    hud: {
      pressE: "PRESS E —",
      soundOn: "ON",
      soundOff: "OFF",
      exit: "TITLE",
    },
    touch: {
      up: "Move up",
      down: "Move down",
      left: "Move left",
      right: "Move right",
      interact: "Interact",
    },
    journal: {
      title: (n, total) => `JOURNAL — ${n} / ${total}`,
      locked: "??? — undiscovered fragment",
    },
    toast: {
      found: "FRAGMENT FOUND —",
    },
    obstacle: {
      debug: "DEBUG IT →",
    },
    ok: "OK",
    finale: {
      title: "END OF THE ROAD",
      body: "Six fragments, twelve years, one story. If it made you want to talk, send a message — or grab the resume if you'd rather cut to the chase.",
      sendMessage: "SEND A MESSAGE",
      downloadCv: "DOWNLOAD CV",
      keepExploring: "keep exploring →",
    },
    projects: {
      counter: (n, total) => `PROJECT ${n} / ${total}`,
      prev: "◀ PREV",
      next: "NEXT ▶",
    },
    experience: {
      counter: (n, total) => `EXPERIENCE ${n} / ${total}`,
      prev: "◀ PREV",
      next: "NEXT ▶",
    },
    about: {
      education: "EDUCATION",
      certifications: "CERTIFICATIONS",
    },
    resume: {
      viewCv: "Skip the game — view as CV →",
      backToGame: "← Back to the interactive version",
      tagline: "The same story, no game required.",
      sections: {
        about: "ABOUT",
        experience: "EXPERIENCE",
        skills: "SKILLS",
        projects: "PROJECTS",
        contact: "CONTACT",
      },
    },
    contact: {
      introPrefix: "Send a signal —",
      introOr: "or",
      introLinkedin: "LinkedIn",
      introSuffix: (location) => `. Based in ${location} — open to remote work worldwide.`,
      namePlaceholder: "Your name",
      emailPlaceholder: "Your email",
      messagePlaceholder: "Message",
      send: "SEND SIGNAL",
      sending: "SENDING...",
      success: "Message sent — thank you!",
      error: "Something went wrong — email me directly instead.",
    },
    lang: { switchTo: "ES" },
  },
  es: {
    title: {
      start: "COMENZAR",
      hint: "WASD / FLECHAS · TOCA PARA EXPLORAR",
      invite: "Te invito a recorrer mi trayectoria: junta los fragmentos de habilidades que fui ganando en el camino y llega al final para desbloquear mi CV.",
      badgeEngineering: "AÑOS INGENIERÍA",
      badgeMl: "AÑOS ML",
      badgeMasters: "MAESTRÍA DATA SCIENCE · UTEC '26",
    },
    hud: {
      pressE: "PULSA E —",
      soundOn: "SÍ",
      soundOff: "NO",
      exit: "INICIO",
    },
    touch: {
      up: "Subir",
      down: "Bajar",
      left: "Izquierda",
      right: "Derecha",
      interact: "Interactuar",
    },
    journal: {
      title: (n, total) => `DIARIO — ${n} / ${total}`,
      locked: "??? — fragmento sin descubrir",
    },
    toast: {
      found: "FRAGMENTO ENCONTRADO —",
    },
    obstacle: {
      debug: "RESOLVERLO →",
    },
    ok: "OK",
    finale: {
      title: "FIN DEL CAMINO",
      body: "Seis fragmentos, doce años, una sola historia. Si te dieron ganas de conversar, escríbeme — o descarga el CV si prefieres ir directo al grano.",
      sendMessage: "ESCRÍBEME",
      downloadCv: "DESCARGAR CV",
      keepExploring: "seguir explorando →",
    },
    projects: {
      counter: (n, total) => `PROYECTO ${n} / ${total}`,
      prev: "◀ ANTERIOR",
      next: "SIGUIENTE ▶",
    },
    experience: {
      counter: (n, total) => `EXPERIENCIA ${n} / ${total}`,
      prev: "◀ ANTERIOR",
      next: "SIGUIENTE ▶",
    },
    about: {
      education: "EDUCACIÓN",
      certifications: "CERTIFICACIONES",
    },
    resume: {
      viewCv: "Saltar el juego — ver como CV →",
      backToGame: "← Volver a la versión interactiva",
      tagline: "La misma historia, sin necesidad de jugar.",
      sections: {
        about: "SOBRE MÍ",
        experience: "EXPERIENCIA",
        skills: "HABILIDADES",
        projects: "PROYECTOS",
        contact: "CONTACTO",
      },
    },
    contact: {
      introPrefix: "Envía una señal —",
      introOr: "o",
      introLinkedin: "LinkedIn",
      introSuffix: (location) => `. Con base en ${location} — abierto a trabajo remoto en cualquier parte.`,
      namePlaceholder: "Tu nombre",
      emailPlaceholder: "Tu correo",
      messagePlaceholder: "Mensaje",
      send: "ENVIAR SEÑAL",
      sending: "ENVIANDO...",
      success: "Mensaje enviado — ¡gracias!",
      error: "Algo salió mal — mejor escríbeme directamente.",
    },
    lang: { switchTo: "EN" },
  },
};
