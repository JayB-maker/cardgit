import React, { useState, useEffect, useCallback } from "react";

const Countdown = ({
  initialTime = 60,
  onResendOtp,
}: {
  onResendOtp?: any;
  initialTime: number;
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isResendActive, setIsResendActive] = useState(false);

  useEffect(() => {
    let intervalId: any;

    if (timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setIsResendActive(true); // Activate resend button when timeLeft reaches 0
    }

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleResendOtp = () => {
    setTimeLeft(initialTime); // Reset the timer
    setIsResendActive(false); // Deactivate the resend button
    onResendOtp(); // Call the parent function to resend OTP
  };

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="otp-timer flex flex-col">
      <button
        onClick={handleResendOtp}
        disabled={!isResendActive}
        className={`btn bg-transparent text-sm text-center text-gray w-full `}
      >
        {isResendActive ? (
          <p>
            Didn’t receive code?{" "}
            <span className="text-primaryBlue">Resend</span>
          </p>
        ) : (
          <p>
            Didn’t receive code?{" "}
            <span className="text-primaryBlue">
              Resend in {formatTime(timeLeft)}
            </span>
          </p>
        )}
      </button>
    </div>
  );
};

export default Countdown;
