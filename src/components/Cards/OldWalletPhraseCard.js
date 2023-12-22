import React, { useState } from "react";
import { PrimaryButton, SecondaryButton } from "../Buttons";
import { motion } from "framer-motion";
import { FramerScrollLeft } from "../utils/framer";

const secretPhraseArray12 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const secretPhraseArray24 = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24,
];

export const OldWalletPhraseCard = ({ pages, setPages, x, setX }) => {
  const [checked, setChecked] = useState(false);
  const [formObject, setFormObject] = useState({});

  const setFormValue = (e) => {
    formObject[e.target.name] = e.target.value;

    let valuesArr = Object.values(formObject);

    if (valuesArr.length === 12) {
      const checkEmpty = () => {
        for (let i = 0; i < valuesArr.length; i++) {
          if (valuesArr[i] === "") {
            setChecked(false);
            return;
          }
        }
        setChecked(true);
      };
      checkEmpty();
    }
  };

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
      <div className="flex flex-col gap-y-3 items-center relative mt-10">
        <h3 className="font-head text-3xl font-bold">Secret Recovery Phrase</h3>
        <h3 className="font-body text-base text-gray-500">
          Import an existing wallet with your 12-word secret recovery phrase.
        </h3>

        <div className="grid grid-cols-3 gap-3 relative">
          {secretPhraseArray12.map((value, index) => (
            <SecretOldWalletPhraseInput
              key={index}
              number={index + 1}
              action={setFormValue}
            />
          ))}
        </div>
        <div className="font-body flex gap-x-3 mt-10 cursor-pointer text-center hover:text-textPrimary">
          I have a 24-word recovery phrase
        </div>
      </div>

      <div className="absolute bottom-0 w-full p-5 flex flex-col gap-y-3">
        <div className="w-full">
          <PrimaryButton
            action={() => {
              setPages(pages + 1);
              setX(1000);
            }}
            disabled={!checked}
            text={"Import Wallet"}
          />
        </div>
      </div>
    </motion.div>
  );
};

const SecretOldWalletPhraseInput = ({ word, number, action }) => {
  return (
    <div className="relative w-full">
      <input
        onChange={(e) => action(e)}
        name={number}
        type="text"
        className="text-left w-full relative border font-body rounded pl-7 pb-2 pt-[9px] bg-gray-50 text-sm"
      ></input>
      <div className="absolute top-[10px] left-2 text-sm text-gray-600">
        {number}.
      </div>
    </div>
  );
};
