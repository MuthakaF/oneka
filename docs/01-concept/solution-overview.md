# **Oneka AI: The Infrastructure Audit Engine**

### **_Closing the Visibility Gap in National Development_**

## **1\. Executive Summary**

**Oneka AI** is a decision support system designed to safeguard Kenya’s **National Prosperity** by eliminating the "Visibility Gap" in public infrastructure projects.

Currently, the government loses an estimated **KES 270 Billion annually** to procurement fraud, stalled projects, and value leakage because it relies on analog, paper-based reporting to monitor remote construction sites. Oneka AI solves this by using **Satellite Remote Sensing** to automatically audit physical progress against financial spend, providing Human Auditors with a risk-based targeting system to recover lost funds and ensure essential services are delivered to citizens.

## **2\. The Problem: The "Visibility Gap"**

The National Government disburses billions of shillings to devolved units and agencies for infrastructure (Roads, Dams, Schools, Clinics). However, the oversight mechanism is broken.

- **The Blind Spot:** The Office of the Auditor General (OAG) and Controller of Budget lack the resources to physically inspect the thousands of projects scattered across Kenya's 47 counties. Less than **5%** of projects are physically audited annually.
- **The Exploit:** Unscrupulous contractors and corrupt officials exploit this gap. They claim payments for work not done ("Ghost Projects") or stall construction for years while funds are embezzled.
- **The Metric:**
  - **\~270 Billion KES** lost annually to procurement inefficiencies and stalled projects.
  - **Delayed Services:** Citizens in remote areas go without water (stalled dams) or health services (stalled clinics) despite taxes being paid.

## **3\. Our Solution: Oneka AI**

**Oneka AI** (derived from _Onekana_ \- "To be seen") is not an autonomous judge. It is a **Force Multiplier** for human auditors. It automates the collection of evidence so that humans can focus on enforcement.

### **Core Philosophy**

1. **AI as a Tool:** We use Computer Vision to handle the monotonous task of analyzing thousands of satellite images.
2. **Human-in-the-Loop (HITL):** The AI does not issue fines. It issues **Alerts**. A human expert verifies the context and takes legal action.
3. **Trust:** We rely on immutable satellite history (Sentinel-1/2), which cannot be forged like paper reports.

## **4\. How It Works (The Audit Pipeline)**

### **Phase 1: Ingestion (The Truth File)**

The system ingests the public **Tender Document** to establish the "Ground Truth":

- **What:** Construction of Marigat Dam.
- **Where:** GPS Coordinates (Lat/Long).
- **When:** Start Date (Jan 2025\) \-\> Expected Completion (Dec 2025).
- **Cost:** KES 500 Million disbursed.

### **Phase 2: Remote Verification (The Eye)**

Oneka AI queries historical and current satellite data:

- **Sentinel-2 (Optical):** Checks for visual changes (clearing of vegetation, concrete structures).
- **Sentinel-1 (SAR \- Radar):** Checks for ground texture changes and structural hardness, even through cloud cover.
- **Change Detection Algorithm:** Compares the site's spectral signature over time to calculate a **Physical Progress Score (0-100%)**.

### **Phase 3: The Audit Flag (The Logic)**

The system compares **Financial Spend** (from Treasury data) vs. **Physical Progress** (from Satellite).

- ✅ **Green Flag:** Spend \= 40%, Progress \= 35%. (Project is healthy).
- 🚩 **Red Flag (Anomaly):** Spend \= 90%, Progress \= 5%. (High risk of "Ghost Project").

### **Phase 4: Human Action**

The Auditor receives a **"Risk Heat Map"** of Kenya. instead of visiting random sites, they deploy inspection teams specifically to the **Red Flag** sites to gather legal evidence for prosecution.

## **5\. Alignment with Hackathon Theme**

**Theme:** _AI for National Prosperity: Leveraging Innovation for Sustainable Development and Security._

Oneka AI is a cross-cutting solution that leverages high-tech analysis to solve fundamental administrative problems, bridging two critical tracks:

### **Primary Track: Governance & Public Policy**

- **Accountability:** Prosperity is impossible if development funds are stolen. Oneka ensures that every Shilling spent by the Treasury translates into a tangible asset for the citizen.
- **Anti-Corruption:** By digitizing verification, we remove human discretion and opportunities for bribery in the reporting chain.
- **Security:** Stalled infrastructure (roads, police stations) creates security vacuums. By ensuring projects are completed, we indirectly bolster national security.

### **Secondary Track: Predictive Analytics**

Oneka AI goes beyond simple monitoring; it forecasts outcomes to prevent loss before it occurs.

- **Failure Prediction:** By analyzing the _rate of physical change_ versus the _rate of expenditure_ over time, the system predicts which projects are on a trajectory to stall.
- **Early Warning System:** Instead of reporting a loss two years later (post-mortem), Oneka flags "High Risk" projects in real-time, allowing the Treasury to halt disbursements _before_ the remaining funds are wasted.
- **Resource Optimization:** It predicts where audit resources will be most effective, shifting the audit model from "Random Sampling" to "Predictive Targeting."

## **6\. Conclusion**

We are moving Kenya from **Reactive Auditing** (finding out money was stolen 2 years later) to **Proactive Monitoring** (stopping the theft as it happens).

**Oneka AI: Making the Invisible, Actionable.**
