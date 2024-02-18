import React from "react";
import { PrimaryButton, SecondaryButton } from "../../Buttons";
import { motion } from "framer-motion";
import { FramerScrollRight } from "../../utils/framer";

export const HomeCard = ({ pages, setPages, x, setX }) => {
  const handleScroll = () => {
    FramerScrollRight(3, setPages, setX);
  };

  return (
    <motion.div
      key={"homeCard"}
      initial={{ x: 5 }}
      transition={{ duration: 0.1 }}
      animate={{ x: "0" }}
      exit={{ x: x }}
      className="w-[375px] h-[600px]  mx-auto p-5 border  rounded text-center grid  relative"
    >
      <div className="relative flex items-center flex-col gap-y-4 mt-24">
        <img className="mx-auto  mt-10" src="/img/newlogo.svg" />
        <div className="">
          <h3 className="font-body text-2xl font-semibold text-textPrimary">
            Welcome to Carbon
          </h3>
          <h3 className="font-head text-sm text-textLight max-w-[270px] mt-2">
            Your gateway to the decentralized web. Create a new account or
            import from your seed phrase.
          </h3>
        </div>
      </div>

      <div className="absolute bottom-0 w-full mx-auto p-5 flex gap-x-4 gap-y-3">
        <PrimaryButton
          action={() => {
            // FramerScrollRight(pages, setPages, setX);
            handleScroll();
          }}
          text={"Create account"}
        />
        <SecondaryButton
          action={() => {
            FramerScrollRight(2, setPages, setX);
          }}
          text={"Import"}
        />
      </div>
    </motion.div>
  );
};
