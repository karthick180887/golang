# RAPS Framework Analysis

This document defines the **RAPS** (Rules, Armoury, Parallel Agents, Serverless Running) framework for the Ride Sharing project. This framework is designed to bring structure, scalability, and "agentic" capabilities to the existing monorepo.

## 1. Rules (Governance & Standards)
*Defining the laws of the codebase to ensure consistency and quality.*

### Coding Standards
*   **Backend (Go)**:
    *   **Linting**: strict usage of `golangci-lint` (errcheck, staticcheck, govet).
    *   **Formatting**: Standard `gofmt` or `goimports` on save.
    *   **Error Handling**: Wrap errors with context; no silent failures.
    *   **Structure**: Follow Standard Go Project Layout (`cmd/`, `internal/`, `pkg/`).
*   **Frontend (Next.js/React)**:
    *   **Linting**: `eslint-config-next` with strict TypeScript checks.
    *   **Styling**: Tailwind CSS for utility-first styling.
    *   **State**: Server Actions for data mutations; minimize client-side global state.
*   **Mobile (Flutter)**:
    *   **Linting**: `flutter_lints` or `pedantic`.
    *   **State Management**: Bloc/Cubit or Riverpod (Standardize on one).
    *   **Architecture**: Clean Architecture (Domain, Data, Presentation layers).

### Repository & Workflow
*   **Monorepo Strategy**: All services in `microservices-go-starter-main/services`. Shared code in `shared/`.
*   **Git Flow**: Conventional Commits (e.g., `feat:`, `fix:`, `chore:`) to automate versioning/changelogs.
*   **API Contracts**: Protocol Buffers (`.proto`) are the single source of truth for inter-service communication.

---

## 2. Armoury (Tools, Stack & Shared Libs)
*The inventory of weapons (tools) available to build and deploy.*

### Core Stack
*   **Languages**: Golang 1.22+, Dart 3.x, TypeScript 5.x.
*   **Frameworks**:
    *   **Web**: Next.js 16 (App Router), React 19.
    *   **Mobile**: Flutter.
    *   **Backend**: Standard Lib + gRPC.

### Infrastructure & Data
*   **Orchestration**: Kubernetes (K8s).
*   **Dev Environment**: **Tilt** (Live updates, container orchestration locally).
*   **Communication**:
    *   **Synchronous**: gRPC (Internal), REST (Gateway -> Client).
    *   **Asynchronous**: RabbitMQ (Event bus).
*   **Databases**:
    *   **Primary**: MongoDB (Document store).
    *   **Cache**: Redis.
    *   **External**: Supabase (in `bharatonewaytaxi`).
*   **Storage**: MinIO (S3 compatible object storage).

### Shared Libraries (The "Armoury" Crate)
*   **Auth**: JWT handling middleware.
*   **Logger**: Structured logging (Zap or Logrus) with trace IDs.
*   **Config**: Centralized configuration loader (Viper or similar).

---

## 3. Parallel Agents (Concurrency & Automation)
*Designing the system as a collection of autonomous, parallel workers.*

### System Agents (Microservices)
Each service acts as an autonomous agent responsible for a domain:
*   **Booking Agent**: Manages lifecycle, state machine of a trip.
*   **Driver Matching Agent**: runs algorithms in parallel to find best drivers.
*   **Notification Agent**: Listens for events and dispatches via FCM/SMS/Email.

### Concurrency Patterns
*   **Go Routines**: Utilization of lightweight threads for high-throughput request processing (e.g., parallel driver pings).
*   **Event-Driven Architecture**:
    *   Services do not wait for long operations. They emit an event (e.g., `BookingCreated`) to RabbitMQ.
    *   **Worker Agents** process these events in parallel (e.g., Invoice Generator, Email Sender).
*   **Cron Agents**:
    *   `check_driver_heartbeat.go`: Autonomous agent monitoring driver health.
    *   `check_booking_location.go`: Agent monitoring active trips.

---

## 4. Serverless Running (Deployment & Ops)
*Running infrastructure that abstracts the server management.*

### Deployment Strategy
*   **Container Native**: usage of Docker for all artifacts.
*   **Kubernetes (K8s)**:
    *   **Stateless Services**: Deployments with Horizontal Pod Autoscalers (HPA).
    *   **Stateful Services**: StatefulSets for DBs (in Dev), Managed Services in Prod.
*   **Knative (Recommended Upgrade)**: Adopt Knative Serving to allow services to "scale to zero" when idle, truly simulating serverless behavior on K8s.

### CI/CD Pipeline
*   **Build**: Docker builds with multi-stage caching (referenced in Tiltfile).
*   **GitOps**: ArgoCD (implied or recommended) to sync K8s manifests from the repo to the cluster.
*   **Observability**: Centralized logging and tracing (Jaeger/OpenTelemetry) to monitor the "Swarm" of agents.
