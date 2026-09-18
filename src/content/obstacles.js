// Each entry is grounded in a real bullet from the CV. The [TODO]s are
// deliberate — the personal "what it felt like" isn't mine to invent.
export const obstacles = {
  "latency-wall": {
    title: "THE LATENCY WALL",
    problem:
      "A 150M-record daily workload, and one classifier stage quietly eating 99% of the lookup time. Every other optimization barely moved the needle. [TODO: what it actually felt like chasing this one down]",
    resolution:
      "Traced it to a single nearest-neighbor feature. Pulling it out — and recalibrating the model with MLflow to keep accuracy honest — collapsed the runtime; the other 99% just vanished. [TODO: what this taught you, or how it changed the way you profile things now]",
  },
  "illegible-script": {
    title: "THE ILLEGIBLE SCRIPT",
    problem:
      "Handwritten prescriptions — some of the messiest input a pipeline can get. One agent trying to read, match against a pharmaceutical database, and apply insurance rules in a single pass kept tripping over its own assumptions. [TODO: what specifically kept failing, and how bad the early accuracy was]",
    resolution:
      "Split it into a chain of specialists instead of one generalist: one agent for image preprocessing, one for extraction, one for entity matching, one for business rules — coordinated with LangGraph and A2A, watched with LangSmith. [TODO: what changed once you split it up, or what you'd do differently now]",
  },
};
