import React from "react";

export const DashboardWrapper = ({ children }) => {
  return (
    <div className="relative pt-10 h-[90vh] flex items-center justify-center">
      <div className="hidden md:absolute top-10 left-[10vh]">
        <img className="h-10" src="/img/favicon.svg" />
      </div>

      <div className="container h-[90vh] flex items-center justify-center mx-auto">
        {children}
      </div>
    </div>
  );
};
