# AIHASC 2027 Conference Website
### International Conference on AI for Healthcare, Agriculture and Sustainable Computing
**Theme:** *Advancing Intelligent Technologies for Healthcare, Agriculture and a Sustainable Future*  
**Dates:** 25–26 March 2027 | Pune, Maharashtra, India | First Edition (Annual)

---

## 🌟 Key Features & Creative Design System

1. **Brand & Visual Aesthetics**:
   - **Deep Tech / Bio-Emerald & Cyan Palette**: Custom color tokens combining healthcare teal/cyan, sustainable bio-emerald green, deep obsidian midnight base, and warm solar amber highlights.
   - **Dual Theme Support (Dark / Light Mode)**: Interactive toggle button remembering user preference via `localStorage`.
   - **Aura Ambient Mesh & Glassmorphism**: Translucent frosted cards (`backdrop-filter: blur(18px)`), subtle glowing micro-borders, and elevation shadows.
   - **Typography**: Google Fonts `Outfit` (for high-tech display headings) and `Plus Jakarta Sans` (for clean, legible body text).
   - **Custom SVG Logo**: Designed vector emblem intertwining neural network nodes (AI), ECG medical pulse (Healthcare), and botanical leaf (Agriculture & Sustainability).

2. **Live Interactive Widgets**:
   - **Conference Countdown Timer**: Real-time ticker counting down to **25 March 2027, 09:00 IST**.
   - **Track Explorer & Live Keyword Search**: Real-time filtering across all 6 tracks and 54+ research subtopics with category filter pills.
   - **United Nations SDG Matrix**: Color-coded cards connecting conference research with UN SDGs 2, 3, 7, 9, 12, and 13.
   - **Interactive Author Guidelines Accordions**: Smooth expand/collapse FAQs and double-blind peer review rules.
   - **Copy-to-Clipboard Utility**: One-click citation and conference details copying with feedback toast.
   - **Interactive Contact Form**: Instant client-side validation with real-time feedback.
   - **Mobile Drawer Navigation**: Responsive slide-down menu with animated hamburger toggle.

---

## 📁 Website Architecture

```
AIHASC2027-Website/
├── index.html               # Home: Hero, Countdown, Track Preview, SDGs, Stats, Important Dates
├── about.html               # About: Background, 7 Core Objectives, SDGs, Format, Expected Outcomes
├── tracks.html              # Tracks: Interactive 6-Track Catalog with live search & 54 subtopics
├── call-for-papers.html     # Call for Papers: Scope, 4 Contribution types, Dates, Indexing Policy
├── author-guidelines.html   # Guidelines: Double-blind rules, 3-reviewer criteria, COPE ethics, FAQs
├── proposal.html            # Proposal: Complete formal 10-section conference dossier for stakeholders
├── committee.html           # Committee: Institutional Patronage, Chairs, Keynotes, Track Leads
├── venue.html               # Venue & Travel: Pune city profile, airport/train transit, campus gallery
├── contact.html             # Contact: Secretariat directory, interactive inquiry form, Google Maps
├── css/
│   └── style.css            # Unified responsive stylesheet with CSS custom variables & dark/light mode
├── js/
│   └── main.js              # Vanilla JavaScript for countdown, search, theme toggle, accordions
├── images/
│   ├── logo.svg             # Custom modern vector logo
│   ├── favicon.svg          # Modern square site icon
│   ├── aihasc_abstract_art.jpg
│   ├── aihasc_sustainable_city.jpg
│   ├── campus/              # Host campus facilities photos
│   ├── committee/           # Leadership & patron photos
│   └── speakers/            # Keynote speaker portraits
└── downloads/
    ├── AIHASC_2027_Call_for_Papers_and_Conference_Proposal.docx
    └── conference-template-a4.docx
```

---

## 🚀 How to Run Locally

Simply open any `.html` file (e.g. `index.html`) directly in any modern browser, or run a local web server:

```bash
# Python 3:
python -m http.server 8080 --directory "AIHASC2027-Website"

# Node.js:
npx serve AIHASC2027-Website
```
Then navigate to `http://localhost:8080`.
