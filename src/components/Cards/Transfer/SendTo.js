import React from "react";
import { TransferCardWrapper } from "../../page/TransferCardWrapper";
import { CardPrimaryButton, CardSecondaryButton } from "../../Buttons";
import { motion } from "framer-motion";
import { FramerScrollLeft, FramerScrollRight } from "../../utils/framer";

export const SendTo = ({ handleClose, pages, setPages, x, setX }) => {
  return (
    <motion.div
      key={"homeCard"}
      initial={{ x: 5 }}
      transition={{ duration: 0.1 }}
      animate={{ x: "0" }}
      exit={{ x: "-10%" }}
    >
      <TransferCardWrapper handleClose={handleClose}>
        <div className="flex flex-col gap-y-5">
          <div className="font-body px-6 relative">
            <label className="text-textPrimary text-sm">Send To</label>
            <input
              className="w-full bg-white text-textPrimary placeholder-[#b4b3df]  font-body text-sm rounded py-3 pl-[42px] focus:outline-none focus:ring-0 focus:border-[#e5dbf7] focus:bg-white"
              type={"public address or ENS"}
              placeholder="Public address or ENS"
              required
            />
            <img
              className="top-[38px] left-[38px] absolute"
              src="/img/icons/tick.svg"
            />
          </div>
          <div className="font-body px-6 relative">
            <div className="flex justify-between">
              <label className="text-textPrimary text-sm">Asset</label>
              <label className="text-xs text-[#b4b3df]">
                Ethereum Main Network
              </label>
            </div>
            <input
              className="w-full bg-white text-textPrimary placeholder-textPrimary  font-body text-sm rounded py-3 pl-3 focus:outline-none focus:ring-0 focus:border-[#e5dbf7] focus:bg-white"
              type={"text"}
              placeholder="0.95 ETH available"
              required
            />
            <img
              className="top-[27px] right-[38px] absolute"
              src="/img/icons/arrowdown.svg"
            />
          </div>
          <div className="font-body px-6 grid grid-cols-9 gap-x-4">
            <div className="relative col-span-5 flex flex-col gap-y-0 ">
              <label className="text-textPrimary text-sm">Amount</label>
              <input
                className="w-full bg-white text-textPrimary placeholder-[#b4b3df]  font-body text-sm rounded py-3 pl-3 focus:outline-none focus:ring-0 focus:border-[#e5dbf7] focus:bg-white"
                type={"text"}
                placeholder="0.0000"
                required
              />
              <div className="top-[37px] right-[15px] absolute text-[#b4b3df] text-xs">
                ETH
              </div>
            </div>
            <div className="relative col-span-4 flex flex-col gap-y-1 ">
              <label className="text-[#b4b3df] text-xs place-self-end">
                Send maximum
              </label>
              <input
                className="w-full bg-white text-textPrimary placeholder-[#b4b3df]  font-body text-sm rounded py-3 pl-3 focus:outline-none focus:ring-0 focus:border-[#e5dbf7] focus:bg-white"
                type={"text"}
                placeholder="0.00"
                required
              />
              <div className="top-[37px] right-[15px] absolute text-[#b4b3df] text-xs">
                USD
              </div>
            </div>
          </div>
          <div className="font-body px-6 relative flex flex-col gap-y-2">
            <label className="text-textPrimary text-sm">Transaction fee</label>
            <input
              className="w-full bg-white text-textPrimary placeholder-[#b4b3df]  font-body text-sm rounded py-3 pl-3 focus:outline-none focus:ring-0 focus:border-[#e5dbf7] focus:bg-white"
              type={"text"}
              placeholder="$0.40"
              required
            />
          </div>
        </div>

        <div className="bg-[#fbfafd] flex items-center justify-between gap-x-5 h-[94px] px-8 border-t border-[#e5dbf7]">
          <CardSecondaryButton
            action={() => FramerScrollLeft(pages, setPages, setX)}
            disabled={false}
            text={"Back"}
          />
          <CardPrimaryButton
            action={() => FramerScrollRight(pages, setPages, setX)}
            text={"Next"}
          />
        </div>
      </TransferCardWrapper>
    </motion.div>
  );
};
