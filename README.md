# Global Citizen Hub

**The Smart Traveling and Relocation Toolkit**

## Overview
A unified, multi-pillar intelligence framework designed for lifelong learners, including students, professionals, families, and retirees, in the US and more regions of the globe. The Global Citizen Hub allows users to input their destination and travel parameters once and instantly access synchronized intelligence across six core pillars without ever losing their session data.

---

## System Architecture & Data Flow
Global Citizen Hub is engineered as a zero-backend, client-side static web application. It eliminates external databases or server sessions by using a **synchronized state machine driven entirely by URL query parameters**.

```text
[Master Dashboard (index.html)]
        │ (User inputs destination city, travel month, duration, and budget profile)
        ▼
[https://www.kimchang.com/en/insights/detail.kc?sch_section=4&idx=31716](https://www.kimchang.com/en/insights/detail.kc?sch_section=4&idx=31716)
        │ (User clicks pillar links)
        ▼
[Individual Pillar Hydration & Local Calculators]
