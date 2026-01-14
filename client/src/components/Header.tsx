import { useSelector } from "react-redux"
import ModeToggle from "./Mode-toggle"
import type { StateType } from "@/redux/store"
import Profile from "./Profile";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function Header() {
  const { profilePicture } = useSelector((state: StateType) => state.userReducer.authUser);
  return (
    <div className="h-12 flex items-center justify-between border px-2">
      <div className="flex gap-2 items-center">
        <ModeToggle />
        <span className="font-doto font-bold text-2xl">Konnect</span>
      </div>
      {/* Tabs & User*/}
      <div className="">
        {profilePicture ?
          <Profile />
          :
          <Link to={'/signin'}><Button variant="secondary" className="rounded-full">Login</Button></Link>
        }
      </div>
    </div>
  )
}

export default Header