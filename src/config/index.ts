import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASSWORD,
  jwt_access_private_key: process.env.JWT_ACCESS_PRIVATE_KEY,
  jwt_access_key_expires_in: process.env.JWT_ACCESS_KEY_EXPIRES_IN,
  jwt_refresh_private_key: process.env.JWT_REFRESH_PRIVATE_KEY,
  jwt_refresh_key_expires_in: process.env.JWT_REFRESH_KEY_EXPIRES_IN,
};
