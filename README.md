# Planly AI — AI-Powered Architectural Floor Plan Visualizer

Planly AI is an AI-powered web application that transforms 2D architectural floor plans into photorealistic 3D top-down renders. Users upload a floor plan image, and the app uses Gemini's image generation model (via Puter.ai) to produce a fully rendered architectural visualization — complete with realistic materials, furniture, and lighting.

## Tech Stack

- **Framework:** React Router v7 (SSR mode with Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (Vite plugin)
- **Build Tool:** Vite 8
- **AI / Image Generation:** Puter.ai SDK — Gemini 2.5 Flash image model (`txt2img`)
- **Backend / Storage:** Puter.js (authentication, KV store, filesystem, static hosting)
- **Icons:** Lucide React
- **Font:** Inter (Google Fonts)

## Features

- **Floor Plan Upload** — Drag-and-drop or click-to-upload with file validation (JPG/PNG, up to 50MB), progress bar, and auto-redirect to the visualizer
- **AI 3D Rendering** — Converts 2D floor plans into photorealistic top-down 3D renders using Gemini via Puter.ai, with a detailed architectural prompt that maps room icons to realistic furniture
- **Puter Authentication** — Sign in / sign out via Puter's built-in auth, with auth state passed through React Router's outlet context
- **Project Persistence** — Projects are stored with source and rendered images uploaded to Puter's filesystem and served via auto-provisioned Puter static hosting subdomains
- **Visualizer Page** — Dynamic route (`/visualizer/:id`) displays the source image and rendered output for each project
- **Projects Gallery** — Homepage lists all created projects with thumbnail previews, timestamps, and navigation

## Getting Started

### Prerequisites
- Node.js 18+
- A [Puter](https://puter.com) account (handles auth, storage, hosting, and AI)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── root.tsx                # Root layout — Puter auth state, outlet context
├── routes.ts               # Route config (home + visualizer/:id)
├── routes/
│   ├── home.tsx            # Landing page — hero, upload, projects gallery
│   └── visualizer.$id.tsx  # Visualizer page — displays source/rendered images
├── app.css                 # Global styles
components/
├── Navbar.tsx              # Top nav with Puter auth (sign in/out)
├── Upload.tsx              # Drag-and-drop file upload with validation & progress
├── ui/
│   └── Button.tsx          # Reusable button component
lib/
├── ai.action.ts            # Gemini AI image generation via Puter.ai
├── puter.action.ts         # Puter auth + project creation logic
├── puter.hosting.ts        # Auto-provisioned static hosting & image uploads
├── constants.ts            # App-wide constants (upload limits, AI prompt, etc.)
├── utils.ts                # Blob/image helpers, hosting URL builders
type.d.ts                   # Global TypeScript declarations
```

## What I Learned

- **React Router v7 as a full-stack framework** — Using React Router v7 in SSR mode with Vite as a complete alternative to Next.js, including file-based routing, server-side rendering, and outlet context for global state.
- **Puter.js as a backend** — Leveraging Puter's SDK for authentication, key-value storage, filesystem operations, and static hosting — effectively replacing a traditional backend and cloud storage setup.
- **AI image generation with Puter.ai** — Calling Gemini's `txt2img` endpoint through Puter.ai with a base64-encoded input image and a detailed architectural prompt to produce photorealistic renders.
- **Prompt engineering for architectural renders** — Writing a structured, constraint-heavy prompt that forces the model to respect floor plan geometry, remove text/labels, and map room icons to specific furniture — all in a top-down orthographic view.
- **Auto-provisioned static hosting** — Dynamically creating Puter hosting subdomains, uploading images to Puter's filesystem, and serving them via public URLs — all from the client side.
- **Base64 and Blob manipulation** — Converting between data URLs, base64 strings, Blobs, and Files for image upload, AI input, and hosting workflows.
- **Auth via outlet context** — Passing authentication state (sign in/out, user info) through React Router's `useOutletContext` to avoid prop drilling across routes.
- **File upload UX patterns** — Building a drag-and-drop upload zone with validation, animated progress simulation, and auto-navigation on completion.
