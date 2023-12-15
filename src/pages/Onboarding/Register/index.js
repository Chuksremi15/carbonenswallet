import React from "react";
import { OnboardingWrapper } from "../../../components/page/OnboardingWrapper";

const Register = () => {
  return (
    <OnboardingWrapper>
      <div className="max-w-[400px] h-[70vh] mx-auto p-5 border rounded text-center grid grid-rows-5">
        <img
          onClick={handleClose}
          className="cursor-pointer"
          src="/img/icons/arrowleft.svg"
        />
      </div>
    </OnboardingWrapper>
  );
};

export default Register;
