import { NextResponse } from "next/server"
import { connectToDb } from "@/src/lib/mongodb"
import User from "@/src/model/user"

export async function POST(request) {
    try {
        await connectToDb();
        const reqBody = await request.json()
        const { userName, email, password } = reqBody
        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ error: "User already exists, Try different email id" }, { status: 400 })
        }

        const newUser = new User({
            userName,
            email,
            password,
            lastActive: new Date()
        })

        const savedUser = await newUser.save()

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })


    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}