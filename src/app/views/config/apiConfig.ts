import APP_CONFIG from "./appConfig";

const API_CONFIG = {
  /* Auth */
  SIGNUP: `${APP_CONFIG.BASE_URL}/profile/register`,
  FORGOT_PASSWORD: `${APP_CONFIG.BASE_URL}/profile/forgotpassword`,
  RESET_PASSWORD: `${APP_CONFIG.BASE_URL}/profile/resetpassword`,
  ACTIVATE_ACCOUNT: `${APP_CONFIG.BASE_URL}/profile/activate`,
  VALIDATE_OTP: `${APP_CONFIG.BASE_URL}/profile/validatetoken`,
  RESEND_CODE: `${APP_CONFIG.BASE_URL}/profile/resendcode`,
  RESEND_CARDGIT_CODE: `${APP_CONFIG.BASE_URL}/profile/resendcardgitcode`,
  SIGNIN: `${APP_CONFIG.BASE_URL}/profile/login`,
  GOOGLE_SIGNIN: `${APP_CONFIG.BASE_URL}/profile/googlelogin`,
};

export default API_CONFIG;
