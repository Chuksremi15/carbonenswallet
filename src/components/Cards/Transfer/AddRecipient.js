import React, { useEffect, useState } from "react";
import { TransferCardWrapper } from "../../page/TransferCardWrapper";
import { CardPrimaryButton, CardSecondaryButton } from "../../Buttons";
import { motion } from "framer-motion";
import { FramerScrollRight } from "../../utils/framer";
import { isAddress } from "ethers";
import { createWalletClient, createPublicClient, custom, http } from "viem";
import { mainnet, sepolia } from "viem/chains";
import { CircularProgress } from "@material-ui/core";
import useDebounce from "../../../hooks/UseDebounce";

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
  const [ensAddress, setEnsAddress] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [callDounced, setCallDounced] = useState(false);
  const [currentValue, debouncedValue, setValue] = useDebounce(inputValue, 500);

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(
      `https://eth-sepolia.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}`
    ),
  });

  const handleOnChange = async (e) => {
    setInputValue(e);
    if (!isAddress(e)) {
      setValue(e);
      setCallDounced(true);
    } else {
      setRecipient(e);
      setInputValue(e);
      setError("");
    }
  };

  useEffect(() => {
    const runDebounced = async () => {
      if (debouncedValue) {
        setLoading(true);
        const ensAddress = await publicClient.getEnsAddress({
          name: debouncedValue,
        });

        if (ensAddress === null) {
          setError("Enter a valid address or ens");
          setEnsAddress("");
          setLoading(false);
        } else {
          setInputValue(debouncedValue);
          setEnsAddress(ensAddress);
          setRecipient(ensAddress);
          setError("");
          setLoading(false);
        }
      }
    };

    if (callDounced) {
      runDebounced();
    }
  }, [debouncedValue, callDounced]);

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
            className="w-full bg-white text-textPrimary   placeholder-[#b4b3df] placeholder:font-light font-body text-sm rounded py-3 px-4 focus:outline-none focus:ring-0 focus:border-[#e5dbf7] focus:bg-white"
            onChange={(e) => handleOnChange(e.target.value)}
            type={"public address or ENS"}
            placeholder="Public address or ENS"
            value={inputValue}
            required
          />
          {loading ? (
            <div className="flex items-center gap-x-2 pt-3">
              <p className="text-sm text-textPrimary font-body ">
                Getting address...
              </p>
              <CircularProgress size={15} className="text-textLight" />{" "}
            </div>
          ) : (
            ensAddress && (
              <p className="text-textPrimary text-xs mt-3">
                Address: {ensAddress}
              </p>
            )
          )}

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
