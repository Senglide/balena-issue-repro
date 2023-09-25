import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'

// The balenaVariables json file is not present in the codebase.
// It gets created and populated after the standup container boots up and before the Nextjs instance is started
export async function GET() {
    const balenaVariables = await fs.readFile(
        `${process.cwd()}/balenaVariables.json`,
        'utf8',
    )
    return NextResponse.json(balenaVariables)
}

export const dynamic = 'force-dynamic'
