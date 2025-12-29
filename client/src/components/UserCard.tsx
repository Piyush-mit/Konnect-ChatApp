import { ItemDescription, ItemTitle } from "./ui/item";

function UserCard(props: any) {
    const user = props.info;
    return (
        <div className="flex hover:bg-white/5 px-3 rounded-lg">

            {/* Avatar */}
            <div className="avatar avatar-online border-2 border-green-500 rounded-full p-px flex content-center my-1">
                <div className="w-11 h-11 rounded-full flex content-center">
                    <img src={user.profilePicture} className="rounded-full object-cover" />
                </div>
            </div>

            {/* Username */}
            <div className="flex flex-col justify-center pl-3">
                <ItemTitle>{user.fullname}</ItemTitle>
                <ItemDescription>
                    {user.username}
                </ItemDescription>
            </div>

        </div >
    )
}

export default UserCard;