import path from 'path'
import dotEnv from 'dotenv'

export default async function globalTestSetup() {
    const envFilePath = path.resolve(process.cwd(), '.env.test')
    dotEnv.config({ path: envFilePath })
}
