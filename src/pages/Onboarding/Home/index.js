import React, { useState } from "react";
import { OnboardingWrapper } from "../../../components/page/OnboardingWrapper";
import { AnimatePresence } from "framer-motion";
import { HomeCard } from "../../../components/Cards/HomeCard";
import { RegisterForm } from "../../../components/Forms/RegisterForm";
import { PhraseCard } from "../../../components/Cards/PhraseCard";
import { GetStartedCard } from "../../../components/Cards/GetStartedCard";

const Home = () => {
  const [pages, setPages] = useState(1);
  const [x, setX] = useState(0);

  const componentArray = [
    <HomeCard pages={pages} setPages={setPages} x={x} setX={setX} />,
    <RegisterForm pages={pages} setPages={setPages} x={x} setX={setX} />,
    <PhraseCard pages={pages} setPages={setPages} x={x} setX={setX} />,
    <GetStartedCard pages={pages} setPages={setPages} x={x} setX={setX} />,
  ];

  return (
    <OnboardingWrapper>
      <AnimatePresence>{componentArray[pages - 1]}</AnimatePresence>
    </OnboardingWrapper>
  );
};

export default Home;
