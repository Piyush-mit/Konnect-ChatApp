type MessageBubbleProps = {
    username?: string;
    message: string;
    avatar?: string;
    fromOtherSide?: boolean;
};

export function MessageBubble({
    username,
    message,
    avatar,
    fromOtherSide,
}: MessageBubbleProps) {
    return (
        <div
            className={`flex gap-1 max-w-[80%] ${fromOtherSide ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
        >
            {/* Avatar */}
            <img
                src={avatar}
                alt={username}
                className={`w-10 h-10 rounded-full object-cover}`}
            />

            {/* Message content */}
            <div className="flex flex-col">
                {/* Username */}
                <span
                    className={`text-sm font-semibold mb-1 px-1.5 text-gray-500 ${fromOtherSide ? "text-right" : "text-left"
                        }`}
                >
                    {username}
                </span>

                {/* Bubble */}
                <div
                    className={`px-4 py-2 rounded-2xl text-sm wrap-break-word ${fromOtherSide
                        ? "bg-blue-500 text-white rounded-tr-sm"
                        : "bg-muted text-foreground rounded-tl-sm"
                        }`}
                >
                    {message}
                </div>
            </div>
        </div>
    );
}
