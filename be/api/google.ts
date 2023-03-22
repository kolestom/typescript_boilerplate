import axios from "axios";
import { string, z } from "zod";


const Response = z.object({
    id_token: z.string(),
    access_token: z.string(),
    refresh_token: z.string(),
    expires_in: z.number(),
    scope: z.string(),
    token_type: z.literal("Bearer")
})

type Response = z.infer<typeof Response>


const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET
const grant_type= "authorization_code"
const redirect_uri= "http://localhost:5173/callback"
const url = "https://oauth2.googleapis.com/token"

export const getIDToken = async (code: string): Promise<string|null>=> {
    try {
        const resp = await axios.post(url, {
            code,
            client_id,
            client_secret,
            grant_type,
            redirect_uri
        })
        const result = Response.safeParse(resp.data)
        if (!result.success) {
            console.log(result.error);
            return null
            
        }
        return result.data.id_token

    } catch (err) {
        console.log(err);
        
        return null
    }
}