# **Feasibility of Remote Infrastructure Auditing in Kenya: A Comprehensive Analysis of Photorealistic 3D Tiles and Satellite Photogrammetry**

## **1\. Introduction: The Evolution of Infrastructure Oversight**

The infrastructure sector in Kenya is currently experiencing a transformative period, characterized by ambitious projects ranging from the expansion of the road network in the Rift Valley to the vertical densification of Nairobi’s residential zones. However, the scale and geographic dispersion of these projects introduce systemic challenges in oversight, compliance verification, and financial auditing. Traditional auditing methodologies, which rely heavily on physical site inspections, are inherently constrained by logistical costs, safety concerns in remote areas, and the temporal latency between an event occurring on-site and its reporting to stakeholders in the capital. The resultant "audit gap" often allows for deviations from engineering specifications, encroachment on riparian or road reserves, and delays in project delivery to persist undetected for extended periods.

In response to these challenges, the geospatial industry has seen a convergence of technologies that promises to enable "remote reality"—the ability to inspect, measure, and verify infrastructure progress from a desktop environment with a degree of fidelity that approaches physical presence. Two primary technological pillars underpin this potential shift: the release of Google Maps Photorealistic 3D Tiles, which democratizes access to city-scale 3D meshes via the Open Geospatial Consortium (OGC) standards, and the proliferation of high-resolution commercial satellite constellations capable of daily revisit rates and stereo-photogrammetry.

This report provides an exhaustive feasibility assessment of leveraging these technologies for infrastructure auditing within the specific context of Kenya. It examines the technical architecture of 3D data delivery, the geometric and temporal limitations of current datasets, the economic implications of API-based versus tasking-based models, and the operational viability of integrating these data streams into professional auditing workflows. By synthesizing data from platform documentation, pricing schedules, and academic validation studies, this analysis aims to provide a definitive roadmap for engineering firms, government agencies, and financial institutions seeking to modernize their verification protocols.

## **2\. The Google Maps Photorealistic 3D Tiles Ecosystem**

The introduction of Photorealistic 3D Tiles by the Google Maps Platform represents a fundamental shift in how geospatial data is consumed by enterprise applications. Historically, access to the seamless, textured 3D mesh visible in Google Earth was restricted to the proprietary application itself. The opening of this data via the Map Tiles API allows for the integration of Google’s massive repository of photogrammetric data into custom viewing engines, fundamentally altering the landscape of visualization for infrastructure projects.

### **2.1 Technical Architecture and Delivery Mechanisms**

The core of the Photorealistic 3D Tiles offering is a 3D mesh textured with high-resolution RGB optical imagery. Unlike traditional 2.5D terrain models, which consist of a digital elevation model (DEM) draped with a flat satellite image, the 3D mesh captures true three-dimensional geometry. This includes vertical facades of buildings, the overhangs of infrastructure, the volume of vegetation, and the complex morphology of urban canyons.1 The data is delivered using the OGC 3D Tiles standard, a specification originally developed by Cesium to stream massive heterogeneous 3D geospatial datasets.2 This standardization is a critical feasibility factor, as it ensures that the data is not locked into a Google-proprietary viewer but can be rendered in industry-standard engines such as CesiumJS, deck.gl, and even game engines like Unreal Engine and Unity.1

The delivery mechanism is optimized for web streaming through a hierarchical level of detail (HLOD) system. As a user navigates a scene, the renderer requests tiles of varying resolution based on the camera's distance and viewing angle. This ensures that a user viewing the Nairobi Expressway from a high altitude receives a simplified, low-polygon mesh, while a user zooming in to a specific interchange receives a high-fidelity tile with detailed textures. This architecture minimizes bandwidth consumption and renders latency, making it technically feasible to deploy 3D visualization tools even in environments with moderate internet connectivity, a relevant consideration for field offices in Kenya.4

The API operates on a session-based request model. A client application initiates a session by requesting a "root tileset." This root tile serves as the entry point to the hierarchical tree of data. Crucially, for billing and quota purposes, a single root tile request enables the renderer to automatically fetch subsequent child tiles (the actual geometry and textures) for a duration of up to three hours without incurring additional "root tile" charges.1

This mechanism is highly advantageous for the specific use case of auditing, where an inspector might spend a prolonged period exploring a single project site, panning and zooming to inspect different sectors. The session-based model effectively decouples the depth of inspection from the cost of data transfer, provided the inspection concludes within the three-hour window.

### **2.2 Coverage Analysis: The Kenyan Context**

A primary determinant of feasibility is the availability of high-quality 3D data for the specific locations where infrastructure projects are situated. Google's coverage is not uniform globally. The documentation indicates that Photorealistic 3D Tiles are available in "over 2500 cities across 49 countries".2 While explicit lists of covered cities are often generalized in marketing materials, the technical documentation provides coverage maps for "Map Tiles 2D / 3D" which include Kenya, marked with a symbol indicating "good data quality and availability".5

For the auditor in Kenya, this implies a bifurcation in data quality based on geography. Projects located within the greater Nairobi metropolitan area, and potentially other major urban centers like Mombasa or Kisumu, are likely to be covered by high-fidelity 3D meshes derived from aerial photogrammetry. These meshes offer the resolution necessary to distinguish individual buildings, major road features, and vegetation encroachment. However, for infrastructure projects in rural or semi-arid regions—such as the LAPSSET corridor components in Turkana or Isiolo—the "3D" view provided by the API is likely to revert to a lower-resolution terrain mesh draped with 2D satellite imagery.7 In these areas, the "buildings" may appear as flat textures on the ground or as extruded blocks (if legacy data exists), rather than the detailed photorealistic structures seen in urban centers.

The reliability of this coverage can be assessed using Google Earth Pro as a proxy. Since the Map Tiles API utilizes the same 3D map source as Google Earth 2, an auditor can perform a preliminary feasibility check by viewing the target site in the desktop application. If the site displays a continuous, detailed 3D mesh in Google Earth, it is highly probable that the API will serve the same quality of data for that location. Conversely, if the site appears flat or populates with user-generated "SketchUp" style models, the Photorealistic 3D Tiles API will not magically generate high-fidelity data for that region. This makes the tool exceptionally powerful for urban infrastructure audits (e.g., the Nairobi Expressway, affordable housing in Ngara) but significantly less useful for rural road audits where the verticality of the data is non-existent.

### **2.3 Geometric Fidelity vs. Visual Plausibility**

It is imperative to distinguish between _visual plausibility_ and _geometric fidelity_. The Google 3D mesh is designed to look convincing to the human eye, prioritizing texture continuity and rendering speed over engineering precision. To achieve efficient streaming, the mesh undergoes a process of simplification or decimation, where the number of polygons is reduced in areas of low visual complexity.

This has profound implications for auditing. A straight concrete retaining wall may appear slightly undulating in the mesh due to compression artifacts. A sharp corner of a building may appear rounded. Therefore, while the data is sufficient to verify the _presence_ of a structure, its general _scale_ (e.g., distinguishing a 5-story building from a 10-story building), and its _context_ (e.g., proximity to a river), it is generally insufficient for precise engineering measurements. An auditor cannot reliably use this mesh to verify that a road lane is exactly 3.5 meters wide or that a setback is exactly 6.0 meters.1 The mesh serves as a visualization asset, providing a "digital twin" for situational awareness, rather than a survey-grade instrument for compliance verification.

### **2.4 Temporal Latency: The "Black Box" Problem**

The most significant limitation of Google Maps Photorealistic 3D Tiles for auditing purposes is the lack of temporal certainty. Infrastructure auditing is inherently a time-sensitive activity; verifying a progress payment requires knowing the state of the site _now_, or at a specific, known date in the past.

Google does not publish a live schedule of updates for its 3D imagery, nor does the API provide a timestamp for individual tiles.4 The mesh represents a composite of the "best available" data, which could range from a few months to several years old depending on the priority Google assigns to a specific location. Nairobi, being a major regional hub, likely sees more frequent updates than rural counties, but the update cycle is opaque to the user.

This latency creates a risk of "temporal dissonance" in auditing. An auditor might be reviewing a payment claim for a completed roof, while the 3D tile view—derived from imagery taken 18 months prior—shows the building at the foundation stage. Unlike commercial satellite tasking, where the user defines the acquisition window, the consumer of Google 3D Tiles is a passive recipient of whatever historical snapshot exists in the database. Consequently, this data cannot be used as the sole source of truth for verifying current work progress, though it remains valuable for establishing the baseline environment and monitoring long-term, macro-scale changes if the update history is known or can be inferred.

## **3\. Commercial Satellite Imagery: The Precision Alternative**

While Google's 3D tiles offer unmatched accessibility and visualization capability, commercial satellite imagery offers the attributes most critical for rigorous auditing: provenance, temporal control, and verifiable resolution. For an auditor, the ability to "task" a satellite to image a specific coordinate in Kenya on a specific day transforms remote sensing from a passive reference into an active verification tool.

### **3.1 Maxar Technologies: High-Fidelity Engineering Audits**

Maxar Technologies stands as a market leader in the high-resolution domain, primarily through its WorldView constellation. The feasibility of using Maxar data for auditing in Kenya is driven by its superior spatial resolution, which reaches up to **30 cm** (and potentially higher with newer Legion satellites).8

####

#### **3.1.1 Resolution and Feature Identification**

At 30 cm resolution, the granularity of the data allows for the identification of specific construction activities. An auditor can distinguish between different types of heavy machinery (e.g., an excavator vs. a grader), identify the presence of specific materials (e.g., stacks of pipes or rebar), and clearly delineate the boundaries of earthworks. This level of detail is often the minimum requirement for "proof of progress" audits where the distinction between "site cleared" and "foundation poured" has immediate financial implications.

#### **3.1.2 Tasking Models and Economics**

Maxar operates on two primary commercial models: Archive access and New Tasking.

- **Archive Imagery:** Accessing historical data from the library is the most cost-effective route, typically priced between **$15 and $30 per square kilometer**.9 The minimum order size is generally **25 square kilometers**.10 This allows auditors to check the state of a site at various points in the past to reconstruct a timeline of delays or progress.

- **New Tasking:** For current verification, the auditor must commission a new image. This commands a premium, with prices ranging from **$40 to $60+ per square kilometer**.9 A critical constraint for smaller projects is the minimum order requirement, which is often **100 square kilometers** for new tasking orders, with specific constraints on the width of the area (e.g., minimum 5km width).10 This creates a feasibility barrier for auditing single, isolated sites (e.g., a single bridge or school) where the area of interest is far smaller than the minimum order. However, for linear infrastructure like roads or pipelines, or for clusters of projects within Nairobi, the 100 km² minimum can be efficiently utilized.

#### **3.1.3 SecureWatch Subscription**

For organizations with ongoing auditing needs across multiple sites, Maxar offers **SecureWatch** (now migrating to MGP Pro), a subscription-based service. This model lowers the friction of individual transactions by providing streaming access to the entire archive and daily collections for a flat annual fee, typically starting around **$30,000**.12 This is economically feasible for large engineering consultancies or government oversight bodies in Kenya but may be prohibitive for smaller, project-specific audit firms.

### **3.2 Airbus Intelligence: The Tri-Stereo Advantage**

Airbus competes directly in this sector with its **Pléiades Neo** constellation, also offering **30 cm** resolution.13

#### **3.2.1 Tri-Stereo Photogrammetry**

A distinct advantage of the Airbus offering for urban auditing in Nairobi is the availability of **Tri-Stereo** imagery. Standard stereo photogrammetry uses two images (taken from different angles) to reconstruct 3D height. Tri-stereo adds a third, near-nadir view. In dense urban environments like Nairobi's Central Business District or Upper Hill, tall buildings create "occlusions" or blind spots where a street might be hidden from one of the stereo angles. Tri-stereo significantly reduces these blind spots, resulting in a more complete Digital Surface Model (DSM).14

#### **3.2.2 Pricing Structure**

The pricing for Airbus imagery is competitive with Maxar. Archive imagery at 30cm resolution is priced around **$22.50 per square kilometer**, while tasking creates higher costs.10 Similar to Maxar, minimum order sizes (often 100 km² for tasking) apply, dictating that this solution is best suited for large-scale area audits rather than spot checks of individual plots.10

### **3.3 Planet: High-Frequency Monitoring**

Planet offers a bifurcated product line that addresses different aspects of the auditing workflow: **PlanetScope** for monitoring and **SkySat** for detailed inspection.

#### **3.3.1 PlanetScope: The Daily Heartbeat**

PlanetScope satellites (Doves) provide imagery at approximately **3-meter** resolution with a near-daily revisit rate.15

- **Audit Utility:** While 3m resolution is too coarse to see construction equipment or structural details, the daily revisit rate makes it the ultimate "change detection" tool. It answers the question: "Did work happen this week?" Auditors can use PlanetScope to monitor a site continuously and cheaply. When a significant change is detected (e.g., land clearing appears), it can trigger a high-resolution tasking order or a physical inspection.
- **Pricing:** The cost is significantly lower, estimated around **$1.80 to $2.25 per square kilometer**.16 However, it is often sold as a "hectares under management" subscription rather than per-image, with minimum area commitments (e.g., 250–500 km²).16

#### **3.3.2 SkySat: Flexible Tasking and Video**

SkySat satellites offer **50 cm** resolution, bridging the gap to Maxar/Airbus quality.

- **Low Minimums:** A key feasibility advantage for SkySat is the lower minimum order size for tasking, often around **25 square kilometers**.18 This makes it far more economically viable for auditing smaller, distinct infrastructure sites compared to the 100 km² minimums of competitors.

- **Video Capability:** SkySat is unique in its ability to capture full-motion video from space.20 For an infrastructure audit, a 60-second video clip can reveal operational dynamics that static imagery cannot—verifying the active movement of trucks, the rotation of cranes, or the flow of traffic through a diversion.
- **Pricing:** Tasking prices range from **$12 per km²** (flexible timing) to **$40 per km²** (assured timing).19

---

## **4\. The Role of Open Source Data: Sentinel-2 and Scientific limitations**

For budget-constrained audits, particularly in the public sector, the use of open-source data from the European Space Agency’s **Sentinel-2** constellation is a common consideration. Available via platforms like Google Earth Engine, this data is free of charge. However, its feasibility for _3D_ auditing is strictly limited by the laws of physics regarding spatial resolution.

### **4.1 The Resolution Barrier for 3D Meshing**

Sentinel-2 offers a maximum spatial resolution of **10 meters** in the visible and near-infrared bands.21 To generate a 3D mesh via photogrammetry, an algorithm must identify matching features (keypoints) across multiple images. A typical small building in Kenya might measure 10m by 10m. In Sentinel-2 imagery, this building is represented by a single pixel (or at best, a 2x2 cluster). It is mathematically impossible to extract 3D geometry—such as roof pitch or wall height—from a single pixel. Therefore, Sentinel-2 is **infeasible** for generating the type of textured 3D meshes provided by Google or Maxar.22

### **4.2 Height Inference via Machine Learning**

Despite the inability to generate a mesh, the scientific community has developed methods to _infer_ verticality from Sentinel-2 data. By analyzing time-series data, specifically the casting of shadows and the spectral response of built-up areas, machine learning models (such as Random Forest regressions) can estimate the height of buildings.

- **Accuracy Metrics:** Research focusing on Sentinel-2 height estimation indicates a Root Mean Square Error (RMSE) generally falling between **1.5 meters and 3.5 meters**.23
- **Audit Applicability:** An error margin of \+/- 3.5 meters (roughly one story) is too high for structural verification. However, it is sufficient for verifying zoning compliance (e.g., "Is this area low-rise or high-rise?") or for broad, regional assessments of urbanization density. It allows an auditor to perform a "macro-audit" of a city like Nairobi to detect unauthorized vertical densification trends, even if it cannot audit a specific building's compliance.25

### **4.3 World Settlement Footprint (WSF) 3D**

The German Aerospace Center (DLR) produces the World Settlement Footprint 3D, a global dataset derived from TanDEM-X radar data and Sentinel-2 imagery. It provides building height and volume data at a **90-meter** resolution.26

- **Limitation:** The 90m grid resolution aggregates all structures within a roughly soccer-field-sized area into a single average height value. This obscures individual infrastructure projects and is therefore **infeasible** for site-specific auditing, serving instead as a tool for regional planning and population modeling.26

## **5\. Emerging Technologies: Neural Radiance Fields (NeRF) and AI**

As the demand for higher fidelity grows, auditors are looking toward emerging technologies that leverage Artificial Intelligence to reconstruct 3D scenes from sparse data.

### **5.1 Neural Radiance Fields (NeRF) with Street View**

NeRF is a novel method that uses deep neural networks to synthesize new views of complex 3D scenes from a set of 2D images. Unlike photogrammetry, which explicitly reconstructs geometry, NeRF learns a volumetric representation of the scene.

- **Data Availability:** Nairobi has extensive coverage in **Google Street View**.27 This ground-level imagery can theoretically be used to train NeRF models, allowing an auditor to "fly" around a street-level scene.
- **Technical Feasibility:** Research confirms that Street View panoramas can successfully train NeRFs.28 However, these models often suffer from artifacts known as "floaters"—ghostly remnants of transient objects like cars or pedestrians that moved between image captures.29
- **Operational Constraint:** The primary limitation is temporal. The NeRF reconstructs the street _as it was_ when the Google vehicle passed by. Unless the auditor commissions a fresh drive-by (using a 360-camera on a vehicle), the resulting 3D model is a historical artifact, not a current audit tool. However, "crowdsourced NeRF," where site inspectors capture video on smartphones which is then processed into a NeRF, represents a highly feasible, low-cost future for site documentation.30

### **5.2 AI-Derived Building Footprints**

Companies like Microsoft and Google have used AI to digitize building footprints globally, including in Kenya.

- **Microsoft Global Building Footprints:** Microsoft has released a dataset containing millions of building footprints in Kenya, derived from Maxar imagery. Recent updates have added **height estimates** to these polygons.31
- **Accuracy:** Validation studies specific to the Kenya dataset show a very high precision (**97.5%**) in detecting buildings, but a lower Intersection over Union (IoU) of **65.9%**.32 This means that while the dataset correctly identifies _where_ a building is, the exact shape and boundaries of the polygon may deviate from reality. The rotation error is approximately **3.9 degrees**.
- **Audit Utility:** These footprints are valuable as a "prior" or baseline. An auditor can overlay these footprints on the Google 3D mesh or a satellite image to rapidly identify discrepancies—such as new buildings that do not exist in the dataset (indicating very recent construction) or buildings in the dataset that are missing from the site (indicating demolition).

##

##

## **6\. Economic Feasibility Analysis**

A critical component of this assessment is the cost implication of switching from physical to remote auditing. The following tables provide a comparative analysis of the pricing models relevant to a Kenyan context.

### **6.1 Google Maps Platform Pricing**

Google utilizes a "Pay as you go" model based on **Root Tile Requests**.

| SKU Category                | Unit                 | Price (0–100k requests) | Price (100k–500k) | Price (500k–1M) |
| :-------------------------- | :------------------- | :---------------------- | :---------------- | :-------------- |
| **Photorealistic 3D Tiles** | Per 1,000 Root Tiles | **$6.00**               | **$5.10**         | **$4.20**       |

Data derived from.33

- **The "Free Tier" Impact:** Google provides a recurring **$200 monthly credit** for Maps Platform usage.35 At $6.00 per 1,000 requests, this credit covers approximately **33,333 root tile requests per month**.
- **Feasibility Verdict:** For the vast majority of auditing firms in Kenya, visualization using Google 3D Tiles is effectively **free**. A team of 10 auditors inspecting sites daily would struggle to exceed the 33,000 session limit. This makes it the most economically viable option for _contextual_ visualization.

###

###

###

###

###

### **6.2 Commercial Satellite Pricing (Kenya Context)**

Satellite pricing is based on area (km²) and tasking status (Archive vs. New).

| Provider   | Product      | Resolution | Type        | Approx. Price (per km²) | Min. Order  |
| :--------- | :----------- | :--------- | :---------- | :---------------------- | :---------- |
| **Maxar**  | WorldView    | 30 cm      | Archive     | $15 \- $30              | 25 km²      |
| **Maxar**  | WorldView    | 30 cm      | New Tasking | $40 \- $60+             | 100 km²     |
| **Airbus** | Pléiades Neo | 30 cm      | Archive     | \~$22.50                | 25 km²      |
| **Airbus** | Pléiades Neo | 30 cm      | New Tasking | High Premium            | 100 km²     |
| **Planet** | SkySat       | 50 cm      | Tasking     | $12 \- $40              | **25 km²**  |
| **Planet** | PlanetScope  | 3 m        | Monitoring  | $1.80 \- $2.25          | 250-500 km² |

Data derived from.9

- **The "Minimum Order" Barrier:** The primary economic friction is the minimum order size. To audit a single 5-acre site in Nairobi using Maxar tasking, a firm must pay for 100 km², resulting in a minimum spend of **$4,000 \- $6,000**. This renders high-res tasking economically infeasible for single-site audits unless aggregated.
- **The Planet Advantage:** Planet's SkySat offers a significant advantage with a **25 km²** minimum order for tasking. This lowers the entry price for a fresh high-res image to roughly **$300 \- $1,000**, a price point that is competitive with the cost of deploying a physical team (vehicle fuel, per diems, personnel time) to a remote site.

## **7\. Operational Feasibility and Integration**

Implementing these technologies in Kenya requires addressing local operational realities.

### **7.1 Connectivity and Bandwidth**

Streaming OGC 3D Tiles is bandwidth-intensive. While Nairobi enjoys robust 4G and fiber connectivity, rural audit sites (e.g., wind power projects in Marsabit) often rely on unstable connections.

- **Mitigation:** Operational workflows must allow for "caching" or "offline mode" where possible, or rely on lighter-weight 2D satellite imagery clips downloaded prior to field deployment.

### **7.2 Integration with GIS Standards**

The feasibility of adoption depends on how well these new data streams fit into existing software like ArcGIS, QGIS, or AutoCAD.

- **Google 3D Tiles:** Google has partnered with **Cesium** and **Esri**. A significant development is the upcoming integration of Google’s Photorealistic 3D Tiles directly into **ArcGIS**.36 This is a "game-changer" for feasibility, as it allows Kenyan government agencies (many of whom use Esri products) to consume Google's mesh within their existing environment without custom development.
- **Coordinate Systems:** A technical challenge often arises in aligning global datasets (WGS84) with local Kenyan coordinate systems (e.g., Arc 1960 or UTM zones). Mismatches can lead to "floating buildings" or shifted footprints.38 Operational feasibility requires rigorous geodetic management.

### **7.3 Payment Infrastructure**

The Google Maps Platform requires a valid credit card for billing, even for the free tier.35 Kenyan firms must ensure their procurement processes allow for corporate credit cards capable of recurrent international USD transactions, a bureaucratic hurdle that often delays adoption in public sector entities.

## **8\. Conclusion and Strategic Recommendations**

The feasibility of generating 3D views for infrastructure auditing in Kenya is not a binary "yes" or "no," but rather a tiered reality based on the specific audit objective.

**1\. For Context and Visualization:** Google Maps Photorealistic 3D Tiles are **highly feasible**. The cost is negligible (often free), the visual fidelity is unmatched, and the integration with standard tools like Cesium and ArcGIS is maturing rapidly. This is the ideal tool for stakeholder presentations and initial site reconnaissance in Nairobi.

**2\. For Engineering Verification:** Google 3D Tiles are **infeasible** due to mesh simplification and temporal latency. For verifying structural progress or engineering compliance, **commercial satellite tasking** (Maxar/Airbus/Planet) is required. While expensive, the cost is often justifiable for high-value projects, especially when compared to the logistics of remote physical inspections.

**3\. For Budget Monitoring:** **PlanetScope** (3m) and **Sentinel-2** (10m) offer a **feasible** middle ground for monitoring land-use changes and macro-progress at a low cost, acting as a "tripwire" to trigger more expensive inspections.

**Recommendation:** Infrastructure auditing bodies in Kenya should adopt a **Hybrid Tiered Workflow**:

- **Tier 1 (Base):** Use **Google Photorealistic 3D Tiles** as the always-on visualization layer for all stakeholders to understand the "where" and "what" of the project context.
- **Tier 2 (Monitor):** Subscribe to **PlanetScope** or use **Sentinel-2** for weekly "heartbeat" monitoring of site activity to detect work stoppages.
- **Tier 3 (Verify):** Trigger **SkySat** or **Maxar** tasking orders only when payment milestones are claimed, using the high-resolution 2D imagery to verify the specific claim against the backdrop of the 3D context model.

By layering these technologies, Kenyan firms can close the "audit gap," reducing the cost of oversight while significantly increasing the frequency and transparency of infrastructure verification.

####

#### **Works cited**

1. Photorealistic 3D Tiles | Google Maps Tile API, accessed November 27, 2025, [https://developers.google.com/maps/documentation/tile/3d-tiles](https://developers.google.com/maps/documentation/tile/3d-tiles)
2. Create immersive 3D map experiences with Photorealistic 3D Tiles \- Google Maps Platform, accessed November 27, 2025, [https://mapsplatform.google.com/resources/blog/create-immersive-3d-map-experiences-photorealistic-3d-tiles/](https://mapsplatform.google.com/resources/blog/create-immersive-3d-map-experiences-photorealistic-3d-tiles/)
3. Photorealistic 3D Tiles, accessed November 27, 2025, [https://3d-tiles.web.app/](https://3d-tiles.web.app/)
4. Photorealistic 3D Tiles overview | Google Maps Tile API \- Google for Developers, accessed November 27, 2025, [https://developers.google.com/maps/documentation/tile/3d-tiles-overview](https://developers.google.com/maps/documentation/tile/3d-tiles-overview)
5. Google Maps Platform Coverage Details, accessed November 27, 2025, [https://developers.google.com/maps/coverage](https://developers.google.com/maps/coverage)
6. (PDF) Smart City Digital Twin Framework for Real-Time Multi-Data Integration and Wide Public Distribution \- ResearchGate, accessed November 27, 2025, [https://www.researchgate.net/publication/380987527_Smart_City_Digital_Twin_Framework_for_Real-Time_Multi-Data_Integration_and_Wide_Public_Distribution](https://www.researchgate.net/publication/380987527_Smart_City_Digital_Twin_Framework_for_Real-Time_Multi-Data_Integration_and_Wide_Public_Distribution)
7. Why are some cities not available in 3D \- Google Help, accessed November 27, 2025, [https://support.google.com/earth/thread/167714085/why-are-some-cities-not-available-in-3d?hl=en](https://support.google.com/earth/thread/167714085/why-are-some-cities-not-available-in-3d?hl=en)
8. Base Subscription MAXAR MGP Pro \- CSDS Inc., accessed November 27, 2025, [https://www.csdsinc.com/product/base-subscription-maxar-mgp-pro-641899](https://www.csdsinc.com/product/base-subscription-maxar-mgp-pro-641899)
9. Satellite Image Cost & Pricing Guide | 2025 \- OnGeo Intelligence, accessed November 27, 2025, [https://ongeo-intelligence.com/blog/satellite-imagery-pricing-guide](https://ongeo-intelligence.com/blog/satellite-imagery-pricing-guide)
10. Pricing Information for High Resolution Satellite Imagery \- LAND INFO, accessed November 27, 2025, [https://landinfo.com/satellite-imagery-pricing/](https://landinfo.com/satellite-imagery-pricing/)
11. Satellite Imagery FAQ \- Oakar Services Limited, accessed November 27, 2025, [https://osl.co.ke/faqs/imagery-faq/](https://osl.co.ke/faqs/imagery-faq/)
12. Demystifying satellite data pricing: A comprehensive guide \- Geoawesome, accessed November 27, 2025, [https://geoawesome.com/demystifying-satellite-data-pricing-a-comprehensive-guide/](https://geoawesome.com/demystifying-satellite-data-pricing-a-comprehensive-guide/)
13. Buy 30-cm 6-band Pléiades Neo Satellite Imagery \- Apollo Mapping, accessed November 27, 2025, [https://apollomapping.com/pleiades-neo-satellite](https://apollomapping.com/pleiades-neo-satellite)
14. Pléiades Neo: Native 30cm High-Resolution Satellite Imagery \- Airbus Intelligence, accessed November 27, 2025, [https://space-solutions.airbus.com/imagery/our-optical-and-radar-satellite-imagery/pleiades-neo/](https://space-solutions.airbus.com/imagery/our-optical-and-radar-satellite-imagery/pleiades-neo/)
15. Buy 3-m PlanetScope Satellite Imagery \- Apollo Mapping, accessed November 27, 2025, [https://apollomapping.com/planetscope-satellite-imagery](https://apollomapping.com/planetscope-satellite-imagery)
16. Introducing Medium-Resolution 3-meter PlanetScope Satellite Imagery \- Apollo Mapping, accessed November 27, 2025, [https://apollomapping.com/blog/introducing-medium-resolution-3-meter-planetscope-satellite-imagery-2](https://apollomapping.com/blog/introducing-medium-resolution-3-meter-planetscope-satellite-imagery-2)
17. A HUGE Archive – 3-m PlanetScope Satellite Imagery with a 250 sq km Minimum Order, accessed November 27, 2025, [https://apollomapping.com/blog/a-huge-archive-3-m-planetscope-satellite-imagery-with-a-250-sq-km-minimum-order-5](https://apollomapping.com/blog/a-huge-archive-3-m-planetscope-satellite-imagery-with-a-250-sq-km-minimum-order-5)
18. Tasking \- Upstream Tech Knowledge Base, accessed November 27, 2025, [https://support.upstream.tech/article/72-tasking](https://support.upstream.tech/article/72-tasking)
19. What's the Difference Between Monitoring and Tasking Subscriptions \- Planet Support, accessed November 27, 2025, [https://support.planet.com/hc/en-us/articles/27016165868957-What-s-the-Difference-Between-Monitoring-and-Tasking-Subscriptions](https://support.planet.com/hc/en-us/articles/27016165868957-What-s-the-Difference-Between-Monitoring-and-Tasking-Subscriptions)
20. An Update on SkySat Tasking, Pricing and Video Capabilities \- Apollo Mapping, accessed November 27, 2025, [https://apollomapping.com/blog/an-update-on-skysat-tasking-pricing-and-video-capabilities](https://apollomapping.com/blog/an-update-on-skysat-tasking-pricing-and-video-capabilities)
21. Sentinel-2 \- Earth Engine Data Catalog \- Google for Developers, accessed November 27, 2025, [https://developers.google.com/earth-engine/datasets/catalog/sentinel-2](https://developers.google.com/earth-engine/datasets/catalog/sentinel-2)
22. High Resolution Building and Road Segmentation from Sentinel-2 Imagery, accessed November 27, 2025, [https://research.google/pubs/high-resolution-building-and-road-segmentation-from-sentinel-2-imagery/](https://research.google/pubs/high-resolution-building-and-road-segmentation-from-sentinel-2-imagery/)
23. High-resolution building and road detection from Sentinel-2 \- arXiv, accessed November 27, 2025, [https://arxiv.org/html/2310.11622v3](https://arxiv.org/html/2310.11622v3)
24. National-scale mapping of building height using Sentinel-1 and Sentinel-2 time series, accessed November 27, 2025, [https://pmc.ncbi.nlm.nih.gov/articles/PMC8190528/](https://pmc.ncbi.nlm.nih.gov/articles/PMC8190528/)
25. A CNN regression model to estimate buildings height maps using Sentinel-1 SAR and Sentinel-2 MSI time series \- arXiv, accessed November 27, 2025, [https://arxiv.org/html/2307.01378](https://arxiv.org/html/2307.01378)
26. World Settlement Footprint (WSF®) 3D \- EOC Geoservice, accessed November 27, 2025, [https://geoservice.dlr.de/web/datasets/wsf_3d](https://geoservice.dlr.de/web/datasets/wsf_3d)
27. Google Maps Street View : r/Kenya \- Reddit, accessed November 27, 2025, [https://www.reddit.com/r/Kenya/comments/tur06j/google_maps_street_view/](https://www.reddit.com/r/Kenya/comments/tur06j/google_maps_street_view/)
28. 3D City Reconstruction From Google Street View \- evl, accessed November 27, 2025, [https://www2.evl.uic.edu/documents/3drecomstrictionmcavallo.pdf](https://www2.evl.uic.edu/documents/3drecomstrictionmcavallo.pdf)
29. \[2303.00749\] S-NeRF: Neural Radiance Fields for Street Views \- arXiv, accessed November 27, 2025, [https://arxiv.org/abs/2303.00749](https://arxiv.org/abs/2303.00749)
30. A Critical Analysis of NeRF-Based 3D Reconstruction \- MDPI, accessed November 27, 2025, [https://www.mdpi.com/2072-4292/15/14/3585](https://www.mdpi.com/2072-4292/15/14/3585)
31. microsoft/GlobalMLBuildingFootprints: Worldwide building footprints derived from satellite imagery \- GitHub, accessed November 27, 2025, [https://github.com/microsoft/GlobalMLBuildingFootprints](https://github.com/microsoft/GlobalMLBuildingFootprints)
32. microsoft/KenyaNigeriaBuildingFootprints: Releasing building footprint polygons for Kenya and Nigeria derived from satellite imagery using machine learning \- GitHub, accessed November 27, 2025, [https://github.com/microsoft/KenyaNigeriaBuildingFootprints](https://github.com/microsoft/KenyaNigeriaBuildingFootprints)
33. Google Maps Platform core services pricing list | Pricing and Billing \- Google for Developers, accessed November 27, 2025, [https://developers.google.com/maps/billing-and-pricing/pricing](https://developers.google.com/maps/billing-and-pricing/pricing)
34. What is the Google Photorealistic 3D Tiles API? \- The Afi Labs Blog, accessed November 27, 2025, [https://blog.afi.io/blog/what-is-the-google-photorealistic-3d-tiles-api/](https://blog.afi.io/blog/what-is-the-google-photorealistic-3d-tiles-api/)
35. Map Tiles API Usage and Billing \- Google for Developers, accessed November 27, 2025, [https://developers.google.com/maps/documentation/tile/usage-and-billing](https://developers.google.com/maps/documentation/tile/usage-and-billing)
36. Esri Collaborates with Google Maps Platform to Offer High-Quality Photorealistic 3D Tiles, accessed November 27, 2025, [https://www.esri.com/about/newsroom/announcements/esri-collaborates-with-google-maps-platform-to-offer-high-quality-photorealistic-3d-tiles](https://www.esri.com/about/newsroom/announcements/esri-collaborates-with-google-maps-platform-to-offer-high-quality-photorealistic-3d-tiles)
37. Google Photorealistic 3D Tiles in ArcGIS \- Esri, accessed November 27, 2025, [https://www.esri.com/arcgis-blog/products/arcgis/announcements/high-quality-photorealistic-3d-tiles-in-arcgis](https://www.esri.com/arcgis-blog/products/arcgis/announcements/high-quality-photorealistic-3d-tiles-in-arcgis)
38. Spatial Shift and Inaccuracy in Global Buildings Dataset Compared to US Building Footprints · Issue \#97 · microsoft/USBuildingFootprints \- GitHub, accessed November 27, 2025, [https://github.com/microsoft/USBuildingFootprints/issues/97](https://github.com/microsoft/USBuildingFootprints/issues/97)
