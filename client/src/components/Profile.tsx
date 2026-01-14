import { useDispatch, useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import type { StateType } from "@/redux/store";
import { Button } from "./ui/button";
import { useState } from "react";
import { logout } from "@/actions/user.actions";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Spinner } from "./ui/spinner";
import { reset } from "@/redux/slices/user.slice";

function Profile() {
    const { profilePicture } = useSelector((state: StateType) => state.userReducer.authUser);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            setLoading(true);
            await logout();
            dispatch(reset());
            toast.success("Logged out successfully");
            navigate("/signin");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="mr-3 w-8 h-8 rounded-full flex content-center">
                    <img src={profilePicture} className="rounded-full object-cover" />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-20 rounded-md p-0">
                <div className="w-full flex flex-col justify-center">
                    <Button variant={"secondary"} onClick={handleLogout}>{loading ? <Spinner/> : "Logout"}</Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default Profile