export const USER_ROLE = {
  admin: "admin",
  user: "user",
} as const;
export type TUser_Role = keyof typeof USER_ROLE;
