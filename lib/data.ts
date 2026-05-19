export const personal = {
  name: "Adarsh Gorremuchu",
  title: "AI/ML Engineer",
  location: "Tysons, VA",
  email: "adarshg15102000@gmail.com",
  phone: "(703) 627-0235",
  linkedin: "https://linkedin.com/in/adarsh-gorremuchu",
  github: "https://github.com/AdarshGorremuchu", // ← update with your GitHub handle
  tagline:
    "Building production AI systems — autonomous agents, RAG pipelines, and ML infrastructure that ships.",
  summary:
    "I'm an AI/ML Engineer focused on shipping production-grade LLM systems. I architect autonomous agent workflows, build RAG pipelines with vector databases, and deploy scalable ML infrastructure on AWS and Azure. My work spans the full stack — from designing data pipelines and feature engineering to embedding agents into enterprise workflows. I care about systems that are reliable, observable, and actually used.",
};

export const stats = [
  { value: "70-85%", label: "Manual effort reduced via AI agents" },
  { value: "40%", label: "RAG retrieval relevance gain" },
  { value: "45%", label: "Throughput acceleration" },
  { value: "20+", label: "Multi-cloud projects delivered" },
];

export const experiences = [
  {
    role: "AI/ML Engineer",
    company: "Ampcus Inc",
    location: "Chantilly, VA",
    period: "Jun 2025 — Present",
    description:
      "Building autonomous agent workflows and production RAG systems for enterprise Microsoft ecosystems.",
    achievements: [
      "Architected autonomous agent workflows using LLMs, tool-use, and decision logic — cutting manual effort by 70-85% across internal operations.",
      "Engineered production RAG systems with embeddings and vector databases (OpenSearch, Pinecone), boosting retrieval relevance by 40%.",
      "Embedded agents into Microsoft ecosystems via Copilot Studio, Semantic Kernel, Azure AI, and Azure OpenAI.",
      "Devised multi-agent orchestration for classification, planning, retrieval, and structured outputs — accelerated throughput by 45%.",
      "Strengthened reliability with evaluation checks, access controls, and trace logging — lowered rework by 30% in compliance flows.",
      "Deployed serverless components on AWS Lambda, SQS, and Step Functions; packaged with Docker; provisioned via Terraform.",
    ],
    stack: [
      "LLMs",
      "RAG",
      "LangChain",
      "Semantic Kernel",
      "Azure OpenAI",
      "AWS Lambda",
      "Docker",
      "Terraform",
    ],
  },
  {
    role: "Cloud Data Engineer & ML Developer",
    company: "Community Informatics Lab (GMU)",
    location: "Fairfax, VA",
    period: "May 2024 — Nov 2024",
    description:
      "Built LLM-assisted analytics and multi-cloud data architecture supporting 20+ research projects.",
    achievements: [
      "Developed LLM-assisted analytics for summarization, classification, and context extraction using RAG and prompt strategies — shortened analysis turnaround by 35%.",
      "Designed multi-cloud architecture with Snowflake, BigQuery, and NoSQL supporting 20+ projects with standardized schemas.",
      "Trained and evaluated ML pipelines with TensorFlow, PyTorch, clustering, and statistical methods — elevated forecasting quality by 35%.",
      "Streamlined orchestration using Airflow, Spark, and Databricks — accelerated pipeline runtimes by 55% while sustaining 99.9% reliability.",
    ],
    stack: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "Snowflake",
      "BigQuery",
      "Airflow",
      "Spark",
      "Databricks",
    ],
  },
  {
    role: "Data Engineer & BI Developer",
    company: "TriSX Global India Pvt Ltd",
    location: "Hyderabad, India",
    period: "Dec 2020 — Dec 2022",
    description:
      "Designed ETL pipelines, predictive models, and executive BI dashboards for enterprise reporting.",
    achievements: [
      "Designed ETL pipelines and analytics data models using Databricks, Spark, and warehouses (Redshift, Snowflake, BigQuery) — decreased reporting latency by 55%.",
      "Applied predictive modeling and KPI forecasting using Python and TensorFlow — increased planning accuracy by 20%.",
      "Produced executive dashboards in Power BI and standardized KPI definitions — increased stakeholder adoption by 30%.",
    ],
    stack: [
      "Databricks",
      "Spark",
      "Redshift",
      "Snowflake",
      "Power BI",
      "Python",
      "TensorFlow",
    ],
  },
];

export const projects = [
  {
    title: "Serverless RAG Architecture & Vector Search",
    blurb:
      "Scalable retrieval system indexing enterprise knowledge with sub-second semantic search.",
    description:
      "Designed a production RAG architecture using OpenSearch and Pinecone to index enterprise knowledge. Containerized services with Docker for consistent deployment, provisioned infrastructure via Terraform, and optimized vector queries to hit sub-second latency for semantic retrieval.",
    stack: [
      "OpenSearch",
      "Pinecone",
      "Docker",
      "Terraform",
      "Azure AI",
      "Python",
    ],
    highlights: [
      "Sub-second vector search latency in production",
      "IaC-provisioned via Terraform across environments",
      "Containerized with Docker for portable deployment",
    ],
    accent: "indigo",
  },
  {
    title: "Campaign Outcome Prediction & Ranking Model",
    blurb:
      "Predictive ML model for campaign performance feeding interactive Power BI dashboards.",
    description:
      "Engineered a predictive ranking model analyzing campaign and unit data from PMX and DOA systems. Optimized feature selection to forecast performance outcomes and deployed on AWS infrastructure with results piped into Power BI dashboards for 10+ stakeholders.",
    stack: ["Python", "AWS", "Power BI", "PMX", "DOA", "Machine Learning"],
    highlights: [
      "Deployed on AWS with end-to-end pipeline integration",
      "Powered decision-making for cross-functional team of 10+",
      "Feature engineering optimized for forecast accuracy",
    ],
    accent: "cyan",
  },
  {
    title: "EPCIS Supply Chain Inbound Tracking",
    blurb:
      "EPCIS-compliant tracking module standardizing supplier transactions with real-time visibility.",
    description:
      "Built an EPCIS-compliant inbound tracking module enabling organization admins to manage supplier transactions. Implemented 'Add Order' capabilities, real-time shipment visibility, and standardized supplier inbound events to comply with global traceability standards — reducing manual tracking errors by 40%.",
    stack: [
      "EPCIS",
      "Cloud Architecture",
      "REST APIs",
      "Backend Development",
    ],
    highlights: [
      "40% reduction in manual tracking errors",
      "Compliant with global EPCIS traceability standards",
      "Real-time shipment visibility for admins",
    ],
    accent: "purple",
  },
];

export const skills = [
  {
    category: "AI / ML",
    items: [
      "LLMs",
      "RAG",
      "LangChain",
      "Semantic Kernel",
      "Hugging Face",
      "PyTorch",
      "TensorFlow",
      "NLP",
      "Prompt Engineering",
      "Multi-Agent Systems",
    ],
  },
  {
    category: "Microsoft",
    items: [
      "Microsoft Copilot Studio",
      "Azure AI Services",
      "Azure OpenAI",
      "Azure Functions",
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      "AWS Lambda",
      "SQS",
      "Step Functions",
      "S3",
      "Docker",
      "Terraform",
      "CloudWatch",
    ],
  },
  {
    category: "Data",
    items: [
      "Databricks",
      "Spark",
      "Airflow",
      "Snowflake",
      "Redshift",
      "BigQuery",
      "OpenSearch",
      "Pinecone",
    ],
  },
  {
    category: "Languages",
    items: ["Python", "SQL", "JavaScript", "Bash"],
  },
  {
    category: "BI / Analytics",
    items: ["Power BI", "DAX", "Excel"],
  },
];

export const education = [
  {
    school: "George Mason University",
    degree: "M.S. Data Analytics Engineering",
    period: "Jan 2023 — Dec 2024",
    location: "Fairfax, VA",
    focus: "Machine Learning, Data Engineering, Cloud Computing, Statistics",
  },
  {
    school: "CVR College of Engineering",
    degree: "B.Tech, Electronics & Communications Engineering",
    period: "Aug 2018 — Jun 2022",
    location: "Hyderabad, India",
    focus: "Software Systems, Data Structures, Probability & Statistics",
  },
];
