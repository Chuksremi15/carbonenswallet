import React, { useEffect, useState } from "react";
import { TransferCardWrapper } from "../../page/TransferCardWrapper";
import { CardPrimaryButton, CardSecondaryButton } from "../../Buttons";
import { motion } from "framer-motion";
import { FramerScrollLeft } from "../../utils/framer";
import { Wallet, formatEther } from "ethers";
import {
  getBalance,
  provider,
} from "../../../features/transactionSlice/transactionSlice";
import toast from "react-hot-toast";
import { Network } from "../../../utils/contants";
import { useDispatch, useSelector } from "react-redux";

export const ConfirmSend = ({
  handleClose,
  pages,
  setPages,
  x,
  setX,
  transactionData,
  gasFeeEstimate,
  amountUsd,
  signingKey,
  setTransactionData,
  setAmountUsd,
  setAmount,
  setRecipient,
}) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { accounts, getWalletDetaillsLoading } = useSelector((store) => {
    const { accounts, getWalletDetaillsLoading } = store.onboarding;

    return {
      accounts,
      getWalletDetaillsLoading,
    };
  });

  let wallet = new Wallet(signingKey, provider);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      let txResponse = await wallet.sendTransaction(transactionData);

      await txResponse.wait(1);

      console.log(
        `Proposal has been mined at blocknumber: ${txResponse.blockNumber}, transaction hash: ${txResponse.hash}`
      );

      setLoading(false);

      setPages(0);
      localStorage.setItem("pages", 0);

      toast.success("sent!");

      dispatch(getBalance({ address: accounts && accounts[0].walletAddress }));

      setTransactionData({});
      setAmountUsd(0);
      setAmount(0);
      setRecipient("");
      handleClose();
    } catch (error) {
      console.log(error);
      if (error) {
        toast.error("Invalid request");
      }
      setRecipient("");
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(transactionData);
  }, [transactionData]);

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
                <img className="w-10" src="/img/icons/addressicon.svg" />
              </div>
              <p className="text-[15px] text-textPrimary font-body break-all">
                {transactionData && transactionData.to}
              </p>
            </div>
          </div>
          <div className="grid grid-rows-4 h-full">
            <div className="border-b border-[#e5dbf7] px-6  flex justify-between items-center justify-items-center">
              <p className="text-sm text-textPrimary">Network</p>
              <p className="text-sm text-textPrimary font-light">
                {Network} Network
              </p>
            </div>
            <div className="border-b border-[#e5dbf7] px-6  flex justify-between items-center justify-items-center">
              <p className="text-sm text-textPrimary">Amount</p>
              <div className="text-right">
                <p className="text-sm text-textPrimary font-light">
                  ${amountUsd && amountUsd}
                </p>
                <p className="text-xs text-[#b4b3df] font-light">
                  {transactionData && formatEther(transactionData.value)} ETH
                </p>
              </div>
            </div>
            <div className="border-b border-[#e5dbf7] px-6  flex justify-between items-center justify-items-center">
              <p className="text-sm text-textPrimary">Gas fee</p>
              <div className="text-right">
                <p className="text-sm text-textPrimary font-light">
                  ${gasFeeEstimate && gasFeeEstimate.inUSD}
                </p>
                <p className="text-xs text-[#b4b3df] font-light">
                  {gasFeeEstimate && gasFeeEstimate.inEth} ETH
                </p>
              </div>
            </div>
            <div className=" px-6 flex justify-between items-center justify-items-center">
              <p className="text-sm text-textPrimary">Total</p>
              <div className="text-right">
                <p className="text-sm text-textPrimary font-light">
                  ${gasFeeEstimate.inUSD + amountUsd}
                </p>
                <p className="text-xs text-[#b4b3df] font-light">
                  {Number(gasFeeEstimate.inEth) +
                    Number(formatEther(transactionData.value))}
                  ETH
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bggray flex items-center justify-between gap-x-5 h-[94px] px-8 border-t border-[#e5dbf7]">
          <CardSecondaryButton
            action={() => FramerScrollLeft(pages, setPages, setX)}
            disabled={false}
            text={"Reject"}
          />
          <CardPrimaryButton
            loading={loading}
            action={() => handleSubmit()}
            text={"Confirm"}
          />
        </div>
      </TransferCardWrapper>
    </motion.div>
  );
};
