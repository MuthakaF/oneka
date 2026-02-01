# **The Anatomy of High-Value Infrastructure Execution in Kenya: A PFM and Audit Forensic Analysis for Oneka AI**

## **Executive Context and Structural Framework**

The development of **Oneka AI** represents a paradigm shift in Kenyan Public Financial Management (PFM). It is not designed to replace the Office of the Auditor General (OAG); rather, it acts as the critical **interoperability layer** that connects disparate data silos—specifically bridging the gap between Project Development (PIMIS/Physical Site) and Funds Disbursement (IFMIS/Exchequer).

Currently, the OAG operates on a sample-based methodology due to resource constraints, leaving vast swathes of expenditure unscrutinized. Oneka AI serves as a "Force Multiplier" for the OAG, providing **100% digital population coverage**. Its function is to ingest the chaotic reality of Tier 1 projects, run them against statutory logic anchored in the *Public Finance Management Act, 2012* (PFM Act) and the *Public Procurement and Asset Disposal Act, 2015* (PPDA), and generate high-fidelity "Risk Flags." This allows human auditors to move from "random sampling" to "precision targeting," specifically identifying "Ghost Projects" and stalled infrastructure before they become historically pending bills.

This report serves as the forensic blueprint for that interoperability layer.

## ---

**Module 1: The Definition & Execution**

To effectively flag anomalies, Oneka AI must first understand the taxonomy of a "Tier 1" project. In Kenya, this is a composite of contractor capacity (NCA), engineering complexity (EBK/KeNHA), and financial magnitude.

### **1.1 "Tier 1" Classification: The Regulatory Matrix**

The term "Tier 1" corresponds to specific statutory classifications managed by the National Construction Authority (NCA) and the Engineers Board of Kenya (EBK). Oneka AI must use these classifications to filter the "Universe of Projects" it monitors.

#### **1.1.1 National Construction Authority (NCA) Classification Logic**

The NCA operates a tiered registration system. For Oneka AI, a "Tier 1" project is almost exclusively the domain of **NCA-1** contractors.

**The "Unlimited" Value Threshold**

According to NCA mandates, the NCA-1 category is the only classification capable of undertaking works with an "Unlimited" contract value.1

* **Filter Logic:** Any project with a contract sum exceeding the upper limits of NCA-2 (e.g., \>KES 750M for Roads or \>KES 500M for Buildings) must be tagged as "Tier 1" by the AI.

| Works Category | NCA-1 Limit (KES) | NCA-2 Limit (KES) |
| :---- | :---- | :---- |
| **Building Works** | **Unlimited** | 500,000,000 |
| **Roads & Civil Works** | **Unlimited** | 750,000,000 |
| **Water Works** | **Unlimited** | 250,000,000 |

Source Data: 1

**The Foreign Contractor Factor**

Oneka AI must cross-reference the NCA register for foreign firms, who pay higher registration fees (USD 20,000) and are almost invariably registered as NCA-1.1

* **Compliance Flag:** If a project \>KES 1 Billion is awarded to a contractor *not* holding a valid NCA-1 license, Oneka AI should flag this as a "Statutory Compliance Risk."

#### **1.1.2 Engineers Board of Kenya (EBK) and "Category A"**

The Oneka AI interoperability layer must distinguish between *contractor* capacity and *project* complexity.

1. **Road Classification (KeNHA):** The AI should ingest KeNHA's road classification data. **Class A** (International Trunk Roads) and **Class B** (National Trunk Roads) constitute the high-value spine.5 These projects have the highest geometric standards and costs, automatically placing them in the Tier 1 bracket.7  
2. **Environmental Complexity (NEMA/World Bank):** "Category A" also refers to projects with **significant adverse environmental impacts** (e.g., large dams, highways).8 These trigger rigorous Environmental and Social Impact Assessments (ESIA).

### **1.2 The Lifecycle: From Concept to Handover**

Oneka AI must track the "Digital Pulse" of the project lifecycle to identify where the paper trail breaks.

#### **1.2.1 The Critical Path of the Interim Payment Certificate (IPC)**

The IPC is the data point that links "Work Done" (Engineering) to "Money Out" (Finance).

**1\. Joint Measurement (The Origin)**

The cycle begins with the Measurement Book (MB), recorded by the Contractor and the Resident Engineer (RE).10 This is the "Ground Truth."

* *Interoperability Gap:* Currently, this data sits in analog books. Oneka AI can flag projects where *IFMIS* shows payments but no corresponding digital record of an IPC certification exists in the *Project Management* silos.

**2\. The Signature Chain (The "Accountability Chain")**

The signature chain validates the expenditure:

* **Signatory 1: The Engineer:** Certifies technical completion.10  
* **Signatory 2: The Chief Officer (CO):** As the **Accounting Officer** for the Vote Head, the CO certifies that the expenditure is within the budget and the vote book has balance.11  
* **Signatory 3: Head of Treasury/CEC Finance:** Authorizes the final payment against the Exchequer Release.13

**3\. The Bottleneck Analysis**

Oneka AI should flag "Stalled" signals by monitoring the time-lag between these signatures:

* **The "Interest" Trap:** If an IPC is certified but not paid within contractual timelines (28-56 days), it attracts interest (CBK Rate \+ 3%).14 Oneka AI must calculate this accruing liability as a "Hidden Debt Risk" for the OAG.

## ---

**Module 2: The Money Flow (The "Paper Trail")**

Oneka AI acts as the lens through which the OAG can view the flow of funds from the Exchequer to the Contractor.

### **2.1 Treasury to Site: The Exchequer Issue Process**

#### **Step 1: The Exchequer Requisition**

* **The Source:** Funds sit in the **Consolidated Fund** (National) or **County Revenue Fund (CRF)**.15  
* **The Gatekeeper:** The **Controller of Budget (COB)** must approve every withdrawal.  
* **The Data Point:** Oneka AI should ingest COB approval data to verify if the *Exchequer Issue* matches the *Budgeted Amount* for the specific Vote Head.17

#### **Step 2: The Operational Account (Vote Head)**

* Funds move to the **Ministry/Departmental Operational Account**.  
* **The Commingling Risk:** A major audit risk is the diversion of Development Funds to Recurrent Expenditure. Oneka AI can detect this by matching *Exchequer Releases for Development* against *IFMIS Payment Categories*.

#### **Step 3: Contractor Payment (IFMIS)**

* The payment is processed via **IFMIS** and sent via EFT to the Contractor.14  
* **Interoperability Function:** Oneka AI must link the **IFMIS Transaction ID** back to the specific **Project Contract Number**. Often, these links are broken or manually entered, creating "Ghost Projects" where money flows to a contract ID that doesn't exist in the Project Register.

### **2.2 The Reporting Pulse**

#### **2.2.1 The Controller of Budget (COB) Reports**

The **Budget Implementation Review Report (BIRR)** is the primary public source of truth.18

* **Oneka’s Role:** Oneka AI should automate the scraping of BIRR data to compare *Exchequer Issues* vs. *Actual Expenditure*. A discrepancy suggests funds were released but not spent (idle cash) or diverted.

#### **2.2.2 IFMIS and Public Reporting**

IFMIS is an internal ERP system (Oracle-based) and does not output public APIs.20 Oneka AI acts as the **interoperability layer** by ingesting authorized data extracts (e.g., from the OAG's access or COB reports) and visualizing them against physical project progress.

## ---

**Module 3: The Audit Selection (The OAG's "Brain")**

This is the core value proposition of Oneka AI: **Transitioning from Sampling to Census.**

### **3.1 The Problem: Risk-Based Auditing (RBA) & Sampling**

The OAG currently uses a **Risk-Based Auditing (RBA)** methodology.21 Because they cannot physically inspect every site, they rely on "Stratified Random Sampling."

* **The Limit:** They might visit only **50-70 projects** out of thousands in a Performance Audit.23  
* **The Gap:** This leaves the majority of "Ghost Projects" hidden in the long tail of un-sampled data.

### **3.2 The Solution: Oneka AI as the "Pre-Audit" Filter**

Oneka AI does not replace the auditor; it **replaces the randomness**. It ingests 100% of the project data points and applies algorithmic risk flags to direct the OAG's limited resources.

#### **3.2.1 100% Digital Coverage (The "Census" Approach)**

Instead of sampling, Oneka AI evaluates every project against specific "Risk Flags":

1. **The "Lowball" Flag:** Projects awarded at \>20% below the Engineer's Estimate (potential for stalled work/variations).25  
2. **The "Zombie" Flag:** Projects listed as "Ongoing" in the Budget but with **Zero Expenditure** in IFMIS for \>12 months.27  
3. **The "Variation" Flag:** Projects where cumulative payments exceed the original Contract Sum by \>25% without a new tender number.29  
4. **The "Burn Rate" Flag:** Projects with 80% financial completion but only 20% physical completion (requires interoperability between Finance and Project modules).

**Oneka AI Output:** A "High-Risk Target List" for the OAG. Instead of visiting random sites, the OAG team visits the top 50 sites flagged by Oneka AI as having the highest discrepancy between *Money Out* and *Work Done*.

## ---

**Module 4: The Accountability Chain**

Oneka AI must digitize the statutory "Red Lines" that define accountability.

### **4.1 The "Engineer's Estimate" vs. "Award Sum"**

#### **4.1.1 The "Abnormally Low Tender" (ALT) Protocol**

While the PPDA 2015 allows bids below the Engineer's Estimate (EE), Section 37.2 of standard tender documents flags bids **\>20% below EE** as "Abnormally Low Tenders".30

* **Oneka Logic:** If (Award Sum \< 0.8 \* EE) AND (No "Price Analysis" Document Found), THEN Flag \= High Risk (Lowballing).

### **4.2 Stalled Projects: The Legal Graveyard**

#### **4.2.1 Defining "Stalled" for the AI**

Legally, "Stalled" is a budgetary status, not just a contractual one.

* **Treasury Definition:** A project that has stopped implementation or receives inadequate budget allocations.27  
* **Oneka Logic:** Oneka AI should identify "Stalled" projects by looking for the **"Annex 7 Signature"**: Projects appearing in the *Program Based Budget* (Annex 7\) with:  
  * Cumulative Expenditure \= Previous Year Cumulative Expenditure (i.e., No change).  
  * Allocation \= 0 or Negligible.

## ---

**Module 5: The "Ghost" Data Gaps**

This is where Oneka AI functions as the "Interoperability Layer" to expose Ghost Projects.

### **5.1 Bridging the Gap: PIMIS vs. IFMIS**

#### **5.1.1 The Missing "Project Status Report"**

Project Managers are required to file monthly status reports, often stored in physical files.31 The National Treasury's **Public Investment Management Information System (PIMIS)** is intended to be the digital repository for this.32

* **The Reality:** PIMIS usage is often inconsistent or disconnected from IFMIS payment data.  
* **Oneka’s Role:** Oneka AI must ingest data from **PIMIS** (Project Status) and **IFMIS** (Payments).  
* **The "Ghost" Algorithm:**  
  * If IFMIS shows Payment Released BUT PIMIS/Physical Report shows Status: 0% / Not Started, THEN Flag \= Ghost Project.  
  * If PIMIS shows Status: 100% Complete BUT IFMIS shows Retention Money Not Paid, THEN Flag \= Audit Query (Pending Bill).

### **5.2 Annex 7: The Data Rosetta Stone**

The most critical data source for Oneka AI to digitize is **"Annex 7"** of the Budget Estimates.33

* **Why?** It is the *only* statutory document where Accounting Officers must list "Stalled Projects" and "Outstanding completion costs."  
* **Action:** Oneka AI must parse these PDF tables to build the "Universe of Obligations." This data allows the OAG to verify if the "Pending Bills" declared in the financial statements match the "Balance to Completion" in the project register.

## ---

**Conclusion: Oneka AI as the OAG's Force Multiplier**

Oneka AI is not the auditor; it is the **auditor's radar**. By creating an interoperability layer that connects the **Financial Leg** (IFMIS/Exchequer) with the **Project Leg** (PIMIS/NCA/Annex 7), Oneka AI enables the OAG to:

1. **Abandon Random Sampling:** Move to risk-based targeting of 100% of the project population.  
2. **Detect "Ghost" Projects:** Identify mismatches between payment flows and physical progress reports.  
3. **Prevent Corruption:** Flag "Lowball" tenders and "Stalled" projects in real-time, rather than years later in a post-mortem audit report.

This tool operationalizes the PFM Act and PPDA, turning static statutes into dynamic, algorithmic oversight.

#### **Works cited**

1. NATIONAL CONSTRUCTION AUTHORITY PROPOSED REVISED CONTRACTORS EVALUATION CRITERIA APRIL 2021 \- NCA, accessed January 18, 2026, [https://www.nca.go.ke/media/The-Draft-Revised-Evaluation-Criteria.pdf](https://www.nca.go.ke/media/The-Draft-Revised-Evaluation-Criteria.pdf)  
2. Local Contractor Registration \- NCA | National Construction Authority, accessed January 18, 2026, [https://www.nca.go.ke/local-contractors](https://www.nca.go.ke/local-contractors)  
3. Unlock NCA Categories: How to Register as a Contractor | CK \- Construction Kenya, accessed January 18, 2026, [https://www.constructionkenya.com/2623/nca-kenya-registration-requirements/](https://www.constructionkenya.com/2623/nca-kenya-registration-requirements/)  
4. Nca Payments | PDF | Chess Theory \- Scribd, accessed January 18, 2026, [https://www.scribd.com/document/883576056/Nca-Payments](https://www.scribd.com/document/883576056/Nca-Payments)  
5. Who We Are \- Kenya National Highways Authority, accessed January 18, 2026, [https://kenha.co.ke/about-us/](https://kenha.co.ke/about-us/)  
6. Frequently Asked Questions – KeRRA | Kenya Rural Roads Authority, accessed January 18, 2026, [https://kerra.go.ke/frequently-asked-questions/](https://kerra.go.ke/frequently-asked-questions/)  
7. Kenya Roads (Roadside Stations) Regulations, 2023, accessed January 18, 2026, [https://kenha.co.ke/wp-content/uploads/2023/09/Kenya-Roads-Roadside-Stations-Regulations-2023.pdf](https://kenha.co.ke/wp-content/uploads/2023/09/Kenya-Roads-Roadside-Stations-Regulations-2023.pdf)  
8. Strategic Planning and Implementation of Public Involvment in Environmental Decision Making \- ielrc.org, accessed January 18, 2026, [https://ielrc.org/content/w0003.pdf](https://ielrc.org/content/w0003.pdf)  
9. FINAL ESIA REPORT August 2025 | JICA, accessed January 18, 2026, [https://www.jica.go.jp/english/about/policy/environment/id/africa/a\_b\_fi/kenya/\_\_icsFiles/afieldfile/2025/09/02/EIA\_(Sep\_2\_2025).pdf](https://www.jica.go.jp/english/about/policy/environment/id/africa/a_b_fi/kenya/__icsFiles/afieldfile/2025/09/02/EIA_\(Sep_2_2025\).pdf)  
10. RWC 566 \- Kenya Rural Roads Authority, accessed January 18, 2026, [https://kerra.go.ke/wp-content/uploads/2025/05/RWC-566-NDARAGWA-MAILI-KUMI-Copy.pdf](https://kerra.go.ke/wp-content/uploads/2025/05/RWC-566-NDARAGWA-MAILI-KUMI-Copy.pdf)  
11. POM KUSP \- Annex 15 Financial Procedures Manual (separate document) \- Isiolo Municipality, accessed January 18, 2026, [http://isiolomunicipality.go.ke/images/POM%20KUSP%20-%20Annex%2015%20Financial%20Procedures%20Manual%20(separate%20document).pdf](http://isiolomunicipality.go.ke/images/POM%20KUSP%20-%20Annex%2015%20Financial%20Procedures%20Manual%20\(separate%20document\).pdf)  
12. REPORT OF THE SENATE SESSIONAL COMMITTEE ON COUNTY PUBL \- Parliament of Kenya, accessed January 18, 2026, [https://www.parliament.go.ke/sites/default/files/2018-11/CPAIC%20Report%20Volume%20II%20Tabled%2014.11.18%20%281%29.pdf](https://www.parliament.go.ke/sites/default/files/2018-11/CPAIC%20Report%20Volume%20II%20Tabled%2014.11.18%20%281%29.pdf)  
13. Financial Management and Procedures Manual for County Health Spending Units.pdf \- Maarifa Centre, accessed January 18, 2026, [https://maarifa.cog.go.ke/sites/default/files/2025-04/Financial%20Management%20and%20Procedures%20Manual%20for%20County%20Health%20Spending%20Units.pdf](https://maarifa.cog.go.ke/sites/default/files/2025-04/Financial%20Management%20and%20Procedures%20Manual%20for%20County%20Health%20Spending%20Units.pdf)  
14. STANDARD TENDER DOCUMENT \- Public Procurement Information Portal, accessed January 18, 2026, [https://tenders.go.ke/storage/Documents/1766166623767-tender-document.pdf](https://tenders.go.ke/storage/Documents/1766166623767-tender-document.pdf)  
15. PUBLIC FINANCE MANAGEMENT ACT \- Amazon S3, accessed January 18, 2026, [https://s3-eu-west-1.amazonaws.com/s3.sourceafrica.net/documents/119214/Public-Finance-Management-Act.pdf](https://s3-eu-west-1.amazonaws.com/s3.sourceafrica.net/documents/119214/Public-Finance-Management-Act.pdf)  
16. Intergovernmental Fiscal Relations in Kenya, 2014/15-2019/20: Implications for County Budget Execution, accessed January 18, 2026, [https://igrtc.go.ke/sites/default/files/2024-10/Intergovernmental%20Fiscal%20Relations%20in%20Kenya%20Implications%20for%20County%20Budget%20Execution.pdf](https://igrtc.go.ke/sites/default/files/2024-10/Intergovernmental%20Fiscal%20Relations%20in%20Kenya%20Implications%20for%20County%20Budget%20Execution.pdf)  
17. Report On Regulations, 2021 \- Parliament of Kenya, accessed January 18, 2026, [https://www.parliament.go.ke/sites/default/files/2022-05/REPORT%20ON%20REGULATIONS,%202021.pdf](https://www.parliament.go.ke/sites/default/files/2022-05/REPORT%20ON%20REGULATIONS,%202021.pdf)  
18. How is a budget prepared? \- Office of the Controller of Budget, accessed January 18, 2026, [https://cob.go.ke/ufaqs/how-is-a-budget-prepared/](https://cob.go.ke/ufaqs/how-is-a-budget-prepared/)  
19. Controller of Budget \- Bunge Library \- Parliament of Kenya, accessed January 18, 2026, [https://libraryir.parliament.go.ke/collections/a0e8b4a8-2568-40b8-9a18-06f9bf6cc0ea](https://libraryir.parliament.go.ke/collections/a0e8b4a8-2568-40b8-9a18-06f9bf6cc0ea)  
20. Kenya Open Data Inventory Profile, accessed January 18, 2026, [https://odin.opendatawatch.com/Report/countryProfile/KEN?year=2024](https://odin.opendatawatch.com/Report/countryProfile/KEN?year=2024)  
21. GOVERNMENT OF KENYA PUBLIC SECTOR ENTITIES' MODEL INTERNAL AUDIT MANUAL August 2025, accessed January 18, 2026, [https://www.psasb.go.ke/Documents/Internal%20Audit%20Standards/Manuals/Internal%20Audit%20Manual%20and%20Circular/Model%20Public%20Sector%20Internal%20Audit%20Manual.pdf](https://www.psasb.go.ke/Documents/Internal%20Audit%20Standards/Manuals/Internal%20Audit%20Manual%20and%20Circular/Model%20Public%20Sector%20Internal%20Audit%20Manual.pdf)  
22. KENYA FORESTRY RESEARCH INSTITUTE (KEFRI) RISK BASED PROCEDURES MANUAL KEFRI/SOP/IA/11, accessed January 18, 2026, [https://www.kefri.org/assets/publications/staffdownloads/QMS/Internalauditproceduresmanual.pdf](https://www.kefri.org/assets/publications/staffdownloads/QMS/Internalauditproceduresmanual.pdf)  
23. PERFORMANCE AUDIT, accessed January 18, 2026, [https://repository.ach.gov.ru/upload/cards/62a/Performance-Audit-Report-on-the-Utilisation-of-the-Road-Fund-for-Road-Maintenance-in-Zambia-2020-2022.pdf](https://repository.ach.gov.ru/upload/cards/62a/Performance-Audit-Report-on-the-Utilisation-of-the-Road-Fund-for-Road-Maintenance-in-Zambia-2020-2022.pdf)  
24. Perfomance-Audit-Report-on-Provision-of-Sewerage-in-Major-Towns-in-Kenya-A-Case-study-of-Nairobi-City.pdf, accessed January 18, 2026, [https://nairobiassembly.go.ke/ncca/wp-content/uploads/paperlaid/2018/Perfomance-Audit-Report-on-Provision-of-Sewerage-in-Major-Towns-in-Kenya-A-Case-study-of-Nairobi-City.pdf](https://nairobiassembly.go.ke/ncca/wp-content/uploads/paperlaid/2018/Perfomance-Audit-Report-on-Provision-of-Sewerage-in-Major-Towns-in-Kenya-A-Case-study-of-Nairobi-City.pdf)  
25. Tender No. RWC 784 \- KENYA RURAL ROADS AUTHORITY, accessed January 18, 2026, [https://kerra.go.ke/wp-content/uploads/2025/11/RWC-784.pdf](https://kerra.go.ke/wp-content/uploads/2025/11/RWC-784.pdf)  
26. DOC 21.cdr \- Public Procurement Information Portal, accessed January 18, 2026, [https://tenders.go.ke/storage/Documents/1730215027628-pdf.pdf](https://tenders.go.ke/storage/Documents/1730215027628-pdf.pdf)  
27. Untitled \- PFMR Secretariat, accessed January 18, 2026, [https://pfmr.go.ke/wp-content/uploads/2020/11/Circular-No.16-2020-on-Guidelines-for-Preparation-of-the-2021.22-2023.24-Medium-Term-Budget.pdf](https://pfmr.go.ke/wp-content/uploads/2020/11/Circular-No.16-2020-on-Guidelines-for-Preparation-of-the-2021.22-2023.24-Medium-Term-Budget.pdf)  
28. COUNTY GOVERNMENT OF BUNGOMA COUNTY EXECUTIVE COMMITTEE MEMBER MINISTRY OF FINANCE AND ECONOMIC PLANNING, accessed January 18, 2026, [https://www.bungoma.go.ke/wp-content/uploads/2020/07/cir-no-5-prep-of-MTEF.pdf](https://www.bungoma.go.ke/wp-content/uploads/2020/07/cir-no-5-prep-of-MTEF.pdf)  
29. Auditor-General's Summary Report on Donor Funded Projects 2023-2024 | OAGKenya, accessed January 18, 2026, [https://www.oagkenya.go.ke/wp-content/uploads/2025/08/Auditor-Generals-Summary-Report-on-Donor-Funded-Projects-2023-2024.pdf](https://www.oagkenya.go.ke/wp-content/uploads/2025/08/Auditor-Generals-Summary-Report-on-Donor-Funded-Projects-2023-2024.pdf)  
30. PUBLIC PROCUREMENT AND ASSET DISPOSAL ACT \- EACC, accessed January 18, 2026, [https://eacc.go.ke/default/wp-content/uploads/2018/06/PPDA.pdf](https://eacc.go.ke/default/wp-content/uploads/2018/06/PPDA.pdf)  
31. ISO 9001:2015 BASED QMS STANDARD OPERATING PROCEDURES MANUAL \- National Irrigation Authority, accessed January 18, 2026, [https://www.irrigationauthority.go.ke/wp-content/uploads/2021/01/003-SOPs-Final.pdf](https://www.irrigationauthority.go.ke/wp-content/uploads/2021/01/003-SOPs-Final.pdf)  
32. THE NATIONAL TREASURY AND ECONOMIC PLANNING PUBLIC INVESTMENT MANAGEMENT DEPARTMENT, accessed January 18, 2026, [https://newsite.treasury.go.ke/sites/default/files/PIMIS%20User%20Manual%20.pdf](https://newsite.treasury.go.ke/sites/default/files/PIMIS%20User%20Manual%20.pdf)  
33. republic of kenya \- the national treasury and planning, accessed January 18, 2026, [https://pfmr.go.ke/wp-content/uploads/2020/11/Circular-No.132019-on-Guidelines-for-Preparation-of-the-202021-202223-Medium-Term-Budget.pdf](https://pfmr.go.ke/wp-content/uploads/2020/11/Circular-No.132019-on-Guidelines-for-Preparation-of-the-202021-202223-Medium-Term-Budget.pdf)  
34. the national treasury and economic planning \- ORPP, accessed January 18, 2026, [https://orpp.or.ke/wp-content/uploads/2024/07/Medium-Term-Expenditure-Framework-MTEF-Circular-for-FY-2025.26-and-the-Medium-Term-min-min\_compressed.pdf](https://orpp.or.ke/wp-content/uploads/2024/07/Medium-Term-Expenditure-Framework-MTEF-Circular-for-FY-2025.26-and-the-Medium-Term-min-min_compressed.pdf)