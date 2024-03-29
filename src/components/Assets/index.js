import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export const Assets = ({ x, balance, usdBalance, getBalanceLoading }) => {
  const TokenCard = ({ img, token }) => {
    return (
      <div className="border-b border-[#e5dbf7] p-6">
        <div className="flex items-center justify-items-center gap-x-4">
          <div className="bg-white rounded-full p-1">
            <img className="" src={img} />
          </div>
          <div className="font-body">
            <p className="text-sm m-0 text-textPrimary">
              {!getBalanceLoading && balance} {token}
            </p>
            <p className="text-xs text-textLight">
              ${!getBalanceLoading && usdBalance}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      key={"homeCard"}
      initial={{ x: x }}
      transition={{ duration: 0.1 }}
      animate={{ x: "0" }}
      exit={{ x: -100 }}
    >
      <TokenCard img={"/img/icons/ethicon.svg"} token={"ETH"} />
    </motion.div>
  );
};
