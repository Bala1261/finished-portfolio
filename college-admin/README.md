# BEXO College Dashboard — Enterprise Institutional Control Center

Production-ready, multi-tenant BEXO College Admin Dashboard for approved higher-education institutions to manage student digital identities, automated onboarding, service entitlements, and college operations under strict institutional isolation.

---

## 🏛️ Key Features

- **Strict Multi-Tenant Isolation:** Guaranteed tenant boundary protection. Every college user operates exclusively within their institutional scope (`collegeId`).
- **Student Roster Management:** Complete directory of enrolled students with real-time status filtering, quick drill-down detail views, and record lifecycle management.
- **Bulk CSV / TSV Onboarding Wizard:** High-throughput 3-step import wizard with automated schema validation, duplicate detection, and downloadable error reports.
- **Student Service Provisioning:** Seamless workflow to grant BEXO Portfolio and ATS Resume builder services with instant quota tracking.
- **Provisioning Jobs & Auditing:** Automated job tracker with retry capabilities for failed records and immutable security audit logs.
- **Quota & Entitlement Governance:** Real-time visibility into student license allocation, department limits, and active subscription thresholds.
- **Institutional Requests & Desk:** Structured submission workflows for quota expansions, MOU agreement extensions, and operational inquiries.
- **Role-Based Access Control (RBAC):** Distinct institutional permissions for `College Admin`, `Department Coordinator`, and `College Staff`.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or later)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Bala1261/finished-portfolio.git
cd finished-portfolio/college-admin

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173/`.

### Production Build

```bash
# Type check and build production bundle
npm run build

# Preview production build
npm run preview
```

---

## 🛡️ Security & Multi-Tenancy Architecture

All queries, state mutators, and API routes derive tenant scope exclusively from the authenticated user's server-side identity:

1. **Tenant ID Scoping:** Scoped to `currentUser.collegeId` — client-supplied IDs are rejected.
2. **Access Gates:** Institutional users attempting to access external college records receive immediate `403 Access Denied` gates.
3. **Suspension Lockdown:** Colleges in `Suspended` status enter read-only mode with new student provisioning automatically locked.

---

## 💻 Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **Icons:** Lucide React
- **Design System:** Vanilla CSS / Enterprise Glassmorphism Design Tokens
