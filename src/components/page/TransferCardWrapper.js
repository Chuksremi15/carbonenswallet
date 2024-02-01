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
