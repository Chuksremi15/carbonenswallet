import React, { useState } from "react";
import { CardPrimaryButton } from "../Buttons";
import Modal from "@mui/material/Modal";
import { AddRecipient } from "../Cards/Transfer/AddRecipient";
import { AnimatePresence } from "framer-motion";
import { SendTo } from "../Cards/Transfer/SendTo";
import { ConfirmSend } from "../Cards/Transfer/ConfirmSend";
import { useDispatch, useSelector } from "react-redux";

export const Transfer = () => {
  const [open, setOpen] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState(0);
  const [amountUsd, setAmountUsd] = useState(0);
  const [maxGas, setMaxGas] = useState(0);
  const [gas, setGas] = useState(0);
  const [transactionData, setTransactionData] = useState({});
  const [gasFeeEstimate, setGasFeeEstimate] = useState({});

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [pages, setPages] = useState(0);
  const [x, setX] = useState(0);

  const {
    balance,
    accounts,
    usdBalance,
    getBalanceLoading,
    getWalletDetaillsLoading,
  } = useSelector((store) => {
    const { balance, usdBalance, getBalanceLoading } = store.transaction;

    const { accounts, getWalletDetaillsLoading } = store.onboarding;

    return {
      accounts,
      balance,
      usdBalance,
      getBalanceLoading,
      getWalletDetaillsLoading,
    };
  });

  const componentArray = [
    <AddRecipient
      pages={pages}
      setPages={setPages}
      x={x}
      setX={setX}
      setRecipient={setRecipient}
      recipient={recipient}
      handleClose={handleClose}
    />,
    <SendTo
      handleClose={handleClose}
      pages={pages}
      setPages={setPages}
      x={x}
      recipient={recipient}
      setX={setX}
      balance={balance}
      amount={amount}
      setAmount={setAmount}
      amountUsd={amountUsd}
      setAmountUsd={setAmountUsd}
      fromAddress={
        !getWalletDetaillsLoading && accounts && accounts[0].walletAddress
      }
      setTransactionData={setTransactionData}
      setGasFeeEstimate={setGasFeeEstimate}
    />,
    <ConfirmSend
      handleClose={handleClose}
      pages={pages}
      setPages={setPages}
      x={x}
      setX={setX}
      transactionData={transactionData}
      gasFeeEstimate={gasFeeEstimate}
      amountUsd={amountUsd}
    />,
  ];

  return (
    <div className="">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        hideBackdrop
        className="h-full w-full flex justify-center transition duration-500 pt-[70px]"
      >
        <AnimatePresence>{componentArray[pages]}</AnimatePresence>
      </Modal>
      <CardPrimaryButton
        disabled={false}
        action={handleOpen}
        text={"Transfer"}
      />
    </div>
  );
};
