import React, { useEffect, useState } from "react";
import { DashboardWrapper } from "../../../components/page/DashboardWrapper";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "@mui/material/Modal";
import { Transfer } from "../../../components/Transfer";
import { Deposit } from "../../../components/Deposit";
import {
  FramerScrollLeft,
  FramerScrollRight,
} from "../../../components/utils/framer";
import { Assets } from "../../../components/Assets";
import { History } from "../../../components/History";
import { UserBalance } from "../../../components/Cards/Balance/UserBalance";
import { useDispatch, useSelector } from "react-redux";
import {
  getBalance,
  getTransactions,
} from "../../../features/transactionSlice/transactionSlice";
import { TransferCardWrapper } from "../../../components/page/TransferCardWrapper";
import { SideNav } from "../../../components/Nav/SideNav";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Home = () => {
  const dispatch = useDispatch();

  const [pages, setPages] = useState(0);
  const [x, setX] = useState(0);

  const FramerScrollRight = () => {
    setPages(1);
    setX(5);
  };
  const FramerScrollLeft = () => {
    setPages(0);
    setX(-5);
  };

  const {
    balance,
    usdBalance,
    getBalanceLoading,
    accounts,
    getWalletDetaillsLoading,
    getTransactionsLoading,
    transactions,
  } = useSelector((store) => {
    const {
      balance,
      usdBalance,
      getBalanceLoading,
      transactions,
      getTransactionsLoading,
    } = store.transaction;

    const { accounts, getWalletDetaillsLoading } = store.onboarding;

    return {
      balance,
      usdBalance,
      getBalanceLoading,
      accounts,
      getWalletDetaillsLoading,
      getTransactionsLoading,
      transactions,
    };
  });

  useEffect(() => {
    if (!getWalletDetaillsLoading) {
      dispatch(getBalance({ address: accounts[0].walletAddress }));
      dispatch(getTransactions({ address: accounts[0].walletAddress }));
    }
  }, [getWalletDetaillsLoading, getBalance, getTransactions]);

  const componentArray = [
    <Assets x={x} active={pages === 0} />,
    <History
      x={x}
      transactions={transactions}
      getTransactionsLoading={getTransactionsLoading}
      active={pages === 1}
    />,
  ];

  const [open, setOpen] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenNav = () => {
    setOpenNav(true);
  };
  const handleCloseNav = () => {
    setOpenNav(false);
  };

  return (
    <DashboardWrapper>
      <SideNav openNav={openNav} handleCloseNav={handleCloseNav} />
      <div className="w-[375px] h-[600px]  mx-auto  border  relative ">
        <UserBalance
          usdBalance={usdBalance}
          handleOpen={handleOpenNav}
          handleOpenAddress={handleOpen}
          open={openNav}
          handleClose={handleCloseNav}
          accounts={accounts}
          balance={balance}
          getBalanceLoading={getBalanceLoading}
          getWalletDetaillsLoading={getWalletDetaillsLoading}
        />

        <div className="bg-[#F8F8F8] h-[258px] relative ">
          <div className="absolute -top-[30px] left-[30px] flex gap-x-2 text-sm text-white">
            <div
              onClick={() => FramerScrollLeft()}
              className={` ${
                pages === 0 ? "border-b-2 border-[#FF7575] " : " text-[#C9C9E3]"
              } cursor-pointer  pb-2`}
            >
              Assets
            </div>
            <div
              onClick={() => FramerScrollRight()}
              className={` ${
                pages === 1
                  ? "border-b-2 border-[#FF7575]  "
                  : " text-[#C9C9E3]"
              } cursor-pointer ml-4 pb-2`}
            >
              History
            </div>
          </div>
          <div className="overflow-hidden h-[258px]">
            <AnimatePresence className="flex">
              {componentArray[pages]}
            </AnimatePresence>
          </div>
        </div>

        <div className="bg-bggray w-full grid grid-cols-2 items-center justify-center gap-x-4 px-6 h-[94px] border-t border-[#e5dbf7]">
          <Deposit
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
          />
          <Transfer />
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default Home;
