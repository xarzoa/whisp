import crypto from 'crypto'

export function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

export function getStranger(match, user) {
  if (match.user_one === user.id) {
    return match.user_two;
  }
  return match.user_one;
}