import React, { useEffect, useState } from "react";
import { PrimaryButton } from "../../Buttons";
import { motion } from "framer-motion";
import { FramerScrollLeft } from "../../utils/framer";
import { FaEthereum } from "react-icons/fa";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getBalance } from "../../../features/transactionSlice/transactionSlice";
import { createWalletClient, custom, http } from "viem";
import { mainnet, sepolia } from "viem/chains";
import { addEnsContracts } from "@ensdomains/ensjs";
import { createSubname, setAddressRecord } from "@ensdomains/ensjs/wallet";
import { privateKeyToAccount } from "viem/accounts";

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

  const hash = async () => {
    setPages(pages + 1);
    setX(1000);
    // try {
    //   const account = privateKeyToAccount(process.env.REACT_APP_PRIVATE_KEY);
    //   console.log(account.address);
    //   const wallet = createWalletClient({
    //     account,
    //     chain: addEnsContracts({ network: "sepolia", contracts: "registry" }),
    //     transport: http(
    //       "https://eth-sepolia.g.alchemy.com/v2/i__hU94P_jyFKF1ZcwVpE4Uamw0VB71z"
    //     ),
    //   });
    //   // console.log(wallet);
    //   let createSubTransactionHash = await createSubname(wallet, {
    //     name: "sam.remyboy.eth",
    //     owner: account.address,
    //     contract: "registry",
    //     chain: sepolia,
    //   });
    //   let setAddTransactionHash = await setAddressRecord(wallet, {
    //     name: "sam.remyboy.eth",
    //     coin: "ETH",
    //     value: "0x673cdcbaDBD4137A627A92123c94D5CDBA05839c",
    //     resolverAddress: "0x8FADE66B79cC9f707aB26799354482EB93a5B7dD",
    //     chain: sepolia,
    //   });
    //   let transferTransactionHash = await createSubname(wallet, {
    //     name: "sam.remyboy.eth",
    //     owner: "0x673cdcbaDBD4137A627A92123c94D5CDBA05839c",
    //     contract: "registry",
    //     chain: sepolia,
    //   });
    //   console.log(
    //     createSubTransactionHash,
    //     setAddTransactionHash,
    //     transferTransactionHash
    //   );
    // } catch (error) {
    //   console.log(error);
    // }
  };

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
            <h3 className="font-head text-sm  text-textLight mt-2 text-center">
              1 account found
            </h3>

            <div className="relative bg-[#efefef] rounded mt-6">
              <h6 className="font-medium text-base px-4 py-2 font-body">
                {!loading && observableStore.userAccounts[0].accountName}
              </h6>

              <div className=" flex items-stretch justify-between font-body p-4 border-t border-gray-300">
                <div className="flex items-center justify-center gap-x-2">
                  <div className="bg-white flex items-center justify-center h-10 w-10 rounded-xl">
                    <FaEthereum className="text-2xl" />
                  </div>
                  <div className="">
                    <p className="text-base font-medium font-body">Ethereum</p>
                    <p className="text-sm text-gray-600 font-body">
                      {!getBalanceLoading && balance} ETH
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-medium text-base font-body">
                    {!loading &&
                      observableStore.userAccounts[0].walletAddress.slice(0, 6)}
                    ....
                    {!loading &&
                      observableStore.userAccounts[0].walletAddress.slice(
                        observableStore.userAccounts[0].walletAddress.length -
                          5,
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
            // setPages(pages + 1);
            // setX(1000);
            hash();
          }}
          disabled={false}
          text={"Continue"}
        />
      </div>
    </motion.div>
  );
};
