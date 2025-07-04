import Chatbox from "@/src/components/Chat/Chatbox"
export default function chat() {
    return (
        <section>
            <div className="container">
                <div className="py-12 px-4">
                    <div className="text-center">
                        <div className="h-auto">
                            <Chatbox />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}