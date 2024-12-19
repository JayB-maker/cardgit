export enum AppConfig {
  dev = "dev",
  staging = "staging",
  prod = "prod"
}

const APP_CONFIG = {
  SESSION_SECRET: process.env.NEXT_APP_SESSION_SECRET!!,
  APP_ENV: process.env.NEXT_APP_APP_ENV!!,
  BASE_URL: process.env.NEXT_APP_API_BASE_URL!!
};

export default APP_CONFIG;
