import MessageContainer from "@/components/MessageContainer";
import SideBar from "@/components/SideBar";

export default function Home() {
    return (
        <div className="flex h-[calc(100dvh-60px)] w-screen">
            <SideBar/>
            <MessageContainer/>
        </div>
    )
}
