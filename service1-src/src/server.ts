import { Request, Response } from 'express';
import express from 'express';

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req: Request, res: Response) => {
  res.send('service 1 is here\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);