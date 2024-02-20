import React, { Suspense, useState, useEffect } from "react";
import { OnboardingWrapper } from "../../../components/page/OnboardingWrapper";
import { AnimatePresence } from "framer-motion";
import { HomeCard } from "../../../components/Cards/Onboarding/HomeCard";
import { PasswordForm } from "../../../components/Forms/Onboarding/PasswordForm";
import { PhraseCard } from "../../../components/Cards/Onboarding/PhraseCard";
import { GetStartedCard } from "../../../components/Cards/Onboarding/GetStartedCard";
import { OldWalletPhraseCard } from "../../../components/Cards/Onboarding/OldWalletPhraseCard";
import { ViewAccounts } from "../../../components/Cards/Onboarding/ViewAccount";
import { AddEnsName } from "../../../components/Cards/Onboarding/AddEnsName";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getWalletDetails } from "../../../features/onboarding/onboardingSlice";

const Home = () => {
  const [pages, setPages] = useState(
    Number(localStorage.getItem("pages")) || 0
  );
  const [x, setX] = useState(Number(localStorage.getItem("x")) || 0);
  const [fromOld, setFromOld] = useState(false);
  const [mnemonic, setMnemonic] = useState(null);

  const dispatch = useDispatch();

  const history = useHistory();

  const { accounts, getWalletDetaillsLoading, isUnlocked } = useSelector(
    (store) => {
      const { accounts, getWalletDetaillsLoading, isUnlocked } =
        store.onboarding;

      return {
        accounts,
        getWalletDetaillsLoading,
        isUnlocked,
      };
    }
  );

  useEffect(() => {
    dispatch(getWalletDetails());
  }, [getWalletDetails]);

  useEffect(() => {
    if (!getWalletDetaillsLoading) {
      if (accounts !== null) {
        if (isUnlocked) {
          history.push("/dashboard");
        } else {
          history.push("/unlock");
        }
      } else {
        history.push("/");
      }
    } else {
    }
  }, [accounts, getWalletDetaillsLoading]);

  const componentArray = [
    <HomeCard pages={pages} setPages={setPages} x={x} setX={setX} />,
    <PasswordForm
      pages={pages}
      setPages={setPages}
      x={x}
      setX={setX}
      fromOld={fromOld}
      mnemonic={mnemonic}
    />,
    <PhraseCard pages={pages} setPages={setPages} x={x} setX={setX} />,
    <OldWalletPhraseCard
      setFromOld={setFromOld}
      pages={pages}
      setPages={setPages}
      x={x}
      setX={setX}
      setMnemonic={setMnemonic}
    />,
    <ViewAccounts
      fromOld={fromOld}
      pages={pages}
      setPages={setPages}
      x={x}
      setX={setX}
    />,
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
