# Alderpost MCP Server

MCP server for the [Alderpost Intelligence API](https://www.alderpost.co) — 8 bundled intelligence endpoints covering security, business, compliance, sales, sports, property, and health data.

Each tool calls a live API endpoint that bundles 5-8 data sources into a single scored response. Pay per call via x402 USDC on Base — no API keys, no subscriptions.

## Tools

| Tool | Description | Price |
|------|-------------|-------|
| `domain_shield` | Domain security: SPF, DKIM, DMARC, SSL, MX, DNSSEC | $0.25 |
| `company_xray` | Company intel: tech stack, infrastructure, social, business signals | $0.50 |
| `threat_pulse` | Threat intel: blacklists, ports, SSL, email security | $0.35 |
| `compliance_check` | IT compliance: email auth, headers, cookies, privacy, DNSSEC | $0.85 |
| `prospect_iq` | Sales intel: web presence, tech stack, social, contact readiness | $0.40 |
| `sports_edge` | Pre-game intelligence: standings, odds, AI analysis | $0.50 |
| `property_intel` | Location intel: amenities, schools, elevation, walkability | $0.75 |
| `health_signal` | Health intel: FDA drug info, adverse events, recalls, nutrition | $0.30 |

## Install

### Claude Desktop

Add to your `claude_desktop_config.json`:

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

### Cursor

Add to your `.cursor/mcp.json`:

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

### Claude Code

```bash
claude mcp add alderpost -- npx -y alderpost-mcp
```

## How It Works

Each tool makes an HTTP request to the corresponding Alderpost API endpoint. Endpoints are x402-protected — payment is handled via USDC on Base mainnet. For discovery-mode calls (no payment), you'll receive the 402 response with pricing and schema information.

For full paid access, use the [agentcash MCP](https://www.npmjs.com/package/x402scan-mcp) alongside this server, or integrate with any x402-compatible payment flow.

## Links

- **Website**: [alderpost.co](https://www.alderpost.co)
- **x402scan**: [x402scan.com](https://www.x402scan.com)
- **API Docs**: [alderpost.co/llms.txt](https://www.alderpost.co/llms.txt)

## License

MIT — Alderpost LLC, Wisconsin
