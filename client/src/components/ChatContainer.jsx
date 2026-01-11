import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

// Helper function to get date label
const getDateLabel = (date) => {
  const msgDate = new Date(date);
  const today = new Date();

  // Normalize dates (remove time)
  const msgDay = new Date(
    msgDate.getFullYear(),
    msgDate.getMonth(),
    msgDate.getDate()
  );
  const todayDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const diffInDays = (todayDay - msgDay) / (1000 * 60 * 60 * 24);

  // Today
  if (diffInDays === 0) {
    return "Today";
  }

  // Within last 7 days
  if (diffInDays < 7) {
    return msgDate.toLocaleDateString(undefined, {
      weekday: "long",
    });
  }

  // Older dates
  return msgDate.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const ChatContainer = () => {
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading } =
    useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
  }, [selectedUser, getMessagesByUserId]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <ChatHeader />

      <div className="flex-1 px-6 py-5 overflow-y-auto">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-5xl mx-auto space-y-5">
            {messages.map((msg, index) => {
              const currentLabel = getDateLabel(msg.createdAt);
              const prevLabel =
                index > 0 ? getDateLabel(messages[index - 1].createdAt) : null;

              const showDate = currentLabel !== prevLabel;

              return (
                <div key={msg._id}>
                  {showDate && (
                    <div className="flex justify-center">
                      <span className="px-3 py-1 text-xs rounded-full bg-slate-700 text-slate-300">
                        {currentLabel}
                      </span>
                    </div>
                  )}

                  <div
                    className={`mt-1 chat ${
                      msg.senderId.toString() === authUser._id
                        ? "chat-end"
                        : "chat-start"
                    }`}
                  >
                    <div
                      className={`chat-bubble relative px-2.5 py-2 ${
                        msg.senderId.toString() === authUser._id
                          ? "bg-cyan-600 text-white rounded-t-xl rounded-bl-xl"
                          : "bg-slate-800 text-slate-200 rounded-t-xl rounded-br-xl"
                      }`}
                    >
                      {msg.image && (
                        <img
                          src={msg.image}
                          alt="message attachment"
                          className="rounded-lg h-48 object-cover"
                        />
                      )}

                      {msg.text && <p className="text-sm">{msg.text}</p>}

                      <p className="text-xs mt-1 opacity-75">
                        {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>

      <MessageInput />
    </>
  );
};

export default ChatContainer;
