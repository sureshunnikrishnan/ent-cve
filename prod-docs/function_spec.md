# Functional Specification: Enterprise CVE Management System

## 1. Goal

An open-source system for enterprises to create, maintain, use, and publish vulnerability information, covering both internally discovered vulnerabilities and those in third-party software utilized by the enterprise.

## 2. Core Functionality

The system will provide Create, Read, Update, and Delete (CRUD) operations for vulnerability records.

## 3. Data Sources / Input Methods

Vulnerability information can enter the system via:

- **Manual Entry:** Security Admins can directly input vulnerability details through the user interface.
- **Security Scanner API:** An API endpoint allowing authenticated scanners to push vulnerability data in a predefined JSON format. Authentication uses API Keys managed by Security Admins.
- **Security Scanner File Upload:** Security Admins can upload vulnerability data exported from scanners in standard formats (CSV, JSON, XML).

**Note:** Direct, automated import from public feeds like NVD or MITRE is **not** included in this specification.

## 4. Vulnerability Data Fields

Each vulnerability record will store the following information:

- **CVE ID:** The official CVE identifier (e.g., CVE-2023-12345), if available. (Text)
- **Description:** A textual description of the vulnerability. (Text Area)
- **Severity:** Indication of severity, potentially including CVSS score (v2, v3, v4) and/or qualitative ratings (e.g., Critical, High, Medium, Low). (Structured Field/Text)
- **References:** URLs or other identifiers linking to advisories, patches, or external resources. (List of Text/URLs)
- **Internal Asset Name/Identifier:** The name or identifier of the affected internal product, system, or component. (Text)
- **Status:** The current state of the vulnerability within the enterprise workflow (see Section 5). (Dropdown/Select)
- **Discovery/Report Date:** The date the vulnerability was discovered or entered into the system. (Date)
- **Source:** Indication of how the vulnerability was identified (e.g., Manual Entry, Scanner Name, Uploaded File Name). (Text)
- **CWE IDs:** Associated Common Weakness Enumeration IDs (e.g., CWE-89). (Text Field, allows multiple comma-separated or similar)
- **CPE Names:** Associated Common Platform Enumeration names for affected products/versions. (Text Field, allows multiple comma-separated or similar)
- **Make Public Flag:** A boolean flag indicating if the record is eligible for public disclosure (controlled by Security Admin). (Checkbox/Boolean)

## 5. Vulnerability Statuses

The system will use the following predefined, fixed list of statuses:

1.  **Received:** Newly entered, awaiting review.
2.  **Analyzing:** Under investigation for applicability, impact, severity.
3.  **Action Required:** Confirmed valid vulnerability requiring remediation/mitigation.
4.  **Remediation In Progress:** Actively being patched or mitigated.
5.  **Resolved:** Remediation/mitigation completed and verified.
6.  **Risk Accepted:** Conscious decision made to accept the risk (justification potentially stored in notes/details).
7.  **Deferred:** Remediation postponed.
8.  **Disputed/False Positive:** Believed to be not applicable or incorrectly reported.
9.  **Rejected:** The underlying CVE ID was officially rejected by the issuing authority.

## 6. User Roles and Permissions

Three distinct roles will be implemented:

- **System Admin:**
  - Manages system configuration (e.g., webhook settings).
  - Manages user accounts and role assignments.
  - **Cannot** create, modify, or delete vulnerability records.
- **Security Admin:**
  - Manages vulnerability records (CRUD operations).
  - Manages API keys for scanner integration.
  - Configures the list of statuses eligible for publication.
  - Sets the "Make Public" flag on individual vulnerabilities.
  - **Cannot** manage system configuration or user accounts (other than potentially inviting new users if designed that way).
- **User:**
  - Read-only access to search and view vulnerability records.
  - **Cannot** modify data, manage users, or change system settings.

## 7. User Interface (UI)

The primary user interface will consist of:

- **Dashboard:** A high-level overview showing key statistics (e.g., vulnerability counts by status, severity trends).
- **Vulnerability List View:** A detailed table displaying vulnerability records, supporting sorting, searching, and filtering.

## 8. Searching and Filtering

Users (all roles) must be able to search and filter the vulnerability list view based on:

- Status
- Internal Asset Name/Identifier (partial or exact match)
- Severity (range or specific level)
- Date Ranges (e.g., discovered between X and Y)
- CVE ID, CWE ID, CPE Name
- Source
- Filters should be combinable (e.g., show all 'Critical' vulnerabilities in 'Action Required' status for 'Product X').

## 9. Publication / External Sharing

The system will provide mechanisms for sharing selected vulnerability information publicly:

- **Public Web Portal:** A searchable, read-only web interface accessible externally, displaying published vulnerabilities.
- **Public API:** A read-only API endpoint allowing external systems to query published vulnerability data programmatically.

**Publication Control:** A vulnerability record will only appear on the public portal or be available via the public API if **both** of the following conditions are met: 1. The "Make Public" flag is set to true by a Security Admin for that specific record. 2. The vulnerability's current Status is included in the list of statuses configured as "publishable" by a Security Admin (system-wide setting).

## 10. Audit Logging

A comprehensive audit log will record significant events within the system. Each log entry should include:

- Timestamp
- Performing User (or API Key identifier)
- Action Type (e.g., 'Vulnerability Created', 'Status Updated', 'User Login', 'API Key Revoked')
- Affected Object Identifier (e.g., CVE ID, Username)
- Details (e.g., field changed, old value, new value - where applicable and non-sensitive)

Logged events must include:

- Vulnerability Record Changes (Create, Update, Delete)
- User Activity (Login, Logout, Password Changes - log the event, not the password itself)
- Administrative Actions (User Management, Role Changes, API Key Management, Publishable Status Config Changes, Webhook Config Changes)

## 11. Extensibility: Webhooks

The system must support webhooks to notify external systems about events.

- **Configuration:** System Admins can configure webhook endpoints (target URLs).
- **Triggers:** System Admins can select which specific events trigger a webhook notification to be sent to the configured URLs. Examples of triggerable events include:
  - New Vulnerability Created
  - Vulnerability Status Changed (potentially configurable per status)
  - New Vulnerability of a specific severity (e.g., 'Critical') created
  - Vulnerability marked as 'Public'
  - Vulnerability updated via API
- **Payload:** The webhook payload should contain sufficient context about the event and the related vulnerability record (in JSON format).
