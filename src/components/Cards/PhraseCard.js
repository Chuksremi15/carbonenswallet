import React, { useState } from "react";
import { PrimaryButton, SecondaryButton } from "../Buttons";
import { motion } from "framer-motion";
import { FramerScrollLeft } from "../utils/framer";

const secretPhraseArray = [
  "choice",
  "whale",
  "advance",
  "cream",
  "cards",
  "sands",
  "mellon",
  "chief",
  "silk",
  "book",
  "person",
  "fridge",
];

export const PhraseCard = ({ pages, setPages, x, setX }) => {
  const [checked, setChecked] = useState(false);

  return (
    <motion.div
      key={"homeCard"}
      initial={{ x: "20%" }}
      transition={{ duration: 0.5 }}
      animate={{ x: "0" }}
      exit={{ x: x }}
      className="max-w-[400px] h-[70vh] mx-auto p-5 border rounded text-center grid grid-rows-[10] relative"
    >
      <div className="absolute top-0 p-4">
        <img
          onClick={() => {
            FramerScrollLeft(pages, setPages, setX);
          }}
          className="cursor-pointer"
          src="/img/icons/arrowleft.svg"
        />
      </div>
      <div className=" flex flex-col gap-y-3 relative mt-10">
        <h3 className="font-head text-3xl font-bold">Secret Recovery Phrase</h3>
        <h3 className="font-body text-base text-red-400">
          This phrase is the ONLY WAY to recover your wallet. DO NOT share with
          anyone!
        </h3>

        <div className="grid grid-cols-3 gap-3 blur-sm hover:blur-none transition-all duration-500">
          {secretPhraseArray.map((word, index) => (
            <SecretPhraseCard key={index} word={word} number={index + 1} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 w-full p-5 flex flex-col gap-y-3">
        <div className="font-body flex gap-x-3">
          <input
            className="w-5 rounded"
            type="checkbox"
            onClick={() => setChecked(!checked)}
            id="scales"
            name="scales"
          />
          <label for="scales text-base">
            I saved my Secret Recovery Phrase{" "}
          </label>
        </div>
        <PrimaryButton
          action={() => {
            setPages(pages + 1);
            setX(1000);
          }}
          disabled={!checked}
          text={"Continue"}
        />
      </div>
    </motion.div>
  );
};

const SecretPhraseCard = ({ word, number }) => {
  return (
    <div className="text-left border font-body rounded px-1 py-2 bg-gray-100 text-sm">
      {number}. {word}
    </div>
  );
};
