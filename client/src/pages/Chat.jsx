import { useAuthStore } from "../store/useAuthStore";

const Chat = () => {
  const { logout } = useAuthStore();
  return (
    <div className="z-10">
      Chat
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Chat;
