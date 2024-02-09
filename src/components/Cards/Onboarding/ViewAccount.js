import React, { useEffect, useState } from "react";
import { PrimaryButton } from "../../Buttons";
import { motion } from "framer-motion";
import { FramerScrollLeft } from "../../utils/framer";
import { FaEthereum } from "react-icons/fa";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getBalance } from "../../../features/transactionSlice/transactionSlice";

export const ViewAccounts = ({ pages, setPages, x, setX }) => {
  const dispatch = useDispatch();

  const [observableStore, setObservableStore] = useState({});
  const [loading, setLoading] = useState(true);

  const { balance, getBalanceLoading } = useSelector((store) => {
    const { balance, getBalanceLoading } = store.transaction;

    return {
      balance,
      getBalanceLoading,
    };
  });

  useEffect(() => {
    let value = localStorage.getItem("userAccounts");
    setObservableStore(JSON.parse(value));
    setLoading(false);

    if (!loading) {
      dispatch(
        getBalance({ address: observableStore.userAccounts[0].walletAddress })
      );
    }
  }, [loading, getBalance]);

  return (
    <motion.div
      key={"homeCard"}
      initial={{ x: 5 }}
      transition={{ duration: 0.1 }}
      animate={{ x: "0" }}
      exit={{ x: x }}
      className="w-[375px] h-[600px] mx-auto p-5 border rounded  relative"
    >
      <div className="h-[50px]  p-4">
        <img
          onClick={() => {
            FramerScrollLeft(pages, setPages, setX);
          }}
          className="cursor-pointer"
          src="/img/icons/arrowleft.svg"
        />
      </div>
      <div className="h-[460px] relative ">
        {getBalanceLoading ? (
          <div className="flex h-[70%] items-center justify-center">
            <CircularProgress size={20} style={{ color: "#8759F2" }} />
          </div>
        ) : (
          <>
            <h3 className="font-body text-2xl font-semibold text-textPrimary text-center">
              Imports Accounts
            </h3>
            <h3 className="font-head text-sm  text-[#807DC0] mt-2 text-center">
              1 account found
            </h3>

            <div className="relative bg-[#efefef] rounded mt-6">
              <h6 className="font-medium text-base px-4 py-2 font-body">
                {observableStore.userAccounts[0].accountName}
              </h6>

              <div className=" flex items-stretch justify-between font-body p-4 border-t border-gray-300">
                <div className="flex items-center justify-center gap-x-2">
                  <div className="bg-white flex items-center justify-center h-10 w-10 rounded-xl">
                    <FaEthereum className="text-2xl" />
                  </div>
                  <div className="">
                    <p className="text-base font-medium font-body">Ethereum</p>
                    <p className="text-sm text-gray-600 font-body">
                      {balance} ETH
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-medium text-base font-body">
                    {observableStore.userAccounts[0].walletAddress.slice(0, 6)}
                    ....
                    {observableStore.userAccounts[0].walletAddress.slice(
                      observableStore.userAccounts[0].walletAddress.length - 5,
                      observableStore.userAccounts[0].walletAddress.length
                    )}
                  </p>
                  <p className="text-sm text-gray-600 font-body">New wallet</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="h-[90px] w-full ">
        <PrimaryButton
          action={() => {
            setPages(pages + 1);
            setX(1000);
          }}
          disabled={false}
          text={"Continue"}
        />
      </div>
    </motion.div>
  );
};
