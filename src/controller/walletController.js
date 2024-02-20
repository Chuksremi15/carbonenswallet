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
        privateKey: "",
        ensName: "",
      };

      let walletFromMnemonic = Wallet.fromPhrase(mnemonic);

      userAccount.accountName = account.accountName =
        "Account " + (keyring.accounts.length + 1);
      userAccount.walletAddress = account.walletAddress =
        walletFromMnemonic.address;

      userAccount.privateKey = account.privateKey =
        walletFromMnemonic.privateKey;

      account.publicKey = walletFromMnemonic.publicKey;

      observableStore.userAccounts.push(userAccount);
      observableStore.isUnlocked = true;
      observableStore.isUnlocked = false;
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

  const updateEnsName = (accountName, ensName) => {
    try {
      let storeValue = localStorage.getItem("userAccounts");
      storeValue = JSON.parse(storeValue);
      let userAccounts = storeValue.userAccounts;

      for (let i = 0; i < userAccounts.length; i++) {
        if (userAccounts[i].accountName === accountName) {
          userAccounts[i].ensName = ensName;
          localStorage.setItem("userAccounts", JSON.stringify(storeValue));
          return "account updated";
        }
      }

      return "unable to update";
    } catch (error) {
      if (error) return error;
    }
  };

  const lockAccount = () => {
    let storeValue = localStorage.getItem("userAccounts");
    storeValue = JSON.parse(storeValue);
    storeValue.isUnlocked = false;
    localStorage.setItem("userAccounts", JSON.stringify(storeValue));

    return "Account Locked";
  };

  const unlockAccount = async (password) => {
    try {
      let secrets = localStorage.getItem("walletSecrets");
      let value = await passworder.decrypt(password, secrets);
      let storeValue = localStorage.getItem("userAccounts");
      storeValue = JSON.parse(storeValue);
      storeValue.isUnlocked = true;
      localStorage.setItem("userAccounts", JSON.stringify(storeValue));

      return "Account Unlocked";
    } catch (error) {
      return "Incorrect password";
    }
  };

  const getAccounts = async () => {};

  return { addAccount, updateEnsName, lockAccount, unlockAccount };
};
