import React, { useState } from "react";
import { PrimaryButton } from "../../components/Buttons";
import { mainnet, sepolia } from "viem/chains";
import { createWalletClient, createPublicClient, custom, http } from "viem";
import { addEnsContracts } from "@ensdomains/ensjs";
import { createSubname, setAddressRecord } from "@ensdomains/ensjs/wallet";
import { normalize } from "viem/ens";
import { privateKeyToAccount } from "viem/accounts";

const Test = () => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [ensSubname, setEnsSubname] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatedInput, setUpdatedInput] = useState("");

  const resolverAddress = "0x8FADE66B79cC9f707aB26799354482EB93a5B7dD";

  const account = privateKeyToAccount(process.env.REACT_APP_PRIVATE_KEY);

  //   const wallet = createWalletClient({
  //     account,
  //     chain: addEnsContracts({ network: "sepolia", contracts: "registry" }),
  //     transport: http(
  //       `https://eth-sepolia.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}`
  //     ),
  //   });

  const wallet = createWalletClient({
    account,
    chain: addEnsContracts(sepolia),
    transport: http(
      `https://eth-sepolia.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}`
    ),
  });

  const handleSubmit = async () => {
    try {
      setUpdateLoading(true);

      //   let createSubTransactionHash = await createSubname(wallet, {
      //     name: updatedInput,
      //     owner: account.address,
      //     contract: "registry",
      //     chain: sepolia,
      //   });

      const createSubTransactionHash = await createSubname(wallet, {
        name: updatedInput,
        owner: "0x93f222120dB78772730b62BFB12225995e0b5DEe",
        contract: "registry",
      });

      //   let setAddTransactionHash = await setAddressRecord(wallet, {
      //     name: updatedInput,
      //     coin: "ETH",
      //     value: "0x53AD8EEBE6e751304cC73D3dE104Db4Fa6ffbC13",
      //     resolverAddress: resolverAddress,
      //     chain: sepolia,
      //   });
      //   let transferTransactionHash = await createSubname(wallet, {
      //     name: updatedInput,
      //     owner: "0x53AD8EEBE6e751304cC73D3dE104Db4Fa6ffbC13",
      //     contract: "registry",
      //     chain: sepolia,
      //   });

      console.log(createSubTransactionHash);

      setUpdateLoading(false);
    } catch (error) {
      // setError(error.toString());
      console.log(error);
      setUpdateLoading(false);
    }
  };

  const handleOnChange = async (e) => {
    try {
      //   setError("Enter a valid subname; exclude special characters and number");

      setEnsSubname(e);
      let normalizeInput = normalize(e + ".carbon.eth");
      setUpdatedInput(normalizeInput);
      setError("");
    } catch (error) {
      setError(error.toString());
    }
  };

  return (
    <div className="w-[375px] h-[600px] mx-auto  border rounded  relative">
      <div className="h-[40px] pt-4 pl-4">
        <img className="cursor-pointer" src="/img/icons/arrowleft.svg" />
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
              {updatedInput && (
                <p className="text-sm  font-body font-light mt-2">
                  {updatedInput}
                </p>
              )}
              {error && (
                <p className="text-sm text-red-500 font-body font-light mt-2">
                  {error}
                </p>
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
          loading={updateLoading}
          text={"Continue"}
        />
      </div>
    </div>
  );
};

export default Test;
