import { Request, Response } from 'express';
import express from 'express';

// Constants
const PORT = 8085;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req: Request, res: Response) => {
  res.send('hello supersonic\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
