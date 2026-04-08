#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import https from "https";

const BASE = "https://www.alderpost.co";

function fetchJSON(path) {
  return new Promise((resolve, reject) => {
    https.get(`${BASE}${path}`, { headers: { "User-Agent": "Alderpost-MCP/1.0", "PAYMENT-SIGNATURE": "mcp-discovery" } }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, data: { raw: data.slice(0, 2000) } }); }
      });
    }).on("error", (e) => reject(e));
  });
}

async function callEndpoint(path, params) {
  const qs = Object.entries(params).filter(([,v]) => v).map(([k,v]) => `${k}=${encodeURIComponent(v)}`).join("&");
  const url = `${path}${qs ? "?" + qs : ""}`;
  const result = await fetchJSON(url);
  return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
}

const server = new McpServer({
  name: "alderpost",
  version: "1.0.0",
});

// ── Domain Shield ───────────────────────────────────────────────────────
server.tool(
  "domain_shield",
  "Domain security scan: SPF, DKIM, DMARC, SSL, MX, DNSSEC. 7 checks scored 0-100. Price: $0.25 USDC on Base.",
  { domain: z.string().describe("Domain to scan (e.g. example.com)") },
  async ({ domain }) => callEndpoint("/api/domain-shield", { domain })
);

// ── Company X-Ray ───────────────────────────────────────────────────────
server.tool(
  "company_xray",
  "Company intelligence: tech stack, infrastructure, social presence, business signals. 8 data sources scored 0-100. Price: $0.50 USDC on Base.",
  { domain: z.string().describe("Company domain (e.g. stripe.com)") },
  async ({ domain }) => callEndpoint("/api/company-xray", { domain })
);

// ── Threat Pulse ────────────────────────────────────────────────────────
server.tool(
  "threat_pulse",
  "Threat intelligence: blacklists, open ports, SSL analysis, email security. 6 DNSBLs scored 0-100. Price: $0.35 USDC on Base.",
  { target: z.string().describe("IP address or domain (e.g. 8.8.8.8 or example.com)") },
  async ({ target }) => callEndpoint("/api/threat-pulse", { target })
);

// ── Compliance Check ────────────────────────────────────────────────────
server.tool(
  "compliance_check",
  "IT security compliance audit: email auth, SSL/TLS, OWASP headers, cookies, privacy, DNSSEC. 8 checks letter graded. Price: $0.85 USDC on Base.",
  { domain: z.string().describe("Domain to audit (e.g. stripe.com)") },
  async ({ domain }) => callEndpoint("/api/compliance-check", { domain })
);

// ── Prospect IQ ─────────────────────────────────────────────────────────
server.tool(
  "prospect_iq",
  "Sales intelligence: web presence, tech stack, social signals, contact readiness. 7 data sources scored 0-100. Price: $0.40 USDC on Base.",
  { domain: z.string().describe("Domain to analyze (e.g. example.com)") },
  async ({ domain }) => callEndpoint("/api/prospect-iq", { domain })
);

// ── Sports Edge ─────────────────────────────────────────────────────────
server.tool(
  "sports_edge",
  "Pre-game sports intelligence: standings, odds, AI-generated analysis. Price: $0.50 USDC on Base.",
  {
    sport: z.string().describe("Sport key: nba, nfl, mlb, nhl, mls, epl"),
    team: z.string().optional().describe("Team name filter (e.g. lakers)"),
  },
  async ({ sport, team }) => callEndpoint("/api/sports-edge", { sport, team })
);

// ── Property Intel ──────────────────────────────────────────────────────
server.tool(
  "property_intel",
  "Location intelligence: geocoding, amenities, schools, elevation, walkability. Scored 0-100. Price: $0.75 USDC on Base.",
  { address: z.string().describe("Full address (e.g. 123 Main St Milwaukee WI)") },
  async ({ address }) => callEndpoint("/api/property-intel", { address })
);

// ── Health Signal ───────────────────────────────────────────────────────
server.tool(
  "health_signal",
  "Health intelligence: FDA drug labels, adverse events, recalls, nutrition. Risk scored. Price: $0.30 USDC on Base.",
  {
    query: z.string().describe("Drug name or food item (e.g. ibuprofen)"),
    type: z.string().optional().describe("drug, food, or auto (default: auto)"),
  },
  async ({ query, type }) => callEndpoint("/api/health-signal", { query, type })
);

// ── Start ───────────────────────────────────────────────────────────────
const transport = new StdioServerTransport();
await server.connect(transport);
