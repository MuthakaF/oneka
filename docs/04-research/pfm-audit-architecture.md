# **The Anatomy of High-Value Infrastructure Execution in Kenya: A PFM and Audit Forensic Analysis for Oneka AI**

## **Executive Context and Structural Framework**

The development of "Oneka AI" as a digital audit tool requires a foundational understanding of the Kenyan infrastructure ecosystem that transcends surface-level bureaucratic descriptions. For a Public Financial Management (PFM) Specialist and Lead Infrastructure Auditor, the objective is to codify the chaotic reality of project execution into algorithmic logic. This report deconstructs the lifecycle of "Tier 1" projects—defined here as high-value, high-risk undertakings typically executed by NCA-1 contractors—anchoring every observation in the _Public Finance Management Act, 2012_ (PFM Act), the _Public Procurement and Asset Disposal Act, 2015_ (PPDA), and the operational realities of Kenya’s National Treasury and Office of the Auditor General (OAG).

The Kenyan infrastructure landscape is characterized by a dichotomy between sophisticated statutory frameworks and fragmented implementation. While the _Integrated Financial Management Information System_ (IFMIS) offers a digital trail of payments, the physical reality of project completion is often obscured by analog reporting gaps. This report serves as the forensic blueprint for Oneka AI, mapping the "paper trail," the "money trail," and the "accountability chain" to enable the automation of oversight that is currently performed via manual, sample-based methodologies.

To successfully replicate the intuition of a seasoned OAG auditor, Oneka AI must not merely ingest data; it must understand the _intent_ of the statutes versus the _behavior_ of the actors. It must recognize that a "Stalled Project" is rarely declared so in a legal letter of termination, but rather whispers its status through the silence of zero expenditure in the "Annex 7" of a budget circular. This report provides the specific logic gates, statutory references, and institutional bottlenecks required to build that intelligence.

##

## **Module 1: The Definition & Execution**

To audit a project effectively, one must first define its taxonomy within the regulatory state. In Kenya, the classification of a "Tier 1" project is not a single designation but a composite of contractor capacity (NCA), engineering complexity (EBK/KeNHA), and financial magnitude.

### **1.1 "Tier 1" Classification: The Regulatory Matrix**

The term "Tier 1" is an industry colloquialism that corresponds to specific statutory classifications managed by the National Construction Authority (NCA) and the Engineers Board of Kenya (EBK). The distinction is critical for Oneka AI: if the tool cannot correctly classify a project's scale, it cannot apply the correct risk weighting.

#### **1.1.1 National Construction Authority (NCA) Classification Logic**

The NCA operates a tiered registration system that strictly delineates the financial and technical capacity of contractors. For the purpose of Oneka AI, a "Tier 1" project is almost exclusively the domain of **NCA-1** contractors. The regulatory framework establishes a massive capabilities gap between NCA-1 and NCA-2, effectively creating a monopoly for the former on mega-projects.

**The "Unlimited" Value Threshold**

According to the NCA's evaluation criteria and registration mandates, the NCA-1 category is the only classification capable of undertaking works with an "Unlimited" contract value.1 This is the primary filter for the AI: any project with a contract sum exceeding the upper limits of NCA-2 must functionally be treated as an NCA-1 project. The ceilings for lower tiers are rigid and sector-specific, meaning a contractor valid for a KES 600M building project (NCA-1) might be ineligible for a KES 600M water project if they hold an NCA-2 Water license.

| Works Category            | NCA-1 Limit (KES) | NCA-2 Limit (KES) | NCA-3 Limit (KES) | NCA-4 Limit (KES) |
| :------------------------ | :---------------- | :---------------- | :---------------- | :---------------- |
| **Building Works**        | **Unlimited**     | 500,000,000       | 300,000,000       | 200,000,000       |
| **Roads & Civil Works**   | **Unlimited**     | 750,000,000       | 500,000,000       | 300,000,000       |
| **Water Works**           | **Unlimited**     | 250,000,000       | 150,000,000       | 100,000,000       |
| **Electrical/Mechanical** | **Unlimited**     | 250,000,000       | 150,000,000       | 100,000,000       |

Source Data: 1

**The Foreign Contractor Factor**

Oneka AI must also account for the origin of the firm. The NCA imposes distinct fee structures for foreign firms, who are almost invariably registered as NCA-1 due to the capital-intensive nature of the projects they pursue.

- **Registration Fees:** Foreign firms pay USD 20,000 per class of works, whereas local NCA-1 contractors pay KES 100,000.1
- **Renewal Fees:** Annual renewal for foreign firms is USD 10,000, compared to KES 30,000 for locals.1

**Audit Insight for Oneka AI:**

1. **Compliance Check:** The AI must flag any project with a contract value \>KES 1 Billion that is awarded to a contractor _not_ holding a valid NCA-1 license as a "Statutory Non-Compliance Risk."
2. **License Validity:** NCA licenses are renewable annually.4 Performing "Unlimited" works on an expired license renders the contract voidable under Section 15 of the National Construction Authority Act. The AI must scrape the annual NCA register and cross-reference it with active project dates.

#### **1.1.2 Engineers Board of Kenya (EBK) and the "Category A" Ambiguity**

There is significant confusion in the industry regarding the term "Category A" or "Class 1" when referring to the _engineering_ aspect of a project. The Engineers Board of Kenya (EBK) primarily registers **persons** (Graduate, Professional, Consulting Engineers) and **firms**, not projects directly.5

**Consulting Firm Classification**

The EBK registers consulting firms, but there isn't a strict "Class 1" label for firms in the same way as NCA contractors. Instead, firms are evaluated on the number of registered Principal Partners and shareholding structure (requiring 51% ownership by registered Consulting Engineers).8 A "Tier 1" project will inevitably require a Consulting Firm where the Principal Partner is a registered Consulting Engineer with a valid practicing license.

**Unpacking "Category A" Projects**

The terminology "Category A" regarding projects typically arises from two other distinct sources which the Oneka AI must distinguish to avoid misclassification:

1. **Road Classification (KeNHA):** The Ministry of Roads and Transport classifies roads by function. **Class A** (International Trunk Roads) and **Class B** (National Trunk Roads) constitute the high-value infrastructure spine managed by the Kenya National Highways Authority (KeNHA).10
   - _Class A:_ International trunk roads linking borders or international terminals (e.g., Mombasa Port, Airports).
   - _Class B:_ National routes linking economic hubs and County Headquarters.
   - _Cost Implication:_ These roads have the highest geometric design standards and per-kilometer costs, automatically placing them in the Tier 1 bracket.12
2. **Environmental Impact (NEMA/World Bank):** In donor-funded and mega-infrastructure projects, "Category A" refers to projects with **significant adverse environmental impacts**.13
   - _Definition:_ Projects likely to have significant adverse impacts that are sensitive, diverse, or unprecedented (e.g., large dams, highways requiring massive resettlement).16
   - _Audit Consequence:_ These projects trigger rigorous Environmental and Social Impact Assessments (ESIA) and often involve World Bank or JICA safeguards. The "Category A" status here is a proxy for _complexity_ and _risk_ rather than just cost.

**Conclusion on Classification:** For Oneka AI, a "Tier 1 Project" should be algorithmically defined as **(NCA-1 Contractor) .**

### **1.2 The Lifecycle: From Concept to Handover**

The journey of a Tier 1 project follows a rigorous statutory path defined by the PFM Act and the PPDA. However, the operational reality involves specific bottlenecks, particularly during the payment certification process.

#### **1.2.1 The Critical Path of the Interim Payment Certificate (IPC)**

The IPC is the financial heartbeat of any infrastructure project. If the IPC process stalls, the project becomes a "Stalled Project" (detailed in Module 4). The Oneka AI must monitor the time-lag at each signature stage.

1\. Joint Measurement (The Origin)  
The cycle begins on-site. The Contractor’s Site Agent and the Government’s Resident Engineer (RE) conduct a physical "Joint Measurement" of works done.

- _The Document:_ These measurements are recorded in the _Measurement Book_ (MB), which is the primary source document for all audits.
- _The Conflict:_ This is the "Ground Truth" data point. If the RE is unavailable or compromised, the MB is not updated, and no IPC can be generated.17

2\. Generation of the IPC  
Based on the MB, the Contractor submits a statement of the estimated value of works. The RE reviews and corrects this, creating the "Interim Payment Certificate".17

- _Statutory Timeline:_ Standard Tender Documents typically mandate the Engineer to certify the IPC within **30 to 45 days** of the contractor's submission.17

3\. The Signature Chain (The "Accountability Chain")  
Once the RE signs, the IPC is no longer just an engineering document; it becomes a financial instrument. The signature chain in a typical County Government or National Agency is as follows:

- **Signatory 1: The Engineer (Technical Approval):** The Resident Engineer (or County Engineer) signs to certify that the works meet technical specifications.17
- **Signatory 2: The Chief Officer (Departmental/Vote Book Approval):** The IPC moves to the **Chief Officer (CO)** of the relevant department (e.g., Roads & Infrastructure). The CO is the designated **Accounting Officer** for that specific vote head under the PFM Act. Their signature is crucial because they must verify that the expenditure is within the approved budget estimates and that the vote book has a sufficient balance.21
- **Signatory 3: The Head of Treasury/CEC Finance (Authority to Pay):** While the County Executive Committee Member (CEC) is a political appointee and often does not sign the Payment Voucher (PV) directly to avoid personal liability, they provide the policy approval. The Head of County Treasury or the Accountant General authorizes the final payment, ensuring it aligns with the Exchequer Release.24

4\. Payment Processing  
The approved PV is then entered into IFMIS, and an Electronic Funds Transfer (EFT) is initiated to the contractor’s bank account.18

#### **1.2.2 The Bottleneck Analysis**

The primary bottlenecks where Oneka AI should look for "stalled" signals are:

- **The "Resident Engineer" Gap:** Delays in joint measurement due to logistical incapacity or rent-seeking. If the RE does not sign, the paper trail never begins.
- **The "Vote Book" Lock:** The Chief Officer cannot sign the PV if the IFMIS system shows "insufficient funds" or if the Exchequer has not released the specific development vote.25 This is the most common cause of "Pending Bills."
- **The "Interest" Trap:** Once an IPC is certified by the Engineer but not paid by Treasury within the contractual period (usually 28-56 days), it attracts interest (typically Central Bank Rate \+ 3%).18 This interest component is rarely budgeted for, causing the bill to be perpetually deferred as Accounting Officers fear paying unbudgeted interest.

##

## **Module 2: The Money Flow (The "Paper Trail")**

Understanding the exact path of a shilling from the National Treasury to the Contractor’s bank account is essential for forensic auditing. The flow is governed strictly by the Constitution (Article 228\) and the PFM Act 2012\.

### **2.1 Treasury to Site: The Exchequer Issue Process**

The "Exchequer" is the central pot of government funds. Money does not flow automatically; it must be "requisitioned."

#### **Step 1: The Exchequer Requisition and Issue**

- **The Source:** All revenues raised by the National Government are deposited into the **Consolidated Fund**. All revenues raised by or allocated to a County Government are deposited into the **County Revenue Fund (CRF)**.26
- **The Gatekeeper:** The **Controller of Budget (COB)** is the independent constitutional gatekeeper. The National Treasury or County Treasury cannot withdraw funds without COB approval.
- **The Mechanism:** To move money, the Accounting Officer (PS or Chief Officer) submits a **Requisition** to the COB. This requisition is not a simple letter; it is a dossier that must include 28:
  - _Requisition Form A:_ The formal request.
  - _Schedule of Payments:_ A list of who is being paid and for what.
  - _Bank Balances:_ Proof of current standing in operational accounts.
  - _Work Plans:_ Evidence that the expenditure was planned.
- **The Release:** Upon approval, the COB authorizes the Central Bank of Kenya (CBK) to move funds from the Consolidated Fund/CRF to the **Ministry/Departmental Operational Account**.26

#### **Step 2: The Operational Account (Vote Head)**

- Funds arrive in the Ministry or County Department's account at the Central Bank (or a designated commercial bank for some agencies). These funds are now "voted" for specific development projects (e.g., "Vote Head 101 \- Construction of Road X").
- **The Commingling Risk:** A major audit risk is the diversion of Development Funds to Recurrent Expenditure (e.g., paying salaries during a cash crunch). The PFM Act strictly prohibits this, yet it remains a frequent query in OAG reports.22

#### **Step 3: Contractor Payment (IFMIS)**

- The payment is processed through **IFMIS** (Integrated Financial Management Information System). The Accountant General or Head of Treasury initiates the payment in the system.
- **The Transfer:** The funds move electronically (EFT/RTGS) from the Operational Account directly to the **Contractor’s Commercial Bank Account** nominated in the contract.18
- **Discharge of Liability:** The PFM Act Regulations deem the receipt of money by the payee as the full discharge of the government's liability.26

###

### **2.2 The Reporting Pulse: Visibility of the Flow**

The transparency of this money flow is the central challenge for external auditors and the public. Oneka AI must know where to look.

#### **2.2.1 The Controller of Budget (COB) Reports**

The **Budget Implementation Review Report (BIRR)** is indeed the only reliable, periodic public source of truth regarding the _movement_ of funds.

- **Frequency:** Published Quarterly and Annually.29
- **Content:** It details the _Exchequer Issues_ (cash released by COB) versus _Actual Expenditure_ (cash spent by the entity).
- **Reliability:** It is highly reliable because it is based on the actual withdrawals authorized by the COB from the sovereign funds. If the COB didn't approve it, the money theoretically didn't move.31
- **Forensic Value:** Oneka AI should compare the _Exchequer Issues_ for Development in the BIRR against the _Sum of IPCs Certified_ in a County. If IPCs \> Exchequer Issues, the County is technically insolvent regarding those projects.

#### **2.2.2 IFMIS and Public Reporting**

Does IFMIS generate public-facing reports? **No, not directly.**

- **Nature of System:** IFMIS is an internal Oracle-based Enterprise Resource Planning (ERP) system used for transaction processing, not public broadcasting.32
- **The "Open Data" Illusion:** While Kenya has an Open Data portal (kenya.opendataforafrica.org), the data is often aggregated, outdated, or incomplete.32 The raw, granular IFMIS transaction data (e.g., "Paid KES 50M to Contractor X on Date Y") is not publicly accessible via an API.
- **Data Access Strategy:** Oneka AI cannot "hook" into IFMIS publicly. It must rely on the derivative reports (BIRR), OAG reports, or the _Public Procurement Information Portal_ (PPIP) which tracks awards but not payments.

## ---

**Module 3: The Audit Selection (The OAG's "Brain")**

The Office of the Auditor General (OAG) faces a massive resource constraint. With thousands of projects and limited staff, they cannot audit 100% of projects physically. Their methodology is critical for Oneka AI to understand, as the goal of the AI is to simulate and scale this very process.

### **3.1 Risk-Based Auditing (RBA) Methodology**

The OAG has transitioned from transaction-based auditing to **Risk-Based Auditing (RBA)**.34 This methodology prioritizes audit resources where the risk of material misstatement or financial loss is highest.

#### **3.1.1 The Risk Profiling Matrix**

The OAG’s "Brain" targets projects based on specific risk drivers:

1. **Materiality (Financial Value):** Projects with high monetary value are automatically high risk. While there is no statutory "Materiality Threshold" published (e.g., \>KES 100M), in practice, "Vision 2030 Flagship Projects" and Tier 1 infrastructure are prioritized because they account for the bulk of the development budget.36 The "Vision 2030" tag is a primary risk flag.
2. **Sector Risk:** Specific sectors are targeted based on economic significance and historical corruption risk. **Roads, Water, Health, and Education** are perennial targets.37 The OAG often conducts "Thematic Audits" (e.g., a nationwide audit of all Level 5 Hospitals).
3. **Expenditure Trends (The "Burn Rate"):** The OAG monitors "burn rates." Projects with unusually high expenditure at the close of the financial year (June rush) to avoid returning funds to the Treasury are flagged. Conversely, projects with zero absorption despite allocation are flagged for stalling.36
4. **Pending Bills Accumulation:** A high accumulation of pending bills is a risk indicator for "stalled projects," often triggering a specific Performance Audit.38

#### **3.1.2 Do They Target Variations?**

Yes. Cost overruns (Variations) are a primary flag.

- **The 25% Rule:** A variation exceeding **25%** of the original contract sum generally requires fresh tendering under the PPDA. If a project has variations that push it beyond this threshold without new approvals, it is a guaranteed audit query.
- **Scope Creep:** The OAG looks for "Scope Creep" where the original tender was lowballed to win, and variations were used to inflate the price later.39

### **3.2 The "Sample" Problem vs. AI Coverage**

The OAG’s physical sampling rate is a major limitation that Oneka AI can exploit.

**The OAG Sampling Rate**

In Performance Audits (e.g., Road Projects), the OAG uses "Stratified Random Sampling." They might select a sample of 50-70 projects out of a population of thousands to represent the whole.

- _Volume vs. Value:_ The sample might cover \~50% of the _total value_ of the portfolio but only 10-20% of the _number_ of projects.40
- _Regional Distribution:_ The sample is often distributed to ensure geographic representation (e.g., picking 2 projects from each County or Road Class).42

**The AI Advantage: Exception-Based vs. Representative**

Oneka AI aims for 100% population coverage (Census approach).

- _OAG Approach:_ "We will check 5% of sites to see if the system is working."
- _Oneka AI Approach:_ "We will scan 100% of the data points and flag the 5% that are anomalous."
- _Implementation:_ Instead of picking a random sample, the AI should flag _every_ project where the _Price/Km_ deviates by \>2 standard deviations from the cluster mean. This allows human auditors to focus their physical visits solely on high-probability problem sites.

## ---

**Module 4: The Accountability Chain**

This module addresses the two most critical points of friction in the project lifecycle: the awarding of the tender and the death of the project (stalling).

### **4.1 The "Engineer's Estimate" vs. "Award Sum"**

The relationship between the Engineer's Estimate (EE) and the Tender Award Sum is the most contentious metric in Kenyan procurement.

#### **4.1.1 The \+/- 15% Rule: Myth vs. Statute**

Historically, there was a rigid practice (often cited in old Ministry of Works circulars) that a tender must be within \+/- 10% or 15% of the EE to be responsive.

- **Current Legal Stance (PPDA 2015):** The Public Procurement and Asset Disposal Act (2015) has nuanced this. **Section 70(6)(b)** of the PPDA 2015 explicitly states that a person **shall not be disqualified** solely on the basis that a bidder quoted above or below a certain percentage of the engineer's estimates.43 This clause was introduced to encourage competition and prevent the EE from becoming a tool for fixing prices.

#### **4.1.2 The "Abnormally Low Tender" (ALT) Protocol**

However, this does not mean a bidder can quote zero. **Section 37.2** of standard tender documents (and PPDA Regulations) introduces the concept of the "Abnormally Low Tender".44

- **The Threshold:** If a bid is significantly lower (e.g., **\>20% below EE**) or "appears so low that it raises material concerns," the Procuring Entity is _mandated_ to intervene.
- **The Procedure:** The Entity must demand a **detailed price analysis** from the bidder. The bidder must demonstrate how they will achieve the works at that price (e.g., via innovative technology, economies of scale, or lower supply chain costs).44
- **The Rejection:** If the bidder cannot demonstrate the viability of their price, the tender _can and should_ be rejected to avoid the risk of non-performance.46

**Forensic Audit Flag:** If a project is awarded at \>20% below the EE _without_ a documented "Abnormally Low Tender" price analysis in the tender evaluation minutes, it is a high-risk flag for "Lowballing" (bidding low to win, then stalling or claiming variations).

### **4.2 Stalled Projects: The Legal Graveyard**

When does a project legally die?

#### **4.2.1 The Operational Definition of "Stalled"**

There is no specific clause in the standard FIDIC conditions or GCC that explicitly defines "Stalled." Instead, the definition is **budgetary**. The National Treasury has issued specific circulars (e.g., Circular No. 16/2019, Circular No. 11/2024) establishing the operational definition for budgeting purposes 48:

- **Stalled Project:** "A project which has stopped being implemented for whatever reason or has been receiving inadequate budget allocations which cannot facilitate meaningful progress over the medium term."
- **On-Going Project:** "A project whose implementation is underway with implementation works having commenced or contractual commitments entered into."

#### **4.2.2 Termination Triggers (GCC/FIDIC)**

While "Stalled" is a budget term, "Termination" is a contract term. Under the General Conditions of Contract (GCC) typically used in Kenya (often FIDIC Red Book derivatives):

- **Termination by Contractor:** The Contractor can terminate if the Employer fails to pay an IPC within the stipulated time (e.g., 90 days) or if the works are suspended for a prolonged period (e.g., 84 days) due to Employer default.44
- **Termination by Employer:** The Employer can terminate for "Abandonment" if the contractor fails to mobilize or stops work without instruction.

**Audit Insight for Oneka AI:** A project is "Stalled" in the system long before it is legally terminated. The AI should look for the "Zombie Phase": Projects that are still listed in the "Ongoing" list in the Budget Estimates but have had **zero** expenditure recorded in the COB reports for \>12 months.

## ---

**Module 5: The "Ghost" Data Gaps**

The final challenge for Oneka AI is the disconnect between the digital promise and the analog reality.

### **5.1 The "Project Status Report" and PIMIS**

Where is the data?

- **The Monthly Report:** Project Managers and Resident Engineers are contractually required to file monthly progress reports. In 90% of County Governments, these are **physical files** sitting in the Registry or the Chief Officer's shelf. They are rarely digitized unless the Auditor General demands them.21
- **The Public Investment Management (PIM) Unit:** The National Treasury has established the **PIM Unit** to centralize this data.
- **PIMIS (Public Investment Management Information System):**
  - **Status:** PIMIS is the designated automated system for the PIM process (Section 29 of PIM Regulations 2022).52
  - **Function:** It is designed to act as the "Bank of Projects," tracking everything from Concept to Closure.
  - **Availability:** While the system exists (URL: pimis.treasury.go.ke), it is primarily an internal tool for the National Treasury and MDAs.52 It is **not** a public-facing dashboard where a citizen can download the status of the road outside their house.
  - **The "Ghost" Gap:** There is often a discrepancy between PIMIS data (what the Ministry tells Treasury) and the Site Reality.

### **5.2 Annex 7: The Rosetta Stone**

The most valuable, under-utilized document for Oneka AI is **"Annex 7"** of the Treasury Budget Circulars and Program Based Budgets (PBB).

- **What is it?** Every year, during the MTEF budget process, Accounting Officers MUST submit a list of "Ongoing and Stalled Projects" in a specific format (Annex 7\) to justify their budget requests.49
- **Data Points:** This annex contains the "Ghost Data" Oneka needs:
  - Project Name.
  - Total Contract Cost.
  - Start Date & Expected End Date.
  - **Cumulative Expenditure to Date.**
  - **Balance to Completion.**
- **Access:** This annex is often buried in the PDF appendices of the _Program Based Budget_ (PBB) documents submitted to Parliament/County Assemblies. It is the single most reliable source of "Stalled" status because if a project is listed here with "Zero" allocation or "Zero" progress year-on-year, it is confirmed stalled by the entity itself.

**Audit Insight for Oneka AI:** Do not rely on PIMIS public access. Instead, the AI should ingest the **Program Based Budget (PBB)** PDF documents from the 47 Counties and National Treasury. By parsing "Annex 7" from these PDFs, the AI can reconstruct the actual status of stalled projects that are otherwise invisible in IFMIS.

## **Conclusion: The Digital Auditor’s Blueprint**

For Oneka AI to succeed, it must not merely replicate the OAG’s sampling method; it must invert it.

1. **Ingest** the NCA and KeNHA registers to define the "Tier 1" universe (NCA-1 \+ Class A/B Roads).
2. **Scrape** the COB BIRR reports to track the macro-flow of Exchequer issues.
3. **Parse** the "Annex 7" tables from Budget Estimates to identify "Zombie Projects" (Stalled).
4. **Monitor** the "IPC Lag" by correlating Engineer certification dates (if digitized) with IFMIS payment dates.
5. **Flag** "Lowball" awards (\>20% below EE) as high-risk vectors for future variation claims.

By digitizing these statutory and operational relationships, Oneka AI moves from being a passive repository to an active _Forensic Audit Engine_, capable of identifying the "ghosts" in the machine that currently cost the Kenyan taxpayer billions in stalled and inefficient infrastructure.

| Module             | Key Audit Data Point | Source of Truth        | Oneka AI Action                                                   |
| :----------------- | :------------------- | :--------------------- | :---------------------------------------------------------------- |
| **Execution**      | Contractor Capacity  | NCA Register (NCA-1)   | Flag if Contract \>KES 750M and Contractor\!= NCA-1.              |
| **Money**          | Payment Release      | COB BIRR / IFMIS       | Compare Exchequer Release vs. Actual Expenditure.                 |
| **Audit**          | Risk Profile         | Sector (Roads/Water)   | Apply "Drill-down" logic to Class A/B Roads & Large Dams.         |
| **Accountability** | Award Variance       | Tender Opening Minutes | Flag Award Sum \< 80% of Engineer's Estimate.                     |
| **Data Gap**       | Project Status       | PBB "Annex 7"          | Parse PDF Annexes to find projects with Funds \< Completion Cost. |

This architecture ensures that Oneka AI is not just a tool for visualization, but a statutory compliance engine built on the bedrock of Kenyan PFM law.

####

####

####

####

####

####

#### **Works cited**

1. NATIONAL CONSTRUCTION AUTHORITY PROPOSED REVISED CONTRACTORS EVALUATION CRITERIA APRIL 2021 \- NCA, accessed January 18, 2026, [https://www.nca.go.ke/media/The-Draft-Revised-Evaluation-Criteria.pdf](https://www.nca.go.ke/media/The-Draft-Revised-Evaluation-Criteria.pdf)
2. Local Contractor Registration \- NCA | National Construction Authority, accessed January 18, 2026, [https://www.nca.go.ke/local-contractors](https://www.nca.go.ke/local-contractors)
3. Unlock NCA Categories: How to Register as a Contractor | CK \- Construction Kenya, accessed January 18, 2026, [https://www.constructionkenya.com/2623/nca-kenya-registration-requirements/](https://www.constructionkenya.com/2623/nca-kenya-registration-requirements/)
4. Nca Payments | PDF | Chess Theory \- Scribd, accessed January 18, 2026, [https://www.scribd.com/document/883576056/Nca-Payments](https://www.scribd.com/document/883576056/Nca-Payments)
5. REGISTRATION OF ENGINEERS AND PROVISION OF PROFESSIONAL ENGINEERING SERVICES IN KENYA, accessed January 18, 2026, [https://www.ebk.go.ke/assets/file/EBK-REGISTRATION-HALF-1.pdf](https://www.ebk.go.ke/assets/file/EBK-REGISTRATION-HALF-1.pdf)
6. Engineers Board of Kenya: Home, accessed January 18, 2026, [https://ebk.go.ke/](https://ebk.go.ke/)
7. Engineering Accreditation Standards, accessed January 18, 2026, [https://eackenya.go.ke/wp-content/uploads/2025/01/aacfea41-engineering-accreditation-standard.pdf](https://eackenya.go.ke/wp-content/uploads/2025/01/aacfea41-engineering-accreditation-standard.pdf)
8. Engineering Consulting Firms Registration Requirement Flyer, accessed January 18, 2026, [https://ebk.go.ke/assets/file/84030421-consulting-firms-registration-requir.pdf](https://ebk.go.ke/assets/file/84030421-consulting-firms-registration-requir.pdf)
9. Consulting Engineer Registration | Engineers Board of Kenya, accessed January 18, 2026, [https://ebk.go.ke/registration/consulting-engineer-registration/](https://ebk.go.ke/registration/consulting-engineer-registration/)
10. Who We Are \- Kenya National Highways Authority, accessed January 18, 2026, [https://kenha.co.ke/about-us/](https://kenha.co.ke/about-us/)
11. Frequently Asked Questions – KeRRA | Kenya Rural Roads Authority, accessed January 18, 2026, [https://kerra.go.ke/frequently-asked-questions/](https://kerra.go.ke/frequently-asked-questions/)
12. Kenya Roads (Roadside Stations) Regulations, 2023, accessed January 18, 2026, [https://kenha.co.ke/wp-content/uploads/2023/09/Kenya-Roads-Roadside-Stations-Regulations-2023.pdf](https://kenha.co.ke/wp-content/uploads/2023/09/Kenya-Roads-Roadside-Stations-Regulations-2023.pdf)
13. Strategic Planning and Implementation of Public Involvment in Environmental Decision Making \- ielrc.org, accessed January 18, 2026, [https://ielrc.org/content/w0003.pdf](https://ielrc.org/content/w0003.pdf)
14. Green Development Guidance for BRI Projects Baseline Study Report, accessed January 18, 2026, [http://en.brigc.net/Reports/Report_Download/202012/P020201201717466274510.pdf](http://en.brigc.net/Reports/Report_Download/202012/P020201201717466274510.pdf)
15. Road Annuity Project in Kenya (Lot 3\) | World Bank Group Guarantees \- MIGA, accessed January 18, 2026, [https://www.miga.org/project/road-annuity-project-kenya-lot-3-0](https://www.miga.org/project/road-annuity-project-kenya-lot-3-0)
16. FINAL ESIA REPORT August 2025 | JICA, accessed January 18, 2026, [https://www.jica.go.jp/english/about/policy/environment/id/africa/a_b_fi/kenya/\_\_icsFiles/afieldfile/2025/09/02/EIA\_(Sep_2_2025).pdf](<https://www.jica.go.jp/english/about/policy/environment/id/africa/a_b_fi/kenya/__icsFiles/afieldfile/2025/09/02/EIA_(Sep_2_2025).pdf>)
17. RWC 566 \- Kenya Rural Roads Authority, accessed January 18, 2026, [https://kerra.go.ke/wp-content/uploads/2025/05/RWC-566-NDARAGWA-MAILI-KUMI-Copy.pdf](https://kerra.go.ke/wp-content/uploads/2025/05/RWC-566-NDARAGWA-MAILI-KUMI-Copy.pdf)
18. STANDARD TENDER DOCUMENT \- Public Procurement Information Portal, accessed January 18, 2026, [https://tenders.go.ke/storage/Documents/1766166623767-tender-document.pdf](https://tenders.go.ke/storage/Documents/1766166623767-tender-document.pdf)
19. COUNTY GOVERNMENT OF BUNGOMA \- Public Procurement Information Portal, accessed January 18, 2026, [https://tenders.go.ke/storage/Documents/1740637975480-soysambumitua-brigadier-water-project-phase-one.pdf](https://tenders.go.ke/storage/Documents/1740637975480-soysambumitua-brigadier-water-project-phase-one.pdf)
20. routine maintenance topstar – sasaka – maresi bridge road \- COUNTY GOVERNMENT OF BUNGOMA, accessed January 18, 2026, [https://bungoma.go.ke/wp-content/uploads/2022/11/7-ROUTINE-MTCE-OF-TOP-STAR-SASAKA-MARESI-BRIDGE-ROAD.pdf](https://bungoma.go.ke/wp-content/uploads/2022/11/7-ROUTINE-MTCE-OF-TOP-STAR-SASAKA-MARESI-BRIDGE-ROAD.pdf)
21. POM KUSP \- Annex 15 Financial Procedures Manual (separate document) \- Isiolo Municipality, accessed January 18, 2026, [http://isiolomunicipality.go.ke/images/POM%20KUSP%20-%20Annex%2015%20Financial%20Procedures%20Manual%20(separate%20document).pdf](<http://isiolomunicipality.go.ke/images/POM%20KUSP%20-%20Annex%2015%20Financial%20Procedures%20Manual%20(separate%20document).pdf>)
22. REPORT OF THE SENATE SESSIONAL COMMITTEE ON COUNTY PUBL \- Parliament of Kenya, accessed January 18, 2026, [https://www.parliament.go.ke/sites/default/files/2018-11/CPAIC%20Report%20Volume%20II%20Tabled%2014.11.18%20%281%29.pdf](https://www.parliament.go.ke/sites/default/files/2018-11/CPAIC%20Report%20Volume%20II%20Tabled%2014.11.18%20%281%29.pdf)
23. COUNTY GOVERNMENT OF ISIOLO, accessed January 18, 2026, [https://isioloassembly.go.ke/wp-content/uploads/2017/08/PIC-AND-PAC-REPORT.pdf](https://isioloassembly.go.ke/wp-content/uploads/2017/08/PIC-AND-PAC-REPORT.pdf)
24. Financial Management and Procedures Manual for County Health Spending Units.pdf \- Maarifa Centre, accessed January 18, 2026, [https://maarifa.cog.go.ke/sites/default/files/2025-04/Financial%20Management%20and%20Procedures%20Manual%20for%20County%20Health%20Spending%20Units.pdf](https://maarifa.cog.go.ke/sites/default/files/2025-04/Financial%20Management%20and%20Procedures%20Manual%20for%20County%20Health%20Spending%20Units.pdf)
25. The Crisis of Pending Bills in Kenya's Public Sector \- APSGS, accessed January 18, 2026, [https://supplierskenya.co.ke/the-crisis-of-pending-bills-in-kenyas-public-sector/](https://supplierskenya.co.ke/the-crisis-of-pending-bills-in-kenyas-public-sector/)
26. PUBLIC FINANCE MANAGEMENT ACT \- Amazon S3, accessed January 18, 2026, [https://s3-eu-west-1.amazonaws.com/s3.sourceafrica.net/documents/119214/Public-Finance-Management-Act.pdf](https://s3-eu-west-1.amazonaws.com/s3.sourceafrica.net/documents/119214/Public-Finance-Management-Act.pdf)
27. Intergovernmental Fiscal Relations in Kenya, 2014/15-2019/20: Implications for County Budget Execution, accessed January 18, 2026, [https://igrtc.go.ke/sites/default/files/2024-10/Intergovernmental%20Fiscal%20Relations%20in%20Kenya%20Implications%20for%20County%20Budget%20Execution.pdf](https://igrtc.go.ke/sites/default/files/2024-10/Intergovernmental%20Fiscal%20Relations%20in%20Kenya%20Implications%20for%20County%20Budget%20Execution.pdf)
28. Report On Regulations, 2021 \- Parliament of Kenya, accessed January 18, 2026, [https://www.parliament.go.ke/sites/default/files/2022-05/REPORT%20ON%20REGULATIONS,%202021.pdf](https://www.parliament.go.ke/sites/default/files/2022-05/REPORT%20ON%20REGULATIONS,%202021.pdf)
29. Budget Process in Kenya | PDF | Government Budget \- Scribd, accessed January 18, 2026, [https://www.scribd.com/document/843270868/Budget-Process-in-Kenya](https://www.scribd.com/document/843270868/Budget-Process-in-Kenya)
30. How is a budget prepared? \- Office of the Controller of Budget, accessed January 18, 2026, [https://cob.go.ke/ufaqs/how-is-a-budget-prepared/](https://cob.go.ke/ufaqs/how-is-a-budget-prepared/)
31. Controller of Budget \- Bunge Library \- Parliament of Kenya, accessed January 18, 2026, [https://libraryir.parliament.go.ke/collections/a0e8b4a8-2568-40b8-9a18-06f9bf6cc0ea](https://libraryir.parliament.go.ke/collections/a0e8b4a8-2568-40b8-9a18-06f9bf6cc0ea)
32. Kenya Open Data Inventory Profile, accessed January 18, 2026, [https://odin.opendatawatch.com/Report/countryProfile/KEN?year=2024](https://odin.opendatawatch.com/Report/countryProfile/KEN?year=2024)
33. Implement e-government system adopting Open Contracting Data Standard (KE0025), accessed January 18, 2026, [https://www.opengovpartnership.org/members/kenya/commitments/ke0025/](https://www.opengovpartnership.org/members/kenya/commitments/ke0025/)
34. GOVERNMENT OF KENYA PUBLIC SECTOR ENTITIES' MODEL INTERNAL AUDIT MANUAL August 2025, accessed January 18, 2026, [https://www.psasb.go.ke/Documents/Internal%20Audit%20Standards/Manuals/Internal%20Audit%20Manual%20and%20Circular/Model%20Public%20Sector%20Internal%20Audit%20Manual.pdf](https://www.psasb.go.ke/Documents/Internal%20Audit%20Standards/Manuals/Internal%20Audit%20Manual%20and%20Circular/Model%20Public%20Sector%20Internal%20Audit%20Manual.pdf)
35. KENYA FORESTRY RESEARCH INSTITUTE (KEFRI) RISK BASED PROCEDURES MANUAL KEFRI/SOP/IA/11, accessed January 18, 2026, [https://www.kefri.org/assets/publications/staffdownloads/QMS/Internalauditproceduresmanual.pdf](https://www.kefri.org/assets/publications/staffdownloads/QMS/Internalauditproceduresmanual.pdf)
36. Automating the audit process \- Office of the Auditor-General, accessed January 18, 2026, [https://www.oagkenya.go.ke/wp-content/uploads/2021/09/Supreme-Auditor-7th-edition.pdf](https://www.oagkenya.go.ke/wp-content/uploads/2021/09/Supreme-Auditor-7th-edition.pdf)
37. Measuring the impact of Audit Recommendations \- OAGKenya, accessed January 18, 2026, [https://www.oagkenya.go.ke/wp-content/uploads/2021/09/Supreme-Auditor-2nd-edition.pdf](https://www.oagkenya.go.ke/wp-content/uploads/2021/09/Supreme-Auditor-2nd-edition.pdf)
38. The risk-based audit (RBA) approach seeks to improve audit \- World Bank Documents, accessed January 18, 2026, [https://documents.worldbank.org/curated/en/697061468048272030/pdf/432900NEWS0Box327357B01PUBLIC10FMNotes9.pdf](https://documents.worldbank.org/curated/en/697061468048272030/pdf/432900NEWS0Box327357B01PUBLIC10FMNotes9.pdf)
39. Auditor-General's Summary Report on Donor Funded Projects 2023-2024 | OAGKenya, accessed January 18, 2026, [https://www.oagkenya.go.ke/wp-content/uploads/2025/08/Auditor-Generals-Summary-Report-on-Donor-Funded-Projects-2023-2024.pdf](https://www.oagkenya.go.ke/wp-content/uploads/2025/08/Auditor-Generals-Summary-Report-on-Donor-Funded-Projects-2023-2024.pdf)
40. PERFORMANCE AUDIT, accessed January 18, 2026, [https://repository.ach.gov.ru/upload/cards/62a/Performance-Audit-Report-on-the-Utilisation-of-the-Road-Fund-for-Road-Maintenance-in-Zambia-2020-2022.pdf](https://repository.ach.gov.ru/upload/cards/62a/Performance-Audit-Report-on-the-Utilisation-of-the-Road-Fund-for-Road-Maintenance-in-Zambia-2020-2022.pdf)
41. Perfomance-Audit-Report-on-Provision-of-Sewerage-in-Major-Towns-in-Kenya-A-Case-study-of-Nairobi-City.pdf, accessed January 18, 2026, [https://nairobiassembly.go.ke/ncca/wp-content/uploads/paperlaid/2018/Perfomance-Audit-Report-on-Provision-of-Sewerage-in-Major-Towns-in-Kenya-A-Case-study-of-Nairobi-City.pdf](https://nairobiassembly.go.ke/ncca/wp-content/uploads/paperlaid/2018/Perfomance-Audit-Report-on-Provision-of-Sewerage-in-Major-Towns-in-Kenya-A-Case-study-of-Nairobi-City.pdf)
42. PROJECT SPONSORSHIP AND PERFORMANCE OF ROADS CONSTRUCTION PROJECTS IN KENYA | Daniel | International Journal of Social Sciences Management and Entrepreneurship (IJSSME), accessed January 18, 2026, [http://mail.sagepublishers.com/index.php/ijssme/article/view/201](http://mail.sagepublishers.com/index.php/ijssme/article/view/201)
43. PUBLIC PROCUREMENT AND ASSET DISPOSAL ACT \- EACC, accessed January 18, 2026, [https://eacc.go.ke/default/wp-content/uploads/2018/06/PPDA.pdf](https://eacc.go.ke/default/wp-content/uploads/2018/06/PPDA.pdf)
44. Tender No. RWC 784 \- KENYA RURAL ROADS AUTHORITY, accessed January 18, 2026, [https://kerra.go.ke/wp-content/uploads/2025/11/RWC-784.pdf](https://kerra.go.ke/wp-content/uploads/2025/11/RWC-784.pdf)
45. Kenya: Public Procurement \- Legal 500 Country Comparative Guides 2025, accessed January 18, 2026, [https://www.legal500.com/guides/chapter/kenya-public-procurement/?export-pdf](https://www.legal500.com/guides/chapter/kenya-public-procurement/?export-pdf)
46. DOC 21.cdr \- Public Procurement Information Portal, accessed January 18, 2026, [https://tenders.go.ke/storage/Documents/1730215027628-pdf.pdf](https://tenders.go.ke/storage/Documents/1730215027628-pdf.pdf)
47. Abnormally low tenders under Reg. 69 Public Contracts Regulations 2015, accessed January 18, 2026, [https://www.howtocrackanut.com/blog/2015/06/abnormally-low-tenders-under-reg-69.html](https://www.howtocrackanut.com/blog/2015/06/abnormally-low-tenders-under-reg-69.html)
48. Untitled \- PFMR Secretariat, accessed January 18, 2026, [https://pfmr.go.ke/wp-content/uploads/2020/11/Circular-No.16-2020-on-Guidelines-for-Preparation-of-the-2021.22-2023.24-Medium-Term-Budget.pdf](https://pfmr.go.ke/wp-content/uploads/2020/11/Circular-No.16-2020-on-Guidelines-for-Preparation-of-the-2021.22-2023.24-Medium-Term-Budget.pdf)
49. republic of kenya \- the national treasury and planning, accessed January 18, 2026, [https://pfmr.go.ke/wp-content/uploads/2020/11/Circular-No.132019-on-Guidelines-for-Preparation-of-the-202021-202223-Medium-Term-Budget.pdf](https://pfmr.go.ke/wp-content/uploads/2020/11/Circular-No.132019-on-Guidelines-for-Preparation-of-the-202021-202223-Medium-Term-Budget.pdf)
50. COUNTY GOVERNMENT OF BUNGOMA COUNTY EXECUTIVE COMMITTEE MEMBER MINISTRY OF FINANCE AND ECONOMIC PLANNING, accessed January 18, 2026, [https://www.bungoma.go.ke/wp-content/uploads/2020/07/cir-no-5-prep-of-MTEF.pdf](https://www.bungoma.go.ke/wp-content/uploads/2020/07/cir-no-5-prep-of-MTEF.pdf)
51. ISO 9001:2015 BASED QMS STANDARD OPERATING PROCEDURES MANUAL \- National Irrigation Authority, accessed January 18, 2026, [https://www.irrigationauthority.go.ke/wp-content/uploads/2021/01/003-SOPs-Final.pdf](https://www.irrigationauthority.go.ke/wp-content/uploads/2021/01/003-SOPs-Final.pdf)
52. THE NATIONAL TREASURY AND ECONOMIC PLANNING PUBLIC INVESTMENT MANAGEMENT DEPARTMENT, accessed January 18, 2026, [https://newsite.treasury.go.ke/sites/default/files/PIMIS%20User%20Manual%20.pdf](https://newsite.treasury.go.ke/sites/default/files/PIMIS%20User%20Manual%20.pdf)
53. Kenya: Technical Assistance Report-Climate Module of the Public Investment Management Assessment \- IMF Infrastructure Governance, accessed January 18, 2026, [https://infrastructuregovern.imf.org/content/dam/PIMA/Countries/Kenya/Documents/KenyaCPIMATAR.pdf](https://infrastructuregovern.imf.org/content/dam/PIMA/Countries/Kenya/Documents/KenyaCPIMATAR.pdf)
54. PIMIS \- Dashboard: Login, accessed January 18, 2026, [https://pimis.treasury.go.ke/](https://pimis.treasury.go.ke/)
55. the national treasury and economic planning \- ORPP, accessed January 18, 2026, [https://orpp.or.ke/wp-content/uploads/2024/07/Medium-Term-Expenditure-Framework-MTEF-Circular-for-FY-2025.26-and-the-Medium-Term-min-min_compressed.pdf](https://orpp.or.ke/wp-content/uploads/2024/07/Medium-Term-Expenditure-Framework-MTEF-Circular-for-FY-2025.26-and-the-Medium-Term-min-min_compressed.pdf)
