import express, { Express } from 'express';
import dotenv from 'dotenv';  // used only for local .env usage. On a live server deployment not needed - there will be option there to set up environmental variables
import { z } from 'zod';
import login from './router/login'

dotenv.config(); //checks the environment. not needed as line 2

const app: Express = express();
const port = process.env.PORT;

app.use(express.json())
app.use('/api/login', login)

type Pet = {
  name: string
  age: number
}

type User = {
  name: string
  age: number
  pets: Pet[]
}

// ehelyett a ZOD-os megoldas a router/signup.ts-ben
  
// app.post('/api/signup', (req: Request, res: Response) => {

//   if(!req.body.email) return res.status(400).json({msg: "email missing"})  
//   if(!req.body.username) return res.status(400).json({msg: "username missing"})  
//   if(!req.body.password) return res.status(400).json({msg: "email password"})  
//   res.json('Express + TypeScript Server');

// });

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});