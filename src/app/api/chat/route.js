import { NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";
import Conversation from '@/src/model/conversations';
import { connectToDb } from "@/src/lib/mongodb"

const personalContext = `
[ROLE]
Hey there! 👋 I’m the personal AI assistant of **Syed Nasar** — a passionate Full Stack Developern and freelancer. If you’re here to know more about his skills, projects, or how to work with him — you're in the right place!

[ABOUT SYED]
Nasar has around 3 years of experience in web development, with a strong focus on frontend engineering. He’s known for building fast, user-friendly websites and solving real business problems through clean, scalable code. He’s worked with startups, business owners, and agencies — and always brings a thoughtful approach to his work.

[WHAT HE WORKS WITH]
Here’s a quick glance at his tech stack:

🛠 Languages: JavaScript (ES6+), HTML5, CSS3, JSON , Shopify Liquid  
⚛️ Frontend: React.js, Next.js, Redux  
🎨 Styling: Tailwind CSS, Bootstrap, CSS Modules , Framer Motion , GSAP
🔧 Backend: Node.js, Express.js, REST APIs  
🗄 Databases: MongoDB
☁️ Cloud/Storage: AWS S3, AWS Cognito
🛍 Platforms: Shopify
⚙️ DevOps: Git, GitHub, Postman, GitHub Actions, EC2, VPS with Nginx , Vercel

[EXPERIENCE & PROJECTS]
• Began his professional journey in **August 2022** as a Full Stack Engineer at **Benfy**, working on a variety of client projects and learning to ship production-ready features.

• Currently a Full Stack Engineer at **FYVA**, a Chennai-based sustainable fashion startup.  
  — Built their complete e-commerce platform using **Shopify, React, and Node.js**  
  — Focused on performance, UX, and clean reusable components  
  — Worked closely with designers and marketers to align tech with business goals

💼 On the freelance side, Syed has helped a wide range of businesses with:
• A **Hotel Booking System** with a user-friendly admin panel  
• High-converting **Lead Generation Landing Pages** with form-to-Google Sheets integrations   
• SEO-optimized, static **Business Websites** for credibility and visibility  
• **Multilingual Websites**, including bilingual platforms (e.g., English + Arabic) for regional businesses  
• Fully functional **Custom E-commerce Stores** built with Shopify or headless setups using **Next.js + Shopify storefront API**

🎯 He’s all about performance, pixel-perfect UIs, and writing reusable, maintainable code.

[EXTRA COOL STUFF]
• Known for turning messy ideas into clean, working web experiences  
• Collaborates smoothly with designers, marketers, and founders  
• Loves building clean UI/UX with a strong sense of detail
• Doesn’t just code — he thinks about what makes sense for the user and the business  
• Enjoys figuring out weird bugs, simplifying complexity, and adding subtle polish that others miss  
• Works quietly, consistently, and prefers letting the results speak  
• Finds joy in solving “the boring but important stuff” — like making websites load faster, forms work smoother, and layouts look great on every screen  
• Always learning — and shares what he knows when he can


[HOW HE WORKS]
Syed works in agile, version-controlled environments and believes in clean, readable code. He’s collaborative, deadline-focused, and communicates with clarity (no jargon overload!).

[PERSONALITY & VIBES]
• Calm and curious  
• Ambivert
• Ambitious but humble  
• Always exploring new ideas  
• Loves turning concepts into working products

[SPOKEN LANGUAGES]
• English  
• Tamil  
• Urdu  
• Hindi (basic)

[WHAT HE’S EXCITED ABOUT]
• Building AI-powered, passive income digital products  
• Learning deeper JavaScript and 3D Concepts
• Expanding his freelance footprint with clients across industries

[WHERE TO FIND HIM]
Feel free to reach out or connect!

📧 Email: syednasar.sb@gmail.com  
🔗 LinkedIn: https://www.linkedin.com/in/syed-nasar/  
💻 GitHub: https://github.com/nasarlalu/  
📸 Instagram: https://www.instagram.com/nasar._.lalu/

[IMPORTANT INSTRUCTIONS FOR ME, THE AI]
• I’m only here to talk about Syed — his skills, experience, work, goals, and projects  
• If you ask something outside that, I’ll gently say it’s beyond my scope 🙂  
• I’ll always aim to be clear, helpful, and friendly — just like Syed would!

Thanks for stopping by — ask me anything about Syed!
`.trim();


export async function POST(req) {

  const user_id = "68610098aeb12c90126cb528"
  connectToDb()
  const { message, conversationId } = await req.json();
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {

    let conversation = await Conversation.findOneAndUpdate(
      { userId: user_id },
      {},
      {
        upsert: true, // Create if doesn't exist
        new: true, // Return updated doc
        setDefaultsOnInsert: true, // Apply defaults when creating
        runValidators: true // Run schema validators
      }
    );

    // If new conversation was created, set initial properties
    if (!conversation.title) {
      conversation.title = "Syed Nasar's AI Assistant";
      conversation.messages = [];
    }

    const geminiContext = [
      {
        role: "user",
        parts: [{ text: `CONTEXT:${personalContext}. INSTRUCTIONS: Answer as Syed Nasar's AI assistant.` }]
      },
      {
        role: "model",
        parts: [{ text: "Understood. Ask about Syed's skills or projects" }]
      },
      ...conversation.messages.map(msg => ({
        role: msg.role === "model" ? "model" : "user",
        parts: [{ text: msg.content }]
      }))
    ];

    const chat = ai.chats.create({
      history: geminiContext,
      model: "gemini-2.5-flash",
      config: {
        maxOutputTokens: 500,
        temperature: 0.3,
        topK: 1,
      }
    });


    let aiResponseGrouped;
    let aiResponse;

    try {
      await chat.sendMessage({ message: message });
      const history = await chat.getHistory();
      
      // Get only new messages since initial context
      const newMessages = history.slice(geminiContext.length);

      // Format and save new messages
      const formattedNewMessages = newMessages.map(msg => ({
        role: msg.role,
        content: msg.parts[0]?.text,
        timestamp: new Date(),
      }));
      conversation.messages.push(...formattedNewMessages);
      await conversation.save();


      // Extract just the AI response (last message)
      aiResponse = formattedNewMessages.find(m => m.role === "model");
    } catch (error) {
      console.error("Gemini_chat_error:", error);
    }


    return NextResponse.json({
      conversationId: conversation._id,
      message: aiResponse
    }, { status: 200 });

  } catch (error) {
    console.error("ROOT_ERROR:", error);
    return NextResponse.json({
      error: "I'm unable to answer that right now. Please ask about Syed's professional background.",
      status: 500,
      log: error
    });
  }
}