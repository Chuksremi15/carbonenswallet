import React from "react";
import { PrimaryButton, SecondaryButton } from "../Buttons";
import { motion } from "framer-motion";
import { FramerScrollRight } from "../utils/framer";

export const GetStartedCard = ({ pages, setPages, x, setX }) => {
  return (
    <motion.div
      key={"homeCard"}
      initial={{ x: "20%" }}
      transition={{ duration: 0.5 }}
      animate={{ x: "0" }}
      exit={{ x: x }}
      className="max-w-[400px] h-[70vh] mx-auto flex items-center justify-center border rounded text-center relative"
    >
      <div className="relative flex items-center justify-center flex-col gap-y-4 ">
        <img className="mx-auto h-16" src="/img/logo.svg" />
        <h3 className="font-head text-3xl font-bold">You are all done!</h3>
        <h3 className="font-head text-lg">
          You can now fully enjoy your wallet
        </h3>
      </div>

      <div className="absolute w-full p-5 bottom-0 ">
        <PrimaryButton
          action={() => {
            FramerScrollRight(pages, setPages, setX);
          }}
          text={"Get Started"}
        />
      </div>
    </motion.div>
  );
};
