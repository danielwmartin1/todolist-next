import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production'; // Check if the environment is development
const app = next({ dev }); // Initialize Next.js app
const handle = app.getRequestHandler(); // Get request handler from Next.js app

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true); // Parse the request URL
    handle(req, res, parsedUrl); // Handle the request using Next.js
  }).listen(4000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:4000'); // Log the server start message
  });
});