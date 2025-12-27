import MessageContainer from "@/components/MessageContainer";
import SideBar from "@/components/SideBar";

export default function Home() {
    return (
        <div className="w-screen h-screen flex">
            <SideBar/>
            <MessageContainer/>
        </div>
    )
}
