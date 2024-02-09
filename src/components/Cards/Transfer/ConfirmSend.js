import React from "react";
import { TransferCardWrapper } from "../../page/TransferCardWrapper";
import { CardPrimaryButton, CardSecondaryButton } from "../../Buttons";
import { motion } from "framer-motion";
import { FramerScrollLeft } from "../../utils/framer";

export const ConfirmSend = ({ handleClose, pages, setPages, x, setX }) => {
  return (
    <motion.div
      key={"homeCard"}
      initial={{ x: 5 }}
      transition={{ duration: 0.1 }}
      animate={{ x: "0" }}
      exit={{ x: "-10%" }}
    >
      <TransferCardWrapper handleClose={handleClose}>
        <div className="flex flex-col h-full">
          <div className="font-body px-6 pb-7 relative border-b border-[#e5dbf7]">
            <label className="text-textPrimary text-sm">Confirm send to</label>
            <div className="flex items-center justify-items-center gap-x-4 mt-1">
              <div className="bg-white rounded-full p-0.5">
                <img className="w-7" src="/img/icons/addressicon.svg" />
              </div>
              <p className="text-[15px] text-textPrimary font-body">
                0X84b...ccb49
              </p>
            </div>
          </div>
          <div className="grid grid-rows-4 h-full">
            <div className="border-b border-[#e5dbf7] px-6  flex justify-between items-center justify-items-center">
              <p className="text-sm text-textPrimary">Network</p>
              <p className="text-sm text-textPrimary font-light">
                Main Ethereum Network
              </p>
            </div>
            <div className="border-b border-[#e5dbf7] px-6  flex justify-between items-center justify-items-center">
              <p className="text-sm text-textPrimary">Amount</p>
              <div className="text-right">
                <p className="text-sm text-textPrimary font-light">$30.69</p>
                <p className="text-xs text-[#b4b3df] font-light">0.00475 ETH</p>
              </div>
            </div>
            <div className="border-b border-[#e5dbf7] px-6  flex justify-between items-center justify-items-center">
              <p className="text-sm text-textPrimary">Gas fee</p>
              <div className="text-right">
                <p className="text-sm text-textPrimary font-light">$30.69</p>
                <p className="text-xs text-[#b4b3df] font-light">0.00475 ETH</p>
              </div>
            </div>
            <div className=" px-6 flex justify-between items-center justify-items-center">
              <p className="text-sm text-textPrimary">Total</p>
              <div className="text-right">
                <p className="text-sm text-textPrimary font-light">$30.69</p>
                <p className="text-xs text-[#b4b3df] font-light">0.00475 ETH</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#fbfafd] flex items-center justify-between gap-x-5 h-[94px] px-8 border-t border-[#e5dbf7]">
          <CardSecondaryButton
            action={() => FramerScrollLeft(pages, setPages, setX)}
            disabled={false}
            text={"Reject"}
          />
          <CardPrimaryButton text={"Confirm"} />
        </div>
      </TransferCardWrapper>
    </motion.div>
  );
};
