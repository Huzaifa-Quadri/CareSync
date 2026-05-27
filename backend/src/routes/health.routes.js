import { Router } from "express";
import mongoose from "mongoose";

const router = Router();

router.get("/", async (req, res) => {
  const dbStates = { 0: "disconnected", 1: "connected", 2: "connecting", 3: "disconnecting" };
  const dbState = dbStates[mongoose.connection.readyState] ?? "unknown";
  const isHealthy = mongoose.connection.readyState === 1;

  const uptime = process.uptime();
  const uptimeStr = `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${Math.floor(uptime % 60)}s`;

  const data = {
    status: isHealthy ? "healthy" : "degraded",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    uptime: uptimeStr,
    node: process.version,
    database: { state: dbState, healthy: isHealthy },
  };

  if (req.query.format === "json") {
    return res.status(isHealthy ? 200 : 503).json(data);
  }

  const statusColor = isHealthy ? "#22c55e" : "#ef4444";
  const statusBg = isHealthy ? "#052e16" : "#2d0a0a";
  const badge = isHealthy ? "● HEALTHY" : "● DEGRADED";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>API Health — Prescripto</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', system-ui, sans-serif;
      background: #0f172a;
      color: #e2e8f0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    .card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 2.5rem 3rem;
      max-width: 520px;
      width: 100%;
      box-shadow: 0 25px 50px rgba(0,0,0,0.4);
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #334155;
    }
    .title { font-size: 1.4rem; font-weight: 700; color: #f1f5f9; }
    .subtitle { font-size: 0.8rem; color: #64748b; margin-top: 2px; }
    .badge {
      background: ${statusBg};
      color: ${statusColor};
      border: 1px solid ${statusColor}44;
      border-radius: 999px;
      padding: 0.35rem 0.9rem;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.05em;
    }
    .grid { display: grid; gap: 0.75rem; }
    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
      background: #0f172a;
      border-radius: 8px;
      border: 1px solid #1e293b;
    }
    .label { font-size: 0.82rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.06em; }
    .value { font-size: 0.9rem; color: #f1f5f9; font-weight: 500; }
    .value.ok  { color: #22c55e; }
    .value.bad { color: #ef4444; }
    .footer {
      margin-top: 1.75rem;
      padding-top: 1.25rem;
      border-top: 1px solid #334155;
      font-size: 0.75rem;
      color: #475569;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div>
        <div class="title">🩺 Prescripto API</div>
        <div class="subtitle">System Health Report</div>
      </div>
      <span class="badge">${badge}</span>
    </div>
    <div class="grid">
      <div class="row">
        <span class="label">Status</span>
        <span class="value ${isHealthy ? "ok" : "bad"}">${data.status.toUpperCase()}</span>
      </div>
      <div class="row">
        <span class="label">Database</span>
        <span class="value ${isHealthy ? "ok" : "bad"}">${dbState.toUpperCase()}</span>
      </div>
      <div class="row">
        <span class="label">Environment</span>
        <span class="value">${data.environment}</span>
      </div>
      <div class="row">
        <span class="label">Uptime</span>
        <span class="value">${uptimeStr}</span>
      </div>
      <div class="row">
        <span class="label">Node</span>
        <span class="value">${data.node}</span>
      </div>
      <div class="row">
        <span class="label">Timestamp</span>
        <span class="value">${new Date().toUTCString()}</span>
      </div>
    </div>
    <div class="footer">Auto-refreshes on page reload · JSON at <code>/api/health?format=json</code></div>
  </div>
</body>
</html>`;

  res.status(isHealthy ? 200 : 503).send(html);
});

export default router;
