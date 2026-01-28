# SOP: Backend Architecture (Supabase)

## Protocol
1.  **Client Patterns**: Always use the provided `tools/db_client.js` for data access where possible.
2.  **Auth First**: Ensure all data modifications are protected by RLS (Row Level Security) on the Supabase side. The client should just handle the Auth Session.
3.  **Error Handling**: All Database calls must be wrapped in `try/catch` blocks.
    - Log errors to console with strict prefixes: `[DB_ERROR]`.
    - Fail gracefully (return `null` or empty arrays, do not crash the app).
4.  **Schema Authority**: `gemini.md` is the Single Source of Truth for schema. Do not invent columns in code that don't exist in the plan.

## Standard Query Patterns
- **Fetch**: `await supabase.from('table').select('*').eq('id', id)`
- **Insert**: `await supabase.from('table').insert({ ... })`
- **Realtime**: Use subscriptions only when explicitly requested for chat/live features.
