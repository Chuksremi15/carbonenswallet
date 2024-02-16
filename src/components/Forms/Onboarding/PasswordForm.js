import React, { useState } from "react";
import { motion } from "framer-motion";
import { PrimaryButton } from "../../Buttons";
import { FramerScrollLeft, FramerScrollRight } from "../../utils/framer";
import zxcvbn from "zxcvbn";

export const PasswordForm = ({ pages, setPages, x, setX }) => {
  const PASSWORD_MIN_LENGTH = 8;
  const [passwordStrength, setPasswordStrength] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const getPasswordStrengthLabel = (isTooShort, score) => {
    if (isTooShort) {
      return {
        className: "text-red-500 text-sm text-left  font-normal font-body",
        dataTestId: "short-password-error",
        text: "passwordNotLongEnough",
        description: "",
      };
    }
    if (score >= 4) {
      return {
        className: "text-green-500 text-sm text-left  font-normal font-body",
        dataTestId: "strong-password",
        text: "strong",
        description: "",
      };
    }
    if (score === 3) {
      return {
        className: "text-yellow-500 text-sm text-left  font-normal font-body",
        dataTestId: "average-password",
        text: "average",
        description: "passwordStrengthDescription",
      };
    }
    return {
      className: "text-red-500 text-sm text-left  font-normal font-body",
      dataTestId: "weak-password",
      text: "weak",
      description: "passwordStrengthDescription",
    };
  };

  const handlePasswordChange = (passwordInput) => {
    const isTooShort =
      passwordInput.length && passwordInput.length < PASSWORD_MIN_LENGTH;

    const { score } = zxcvbn(passwordInput);

    const passwordStrengthLabel = getPasswordStrengthLabel(isTooShort, score);

    const passwordStrengthComponent = (
      <div className="flex flex-col gap-y-1">
        <p key={score} className={passwordStrengthLabel.className}>
          {passwordStrengthLabel.text === "passwordNotLongEnough" &&
            "password is too short"}
          {passwordStrengthLabel.text === "strong" &&
            "password strength is strong"}
          {passwordStrengthLabel.text === "average" &&
            "password strength is average"}
          {passwordStrengthLabel.text === "weak" && "password strength is weak"}
        </p>

        {passwordStrengthLabel.text !== "strong" && (
          <p className="text-textLight text-xs text-left  font-normal font-body">
            A strong password can improve the security of your wallet should
            your device be stolen or compromised.
          </p>
        )}
      </div>
    );

    setPasswordStrength(passwordStrengthComponent);

    if (passwordInput.length > PASSWORD_MIN_LENGTH) {
      setPassword(passwordInput);
    }
  };

  const handleConfirmPasswordChange = (confirmPasswordInput) => {
    if (confirmPasswordInput !== password) {
      setConfirmPasswordError("Password does not match");
    } else {
      setConfirmPasswordError("");
      localStorage.setItem("password", password);
    }
  };

  return (
    <motion.div
      key={"registerForm"}
      initial={{ x: 5 }}
      transition={{ duration: 0.1 }}
      animate={{ x: "0" }}
      exit={{ x: x }}
      className="w-[375px] h-[600px]  mx-auto p-5 border rounded text-center grid grid-rows-[10] relative"
    >
      <div className=" h-[100px] top-0 p-4">
        <img
          onClick={() => {
            FramerScrollLeft(pages, setPages, setX);
          }}
          className="cursor-pointer"
          src="/img/icons/arrowleft.svg"
        />
      </div>
      <div className="h-[400px] flex flex-col gap-y-6">
        <div className="flex-col gap-y-4">
          <h3 className="font-body text-2xl font-semibold text-textPrimary">
            Create a password
          </h3>
          <h3 className="font-head text-sm  text-textLight mt-2">
            You will use this to unlock your wallet
          </h3>
        </div>
        <div className="flex flex-col gap-y-3 ">
          <div className="text-left flex flex-col gap-y-1">
            <input
              className="w-full border placeholder-[#b4b3df] text-sm font-body rounded py-3 px-4 focus:outline-none focus:ring-0 focus:border-primary focus:bg-white"
              onChange={(e) => handlePasswordChange(e.target.value)}
              type={"password"}
              placeholder="Password"
              required
            />
            {passwordStrength && passwordStrength}
          </div>
          <div className="text-left flex flex-col gap-y-1">
            <input
              className="w-full border placeholder-[#b4b3df] text-sm  font-body rounded py-3 px-4 focus:outline-none focus:ring-0 focus:border-primary focus:bg-white"
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              type={"password"}
              placeholder="Confirm password"
              required
            />

            {confirmPasswordError && (
              <p className="text-red-500 text-sm text-left  font-normal font-body">
                {confirmPasswordError}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="h-[100px] bottom-0 w-full ">
        <PrimaryButton
          action={() => {
            FramerScrollRight(pages, setPages, setX);
          }}
          disabled={confirmPasswordError || password === ""}
          text={"Continue"}
        />
      </div>
    </motion.div>
  );
};
