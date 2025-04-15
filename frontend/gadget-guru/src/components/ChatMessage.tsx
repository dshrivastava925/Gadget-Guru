import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Optional: GitHub-flavored markdown support

interface Props {
  message: string;
  role: "user" | "bot";
}

const ChatMessage: React.FC<Props> = ({ message, role }) => {
  return (
    <div
      className={`w-full flex mb-2 ${
        role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`p-3 rounded-xl max-w-[95%] ${
          role === "user"
            ? "bg-blue-100 text-end self-end"
            : "bg-green-100 text-start self-start"
        }`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]} // Optional: Enable GitHub flavored markdown
          components={{
            p: ({ children }) => (
              <p className="prose prose-sm sm:prose-base prose-blue max-w-none">
                {children}
              </p>
            ),
            // You can customize other elements like `h1`, `code`, etc.
          }}
        >
          {message}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessage;
