
import dotenv from "dotenv"
import  Path  from "path"

dotenv.config({path: Path.join(".env")})
export const firebaseConfig:any = {
    type:process.env.FB_TYPE ,
    project_id:process.env.FB_PROYECT_ID ,
    private_key_id:process.env.FB_PRIVATE_KEY_ID ,
    private_key:process.env.FB_PRIVATE_KEY ,
    client_email:process.env.FB_CLIENT_EMAIL,
    client_id:process.env.FB_CLIENT_ID ,
    auth_uri:process.env.FB_AUTH_URI ,
    token_uri:process.env.FB_TOKEN_URI ,
    auth_provider_x509_cert_url:process.env.FB_AUTH_PROVIDER,
    client_x509_cert_url:process.env.FB_CLIENT_CERT
}