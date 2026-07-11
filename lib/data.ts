export const personal = {
  name: "Adarsh Gorremuchu",
  title: "AI/ML Engineer & Data Scientist",
  location: "Tysons, VA",
  email: "gorremuchuadarsh@gmail.com",
  linkedin: "https://linkedin.com/in/adarsh-gorremuchu",
  github: "https://github.com/AdarshGorremuchu",
  tagline:
    "Building production AI and responsible ML: autonomous agents, RAG pipelines, and fair, governed models that ship.",
  summary:
    "I'm an AI/ML Engineer and Data Scientist who ships production-grade AI while keeping it fair, governed, and observable. I architect autonomous agent workflows and RAG systems with vector databases, and I bring a data-scientist's rigor (statistical modeling, hypothesis testing, disparate-impact analysis, and responsible-AI governance) to every model I put into production. My work spans the full stack, from PySpark pipelines on Azure Databricks and feature engineering to translating results into clear Power BI narratives for technical and non-technical stakeholders alike.",
};

export const stats = [
  { value: "4+", label: "Years across ML, analytics & data engineering" },
  { value: "70-85%", label: "Manual effort cut via AI agents" },
  { value: "40%", label: "RAG retrieval relevance gain" },
  { value: "35%", label: "Faster analysis via ML pipelines" },
];

export const experiences = [
  {
    role: "AI/ML Engineer & Data Scientist",
    company: "Ampcus Inc",
    location: "Chantilly, VA",
    period: "Jun 2025 - Present",
    description:
      "Building autonomous agent workflows and production RAG systems, with responsible-AI governance and statistical rigor across the model lifecycle.",
    achievements: [
      "Architected autonomous agent workflows using LLMs, tool-use, and decision logic, cutting manual effort by 70-85% across internal operations.",
      "Engineered production RAG systems with embeddings and vector databases (OpenSearch, Pinecone), boosting retrieval relevance by 40%.",
      "Applied disparate-impact analysis and statistical bias assessment to review model outputs for fairness risk; partnered with compliance and legal on risk-mitigation decisions.",
      "Designed and validated predictive ML models end-to-end: feature engineering, hypothesis testing, and lifecycle documentation aligned with responsible-AI governance.",
      "Ran descriptive, predictive, and prescriptive analyses on large datasets with Python and PySpark on Azure Databricks; built Power BI dashboards to communicate results to technical and non-technical leadership.",
      "Deployed serverless components on AWS Lambda, SQS, and Step Functions; packaged with Docker; provisioned via Terraform.",
    ],
    stack: [
      "LLMs",
      "RAG",
      "PySpark",
      "Azure Databricks",
      "Responsible AI",
      "Power BI",
      "AWS Lambda",
      "Terraform",
    ],
  },
  {
    role: "Cloud Data Engineer & ML Developer",
    company: "Community Informatics Lab (GMU)",
    location: "Fairfax, VA",
    period: "May 2024 - Nov 2024",
    description:
      "Built LLM-assisted analytics and multi-cloud data architecture supporting 20+ research projects.",
    achievements: [
      "Developed LLM-assisted analytics for summarization, classification, and context extraction using RAG and prompt strategies, shortening analysis turnaround by 35%.",
      "Designed multi-cloud architecture with Snowflake, BigQuery, and NoSQL supporting 20+ projects with standardized schemas.",
      "Trained and evaluated ML pipelines with TensorFlow, PyTorch, clustering, and statistical methods, elevating forecasting quality by 35%.",
      "Streamlined orchestration using Airflow, Spark, and Databricks, accelerating pipeline runtimes by 55% while sustaining 99.9% reliability.",
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
    period: "Dec 2020 - Dec 2022",
    description:
      "Designed ETL pipelines, predictive models, and executive BI dashboards for enterprise reporting.",
    achievements: [
      "Designed ETL pipelines and analytics data models using Databricks, Spark, and warehouses (Redshift, Snowflake, BigQuery), decreasing reporting latency by 55%.",
      "Applied predictive modeling and KPI forecasting using Python and TensorFlow, increasing planning accuracy by 20%.",
      "Produced executive dashboards in Power BI and standardized KPI definitions, increasing stakeholder adoption by 30%.",
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
    title: "Bias & Fairness Assessment: AI Model Governance",
    blurb:
      "Responsible-AI review pipeline evaluating model outputs for fairness risk under governance frameworks.",
    description:
      "Built a fairness-review pipeline that evaluates AI/ML model inputs, assumptions, and outcomes for potential disparate impact. Applied statistical bias-assessment techniques on Azure Databricks with PySpark, documented findings in technical reports, and collaborated with compliance stakeholders to support risk-mitigation and corrective-action planning.",
    stack: [
      "Python",
      "PySpark",
      "Azure Databricks",
      "Disparate Impact Analysis",
      "Responsible AI",
    ],
    highlights: [
      "Statistical bias assessment against responsible-AI governance frameworks",
      "Disparate-impact analysis on model outputs and business policies",
      "Documented reviews supporting compliance risk-mitigation decisions",
    ],
    accent: "gold",
  },
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
    accent: "blue",
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
    accent: "gold",
  },
  {
    title: "EPCIS Supply Chain Inbound Tracking",
    blurb:
      "EPCIS-compliant tracking module standardizing supplier transactions with real-time visibility.",
    description:
      "Built an EPCIS-compliant inbound tracking module enabling organization admins to manage supplier transactions. Implemented 'Add Order' capabilities, real-time shipment visibility, and standardized supplier inbound events to comply with global traceability standards, reducing manual tracking errors by 40%.",
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
    accent: "blue",
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
      "PyTorch",
      "TensorFlow",
      "NLP",
      "Prompt Engineering",
      "Multi-Agent Systems",
    ],
  },
  {
    category: "Data Science & Statistics",
    items: [
      "Predictive Modeling",
      "Regression",
      "Clustering",
      "Classification",
      "Hypothesis Testing",
      "EDA",
      "Feature Engineering",
      "Model Lifecycle",
    ],
  },
  {
    category: "Responsible AI & Compliance",
    items: [
      "Disparate Impact Analysis",
      "Bias Assessment",
      "Responsible AI",
      "Model Governance",
      "Fair Lending Frameworks",
    ],
  },
  {
    category: "Data Engineering & Cloud",
    items: [
      "Azure Databricks",
      "PySpark",
      "SparkSQL",
      "Airflow",
      "Snowflake",
      "BigQuery",
      "Redshift",
      "AWS Lambda",
      "Docker",
      "Terraform",
    ],
  },
  {
    category: "Languages",
    items: ["Python", "SQL", "PySpark", "R", "SAS/Stat", "Bash"],
  },
  {
    category: "Visualization & BI",
    items: ["Power BI", "Tableau", "Data Storytelling", "DAX", "Dashboards"],
  },
];

export const education = [
  {
    school: "George Mason University",
    degree: "M.S. Data Analytics Engineering",
    period: "Jan 2023 - Dec 2024",
    location: "Fairfax, VA",
    focus: "Machine Learning, Data Engineering, Cloud Computing, Statistics",
  },
];
