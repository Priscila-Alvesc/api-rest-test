const http = require('http');

function createApp() {
  return http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/login') {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', () => {
        try {
          const payload = JSON.parse(body || '{}');

          if (payload.username === 'julio.lima' && payload.senha === '123456') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ token: 'mock-token-123' }));
            return;
          }

          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Credenciais inválidas' }));
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Requisição inválida' }));
        }
      });

      return;
    }

    if (req.method === 'POST' && (req.url === '/transferencias' || req.url === '/transferencia')) {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', () => {
        try {
          const payload = JSON.parse(body || '{}');
          const authHeader = req.headers.authorization || '';
          const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

          if (!token || token !== 'mock-token-123') {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Token inválido' }));
            return;
          }

          if (payload.valor < 10) {
            res.writeHead(422, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Valor da transferência inválido' }));
            return;
          }

          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            message: 'Transferência realizada com sucesso',
            transferencia: payload
          }));
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Requisição inválida' }));
        }
      });

      return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Rota não encontrada' }));
  });
}

const app = createApp();

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;
