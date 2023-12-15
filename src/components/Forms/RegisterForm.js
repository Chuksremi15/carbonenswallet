import React from "react";
import { motion } from "framer-motion";
import { PrimaryButton } from "../Buttons";
import { FramerScrollLeft, FramerScrollRight } from "../utils/framer";

export const RegisterForm = ({ pages, setPages, x, setX }) => {
  return (
    <motion.div
      key={"registerForm"}
      initial={{ x: "20%" }}
      transition={{ duration: 0.5 }}
      animate={{ x: "0" }}
      exit={{ x: x }}
      className="max-w-[400px] h-[70vh] mx-auto p-5 border rounded text-center grid grid-rows-5"
    >
      <div className="row-span-1">
        <img
          onClick={() => {
            FramerScrollLeft(pages, setPages, setX);
          }}
          className="cursor-pointer"
          src="/img/icons/arrowleft.svg"
        />
      </div>
      <div className="row-span-3 flex flex-col gap-y-6">
        <div className="flex-col gap-y-4">
          <h3 className="font-head text-3xl font-bold">Create a password</h3>
          <h3 className="font-head text-lg">
            You will use this to unlock your wallet
          </h3>
        </div>
        <div className="flex flex-col gap-y-3">
          <input
            className="w-full border font-body rounded py-2 px-4 focus:outline-none focus:ring-0 focus:border-gray-500 focus:bg-white"
            type={"number"}
            placeholder="Password"
            required
          />
          <input
            className="w-full border font-body rounded py-2 px-4 focus:outline-none focus:ring-0 focus:border-gray-500 focus:bg-white"
            type={"number"}
            placeholder="Confirm password"
            required
          />
        </div>
      </div>

      <div className="row-span-1 flex flex-col gap-y-3">
        <PrimaryButton
          action={() => {
            FramerScrollRight(pages, setPages, setX);
          }}
          text={"Continue"}
        />
      </div>
    </motion.div>
  );
};
