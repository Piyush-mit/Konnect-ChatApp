import { useDispatch, useSelector } from "react-redux";
import { Input } from "./ui/input";
import type { StateType } from "@/redux/store";
import UserCard from "./UserCard";
import { ScrollArea } from "./ui/scroll-area";
import React, { useEffect, useState } from "react";
import { setOtherUsers } from "@/redux/slices/user.slice";
import { api } from "@/api";
export default function SideBar() {
  const dispatch = useDispatch();
  const otherUsers = useSelector((state: StateType) => state.userReducer.otherUsers);
  const [users, setUsers] = useState(otherUsers);

  function filterUsers(searchTerm: string) {
    setUsers(otherUsers.filter((u) =>
      u.username?.toLowerCase().includes(searchTerm) || u.fullname?.toLowerCase().includes(searchTerm)));
  }

  const getOtherUsers = async () => {
    try {
      const response = await api.get("/user/otherusers");
      if (response.status == 200) {
        dispatch(setOtherUsers(response.data.users));
        setUsers(response.data.users);
      };
    } catch (err: any) {
      dispatch(setOtherUsers([]));
    }
  }

  useEffect(() => {
    getOtherUsers();
  }, [])

  return (
    <div className="w-[25dvw] pt-2 h-[calc(100dvh-60px)] flex flex-col border-r ">
      <div className="w-full px-3">
        <Input placeholder="Search" className="focus:border focus-visible:ring-0 rounded-full py-3 px-4 h-full" onChange={(e) => filterUsers(e.target.value)} />
      </div>
      {/* Users */}
      <ScrollArea className=" border-none pt-1 h-158 px-3">
        {users.map((user) => (
          <React.Fragment key={user._id}>
            <UserCard info={user} />
          </React.Fragment>
        ))}
      </ScrollArea>
    </div>
  )
}
