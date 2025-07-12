import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/authOption';
import { connectToDb } from '@/src/lib/mongodb';
import Conversation from '@/src/model/conversations';



// 👉 POST: Create a new conversation
export async function POST(req) {
    await connectToDb();
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { title, messages } = await req.json();

    try {
        const newConversation = await Conversation.create({
            userId: "68610098aeb12c90126cb528",
            title,
            messages,
        });

        return NextResponse.json(newConversation, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
// 👉 PUT: Update a specific conversation (by ID, passed as query param)
export async function PUT(req) {
    await connectToDb();
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const { title, messages } = await req.json();

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    try {
        const updated = await Conversation.findOneAndUpdate(
            { _id: id, userId: "68610098aeb12c90126cb528" },
            { title, messages, updatedAt: Date.now() },
            { new: true }
        );

        if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// 👉 DELETE: Delete a conversation by ID
export async function DELETE(req) {
    await connectToDb();
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    try {
        const deleted = await Conversation.findOneAndDelete({ _id: id, userId: "68610098aeb12c90126cb528" });
        if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        return NextResponse.json({ message: 'Conversation deleted' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
