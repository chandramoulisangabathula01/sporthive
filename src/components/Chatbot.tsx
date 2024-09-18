// components/Chatbot.tsx
import React, { useState } from "react";
import axios from "axios";
import { GEMINI_ENDPOINT, GEMINI_API_KEY } from "../config/constants";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import ShimmerButton from "../../@/components/magicui/shimmer-button";
import PulsatingButton from "../../@/components/magicui/pulsating-button";
interface ChatMessage {
  text: string;
  sender: "user" | "bot";
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSendMessage = async () => {
    if (!userInput) return;

    setMessages([...messages, { text: userInput, sender: "user" }]);
    setLoading(true);

    try {
      const response = await axios.post(
        `${GEMINI_ENDPOINT}:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: userInput,
                },
              ],
            },
          ],
        }
      );

      const botResponse = response.data.candidates[0].content.parts[0].text;
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setLoading(false);
    setUserInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 ">
      
      {/* <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="bg-gray-800 text-white border-2 border-gray-700 rounded-lg px-4 py-2 shadow-lg hover:bg-gray-700 transition-colors "
      >
        {isChatOpen ? 'Close' : 'Chat'}
      </button> */}
      <div className="z-60 flex min-h-[1em] items-center  ">
        <PulsatingButton
          className="bg-red-600"
          onClick={() => setIsChatOpen(!isChatOpen)}
        >

          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
            {isChatOpen ? "X" : "Chat"}
          </span>
        </PulsatingButton>
      </div>
      
      {isChatOpen && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg w-80 max-h-[500px] flex flex-col shadow-lg">
          <div className="flex-1 p-4 overflow-y-auto bg-gray-800 border-b border-gray-700">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`my-1 p-3 rounded-lg break-words ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white self-end"
                    : "bg-gray-700 text-gray-300 self-start"
                }`}
              >
                {message.sender === "bot" ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.text}
                  </ReactMarkdown>
                ) : (
                  <div>{message.text}</div>
                )}
              </div>
            ))}
          </div>
          <div className="flex border-t border-gray-700 p-4 bg-gray-900">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={loading}
              className="flex-1 p-3 border border-gray-700 rounded-lg mr-2 bg-gray-800 text-white placeholder-gray-500"
              placeholder="Enter a message."
            />
            <button
              onClick={handleSendMessage}
              disabled={loading}
              className="bg-blue-600 text-white border-none rounded-lg px-5 py-2 cursor-pointer hover:bg-blue-500 transition-colors"
            >
              {loading ? "Processing" : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
