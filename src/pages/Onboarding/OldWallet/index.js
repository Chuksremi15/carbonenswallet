import React from "react";
import { OldWalletPhraseCard } from "../../../components/Cards/OldWalletPhraseCard";

const OldWallet = () => {
  const [pages, setPages] = useState(1);
  const [x, setX] = useState(0);

  const componentArray = [
    <OldWalletPhraseCard pages={pages} setPages={setPages} x={x} setX={setX} />,
  ];

  return (
    <OnboardingWrapper>
      <AnimatePresence>{componentArray[pages - 1]}</AnimatePresence>
    </OnboardingWrapper>
  );
};

export default OldWallet;
