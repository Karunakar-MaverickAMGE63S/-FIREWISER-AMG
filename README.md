# 🔥 FIREWISER Tactical Agent: Hybrid AI for Mission-Critical Wildfire Triage

## 🌟 Submission for "Best of AI Studio" Category

FIREWISER is an expert system designed to orchestrate a complex emergency response. It creates an **Intelligent Digital Twin** of the evacuation environment, leveraging a strategic **Hybrid AI Architecture** to deliver unparalleled clarity and control to both citizens in peril and the command center.

Our core innovation focuses on transforming the generative power of Gemini into a reliable, policy-driven decision engine, a key requirement for life-saving applications.

---

## 🧠 The Intelligence Layer: Structured AI and Agent Design

The entire platform is anchored by the **Gemini 2.5 Flash** model, which is disciplined to act not as a chatbot, but as a **predictable policy execution engine**.

### 1. **Hyper-Personalized Guidance Generation**

* **Technology:** **Google Gemini 2.5 Flash** via `@google/genai`
* **Methodology:** We utilize a **sophisticated zero-shot prompting strategy** where Gemini ingests a specific demographic profile (e.g., "Parents with Young Children") and instantly generates a highly-structured output.
* **Advanced Technique:** This reliability is achieved through strict **schema enforcement** (`.responseSchema`), compelling the LLM to return a machine-readable JSON object containing a tailored evacuation checklist and critical psychological coaching messages. This eliminates the risk of malformed or non-deterministic responses.

### 2. **Multi-Agent Triage & Tactical Asset Optimization**

The system features two critical operational intelligence components:

* **Dynamic Triage Overlay (Simulation):** Simulates a cloud-based Gemini model processing a high-throughput stream of anonymized evacuee data to perform **real-time cluster analysis** ("En Route" vs. "Safe"), providing commanders with essential triage intelligence.
* **Air Asset Optimization (Simulation):** An algorithm (`getOptimalDropZone`) that analyzes at-risk evacuee clusters and fire trajectory to calculate the **geometric centroid of vulnerability**, identifying the single most effective drop zone for fire retardant.

---

## 🚀 Architectural Innovation: Hybrid Edge-Cloud

We chose a **Hybrid Architecture** (client-side implementation) as a deliberate technical optimization to prioritize **sub-second latency and resilience** for mission-critical functions.

### 1. **Cloud AI (Gemini API)**
* **Role:** Heavy, complex decision tasks (structured guidance, tactical analysis).
* **Benefit:** Utilizes immense cloud computational power without maintaining a separate, costly, intermediary server (Cloud Run) that would only add latency.

### 2. **On-Device AI (Chrome's Built-in AI)**
* **Technology:** `window.ai` via `services/chromeAiService.ts`
* **Role:** Provides **zero-latency UI enhancements** (instant summarization/rephrasing of checklists) directly on the user's device.
* **Benefit:** Enhances user privacy by keeping local data on the edge and eliminates network round-trips for immediate cognitive aids during peak stress.

### 3. **High-Performance Visualization**
The `Map.tsx` component implements an architectural pattern to achieve **60fps rendering under heavy load**: High-frequency map updates (fire and asset animations) are handled directly by **browser-native APIs** (`requestAnimationFrame`) to bypass React's Virtual DOM entirely, ensuring a fluid tactical overview.

---

## 🛠️ Tech Stack & Tooling

| Technology | Purpose |
| :--- | :--- |
| **Foundation Model** | **Gemini 2.5 Flash** |
| **Languages** | **TypeScript, JavaScript** (Strict type safety across data models) |
| **Frameworks** | **React, Tailwind CSS** (Rapid, utility-first styling for a polished UI) |
| **APIs** | **@google/genai SDK**, **Google Maps Platform**, **Google Air Quality API** |
| **Optimization** | **Edge/On-Device AI** (`window.ai`), **Structured Output** (`responseSchema`) |

---

## 📹 Live Demonstration

[**INSERT LINK TO YOUR SUBMISSION VIDEO HERE**]

The video clearly demonstrates the **Hyper-Personalized Guidance** being generated and instantly applied to the UI, the fluid performance of the **Dynamic Triage Overlay**, and the low-latency response of the **On-Device AI** features.

---

## ⚙️ How to Run Locally

1.  **Clone the Repository:** `git clone [YOUR REPO URL]`
2.  **Install Dependencies:** `npm install`
3.  **Set API Key:** Create a file named `.env` in the root and add your key:
    ```
    VITE_GEMINI_API_KEY="YOUR_API_KEY_HERE"
    ```
4.  **Start Application:** `npm start`

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
