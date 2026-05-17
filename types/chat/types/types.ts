// API Types for Chat Backend Integration
// This file shows the structure for future backend integration

export interface ChatSession {
  id: string;
  userId: string;
  adminId?: string;
  status: 'active' | 'closed' | 'waiting';
  createdAt: Date;
  lastMessageAt: Date;
}

export interface Message {
  id: string;
  chatId: string;
  content: string;
  sender: 'user' | 'admin';
  timestamp: Date;
  isRead: boolean;
}

export interface SendMessageRequest {
  chatId: string;
  content: string;
  sender: 'user' | 'admin';
}

export interface SendMessageResponse {
  success: boolean;
  message: Message;
  error?: string;
}

export interface GetMessagesRequest {
  chatId: string;
  page?: number;
  limit?: number;
}

export interface GetMessagesResponse {
  success: boolean;
  messages: Message[];
  hasMore: boolean;
  error?: string;
}

export interface CreateChatSessionRequest {
  userId: string;
  subject?: string;
  category?: string;
}

export interface CreateChatSessionResponse {
  success: boolean;
  chatSession: ChatSession;
  error?: string;
}

// WebSocket message types for real-time chat
export interface WebSocketMessage {
  type: 'message' | 'typing' | 'read' | 'status';
  data: Message | TypingIndicator | MessageRead | { status: string };
}

export interface TypingIndicator {
  chatId: string;
  userId: string;
  isTyping: boolean;
}

export interface MessageRead {
  messageId: string;
  chatId: string;
  readBy: string;
  readAt: Date;
}
