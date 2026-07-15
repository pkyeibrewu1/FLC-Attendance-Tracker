import bcrypt from 'bcrypt';

export async function hashPassword(password) {
  if (typeof password !== 'string' || password.length === 0) {
    return password;
  }

  if (password.startsWith('$2')) {
    return password;
  }

  return bcrypt.hash(password, 10);
}

export async function comparePassword(plainPassword, hashedPassword) {
  if (!plainPassword || !hashedPassword) {
    return false;
  }

  return bcrypt.compare(plainPassword, hashedPassword);
}
