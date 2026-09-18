import python from "../assets/tech/python.png";
import pandas from "../assets/tech/pandas.png";
import tensorflow from "../assets/tech/tensorflow.png";
import spark from "../assets/tech/spark.png";
import aws from "../assets/tech/aws.png";
import docker from "../assets/tech/docker.png";
import postgres from "../assets/tech/postgres.png";
import git from "../assets/tech/git.png";

export const skillGroups = [
  {
    label: "Machine Learning & AI",
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
    label: "GenAI & LLM Systems",
    items: [
      { name: "RAG / LangChain" },
      { name: "LangGraph" },
      { name: "Embeddings & Vector DBs" },
      { name: "Agents (MCP, A2A)" },
    ],
  },
  {
    label: "Data Engineering",
    items: [
      { name: "PySpark", icon: spark },
      { name: "Databricks" },
      { name: "Airflow" },
      { name: "PostgreSQL", icon: postgres },
    ],
  },
  {
    label: "Cloud & Infrastructure",
    items: [
      { name: "AWS", icon: aws },
      { name: "Docker", icon: docker },
      { name: "Git", icon: git },
    ],
  },
];
