# SoloCodeDev_AIRestaurantReviewAnalysis
## Multi-Service AI Restaurant Insights Pipeline

A decoupled backend architecture featuring an upstream **Java Spring Boot microservice** data provider integrated with an agile **Nest.js & TypeScript AI orchestration layer**. The system safely handles asynchronous data streaming, enforces strict structural validation, and leverages localized Large Language Models (LLMs) to generate production-grade business intelligence.

## 🏗️ System Architecture & Data Flow

1. **Gatekeeper Validation**: Client data hits the Nest.js ingress controller and is structurally audited before execution.
2. **Microservice Sync**: The Nest.js core service invokes a RESTful interface on the Java Spring Boot service to aggregate cross-domain relational datasets.
3. **Pipeline Assembly**: LangChain orchestrates the dataset payload along with contextual boundary prompts.
4. **Local Compute**: The prompt context executes securely through a local instance of Ollama utilizing `llama3.1:8b`.

---

## 🛠️ Tech Stack & Dependencies

### Upstream Service (Data Core)
* **Language & Framework**: Java 17, Spring Boot 3.x
* **Build Automation & Metadata**: Apache Maven (`com.restaurant.ai.review`)
* **Architecture**: RESTful Controller, Decoupled Domain Models

### Orchestration Layer (AI Core)
* **Language & Framework**: TypeScript, Nest.js (Strict Compiler Mapping)
* **AI Tooling**: LangChain Core, LangChain Ollama Integration
* **Validation & Networking**: Axios, Class-Validator, Class-Transformer

---

## 🚀 Local Development Setup

### Prerequisite Engines
* Node.js v18+
* JDK 17+
* Ollama Engine (`ollama run llama3.1:8b`)

### 1. Execute Upstream Java Service
```bash
cd java-review-service
./mvnw spring-boot:run
```
*Service initializes locally on port `8081`.*

### 2. Execute Ingress Nest.js Service
```bash
cd nest-ai-service
npm install
npm run start
```
*Service initializes locally on port `3000`.*

### 3. Verify System Pipeline via Command Line
Validate the structural input guardrails and runtime intelligence from an independent terminal:

**Test Passing Payload (Success Scenario):**
```bash
curl -X POST http://localhost:3000/restaurant/ai-report \
-H "Content-Type: application/json" \
-d "{\"customPromptOverride\": \"Identify top customer complaints regarding service wait times and suggest operational fixes.\"}"
```

**Test Failing Payload (Validation Guardrail):**
```bash
curl -X POST http://localhost:3000/restaurant/ai-report \
-H "Content-Type: application/json" \
-d "{\"customPromptOverride\": \"short\"}"
```
