import React, { useState } from "react";
import { Modal } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import {
  NavCardWrapper,
  SettingsCardWrapper,
  TransferCardWrapper,
} from "../page/TransferCardWrapper";
import SecurityPrivacy from "../settings/SecurityPrivacy";
import DeleteAccount from "../settings/DeleteAccount";
import { walletController } from "../../controller/walletController";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Networks from "../settings/Networks";

export const SideNav = ({ openNav, handleCloseNav }) => {
  const [openSp, setOpenSp] = useState(false);
  const [openDa, setOpenDa] = useState(false);
  const [openNt, setOpenNt] = useState(false);

  const handleOpenSp = () => {
    setOpenSp(true);
  };
  const handleCloseSp = () => {
    setOpenSp(false);
  };
  const handleOpenDa = () => {
    setOpenDa(true);
  };
  const handleCloseDa = () => {
    setOpenDa(false);
  };
  const handleOpenNt = () => {
    setOpenNt(true);
  };
  const handleCloseNt = () => {
    setOpenNt(false);
  };

  const { lockAccount } = walletController();

  const history = useHistory();

  const handleLock = () => {
    let responce = lockAccount();
    if (responce === "Account Locked") {
      history.push("/unlock");
    }
  };

  return (
    <>
      <SecurityPrivacy
        openSp={openSp}
        handleCloseSp={handleCloseSp}
        handleCloseNav={handleCloseNav}
      />
      <Networks
        openDa={openNt}
        handleCloseDa={handleCloseNt}
        handleCloseNav={handleCloseNt}
      />
      <DeleteAccount
        openDa={openDa}
        handleCloseDa={handleCloseDa}
        handleCloseNav={handleCloseNav}
      />
      <Modal
        open={openNav}
        onClose={handleCloseNav}
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
            <NavCardWrapper handleClose={handleCloseNav}>
              <div className="h-[100px] border-b border-[#e5dbf7] flex  gap-x-3 pl-6 items-center">
                <img className="h-8" src="/img/favicon.svg" />
                <div className="flex flex-col gap-y-0.5">
                  <h6 className="font-head text-sm text-textPrimary">
                    CarbonENSWallet V1.0.0
                  </h6>
                  <p className="font-head text-xs text-textLight">
                    Inpired and funded by buidlguidl
                  </p>
                </div>

                <div></div>
              </div>
              <div className="h-[430px] grid grid-rows-5 w-full">
                <div
                  onClick={() => handleOpenSp()}
                  className="border-b border-[#e5dbf7] pl-6 flex flex-col justify-center gap-y-0.5  h-full cursor-pointer"
                >
                  <h6 className="font-head text-sm text-textPrimary">
                    Security & Privacy
                  </h6>
                  <p className="font-head text-xs text-textLight">
                    Privacy settings and wallet seed phrase
                  </p>
                </div>
                <div
                  onClick={() => handleOpenNt()}
                  className="border-b border-[#e5dbf7] pl-6 flex flex-col justify-center gap-y-0.5  h-full cursor-pointer"
                >
                  <h6 className="font-head text-sm text-textPrimary">
                    Networks
                  </h6>
                  <p className="font-head text-xs text-textLight">
                    Manage custom RPC networks
                  </p>
                </div>
                <div
                  onClick={() => handleOpenDa()}
                  className="border-b border-[#e5dbf7] pl-6 flex flex-col justify-center gap-y-0.5  h-full cursor-pointer"
                >
                  <h6 className="font-head text-sm text-textPrimary">
                    Delete Account
                  </h6>
                  <p className="font-head text-xs text-textLight">
                    Delete Carbon Account
                  </p>
                </div>
                <div
                  onClick={() => handleLock()}
                  className="border-b border-[#e5dbf7] pl-6 flex flex-col justify-center gap-y-0.5  h-full cursor-pointer"
                >
                  <h6 className="font-head text-sm text-textPrimary">
                    Lock Account
                  </h6>
                  <p className="font-head text-xs text-textLight">
                    Lock Carbon Account
                  </p>
                </div>
              </div>
            </NavCardWrapper>
          </motion.div>
        </AnimatePresence>
      </Modal>
    </>
  );
};
