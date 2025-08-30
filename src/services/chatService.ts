// Chat Service - Gọi AI API thông qua backend
// Không chứa logic AI, chỉ gọi API

const AI_API_URL = import.meta.env.VITE_AI_API_URL || 'http://localhost:3001';

export interface ChatMessage {
  from: 'user' | 'bot';
  text: string;
}

export interface ChatResponse {
  response: string;
  error?: string;
}

export interface ChatContext {
  deals: any[];
  users: any[];
}

class ChatService {
  async sendMessage(message: string, context: ChatContext): Promise<ChatResponse> {
    try {
      const response = await fetch(`${AI_API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          context,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { response: data.response };
    } catch (error) {
      console.error('Chat API request failed:', error);
      return { 
        response: 'Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau.',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

export const chatService = new ChatService();
