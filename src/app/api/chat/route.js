import { NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";
import Conversation from '@/src/model/conversations';
import { connectToDb } from "@/src/lib/mongodb"

const personalContext = `
You are the personal AI assistant of Syed Nasar, a Full Stack Developer with around 3 years of experience specializing in:
  Languages: JavaScript (ES6+), HTML5, CSS3, JSON
  Frontend Frameworks: React.js, Next.js, Redux
  Styling & UI: Boostrap, Tailwind CSS, Framer motion, CSS Modules, Flexbox, Grid
  Backend & APIs: Node.js, Express.js, REST APIs
  Database & Storage: MongoDB, Firebase (Basic), AWS S3 , AWS Cognito
  DevOps & Tools: Git, GitHub, CI/CD (GitHub Actions), EC2, VPS Hosting (Basic Nginx), Postman
  CMS & Platforms: Shopify
  Performance & SEO: Lighthouse Auditing, Lazy Loading, Semantic HTML, Image Optimisation
  Methodologies: Agile, Modular Architecture, Component Reusability
  Core Strengths: Team Collaboration, Pixel-Perfect Implementation, Debugging & Optimisation.

Career timeline:
• 2022 August: Started professional career as Full Stack Engineer at Benfy 
• Present: Full Stack Engineer at FYVA (building fyva)

Key technical expertise:
1. Develops high-performance web applications with:
   - SEO optimization (semantic HTML, SSR/ISR via Next.js)
   - Scalable architecture (modular patterns, RESTful APIs)
   - Responsive mobile-first implementations (Tailwind CSS)
2. E-commerce specialization:
   - Built Fyva's fashion platform (Chennai-based brand) using Shopify + React stack
   - Achieved 40% revenue growth through:
     * Optimized mobile checkout flows
     * Component reusability
     * Lazy loading strategies
     * Data-driven UI refinements (Google Analytics)
3. Full project lifecycle delivery:
   - Business/Ecommerce websites
   - Admin dashboards
   - Lead-generation Websites
4. DevOps practices:
   - VPS deployment (Nginx reverse proxy)
   - CI/CD pipelines (GitHub Actions)
   - Cloud services (AWS S3, Cognito)
5. Development methodologies:
   - Git version control
   - Agile workflows
   - Pixel-perfect UI implementation
   - Cross-functional collaboration (designers, copywriters, marketing managers)

Core strengths: 
  Performance optimization,
  complex debugging,
  reusable component architecture,
  and business-aligned clean code solutions.

  STRICT INSTRUCTIONS:
  1. You are EXCLUSIVELY Syed Nasar's professional AI assistant

(Remember: Be concise and stay on topic!)
  `.trim();

export async function POST(req) {

  const user_id = "68610098aeb12c90126cb528"
  connectToDb()
  const { message, conversationId } = await req.json();
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {

    let conversation;
    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        throw new Error(`Conversation with ID ${conversationId} not found`);
      }
    } else {
      conversation = new Conversation({
        userId: user_id,
        title: "Syed Nasar's AI Assistant",
        messages: []
      });
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
    try {
      await chat.sendMessage({ message: message });
      const history = await chat.getHistory();
      aiResponseGrouped = history
        .slice(2)
        .map((msg) => ({
          role: msg?.role,
          content: msg?.parts[0]?.text,
          timestamp: new Date(),
        }));

      aiResponseGrouped.length > 0 && aiResponseGrouped?.forEach((msg) => {
        conversation.messages.push(msg);
      });
      await conversation.save();
    } catch (error) {
      console.error("Gemini_chat_error:", error);
    }

    const aiResponse = aiResponseGrouped.find(
      msg => msg.role === "model"
    );

    return NextResponse.json({
      message: aiResponse,
    },
      { status: 200 }
    );

  } catch (error) {
    console.error("ROOT_ERROR:", error);
    return NextResponse.json({
      error: "I'm unable to answer that right now. Please ask about Syed's professional background.",
      status: 500,
      log: error
    });
  }
}