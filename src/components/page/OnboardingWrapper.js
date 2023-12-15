import React from "react";

export const OnboardingWrapper = ({ children }) => {
  return (
    <div>
      <div className="container mx-auto px-4 py-6">
        <img className="h-10" src="/img/favicon.svg" />
      </div>

      {children}
    </div>
  );
};
