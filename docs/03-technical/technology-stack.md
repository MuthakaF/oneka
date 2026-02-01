# ONEKA AI: Technology Stack Specification

**Document Version**: 1.0  
**Date**: February 1, 2026  
**Author**: Oneka CTO  
**Classification**: Technical Architecture

---

## Executive Summary

This document outlines the complete technology stack for ONEKA AI's infrastructure auditing platform. All selections have been validated for production readiness, cost-effectiveness, and scalability to process 10,000+ infrastructure projects annually.

**Core Principle**: Build on proven, open-source technologies with strong community support, minimizing vendor lock-in while ensuring legal compliance and operational resilience.

---

## 1. Backend Infrastructure

### 1.1 Application Framework

| Component          | Technology | Version | License | Purpose                                                                |
| ------------------ | ---------- | ------- | ------- | ---------------------------------------------------------------------- |
| **API Framework**  | FastAPI    | Latest  | MIT     | RESTful API development, async request handling                        |
| **Runtime**        | Python     | 3.11+   | PSF     | Primary programming language                                           |
| **ASGI Server**    | Uvicorn    | Latest  | BSD-3   | Production ASGI server for FastAPI                                     |
| **Task Queue**     | Celery     | Latest  | BSD     | Asynchronous task processing (satellite downloads, ML batch inference) |
| **Message Broker** | Redis      | 7.x     | BSD-3   | Task queue backend, caching layer                                      |

**Key Libraries**:

```python
fastapi==0.109.0
uvicorn==0.27.0
celery==5.3.6
redis==5.0.1
pydantic==2.5.3  # Data validation
boto3==1.34.20   # AWS SDK
requests==2.31.0 # HTTP client
beautifulsoup4==4.12.3  # HTML parsing
```

### 1.2 Database Layer

| Component             | Technology | Version | License            | Purpose                                  |
| --------------------- | ---------- | ------- | ------------------ | ---------------------------------------- |
| **Primary Database**  | PostgreSQL | 15.x    | PostgreSQL License | Relational data storage                  |
| **Spatial Extension** | PostGIS    | 3.3.x   | GPL-2.0            | Geospatial data types, indexing, queries |
| **ORM**               | SQLAlchemy | 2.0.x   | MIT                | Database abstraction layer               |
| **Migrations**        | Alembic    | 1.13.x  | MIT                | Database schema versioning               |

**Database Schema Tables**:

- `tenders` - Procurement records from PPIP
- `satellite_analysis` - Multi-layer satellite metrics (NDVI, SAR, NDWI)
- `ml_predictions` - Risk scores and model outputs
- `concordance_mappings` - Cross-system entity resolution
- `audit_reports` - Generated evidence packages

**PostGIS Functions Used**:

- `ST_Distance()` - Geospatial proximity matching
- `ST_DWithin()` - Radius-based facility searches
- `ST_MakePoint()` - Coordinate geometry creation
- `Geography` type for accurate earth-curvature calculations

---

## 2. Satellite Data Processing

### 2.1 Optical Imagery (Sentinel-2)

| Component              | Technology | Version    | Purpose                                        |
| ---------------------- | ---------- | ---------- | ---------------------------------------------- |
| **Processing Library** | Satpy      | 0.45.0+    | Sentinel-2 SAFE format reader, band operations |
| **Raster I/O**         | rasterio   | 1.3.9+     | GeoTIFF reading/writing, windowed operations   |
| **Array Processing**   | xarray     | 2023.12.0+ | Multi-dimensional satellite data arrays        |
| **Parallel Computing** | dask       | 2023.12.1+ | Lazy loading, distributed processing           |
| **Resampling**         | pyresample | 1.28.3+    | Geographic projection transformations          |

**Capabilities**:

- **Native SAFE Reader**: Direct ingestion of Sentinel-2 L1C and L2A products without SNAP dependency
- **Multi-Band Access**: All 13 spectral bands (B01-B12, B8A) at 10m, 20m, 60m resolutions
- **Vegetation Indices**: Built-in NDVI, EVI, SAVI calculations
- **Cloud Masking**: Scene Classification Layer (SCL) filtering
- **Multi-Scene Mosaicking**: Automatic tile stitching for large project areas

**Processing Pipeline**:

```python
from satpy import Scene

# Load Sentinel-2 SAFE directory
scn = Scene(reader='msi_safe', filenames=['*.SAFE'])
scn.load(['B04', 'B08'])  # Red, NIR bands

# Calculate NDVI
ndvi = (scn['B08'] - scn['B04']) / (scn['B08'] + scn['B04'] + 1e-10)

# Export as GeoTIFF
scn.save_datasets(writer='geotiff', filename='output_{name}.tif')
```

### 2.2 Radar Imagery (Sentinel-1 SAR)

| Component          | Technology      | Version | Purpose                                                |
| ------------------ | --------------- | ------- | ------------------------------------------------------ |
| **SAR Processing** | PyroSAR         | 0.19.0+ | Sentinel-1 SAFE geocoding, radiometric correction      |
| **Backend Engine** | ESA SNAP        | 9.0+    | SAR calibration, terrain flattening, speckle filtering |
| **Orbit Files**    | Auto-downloaded | Latest  | Precise/Restituted Orbit State Vectors (POE/RES)       |

**Capabilities**:

- **All-Weather Monitoring**: Cloud-penetrating radar for Kenya's rainy season (60-80% cloud cover)
- **Automated Geocoding**: Radiometric Terrain Correction (RTC) with automatic DEM download
- **Dual Polarization**: VV (vertical-vertical) and VH (vertical-horizontal) backscatter
- **Border Noise Removal**: ESA's updated algorithm for artifact-free imagery
- **Change Detection**: Temporal backscatter difference for structure emergence

**Processing Pipeline**:

```python
from pyroSAR import identify, geocode

# Geocode Sentinel-1 GRD product
geocode(
    infile='S1A_IW_GRDH_*.zip',
    outdir='output/',
    spacing=10,  # 10m resolution
    scaling='dB',  # Decibel backscatter
    polarizations=['VV', 'VH'],
    removeS1BorderNoise=True,
    terrainFlattening=True,  # RTC gamma0
    demName='Copernicus 30m Global DEM',
    allow_RES_OSV=True  # Use restituted orbits if precise unavailable
)
```

**SNAP Installation**:

- Size: ~5GB download
- Installation: Command-line or GUI installer from https://step.esa.int/
- License: GPL-3.0, free and open-source
- Required for: PyroSAR Sentinel-1 geocoding (no alternatives for free processing)

### 2.3 Satellite Data Sources

| Provider                 | Product        | Resolution    | Revisit   | Coverage  | Cost                          |
| ------------------------ | -------------- | ------------- | --------- | --------- | ----------------------------- |
| **Copernicus (Primary)** | Sentinel-2 L2A | 10m (optical) | 5 days    | Global    | Free                          |
| **Copernicus (Primary)** | Sentinel-1 GRD | 10m (SAR)     | 12 days   | Global    | Free                          |
| **Sentinel Hub (API)**   | Process API    | 10m           | On-demand | Global    | Free tier 30K requests/month  |
| **Planet (Future)**      | SkySat Tasking | 50cm          | Daily     | On-demand | ~$300 per 25km² scene         |
| **Maxar (Future)**       | WorldView-3    | 31cm          | Tasking   | On-demand | ~$25 per km² (legal evidence) |

**Data Access Methods**:

1. **Copernicus Data Space Ecosystem** (Primary for MVP):
   - URL: https://dataspace.copernicus.eu/
   - Archive: 2014-present (Sentinel-1), 2015-present (Sentinel-2)
   - Authentication: Free account registration
   - API: REST API with Python `sentinelsat` library
   - Bandwidth: No quotas, no throttling

2. **AWS Open Data Registry** (Backup):
   - Buckets: `s3://sentinel-s1-l1c`, `s3://sentinel-s2-l2a`
   - Egress: $0.09/GB outside AWS regions
   - Benefit: Pre-indexed for COG (Cloud-Optimized GeoTIFF)

3. **Google Cloud Public Datasets** (Future):
   - Similar to AWS, requester-pays model
   - Benefit: Integration with Google Earth Engine

### 2.4 Multi-Layer Analysis

**Layer 1: NDVI (Normalized Difference Vegetation Index)**

- Formula: `(NIR - Red) / (NIR + Red)`
- Bands: Sentinel-2 B08 (NIR), B04 (Red)
- Purpose: Primary indicator of vegetation clearing (construction startup signal)
- Interpretation:
  - NDVI > 0.3: Healthy vegetation (no clearing)
  - NDVI drop > 0.15: Significant clearing event (construction likely)
  - NDVI recovery > 50%: Abandonment signal (vegetation regrowth)

**Layer 2: SAR Backscatter**

- Source: Sentinel-1 VV polarization
- Purpose: All-weather structural detection (vertical buildings increase backscatter)
- Interpretation:
  - Backscatter increase > 3dB: New structures detected
  - Stable backscatter: No physical progress
- Advantage: Works through clouds (critical for Central Kenya rainy season)

**Layer 3: False Color Composite (NIR-Red-Green)**

- Bands: B08-B04-B03
- Purpose: Visual verification for manual labeling of training data
- Advantage: Infrastructure appears blue/purple, vegetation bright red

**Layer 4: NDWI (Normalized Difference Water Index)**

- Formula: `(Green - NIR) / (Green + NIR)`
- Bands: Sentinel-2 B03 (Green), B08 (NIR)
- Purpose: Quality control - filter seasonal flooding false positives
- Interpretation: NDWI > 0.3 indicates water presence (exclude from analysis)

---

## 3. Machine Learning Pipeline

### 3.1 ML Framework

| Component               | Technology                   | Version | Purpose                                 |
| ----------------------- | ---------------------------- | ------- | --------------------------------------- |
| **Core Library**        | scikit-learn                 | 1.4.0+  | Random Forest classifier, preprocessing |
| **Data Manipulation**   | pandas                       | 2.1.4+  | Feature engineering, CSV I/O            |
| **Numerical Computing** | numpy                        | 1.26.3+ | Array operations, statistics            |
| **Model Serialization** | joblib                       | 1.3.2+  | Model persistence (pickle alternative)  |
| **Validation**          | scikit-learn.model_selection | 1.4.0+  | Cross-validation, train-test split      |

### 3.2 Model Architecture

**Algorithm**: Random Forest Classifier

**Justification**:

- Handles non-linear relationships in satellite time-series
- Robust to outliers (cloud contamination, sensor noise)
- Interpretable feature importance (required for auditor trust)
- Proven performance on small datasets (30-50 training samples)
- No need for feature scaling (unlike SVM or neural networks)

**Hyperparameters** (Optimized):

```python
RandomForestClassifier(
    n_estimators=100,        # 100 decision trees in ensemble
    max_depth=10,            # Prevent overfitting on small dataset
    min_samples_split=5,     # Minimum 5 samples to split node
    min_samples_leaf=2,      # Minimum 2 samples per leaf
    max_features='sqrt',     # √(num_features) for each split
    class_weight='balanced', # Handle imbalanced dataset (more successes than ghosts)
    random_state=42,         # Reproducible results
    n_jobs=-1                # Use all CPU cores
)
```

### 3.3 Feature Engineering

**Input Features** (15 total):

**NDVI-Based Features** (7):

1. `ndvi_initial` - Baseline vegetation at project award date
2. `ndvi_final` - Current vegetation level
3. `ndvi_max_drop` - Maximum vegetation loss during timeline
4. `ndvi_slope` - Linear regression slope over time
5. `ndvi_recovery_ratio` - Proportion of vegetation regrowth (abandonment indicator)
6. `clearing_detected` - Binary flag (1 if drop > 0.15)
7. `months_to_clearing` - Time from award to first clearing event

**SAR-Based Features** (4): 8. `sar_initial` - Baseline backscatter at award date 9. `sar_final` - Current backscatter level 10. `sar_increase` - Backscatter change (structure indicator) 11. `structure_detected` - Binary flag (1 if increase > 3dB)

**Temporal Features** (2): 12. `months_active` - Time from award to current date 13. `progress_gap` - Expected spending % minus estimated physical progress %

**Project Metadata** (2): 14. `contract_value_log` - Log-transformed budget (handles wide value range) 15. `project_type` - One-hot encoded (health, education, roads, water)

**Target Variable**:

- `outcome` - Binary classification (1 = COMPLETED, 0 = GHOST/ABANDONED)

### 3.4 Training Process

**Dataset**:

- Size: 30 historical projects (20 completed + 10 ghosts)
- Time-series: 24 months of monthly satellite observations per project
- Total observations: 720 satellite data points
- Features: 15 engineered features per project

**Training Protocol**:

```python
from sklearn.model_selection import train_test_split, cross_val_score

# 70-30 train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, stratify=y, random_state=42
)

# Train model
model.fit(X_train, y_train)

# 5-fold cross-validation
cv_scores = cross_val_score(model, X, y, cv=5, scoring='f1')
print(f"CV F1 Score: {cv_scores.mean():.3f} (+/- {cv_scores.std():.3f})")

# Performance metrics
from sklearn.metrics import classification_report, confusion_matrix
print(classification_report(y_test, model.predict(X_test)))
```

**Performance Targets**:

- Accuracy: 80-85%
- Precision (ghost detection): 75-80% (minimize false alarms)
- Recall (ghost detection): 80-85% (catch most fraud)
- F1 Score: 77-82%

### 3.5 Prediction API

**Inference Architecture**:

```python
from fastapi import FastAPI
import joblib

app = FastAPI()
model = joblib.load('models/oneka_ghost_detector_v1.pkl')

@app.post("/api/predict")
def predict_risk(project_timeseries: dict):
    # Feature engineering from satellite data
    features = engineer_features(project_timeseries)

    # Model prediction
    proba = model.predict_proba([features])[0]
    ghost_probability = proba[0]
    risk_score = int(ghost_probability * 100)

    # Risk categorization
    if risk_score >= 70:
        category = "HIGH_RISK"
    elif risk_score >= 40:
        category = "MEDIUM_RISK"
    else:
        category = "LOW_RISK"

    return {
        "risk_score": risk_score,
        "category": category,
        "confidence": max(proba),
        "feature_importance": get_top_drivers(features, model)
    }
```

**Response Time Target**: < 2 seconds per prediction

---

## 4. Frontend & Visualization

### 4.1 Web Application

| Component            | Technology   | Version | Purpose                           |
| -------------------- | ------------ | ------- | --------------------------------- |
| **Framework**        | Next.js      | 16.x    | React framework with SSR, routing |
| **Runtime**          | React        | 18.x    | UI component library              |
| **Styling**          | Tailwind CSS | 4.x     | Utility-first CSS framework       |
| **UI Components**    | Shadcn UI    | Latest  | Accessible component library      |
| **State Management** | React Query  | 5.x     | Server state synchronization      |
| **HTTP Client**      | Axios        | 1.6.x   | API requests with interceptors    |

### 4.2 3D Visualization

| Component              | Technology                     | Version  | Purpose                                 |
| ---------------------- | ------------------------------ | -------- | --------------------------------------- |
| **3D Engine**          | CesiumJS                       | 1.91+    | WebGL globe rendering, 3D Tiles support |
| **Base Layer**         | Google Photorealistic 3D Tiles | Latest   | Photorealistic building meshes          |
| **Tile Format**        | OGC 3D Tiles 1.0               | Standard | Open standard for 3D geospatial content |
| **Satellite Overlays** | XYZ Tile Layer                 | Custom   | Semi-transparent NDVI/SAR heatmaps      |

**CesiumJS Integration**:

```javascript
import { Viewer, Cesium3DTileset, ImageryLayer } from "cesium";

// Initialize viewer
const viewer = new Viewer("cesiumContainer", {
  terrainProvider: await Cesium.createWorldTerrainAsync(),
});

// Add Google 3D Tiles
const tileset = await Cesium3DTileset.fromUrl(
  "https://tile.googleapis.com/v1/3dtiles/root.json?key=API_KEY",
  { showCreditsOnScreen: true },
);
viewer.scene.primitives.add(tileset);

// Add NDVI overlay (50% transparent)
const ndviLayer = new ImageryLayer(
  new UrlTemplateImageryProvider({
    url: "https://tiles.oneka.ai/ndvi/{z}/{x}/{y}.png",
  }),
  { alpha: 0.5, show: true },
);
viewer.imageryLayers.add(ndviLayer);
```

**3D Tiles Requirements**:

- CesiumJS 1.91+ for OGC 3D Tiles 1.0 support
- Google Cloud billing account (not free tier)
- Attribution display: "© Google 2026"
- Request limit: 28,500 tile requests per session

### 4.3 Tile Generation

**Satellite Overlay Tiles**:

```python
import mercantile
from rasterio.warp import transform_bounds
from PIL import Image

def geotiff_to_xyz_tiles(geotiff_path, output_dir):
    """Convert satellite GeoTIFF to XYZ web map tiles (zoom 10-18)"""
    with rasterio.open(geotiff_path) as src:
        bounds = transform_bounds(src.crs, 'EPSG:4326', *src.bounds)

        for zoom in range(10, 19):
            tiles = mercantile.tiles(*bounds, zooms=zoom)

            for tile in tiles:
                # Extract tile region from GeoTIFF
                tile_bounds = mercantile.bounds(tile)
                window = from_bounds(*tile_bounds, transform=src.transform)
                data = src.read(1, window=window)

                # Apply color ramp (NDVI: red-yellow-green)
                colored = apply_colormap(data, 'RdYlGn')

                # Save PNG
                save_path = f"{output_dir}/{tile.z}/{tile.x}/{tile.y}.png"
                Image.fromarray(colored).save(save_path)
```

**Storage**: AWS S3 + CloudFront CDN for global delivery

---

## 5. Cloud Infrastructure (AWS)

### 5.1 Compute Services

| Service               | Instance Type | Purpose                                  | Cost/Hour         |
| --------------------- | ------------- | ---------------------------------------- | ----------------- |
| **EC2 (Web Server)**  | t3.medium     | FastAPI application, API gateway         | $0.0416           |
| **EC2 (ML Training)** | t3.large      | Model training, batch inference          | $0.0832           |
| **Lambda**            | N/A           | Serverless PPIP scraping, event triggers | $0.20/1M requests |
| **Elastic Beanstalk** | t3.medium     | Auto-scaling web app deployment          | Included with EC2 |

### 5.2 Storage Services

| Service                    | Storage Class                          | Purpose                                 | Cost                                  |
| -------------------------- | -------------------------------------- | --------------------------------------- | ------------------------------------- |
| **S3 Standard**            | Hot storage                            | Satellite tiles, GeoTIFFs, PDF archives | $0.023/GB-month                       |
| **S3 Intelligent-Tiering** | Auto-tiering                           | Archived training data                  | $0.023 → $0.0125/GB                   |
| **RDS PostgreSQL**         | db.t3.micro (dev), db.t3.medium (prod) | Primary database                        | $0.017/hour (dev), $0.068/hour (prod) |
| **ElastiCache Redis**      | cache.t3.micro                         | Task queue, API caching                 | $0.017/hour                           |

### 5.3 AI/ML Services

| Service      | Feature                   | Purpose                           | Cost         |
| ------------ | ------------------------- | --------------------------------- | ------------ |
| **Textract** | Detect Document Text      | Basic PDF text extraction         | $0.0015/page |
| **Textract** | Analyze Document (Forms)  | Budget/location entity extraction | $0.065/page  |
| **Textract** | Analyze Document (Tables) | Tender comparison tables          | $0.065/page  |

**MVP Usage**:

- 100 tender PDFs × 8 pages average = 800 pages
- Cost: 800 × $0.065 = $52 (within free tier 1,000 pages/month for first 3 months)

### 5.4 Networking & Security

| Service                 | Purpose                                                       |
| ----------------------- | ------------------------------------------------------------- |
| **CloudFront CDN**      | Global content delivery for satellite tiles, dashboard assets |
| **Route 53**            | DNS management for oneka.ai domain                            |
| **Certificate Manager** | Free SSL/TLS certificates for HTTPS                           |
| **IAM**                 | Role-based access control (Lambda execution, S3 access)       |
| **VPC**                 | Network isolation for RDS database                            |
| **Security Groups**     | Firewall rules (PostgreSQL port 5432 restricted to backend)   |

### 5.5 DevOps & Monitoring

| Service         | Purpose                                                      |
| --------------- | ------------------------------------------------------------ |
| **CloudWatch**  | Application logs, metric dashboards, API request monitoring  |
| **EventBridge** | Event-driven automation (trigger Lambda on new PPIP tenders) |
| **SNS**         | Alert notifications (high-risk project detected)             |
| **CodeDeploy**  | Automated deployment pipeline (GitHub Actions integration)   |

---

## 6. Data Integration Services

### 6.1 External Data Sources

| Source                   | Access Method                           | Data Format              | Update Frequency |
| ------------------------ | --------------------------------------- | ------------------------ | ---------------- |
| **PPIP**                 | Web scraping (requests + BeautifulSoup) | HTML → JSON              | Daily            |
| **KMHFL**                | CSV download from DHIS2                 | CSV (13,000+ facilities) | Monthly          |
| **Controller of Budget** | PDF download + Textract OCR             | PDF → Structured JSON    | Quarterly        |
| **Copernicus**           | REST API (sentinelsat library)          | SAFE (ZIP with GeoTIFF)  | On-demand        |

### 6.2 Text Processing

| Component              | Technology             | Purpose                                               |
| ---------------------- | ---------------------- | ----------------------------------------------------- |
| **OCR**                | AWS Textract           | Extract budget, location, contractor from tender PDFs |
| **Entity Extraction**  | spaCy (en_core_web_sm) | Named entity recognition for facility names           |
| **Fuzzy Matching**     | rapidfuzz              | Geolocation matching against KMHFL database           |
| **Text Normalization** | NLTK                   | Standardize county/ward names                         |

**Fuzzy Matching Algorithm**:

```python
from rapidfuzz import fuzz, process

def match_facility(project_name, ward):
    """Match tender project to KMHFL facility using fuzzy string matching"""
    # Filter candidates by ward/county
    candidates = kmhfl_db.query(ward=ward)

    # Use token set ratio (handles word order, partial matches)
    match, score, _ = process.extractOne(
        project_name,
        [f.facility_name for f in candidates],
        scorer=fuzz.token_set_ratio
    )

    if score >= 75:  # 75% confidence threshold
        return match, score
    else:
        return None, 0
```

---

## 7. Development Tools

### 7.1 Version Control & CI/CD

| Tool               | Purpose                                      |
| ------------------ | -------------------------------------------- |
| **GitHub**         | Source code repository, issue tracking       |
| **GitHub Actions** | Continuous integration/deployment pipeline   |
| **Docker**         | Containerization for consistent environments |
| **docker-compose** | Local multi-container development setup      |

**CI/CD Pipeline** (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: pytest tests/

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: aws-actions/configure-aws-credentials@v2
      - run: eb deploy oneka-production
```

### 7.2 Testing Frameworks

| Framework      | Purpose                                |
| -------------- | -------------------------------------- |
| **pytest**     | Backend unit and integration tests     |
| **pytest-cov** | Code coverage reporting (target: 80%+) |
| **Jest**       | Frontend component testing             |
| **Playwright** | End-to-end browser automation testing  |

### 7.3 Code Quality

| Tool         | Purpose                                   |
| ------------ | ----------------------------------------- |
| **Black**    | Python code formatting (PEP 8 compliance) |
| **Flake8**   | Python linting                            |
| **mypy**     | Python type checking                      |
| **ESLint**   | JavaScript/TypeScript linting             |
| **Prettier** | JavaScript code formatting                |

---

## 8. Security & Compliance

### 8.1 Authentication & Authorization

| Component             | Technology            | Purpose                                         |
| --------------------- | --------------------- | ----------------------------------------------- |
| **Authentication**    | JWT (JSON Web Tokens) | Stateless session management                    |
| **Password Hashing**  | bcrypt                | Secure password storage                         |
| **API Keys**          | UUID v4               | External API authentication                     |
| **Role-Based Access** | FastAPI dependencies  | User permission levels (admin, auditor, viewer) |

### 8.2 Data Protection

| Measure                        | Implementation                                         |
| ------------------------------ | ------------------------------------------------------ |
| **Encryption at Rest**         | AWS S3 SSE-S3, RDS encryption enabled                  |
| **Encryption in Transit**      | TLS 1.3 via CloudFront, HTTPS-only                     |
| **Personal Data Sanitization** | Automated regex filtering (emails, phone, ID numbers)  |
| **Backup Strategy**            | S3 versioning, RDS automated backups (7-day retention) |

### 8.3 Compliance Tools

| Tool                | Purpose                                          |
| ------------------- | ------------------------------------------------ |
| **AWS Config**      | Compliance monitoring (DPA 2019 data residency)  |
| **CloudTrail**      | Audit logging (API access, data modifications)   |
| **Secrets Manager** | Secure storage of API keys, database credentials |

---

## 9. Monitoring & Observability

### 9.1 Logging

| Component            | Tool                               | Purpose                                   |
| -------------------- | ---------------------------------- | ----------------------------------------- |
| **Application Logs** | Python `logging` + CloudWatch Logs | Error tracking, debug information         |
| **Access Logs**      | CloudFront access logs → S3        | Request patterns, geographic distribution |
| **Database Logs**    | RDS slow query log                 | Performance bottleneck identification     |

### 9.2 Metrics & Alerts

| Metric                   | Threshold                     | Alert Action               |
| ------------------------ | ----------------------------- | -------------------------- |
| **API Response Time**    | > 3 seconds (95th percentile) | SNS notification to DevOps |
| **Error Rate**           | > 5% of requests              | Email alert + PagerDuty    |
| **Database Connections** | > 80% pool utilization        | Scale RDS instance         |
| **S3 Egress**            | > $50/day                     | Billing alarm              |

### 9.3 Performance Monitoring

| Tool                         | Purpose                                              |
| ---------------------------- | ---------------------------------------------------- |
| **CloudWatch Dashboards**    | Real-time system health visualization                |
| **AWS X-Ray**                | Distributed tracing for API request latency analysis |
| **RDS Performance Insights** | Query performance analysis                           |

---

## 10. Cost Optimization

### 10.1 MVP Budget (8 Weeks)

| Category            | Estimated Cost |
| ------------------- | -------------- |
| AWS Infrastructure  | $82            |
| GIS Specialist      | $500           |
| Legal Advisor       | $1,000         |
| Domain Registration | $12            |
| **Total MVP Cost**  | **$1,594**     |

### 10.2 Production Cost Projections (Annual)

| Category                                | Cost/Year   |
| --------------------------------------- | ----------- |
| AWS Compute (t3.medium 24/7)            | $600        |
| AWS RDS Multi-AZ                        | $1,200      |
| AWS S3 (100GB satellite tiles)          | $28         |
| AWS Textract (10,000 pages)             | $650        |
| CloudFront CDN                          | $120        |
| **Infrastructure Total**                | **$2,598**  |
| Personnel (2 engineers + 1 GIS analyst) | $80,000     |
| **Total Annual Cost**                   | **$82,598** |

**Cost Per Audit**: $82,598 ÷ 10,000 projects = **$8.26 per project**  
**Traditional Audit Cost**: $50,000 per project (field visit)  
**Savings**: 99.98%

---

## 11. Scalability Considerations

### 11.1 Horizontal Scaling

**Backend API**:

- Application Load Balancer + Auto Scaling Group
- Target: Scale from 1 → 10 instances based on CPU utilization (threshold: 70%)
- Database connection pooling: SQLAlchemy max 20 connections per instance

**Satellite Processing**:

- Celery distributed task queue with multiple workers
- Redis as message broker (can scale to Redis Cluster)
- Estimated throughput: 100 satellite analyses per hour per worker

### 11.2 Database Optimization

**Indexing Strategy**:

```sql
-- Geospatial index for proximity queries
CREATE INDEX idx_tenders_location ON tenders USING GIST(location);

-- Composite index for risk level filtering
CREATE INDEX idx_tenders_risk ON tenders(risk_score, geolocation_status);

-- Temporal index for date-range queries
CREATE INDEX idx_satellite_analysis_date ON satellite_analysis(analysis_date);
```

**Query Performance Targets**:

- Geospatial radius searches: < 50ms
- Risk dashboard aggregation: < 100ms
- Satellite time-series retrieval: < 200ms

### 11.3 Caching Strategy

**Redis Cache**:

- Satellite tile URLs: 24-hour TTL
- KMHFL facility lookup: 7-day TTL
- ML prediction results: 1-hour TTL (refresh as new satellite data arrives)

---

## 12. Version Control & Dependency Management

### 12.1 Python Dependencies

**requirements.txt** (Pinned Versions):

```
fastapi==0.109.0
uvicorn[standard]==0.27.0
sqlalchemy==2.0.25
psycopg2-binary==2.9.9
geoalchemy2==0.14.3
satpy==0.45.0
pyrosar==0.19.0
rasterio==1.3.9
scikit-learn==1.4.0
pandas==2.1.4
numpy==1.26.3
requests==2.31.0
beautifulsoup4==4.12.3
rapidfuzz==3.6.1
boto3==1.34.20
celery==5.3.6
redis==5.0.1
```

### 12.2 JavaScript Dependencies

**package.json**:

```json
{
  "dependencies": {
    "next": "^16.0.0",
    "react": "^18.2.0",
    "cesium": "^1.91.0",
    "axios": "^1.6.5",
    "@tanstack/react-query": "^5.17.19",
    "tailwindcss": "^4.0.0"
  }
}
```

---

## Appendix: Technology Decision Matrix

### Satellite Processing Library Evaluation

| Criteria                    | Satpy             | SNAP GUI            | Google Earth Engine     | Winner     |
| --------------------------- | ----------------- | ------------------- | ----------------------- | ---------- |
| **Python Native**           | ✅ Yes            | ❌ Java-based       | ❌ JavaScript API       | Satpy      |
| **Sentinel-2 SAFE Support** | ✅ Native         | ✅ Native           | ⚠️ Pre-processed only   | Tie        |
| **Licensing**               | MIT (free)        | GPL-3 (free)        | Proprietary (free tier) | Satpy      |
| **Offline Processing**      | ✅ Yes            | ✅ Yes              | ❌ Cloud-only           | Satpy/SNAP |
| **Multi-Band Access**       | ✅ All 13 bands   | ✅ All 13 bands     | ⚠️ Limited bands        | Tie        |
| **Learning Curve**          | Low (Pythonic)    | High (GUI + XML)    | Medium (JavaScript)     | Satpy      |
| **Community Support**       | 6.4K GitHub stars | Official ESA tool   | Large community         | SNAP       |
| **MVP Suitability**         | ✅✅✅            | ⚠️ Manual workflows | ❌ API quotas           | **Satpy**  |

**Decision**: Use **Satpy for Sentinel-2**, **PyroSAR+SNAP for Sentinel-1** (no Python alternative for free SAR geocoding)

---

**Document Status**: Final v1.0  
**Next Review**: Post-MVP (Week 9)  
**Maintained By**: Oneka CTO  
**Contact**: cto@oneka.co.ke
