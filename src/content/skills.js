import python from "../assets/tech/python.png";
import pandas from "../assets/tech/pandas.png";
import tensorflow from "../assets/tech/tensorflow.png";
import spark from "../assets/tech/spark.png";
import aws from "../assets/tech/aws.png";
import docker from "../assets/tech/docker.png";
import postgres from "../assets/tech/postgres.png";
import git from "../assets/tech/git.png";

// Group labels are bilingual; item names are tool/tech names, which stay the
// same in any language.
export const skillGroups = [
  {
    en: { label: "Machine Learning & AI" },
    es: { label: "Machine Learning e IA" },
    items: [
      { name: "Python", icon: python },
      { name: "TensorFlow", icon: tensorflow },
      { name: "Pandas", icon: pandas },
      { name: "PyTorch" },
      { name: "XGBoost" },
      { name: "MLflow" },
    ],
  },
  {
    en: { label: "GenAI & LLM Systems" },
    es: { label: "Sistemas GenAI y LLM" },
    items: [
      { name: "RAG / LangChain" },
      { name: "LangGraph" },
      { name: "Embeddings & Vector DBs" },
      { name: "Agents (MCP, A2A)" },
    ],
  },
  {
    en: { label: "Data Engineering" },
    es: { label: "Ingeniería de Datos" },
    items: [
      { name: "PySpark", icon: spark },
      { name: "Databricks" },
      { name: "Airflow" },
      { name: "PostgreSQL", icon: postgres },
    ],
  },
  {
    en: { label: "Cloud & Infrastructure" },
    es: { label: "Nube e Infraestructura" },
    items: [
      { name: "AWS", icon: aws },
      { name: "Docker", icon: docker },
      { name: "Git", icon: git },
    ],
  },
];
