// UI chrome, plus the content inside each station panel (profile, experience,
// skills, projects, contact form). Only the station MARKERS/labels on the
// world map (game/layout.js) and the LinkedIn recommendations stay fixed —
// those are excluded from translation on purpose.
export const translations = {
  en: {
    title: {
      start: "PRESS START",
      hint: "WASD / ARROWS · TAP TO EXPLORE",
      summary: (eng, ml) =>
        `${eng} years as a software & data engineer — the last ${ml} spent building production ML systems.`,
      badgeEngineering: "YRS ENGINEERING",
      badgeMl: "YRS ML",
      badgeMasters: "M.S. DATA SCIENCE · UTEC '26",
    },
    hud: {
      pressE: "PRESS E —",
      soundOn: "♪ ON",
      soundOff: "♪ OFF",
      exit: "✕ TITLE",
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
      close: "ESC / ✕",
    },
    toast: {
      found: "FRAGMENT FOUND —",
    },
    obstacle: {
      debug: "DEBUG IT →",
      close: "ESC / ✕",
    },
    finale: {
      title: "THE BEACON IS LIT",
      body: "Six fragments, twelve years, one throughline. That's the story — if it's the kind of engineer you're looking for, send a signal or grab the resume.",
      sendSignal: "SEND A SIGNAL",
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
      summary: (eng, ml) =>
        `${eng} años como ingeniero de software y datos — los últimos ${ml} construyendo sistemas de ML en producción.`,
      badgeEngineering: "AÑOS INGENIERÍA",
      badgeMl: "AÑOS ML",
      badgeMasters: "MAESTRÍA DATA SCIENCE · UTEC '26",
    },
    hud: {
      pressE: "PULSA E —",
      soundOn: "♪ SÍ",
      soundOff: "♪ NO",
      exit: "✕ INICIO",
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
      close: "ESC / ✕",
    },
    toast: {
      found: "FRAGMENTO ENCONTRADO —",
    },
    obstacle: {
      debug: "RESOLVERLO →",
      close: "ESC / ✕",
    },
    finale: {
      title: "EL FARO ESTÁ ENCENDIDO",
      body: "Seis fragmentos, doce años, un solo hilo conductor. Esa es la historia — si buscas este tipo de ingeniero, envía una señal o descarga el CV.",
      sendSignal: "ENVIAR UNA SEÑAL",
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
