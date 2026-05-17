import Api from '@/lib/axios';
import { isRecord, readApiSuccess, unwrapApiPayload } from '@/utils/response';

export interface CustomerProfileInfo {
  id?: number;
  first_name?: string | null;
  last_name?: string | null;
  name?: string | null;
  family?: string | null;
  mobile?: string | null;
  phone?: string | null;
  email?: string | null;
  national_code?: string | null;
  card_number?: string | null;
  iban?: string | null;
  gender?: string | null;
  birthdate?: string | null;
  avatar?: string | null;
  avatar_url?: string | null;
  image?: string | null;
  status?: string | null;
  is_active?: boolean | number | null;
  [key: string]: unknown;
}

export interface UpdateCustomerAccountPayload {
  first_name: string;
  last_name: string;
  email: string;
  national_code: string;
  card_number: string;
  iban: string;
  password?: string;
}

export interface UpdateCustomerAccountResult {
  success: boolean;
  message?: string;
  profile: CustomerProfileInfo | null;
}

const PROFILE_KEYS = [
  'id',
  'first_name',
  'last_name',
  'name',
  'family',
  'mobile',
  'phone',
  'email',
  'national_code',
  'card_number',
  'iban',
  'avatar',
  'avatar_url',
  'image',
] as const;

const readOptionalString = (value: unknown): string | null | undefined => {
  if (typeof value === 'string') return value;
  if (value === null) return null;
  return undefined;
};

const readOptionalBooleanLike = (value: unknown): boolean | number | null | undefined => {
  if (typeof value === 'boolean' || typeof value === 'number') return value;
  if (value === null) return null;
  return undefined;
};

const readOptionalId = (value: unknown): number | undefined => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;

  if (typeof value === 'string') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }

  return undefined;
};

const isProfileShape = (value: unknown): value is Record<string, unknown> =>
  isRecord(value) && PROFILE_KEYS.some((key) => key in value);

const normalizeCustomerProfile = (value: unknown): CustomerProfileInfo | null => {
  if (!isProfileShape(value)) return null;

  return {
    ...value,
    id: readOptionalId(value.id),
    first_name: readOptionalString(value.first_name),
    last_name: readOptionalString(value.last_name),
    name: readOptionalString(value.name),
    family: readOptionalString(value.family),
    mobile: readOptionalString(value.mobile),
    phone: readOptionalString(value.phone),
    email: readOptionalString(value.email),
    national_code: readOptionalString(value.national_code),
    card_number: readOptionalString(value.card_number),
    iban: readOptionalString(value.iban),
    gender: readOptionalString(value.gender),
    birthdate: readOptionalString(value.birthdate),
    avatar: readOptionalString(value.avatar),
    avatar_url: readOptionalString(value.avatar_url),
    image: readOptionalString(value.image),
    status: readOptionalString(value.status),
    is_active: readOptionalBooleanLike(value.is_active),
  };
};

const extractCustomerProfile = (raw: unknown): CustomerProfileInfo | null => {
  const payload = unwrapApiPayload<unknown>(raw);

  if (Array.isArray(payload)) {
    return payload.length > 0 ? normalizeCustomerProfile(payload[0]) : null;
  }

  return normalizeCustomerProfile(payload);
};

/* ------------------------------
   convert empty string -> null
--------------------------------*/
const emptyToNull = (value: string | undefined | null): string | null => {
  if (value == null) return null;

  const trimmed = value.trim();

  return trimmed === '' ? null : trimmed;
};

const buildUpdatePayload = (data: UpdateCustomerAccountPayload): Record<string, string | null> => {
  const payload: Record<string, string | null> = {
    first_name: emptyToNull(data.first_name),
    last_name: emptyToNull(data.last_name),
    email: emptyToNull(data.email),
    national_code: emptyToNull(data.national_code),
    card_number: emptyToNull(data.card_number),
    iban: emptyToNull(data.iban),
  };

  if (typeof data.password === 'string') {
    payload.password = emptyToNull(data.password);
  }

  return payload;
};

export const GetCustomerAccount = async (): Promise<CustomerProfileInfo> => {
  const response = await Api.get<unknown>('/customer/profile/info');

  return extractCustomerProfile(response.data) ?? {};
};

export const GetCustomerProfileSummary = async (): Promise<CustomerProfileInfo> => {
  const response = await Api.get<unknown>('/customer/profile');

  return extractCustomerProfile(response.data) ?? {};
};

export const UpdateCustomerAccount = async (
  data: UpdateCustomerAccountPayload,
): Promise<UpdateCustomerAccountResult> => {
  const response = await Api.put<unknown>('/customer/profile/update', buildUpdatePayload(data));

  const raw = response.data;

  return {
    success: isRecord(raw) ? readApiSuccess(raw, true) : true,
    message: isRecord(raw) && typeof raw.message === 'string' ? raw.message : undefined,
    profile: extractCustomerProfile(raw),
  };
};

// import Api from '@/lib/axios';
// import { isRecord, readApiSuccess, unwrapApiPayload } from '@/utils/response';

// export interface CustomerProfileInfo {
//   id?: number;
//   first_name?: string | null;
//   last_name?: string | null;
//   name?: string | null;
//   family?: string | null;
//   mobile?: string | null;
//   phone?: string | null;
//   email?: string | null;
//   national_code?: string | null;
//   card_number?: string | null;
//   iban?: string | null;
//   gender?: string | null;
//   birthdate?: string | null;
//   avatar?: string | null;
//   avatar_url?: string | null;
//   image?: string | null;
//   status?: string | null;
//   is_active?: boolean | number | null;
//   [key: string]: unknown;
// }

// export interface UpdateCustomerAccountPayload {
//   first_name: string;
//   last_name: string;
//   email: string;
//   national_code: string;
//   card_number: string;
//   iban: string;
//   password?: string;
// }

// export interface UpdateCustomerAccountResult {
//   success: boolean;
//   message?: string;
//   profile: CustomerProfileInfo | null;
// }

// const PROFILE_KEYS = [
//   'id',
//   'first_name',
//   'last_name',
//   'name',
//   'family',
//   'mobile',
//   'phone',
//   'email',
//   'national_code',
//   'card_number',
//   'iban',
//   'avatar',
//   'avatar_url',
//   'image',
// ] as const;

// const readOptionalString = (value: unknown): string | null | undefined => {
//   if (typeof value === 'string') return value;
//   if (value === null) return null;
//   return undefined;
// };

// const readOptionalBooleanLike = (value: unknown): boolean | number | null | undefined => {
//   if (typeof value === 'boolean' || typeof value === 'number') return value;
//   if (value === null) return null;
//   return undefined;
// };

// const readOptionalId = (value: unknown): number | undefined => {
//   if (typeof value === 'number' && Number.isFinite(value)) return value;
//   if (typeof value === 'string') {
//     const parsed = Number(value);
//     if (Number.isFinite(parsed)) return parsed;
//   }
//   return undefined;
// };

// const isProfileShape = (value: unknown): value is Record<string, unknown> =>
//   isRecord(value) && PROFILE_KEYS.some((key) => key in value);

// const normalizeCustomerProfile = (value: unknown): CustomerProfileInfo | null => {
//   if (!isProfileShape(value)) return null;

//   return {
//     ...value,
//     id: readOptionalId(value.id),
//     first_name: readOptionalString(value.first_name),
//     last_name: readOptionalString(value.last_name),
//     name: readOptionalString(value.name),
//     family: readOptionalString(value.family),
//     mobile: readOptionalString(value.mobile),
//     phone: readOptionalString(value.phone),
//     email: readOptionalString(value.email),
//     national_code: readOptionalString(value.national_code),
//     card_number: readOptionalString(value.card_number),
//     iban: readOptionalString(value.iban),
//     gender: readOptionalString(value.gender),
//     birthdate: readOptionalString(value.birthdate),
//     avatar: readOptionalString(value.avatar),
//     avatar_url: readOptionalString(value.avatar_url),
//     image: readOptionalString(value.image),
//     status: readOptionalString(value.status),
//     is_active: readOptionalBooleanLike(value.is_active),
//   };
// };

// const extractCustomerProfile = (raw: unknown): CustomerProfileInfo | null => {
//   const payload = unwrapApiPayload<unknown>(raw);

//   if (Array.isArray(payload)) {
//     return payload.length > 0 ? normalizeCustomerProfile(payload[0]) : null;
//   }

//   return normalizeCustomerProfile(payload);
// };

// const buildUpdatePayload = (
//   data: UpdateCustomerAccountPayload,
// ): Record<string, string> => {
//   const payload: Record<string, string> = {
//     first_name: data.first_name.trim(),
//     last_name: data.last_name.trim(),
//     email: data.email.trim(),
//     national_code: data.national_code.trim(),
//     card_number: data.card_number.trim(),
//     iban: data.iban.trim(),
//   };

//   if (typeof data.password === 'string' && data.password.trim()) {
//     payload.password = data.password;
//   }

//   return payload;
// };

// export const GetCustomerAccount = async (): Promise<CustomerProfileInfo> => {
//   const response = await Api.get<unknown>('/customer/profile/info');
//   return extractCustomerProfile(response.data) ?? {};
// };

// export const GetCustomerProfileSummary = async (): Promise<CustomerProfileInfo> => {
//   const response = await Api.get<unknown>('/customer/profile');
//   return extractCustomerProfile(response.data) ?? {};
// };

// export const UpdateCustomerAccount = async (
//   data: UpdateCustomerAccountPayload,
// ): Promise<UpdateCustomerAccountResult> => {
//   const response = await Api.put<unknown>('/customer/profile/update', buildUpdatePayload(data));
//   const raw = response.data;

//   return {
//     success: isRecord(raw) ? readApiSuccess(raw, true) : true,
//     message: isRecord(raw) && typeof raw.message === 'string' ? raw.message : undefined,
//     profile: extractCustomerProfile(raw),
//   };
// };
