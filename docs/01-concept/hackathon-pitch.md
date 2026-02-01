# Project Details

## Problem Statement

**The "Ghost Project" Epidemic: A KES 304 Billion Blind Spot**

Kenya faces a catastrophic "Audit Gap" that threatens national prosperity. According to recent Auditor General reports, approximately **KES 304 Billion** of public capital is currently locked in stalled or stalled-and-delayed projects. This includes mega-projects like the Mombasa Gate Bridge, where KES 48 billion remains dormant, accruing massive "commitment fee" penalties on undrawn loans.

The Office of the Auditor General (OAG) is constitutionally mandated to verify the "lawful and effective" use of these funds. However, they face three fatal structural constraints:

1.  **The Coverage Gap:** With limited staff and a compressed 3-month statutory reporting window, auditors can physically verify less than **5%** of the thousands of devolved projects scattered across Kenya’s 47 counties.
2.  **The Data Void:** Public procurement data (PPIP) is fundamentally broken. Tender notices rarely include GPS coordinates, using vague descriptions like "Construction of Classroom at Moi Girls, Eldoret." This makes automated tracking impossible for standard GIS tools.
3.  **The Atmospheric Barrier:** In Kenya’s central highlands (Kiambu, Nyeri, Meru), persistent cloud cover (60-80% annually) renders traditional optical satellite monitoring (like Google Earth) useless for months at a time, allowing corrupt contractors to hide inactivity behind the weather.

The result is a systemic vulnerability where "**Ghost Projects**" thrive—contractors are paid for work that exists only on paper, while the physical site remains bare earth. The OAG lacks the tools to triage this massive portfolio remotely, leading to wasted taxes, crumbling public trust, and stalled national development.

## Proposed Solution

**Oneka AI: A Decision Support System for Remote Audit Triage**

Oneka AI is not just a visualization tool; it is a **Risk Triangulation Engine**. It automates the detection of "Ghost Projects" by comparing Financial Intent (Treasury Disbursement Data) against Physical Reality (Satellite Change Detection). It solves the three specific problems identified above through four core modules:

1.  **The "Smart Ingest" & Proxy Geolocation Module (Solving the Data Void):**
    Standard GIS tools fail in Kenya because tender documents lack GPS coordinates. Oneka AI uses a specialized Natural Language Processing (NLP) parser to ingest messy PDF tender awards and extract entity names (e.g., "Gituamba Dispensary"). It then cross-references these names against our curated "Proxy Database," which indexes unique government identifiers—specifically the Master Facility List (MFL) Codes for health clinics and School Registration Numbers for education. By linking a vague tender description to a fixed, government-gazetted MFL Code, we can instantly retrieve the precise GPS polygon of the project site without manual data entry.

2.  **The "Cloud-Piercer" Radar Analysis (Solving the Atmospheric Barrier):**
    To overcome the cloud cover in Central Kenya, Oneka AI does not rely solely on optical cameras. We integrate **Synthetic Aperture Radar (Sentinel-1 SAR)** data. Radar penetrates clouds, rain, and smoke day or night. We utilize a "Double Bounce" backscatter algorithm. When vertical structures (walls, concrete columns) are erected on a flat site, they create a distinct radar signal spike. Oneka AI detects this signal even during the long rains, ensuring that contractors cannot use "bad weather" as an excuse for lack of progress.

3.  **The "Truth Timeline" (Solving the Coverage Gap):**
    The system generates a Divergence Graph for every project.
    - **Green Line:** Cumulative Financial Spend (from IFMIS/Treasury reports).
    - **Blue Line:** Physical Completion % (derived from Satellite Change Detection).
    - **The Alert:** If the Green Line rises (money spent) while the Blue Line stays flat (no physical change), the system flags a "High-Risk Anomaly." This allows the Auditor General to shift from "Random Sampling" (visiting 5% of sites) to **"Precision Targeting"**—deploying field teams only to the Red Flagged sites where corruption is highly probable.

4.  **Automated Legal Admissibility (The "Kill Shot"):**
    Identifying corruption is useless if it cannot be prosecuted. Kenyan courts frequently dismiss electronic evidence under Section 106B of the Evidence Act if the "chain of custody" is not certified. Oneka AI includes a "Legal Export" feature. It automatically generates a pre-filled **Section 106B Certificate** that validates the source, integrity, and processing history of the satellite imagery. This turns intelligence into admissible evidence, empowering the EACC and DPP to prosecute "Ghost Project" cases successfully.

**Strategic Value Proposition:** Oneka AI transforms the Auditor General from a retrospective record-keeper into a proactive guardian of the public purse. By recovering just 1% of the value of currently stalled projects, Oneka AI would save the Kenyan taxpayer **KES 3 Billion annually**.

## Relevance to Theme

**Governance, Public Policy and Political Stability**

Oneka AI directly addresses the hackathon theme of "National Prosperity" by tackling the single biggest inhibitor to Kenya’s economic growth: **Infrastructure Corruption**.

1.  **Strengthening Governance via Transparency:** Currently, the governance of public projects is opaque. Contractors exploit the "information asymmetry" between the Treasury (who releases funds) and the Remote Site (where work happens). Oneka AI destroys this asymmetry. It creates a "God Mode" view for the Auditor General, ensuring that decision-making regarding payments is based on evidence, not influence. This enforces the Constitutional mandate of Article 229 (prudent use of public resources).
2.  **Combating Corruption with Precision:** Corruption thrives in the shadows of "sampling." When auditors only visit 5% of projects, corrupt actors gamble that they won't be checked. Oneka AI creates a Panopticon Effect—the capability to audit 100% of projects remotely. Even if we don't visit every site, the certainty that we can see every site acts as a massive deterrent to fraud.
3.  **Enhancing Public Service Delivery:** Stalled projects are not just financial losses; they are denied services. A stalled hospital in Wajir means mothers dying in childbirth. A "ghost classroom" in Turkana means a generation denied education. By identifying and unlocking these stalled projects, Oneka AI directly accelerates the delivery of the Bottom-Up Economic Transformation Agenda (BETA), ensuring that the roads, hospitals, and schools promised to the Wananchi are actually built.
4.  **Securing the Future:** By automating the Section 106B Legal Certification, we bridge the gap between "Tech" and "Law." We ensure that our solution doesn't just look good on a dashboard but actually stands up in a courtroom, strengthening the rule of law and political stability.

## Thematic Area

Governance, Public Policy and Political Stability

## Technology & Methodology

**Tech Stack:**

- **Satellite Data:** European Space Agency Sentinel-1 (SAR) for all-weather monitoring; Sentinel-2 (Optical) for visual verification; Google Photorealistic 3D Tiles for urban context visualization in Nairobi/Mombasa.
- **Backend:** FastAPI (Python) for high-performance geospatial processing.
- **Frontend:** Next.js 16 + Tailwind CSS v4 for a responsive, modern Audit Workbench.
- **Database:** PostgreSQL with PostGIS extension for handling complex geospatial queries and the "Proxy Database."
- **Infrastructure:** AWS Event-Driven Architecture. We use S3 for document ingestion, triggering Lambda functions for OCR parsing, and AWS Fargate for heavy satellite image processing tasks.

**Methodology:**

1.  **Ingest:** User uploads Tender Awards (PDF) or Disbursement Sheets (Excel).
2.  **Parse & Locate:** System extracts project metadata and resolves location using Fuzzy Matching against MFL/School Code databases.
3.  **Task:** System queries the Sentinel API for the specific AOI (Area of Interest) over the project duration.
4.  **Analyze:** Algorithms calculate the "Built-Up Area Index" (BUAI) and Radar Backscatter Coefficient.
5.  **Report:** System outputs a risk score and a downloadable PDF audit brief.
