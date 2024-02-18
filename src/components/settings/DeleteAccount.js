import React, { useState } from "react";
import { CircularProgress, Modal } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { SettingsCardWrapper } from "../page/TransferCardWrapper";
import { IoIosWarning } from "react-icons/io";
import { CardPrimaryButton, CardSecondaryButton } from "../Buttons";
import passworder from "browser-passworder";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";

const DeleteAccount = ({ openDa, handleCloseDa, handleCloseNav }) => {
  const [showSecret, useShowSecret] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [seed, setSeed] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e);
  };

  const history = useHistory();

  const handleSubmit = async () => {
    try {
      let secrets = localStorage.getItem("walletSecrets");
      let value = await passworder.decrypt(password, secrets);
      if (value) {
        localStorage.setItem("walletSecrets", null);
        localStorage.setItem("userAccounts", null);

        localStorage.setItem("pages", 0);
        localStorage.setItem("x", 0);
        history.push("/");

        setError("");
      }
    } catch (error) {
      setError("Incorrect password");
    }
  };

  const handleClose = () => {
    handleCloseNav();
    handleCloseDa();
    setPassword("");
    setError("");
    setSeed("");
  };

  return (
    <>
      <Modal
        open={openDa}
        onClose={handleCloseDa}
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
            <SettingsCardWrapper handleClose={handleClose}>
              <div className="pt-10 h-[480px] px-4 flex flex-col gap-y-4">
                <h6 className="font-body text-xl text-textPrimary">
                  Delete Your Accounts
                </h6>
                <p className="font-head text-xs text-textLight">
                  This action will delete your accounts. Make sure to have your
                  secret phrase backed up
                </p>

                <div>
                  <label className="text-sm font-body">
                    Enter your password to continue
                  </label>
                  <input
                    className="w-full border placeholder-[#8b8a8a] text-sm font-body rounded py-3 px-4 focus:outline-none focus:ring-0 focus:border-primary focus:bg-white"
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    type={"password"}
                    autoComplete="off"
                    placeholder="password"
                    required
                  />

                  {error && (
                    <p className="text-sm text-red-500 font-body mt-1">
                      Incorrect password
                    </p>
                  )}
                </div>
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

export default DeleteAccount;
