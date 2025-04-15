import React, { useState } from "react";

interface Props {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<Props> = ({ onSend, disabled = false }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 border rounded-lg p-2 shadow-sm"
        placeholder="Search for a gadget..."
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled}
        className={`flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-all ${
          disabled ? "cursor-not-allowed" : ""
        }`}
      >
        <span className={disabled ? "animate-pulse" : ""}>Send</span>
      </button>
    </form>
  );
};

export default ChatInput;
