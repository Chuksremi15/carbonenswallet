import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "@mui/material/Modal";
import { TransferCardWrapper } from "../page/TransferCardWrapper";

export const History = ({ x }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
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
              <HistoryCard handleOpen={handleOpen} />
              <div className="bg-white h-full font-body px-6 py-2">
                <div className="border-b border-[#e5dbf7] py-2">
                  <h6 className="text-[14px] text-textPrimary">Details</h6>
                </div>
                <div className="border-b border-[#e5dbf7] py-2.5">
                  <h6 className="text-[13px] text-textPrimary">
                    From <span className="text-[#807DC0]">0xed...c6s7a</span> To{" "}
                    <span className="text-[#807DC0]">0xed...c6s7a</span>
                  </h6>
                </div>
                <div className="border-b text-[13px] border-[#e5dbf7] py-2.5 flex justify-between">
                  <h6 className=" text-textPrimary">Amount</h6>
                  <h6 className=" text-[#807DC0]">0.45663 ETH</h6>
                </div>
                <div className="border-b text-[13px] border-[#e5dbf7] py-2.5 flex justify-between">
                  <h6 className=" text-textPrimary">Gas uses / limit</h6>
                  <h6 className=" text-[#807DC0]">21000 / 24560</h6>
                </div>
                <div className="border-b text-[13px] border-[#e5dbf7] py-2.5 flex justify-between">
                  <h6 className=" text-textPrimary">Gap price</h6>
                  <h6 className=" text-[#807DC0]">9.1 GWEI</h6>
                </div>
                <div className="text-[13px] text-textPrimary  py-2.5 flex justify-between">
                  <h6 className=" ">Total</h6>
                  <h6 className=" ">0.132556 ETH / $52.6</h6>
                </div>

                <div className="border-b border-[#e5dbf7] pb-2 pt-4">
                  <h6 className="text-[14px] text-textPrimary">Activity</h6>
                </div>
                <div className="border-b border-[#e5dbf7] py-2.5">
                  <h6 className="text-[13px] text-primary">
                    Created 11:20, 5/3/2020. Value 0.132566 ETH
                  </h6>
                </div>
                <div className="border-b border-[#e5dbf7] py-2.5">
                  <h6 className="text-[13px] text-primary">
                    Submitted 11:21, 5/3/2020. Gas fee 409636.5 GWEI
                  </h6>
                </div>
                <div className="border-b border-[#e5dbf7] py-2.5">
                  <h6 className="text-[13px] text-primary">
                    Confirmed 11:21, 5/3/2020
                  </h6>
                </div>
              </div>
            </TransferCardWrapper>
          </motion.div>
        </AnimatePresence>
      </Modal>
      <motion.div
        key={"homeCard"}
        initial={{ x: x }}
        transition={{ duration: 0.5 }}
        animate={{ x: "0" }}
        exit={{ x: -100 }}
      >
        <HistoryCard handleOpen={handleOpen} isHome={true} />
      </motion.div>
    </div>
  );
};

const HistoryCard = ({ handleOpen, isHome }) => {
  return (
    <div
      onClick={handleOpen}
      className={` ${
        isHome ? "py-6 border-[#e5dbf7] border-b" : "pb-3"
      }   px-6  flex gap-x-4 mt-1 cursor-pointer`}
    >
      <img className="w-8 h-8" src="/img/icons/addressicon.svg" />
      <div>
        <div className="text-[13px] text-textPrimary font-body">
          Contract interaction
        </div>
        <div className="text-[9px] w-[62px] flex items-center justify-center rounded-sm text-white bg-[#6EC67A] font-body">
          CONFIRMED
        </div>
      </div>
      <div className="ml-auto">
        <div className="text-[13px] text-textPrimary font-body">
          -0.36268282 ETH
        </div>
        <div className="text-[12px] font-body text-[#807DC0] text-right">
          $52.3
        </div>
      </div>
    </div>
  );
};
