import { useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";
import { useTranslation } from "react-i18next";

export default function OtpVerifiedSuccessfully() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
      <div className="flex flex-col min-h-screen w-full max-w-md mx-auto">

        <div className="pt-4 pb-6  shrink-0">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>

            <span className="text-xl font-medium">{t('auth.otpVerified.title')}</span>
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center text-center">
          <h1 className="text-lg font-medium text-gray-800 dark:text-white mb-1">
            {t('auth.otpVerified.otpVerified')}
          </h1>
          <p className="text-sm text-primaryGray font-medium dark:text-gray-400">
          {t('auth.otpVerified.description')}
          </p>
        </div>

        <div className="mt-auto pt-8 pb-6">
          <Button
            buttonText={t('auth.otpVerified.done')}
            type="button"
            className="rounded-2xl w-full"
            onClick={() => navigate("/auth/login")}   
          />
        </div>

      </div>
  );
}
