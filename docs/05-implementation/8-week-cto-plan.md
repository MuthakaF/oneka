# ONEKA AI: 8-Week CTO Implementation Plan

**Version**: 1.0  
**Date**: January 29, 2026  
**Author**: CTO @ Oneka  
**Target**: NIRU AI Hackathon MVP Demo

---

## Executive Summary

This document defines a **pragmatic, buildable 8-week implementation plan** for ONEKA AI's Minimum Viable Product (MVP). As CTO, I've prioritized **demonstrable value over comprehensive coverage**, focusing on a working end-to-end system that can audit **3-5 pre-validated infrastructure projects** in Nairobi using verified technology stacks.

### What We're Building (MVP Scope)

- **Module A**: Smart Ingest Pipeline (PPIP tender scraping + AWS Textract OCR)
- **Module B**: Geolocation Engine (fuzzy matching against KMHFL health facility database)
- **Module C**: Multi-Layer Satellite Analysis (Sentinel-2 NDVI + Sentinel-1 SAR + False Color + NDWI)
- **Module D**: Predictive ML Model (Random Forest trained on 30 historical projects for ghost detection)
- **Module E**: 3D Visualization (Google 3D Tiles + multi-layer satellite overlays via CesiumJS)
- **Module F**: Risk Scoring (ML-powered prediction with 85% accuracy target)

### What We're NOT Building (Out of Scope)

- ❌ Multi-agent orchestration (Scout/Visionary/Auditor agents)
- ❌ Commercial imagery tasking (Planet SkySat Tier 3 workflow)
- ❌ S-Curve time-series regression model (simplified to binary classification)
- ❌ Full IFMIS/COB real-time integration (using COB PDFs only)
- ❌ Production-grade security/compliance (demo-level auth only)
- ❌ County government devolved fund integration

### Key Technical Decisions (Internet-Verified)

| Component                | Technology Choice                         | Verification Source                                                                                             | Cost/Constraints                                                |
| ------------------------ | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **3D Visualization**     | Google Maps Photorealistic 3D Tiles API   | [Google Docs](https://developers.google.com/maps/documentation/tile/3d-tiles)                                   | Requires billing account, CesiumJS 1.91+, OGC 3D Tiles standard |
| **OCR Pipeline**         | AWS Textract (Forms + Tables)             | [AWS Pricing](https://aws.amazon.com/textract/pricing/)                                                         | $0.065/page, 1000 pages/month free tier (first 3 months)        |
| **Satellite Imagery**    | Sentinel-2 Level-2A (10m optical)         | User Research Docs                                                                                              | Free via Copernicus, 5-day revisit, cloud-dependent             |
| **Satellite Processing** | Satpy (Sentinel-2) + PyroSAR (Sentinel-1) | [Satpy GitHub](https://github.com/pytroll/satpy), [PyroSAR GitHub](https://github.com/johntruckenbrodt/pyroSAR) | Open-source Python libraries, SNAP required for PyroSAR         |
| **ML Framework**         | Scikit-Learn Random Forest                | Industry standard                                                                                               | Open-source, proven performance on small datasets               |
| **Geospatial Database**  | PostGIS (PostgreSQL extension)            | Industry standard                                                                                               | Open-source, battle-tested                                      |
| **Frontend**             | React + CesiumJS 1.91+                    | WebGL rendering                                                                                                 | MIT license, 3D Tiles native support                            |

---

## Team Structure (8 Weeks)

### Core Team (3 Developers)

1. **Backend Engineer** (Python/AWS) - Weeks 1-8
   - Ingest pipeline (web scraping + Textract)
   - Geolocation engine (fuzzy matching)
   - PostGIS database setup
   - REST API development

2. **Geospatial ML Engineer** (Python/GIS/ML) - Weeks 1-7
   - Historical satellite data extraction (training set)
   - Satpy/PyroSAR integration for multi-layer processing
   - Feature engineering (NDVI slope, SAR backscatter change)
   - Random Forest model training and evaluation
   - PostGIS spatial queries

3. **Frontend Engineer** (React/WebGL) - Weeks 5-8
   - CesiumJS 3D Tiles integration
   - Interactive audit dashboard
   - Timeline visualization
   - Demo preparation

### CTO Role (You)

- Architecture decisions (Weeks 1-2)
- API vendor negotiations (Google Maps billing, AWS credits)
- Risk mitigation (geolocation void, demo site selection)
- Stakeholder demos (Week 8)

---

## Phase 1: Foundation & Data Ingestion (Weeks 1-2)

### Week 1: Infrastructure Setup + Historical Training Data Collection

**Backend Engineer Tasks:**

- [ ] Provision AWS account (request $1000 startup credits)
- [ ] Set up PostgreSQL + PostGIS RDS instance (db.t3.micro for dev)
- [ ] Configure AWS Textract API (activate free tier, 1000 pages/month)
- [ ] Set up S3 bucket for tender PDFs (`oneka-tenders-raw`)
- [ ] Set up S3 bucket for satellite imagery (`oneka-satellite-archive`)
- [ ] Create IAM roles (Lambda execution, Textract access, S3 access)
- [ ] Initialize Python project structure:
  ```
  oneka-backend/
  ├── src/
  │   ├── ingest/        # Module A
  │   ├── geolocate/     # Module B
  │   ├── satellite/     # Module C (multi-layer)
  │   ├── ml_training/   # Module D (NEW)
  │   ├── prediction/    # Module F (NEW)
  │   └── scoring/       # Module F
  ├── training_data/     # Historical projects CSV
  ├── models/            # Trained ML models
  ├── tests/
  ├── requirements.txt
  └── README.md
  ```

**Geospatial ML Engineer Tasks:**

- [ ] **Identify 30 completed projects for training dataset:**
  - 20 successful projects (confirmed operational via OAG reports or field verification)
  - 10 ghost/abandoned projects (confirmed fraud from OAG audit reports)
  - Criteria: GPS coordinates available, award date 2020-2023, minimum 12-month timeline
  - Sources: OAG annual reports, KMHFL facility registry, MOE school completion data
- [ ] Create `training_projects.csv`:
  ```csv
  project_uuid,project_name,project_type,latitude,longitude,award_date,completion_date,outcome,contract_value_kes
  550e8400-...,Kiambu Level 5 Hospital,health,-1.1714,36.8356,2021-01-15,2022-12-30,COMPLETED,450000000
  661f9511-...,Kajiado Ghost Hospital,health,-1.8523,36.7820,2021-04-01,never,GHOST,280000000
  ```
- [ ] Install satellite processing libraries:
  ```bash
  pip install satpy pyrosar rasterio scikit-learn pandas numpy matplotlib
  ```
- [ ] Set up Copernicus Data Space credentials for historical archive access

**Deliverable**: AWS environment provisioned, PostGIS database accessible, Python repo initialized, 30 training projects identified with GPS coordinates

### Week 2: Smart Ingest Pipeline (Module A) + Training Data Extraction

**Backend Engineer Tasks:**

- [ ] Implement PPIP scraper using `requests` + BeautifulSoup
  - Target URL: `https://tenders.go.ke/website/opportunities/view`
  - Focus: Health sector tenders (filter for hospitals/clinics)
  - Extract: Tender number, description, procuring entity, budget, deadline
- [ ] Build PDF downloader (save to S3 with naming: `{tender_id}_{date}.pdf`)
- [ ] Integrate AWS Textract API:
  ```python
  import boto3
  textract = boto3.client('textract')
  response = textract.analyze_document(
      Document={'S3Object': {'Bucket': 'oneka-tenders-raw', 'Name': 'pdf_key'}},
      FeatureTypes=['TABLES', 'FORMS']
  )
  ```
- [ ] Parse Textract JSON output → extract project name, location (Ward/County), budget, contractor
- [ ] Store structured data in PostGIS `tenders` table:
  ```sql
  CREATE TABLE tenders (
      id SERIAL PRIMARY KEY,
      tender_number VARCHAR(50) UNIQUE,
      project_name TEXT,
      location_text TEXT,  -- Raw "Kibra Ward, Nairobi County"
      budget NUMERIC,
      contractor VARCHAR(255),
      scraped_at TIMESTAMP,
      pdf_s3_key TEXT
  );
  ```

**Cost Estimate**:

- 100 tender PDFs × $0.065/page × avg 8 pages = **$52** (well within free tier for demo)

**Geospatial ML Engineer Tasks (Week 2):**

- [ ] **Extract satellite time-series for 30 training projects:**

  ```python
  # For each training project, extract monthly satellite data from award to completion
  from satpy import Scene
  import pandas as pd

  def extract_training_timeseries(project):
      lat, lon = project['latitude'], project['longitude']
      start_date = project['award_date']
      end_date = project['completion_date'] or project['award_date'] + 24 months

      # Generate monthly dates
      dates = pd.date_range(start_date, end_date, freq='MS')

      timeseries = []
      for date in dates:
          # NDVI from Sentinel-2
          ndvi = extract_ndvi(lat, lon, date)

          # SAR backscatter from Sentinel-1
          sar_vv = extract_sar_backscatter(lat, lon, date)

          # NDWI for flood filtering
          ndwi = extract_ndwi(lat, lon, date)

          timeseries.append({
              'date': date,
              'ndvi_mean': ndvi['mean'],
              'ndvi_std': ndvi['std'],
              'sar_vv_mean': sar_vv['mean'],
              'ndwi_mean': ndwi['mean'],
              'cloud_cover': ndvi['cloud_percentage']
          })

      return pd.DataFrame(timeseries)
  ```

- [ ] Save time-series to CSV: `training_data/{project_uuid}_timeseries.csv`
- [ ] **Manual labeling of construction phases** using False Color Composites:
  - Load images in QGIS with NIR-Red-Green bands
  - Label phases: "PRE_CONSTRUCTION", "LAND_CLEARING", "FOUNDATION", "SUPERSTRUCTURE", "COMPLETED", "ABANDONED"
  - Save labels: `training_data/{project_uuid}_labels.csv`
- [ ] **Quality control**: Filter dates with >30% cloud cover or high NDWI (flooding)

**Deliverable**: 100 health sector tenders ingested, OCR'd, and stored in PostGIS; 30 training projects with complete satellite time-series extracted (720+ data points total)

---

## Phase 2: Geolocation & Satellite Integration (Weeks 3-4)

### Week 3: Geolocation Engine (Module B) + Feature Engineering

**Backend Engineer Tasks:**

- [ ] Download **Kenya Master Health Facility List (KMHFL)** from [DHIS2](https://kmhfl.health.go.ke)
  - 13,000+ facilities with GPS coordinates
  - Format: CSV with columns `Facility_Name`, `Ward`, `County`, `Latitude`, `Longitude`
- [ ] Import KMHFL into PostGIS with geometry:
  ```sql
  CREATE TABLE kmhfl_facilities (
      id SERIAL PRIMARY KEY,
      facility_name VARCHAR(255),
      ward VARCHAR(100),
      county VARCHAR(50),
      location GEOGRAPHY(POINT, 4326)  -- PostGIS geospatial column
  );
  ```
- [ ] Implement fuzzy matching pipeline using `rapidfuzz`:

  ```python
  from rapidfuzz import fuzz, process

  def geolocate_tender(project_name, location_text):
      # Extract entities like "Kibra Health Centre"
      if "health centre" in project_name.lower():
          candidates = kmhfl_facilities.filter(ward=extract_ward(location_text))
          match, score = process.extractOne(
              project_name,
              [f.facility_name for f in candidates],
              scorer=fuzz.token_set_ratio
          )
          if score > 75:  # Confidence threshold
              return match.latitude, match.longitude, score
      return None, None, 0  # Geolocation failed
  ```

- [ ] Update `tenders` table with matched GPS:
  ```sql
  ALTER TABLE tenders ADD COLUMN matched_lat NUMERIC;
  ALTER TABLE tenders ADD COLUMN matched_lon NUMERIC;
  ALTER TABLE tenders ADD COLUMN match_confidence NUMERIC;
  ALTER TABLE tenders ADD COLUMN geolocation_status VARCHAR(20);
    -- 'HIGH_CONFIDENCE', 'LOW_CONFIDENCE', 'FAILED'
  ```

**Geospatial ML Engineer Tasks (Week 3):**

- [ ] **Feature engineering from satellite time-series:**

  ```python
  def engineer_features(timeseries_df, project):
      \"\"\"Extract ML features from satellite time-series\"\"\"
      features = {}

      # NDVI-based features
      features['ndvi_initial'] = timeseries_df['ndvi_mean'].iloc[0]
      features['ndvi_final'] = timeseries_df['ndvi_mean'].iloc[-1]
      features['ndvi_max_drop'] = timeseries_df['ndvi_mean'].max() - timeseries_df['ndvi_mean'].min()
      features['ndvi_slope'] = calculate_slope(timeseries_df['ndvi_mean'])
      features['ndvi_recovery_ratio'] = (features['ndvi_final'] - timeseries_df['ndvi_mean'].min()) / features['ndvi_max_drop']

      # SAR-based features
      features['sar_initial'] = timeseries_df['sar_vv_mean'].iloc[0]
      features['sar_final'] = timeseries_df['sar_vv_mean'].iloc[-1]
      features['sar_increase'] = features['sar_final'] - features['sar_initial']
      features['sar_max'] = timeseries_df['sar_vv_mean'].max()

      # Temporal features
      features['months_to_clearing'] = find_clearing_month(timeseries_df)
      features['months_to_completion'] = len(timeseries_df)
      features['clearing_detected'] = 1 if features['ndvi_max_drop'] > 0.15 else 0
      features['structure_detected'] = 1 if features['sar_increase'] > 3.0 else 0

      # Progress gap (financial vs physical)
      expected_progress = calculate_expected_progress(project['contract_value_kes'], months)
      actual_progress = estimate_physical_progress(timeseries_df)
      features['progress_gap'] = expected_progress - actual_progress

      return features
  ```

- [ ] Compile training dataset:\n `python\n  training_data = []\n  for project in training_projects:\n      timeseries = pd.read_csv(f'training_data/{project.uuid}_timeseries.csv')\n      features = engineer_features(timeseries, project)\n      features['outcome'] = 1 if project.outcome == 'COMPLETED' else 0  # Binary: 1=success, 0=ghost\n      training_data.append(features)\n  \n  X_train = pd.DataFrame(training_data)\n  X_train.to_csv('training_data/features.csv', index=False)\n  `

**Expected Success Rate**: 25-40% for health facilities (fuzzy match score > 75)

**Deliverable**: Geolocation engine operational, 25-40 of 100 tenders successfully geolocated; Training features extracted for 30 historical projects

### Week 4: Multi-Layer Satellite Processing (Module C) + ML Model Training (Module D)

**Geospatial Engineer Tasks:**

- [ ] Sign up for [Sentinel Hub](https://www.sentinel-hub.com/) free trial (requests up to 30,000/month)
- [ ] Implement Sentinel-2 L2A image retrieval using Process API:

  ```python
  from sentinelhub import SHConfig, SentinelHubRequest, DataCollection, MimeType

  config = SHConfig()
  config.sh_client_id = 'YOUR_CLIENT_ID'
  config.sh_client_secret = 'YOUR_SECRET'

  def fetch_sentinel2_image(lat, lon, date_from, date_to):
      bbox = [lon-0.005, lat-0.005, lon+0.005, lat+0.005]  # ~1km² area
      request = SentinelHubRequest(
          evalscript="""
          //VERSION=3
          function setup() { return { input: ["B04", "B08", "B11"], output: { bands: 3 } }; }
          function evaluatePixel(sample) {
              return [sample.B04, sample.B08, sample.B11];  // Red, NIR, SWIR
          }
          """,
          input_data=[SentinelHubRequest.input_data(
              data_collection=DataCollection.SENTINEL2_L2A,
              time_interval=(date_from, date_to),
              maxcc=0.3  # Max 30% cloud cover
          )],
          responses=[SentinelHubRequest.output_response('default', MimeType.TIFF)],
          bbox=bbox, size=(512, 512), config=config
      )
      return request.get_data()[0]
  ```

**Geospatial ML Engineer Tasks (Week 4):**

- [ ] **Implement multi-layer satellite processing using Satpy and PyroSAR:**

  ```python
  from satpy import Scene
  from pyroSAR import identify, geocode
  import numpy as np

  # Layer 1: NDVI (PRIMARY for ML)
  def extract_ndvi_satpy(lat, lon, date):
      \"\"\"Extract NDVI from Sentinel-2 using Satpy\"\"\"
      # Find SAFE files for date range
      safe_files = query_copernicus_dataspace(lat, lon, date, product='S2MSI2A')

      scn = Scene(filenames=safe_files, reader='msi_safe')
      scn.load(['B04', 'B08'])  # Red and NIR

      red = scn['B04'].values
      nir = scn['B08'].values
      ndvi = (nir - red) / (nir + red + 1e-10)

      return {
          'mean': np.nanmean(ndvi),
          'std': np.nanstd(ndvi),
          'cloud_percentage': scn['B04'].attrs.get('cloud_cover', 0)
      }

  # Layer 2: SAR Backscatter (ALL-WEATHER)
  def extract_sar_pyrosar(lat, lon, date):
      \"\"\"Extract SAR backscatter from Sentinel-1 using PyroSAR\"\"\"
      # Download Sentinel-1 GRD product
      s1_files = query_copernicus_dataspace(lat, lon, date, product='S1_GRD')

      # Process with PyroSAR (automatic OSV download, border noise removal, geocoding)
      geocode(
          infile=s1_files[0],
          outdir='temp/',
          t_srs=4326,
          spacing=10,
          scaling='dB',
          removeS1BorderNoise=True,
          osvdir='~/.snap/auxdata/Orbits/Sentinel-1/'
      )

      # Load geocoded output
      vv_backscatter = rasterio.open('temp/S1A_..._VV.tif').read(1)

      return {
          'mean': np.nanmean(vv_backscatter),
          'std': np.nanstd(vv_backscatter)
      }

  # Layer 3: False Color (VISUALIZATION for labeling)
  def generate_false_color(lat, lon, date):
      \"\"\"Generate NIR-Red-Green false color composite\"\"\"
      scn = Scene(filenames=safe_files, reader='msi_safe')
      scn.load(['B03', 'B04', 'B08'])  # Green, Red, NIR

      # Create RGB with NIR=Red, Red=Green, Green=Blue
      false_color = np.stack([scn['B08'].values, scn['B04'].values, scn['B03'].values], axis=2)

      # Save for manual review
      save_image(false_color, f'false_color/{project_uuid}_{date}.png')

  # Layer 4: NDWI (QUALITY CONTROL for flooding)
  def extract_ndwi(lat, lon, date):
      \"\"\"Extract NDWI to filter seasonal flooding false positives\"\"\"
      scn = Scene(filenames=safe_files, reader='msi_safe')
      scn.load(['B03', 'B08'])  # Green and NIR

      green = scn['B03'].values
      nir = scn['B08'].values
      ndwi = (green - nir) / (green + nir + 1e-10)

      return np.nanmean(ndwi)
  ```

- [ ] **Train Random Forest ML model:**

  ```python
  from sklearn.ensemble import RandomForestClassifier
  from sklearn.model_selection import train_test_split, cross_val_score
  from sklearn.metrics import classification_report, confusion_matrix
  import joblib

  # Load training features
  X = pd.read_csv('training_data/features.csv')
  y = X['outcome']  # 1=COMPLETED, 0=GHOST
  X = X.drop('outcome', axis=1)

  # Train-test split
  X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

  # Train Random Forest
  model = RandomForestClassifier(
      n_estimators=100,
      max_depth=10,
      min_samples_split=5,
      random_state=42
  )
  model.fit(X_train, y_train)

  # Evaluate
  y_pred = model.predict(X_test)
  print(classification_report(y_test, y_pred))
  print(f\"Accuracy: {model.score(X_test, y_test):.2f}\")

  # Cross-validation (5-fold)
  cv_scores = cross_val_score(model, X, y, cv=5)
  print(f\"CV Accuracy: {cv_scores.mean():.2f} (+/- {cv_scores.std():.2f})\")

  # Feature importance
  feature_importance = pd.DataFrame({
      'feature': X.columns,
      'importance': model.feature_importances_
  }).sort_values('importance', ascending=False)
  print(feature_importance)

  # Save model
  joblib.dump(model, 'models/oneka_ghost_detector_v1.pkl')
  ```

- [ ] Store satellite analysis results with multi-layer data:

  ```sql
  CREATE TABLE satellite_analysis (
      id SERIAL PRIMARY KEY,
      tender_id INTEGER REFERENCES tenders(id),
      analysis_date DATE,

      -- NDVI metrics
      ndvi_mean NUMERIC,
      ndvi_std NUMERIC,
      ndvi_change NUMERIC,

      -- SAR metrics
      sar_vv_mean NUMERIC,
      sar_backscatter_change NUMERIC,

      -- NDWI (quality control)
      ndwi_mean NUMERIC,
      flooding_detected BOOLEAN,

      -- Detection results
      clearing_detected BOOLEAN,
      structure_detected BOOLEAN,
      construction_status VARCHAR(50),

      -- ML prediction
      ml_risk_score INTEGER,  -- 0-100
      ml_prediction VARCHAR(20),  -- 'LIKELY_GHOST', 'ON_TRACK', 'UNCERTAIN'
      ml_confidence NUMERIC,

      analyzed_at TIMESTAMP
  );
  ```

**Performance Target**:

- Precision: 75-80% (minimize false alarms)
- Recall: 80-85% (catch most ghost projects)
- Accuracy: 80-85% overall

**Deliverable**: Multi-layer satellite pipeline operational (NDVI+SAR+NDWI), 25-40 geolocated tenders analyzed; Trained Random Forest model with 80%+ accuracy saved to `models/oneka_ghost_detector_v1.pkl`
ndvi_change NUMERIC,
construction_status VARCHAR(50),
analyzed_at TIMESTAMP
);

````

**Limitation Acknowledgment**:

- Sentinel-2 10m resolution cannot distinguish building types (warehouse vs clinic)
- System detects **presence/absence** (ghost projects) not **quality** (shoddy construction)

**Deliverable**: Sentinel-2 pipeline operational, 25-40 geolocated tenders analyzed for NDVI change

---

## Phase 3: Hybrid Visualization & Prediction System (Weeks 5-6)

### Week 5: Google 3D Tiles + Satellite Overlay Frontend (Module E)

**Frontend Engineer Tasks:**

- [ ] Initialize React app with CesiumJS:
```bash
npx create-react-app oneka-frontend
cd oneka-frontend
npm install cesium@1.91 mercantile
````

- [ ] Configure CesiumJS with Google 3D Tiles + Satellite Overlays:

  ```javascript
  import {
    Viewer,
    Cesium3DTileset,
    Ion,
    ImageryLayer,
    UrlTemplateImageryProvider,
    Color,
  } from "cesium";

  Ion.defaultAccessToken = "YOUR_CESIUM_ION_TOKEN";

  const viewer = new Viewer("cesiumContainer", {
    terrainProvider: Cesium.createWorldTerrain(),
  });

  // Base Layer: Google Photorealistic 3D Tiles
  const google3DTiles = await Cesium3DTileset.fromUrl(
    "https://tile.googleapis.com/v1/3dtiles/root.json?key=YOUR_GOOGLE_API_KEY",
  );
  viewer.scene.primitives.add(google3DTiles);

  // Overlay Layer 1: NDVI Heatmap (semi-transparent)
  const ndviLayer = new ImageryLayer(
    new UrlTemplateImageryProvider({
      url: "https://oneka-tiles.s3.amazonaws.com/ndvi/{z}/{x}/{y}.png",
      maximumLevel: 18,
    }),
    {
      alpha: 0.5, // 50% transparency - see Google buildings THROUGH NDVI
      show: true, // Toggle on/off
    },
  );
  viewer.imageryLayers.add(ndviLayer);

  // Overlay Layer 2: SAR Backscatter (semi-transparent)
  const sarLayer = new ImageryLayer(
    new UrlTemplateImageryProvider({
      url: "https://oneka-tiles.s3.amazonaws.com/sar/{z}/{x}/{y}.png",
      maximumLevel: 18,
    }),
    {
      alpha: 0.4, // 40% transparency
      show: false, // Hidden by default
    },
  );
  viewer.imageryLayers.add(sarLayer);

  // Add project risk pins with ML predictions
  projects.forEach((project) => {
    const color =
      project.ml_risk_score > 70
        ? Color.RED
        : project.ml_risk_score > 40
          ? Color.YELLOW
          : Color.GREEN;

    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(project.lon, project.lat),
      point: {
        pixelSize: 15,
        color: color,
        outlineColor: Color.BLACK,
        outlineWidth: 2,
      },
      label: {
        text: `${project.project_name}\nRisk: ${project.ml_risk_score}/100`,
        font: "14px sans-serif",
        fillColor: Color.WHITE,
        outlineColor: Color.BLACK,
        outlineWidth: 2,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -15),
      },
      description: "Click for audit report",
    });
  });

  // Layer toggle controls
  document.getElementById("ndviToggle").addEventListener("change", (e) => {
    ndviLayer.show = e.target.checked;
  });

  document.getElementById("sarToggle").addEventListener("change", (e) => {
    sarLayer.show = e.target.checked;
  });
  ```

- [ ] **Generate XYZ satellite tiles for overlay** (Backend task):

  ```python
  import mercantile
  import rasterio
  from rasterio.warp import transform_bounds
  from PIL import Image

  def geotiff_to_xyz_tiles(geotiff_path, output_dir, layer_name):
      \"\"\"Convert Sentinel GeoTIFF to XYZ web map tiles\"\"\"
      with rasterio.open(geotiff_path) as src:
          # For each zoom level 10-18
          for zoom in range(10, 19):
              # Get tiles that intersect the GeoTIFF bounds
              bounds = transform_bounds(src.crs, 'EPSG:4326', *src.bounds)
              tiles = list(mercantile.tiles(*bounds, zooms=zoom))

              for tile in tiles:
                  # Get tile bounds
                  tile_bounds = mercantile.bounds(tile)

                  # Read window from GeoTIFF
                  window = rasterio.windows.from_bounds(
                      *tile_bounds,
                      transform=src.transform
                  )
                  data = src.read(1, window=window)

                  # Colorize (e.g., apply NDVI color ramp)
                  colored = apply_colormap(data, 'RdYlGn')

                  # Save as PNG
                  output_path = f\"{output_dir}/{layer_name}/{tile.z}/{tile.x}/{tile.y}.png\"
                  os.makedirs(os.path.dirname(output_path), exist_ok=True)
                  Image.fromarray(colored).save(output_path)

      # Upload to S3
      s3_sync(output_dir, 's3://oneka-tiles/')

  # Generate tiles for each project's NDVI and SAR
  for project in analyzed_projects:
      geotiff_to_xyz_tiles(f'satellite/{project.uuid}_ndvi.tif', 'tiles/', 'ndvi')
      geotiff_to_xyz_tiles(f'satellite/{project.uuid}_sar.tif', 'tiles/', 'sar')
  ```

- [ ] Build project detail sidebar with ML predictions:
  - Tender metadata (name, budget, contractor)
  - **ML Risk Score** (0-100 with confidence %)
  - **Prediction**: "LIKELY GHOST" / "ON TRACK" / "UNCERTAIN"
  - Feature contributions (NDVI slope: +15 risk, SAR increase: -10 risk)
  - Satellite imagery timeline (time-series chart showing NDVI over 24 months)
  - Comparison: Google 3D Tiles (ground truth) vs Satellite analysis (prediction)
- [ ] Set up Google Cloud billing account (required for 3D Tiles API):
  - Apply for [$300 Google Cloud free trial credits](https://cloud.google.com/free)
  - Enable Maps Tiles API
  - Generate API key with 3D Tiles restriction

**Cost Estimate**:

- 3D Tiles API: ~$7/1000 tile loads (demo likely free within trial credits)
- S3 storage for tiles: ~$3 for 10 GB (100 projects × 2 layers × 50 MB/project)

**Deliverable**: Interactive 3D map showing 25-40 projects in Nairobi with color-coded ML risk predictions; Satellite overlays toggle-able; Time-series visualization

### Week 6: ML Prediction API & Real-Time Scoring (Module F)

**Geospatial ML Engineer + Backend Engineer Tasks (Week 6):**

- [ ] **Deploy ML prediction API:**

  ```python
  from fastapi import FastAPI
  import joblib
  import pandas as pd

  app = FastAPI()

  # Load trained model
  model = joblib.load('models/oneka_ghost_detector_v1.pkl')

  @app.post("/api/predict")
  def predict_project_risk(project_data: dict):
      \"\"\"
      Real-time prediction for new projects
      Input: Satellite time-series features
      Output: Risk score (0-100), prediction class, confidence
      \"\"\"
      # Extract features from project data
      features = engineer_features(
          pd.DataFrame(project_data['timeseries']),
          project_data
      )

      # Get ML prediction
      X = pd.DataFrame([features])
      prediction_proba = model.predict_proba(X)[0]
      prediction_class = model.predict(X)[0]

      # Convert to risk score (0-100)
      ghost_probability = prediction_proba[0]  # Probability of being ghost
      risk_score = int(ghost_probability * 100)

      # Determine prediction label
      if risk_score > 70:
          label = \"LIKELY_GHOST\"
      elif risk_score < 40:
          label = \"ON_TRACK\"
      else:
          label = \"UNCERTAIN\"

      # Feature contributions (SHAP-lite)
      feature_importance = dict(zip(X.columns, model.feature_importances_))
      top_risk_drivers = sorted(
          feature_importance.items(),
          key=lambda x: x[1],
          reverse=True
      )[:5]

      return {
          'risk_score': risk_score,
          'prediction': label,
          'confidence': max(prediction_proba),
          'top_risk_drivers': top_risk_drivers,
          'explanation': generate_explanation(features, risk_score)
      }

  def generate_explanation(features, risk_score):
      \"\"\"Human-readable explanation of risk score\"\"\"
      reasons = []

      if features['ndvi_recovery_ratio'] > 0.5:
          reasons.append(f\"Vegetation regrew to {features['ndvi_recovery_ratio']*100:.0f}% after initial clearing (abandonment sign)\")

      if features['sar_increase'] < 3.0:
          reasons.append(f\"No significant SAR backscatter increase (no vertical structures detected)\")

      if features['progress_gap'] > 40:
          reasons.append(f\"Financial progress ({features['expected_progress']:.0f}%) far exceeds physical evidence ({features['actual_progress']:.0f}%)\")

      if features['months_to_clearing'] > 6:
          reasons.append(f\"Construction startup delayed {features['months_to_clearing']} months from award date\")

      return reasons
  ```

- [ ] **Batch process all 25-40 geolocated tenders:**

  ```python
  import time

  for tender in geolocated_tenders:
      # Extract current satellite data
      timeseries = extract_project_timeseries(
          tender.matched_lat,
          tender.matched_lon,
          tender.award_date,
          months_lookback=12
      )

      # Get ML prediction
      prediction = predict_project_risk({
          'timeseries': timeseries.to_dict('records'),
          'contract_value_kes': tender.budget,
          'award_date': tender.award_date
      })

      # Save to database
      db.execute(\"\"\"
          UPDATE tenders
          SET ml_risk_score = %s,
              ml_prediction = %s,
              ml_confidence = %s,
              risk_explanation = %s
          WHERE id = %s
      \"\"\", (
          prediction['risk_score'],
          prediction['prediction'],
          prediction['confidence'],
          json.dumps(prediction['explanation']),
          tender.id
      ))

      time.sleep(1)  # Rate limiting
  ```

- [ ] **Categorize projects by ML risk level:**
  - **HIGH RISK (70-100)**: Likely ghost projects, priority field audit
  - **MEDIUM RISK (40-69)**: Uncertain, requires human review
  - **LOW RISK (0-39)**: On track, routine monitoring

- [ ] Generate audit prioritization list:

  ```python
  high_risk_projects = db.query(Tender).filter(
      Tender.ml_risk_score >= 70
  ).order_by(Tender.ml_risk_score.desc()).all()

  print(f\"🚨 HIGH PRIORITY: {len(high_risk_projects)} projects flagged for immediate audit\")
  for project in high_risk_projects[:10]:
      print(f\"  - {project.project_name}: {project.ml_risk_score}/100 risk\")
      print(f\"    Reasons: {', '.join(json.loads(project.risk_explanation))}\")
  ```

**Deliverable**: ML prediction API deployed, all 25-40 geolocated projects scored, 12+ high-risk projects identified for demo
if tender.satellite_analysis.construction_status == 'NO_CHANGE':
risk_score += 30
flags.append("NO_VISIBLE_PROGRESS")

      # Flag 3: Budget anomaly (comparison to district averages)
      avg_budget = get_average_budget_for_facility_type(tender.project_name)
      if tender.budget > avg_budget * 1.5:
          risk_score += 20
          flags.append("BUDGET_INFLATED")

      # Flag 4: Low geolocation confidence
      if tender.match_confidence < 85:
          risk_score += 10
          flags.append("LOCATION_UNCERTAIN")

      return min(risk_score, 100), flags  # Cap at 100

````

- [ ] Categorize risk levels:
- **HIGH (70-100)**: Multiple red flags, priority audit
- **MEDIUM (40-69)**: Single red flag, secondary review
- **LOW (0-39)**: No major concerns, routine monitoring
- [ ] Generate audit report template:
```python
def generate_audit_report(tender):
    return {
        "tender_id": tender.tender_number,
        "project_name": tender.project_name,
        "risk_score": tender.risk_score,
        "risk_level": tender.risk_level,
        "flags": tender.risk_flags,
        "evidence": {
            "satellite_images": [tender.satellite_before_url, tender.satellite_after_url],
            "ndvi_change": tender.ndvi_change,
            "geolocation_confidence": tender.match_confidence
        },
        "recommendation": "FIELD_AUDIT_REQUIRED" if tender.risk_level == 'HIGH' else "CONTINUED_MONITORING"
    }
````

**Deliverable**: Risk scoring algorithm deployed, audit reports generated for all 25-40 projects

---

## Phase 4: Integration & Demo Preparation (Weeks 7-8)

### Week 7: End-to-End Integration

**All Engineers:**

- [ ] Build REST API (FastAPI):

  ```python
  from fastapi import FastAPI

  app = FastAPI()

  @app.get("/api/projects")
  def get_projects(risk_level: str = None):
      query = db.query(Tender).filter(Tender.geolocation_status != 'FAILED')
      if risk_level:
          query = query.filter(Tender.risk_level == risk_level)
      return [project.to_dict() for project in query.all()]

  @app.get("/api/projects/{tender_id}/audit-report")
  def get_audit_report(tender_id: int):
      tender = db.query(Tender).get(tender_id)
      return generate_audit_report(tender)
  ```

- [ ] Connect frontend to backend API
- [ ] Implement authentication (simple JWT for demo)
- [ ] Set up AWS Lambda deployment for ingest pipeline
- [ ] Configure GitHub Actions CI/CD
- [ ] Write integration tests (pytest for backend, Jest for frontend)

**Deliverable**: Fully integrated system, deployable via CI/CD

### Week 8: Demo Site Selection & Presentation Prep

**CTO Tasks:**

- [ ] **Select 3 "Hero" Demo Projects** (manually vetted):
  1. **Confirmed Ghost Project**: Kibra Ward Health Centre (tender awarded 2023, ground truth shows abandoned site)
  2. **Completed Project**: Lang'ata Health Centre (tender awarded 2022, verified operational via Google Maps Street View)
  3. **In-Progress Project**: Mathare Health Centre (tender awarded 2024, satellite shows ongoing construction)
- [ ] Prepare 5-minute pitch demo:
  - Live 3D map flythrough to Kibra (zoom into ghost project with NO_CHANGE NDVI)
  - Show audit report with satellite before/after images
  - Highlight risk score = 95 (HIGH), flags: GPS_MISSING, NO_VISIBLE_PROGRESS
  - Transition to Lang'ata (risk score = 15, LOW), show completed building in 3D Tiles
  - **Closing statement**: "ONEKA triaged 100 tenders in 8 weeks, identified 12 high-risk ghost projects, saving OAG 480 field audit hours."
- [ ] Record demo video (backup in case live demo fails)
- [ ] Prepare FAQ responses:
  - **"What if GPS is missing?"** → "We match 25-40% using fuzzy logic against health facility databases. For failures, we flag for manual OAG review."
  - **"What about image resolution limits?"** → "We detect absence (ghost projects), not quality. Shoddy construction requires field audits, but we triage where to send teams."
  - **"Is satellite evidence legally admissible?"** → "Section 106B Evidence Act is untested. We position ONEKA as triage tool, not silver bullet. Legal precedent needed via test case."

**Deliverable**: Demo-ready system, 5-minute pitch rehearsed, 3 hero projects vetted

---

## Cost Breakdown (8-Week MVP)

| Item                    | Service Provider | Unit Cost                 | Quantity                               | Total                                     |
| ----------------------- | ---------------- | ------------------------- | -------------------------------------- | ----------------------------------------- |
| **AWS Textract OCR**    | AWS              | $0.065/page               | 800 pages (100 tenders × 8 pages)      | $52 _(covered by free tier)_              |
| **AWS RDS PostgreSQL**  | AWS              | $0.017/hour (db.t3.micro) | 1344 hours (8 weeks)                   | $23                                       |
| **AWS Lambda**          | AWS              | $0.20/1M requests         | 5000 executions                        | $1 _(free tier)_                          |
| **AWS S3 Storage**      | AWS              | $0.023/GB-month           | ~15 GB (satellite tiles + GeoTIFFs)    | $0.35                                     |
| **Copernicus Data**     | ESA              | Free                      | 100 Sentinel-1 + 100 Sentinel-2 scenes | $0                                        |
| **Satpy/PyroSAR**       | Open-source      | Free                      | Python libraries                       | $0                                        |
| **ML Training Compute** | AWS EC2          | $0.10/hour (t3.large)     | 20 hours training                      | $2                                        |
| **Google 3D Tiles API** | Google Cloud     | $7/1000 loads             | 500 loads (demo)                       | $3.50 _(trial credits)_                   |
| **Domain + Hosting**    | Vercel           | Free tier                 | 1 project                              | $0                                        |
| **Developer Salaries**  | Internal         | N/A                       | 3 devs × 8 weeks                       | _Sunk cost (hackathon)_                   |
| **TOTAL**               |                  |                           |                                        | **~$82** _(mostly covered by free tiers)_ |

**Post-Hackathon Scale-Up**:

- For 10,000 tenders/year: ~$8,000 Textract + $25,000 Copernicus commercial API (guaranteed availability) + $15,000 ML inference (AWS SageMaker) + $5,000 infrastructure = **$53K/year**
- Cost per project audited: **$5.30** vs traditional field audit **$2,000-5,000** = **99% cost savings**

---

## Risk Register (8-Week Execution Risks)

| Risk                                   | Probability | Impact | Mitigation                                                                                                      |
| -------------------------------------- | ----------- | ------ | --------------------------------------------------------------------------------------------------------------- |
| **Geolocation success rate < 25%**     | HIGH        | HIGH   | Pre-select health sector tenders (highest KMHFL match rate), accept 25% as demo threshold                       |
| **ML model accuracy < 75%**            | MEDIUM      | HIGH   | Use 30 training projects minimum, validate with 5-fold cross-validation, set confidence threshold at 0.7        |
| **Cloud cover blocks Sentinel-2**      | MEDIUM      | MEDIUM | Use 12-month historical window instead of 6 months, complement with Sentinel-1 SAR (all-weather)                |
| **SNAP installation issues (PyroSAR)** | MEDIUM      | MEDIUM | Pre-install SNAP (~5GB) on EC2 instance Week 1, test PyroSAR geocode() immediately, fallback to Sentinel-2 only |
| **Training data labeling delays**      | MEDIUM      | HIGH   | Allocate 20 hours Week 1-2 for manual false color review, recruit domain expert (OAG auditor) to assist         |
| **Google 3D Tiles billing issues**     | LOW         | HIGH   | Apply for $300 GCP trial credits upfront, set billing alerts at $50                                             |
| **PPIP anti-scraping blocks**          | MEDIUM      | HIGH   | Use residential proxies (Bright Data $1/day trial), implement polite scraping (1 req/5 sec)                     |
| **Tile generation performance**        | LOW         | MEDIUM | Pre-generate tiles for 3 hero projects only (not all 100), use cached tiles for demo                            |
| **CesiumJS overlay transparency**      | LOW         | LOW    | Test overlay alpha blending Week 5 Day 1, adjust opacity 0.3-0.7 for optimal visibility                         |

---

## Success Metrics (Hackathon Demo)

### Quantitative KPIs

- ✅ **100 tenders ingested** from PPIP health sector
- ✅ **30 historical training projects** identified and labeled (20 successful + 10 ghost)
- ✅ **720+ satellite data points extracted** for training (30 projects × 24 months)
- ✅ **ML model trained** with 80-85% accuracy, 75-80% precision, 80-85% recall
- ✅ **25-40 tenders geolocated** via KMHFL fuzzy matching (25-40% success rate)
- ✅ **25-40 satellite analyses** completed with multi-layer processing (NDVI+SAR+NDWI)
- ✅ **25-40 ML risk predictions** generated with confidence scores
- ✅ **3 hero demo projects** manually vetted (1 ghost, 1 complete, 1 in-progress)
- ✅ **12+ high-risk projects flagged** (ML risk score > 70)
- ✅ **Satellite tile overlays** generated for 3 hero projects (NDVI + SAR layers)

### Qualitative KPIs

- ✅ **5-minute live demo** executes without crashes
- ✅ **3D visualization** loads within 10 seconds on judge laptops
- ✅ **Satellite evidence** visually convincing (before/after images show clear NDVI change)
- ✅ **Judges' FAQ responses** defensible (geolocation void, resolution limits, legal admissibility)

### Demo Success Criteria

- **PASS**: System demonstrates end-to-end workflow (ingest → geolocate → analyze → visualize → risk score) for 3 hero projects
- **FAIL**: System crashes during demo OR geolocation success rate < 15% OR judges question technical feasibility and we cannot defend with verified specs

---

## Post-Hackathon Roadmap (Not in MVP Scope)

### Phase 2 (Months 3-6): Multi-Agent Orchestration

- Implement Scout/Visionary/Auditor agents using Amazon Bedrock Agents
- Train Random Forest S-Curve model on COB BIRR synthetic data
- Integrate Sentinel-1 SAR for cloud-free monitoring
- Add IFMIS API integration (requires OAG partnership for credentials)

### Phase 3 (Months 6-12): Legal Precedent & Pilot

- Establish Section 106B certificate process (server-based chain of custody)
- Pilot with 5 low-stakes ghost projects (seek court admissibility test case)
- Expand geolocation engine to schools (MOE database, 30K+ facilities)
- Deploy Tier 3 commercial imagery workflow (Planet SkySat 50cm tasking)

### Phase 4 (Year 2): National Scale-Up

- Lobby PPRA for GPS mandate in Standard Tender Documents (address geolocation void)
- Integrate Controller of Budget BIRR API (real-time payment monitoring)
- Deploy 12-day SAR monitoring for all active projects (Sentinel-1 nationwide)
- Train auditors on AI-assisted workflows (ONEKA as triage tool, not replacement)

---

## Satellite Data Access & Processing Verification

### Copernicus Sentinel Data Availability

**PRIMARY ACCESS METHODS** (All FREE):

1. **Copernicus Data Space Ecosystem** (New 2023+)
   - Official replacement for SciHub
   - URL: https://dataspace.copernicus.eu/
   - Full archive access (2014-present for Sentinel-1, 2015-present for Sentinel-2)
   - Requires free account registration
   - No data quotas, no throttling
   - Python access: `sentinelsat` library or direct API

2. **AWS Open Data Registry** (Requester Pays)
   - Sentinel-1: s3://sentinel-s1-l1c
   - Sentinel-2: s3://sentinel-s2-l2a
   - No authentication required for listing
   - Data transfer costs apply (~$0.09/GB out of AWS)

3. **Google Cloud Public Datasets**
   - gs://gcp-public-data-sentinel-1
   - gs://gcp-public-data-sentinel-2
   - Similar to AWS, egress fees apply

**DATA FORMATS**:

- **Sentinel-1 GRD**: Ground Range Detected, ~10-40m resolution, SAFE format (ZIP)
- **Sentinel-2 MSI**: Multi-Spectral Instrument, 10m-60m multi-band, SAFE format (ZIP with JP2 tiles)

**COVERAGE FOR KENYA**:

- Sentinel-1: 12-day revisit cycle (with S1A+S1B constellation)
- Sentinel-2: 5-day revisit cycle (with S2A+S2B constellation)
- Kenya fully covered by both missions since 2016

---

### Satpy for Sentinel-2 Optical Processing

**LIBRARY STATUS**: ✅ VERIFIED PRODUCTION-READY  
**Repository**: https://github.com/pytroll/satpy (6.4K stars, active development)  
**Last Updated**: January 2025

**Sentinel-2 Capabilities**:

```python
from satpy import Scene

# Read Sentinel-2 SAFE format
files = ['S2A_MSIL2A_20240101T073221_N0510_R092_T37MCV_20240101T094508.SAFE']
scn = Scene(reader='msi_safe', filenames=files)

# Load bands (B02=Blue 10m, B03=Green 10m, B04=Red 10m, B08=NIR 10m)
scn.load(['B02', 'B03', 'B04', 'B08'])

# Generate True Color RGB
scn.load(['true_color'])

# Compute NDVI for vegetation monitoring
ndvi = (scn['B08'] - scn['B04']) / (scn['B08'] + scn['B04'])

# Resample to 10m and save as GeoTIFF
resampled = scn.resample('kenya_area', resampler='nearest')
resampled.save_datasets(writer='geotiff', filename='output_{name}.tif')
```

**Key Features for ONEKA**:

- **Native SAFE Format Support**: Reads Sentinel-2 L1C and L2A products directly (no conversion needed)
- **Band Operations**: Access to all 13 spectral bands (10m, 20m, 60m resolutions)
- **Vegetation Indices**: Built-in NDVI, EVI calculation for monitoring clearing
- **Cloud Masking**: Scene Classification Layer (SCL) for filtering clouds
- **Multi-Scene Mosaicking**: Combine multiple tiles for large project areas
- **Export Formats**: GeoTIFF, NetCDF, PNG for visualization
- **Lazy Loading**: Uses Dask for memory-efficient processing of large scenes

**NDVI Change Detection Workflow**:

```python
# Load baseline and current scenes
baseline_scene = Scene(reader='msi_safe', filenames=['baseline.SAFE'])
current_scene = Scene(reader='msi_safe', filenames=['current.SAFE'])

baseline_scene.load(['B04', 'B08'])
current_scene.load(['B04', 'B08'])

# Calculate NDVI difference (vegetation loss indicator)
baseline_ndvi = (baseline_scene['B08'] - baseline_scene['B04']) / (baseline_scene['B08'] + baseline_scene['B04'])
current_ndvi = (current_scene['B08'] - current_scene['B04']) / (current_scene['B08'] + current_scene['B04'])

ndvi_change = current_ndvi - baseline_ndvi
# Negative values = vegetation loss (potential clearing for construction)
```

**Installation**:

```bash
pip install satpy[all]  # Installs with all dependencies
# OR for minimal install:
pip install satpy
```

**Dependencies**: xarray, dask, rasterio, pyresample (all Python-native, no SNAP needed)

---

### PyroSAR for Sentinel-1 SAR Processing

**LIBRARY STATUS**: ✅ VERIFIED PRODUCTION-READY  
**Repository**: https://github.com/johntruckenbrodt/pyroSAR (580 stars, active development)  
**Last Updated**: December 2024

**Sentinel-1 Geocoding Workflow**:

```python
from pyroSAR import identify
from pyroSAR.snap import geocode

# Identify Sentinel-1 scene
scene = identify('S1A_IW_GRDH_1SDV_20240101T034521_20240101T034546_052001_064A5B_1234.zip')

# Geocode with SNAP backend (Radiometric Terrain Correction)
geocode(infile=scene,
        outdir='output/',
        spacing=10,  # 10m pixel spacing
        scaling='dB',  # Decibel backscatter
        polarizations=['VV', 'VH'],  # Dual-pol
        removeS1BorderNoise=True,
        removeS1ThermalNoise=True,
        terrainFlattening=True,  # RTC (gamma0)
        demName='Copernicus 30m Global DEM',  # Auto-downloads DEM
        export_extra=['localIncidenceAngle', 'layoverShadowMask'],
        allow_RES_OSV=True)  # Uses orbit files for geolocation accuracy
```

**Why PyroSAR Instead of Raw SNAP**:

1. **Automated Orbit State Vector (OSV) Download**: SNAP requires manual OSV file management; PyroSAR auto-fetches POE/RES files
2. **Pythonic API**: No XML workflow editing, pure Python interface
3. **Batch Processing**: Built-in multi-scene handling
4. **DEM Management**: Auto-downloads SRTM/Copernicus DEM tiles for your AOI
5. **Scene Metadata Database**: SQLite-based tracking of processed scenes

**SAR Backscatter Interpretation**:

- **VV Polarization**: Sensitive to surface roughness, good for detecting bare concrete
- **VH Polarization (Cross-pol)**: Sensitive to volume scattering (vegetation, buildings)
- **Temporal Change**: Sudden backscatter increase = new structures appearing
- **Cloud Penetration**: Works 24/7, no cloud interference (Kenya's rainy season)

**Change Detection Example**:

```python
from pyroSAR import Archive

# Create database of pre/post construction scenes
db = Archive('sentinel1_archive.db')

# Select scenes before/after project start date
pre_scenes = db.select(sensor='S1A',
                        mindate='2023-01-01',
                        maxdate='2023-06-30',
                        vectorobject='project_aoi.shp')

post_scenes = db.select(sensor='S1A',
                         mindate='2024-01-01',
                         maxdate='2024-06-30',
                         vectorobject='project_aoi.shp')

# Process both epochs and compute backscatter difference
# Positive difference = new structures (higher backscatter from concrete)
```

**SNAP Dependency Note**:

- PyroSAR wraps ESA SNAP for Sentinel-1 processing
- SNAP installation required: https://step.esa.int/main/download/snap-download/
- SNAP is ~5GB download, Java-based, free and open-source
- Alternative: PyroSAR also supports GAMMA (commercial, $$$)

**Installation**:

```bash
# Install SNAP first (GUI installer or command-line)
wget https://download.esa.int/step/snap/9.0/installers/esa-snap_sentinel_linux-9.0.0.sh
bash esa-snap_sentinel_linux-9.0.0.sh -q

# Then install PyroSAR
pip install pyroSAR
```

---

### Data Processing Costs (8-Week Demo)

**Storage Costs** (AWS S3):

- Sentinel-1 GRD scene: ~800 MB/scene
- Sentinel-2 L2A tile: ~600 MB/tile
- 100 scenes (50 S1 + 50 S2): ~70 GB
- S3 Standard: $0.023/GB/month = ~$1.61/month

**Compute Costs** (AWS EC2 for processing):

- PyroSAR SNAP geocoding: ~5-10 minutes/scene on t3.xlarge ($0.1664/hour)
- Satpy NDVI generation: ~2 minutes/scene on t3.large ($0.0832/hour)
- Batch processing 100 scenes: ~10 hours compute time = ~$1.50

**Data Transfer** (Copernicus → AWS):

- Free from Copernicus Data Space (no quotas)
- If using AWS Open Data bucket: no transfer fees (data already in AWS)

**Total 8-Week Data Processing Cost**: **~$15** (storage + compute)

---

## Appendix: Technology Stack Summary

### Backend

- **Language**: Python 3.11
- **Framework**: FastAPI (REST API)
- **Database**: PostgreSQL 15 + PostGIS 3.3
- **Cloud**: AWS (Lambda, RDS, S3, Textract)
- **Libraries**:
  - `requests`, `beautifulsoup4` (web scraping)
  - `boto3` (AWS SDK)
  - `rapidfuzz` (fuzzy matching)
  - `sentinelhub` (Sentinel-2 API)
  - `numpy`, `rasterio` (geospatial analysis)

### Frontend

- **Framework**: React 18
- **3D Engine**: CesiumJS 1.91+
- **Mapping**: Leaflet.js (fallback if CesiumJS issues)
- **Charts**: Recharts (risk score timelines)
- **Styling**: Tailwind CSS

### DevOps

- **CI/CD**: GitHub Actions
- **Deployment**:
  - Backend: AWS Lambda (serverless)
  - Frontend: Vercel (static hosting)
- **Monitoring**: AWS CloudWatch (basic logs)

### External APIs

- **Google Maps 3D Tiles API**: [Verified Available](https://developers.google.com/maps/documentation/tile/3d-tiles)
- **AWS Textract**: [Verified Pricing](https://aws.amazon.com/textract/pricing/) - $0.065/page (Forms+Tables)
- **Sentinel Hub Process API**: Free tier 30K requests/month
- **Kenya Master Health Facility List**: [KMHFL DHIS2](https://kmhfl.health.go.ke) (public dataset)
- **Copernicus Data Space**: [Verified Available](https://dataspace.copernicus.eu/) - Free Sentinel-1/2 archive access
- **Satpy Library**: [Verified on GitHub](https://github.com/pytroll/satpy) - Production-ready Sentinel-2 MSI reader
- **PyroSAR Library**: [Verified on GitHub](https://github.com/johntruckenbrodt/pyroSAR) - Production-ready Sentinel-1 processor

---

## Technical Verification Log

### Google 3D Tiles API

- **Status**: ✅ VERIFIED
- **Source**: https://developers.google.com/maps/documentation/tile/3d-tiles
- **Date Verified**: January 2026
- **Key Findings**:
  - Uses OGC 3D Tiles 1.0 standard
  - Root tileset URL: `https://tile.googleapis.com/v1/3dtiles/root.json?key=YOUR_API_KEY`
  - Requires CesiumJS 1.91+ for rendering
  - Billing account required (not free tier)
  - Must display Google copyright attribution
  - 3-hour tile request limit per root tileset call

### AWS Textract Pricing

- **Status**: ✅ VERIFIED
- **Source**: https://aws.amazon.com/textract/pricing/
- **Date Verified**: January 2026
- **Key Findings**:
  - Free Tier: 1,000 pages/month (Detect Document Text) for first 3 months
  - Detect Document Text: $0.0015/page (first 1M pages/month)
  - Analyze Document (Forms+Tables): $0.065/page
  - For 100,000 tender PDFs with forms+tables: ~$6,500/month
  - Kenya focus means we won't hit 100K threshold in 8 weeks

### Copernicus Sentinel Data Access

- **Status**: ✅ VERIFIED (via library documentation and GitHub analysis)
- **Sources**: PyroSAR and Satpy GitHub repositories
- **Date Verified**: January 2026
- **Key Findings**:
  - Both libraries extensively reference Sentinel-1/2 data processing
  - Copernicus Data Space Ecosystem is the official access point (2023+)
  - Full archive access since 2014 (S1) and 2015 (S2)
  - Free registration required, no data quotas
  - Alternative: AWS/GCP open data buckets (requester-pays model)
  - Kenya coverage: Full coverage by both Sentinel-1 and Sentinel-2 since 2016

### Satpy Library for Sentinel-2

- **Status**: ✅ VERIFIED PRODUCTION-READY
- **Repository**: https://github.com/pytroll/satpy
- **Date Verified**: January 2026
- **Evidence**:
  - 6,400+ stars, 1,600+ commits, 100+ contributors
  - Active development (last commit January 2025)
  - Dedicated `msi_safe` reader for Sentinel-2 SAFE format (L1C/L2A)
  - Part of PyTroll meteorological satellite processing ecosystem
  - Conda-forge package available: `conda install -c conda-forge satpy`
- **Key Capabilities**:
  - Reads JPEG2000 (.jp2) band files from SAFE directories
  - Supports all 13 MSI bands (B01-B12, B8A) at native resolutions
  - Calibration: reflectance, radiance, atmospheric products
  - No SNAP dependency for Sentinel-2 (native Python)
  - Built-in NDVI/EVI vegetation index calculation

### PyroSAR Library for Sentinel-1

- **Status**: ✅ VERIFIED PRODUCTION-READY
- **Repository**: https://github.com/johntruckenbrodt/pyroSAR
- **Date Verified**: January 2026
- **Evidence**:
  - 580+ stars, 500+ commits over 7 years
  - Active maintenance (last update December 2024)
  - Extensive documentation on readthedocs
  - Conda-forge package available: `conda install -c conda-forge pyrosar`
- **Key Capabilities**:
  - Wraps ESA SNAP and GAMMA Remote Sensing software
  - Dedicated Sentinel-1 SAFE format driver (GRD and SLC products)
  - Automatic OSV (Orbit State Vector) file download from Copernicus
  - `geocode()` function for radiometric terrain correction (RTC)
  - Border noise removal (ESA/pyroSAR/GAMMA methods)
  - Auto-downloads DEMs (SRTM, Copernicus 30m/90m)
  - Requires SNAP installation (~5GB, free from ESA)

---

## Conclusion: CTO Verdict

**This 8-week plan is BUILDABLE** with the following constraints accepted:

1. **Geolocation void is unresolved**: 25-40% success rate acceptable for demo, requires PPRA GPS mandate for production
2. **Legal admissibility is unproven**: Position as triage tool, not court evidence (yet)
3. **Satellite resolution limits quality detection**: Focus on ghost projects (absence detection), defer shoddy construction to field audits

**Hackathon Value Proposition**:

- ONEKA demonstrates **automated triage at scale** (100 tenders in 8 weeks vs 6 months manual)
- **12+ high-risk ghost projects flagged** → saves OAG 480 field audit hours
- **$80 demo cost** → proves $26K/year operational cost for 10K tenders is achievable
- **3D visualization** differentiates from traditional audit tools (judges will remember flying through Nairobi)

**Recommendation**: Proceed with build, prioritize demo stability over feature completeness. This is a **proof of concept**, not production system.

---

**Document Version**: 1.0  
**Next Review**: Week 4 (mid-point check-in)  
**Contact**: cto@oneka.co.ke
