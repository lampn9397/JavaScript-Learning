import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const name = searchParams.getAll('name')
    return NextResponse.json({ name })
}