import bcrypt from "bcrypt";

export function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export async function comparePasswords(password: string, encrypted: string) {
  return await bcrypt.compare(password, encrypted);
}
