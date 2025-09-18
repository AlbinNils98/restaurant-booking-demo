import path from 'path';
import fs from 'fs';

export enum EmailTemplate {
  CONFIRMATION = 'CONFIRMATION',
  CONTACT = 'CONTACT',
}

type TemplateVariablesMap = {
  [EmailTemplate.CONFIRMATION]: {
    firstName: string;
    lastName: string;
    confirmationCode: string;
    arrival: string;
    partySize: number;
    restaurantName: string;
  };
  [EmailTemplate.CONTACT]: {
    name: string;
    email: string;
    message: string;
  };
}

export function getTemplate<T extends EmailTemplate>(templateType: T, variables: TemplateVariablesMap[T]): string {

  const templateMap: Record<EmailTemplate, string> = {
    [EmailTemplate.CONFIRMATION]: 'confirmation.html',
    [EmailTemplate.CONTACT]: 'contact.html'
  };

  const fileName = templateMap[templateType];

  if (!fileName) {
    throw new Error(`Template ${templateType} not found`);
  }

  const templatePath = path.join(__dirname, 'templates', fileName);
  let html = fs.readFileSync(templatePath, 'utf-8');

  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    html = html.replace(regex, String(value));
  }

  return html;
}