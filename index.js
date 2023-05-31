const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Obter o caminho do arquivo solicitado
  const filePath = path.join(__dirname, 'dist', req.url === '/' ? 'index.html' : req.url);

  // Verificar se o arquivo existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // O arquivo não existe
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Página não encontrada');
    } else {
      // O arquivo existe
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      
      // Ler o conteúdo do arquivo e enviá-lo como resposta
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Servidor HTTP iniciado na porta ${port}`);
});
