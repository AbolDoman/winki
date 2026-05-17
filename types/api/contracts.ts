export interface ApiEnvelope<TData> {
  success: boolean;
  message: string;
  data: TData;
}

export interface ApiErrorResponse {
  success?: boolean;
  message?: string;
  data?: unknown | null;
  errors?: Record<string, string[]>;
}

export interface ApiPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from?: number | null;
  to?: number | null;
}

export interface ApiPaginatedData<TItem> extends ApiPagination {
  data: TItem[];
}
