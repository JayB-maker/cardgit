"use server";

import API_CONFIG from "../../config/apiConfig";
import APP_CONFIG from "../../config/appConfig";
import { getSession } from "../util";
import jwt from "jsonwebtoken";

export async function doSignUp(signUpData: {
  full_name?: string;
  email: string;
  password?: string;
  confirm_password?: string;
  registration_type: string;
}) {
  try {
    // Prepare the request
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...signUpData, // Pass the object directly
      }),
    };

    const response = await fetch(API_CONFIG.SIGNUP, requestOptions);

    const signUpResponse = await response.json();

    if (signUpResponse.isSuccess) {
      return {
        data: signUpResponse,
        message: signUpResponse?.message ?? "Successful",
        status: "success",
      };
    } else {
      return {
        data: signUpResponse,
        message: signUpResponse?.message ?? "Error occurred, please try again",
        status: "error",
      };
    }
  } catch (error) {
    return {
      data: error,
      message: "Network error, please try again later.",
      status: "error",
    };
  }
}
export async function doForgotPassword(forgotPasswordData: { email: string }) {
  try {
    // Prepare the request
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...forgotPasswordData, // Pass the object directly
      }),
    };

    const response = await fetch(API_CONFIG.FORGOT_PASSWORD, requestOptions);

    const forgotPasswordResponse = await response.json();

    if (forgotPasswordResponse.isSuccess) {
      return {
        data: forgotPasswordResponse,
        message: forgotPasswordResponse?.message ?? "Successful",
        status: "success",
      };
    } else {
      return {
        data: forgotPasswordResponse,
        message:
          forgotPasswordResponse?.message ?? "Error occurred, please try again",
        status: "error",
      };
    }
  } catch (error) {
    return {
      data: error,
      message: "Network error, please try again later.",
      status: "error",
    };
  }
}

export async function doResetPassword(resetPasswordData: {
  code: string;
  password: string;
  confirm_password: string;
}) {
  try {
    // Prepare the request
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...resetPasswordData, // Pass the object directly
      }),
    };

    const response = await fetch(API_CONFIG.RESET_PASSWORD, requestOptions);

    const resetPasswordResponse = await response.json();

    if (resetPasswordResponse.isSuccess) {
      return {
        data: resetPasswordResponse,
        message: resetPasswordResponse?.message ?? "Successful",
        status: "success",
      };
    } else {
      return {
        data: resetPasswordResponse,
        message:
          resetPasswordResponse?.message ?? "Error occurred, please try again",
        status: "error",
      };
    }
  } catch (error) {
    return {
      data: error,
      message: "Network error, please try again later.",
      status: "error",
    };
  }
}

export async function activateAccount(activationData: {
  id?: string;
  code?: string;
}) {
  try {
    // Prepare the request
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...activationData, // Pass the object directly
      }),
    };

    const response = await fetch(API_CONFIG.ACTIVATE_ACCOUNT, requestOptions);

    const activateResponse = await response.json();

    if (activateResponse.isSuccess) {
      return {
        data: activateResponse,
        message: activateResponse?.message ?? "Successful",
        status: "success",
      };
    } else {
      return {
        data: activateResponse,
        message:
          activateResponse?.message ?? "Error occurred, please try again",
        status: "error",
      };
    }
  } catch (error) {
    return {
      data: error,
      message: "Network error, please try again later.",
      status: "error",
    };
  }
}

export async function validateOTP(validationData: {
  profile_id?: string;
  code?: string;
}) {
  try {
    // Prepare the request
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...validationData, // Pass the object directly
      }),
    };

    const response = await fetch(API_CONFIG.VALIDATE_OTP, requestOptions);

    const validationResponse = await response.json();

    if (validationResponse.isSuccess) {
      return {
        data: validationResponse,
        message: validationResponse?.message ?? "Successful",
        status: "success",
      };
    } else {
      return {
        data: validationResponse,
        message:
          validationResponse?.message ?? "Error occurred, please try again",
        status: "error",
      };
    }
  } catch (error) {
    return {
      data: error,
      message: "Network error, please try again later.",
      status: "error",
    };
  }
}

export async function resendCode(resendCodeData: { profile_id?: string }) {
  try {
    // Prepare the request
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...resendCodeData, // Pass the object directly
      }),
    };

    const response = await fetch(API_CONFIG.RESEND_CODE, requestOptions);

    const resendCodeResponse = await response.json();

    if (resendCodeResponse.isSuccess) {
      return {
        data: resendCodeResponse,
        message: resendCodeResponse?.message ?? "Successful",
        status: "success",
      };
    } else {
      return {
        data: resendCodeResponse,
        message:
          resendCodeResponse?.message ?? "Error occurred, please try again",
        status: "error",
      };
    }
  } catch (error) {
    return {
      data: error,
      message: "Network error, please try again later.",
      status: "error",
    };
  }
}

export async function resendCardgitCode(resendCardgitCodeData: { profile_id?: string }) {
  try {
    // Prepare the request
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...resendCardgitCodeData, // Pass the object directly
      }),
    };

    const response = await fetch(API_CONFIG.RESEND_CARDGIT_CODE, requestOptions);

    const resendCardgitCodeResponse = await response.json();

    if (resendCardgitCodeResponse.isSuccess) {
      return {
        data: resendCardgitCodeResponse,
        message: resendCardgitCodeResponse?.message ?? "Successful",
        status: "success",
      };
    } else {
      return {
        data: resendCardgitCodeResponse,
        message:
          resendCardgitCodeResponse?.message ?? "Error occurred, please try again",
        status: "error",
      };
    }
  } catch (error) {
    return {
      data: error,
      message: "Network error, please try again later.",
      status: "error",
    };
  }
}

export async function doSignIn(signinData: {
  email: string;
  password?: string;
  registration_type: string;
}) {
  try {
    // Prepare the request
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...signinData, // Pass the object directly
      }),
    };

    const response = await fetch(
      signinData?.registration_type === "Google"
        ? API_CONFIG.GOOGLE_SIGNIN
        : API_CONFIG.SIGNIN,
      requestOptions
    );

    const jsonResponse = await response.json();

    if (jsonResponse.isSuccess) {
      const session = await getSession();
      const loginData = jsonResponse;

      // Decode the token to extract user details
      const decodedToken: any = jwt.decode(loginData.token);

      if (decodedToken && typeof decodedToken === "object") {
        // Save token and user data to session
        session.accessToken = loginData.token;
        session.isVerified = loginData.isVerified;
        session.email = decodedToken.data.email;
        session.profile_id = decodedToken?.data?.profile_id;
        session.first_name = decodedToken?.data?.first_name;
        session.last_name = decodedToken?.data?.last_name;
        session.roles = decodedToken?.data?.roles;
        session.company_id = decodedToken?.data?.company_id;
        session.is_company_admin = decodedToken?.data?.is_company_admin;
        session.is_cardgit_admin = decodedToken?.data?.is_cardgit_admin;
        session.is_profile_updated = decodedToken?.data?.is_profile_updated;
        session.is_subscribed = decodedToken?.data?.is_subscribed;
        session.is_renewalRequired = decodedToken?.data?.is_renewalRequired;
      }

      // //Set access token
      // session.accessToken = loginData.token;
      // session.isVerified = loginData.isVerified;

      //set profile status
      session.isLoggedIn = true;

      await session.save();

      return {
        decodedToken,
        data: jsonResponse,
        message: jsonResponse?.message ?? "Successful",
        status: "success",
      };
    } else {
      return {
        data: jsonResponse,
        message: jsonResponse?.message ?? "Error occurred, please try again",
        status: "error",
      };
    }
  } catch (error) {
    return {
      data: error,
      message: "Network error, please try again later.",
      status: "error",
    };
  }
}

export async function getProfile() {
  const currentSession = await getSession();

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    Authorization: ` Bearer ${currentSession.accessToken}`,
    //   body: JSON.stringify(validatedFields.data),
  };

  const profileResponse = await fetch(
    `${APP_CONFIG.BASE_URL}/profile`,
    requestOptions
  );
  const profileJsonResponseData = await profileResponse.json();

  if (profileResponse.status == 200) {
    const session = await getSession();
    const profileData = profileJsonResponseData.data;
    const user = profileData;

    //Set access token

    //Set other user details
    session.profile_id = user.profile_id;
    session.email = user.email;
    session.first_name = user.first_name;
    session.last_name = user.last_name;
    session.roles = user.roles;
    session.company_id = user.company_id;
    session.is_company_admin = user.is_company_admin;
    session.is_profile_updated = user.is_profile_updated;
    session.is_cardgit_admin = user.is_cardgit_admin;
    session.is_subscribed = user.is_subscribed;
    session.is_renewalRequired = user.is_renewalRequired;

    await session.save();

    return {
      message: "Sucessfull",
      status: "success",
    };
  } else {
    return {
      message:
        profileJsonResponseData.message ?? "Error occurred, please try again",
      status: "error",
    };
  }
}
