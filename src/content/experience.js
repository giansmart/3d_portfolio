// Company names and dates stay fixed (proper nouns / universal date
// notation); the role title and bullet points are bilingual.
export const experience = [
  {
    company: "DolphData — Argentina (Remote)",
    date: "Sep 2025 – Present",
    en: {
      title: "Senior Data Engineer",
      points: [
        "Designed and trained a calibrated XGBoost fake-name classifier with MLflow; removed a nearest-neighbor feature responsible for ~99% of lookup latency for a 150M-record daily workload.",
        "Built a multilingual job-title clustering pipeline using embeddings for semantic grouping and taxonomy generation.",
        "Led the migration of data and ML workloads to Databricks (Delta Lake + Spark), improving orchestration, performance and cost.",
      ],
    },
    es: {
      title: "Ingeniero de Datos Senior",
      points: [
        "Diseñé y entrené un clasificador de nombres falsos con XGBoost calibrado usando MLflow; eliminé una feature de vecino más cercano responsable de ~99% de la latencia de búsqueda en una carga diaria de 150M de registros.",
        "Construí un pipeline de clustering de títulos de trabajo multilingüe usando embeddings para agrupamiento semántico y generación de taxonomías.",
        "Lideré la migración de cargas de trabajo de datos y ML a Databricks (Delta Lake + Spark), mejorando la orquestación, el rendimiento y el costo.",
      ],
    },
  },
  {
    company: "UTEC — Peru (Part-time)",
    date: "Nov 2025 – Present",
    en: {
      title: "ML Researcher — ProCiencia Project",
      points: [
        "ML researcher on DeepIsolation, a state-funded ProCiencia project automating damage classification of seismic isolators from ambient vibration signals.",
        "Designed experimental pipelines combining spectral representations (FFT, CWT, Wavelet Scattering), feature extraction (PCA, 1D convolutional autoencoders) and classifiers (SVM, Random Forest, CNN, Vision Transformer), with a focus on interpretability.",
      ],
    },
    es: {
      title: "Investigador de ML — Proyecto ProCiencia",
      points: [
        "Investigador de ML en DeepIsolation, un proyecto ProCiencia financiado por el Estado que automatiza la clasificación de daños en aisladores sísmicos a partir de señales de vibración ambiental.",
        "Diseñé pipelines experimentales combinando representaciones espectrales (FFT, CWT, Wavelet Scattering), extracción de features (PCA, autoencoders convolucionales 1D) y clasificadores (SVM, Random Forest, CNN, Vision Transformer), con foco en interpretabilidad.",
      ],
    },
  },
  {
    company: "HatchWorks — USA (Remote)",
    date: "Nov 2021 – Jul 2025",
    en: {
      title: "Senior Data Engineer / ML Engineer",
      points: [
        "Built LLM and semantic-search solutions using RAG, embeddings, vector databases and agent architectures; evaluated retrieval quality via precision, recall and human-in-the-loop review.",
        "Developed an AI Analyst for PCI DSS compliance using Llama-based models and RAG on AWS SageMaker, incorporating LoRA-adapted Falcon and Llama 2 models.",
        "Designed end-to-end lakehouses and warehouses using Amazon EMR/EMR Serverless, Glue, Lambda, Bedrock, AppFlow, Athena and S3.",
      ],
    },
    es: {
      title: "Ingeniero de Datos Senior / Ingeniero de ML",
      points: [
        "Construí soluciones de LLM y búsqueda semántica usando RAG, embeddings, bases de datos vectoriales y arquitecturas de agentes; evalué la calidad de recuperación mediante precisión, recall y revisión humana.",
        "Desarrollé un Analista de IA para cumplimiento PCI DSS usando modelos basados en Llama y RAG en AWS SageMaker, incorporando modelos Falcon y Llama 2 adaptados con LoRA.",
        "Diseñé lakehouses y data warehouses de extremo a extremo usando Amazon EMR/EMR Serverless, Glue, Lambda, Bedrock, AppFlow, Athena y S3.",
      ],
    },
  },
  {
    company: "Zenta Group — Chile (Remote)",
    date: "Aug 2021 – Jan 2022",
    en: {
      title: "Data Engineer",
      points: [
        "Built data pipelines with Apache Airflow (Python) to make data available to business areas.",
        "Developed ETL pipelines and parsers for JSON and PDF files, delivering on-demand reports in Metabase on Redshift.",
      ],
    },
    es: {
      title: "Ingeniero de Datos",
      points: [
        "Construí pipelines de datos con Apache Airflow (Python) para poner datos a disposición de las áreas de negocio.",
        "Desarrollé pipelines ETL y parsers para archivos JSON y PDF, entregando reportes bajo demanda en Metabase sobre Redshift.",
      ],
    },
  },
  {
    company: "TaxTech — Peru",
    date: "Feb 2020 – Jul 2021",
    en: {
      title: "Cloud Developer & Data Engineer",
      points: [
        "Automated accounting electronic-book processes for SUNAT using microservices and serverless architecture on AWS (Cognito, ECS, Fargate).",
        "Orchestrated resources with Step Functions and built ETL/Big Data workflows with Glue, Lake Formation, Athena and PySpark.",
        "Ingested and transformed hundreds of millions of records with AWK/Linux tools and optimized complex Oracle SQL queries.",
      ],
    },
    es: {
      title: "Desarrollador Cloud e Ingeniero de Datos",
      points: [
        "Automaticé procesos de libros electrónicos contables para SUNAT usando microservicios y arquitectura serverless en AWS (Cognito, ECS, Fargate).",
        "Orquesté recursos con Step Functions y construí flujos ETL/Big Data con Glue, Lake Formation, Athena y PySpark.",
        "Ingesté y transformé cientos de millones de registros con herramientas AWK/Linux y optimicé consultas SQL complejas de Oracle.",
      ],
    },
  },
];
