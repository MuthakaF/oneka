# **ONEKA AI: Product Description**

## **The Intelligent Infrastructure Auditing Platform for Kenya**

---

## **1. Executive Overview**

**ONEKA AI** is Kenya's first autonomous infrastructure auditing platform that combines **artificial intelligence, satellite intelligence, and data interoperability** to detect ghost projects and prevent corruption before billions of shillings are lost.

Traditional infrastructure audits take 18-24 months and cost KES 2-5 million per project. By the time auditors discover a ghost project, the money is already gone. **ONEKA AI completes the same audit in 48 hours at 1% of the cost** by automatically cross-referencing procurement records, financial reports, and satellite imagery.

### **The Problem We Solve**

Kenya allocates KES 750+ billion annually to infrastructure development, yet:

- **30-40% of projects** experience significant cost overruns or delays
- **Ghost projects** (projects that exist only on paper) drain billions from public coffers
- **Data silos** prevent auditors from connecting procurement, finance, and physical reality
- **Manual audits** are too slow, too expensive, and reach projects after money is lost

### **The ONEKA Solution**

ONEKA AI operates as **Kenya's infrastructure nervous system** — a unified platform that:

1. **Connects fragmented government systems** (procurement, finance, geolocation)
2. **Predicts project failures** before they happen using machine learning
3. **Verifies physical construction** using satellite imagery that cannot be manipulated
4. **Provides real-time alerts** to auditors, treasury officials, and accountability agencies

---

## **2. Core Capabilities**

### **2.1 The Interoperability Layer: Kenya's Infrastructure Rosetta Stone**

**The Challenge:**

Kenya's government systems don't talk to each other. A road project appears with different identifiers across multiple platforms:

- **PPIP (Procurement):** Tender Number `KURA/RMLF/HQ/243/2024`
- **IFMIS (Finance):** Budget Vote `351` under Department of Transport
- **COB (Controller of Budget):** Project code in quarterly PDF reports
- **County Systems:** Local project registry with completely different numbering

This fragmentation makes it impossible to track a single project from tender award through construction to completion.

**The ONEKA Solution:**

ONEKA serves as **the interoperability layer** — a universal translator that:

✅ **Ingests data from all siloed systems:**

- Procurement: tenders.go.ke, egpkenya.go.ke (tender documents)
- Finance: Controller of Budget reports, National Treasury disbursements
- Physical Assets: Ministry of Health Master Facility List (13,000+ facilities), Ministry of Education school registries
- Geolocation: County planning documents, cadastral records

✅ **Creates a "Concordance Database":**

- Assigns each project a universal `project_uuid`
- Maps external IDs to this internal standard
- Links tender documents → budget allocations → GPS coordinates → satellite imagery

✅ **Standardizes to international formats:**

- **OCDS (Open Contracting Data Standard)** for procurement transparency
- **SCOA (Standard Chart of Accounts)** for financial alignment with Treasury
- **GeoJSON** for spatial data compatibility

✅ **Resolves entity matching using AI:**

- Recognizes that "Kenyatta National Hospital" = "K.N.H." = "KNH"
- Uses fuzzy logic (RapidFuzz) to match project descriptions across systems
- Flags low-confidence matches for human verification

**Business Impact:**

- **Before ONEKA:** Auditors spend 3-6 months manually searching through PDFs to connect a tender to its budget line
- **With ONEKA:** One search returns complete project profile in 2 seconds — procurement history, financial releases, GPS location, satellite verification

---

### **2.2 Predictive Analysis: The Early Warning System**

**The Challenge:**

Current audits are **reactive** — they discover problems 18-24 months after a project starts, when the money is already spent. Auditors have no way to know if a project will succeed or fail until it's too late.

**The ONEKA Solution:**

ONEKA transforms auditing from **reactive investigation** to **proactive prevention** using machine learning trained on historical project data.

#### **How It Works: The S-Curve Baseline**

Every successful construction project follows a predictable spending pattern called an **S-Curve**:

1. **Months 1-3 (Mobilization):** Slow spending — site surveys, permits, mobilization
2. **Months 4-15 (Peak Construction):** Rapid spending — heavy machinery, materials, labor
3. **Months 16-18 (Completion):** Slow spending — finishing work, handover

ONEKA's machine learning model learns this pattern from successful projects, then compares new projects against this "golden standard."

#### **The Training Process:**

**Step 1: Historical Data as Ground Truth**

- Identifies 30 completed projects from 2020-2023 (20 successful + 10 ghost/stalled)
- Extracts **immutable historical satellite data** showing construction progress month-by-month
- Analyzes time-series data: NDVI (vegetation clearing), SAR (structural development), NDWI (drainage patterns)

**Step 2: Feature Engineering**

The AI extracts 15+ predictive features including:

- **NDVI slope:** Rate of vegetation clearing (healthy projects clear land quickly)
- **SAR backscatter increase:** Detection of vertical structures (walls, roofs)
- **Progress gap:** Discrepancy between budget spent vs. physical progress
- **Months to clearing:** Time from contract award to site mobilization
- **Absorption anomalies:** Spending pattern deviations from S-curve baseline

**Step 3: Model Training**

- Random Forest Classifier trained on 720+ monthly satellite observations
- 5-fold cross-validation to ensure model accuracy
- Target performance: 80-85% accuracy in predicting project risk

**Step 4: Real-Time Prediction**

When a new tender is awarded, ONEKA:

1. **Month 1-3:** Monitors site for mobilization signals
2. **Month 4-6:** Compares spending rate vs. physical progress
3. **Month 7+:** Issues risk alerts if project deviates from baseline

#### **Risk Prediction Categories:**

🟢 **Low Risk (0-30%):** Project following expected trajectory  
🟡 **Moderate Risk (31-60%):** Minor delays detected, recommend closer monitoring  
🟠 **High Risk (61-80%):** Significant deviation, flag for field audit  
🔴 **Critical Risk (81-100%):** Ghost project likely, immediate intervention required

**Business Impact:**

| Traditional Audit                                     | ONEKA Predictive Analysis                           |
| ----------------------------------------------------- | --------------------------------------------------- |
| **Detection Time:** 18-24 months after contract award | **Detection Time:** 3-6 months after contract award |
| **Can only confirm past failures**                    | **Predicts failures before money is lost**          |
| **Reactive investigation**                            | **Proactive prevention**                            |
| **100% of budget already spent when discovered**      | **Alert issued when 15-30% of budget spent**        |
| **Field auditors verify after delay**                 | **Satellite verifies continuously**                 |

---

### **2.3 Satellite Verification: The Immutable Truth Layer**

**Why Satellite Data?**

Financial reports can be falsified. Procurement documents can be backdated. Photographs can be staged. But **satellite imagery is immutable** — the physics of light reflection captured from space cannot be manipulated retroactively.

#### **Multi-Layer Satellite Analysis:**

ONEKA uses **four complementary satellite layers** for comprehensive verification:

**1. NDVI (Normalized Difference Vegetation Index)**

- **Purpose:** Primary quantitative indicator for ML model
- **What it detects:** Vegetation clearing (construction sites show dramatic NDVI drops from 0.6-0.8 to 0.0-0.2)
- **Data source:** Sentinel-2 optical imagery (10m resolution)
- **Frequency:** Updated every 5 days

**2. SAR (Synthetic Aperture Radar)**

- **Purpose:** All-weather monitoring (penetrates clouds)
- **What it detects:** Vertical structures, concrete surfaces (high radar backscatter)
- **Data source:** Sentinel-1 C-band radar
- **Advantage:** Works during Kenya's rainy seasons when optical satellites are blocked

**3. False Color Infrared**

- **Purpose:** Human visual analysis and training data labeling
- **What it shows:** Vegetation appears red, bare soil appears cyan, construction appears blue/gray
- **Use case:** Allows analysts to manually verify AI predictions

**4. NDWI (Normalized Difference Water Index)**

- **Purpose:** Quality control filter
- **What it detects:** Seasonal flooding or natural water bodies
- **Prevents:** False positives from wetlands confused with construction

**Change Detection Algorithm:**

ONEKA compares satellite imagery across time to detect construction activity:

```
Baseline (T0): Pre-construction imagery from project area
Current (T1): Most recent imagery

Change Score = |NDVI(T1) - NDVI(T0)| + |SAR(T1) - SAR(T0)|

If Change Score > Threshold:
   → "Construction Detected"
Else:
   → "No Activity Detected" → Ghost Project Alert
```

**Business Impact:**

- **Verification Speed:** 48 hours from satellite query to analysis
- **Cost:** $0 (using free Copernicus/Sentinel data) vs. KES 200,000 for field audit per site
- **Coverage:** Can monitor every project nationwide simultaneously
- **Fraud Prevention:** Historical satellite archives prove when construction actually occurred (retroactive falsification impossible)

---

## **3. User Experience: The ONEKA Dashboard**

### **For Auditors (OAG, EACC, Parliament)**

**Single Unified Search:**

Type: "Gituamba Market" → Instantly retrieve:

- **Procurement:** Tender number, contractor name, award date, contract value
- **Finance:** Budget allocation, funds released to date, absorption rate
- **Location:** GPS coordinates, county, ward, constituency
- **Satellite:** 24-month time-series showing construction timeline
- **Risk Score:** ML prediction with human-readable explanation

**Risk Dashboard:**

- List of all flagged projects sorted by risk score
- Color-coded alerts (green/yellow/orange/red)
- One-click drill-down into individual project details
- Export audit-ready PDF reports with satellite evidence

### **For Treasury & Planning Officials**

**Portfolio Monitoring:**

- Real-time view of all active infrastructure projects
- Spending vs. progress comparison charts
- Early warning alerts for projects deviating from baseline
- Budget reallocation recommendations

**Predictive Forecasts:**

- "Project X is 83% likely to stall within 6 months"
- "Project Y spending pattern matches historical ghost projects"
- "Project Z on track for on-time completion"

### **For County Governments**

**Project Transparency:**

- Public-facing portal showing satellite-verified progress
- Citizen reporting mechanism for suspected ghost projects
- Performance benchmarking against other counties
- Evidence-based planning for future infrastructure investments

---

## **4. Real-World Use Cases**

### **Use Case 1: Ghost Hospital Detection**

**Scenario:**

County government reports spending KES 350 million on "Kiambu Level 4 Hospital" over 18 months. Financial reports show 85% budget absorption. But citizens complain hospital construction hasn't started.

**ONEKA Response:**

1. **Interoperability Layer:** Links tender award → budget releases → GPS coordinates
2. **Satellite Analysis:** NDVI time-series shows **no vegetation clearing** at site for 18 months
3. **Predictive Model:** Historical comparison confirms spending pattern matches known ghost projects
4. **Alert Generated:** 🔴 **Critical Risk: 95% likelihood of ghost project**
5. **Audit Action:** OAG receives automated alert with satellite evidence, launches immediate investigation

**Outcome:**

- Investigation confirms hospital foundation never laid
- KES 100 million recovered before final payment
- Contractor debarred, county officials face prosecution
- **Savings:** KES 250 million vs. traditional audit discovering fraud after full payment

---

### **Use Case 2: Road Stall Prediction**

**Scenario:**

KURA awards KES 2.4 billion contract for Nairobi-Nakuru highway expansion. Project timeline: 36 months.

**ONEKA Monitoring:**

- **Month 3:** NDVI shows minimal site clearing (expected: 40% of route cleared, actual: 5%)
- **Month 6:** SAR detects no heavy machinery at site
- **Month 8:** Spending rate at 30% but physical progress at 3%
- **ML Prediction:** 78% probability of significant delay/stall

**Alert to KURA:**

🟠 **High Risk:** Project significantly behind physical schedule despite normal spending rate. Recommend site inspection and contractor performance review.

**Outcome:**

- KURA conducts field audit, discovers contractor equipment breakdown
- Penalty clause activated, contractor mobilizes backup equipment
- Project recovers to 60% completion milestone by Month 16
- **Value:** Early intervention prevents 12-month delay, saves KES 500M in time overruns

---

### **Use Case 3: County Performance Benchmarking**

**Scenario:**

National Treasury comparing infrastructure delivery across 47 counties.

**ONEKA Analysis:**

Generates comparative dashboard showing:

- **County A:** 85% of projects satellite-verified as on-track → High performance
- **County B:** 42% of projects show no physical activity → Investigate governance
- **County C:** Spending pattern analysis shows potential advance payment fraud

**Outcome:**

- High-performing counties receive additional allocations
- Underperforming counties placed under enhanced oversight
- Best practices from County A shared nationwide
- **Value:** Evidence-based resource allocation improves nationwide delivery

---

## **5. Technical Architecture (Simplified)**

```
┌────────────────────────────────────────────────────────────┐
│                    DATA INPUT LAYER                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │  PPIP    │  │  IFMIS   │  │    COB   │  │ Counties │    │
│  │ Tenders  │  │ Finance  │  │  Budget  │  │  Data    │    │
│  └─────┬────┘  └─────┬────┘  └─────┬────┘  └────┬─────┘    │
└────────┼─────────────┼─────────────┼────────────┼──────────┘
         │             │             │            │
         └─────────────┴─────────────┴────────────┘
                        │
         ┌──────────────▼──────────────────┐
         │   INTEROPERABILITY ENGINE       │
         │                                 │
         │  • Entity Resolution (AI)       │
         │  • Fuzzy Matching               │
         │  • Concordance Database         │
         │  • OCDS/SCOA Standardization    │
         └──────────────┬──────────────────┘
                        │
         ┌──────────────▼──────────────────┐
         │   UNIFIED PROJECT DATABASE      │
         │   (PostgreSQL + PostGIS)        │
         └──────────────┬──────────────────┘
                        │
         ┌──────────────┴──────────────────┐
         │                                 │
┌────────▼────────┐            ┌──────────▼──────────┐
│  SATELLITE      │            │  PREDICTIVE ML      │
│  VERIFICATION   │            │  ENGINE             │
│                 │            │                     │
│ • Sentinel-1/2  │            │ • Random Forest     │
│ • NDVI/SAR      │            │ • Risk Scoring      │
│ • Change        │            │ • S-Curve Baseline  │
│   Detection     │            │ • Feature Eng.      │
└────────┬────────┘            └──────────┬──────────┘
         │                                │
         └────────────┬───────────────────┘
                      │
         ┌────────────▼──────────────────┐
         │      RISK ANALYTICS ENGINE    │
         │                               │
         │  • Anomaly Detection          │
         │  • Alert Generation           │
         │  • Report Automation          │
         └────────────┬──────────────────┘
                      │
         ┌────────────▼──────────────────┐
         │    USER INTERFACE LAYER       │
         │                               │
         │  • Auditor Dashboard          │
         │  • Google 3D Tiles Map        │
         │  • Satellite Overlays         │
         │  • Risk Alerts                │
         │  • Export Reports             │
         └───────────────────────────────┘
```

---

## **6. Competitive Advantage**

### **Why ONEKA vs. Traditional Audits?**

| Factor                    | Traditional Audit            | ONEKA AI                                        |
| ------------------------- | ---------------------------- | ----------------------------------------------- |
| **Time to Detection**     | 18-24 months                 | 3-6 months                                      |
| **Cost per Audit**        | KES 2-5 million              | KES 5,000                                       |
| **Coverage**              | 50-100 projects/year         | Entire country (1,000+ projects simultaneously) |
| **Verification Method**   | Field visits (can be staged) | Satellite imagery (immutable)                   |
| **Predictive Capability** | None (reactive only)         | 80-85% accuracy predicting failures             |
| **Data Integration**      | Manual PDF review            | Automated cross-system linking                  |
| **Fraud Prevention**      | Detects after loss           | Prevents before loss                            |

### **Why ONEKA vs. Other Tech Solutions?**

**Competitors:** Generic BI dashboards, simple satellite monitoring tools

**ONEKA's Unique Value:**

1. **Only solution combining ALL three:** Interoperability + Prediction + Satellite
2. **Purpose-built for Kenya:** Integrates PPIP, IFMIS, COB, KMHFL, county systems
3. **ML-powered:** Predictive, not just descriptive
4. **Cost-effective:** Uses free Copernicus satellite data, open-source ML
5. **Audit-grade evidence:** Generates court-admissible reports with immutable satellite proof

---

## **7. Implementation & Scalability**

### **MVP Implementation (8 Weeks)**

**Week 1-2:** Data pipeline setup

- Ingest PPIP tender data
- Parse COB financial reports
- Load KMHFL facility coordinates
- Establish concordance database

**Week 3-4:** Satellite integration

- Copernicus Data Space API setup
- Multi-layer processing (NDVI, SAR, NDWI)
- Change detection algorithm deployment

**Week 5-6:** ML model training

- Historical project data collection
- Feature engineering
- Random Forest training & validation

**Week 7-8:** Dashboard & testing

- Google 3D Tiles integration
- Risk alert system
- User acceptance testing

### **Pilot Phase (3 Months)**

- Deploy in 1-2 counties (e.g., Nairobi, Kiambu)
- Monitor 50-100 active projects
- Validate ML predictions with field audits
- Refine model based on real-world feedback

### **National Rollout (12 Months)**

- Scale to all 47 counties
- Monitor 1,000+ concurrent projects
- Integration with IFMIS via official API
- Training program for county audit teams

---

## **8. Cost Structure**

### **MVP Development (8 Weeks)**

- Development team: 3 engineers × 8 weeks = KES 1.2M
- AWS infrastructure: KES 82,000 (one-time setup)
- **Total MVP Cost:** KES 1.28M

### **Annual Operating Costs (National Scale)**

- AWS hosting (10,000 projects/year): KES 5.3M/year
- Maintenance & support: KES 2.4M/year
- Satellite data (Copernicus free, Planet Labs upgrade optional): KES 0-15M/year
- **Total Annual Cost:** KES 7.7M - 22.7M/year

### **ROI Analysis**

**Scenario:** ONEKA flags 50 ghost projects/year averaging KES 200M each

- **Fraud detected:** 50 × KES 200M = KES 10 billion/year
- **Recovery rate:** 30% (conservative) = KES 3 billion/year
- **ONEKA cost:** KES 22.7M/year
- **Net benefit:** KES 2.98 billion/year
- **ROI:** 13,000% (KES 131 saved per KES 1 spent)

---

## **9. Target Customers**

### **Primary Users**

1. **Office of the Auditor General (OAG)**
   - National infrastructure audit coordination
   - Evidence collection for audit reports
   - Parliamentary oversight support

2. **Ethics & Anti-Corruption Commission (EACC)**
   - Ghost project investigations
   - Corruption prosecution evidence
   - Contractor vetting

3. **National Treasury**
   - Budget execution monitoring
   - County performance tracking
   - Resource allocation optimization

4. **Controller of Budget (COB)**
   - Real-time absorption rate verification
   - Spending anomaly detection
   - Quarterly reporting automation

### **Secondary Users**

5. **County Governments**
   - Project portfolio management
   - Citizen transparency portals
   - Performance benchmarking

6. **Parliamentary Committees**
   - Public Accounts Committee oversight
   - Budget & Appropriations review
   - Investigation support

7. **Development Partners**
   - World Bank, AfDB project monitoring
   - Conditional grant verification
   - Impact assessment

### **Tertiary Users**

8. **Civil Society & Media**
   - Public data portal access
   - Investigative journalism support
   - Citizen reporting mechanisms

---

## **10. Success Metrics**

### **Operational KPIs**

- **Projects monitored:** Target 1,000+ concurrent projects
- **Data completeness:** 90%+ projects with full procurement + finance + location + satellite data
- **Update frequency:** Real-time procurement/finance, 5-day satellite refresh
- **System uptime:** 99.5% availability

### **Impact KPIs**

- **Ghost projects detected:** 50+ per year
- **Fraud prevented:** KES 5-10 billion per year
- **Audit efficiency:** 95% reduction in time to initial risk assessment
- **Cost savings:** 99% reduction in cost per audit vs. traditional field audits

### **ML Performance KPIs**

- **Prediction accuracy:** 80-85% (projects correctly classified as risk/no-risk)
- **Precision:** 75-80% (flagged projects that are actually problematic)
- **Recall:** 80-85% (actual ghost projects that are flagged)
- **Early detection:** Average alert 12-18 months before traditional audit discovery

---

## **11. Risk Mitigation**

### **Technical Risks**

| Risk                                             | Mitigation Strategy                                      |
| ------------------------------------------------ | -------------------------------------------------------- |
| **Satellite cloud cover blocks optical imagery** | Use Sentinel-1 SAR (all-weather radar) as primary source |
| **ML model accuracy below 75%**                  | Maintain human-in-loop for final audit decisions         |
| **Data pipeline failures**                       | Automated monitoring, fallback to manual ingestion       |
| **API rate limiting**                            | Local caching, staggered requests                        |

### **Operational Risks**

| Risk                                       | Mitigation Strategy                                          |
| ------------------------------------------ | ------------------------------------------------------------ |
| **Government systems restrict API access** | Maintain web scraping fallback, engage official partnerships |
| **Training data insufficient**             | Supplement with synthetic data generation                    |
| **User adoption resistance**               | Extensive training, pilot success stories                    |
| **Field audit contradicts satellite**      | Use as model refinement feedback, not deployment blocker     |

### **Political/Legal Risks**

| Risk                                       | Mitigation Strategy                                                             |
| ------------------------------------------ | ------------------------------------------------------------------------------- |
| **Pressure to suppress findings**          | Automated reporting to multiple oversight bodies                                |
| **Legal challenges to satellite evidence** | Partner with established providers (ESA Copernicus), validate with field audits |
| **Data privacy concerns**                  | Focus on public infrastructure only, no citizen surveillance                    |

---

## **12. Future Roadmap**

### **Phase 1: MVP (8 Weeks) ✓**

Core functionality: Interoperability + Satellite + ML Prediction

### **Phase 2: Pilot (Months 3-6)**

- Deploy in 2 counties
- Validate 50 projects end-to-end
- Refine ML model with real-world data

### **Phase 3: National Scale (Months 7-12)**

- Rollout to all 47 counties
- Official IFMIS API integration
- Training for 100+ auditors

### **Phase 4: Advanced Features (Year 2)**

- **Quality assessment:** Beyond ghost detection, assess build quality
- **Contractor performance profiles:** Track contractor success rates
- **Automated field audit scheduling:** Optimize auditor deployment
- **Mobile app:** Field auditors capture ground truth via smartphone

### **Phase 5: Regional Expansion (Year 3+)**

- Adapt system for East African Community countries
- Partner with AU, World Bank for continental rollout
- License to other developing nations with similar challenges

---

## **13. Call to Action**

### **For Government Partners**

ONEKA AI is ready to transform Kenya's infrastructure accountability. We invite:

- **Office of the Auditor General:** Pilot partnership for 2-county deployment
- **National Treasury:** IFMIS API access for real-time financial integration
- **EACC:** Joint protocol for automated fraud alerts

**Contact:** Partner with us to deploy the MVP in Q1 2026.

### **For Development Partners**

- **World Bank, AfDB, USAID:** Fund national rollout (KES 15M for 47-county deployment)
- **Technical partners:** Provide satellite data access (Planet Labs, Maxar) for higher resolution monitoring

**Contact:** Schedule a technical demonstration.

### **For Technology Community**

- **Open source contributors:** Join our GitHub repository (data pipeline, ML models)
- **Geospatial experts:** Enhance our change detection algorithms
- **Data scientists:** Improve predictive model accuracy

**Contact:** Explore collaboration opportunities.

---

## **14. Conclusion**

ONEKA AI represents a paradigm shift in public infrastructure accountability — from **reactive investigation to proactive prevention**, from **manual audits to automated intelligence**, from **delayed discovery to real-time alerts**.

By serving as the **interoperability layer** that unifies Kenya's fragmented government systems, and by leveraging **machine learning** trained on immutable satellite archives, ONEKA transforms what was previously impossible (monitoring 1,000+ projects simultaneously) into routine operation.

The question is no longer "Can we detect ghost projects?" but "Can we afford NOT to?"

With ONEKA AI, **every shilling allocated can be verified. Every contractor held accountable. Every project completed with integrity.**

---

### **Contact Information**

**ONEKA AI Development Team**  
Email: contact@oneka.ai  
GitHub: github.com/oneka-ai  
Website: www.oneka.ai

**Demo Access:** Schedule a live demonstration  
**Partnership Inquiries:** partners@oneka.ai  
**Technical Documentation:** docs.oneka.ai

---

_ONEKA AI: Because Infrastructure Integrity Starts with Truth_
