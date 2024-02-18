import React, { useEffect, useState } from "react";
import { PrimaryButton } from "../../Buttons";
import { motion } from "framer-motion";
import { FramerScrollLeft } from "../../utils/framer";
import { FaEthereum } from "react-icons/fa";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getBalance } from "../../../features/transactionSlice/transactionSlice";
import { createWalletClient, createPublicClient, custom, http } from "viem";
import { mainnet, sepolia } from "viem/chains";
import { addEnsContracts } from "@ensdomains/ensjs";
import { createSubname, setAddressRecord } from "@ensdomains/ensjs/wallet";
import { privateKeyToAccount } from "viem/accounts";
import { normalize } from "viem/ens";
import { getAvailable } from "@ensdomains/ensjs/public";
import useDebounce from "../../../hooks/UseDebounce";

export const AddEnsName = ({ pages, setPages, x, setX }) => {
  const dispatch = useDispatch();

  const [observableStore, setObservableStore] = useState({});
  const [loading, setLoading] = useState(true);
  const resolverAddress = "0x8FADE66B79cC9f707aB26799354482EB93a5B7dD";

  useEffect(() => {
    let value = localStorage.getItem("userAccounts");
    setObservableStore(JSON.parse(value));
    setLoading(false);
  }, [loading]);

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(
      "https://eth-sepolia.g.alchemy.com/v2/i__hU94P_jyFKF1ZcwVpE4Uamw0VB71z"
    ),
  });

  const account = privateKeyToAccount(process.env.REACT_APP_PRIVATE_KEY);

  const wallet = createWalletClient({
    account,
    chain: addEnsContracts({ network: "sepolia", contracts: "registry" }),
    transport: http(
      "https://eth-sepolia.g.alchemy.com/v2/i__hU94P_jyFKF1ZcwVpE4Uamw0VB71z"
    ),
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

  const [error, setError] = useState("");
  const [ensSubname, setEnsSubname] = useState("");
  const [updatedInput, setUpdatedInput] = useState("");
  const [ensAddress, setEnsAddress] = useState(null);
  const [currentValue, debouncedValue, setValue] = useDebounce(
    updatedInput,
    500
  );

  const handleOnChange = async (e) => {
    try {
      //   setError("Enter a valid subname; exclude special characters and number");

      setEnsSubname(e);
      let normalizeInput = normalize(e + ".remyboy.eth");
      setUpdatedInput(normalizeInput);
      setValue(normalizeInput);
      setError("");
    } catch (error) {
      setError(error.toString());
    }
  };

  useEffect(() => {
    const getAddressAsync = async () => {
      setEnsAddress(null);

      const ensAddress = await publicClient.getEnsAddress({
        name: debouncedValue,
      });

      setEnsAddress(ensAddress);
    };

    getAddressAsync();
  }, [debouncedValue]);

  const handleSubmit = async () => {
    try {
      console.log(currentValue, debouncedValue);
      if (ensAddress === null && !loading) {
        let createSubTransactionHash = await createSubname(wallet, {
          name: debouncedValue,
          owner: account.address,
          contract: "registry",
          chain: sepolia,
        });

        let setAddTransactionHash = await setAddressRecord(wallet, {
          name: debouncedValue,
          coin: "ETH",
          value: observableStore.userAccounts[0].walletAddress,
          resolverAddress: resolverAddress,
          chain: sepolia,
        });

        let transferTransactionHash = await createSubname(wallet, {
          name: debouncedValue,
          owner: observableStore.userAccounts[0].walletAddress,
          contract: "registry",
          chain: sepolia,
        });

        console.log(
          createSubTransactionHash,
          setAddTransactionHash,
          transferTransactionHash
        );

        setPages(pages + 1);
        setX(1000);
      }
    } catch (error) {
      setError(error.toString());
    }
  };

  return (
    <motion.div
      key={"homeCard"}
      initial={{ x: 5 }}
      transition={{ duration: 0.1 }}
      animate={{ x: "0" }}
      exit={{ x: x }}
      className="w-[375px] h-[600px] mx-auto  border rounded  relative"
    >
      <div className="h-[40px] pt-4 pl-4">
        <img
          onClick={() => {
            FramerScrollLeft(pages, setPages, setX);
          }}
          className="cursor-pointer"
          src="/img/icons/arrowleft.svg"
        />
      </div>
      <div className="h-[480px] relative">
        <div className="h-[140px] pt-3 pl-5 pr-5 pb-5">
          <h3 className="font-body text-xl font-semibold text-textPrimary">
            Choose An ENS Subname
          </h3>
          <h3 className="font-head text-sm  text-textLight mt-2">
            The subname choosen below will prefix to carbon.eth and your
            ethereum address will be added to its records, so you can easily
            share and get some ETH.
          </h3>
        </div>
        <div className="relative h-[340px]  bg-bggray rounded">
          <div className="font-body py-4 relative  ">
            <div className="font-body px-6">
              <label className="text-textPrimary text-sm">Subname</label>
              <input
                className="w-full bg-white text-textPrimary mt-2  placeholder-[#b4b3df] placeholder:font-light font-body text-sm rounded py-3 px-4 focus:outline-none focus:ring-0 focus:border-[#e5dbf7] focus:bg-white"
                onChange={(e) => handleOnChange(e.target.value)}
                type={"public address or ENS"}
                placeholder="Choose a subname"
                value={ensSubname}
                required
              />
              {error ? (
                <p className="text-sm text-red-500 font-body font-light mt-2">
                  {error}
                </p>
              ) : (
                debouncedValue && (
                  <p className="text-sm text-textLight font-body mt-2">
                    Availability for {debouncedValue} :{" "}
                    {ensAddress ? (
                      <span className="text-red-500">Already in use</span>
                    ) : (
                      <span className="text-green-500">Available</span>
                    )}
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="h-[70px] w-full p-5">
        <PrimaryButton
          action={() => {
            handleSubmit();
          }}
          disabled={error || ensAddress}
          text={"Continue"}
        />
      </div>
    </motion.div>
  );
};
