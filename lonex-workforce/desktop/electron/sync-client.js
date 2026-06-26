const https = require('https');
const http = require('http');
const { URL } = require('url');

class SyncClient {
  constructor(config, store) {
    this.config = config;
    this.store = store;
    this.queue = [];
    this.timer = null;
    this.intervalMs = 30_000;
  }

  start() {
    this.timer = setInterval(() => this.flushNow(), this.intervalMs);
    this.flushNow();
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
  }

  queueItems(items) {
    this.queue.push(...items);
    if (this.queue.length >= 10) this.flushNow();
  }

  async flushNow() {
    if (!this.config.apiKey || this.queue.length === 0) return { ok: true, count: 0 };

    const batch = this.queue.splice(0, 200);
    try {
      const res = await this.request('POST', '/api/hq/ingest', {
        endpoint_id: this.config.endpointId,
        items: batch,
      });
      return { ok: true, count: batch.length, ...res };
    } catch (err) {
      this.queue.unshift(...batch);
      return { ok: false, error: err.message };
    }
  }

  async postSecurityEvent(event) {
    try {
      const res = await this.request('POST', '/api/hq/security', {
        agent_id: event.agent_id || 'lonex-desktop',
        endpoint_id: this.config.endpointId,
        endpoint_hostname: this.config.endpointHostname,
        user: event.user || '',
        event_type: event.event_type || 'FILE',
        action: event.action || 'detect',
        detail: event.detail || '',
        severity: event.severity || 'medium',
        payload: event.payload || {},
      });
      return { ok: true, ...res };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }

  request(method, path, body) {
    return new Promise((resolve, reject) => {
      const base = this.config.hqServerUrl;
      const url = new URL(path, base);
      const lib = url.protocol === 'https:' ? https : http;
      const data = JSON.stringify(body);

      const req = lib.request(
        {
          hostname: url.hostname,
          port: url.port || (url.protocol === 'https:' ? 443 : 80),
          path: url.pathname,
          method,
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data),
            'X-Lonex-Api-Key': this.config.apiKey,
          },
        },
        (res) => {
          let raw = '';
          res.on('data', (c) => (raw += c));
          res.on('end', () => {
            try {
              const parsed = raw ? JSON.parse(raw) : {};
              if (res.statusCode >= 400) {
                reject(new Error(parsed.detail || `HTTP ${res.statusCode}`));
              } else {
                resolve(parsed);
              }
            } catch {
              reject(new Error(`Invalid response: ${raw.slice(0, 200)}`));
            }
          });
        }
      );
      req.on('error', reject);
      req.write(data);
      req.end();
    });
  }
}

module.exports = { SyncClient };
