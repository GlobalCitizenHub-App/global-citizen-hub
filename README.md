# Global Citizen Hub: The Smart Traveling and Relocation Toolkit

A unified, multi-pillar intelligence framework designed for international students, traveling professionals, expatriates, and relocation movers. The Global Citizen Hub allows users to input their destination and travel parameters **once** and instantly access synchronized intelligence across six core pillars without ever losing their session data.

---

## 🏛️ System Architecture

The project is structured with a central **Master Dashboard** that feeds state data seamlessly across six self-contained modular pillars via URL parameters—ensuring zero data loss and eliminating the need to re-enter information.

```text
global-citizen-hub/
│
├── index.html                  # Master Dashboard (Central Input Brain)
├── README.md                   # Project Documentation & Branding Identity
│
├── about/                      # <-- NEW: About Page Folder
│   └── index.html              
│
├── contact/                    # <-- NEW: Contact Page Folder
│   └── index.html              
│
├── privacy/                    # <-- NEW: Privacy Policy Folder
│   └── index.html              
│
├── terms/                      # <-- NEW: Terms & Affiliate Disclosure Folder
│   └── index.html              
│
├── pillar-1/                   # Climate & Wardrobe
│   └── index.html
├── pillar-2/                   # Cost & Relocation Estimator
│   └── index.html
├── pillar-3/                   # Connectivity & Comms
│   └── index.html
├── pillar-4/                   # Transit & Mobility
│   └── index.html
├── pillar-5/                   # Culture & Etiquette
│   └── index.html
└── pillar-6/                   # Shopping & Conversions (Amazon Helper)
    └── index.html
