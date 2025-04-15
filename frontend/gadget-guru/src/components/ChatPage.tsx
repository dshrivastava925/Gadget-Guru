import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

interface Message {
  message: string;
  role: string;
  conversation_id: string;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId] = useState<string>(() => crypto.randomUUID());
  const [waitingResponse, setWaitingResponse] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  // Scroll to bottom every time messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText: string) => {
    // scroll into view on update

    const newMessage: Message = {
      message: messageText,
      role: "user",
      conversation_id: conversationId,
    };

    setMessages((prev) => [...prev, newMessage]);

    try {
      setWaitingResponse(true);
      const isProductSearch = /price|buy|compare|specs|details/i.test(
        messageText
      );
      const endpoint = isProductSearch ? "search" : "chat";

      const response = await fetch(`${VITE_BACKEND_URL}/chatbot/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          endpoint === "search"
            ? { query: messageText, source: "amazon" }
            : { prompt: messageText }
        ),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const replyMessage = endpoint === "search" ? data.product : data;

      setMessages((prev) => [
        ...prev,
        {
          message: replyMessage,
          role: "bot",
          conversation_id: conversationId,
        },
      ]);

      setWaitingResponse(false);
    } catch (error) {
      setWaitingResponse(false);
      setMessages((prev) => [
        ...prev,
        {
          message: `Failed to fetch product data: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
          role: "bot",
          conversation_id: conversationId,
        },
      ]);
    }
  };

  return (
<div className="flex flex-col h-[calc(100vh-120px)]">
<div className="overflow-y-auto space-y-2 p-2">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            role={msg.role as "user" | "bot"}
            message={msg.message}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="pt-2">
        <ChatInput onSend={sendMessage} disabled={waitingResponse} />
      </div>
    </div>
  );
};

export default ChatPage;
