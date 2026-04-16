# alderpost-mcp

MCP server for [Alderpost Intelligence API](https://www.alderpost.co) — 8 bundled intelligence endpoints powered by premium data sources. Pay-per-call via x402 USDC on Base.

## Endpoints

| Tool | Price | Premium Sources | Description |
|------|-------|----------------|-------------|
| `domain_shield` | $0.12 | VirusTotal | SPF, DKIM, DMARC, SSL, MX, DNSSEC + malware scan (70+ engines). Scored 0-100. |
| `company_xray` | $0.15 | People Data Labs, Hunter.io | Industry, employees, revenue, tech stack, verified contacts. 9 sources. |
| `threat_pulse` | $0.10 | VirusTotal, AbuseIPDB | Blacklists, ports, SSL + malware detection + IP abuse reports. 7 sources. |
| `compliance_check` | $0.15 | Qualys SSL Labs | Email auth, OWASP headers, cookies, privacy, DNSSEC. 8 checks letter graded. |
| `prospect_iq` | $0.12 | People Data Labs, Hunter.io | Web presence, tech stack, verified contacts, social signals. Sales scored. |
| `sports_edge` | $0.12 | ESPN, The Odds API, Claude AI | Standings, odds from 15+ bookmakers, AI-generated game analysis. |
| `property_intel` | $0.10 | US Census, OpenWeather | Amenities, schools, demographics, elevation, walkability. 7 sources. |
| `health_signal` | $0.10 | NIH RxNorm, FDA | Drug interactions, adverse events, recalls, nutrition. Risk scored. |

## Install

### Claude Desktop / Cursor

Add to your MCP config:

```json
{
  "mcpServers": {
    "alderpost": {
      "command": "npx",
      "args": ["-y", "alderpost-mcp"]
    }
  }
}
```

### Run directly

```bash
npx -y alderpost-mcp
```

## How It Works

Each tool calls an Alderpost x402 endpoint. Endpoints return scored JSON with findings and recommendations. Payment is handled via x402 protocol — USDC on Base mainnet.

One call to Alderpost replaces 5-8 individual API lookups. Example: `domain_shield` checks SPF, DKIM, DMARC, SSL, MX, DNSSEC, WHOIS, and VirusTotal in a single $0.12 request.

## Links

- [Alderpost](https://www.alderpost.co)
- [API Documentation](https://www.alderpost.co/llms.txt)
- [GitHub](https://github.com/8randonpickart5/alderpost-mcp)

## License

MIT — Alderpost LLC
