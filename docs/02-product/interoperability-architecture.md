# ONEKA AI: Interoperability Layer Architecture

## Linking Procurement, Finance, and Physical Progress for Total Infrastructure Transparency

---

## Executive Summary

**The Core Problem**: Kenya's infrastructure audit challenge isn't just about finding ghost projects—it's about the **complete disconnect** between three critical data streams:

1. **Procurement Data** (tenders.go.ke, egpkenya.go.ke): WHO won the contract and for HOW MUCH
2. **Financial Data** (cob.go.ke, National Treasury, IFMIS): HOW MUCH was actually disbursed and WHEN
3. **Physical Data** (Satellite imagery): WHAT was actually built on the ground

**The ONEKA Solution**: Act as the **interoperability hub** that creates a unified "Project Truth Record" by reconciling these disparate systems, enabling the critical question: **"Does the money spent match the physical progress observed?"**

**TL;DR**: ONEKA builds a "Rosetta Stone" database that links tender IDs → budget line items → disbursement records → GPS coordinates → satellite change detection, creating Kenya's first end-to-end infrastructure accountability system.

---

## 1. The Interoperability Challenge: Why Government Data Doesn't Talk

### 1.1 The Current Reality: Data Silos

| Government System                    | Purpose                    | Identifier Type                             | Accessibility             | Data Quality                 |
| ------------------------------------ | -------------------------- | ------------------------------------------- | ------------------------- | ---------------------------- |
| **PPIP (tenders.go.ke)**             | Tender publication         | Tender Number (e.g., KURA/RMLF/HQ/243/2024) | ✅ Public HTML (no API)   | Medium (OCR needed for PDFs) |
| **eGP Kenya (egpkenya.go.ke)**       | E-procurement portal       | Contract ID                                 | ⚠️ Requires vendor login  | High (structured database)   |
| **IFMIS**                            | Financial management       | Vote Head + Sub-Vote + Project Code         | ❌ Restricted to Treasury | High (Oracle database)       |
| **Controller of Budget (cob.go.ke)** | Budget execution oversight | Department + Vote + Ministry                | ✅ Public PDFs            | Low (image-based tables)     |
| **National Treasury**                | Budget allocation          | Ministry + Programme + Activity             | ✅ Public Excel/PDF       | Medium (inconsistent naming) |
| **County Governments (47 systems)**  | Devolved fund tracking     | County Project ID                           | ⚠️ Varies by county       | Very Low (manual reports)    |
| **Ministry of Health (KMHFL)**       | Health facility registry   | Facility Code (e.g., 12345)                 | ✅ Public API             | High (GPS verified)          |
| **Ministry of Education**            | School registry            | NEMIS Code                                  | ⚠️ Public but unstable    | Medium (GPS incomplete)      |

**The Problem**: There is **NO unified Project ID** that connects a tender award → to its budget line → to its disbursements → to its physical location → to satellite verification.

**Example of the Chaos**:

- **PPIP Tender**: "KENYA POWER/2024/0156 - Construction of Thika Sub-Station Extension"
- **Treasury Budget**: "Vote 276 - Ministry of Energy: Development Vote - Sub-Vote 2261.4 - Transmission Infrastructure"
- **COB Report**: "Energy & Petroleum: KSh 245M disbursed Q2 2024 under REA Grid Extension Programme"
- **Physical Reality**: GPS coordinates unknown, project could be in Thika, Kiambu, or nowhere

**ONEKA's Mission**: Create the missing links between these systems.

---

### 1.2 Why This Matters: The Financial vs Physical Gap

**Scenario: The Ghost Health Centre**

1. **Procurement Record (tenders.go.ke)**:
   - Tender: MOH/NCPD/2023/0089
   - Project: "Construction of Githurai Level 4 Hospital"
   - Award Date: March 2023
   - Contract Sum: **KES 450,000,000** ($3.46M USD)
   - Contractor: ABC Construction Ltd.

2. **Financial Record (Controller of Budget BIRR)**:
   - Vote Head: 351 (Ministry of Health)
   - Sub-Vote: Development Expenditure
   - Q1 2023: KES 45M released (10% mobilization)
   - Q2 2023: KES 90M released (foundation phase)
   - Q3 2023: KES 135M released (superstructure)
   - **Total Disbursed: KES 270M (60% of contract)**

3. **Physical Reality (Satellite Analysis)**:
   - GPS Location: Unknown (tender document has no coordinates)
   - ONEKA Geolocation: Fuzzy matched to "Githurai Ward" centroid
   - Sentinel-2 NDVI Analysis (March 2023 → January 2026):
     - **NDVI Change: +0.05** (vegetation INCREASED, indicating NO land clearing)
     - **Sentinel-1 SAR Backscatter: -12 dB** (bare soil, no structures detected)
   - Google 3D Tiles: No new buildings visible in area

**The Disconnect**: Treasury shows KES 270M paid (60% complete) → Satellite shows 0% physical progress → **KES 270M UNACCOUNTED FOR**

**Without ONEKA**: An auditor would need to:

1. Manually search tenders.go.ke for project (30 minutes)
2. Read COB PDF reports to find health budget (1 hour)
3. Request IFMIS access from Treasury (weeks/impossible)
4. Drive to Githurai to physically inspect site (4 hours + transport)
5. **Total Time: 2-3 days per project**

**With ONEKA**:

- Enter "Githurai Hospital" in search bar
- System returns unified project card in **5 seconds**:
  - Tender details + contract PDF
  - Financial disbursement timeline (KES 270M / 60%)
  - GPS location (confidence score: 75%)
  - Satellite imagery showing no construction
  - **Risk Flag: HIGH - Financial progress exceeds physical progress by 60 percentage points**

---

## 2. ONEKA Architecture: The Concordance Database Strategy

### 2.1 The Core Concept: Project UUID as the Universal Link

Since we cannot force the government to adopt a unified ID, ONEKA creates its own **internal Project UUID** and builds a **Concordance Table** (like a translation dictionary) that maps external IDs to this UUID.

```
┌─────────────────────────────────────────────────────────────────┐
│                    ONEKA Project UUID:                          │
│             550e8400-e29b-41d4-a716-446655440000                │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  PROCUREMENT     │  │    FINANCIAL     │  │    PHYSICAL      │
│                  │  │                  │  │                  │
│ Tender Number:   │  │ Vote Head: 351   │  │ Facility Code:   │
│ MOH/NCPD/2023/   │  │ Sub-Vote: 2261   │  │ KMHFL-12345      │
│ 0089             │  │ Project: Dev-089 │  │                  │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

### 2.2 Database Schema: The Concordance Architecture

#### Core Tables

**projects** (The Master Registry)

```sql
CREATE TABLE projects (
    project_uuid UUID PRIMARY KEY,
    project_name TEXT NOT NULL,
    project_type VARCHAR(50),  -- 'health', 'education', 'roads', 'water'
    county VARCHAR(50),
    estimated_value_kes DECIMAL(15,2),
    status VARCHAR(20),  -- 'awarded', 'ongoing', 'completed', 'abandoned'
    confidence_score INTEGER,  -- 0-100 (quality of data linkage)
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

**procurement_records** (Tender Data)

```sql
CREATE TABLE procurement_records (
    procurement_id SERIAL PRIMARY KEY,
    project_uuid UUID REFERENCES projects(project_uuid),
    source_system VARCHAR(50),  -- 'PPIP', 'eGP', 'KeNHA', 'KURA'
    tender_number TEXT UNIQUE NOT NULL,
    tender_title TEXT,
    procuring_entity TEXT,
    contract_sum_kes DECIMAL(15,2),
    award_date DATE,
    contractor_name TEXT,
    contractor_pin VARCHAR(20),
    document_url TEXT,
    raw_ocr_text TEXT,  -- Full extracted text for searchability
    data_quality INTEGER  -- 0-100 score
);
```

**financial_records** (Budget & Disbursement Data)

```sql
CREATE TABLE financial_records (
    financial_id SERIAL PRIMARY KEY,
    project_uuid UUID REFERENCES projects(project_uuid),
    source_system VARCHAR(50),  -- 'COB', 'Treasury', 'IFMIS', 'County'
    fiscal_year VARCHAR(10),  -- '2023/2024'
    vote_head INTEGER,
    sub_vote INTEGER,
    ministry TEXT,
    department TEXT,
    budget_allocated_kes DECIMAL(15,2),
    budget_released_kes DECIMAL(15,2),
    budget_absorbed_kes DECIMAL(15,2),
    absorption_rate DECIMAL(5,2),  -- Calculated percentage
    reporting_period VARCHAR(20),  -- 'Q1 2024', 'FY 2023/24'
    document_source TEXT,  -- URL to COB PDF
    extracted_at TIMESTAMP
);
```

**geolocation_records** (Physical Location Data)

```sql
CREATE TABLE geolocation_records (
    geolocation_id SERIAL PRIMARY KEY,
    project_uuid UUID REFERENCES projects(project_uuid),
    source_system VARCHAR(50),  -- 'KMHFL', 'MOE', 'Cadastral', 'Manual'
    facility_code VARCHAR(50),  -- External system's ID
    facility_name TEXT,
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    geom GEOMETRY(Point, 4326),  -- PostGIS spatial column
    match_confidence INTEGER,  -- 0-100 fuzzy match score
    match_method VARCHAR(50),  -- 'exact', 'fuzzy', 'ward_fallback', 'manual'
    verified BOOLEAN DEFAULT FALSE,
    verified_by VARCHAR(100),
    verified_at TIMESTAMP
);
```

**satellite_analyses** (Remote Sensing Results)

```sql
CREATE TABLE satellite_analyses (
    analysis_id SERIAL PRIMARY KEY,
    project_uuid UUID REFERENCES projects(project_uuid),
    sensor VARCHAR(20),  -- 'Sentinel-1', 'Sentinel-2', 'SkySat'
    acquisition_date DATE,
    analysis_type VARCHAR(50),  -- 'NDVI_change', 'SAR_backscatter', 'RGB_inspection'
    baseline_value DECIMAL(10,4),
    current_value DECIMAL(10,4),
    change_magnitude DECIMAL(10,4),
    change_detected BOOLEAN,
    interpretation TEXT,  -- 'Construction detected', 'No change', 'Vegetation regrowth'
    image_url TEXT,  -- S3 link to processed GeoTIFF
    thumbnail_url TEXT,
    analyzed_at TIMESTAMP
);
```

**entity_resolution_links** (The Concordance/Translation Table)

```sql
CREATE TABLE entity_resolution_links (
    link_id SERIAL PRIMARY KEY,
    project_uuid UUID REFERENCES projects(project_uuid),
    external_system VARCHAR(50),
    external_id TEXT,
    external_name TEXT,
    match_confidence INTEGER,
    match_algorithm VARCHAR(50),  -- 'rapidfuzz', 'manual', 'NER'
    created_by VARCHAR(50),  -- 'system', 'user_email'
    created_at TIMESTAMP
);
```

---

### 2.3 Data Ingestion Pipelines: How Data Flows Into ONEKA

#### Pipeline 1: Procurement Data Ingestion

**Source Systems:**

1. **PPIP (tenders.go.ke)**: HTML scraping + PDF extraction
2. **eGP Kenya (egpkenya.go.ke)**: Future API integration (currently manual)
3. **KeNHA/KURA/REA**: Individual agency portals (scraping)

**Technical Stack:**

- **Scraper**: Python `requests` + `beautifulsoup4` for HTML
- **OCR**: AWS Textract for image-based PDFs ($0.0015/page)
- **NLP**: spaCy for Named Entity Recognition (extract contractor names, amounts)
- **Scheduler**: AWS Lambda (triggered weekly by EventBridge cron)

**Workflow:**

```python
def ingest_ppip_tenders():
    """Weekly ingestion of new tenders from PPIP"""

    # Step 1: Scrape tender listings
    BASE_URL = "https://tenders.go.ke/website/tenders/search"
    params = {
        'category': 'Construction',
        'status': 'Awarded',
        'dateFrom': get_last_week_date()
    }
    response = requests.post(BASE_URL, data=params)
    tender_links = parse_tender_urls(response.html)

    # Step 2: Download tender documents
    for tender_url in tender_links:
        pdf_url = extract_pdf_link(tender_url)
        pdf_content = download_pdf(pdf_url)

        # Step 3: OCR if needed
        if is_image_based_pdf(pdf_content):
            text = aws_textract_extract(pdf_content)
        else:
            text = pdfplumber_extract(pdf_content)

        # Step 4: Parse structured data
        tender_data = {
            'tender_number': extract_tender_number(text),
            'tender_title': extract_title(text),
            'contract_sum': extract_amount(text),  # Regex for "KES XX,XXX,XXX"
            'contractor_name': extract_contractor(text),  # spaCy NER
            'award_date': extract_date(text),
            'raw_text': text
        }

        # Step 5: Create or update project
        project_uuid = get_or_create_project(tender_data)

        # Step 6: Store procurement record
        db.procurement_records.insert({
            'project_uuid': project_uuid,
            'source_system': 'PPIP',
            **tender_data
        })

        # Step 7: Trigger geolocation resolution
        trigger_geolocation_pipeline(project_uuid, tender_data['tender_title'])
```

---

#### Pipeline 2: Financial Data Ingestion

**Source Systems:**

1. **Controller of Budget (cob.go.ke)**: BIRR quarterly reports (PDFs)
2. **National Treasury**: Budget books (Excel/PDF)
3. **County Governments**: County Integrated Development Plans (CIDPs)

**Technical Challenge**: Financial data is NOT project-specific—it's aggregated by Ministry/Department/Vote.

**Solution**: ONEKA uses **inference matching** to link departmental budgets to specific projects.

**Workflow:**

```python
def ingest_cob_quarterly_report(pdf_url):
    """Extract financial data from COB BIRR reports"""

    # Step 1: Download and parse PDF tables
    tables = camelot.read_pdf(pdf_url, pages='all', flavor='stream')

    # Step 2: Identify expenditure tables
    for table in tables:
        if "Development Expenditure" in table.df.columns:
            for row in table.df.iterrows():
                ministry = row['Ministry']
                vote_head = row['Vote']
                allocated = parse_amount(row['Allocated (Kshs)'])
                released = parse_amount(row['Released (Kshs)'])
                absorbed = parse_amount(row['Absorbed (Kshs)'])

                # Step 3: Calculate absorption rate
                absorption_rate = (absorbed / allocated * 100) if allocated > 0 else 0

                # Step 4: Store aggregated financial data
                db.financial_records.insert({
                    'project_uuid': None,  # Not project-specific yet
                    'source_system': 'COB',
                    'ministry': ministry,
                    'vote_head': vote_head,
                    'budget_allocated_kes': allocated,
                    'budget_absorbed_kes': absorbed,
                    'absorption_rate': absorption_rate,
                    'reporting_period': extract_quarter(pdf_url)
                })

    # Step 5: Inference matching to projects
    # If Ministry of Health spent KES 2.4B in Q2 2024,
    # and we have 10 health projects in the database,
    # allocate proportionally by contract value
    inference_match_financial_to_projects('Ministry of Health', 'Q2 2024')

def inference_match_financial_to_projects(ministry, quarter):
    """Smart allocation of ministry budget to specific projects"""

    # Get total ministry expenditure for quarter
    ministry_spending = db.financial_records.filter(
        ministry=ministry,
        reporting_period=quarter
    ).sum('budget_absorbed_kes')

    # Get all projects under this ministry
    projects = db.projects.join(procurement_records).filter(
        procuring_entity__contains=ministry,
        status='ongoing'
    )

    # Calculate each project's "expected share"
    total_contract_value = sum(p.contract_sum for p in projects)

    for project in projects:
        # Proportional allocation based on contract size
        expected_allocation = (project.contract_sum / total_contract_value) * ministry_spending

        # Create inferred financial record
        db.financial_records.insert({
            'project_uuid': project.uuid,
            'budget_allocated_kes': expected_allocation,
            'budget_absorbed_kes': expected_allocation,  # Assume fully spent
            'absorption_rate': 100.0,
            'match_method': 'INFERENCE',  # Flag as estimated
            'confidence_score': 60  # Lower confidence than direct match
        })
```

**Critical Note**: This inference approach is imperfect but **better than nothing**. In production, ONEKA would integrate directly with IFMIS API (if granted access) to get project-level disbursement data.

---

#### Pipeline 3: Geolocation Resolution

**Source Systems:**

1. **Kenya Master Health Facility List (KMHFL)**: 13,000 facilities with GPS
2. **Ministry of Education (NEMIS)**: 30,000+ schools (partial GPS)
3. **IEBC Ward Boundaries**: Administrative polygons as fallback

**Technical Stack:**

- **Fuzzy Matching**: `rapidfuzz` Python library
- **NLP**: spaCy for location name extraction
- **Geocoding Fallback**: Nominatim (OpenStreetMap) for unknown locations

**Workflow:**

```python
def resolve_project_geolocation(project_uuid, tender_title):
    """Convert text description to GPS coordinates"""

    # Step 1: Extract potential location names using NLP
    doc = nlp(tender_title)
    # Example: "Construction of Githurai Level 4 Hospital"
    # Extracts: ["Githurai", "Level 4 Hospital"]

    location_entities = [ent.text for ent in doc.ents if ent.label_ in ['GPE', 'LOC', 'FAC']]

    # Step 2: Query KMHFL for health facilities
    if 'hospital' in tender_title.lower() or 'dispensary' in tender_title.lower():
        facilities = db.kmhfl_cache.all()

        # Fuzzy match against facility names
        from rapidfuzz import process, fuzz

        best_match = process.extractOne(
            tender_title,
            [f.name for f in facilities],
            scorer=fuzz.token_set_ratio,
            score_cutoff=80
        )

        if best_match:
            facility = facilities.get(name=best_match[0])

            # Store high-confidence geolocation
            db.geolocation_records.insert({
                'project_uuid': project_uuid,
                'source_system': 'KMHFL',
                'facility_code': facility.code,
                'latitude': facility.lat,
                'longitude': facility.lon,
                'match_confidence': best_match[1],  # Score from rapidfuzz
                'match_method': 'fuzzy'
            })

            # Trigger satellite analysis
            trigger_satellite_analysis(project_uuid, facility.lat, facility.lon)
            return

    # Step 3: Fallback to Ward centroid if no facility match
    for location in location_entities:
        ward_match = db.ward_boundaries.filter(name__icontains=location).first()
        if ward_match:
            centroid = ward_match.geometry.centroid

            db.geolocation_records.insert({
                'project_uuid': project_uuid,
                'source_system': 'IEBC_Ward',
                'latitude': centroid.y,
                'longitude': centroid.x,
                'match_confidence': 50,  # Lower confidence for centroid
                'match_method': 'ward_fallback',
                'verified': False  # Flag for manual review
            })
            return

    # Step 4: Ultimate fallback - flag as "GEOLOCATION_FAILED"
    db.projects.update(project_uuid, status='GEOLOCATION_FAILED')
    create_manual_review_task(project_uuid, "No GPS match found")
```

---

#### Pipeline 4: Satellite Analysis Integration

**Trigger**: Automatically runs when a project gets geolocated (lat/lon available).

**Workflow:**

```python
def trigger_satellite_analysis(project_uuid, latitude, longitude):
    """Analyze satellite imagery for project site"""

    project = db.projects.get(project_uuid)

    # Step 1: Define Area of Interest (AOI)
    # 100m buffer around point location
    aoi = create_buffer_polygon(latitude, longitude, radius_meters=100)

    # Step 2: Get project timeline
    award_date = project.procurement_records[0].award_date
    baseline_date = award_date - timedelta(days=180)  # 6 months before
    current_date = datetime.now()

    # Step 3: Query Sentinel-2 for NDVI analysis
    baseline_ndvi = get_sentinel2_ndvi(aoi, baseline_date)
    current_ndvi = get_sentinel2_ndvi(aoi, current_date)
    ndvi_change = current_ndvi - baseline_ndvi

    # Step 4: Interpret results
    if ndvi_change < -0.2:
        interpretation = "Land clearing detected (vegetation loss)"
        construction_detected = True
    elif ndvi_change > 0.1:
        interpretation = "Vegetation regrowth (possible abandonment)"
        construction_detected = False
    else:
        interpretation = "No significant change"
        construction_detected = False

    # Step 5: Store analysis results
    db.satellite_analyses.insert({
        'project_uuid': project_uuid,
        'sensor': 'Sentinel-2',
        'acquisition_date': current_date.date(),
        'analysis_type': 'NDVI_change',
        'baseline_value': baseline_ndvi,
        'current_value': current_ndvi,
        'change_magnitude': ndvi_change,
        'change_detected': construction_detected,
        'interpretation': interpretation
    })

    # Step 6: Calculate risk score
    calculate_project_risk_score(project_uuid)

def calculate_project_risk_score(project_uuid):
    """Compare financial progress vs physical progress"""

    project = db.projects.get(project_uuid)

    # Financial progress (% of budget spent)
    financial_records = project.financial_records
    if financial_records:
        budget_allocated = sum(f.budget_allocated_kes for f in financial_records)
        budget_absorbed = sum(f.budget_absorbed_kes for f in financial_records)
        financial_progress = (budget_absorbed / budget_allocated * 100) if budget_allocated > 0 else 0
    else:
        financial_progress = 0

    # Physical progress (satellite analysis)
    satellite_analysis = project.satellite_analyses[-1]  # Most recent
    if satellite_analysis.change_detected:
        physical_progress = 50  # Assume 50% if construction detected
    else:
        physical_progress = 0   # 0% if no construction

    # Risk calculation
    progress_gap = financial_progress - physical_progress

    # Flag high-risk projects
    if progress_gap > 40:  # Financial > Physical by 40+ percentage points
        risk_level = 'HIGH'
        risk_flags = ['FINANCIAL_PHYSICAL_MISMATCH', 'POTENTIAL_GHOST_PROJECT']
    elif progress_gap > 20:
        risk_level = 'MEDIUM'
        risk_flags = ['DELAYED_CONSTRUCTION']
    else:
        risk_level = 'LOW'
        risk_flags = []

    # Update project
    db.projects.update(project_uuid, {
        'risk_level': risk_level,
        'risk_score': min(progress_gap, 100),
        'risk_flags': risk_flags
    })
```

---

## 3. The Search Experience: Find Any Project in Kenya

### 3.1 User Story: Auditor Searching for "Githurai Hospital"

**Step 1: User enters search query**

```
Search bar: "Githurai Hospital"
```

**Step 2: ONEKA performs multi-table search**

```sql
-- Search across all text fields
SELECT
    p.project_uuid,
    p.project_name,
    p.county,
    p.status,
    p.risk_level,
    pr.tender_number,
    pr.contract_sum_kes,
    pr.contractor_name,
    fr.budget_absorbed_kes,
    fr.absorption_rate,
    gr.latitude,
    gr.longitude,
    sa.interpretation as satellite_status
FROM projects p
LEFT JOIN procurement_records pr ON p.project_uuid = pr.project_uuid
LEFT JOIN financial_records fr ON p.project_uuid = fr.project_uuid
LEFT JOIN geolocation_records gr ON p.project_uuid = gr.project_uuid
LEFT JOIN satellite_analyses sa ON p.project_uuid = sa.project_uuid
WHERE
    p.project_name ILIKE '%Githurai%Hospital%'
    OR pr.tender_title ILIKE '%Githurai%Hospital%'
    OR gr.facility_name ILIKE '%Githurai%Hospital%'
ORDER BY p.updated_at DESC;
```

**Step 3: ONEKA returns unified project card**

```
╔═══════════════════════════════════════════════════════════════╗
║  GITHURAI LEVEL 4 HOSPITAL                       🔴 HIGH RISK ║
╚═══════════════════════════════════════════════════════════════╝

📋 PROCUREMENT DATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tender Number:    MOH/NCPD/2023/0089
Procuring Entity: Ministry of Health - National Comm. for Population
Award Date:       2023-03-15
Contract Sum:     KES 450,000,000 ($3.46M USD)
Contractor:       ABC Construction Ltd (NCA License: 12345)
Document:         📄 View Tender PDF

💰 FINANCIAL DATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Source:           Controller of Budget BIRR Q3 2024
Budget Allocated: KES 450,000,000
Budget Released:  KES 270,000,000 (60%)
Budget Absorbed:  KES 270,000,000 (60%)
Absorption Rate:  100% of released funds
Financial Status: ⚠️ 60% of contract value disbursed

📍 GEOLOCATION DATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Source:           Fuzzy match to KMHFL
Facility Code:    KMHFL-12345
Location:         Githurai Ward, Nairobi County
Coordinates:      -1.1875°, 36.8967°
Match Confidence: 85% (High)
Status:           ✅ Verified by auditor on 2025-11-01

🛰️ SATELLITE ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sensor:           Sentinel-2 (10m optical) + Sentinel-1 (10m SAR)
Baseline Date:    2023-03-15 (award date)
Current Date:     2026-01-29
NDVI Change:      +0.05 (vegetation INCREASED)
SAR Backscatter:  -12 dB (bare soil, no structures)
Interpretation:   ❌ NO CONSTRUCTION DETECTED
Physical Status:  🔴 0% complete (no visible progress)

⚠️ RISK ASSESSMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Risk Score:       95/100 (CRITICAL)
Risk Level:       🔴 HIGH
Risk Flags:
  • FINANCIAL_PHYSICAL_MISMATCH (60% paid, 0% built)
  • POTENTIAL_GHOST_PROJECT (no land clearing detected)
  • VEGETATION_REGROWTH (site appears abandoned)

Progress Gap:     60 percentage points
Expected Loss:    KES 270,000,000 if project confirmed as ghost

🎯 RECOMMENDED ACTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. ⚡ Priority field audit (within 7 days)
2. 🔍 Suspend further payments pending verification
3. 📊 Request contractor progress report with photographic evidence
4. 🗂️ Cross-check disbursement records with IFMIS transaction logs
5. ⚖️ Consider legal action if fraud confirmed

[View on Map] [Download Full Report] [Flag for Review]
```

---

### 3.2 The Power of Unified Search

**What ONEKA Enables**:

1. **Search by ANY identifier**:
   - Tender number: "MOH/NCPD/2023/0089"
   - Project name: "Githurai Hospital"
   - Contractor: "ABC Construction Ltd"
   - Location: Projects in "Nairobi County"
   - Budget line: "Vote Head 351"

2. **Cross-system discovery**:
   - Find all projects by contractor "ABC Construction" across all ministries
   - Find all health projects in Kiambu County
   - Find all projects with >30% progress gap

3. **Financial accountability**:
   - Show total government spend on contractor "ABC Construction": KES 2.4B across 12 projects
   - Show total disbursements vs satellite-verified completion rates
   - Identify contractors with patterns of ghost projects

---

## 4. Key Technical Innovations

### 4.1 Entity Resolution Engine

**The Challenge**: Same entity has different names across systems.

**Examples**:

- "Kenyatta National Hospital" = "K.N.H." = "Kenyatta N. Hospital" = "KNH"
- "Nairobi County Government" = "NCG" = "County Government of Nairobi"
- "Ministry of Health" = "MOH" = "Health Ministry"

**Solution**: Train entity resolution model using `dedupe` or `rapidfuzz`.

```python
from rapidfuzz import fuzz, process

def normalize_entity_name(name):
    """Standardize entity names"""
    # Remove common abbreviations
    name = name.lower()
    name = re.sub(r'\b(ltd|limited|co|inc|government|ministry|dept)\b', '', name)
    name = re.sub(r'[^\w\s]', '', name)  # Remove punctuation
    name = re.sub(r'\s+', ' ', name).strip()
    return name

def find_entity_match(query_name, entity_database):
    """Find matching entity across systems"""

    normalized_query = normalize_entity_name(query_name)
    normalized_db = {normalize_entity_name(e.name): e for e in entity_database}

    # Fuzzy match using token set ratio (handles word order differences)
    match = process.extractOne(
        normalized_query,
        normalized_db.keys(),
        scorer=fuzz.token_set_ratio,
        score_cutoff=85
    )

    if match:
        matched_entity = normalized_db[match[0]]
        return {
            'entity_id': matched_entity.id,
            'canonical_name': matched_entity.name,
            'confidence': match[1]
        }

    return None
```

### 4.2 Inference Matching Algorithm

**The Challenge**: Financial data is aggregated by ministry, not project-specific.

**Solution**: Proportional allocation based on contract value within ministry.

**Example**:

- Ministry of Health Q2 2024 total expenditure: KES 2.4B
- Active health projects in database: 10 projects, total contract value: KES 5B
- Project A (Githurai Hospital): Contract value KES 450M

**Calculation**:

```
Project A expected allocation = (450M / 5B) × 2.4B = KES 216M
```

If Project A's satellite analysis shows 0% progress, but it received KES 216M, that's a red flag.

**Code**:

```python
def allocate_ministry_budget_to_projects(ministry, quarter, total_expenditure):
    """Distribute ministry spending across active projects"""

    # Get all active projects under this ministry
    projects = db.procurement_records.filter(
        procuring_entity__contains=ministry,
        status='ongoing'
    ).select_related('project')

    # Calculate total contract value
    total_contracts = sum(p.contract_sum_kes for p in projects)

    # Proportional allocation
    for project in projects:
        share_percentage = project.contract_sum_kes / total_contracts
        estimated_expenditure = total_expenditure * share_percentage

        db.financial_records.insert({
            'project_uuid': project.project_uuid,
            'budget_absorbed_kes': estimated_expenditure,
            'reporting_period': quarter,
            'match_method': 'INFERENCE',
            'confidence_score': 60  # Lower confidence than direct match
        })
```

### 4.3 Risk Scoring Algorithm

**Formula**:

```python
Risk Score = (Financial Progress % - Physical Progress %) × Confidence Factor

Where:
- Financial Progress = (Budget Absorbed / Contract Value) × 100
- Physical Progress = {
    0% if no construction detected,
    30% if land clearing detected,
    50% if foundation detected,
    80% if structure detected,
    100% if completed
  }
- Confidence Factor = (Geolocation Match Confidence / 100) ×
                       (Satellite Cloud Cover Quality / 100)
```

**Example**:

```
Financial Progress: 60% (KES 270M / KES 450M)
Physical Progress: 0% (no construction)
Geolocation Confidence: 85%
Satellite Quality: 95% (cloud-free)

Risk Score = (60% - 0%) × (0.85 × 0.95)
           = 60 × 0.8075
           = 48.45

Risk Level = MEDIUM (threshold: >40 = HIGH)
```

---

## 5. MVP Implementation Plan (8-Week Timeline)

### Week 1-2: Data Foundation

- ✅ Set up PostgreSQL database with schema
- ✅ Scrape PPIP tenders (100 health sector tenders)
- ✅ Download COB quarterly reports (Q1-Q4 2024)
- ✅ Cache KMHFL facility database (13,000 facilities)
- ✅ Implement OCR pipeline (AWS Textract)

### Week 3-4: Entity Resolution & Geolocation

- ✅ Build fuzzy matching engine (RapidFuzz)
- ✅ Geolocate 100 projects (target 25-40 successful matches)
- ✅ Implement "human-in-the-loop" validation for low-confidence matches
- ✅ Create manual review dashboard

### Week 5-6: Satellite Integration

- ✅ Integrate Sentinel-2 via Satpy for NDVI analysis
- ✅ Process 25-40 geolocated sites
- ✅ Calculate NDVI change (baseline vs current)
- ✅ Store analysis results in database

### Week 7-8: Frontend & Demo

- ✅ Build search interface (React)
- ✅ Create unified project cards
- ✅ Integrate Google 3D Tiles visualization
- ✅ Select 3 "hero" demo projects (1 ghost, 1 complete, 1 in-progress)
- ✅ Rehearse 5-minute pitch

---

## 6. Post-MVP: Full Production Features

### Phase 2: IFMIS Integration (Months 3-6)

**Goal**: Replace "inference matching" with direct IFMIS API access for project-level disbursement data.

**Requirements**:

- Partnership with National Treasury for API credentials
- IFMIS API documentation (currently private)
- OAuth 2.0 authentication implementation

**Impact**: Confidence score increases from 60% (inferred) to 95% (direct match)

### Phase 3: County Integration (Months 6-12)

**Goal**: Ingest devolved fund data from 47 county governments.

**Challenge**: Each county has different reporting systems.

**Solution**:

- Standardize county reports to common template
- Train county staff on ONEKA data submission portal
- Implement county-specific scrapers for automated ingestion

### Phase 4: Real-Time Monitoring (Year 2)

**Goal**: Automated alerts when financial vs physical gap exceeds threshold.

**Features**:

- Daily Sentinel-2 monitoring(via PlanetScope 3m)
- Automated email alerts to OAG when risk score > 70
- SMS notifications to county governors for projects in their jurisdiction
- Public dashboard showing aggregate statistics

---

## 7. Success Metrics

### MVP (8 Weeks)

- ✅ 100 tenders ingested from PPIP
- ✅ 25-40 projects geolocated (25-40% success rate)
- ✅ 25-40 satellite analyses completed
- ✅ 12+ high-risk projects flagged
- ✅ 3 "hero" projects with full dataset for demo

### Production (Year 1)

- 🎯 10,000 tenders ingested across all sectors
- 🎯 3,000 projects geolocated (30% success rate)
- 🎯 1,000 satellite analyses completed
- 🎯 100+ ghost projects identified and verified
- 🎯 KES 5B+ in fraudulent spending prevented

### Impact (Year 2)

- 🎯 ONEKA adopted by Office of Auditor General as official triage tool
- 🎯 Legislative mandate for GPS coordinates in all tender documents
- 🎯 IFMIS integration live with project-level disbursement tracking
- 🎯 50% reduction in audit cycle time (6 months → 3 months)
- 🎯 Court precedent established for Section 106B satellite evidence admissibility

---

## 8. The Vision: Kenya's Infrastructure Accountability OS

**Long-term Goal**: ONEKA becomes the **single source of truth** for all infrastructure projects in Kenya.

**Imagine a Future Where:**

- ✅ Every project has a **unified ONEKA ID** from tender to completion
- ✅ Citizens can search "What projects are happening in my ward?" and see real-time status
- ✅ Parliament can query "How much has been spent on health infrastructure nationally?" and get instant answer
- ✅ Contractors must provide GPS coordinates to receive payments (enforced by IFMIS integration)
- ✅ County governors receive automated alerts when projects in their counties fall behind schedule
- ✅ International donors can verify their funded projects without site visits

**ONEKA as Platform**:

- API for third-party developers to build accountability apps
- Open data portal for journalists and civil society
- Mobile app for citizens to report project issues
- WhatsApp bot for simple queries ("Status of Githurai Hospital")

---

## Conclusion: From Data Silos to Unified Truth

ONEKA solves Kenya's infrastructure accountability crisis not by building yet another government system, but by **becoming the interoperability layer** that makes existing systems talk to each other.

By linking procurement → finance → physical verification through a unified database, ONEKA answers the question that has plagued Kenyan governance for decades:

**"Where did the money go, and is there anything to show for it?"**

For the first time, the answer is searchable, verifiable, and backed by satellite evidence.

---

**Document Version**: 1.0  
**Last Updated**: January 29, 2026  
**Next Review**: After MVP completion (Week 8)
