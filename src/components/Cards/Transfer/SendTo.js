import React, { useEffect, useState } from "react";
import { TransferCardWrapper } from "../../page/TransferCardWrapper";
import { CardPrimaryButton, CardSecondaryButton } from "../../Buttons";
import { motion } from "framer-motion";
import { FramerScrollLeft, FramerScrollRight } from "../../utils/framer";
import redstone from "redstone-api";
import {
  ethers,
  BigNumber,
  formatEther,
  parseEther,
  Wallet,
  SigningKey,
} from "ethers";
import { provider } from "../../../features/transactionSlice/transactionSlice";
import toast from "react-hot-toast";

export const SendTo = ({
  handleClose,
  pages,
  setPages,
  x,
  setX,
  recipient,
  balance,
  amount,
  setAmount,
  amountUsd,
  setAmountUsd,
  fromAddress,
  setTransactionData,
  setGasFeeEstimate,
}) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAmountChange = async (e) => {
    if (e > balance) {
      setError("ETH above balance");
      setAmount(e);
    } else {
      setAmount(e);
      console.log(e);
      setError("");
      let usdAmount = await ethPrice(e);
      setAmountUsd(usdAmount);
    }
  };

  const ethPrice = async (ethvalue) => {
    const price = await redstone.getPrice("ETH");
    return Math.round(price.value * ethvalue * 100) / 100;
  };

  const gasPriceEth = async () => {
    let gasFeeWei = await provider.getFeeData();
    let gasFeeEth = formatEther(gasFeeWei.gasPrice);
    let estimatedGasFee = gasFeeEth * 21000;
    return { gasFeeWei: gasFeeWei.gasPrice, gasFeeEth, estimatedGasFee };
  };

  let transaction = {
    to: "",
    value: "",
    gasLimit: "21000",
    maxPriorityFeePerGas: parseEther("0.00001"),
    maxFeePerGas: "",
    nonce: 0,
    type: 2,
    chainId: 11155111,
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { gasFeeWei, gasFeeEth, estimatedGasFee } = await gasPriceEth();

      let nonce = await provider.getTransactionCount(fromAddress);

      let gasFeeEstimate = {};

      gasFeeEstimate.inEth = estimatedGasFee;
      let gasFeePriceInUSD = await ethPrice(estimatedGasFee);
      gasFeeEstimate.inUSD = gasFeePriceInUSD;

      setGasFeeEstimate(gasFeeEstimate);

      transaction.to = recipient;
      transaction.value = parseEther(amount);
      transaction.maxFeePerGas = gasFeeWei;
      transaction.maxPriorityFeePerGas = parseEther(`0.00000001`);
      transaction.nonce = nonce;

      setTransactionData(transaction);

      setLoading(false);

      FramerScrollRight(pages, setPages, setX);
    } catch (error) {
      console.log(error);
      if (error) {
        toast.error("Invalid request");
      }

      setLoading(false);
    }
  };

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
              className="w-full bg-white text-textPrimary placeholder-[#b4b3df]  font-body text-sm rounded py-3 pl-[42px] pr-4 focus:outline-none focus:ring-0 focus:border-[#e5dbf7] focus:bg-white"
              type={"text"}
              placeholder="Public address or ENS"
              value={recipient}
              disabled
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
              <label className="text-xs font-light text-[#b4b3df]">
                Ethereum Main Network
              </label>
            </div>
            <input
              className="w-full bg-white text-textPrimary placeholder-textPrimary  font-body text-sm rounded py-3 pl-3 focus:outline-none focus:ring-0 focus:border-[#e5dbf7] focus:bg-white"
              type={"text"}
              placeholder="0.95 "
              value={balance + ` ETH available`}
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
                type={"number"}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="0.0000"
                value={amount}
                required
              />
              <div className="top-[37px] right-[15px] absolute text-[#b4b3df] text-xs font-light">
                ETH
              </div>
              {error && (
                <p className="text-xs text-red-500 font-body font-light mt-2">
                  {error}
                </p>
              )}
            </div>
            <div className="relative col-span-4 flex flex-col gap-y-1 ">
              <label className="text-[#b4b3df] text-xs font-light place-self-end">
                Send maximum
              </label>
              <input
                className="w-full bg-white text-textPrimary placeholder-[#b4b3df]  font-body text-sm rounded py-3 pl-3 focus:outline-none focus:ring-0 focus:border-[#e5dbf7] focus:bg-white"
                type={"number"}
                placeholder="0.00"
                value={amountUsd}
                required
              />
              <div className="top-[37px] right-[15px] absolute text-[#b4b3df] text-xs font-light">
                USD
              </div>
            </div>
          </div>
          {/* <div className="font-body px-6 relative flex flex-col gap-y-2">
            <label className="text-textPrimary text-sm">Transaction fee</label>
            <input
              className="w-full bg-white text-textPrimary placeholder-[#b4b3df]  font-body text-sm rounded py-3 pl-3 focus:outline-none focus:ring-0 focus:border-[#e5dbf7] focus:bg-white"
              type={"text"}
              placeholder=""
              value={gasFeeEstimate}
              required
            />
          </div> */}
        </div>

        <div className="bg-bggray flex items-center justify-between gap-x-5 h-[94px] px-8 border-t border-[#e5dbf7]">
          <CardSecondaryButton
            action={() => FramerScrollLeft(pages, setPages, setX)}
            disabled={false}
            text={"Back"}
          />
          <CardPrimaryButton
            disabled={error || Number(amount) === 0}
            action={() => handleSubmit()}
            loading={loading}
            text={"Next"}
          />
        </div>
      </TransferCardWrapper>
    </motion.div>
  );
};
