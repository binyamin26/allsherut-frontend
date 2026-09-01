/**
 * Converts a stored provider phone number into the digits-only,
 * country-code-prefixed format required by wa.me links.
 *
 * Handles:
 *  - French local format:  0769451826        -> 33769451826
 *  - International w/ 00:  0033769451826     -> 33769451826
 *  - International w/ +:   +33769451826      -> 33769451826
 *  - Already formatted:    33769451826       -> 33769451826
 */
export function formatWhatsAppNumber(phone) {
  if (!phone) return '';

  let digits = phone.trim().replace(/[\s-]/g, '');

  if (digits.startsWith('+')) {
    digits = digits.slice(1);
  } else if (digits.startsWith('00')) {
    digits = digits.slice(2);
  } else if (digits.startsWith('0')) {
    digits = `33${digits.slice(1)}`;
  }

  return digits;
}
