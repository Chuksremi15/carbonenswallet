import React, { useState } from "react";
import { Modal } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import {
  NavCardWrapper,
  SettingsCardWrapper,
  TransferCardWrapper,
} from "../page/TransferCardWrapper";
import SecurityPrivacy from "../settings/SecurityPrivacy";

export const SideNav = ({ openNav, handleCloseNav }) => {
  const [openSp, setOpenSp] = useState(false);

  const handleOpenSp = () => {
    setOpenSp(true);
  };
  const handleCloseSp = () => {
    setOpenSp(false);
  };

  return (
    <>
      <SecurityPrivacy
        openSp={openSp}
        handleCloseSp={handleCloseSp}
        handleCloseNav={handleCloseNav}
      />
      <Modal
        open={openNav}
        onClose={handleCloseNav}
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
            <NavCardWrapper handleClose={handleCloseNav}>
              <div className="h-[100px] border-b border-[#e5dbf7] flex  gap-x-3 pl-6 items-center">
                <img className="h-8" src="/img/favicon.svg" />
                <div className="flex flex-col gap-y-0.5">
                  <h6 className="font-head text-sm text-textPrimary">
                    CarbonENSWallet V1.0.0
                  </h6>
                  <p className="font-head text-xs text-[#807DC0]">
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
                  <p className="font-head text-xs text-[#807DC0]">
                    Privacy settings and wallet seed phrase
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
