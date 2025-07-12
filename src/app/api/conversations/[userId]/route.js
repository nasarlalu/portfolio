import { NextRequest, NextResponse } from 'next/server';
import { connectToDb } from '@/src/lib/mongodb';
import Conversation from '@/src/model/conversations';
import { authOptions } from '@/src/lib/authOption';
import { getServerSession } from "next-auth";

export const GET = async () => {
    const session = await getServerSession(authOptions);
    if (!session.user.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try {
        await connectToDb();
        const note = await Conversation.findOne({ userId: session.user.id });
        console.log(`Note fetched successfully for user ${session.user.email}`);
        return NextResponse.json({
            data: note,
            message: 'Note fetched successfully',
        });
    } catch (err) {
        console.error(`Error while fetching note for ${session.user.email}`);
        return NextResponse.json({
            error: err,
            message: 'Error while fetching note',
            status: 500
        });
    }
};