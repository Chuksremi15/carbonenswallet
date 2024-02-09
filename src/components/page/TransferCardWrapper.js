import React from "react";

export const TransferCardWrapper = ({ children, handleClose }) => {
  return (
    <div className="w-[375px] h-[600px]  backdrop-brightness-90  outline-0 relative transition duration-500  pb-8">
      <div onClick={handleClose} className="h-[70px]"></div>
      <div className="container border mx-auto max-w-sm pt-4  h-[530px] bg-[#fbfafd] rounded-t-lg flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};

export const NavCardWrapper = ({ children, handleClose }) => {
  return (
    <div className="w-[375px] h-[600px]  backdrop-brightness-90  outline-0 relative transition duration-500  pb-8">
      <div onClick={handleClose} className="h-[70px]"></div>
      <div className="container border mx-auto max-w-sm pt-4 h-[530px] bg-[#fbfafd] rounded-t-lg flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};

export const SettingsCardWrapper = ({ children, handleClose }) => {
  return (
    <div className="w-[375px] h-[600px] outline-0 relative transition duration-500  pb-8">
      <div className="container border mx-auto max-w-sm pt-4 h-full bg-white  relative">
        <div onClick={handleClose} className="absolute right-4 top-4">
          <div className="cancelOne"></div>
          <div className="cancelTwo"></div>
        </div>
        {children}
      </div>
    </div>
  );
};
