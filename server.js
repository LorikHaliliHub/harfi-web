import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;

const dist = path.join(__dirname, 'dist');

app.use(express.static(dist, {
  maxAge: '1d',
  setHeaders(res, filePath) {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  },
}));

app.get(['/privacy', '/privacy/'], (_req, res) => {
  res.sendFile(path.join(dist, 'privacy.html'));
});

app.use((_req, res) => {
  res.sendFile(path.join(dist, 'index.html'));
});

app.listen(port, () => {
  console.log(`Harfi web running on port ${port}`);
});
