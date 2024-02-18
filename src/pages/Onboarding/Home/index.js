import React, { useState } from "react";
import { OnboardingWrapper } from "../../../components/page/OnboardingWrapper";
import { AnimatePresence } from "framer-motion";
import { HomeCard } from "../../../components/Cards/Onboarding/HomeCard";
import { PasswordForm } from "../../../components/Forms/Onboarding/PasswordForm";
import { PhraseCard } from "../../../components/Cards/Onboarding/PhraseCard";
import { GetStartedCard } from "../../../components/Cards/Onboarding/GetStartedCard";
import { OldWalletPhraseCard } from "../../../components/Cards/Onboarding/OldWalletPhraseCard";
import { ViewAccounts } from "../../../components/Cards/Onboarding/ViewAccount";
import { AddEnsName } from "../../../components/Cards/Onboarding/AddEnsName";

const Home = () => {
  const [pages, setPages] = useState(
    Number(localStorage.getItem("pages")) || 0
  );
  const [x, setX] = useState(Number(localStorage.getItem("x")) || 0);

  const componentArray = [
    <HomeCard pages={pages} setPages={setPages} x={x} setX={setX} />,
    <PasswordForm pages={pages} setPages={setPages} x={x} setX={setX} />,
    <PhraseCard pages={pages} setPages={setPages} x={x} setX={setX} />,
    <OldWalletPhraseCard pages={pages} setPages={setPages} x={x} setX={setX} />,
    <ViewAccounts pages={pages} setPages={setPages} x={x} setX={setX} />,
    <AddEnsName pages={pages} setPages={setPages} x={x} setX={setX} />,
    <GetStartedCard pages={pages} setPages={setPages} x={x} setX={setX} />,
  ];

  return (
    <OnboardingWrapper>
      <AnimatePresence>{componentArray[pages]}</AnimatePresence>
    </OnboardingWrapper>
  );
};

export default Home;
