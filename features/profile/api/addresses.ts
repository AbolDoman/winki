import Api from '@/lib/axios';
import { isRecord, readApiSuccess, unwrapApiPayload } from '@/utils/response';

export interface CustomerAddressApiModel {
  id: number;
  title?: string;
  receiver_name?: string;
  receiver_mobile?: string;
  address?: string;
  postal_code?: string;
  city?: string;
  province?: string;
  lat?: number;
  lng?: number;
  is_default?: boolean;
  [key: string]: unknown;
}

export interface UpsertCustomerAddressPayload {
  title?: string;
  receiver_name?: string;
  receiver_mobile?: string;
  address?: string;
  postal_code?: string;
  city?: string;
  province?: string;
  lat?: number;
  lng?: number;
  is_default?: boolean;
  [key: string]: unknown;
}

const normalizeAddressObject = (data: unknown): CustomerAddressApiModel | null => {
  if (!isRecord(data)) return null;
  const raw = data as Record<string, unknown>;

  const id =
    typeof raw.id === 'number' ? raw.id : typeof raw.id === 'string' ? Number(raw.id) : NaN;

  if (!Number.isFinite(id)) return null;

  return {
    id,
    title: typeof raw.title === 'string' ? raw.title : undefined,
    receiver_name: typeof raw.receiver_name === 'string' ? raw.receiver_name : undefined,
    receiver_mobile: typeof raw.receiver_mobile === 'string' ? raw.receiver_mobile : undefined,
    address: typeof raw.address === 'string' ? raw.address : undefined,
    postal_code: typeof raw.postal_code === 'string' ? raw.postal_code : undefined,
    city: typeof raw.city === 'string' ? raw.city : undefined,
    province: typeof raw.province === 'string' ? raw.province : undefined,
    lat: typeof raw.lat === 'number' ? raw.lat : undefined,
    lng: typeof raw.lng === 'number' ? raw.lng : undefined,
    is_default: typeof raw.is_default === 'boolean' ? raw.is_default : undefined,
    ...raw,
  };
};

export const GetCustomerAddresses = async (): Promise<CustomerAddressApiModel[]> => {
  const result = await Api.get('/customer/addresses').then((response) => response.data);
  const data = unwrapApiPayload<unknown>(result);

  if (Array.isArray(data)) {
    return data
      .map((item) => normalizeAddressObject(item))
      .filter((item): item is CustomerAddressApiModel => Boolean(item));
  }

  if (isRecord(data)) {
    const r = data as Record<string, unknown>;
    if (Array.isArray(r.data)) {
      return r.data
        .map((item) => normalizeAddressObject(item))
        .filter((item): item is CustomerAddressApiModel => Boolean(item));
    }
    if (Array.isArray(r.items)) {
      return r.items
        .map((item) => normalizeAddressObject(item))
        .filter((item): item is CustomerAddressApiModel => Boolean(item));
    }
  }

  return [];
};

export const GetCustomerAddressById = async (
  id: number,
): Promise<CustomerAddressApiModel | null> => {
  const result = await Api.get(`/customer/addresses/${id}`).then((response) => response.data);
  const data = unwrapApiPayload<unknown>(result);

  if (Array.isArray(data)) {
    const first = data[0];
    return normalizeAddressObject(first);
  }

  if (isRecord(data)) {
    const raw = data as Record<string, unknown>;
    if (raw.data != null) return normalizeAddressObject(raw.data);
    if (raw.item != null) return normalizeAddressObject(raw.item);
    return normalizeAddressObject(raw);
  }

  return null;
};

export const CreateCustomerAddress = async (
  payload: UpsertCustomerAddressPayload,
): Promise<CustomerAddressApiModel | null> => {
  const result = await Api.post('/customer/addresses', payload).then((response) => response.data);
  const data = unwrapApiPayload<unknown>(result);
  if (Array.isArray(data)) return normalizeAddressObject(data[0]);
  if (isRecord(data)) {
    const raw = data as Record<string, unknown>;
    if (raw.data != null) return normalizeAddressObject(raw.data);
    if (raw.item != null) return normalizeAddressObject(raw.item);
    return normalizeAddressObject(raw);
  }
  return null;
};
export const UpdateCustomerAddress = async (
  id: number,
  payload: UpsertCustomerAddressPayload,
): Promise<CustomerAddressApiModel | null> => {
  const result = await Api.put(`/customer/addresses/${id}`, payload).then(
    (response) => response.data,
  );
  const data = unwrapApiPayload<unknown>(result);

  if (Array.isArray(data)) return normalizeAddressObject(data[0]);
  if (isRecord(data)) {
    const raw = data as Record<string, unknown>;
    if (raw.data != null) return normalizeAddressObject(raw.data);
    if (raw.item != null) return normalizeAddressObject(raw.item);
    return normalizeAddressObject(raw);
  }
  return null;
};

export const DeleteCustomerAddress = async (id: number): Promise<boolean> => {
  const result = await Api.delete(`/customer/addresses/${id}`).then((response) => response.data);
  const data = unwrapApiPayload<unknown>(result);

  if (typeof data === 'boolean') return data;
  if (isRecord(data)) return readApiSuccess(data, true);

  return true;
};
