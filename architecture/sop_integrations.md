# SOP: Integrations (YouTube/Context7)

## YouTube API
1.  **Cost Management**: The API quota is expensive.
    - **Cache**: Store results in LocalStorage or Supabase (Cache Table) if possible to avoid hitting the API on every reload.
    - **Limit**: Always use `maxResults` to limit payload size.
2.  **Fallbacks**: If the API fails (Quota limit/Network), show a "Skeleton Loader" or a "Retry" button. Do not show a raw error stack trace to the user.

## Context7
1.  **Usage**: Use for augmented context or specialized data retrieval if needed.
2.  **Config**: Ensure `@context7/mcp-server` is running or API key is accessible via `.env`.

## General
- **Secrets**: NEVER hardcode API keys. Always access via `import.meta.env` (Frontend) or `process.env` (Tools).
