// Environment configuration
export const env = {
  // Automatically select API URL based on build mode
  apiBaseUrl: import.meta.env.DEV 
    ? import.meta.env.VITE_API_BASE_URL_DEV || 'http://localhost:5000/api'
    : import.meta.env.VITE_API_BASE_URL_PROD || 'https://api.yourproductiondomain.com/api',
  appName: import.meta.env.VITE_APP_NAME || 'Furniture E-Commerce',
  enableLogging: import.meta.env.VITE_ENABLE_LOGGING === 'true',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;

// Helper function to log in development only
export const devLog = (...args: any[]) => {
  if (env.enableLogging && env.isDevelopment) {
    console.log(...args);
  }
};

// Helper function to get API endpoint
export const getApiUrl = (endpoint: string) => {
  return `${env.apiBaseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};
