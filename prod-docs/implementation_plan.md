# Implementation Plan: Enterprise CVE Management System

**Version:** 1.0
**Date:** 2024-08-29

## 1. Overview

This document outlines the implementation plan for the Enterprise CVE Management System, based on the requirements detailed in `prod-docs/prd.md`. The development will be divided into two major releases, delivered through a series of weekly sprints. Each sprint will focus on delivering a specific set of functionalities, culminating in potentially shippable increments.

## 2. Development Principles

- **Releases:** Two major releases are planned.
  - **Release 1 (MVP):** Focus on core internal functionality - data management, user roles, basic ingestion, and internal UI.
  - **Release 2 (Public & Advanced):** Focus on public-facing features (portal, API), advanced ingestion/error handling, webhooks, and hardening.
- **Sprints:** Development will occur in weekly sprints. Each sprint will have a defined goal and a set of tasks derived from the PRD. Sprint planning will occur at the beginning of each week, and a review/retrospective at the end.
- **Definition of Done (DoD):** Tasks and sprint goals are considered "Done" only when _all_ the following criteria are met:
  - Code implemented according to PRD specifications for the feature.
  - Code is peer-reviewed and merged to the main development branch.
  - Unit tests are written and passing (target >80% coverage for new code).
  - Integration tests covering interactions are written and passing (where applicable).
  - End-to-end tests covering the user flow are updated/created and passing (where applicable).
  - Functionality is manually tested and verified against requirements.
  - Security considerations for the feature have been addressed.
  - Relevant documentation (code comments, README updates, API documentation, user guide sections) is completed.
- **Tracking:** Each sprint's progress will be tracked using the tracking sheet included within each sprint definition.

## 3. Definition of Done (Standard Criteria)

For any given task or user story within a sprint, it is considered "Done" when:

1.  **Implementation Complete:** Code is written and implements the required functionality as per the PRD.
2.  **Code Review Passed:** Code has been reviewed by at least one other developer and approved.
3.  **Unit Tests Passed:** All relevant unit tests for the code are written and pass successfully in the CI environment. Code coverage meets the project standard (e.g., >80%).
4.  **Integration Tests Passed:** Relevant integration tests involving interaction with other components (database, other APIs) pass successfully.
5.  **E2E Tests Passed:** Relevant end-to-end tests simulating user flows pass successfully.
6.  **Manual Verification:** The feature has been manually tested and confirmed to meet the acceptance criteria derived from the PRD.
7.  **Security Review:** Basic security considerations (input validation, authorization checks) have been implemented and reviewed.
8.  **Documentation Updated:** Necessary code comments, README sections, API documentation (e.g., Swagger/OpenAPI specs), and user-facing documentation snippets are written or updated.
9.  **Merged:** Code is successfully merged into the main development branch (e.g., `develop` or `main`).

---

## 4. Release 1: MVP - Core Internal Functionality

**Goal:** Deliver a functional internal system allowing Security Admins and Users to manage vulnerability data entered manually or via basic scanner/file ingestion.

**Estimated Sprints:** ~8 (This is a rough estimate and depends on team velocity)

---

### **Sprint 1: Project Setup & Foundation**

- **Goal:** Initialize project repositories, Docker setup, basic CI/CD pipeline, and core application shells.
- **Tasks:**
  - Setup Git repositories (Backend, Frontend).
  - Initialize NodeJS/Express backend project structure.
  - Initialize NextJS frontend project structure.
  - Create basic Dockerfiles and Docker Compose configuration for dev environment (NodeJS, NextJS, KuzuDB, Redis).
  - Establish basic KuzuDB connection from backend.
  - Setup basic CI pipeline (linting, build checks).
  - Define basic logging setup.
- **DoD:** Dev environment runnable via Docker Compose; basic app shells exist; CI runs.

- **Tracking Sheet:**
  | Status | Task ID / Name | Description | Notes / Blockers |
  | :----- | :----------------------------- | :------------------------------------------------ | :--------------- |
  | `[ ]` | S1-T1: Git Repos Setup | Setup Git repositories (Backend, Frontend) | |
  | `[ ]` | S1-T2: Backend Init | Initialize NodeJS/Express backend project | |
  | `[ ]` | S1-T3: Frontend Init | Initialize NextJS frontend project | |
  | `[ ]` | S1-T4: Docker Setup | Create basic Dockerfiles & Docker Compose config | |
  | `[ ]` | S1-T5: KuzuDB Connection | Establish basic KuzuDB connection from backend | |
  | `[ ]` | S1-T6: Basic CI Pipeline | Setup basic CI (linting, build checks) | |
  | `[ ]` | S1-T7: Basic Logging | Define basic logging setup | |

### **Sprint 2: User Authentication & Roles**

- **Goal:** Implement user registration (CLI for first admin), login, logout, and role definitions.
- **Tasks:**
  - Implement KuzuDB schema for `User`, `Role` nodes and `HAS_ROLE` relationship.
  - Develop CLI script for creating the initial System Admin user.
  - Implement secure password hashing.
  - Build Backend API endpoints for login/logout (e.g., JWT or session-based).
  - Build Frontend login page and basic auth state management.
  - Seed database with the 3 required roles.
- **DoD:** Users can be created via CLI, login/logout works; roles defined in DB; DoD criteria met.

- **Tracking Sheet:**
  | Status | Task ID / Name | Description | Notes / Blockers |
  | :----- | :----------------------------- | :-------------------------------------------------- | :--------------- |
  | `[ ]` | S2-T1: KuzuDB User/Role Schema | Implement KuzuDB schema for User, Role, HAS_ROLE | |
  | `[ ]` | S2-T2: CLI Admin Script | Develop CLI script for initial System Admin user | |
  | `[ ]` | S2-T3: Password Hashing | Implement secure password hashing | |
  | `[ ]` | S2-T4: Auth API Endpoints | Build Backend API for login/logout | |
  | `[ ]` | S2-T5: Login UI | Build Frontend login page & auth state management | |
  | `[ ]` | S2-T6: Seed Roles | Seed database with the 3 required roles | |

### **Sprint 3: User Management & Vulnerability Core Model**

- **Goal:** Implement User CRUD for System Admins and the core Vulnerability data model.
- **Tasks:**
  - Build Backend API endpoints for User CRUD (accessible only by System Admin).
  - Build Frontend UI for User Management (list, create, edit roles - for SysAdmin).
  - Implement KuzuDB schema for `Vulnerability` node with core properties (excluding relationships for now).
  - Implement basic authorization middleware based on roles.
- **DoD:** System Admins can manage users/roles via UI; Vulnerability node structure exists; Role checks in place; DoD criteria met.

- **Tracking Sheet:**
  | Status | Task ID / Name | Description | Notes / Blockers |
  | :----- | :----------------------------- | :-------------------------------------------------- | :--------------- |
  | `[ ]` | S3-T1: User CRUD API | Build Backend API for User CRUD (SysAdmin only) | |
  | `[ ]` | S3-T2: User Management UI | Build Frontend UI for User Management | |
  | `[ ]` | S3-T3: KuzuDB Vuln Schema | Implement KuzuDB schema for Vulnerability node | |
  | `[ ]` | S3-T4: Authz Middleware | Implement basic role-based authorization | |

### **Sprint 4: Vulnerability Basic CRUD API & UI**

- **Goal:** Implement basic Create, Read, Update, Delete functionality for vulnerabilities (Security Admin).
- **Tasks:**
  - Build Backend API endpoints for Vulnerability CRUD (accessible by Security Admin).
  - Build basic Frontend UI form for creating/editing vulnerabilities.
  - Build basic Frontend UI table to list vulnerabilities (no filtering yet).
  - Build Frontend UI view for vulnerability details.
  - Connect UI elements to backend API endpoints.
- **DoD:** Security Admins can manually create, view, edit, delete vulnerabilities via UI; DoD criteria met.

- **Tracking Sheet:**
  | Status | Task ID / Name | Description | Notes / Blockers |
  | :----- | :----------------------------- | :---------------------------------------------------- | :--------------- |
  | `[ ]` | S4-T1: Vuln CRUD API | Build Backend API for Vulnerability CRUD (SecAdmin) | |
  | `[ ]` | S4-T2: Vuln Form UI | Build basic Frontend UI form for vulns | |
  | `[ ]` | S4-T3: Vuln List UI | Build basic Frontend UI table for vulns | |
  | `[ ]` | S4-T4: Vuln Detail UI | Build Frontend UI view for vuln details | |
  | `[ ]` | S4-T5: Connect Vuln UI/API | Connect UI elements to backend API endpoints | |

### **Sprint 5: Scanner API Ingestion**

- **Goal:** Implement the API endpoint for ingesting data from scanners.
- **Tasks:**
  - Implement KuzuDB schema for `ApiKey` node and `OWNS_API_KEY`, `INGESTED_VULNERABILITY` relationships.
  - Build Backend API endpoint (`/api/v1/scanner/ingest`) accepting POST requests.
  - Implement API Key generation, secure storage (hashing), and validation logic.
  - Implement JSON payload validation based on PRD specs.
  - Implement logic to create `Vulnerability` node and relationships on ingestion.
  - Build basic Security Admin UI for managing API Keys (list, generate, revoke).
- **DoD:** Scanners can push data via API; Keys managed via UI; Vulnerabilities created in DB; DoD criteria met.

- **Tracking Sheet:**
  | Status | Task ID / Name | Description | Notes / Blockers |
  | :----- | :----------------------------- | :-------------------------------------------------------- | :--------------- |
  | `[ ]` | S5-T1: KuzuDB APIKey Schema | Implement KuzuDB schema for ApiKey node & relationships | |
  | `[ ]` | S5-T2: Scanner Ingest API | Build Backend API endpoint /api/v1/scanner/ingest | |
  | `[ ]` | S5-T3: API Key Mgmt Logic | Implement API Key generation, storage, validation | |
  | `[ ]` | S5-T4: Payload Validation | Implement JSON payload validation | |
  | `[ ]` | S5-T5: Ingestion Logic | Implement logic to create Vulnerability on ingestion | |
  | `[ ]` | S5-T6: API Key Mgmt UI | Build basic Security Admin UI for managing API Keys | |

### **Sprint 6: Basic File Upload (CSV)**

- **Goal:** Implement basic file upload functionality for CSV files.
- **Tasks:**
  - Build basic Frontend UI component for uploading a file.
  - Build Backend API endpoint to receive the file.
  - Implement CSV parser expecting the predefined format.
  - Implement basic logic for creating/overwriting vulnerability records based on CSV content (synchronous for now).
  - Provide basic success/error feedback to the user on the UI.
- **DoD:** Security Admins can upload a CSV; Vulnerabilities created/updated; Basic feedback provided; DoD criteria met.

- **Tracking Sheet:**
  | Status | Task ID / Name | Description | Notes / Blockers |
  | :----- | :----------------------------- | :------------------------------------------------------- | :--------------- |
  | `[ ]` | S6-T1: File Upload UI | Build basic Frontend UI component for upload | |
  | `[ ]` | S6-T2: File Upload API | Build Backend API endpoint to receive file | |
  | `[ ]` | S6-T3: CSV Parser | Implement CSV parser for predefined format | |
  | `[ ]` | S6-T4: File Import Logic | Implement basic logic for vuln create/overwrite (sync) | |
  | `[ ]` | S6-T5: Upload Feedback UI | Provide basic success/error feedback to user | |

### **Sprint 7: Basic Search & Filtering**

- **Goal:** Implement basic server-side filtering and UI controls for the vulnerability list.
- **Tasks:**
  - Update Backend API endpoint for listing vulnerabilities to accept basic filter parameters (e.g., status, severity_rating).
  - Implement corresponding KuzuDB query logic for filtering.
  - Add basic filter controls to the Frontend UI table (e.g., dropdowns for status/severity).
- **DoD:** Users can filter the vulnerability list by status and severity; DoD criteria met.

- **Tracking Sheet:**
  | Status | Task ID / Name | Description | Notes / Blockers |
  | :----- | :----------------------------- | :------------------------------------------------------- | :--------------- |
  | `[ ]` | S7-T1: Update List API | Update list API to accept filter params (status, sev) | |
  | `[ ]` | S7-T2: KuzuDB Filter Query | Implement KuzuDB query logic for filtering | |
  | `[ ]` | S7-T3: Add Filter Controls UI | Add basic filter controls to Frontend UI table | |

### **Sprint 8: Basic Audit Logging & Release Prep**

- **Goal:** Implement audit logging for critical actions and prepare for Release 1 testing.
- **Tasks:**
  - Implement KuzuDB schema for `AuditLog` node and relevant relationships (`PERFORMED_ACTION`, `LOGS_EVENT_FOR`).
  - Implement backend logic to create audit log entries for core CRUD actions (Vulnerability Create/Update/Delete, User Login, User Create/Update/Delete).
  - Refine existing tests based on implemented features.
  - Perform thorough integration testing for Release 1 features.
  - Update project READMEs and initial documentation.
- **DoD:** Critical actions are logged; Release 1 features are stable and tested; Basic docs updated; DoD criteria met.

- **Tracking Sheet:**
  | Status | Task ID / Name | Description | Notes / Blockers |
  | :----- | :----------------------------- | :------------------------------------------------------- | :--------------- |
  | `[ ]` | S8-T1: KuzuDB AuditLog Schema | Implement KuzuDB schema for AuditLog node & relations | |
  | `[ ]` | S8-T2: Audit Logging Logic | Implement backend logic for logging critical actions | |
  | `[ ]` | S8-T3: Refine Tests | Refine existing unit/integration tests | |
  | `[ ]` | S8-T4: R1 Integration Test | Perform thorough integration testing for R1 features | |
  | `[ ]` | S8-T5: Update Docs | Update project READMEs and initial documentation | |

---

## 5. Release 2: Public Features & Enhancements

**Goal:** Deliver public-facing portal and API, implement webhooks, enhance file upload, improve filtering, and harden the system.

**Estimated Sprints:** ~8 (This is a rough estimate and depends on team velocity)

---

### **Sprint 9: Public API Foundation**

- **Goal:** Implement the read-only Public API endpoint and data filtering logic for published vulnerabilities.
- **Tasks:**
  - Setup separate deployment configuration (Docker service) for the Public API.
  - Implement KuzuDB schema for `PublishableStatus` node.
  - Build Backend logic/endpoint for Security Admins to configure publishable statuses.
  - Build the read-only Public API endpoint (`/public/api/v1/vulnerabilities`).
  - Implement logic to query KuzuDB for vulnerabilities matching publication criteria (`make_public` flag AND `status` in `PublishableStatus` list).
  - Filter query results to include only public-safe fields.
  - Implement basic pagination for the Public API.
- **DoD:** Public API endpoint exists; Queries published data correctly; Pagination works; Publishable statuses configurable; DoD criteria met.

- **Tracking Sheet:**
  | Status | Task ID / Name | Description | Notes / Blockers |
  | :----- | :----------------------------- | :-------------------------------------------------------- | :--------------- |
  | `[ ]` | S9-T1: Public API Deploy Setup | Setup separate Docker service for Public API | |
  | `[ ]` | S9-T2: KuzuDB PubStatus Schema | Implement KuzuDB schema for PublishableStatus node | |
  | `[ ]` | S9-T3: Config PubStatus Logic | Build Backend logic/endpoint for config pub statuses | |
  | `[ ]` | S9-T4: Public API Endpoint | Build read-only Public API endpoint | |
  | `[ ]` | S9-T5: Public Query Logic | Implement KuzuDB query logic for published vulns | |
  | `[ ]` | S9-T6: Filter Public Fields | Filter query results to include only public-safe fields | |
  | `[ ]` | S9-T7: Public API Pagination | Implement basic pagination for Public API | |

### **Sprint 10: Public Portal**

- **Goal:** Implement the public-facing web portal.
- **Tasks:**
  - Setup separate deployment configuration (Docker service) for the Public Portal (may leverage NextJS static export or SSR).
  - Build basic UI for the Public Portal (search bar, results list).
  - Connect Public Portal UI to the Public API or directly query the database (read-only) for published data.
  - Display search results with public-safe fields.
- **DoD:** Public portal is accessible; Users can search/view published vulns; DoD criteria met.

- **Tracking Sheet:**
  | Status | Task ID / Name | Description | Notes / Blockers |
  | :----- | :----------------------------- | :-------------------------------------------------------- | :--------------- |
  | `[ ]` | S10-T1: Public Portal Deploy | Setup separate Docker service for Public Portal | |
  | `[ ]` | S10-T2: Public Portal UI | Build basic UI for Public Portal (search, results) | |
  | `[ ]` | S10-T3: Connect Portal/API | Connect Public Portal UI to Public API/DB | |
  | `[ ]` | S10-T4: Display Public Data | Display search results with public-safe fields | |

### **Sprint 11: Publication Controls & Webhook Config**

- **Goal:** Implement the UI controls for publication and the configuration UI/API for webhooks.
- **Tasks:**
  - Add "Make Public" checkbox/toggle to the Vulnerability edit form (Security Admin UI).
  - Ensure backend updates the `make_public` property correctly.
  - Implement KuzuDB schema for `WebhookConfig`, `WebhookTrigger` nodes and relationships.
  - Build Backend API endpoints for Webhook configuration CRUD (System Admin).
  - Build Frontend UI for System Admins to manage webhook URLs and select event triggers.
- **DoD:** Security Admins can mark vulns public; System Admins can configure webhooks; DoD criteria met.

- **Tracking Sheet:**
  | Status | Task ID / Name | Description | Notes / Blockers |
  | :----- | :----------------------------- | :-------------------------------------------------------- | :--------------- |
  | `[ ]` | S11-T1: Make Public UI/Logic | Add "Make Public" UI control & backend logic | |
  | `[ ]` | S11-T2: KuzuDB Webhook Schema | Implement KuzuDB schema for Webhook nodes & relations | |
  | `[ ]` | S11-T3: Webhook Config API | Build Backend API endpoints for Webhook config CRUD | |
  | `[ ]` | S11-T4: Webhook Config UI | Build Frontend UI for SysAdmins to manage webhooks | |

### **Sprint 12: Webhook Event Triggering & Sending**

- **Goal:** Implement the logic to trigger and send webhook notifications.
- **Tasks:**
  - Integrate webhook trigger checks into relevant backend actions (e.g., vulnerability creation, status update).
  - Implement logic to fetch corresponding webhook configurations based on triggered event type.
  - Implement asynchronous task (using task queue) to send webhook POST requests to configured URLs.
  - Define and implement the JSON payload structure for webhooks.
  - Implement basic retry logic for failed webhook deliveries.
- **DoD:** Configured webhooks are sent for triggered events; Sending is async; DoD criteria met.

- **Tracking Sheet:**
  | Status | Task ID / Name | Description | Notes / Blockers |
  | :----- | :----------------------------- | :---------------------------------------------------------- | :--------------- |
  | `[ ]` | S12-T1: Integrate Trigger Checks | Integrate webhook trigger checks into backend actions | |
  | `[ ]` | S12-T2: Fetch Webhook Configs | Implement logic to fetch webhook configs by event type | |
  | `[ ]` | S12-T3: Async Webhook Send Task| Implement async task (queue) to send webhook POST requests | |
  | `[ ]` | S12-T4: Define Webhook Payload | Define and implement JSON payload for webhooks | |
  | `[ ]` | S12-T5: Webhook Retry Logic | Implement basic retry logic for failed deliveries | |

### **Sprint 13: Advanced Filtering & Search**

- **Goal:** Enhance filtering capabilities in the internal UI.
- **Tasks:**
  - Expand Backend API filtering options (Date Ranges, CVE ID, CWE, CPE, Asset Name).
  - Implement corresponding efficient KuzuDB queries (leveraging indexes).
  - Update Frontend UI with additional filter controls.
  - Optimize search performance for large datasets.
- **DoD:** Users can filter by all specified criteria; Performance is acceptable; DoD criteria met.

- **Tracking Sheet:**
  | Status | Task ID / Name | Description | Notes / Blockers |
  | :----- | :----------------------------- | :--------------------------------------------------------- | :--------------- |
  | `[ ]` | S13-T1: Expand Filter API | Expand Backend API filtering options (Date, ID, etc.) | |
  | `[ ]` | S13-T2: Advanced KuzuDB Query | Implement efficient KuzuDB queries for advanced filters | |
  | `[ ]` | S13-T3: Add Advanced Filter UI | Update Frontend UI with additional filter controls | |
  | `[ ]` | S13-T4: Optimize Search Perf | Optimize search performance for large datasets | |

### **Sprint 14: File Upload Enhancements**

- **Goal:** Improve file upload robustness and add support for other formats.
- **Tasks:**
  - Implement asynchronous processing for file uploads using the task queue.
  - Implement parsers for JSON format (and XML if deemed necessary).
  - Improve error reporting (row-level errors, summary report).
  - Provide clear documentation on required file formats/headers.
- **DoD:** File uploads are async; JSON/XML supported; Better error reporting; Formats documented; DoD criteria met.

- **Tracking Sheet:**
  | Status | Task ID / Name | Description | Notes / Blockers |
  | :----- | :----------------------------- | :----------------------------------------------------------- | :--------------- |
  | `[ ]` | S14-T1: Async File Upload | Implement async processing for file uploads via task queue | |
  | `[ ]` | S14-T2: Add JSON/XML Parsers | Implement parsers for JSON (and optional XML) format | |
  | `[ ]` | S14-T3: Improve Error Reporting| Improve file upload error reporting (row-level, summary) | |
  | `[ ]` | S14-T4: Doc File Formats | Provide clear documentation on required file formats | |

### **Sprint 15: Security Hardening & Audit Log Expansion**

- **Goal:** Implement rate limiting, address security findings, and expand audit logging.
- **Tasks:**
  - Implement rate limiting on Public API and Scanner API endpoints.
  - Review and address findings from security testing (dependency scans, static analysis).
  - Expand audit logging to cover all required actions in PRD Section 10.
  - Implement basic UI for viewing Audit Logs (potentially restricted to Admins).
- **DoD:** Rate limiting active; Known security issues addressed; Audit log comprehensive; Basic log viewer available; DoD criteria met.

- **Tracking Sheet:**
  | Status | Task ID / Name | Description | Notes / Blockers |
  | :----- | :----------------------------- | :----------------------------------------------------------- | :--------------- |
  | `[ ]` | S15-T1: Implement Rate Limit | Implement rate limiting on Public & Scanner APIs | |
  | `[ ]` | S15-T2: Address Security | Review and address findings from security testing | |
  | `[ ]` | S15-T3: Expand Audit Logging | Expand audit logging to cover all required actions | |
  | `[ ]` | S15-T4: Audit Log Viewer UI | Implement basic UI for viewing Audit Logs (Admins) | |

### **Sprint 16: Final Testing, Docs & Release Prep**

- **Goal:** Complete final testing, documentation polish, and prepare for Release 2.
- **Tasks:**
  - Conduct thorough E2E testing across all features.
  - Perform usability testing and incorporate minor feedback.
  - Complete API documentation (e.g., finalize OpenAPI/Swagger spec).
  - Write comprehensive user guides for different roles.
  - Finalize deployment scripts and documentation.
- **DoD:** All testing complete; Documentation finalized; Release is stable; DoD criteria met.

- **Tracking Sheet:**
  | Status | Task ID / Name | Description | Notes / Blockers |
  | :----- | :----------------------------- | :----------------------------------------------------------- | :--------------- |
  | `[ ]` | S16-T1: Final E2E Testing | Conduct thorough E2E testing across all features | |
  | `[ ]` | S16-T2: Usability Testing | Perform usability testing & incorporate feedback | |
  | `[ ]` | S16-T3: Final API Docs | Complete API documentation (OpenAPI/Swagger spec) | |
  | `[ ]` | S16-T4: User Guides | Write comprehensive user guides for different roles | |
  | `[ ]` | S16-T5: Final Deployment Docs | Finalize deployment scripts and documentation | |

---

## 6. Weekly Tracking Sheet Template

**(Template for reference - use the pre-populated sheets within each sprint above)**

**Sprint:** [Sprint Number]
**Dates:** [Start Date] - [End Date]
**Goal:** [Sprint Goal Description]

| Status | Task ID / Name           | Description (Link to PRD section if applicable) | Notes / Blockers |
| :----- | :----------------------- | :---------------------------------------------- | :--------------- |
| `[ ]`  | TASK-XXX: Example Task   | Example description                             |                  |
| `[x]`  | TASK-YYY: Completed Task | Example description                             |                  |
| ...    | ...                      | ...                                             |                  |

**Status Key:** `[ ]` - To Do / In Progress, `[x]` - Done

---
