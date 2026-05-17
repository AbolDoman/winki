export interface ContactSubmitRequest {
  name: string;
  mobile: string;
  email?: string;
  subject?: string;
  message: string;
}

export interface ContactSubmitResponse {
  success: boolean;
  message: string;
}

export interface NewsletterSubscribeRequest {
  email: string;
}

export interface NewsletterSubscribeResponse {
  success: boolean;
  message: string;
}
