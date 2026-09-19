// Each entry is grounded in a real bullet from the CV. The [TODO]s are
// deliberate — the personal "what it felt like" isn't mine to invent.
// Bilingual: this is narrative UI content, not a station or a
// recommendation, so it gets both languages.
export const obstacles = {
  "latency-wall": {
    en: {
      title: "THE LATENCY BOTTLENECK",
      problem:
        "A 150M-record daily workload, and one classifier stage quietly eating 99% of the lookup time. Every other optimization barely moved the needle. [TODO: what it actually felt like chasing this one down]",
      resolution:
        "Traced it to a single nearest-neighbor feature. Pulling it out — and recalibrating the model with MLflow to keep accuracy honest — collapsed the runtime; the other 99% just vanished. [TODO: what this taught you, or how it changed the way you profile things now]",
    },
    es: {
      title: "EL CUELLO DE BOTELLA",
      problem:
        "Una carga diaria de 150M de registros, y una etapa del clasificador que se comía en silencio el 99% del tiempo de búsqueda. Cualquier otra optimización apenas movía la aguja. [TODO: qué se sintió realmente perseguir este problema]",
      resolution:
        "Lo rastreé hasta una sola feature de vecino más cercano. Al quitarla — y recalibrar el modelo con MLflow para mantener la precisión honesta — el tiempo de ejecución colapsó; el otro 99% simplemente desapareció. [TODO: qué te enseñó esto, o cómo cambió tu forma de perfilar código ahora]",
    },
  },
  "illegible-script": {
    en: {
      title: "THE MESSY PRESCRIPTIONS",
      problem:
        "Handwritten prescriptions — some of the messiest input a pipeline can get. One agent tried to read the doctor's handwriting, cross-check medications against a pharmaceutical database, and apply insurance rules in a single pass — but the embedding wasn't weighting the medication name properly, so matches kept coming back irrelevant.",
      resolution:
        "Split it into a chain of specialists instead of one generalist: one agent for image preprocessing, one for extraction, one for entity matching, one for business rules. I repeated the medication name in the text used to generate the embedding, giving it more weight and improving result relevance.",
    },
    es: {
      title: "RECETAS PROBLEMÁTICAS",
      problem:
        "Recetas médicas escritas a mano — de lo más caótico que puede recibir un pipeline. Un agente intentaba leer la letra del médico, cotejar los medicamentos contra una base de datos farmacéutica y aplicar reglas de seguro en un solo paso, pero el embedding no priorizaba bien el nombre del medicamento, así que los resultados salían poco relevantes.",
      resolution:
        "Lo dividí en una cadena de especialistas en vez de un solo generalista: un agente para preprocesar imágenes, uno para extracción, uno para matching de entidades, uno para las reglas de negocio. Repetí el nombre del medicamento en el texto usado para el embedding, dándole más peso y mejorando la relevancia de los resultados.",
    },
  },
};
