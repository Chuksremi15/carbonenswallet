import React, { useState } from "react";
import { DashboardWrapper } from "../../../components/page/DashboardWrapper";
import { AnimatePresence, motion } from "framer-motion";
import { Transfer } from "../../../components/Transfer";
import { Deposit } from "../../../components/Deposit";
import {
  FramerScrollLeft,
  FramerScrollRight,
} from "../../../components/utils/framer";
import { Assets } from "../../../components/Assets";
import { History } from "../../../components/History";

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

  const componentArray = [
    <Assets x={x} active={pages === 0} />,
    <History x={x} active={pages === 1} />,
  ];

  return (
    <DashboardWrapper>
      <div className="w-[375px] h-[600px]  mx-auto  border  relative ">
        <div className="h-[248px] bg-primary relative">
          <div className="px-6 py-4 flex flex-col gap-y-14 ">
            <div className="flex justify-between">
              <div className="flex items-center justify-items-center gap-x-4">
                <div>
                  <img className="w-8" src="/img/icons/active.svg" />
                </div>
                <div className="text-white font-body">
                  <p className="text-base m-0">Daily Driver</p>
                  <p className="text-xs -mt-1">0x34x...bF6D3</p>
                </div>
              </div>

              <div></div>
            </div>

            <div className="text-white font-body">
              <h4 className="text-3xl">$404.38</h4>
              <p className="text-sm -mt-1">1.4758 ETH</p>
            </div>
          </div>
        </div>

        <div className="bg-[#fbfafd] h-[258px] relative ">
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
          <div className="overflow-hidden">
            <AnimatePresence className="flex ">
              {componentArray[pages]}
            </AnimatePresence>
          </div>
        </div>

        <div className="bg-[#fbfafd] w-full grid grid-cols-2 items-center justify-center gap-x-4 px-6 h-[94px] border-t border-[#e5dbf7]">
          <Deposit />
          <Transfer />
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default Home;
