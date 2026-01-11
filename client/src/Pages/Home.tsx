import { api } from "@/api";
import MessageContainer from "@/components/MessageContainer";
import SideBar from "@/components/SideBar";
import { setAuth } from "@/redux/slices/user.slice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function Home() {
    const dispatch = useDispatch();
    const fetchCurrentUser = async () => {
        try {
            const res = await api.get("/user/me");
            if (res.status == 200) {
                const { fullname, username, _id: userId, profilePicture } = res.data.user;
                dispatch(setAuth({ fullname, userId, profilePicture, username }));
            } else throw new Error("Fetch failed");
        } catch (error) {
            toast.error("Authentication failed");
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <div className="flex h-[calc(100dvh-60px)] w-screen">
            <SideBar />
            <MessageContainer />
        </div>
    )
}
