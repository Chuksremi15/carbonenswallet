import React, { useState } from "react";
import { Modal } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { SettingsCardWrapper } from "../page/TransferCardWrapper";
import { IoIosWarning } from "react-icons/io";
import { CardPrimaryButton, CardSecondaryButton } from "../Buttons";
import passworder from "browser-passworder";
import toast, { Toaster } from "react-hot-toast";

const SecurityPrivacy = ({ openSp, handleCloseSp, handleCloseNav }) => {
  const [showSecret, useShowSecret] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [seed, setSeed] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e);
  };

  const handleSubmit = async () => {
    try {
      let secrets = localStorage.getItem("walletSecrets");
      let value = await passworder.decrypt(password, secrets);
      value = JSON.parse(value);
      setSeed(value.seedPhrase);
      setError("");
    } catch (error) {
      setError("Incorrect password");
    }
  };

  const handleClose = () => {
    handleCloseNav();
    handleCloseSp();
    setPassword("");
    setError("");
    setSeed("");
  };

  const copySeed = async (address) => {
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
    <>
      <Modal
        open={openSp}
        onClose={handleCloseSp}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        hideBackdrop
        className="relative pt-10 h-[90vh] w-[375px] mx-auto flex items-center justify-centertransition duration-500"
      >
        <AnimatePresence>
          <motion.div
            key={"homeCard"}
            initial={{ y: 5 }}
            transition={{ duration: 0.1 }}
            animate={{ y: "0" }}
            exit={{ y: "0" }}
          >
            <SettingsCardWrapper handleClose={handleClose}>
              <div className="pt-10 h-[480px] px-4 flex flex-col gap-y-4">
                <h6 className="font-body text-xl text-textPrimary">
                  Security Recovery Phrase
                </h6>
                <p className="font-head text-xs text-textLight">
                  The secret Recovery Phrase provides full access to your wallet
                  and funds. CarbonENSWallet is a non-custodial wallet. That
                  means you're the owner of your SRP.
                </p>

                <div className="border-l-4 border-red-500 h-auto px-2 py-2 rounded bg-red-50 flex gap-x-2">
                  <div>
                    <IoIosWarning className="text-2xl text-red-600" />
                  </div>
                  <p className="font-body text-sm">
                    Make sure no one is looking at your screen. CarbonENSWallet
                    Support will never request this.
                  </p>
                </div>

                {seed ? (
                  <div>
                    <label className="text-sm font-body">
                      Your Secret Recovery Phrase
                    </label>
                    <div className="border font-body text-base p-2 rounded mb-3">
                      {seed}
                    </div>
                    <CardSecondaryButton
                      action={() => copySeed(seed)}
                      disabled={false}
                      text={"Copy to clipboard"}
                    />
                  </div>
                ) : (
                  <div>
                    <label className="text-sm font-body">
                      Enter your password to continue
                    </label>
                    <input
                      className="w-full border placeholder-[#8b8a8a] text-sm font-body rounded py-3 px-4 focus:outline-none focus:ring-0 focus:border-primary focus:bg-white"
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      type={"password"}
                      autoComplete="off"
                      placeholder="Be sure no one is starring at your screen"
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

              <div className="bg-bggray flex items-center justify-between gap-x-5 h-[94px] px-8 border-t border-[#e5dbf7] mt-auto">
                <CardSecondaryButton
                  action={handleClose}
                  disabled={false}
                  text={"Cancel"}
                />
                <CardPrimaryButton
                  disabled={password === ""}
                  action={handleSubmit}
                  text={"Continue"}
                />
              </div>
            </SettingsCardWrapper>
          </motion.div>
        </AnimatePresence>
      </Modal>
    </>
  );
};

export default SecurityPrivacy;
