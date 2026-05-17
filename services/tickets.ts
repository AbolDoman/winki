import axiosInstance from '@/lib/axios';
import type {
  TicketDepartment,
  CreateTicketRequest,
  CreateTicketResponse,
  GetTicketsResponse,
  GetTicketResponse,
  UpdateTicketStatusRequest,
  AddTicketMessageRequest,
  AddTicketMessageResponse,
  GetTicketMessagesResponse,
  TicketFilters,
  TicketStats,
} from '@/types/chat/types/tickets';
import { GetOrders, OrdersIndexResponse } from '../features/profile/api/orders';

// axiosInstance Functions

/**
 * Get all ticket categories
 * GET /tickets/categories
 */
export const getTicketsCategories = async (): Promise<
  { id: number; name: string; description?: string }[]
> => {
  const result = await axiosInstance.get('/tickets/categories').then((response) => response.data);

  // Handle different response structures
  if (Array.isArray(result)) {
    return result;
  }

  // If response has a categories property
  if (result?.categories && Array.isArray(result.categories)) {
    return result.categories;
  }

  // If response has a data property
  if (result?.data && Array.isArray(result.data)) {
    return result.data;
  }

  // Fallback to empty array
  return [];
};

export const getUserOrders = (): Promise<OrdersIndexResponse> => GetOrders();

/**
 * Get all ticket topics by department
 * GET /tickets/topics
 */
export const getTicketsTopics = async (
  departmentId?: number,
): Promise<{ id: number; title: string; description?: string }[]> => {
  try {
    const params = departmentId ? { department_id: departmentId } : {};
    const result = await axiosInstance
      .get('/tickets/topics', { params })
      .then((response) => response.data);

    // Handle different response structures
    if (Array.isArray(result)) {
      return result;
    }

    // If response has a topics property
    if (result?.topics && Array.isArray(result.topics)) {
      return result.topics;
    }

    // If response has a data property
    if (result?.data && Array.isArray(result.data)) {
      return result.data;
    }

    // Fallback to empty array
    return [];
  } catch (error) {
    console.error('Error fetching topics:', error);
    return [];
  }
};

/**
 * Get all ticket departments
 * GET /tickets/departments
 */
export const getTicketsDepartments = async (): Promise<TicketDepartment[]> => {
  const result = await axiosInstance.get('/tickets/departments').then((response) => response.data);

  // Handle different response structures
  if (Array.isArray(result)) {
    return result;
  }

  // If response has a departments property
  if (result?.departments && Array.isArray(result.departments)) {
    return result.departments;
  }

  // If response has a data property
  if (result?.data && Array.isArray(result.data)) {
    return result.data;
  }

  // Fallback to empty array
  return [];
};

/**
 * Create a new support ticket
 * POST /tickets
 */
export const createTicket = async (data: CreateTicketRequest): Promise<CreateTicketResponse> => {
  const formData = new FormData();
  formData.append('subject', data.subject);
  formData.append('message', data.message);
  formData.append('department_id', data.department_id.toString());
  if (data.priority) formData.append('priority', data.priority);
  if (data.topic_id) formData.append('topic_id', data.topic_id.toString());
  if (data.order_id) formData.append('order_id', data.order_id.toString());
  if (data.attachments) {
    data.attachments.forEach((file) => {
      formData.append('attachments[]', file);
    });
  }
  const result = await axiosInstance
    .post('/tickets', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((response) => response.data);
  return result;
};

/**
 * Get user's tickets with pagination
 * GET /tickets?page=1&per_page=15&status=open
 */
export const getTickets = async (
  params?: TicketFilters & {
    page?: number;
    per_page?: number;
  },
): Promise<GetTicketsResponse> => {
  const queryParams = new URLSearchParams();

  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
  if (params?.status) queryParams.append('status', params.status);
  if (params?.department_id) queryParams.append('department_id', params.department_id.toString());

  const url = `/tickets${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

  const result = await axiosInstance.get(url).then((response) => response.data);
  return result;
};

/**
 * Get specific ticket details with messages
 * GET /tickets/{id}
 */
export const getTicket = async (ticketId: number): Promise<GetTicketResponse> => {
  const result = await axiosInstance.get(`/tickets/${ticketId}`).then((response) => response.data);
  return result;
};

/**
 * Update ticket status (admin only)
 * PUT /tickets/{id}/status
 */
export const updateTicketStatus = async (
  ticketId: number,
  data: UpdateTicketStatusRequest,
): Promise<{ success: boolean; message?: string }> => {
  const result = await axiosInstance
    .put(`/tickets/${ticketId}/status`, data)
    .then((response) => response.data);
  return result;
};

/**
 * Add message to ticket
 * POST /tickets/{id}/messages
 */
export const addTicketMessage = async (
  ticketId: number,
  data: AddTicketMessageRequest,
): Promise<AddTicketMessageResponse> => {
  const formData = new FormData();
  formData.append('message', data.message);
  if (data.attachments && data.attachments.length > 0) {
    data.attachments.forEach((file) => {
      formData.append('attachments[]', file);
    });
  }
  const result = await axiosInstance
    .post(`/tickets/${ticketId}/messages`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((response) => response.data);
  return result;
};

/**
 * Get ticket messages
 * GET /tickets/{id}/messages?page=1&limit=20
 */
export const getTicketMessages = async (
  ticketId: number,
  params?: {
    page?: number;
    limit?: number;
  },
): Promise<GetTicketMessagesResponse> => {
  const queryParams = new URLSearchParams();

  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());

  const url = `/tickets/${ticketId}/messages${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

  const result = await axiosInstance.get(url).then((response) => response.data);
  return result;
};

/**
 * Mark ticket messages as read
 * PUT /tickets/{id}/messages/read
 */
export const markTicketMessagesAsRead = async (ticketId: number): Promise<{ success: boolean }> => {
  const result = await axiosInstance
    .put(`/tickets/${ticketId}/messages/read`)
    .then((response) => response.data);
  return result;
};

/**
 * Close ticket
 * PUT /tickets/{id}
 */
export const closeTicket = async (
  ticketId: number,
): Promise<{ success: boolean; message?: string }> => {
  const result = await axiosInstance
    .put(`/tickets/${ticketId}`, { status: 'closed' })
    .then((response) => response.data);
  return result;
};

/**
 * Get ticket statistics for user
 * GET /tickets/stats
 */
export const getTicketStats = async (): Promise<TicketStats> => {
  const result = await axiosInstance.get('/tickets/stats').then((response) => response.data);
  return result;
};

/**
 * Search tickets
 * GET /tickets/search?q=search_term&page=1&limit=10
 */
export const searchTickets = async (params: {
  q: string;
  page?: number;
  limit?: number;
  filters?: TicketFilters;
}): Promise<GetTicketsResponse> => {
  const queryParams = new URLSearchParams();

  queryParams.append('q', params.q);
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());

  if (params.filters) {
    if (params.filters.status) queryParams.append('status', params.filters.status);
    if (params.filters.department_id)
      queryParams.append('department_id', params.filters.department_id.toString());
    if (params.filters.priority) queryParams.append('priority', params.filters.priority);
    if (params.filters.date_from) queryParams.append('date_from', params.filters.date_from);
    if (params.filters.date_to) queryParams.append('date_to', params.filters.date_to);
  }

  const result = await axiosInstance
    .get(`/tickets/search?${queryParams.toString()}`)
    .then((response) => response.data);
  return result;
};

/**
 * Download ticket attachment
 * GET /tickets/{ticketId}/attachments/{attachmentId}/download
 */
export const downloadTicketAttachment = async (
  ticketId: number,
  attachmentId: number,
): Promise<Blob> => {
  const result = await axiosInstance
    .get(`/tickets/${ticketId}/attachments/${attachmentId}/download`, {
      responseType: 'blob',
    })
    .then((response) => response.data);
  return result;
};

/**
 * Get ticket attachment image as blob URL
 * GET /tickets/{ticketId}/attachments/{attachmentId}/download
 */
export const getTicketAttachmentImage = async (
  ticketId: number,
  attachmentId: number,
): Promise<string> => {
  try {
    const blob = await downloadTicketAttachment(ticketId, attachmentId);
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error loading image:', error);
    throw error;
  }
};
