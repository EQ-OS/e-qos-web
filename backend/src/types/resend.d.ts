// src/types/resend.d.ts
declare module 'resend' {
  export interface CreateEmailResponse {
    id: string;
  }

  export interface ErrorResponse {
    message: string;
    name: string;
  }

  export interface SendEmailOptions {
    from: string;
    to: string | string[];
    subject: string;
    html?: string;
    text?: string;
    replyTo?: string;
    cc?: string | string[];
    bcc?: string | string[];
    attachments?: Array<{
      filename?: string;
      content?: string | Buffer;
      path?: string;
    }>;
  }

  export interface Emails {
    send(options: SendEmailOptions): Promise<{
      data: CreateEmailResponse | null;
      error: ErrorResponse | null;
    }>;
  }

  export class Resend {
    constructor(apiKey: string);
    emails: Emails;
  }

  export default Resend;
}