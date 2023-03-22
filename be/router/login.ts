import express, { Express, Request, Response } from 'express';
import { z } from 'zod';
import { getIDToken } from '../api/google';
import jwt from 'jsonwebtoken';

// const secretKey = process.env.JWT_SECRET || 'demo'

const LoginRequest = z.object({
    code: z.string()
})
type LoginRequest= z.infer<typeof LoginRequest>

const Payload = z.object({
  sub: z.string(),
  email: z.string().email()
})
type Payload = z.infer<typeof Payload>



const router = express.Router()

router.post('/', async (req: Request, res: Response) => {

    const result = LoginRequest.safeParse(req.body) // vatidates the req.body if it fits the SignUpRequest type
    if (result.success === false){
      return res.status(400).json({error: result.error})
    }
    const loginRequest = result.data
    console.log(loginRequest.code);
    const idToken = await getIDToken(loginRequest.code)
    if (!idToken) return res.sendStatus(401)

    // can be util from here
    const payload: unknown = jwt.decode(idToken)
    const result2 = Payload.safeParse(payload)
    if (!result2.success) {
      console.log(result2.error);
      return res.sendStatus(500)
    }
    const sessionToken = jwt.sign(result2.data, process.env.JWT_SECRET || 'placeholder')
    // can be util till here

    res.json(sessionToken)

    // const signUpRequest = req.body as SignUpRequest
    // signUpRequest.email.split("")
    // res.json('Express + TypeScript Server' + JSON.stringify(loginRequest));
  });

  export default router