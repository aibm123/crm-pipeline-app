import React, { useState } from 'react';
import { chatService, ChatMessage } from '../../services/chatService';
import { Deal, User } from '../../services/api';

interface ChatbotProps {
  currentUser: { mail: string; role: string };
  deals: Deal[];
  users: User[];
}

export const Chatbot: React.FC<ChatbotProps> = ({ currentUser, deals, users }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      from: 'bot', 
      text: 'Xin chào! Tôi là trợ lý AI, sẵn sàng trả lời các câu hỏi của bạn về pipeline bán hàng.' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chatService.sendMessage(input, { deals, users });
      const botMessage: ChatMessage = { from: 'bot', text: result.response };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { 
        from: 'bot', 
        text: 'Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau.' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-4">
      <h1 className="text-3xl font-bold text-white mb-4 px-2">Chatbot</h1>
      <div className="flex-1 overflow-y-auto bg-gray-800 rounded-lg p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-lg px-4 py-2 rounded-lg ${
              msg.from === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-lg px-4 py-2 rounded-lg bg-gray-700 text-gray-200">
              <span className="animate-pulse">Bot đang nhập...</span>
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSendMessage} className="mt-4">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập yêu cầu của bạn ở đây..."
            className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-4 pr-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500" 
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};
