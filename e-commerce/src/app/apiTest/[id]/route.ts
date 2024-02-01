import { NextRequest, NextResponse } from "next/server";

interface RouteParam {
    params: { id: string }
}

export async function GET(req: NextRequest, { params }: RouteParam) {
    console.log(params.id)
    return NextResponse.json(params)
}

export async function POST(request: NextRequest) {
    const res = await request.json()
    return Response.json({ res })
}

export async function PUT(request: Request) {
    const formData = await request.formData()
    const name = formData.get('name')
    const email = formData.get('email')
    const file = formData.get('file')
    console.log(file)
    return Response.json({ name, email })
}