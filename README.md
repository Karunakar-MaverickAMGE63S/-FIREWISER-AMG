# 🔥 FIREWISER Tactical Agent: Hybrid AI for Mission-Critical Wildfire Triage

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

[https://youtu.be/mRmJ3C64VfY]

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
## 🧪 Application Testing Instructions (FIREWISER)

This application is designed to provide personalized emergency guidance (using Gemini) and operational data (Google Maps/Air Quality API) based on a user's location and role.

### **Pre-requisite Setup**

Before testing, ensure your API keys are correctly configured to prevent fallback data usage:

1.  **Check Gemini Key:** In **`.env.local`**, ensure `GEMINI_API_KEY` is set to a valid key, not `PLACEHOLDER_API_KEY`.
2.  **Run Application:** Start your local development server using the command specified in your `README.md` and `package.json`:
    ```bash
    npm install
    npm run dev
    ```
    The application should open in your browser, typically at `http://localhost:3000`.

-----

### **Test Scenario 1: Personalized Evacuation Guidance (Gemini Integration)**

This test verifies the main feature: generating personalized, AI-driven emergency guidance. This relies on the Gemini API key.

| Step | Action | Expected Result | Pass/Fail |
| :--- | :--- | :--- | :--- |
| **1. Input** | On the initial screen (Step 1), enter a **ZIP Code** (e.g., `90265`) and select a **Role** (e.g., `Parents with Young Children`). Click **"Get Wise Guidance"**. | The app proceeds to the **Consent** screen (Step 2). | |
| **2. Consent** | Click **"I Agree to AI Generation"** (The prompt for the AI is now sent). | The app transitions to the **Loading** screen (Step 3). The network tab in your browser console should show a successful API call to the Gemini endpoint. | |
| **3. Guidance View** | After a brief loading time, the **Wise Output** screen (Step 4) is displayed. | The page shows three distinct sections with emergency information: <br> **a. Alert:** A bold, urgent evacuation message. <br> **b. Checklist:** A title and a list of specific, role-based steps (e.g., "Secure Children First"). <br> **c. Coach:** A short, encouraging message. | |
| **4. Role Variation** | Click the **"Checklist"** button to view the full checklist (Step 4a). Then, start over (back to Step 1). Repeat Steps 1-3, but select a different role (e.g., `Adults-Only Household`). | The generated **Alert**, **Checklist Items**, and **Coach Message** should be meaningfully different and tailored to the new selected role. | |

### **Test Scenario 2: Dynamic Triage and Map Overlay (Maps/Air Quality Integration)**

This test verifies the map and external data integration for emergency responders (Command View). This relies on the Google Maps and Air Quality API keys.

| Step | Action | Expected Result | Pass/Fail |
| :--- | :--- | :--- | :--- |
| **5. Command Input** | From the main input screen (Step 1), click the **"Command"** button. | The app proceeds to the **Command Loading** screen (Step\_CommandLoading). | |
| **6. Command View** | The app transitions to the **Command View** (Step 5). | A map is displayed. It should feature a colored border (defined by a wind direction/hazard color) and an overlay of small moving "dots" representing assets (as configured in `constants.tsx`). | |
| **7. Air Operations** | On the Command View, click the **"Air Quality Operations"** button. | The app transitions to the **Air Ops Loading** screen (Step 5a), and then to the **Air Ops View** (Step 6). | |
| **8. Air Ops Data** | On the Air Ops View (Step 6), observe the left-hand panel. | This panel should display the following data, fetched via the Air Quality API: <br> **a. AQI Value:** A number (Air Quality Index). <br> **b. AQI Category:** Text description (e.g., "Good," "Moderate"). <br> **c. Dominant Pollutant.** | |

### **Test Scenario 3: Chrome Built-in AI Functionality (Client-Side AI)**

This test is conditional and requires a compatible version of the Chrome browser with the experimental Built-in AI feature enabled. This functionality is implemented in `chromeAiService.ts`.

| Step | Action | Expected Result | Pass/Fail |
| :--- | :--- | :--- | :--- |
| **9. Browser Check** | Open the browser console (F12) and type `window.ai.canCreateSummarizer()`. | If the feature is available, the result will be a Promise that resolves to `'readily'`. If not, it will be `'no'`. **(Test is only valid if result is 'readily')** | |
| **10. AI Service Call** | Use the application's built-in Chrome AI features (if accessible). *Since there is no visible UI button for this feature in `App.tsx`, you would need to manually call a function from the console.* | Calling a function like `rew
