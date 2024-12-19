import { SessionOptions } from "iron-session";
import { AppConfig } from "../config/appConfig";
import APP_CONFIG from "../config/appConfig";

export interface SessionData {
  accessToken?: string;
  profile_id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  roles?: [string];
  company_id?: string;
  isLoggedIn: boolean;
  is_company_admin?: boolean;
  is_cardgit_admin?: boolean;
  is_subscribed?: boolean;
  is_renewalRequired?: boolean;

  //Settings
  isVerified: boolean;
  is_profile_updated: boolean;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
  accessToken: "",
  isVerified: false,
  is_profile_updated: false,
};

export const sessionOptions: SessionOptions = {
  // You need to create a secret key at least 32 characters long.
  password: APP_CONFIG.SESSION_SECRET,
  cookieName: "cardgit-session",
  cookieOptions: {
    httpOnly: true,
    // Secure only works in `https` environments. So if the environment is `https`, it'll return true.
    secure: APP_CONFIG.APP_ENV === AppConfig.prod,
  },
};
