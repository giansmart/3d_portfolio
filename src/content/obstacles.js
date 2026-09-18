// Each entry is grounded in a real bullet from the CV. The [TODO]s are
// deliberate — the personal "what it felt like" isn't mine to invent.
// Bilingual: this is narrative UI content, not a station or a
// recommendation, so it gets both languages.
export const obstacles = {
  "latency-wall": {
    en: {
      title: "THE LATENCY WALL",
      problem:
        "A 150M-record daily workload, and one classifier stage quietly eating 99% of the lookup time. Every other optimization barely moved the needle. [TODO: what it actually felt like chasing this one down]",
      resolution:
        "Traced it to a single nearest-neighbor feature. Pulling it out — and recalibrating the model with MLflow to keep accuracy honest — collapsed the runtime; the other 99% just vanished. [TODO: what this taught you, or how it changed the way you profile things now]",
    },
    es: {
      title: "EL MURO DE LATENCIA",
      problem:
        "Una carga diaria de 150M de registros, y una etapa del clasificador que se comía en silencio el 99% del tiempo de búsqueda. Cualquier otra optimización apenas movía la aguja. [TODO: qué se sintió realmente perseguir este problema]",
      resolution:
        "Lo rastreé hasta una sola feature de vecino más cercano. Al quitarla — y recalibrar el modelo con MLflow para mantener la precisión honesta — el tiempo de ejecución colapsó; el otro 99% simplemente desapareció. [TODO: qué te enseñó esto, o cómo cambió tu forma de perfilar código ahora]",
    },
  },
  "illegible-script": {
    en: {
      title: "THE ILLEGIBLE SCRIPT",
      problem:
        "Handwritten prescriptions — some of the messiest input a pipeline can get. One agent trying to read, match against a pharmaceutical database, and apply insurance rules in a single pass kept tripping over its own assumptions. [TODO: what specifically kept failing, and how bad the early accuracy was]",
      resolution:
        "Split it into a chain of specialists instead of one generalist: one agent for image preprocessing, one for extraction, one for entity matching, one for business rules — coordinated with LangGraph and A2A, watched with LangSmith. [TODO: what changed once you split it up, or what you'd do differently now]",
    },
    es: {
      title: "EL SCRIPT ILEGIBLE",
      problem:
        "Recetas médicas escritas a mano — de lo más caótico que puede recibir un pipeline. Un solo agente intentando leer, cruzar contra una base de datos farmacéutica y aplicar reglas de seguros en un solo paso tropezaba constantemente con sus propias suposiciones. [TODO: qué fallaba específicamente, y qué tan mala era la precisión al inicio]",
      resolution:
        "Lo dividí en una cadena de especialistas en vez de un solo generalista: un agente para preprocesar imágenes, uno para extracción, uno para matching de entidades, uno para las reglas de negocio — coordinados con LangGraph y A2A, observados con LangSmith. [TODO: qué cambió al dividirlo, o qué harías diferente ahora]",
    },
  },
};
