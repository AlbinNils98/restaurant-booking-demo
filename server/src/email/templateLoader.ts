import path from 'path';
import fs from 'fs';

export enum EmailTemplate {
  CONFIRMATION = 'CONFIRMATION',
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
}

export function getTemplate<T extends EmailTemplate>(templateType: T, variables: TemplateVariablesMap[T]): string {

  const templateMap: Record<EmailTemplate, string> = {
    [EmailTemplate.CONFIRMATION]: 'confirmation.html',
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