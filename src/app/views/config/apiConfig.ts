import APP_CONFIG from "./appConfig";

const API_CONFIG = {
  /* Auth */
  SIGNUP: `${APP_CONFIG.BASE_URL}/profile/register`,
  ACTIVATE_ACCOUNT: `${APP_CONFIG.BASE_URL}/profile/activate`,
  SIGNIN: `${APP_CONFIG.BASE_URL}/profile/login`,
  GOOGLE_SIGNIN: `${APP_CONFIG.BASE_URL}/profile/googlelogin`,
};

export default API_CONFIG;
