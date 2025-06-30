import Chatbox from "@/src/components/Chat/Chatbox"
export default function chat() {

    return (
        <section>
            <div className="container">
                <div className="py-12 px-4">
                    <div className="text-center">
                        {/* <h2 className="text-2xl font-bold text-gray-800 mb-6">Chat with my AI Assistant</h2> */}
                        <div className="h-auto">
                            <Chatbox />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}