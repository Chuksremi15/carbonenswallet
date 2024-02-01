import React, { useState } from "react";
import { CardPrimaryButton } from "../Buttons";
import Modal from "@mui/material/Modal";
import { AddRecipient } from "../Cards/Transfer/AddRecipient";
import { AnimatePresence } from "framer-motion";
import { SendTo } from "../Cards/Transfer/SendTo";
import { ConfirmSend } from "../Cards/Transfer/ConfirmSend";

export const Transfer = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [pages, setPages] = useState(0);
  const [x, setX] = useState(0);

  const componentArray = [
    <AddRecipient
      pages={pages}
      setPages={setPages}
      x={x}
      setX={setX}
      handleClose={handleClose}
    />,
    <SendTo
      handleClose={handleClose}
      pages={pages}
      setPages={setPages}
      x={x}
      setX={setX}
    />,
    <ConfirmSend
      handleClose={handleClose}
      pages={pages}
      setPages={setPages}
      x={x}
      setX={setX}
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
