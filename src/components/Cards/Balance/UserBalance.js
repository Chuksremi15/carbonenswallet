import React from "react";
import { CircularProgress } from "@material-ui/core";

export const UserBalance = ({
  accounts,
  balance,
  getBalanceLoading,
  handleOpen,
}) => {
  return (
    <div className="h-[248px] bg-primary relative">
      <div className="px-6 py-4 flex flex-col gap-y-14 ">
        <div className="flex justify-between">
          <div
            onClick={() => handleOpen()}
            className="flex items-center cursor-pointer justify-items-center gap-x-4"
          >
            <div>
              <img className="w-8" src="/img/icons/active.svg" />
            </div>
            <div className="text-white font-body">
              <p className="text-base m-0">Daily Driver</p>
              <p className="text-xs -mt-0.5">
                {" "}
                {accounts[0].walletAddress.slice(0, 5)}
                ....
                {accounts[0].walletAddress.slice(
                  accounts[0].walletAddress.length - 5,
                  accounts[0].walletAddress.length
                )}
              </p>
            </div>
          </div>

          <div></div>
        </div>

        <div className="text-white font-body">
          {getBalanceLoading ? (
            <div className="flex  items-center justify-left ml-8 mt-4">
              <CircularProgress size={20} style={{ color: "white" }} />
            </div>
          ) : (
            <>
              <h4 className="text-3xl">$404.38</h4>
              <p className="text-sm -mt-1">{balance} ETH</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
