/**
 * LogShield Windows Agent ↔ Lonex Workforce Desktop 브릿지
 * LogShield 에이전트가 localhost:9477 에 이벤트를 POST하면 HQ로 전달
 */
const http = require('http');

class LogshieldBridge {
  constructor(config, syncClient) {
    this.config = config;
    this.syncClient = syncClient;
    this.server = null;
    this.port = 9477;
  }

  start() {
    this.server = http.createServer(async (req, res) => {
      if (req.method === 'POST' && req.url === '/events') {
        let body = '';
        req.on('data', (c) => (body += c));
        req.on('end', async () => {
          try {
            const event = JSON.parse(body);
            const result = await this.syncClient.postSecurityEvent({
              agent_id: event.agent_id || 'logshield-agent',
              event_type: event.event_type || 'FILE',
              action: event.action || 'detect',
              detail: event.detail || JSON.stringify(event),
              severity: event.severity || 'medium',
              payload: event,
            });
            res.writeHead(result.ok ? 202 : 502, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
          } catch (err) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: err.message }));
          }
        });
        return;
      }
      res.writeHead(404);
      res.end();
    });

    this.server.listen(this.port, '127.0.0.1', () => {
      console.log(`[LogShield Bridge] listening on 127.0.0.1:${this.port}`);
    });
  }

  stop() {
    if (this.server) this.server.close();
  }
}

module.exports = { LogshieldBridge };
