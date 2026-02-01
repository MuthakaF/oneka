# ONEKA AI: Technical Roadmap for MVP Development

## Document Information

**Project Name:** ONEKA AI - Autonomous Infrastructure Audit System  
**Version:** 1.0  
**Date:** January 29, 2026  
**Development Period:** 8 Weeks (56 Days)  
**Team Size:** 3 Full-Time Engineers  
**Target Partner:** Kenya Office of the Auditor General (OAG)  
**Submitted By:** ONEKA AI Development Team

---

## 1. Executive Summary

### 1.1 Problem Statement

Kenya allocates over KES 750 billion annually to infrastructure development. However, 30-40% of projects experience significant delays or become "ghost projects" that exist only on paper. Traditional auditing methods take 18-24 months and cost KES 2-5 million per project. By the time audits are completed, public funds have already been lost and recovery becomes nearly impossible.

### 1.2 Proposed Solution

ONEKA AI is an autonomous infrastructure auditing platform that leverages artificial intelligence, satellite imagery, and data interoperability to detect ghost projects within 48 hours at 1% of traditional audit costs. The system consolidates fragmented government data from procurement, finance, and geolocation systems to provide real-time project monitoring and predictive risk analysis.

### 1.3 Core Innovation

ONEKA introduces three breakthrough capabilities:

1. **Interoperability Layer:** A concordance database that unifies data from PPIP (procurement), IFMIS (finance), Controller of Budget (budget), and KMHFL (geolocation) systems using AI-powered entity resolution.

2. **Predictive Analytics:** Machine learning models trained on historical satellite archives (2020-2023) that predict project failures 12-18 months before traditional audits would detect them.

3. **Satellite Verification:** Multi-layer satellite analysis (NDVI for vegetation change, SAR for all-weather monitoring, NDWI for flood filtering) that provides immutable evidence of construction progress.

---

## 2. Technical Architecture Overview

### 2.1 System Components

**Ingestion Layer**

- Public Procurement Information Portal (PPIP) data collector
- IFMIS financial data parser
- Controller of Budget (COB) report processor
- KMHFL facility geolocation API integration

**Interoperability Engine**

- Entity resolution using fuzzy matching algorithms
- Concordance database with universal project identifiers
- Data standardization (OCDS/SCOA formats)
- Cross-system linkage validation

**Data Storage**

- PostgreSQL 15 with PostGIS spatial extension
- Tables: projects, procurement_records, financial_records, geolocation_records, satellite_analyses
- Optimized for geospatial queries and time-series analysis

**Satellite Processing Pipeline**

- Copernicus Data Space API integration (Sentinel-1 and Sentinel-2)
- Multi-layer analysis: NDVI, SAR backscatter, False Color, NDWI
- Change detection algorithms for infrastructure monitoring
- Tile generation for web visualization

**Machine Learning Engine**

- Random Forest Classifier trained on 30 historical projects
- Feature engineering from satellite time-series data
- Risk scoring algorithm (0-100 scale)
- Batch prediction pipeline for active tenders

**Visualization Dashboard**

- Interactive 3D map using CesiumJS and Google Photorealistic 3D Tiles
- Semi-transparent satellite overlay layers
- Project status indicators and risk alerts
- Evidence compilation for audit reports

---

## 3. Eight-Week Development Timeline

### Week 1: Foundation & Data Collection (Days 1-7)

**Milestone:** Infrastructure Setup and Initial Data Ingestion

**Deliverables:**

- AWS infrastructure provisioned (EC2, RDS PostgreSQL, S3)
- PostgreSQL database with PostGIS installed and schema deployed
- PPIP web scraper operational with legal compliance measures
- KMHFL API integration completed
- 100 tender records collected from health sector
- 30 historical training projects identified from OAG reports

**Success Criteria:**

- Database operational with all tables created
- 100 tender URLs successfully extracted
- 30 training projects documented with GPS coordinates and completion status

---

### Week 2: Data Processing & Training Data Preparation (Days 8-14)

**Milestone:** OCR Pipeline and Historical Satellite Data Extraction

**Deliverables:**

- AWS Textract OCR pipeline integrated
- 100 tender PDFs processed with budget/location extraction
- Training dataset satellite observations collected (720+ data points)
- Manual project phase labeling completed using False Color imagery
- Entity resolution algorithm implemented
- First concordance mappings established

**Success Criteria:**

- 85% OCR accuracy on budget extraction
- 720 satellite observations downloaded for training data
- Entity resolution matching at 80%+ accuracy

---

### Week 3: Machine Learning Development (Days 15-21)

**Milestone:** ML Model Training and Feature Engineering

**Deliverables:**

- Feature engineering pipeline operational
- 15+ ML features extracted from satellite time-series
- Random Forest Classifier trained on historical data
- 5-fold cross-validation completed
- Model evaluation metrics documented
- S-Curve baseline anomaly detection implemented

**Success Criteria:**

- ML model achieves minimum 75% accuracy
- Precision and recall both above 70%
- Feature importance analysis completed
- Model serialized and ready for deployment

---

### Week 4: Satellite Processing Enhancement (Days 22-28)

**Milestone:** Multi-Layer Satellite Analysis System

**Deliverables:**

- Satpy library integration for Sentinel-2 processing
- PyroSAR integration for Sentinel-1 SAR analysis
- Four-layer processing pipeline operational (NDVI, SAR, False Color, NDWI)
- Change detection algorithm implemented
- Database schema updated with ML prediction fields
- Model retrained with enhanced features

**Success Criteria:**

- Multi-layer satellite processing functional
- ML model accuracy improved to 80%+
- Automated change detection working for test sites
- Processing time under 5 minutes per project

---

### Week 5: Visualization & User Interface (Days 29-35)

**Milestone:** Interactive 3D Dashboard Launch

**Deliverables:**

- React frontend application deployed
- CesiumJS 3D globe integrated
- Google Photorealistic 3D Tiles operational
- Satellite overlay tiles generated and served from S3
- Project markers with risk color coding
- Evidence viewer for satellite imagery time-series
- Interactive timeline slider for temporal analysis

**Success Criteria:**

- Dashboard loads in under 3 seconds
- 25 geolocated projects displayed on 3D map
- Satellite overlays render with appropriate transparency
- User can filter projects by risk level

---

### Week 6: Prediction API & Integration (Days 36-42)

**Milestone:** Production ML Pipeline Deployment

**Deliverables:**

- FastAPI prediction service deployed
- Batch processing pipeline for active tenders
- Risk explanation generation algorithm
- Alert system for high-risk projects
- PDF evidence report generator
- API documentation and testing suite

**Success Criteria:**

- Prediction API response time under 2 seconds
- Batch processing completes 100 projects in under 10 minutes
- 12+ ghost projects flagged with evidence
- PDF reports generated automatically

---

### Week 7: System Integration & Testing (Days 43-49)

**Milestone:** End-to-End System Validation

**Deliverables:**

- Full data pipeline integration testing
- Performance optimization completed
- Security audit and compliance review
- User acceptance testing scenarios
- Bug fixes and refinement
- Documentation updated

**Success Criteria:**

- All system components integrated successfully
- No critical bugs remaining
- Performance meets defined benchmarks
- Security compliance verified

---

### Week 8: Production Deployment & Demo Preparation (Days 50-56)

**Milestone:** MVP Launch and Presentation Readiness

**Deliverables:**

- Production environment deployed to AWS
- Monitoring and logging infrastructure established
- Backup and disaster recovery procedures documented
- Demo dataset prepared (25 real-world projects)
- Presentation materials finalized
- Technical documentation completed
- Handoff materials for OAG partnership

**Success Criteria:**

- System operational in production
- Demo environment stable and tested
- All documentation complete
- Team ready for final presentation

---

## 4. Key Deliverables

### 4.1 Software Deliverables

**Core System**

- Fully functional web application accessible via browser
- RESTful API for programmatic access
- Database with 100+ processed tender records
- ML model trained and deployed for risk prediction
- Satellite analysis pipeline processing Sentinel data
- 3D visualization dashboard with project overlays

**Infrastructure**

- AWS production environment with auto-scaling
- PostgreSQL database with spatial indexing
- S3 storage for satellite imagery tiles
- CloudFront CDN for global access
- Automated backup systems

### 4.2 Documentation Deliverables

**Technical Documentation**

- System architecture diagram
- Database schema documentation
- API reference guide
- Deployment procedures
- Security and compliance documentation

**User Documentation**

- User manual for OAG auditors
- Dashboard navigation guide
- Risk score interpretation guide
- Evidence evaluation procedures

**Research Documentation**

- ML model training report
- Satellite data provider comparison
- Interoperability architecture specification
- Predictive analysis methodology

### 4.3 Demo Materials

**Presentation Assets**

- Live demo environment with 25 real projects
- Video walkthrough of system capabilities
- Case studies of detected ghost projects
- ROI analysis with cost-benefit breakdown
- Pitch deck for stakeholder presentations

---

## 5. Success Metrics

### 5.1 Technical Performance Indicators

| Metric                   | Target          | Measurement Method              |
| ------------------------ | --------------- | ------------------------------- |
| Tender records processed | 100+            | Database count                  |
| Geocoding accuracy       | 85%+            | Manual validation sample        |
| ML model accuracy        | 80-85%          | Cross-validation on test set    |
| ML precision             | 75-80%          | Confusion matrix analysis       |
| ML recall                | 80-85%          | Confusion matrix analysis       |
| Satellite coverage       | 90%+            | Projects with imagery available |
| Dashboard load time      | Under 3 seconds | Performance testing             |
| API response time        | Under 2 seconds | Load testing                    |

### 5.2 Business Impact Indicators

| Metric                        | Target          | Measurement Method            |
| ----------------------------- | --------------- | ----------------------------- |
| Ghost projects identified     | 12+             | ML flagged high-risk projects |
| Audit cycle time              | 48 hours        | End-to-end processing time    |
| Cost per audit                | Under KES 5,000 | Budget tracking               |
| Cost reduction vs traditional | 99%+            | Comparison analysis           |
| Potential fraud detected      | KES 500M+       | Flagged project value total   |
| ROI projection                | 130:1           | Recovery potential vs cost    |

### 5.3 Compliance Indicators

| Metric                     | Target | Measurement Method   |
| -------------------------- | ------ | -------------------- |
| Data privacy compliance    | 100%   | DPA 2019 audit       |
| Personal data sanitization | 100%   | Automated testing    |
| Legal framework adherence  | 100%   | Compliance checklist |
| Source attribution         | 100%   | Documentation review |

---

## 6. Team Structure and Responsibilities

### 6.1 Core Development Team (3 Full-Time Engineers)

**Backend Developer / ML Engineer**

- Responsibilities: Data ingestion pipelines, database architecture, ML model development, satellite processing, API development
- Time allocation: 40 hours/week for 8 weeks (320 hours total)
- Key deliverables: Weeks 1-4, 6

**Frontend Developer / UX Engineer**

- Responsibilities: React application, CesiumJS 3D visualization, dashboard design, user interface components, responsive design
- Time allocation: 40 hours/week for 8 weeks (320 hours total)
- Key deliverables: Weeks 5, 7-8

**DevOps Engineer / System Architect**

- Responsibilities: AWS infrastructure, deployment automation, security configuration, monitoring setup, performance optimization
- Time allocation: 40 hours/week for 8 weeks (320 hours total)
- Key deliverables: All weeks, infrastructure focus

### 6.2 Advisory and Support Roles (Part-Time)

**GIS Specialist**

- Responsibilities: Satellite imagery interpretation, training data labeling, geospatial analysis validation
- Time allocation: 20 hours over weeks 2-3
- Budget: USD 500 stipend

**Legal Advisor**

- Responsibilities: Data protection compliance review, PPRA engagement letter, OAG partnership agreement
- Time allocation: 10 hours over weeks 1, 8
- Budget: Pro bono or USD 1,000

**Product Manager / Project Lead**

- Responsibilities: Stakeholder coordination, timeline management, OAG liaison, demo preparation
- Time allocation: 10 hours/week for 8 weeks (80 hours total)
- Budget: Existing team member or founder

---

## 7. Budget Breakdown

### 7.1 MVP Development Costs (8 Weeks)

| Category                 | Item                                  | Cost (USD)           |
| ------------------------ | ------------------------------------- | -------------------- |
| **Cloud Infrastructure** | AWS EC2 t3.medium (8 weeks)           | 35.00                |
|                          | AWS RDS PostgreSQL db.t3.micro        | 12.00                |
|                          | AWS S3 storage (15GB satellite tiles) | 0.35                 |
|                          | AWS Textract (200 PDF pages)          | 13.00                |
|                          | AWS CloudFront CDN                    | 2.00                 |
| **Development Tools**    | Domain registration (oneka.ai)        | 12.00                |
|                          | SSL certificate                       | 0.00 (Let's Encrypt) |
|                          | GitHub (team collaboration)           | 0.00 (free tier)     |
| **Data Services**        | Copernicus satellite data             | 0.00 (free access)   |
|                          | ML training compute                   | 2.00                 |
| **External Support**     | GIS specialist stipend                | 500.00               |
|                          | Legal advisor consultation            | 1,000.00             |
| **Contingency (10%)**    | Buffer for unexpected costs           | 157.64               |
| **TOTAL MVP COST**       |                                       | **1,733.99**         |

### 7.2 Annual Production Costs (Post-MVP Scale)

| Category             | Item                             | Cost (USD/year) |
| -------------------- | -------------------------------- | --------------- |
| **Infrastructure**   | AWS EC2 t3.large (auto-scaling)  | 600             |
|                      | AWS RDS Multi-AZ                 | 1,200           |
|                      | AWS S3 storage (100GB)           | 28              |
|                      | AWS Textract (10,000 pages)      | 650             |
|                      | CloudFront CDN                   | 120             |
| **Satellite Data**   | Copernicus (monitoring)          | 0               |
|                      | Planet SkySat (validation)       | 120,000         |
|                      | Maxar WorldView (legal evidence) | 50,000          |
| **Personnel**        | 2 Full-time engineers            | 60,000          |
|                      | 1 Part-time GIS analyst          | 20,000          |
| **TOTAL PRODUCTION** |                                  | **252,598**     |

### 7.3 Return on Investment

**Cost Analysis:**

- MVP Development: USD 1,734
- Annual Production: USD 252,598
- Cost per audit (10,000 audits/year): USD 25.26 (KES 3,289)

**Impact Analysis:**

- Traditional audit cost: KES 2-5 million per project
- ONEKA audit cost: KES 3,289 per project
- Cost reduction: 99.8%
- Ghost projects flagged annually: 50 minimum
- Average ghost project value: KES 200 million
- Total fraud detected: KES 10 billion (USD 77 million)
- Conservative recovery rate: 30%
- Funds recovered: KES 3 billion (USD 23 million)
- ROI: 91:1 (every shilling spent recovers KES 91)

---

## 8. Risk Management

### 8.1 Technical Risks

| Risk                              | Probability  | Impact | Mitigation Strategy                                                                          |
| --------------------------------- | ------------ | ------ | -------------------------------------------------------------------------------------------- |
| PPIP website blocks scraper       | Medium (40%) | Medium | Transparent bot identification, rate limiting (5s intervals), PPRA engagement for API access |
| Cloud cover limits satellite data | High (60%)   | High   | Use Sentinel-1 SAR for all-weather monitoring, NDWI for flood filtering                      |
| ML model accuracy below target    | Medium (35%) | High   | Expand training dataset to 40 projects, ensemble methods, manual review queue                |
| Training data labeling delays     | Medium (30%) | Low    | Hire GIS specialist, use pre-labeled OAG datasets                                            |
| Google 3D Tiles quota exceeded    | Low (20%)    | Medium | Start with free tier (500 tiles/day), optimize caching, budget for overages                  |

### 8.2 Legal and Compliance Risks

| Risk                              | Probability  | Impact | Mitigation Strategy                                                                              |
| --------------------------------- | ------------ | ------ | ------------------------------------------------------------------------------------------------ |
| Evidence admissibility challenged | Medium (40%) | High   | KSA certification partnership, commercial imagery for court cases, full provenance documentation |
| Data privacy concerns             | Low (15%)    | Medium | Automated personal data sanitization, DPA 2019 Section 25 public interest exemption              |
| PPIP Terms of Service violation   | Medium (30%) | Medium | Formal PPRA engagement, fair use justification, seek official API access                         |

### 8.3 Operational Risks

| Risk                       | Probability  | Impact | Mitigation Strategy                                                                     |
| -------------------------- | ------------ | ------ | --------------------------------------------------------------------------------------- |
| Team member unavailability | Low (20%)    | Medium | Cross-training on critical components, documentation emphasis, modular architecture     |
| Delays in OAG partnership  | Medium (40%) | Medium | Continue development independently, prepare demo for alternative stakeholders           |
| Budget overrun             | Low (25%)    | Low    | 10% contingency buffer, free-tier cloud services where possible, phased feature rollout |

---

## 9. Legal Compliance Framework

### 9.1 Applicable Legislation

**Access to Information Act (2016)**

- Legal basis: Section 4(1) grants citizens right to access public sector information
- Application: All procurement and budget data collected by ONEKA falls under Public Sector Information category
- Strategy: Frame data collection as exercise of constitutional transparency rights

**Data Protection Act (2019)**

- Legal basis: Section 25(1)(d) public interest exemption
- Application: ONEKA processes no personal data through automated sanitization on ingestion
- Strategy: Drop phone numbers, emails, ID numbers before database storage; process only public-interest data (project locations, budgets, contractor company names)

**Kenya Information and Communications Act (Cybercrimes Amendment)**

- Legal basis: Avoid Section 4 (unauthorized access) and Section 4A (system interference)
- Application: Web scraping conducted transparently with rate limiting
- Strategy: Transparent User-Agent identification, 5-second request intervals, respect for robots.txt

**Copyright Act (2001)**

- Legal basis: Section 26(1)(viii) allows reproduction for reporting current affairs
- Application: Source attribution for all government data used
- Strategy: Display data source citations on dashboard and in reports

### 9.2 Compliance Measures

**Data Sanitization Protocol**

- Automated regex filtering of personal identifiers
- Focus exclusively on public infrastructure coordinates (not private residences)
- Manual review queue for edge cases

**Web Scraping Best Practices**

- Transparent bot identification: User-Agent header declaring ONEKA purpose
- Rate limiting: 5-second intervals between requests (12 requests/minute)
- Respect robots.txt directives
- Fallback to manual CSV upload if access restricted
- Formal engagement with PPRA for API access during pilot phase

**Data Attribution Requirements**

- Source citations on all dashboard displays
- Access timestamps in database records
- Legal justification statement published at oneka.ai/legal

---

## 10. Post-MVP Roadmap

### Phase 2: Pilot Deployment (Months 3-6)

- Deploy to Office of the Auditor General for field testing
- Process 500 active infrastructure projects
- Establish KSA partnership for certification authority
- Validate ML model predictions against actual audit outcomes
- Refine risk scoring algorithm based on auditor feedback

### Phase 3: National Scale (Months 7-12)

- Expand to all 47 counties
- Process 10,000+ infrastructure projects annually
- Integrate with IFMIS through official government partnership
- Add predictive budget absorption analysis
- Establish court admissibility precedent for satellite evidence

### Phase 4: Regional Expansion (Year 2+)

- Adapt system for East African Community member states
- Customize for different procurement frameworks
- Multilingual support
- Regional data sharing agreements
- Training programs for national audit offices

---

## 11. Conclusion

This technical roadmap provides a comprehensive and executable plan to deliver ONEKA AI's Minimum Viable Product within an 8-week timeframe. The system addresses a critical gap in Kenya's infrastructure accountability mechanisms by combining data interoperability, machine learning prediction, and satellite verification into a unified platform.

### Key Strengths

**Technical Feasibility:** Built on proven technologies (PostgreSQL, FastAPI, React, scikit-learn) with realistic scope and clear dependencies.

**Budget Efficiency:** Total MVP cost of USD 1,734 demonstrates responsible resource allocation, with 99.8% cost reduction compared to traditional auditing.

**Legal Compliance:** Comprehensive framework addressing Access to Information Act, Data Protection Act, and Cybercrimes Act ensures operational legitimacy.

**Measurable Impact:** Clear success metrics including 12+ ghost projects flagged, 48-hour audit cycles, and projected 91:1 return on investment.

**Scalability:** Modular architecture enables expansion from 100 projects in MVP to 10,000+ in production without fundamental redesign.

### Expected Outcomes

By the end of Week 8, ONEKA AI will demonstrate:

- Automated processing of 100 government tender records
- 85%+ accuracy in project geolocation
- Machine learning model with 80-85% prediction accuracy
- Interactive 3D dashboard with satellite verification
- 12+ flagged ghost projects with evidence-backed risk assessments
- 48-hour audit completion capability
- Full legal compliance framework

This MVP will position ONEKA AI as a transformative tool for infrastructure accountability, not only in Kenya but across sub-Saharan Africa, where ghost projects divert billions from critical public services annually.

---

**Document Status:** Final v1.0  
**Prepared By:** ONEKA AI Development Team  
**Contact:** technical@oneka.ai  
**Date:** January 29, 2026

---

_ONEKA AI: Transforming Infrastructure Auditing from Reactive Investigation to Proactive Prevention_
