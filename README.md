# Laptop Matchmaker AI

A static, local-only laptop matcher that reads `laptopsData.json` at runtime. No install step is required, and the app does not depend on CDN scripts.

## Run Locally

Serve the folder from a local HTTP server so the browser can fetch the JSON file:

```powershell
python -m http.server 5173
```

Then open `http://localhost:5173`.
