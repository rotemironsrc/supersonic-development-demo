/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

 // dummy startup file, to be replaced by a call to the transpiled typescript start file

import { Request, Response } from 'express';
import express from "express";

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req: Request, res: Response) => {
	res.send('Hello remote world!\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
console.log("And another line, for testing!");