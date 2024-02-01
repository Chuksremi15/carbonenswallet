import React, { useEffect, useState } from "react";
import { PrimaryButton, SecondaryButton } from "../../Buttons";
import { motion } from "framer-motion";
import { FramerScrollLeft } from "../../utils/framer";
import { FaEyeSlash } from "react-icons/fa";
import { Wallet, ethers } from "ethers";
import { CircularProgress } from "@material-ui/core";
import { toast } from "react-toastify";
import { walletController } from "../../../controller/walletController";

export const PhraseCard = ({ pages, setPages, x, setX }) => {
  const [checked, setChecked] = useState(false);
  const [wallet, setWallet] = useState({});
  const [loading, setLoading] = useState(true);
  const [createAccountloading, setCreateAccountLoading] = useState(false);
  const [mnemonic, setMnemonic] = useState(null);

  const [password, setPassword] = useState(
    localStorage.getItem("password") || ""
  );

  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(mnemonic);
      toast.success("Copied!", {
        duration: 3000,
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  useEffect(() => {
    if (password) {
      let randomWallet = Wallet.createRandom();

      setWallet(randomWallet);

      setMnemonic(randomWallet.mnemonic.phrase);

      setLoading(false);
    }
  }, [Wallet, password, loading]);

  const { addAccount } = walletController();

  const handleAddAccount = async () => {
    try {
      setCreateAccountLoading(true);

      let value = await addAccount(mnemonic);

      setCreateAccountLoading(false);

      setPages(pages + 2);
      localStorage.setItem("pages", pages + 2);
      localStorage.setItem("x", 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      key={"homeCard"}
      initial={{ x: 5 }}
      transition={{ duration: 0.5 }}
      animate={{ x: "0" }}
      exit={{ x: x }}
      className="w-[375px] h-[600px] mx-auto p-5 border rounded text-center  relative"
    >
      <div className="h-[50px] p-0">
        <img
          onClick={() => {
            FramerScrollLeft(pages, setPages, setX);
          }}
          className="cursor-pointer"
          src="/img/icons/arrowleft.svg"
        />
      </div>
      {loading ? (
        <div className="flex h-[70%] items-center justify-center">
          <CircularProgress size={20} style={{ color: "#8759F2" }} />
        </div>
      ) : (
        <>
          <div className="h-[430px] flex flex-col gap-y-3 relative ">
            <h3 className="font-body text-2xl font-semibold text-textPrimary">
              Secret Recovery Phrase
            </h3>
            <h3 className="font-body text-sm text-red-400 font-light">
              This phrase is the ONLY WAY to recover your wallet. DO NOT share
              with anyone!
            </h3>

            <div className="relative flex flex-col gap-y-10">
              <div className="grid grid-cols-3 gap-3 blur-sm hover:blur-none transition-all duration-500 relative z-10 hover:bg-white">
                {mnemonic.split(" ").map((word, index) => (
                  <SecretPhraseCard
                    key={index}
                    word={word}
                    number={index + 1}
                  />
                ))}
              </div>
              <div className="absolute left-[48%] top-[30%] hover:opacity-0">
                <FaEyeSlash size={20} />
              </div>

              <SecondaryButton
                action={copyContent}
                text="Copy seed phrase to clipboard"
              />
            </div>
          </div>

          <div className="h-[120px] bottom-0 w-full flex flex-col gap-y-3">
            <div className="font-body flex gap-x-3">
              <input
                className="w-5 rounded border border-primary"
                type="checkbox"
                onClick={() => setChecked(!checked)}
                id="scales"
                name="scales"
              />
              <label className="scales text-sm text-textPrimary">
                I saved my Secret Recovery Phrase{" "}
              </label>
            </div>
            <PrimaryButton
              action={handleAddAccount}
              loading={createAccountloading}
              disabled={!checked}
              text={"Continue"}
            />
          </div>
        </>
      )}
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
