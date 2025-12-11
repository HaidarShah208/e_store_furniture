export interface LoginValues {
    email: string;
    password?: string;
  }
  
  export interface RegisterValues {
    name: string;
    email: string;
    officer_id:string;
    password: string;
    password_confirmation: string;
  }
  
  export interface DeleteUserValues {
    email: string;
  }
  export interface ForgotPasswordRequest { 
    email: string;
  }
  
  export interface VerifyOtp {
    email: string;
    otp: string;
  }
  
  export interface ResetPasswordRequest {
    token: string;
    newPassword: string;
    confirmPassword: string;
  }
  