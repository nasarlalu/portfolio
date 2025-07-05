import Chatbox from "@/src/components/Chat/Chatbox"
import UserDetails from "@/src/components/Chat/UserDetails"
export default function chat() {
    return (
        <section className="chat__section">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-[2rem]">
                    <UserDetails />
                    <Chatbox />
                </div>
            </div>
        </section>
    )
}