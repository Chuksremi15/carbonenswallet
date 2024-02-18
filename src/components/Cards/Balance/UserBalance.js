import React, { useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { useEffect } from "react";
import redstone from "redstone-api";

export const UserBalance = ({
  usdBalance,
  accounts,
  balance,
  getBalanceLoading,
  handleOpen,
  handleOpenAddress,
  open,
  handleClose,
  getWalletDetaillsLoading,
}) => {
  const toggle = () => {
    if (open) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  return (
    <div className="h-[248px] bg-primary relative">
      <div className="px-6 py-4 flex flex-col gap-y-14 ">
        <div className="flex justify-between">
          <div
            onClick={() => handleOpenAddress()}
            className="flex items-center cursor-pointer justify-items-center gap-x-4"
          >
            <div>
              <img className="w-8" src="/img/icons/active.svg" />
            </div>

            {getWalletDetaillsLoading ? (
              <></>
            ) : (
              <div className="text-white font-body">
                <p className="text-base m-0">
                  {accounts && accounts[0].accountName}
                </p>
                <p className="text-xs -mt-0.5">
                  {" "}
                  {accounts && accounts[0].walletAddress.slice(0, 5)}
                  ....
                  {accounts &&
                    accounts[0].walletAddress.slice(
                      accounts && accounts[0].walletAddress.length - 5,
                      accounts && accounts[0].walletAddress.length
                    )}
                </p>
              </div>
            )}
          </div>

          <div onClick={() => toggle()} className="">
            <div className={`${open ? "barone" : "bar"}`} />
            <div className={`${open ? "opacity-0" : "bar"}`} />
            <div className={`${open ? "barthree" : "bar"}`} />
          </div>
        </div>

        <div className="text-white font-body">
          {getBalanceLoading ? (
            <div className="flex  items-center justify-left ml-8 mt-4">
              <CircularProgress size={20} style={{ color: "white" }} />
            </div>
          ) : (
            <>
              <h4 className="text-3xl">${usdBalance}</h4>
              <p className="text-sm -mt-1">{balance} ETH</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
