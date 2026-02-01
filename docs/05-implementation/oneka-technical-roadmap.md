# **ONEKA AI: Technical Roadmap**

## **MVP Development Strategy for NIRU AI Hackathon**

---

## **Document Overview**

**Project Name**: ONEKA AI — Autonomous Infrastructure Audit System  
**Version**: 1.0  
**Date**: January 29, 2026  
**Development Timeline**: 8 Weeks (56 Days)  
**Team Size**: 3 Full-Time Engineers  
**Target Deployment**: Kenya Office of the Auditor General (OAG)

**Purpose**: This technical roadmap outlines the complete development strategy for ONEKA AI's Minimum Viable Product (MVP), detailing our architecture, milestones, technical approach, and expected deliverables for the 8-week incubation period.

---

## **1. Executive Summary**

### **1.1 The Problem**

Kenya allocates KES 750+ billion annually to infrastructure development, yet 30-40% of projects experience significant delays or become "ghost projects" (exist only on paper). Traditional audits take 18-24 months and cost KES 2-5 million per project — by which time funds are already lost.

### **1.2 The ONEKA Solution**

ONEKA AI is an autonomous auditing platform that:

1. **Consolidates fragmented government data** from procurement (PPIP), finance (IFMIS/COB), and geolocation (KMHFL) systems
2. **Predicts project failures** 12-18 months early using machine learning trained on historical satellite data
3. **Verifies physical construction** using multi-layer satellite imagery that cannot be manipulated
4. **Reduces audit time** from 18 months to 48 hours at 1% of traditional cost

### **1.3 MVP Objectives**

By the end of Week 8, ONEKA will demonstrate:

✅ **Automated data ingestion** from 3+ government systems  
✅ **100 tender records** processed with OCR extraction  
✅ **25 projects geolocated** with 85%+ accuracy  
✅ **ML model trained** on 30 historical projects achieving 80%+ accuracy  
✅ **Satellite verification** operational using 4-layer analysis (NDVI, SAR, False Color, NDWI)  
✅ **Interactive 3D dashboard** with Google Photorealistic Tiles + satellite overlays  
✅ **12+ ghost projects flagged** with evidence-backed risk scores

---

## **2. Technical Architecture**

### **2.1 System Architecture Overview**

```
┌─────────────────────────────────────────────────────────────────┐
│                      INGESTION LAYER                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │  PPIP    │  │  IFMIS   │  │   COB    │  │  KMHFL   │         │
│  │ Scraper  │  │  Parser  │  │  Parser  │  │   API    │         │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘         │
└───────┼─────────────┼─────────────┼─────────────┼───────────────┘
        │             │             │             │
        └─────────────┴─────────────┴─────────────┘
                      │
        ┌─────────────▼──────────────────────────────────────┐
        │         INTEROPERABILITY ENGINE                    │
        │  • Entity Resolution (RapidFuzz)                   │
        │  • Fuzzy Matching (Facility Names)                 │
        │  • Concordance Database (PostgreSQL + PostGIS)     │
        │  • OCDS/SCOA Standardization                       │
        └─────────────┬──────────────────────────────────────┘
                      │
        ┌─────────────▼──────────────────────────────────────┐
        │      UNIFIED PROJECT DATABASE                      │
        │      (PostgreSQL 15 + PostGIS 3.4)                 │
        │  • projects (master table)                         │
        │  • procurement_records (PPIP data)                 │
        │  • financial_records (COB/IFMIS)                   │
        │  • geolocation_records (KMHFL coordinates)         │
        │  • satellite_analyses (ML predictions)             │
        └─────────────┬──────────────────────────────────────┘
                      │
        ┌─────────────┴──────────────────┐
        │                                │
┌───────▼──────────┐          ┌─────────▼─────────────┐
│  SATELLITE       │          │  PREDICTIVE ML        │
│  PROCESSING      │          │  ENGINE               │
│                  │          │                       │
│ • Copernicus API │          │ • Random Forest       │
│ • Satpy (NDVI)   │          │ • Risk Scoring        │
│ • PyroSAR (SAR)  │          │ • S-Curve Baseline    │
│ • NDWI (Flood)   │          │ • Feature Engineering │
│ • Change Detect  │          │ • Batch Prediction    │
└───────┬──────────┘          └─────────┬─────────────┘
        │                                │
        └────────────┬───────────────────┘
                     │
        ┌────────────▼────────────────────────────────-─┐
        │      RISK ANALYTICS ENGINE                    │
        │  • Anomaly Detection                          │
        │  • Alert Generation (Critical/High/Moderate)  │
        │  • Evidence Compilation                       │
        │  • Report Automation (PDF Export)             │
        └────────────┬─────────────────────────────────-┘
                     │
        ┌────────────▼────────────────────────────────-─┐
        │      USER INTERFACE LAYER                     │
        │  • FastAPI Backend (REST API)                 │
        │  • React Frontend (Dashboard)                 │
        │  • CesiumJS (3D Visualization)                │
        │  • Google Photorealistic 3D Tiles             │
        │  • Satellite Overlay Layers (XYZ tiles)       │
        │  • Risk Alert Interface                       │
        │  • Audit Report Generator                     │
        └─────────────────────────────────────────────-─┘
```

---

### **2.2 Technology Stack**

#### **Backend Infrastructure**

| Component          | Technology           | Version         | Justification                                           |
| ------------------ | -------------------- | --------------- | ------------------------------------------------------- |
| **Database**       | PostgreSQL + PostGIS | 15.x + 3.4      | Geospatial queries, ACID compliance, JSON support       |
| **API Framework**  | FastAPI              | 0.109+          | High performance, automatic OpenAPI docs, async support |
| **Task Queue**     | Celery + Redis       | 5.3+ / 7.2+     | Background processing for satellite downloads, OCR      |
| **Object Storage** | AWS S3               | Latest          | Satellite tile storage (~15GB), document archives       |
| **Compute**        | AWS EC2              | t3.medium (MVP) | Cost-effective for development, scalable to t3.large    |
| **OCR Service**    | AWS Textract         | Latest          | Superior PDF table extraction vs open-source            |

#### **Data Processing**

| Component                | Technology          | Version       | Justification                                   |
| ------------------------ | ------------------- | ------------- | ----------------------------------------------- |
| **Satellite Processing** | Satpy               | 0.47+         | Sentinel-2 NDVI, False Color, NDWI processing   |
| **SAR Processing**       | PyroSAR             | 0.23+         | Sentinel-1 radar analysis (all-weather)         |
| **ML Framework**         | scikit-learn        | 1.4+          | Random Forest, mature library, production-ready |
| **Data Manipulation**    | Pandas              | 2.2+          | CSV processing, time-series analysis            |
| **Geospatial**           | GeoPandas + Shapely | 0.14+ / 2.0+  | GeoJSON handling, polygon operations            |
| **Fuzzy Matching**       | RapidFuzz           | 3.6+          | Entity resolution across government systems     |
| **HTTP Client**          | requests + httpx    | 2.31+ / 0.26+ | Web scraping, API calls (sync + async)          |
| **PDF Parsing**          | pdfplumber          | 0.11+         | Local PDF text extraction fallback              |

#### **Frontend & Visualization**

| Component            | Technology           | Version | Justification                                           |
| -------------------- | -------------------- | ------- | ------------------------------------------------------- |
| **Framework**        | React                | 18.2+   | Component-based, large ecosystem, developer familiarity |
| **3D Mapping**       | CesiumJS             | 1.113+  | Google 3D Tiles support, satellite overlay capabilities |
| **State Management** | Zustand              | 4.5+    | Lightweight, simpler than Redux for MVP                 |
| **UI Components**    | shadcn/ui + Tailwind | Latest  | Pre-built accessible components, rapid development      |
| **Charts**           | Recharts             | 2.12+   | S-curve visualization, risk score displays              |
| **HTTP Client**      | Axios                | 1.6+    | Promise-based API calls, interceptors                   |

#### **DevOps & Deployment**

| Component            | Technology       | Version | Justification                                |
| -------------------- | ---------------- | ------- | -------------------------------------------- |
| **Containerization** | Docker           | 25.x    | Consistent environments dev→production       |
| **Orchestration**    | Docker Compose   | 2.24+   | Multi-container local development            |
| **CI/CD**            | GitHub Actions   | Latest  | Automated testing, deployment workflows      |
| **Monitoring**       | CloudWatch (AWS) | Latest  | Log aggregation, error alerting              |
| **Version Control**  | Git + GitHub     | Latest  | Collaboration, code review, version tracking |

---

### **2.3 Data Flow Architecture**

#### **Procurement Data Pipeline**

```
PPIP Website → requests scraper → Raw HTML
                    ↓
              BeautifulSoup parsing → Tender URLs list
                    ↓
           PDF download → S3 storage
                    ↓
         AWS Textract OCR → Structured JSON
                    ↓
    Field extraction (contractor, amount, location)
                    ↓
         Insert into procurement_records table
                    ↓
         Trigger entity resolution → Fuzzy match
                    ↓
    Link to projects table via project_uuid
```

#### **Geolocation Pipeline**

```
Tender description text → spaCy NER extraction
                    ↓
         Entity candidates (e.g., "Gituamba Market")
                    ↓
    RapidFuzz matching against KMHFL database
                    ↓
         Match confidence score (0-100%)
                    ↓
    High confidence (>85%) → Auto-link GPS
    Medium confidence (60-85%) → Queue for manual review
    Low confidence (<60%) → Ward centroid fallback
                    ↓
         Insert into geolocation_records table
```

#### **Satellite Processing Pipeline**

```
Project GPS coordinates → Define 500m buffer AOI
                    ↓
    Query Copernicus Data Space API
                    ↓
         Download Sentinel-2 L2A (10m optical)
         Download Sentinel-1 GRD (10m SAR)
                    ↓
    Satpy processing:
         • Calculate NDVI (B08-B04)/(B08+B04)
         • Generate False Color (B08-B04-B03)
         • Calculate NDWI (B03-B08)/(B03+B08)
                    ↓
    PyroSAR processing:
         • Radiometric calibration
         • Speckle filtering
         • VV backscatter extraction
                    ↓
    Time-series analysis (24 months history)
         • Extract monthly NDVI mean
         • Extract monthly SAR backscatter
         • Detect vegetation clearing events
         • Detect structure appearance
                    ↓
         Insert into satellite_analyses table
                    ↓
    Trigger ML prediction → Risk score generation
```

#### **ML Prediction Pipeline**

```
Trained Random Forest model (joblib pickle)
                    ↓
    New project features extracted:
         • NDVI slope (linear regression)
         • Max NDVI drop magnitude
         • Months to site clearing
         • SAR backscatter increase
         • Progress gap (budget % - physical %)
                    ↓
         model.predict(features) → Risk class
         model.predict_proba(features) → Confidence %
                    ↓
    Risk categorization:
         0-30%: Low Risk (green)
         31-60%: Moderate Risk (yellow)
         61-80%: High Risk (orange)
         81-100%: Critical Risk (red)
                    ↓
    Generate human-readable explanation:
         "Project shows no vegetation clearing after
          8 months (expected: 2 months). SAR analysis
          confirms no structural development."
                    ↓
         Update satellite_analyses.ml_risk_score
         Update satellite_analyses.risk_explanation
```

---

## **3. Development Milestones & Timeline**

### **3.1 Week 1: Infrastructure Foundation (Days 1-7)**

#### **Objectives**

- Establish development environment
- Deploy core infrastructure
- Implement data pipeline foundations

#### **Deliverables**

| ID  | Task                                                                                                  | Owner        | Hours | Status  |
| --- | ----------------------------------------------------------------------------------------------------- | ------------ | ----- | ------- |
| 1.1 | AWS account setup (EC2 t3.medium, RDS PostgreSQL, S3 buckets)                                         | DevOps Lead  | 4h    | Planned |
| 1.2 | PostgreSQL + PostGIS installation, schema design (6 tables)                                           | Backend Lead | 8h    | Planned |
| 1.3 | FastAPI project scaffolding (health check, CORS, auth placeholder)                                    | Backend Lead | 6h    | Planned |
| 1.4 | Docker Compose setup (db, api, redis, celery workers)                                                 | DevOps Lead  | 8h    | Planned |
| 1.5 | PPIP scraper v1 (extract 100 tender URLs from health sector)                                          | Backend Dev  | 12h   | Planned |
| 1.6 | KMHFL API integration (bulk load 13,000 facility records)                                             | Backend Dev  | 6h    | Planned |
| 1.7 | Historical training data collection (identify 30 projects: 20 successful + 10 ghost from OAG reports) | Data Analyst | 16h   | Planned |
| 1.8 | GitHub repository setup (main/dev branches, CI/CD workflow)                                           | DevOps Lead  | 4h    | Planned |

**Week 1 Success Criteria:**

- ✅ 100 tender URLs scraped from PPIP
- ✅ 13,000 KMHFL facilities loaded into database
- ✅ 30 training projects identified with GPS coordinates
- ✅ API responds to health check at `/health`

---

### **3.2 Week 2: Data Extraction & Integration (Days 8-14)**

#### **Objectives**

- Implement OCR pipeline for tender documents
- Extract satellite time-series for training projects
- Build entity resolution engine

#### **Deliverables**

| ID  | Task                                                                                      | Owner        | Hours | Status  |
| --- | ----------------------------------------------------------------------------------------- | ------------ | ----- | ------- |
| 2.1 | AWS Textract integration (analyze tender PDFs)                                            | Backend Lead | 10h   | Planned |
| 2.2 | PDF field extraction logic (contractor, amount, location)                                 | Backend Dev  | 12h   | Planned |
| 2.3 | Copernicus Data Space API authentication setup                                            | Backend Lead | 4h    | Planned |
| 2.4 | Satpy installation & NDVI calculation script                                              | ML Engineer  | 10h   | Planned |
| 2.5 | Download 24-month satellite history for 30 training projects (720 image pairs)            | ML Engineer  | 12h   | Planned |
| 2.6 | Manual phase labeling using QGIS (identify mobilization, construction, completion phases) | Data Analyst | 20h   | Planned |
| 2.7 | RapidFuzz entity resolution (match tender locations to KMHFL facilities)                  | Backend Dev  | 12h   | Planned |
| 2.8 | Concordance database logic (create project_uuid linkages)                                 | Backend Lead | 8h    | Planned |

**Week 2 Success Criteria:**

- ✅ 100 tender PDFs processed via Textract
- ✅ 85+ tenders successfully geocoded (>85% match confidence)
- ✅ 720+ monthly satellite data points extracted for training set
- ✅ Training data CSV with labeled phases exported

---

### **3.3 Week 3: ML Feature Engineering (Days 15-21)**

#### **Objectives**

- Engineer features from satellite time-series
- Build training dataset
- Implement baseline ML model

#### **Deliverables**

| ID  | Task                                                                 | Owner       | Hours | Status  |
| --- | -------------------------------------------------------------------- | ----------- | ----- | ------- |
| 3.1 | Feature extraction pipeline (`engineer_features()`)                  | ML Engineer | 16h   | Planned |
| 3.2 | Calculate NDVI slope via linear regression per project               | ML Engineer | 6h    | Planned |
| 3.3 | Calculate SAR backscatter change metrics                             | ML Engineer | 6h    | Planned |
| 3.4 | Calculate progress gap (budget absorption % - physical completion %) | Backend Dev | 8h    | Planned |
| 3.5 | Generate training matrix (30 projects × 15 features)                 | ML Engineer | 8h    | Planned |
| 3.6 | Train initial Random Forest model (v0.1)                             | ML Engineer | 8h    | Planned |
| 3.7 | 5-fold cross-validation & hyperparameter tuning                      | ML Engineer | 10h   | Planned |
| 3.8 | Model evaluation report (accuracy, precision, recall, F1)            | ML Engineer | 6h    | Planned |

**Week 3 Success Criteria:**

- ✅ 15+ features engineered from satellite data
- ✅ Random Forest model trained achieving >75% accuracy
- ✅ Model saved as `oneka_predictor_v0.1.pkl`
- ✅ Feature importance analysis documented

---

### **3.4 Week 4: Multi-Layer Satellite Processing (Days 22-28)**

#### **Objectives**

- Implement comprehensive satellite analysis
- Integrate SAR all-weather monitoring
- Enhance ML model with multi-layer features

#### **Deliverables**

| ID  | Task                                                             | Owner        | Hours | Status  |
| --- | ---------------------------------------------------------------- | ------------ | ----- | ------- |
| 4.1 | PyroSAR installation & Sentinel-1 processing pipeline            | ML Engineer  | 12h   | Planned |
| 4.2 | SAR VV polarization backscatter extraction                       | ML Engineer  | 10h   | Planned |
| 4.3 | False Color composite generation (B08-B04-B03)                   | ML Engineer  | 6h    | Planned |
| 4.4 | NDWI calculation for flood filtering                             | ML Engineer  | 6h    | Planned |
| 4.5 | Change detection algorithm (Δ NDVI + Δ SAR thresholding)         | ML Engineer  | 12h   | Planned |
| 4.6 | Retrain Random Forest with multi-layer features (v0.2)           | ML Engineer  | 10h   | Planned |
| 4.7 | Database schema update (add ml_risk_score, ml_confidence fields) | Backend Lead | 4h    | Planned |
| 4.8 | Batch processing script (analyze all 100 geolocated tenders)     | Backend Dev  | 8h    | Planned |

**Week 4 Success Criteria:**

- ✅ 4-layer satellite processing operational (NDVI, SAR, False Color, NDWI)
- ✅ ML model v0.2 achieving 80%+ accuracy
- ✅ 100 projects analyzed with risk scores
- ✅ 12+ projects flagged as high/critical risk

---

### **3.5 Week 5: 3D Visualization & Frontend (Days 29-35)**

#### **Objectives**

- Build interactive dashboard
- Implement Google 3D Tiles integration
- Create satellite overlay visualization

#### **Deliverables**

| ID  | Task                                                            | Owner         | Hours | Status  |
| --- | --------------------------------------------------------------- | ------------- | ----- | ------- |
| 5.1 | React project setup (Vite, TypeScript, Tailwind)                | Frontend Lead | 6h    | Planned |
| 5.2 | CesiumJS integration (Google Photorealistic 3D Tiles API)       | Frontend Lead | 12h   | Planned |
| 5.3 | GeoTIFF to XYZ tiles conversion (`geotiff_to_xyz_tiles()`)      | ML Engineer   | 10h   | Planned |
| 5.4 | S3 tile hosting setup (s3://oneka-tiles/)                       | DevOps Lead   | 4h    | Planned |
| 5.5 | Satellite overlay layers (NDVI 50% opacity, SAR 40% opacity)    | Frontend Lead | 12h   | Planned |
| 5.6 | Project pin rendering (color-coded by risk score)               | Frontend Dev  | 8h    | Planned |
| 5.7 | Project detail panel (procurement + finance + satellite + risk) | Frontend Dev  | 12h   | Planned |
| 5.8 | Risk dashboard (list view sorted by score)                      | Frontend Dev  | 10h   | Planned |

**Week 5 Success Criteria:**

- ✅ 3D map showing Nairobi with Google buildings
- ✅ 100 project pins displayed with risk colors
- ✅ Satellite heatmap overlay toggleable
- ✅ Click project → See full audit report

---

### **3.6 Week 6: ML Prediction API & Integration (Days 36-42)**

#### **Objectives**

- Deploy ML model as production API
- Implement real-time risk prediction
- Build automated alert system

#### **Deliverables**

| ID  | Task                                                                               | Owner         | Hours | Status  |
| --- | ---------------------------------------------------------------------------------- | ------------- | ----- | ------- |
| 6.1 | FastAPI endpoint: `POST /api/predict` (accept project features, return risk score) | Backend Lead  | 8h    | Planned |
| 6.2 | Batch prediction endpoint: `POST /api/predict/batch` (score multiple projects)     | Backend Dev   | 6h    | Planned |
| 6.3 | Risk explanation text generation logic                                             | Backend Dev   | 10h   | Planned |
| 6.4 | Alert system (email notifications for critical risk projects)                      | Backend Dev   | 8h    | Planned |
| 6.5 | Frontend integration (call prediction API on project load)                         | Frontend Lead | 6h    | Planned |
| 6.6 | Risk score visualization (gauge chart, S-curve comparison)                         | Frontend Dev  | 10h   | Planned |
| 6.7 | PDF report generation (audit-ready export with satellite images)                   | Backend Dev   | 12h   | Planned |
| 6.8 | Model performance monitoring (log predictions, track accuracy)                     | ML Engineer   | 8h    | Planned |

**Week 6 Success Criteria:**

- ✅ Prediction API operational (<2s response time)
- ✅ 100 projects scored in batch (<30s total)
- ✅ PDF reports exportable with satellite evidence
- ✅ Email alerts sent for critical risk projects

---

### **3.7 Week 7: Integration & QA Testing (Days 43-49)**

#### **Objectives**

- End-to-end system integration
- Performance optimization
- Bug fixes and edge case handling

#### **Deliverables**

| ID  | Task                                                                                   | Owner         | Hours | Status  |
| --- | -------------------------------------------------------------------------------------- | ------------- | ----- | ------- |
| 7.1 | End-to-end testing (tender ingestion → geocoding → satellite → prediction → dashboard) | QA + Team     | 12h   | Planned |
| 7.2 | Performance optimization (database indexing, API caching)                              | Backend Lead  | 10h   | Planned |
| 7.3 | Error handling & validation (invalid GPS, missing data)                                | Backend Dev   | 10h   | Planned |
| 7.4 | Frontend UX refinement (loading states, error messages)                                | Frontend Lead | 10h   | Planned |
| 7.5 | Security hardening (API rate limiting, input sanitization)                             | Backend Lead  | 8h    | Planned |
| 7.6 | Documentation (API docs, setup guide, architecture diagrams)                           | Tech Writer   | 12h   | Planned |
| 7.7 | Load testing (simulate 1,000 concurrent dashboard users)                               | DevOps Lead   | 8h    | Planned |
| 7.8 | Bug triage & critical fixes                                                            | All Hands     | 16h   | Planned |

**Week 7 Success Criteria:**

- ✅ <2s page load time for dashboard
- ✅ API handles 100 req/s without errors
- ✅ Zero critical bugs remaining
- ✅ Documentation 90% complete

---

### **3.8 Week 8: Demo Preparation & Deployment (Days 50-56)**

#### **Objectives**

- Deploy to production environment
- Prepare hackathon demo
- Final QA and stakeholder preview

#### **Deliverables**

| ID  | Task                                                          | Owner           | Hours | Status  |
| --- | ------------------------------------------------------------- | --------------- | ----- | ------- |
| 8.1 | Production deployment (AWS EC2 auto-scaling, RDS Multi-AZ)    | DevOps Lead     | 10h   | Planned |
| 8.2 | Domain setup & SSL certificates (oneka.ai)                    | DevOps Lead     | 4h    | Planned |
| 8.3 | Demo script preparation (10-minute walkthrough)               | Product Manager | 8h    | Planned |
| 8.4 | Demo data curation (select 12 most compelling ghost projects) | Data Analyst    | 8h    | Planned |
| 8.5 | Pitch deck creation (technical architecture slides)           | Product Manager | 12h   | Planned |
| 8.6 | Video demo recording (backup in case of live demo issues)     | Frontend Lead   | 6h    | Planned |
| 8.7 | Stakeholder preview (invite OAG, Treasury for feedback)       | Project Lead    | 4h    | Planned |
| 8.8 | Final bug fixes & polish                                      | All Hands       | 16h   | Planned |

**Week 8 Success Criteria:**

- ✅ Production system live at https://oneka.ai
- ✅ Demo script rehearsed 3+ times
- ✅ 12 ghost projects flagged with <5% false positive rate
- ✅ Video backup recorded in 4K
- ✅ Positive feedback from OAG preview

---

## **4. Technical Approach Details**

### **4.1 Interoperability Engine**

#### **Problem Statement**

Kenya's government systems use different identifiers:

- PPIP: `KURA/RMLF/HQ/243/2024`
- IFMIS: Budget Vote `351`
- KMHFL: Facility Code `12345`

**Solution: Concordance Database**

```sql
CREATE TABLE projects (
    project_uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_name TEXT NOT NULL,
    sector VARCHAR(50),
    county VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE procurement_records (
    id SERIAL PRIMARY KEY,
    project_uuid UUID REFERENCES projects(project_uuid),
    ppip_tender_number VARCHAR(100) UNIQUE,
    contractor_name TEXT,
    contract_value NUMERIC(12,2),
    award_date DATE,
    ocds_json JSONB  -- Open Contracting Data Standard
);

CREATE TABLE geolocation_records (
    id SERIAL PRIMARY KEY,
    project_uuid UUID REFERENCES projects(project_uuid),
    kmhfl_facility_code VARCHAR(20),
    gps_latitude NUMERIC(10,8),
    gps_longitude NUMERIC(11,8),
    match_confidence NUMERIC(5,2),
    geom GEOMETRY(Point, 4326)  -- PostGIS
);
```

#### **Entity Resolution Algorithm**

```python
from rapidfuzz import process, fuzz

def resolve_entity(tender_description: str, facility_database: dict):
    """
    Match tender description to KMHFL facility using fuzzy logic.

    Args:
        tender_description: "Construction of Gituamba Level 2 Hospital"
        facility_database: {facility_id: facility_name} mapping

    Returns:
        {
            "facility_id": "12345",
            "facility_name": "Gituamba Dispensary",
            "confidence": 87.5,
            "coordinates": (-0.3456, 36.7890)
        }
    """
    # Extract potential facility names using NER
    candidates = extract_facility_names(tender_description)

    # Fuzzy match against KMHFL database
    best_match = None
    highest_score = 0

    for candidate in candidates:
        match = process.extractOne(
            candidate,
            facility_database.keys(),
            scorer=fuzz.token_set_ratio,
            score_cutoff=60  # Minimum 60% similarity
        )

        if match and match[1] > highest_score:
            best_match = match
            highest_score = match[1]

    if best_match:
        facility_id = facility_database[best_match[0]]
        return {
            "facility_id": facility_id,
            "confidence": highest_score,
            "status": "MATCHED" if highest_score >= 85 else "NEEDS_REVIEW"
        }

    # Fallback: Extract ward name, use centroid
    ward = extract_ward_name(tender_description)
    return {
        "ward": ward,
        "confidence": 40,
        "status": "WARD_FALLBACK"
    }
```

---

### **4.2 Predictive ML Model**

#### **Training Data Structure**

```python
# training_data.csv (30 projects × 24 months = 720 rows)
project_id,month,ndvi_mean,sar_backscatter,budget_spent_%,physical_progress_%,label
001,1,0.71,-12.4,5,0,SUCCESSFUL
001,2,0.68,-12.1,8,5,SUCCESSFUL
001,3,0.42,-10.2,15,15,SUCCESSFUL  # Clearing detected
001,4,0.31,-8.5,25,30,SUCCESSFUL   # Construction started
...
020,24,0.25,-4.2,100,95,SUCCESSFUL  # Completed

021,1,0.73,-12.8,8,0,GHOST
021,2,0.74,-12.7,22,0,GHOST  # High spending, no clearing
021,3,0.75,-12.9,35,0,GHOST  # Vegetation unchanged = ghost
...
```

#### **Feature Engineering**

```python
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression

def engineer_features(project_timeseries: pd.DataFrame) -> dict:
    """
    Extract 15+ ML features from 24-month satellite time-series.
    """
    features = {}

    # 1. NDVI Slope (rate of vegetation clearing)
    X = project_timeseries['month'].values.reshape(-1, 1)
    y = project_timeseries['ndvi_mean'].values
    reg = LinearRegression().fit(X, y)
    features['ndvi_slope'] = reg.coef_[0]

    # 2. Max NDVI Drop (largest single-month decrease)
    ndvi_diff = np.diff(y)
    features['ndvi_max_drop'] = abs(ndvi_diff.min()) if ndvi_diff.min() < 0 else 0

    # 3. NDVI Recovery Ratio (regrowth after initial clearing)
    clearing_idx = np.argmin(y)
    if clearing_idx < len(y) - 6:
        recovery = y[clearing_idx+6] - y[clearing_idx]
        features['ndvi_recovery_ratio'] = recovery / abs(y[0] - y[clearing_idx])
    else:
        features['ndvi_recovery_ratio'] = 0

    # 4. SAR Backscatter Increase (structure detection)
    sar_initial = project_timeseries['sar_backscatter'].iloc[:3].mean()
    sar_final = project_timeseries['sar_backscatter'].iloc[-3:].mean()
    features['sar_increase'] = sar_final - sar_initial

    # 5. Months to Clearing (time from award to NDVI drop >0.2)
    ndvi_drops = np.where(np.diff(y) < -0.2)[0]
    features['months_to_clearing'] = ndvi_drops[0] + 1 if len(ndvi_drops) > 0 else 24

    # 6. Progress Gap (financial vs physical)
    final_budget = project_timeseries['budget_spent_%'].iloc[-1]
    final_physical = project_timeseries['physical_progress_%'].iloc[-1]
    features['progress_gap'] = final_budget - final_physical

    # 7-15. Statistical features (std, mean, max, min of NDVI and SAR)
    features['ndvi_std'] = y.std()
    features['ndvi_mean'] = y.mean()
    features['sar_std'] = project_timeseries['sar_backscatter'].std()
    features['sar_mean'] = project_timeseries['sar_backscatter'].mean()
    # ... (9 more features)

    return features
```

#### **Model Training**

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score
import joblib

# Load training data
df_train = pd.read_csv('training_data.csv')

# Engineer features for each project
X_train = []
y_train = []

for project_id in df_train['project_id'].unique():
    project_data = df_train[df_train['project_id'] == project_id]
    features = engineer_features(project_data)
    X_train.append(list(features.values()))
    y_train.append(project_data['label'].iloc[0])  # SUCCESSFUL or GHOST

X_train = np.array(X_train)
y_train = np.array(y_train)

# Train Random Forest
model = RandomForestClassifier(
    n_estimators=100,
    max_depth=10,
    min_samples_split=5,
    random_state=42
)
model.fit(X_train, y_train)

# Cross-validation
scores = cross_val_score(model, X_train, y_train, cv=5)
print(f"Cross-val accuracy: {scores.mean():.2%} (+/- {scores.std():.2%})")

# Save model
joblib.dump(model, 'oneka_predictor_v1.pkl')
```

#### **Prediction API**

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib

app = FastAPI()
model = joblib.load('oneka_predictor_v1.pkl')

class ProjectFeatures(BaseModel):
    ndvi_slope: float
    ndvi_max_drop: float
    ndvi_recovery_ratio: float
    sar_increase: float
    months_to_clearing: int
    progress_gap: float
    # ... 9 more features

@app.post("/api/predict")
async def predict_risk(features: ProjectFeatures):
    """
    Predict project risk score (0-100).

    Returns:
        {
            "risk_score": 87,
            "risk_class": "CRITICAL",
            "confidence": 0.92,
            "explanation": [
                "No vegetation clearing after 8 months (expected: 2 months)",
                "SAR backscatter unchanged (no structures detected)",
                "Budget 35% spent but 0% physical progress"
            ]
        }
    """
    try:
        X = np.array([[
            features.ndvi_slope,
            features.ndvi_max_drop,
            # ... all features
        ]])

        # Predict
        prediction = model.predict(X)[0]  # "SUCCESSFUL" or "GHOST"
        probability = model.predict_proba(X)[0]

        # Convert to risk score
        risk_score = int(probability[1] * 100) if prediction == "GHOST" else int((1 - probability[0]) * 100)

        # Categorize
        if risk_score >= 81:
            risk_class = "CRITICAL"
        elif risk_score >= 61:
            risk_class = "HIGH"
        elif risk_score >= 31:
            risk_class = "MODERATE"
        else:
            risk_class = "LOW"

        # Generate explanation
        explanation = []
        if features.months_to_clearing > 6:
            explanation.append(f"No vegetation clearing after {features.months_to_clearing} months (expected: 2 months)")
        if features.sar_increase < 2:
            explanation.append("SAR backscatter unchanged (no structures detected)")
        if features.progress_gap > 20:
            explanation.append(f"Budget {features.progress_gap}% ahead of physical progress")

        return {
            "risk_score": risk_score,
            "risk_class": risk_class,
            "confidence": float(max(probability)),
            "explanation": explanation
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

---

### **4.3 Satellite Processing Pipeline**

#### **Multi-Layer Analysis**

```python
from satpy import Scene
from datetime import datetime, timedelta

def analyze_project_site(latitude: float, longitude: float,
                         start_date: str, end_date: str):
    """
    Analyze construction site using 4-layer satellite approach.

    Layers:
    1. NDVI (Normalized Difference Vegetation Index)
    2. SAR (Synthetic Aperture Radar backscatter)
    3. False Color Infrared (B08-B04-B03)
    4. NDWI (Normalized Difference Water Index)
    """
    results = {
        "ndvi_timeseries": [],
        "sar_timeseries": [],
        "change_detected": False,
        "change_date": None
    }

    # Define Area of Interest (500m buffer)
    aoi_geojson = create_buffer_polygon(latitude, longitude, radius_m=500)

    # 1. Process Sentinel-2 (Optical)
    s2_products = query_copernicus(
        product_type="S2MSI2A",
        aoi=aoi_geojson,
        start_date=start_date,
        end_date=end_date,
        cloud_cover="<20%"
    )

    for product in s2_products:
        scene = Scene(filenames=[product.path], reader='msi_safe')
        scene.load(['B04', 'B08', 'B03'])  # Red, NIR, Green

        # Calculate NDVI
        red = scene['B04'].values
        nir = scene['B08'].values
        ndvi = (nir - red) / (nir + red + 1e-8)
        ndvi_mean = ndvi.mean()

        # Calculate NDWI (water detection)
        green = scene['B03'].values
        ndwi = (green - nir) / (green + nir + 1e-8)
        ndwi_mean = ndwi.mean()

        results['ndvi_timeseries'].append({
            "date": product.sensing_time,
            "ndvi": float(ndvi_mean),
            "ndwi": float(ndwi_mean)
        })

    # 2. Process Sentinel-1 (SAR)
    s1_products = query_copernicus(
        product_type="S1_SLC",
        aoi=aoi_geojson,
        start_date=start_date,
        end_date=end_date
    )

    for product in s1_products:
        # PyroSAR processing (simplified)
        backscatter_vv = process_sar(product.path, polarization='VV')
        backscatter_mean = backscatter_vv.mean()

        results['sar_timeseries'].append({
            "date": product.sensing_time,
            "backscatter_vv": float(backscatter_mean)
        })

    # 3. Change Detection
    if len(results['ndvi_timeseries']) >= 2:
        baseline_ndvi = results['ndvi_timeseries'][0]['ndvi']
        current_ndvi = results['ndvi_timeseries'][-1]['ndvi']
        ndvi_change = abs(current_ndvi - baseline_ndvi)

        baseline_sar = results['sar_timeseries'][0]['backscatter_vv']
        current_sar = results['sar_timeseries'][-1]['backscatter_vv']
        sar_change = current_sar - baseline_sar

        # Thresholds calibrated on training data
        if ndvi_change > 0.2 or sar_change > 3:
            results['change_detected'] = True
            results['change_type'] = 'construction' if sar_change > 3 else 'clearing'

    return results
```

---

## **5. Risk Management**

### **5.1 Technical Risks**

| Risk                                             | Probability  | Impact   | Mitigation Strategy                                                                                                                                                                     |
| ------------------------------------------------ | ------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Satellite cloud cover blocks optical imagery** | High (60%)   | High     | Use Sentinel-1 SAR as primary (all-weather). NDWI filter for seasonal flooding false positives.                                                                                         |
| **ML model accuracy <75%**                       | Medium (30%) | Critical | Maintain human-in-loop for final audit decisions. Collect more training data in Week 3.                                                                                                 |
| **PPIP website blocks scraper (rate limiting)**  | Medium (40%) | Medium   | Implement exponential backoff (5s between requests), transparent User-Agent header identifying as OnekaBot, fallback to manual CSV upload. Seek official API access during pilot phase. |
| **AWS Textract cost overruns**                   | Low (20%)    | Medium   | Set daily budget alert at $50. Use pdfplumber for text-based PDFs, Textract only for scans.                                                                                             |
| **PyroSAR installation fails (SNAP dependency)** | Medium (35%) | Medium   | Pre-build Docker image with SNAP pre-installed. Budget 1 extra day for troubleshooting.                                                                                                 |
| **Google 3D Tiles API quota exceeded**           | Low (15%)    | Low      | Cache tiles in S3. Use OSM 2D fallback for demo if quota hit.                                                                                                                           |
| **KMHFL API downtime**                           | Low (20%)    | Low      | Cache full facility database locally (13K records = 5MB JSON). Weekly refresh only.                                                                                                     |
| **Database schema changes required**             | Medium (40%) | Low      | Use Alembic migrations from Week 1. Keep schema flexible with JSONB columns.                                                                                                            |

### **5.2 Operational Risks**

| Risk                                             | Probability  | Impact   | Mitigation Strategy                                                                                          |
| ------------------------------------------------ | ------------ | -------- | ------------------------------------------------------------------------------------------------------------ |
| **Training data labeling delays**                | Medium (35%) | High     | Start labeling in Week 1 (parallel to development). Hire temporary GIS analyst if behind schedule.           |
| **Team member unavailability**                   | Low (25%)    | Medium   | Cross-train team members. Document code extensively. Maintain 20% time buffer.                               |
| **Stakeholder feedback requires pivot**          | Low (20%)    | High     | Schedule OAG preview in Week 7 (1 week buffer for changes). Maintain modular architecture for easy swaps.    |
| **Demo environment crashes during presentation** | Low (15%)    | Critical | Pre-record 4K video backup. Test demo script on separate staging server. Have offline PDF as final fallback. |
| **Satellite data download too slow (network)**   | Medium (30%) | Low      | Pre-download all training data in Week 1. Use AWS Open Data S3 (no egress fees) instead of Copernicus API.   |

### **5.3 Legal/Compliance Risks**

| Risk                                                    | Probability  | Impact | Mitigation Strategy                                                                                                                                                                                                                                    |
| ------------------------------------------------------- | ------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Section 106B evidence admissibility challenged**      | Medium (40%) | High   | Partner with KSA for certification. Document full provenance chain. Use commercial imagery (Maxar) for high-stakes cases.                                                                                                                              |
| **Data privacy concerns (processing tender documents)** | Low (15%)    | Medium | Sanitize personal data on ingestion (drop phone numbers, emails, ID numbers). Store only public-interest data (project location, budget, contractor company names). Comply with Kenya Data Protection Act 2019 Section 25 (public interest exemption). |
| **PPIP scraping violates Terms of Service**             | Medium (30%) | Medium | Engage PPRA for official API access during pilot phase. Frame MVP scraping as "research" under fair use.                                                                                                                                               |

---

## **6. Success Metrics**

### **6.1 Technical KPIs**

| Metric                                  | Target (Week 8) | Measurement Method                      |
| --------------------------------------- | --------------- | --------------------------------------- |
| **Tender records processed**            | 100+            | Count in `procurement_records` table    |
| **Geocoding accuracy**                  | 85%+            | Manual validation of 25 random matches  |
| **ML model accuracy**                   | 80-85%          | 5-fold cross-validation on training set |
| **ML precision (true positives)**       | 75-80%          | Confusion matrix analysis               |
| **ML recall (ghost projects detected)** | 80-85%          | Confusion matrix analysis               |
| **Satellite data coverage**             | 95%+            | Projects with <20% cloud cover imagery  |
| **API response time**                   | <2 seconds      | `/api/predict` endpoint average         |
| **Dashboard load time**                 | <3 seconds      | First contentful paint (FCP)            |
| **System uptime**                       | 99%+            | CloudWatch monitoring (Week 8 only)     |
| **False positive rate**                 | <10%            | Manual validation vs OAG records        |

### **6.2 Business Impact KPIs**

| Metric                             | Target (Week 8) | Measurement Method                          |
| ---------------------------------- | --------------- | ------------------------------------------- |
| **Ghost projects flagged**         | 12+             | Projects with risk score >80%               |
| **Estimated fraud value detected** | KES 500M+       | Sum of contract values for flagged projects |
| **Cost per audit**                 | <KES 5,000      | Total AWS costs / 100 projects              |
| **Time per audit**                 | <48 hours       | Tender ingestion → risk score generation    |
| **Stakeholder demo satisfaction**  | 8/10+           | Post-demo survey (OAG, Treasury, PPRA)      |

### **6.3 Hackathon-Specific Metrics**

| Metric                                   | Target       | Validation                              |
| ---------------------------------------- | ------------ | --------------------------------------- |
| **Demo success (no crashes)**            | 100%         | Live presentation completion            |
| **Judges' technical questions answered** | 90%+         | Post-demo judge feedback                |
| **Code quality score**                   | B+ or higher | CodeClimate automated analysis          |
| **Documentation completeness**           | 90%+         | README, API docs, architecture diagrams |
| **GitHub stars (community interest)**    | 50+          | Public repository engagement            |

---

## **7. Expected Deliverables**

### **7.1 Core System Deliverables**

#### **1. ONEKA Backend API**

- **Technology**: FastAPI + PostgreSQL + PostGIS
- **Endpoints**:
  - `GET /api/projects` - List all projects
  - `GET /api/projects/{uuid}` - Project details
  - `POST /api/predict` - ML risk prediction
  - `POST /api/predict/batch` - Batch scoring
  - `GET /api/satellite/{uuid}` - Satellite time-series
  - `POST /api/upload/tender` - Manual tender upload
- **Database**: 6 tables, 100+ projects, 720+ satellite records
- **Deployment**: Dockerized, deployed on AWS EC2

#### **2. ONEKA Frontend Dashboard**

- **Technology**: React + TypeScript + CesiumJS
- **Features**:
  - 3D map with Google Photorealistic Tiles
  - 100 project pins color-coded by risk
  - Satellite heatmap overlays (NDVI, SAR)
  - Project detail panel with audit trail
  - Risk dashboard (sortable, filterable)
  - PDF report export
- **Deployment**: Static site on AWS S3 + CloudFront

#### **3. ML Prediction Model**

- **Format**: Joblib pickle file (`oneka_predictor_v1.pkl`)
- **Performance**: 80-85% accuracy, 75-80% precision
- **Features**: 15+ engineered from satellite time-series
- **Training Data**: 30 historical projects (720 monthly observations)
- **Validation**: 5-fold cross-validation results documented

#### **4. Satellite Processing Pipeline**

- **Capabilities**:
  - Sentinel-2 NDVI, NDWI, False Color
  - Sentinel-1 SAR VV backscatter
  - Change detection (Δ NDVI + Δ SAR)
  - GeoTIFF to XYZ tiles conversion
- **Output**: 100 projects × 4 layers × 24 months = 9,600 satellite analyses

### **7.2 Documentation Deliverables**

#### **1. Technical Documentation**

- **Architecture Diagram** (Mermaid + PNG export)
- **API Documentation** (OpenAPI/Swagger auto-generated)
- **Database Schema** (ERD diagram)
- **Setup Guide** (README.md with Docker commands)
- **Deployment Guide** (AWS infrastructure setup)

#### **2. User Documentation**

- **Auditor Guide** (How to interpret risk scores)
- **Dashboard Tutorial** (Video walkthrough)
- **Report Templates** (Sample audit reports)

#### **3. Research Documentation**

- **ML Model Report** (training process, evaluation metrics)
- **Satellite Provider Comparison** (Copernicus vs commercial)
- **KSA Integration Strategy** (partnership roadmap)
- **Interoperability Architecture** (concordance database design)

### **7.3 Demo & Presentation Deliverables**

#### **1. Live Demo Environment**

- **URL**: https://demo.oneka.ai
- **Test Account**: demo@oneka.ai / password
- **Demo Data**: 100 projects, 12 ghost projects pre-flagged
- **Uptime**: 99.9% during hackathon week

#### **2. Pitch Deck**

- **Format**: 15 slides (PDF + PowerPoint)
- **Content**:
  - Problem statement (1 slide)
  - Solution overview (2 slides)
  - Technical architecture (3 slides)
  - ML approach (2 slides)
  - Demo walkthrough (4 slides)
  - Impact & ROI (2 slides)
  - Team & roadmap (1 slide)

#### **3. Video Demo**

- **Duration**: 5 minutes
- **Format**: 4K MP4, screen recording with voiceover
- **Content**: Full end-to-end workflow (tender ingestion → ghost detection → alert)

#### **4. GitHub Repository**

- **Visibility**: Public
- **License**: MIT
- **Contents**:
  - Full source code (backend + frontend)
  - Docker Compose setup
  - Sample datasets (anonymized)
  - Jupyter notebooks (ML training)
  - Architecture diagrams

---

## **8. Post-MVP Roadmap (Beyond Week 8)**

### **Phase 2: Pilot Deployment (Months 3-6)**

**Goal**: Validate ONEKA in 2 counties with OAG partnership

**Milestones**:

- Deploy in Nairobi + Kiambu counties
- Monitor 50 active projects
- Validate ML predictions with field audits
- Refine model based on real-world feedback
- Establish legal precedent for Section 106B evidence

**Budget**: $15,000 (includes Planet SkySat for 15 verification taskings)

**Success Metric**: Prevent approval of 3+ fraudulent payment claims (>KES 50M total value)

---

### **Phase 3: National Scale (Months 7-12)**

**Goal**: Rollout to all 47 counties

**Milestones**:

- IFMIS official API integration (replace scraping)
- Scale to 1,000+ concurrent projects
- Implement hybrid satellite tier system (Copernicus + Planet)
- Train 50 county auditors on ONEKA
- Establish KSA as certification body

**Budget**: $175,500/year operational costs

**Success Metric**: Monitor 1,000+ projects, recover KES 5-10 billion in fraud

---

### **Phase 4: Advanced Features (Year 2)**

**Enhancements**:

- Quality assessment (beyond ghost detection, assess build quality)
- Contractor performance profiles (track success rates)
- Automated field audit scheduling (optimize auditor deployment)
- Mobile app (field auditors capture ground truth)
- Citizen reporting mechanism (crowdsourced intelligence)

**Expansion**:

- Adapt for Tanzania, Uganda (East African Community)
- Partner with AU, World Bank for continental rollout

---

## **9. Team Structure & Responsibilities**

### **Core Team (3 Engineers)**

#### **1. Backend Lead (Python/ML Specialist)**

**Responsibilities**:

- Database design & PostgreSQL setup
- FastAPI backend development
- ML model training & evaluation
- Satellite processing pipeline (Satpy, PyroSAR)
- AWS infrastructure management

**Key Deliverables**:

- Prediction API operational by Week 6
- ML model achieving 80%+ accuracy by Week 4
- Database with 100+ projects by Week 2

---

#### **2. Frontend Lead (React/GIS Specialist)**

**Responsibilities**:

- React dashboard development
- CesiumJS 3D visualization
- Google 3D Tiles integration
- Satellite overlay rendering
- UX/UI design

**Key Deliverables**:

- Interactive 3D map by Week 5
- Risk dashboard by Week 6
- PDF export functionality by Week 6

---

#### **3. DevOps/Full-Stack Engineer**

**Responsibilities**:

- Docker containerization
- AWS deployment (EC2, RDS, S3)
- CI/CD pipeline (GitHub Actions)
- PPIP web scraper
- OCR integration (AWS Textract)
- Entity resolution (RapidFuzz)

**Key Deliverables**:

- 100 tenders scraped by Week 1
- 85+ projects geocoded by Week 2
- Production deployment by Week 8

---

### **Extended Team (Part-Time/Contract)**

#### **4. Data Analyst (Part-Time, Weeks 1-3)**

**Responsibilities**:

- Identify 30 training projects from OAG reports
- Manual phase labeling using QGIS
- Training data CSV generation
- Demo data curation

**Key Deliverables**:

- 30 training projects identified by Week 1
- 720 satellite observations labeled by Week 2

---

#### **5. Technical Writer (Contract, Week 7)**

**Responsibilities**:

- API documentation (Swagger)
- User guides (auditor handbook)
- Architecture diagrams
- Setup/deployment guides

**Key Deliverables**:

- Complete documentation by Week 7

---

#### **6. Product Manager/Project Lead (Part-Time)**

**Responsibilities**:

- Stakeholder liaison (OAG, PPRA, Treasury)
- Demo script development
- Pitch deck creation
- Timeline management

**Key Deliverables**:

- OAG preview session by Week 7
- Pitch deck by Week 8

---

## **10. Budget Breakdown**

### **MVP Development Costs (8 Weeks)**

| Category              | Item                                  | Cost (USD)         |
| --------------------- | ------------------------------------- | ------------------ |
| **Infrastructure**    | AWS EC2 t3.medium (8 weeks)           | $35                |
|                       | AWS RDS PostgreSQL db.t3.micro        | $12                |
|                       | AWS S3 storage (15GB satellite tiles) | $0.35              |
|                       | AWS Textract (100 PDF pages × 2)      | $13                |
|                       | AWS CloudFront (CDN)                  | $2                 |
|                       | Domain registration (oneka.ai)        | $12                |
|                       | SSL certificate                       | $0 (Let's Encrypt) |
| **Development**       | Copernicus satellite data             | $0 (free)          |
|                       | ML training compute (20 hours)        | $2                 |
|                       | GitHub Pro (team collaboration)       | $0 (free tier)     |
| **Subtotal**          |                                       | **$76.35**         |
| **Contingency (20%)** |                                       | **$15.27**         |
| **TOTAL MVP COST**    |                                       | **$91.62**         |

### **Annual Production Costs (Post-MVP)**

| Category             | Item                                | Cost (USD/year) |
| -------------------- | ----------------------------------- | --------------- |
| **Infrastructure**   | AWS EC2 t3.large (auto-scaling)     | $600            |
|                      | AWS RDS Multi-AZ                    | $1,200          |
|                      | AWS S3 storage (100GB)              | $28             |
|                      | AWS Textract (10K pages)            | $650            |
|                      | CloudFront CDN                      | $120            |
| **Satellite Data**   | Copernicus (monitoring)             | $0              |
|                      | Planet PlanetScope (50 sites daily) | $5,000          |
|                      | Planet SkySat (150 taskings)        | $120,000        |
|                      | Maxar WorldView (10 legal cases)    | $50,000         |
| **TOTAL PRODUCTION** |                                     | **$177,598**    |

**ROI Calculation**:

- Cost: $177,598/year
- Ghost projects flagged: 50/year × KES 200M average = KES 10B = $77M
- Recovery (30% conservative): $23M
- **ROI: 130:1** (every $1 spent recovers $130 in fraud)

---

## **11. Legal Compliance & Data Protection**

### **11.1 Legal Framework Overview**

ONEKA AI operates at the intersection of public accountability and data protection. As a GovTech auditing platform, our legal strategy leverages **"public interest" exemptions** while maintaining strict compliance with Kenya's data protection and cybercrime legislation.

#### **Applicable Kenyan Legislation**

| Act                                                                         | Relevance to ONEKA                               | Compliance Strategy                                            |
| --------------------------------------------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------- |
| **Access to Information Act (2016)**                                        | Grants right to access public sector information | Primary legal basis for data collection                        |
| **Data Protection Act (2019)**                                              | Regulates processing of personal data            | "Sanitize on ingestion" - drop all personal identifiers        |
| **Kenya Information and Communications Act (1998) - Cybercrimes Amendment** | Prohibits unauthorized access, DDoS attacks      | Transparent user-agent, rate limiting, no system circumvention |
| **Copyright Act (2001)**                                                    | Protects government-published works              | Attribution to source, fair use for public accountability      |
| **Public Procurement and Asset Disposal Act (2015)**                        | Mandates transparency in procurement             | Aligns with ONEKA's audit mission                              |

---

### **11.2 Public Interest Defense: Access to Information Act (2016)**

#### **Legal Foundation**

**Section 4(1)** of the Access to Information Act states:

> _"Every citizen has the right of access to information held by the State or any other public body."_

**Section 6** defines "information" to include:

> _"Records, documents, data... relating to the conduct of the affairs of the State or public body."_

#### **ONEKA's Position**

✅ **Procurement records** (PPIP, tenders.go.ke) are **Public Sector Information (PSI)**  
✅ **Budget execution reports** (Controller of Budget) are **mandated public disclosures**  
✅ **KMHFL facility data** is **publicly accessible via government API**  
✅ **ONEKA's mission** (infrastructure audit for taxpayer accountability) constitutes **"public interest"**

#### **Legal Justification Statement**

> _"ONEKA AI collects and analyzes publicly-disclosed government procurement and budget data to detect ghost projects and promote fiscal accountability. This activity is protected under Section 4 of the Access to Information Act (2016) as the exercise of citizens' constitutional right to information on public affairs. ONEKA does not scrape for commercial gain but to fulfill the public interest mandate of transparency in public expenditure."_

---

### **11.3 Data Protection Act (2019) Compliance**

#### **The "Sanitize on Ingestion" Strategy**

To avoid becoming a **"Data Controller"** of personal data under Section 2 of the DPA, ONEKA implements automatic data sanitization:

| Data Type                      | ONEKA Handling                                 | DPA Compliance                         |
| ------------------------------ | ---------------------------------------------- | -------------------------------------- |
| **Project GPS Coordinates**    | ✅ Store (public infrastructure, not personal) | Not personal data under Section 2(1)   |
| **Tender Budget Amount**       | ✅ Store (public financial data)               | Public interest exemption (Section 25) |
| **Contractor Company Name**    | ✅ Store (public legal entity)                 | Not personal data (corporate entity)   |
| **Project Description**        | ✅ Store (public record)                       | Public interest exemption              |
| **Contractor Phone Numbers**   | ❌ Drop on ingestion (regex filter)            | Avoid processing personal data         |
| **Contractor Email Addresses** | ❌ Drop on ingestion                           | Avoid processing personal data         |
| **Project Manager Names**      | ❌ Drop on ingestion                           | Avoid processing personal data         |
| **ID/Passport Numbers**        | ❌ Drop on ingestion                           | Sensitive personal data (Section 2)    |

#### **Technical Implementation: Personal Data Filter**

```python
import re

def sanitize_tender_data(raw_data: dict) -> dict:
    """
    Remove personal identifiers before database insertion.
    Compliance: Kenya Data Protection Act 2019, Section 25.
    """
    sanitized = raw_data.copy()

    # Drop phone numbers (regex: +254... or 07...)
    phone_pattern = r'(\+254|0)[17]\d{8}'

    # Drop email addresses
    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'

    # Drop ID numbers (8-digit patterns)
    id_pattern = r'\b\d{8}\b'

    for key, value in sanitized.items():
        if isinstance(value, str):
            # Redact patterns
            value = re.sub(phone_pattern, '[REDACTED]', value)
            value = re.sub(email_pattern, '[REDACTED]', value)
            value = re.sub(id_pattern, '[REDACTED]', value)
            sanitized[key] = value

    # Drop entire fields that are personal
    personal_fields = ['contractor_phone', 'contractor_email',
                      'contact_person', 'id_number', 'passport_number']
    for field in personal_fields:
        sanitized.pop(field, None)

    return sanitized
```

#### **Section 25 Public Interest Exemption**

The DPA Section 25(1)(d) states:

> _"The restrictions under this Act shall not apply to processing... necessary for the performance of a task carried out in the public interest."_

**ONEKA's Claim**: Auditing public infrastructure to detect ghost projects is a **"task carried out in the public interest"** analogous to investigative journalism and civil oversight.

---

### **11.4 Cybercrimes Act Compliance: "White Hat" Web Scraping**

#### **Legal Risks Under Kenya Information and Communications Act**

**Section 4 (Unauthorized Access)**: Up to 10 years imprisonment for accessing a system without authorization.

**Section 4A (Unauthorized Interference)**: Penalties for disrupting computer systems (including DDoS).

#### **ONEKA's "White Hat Protocol"**

To avoid unauthorized access claims, ONEKA implements:

##### **1. Transparent User-Agent Identification**

```python
import requests

headers = {
    'User-Agent': 'OnekaBot/1.0 (+https://oneka.ai/bot-policy; '
                  'purpose: public_infrastructure_audit; '
                  'contact: legal@oneka.ai)',
    'Accept': 'text/html,application/json',
    'Accept-Language': 'en-US,en;q=0.9',
}

response = requests.get('https://tenders.go.ke/website/tenders',
                       headers=headers,
                       timeout=30)
```

**Legal Protection**: Transparent identification shows good faith. If the website operator objects, they can contact us (not claim "unauthorized intrusion").

##### **2. Aggressive Rate Limiting**

```python
import time
import random

def fetch_tender_page(url: str):
    """
    Fetch with rate limiting to avoid DDoS classification.
    Cybercrimes Act compliance: Section 4A prevention.
    """
    # Random delay 3-7 seconds (average 5s = 720 requests/hour)
    time.sleep(random.uniform(3.0, 7.0))

    try:
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        return response.text
    except requests.exceptions.HTTPError as e:
        if e.response.status_code == 429:  # Too Many Requests
            print("Rate limit hit. Backing off for 60 seconds.")
            time.sleep(60)
            return fetch_tender_page(url)  # Retry
        else:
            raise
```

**Legal Protection**: 5-second intervals = 12 requests/minute, indistinguishable from slow human browsing. Not a DDoS attack.

##### **3. Respect for robots.txt**

```python
from urllib.robotparser import RobotFileParser

def check_robots_txt(base_url: str, target_path: str) -> bool:
    """
    Check if scraping is allowed by robots.txt.
    """
    rp = RobotFileParser()
    rp.set_url(f"{base_url}/robots.txt")
    rp.read()

    return rp.can_fetch('OnekaBot', target_path)

# Usage
if not check_robots_txt('https://tenders.go.ke', '/website/tenders'):
    print("Scraping disallowed by robots.txt. Seeking API access.")
    # Fallback: Manual CSV upload or contact PPRA for official access
```

##### **4. No Circumvention of Security Measures**

❌ **ONEKA will NOT**:

- Breach login walls (scrape authenticated pages without credentials)
- Bypass CAPTCHA using automated solvers
- Spoof IP addresses to circumvent rate limits
- Exploit vulnerabilities (SQL injection, XSS)

✅ **ONEKA will ONLY**:

- Scrape publicly accessible pages (no authentication required)
- Respect HTTP 429 (Too Many Requests) responses
- Use official APIs when available (KMHFL API preferred over scraping)

---

### **11.5 Copyright Act (2001) Compliance: Attribution**

#### **Fair Use for Public Accountability**

**Section 26(1)(viii)** of the Copyright Act allows reproduction for:

> _"The reporting of current events or current affairs."_

**ONEKA's Position**: Auditing ongoing infrastructure projects constitutes "reporting of current affairs" in the public interest, analogous to investigative journalism.

#### **Attribution Requirements**

```python
# Database: Add source attribution field
CREATE TABLE procurement_records (
    id SERIAL PRIMARY KEY,
    tender_number VARCHAR(100),
    data_source VARCHAR(255) DEFAULT 'Public Procurement Information Portal (tenders.go.ke)',
    data_access_date TIMESTAMP DEFAULT NOW(),
    -- other fields
);
```

**Dashboard Display**:

> _"Data sourced from the Public Procurement Information Portal (tenders.go.ke), accessed January 2026. Used under the Access to Information Act (2016) for public accountability purposes."_

---

### **11.6 Geospatial Data: Special Legal Status**

#### **Why GPS Coordinates Are Legally Safe**

**DPA Section 2 Definition of Personal Data**:

> _"Information relating to an identified or identifiable natural person."_

**Legal Analysis**:

- GPS coordinates of a **bridge** (lat: -1.2864, lon: 36.8172) → ✅ **Not personal data** (public infrastructure)
- GPS coordinates of a **person's home** → ❌ **Personal data** (identifies residence)

**ONEKA's Safeguard**: We only process coordinates of **public infrastructure assets** (hospitals, schools, roads, water systems), never private residences.

#### **The "Linkage Risk" Mitigation**

**Scenario**: A tender states "Construction of dispensary at Chief John Kamau's compound."

**Risk**: Linking GPS coordinates to a named individual's property = potential doxing.

**Mitigation**:

```python
def validate_gps_coordinates(lat: float, lon: float, project_name: str) -> dict:
    """
    Ensure GPS points to public infrastructure, not private residence.
    """
    # Check if coordinates match known public facility (KMHFL database)
    facility = kmhfl_lookup(lat, lon, radius_m=500)

    if facility:
        return {"status": "VERIFIED_PUBLIC", "facility": facility}

    # Check if project_name contains personal identifiers
    personal_indicators = ['Chief', 'Mr.', 'Mrs.', 'Dr.', "'s compound", "'s land"]
    if any(indicator in project_name for indicator in personal_indicators):
        return {"status": "NEEDS_REVIEW", "reason": "Potential personal property linkage"}

    return {"status": "APPROVED"}
```

---

### **11.7 API vs. Scraping: Legal Hierarchy**

#### **Preferred Data Access Methods (Legal Safety)**

| Method                               | Legal Risk                                 | Technical Effort | ONEKA Strategy                                       |
| ------------------------------------ | ------------------------------------------ | ---------------- | ---------------------------------------------------- |
| **Official Government API**          | ✅ Minimal (authorized access)             | Low              | **Preferred**: Use KMHFL API (already implemented)   |
| **Public Data Download (CSV/Excel)** | ✅ Minimal (intended distribution)         | Low              | **Preferred**: COB reports often available as Excel  |
| **Web Scraping (Public Pages)**      | ⚠️ Moderate (requires compliance measures) | Medium           | **Acceptable**: PPIP tenders with White Hat Protocol |
| **Web Scraping (Login-Protected)**   | ❌ High (unauthorized access risk)         | High             | **Avoid**: Do not scrape authenticated IFMIS pages   |

#### **ONEKA's Data Source Strategy**

1. **KMHFL API** (✅ Implemented Week 1): Official REST API, zero legal risk
2. **PPIP Web Scraping** (⚠️ Implemented Week 1): Public pages only, White Hat Protocol
3. **COB Reports** (✅ Manual Download): PDF reports published quarterly, public domain
4. **IFMIS** (❌ Not Scraped): Login-protected system, seek official partnership in pilot phase

---

### **11.8 Legal Risk Mitigation: Engagement Strategy**

#### **Pre-Pilot Phase (Week 8)**

**Action**: Send formal letter to Public Procurement Regulatory Authority (PPRA)

**Template**:

> _Dear PPRA Director,_
>
> _ONEKA AI is developing an infrastructure audit platform to detect ghost projects using satellite verification. We are currently accessing public tender data from tenders.go.ke for prototype development under the Access to Information Act (2016)._
>
> _We request:_
> _1. Confirmation that our data collection complies with your Terms of Service_
> _2. Access to official API endpoints (if available) to reduce server load_
> _3. Partnership consideration for pilot phase deployment with the Office of the Auditor General_
>
> _Our scraper operates transparently (User-Agent: OnekaBot) and respects rate limits (5-second intervals). We process only non-personal data (project locations, budgets, contractor company names) and sanitize any personal identifiers._
>
> _Sincerely,_  
> _ONEKA AI Development Team_

#### **Pilot Phase (Month 3-6)**

**Action**: Establish Memorandum of Understanding (MOU) with OAG

**Key Clauses**:

- ONEKA operates as "technical service provider" to OAG (government agent status)
- Data access authorized under OAG's constitutional audit mandate (Article 229, Constitution of Kenya)
- Data sharing agreement for PPIP/IFMIS access via official channels

#### **Production Phase (Month 9+)**

**Action**: Integrate with Government Common Core Services (GCCS) platform

**Long-term Goal**: Position ONEKA as official audit infrastructure, eliminating "scraping" entirely through authorized API access.

---

### **11.9 Data Retention & Deletion Policy**

#### **DPA Section 27: Data Minimization**

> _"Personal data shall be kept in a form which permits identification of data subjects for no longer than is necessary."_

#### **ONEKA's Policy**

| Data Type                               | Retention Period               | Justification                               |
| --------------------------------------- | ------------------------------ | ------------------------------------------- |
| **Tender Records**                      | 7 years                        | Matches Public Procurement Act audit period |
| **Satellite Imagery**                   | 10 years                       | Historical baseline for change detection    |
| **ML Predictions**                      | Indefinite (anonymized)        | Research and model improvement              |
| **Accidentally Captured Personal Data** | <24 hours (immediate deletion) | DPA compliance - data breach mitigation     |

#### **"Right to Be Forgotten" Exception**

**DPA Section 35**: Data subjects can request erasure UNLESS processing is necessary for:

> _(c) Compliance with a legal obligation_  
> _(e) The performance of a task carried out in the public interest_

**ONEKA's Position**: Under OAG partnership, audit records are retained for legal obligation (Article 229) and public interest.

---

### **11.10 Legal Compliance Checklist**

#### **Pre-Deployment (Week 8)**

- [ ] User-Agent header identifies ONEKA transparently
- [ ] Rate limiting implemented (5-second intervals)
- [ ] Personal data sanitization filter tested (regex patterns)
- [ ] robots.txt checker integrated
- [ ] Data attribution footer added to dashboard
- [ ] Legal justification statement published at oneka.ai/legal
- [ ] PPRA engagement letter drafted

#### **Pilot Phase (Month 3)**

- [ ] MOU signed with Office of the Auditor General
- [ ] Data Protection Impact Assessment (DPIA) completed
- [ ] Data retention policy documented
- [ ] Privacy policy published (even though minimal personal data processed)
- [ ] Incident response plan for accidental personal data capture

#### **Production Phase (Month 9)**

- [ ] PPRA API access granted (eliminate scraping)
- [ ] KSA partnership formalized (certification authority)
- [ ] Section 106B evidence admissibility precedent established
- [ ] Annual DPA compliance audit scheduled

---

### **11.11 Conclusion: Legal Defensibility**

ONEKA AI's legal strategy is built on three pillars:

1. **Public Interest Foundation**: Access to Information Act (2016) grants constitutional right to procurement data
2. **Data Minimization**: DPA compliance through automated personal data sanitization
3. **Transparent Operations**: White Hat Protocol prevents Cybercrimes Act violations

By positioning ONEKA as a **public accountability tool** (not a commercial scraper) and partnering with government entities (OAG, KSA), we transform potential legal risks into institutional strengths.

**Key Differentiator**: Unlike commercial data brokers, ONEKA:

- ✅ Operates in **public interest** (not profit motive)
- ✅ Processes **zero personal data** (by design)
- ✅ Seeks **official partnerships** (not adversarial scraping)
- ✅ Provides **court-admissible evidence** (under Section 106B)

This legal architecture ensures ONEKA can scale from MVP to national infrastructure without regulatory barriers.

---

## **12. Conclusion**

This technical roadmap provides a comprehensive, executable plan to deliver ONEKA AI's MVP in 8 weeks. By focusing on three core innovations—**interoperability** (concordance database), **prediction** (ML trained on satellite archives), and **verification** (multi-layer satellite analysis)—ONEKA will demonstrate a paradigm shift in infrastructure auditing.

### **Why This Roadmap is Achievable**

✅ **Realistic scope**: Uses proven technologies (PostgreSQL, FastAPI, React, scikit-learn)  
✅ **Budget-conscious**: $92 total cost using free Copernicus satellite data  
✅ **Modular architecture**: Components can be developed in parallel  
✅ **Risk mitigation**: 20% time buffer, fallback strategies for all critical risks  
✅ **Clear success metrics**: Quantifiable KPIs at each milestone

### **Expected Impact**

By Week 8, ONEKA will:

- **Process 100 tenders** automatically from PPIP
- **Geolocate 85+ projects** with 85%+ accuracy
- **Flag 12+ ghost projects** with ML-backed risk scores
- **Demonstrate 48-hour audit cycle** vs 18-month traditional approach
- **Prove 99% cost reduction** (KES 5K vs KES 2M per audit)

### **Call to Action**

This roadmap is ready for **immediate execution**. With a committed team and stakeholder support from the Office of the Auditor General, ONEKA can transform Kenya's infrastructure accountability within 8 weeks.

---

**Document Status**: Final v1.0  
**Next Review**: Week 4 (Day 28) milestone retrospective  
**Contact**: technical@oneka.ai  
**GitHub**: github.com/oneka-ai

---

_ONEKA AI: Transforming Infrastructure Auditing from Reactive Investigation to Proactive Prevention_
