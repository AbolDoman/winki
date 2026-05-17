// Ticket System Types
// This file contains all TypeScript interfaces for the ticket support system

export type TicketViewProps = {
  params?: {
    status?: string;
    id?: string;
  };
};

export interface TicketDepartment {
  id: number;
  name: string;
  description?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Ticket {
  id: number;
  subject: string;
  description?: string;
  status: 'open' | 'pending' | 'closed' | 'in_progress' | 'waiting' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  department_id?: number;
  department_name?: string;
  department?: {
    id: number;
    name: string;
    description?: string;
  };
  topic?: {
    id: number;
    title: string;
  } | null;
  messages?: {
    id: number;
    message: string;
    sender_type: string;
    sender: unknown;
    attachments: TicketAttachment[];
    created_at: string;
  }[];
  user_id?: number;
  user_name?: string;
  created_at: string;
  updated_at: string;
  last_message_at?: string;
  message_count?: number;
  unread_count?: number;
}

export interface TicketMessage {
  id: number;
  ticket_id: number;
  content: string;
  message: string;
  sender_type: 'user' | 'admin' | 'customer';
  sender_id: number;
  sender_name: string;
  created_at: string;
  is_read: boolean;
  attachments?: TicketAttachment[];
}

export interface TicketAttachment {
  id: number;
  message_id: number;
  file_name: string;
  file_url: string;
  file_size: number;
  file_type: string;
  created_at: string;
  download_url?: string;
  original_name?: string;
}

// Request/Response Types
export interface CreateTicketRequest {
  subject: string;
  message: string;
  department_id: number;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  topic_id?: number;
  order_id?: number;
  attachments?: File[];
}

export interface CreateTicketResponse {
  success: boolean;
  ticket: Ticket;
  message?: string;
  error?: string;
}

export interface GetTicketsRequest {
  page?: number;
  limit?: number;
  status?: 'open' | 'pending' | 'closed' | 'in_progress' | 'waiting' | 'cancelled';
  department_id?: number;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  search?: string;
}

export interface GetTicketsResponse {
  success: boolean;
  data?: Ticket[];
  tickets?: Ticket[];
  total?: number;
  page?: number;
  limit?: number;
  has_more?: boolean;
  error?: string;
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
  last_page?: number;
}

export interface GetTicketResponse {
  success: boolean;
  data?: Ticket;
  ticket?: Ticket;
  messages?: TicketMessage[];
  error?: string;
}

export interface UpdateTicketStatusRequest {
  status: 'open' | 'in_progress' | 'closed' | 'waiting';
  admin_note?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}

export interface UpdateTicketStatusResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface AddTicketMessageRequest {
  message: string;
  attachments?: File[];
}

export interface AddTicketMessageResponse {
  success: boolean;
  message: TicketMessage;
  error?: string;
}

export interface GetTicketMessagesRequest {
  page?: number;
  limit?: number;
}

export interface GetTicketMessagesResponse {
  success: boolean;
  messages: TicketMessage[];
  has_more: boolean;
  error?: string;
}

// Filter and Search Types
export interface TicketFilters {
  status?: 'open' | 'pending' | 'closed' | 'in_progress' | 'waiting' | 'cancelled';
  department_id?: number;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  date_from?: string;
  date_to?: string;
  search?: string;
}

export interface TicketSortOptions {
  field: 'created_at' | 'updated_at' | 'priority' | 'status';
  order: 'asc' | 'desc';
}

// Statistics Types
export interface TicketStats {
  total_tickets: number;
  open_tickets: number;
  in_progress_tickets: number;
  closed_tickets: number;
  waiting_tickets: number;
  average_response_time: number;
  department_stats: {
    department_id: number;
    department_name: string;
    ticket_count: number;
  }[];
}

// Notification Types
export interface TicketNotification {
  id: number;
  ticket_id: number;
  type: 'new_message' | 'status_change' | 'priority_change' | 'assignment';
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}
