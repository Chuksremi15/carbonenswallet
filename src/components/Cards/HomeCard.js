import React from "react";
import { PrimaryButton, SecondaryButton } from "../Buttons";
import { motion } from "framer-motion";
import { FramerScrollRight } from "../utils/framer";

export const HomeCard = ({ pages, setPages, x, setX }) => {
  return (
    <motion.div
      key={"homeCard"}
      initial={{ x: "20%" }}
      transition={{ duration: 0.5 }}
      animate={{ x: "0" }}
      exit={{ x: x }}
      className="max-w-[400px] h-[70vh] mx-auto p-5 border rounded text-center grid grid-rows-5"
    >
      <div className="row-span-4 flex items-center justify-center flex-col gap-y-4">
        <img className="mx-auto h-16" src="/img/logo.svg" />
        <h3 className="font-head text-xl">
          A friendly ens wallet for ethereum and other dapps
        </h3>
      </div>

      <div className="row-span-1 flex flex-col gap-y-3">
        <PrimaryButton
          action={() => {
            FramerScrollRight(pages, setPages, setX);
          }}
          text={"Create a new wallet"}
        />
        <SecondaryButton text={"I already have a wallet"} />
      </div>
    </motion.div>
  );
};
