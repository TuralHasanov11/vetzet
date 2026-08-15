# Product Requirements Document - Vetzet

**Version:** 1.1  
**Date:** 2026-08-02  
**Status:** Draft

---

## 1. Product Overview

**Vetzet** is a veterinary laboratory information and service portal. Its primary purpose is to provide veterinary clinics and practitioners with detailed, searchable information about available laboratory analyses for different animal species.

Reference site: [vetlab.com.tr](https://vetlab.com.tr)

---

## 2. Goals and Objectives

| # | Goal | Success Metric |
|---|------|----------------|
| G1 | Enable vets to discover analyses by species and category | Analyses are searchable and filterable by species/category |
| G2 | Support admin management of core content | Admin can create/edit/delete analyses, species, and categories |
| G3 | Deliver accessible, professional UI | WCAG 2.1 AA contrast targets met |

---

## 3. Target Users

| Role | Description | Auth Required |
|------|-------------|---------------|
| Visitor | Veterinary clinic staff, students, and owners browsing publicly | No |
| TBD | TBD | TBD |

---

## 4. Feature Scope

### 4.1 Public Features

#### F1 - Home (`/`)
- Hero section with CTA to analyses
- Quick stats and species highlights
- Links to catalogue, analyses, and contact

#### F2 - Analysis Portfolio (`/analyses`)
- Filterable list of analyses
- Filters by species and category
- Search by analysis name
- Detail page (`/analyses/[slug]`) for full metadata

#### F3 - Catalogue (`/catalogue`)
- Species-focused landing page
- Cards linking to filtered analyses

#### F5 - About (`/about`)
- Laboratory overview and policy summary

#### F6 - Contact (`/contact`)
- Contact form and basic contact details

### 4.2 Admin Features (`/admin/*`)

#### A1 - Dashboard (`/admin`)
- Summary stats: analyses, species, categories

#### A2 - Analysis Management (`/admin/analyses`)
- CRUD for analyses
- Fields include bilingual content via translations, category, species mapping, turnaround, price, notes, status

#### A3 - Species Management (`/admin/species`)
- CRUD for species
- Fields include slug, ordering, active flag, icon/image, translations

#### A4 - Category Management (`/admin/analysis-categories`)
- CRUD for categories
- Fields include slug, ordering, translations

---

## 5. Technical Architecture

| Layer | Technology |
|-------|------------|
| Frontend | Nuxt 4 (Vue 3, SSR) |
| UI | Nuxt UI + Tailwind CSS |
| Language | TypeScript |
| Database | Supabase (PostgreSQL, local Docker) |
| Auth | Supabase Auth + role-based admin checks |
| i18n | `@nuxtjs/i18n` |
| Container | Docker Compose |

---

## 6. Database Model (Normalized)

Declarative schema source-of-truth is under `src/database/supabase/schemas`.

### Core Tables
- `species`
- `analysis_categories`
- `analyses`
- `analysis_species`
- `user_roles`

### Translation Tables
- `species_translations` (`species_id`, `language`, localized fields)
- `analysis_category_translations` (`category_id`, `language`, localized fields)
- `analysis_translations` (`analysis_id`, `language`, localized fields)

### Enumerations
- `language_code`: `tr`, `az`
- `app_role`: `admin`, `editor`, `viewer`

### Audit and Timestamps
- All core and translation tables include `created_at` and `updated_at`
- Trigger function keeps `updated_at` synchronized on updates

### RLS and Access
- Public read policies for content tables
- Admin write policies via role checks (`is_admin()`)

---

## 7. Pages and Routes

### Public
- `/`
- `/catalogue`
- `/analyses`
- `/analyses/[slug]`
- `/about`
- `/contact`

### Admin
- `/admin`
- `/admin/login`
- `/admin/analyses`
- `/admin/analyses/new`
- `/admin/analyses/[id]`
- `/admin/species`
- `/admin/analysis-categories`

---

## 8. API Routes

### Public
- `GET /api/species`
- `GET /api/analysis-categories`
- `GET /api/analyses`
- `GET /api/analyses/[slug]`
- `POST /api/contact`

### Admin
- `POST /api/admin/analyses`
- `PUT /api/admin/analyses/[id]`
- `DELETE /api/admin/analyses/[id]`
- `POST /api/admin/species`
- `PUT /api/admin/species/[id]`
- `POST /api/admin/analysis-categories`
- `PUT /api/admin/analysis-categories/[id]`

---

## 9. Seed Data

Seed SQL is modular and stored under `src/database/supabase/seeds`:
- `01_species.sql`
- `02_categories.sql`
- `03_analyses.sql`

Guiding rule: insert base rows by slug, then insert translation rows (`tr`, `az`).

---

## 10. Non-Functional Requirements

- SSR-first performance and SEO
- WCAG 2.1 AA accessibility baseline
- Mobile-first responsive design
- Secure by default (RLS, no client secrets)
- Reproducible local setup via Docker + Supabase CLI

---

## 11. Out of Scope (v1)

- Online sample ordering workflow
- Patient/lab results portal
- Payments/billing
- Third-party clinic integrations
- Mobile app

---

## 12. Implementation Order

1. Maintain declarative schemas and generated migrations in sync
2. Keep seed scripts aligned with normalized translation design
3. Implement and verify public read APIs
4. Implement and verify admin write APIs for base + translations
5. Keep frontend routes/components aligned to active feature scope
6. Run DB reset, type generation, and app verification
