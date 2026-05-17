import Api from '@/lib/axios';
import { isRecord, unwrapApiPayload } from '@/utils/response';

export type OrderStatus = 'pending' | 'processing' | 'sent' | 'delivered' | 'cancelled';

export interface GetOrdersParams {
  page?: number;
  per_page?: number;
  status?: OrderStatus;
}

export interface OrdersIndexResponseMeta {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface OrderItem {
  id: number;
  customer_id: number;
  address_id: number | null;
  discount_code: string | null;
  discount: number;
  total_price: number;
  total_price_discounted: number;
  total_post_price: number;
  final_total_price: number;
  status: string;
  payment_status: string;
  post_type: string | null;
  tracking_code: string | null;
  number_packages: number;
  weight: number | null;
  description: string | null;
  created_at: string;
  created_at_jalali?: string;
  updated_at: string;
  scheduled_shipping_date: string | null;
  items_count: number;
  items?: OrderItemDetails[];
}

interface OrderItemDetails {
  product_image?: string | null;
  product_title?: string | null;
  quantity?: number | null;
}

export interface OrdersIndexResponse {
  data?: OrderItem[];
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

const normalizeOrdersIndexResponse = (
  raw: unknown,
  params?: GetOrdersParams,
): OrdersIndexResponse => {
  const page = params?.page ?? 1;
  const perPage = params?.per_page ?? 20;

  const emptyLinks: OrdersIndexResponse['links'] = [];
  const basePath = '/customer/profile/orders';

  const wrapArray = (items: OrderItem[]): OrdersIndexResponse => {
    const total = items.length;
    const lastPage = Math.max(1, Math.ceil(total / perPage));
    const from = total ? (page - 1) * perPage + 1 : 0;
    const to = total ? Math.min(page * perPage, total) : 0;

    return {
      data: items,
      current_page: page,
      first_page_url: basePath,
      from,
      last_page: lastPage,
      last_page_url: basePath,
      links: emptyLinks,
      next_page_url: page < lastPage ? basePath : null,
      path: basePath,
      per_page: perPage,
      prev_page_url: page > 1 ? basePath : null,
      to,
      total,
    };
  };

  // unwrap common envelopes
  const unwrapped = unwrapApiPayload<unknown>(raw);

  if (Array.isArray(unwrapped)) {
    return wrapArray(unwrapped as OrderItem[]);
  }

  if (isRecord(unwrapped)) {
    const r = unwrapped as Record<string, unknown>;

    // Laravel-like: { data: [], meta: {...}, links: {...} }
    if (Array.isArray(r.data)) {
      const data = r.data as OrderItem[];

      const meta = isRecord(r.meta) ? r.meta : null;
      const current_page = Number(meta?.current_page ?? r.current_page ?? page);
      const per_page = Number(meta?.per_page ?? r.per_page ?? perPage);
      const total = Number(meta?.total ?? r.total ?? data.length);
      const last_page = Number(
        meta?.last_page ?? r.last_page ?? Math.max(1, Math.ceil(total / per_page)),
      );
      const from = Number(meta?.from ?? r.from ?? (total ? (current_page - 1) * per_page + 1 : 0));
      const to = Number(meta?.to ?? r.to ?? (total ? Math.min(current_page * per_page, total) : 0));

      return {
        data,
        current_page,
        first_page_url: String(r.first_page_url ?? basePath),
        from,
        last_page,
        last_page_url: String(r.last_page_url ?? basePath),
        links: Array.isArray(r.links) ? (r.links as OrdersIndexResponse['links']) : emptyLinks,
        next_page_url: (r.next_page_url as string | null) ?? null,
        path: String(r.path ?? basePath),
        per_page,
        prev_page_url: (r.prev_page_url as string | null) ?? null,
        to,
        total,
      };
    }

    // Some APIs return { items: [] }
    if (Array.isArray(r.items)) {
      return wrapArray(r.items as OrderItem[]);
    }
  }

  return {
    data: [],
    current_page: page,
    first_page_url: basePath,
    from: 0,
    last_page: 1,
    last_page_url: basePath,
    links: emptyLinks,
    next_page_url: null,
    path: basePath,
    per_page: perPage,
    prev_page_url: null,
    to: 0,
    total: 0,
  };
};

export const GetOrders = async (params?: GetOrdersParams): Promise<OrdersIndexResponse> => {
  const result = await Api.get('/customer/profile/orders', { params }).then(
    (response) => response.data,
  );
  return normalizeOrdersIndexResponse(result, params);
};

export const GetOrderById = async (id: number): Promise<OrderItem | null> => {
  const result = await Api.get(`/customer/profile/orders/${id}`).then((response) => response.data);
  const unwrapped = unwrapApiPayload<unknown>(result);

  if (!unwrapped) return null;
  if (Array.isArray(unwrapped)) return (unwrapped[0] as OrderItem) ?? null;
  return unwrapped as OrderItem;
};
