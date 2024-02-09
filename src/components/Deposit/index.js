import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { CardPrimaryButton, CardSecondaryButton } from "../Buttons";
import { TransferCardWrapper } from "../page/TransferCardWrapper";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import passworder from "browser-passworder";
import { IoIosWarning } from "react-icons/io";
import { BiSolidCopy } from "react-icons/bi";

export const Deposit = ({ handleClose, handleOpen, open }) => {
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [privateKey, setPrivateKey] = useState(null);
  const [showKeySection, setShowKeySection] = useState(false);

  const { accounts, getWalletDetaillsLoading } = useSelector((store) => {
    const { accounts, getWalletDetaillsLoading } = store.onboarding;

    return {
      accounts,
      getWalletDetaillsLoading,
    };
  });

  const copyToClipboard = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Copied!", {
        duration: 3000,
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e);
  };

  const handleSubmit = async () => {
    try {
      let secrets = localStorage.getItem("walletSecrets");
      let value = await passworder.decrypt(password, secrets);
      value = JSON.parse(value);
      setPrivateKey(value.accounts[0]);
      setError("");
    } catch (error) {
      setError("Incorrect password");
    }
  };

  const handleCardClose = () => {
    handleClose();
    setPassword("");
    setError("");
    setPrivateKey(null);
    setShowKeySection(false);
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
            transition={{ duration: 0.1 }}
            animate={{ y: "0" }}
            exit={{ y: "0" }}
          >
            <TransferCardWrapper handleClose={handleCardClose}>
              <div className="grid grid-rows-6 h-full">
                <div className="font-body row-span-6 px-6 pb-8 relative border-b border-[#e5dbf7] mt-6">
                  <h6 className="text-textPrimary text-sm">Direct deposit</h6>
                  <p className="text-[13px] text-[#807DC0] font-normal">
                    The address below is to recieve ETH
                  </p>

                  {getWalletDetaillsLoading ? (
                    <></>
                  ) : (
                    <>
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
                            onClick={() =>
                              copyToClipboard(accounts[0].walletAddress)
                            }
                            className="cursor-pointer py-2 text-xs rounded text-textPrimary flex items-center justify-center w-full bg-white hover:bg-primary hover:text-white transition-all duration-500"
                          >
                            Copy address
                          </div>
                        </div>
                      </div>
                      <div className={`${privateKey ? "mt-7" : "mt-10"}`}>
                        {showKeySection ? (
                          <div>
                            <div>
                              {privateKey ? (
                                <>
                                  <label className="text-sm font-body">
                                    Private key for {privateKey.accountName}
                                  </label>
                                  <div className="border border-black p-4 text-xs rounded mb-3 flex justify-between items-center">
                                    <p className="break-words w-[260px]">
                                      {privateKey.privateKey}
                                    </p>
                                    <div
                                      onClick={() =>
                                        copyToClipboard(privateKey.privateKey)
                                      }
                                    >
                                      <BiSolidCopy className="text-xl cursor-pointer" />
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <div>
                                  <label className="text-sm font-body">
                                    Enter your password to continue
                                  </label>
                                  <input
                                    className="w-full border placeholder-[#8b8a8a] text-sm font-body rounded py-3 px-4 focus:outline-none focus:ring-0 focus:border-primary focus:bg-white"
                                    onChange={(e) =>
                                      handlePasswordChange(e.target.value)
                                    }
                                    type={"password"}
                                    autoComplete="off"
                                    placeholder="Password"
                                    required
                                  />
                                  {error && (
                                    <p className="text-sm text-red-500 font-body mt-1">
                                      Incorrect password
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>

                            <div className="border-l-4 border-red-500 h-auto px-2 py-2 rounded bg-red-50 flex gap-x-2 mt-4">
                              <div>
                                <IoIosWarning className="text-2xl text-red-600" />
                              </div>
                              <p className="font-body text-sm">
                                Warning: Never disclose this key. Anyone with
                                your private keys can steal any assets held in
                                your account.
                              </p>
                            </div>

                            <div className="bg-[#fbfafd] flex items-center justify-between gap-x-5 h-[94px] px-4  mt-auto">
                              {privateKey ? (
                                <>
                                  <CardPrimaryButton
                                    action={() => handleCardClose()}
                                    text={"Done"}
                                  />
                                </>
                              ) : (
                                <>
                                  <CardSecondaryButton
                                    action={() => handleCardClose()}
                                    disabled={false}
                                    text={"Cancel"}
                                  />
                                  <CardPrimaryButton
                                    disabled={password === ""}
                                    action={handleSubmit}
                                    text={"Continue"}
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        ) : (
                          <CardSecondaryButton
                            action={() => setShowKeySection(true)}
                            text={"Show private key"}
                          />
                        )}
                      </div>
                    </>
                  )}
                </div>
                {/* <div className="font-body row-span-2 px-6 pb-7 relative border-b border-[#e5dbf7]">
                  <h6 className="text-textPrimary text-sm">
                    Buy ETH on binance
                  </h6>
                  <p className="text-[13px] text-[#807DC0] font-normal">
                    You can buy eth on Binance and send to your metamask account
                  </p>
                </div> */}
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
