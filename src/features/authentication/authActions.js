// authActions.js
import axios from 'axios';
import toast from 'react-hot-toast';
import client from '../../api/index';
import Cookies from 'js-cookie';

const LOGIN_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/auth/login`;
const LOGOUT_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/auth/logout`;
const RESEND_OTP_API = `${process.env.REACT_APP_PUBLIC_API_URL}/api/auth/resend-otp`;

export const login = (username, password) => async (dispatch) => {
  let data = {
    email: username,
    password: password
  };
  try {
    // Make API request to login
    const response = await axios.post(LOGIN_API_ENDPOINT, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response, 'response');
    console.log(response, 'response');

    if (response?.data?.data?.otp_status) {
      const otp_data = { email: response?.data.data.email, token: response?.data?.data?.token };
      const expires = new Date(new Date().getTime + 10 * 60 * 1000);
      Cookies.set('otp_data', JSON.stringify(otp_data), { expires: expires });
      return { otp_status: response?.data?.data?.otp_status };
    }

    console.log(response?.data?.data?.token,'tokennnnn')
    // Store token and user data in localStorage
    localStorage.setItem('isAuthenticated', true);
    localStorage.setItem('token', response.data.data.token);
    localStorage.setItem('userData', JSON.stringify(response.data.data.user));
    localStorage.setItem('permissions', JSON.stringify(response.data.data.permissions));
    localStorage.setItem('loginTime', Date.now()); // Store login time in localStorage
    // Dispatch success action
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        token: response.data.data.token,
        userData: response.data.data.user,
        permissions: response.data.data.permissions
      }
    });

    window.location.replace('/');
    toast.success('Login Successful');
    return { success: true, message: 'Login successfully' };
  } catch (error) {
    // Dispatch failure action
    console.log(error, 'error');
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: error.response ? error.response.data.message : 'Failed to login'
    });
    toast.error(error?.response?.data?.message ? error?.response?.data?.message : 'Failed to login');
    return { success: false, message: 'Failed to login' };
  }
};

export const verifyOtp = (data) => async (dispatch) => {
  try {
    const otp_data = { otp: data.otp, email: data.email, token: data.token };

    const response = await client.auth.verify_otp(otp_data);

    localStorage.setItem('isAuthenticated', true);
    localStorage.setItem('token', response.data.data.token);
    localStorage.setItem('userData', JSON.stringify(response.data.data.user));
    localStorage.setItem('permissions', JSON.stringify(response.data.data.permissions));

    Cookies.remove('step');
    Cookies.remove('otp_data');

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        token: response.data.data.token,
        userData: response.data.data.user,
        permissions: response.data.data.permissions
      }
    });

    window.location.replace('/');
    toast.success('Login Successful');
    return { success: true, message: 'Login successfully' };
  } catch (error) {
    const message = error?.response?.data?.message ?? error.message;
    throw new Error(message);
  }
};

// Redux action to handle OTP resend
export const resendOtp = (email) => async (dispatch) => {
  try {
    const response = await axios.post(
      RESEND_OTP_API,
      { email },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (response?.data?.status) {
      toast.success('OTP resent successfully. Please check your email.');
      dispatch({ type: 'RESEND_OTP_SUCCESS' }); // Dispatch success action if needed
      return { success: true, message: 'OTP resent successfully' };
    } else {
      throw new Error(response?.data?.message || 'Failed to resend OTP');
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Failed to resend OTP');
    dispatch({ type: 'RESEND_OTP_FAILURE', payload: error.message }); // Dispatch failure action if needed
    return { success: false, message: 'Failed to resend OTP' };
  }
};

export const logout = () => async (dispatch) => {
  try {
    // Make API request to login
    const response = await axios.post(
      LOGOUT_API_ENDPOINT,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    console.log(response);
    if (response.data.status) {
      // Remove token and user ID from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      localStorage.removeItem('permissions');
      localStorage.removeItem('isAuthenticated');

      // Dispatch logout action
      dispatch({
        type: 'LOGOUT',
        payload: {
          message: response.data.message
        }
      });
      window.location.replace('/login');
      toast.success('Logout Successful');
    } else {
      // Handle unsuccessful logout response
      throw new Error(response.data.message || 'Logout failed');
    }
  } catch (error) {
    console.log(error, 'error');
    // Dispatch error action
    dispatch({
      type: 'LOGOUT_FAILURE',
      payload: error.response.data.message
    });
  }
};

const checkAutoLogout = () => {
  const loginTime = localStorage.getItem('loginTime'); // Get stored login time
  console.log(loginTime, 'loginTime');
  if (loginTime) {
    const elapsedTime = Date.now() - parseInt(loginTime, 10); // Calculate time passed since login
    const expirationTime = 24 * 60 * 60 * 1000; //
    console.log(expirationTime);
    if (elapsedTime >= expirationTime) {
      autoLogout();
    }
  }
};

const autoLogout = () => {
  localStorage.clear();
  window.location.replace('/login');
  toast.info('Session expired. Please log in again.');
};

// Check for session expiration when the page loads
window.addEventListener('load', checkAutoLogout);
setInterval(checkAutoLogout, 5 * 60 * 1000);
