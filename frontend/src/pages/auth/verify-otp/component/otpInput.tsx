import { useRef, useState } from "react";

export const OTPInput = ({ setOtp2 }: { setOtp2: React.Dispatch<React.SetStateAction<string[]>> }) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [otp, setOtp] = useState(Array(4).fill(""));
    const handleChange = (value: string, index: number) => {
      if (!/^\d?$/.test(value)) return;
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setOtp2(newOtp);
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    };
  
    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      index: number
    ) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    };
  
    return (
      <div className="flex gap-2">
        {otp.map((digit, i) => (
          <input
            key={i}
            type="text"
            inputMode="numeric"
            maxLength={1}
            className="w-16 h-16 text-center  border-b border-primary focus:outline-none "
            value={digit}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
          />
        ))}
      </div>
    );
  };