import React, { useState } from "react";
import { CircularProgress, Modal } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { SettingsCardWrapper } from "../page/TransferCardWrapper";
import { IoIosWarning } from "react-icons/io";
import { CardPrimaryButton, CardSecondaryButton } from "../Buttons";
import passworder from "browser-passworder";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";

const Networks = ({ openDa, handleCloseDa, handleCloseNav }) => {
  const [showSecret, useShowSecret] = useState(false);
  const [error, setError] = useState("");

  const history = useHistory();

  const handleSubmit = async () => {
    try {
      let data = localStorage.getItem("networks");

      console.log(data);

      localStorage.setItem("password", null);

      setError("");
    } catch (error) {
      setError("Incorrect password");
    }
  };

  const handleClose = () => {
    handleCloseNav();
    handleCloseDa();
    setError("");
  };

  const networksArray = [
    {
      networkName: "Main Ethereum Network",
      network: "ethereum",
      chainId: "",
      imgColour: "#6EC67A",
    },
    {
      networkName: "Sepolia Test Network",
      network: "sepolia",
      chainId: "",
      imgColour: "#FF7575",
    },
    {
      networkName: "Goerli Test Network",
      network: "goerli",
      chainId: "",
      imgColour: "#9975FF",
    },
    {
      networkName: "Ropsten Test Network",
      network: "rospten",
      chainId: "",
      imgColour: "#757AFF",
    },
    {
      networkName: "Kovan Test Network",
      network: "kovan",
      chainId: "",
      imgColour: "#FFD875",
    },
    {
      networkName: "Localhost 8545",
      network: "localhost",
      chainId: "",
      imgColour: "#FF5BDB",
    },
  ];

  return (
    <>
      <Modal
        open={openDa}
        onClose={handleCloseDa}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        hideBackdrop
        className="relative pt-10 h-[90vh] w-[375px] mx-auto flex items-center justify-centertransition duration-500"
      >
        <AnimatePresence>
          <motion.div
            key={"homeCard"}
            initial={{ y: 5 }}
            transition={{ duration: 0.1 }}
            animate={{ y: "0" }}
            exit={{ y: "0" }}
          >
            <SettingsCardWrapper handleClose={handleClose}>
              <div className="pt-24 h-[574px] flex flex-col ">
                {networksArray.map(
                  ({ networkName, network, imgColour, chainId }) => (
                    <div className="border-b px-6  border-[#E4E3FF] pt-5 pb-5 flex items-center relative cursor-pointer hover:bg-gray-100 transition-all duration-500">
                      <div
                        className={`w-4 h-4 rounded-full `}
                        style={{ background: imgColour }}
                      ></div>
                      <h6 className="text-primary text-base font-body ml-8">
                        {networkName}
                      </h6>
                      <img
                        className="absolute right-[30px]"
                        src="/img/icons/selector.svg"
                      />
                    </div>
                  )
                )}
              </div>
            </SettingsCardWrapper>
          </motion.div>
        </AnimatePresence>
      </Modal>
    </>
  );
};

export default Networks;
