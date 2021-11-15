export interface IEmailTemplate {
  id: number;
  templateName: string;
  category: string;
  contentHtml: string;
  contentJson: string;
  to: string;
  cc: string;
  bcc: string;
  subject: string;
  description: string;

  creationTime?: string;
  creatorUserId?: string;
  lastModificationTime?: string;
  lastModifierUserId?: string;
  active?: boolean;
  attachments?: any;
  inlineImages?: any;
}
