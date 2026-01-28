# Project Constitution (gemini.md)

## 1. Data Schemas (JSON)
## 1. Data Schemas (JSON)
*Input:* User Requirements, Audio Transcripts, MCP Tools (`context7`, `supabase`, `youtube`)
*Output:* Full Stack Web Application (Vite/React/Tailwind) + Supabase Schema.

### Application State Shape (Concept)
```json
{
  "app_config": {
    "name": "Heaven on Earth",
    "theme": "modern_premium_animated",
    "pages": ["home", "login", "blog", "blog_post"]
  },
  "database_schema": {
    "users": {
        "id": "uuid",
        "email": "string",
        "created_at": "timestamp"
    },
    "posts": {
        "id": "uuid",
        "title": "string",
        "content": "text",
        "author_id": "uuid (fk)",
        "published": "boolean",
        "video_url": "string (optional)",
        "created_at": "timestamp"
    }
  }
}
```

## 2. Behavioral Rules
- **Global Alignment:** Strictly follow B.L.A.S.T. protocol and A.N.T. architecture.
- **Aesthetics:** "hoH" Logo. "Heaven on Earth" Title. Rainforest Bokeh Background. Theme: Deep Greens & Void Blacks.
- **Data-First:** Schema before Code.
- **Deterministic Logic:** No guessing.
- **Stack:** Vite + React + TailwindCSS.
- **Integrations:** Supabase (Auth/DB), YouTube, Context7.
- **Delivery:** GitHub -> Vercel/Hostinger.

## 4. Resource Configs
**Context7 MCP Config:**
```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@context7/mcp-server"],
      "env": {
        "CONTEXT7_API_KEY": "ctx7sk-04947adf-eb0a-4f8a-b3db-372c3c29ce9a"
      }
    }
  }
}
```

## 3. Architectural Invariants
- **Layer 1:** SOPs in `architecture/`.
- **Layer 2:** Navigation (Agentic Logic).
- **Layer 3:** Tools in `tools/` (Deterministic Node.js Scripts).
- **Golden Rule:** Update SOPs before code.
- **Data-First:** Define Schema before coding tools.
- **Self-Annealing:** Analyze -> Patch -> Test -> Update Architecture.

## 5. Maintenance Log
- **2026-01-26:** Project Initialized (B.L.A.S.T. Protocol).
- **2026-01-26:** Architecture Defined (Node.js Tools, SOPs).
- **2026-01-26:** Frontend Created ("Heaven on Earth" Theme).
- **2026-01-26:** Connectivity Verified (Supabase/YouTube).

- **North Star:** Create a visually beautiful, fully functioning full-stack website with login and blog pages.
- **Source of Truth:** Supabase Database.

## 4. Resource Configs
**Context7 MCP Config:**
```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@context7/mcp-server"],
      "env": {
        "CONTEXT7_API_KEY": "ctx7sk-04947adf-eb0a-4f8a-b3db-372c3c29ce9a"
      }
    }
  }
}
```
