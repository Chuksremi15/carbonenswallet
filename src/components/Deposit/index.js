import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { CardSecondaryButton } from "../Buttons";
import { TransferCardWrapper } from "../page/TransferCardWrapper";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export const Deposit = ({ handleClose, handleOpen, setOpen, open }) => {
  const { accounts, getWalletDetaillsLoading } = useSelector((store) => {
    const { accounts, getWalletDetaillsLoading } = store.onboarding;

    return {
      accounts,
      getWalletDetaillsLoading,
    };
  });

  const copyAddress = async (address) => {
    try {
      await navigator.clipboard.writeText(address);
      toast.success("Copied!", {
        duration: 3000,
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="w-full">
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
            transition={{ duration: 0.5 }}
            animate={{ y: "0" }}
            exit={{ y: "0" }}
          >
            <TransferCardWrapper handleClose={handleClose}>
              <div className="grid grid-rows-6 h-full">
                <div className="font-body row-span-1 px-6 pt-4 pb-4 relative border-b border-[#e5dbf7]">
                  <h6 className="text-textPrimary text-sm">Deposit ETH</h6>
                  <p className="text-[13px] text-[#807DC0] font-normal">
                    To use decentralized applications with MetaMask, you will
                    need some ETH in your wallet.
                  </p>
                </div>
                <div className="font-body row-span-3 px-6 pb-8 relative border-b border-[#e5dbf7] my-auto">
                  <h6 className="text-textPrimary text-sm">Direct deposit</h6>
                  <p className="text-[13px] text-[#807DC0] font-normal">
                    The address below is to recieve ETH
                  </p>

                  {getWalletDetaillsLoading ? (
                    <></>
                  ) : (
                    <div className="flex gap-x-4 mt-2">
                      <img src="/img/wallet/walletqr.svg" />
                      <div className="flex flex-col gap-y-2 my-auto">
                        <div className="flex flex-col gap-y-1">
                          <div className="flex items-center  gap-x-2">
                            <img
                              className="w-8"
                              src="/img/icons/addressicon1.svg"
                            />
                            <p className="font-body text-sm text-textPrimary m-0">
                              Daily Driver
                            </p>
                          </div>

                          <p className="font-body bg-white p-2 rounded text-xs break-words w-[190px]  text-[#807DC0]">
                            {accounts[0].walletAddress}
                          </p>
                        </div>

                        <div
                          onClick={() => copyAddress(accounts[0].walletAddress)}
                          className="cursor-pointer py-2 text-xs rounded text-textPrimary flex items-center justify-center w-full bg-white"
                        >
                          Copy address
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="font-body row-span-2 px-6 pb-7 relative border-b border-[#e5dbf7]">
                  <h6 className="text-textPrimary text-sm">
                    Buy ETH on binance
                  </h6>
                  <p className="text-[13px] text-[#807DC0] font-normal">
                    You can buy eth on Binance and send to your metamask account
                  </p>
                </div>
              </div>
            </TransferCardWrapper>
          </motion.div>
        </AnimatePresence>
      </Modal>
      <CardSecondaryButton
        disabled={false}
        action={handleOpen}
        text={"Deposit"}
      />
    </div>
  );
};
