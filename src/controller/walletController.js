import React from "react";
import { Wallet, ethers } from "ethers";
import passworder from "browser-passworder";

export const walletController = () => {
  let keyring = {
    seedPhrase: "",
    accounts: [],
  };

  let observableStore = {
    isUnlocked: false,
    userAccounts: [],
  };

  const generateSeedPhrase = () => {};

  const addAccount = async (mnemonic) => {
    try {
      keyring.seedPhrase = mnemonic;

      let account = {
        accountName: "",
        walletAddress: "",
        publicKey: "",
        privateKey: "",
      };

      let userAccount = {
        accountName: "",
        walletAddress: "",
      };

      let walletFromMnemonic = Wallet.fromPhrase(mnemonic);

      userAccount.accountName = account.accountName =
        "Account" + (keyring.accounts.length + 1);
      userAccount.walletAddress = account.walletAddress =
        walletFromMnemonic.address;
      account.publicKey = walletFromMnemonic.publicKey;
      account.privateKey = walletFromMnemonic.privateKey;

      observableStore.userAccounts.push(userAccount);
      keyring.accounts.push(account);

      let password = localStorage.getItem("password");

      let secrets = JSON.stringify(keyring);
      let accountStore = JSON.stringify(observableStore);

      if (password) {
        let value = await passworder.encrypt(password, secrets);
        localStorage.setItem("walletSecrets", value);
        localStorage.setItem("userAccounts", accountStore);
      }
    } catch (error) {
      if (error) return error;
    }
  };

  const getAccounts = async () => {};

  return { addAccount };
};
