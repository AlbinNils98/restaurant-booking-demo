import crypto from 'crypto';

export default function generateConfirmationCode() {
  // Generate a random 6-character alphanumeric code:
  return crypto.randomBytes(3).toString('hex').toUpperCase();
}
