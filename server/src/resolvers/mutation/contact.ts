import sendEmail from '@/email/emailService';
import { EmailTemplate, getTemplate } from '@/email/templateLoader';
import { MutationResolvers } from '@/generated/graphql';
import { GraphQLContext } from '@/graphql/context';
import validateEmail from '@/util/validateEmail';
import { GraphQLError } from 'graphql';

export const contactMutationResolvers: MutationResolvers<GraphQLContext> = {
  sendContactEmail: async (_, { name, email, message }, { }) => {
    if (!validateEmail(email)) throw new GraphQLError('Invalid email format');
    if (!name.length) throw new GraphQLError('Name must contain at least one character');
    if (name.length > 32) throw new GraphQLError('Name cannot contain more than 32 characters');
    if (!message.length) throw new GraphQLError('Message must contain at least one character')
    if (message.length > 1000) throw new GraphQLError('Message cannot contain more than 1000 characters');

    const supportEmail = process.env.SUPPORT_EMAIL ?? '';

    await sendEmail(
      supportEmail,
      "New contact message",
      confirmationMessage({
        name,
        email,
        message
      }),
      getTemplate(EmailTemplate.CONTACT, {
        name,
        email,
        message,
      })
    ).catch(() => {
      throw new GraphQLError(
        "Failed to send email. Try again later or call the restaurant directly."
      );
    });
    return true;
  },
}

const confirmationMessage = ({
  name,
  email,
  message
}: {
  name: string,
  email: string,
  message: string
}) => `
${name} has made contact!,

${message}

Reply to: ${email}

This email was generated from your website contact form.
`;