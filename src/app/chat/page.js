import Chatbox from "@/src/components/Chat/Chatbox"
import UserDetails from "@/src/components/Chat/UserDetails"
export default function chat() {
    return (
        <section className="chat__section">
            <UserDetails />
            <div className="container--chat">
                <Chatbox />
            </div>
        </section>
    )
}