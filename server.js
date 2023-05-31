const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'dist', req.url === '/' ? 'index.html' : req.url);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Página não encontrada');
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', mime.getType(filePath));
      
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Servidor HTTP iniciado na porta ${port}`);
});
