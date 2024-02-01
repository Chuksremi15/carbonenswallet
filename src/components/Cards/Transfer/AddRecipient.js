import React from "react";
import { TransferCardWrapper } from "../../page/TransferCardWrapper";
import { CardPrimaryButton, CardSecondaryButton } from "../../Buttons";
import { motion } from "framer-motion";
import { FramerScrollRight } from "../../utils/framer";

export const AddRecipient = ({ handleClose, pages, setPages, x, setX }) => {
  return (
    <motion.div
      key={"homeCard"}
      initial={{ y: 5 }}
      transition={{ duration: 0.5 }}
      animate={{ y: "0" }}
      exit={{ y: "0" }}
    >
      <TransferCardWrapper handleClose={handleClose}>
        <div className="font-body px-6">
          <label className="text-textPrimary text-sm">Add Recipient</label>
          <input
            className="w-full bg-white text-textPrimary  placeholder-[#b4b3df] font-body text-sm rounded py-3 px-4 focus:outline-none focus:ring-0 focus:border-[#e5dbf7] focus:bg-white"
            type={"public address or ENS"}
            placeholder="Public address or ENS"
            required
          />
        </div>

        <div className="bg-[#fbfafd] flex items-center justify-between gap-x-5 h-[94px] px-8 border-t border-[#e5dbf7]">
          <CardSecondaryButton
            disabled={false}
            action={handleClose}
            text={"Cancel"}
          />
          <CardPrimaryButton
            action={() => {
              FramerScrollRight(pages, setPages, setX);
            }}
            text={"Next"}
          />
        </div>
      </TransferCardWrapper>
    </motion.div>
  );
};
