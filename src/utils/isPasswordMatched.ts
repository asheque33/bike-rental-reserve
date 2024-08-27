import bcrypt from "bcrypt";
export const isPasswordMatched = async (
  plainPassword: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
