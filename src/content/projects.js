// Tags are tech/tool names — stay the same in any language. Title and
// description are bilingual.
export const projects = [
  {
    tags: ["AWS", "PySpark", "Airflow"],
    en: {
      title: "Cross-Network Profile Matching",
      desc: "Orchestrated PySpark jobs (EMR/Glue) with Airflow to normalize identities, score similarity, run QA and publish deduplicated audiences into Redshift for targeted marketing campaigns.",
    },
    es: {
      title: "Emparejamiento de Perfiles Entre Redes",
      desc: "Orquesté trabajos de PySpark (EMR/Glue) con Airflow para normalizar identidades, calcular similitud, ejecutar controles de calidad y publicar audiencias deduplicadas en Redshift para campañas de marketing dirigidas.",
    },
  },
  {
    tags: ["LangGraph", "MCP", "A2A"],
    en: {
      title: "Multi-Agent Medical Prescription System",
      desc: "LLM-powered multi-agent system that reads handwritten prescriptions and determines insurance-tier coverage — agents for image preprocessing, extraction, entity matching and business rules, observed with LangSmith.",
    },
    es: {
      title: "Sistema Multi-Agente de Recetas Médicas",
      desc: "Sistema multi-agente basado en LLM que lee recetas médicas manuscritas y determina la cobertura del seguro — agentes para preprocesamiento de imágenes, extracción, matching de entidades y reglas de negocio, observado con LangSmith.",
    },
  },
  {
    tags: ["Llama", "RAG", "SageMaker"],
    en: {
      title: "PCI DSS Compliance ML Analyst",
      desc: "Compliance analyst built on Llama-based models and RAG on AWS SageMaker, incorporating LoRA-adapted Falcon and Llama 2 models.",
    },
    es: {
      title: "Analista de Cumplimiento PCI DSS con ML",
      desc: "Analista de cumplimiento construido sobre modelos basados en Llama y RAG en AWS SageMaker, incorporando modelos Falcon y Llama 2 adaptados con LoRA.",
    },
  },
  {
    tags: ["Embeddings", "PGVector", "OpenSearch"],
    en: {
      title: "Semantic Search Candidate Recommender",
      desc: "Recommends tailored candidates from a role description using OpenAI embeddings with PGVector and OpenSearch as vector stores, deployed via Terraform.",
    },
    es: {
      title: "Recomendador Semántico de Candidatos",
      desc: "Recomienda candidatos a medida a partir de una descripción de puesto usando embeddings de OpenAI con PGVector y OpenSearch como bases de datos vectoriales, desplegado con Terraform.",
    },
  },
  {
    tags: ["EventBridge", "Lambda", "CDK"],
    en: {
      title: "CI/CD Monitoring & Alerting Pipeline",
      desc: "Event-driven monitoring and alerting pipeline with custom CloudWatch dashboards, built with CodeCommit, EventBridge, Lambda, CDK, CodeBuild and CodePipeline.",
    },
    es: {
      title: "Pipeline de Monitoreo y Alertas CI/CD",
      desc: "Pipeline de monitoreo y alertas basado en eventos con dashboards personalizados en CloudWatch, construido con CodeCommit, EventBridge, Lambda, CDK, CodeBuild y CodePipeline.",
    },
  },
];
