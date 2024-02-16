import React, { useState } from "react";
import { TransferCardWrapper } from "../../page/TransferCardWrapper";
import { CardPrimaryButton, CardSecondaryButton } from "../../Buttons";
import { motion } from "framer-motion";
import { FramerScrollRight } from "../../utils/framer";
import { isAddress } from "ethers";

export const AddRecipient = ({
  handleClose,
  pages,
  setPages,
  x,
  setX,
  recipient,
  setRecipient,
}) => {
  const [error, setError] = useState("");
  const handleOnChange = (e) => {
    if (!isAddress(e)) {
      setError("Enter a valid address");
      setRecipient(e);
    } else {
      setRecipient(e);
      setError("");
    }
  };
  return (
    <motion.div
      key={"homeCard"}
      initial={{ y: 5 }}
      transition={{ duration: 0.1 }}
      animate={{ y: "0" }}
      exit={{ y: "0" }}
    >
      <TransferCardWrapper handleClose={handleClose}>
        <div className="font-body px-6">
          <label className="text-textPrimary text-sm">Add Recipient</label>
          <input
            className="w-full bg-white text-textPrimary font-light  placeholder-[#b4b3df] placeholder:font-light font-body text-sm rounded py-3 px-4 focus:outline-none focus:ring-0 focus:border-[#e5dbf7] focus:bg-white"
            onChange={(e) => handleOnChange(e.target.value)}
            type={"public address or ENS"}
            placeholder="Public address or ENS"
            value={recipient}
            required
          />
          {error && (
            <p className="text-sm text-red-500 font-body font-light mt-2">
              {error}
            </p>
          )}
        </div>

        <div className="bg-bggray flex items-center justify-between gap-x-5 h-[94px] px-8 border-t border-[#e5dbf7]">
          <CardSecondaryButton
            disabled={false}
            action={handleClose}
            text={"Cancel"}
          />
          <CardPrimaryButton
            disabled={error || recipient === ""}
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
