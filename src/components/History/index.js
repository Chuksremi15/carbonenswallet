import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "@mui/material/Modal";
import { TransferCardWrapper } from "../page/TransferCardWrapper";
import { ethers, BigNumber, formatEther } from "ethers";
import redstone from "redstone-api";

export const History = ({ x, transactions, getTransactionsLoading }) => {
  const [open, setOpen] = useState(false);

  const [transaction, setTransaction] = useState(null);
  const [ethUsdAmount, setEthUsdAmount] = useState(0);
  const [transactionDate, setTransactionDate] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="overflow-y-scroll h-full pb-[50px]">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        hideBackdrop
        className="h-full w-full flex justify-center transition duration-500 pt-[70px]"
      >
        <AnimatePresence>
          <motion.div
            key={"homeCard"}
            initial={{ y: 5 }}
            transition={{ duration: 0.1 }}
            animate={{ y: "0" }}
            exit={{ y: "0" }}
          >
            <TransferCardWrapper handleClose={handleClose}>
              {/* <HistoryCard handleOpen={handleOpen} /> */}
              <div className="bg-white h-full font-body px-6 py-2">
                <div className="border-b border-[#e5dbf7] py-2">
                  <h6 className="text-[14px] text-textPrimary">Details</h6>
                </div>
                <div className="border-b border-[#e5dbf7] py-2.5">
                  <h6 className="text-[13px] text-textPrimary">
                    From{" "}
                    <span className="text-textLight">
                      {transaction && transaction.from.slice(0, 5)}...
                      {transaction &&
                        transaction.from.slice(
                          transaction.from.length - 5,
                          transaction.from.length
                        )}
                    </span>{" "}
                    To{" "}
                    <span className="text-textLight">
                      {transaction && transaction.to.slice(0, 5)}...
                      {transaction &&
                        transaction.to.slice(
                          transaction.to.length - 5,
                          transaction.to.length
                        )}
                    </span>
                  </h6>
                </div>
                <div className="border-b text-[13px] border-[#e5dbf7] py-2.5 flex justify-between">
                  <h6 className=" text-textPrimary">Date</h6>
                  <h6 className=" text-textLight">{transactionDate}</h6>
                </div>
                <div className="border-b text-[13px] border-[#e5dbf7] py-2.5 flex justify-between">
                  <h6 className=" text-textPrimary">Amount</h6>
                  <h6 className=" text-textLight">
                    {transaction && formatEther(transaction.value)} ETH
                  </h6>
                </div>
                <div className="border-b text-[13px] border-[#e5dbf7] py-2.5 flex justify-between">
                  <h6 className=" text-textPrimary">Gas uses / limit</h6>
                  <h6 className=" text-textLight">
                    {transaction && transaction.gasUsed} /{" "}
                    {transaction && transaction.gas}
                  </h6>
                </div>
                <div className="border-b text-[13px] border-[#e5dbf7] py-2.5 flex justify-between">
                  <h6 className=" text-textPrimary">Gap price</h6>
                  <h6 className=" text-textLight">
                    {transaction &&
                      Math.round(
                        (Number(transaction.gasPrice) / 10 ** 9) * 100
                      ) / 100}{" "}
                    GWEI
                  </h6>
                </div>
                <div className="text-[13px] text-textPrimary  py-2.5 flex justify-between">
                  <h6 className=" ">Total</h6>
                  <h6 className=" ">
                    {" "}
                    {transaction && formatEther(transaction.value)} ETH / $
                    {ethUsdAmount}
                  </h6>
                </div>

                {/* <div className="border-b border-[#e5dbf7] pb-2 pt-4">
                  <h6 className="text-[14px] text-textPrimary">Activity</h6>
                </div> */}
                {/* <div className="border-b border-[#e5dbf7] py-2.5">
                  <h6 className="text-[13px] text-primary">
                    Date {transactionDate}
                  </h6>
                </div> */}
                {/* <div className="border-b border-[#e5dbf7] py-2.5">
                  <h6 className="text-[13px] text-primary">
                    Submitted 11:21, 5/3/2020. Gas fee 409636.5 GWEI
                  </h6>
                </div>
                <div className="border-b border-[#e5dbf7] py-2.5">
                  <h6 className="text-[13px] text-primary">
                    Confirmed 11:21, 5/3/2020
                  </h6>
                </div> */}
              </div>
            </TransferCardWrapper>
          </motion.div>
        </AnimatePresence>
      </Modal>
      <motion.div
        key={"homeCard"}
        initial={{ x: x }}
        transition={{ duration: 0.1 }}
        animate={{ x: "0" }}
        exit={{ x: -100 }}
      >
        {getTransactionsLoading ? (
          <></>
        ) : (
          <div className="">
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <HistoryCard
                  handleOpen={handleOpen}
                  isHome={true}
                  transaction={transaction}
                  key={index}
                  setTransaction={setTransaction}
                  ethUsdAmount={ethUsdAmount}
                  setEthUsdAmount={setEthUsdAmount}
                  setTransactionDate={setTransactionDate}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center pt-10 gap-y-4">
                <img src="/img/wallet/emptystate.png" />

                <h5 className="font-body text-base text-textPrimary">
                  No transactions yet
                </h5>
                <p className="text-textLight font-body text-sm max-w-[280px] text-center">
                  Once you've made some transactions, they will appear here.
                </p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

const HistoryCard = ({
  handleOpen,
  isHome,
  transaction,
  setTransaction,
  setEthUsdAmount,
  setTransactionDate,
}) => {
  const [usdAmount, setUsdAmount] = useState(0);
  const [createdAt, setCreatedAt] = useState(0);

  useEffect(() => {
    const getUsdPriceOfEth = async () => {
      const price = await redstone.getPrice("ETH");
      const usdBalance =
        Math.round(price.value * formatEther(transaction.value) * 100) / 100;
      setUsdAmount(usdBalance);
    };

    getUsdPriceOfEth();

    function getDate() {
      const myDate = new Date(transaction.timeStamp * 1000);
      return myDate;
    }

    let value = getDate();

    setCreatedAt(value.toGMTString());
  }, [transaction]);

  const handleModalOpen = () => {
    setTransaction(transaction);
    setEthUsdAmount(usdAmount);
    setTransactionDate(createdAt);
    handleOpen();
  };

  return (
    <div
      onClick={() => handleModalOpen()}
      className={` ${
        isHome ? "py-6 border-[#e5dbf7] border-b" : "pb-3"
      }   px-6  flex gap-x-4 mt-1 cursor-pointer`}
    >
      <img className="w-8 h-8" src="/img/icons/addressicon.svg" />
      <div>
        <div className="text-[13px] text-textPrimary font-body">
          {transaction.functionName ? "Contract interaction" : "Transfer"}
        </div>
        <div className="text-[9px] w-[62px] flex items-center justify-center rounded-sm text-white bg-[#6EC67A] font-body">
          CONFIRMED
        </div>
      </div>
      <div className="ml-auto">
        <div className="text-[13px] text-textPrimary font-body">
          {formatEther(transaction.value)} ETH
        </div>
        <div className="text-[12px] font-body text-textLight text-right">
          ${usdAmount}
        </div>
      </div>
    </div>
  );
};
