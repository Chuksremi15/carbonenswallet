import React, { useEffect, useState } from "react";
import { OnboardingWrapper } from "../../components/page/OnboardingWrapper";
import { PrimaryButton } from "../../components/Buttons";
import passworder from "browser-passworder";
import { walletController } from "../../controller/walletController";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { getWalletDetails } from "../../features/onboarding/onboardingSlice";

const Unlock = () => {
  const dispatch = useDispatch();

  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    setPassword(e);
  };

  const { unlockAccount } = walletController();

  const history = useHistory();

  const handleSubmit = async () => {
    const responce = await unlockAccount(password);
    if (responce === "Incorrect password") {
      setPasswordError("Incorrect password");
    } else {
      history.push("/dashboard");
      setPasswordError("");
    }
  };

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
      }
    } else {
    }
  }, [accounts, getWalletDetaillsLoading]);

  return (
    <OnboardingWrapper>
      <div className="w-[375px] h-[600px]  mx-auto p-5 border rounded text-center grid grid-rows-[10] relative">
        <div className=" h-[100px] top-0 p-4"></div>
        <div className="h-[400px] flex flex-col gap-y-6">
          <div className="flex-col gap-y-4">
            <img className="mx-auto  mt-10" src="/img/newlogo.svg" />
            <h3 className="font-body text-2xl font-semibold text-textPrimary">
              Welcome back!
            </h3>
            <h3 className="font-head text-sm  text-textLight mt-2">
              Your gateway to the decentralized web.
            </h3>
          </div>
          <div className="flex flex-col gap-y-3 ">
            <div className="text-left flex flex-col gap-y-1">
              <input
                className="w-full border placeholder-[#b4b3df] text-sm  font-body rounded py-3 px-4 focus:outline-none focus:ring-0 focus:border-primary focus:bg-white"
                onChange={(e) => handleChange(e.target.value)}
                type={"password"}
                placeholder="password"
                value={password}
                required
              />

              {passwordError && (
                <p className="text-red-500 text-sm text-left  font-normal font-body">
                  {passwordError}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="h-[100px] bottom-0 w-full ">
          <PrimaryButton
            action={() => {
              handleSubmit();
            }}
            disabled={passwordError === "" && password === ""}
            text={"Unlock"}
          />
        </div>
      </div>
    </OnboardingWrapper>
  );
};

export default Unlock;
