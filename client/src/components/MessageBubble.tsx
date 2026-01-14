import { useEffect, useRef } from "react";

type MessageBubbleProps = {
    username?: string;
    message: string;
    avatar?: string;
    fromOtherSide?: boolean;
    time?: any
};

export function MessageBubble({
    username,
    message,
    avatar,
    fromOtherSide,
    time
}: MessageBubbleProps) {
    const scroll = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior : "smooth"});
    },[])
    return (
        <div
            ref={scroll}
            className={`mt-1 flex gap-1 max-w-[80%] ${fromOtherSide ? "ml-auto flex-row-reverse" : "mr-auto"
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
                    className={`text-sm font-semibold px-1.5 dark:text-gray-200 ${fromOtherSide ? "text-right" : "text-left"
                        }`}
                >
                    {username}
                </span>

                {/* Bubble */}
                <div
                    className={`min-w-20 flex flex-col px-4 py-1 relative rounded-full text-sm wrap-break-word ${fromOtherSide
                        ? "bg-blue-500 text-white rounded-tr-sm"
                        : "bg-muted text-foreground rounded-tl-sm"
                        }`}
                >
                    <div>{message}</div>
                    <div className={`text-xs mb-1 mt-px dark:text-gray-200 font-extralight ${fromOtherSide ? "text-left" : "text-right"
                        }`}>
                        {time.slice(11, 16)}
                    </div>
                </div>


            </div>
        </div>
    );
}
