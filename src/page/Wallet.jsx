import React, { useState } from "react";
import Web3 from "web3";
import { Button } from "primereact/button";

const Wallet = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const selectedAccount = accounts[0];
        setWalletConnected(true);
        console.log("Connected wallet address:", selectedAccount);
      } else {
        setErrorMessage(
          "MetaMask extension not detected. Please install MetaMask to connect your wallet."
        );
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setErrorMessage("Failed to connect wallet. Please try again.");
    }
  };

  return (
    <>
      <div>
        <h2 className="heading">About Wallet</h2>
        <div className="card flex justify-content-center">
          <Button
            className="wallet_btn"
            label="Connect Wallet"
            onClick={connectWallet}
          />
        </div>
        {walletConnected ? (
          <h2 className="heading">Successfully connected</h2>
        ) : (
          <h2 className="heading">{errorMessage}</h2>
        )}
      </div>
    </>
  );
};

export default Wallet;
