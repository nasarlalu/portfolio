import { NextRequest, NextResponse } from 'next/server';
import { connectToDb } from '@/src/lib/mongodb';
import Conversation from '@/src/model/conversations';


export const GET = async (request, { params }) => {
    const { userId } = await params;
    try {
        await connectToDb();
        const note = await Conversation.findOne({ userId });
        return NextResponse.json(note);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
};