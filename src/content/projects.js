export const projects = [
  {
    title: "Cross-Network Profile Matching",
    tags: ["AWS", "PySpark", "Airflow"],
    desc: "Orchestrated PySpark jobs (EMR/Glue) with Airflow to normalize identities, score similarity, run QA and publish deduplicated audiences into Redshift for targeted marketing campaigns.",
  },
  {
    title: "Multi-Agent Medical Prescription System",
    tags: ["LangGraph", "MCP", "A2A"],
    desc: "LLM-powered multi-agent system that reads handwritten prescriptions and determines insurance-tier coverage — agents for image preprocessing, extraction, entity matching and business rules, observed with LangSmith.",
  },
  {
    title: "PCI DSS Compliance ML Analyst",
    tags: ["Llama", "RAG", "SageMaker"],
    desc: "Compliance analyst built on Llama-based models and RAG on AWS SageMaker, incorporating LoRA-adapted Falcon and Llama 2 models.",
  },
  {
    title: "Semantic Search Candidate Recommender",
    tags: ["Embeddings", "PGVector", "OpenSearch"],
    desc: "Recommends tailored candidates from a role description using OpenAI embeddings with PGVector and OpenSearch as vector stores, deployed via Terraform.",
  },
  {
    title: "CI/CD Monitoring & Alerting Pipeline",
    tags: ["EventBridge", "Lambda", "CDK"],
    desc: "Event-driven monitoring and alerting pipeline with custom CloudWatch dashboards, built with CodeCommit, EventBridge, Lambda, CDK, CodeBuild and CodePipeline.",
  },
];
