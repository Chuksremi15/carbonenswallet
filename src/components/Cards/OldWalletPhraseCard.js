import React, { useState } from "react";
import { PrimaryButton, SecondaryButton } from "../Buttons";
import { motion } from "framer-motion";
import { FramerScrollLeft } from "../utils/framer";
import { useEffect } from "react";

const secretPhraseArray12 = [
  { mnemonicIndex: 1, value: "" },
  { mnemonicIndex: 2, value: "" },
  { mnemonicIndex: 3, value: "" },
  { mnemonicIndex: 4, value: "" },
  { mnemonicIndex: 5, value: "" },
  { mnemonicIndex: 6, value: "" },
  { mnemonicIndex: 7, value: "" },
  { mnemonicIndex: 8, value: "" },
  { mnemonicIndex: 9, value: "" },
  { mnemonicIndex: 10, value: "" },
  { mnemonicIndex: 11, value: "" },
  { mnemonicIndex: 12, value: "" },
];
const secretPhraseArray24 = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

export const OldWalletPhraseCard = ({ pages, setPages, x, setX }) => {
  const [checked, setChecked] = useState(false);
  const [formObject, setFormObject] = useState({});

  const [secretPhraseArray, setSecretPhraseArray] = useState([
    { mnemonicIndex: 1, value: "" },
    { mnemonicIndex: 2, value: "" },
    { mnemonicIndex: 3, value: "" },
    { mnemonicIndex: 4, value: "" },
    { mnemonicIndex: 5, value: "" },
    { mnemonicIndex: 6, value: "" },
    { mnemonicIndex: 7, value: "" },
    { mnemonicIndex: 8, value: "" },
    { mnemonicIndex: 9, value: "" },
    { mnemonicIndex: 10, value: "" },
    { mnemonicIndex: 11, value: "" },
    { mnemonicIndex: 12, value: "" },
  ]);

  const [isTwelveWord, setIsTwelveWord] = useState(true);

  const splitStringWithSpace = (str) => {
    let strArray = str.split(" ");
    return [strArray, strArray.length > 1];
  };

  const checkEmpty = (valuesArr, isTwelve) => {
    let wordCount = 0;
    for (let i = 0; i < valuesArr.length; i++) {
      if (valuesArr[i] === "") {
        setChecked(false);
      } else {
        wordCount++;
      }
    }

    if (isTwelve) {
      if (wordCount >= 12) {
        setChecked(true);
      } else {
        setChecked(false);
      }
    } else {
      if (wordCount === 24) {
        setChecked(true);
      } else {
        setChecked(false);
      }
    }
  };

  const setFormValue = (e) => {
    let formValue = e.target.value;
    let formName = e.target.name;

    let [strArray, isSentence] = splitStringWithSpace(formValue);

    if (isSentence) {
      let newArray = [...secretPhraseArray];

      for (let i = 0; i < strArray.length; i++) {
        if (isTwelveWord) {
          if (Number(formName) + i < 13) {
            newArray.splice(Number(formName) - 1 + i, 1, {
              mnemonicIndex: Number(formName) + i,
              value: strArray[i],
            });

            formObject[Number(formName) + i] = strArray[i];
          }
        } else {
          if (Number(formName) + i < 25) {
            newArray.splice(Number(formName) - 1 + i, 1, {
              mnemonicIndex: Number(formName) + i,
              value: strArray[i],
            });

            formObject[Number(formName) + i] = strArray[i];
          }
        }
      }

      setSecretPhraseArray(newArray);
    } else {
      formObject[Number(formName)] = formValue;
      let newArray = [...secretPhraseArray];
      newArray.splice(formName - 1, 1, {
        mnemonicIndex: formName,
        value: formValue,
      });
      setSecretPhraseArray(newArray);
    }

    let valuesArr = Object.values(formObject);

    if (isTwelveWord) {
      if (valuesArr.length > 11) {
        checkEmpty(valuesArr, true);
      }
    } else {
      checkEmpty(valuesArr, false);
    }
  };

  const extendArray = () => {
    setIsTwelveWord(!isTwelveWord);

    if (secretPhraseArray.length < 13) {
      let valuesArr = Object.values(formObject);
      checkEmpty(valuesArr, false);

      setSecretPhraseArray([
        ...secretPhraseArray,
        { mnemonicIndex: 13, value: "" },
        { mnemonicIndex: 14, value: "" },
        { mnemonicIndex: 15, value: "" },
        { mnemonicIndex: 16, value: "" },
        { mnemonicIndex: 17, value: "" },
        { mnemonicIndex: 18, value: "" },
        { mnemonicIndex: 19, value: "" },
        { mnemonicIndex: 20, value: "" },
        { mnemonicIndex: 21, value: "" },
        { mnemonicIndex: 22, value: "" },
        { mnemonicIndex: 23, value: "" },
        { mnemonicIndex: 24, value: "" },
      ]);
    } else {
      let newArray = [...secretPhraseArray];
      newArray.splice(12, 12);
      setSecretPhraseArray(newArray);

      for (let i = 13; i < 25; i++) {
        formObject[i] = "";
      }

      let valuesArr = Object.values(formObject);
      checkEmpty(valuesArr, true);
    }
  };

  return (
    <motion.div
      key={"homeCard"}
      initial={{ x: "20%" }}
      transition={{ duration: 0.5 }}
      animate={{ x: "0" }}
      exit={{ x: x }}
      className={`max-w-[400px] ${
        isTwelveWord ? "h-[500px]" : "h-[730px]"
      }  mx-auto mb-20 p-5 border rounded text-center grid grid-rows-[10] relative transition-all duration-500`}
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

        <div className="grid grid-cols-3 gap-3 relative ">
          {secretPhraseArray.map(({ mnemonicIndex, value }, index) => (
            <SecretOldWalletPhraseInput
              key={index}
              mnemonicIndex={mnemonicIndex}
              action={setFormValue}
              word={value}
            />
          ))}
        </div>
        {/* <div className="font-body flex gap-x-3 mt-10 cursor-pointer text-center hover:text-textPrimary">
          I have a 24-word recovery phrase
        </div> */}
      </div>

      <div className="w-full flex mt-8 flex-col gap-y-3">
        <h5
          onClick={extendArray}
          className="font-body text-base hover:text-textPrimary cursor-pointer"
        >
          {isTwelveWord
            ? " I have a 24-word recovery phrase"
            : "I have a 12-word recovery phrase"}
        </h5>
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

const SecretOldWalletPhraseInput = ({ word, mnemonicIndex, action }) => {
  return (
    <div className="relative w-full transition-all duration-500">
      <input
        onChange={(e) => action(e)}
        name={mnemonicIndex}
        value={word}
        type="text"
        className="text-left w-full relative border font-body rounded pl-7 pb-2 pt-[9px] bg-gray-50 text-sm"
      ></input>
      <div className="absolute top-[10px] left-2 text-sm text-gray-600">
        {mnemonicIndex}.
      </div>
    </div>
  );
};
