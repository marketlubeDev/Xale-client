# Xale CRM — Claude Guide

## Project Overview
Xale is a multi-tenant SaaS CRM platform operated by **Marketlube** (marketlube.in). Three repos in workspace:
- **Xale-Server** (`../Xale-Server`) — Node/Express 5/Prisma/PostgreSQL/Redis/BullMQ
- **Xale-CRM** (this repo) — React 19 + Vite + TypeScript (main CRM app)
- **Xale-Landing** (`../Xale-Landing`) — React 19 + Vite (auth pages, legal pages, onboarding)

---

## Server Architecture

### Folder Structure (`Xale-Server/src/`)
```
auth/           — JWT, Passport, Google OAuth, OTP
config/         — Database config, environment
constants/      — Permission constants, platform constants
core/           — Business logic (leads, child, pipeline, preferences, dashboard, sources, whatsapp, calllogs)
database/       — tenantDb, prisma extension, schema helpers
events/         — Event emitters
generated/      — Prisma generated types/enums
integrations/   — Adapters (Meta, WhatsApp, TeleCMI, Custom)
jobs/           — BullMQ workers (source sync, etc.)
middlewares/    — Express middleware (auth, error handler, catchAsync)
orchester/      — Orchestration/workflow engine
platform/       — Tenancy, tabs, module-connector, plans, subscriptions
rbac/           — Policies, permission engine, role management
repository/     — Base tenant repository, query builders
scope/          — LeadScope, ChildScope, TabScope, UserScope
scripts/        — Seeders, migrations
utils/          — AppError, FilterBuilder, date helpers (IST)
```

### Tenant-Scoped Prisma (CRITICAL)
- `tenantDb` is a Proxy wrapping Prisma that auto-injects `tenantId` into ALL queries
- `tenantTransaction(fn)` wraps `prisma.$transaction` with tenant scoping
- The extension (`prisma.extension.ts`) intercepts: create, find, delete, update, count, aggregate
- Auto-injects `createdById`/`updatedById` when userId exists in context
- **GOTCHA**: `deleteMany` with relation filters (e.g. `{ chat: { whatsappAccountId: ... } }`) BREAKS inside tenant-scoped transactions — the extension wraps where with `AND: [originalWhere, { tenantId }]`, mangling relation filters
- **FIX**: Use raw `prisma.$transaction()` (from `config/database`) for cascading deletes with relation filters. Verify tenant ownership beforehand.
- Shared models that skip tenant scoping: `ModuleConnecter`, `Industry`, `Plan`, `Tab`, `BillingCycle`, `Config`

### Prisma Json? Nullable Fields
- To set a `Json?` field to NULL: use `Prisma.DbNull` (import from generated client)
- NEVER use `null` or `{ set: null }` — those get stored as literal JSON objects

### Route Ordering (Express)
- Specific routes MUST come before parameterized routes: `/:id/disconnect` BEFORE `/:id`
- Otherwise Express matches `/:id` first and treats "75/disconnect" as the id param

### WhatsApp Cascade Dependencies
Delete order when disconnecting a WhatsApp source:
1. `WhatsappMessages` (via chat relation)
2. `WhatsappChat` (FK to WhatsappAccount is NOT cascade)
3. `BroadcastRecipient` (via broadcast relation)
4. `Broadcast` (FK to WhatsappAccount is NOT cascade)
5. `WhatsappTemplate` (FK to WhatsappAccount IS cascade)
6. `WhatsappAccount`

### LeadScope & ChildScope
- `LeadScope.getReadFilter()` / `ChildScope.getReadFilter()` return Prisma where clauses
- Tenant Admin → all; Branch Admin/Manager → branch + personal; Regular → created/assigned only
- Always apply BOTH when querying data spanning leads and children (e.g., follow-ups, dashboard widgets)
- Date filters: Overdue = `lt: todayStart` (strictly before today), Today = `gte: todayStart, lte: todayEnd`, Later = `gt: todayEnd`

### Integration Adapter Pattern
- `getIntegrationAdapter(type)` returns adapter implementing `ISourceIntegration`
- Adapters: Custom, TeleCMI, WhatsApp, Meta
- Lifecycle: `validateConfig()` → `onSourceCreate()` → `onSourceUpdate()`
- WhatsApp stores accounts in `WhatsappAccount` table; Meta stores pages in `LeadSource.config` JSON
- Source disconnect clears `config`, `webhook_url`, `integrationId` but keeps the LeadSource record

### FilterBuilder Pattern
- Chainable: `.filter(fields)` → `.search(fields)` → `.dateRange()` → `.sort()` → `.where`
- IST-aware date boundaries via `startOfDayIST()` / `endOfDayIST()`
- Default sort: `{ createdAt: 'desc' }`
- Supports comma-separated IDs, case-insensitive OR search

---

## ModuleConnecter System

### Purpose
Bridges core models (leads, child) to niche/industry-specific models (university, course, videoService, etc.)

### Key Models
- `ModuleConnecter` — Template defining connection type between core ↔ niche model
  - `type`: ONE_TO_ONE, ONE_TO_MANY, MANY_TO_MANY
  - `coreModelName`: ModelNames enum (leads, child, etc.)
  - `nicheModelName`: NicheModelNames enum
  - Unique: `[coreModelName, nicheModelName, industryId]`
- `ModuleConnecterItemScope` — Instance-level mappings (e.g., "Child #5 is linked to Course #12")
  - `coreModelItemId`, `nicheModelItemId`, `moduleConnectorId`

### Industry → Niche Module Mapping
- Industry 1 (Education): university, course, qualificationScore, qualification, specialization
- Industry 4 (Video Production): videoService, videoServiceVarients, videoModels, videoAmbient
- Industry 5 (Academy): academyProgram, academyProgramVariant
- Industry 6 (Travel): travelService, travelServiceVariant

### How It Works
- `extractChildIdsFromQuery()` scans query params for niche IDs (e.g., `courseId=5`)
- Resolves through ModuleConnector bridge to find matching core model IDs
- Used in lead filtering, preferences, and imports

---

## Custom Fields System

### Key Models
- `CustomInput` — Field definition
  - `type`: TEXT_FIELD, REMARK, SELECTOR, NUMBERS
  - `spesificTypes`: Normal, Location, Intake, Country, Tags
  - `modules`: String array of which niche models use this field
  - `isMandatory`, `isQuickAddFilters`, `isNeedPermission`
  - `valueTypes`: normal, tags, img
- `CustomInputItem` — Options for SELECTOR fields (or a dummy item for TEXT/REMARK)
  - Unique: `[customInputId, value]`
- `CustomInputItemScope` — WHERE values are stored per context
  - `contextModel`: "university", "course", "leads", "child", etc.
  - `contextId`: The entity ID
  - `itemId`: Which option/item is assigned
  - `textValue`: For text-type fields
- `UserCustomFieldAccess` — Per-user access to sensitive custom field options

### Scope Pattern (Key Design)
Custom field values are NOT stored on the entity itself. They're stored in `CustomInputItemScope` with a context reference. This allows the same field to have different values across universities, courses, leads, etc.

### Custom Field Filtering in Leads
- Query params like `cf_5=12` (customInputId=5, optionId=12)
- `resolveCustomFieldFilters()` looks up `CustomInputItemScope` to find matching lead/child IDs
- Returns Prisma where conditions to filter leads

---

## RBAC System

### System Roles (User.systemRole)
- `SYSTEM_ADMIN` — Platform-wide superadmin
- `PLATFORM_STAFF` — Platform support staff
- `TENANT_ADMIN` — Tenant-level admin (bypasses all permission checks)
- `TENANT_USER` — Regular tenant user (permissions checked)

### Permission Types (per-role)
- `TENANT_OWNER` — Full control (billing, delete tenant, invite admins)
- `TENANT_ADMIN` — System-wide tenant control
- `TENANT_MANAGER` — Manages teams, workflow settings
- `TENANT_STAFF` — Regular staff user
- `TENANT_VIEWER` — Read-only

### Preset Roles (client-side templates)
6 presets: Admin, Manager, Editor, Counsellor, Viewer, Guest
Each defines:
- `stageBlueprint`: Per-stage permissions (create, manage, move, rollback, delete, assign, bulk_edit, reassign, view_activity)
- `sourceBlueprint`: Per-source permissions (view, create, assign)
- `globalOverrides`: Module-level CRUD with values: "allow", "deny", "view", "own"

### Permission Storage
`Permission.access_config` (JSON):
```
{
  global: { lead: { view, create, edit, delete }, child: { ... }, ... },
  stages: [{ stageId, permissions: { ... } }],
  sources: [{ sourceId, permissions: { ... } }],
  routeKeys: ["leads", "whatsapp", "settings", ...],
  presetRole: "admin" | "manager" | ...
}
```

### Permission Engine
- `PermissionEngine.ensure("lead.view")` — throws 403 if denied
- `PermissionEngine.can("lead.edit")` — returns boolean
- Policy classes: `LeadPolicy`, `ChildPolicy`, etc. with static `canView()`, `canCreate()`, `canEdit()`, `canDelete()`, `canExport()`
- Admins (`isTenantAdmin`) bypass ALL permission checks

### Branch-Level Access
- `UserBranch` links users to specific branches
- Branch Admin/Manager see only leads in their branches + personally assigned
- `LeadScope` and `ChildScope` enforce this automatically
- `TabScope.getAllowedRouteKeys()` filters sidebar/navigation

---

## CRM Client Architecture

### Folder Structure (`Xale-CRM/src/`)
```
app/            — App-level setup
components/     — Reusable UI (ui/, common/, card/, feedback/, layout/)
config/         — Endpoints, environment
constants/      — App constants
contexts/       — React contexts (PageHeader, etc.)
data/           — Static/mock data
features/       — Feature modules:
  ├── leads/        — Lead management (components, stores, api, types)
  ├── Dashboard/    — Dashboard widgets (followUp, analytics, detail views)
  ├── customField/  — Custom field configuration
  ├── users/        — User, role, branch management
  ├── sourceAndCampaign/ — Source & campaign management
  ├── stage/        — Pipeline stage configuration
  ├── settings/     — App settings
  ├── chat/         — Internal chat
  ├── whatsapp/     — WhatsApp messaging
  ├── automation/   — Workflow automation
  ├── report/       — Reports
  ├── auth/         — Authentication
  ├── api/          — Shared API hooks
  └── dynamic/      — Dynamic fields/filters
hooks/          — Custom React hooks
layout/         — App layout (sidebar, header)
lib/            — Libraries (axios, utils, query client)
module/         — Niche modules (videoProduction, academy, travel)
page/           — Top-level page components
routes/         — Route definitions, dynamic route builder
sockets/        — WebSocket client
stores/         — Redux slices
styles/         — CSS
types/          — TypeScript types
utils/          — Utility functions
```

### Path Aliases
- `@/*` → `./src/*`

### Forms Pattern
- React Hook Form + Zod validation wrapped in Context Providers
- Context exports: `register`, `control`, `errors`, `handleSubmit`, `watch`, `setValue`, `reset`
- Examples: `FormSourceProvider`, `FormLeadContext`, `FormCustomContext`

### UI Component Variants
**Button**: primary, cancel, default, destructive, outline, secondary, facebook, whatsapp, call, ghost, link, drawer, dashed, filter, stage, stage-inactive, dot
**Badge**: green, disconnected, rejected, verified, gray, indigo, info, warning, count, newLead, followup, waiting, interested, closed, track, choices, specific, qualify, trackPending, trackActive, trackRejected, fileIcon

### State Management
- Redux Toolkit for UI state (sidebar, filters, modals, slices per feature)
- React Query for server state (staleTime=3min, retry=0, refetchOnWindowFocus=false)
- Common query keys: `["lead-sources"]`, `["leads"]`, `["followups"]`, `["custom-inputs"]`

### CSS Design System
- Custom properties: `--color-black-10` (#051912) through `--color-black-4`
- Text: `--color-text-primary`, `--color-text-secondary`, `--color-text-gray`
- Brand greens: `--color-success` (#156548), `--color-bg-green` (#6fb99c)
- Status: `--color-error` (#da2a46), `--color-warning` (#ff8447), `--color-info` (#335cff)
- Font: Helvetica Neue via `--font-helvetica-neue`
- Text classes: `text-b1` through `text-b5`, `text-h1` through `text-h5` with `-med` variants

---

## Landing Page Patterns

### Tailwind v4 + Portals
- Tailwind v4 scopes styles within `#root`
- Portals rendering outside `#root` lose all Tailwind classes
- **FIX**: Use inline styles for portal components

### Legal Pages
- Routes: `/privacy-policy`, `/terms-of-service`, `/data-deletion`
- All use inline styles via `LegalPageLayout` component
- Meta app review requires these as publicly accessible URLs

### Shared Footer
- `XaleFooter` component used across all landing pages
- Shows: Xale logo + copyright + "Powered by Marketlube" + legal page links

---

## Common Mistakes to Avoid
1. Don't use `tenantTransaction` for cascading deletes with relation filters — use raw `prisma.$transaction`
2. Don't use `null` for Prisma `Json?` fields — use `Prisma.DbNull`
3. Don't put parameterized routes before specific routes in Express
4. Don't use Tailwind classes in portal components in the Landing app
5. Don't forget to apply both LeadScope AND ChildScope for follow-ups/dashboard queries
6. Always check available Button/Badge variants before creating new ones
7. Overdue = `lt: todayStart`, NOT `lte: todayEnd`
8. Custom field values live in `CustomInputItemScope`, not on the entity itself
9. `ModuleConnecter` is a shared model (no tenantId) — don't use tenantDb for it
10. Admin users (isTenantAdmin) bypass ALL permission checks — don't double-gate them
