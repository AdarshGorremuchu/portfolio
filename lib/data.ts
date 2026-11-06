/**
 * Every string in this file is page copy, so it follows B1: no hyphens inside
 * sentences, headings, or labels, and no banned filler words. Ranges read as
 * "70 to 85%" rather than "70-85%".
 *
 * B8: nothing here is invented. Every number, employer, and date comes from
 * Adarsh's resumes (public/resume.pdf, plus the Manager Data Science version
 * from Nov 2025). The page carries the AI/ML engineering and the data science
 * sides in equal measure.
 */

export const personal = {
  name: "Adarsh Gorremuchu",
  title: "AI/ML Engineer & Data Scientist",
  location: "Tysons, VA",
  email: "gorremuchuadarsh@gmail.com",
  linkedin: "https://linkedin.com/in/adarsh-gorremuchu",
  github: "https://github.com/AdarshGorremuchu",

  /** Hero subheadline. Capped at 680px on the page (B5). */
  subheadline:
    "I am an AI/ML engineer and data scientist in Tysons, Virginia. I build agent workflows and retrieval systems that reach production, and I bring the statistics, fairness testing, and governance that keep the models behind them defensible.",

  /** The one proof signal above the fold (A2). */
  proofLine:
    "Production AI at Ampcus Inc. Retrieval relevance up 40%, model rework down 30%, analysis turnaround down 35%.",

  summary:
    "I work at the seam between shipping AI and proving it holds up. On the engineering side I architect autonomous agent workflows, retrieval systems over vector databases, and the pipelines that feed them. On the science side I do the feature engineering, hypothesis testing, model validation, and disparate impact analysis that decide whether a model should go out at all. Both halves end in the same place: a result a stakeholder can act on, whether that arrives as a deployed service or a Power BI narrative a nontechnical executive can read.",

  /** B11 tagline reveal. Two lines, benefit led. */
  tagline:
    "Most AI pilots stall before anyone depends on them. I build the models, the retrieval, and the evidence that they are fair, so the work reaches production and stays there.",

  /** A4 risk reversal, stated next to the final CTA. */
  riskReversal:
    "No recruiter in the middle. Your message lands in my inbox, and if the role is not a fit I will say so plainly.",
};

/** Real employers, used as the proof strip. No invented logos (B8). */
export const proofOrgs = [
  { name: "Ampcus Inc", detail: "Chantilly, Virginia" },
  { name: "George Mason University", detail: "Community Informatics Lab" },
  { name: "TriSX Global", detail: "Hyderabad, India" },
];

export const stats = [
  { value: "4+", label: "Years across ML, analytics, and data engineering" },
  { value: "70 to 85%", label: "Manual triage and routing effort removed by agents" },
  { value: "35%", label: "Lift in model benchmark performance across 20+ projects" },
  { value: "30%", label: "Less rework caused by model errors once guardrails landed" },
];

/** A2 section 6. Problem on the left, what I do instead on the right. */
export const problemSolution = {
  problems: [
    "A model ships on the strength of one good run, with no hypothesis test or holdout behind the number.",
    "Retrieval returns plausible passages instead of the right ones, and the fix gets guessed at rather than measured.",
    "The model clears technical review, then stalls in compliance because fairness was never assessed.",
    "Nobody outside the team can read the result, so a sound analysis changes no decision.",
  ],
  solutions: [
    "Feature engineering, hypothesis testing, and model validation come before the lifecycle documentation, with evaluation checks and trace logging shipped alongside. Benchmark performance rose 35% and rework fell 30%.",
    "Embeddings, chunking, and vector queries get tuned against a real relevance baseline. On OpenSearch and Pinecone that moved relevance 40%.",
    "Disparate impact analysis and statistical bias assessment happen with compliance and legal in the room, not after.",
    "Findings land as Power BI dashboards and written narratives. Standardizing the KPI definitions behind them raised adoption 30%.",
  ],
};

/**
 * A2 section 7. Five benefits, split evenly between the engineering work and
 * the statistical work, each carrying its real number (A4).
 */
export const benefits = [
  {
    icon: "agents",
    title: "Agents that cut real work",
    detail:
      "Autonomous workflows built from LLMs, tool use, and decision logic. At Ampcus they removed 70 to 85% of the manual triage and routing effort.",
  },
  {
    icon: "retrieval",
    title: "Retrieval you can trust",
    detail:
      "Production RAG on OpenSearch and Pinecone, with embeddings and queries tuned against a relevance baseline until it rose 40% and retrieval returned in under a second.",
  },
  {
    icon: "validation",
    title: "Models validated before they ship",
    detail:
      "Feature engineering, hypothesis testing, cross validation, and model validation across more than twenty projects in Python, PyTorch, and TensorFlow, lifting benchmark performance 35%.",
  },
  {
    icon: "fairness",
    title: "Fairness you can defend",
    detail:
      "Disparate impact analysis, statistical bias assessment, and evaluation guardrails on high risk workflows, documented for compliance and legal. Rework from model errors fell 30%.",
  },
  {
    icon: "delivery",
    title: "Pipelines and dashboards that hold up",
    detail:
      "Airflow, Spark, and Databricks orchestration that ran 55% faster at 99.9% data reliability, feeding Power BI dashboards whose shared KPI definitions raised adoption 30%.",
  },
];

/** A2 section 8. Three steps. */
export const steps = [
  {
    title: "We talk about the problem",
    detail:
      "One call on what is actually breaking: the manual process, the model under review, or the pipeline that keeps failing. No deck required.",
  },
  {
    title: "I scope the smallest useful build",
    detail:
      "The thinnest version that proves the approach, with the evaluation checks and the success metric written before the model code.",
  },
  {
    title: "It ships and keeps running",
    detail:
      "Deployed on AWS or Azure, containerized with Docker, provisioned with Terraform, and documented so the next engineer can own it.",
  },
];

export const experiences = [
  {
    role: "AI/ML Engineer & Data Scientist",
    company: "Ampcus Inc",
    location: "Chantilly, VA",
    period: "Jun 2025 to Present",
    description:
      "Building autonomous agent workflows and production RAG systems, and validating the models behind them with statistical rigor and responsible AI governance.",
    achievements: [
      "Architected autonomous agent workflows using LLMs, tool use, and decision logic, cutting manual effort by 70 to 85% across internal operations.",
      "Engineered production RAG systems with embeddings and vector databases on OpenSearch and Pinecone, raising retrieval relevance by 40%.",
      "Designed and evaluated AI/ML systems end to end in Python: feature engineering, hypothesis testing, model validation, lifecycle documentation, and REST ready service patterns.",
      "Strengthened responsible AI controls through disparate impact analysis, statistical bias assessment, and evaluation guardrails on high risk workflows, cutting rework from model errors by 30% while improving monitoring, trace logging, and auditability.",
      "Ran descriptive, predictive, and prescriptive analysis on large datasets with Python and PySpark on Azure Databricks, including retrieval oriented data preparation that improved context quality for decision support.",
      "Built automated analytical workflows for classification, summarization, anomaly detection, and prompt driven analysis, cutting turnaround by 35% while supporting ongoing compliance review.",
      "Produced Power BI dashboards and written narratives that translated statistical findings into guidance for business partners, compliance, and legal teams.",
      "Deployed serverless components on AWS Lambda, SQS, and Step Functions, packaged with Docker and provisioned with Terraform.",
    ],
    stack: [
      "LLMs",
      "RAG",
      "Python",
      "PySpark",
      "Azure Databricks",
      "Responsible AI",
      "Power BI",
      "AWS Lambda",
      "Terraform",
    ],
  },
  {
    role: "Cloud Data Engineer and ML Developer",
    company: "Community Informatics Lab, George Mason University",
    location: "Fairfax, VA",
    period: "May 2024 to Nov 2024",
    description:
      "Trained and evaluated machine learning pipelines and built the multi cloud data architecture under more than twenty research and data science projects.",
    achievements: [
      "Engineered and evaluated machine learning pipelines with Python, PyTorch, and TensorFlow across more than twenty projects, improving benchmark performance by 35% while folding LLM tooling and prompt engineering into applied experimentation.",
      "Conducted exploratory data analysis on large, complex datasets to identify patterns, test assumptions, and structure data for retrieval augmented generation and downstream analysis.",
      "Implemented PySpark and SparkSQL pipelines on Databricks for large scale ingestion and transformation, accelerating runtimes by 55% while holding 99.9% data reliability.",
      "Architected a multi cloud data foundation on Snowflake, BigQuery, and NoSQL with governed schemas and standardized access paths.",
      "Delivered Power BI reports and visualizations that carried technical findings to varied stakeholders, speeding up decisions across more than twenty analytical projects.",
    ],
    stack: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "Snowflake",
      "BigQuery",
      "Airflow",
      "Spark",
      "Databricks",
    ],
  },
  {
    role: "Data Engineer and BI Developer",
    company: "TriSX Global India Pvt Ltd",
    location: "Hyderabad, India",
    period: "Dec 2020 to Dec 2022",
    description:
      "Built the ETL pipelines, predictive models, and executive dashboards behind enterprise reporting.",
    achievements: [
      "Applied predictive modeling and statistical analysis with Python and TensorFlow, improving KPI forecasting accuracy by 20% through feature engineering, cross validation, and trend analysis.",
      "Built automated analytical processes and ETL pipelines on Databricks, Spark, Redshift, Snowflake, and BigQuery, cutting reporting latency by 55% and improving data reliability by 30%.",
      "Created executive Power BI dashboards with standardized KPI definitions, raising stakeholder adoption and reporting consistency by 30% through clearer data storytelling.",
      "Resolved complex data quality issues with profiling, cleansing, and monitoring across warehouse ingestion and reporting workflows.",
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
    title: "Bias and fairness assessment for AI model governance",
    description:
      "Built a fairness review pipeline that evaluates model inputs, assumptions, and outcomes for potential disparate impact. Applied disparate impact analysis and statistical testing on Azure Databricks with PySpark, documented findings in technical reports, and worked with stakeholders on risk mitigation and corrective action planning.",
    stack: [
      "Python",
      "PySpark",
      "Azure Databricks",
      "Disparate Impact Analysis",
      "Statistical Testing",
    ],
    highlights: [
      "Model outputs evaluated against compliance and responsible AI governance frameworks",
      "Documented reviews that fed risk mitigation and corrective action planning",
      "30% reduction in rework caused by model errors through monitoring and guardrails",
    ],
  },
  {
    title: "Predictive ranking and campaign outcome model",
    description:
      "Architected and deployed a predictive ML model with optimized feature selection to forecast campaign outcomes. Integrated results into Power BI dashboards for more than ten stakeholders, exposed outputs through REST style interfaces, and extended the solution with prompt engineering experiments and lightweight agent frameworks on AWS.",
    stack: ["Python", "Machine Learning", "AWS", "Power BI", "SQL", "REST APIs"],
    highlights: [
      "Decision support for more than ten stakeholders through Power BI",
      "Outputs exposed over REST style interfaces for downstream consumption",
      "Extended with an early LLM powered workflow for business users",
    ],
  },
  {
    title: "Serverless semantic search and analytics pipeline",
    description:
      "Engineered scalable analytical pipelines for classification, summarization, and context extraction, reaching retrieval latency under a second with a 40% improvement in relevance through query optimization and structured dataset design on Azure Databricks. Implemented a RAG style architecture with OpenSearch backed retrieval and schema validation.",
    stack: [
      "OpenSearch",
      "PySpark",
      "Azure Databricks",
      "Docker",
      "Terraform",
      "Kubernetes",
    ],
    highlights: [
      "Retrieval under a second with relevance up 40%",
      "RAG style architecture with schema validation and orchestration ready components",
      "Containerized with Docker and Terraform for Kubernetes based environments",
    ],
  },
  {
    title: "EPCIS supply chain inbound tracking",
    description:
      "Built an EPCIS compliant inbound tracking module that lets organization admins manage supplier transactions. Added order creation, live shipment visibility, and standardized supplier inbound events against global traceability standards, which cut manual tracking errors by 40%.",
    stack: ["EPCIS", "Cloud Architecture", "REST APIs", "Backend Development"],
    highlights: [
      "40% fewer manual tracking errors",
      "Compliant with global EPCIS traceability standards",
      "Live shipment visibility for organization admins",
    ],
  },
];

export const skills = [
  {
    category: "AI and ML",
    items: [
      "LLMs",
      "GenAI",
      "RAG",
      "LangChain",
      "LangGraph",
      "Semantic Kernel",
      "Agent Frameworks",
      "PyTorch",
      "TensorFlow",
      "NLP",
      "Prompt Engineering",
      "Model Lifecycle",
    ],
  },
  {
    category: "Statistics and modeling",
    items: [
      "Predictive Modeling",
      "Regression",
      "Classification",
      "Clustering",
      "Hypothesis Testing",
      "Cross Validation",
      "Correlation and Variance",
      "Trend Analysis",
      "Anomaly Detection",
      "Exploratory Analysis",
      "Feature Engineering",
      "SAS/Stat",
    ],
  },
  {
    category: "Responsible AI and compliance",
    items: [
      "Disparate Impact Analysis",
      "Bias Assessment",
      "Responsible AI",
      "Ethical AI",
      "Model Governance",
      "Fair Lending Frameworks",
      "Evaluation Guardrails",
    ],
  },
  {
    category: "Data engineering and cloud",
    items: [
      "Azure Databricks",
      "PySpark",
      "SparkSQL",
      "Airflow",
      "Snowflake",
      "BigQuery",
      "Redshift",
      "Azure Data Factory",
      "Azure Data Lake",
      "AWS Lambda",
      "Step Functions",
      "GCP",
      "Docker",
      "Kubernetes",
      "Terraform",
    ],
  },
  {
    category: "Languages",
    items: ["Python", "SQL", "PySpark", "R", "Bash"],
  },
  {
    category: "Visualization and communication",
    items: [
      "Power BI",
      "Tableau",
      "DAX",
      "Data Storytelling",
      "Technical Writing",
      "Stakeholder Presentations",
    ],
  },
];

export const education = [
  {
    school: "George Mason University",
    degree: "M.S. Data Analytics Engineering",
    period: "Jan 2023 to Dec 2024",
    location: "Fairfax, VA",
    focus: "Machine learning, statistics, data engineering, cloud computing",
  },
];

/**
 * A2 section 10. Every answer is a fact Adarsh confirmed or that appears on
 * his resume. Also emitted as FAQPage JSON-LD for AEO (A7).
 */
export const faqs = [
  {
    q: "What roles are you looking for?",
    a: "AI/ML Engineer, Data Scientist, and ML platform or MLOps roles. The common thread is work that reaches production and stays accountable once it is there.",
  },
  {
    q: "Are you an engineer or a data scientist?",
    a: "Both, and the two feed each other. I build and deploy the systems, and I do the statistical work that decides whether a model belongs in one. My current title at Ampcus is AI/ML Engineer and Data Scientist.",
  },
  {
    q: "Are you open to remote work?",
    a: "Yes. Fully remote works well for me.",
  },
  {
    q: "Will you come onsite?",
    a: "Yes. I am based in Tysons, Virginia and can work onsite or hybrid anywhere across the DC, Maryland, and Virginia area.",
  },
  {
    q: "Would you relocate?",
    a: "Yes, for the right role.",
  },
  {
    q: "Are you authorized to work in the United States?",
    a: "Yes.",
  },
  {
    q: "What are you working on right now?",
    a: "I have been at Ampcus Inc in Chantilly, Virginia since June 2025, building autonomous agent workflows and production RAG systems, and running the model validation and responsible AI reviews that go with them.",
  },
  {
    q: "Which parts of the stack do you own end to end?",
    a: "Python, SQL, and R for the analysis, PySpark and SparkSQL on Azure Databricks for scale, serverless work on AWS Lambda, SQS, and Step Functions, Docker, Kubernetes, and Terraform for packaging and infrastructure, and Power BI for the last mile.",
  },
  {
    q: "How much experience do you have?",
    a: "Four years and counting across ML, analytics, and data engineering, plus an M.S. in Data Analytics Engineering from George Mason University, finished in December 2024.",
  },
  {
    q: "Do you work on fairness and model governance?",
    a: "Yes. Disparate impact analysis, statistical bias assessment, and model lifecycle documentation are part of how I ship, not a separate review afterwards.",
  },
  {
    q: "What is the fastest way to reach you?",
    a: "The form on this page, which goes straight to my inbox. Email and LinkedIn are in the footer.",
  },
];
