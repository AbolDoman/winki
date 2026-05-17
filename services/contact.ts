import Api from '@/lib/axios';
import type { ContactSubmitRequest, ContactSubmitResponse } from '@/types/contact/contracts';

type LegacyContactSubject = {
  id: number;
  name: string;
};

type LegacyContactSubjectsResponse = {
  data?: LegacyContactSubject[];
  message?: string;
  success?: boolean;
};

export const getContactSubjects = async (): Promise<LegacyContactSubjectsResponse> => {
  const result = await Api.get<LegacyContactSubjectsResponse>('/contact/subjects').then(
    (response) => response.data,
  );
  return result;
};

export interface SubmitContactMessagePayload {
  subject_id: number;
  name: string;
  email: string;
  phone?: string;
  order_number?: string;
  message: string;
}

export const submitContactMessage = async (
  data: SubmitContactMessagePayload,
): Promise<ContactSubmitResponse> => {
  const payload: ContactSubmitRequest = {
    name: data.name,
    mobile: data.phone ?? '',
    ...(data.email ? { email: data.email } : {}),
    ...(data.subject_id ? { subject: String(data.subject_id) } : {}),
    message: data.message,
  };

  const result = await Api.post<ContactSubmitResponse>('/contact', payload).then(
    (response) => response.data,
  );

  return result;
};
