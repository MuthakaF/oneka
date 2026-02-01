# **Oneka AI: Technical Feasibility Study & Architectural Specification for Public Infrastructure Auditing**

## **1\. Executive Summary**

The "Black Box" problem in Kenyan public infrastructure—characterized by the opacity between allocated funds and physical deliverables—presents a distinct challenge for governance technologists. The disparity between the financial data housed in the National Treasury’s Integrated Financial Management Information System (IFMIS) and the physical reality on the ground creates a permissive environment for "ghost projects" and stalled infrastructure. This Technical Feasibility Study, prepared for the NIRU AI Hackathon 2025, outlines the architectural blueprint for **Oneka AI**, a system designed to automate the audit loop by triangulating financial disbursements against verifiable satellite intelligence.

The proposed solution operates on a modular architecture designed to ingest, resolve, and verify disparate data streams. **Module 1 (The Data Void)** addresses the extraction of unstructured tender data from the Public Procurement Information Portal (PPIP), utilizing advanced Optical Character Recognition (OCR) and Natural Language Processing (NLP) to parse image-based PDFs into structured financial commitments. **Module 2 (The Proxy Geolocation Engine)** solves the critical "missing link" of geospatial data by fuzzy-matching vague tender descriptions against the Kenya Master Facility List (MFL) and Ministry of Education registries to derive precise geodetic polygons. **Module 3 (The Paper Trail)** correlates these commitments with actual disbursements reported by the Controller of Budget (COB), flagging projects where absorption rates exceed physical progress markers. Finally, **Module 4 (The Cloud Piercer)** leverages Synthetic Aperture Radar (SAR) via the Sentinel-1 constellation to perform all-weather audits, utilizing backscatter coefficient analysis to detect construction signatures in cloud-obscured regions like Central Kenya.

This document serves as a comprehensive technical guide, detailing the specific libraries, API endpoints, algorithmic logic, and architectural patterns required to build a Minimum Viable Product (MVP) within the constraints of a 48-hour hackathon, while simultaneously mapping the rigorous "Production Realities" necessary for scalable deployment within the Kenyan government ecosystem.

## ---

## 

## **2\. Contextual Analysis: The Governance Gap in Kenyan Infrastructure**

The governance of public infrastructure in Kenya operates within a fragmented data ecosystem. While the legal framework—anchored by the Public Finance Management (PFM) Act of 2012 and the Public Procurement and Asset Disposal Act of 2015—mandates transparency, the technical implementation of these laws has resulted in data silos that are technically accessible but practically unusable for automated auditing.

### **2.1 The Data Silo Problem**

The primary challenge is the lack of a Unified Project Identifier (UPI). A road project awarded by the Kenya National Highways Authority (KeNHA) 1 appears in the PPIP tender portal under a specific tender number (e.g., "KeNHA/R5/224/2024"). However, when funds are disbursed for this project, they are often aggregated under a broad "Development Expenditure" vote head in the Controller of Budget’s quarterly reports 2, stripping away the project-level granularity required for an audit. Furthermore, the physical facility—once built—enters the Ministry of Health’s Master Facility List (MFL) 3 or the Ministry of Education’s registry with a facility code that bears no relation to the original tender number.

Oneka AI functions as the "interoperability layer" that forces these silos to speak. By using the *Project Name* and *Location* as the common keys, and employing fuzzy logic to bridge naming conventions, the system reconstructs the lifecycle of a project from procurement to disbursement to physical existence.

### **2.2 The "Ghost Project" Phenomenon**

A "ghost project" is defined as a fiscal entity that exists in procurement and budget documents but possesses no physical footprint. In the context of the 2025 Hackathon, detecting these requires a rigorous definition of "absence." It is not enough to simply not *see* a building; the system must prove that the building *should* be there and isn't. This requires a precise definition of the "Project Area of Interest" (AOI). If the geolocation engine maps a tender to the wrong village, the satellite audit will return a false negative (claiming the building is missing when it is simply elsewhere). Therefore, the fidelity of Module 2 (Geolocation) is the critical dependency for the entire system.

### **2.3 The Cloud Cover Challenge**

The geographic focus on Central Kenya (Kiambu, Nyeri, Meru) introduces a significant remote sensing challenge. These highland regions experience persistent cloud cover for large parts of the year, particularly during the "Long Rains" (March-May) and "Short Rains" (October-December). Optical satellites like Sentinel-2 or Landsat 8 are rendered ineffective during these windows, often returning images of white opacity. 

This necessitates the use of Synthetic Aperture Radar (SAR), specifically Sentinel-1 C-band data, which can penetrate cloud cover and provide consistent monitoring regardless of atmospheric conditions.4

## ---

**3\. Module 1: The "Data Void" (Tender Discovery)**

### **3.1 Objective and Scope**

The objective of Module 1 is to discover, extract, and structure "Tier 1" infrastructure awards. We define Tier 1 projects as significant civil works (Roads, Markets, Stadiums, Hospitals) with a physical footprint larger than 500m² and a contract value indicating substantial public spend. The time window for discovery is the trailing 12 months to ensure relevance to the current budget cycle.

### **3.2 Source Verification and Access Strategy**

#### **3.2.1 Public Procurement Information Portal (PPIP)**

The PPIP (tenders.go.ke) serves as the primary transparency portal for the Kenyan government.

* **Accessibility Analysis:** The portal does not offer a documented, open API for third-party developers.6 The search functionality is powered by a backend that serves dynamic content to the frontend via AJAX calls.  
* **Scraping Feasibility:** Direct HTML scraping of the search results page is brittle due to dynamic DOM manipulation. However, network analysis reveals that the portal communicates with internal endpoints to populate data tables.7  
* **Legal Considerations:** While scraping public government data is generally considered fair use for transparency, excessive request rates can trigger firewall blocks or be construed as an attack under the Computer Misuse and Cybercrimes Act.

* Hackathon Strategy (The "Network Sniff" Pattern):  
  The most efficient way to extract data without parsing HTML is to mimic the internal API calls.  
  1. Inspect the **Network Tab** in the browser developer tools while performing a search on tenders.go.ke.  
  2. Identify the POST request sent to the backend when filtering for "Contract Awards."  
  3. Replicate this request using Python’s requests library, ensuring headers (User-Agent, CSRF tokens) are identical to the browser's.  
  4. The response is typically a JSON object containing the table data, which bypasses the need for HTML parsing.

#### **3.2.2 e-Government Procurement (eGP) Kenya**

The eGP system (egpkenya.go.ke) represents the future of automated procurement.8

* **State of Implementation:** As of the current research horizon, full migration to eGP is ongoing. The system requires registration for access 8, making it less accessible for a hackathon scraper than the public PPIP portal.  
* **Data Standards:** Kenya is a signatory to the Open Contracting Data Standard (OCDS). In a production environment, the eGP system is architected to expose OCDS-compliant JSON APIs.9  
* **Production Reality:** For the hackathon, relying on eGP is high-risk due to authentication barriers. The recommendation is to focus on PPIP for historical data and treat eGP integration as a "Future Roadmap" item.

### **3.3 Target List: Procuring Entities and Keywords**

To filter out noise (e.g., "Supply of Stationery"), the discovery module must strictly scope its search to entities with a mandate for heavy infrastructure.

#### **3.3.1 Priority Procuring Entities (PEs)**

The following PEs manage the bulk of Kenya's infrastructure budget:

* **Kenya National Highways Authority (KeNHA):** Responsible for national trunk roads (Class A, B, C). Tenders often appear as "Performance Based Contract for Maintenance of...".1  
* **Kenya Urban Roads Authority (KURA):** Responsible for municipal roads. Tenders typically involve "Upgrading to Bitumen Standard" or "Routine Maintenance".10  
* **Kenya Rural Roads Authority (KeRRA):** Responsible for the vast network of rural access roads.11  
* **County Governments:** Specifically the **County Government of Kiambu** and **Nairobi City County**, focusing on Departments of Public Works, Health, and Trade (for markets).

#### **3.3.2 Keyword Logic**

The search algorithm must employ inclusion and exclusion lists to classify tenders.

| Category | Inclusion Keywords (Regex Pattern) | Exclusion Keywords |
| :---- | :---- | :---- |
| **Civil Works** | Construction, Proposed Construction, Erection of, Completion of, Upgrading, Rehabilitation, Civil Works | Supply, Delivery, Provision, Consultancy, Design, Feasibility Study |
| **Roads** | Bitumen, Graveling, Spot Improvement, Routine Maintenance, Dualling, Interchange 1 | Cleaning, Fuel, Lubricants, Insurance, Legal Services |
| **Water** | Drilling, Equipping, Borehole, Pipeline, Dam, Pan, Water Supply Project | Chemicals, Treatment, Exhaustion |

### **3.4 Extraction Strategy: The "Dirty Data" Pipeline**

A significant percentage of tender awards are uploaded as scanned PDFs (e.g., "Award\_Letter\_Signed.pdf"), which do not contain selectable text. To solve this "Data Void," Oneka AI requires a robust OCR pipeline.

#### **3.4.1 The OCR Architecture**

The pipeline must distinguish between *Machine-Readable PDFs* (generated by Word/Excel) and *Image-Based PDFs* (scans).

* Step 1: Classification  
  Use pdfplumber or pypdf to attempt text extraction. If the text yield is near zero but the file size is large, classify as Image-Based.  
* **Step 2: Optical Character Recognition (OCR)**  
  * **Hackathon Shortcut (Tesseract):** For a free solution, use **Tesseract OCR** via the pytesseract wrapper.  
    * *Preprocessing:* Convert PDF pages to images using pdf2image. Apply OpenCV thresholding to binarize the image (convert to strict black and white) to remove scan noise and improve character recognition accuracy.12  
    * *Limitation:* Tesseract struggles with maintaining table structures (rows and columns), which is critical for extracting the "Award Amount" from a list of bidders.  
  * **Production Reality (AWS Textract):** In a production environment, **Amazon Textract** is the industry standard.  
    * *Feature:* Textract's AnalyzeDocument API with the Forms and Tables feature types is specifically designed to parse structured data.13 It returns key-value pairs (e.g., "Tender Sum" : "KES 14,000,000"), significantly reducing the complexity of the NLP parsing step.

#### **3.4.2 Natural Language Processing (NLP)**

Once raw text is extracted, the system must parse specific entities.

* **Contractor Name Extraction:**  
  * *Pattern:* Look for lines following "Awarded to:", "Winning Bidder:", or "Notification of Award to".  
  * *Validation:* Cross-reference extracted names against the **NCBA (National Construction Authority)** registry or **AGPO (Access to Government Procurement Opportunities)** lists to confirm validity.15  
* **Financial Extraction:**  
  * *Regex Strategy:* Kenyan currency formats vary. Use regex that captures:  
    * Kshs\\.?\\s?(\[0-9,\]+(\\.\[0-9\]{2})?)  
    * KES\\s?(\[0-9,\]+)  
    * Kenya Shillings followed by text numbers (e.g., "Fourteen Million").  
  * *Validation:* If multiple amounts appear (e.g., individual items vs total), the algorithm should prioritize the largest numeric value associated with "Total" or "Sum".  
* **Project Description Extraction:**  
  * *Heuristic:* Usually the bolded header text or the text immediately following "RE:" or "TENDER FOR".

Architecture Diagram for Module 1:  
PPIP Scraper (Python/Requests) \-\> PDF Classifier \-\> (If Image) AWS Textract / (If Text) PDFPlumber \-\> Regex/NLP Parser \-\> Structured JSON (Tender DB)

## ---

**4\. Module 2: The "Proxy Geolocation" Engine**

### **4.1 Objective**

The output of Module 1 is a text string (e.g., "Construction of Gituamba Market"). The objective of Module 2 is to convert this string into a **GeoJSON Polygon** representing the physical audit target. This is the "Proxy Geolocation" engine because it uses proxy datasets (official facility lists) to resolve locations that are not explicitly defined in the tender.

### **4.2 Data Triangulation: Official Registries**

To determine where "Gituamba Market" is, we must consult the definitive government registries.

#### **4.2.1 Kenya Master Facility List (MFL) \- Health**

For any health-related project (Clinic, Dispensary, Hospital), the **Kenya Master Health Facility Registry (KMHFL)** is the source of truth.3

* **Availability:** The KMHFL exposes a public API.16  
* **Endpoint:** http://api.kmhfl.health.go.ke/api/facilities/facilities/  
* **Data Richness:** The API returns not just the name, but the exact GPS coordinates (flipped latitude/longitude in some versions, requiring careful parsing), the administrative ward, and the facility type.16  
* **Hackathon Implementation:** To avoid rate limits or downtime during the demo, the team should perform a bulk download of this dataset (approx. 13,000 facilities) into a local PostGIS database or a static JSON file.

#### **4.2.2 Ministry of Education School Registry**

For school infrastructure (Classrooms, Labs, Dormitories), the data is less centralized but available via open data initiatives.

* **Source:** **Open Schools Kenya** and World Bank datasets.17  
* **Format:** These are typically available as CSV downloads containing School Name, Level (Primary/Secondary), and GPS coordinates.  
* **Direct Link:** https://openschoolskenya.org/data/schools.csv.17

#### **4.2.3 Administrative Boundaries (The Fallback)**

If a facility is new (e.g., "Proposed Gituamba Market") and not yet in any registry, the system must fall back to the **Administrative Ward** level.

* **Dataset:** UNOCHA Kenya Subnational Administrative Boundaries (COD-AB).19  
* **Granularity:** Level 3 (Wards).  
* **Strategy:** If exact point matching fails, the system resolves the tender to the "Gituamba Ward" polygon. The satellite audit then becomes a "Search Mission" within that polygon rather than a specific "Point Audit."

### **4.3 The "Ghost" Logic: Spatial verification**

A key innovative feature of Oneka AI is the detection of "Ghost Sites."

* **Logic Flow:**  
  1. **Input:** Tender description "Construction of Gituamba Dispensary".  
  2. **Lookup:** Query KMHFL for "Gituamba".  
  3. **Cross-Reference:** Query OpenStreetMap (OSM) via the Overpass API or Nominatim for "Gituamba Health".  
  4. **Scenario A (Verified):** Facility exists in KMHFL and OSM. \-\> **Valid Audit Target.**  
  5. **Scenario B (Unregistered):** Facility exists in OSM but NOT in KMHFL. \-\> **Flag: "Unregistered Facility".**  
  6. **Scenario C (Ghost Potential):** Facility exists in Tender but NOT in KMHFL and NOT in OSM. \-\> **Flag: "High Risk / Ghost Site".**  
  * *Insight:* A project that has budget allocated but zero spatial footprint in either official or crowdsourced maps is the highest risk category.

### **4.4 Algorithm Design: Fuzzy Matching**

Tender clerks often abbreviate names (e.g., "Gituamba Disp.", "Gituamba HC", "Gituamba C.D.F. Disp"). Exact string matching will fail 80% of the time.

#### **4.4.1 The Fuzzy Logic Stack**

* **Library:** **RapidFuzz** (Python). This is the modern, faster alternative to FuzzyWuzzy and is MIT licensed.21  
* **Algorithm:** token\_set\_ratio.  
  * *Why?* The token\_set\_ratio algorithm splits strings into tokens (words), sorts them, and finds the intersection.  
  * *Example:* "Construction of Gituamba Dispensary" vs "Gituamba Dispensary". The intersection is "Gituamba Dispensary". The ratio will be 100%, ignoring the "Construction of" noise words.  
* **Thresholding:**  
  * **\> 90% Match:** Auto-Accept. Link the Tender UUID to the Facility UUID.  
  * **70% \- 90% Match:** Flag for "Human Review" in the dashboard.  
  * **\< 70% Match:** No Match. Trigger "Ghost Site" logic or Fallback to Ward Polygon.

#### **4.4.2 Implementation Code Pattern**

Python

from rapidfuzz import process, fuzz

def resolve\_location(tender\_string, mfl\_database):  
    \# mfl\_database is a dict of {name: coordinates}  
    choices \= mfl\_database.keys()  
      
    \# Use extractOne to find the best candidate  
    match \= process.extractOne(  
        tender\_string,   
        choices,   
        scorer=fuzz.token\_set\_ratio,   
        score\_cutoff=70  
    )  
      
    if match:  
        facility\_name, score, index \= match  
        return mfl\_database\[facility\_name\] \# Returns (Lat, Lon)  
    else:  
        return None \# Trigger fallback

## ---

**5\. Module 3: The "Paper Trail" (Financial Tracking)**

### **5.1 Objective**

The objective of Module 3 is to quantify the financial risk. A project where the "Paper Trail" shows 100% absorption (money spent) but the "Cloud Piercer" (Module 4\) shows 0% progress is the ultimate anomaly Oneka AI seeks to detect.

### **5.2 Source Identification: Controller of Budget (COB)**

The Office of the Controller of Budget (COB) provides the most authoritative data on actual *exchequer issues* (cash released) versus *commitments* (budgeted amounts).

* **Primary Source:** **Budget Implementation Review Reports (BIRR)**.23  
* **Report Frequency:** Quarterly and Annually.  
* **URL Pattern:** https://cob.go.ke/reports/consolidated-county-budget-implementation-review-reports/.2  
* **Format:** Large, complex PDFs containing narrative text and financial tables.

### **5.3 Parsing Strategy: The Inference Problem**

**The Challenge:** COB reports typically aggregate data at the *Vote Head* or *Department* level (e.g., "Department of Health Services: KES 400M Released"), rather than the *Project* level.

* **Inference Logic:** Oneka AI uses a probabilistic risk model.  
  * If "Department of Health" has an absorption rate of **95%** (High Spend).  
  * AND the "Gituamba Dispensary" is the Department's *Flagship Project* (largest line item in the County Integrated Development Plan \- CIDP).  
  * AND Module 4 shows **0%** physical progress.  
  * **Conclusion:** The high departmental spend cannot be reconciled with the stalled flagship project. **Risk Level: Critical.**

**Project-Level Data:** Occasionally, counties provide "Annexes" or "Project Implementation Status Reports" within the BIRR documents. These are the "Gold Dust" for the scraper.

* **Tools:**  
  * **Camelot:** A Python library optimized for extracting tabular data from text-based PDFs. It is superior to Tabula for automated pipelines.  
  * **PDFPlumber:** Use this to extract the narrative sections to find context (e.g., "The department faced challenges in Gituamba due to land disputes").

### **5.4 Contractor Vetting**

Before flagging a project, the system assesses the credibility of the contractor.

* **Kenya Law Reports (eKLR):** A scraper targets kenyalaw.org 25 to search for the contractor's name.  
  * *Risk Indicators:* Presence in civil suits regarding "Breach of Contract," "Recovery of Funds," or "Fraud."  
* **PPIP Debarment List:** The PPRA publishes a list of companies debarred from participating in public procurement. This list is available on tenders.go.ke.15  
  * *Implementation:* A simple scraper monitors this list. If a contractor in the current audit list matches a name on the debarment list, the project is immediately flagged red.  
* **National Construction Authority (NCA):** Verify registration status.26 A contractor winning a KES 500M road tender while registered as "NCA 7" (limited to small works) indicates procedural irregularity.

## ---

**6\. Module 4: The "Cloud Piercer" (Satellite Audit)**

### **6.1 Objective**

This module provides the "Ground Truth." It asks the binary question: *Is there a new structure here?*

### **6.2 Tech Stack Validation: Sentinel-1 (SAR) vs. Optical**

For the Kenyan context, relying on optical imagery (Sentinel-2, Planet, Google Earth) is a point of failure. The target regions (Aberdares, Mt. Kenya region) are often under heavy cloud cover.

* **Sentinel-1 (SAR):** Synthetic Aperture Radar operates in the C-band (microwave). It penetrates clouds, smoke, and rain, providing a guaranteed data point every 6-12 days.4  
* **Conclusion:** Sentinel-1 is **mandatory** for the "Cloud Piercer" module. Sentinel-2 can be used as a secondary validation layer only on clear days.

### **6.3 Change Detection Logic: The "Double Bounce" Physics**

To detect a building (e.g., a market shed) on a plot of land:

1. **Baseline State (Bare Soil):** Radar pulses scatter in multiple directions (specular or diffuse reflection). The return signal (Backscatter) is low.  
2. **Construction State (Vertical Structure):** The radar pulse hits the vertical wall of the new building, bounces down to the smooth floor/ground, and reflects directly back to the sensor. This is the **Double-Bounce Effect**.  
3. **Signal Spike:** This effect causes a significant increase in the backscatter intensity in the image.

#### **6.3.1 Thresholds and Polarization**

* **Polarization:** use **VV (Vertical-Vertical)** polarization. Man-made structures (vertical walls) respond strongly in VV due to the dipole interaction with vertical electric fields.4  
* **The Threshold:**  
  * **Bare Soil / Low Vegetation:** Typically ranges from **\-10 dB to \-15 dB**.  
  * **Concrete / Metal Structures:** Can spike to **\>-5 dB** or even **0 dB** (especially for metal roofs).27  
  * **Detection Logic:** A temporal increase of **\> \+3 dB to \+5 dB** between Time T1 (Project Start) and Time T2 (Current Date) is the trigger for "Construction Detected".28

### **6.4 Library Selection: Speed vs. Power**

#### **6.4.1 The Hackathon Choice: Sentinel Hub Process API**

For a 48-hour event, downloading gigabytes of .SAFE raw data and processing it with SNAP (ESA's toolbox) is unfeasible.

* **Solution:** **Sentinel Hub (Sinergise)**.29  
* **Architecture:** The processing happens server-side. The developer writes a localized script (Evalscript) and sends it to the API. Sentinel Hub processes the raw SAR data, applies calibration and terrain correction, and returns the analytics or visual product.  
* **Latency:** Seconds, compared to hours for local processing.  
* **Free Tier:** The developer trial offers enough processing units (PU) for a hackathon demo.30

#### **6.4.2 Production Reality: PyroSAR**

For a government deployment, relying on a commercial API (Sentinel Hub) might be too costly at national scale.

* **Solution:** **PyroSAR** (Python wrapper for SNAP).31  
* **Architecture:** A dedicated cluster of servers processes raw Sentinel-1 data downloaded from the Copernicus Open Access Hub. This provides full control over the pipeline (Orbit file application, Radiometric Terrain Correction, Speckle Filtering) without per-request costs.

## ---

**7\. Implementation Roadmap: Hackathon Shortcuts vs. Production Realities**

To win the NIRU AI Hackathon, the team must navigate the trade-off between "Demo Magic" and "Engineering Rigor."

| Feature | Hackathon Shortcut (The Demo) | Production Reality (The Deployment) |
| :---- | :---- | :---- |
| **Data Ingestion** | **Static JSON:** Pre-scrape 20 tenders from PPIP and save them to data.json. Mock the API calls in the code to read from this file. Prevents network failures during the pitch. | **Live Scrapers / API Integration:** Robust Celery workers running nightly jobs to scrape PPIP and eGP. Ideally, a formal GSB (Government Service Bus) integration. |
| **OCR** | **Tesseract:** Use pytesseract on pre-selected, high-quality PDFs. | **AWS Textract:** Scalable, enterprise-grade extraction that handles messy tables and handwriting. |
| **Geolocation** | **Hardcoded Coordinates:** For the 3 "Hero Projects" in the demo, manually find the coordinates and hardcode them. Show the *code* for fuzzy matching, but don't rely on it live. | **Human-in-the-Loop:** A verification interface where a GIS analyst confirms the fuzzy match before the satellite audit begins. |
| **Satellite Analysis** | **Pre-Computed GIFs:** Generate the Before/After SAR images *before* the presentation. Embed them in the frontend. | **On-Demand Processing:** Real-time Sentinel Hub API calls or a localized PyroSAR pipeline triggering automatically when a new tender is ingested. |
| **Contractor Vetting** | **Mock Database:** Create a dummy SQLite db with a few "Bad Actors" to demonstrate the flagging logic. | **Graph Database (Neo4j):** Mapping relationships between directors, companies, and tender awards to detect cartels and collusive practices. |

## ---

**8\. Conclusion**

Oneka AI proposes a radical shift in how public infrastructure is audited in Kenya. By moving from **Process Audits** (checking if the paperwork is filed) to **Reality Audits** (checking if the building exists), the system addresses the fundamental disconnect enabling corruption.

The technical feasibility relies on the intelligent triangulation of open data. While no single dataset is perfect—PPIP is unstructured, MFL is incomplete, and COB reports are aggregated—their intersection provides a high-fidelity signal. The "Data Void" is bridged by OCR; the "Location Gap" is bridged by Fuzzy Matching against the MFL; and the "Verification Gap" is bridged by Sentinel-1 SAR.

For the hackathon, the path to victory lies in a tightly scoped MVP: focus on **Health Infrastructure** (where the MFL provides excellent ground truth) and **Cloud-Heavy Regions** (where the SAR tech stack can demonstrate its unique value). By proving that an algorithm can see what an auditor cannot, Oneka AI offers a scalable, data-driven tool for the EACC, the Auditor General, and the Kenyan citizen.

#### **Works cited**

1. KeNHA/R5/224/2024 PERFORMANCE BASED CONTRACT FOR THE M, accessed January 18, 2026, [https://kenha.co.ke/wp-content/uploads/2024/11/KeNHA-R5-224-2024-GATEWAY-MALL-ATHI-RIVER-.pdf](https://kenha.co.ke/wp-content/uploads/2024/11/KeNHA-R5-224-2024-GATEWAY-MALL-ATHI-RIVER-.pdf)  
2. County Reports – Office of the Controller of Budget, accessed January 18, 2026, [https://cob.go.ke/reports/consolidated-county-budget-implementation-review-reports/](https://cob.go.ke/reports/consolidated-county-budget-implementation-review-reports/)  
3. KMHFR | Home, accessed January 18, 2026, [https://kmhfl.health.go.ke/](https://kmhfl.health.go.ke/)  
4. Soil Moisture Retrival Based on Sentinel-1 Imagery under Sparse Vegetation Coverage, accessed January 18, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC6387433/](https://pmc.ncbi.nlm.nih.gov/articles/PMC6387433/)  
5. Towards a 20 m Global Building Map from Sentinel-1 SAR Data \- MDPI, accessed January 18, 2026, [https://www.mdpi.com/2072-4292/10/11/1833](https://www.mdpi.com/2072-4292/10/11/1833)  
6. E-Government Development in Kenya – Centre for African Studies – HSE University, accessed January 18, 2026, [https://we.hse.ru/en/irs/cas/passke](https://we.hse.ru/en/irs/cas/passke)  
7. SocialGrep/the-reddit-dataset-dataset · Datasets at Hugging Face, accessed January 18, 2026, [https://huggingface.co/datasets/SocialGrep/the-reddit-dataset-dataset/viewer/posts/train](https://huggingface.co/datasets/SocialGrep/the-reddit-dataset-dataset/viewer/posts/train)  
8. Supplier Registration \- egp-kenya, accessed January 18, 2026, [https://egpkenya.go.ke/supplier/registration](https://egpkenya.go.ke/supplier/registration)  
9. Improving Open Contracting Processes (KE0036), accessed January 18, 2026, [https://www.opengovpartnership.org/members/kenya/commitments/ke0036/](https://www.opengovpartnership.org/members/kenya/commitments/ke0036/)  
10. Awarded Contracts \- Kenya Urban Roads Authority, accessed January 18, 2026, [https://kura.go.ke/cat\_doc/awarded-contracts/](https://kura.go.ke/cat_doc/awarded-contracts/)  
11. Influence of risk reduction on the implementation of KeRRA road construction projects in Migori County, Kenya \- African Scientific Annual Review, accessed January 18, 2026, [https://asarev.net/ojs/index.php/asarev/article/download/31/23](https://asarev.net/ojs/index.php/asarev/article/download/31/23)  
12. Comparative Analysis of AI OCR Models for PDF to Structured Text | IntuitionLabs, accessed January 18, 2026, [https://intuitionlabs.ai/articles/ai-ocr-models-pdf-structured-text-comparison](https://intuitionlabs.ai/articles/ai-ocr-models-pdf-structured-text-comparison)  
13. Benchmarking Extraction of Structured Data from Templatized Documents \- UC Berkeley EECS, accessed January 18, 2026, [https://www2.eecs.berkeley.edu/Pubs/TechRpts/2025/EECS-2025-77.pdf](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2025/EECS-2025-77.pdf)  
14. Top AI tools for text extraction. Businesses and organisations handle… | by Andrea Rosales | Medium, accessed January 18, 2026, [https://medium.com/@andrea.rosales08/top-ai-tools-to-extract-text-from-documents-43c3641124a2](https://medium.com/@andrea.rosales08/top-ai-tools-to-extract-text-from-documents-43c3641124a2)  
15. PPIP Home, accessed January 18, 2026, [https://tenders.go.ke/](https://tenders.go.ke/)  
16. Facilities — Master Facility List Kenya 0.0.1a3 documentation, accessed January 18, 2026, [https://mfl-api-docs.readthedocs.io/en/latest/10\_facilities.html](https://mfl-api-docs.readthedocs.io/en/latest/10_facilities.html)  
17. All \- Open Schools Kenya, accessed January 18, 2026, [https://openschoolskenya.org/data/schools.csv](https://openschoolskenya.org/data/schools.csv)  
18. Exploring Kenyan Education \- Development Seed, accessed January 18, 2026, [http://developmentseed.org/kenya-bank/open/](http://developmentseed.org/kenya-bank/open/)  
19. Kenya \- Subnational Administrative Boundaries | Humanitarian Dataset | HDX, accessed January 18, 2026, [https://data.humdata.org/dataset/cod-ab-ken](https://data.humdata.org/dataset/cod-ab-ken)  
20. Humanitarian Datasets | Find Crisis Data | HDX, accessed January 18, 2026, [https://data.humdata.org/m/search?q=Kenya+-+Admin+Level+3+Boundaries\&page=1](https://data.humdata.org/m/search?q=Kenya+-+Admin+Level+3+Boundaries&page=1)  
21. FreeBSD \- DistroWatch.com, accessed January 18, 2026, [https://distrowatch.com/table.php?distribution=freebsd\&pkglist=true\&version=12.4](https://distrowatch.com/table.php?distribution=freebsd&pkglist=true&version=12.4)  
22. accessed January 18, 2026, [http://git.altlinux.org/beehive/logs/Sisyphus-x86\_64/latest/src.list](http://git.altlinux.org/beehive/logs/Sisyphus-x86_64/latest/src.list)  
23. Annual NGBIRR FY 2024-25 | PDF | Budget | Government Budget \- Scribd, accessed January 18, 2026, [https://www.scribd.com/document/953168656/Annual-NGBIRR-FY-2024-25](https://www.scribd.com/document/953168656/Annual-NGBIRR-FY-2024-25)  
24. Kenya: Fiscal Transparency Evaluation; IMF Country Report No. 16/221, July 2016, accessed January 18, 2026, [https://www.imf.org/external/pubs/ft/scr/2016/cr16221.pdf](https://www.imf.org/external/pubs/ft/scr/2016/cr16221.pdf)  
25. Forensic observations and recommendations on sexual and gender based violence in Kenya \- PMC \- PubMed Central, accessed January 18, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC7219195/](https://pmc.ncbi.nlm.nih.gov/articles/PMC7219195/)  
26. Search Registered Contractors \- NCA | National Construction Authority, accessed January 18, 2026, [https://www.nca.go.ke/registered-contractors](https://www.nca.go.ke/registered-contractors)  
27. Urban objects detection from C-band synthetic aperture radar (SAR) satellite images through simulating filter properties \- PubMed Central, accessed January 18, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC7973757/](https://pmc.ncbi.nlm.nih.gov/articles/PMC7973757/)  
28. Multitemporal analysis of Sentinel-1 backscatter during snowmelt using high-resolution field measurements and radiative transfer modelling \- TC, accessed January 18, 2026, [https://tc.copernicus.org/articles/19/5579/2025/](https://tc.copernicus.org/articles/19/5579/2025/)  
29. How and why use the Copernicus Data Space Ecosystem for hackathons, accessed January 18, 2026, [https://dataspace.copernicus.eu/news/2024-12-9-how-and-why-use-copernicus-data-space-ecosystem-hackathons](https://dataspace.copernicus.eu/news/2024-12-9-how-and-why-use-copernicus-data-space-ecosystem-hackathons)  
30. FAQ \- Sentinel Hub, accessed January 18, 2026, [https://www.sentinel-hub.com/faq/](https://www.sentinel-hub.com/faq/)  
31. carlos-alberto-silva/satellite-image-deep-learning \- GitHub, accessed January 18, 2026, [https://github.com/carlos-alberto-silva/satellite-image-deep-learning](https://github.com/carlos-alberto-silva/satellite-image-deep-learning)