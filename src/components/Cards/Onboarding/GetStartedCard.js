import React from "react";
import { PrimaryButton, SecondaryButton } from "../../Buttons";
import { motion } from "framer-motion";
import { FramerScrollRight } from "../../utils/framer";
import { Link, useHistory, useLocation } from "react-router-dom";

export const GetStartedCard = ({ pages, setPages, x, setX }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/dashboard");

    setPages(0);
    localStorage.setItem("pages", 0);
    localStorage.setItem("x", 0);
  };

  return (
    <motion.div
      key={"homeCard"}
      initial={{ x: 5 }}
      transition={{ duration: 0.5 }}
      animate={{ x: "0" }}
      exit={{ x: x }}
      className="w-[375px] h-[600px] mx-auto p-5 items-center justify-center border rounded text-center"
    >
      <div className="relative h-[510px] flex items-center justify-center flex-col gap-y-4 ">
        <img className="mx-auto h-16" src="/img/logo.svg" />
        <div>
          <h3 className="font-body text-2xl font-semibold text-textPrimary text-center">
            You are all done!
          </h3>
          <h3 className="font-head text-sm  text-[#807DC0] mt-2 text-center">
            You can now fully enjoy your wallet
          </h3>
        </div>
      </div>

      <div className="h-[90px] w-full">
        <PrimaryButton action={handleClick} text={"Get Started"} />
      </div>
    </motion.div>
  );
};
